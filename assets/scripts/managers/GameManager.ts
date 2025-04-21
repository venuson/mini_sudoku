// assets/scripts/managers/GameManager.ts

import { _decorator, Component, Node, director, log, warn, error, isValid } from 'cc';
import { Constants, DifficultyType } from '../utils/Constants';
import { SettingsData } from '../data/SettingsData';
import { BoardData, LevelData, cloneBoardData } from '../data/GameData';
import { LocalUserProgress,LevelRecord } from '../data/UserData';
import { PersistenceManager } from '../services/PersistenceManager';
import { SudokuLogic } from '../logic/SudokuLogic';
import { UIManager } from './UIManager';
import { GridManager } from './GridManager';
import { InputManager } from './InputManager';
import { AudioManager } from './AudioManager';
import { EffectsManager } from './EffectsManager';
import { AccountManager } from './AccountManager';
import { AdManager } from './AdManager'; // AdManager 可能不需要直接交互，由 UIManager 控制

const { ccclass, property } = _decorator;

enum GameState {
    LOADING,        // 初始加载状态
    MENU,           // 主菜单/难度选择状态
    LOADING_LEVEL,  // 关卡加载中
    PLAYING,        // 游戏中
    PAUSED,         // 游戏暂停
    LEVEL_COMPLETE, // 关卡完成（显示胜利效果）
    GAME_OVER,      // 游戏彻底结束（暂未使用）
}

@ccclass('GameManager')
export class GameManager extends Component {
    // --- Singleton Instance ---
    private static _instance: GameManager | null = null;
    public static get instance(): GameManager {
        if (!GameManager._instance) {
            error("[GameManager] 实例在初始化之前或节点不存在时被请求。");
        }
        return GameManager._instance!;
    }

    // --- 管理器引用 (需要在编辑器中赋值) ---
    @property({ type: UIManager, tooltip: "UI 管理器实例" })
    private uiManager: UIManager | null = null;
    @property({ type: GridManager, tooltip: "棋盘管理器实例" })
    private gridManager: GridManager | null = null;
    @property({ type: InputManager, tooltip: "输入管理器实例" })
    private inputManager: InputManager | null = null;
    @property({ type: AudioManager, tooltip: "音频管理器实例" })
    private audioManager: AudioManager | null = null;
    @property({ type: EffectsManager, tooltip: "效果管理器实例" })
    private effectsManager: EffectsManager | null = null;
    @property({ type: AccountManager, tooltip: "账户管理器实例" })
    private accountManager: AccountManager | null = null;
    // AdManager 通常由 UIManager 间接控制，GameManager 可能不需要直接引用
    // @property(AdManager) private adManager: AdManager | null = null;

    // --- 游戏状态 ---
    private _currentState: GameState = GameState.LOADING;
    private _currentDifficulty: DifficultyType | null = null;
    private _currentLevelIndex: number = 0; // 当前关卡序号 (1-based)
    private _currentLevelData: LevelData | null = null; // 当前关卡的完整数据
    private _currentGameTime: number = 0; // 当前关卡已用时间 (秒)
    private _timerIntervalId: number = -1; // 计时器 ID
    private _sudokuLogic: SudokuLogic | null = null; // 数独逻辑实例

    // --- Lifecycle Callbacks ---
    protected onLoad(): void {
        console.log('[GameManager] onLoad');
        if (GameManager._instance && GameManager._instance !== this) {
            warn('[GameManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
        }
        GameManager._instance = this;

        // 设置为持久节点
        if (this.node.parent) {
            director.addPersistRootNode(this.node);
            console.log('[GameManager] 节点已设为持久化。');
        }

        // 检查必要的管理器引用

        if (!this.uiManager) {
            error('[GameManager] 缺少必要的管理器引用uiManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        } if(!this.gridManager) { 
            error('[GameManager] 缺少必要的管理器引用gridManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        } if(!this.inputManager){
            error('[GameManager] 缺少必要的管理器引用inputManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        } if( !this.audioManager){
            error('[GameManager] 缺少必要的管理器引用audioManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        } if( !this.effectsManager) {
            error('[GameManager] 缺少必要的管理器引用effectsManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        } if( !this.accountManager) {
            error('[GameManager] 缺少必要的管理器引用accountManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态
            return;
        }

        this._sudokuLogic = SudokuLogic.getInstance(); // 获取数独逻辑单例

        // 绑定需要监听的事件
        this.bindEvents();

        console.log('[GameManager] 初始化完成，等待资源加载和登录...');
    }

    protected async start(): Promise<void> {
        console.log('[GameManager] start - 开始初始化流程');
        this.setGameState(GameState.LOADING);

        // 1. 加载设置
        const settings = PersistenceManager.loadSettings();
        console.log('[GameManager] 设置已加载:', settings);

        // 2. 初始化音频管理器并应用设置
        await this.audioManager!.initialize(settings);

        // 3. 初始化效果管理器
        // EffectsManager 的 onLoad 已经初始化，这里可以不做额外操作


        // 4. 初始化 UI 管理器并预加载资源
        await this.uiManager!.preloadAssets(); // 等待 UI 资源加载完成
        this.uiManager!.initialize(this.gridManager!, this.effectsManager!); // 传入依赖

        // 5. 初始化棋盘管理器
        this.gridManager!.initialize(this.uiManager!, this.effectsManager!); // 传入依赖

        // 6. 初始化输入管理器
        this.inputManager!.initialize(this.gridManager!, this.uiManager!, this.audioManager!, this.effectsManager!); // 传入依赖

        // 7. 初始化账户管理器 (AccountManager 的 onLoad 已初始化)

        // 8. 尝试自动登录
        await this.accountManager!.login(); // 等待登录流程完成

        // 9. 检查是否有未完成的游戏
        const savedGame = PersistenceManager.loadUnfinishedGame();
        let shouldStartDefaultGame = true; // 默认需要开始新游戏
        if (savedGame) {
            // 检查存档是否属于当前用户 (如果已登录)
            const currentUserId = this.accountManager!.getUserId();
            // 如果未登录 (currentUserId 为 null)，则任何存档都视为无效或不属于当前匿名会话
            // 如果已登录，则 userId 必须匹配
            if (currentUserId !== null && savedGame.userId === currentUserId) {
                log('[GameManager] 发现当前用户的游戏存档，尝试恢复...');
                // TODO: (可选) 如果你想询问用户，可以在这里显示弹窗
                // 如果用户选择继续，则调用 continueSavedGame 并设置 shouldStartDefaultGame = false
                // 示例：直接继续游戏
                this.continueSavedGame(savedGame);
                shouldStartDefaultGame = false; // 成功恢复，不需要开始默认游戏
            } else {
                log('[GameManager] 发现无效或不匹配的游戏存档，将其忽略并清除。');
                PersistenceManager.clearUnfinishedGame(); // 清理无效存档
            }
        } else {
            log('[GameManager] 没有找到游戏存档。');
        }

        // 10. 如果没有成功恢复存档，则开始默认游戏
        if (shouldStartDefaultGame) {
            log('[GameManager] 开始默认游戏 (入门级第一关)。');
            // 直接调用 startNewGame 开始入门第一关
            this.startNewGame(Constants.Difficulty.ENTRY, 1); // <--- 直接开始默认关卡
        }
    }

    protected onDestroy(): void {
        console.log('[GameManager] onDestroy');
        if (GameManager._instance === this) {
            GameManager._instance = null;
        }
        this.stopTimer();
        // 解绑事件
        this.unbindEvents();
    }

    // --- 事件绑定与处理 ---
    private bindEvents(): void {
        console.log('[GameManager] Binding events...');
        director.on(Constants.EventName.DIFFICULTY_SELECTED, this.onDifficultySelected, this);
        director.on(Constants.EventName.GAME_OVER, this.onGameOver, this); // InputManager 发出
        director.on(Constants.EventName.PAUSE_RESUME_BUTTON_CLICKED, this.onPauseResumeClicked, this);
        director.on(Constants.EventName.SETTINGS_BUTTON_CLICKED, this.onSettingsClicked, this);
        director.on(Constants.EventName.SETTINGS_BGM_CHANGED, this.onBgmSettingChanged, this);
        director.on(Constants.EventName.SETTINGS_SFX_CHANGED, this.onSfxSettingChanged, this);
        director.on(Constants.EventName.SHOW_HISTORY_CLICKED, this.onShowHistory, this);
        director.on(Constants.EventName.SHOW_RANKING_CLICKED, this.onShowRanking, this);
        director.on(Constants.EventName.CHALLENGE_BUTTON_CLICKED, this.onChallengeClicked, this);
        // 监听登录成功事件，以便在登录后加载云端进度或记录
        director.on(Constants.EventName.LOGIN_SUCCESS, this.onLoginSuccess, this);
    }

    private unbindEvents(): void {
        console.log('[GameManager] Unbinding events...');
        director.targetOff(this); // 移除所有以 this 为 target 的监听器
    }

    private onDifficultySelected(difficulty: DifficultyType): void {
        if (this._currentState !== GameState.MENU) {
            warn('[GameManager] 在非菜单状态下选择了难度，忽略。');
            return;
        }
        console.log(`[GameManager] 难度选择事件: ${difficulty}`);
        const highestCompletedRecord = this.findHighestCompletedLevel(difficulty);
        const startLevel = highestCompletedRecord
                           ? Math.min(highestCompletedRecord.levelIndex + 1, Constants.LEVELS_PER_DIFFICULTY)
                           : 1; // 如果该难度从未玩过，从第一关开始

        log(`[GameManager] 玩家在此难度最高完成至 ${highestCompletedRecord?.levelIndex ?? 0} 关，开始第 ${startLevel} 关。`);
        this.startNewGame(difficulty, startLevel);
    }

    private onGameOver(isWin: boolean): void {
        if (this._currentState !== GameState.PLAYING) return; // 只有在游戏中才能触发结束

        console.log(`[GameManager] 游戏结束事件: isWin=${isWin}`);
        this.stopTimer();

        if (isWin) {
            this.setGameState(GameState.LEVEL_COMPLETE);
            this.uiManager?.showWinAnimation();
            this.audioManager?.playSFX(Constants.AudioClipName.WIN);

            // 保存游戏结果到云端
            this.accountManager?.saveLevelResult(this._currentDifficulty!, this._currentLevelIndex, this._currentGameTime)
                .then(success => {
                    if (success) {
                        console.log('[GameManager] 关卡结果成功保存到云端。');
                    } else {
                         warn('[GameManager] 关卡结果保存到云端失败。');
                         // 可以考虑本地缓存或其他重试机制
                    }
                });

            // 清除本地未完成存档
            PersistenceManager.clearUnfinishedGame();

            // 延迟一段时间后自动进入下一关或返回菜单
            this.scheduleOnce(() => {
                if (this._currentLevelIndex < Constants.LEVELS_PER_DIFFICULTY) {
                    this.startNewGame(this._currentDifficulty!, this._currentLevelIndex + 1);
                } else {
                    console.log('[GameManager] 已完成当前难度的所有关卡！');
                    // TODO: 提示用户已通关该难度，并返回菜单
                    this.goToMenu();
                }
            }, 3.0); // 延迟 3 秒

        } else {
            // 失败逻辑 (目前数独没有明确的失败条件，除非是计时模式超时)
            this.setGameState(GameState.GAME_OVER);
            // TODO: 显示失败界面或提示
            this.goToMenu(); // 暂时返回菜单
        }
    }

    private onPauseResumeClicked(): void {
        if (this._currentState === GameState.PLAYING) {
            this.pauseGame();
        } else if (this._currentState === GameState.PAUSED) {
            this.resumeGame();
        } else {
            warn('[GameManager] 在非游戏或暂停状态下点击了暂停/恢复按钮。');
        }
    }

    private onSettingsClicked(): void {
        // 可以在暂停时打开设置，也可以在游戏时打开（会暂停游戏）
        if (this._currentState === GameState.PLAYING) {
            this.pauseGame(false); // 暂停游戏，但不显示广告层
        }
    }

    private onBgmSettingChanged(enabled: boolean): void {
        console.log(`[GameManager] BGM 设置改变: ${enabled}`);
        this.audioManager?.setBgmEnabled(enabled);
        // 保存设置
        const settings = PersistenceManager.loadSettings();
        settings.bgmEnabled = enabled;
        PersistenceManager.saveSettings(settings);
    }

     private onSfxSettingChanged(enabled: boolean): void {
        console.log(`[GameManager] SFX 设置改变: ${enabled}`);
        this.audioManager?.setSfxEnabled(enabled);
        // 保存设置
        const settings = PersistenceManager.loadSettings();
        settings.sfxEnabled = enabled;
        PersistenceManager.saveSettings(settings);
    }

     private async onShowHistory(): Promise<void> {
         if (!this.accountManager?.isLoggedIn()) {
             warn('[GameManager] 用户未登录，无法显示历史记录。');
             // TODO: 提示用户需要登录
             return;
         }
         console.log('[GameManager] 请求显示历史记录...');
         // 从 AccountManager 获取缓存的记录
         const records = this.accountManager.getAllLevelRecords();
         this.uiManager?.showHistoryPopup(records);
     }

     private async onShowRanking(): Promise<void> {
         if (!this.accountManager?.isLoggedIn()) {
             warn('[GameManager] 用户未登录，无法显示排行榜。');
             // TODO: 提示用户需要登录
             return;
         }
          console.log('[GameManager] 请求显示排行榜...');
          try {
              // 从 CloudService 获取排行榜数据
              const rankingData = await CloudService.fetchGlobalRanking();
              this.uiManager?.showRankingPopup(rankingData.ranks, rankingData.myRank);
          } catch (err) {
              error('[GameManager] 获取排行榜数据失败:', err);
              // TODO: 显示错误提示
          }
     }

     private onChallengeClicked(difficulty: DifficultyType, levelIndex: number): void {
         console.log(`[GameManager] 重新挑战请求: ${difficulty} - ${levelIndex}`);
         this.startNewGame(difficulty, levelIndex);
     }

     private onLoginSuccess(userId: string): void {
         console.log(`[GameManager] 登录成功事件，用户 ID: ${userId}`);
         // 登录成功后可以做一些事情，例如：
         // 1. 如果之前有未完成的游戏，检查 userId 是否匹配
         // 2. 如果当前在菜单界面，可以刷新显示的用户信息或记录入口状态
         // 3. 如果有关卡数据需要从云端加载，可以在这里触发
     }


    // --- 游戏流程控制 ---

    /**
     * 开始一个新游戏关卡。
     * @param difficulty 难度。
     * @param levelIndex 关卡序号 (1-based)。
     */
    public async startNewGame(difficulty: DifficultyType, levelIndex: number): Promise<void>  {
        log(`[GameManager] 开始新游戏: ${difficulty} - ${levelIndex}`);
        // 确保状态不是加载中，避免重复加载
        if (this._currentState === GameState.LOADING_LEVEL) {
            warn('[GameManager] 正在加载关卡中，请稍候...');
            return;
        }
        this.setGameState(GameState.LOADING_LEVEL);
        this.uiManager?.closeAllPopups();
        this.effectsManager?.stopWinEffect();

        this._currentDifficulty = difficulty;
        this._currentLevelIndex = levelIndex;
        this._currentGameTime = 0;

        try {
            // 异步生成或加载关卡数据
            const levelData = await this.loadLevelDataAsync(difficulty, levelIndex); // 使用 await
            if (!levelData) {
                throw new Error(`无法加载关卡数据: ${difficulty} - ${levelIndex}`);
            }

            this._currentLevelData = levelData;
            // 加载关卡到棋盘 (预设数字此时不显示)
            const boardDataClone = this.gridManager!.loadLevel(levelData);
            if (!boardDataClone) {
                throw new Error('棋盘管理器加载关卡失败！');
            }

            this.inputManager!.reset(boardDataClone);// 重置输入管理器状态，并传入棋盘数据副本
            this.uiManager?.updateTimer(this._currentGameTime);// 更新计时器显示为 00:00

            // --- 播放预设数字动画 ---
            log('[GameManager] 开始播放预设数字动画...');
            if (this.inputManager) this.inputManager.setInputEnabled(false); // 需要在 InputManager 添加此方法
            await this.gridManager!.revealPresetNumbersAnimated(15); // 等待动画完成，延迟 60ms
            log('[GameManager] 预设数字动画完成。');

             if (this.inputManager) this.inputManager.setInputEnabled(true);
            this.startTimer();
            this.setGameState(GameState.PLAYING);
            log('[GameManager] 关卡加载完成，游戏开始！');

        } catch (err) {
            error('[GameManager] 开始新游戏时发生错误:', err); // 加载或动画失败返回菜单
        }
    }

    /**
     * 继续之前保存的游戏。
     * @param savedProgress 本地存储的进度数据。
     */
    private continueSavedGame(savedProgress: LocalUserProgress): void {
        log('[GameManager] 继续已保存的游戏...');
        // 确保状态不是加载中
        if (this._currentState === GameState.LOADING_LEVEL) {
             warn('[GameManager] 正在加载关卡中，无法同时恢复游戏。');
             return;
        }
        this.setGameState(GameState.LOADING_LEVEL);
        this.uiManager?.closeAllPopups();
        this.effectsManager?.stopWinEffect();

        this._currentDifficulty = savedProgress.difficulty;
        this._currentLevelIndex = savedProgress.levelIndex;
        this._currentGameTime = savedProgress.elapsedTime;

        const pseudoLevelData: LevelData = {
            difficulty: savedProgress.difficulty,
            levelIndex: savedProgress.levelIndex,
            initialBoard: savedProgress.currentBoardState,
            emptyCellsCount: 0
        };

        const boardDataClone = this.gridManager!.loadLevel(pseudoLevelData);
        if (boardDataClone) {
            this.inputManager!.reset(cloneBoardData(savedProgress.currentBoardState));
            // --- 确保游戏 UI 显示 ---
            this.uiManager?.showGameUI(); // <--- 确保调用
            this.uiManager?.updateTimer(this._currentGameTime);
            this.uiManager?.updatePauseResumeButton(false); // 确保按钮是暂停状态
            this.startTimer();
            this.setGameState(GameState.PLAYING);
            log('[GameManager] 已恢复游戏进度。');
        } else {
             error('[GameManager] 棋盘管理器加载已保存的游戏失败！');
             PersistenceManager.clearUnfinishedGame();
             this.goToErrorState(); // 进入错误状态或返回菜单
        }
    }

    // --- 辅助方法 ---
    /**
     * 查找指定难度下已完成的最高关卡记录。
     * @param difficulty 难度。
     * @returns 返回最高关卡的 LevelRecord，如果该难度没有记录则返回 null。
     */
    private findHighestCompletedLevel(difficulty: DifficultyType): LevelRecord | null {
        const records = this.accountManager?.getAllLevelRecords();
        if (!records || records.length === 0) {
            return null;
        }

        let highestLevel = 0;
        let highestRecord: LevelRecord | null = null;

        for (const record of records) {
            if (record.difficulty === difficulty && record.levelIndex > highestLevel) {
                highestLevel = record.levelIndex;
                highestRecord = record;
            }
        }
        return highestRecord;
    }

    /**
     * 进入错误状态或返回菜单 (用于处理加载失败等情况)。
     */
    private goToErrorState(): void {
        // 可以选择显示一个错误提示，然后返回菜单
        // 或者直接返回菜单
        this.goToMenu();
    }

    /**
     * 异步加载关卡数据。优先尝试从 SudokuLogic 生成，可以扩展为从云端获取。
     */
    private async loadLevelDataAsync(difficulty: DifficultyType, levelIndex: number): Promise<LevelData | null> {
        console.log(`[GameManager] 异步加载关卡数据: ${difficulty} - ${levelIndex}`);
        

        // 方案一：本地生成
        const boardData = this._sudokuLogic!.generateSudoku(difficulty, levelIndex);
        if (boardData) {
            // 计算空格数
            let emptyCount = 0;
            for (let r = 0; r < Constants.GRID_SIZE; r++) {
                for (let c = 0; c < Constants.GRID_SIZE; c++) {
                    if (boardData.grid[r][c] === 0) {
                        emptyCount++;
                    }
                }
            }
            const levelData: LevelData = {
                difficulty: difficulty,
                levelIndex: levelIndex,
                initialBoard: boardData,
                emptyCellsCount: emptyCount
            };
            return levelData;
        } else {
            return null; // 生成失败
        }

        // 方案二：从云端获取 (如果需要)
        /*
        try {
            const levelData = await CloudService.fetchLevelData(difficulty, levelIndex);
            return levelData;
        } catch (err) {
            error(`[GameManager] 从云端获取关卡数据失败: ${difficulty}-${levelIndex}`, err);
            return null;
        }
        */
    }

    /**
     * 暂停游戏。
     * @param showAd 是否显示广告层，默认为 true。
     */
    public pauseGame(showAd: boolean = true): void {
        if (this._currentState !== GameState.PLAYING) return;
        console.log(`[GameManager] 暂停游戏. Show ad: ${showAd}`);
        this.setGameState(GameState.PAUSED);
        this.stopTimer();
        // this.audioManager?.pauseBGM(); // 暂停背景音乐
        this.uiManager?.updatePauseResumeButton(true); 

        if (showAd) {
            const adContainer = this.uiManager?.showAdOverlay();
        }
    }

    /**
     * 恢复游戏。
     */
    public resumeGame(): void {
        // 只有从暂停状态或设置弹窗打开的状态才能恢复
        if (this._currentState !== GameState.PAUSED && !this.isPopupActive(this.settingsPopupPrefab)) {
             warn(`[GameManager] 无法从当前状态 ${this._currentState} 恢复游戏。`);
             return;
        }

        console.log('[GameManager] 恢复游戏。');
        this.uiManager?.closeAllPopups(); // 关闭可能打开的设置弹窗
        this.uiManager?.hideAdOverlay(); // 隐藏广告层
        // director.emit(Constants.EventName.HIDE_AD); // 通知 AdManager 隐藏广告

        this.setGameState(GameState.PLAYING);
        this.startTimer();

        // this.audioManager?.resumeBGM();
        this.uiManager?.updatePauseResumeButton(false);
    }

     /**
     * 检查是否有指定类型的弹窗处于活动状态。
     * @param prefab 弹窗的 Prefab。
     */
    private isPopupActive(prefab: Prefab | null): boolean {
        if (!prefab) return false;
        return this.uiManager?.isPopupActive(prefab.name) ?? false; // 需要 UIManager 提供此接口
    }


    /**
     * 返回主菜单/难度选择界面。
     */
    public goToMenu(): void {
        console.log('[GameManager] 返回主菜单。');
        if (this._currentState !== GameState.MENU) {
            this.setGameState(GameState.MENU);
            this.stopTimer();
            this.uiManager?.showDifficultySelection(); // <--- 显示难度选择界面
            this._currentDifficulty = null;
            this._currentLevelIndex = 0;
            this._currentLevelData = null;
        }
    }

    /**
     * 保存当前游戏状态到本地 (用于中途退出)。
     */
    private saveCurrentGame(): void {
        if (this._currentState !== GameState.PLAYING && this._currentState !== GameState.PAUSED) {
            // console.log('[GameManager] 当前非游戏状态，无需保存。');
            return;
        }
        if (!this._currentDifficulty || !this._currentLevelData || !this.inputManager?.getCurrentBoardData()) {
            warn('[GameManager] 缺少必要数据，无法保存当前游戏。');
            return;
        }

        const progress: LocalUserProgress = {
            userId: this.accountManager?.getUserId() || null,
            difficulty: this._currentDifficulty,
            levelIndex: this._currentLevelIndex,
            currentBoardState: cloneBoardData(this.inputManager.getCurrentBoardData()), // 获取 InputManager 当前的棋盘状态副本
            elapsedTime: this._currentGameTime
        };
        PersistenceManager.saveUnfinishedGame(progress);
        console.log('[GameManager] 当前游戏状态已保存到本地。');
    }

    // --- 计时器 ---
    private startTimer(): void {
        this.stopTimer(); // 先停止旧的计时器
        console.log('[GameManager] 启动计时器。');
        this._timerIntervalId = setInterval(() => {
            this._currentGameTime++;
            this.uiManager?.updateTimer(this._currentGameTime);
        }, 1000);
    }

    private stopTimer(): void {
        if (this._timerIntervalId !== -1) {
            console.log('[GameManager] 停止计时器。');
            clearInterval(this._timerIntervalId);
            this._timerIntervalId = -1;
        }
    }

    // --- 状态管理 ---
    private setGameState(newState: GameState): void {
        if (this._currentState === newState) return;
        console.log(`[GameManager] 状态改变: ${GameState[this._currentState]} -> ${GameState[newState]}`);
        this._currentState = newState;
        // 可以在这里根据状态变化执行一些通用逻辑
        // 例如，离开 PLAYING 或 PAUSED 状态时自动保存游戏
        if (newState !== GameState.PLAYING && newState !== GameState.PAUSED) {
             this.saveCurrentGame();
        }
    }

    // --- 小游戏生命周期回调 ---
    // Cocos Creator 默认不直接处理小游戏 onShow/onHide，
    // 需要在 app.js 或入口脚本中监听并调用 GameManager 的方法。
    /**
     * 处理小游戏切换到前台的事件。
     */
    public onGameShow(): void {
        console.log('[GameManager] 游戏切换到前台 (onShow)');
        // 如果之前是暂停状态（因为切换到后台），则恢复游戏
        // 需要一个标记来判断是否是因为切后台导致的暂停
        // if (this._pausedByHide) {
        //     this.resumeGame();
        //     this._pausedByHide = false;
        // }
        // 或者简单地恢复 BGM
        if (this._currentState === GameState.PLAYING || this._currentState === GameState.PAUSED) {
             this.audioManager?.resumeBGM();
        }
    }

    /**
     * 处理小游戏切换到后台的事件。
     */
    public onGameHide(): void {
        console.log('[GameManager] 游戏切换到后台 (onHide)');
        // 自动暂停游戏并保存进度
        if (this._currentState === GameState.PLAYING) {
            // this._pausedByHide = true; // 设置标记
            this.pauseGame(false); // 暂停游戏，不显示广告
            this.saveCurrentGame(); // 保存进度
        } else if (this._currentState === GameState.PAUSED) {
             // 如果已经是暂停状态，确保进度已保存
             this.saveCurrentGame();
        }
         // 暂停 BGM
         this.audioManager?.pauseBGM();
    }
}

// --- 在 app.js 或入口脚本中添加监听 ---
/*
// app.js
import { GameManager } from './assets/scripts/managers/GameManager'; // 假设路径正确

App({
  onLaunch() {
    // ... wx.cloud.init ...
  },
  onShow() {
    console.console.log('App onShow');
    // 确保 GameManager 实例已创建
    if (GameManager.instance) {
      GameManager.instance.onGameShow();
    }
  },
  onHide() {
    console.console.log('App onHide');
    // 确保 GameManager 实例已创建
    if (GameManager.instance) {
      GameManager.instance.onGameHide();
    }
  }
})
*/

/**
 Singleton & Persistence: 标准实现。
管理器引用: 使用 @property 暴露了对其他核心管理器的引用，需要在编辑器中正确链接。
游戏状态机 (GameState): 定义了一个枚举 GameState 来管理游戏的不同阶段，并通过 _currentState 变量跟踪当前状态。setGameState 方法用于安全地切换状态并记录日志。
核心状态变量:
_currentDifficulty, _currentLevelIndex, _currentLevelData: 存储当前关卡的信息。
_currentGameTime: 记录当前关卡的游戏时间。
_timerIntervalId: 用于管理计时器的 setInterval ID。
初始化流程 (onLoad, start):
onLoad 负责单例设置、持久化和检查引用。
start 是核心初始化入口，按顺序执行：加载设置 -> 初始化 AudioManager -> 初始化 EffectsManager -> 初始化 UIManager 并加载资源 -> 初始化 GridManager -> 初始化 InputManager -> 初始化 AccountManager -> 尝试自动登录 -> 检查并恢复存档或进入菜单。使用了 async/await 来处理异步操作。
事件驱动: 通过 bindEvents 和 unbindEvents 监听和解绑来自其他模块的关键事件，如难度选择、游戏结束、按钮点击、设置更改等。事件处理函数 (onDifficultySelected, onGameOver, etc.) 负责根据事件触发相应的游戏流程。
游戏流程控制方法:
startNewGame: 处理开始新关卡的逻辑，包括加载数据、重置管理器、切换 UI、启动计时器。
continueSavedGame: 处理恢复已保存游戏的逻辑，加载存档数据并恢复游戏状态。
loadLevelDataAsync: 封装了加载关卡数据的逻辑（目前是本地生成，可扩展为云端获取）。
pauseGame, resumeGame: 处理游戏的暂停和恢复，包括计时器、音频、UI 状态和广告层的控制。
goToMenu: 处理返回主菜单的逻辑。
saveCurrentGame: 将当前游戏状态（难度、关卡、棋盘、时间）保存到本地存储。
计时器 (startTimer, stopTimer): 使用 setInterval 实现秒级计时器，并更新 UI 显示。
小游戏生命周期 (onGameShow, onGameHide): 提供了处理微信小游戏切换前后台事件的方法。注意： 这些方法需要你在小程序的 app.js 或其他入口脚本中监听 wx.onShow 和 wx.onHide 并调用 GameManager.instance 的对应方法来实现。代码末尾提供了 app.js 的示例。
错误处理与日志: 在关键流程和异步操作中添加了日志和错误处理。
GameManager 是所有模块的粘合剂，它的逻辑相对复杂，因为它需要协调所有其他部分。请仔细检查其状态转换、事件处理和与其他管理器的交互逻辑。
*/