// assets/scripts/managers/UIManager.ts

import { _decorator, Component, Node, Label, Button, Prefab, Sprite, director, warn, error, instantiate, isValid, SpriteFrame, resources, Vec3 , UIOpacity,tween} from 'cc';
import { Constants, DifficultyType } from '../utils/Constants';
import { SettingsData } from '../data/SettingsData';
import { LevelRecord, RankingEntry } from '../data/UserData';
import { EffectsManager } from './EffectsManager'; // 需要 EffectsManager 实例来播放动画
import { GridManager } from './GridManager'; 
import { NumberButton } from '../components/NumberButton'; // 引入 NumberButton 组件
import { PersistenceManager } from '../services/PersistenceManager';
import { SettingsPopupController } from '../components/SettingsPopupController';
import { HistoryPopupController } from '../components/HistoryPopupController';
import { RankingPopupController } from '../components/RankingPopupController';

const { ccclass, property } = _decorator;

@ccclass('UIManager')
export class UIManager extends Component {

    // --- 节点引用 (需要在编辑器中拖拽赋值) ---

    // 顶栏 UI
    @property({ type: Label, tooltip: "显示计时器的 Label 组件" })
    private timerLabel: Label | null = null;
    @property({ type: Button, tooltip: "暂停/恢复按钮" })
    private pauseResumeButton: Button | null = null;
    @property({ type: Sprite, tooltip: "暂停/恢复按钮的图标 Sprite" })
    private pauseResumeIcon: Sprite | null = null; // 用于切换图标
    @property({ type: Button, tooltip: "设置按钮" })
    private settingsButton: Button | null = null;

    // 棋盘区域 (GridManager 挂载点)
    @property({ type: Node, tooltip: "棋盘容器节点 (GridManager 挂载点)" })
    private gameBoardNode: Node | null = null; // GridManager 实例会挂载在这个节点

    // 难度选择区域
    @property({ type: Node, tooltip: "难度选择按钮的容器节点" })
    private difficultySelectorNode: Node | null = null;
    // (可以为每个难度按钮单独设置属性，或通过 getChildByName 查找)
    @property({ type: Button, tooltip: "入门难度按钮" }) entryButton: Button | null = null;
    @property({ type: Button, tooltip: "初级难度按钮" }) easyButton: Button | null = null;
    @property({ type: Button, tooltip: "中级难度按钮" }) mediumButton: Button | null = null;
    @property({ type: Button, tooltip: "高级难度按钮" }) hardButton: Button | null = null;
    @property({ type: Button, tooltip: "大师级难度按钮" }) masterButton: Button | null = null;


    // 输入控制区域
    @property({ type: Node, tooltip: "数字输入按钮 (1-9) 的容器节点" })
    private numberPadNode: Node | null = null;
    private _numberButtonComponents: Map<number, NumberButton> = new Map(); // 缓存 NumberButton 组件实例

    @property({ type: Button, tooltip: "清除按钮" })
    private clearButton: Button | null = null;
    @property({ type: Button, tooltip: "撤销按钮" })
    private undoButton: Button | null = null;
    @property({ type: Button, tooltip: "恢复按钮" })
    private redoButton: Button | null = null;

    // 弹窗 Prefab
    @property({ type: Prefab, tooltip: "设置弹窗预制件" })
    private settingsPopupPrefab: Prefab | null = null;
    @property({ type: Prefab, tooltip: "关卡记录弹窗预制件" })
    private historyPopupPrefab: Prefab | null = null;
    @property({ type: Prefab, tooltip: "排行榜弹窗预制件" })
    private rankingPopupPrefab: Prefab | null = null;
    @property({ type: Prefab, tooltip: "关卡记录列表项预制件" })
    private recordItemPrefab: Prefab | null = null;
    @property({ type: Prefab, tooltip: "排行榜列表项预制件" })
    private rankItemPrefab: Prefab | null = null;

    // 广告遮罩层
    @property({ type: Node, tooltip: "广告遮罩层节点" })
    private adOverlayNode: Node | null = null;
    @property({ type: Node, tooltip: "广告实际挂载的容器节点 (在遮罩层内)" })
    private adContainerNode: Node | null = null; // AdManager 会用到

    // 底部导航栏 (可选)
    @property({ type: Node, tooltip: "底部导航栏容器 (可选)" })
    private bottomNavBarNode: Node | null = null;
    @property({ type: Button, tooltip: "显示记录按钮 (可选)" })
    private historyNavButton: Button | null = null;
    @property({ type: Button, tooltip: "显示排行按钮 (可选)" })
    private rankingNavButton: Button | null = null;


    // --- 内部状态 ---
    private _isInitialized: boolean = false;
    private _activePopups: Node[] = []; // 存储当前打开的弹窗节点
    private loadedSpriteFrames: Map<string, SpriteFrame> = new Map(); // 缓存加载的 SpriteFrame
    private loadedNumberFrames: Map<number, SpriteFrame> = new Map(); // 缓存加载的数字 SpriteFrame
    private loadedIconFrames: Map<string, SpriteFrame> = new Map(); // 缓存加载的图标 SpriteFrame

    // --- 依赖 ---
    private gridManager: GridManager | null = null; // GridManager 实例
    private effectsManager: EffectsManager | null = null; // EffectsManager 实例

    // --- 初始化与资源加载 ---

     /**
     * 初始化 UIManager，获取节点引用，绑定事件监听，并设置初始 UI 状态。
     * @param gridManager GridManager 实例
     * @param effectsManager EffectsManager 实例
     */
     public initialize(gridManager: GridManager, effectsManager: EffectsManager): void {
        if (this._isInitialized) {
            warn('[UIManager] UIManager 已初始化，跳过。');
            return;
        }
        console.log('[UIManager] Initializing...');
        this.gridManager = gridManager;
        this.effectsManager = effectsManager;

        if (!this.gridManager || !this.effectsManager) {
            error('[UIManager] 初始化失败: 缺少必要的管理器实例。');
            return;
        }

        // 查找并缓存数字按钮及其背景 Sprite
        this.cacheNumberButtons();

        // 绑定 UI 按钮事件
        this.bindButtonEvents();

        // 设置初始 UI 元素的可见性状态
        this.setupInitialUIState(); // <--- 调用新的辅助方法

        this._isInitialized = true;
        console.log('[UIManager] 初始化成功。');
    }

     /**
     * 查找并缓存数字按钮的 NumberButton 组件实例。
     * @private
     */
     private cacheNumberButtons(): void {
        console.log('[UIManager] 缓存数字按钮...');
        if (this.numberPadNode) {
            this._numberButtonComponents.clear(); // 清空旧缓存
 
            this.numberPadNode.getComponentsInChildren(NumberButton).forEach(button => {
                console.log(`[UIManager] 缓存了数字按钮 ${button.getNumber()} 的 NumberButton 组件。`);
                button.setState(false);
                this._numberButtonComponents.set(button.getNumber(), button);
            })
        } else {
            console.warn('[UIManager] NumberPadNode 未在编辑器中设置。');
        }
    }

    /**
     * 设置初始 UI 状态，确保正确的元素在开始时可见/隐藏。
     * @private
     */
    private setupInitialUIState(): void {
        console.log('[UIManager] 设置初始 UI 状态...');

        // 检查并确保广告层初始隐藏
        if (this.adOverlayNode) {
            this.adOverlayNode.active = false;
        } else {
            console.warn('[UIManager] AdOverlayNode 未在编辑器中设置，无法设置初始状态。');
        }

        this._activePopups = []; // 确保活动弹窗列表为空
        console.log('[UIManager] 初始 UI 状态设置完成。');
    }


    /**
     * 预加载 UI 和格子相关的 SpriteFrame 资源。
     * 应在游戏加载阶段调用。
     */
    public async preloadAssets(): Promise<void> {
        console.log('[UIManager] Preloading UI assets...');
        const loadPromises: Promise<any>[] = [];

        // --- 定义需要加载的资源路径 ---
        const frameResources = {
            // 格子背景
            [Constants.SpriteFrameName.CELL_PRESET_BG]: `textures/game/${Constants.SpriteFrameName.CELL_PRESET_BG}/spriteFrame`,
            [Constants.SpriteFrameName.CELL_USER_BG]: `textures/game/${Constants.SpriteFrameName.CELL_USER_BG}/spriteFrame`,
            // 图标
            [Constants.IconName.PAUSE]: `textures/ui/${Constants.IconName.PAUSE}/spriteFrame`,
            [Constants.IconName.RESUME]: `textures/ui/${Constants.IconName.RESUME}/spriteFrame`,
            [Constants.SpriteFrameName.DEFAULT_AVATAR]: `textures/ui/${Constants.SpriteFrameName.DEFAULT_AVATAR}/spriteFrame`
            // ... 其他需要的 SpriteFrame ...
        };
        const numberResources = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // --- 加载 SpriteFrame ---
        for (const name in frameResources) {
            const path = frameResources[name];
            loadPromises.push(new Promise((resolve) => {
                resources.load(path, SpriteFrame, (err, frame) => {
                    if (err || !frame) {
                        console.error(`[UIManager] 加载 SpriteFrame 失败: ${path}`, err);
                    } else {
                        this.loadedSpriteFrames.set(name, frame);
                        // --- 缓存特定用途的 Frame ---
                        if (name === Constants.SpriteFrameName.NUM_BTN_VALID_BG) {
                            this._validNumPadFrame = frame;
                        } else if (name === Constants.SpriteFrameName.NUM_BTN_INVALID_BG) {
                            this._invalidNumPadFrame = frame;
                        }
                        // ... (缓存其他图标等) ...
                    }
                    resolve(null);
                });
            }));
        }

        // --- 加载数字 SpriteFrame ---
        for (const num of numberResources) {
            const path = `textures/game/numbers/${num}/spriteFrame`; // 假设路径
            loadPromises.push(new Promise((resolve) => {
                resources.load(path, SpriteFrame, (err, frame) => {
                    if (err || !frame) {
                        console.error(`[UIManager] 加载数字 SpriteFrame 失败: ${path}`, err);
                    } else {
                        this.loadedNumberFrames.set(num, frame);
                    }
                    resolve(null);
                });
            }));
        }

        await Promise.all(loadPromises);
        console.log('[UIManager] UI assets preloaded.');
    }

    /**
     * 获取缓存的 SpriteFrame。
     * @param name SpriteFrame 的名称 (来自 Constants.SpriteFrameName 或 Constants.IconName)。
     */
    public getSpriteFrame(name: string): SpriteFrame | null {
        return this.loadedSpriteFrames.get(name) || null;
    }

    /**
     * 获取缓存的数字 SpriteFrame。
     * @param num 数字 (1-9)。
     */
    public getNumberSpriteFrame(num: number): SpriteFrame | null {
        return this.loadedNumberFrames.get(num) || null;
    }

    /**
     * 获取缓存的图标 SpriteFrame。
     * @param name 图标名称 (来自 Constants.IconName)。
     */
    public getIconFrame(name: string): SpriteFrame | null {
        return this.loadedIconFrames.get(name) || null;
    }


    // --- 事件绑定 ---
    private bindButtonEvents(): void {
        console.log('[UIManager] Binding button events...');

        // 顶栏按钮
        this.pauseResumeButton?.node.on(Button.EventType.CLICK, this.onPauseResumeClick, this);
        this.settingsButton?.node.on(Button.EventType.CLICK, this.onSettingsClick, this);

        // 难度选择按钮
        this.entryButton?.node.on(Button.EventType.CLICK, () => this.onDifficultySelect(Constants.Difficulty.ENTRY), this);
        this.easyButton?.node.on(Button.EventType.CLICK, () => this.onDifficultySelect(Constants.Difficulty.EASY), this);
        this.mediumButton?.node.on(Button.EventType.CLICK, () => this.onDifficultySelect(Constants.Difficulty.MEDIUM), this);
        this.hardButton?.node.on(Button.EventType.CLICK, () => this.onDifficultySelect(Constants.Difficulty.HARD), this);
        this.masterButton?.node.on(Button.EventType.CLICK, () => this.onDifficultySelect(Constants.Difficulty.MASTER), this);


        // 数字输入按钮 - 现在通过 NumberButton 组件间接绑定或直接在 UIManager 处理
        // 如果 NumberButton 内部处理点击并发出事件，这里就不需要绑定了
        // 如果 UIManager 统一处理，则需要获取 Button 组件来绑定
        this._numberButtonComponents.forEach((numButtonComp, number) => {
            const buttonComp = numButtonComp.getComponent(Button);
            buttonComp?.node.on(Button.EventType.CLICK, () => this.onNumberPadClick(number), this);
       });
        // 功能按钮
        this.clearButton?.node.on(Button.EventType.CLICK, this.onClearClick, this);
        this.undoButton?.node.on(Button.EventType.CLICK, this.onUndoClick, this);
        this.redoButton?.node.on(Button.EventType.CLICK, this.onRedoClick, this);

        // 底部导航按钮 (可选)
        this.historyNavButton?.node.on(Button.EventType.CLICK, this.onHistoryNavClick, this);
        this.rankingNavButton?.node.on(Button.EventType.CLICK, this.onRankingNavClick, this);

    }

    // --- 按钮点击处理函数 (发布事件) ---

    private onPauseResumeClick(): void {
        console.log('[UIManager] Pause/Resume button clicked.');
        // 判断当前状态并发出相应事件
        // 这个状态应该由 GameManager 管理，UIManager 只负责发出点击事件
        // 假设 GameManager 会根据当前状态决定是暂停还是恢复
        director.emit(Constants.EventName.PAUSE_RESUME_BUTTON_CLICKED); // GameManager 监听此事件
    }

    private onSettingsClick(): void {
        console.log('[UIManager] Settings button clicked.');
        director.emit(Constants.EventName.SETTINGS_BUTTON_CLICKED); // GameManager 或直接 UIManager 处理显示弹窗
        this.showSettingsPopup(PersistenceManager.loadSettings()); // UIManager 直接处理显示
    }

    private onDifficultySelect(difficulty: DifficultyType): void {
        console.log(`[UIManager] Difficulty selected: ${difficulty}`);
        director.emit(Constants.EventName.DIFFICULTY_SELECTED, difficulty); // GameManager 监听
    }

    private onNumberPadClick(num: number): void {
        director.emit(Constants.EventName.NUMBER_INPUT, num); // InputManager 监听
    }

    private onClearClick(): void {
        console.log('[UIManager] Clear button clicked.');
        director.emit(Constants.EventName.CLEAR_BUTTON_CLICKED); // InputManager 监听
    }

    private onUndoClick(): void {
        console.log('[UIManager] Undo button clicked.');
        director.emit(Constants.EventName.UNDO_BUTTON_CLICKED); // InputManager 监听
    }

    private onRedoClick(): void {
        console.log('[UIManager] Redo button clicked.');
        director.emit(Constants.EventName.REDO_BUTTON_CLICKED); // InputManager 监听
    }

     private onHistoryNavClick(): void {
        console.log('[UIManager] History nav button clicked.');
        director.emit(Constants.EventName.SHOW_HISTORY_CLICKED); // GameManager 监听，获取数据后调用 UIManager 显示
    }

     private onRankingNavClick(): void {
        console.log('[UIManager] Ranking nav button clicked.');
        director.emit(Constants.EventName.SHOW_RANKING_CLICKED); // GameManager 监听，获取数据后调用 UIManager 显示
    }


    // --- UI 更新方法 ---

    /**
     * 更新计时器显示。
     * @param seconds 总秒数。
     */
    public updateTimer(seconds: number): void {
        if (!this.timerLabel) return;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        this.timerLabel.string = timeString;
    }

    /**
     * 更新暂停/恢复按钮的图标和状态。
     * @param isPaused 当前是否处于暂停状态。
     */
    public updatePauseResumeButton(isPaused: boolean): void {
        if (!this.pauseResumeIcon) return;
        const iconName = isPaused ? Constants.IconName.RESUME : Constants.IconName.PAUSE;
        const iconFrame = this.getIconFrame(iconName);
        if (iconFrame) {
            this.pauseResumeIcon.spriteFrame = iconFrame;
        } else {
            warn(`[UIManager] 图标 SpriteFrame 未找到: ${iconName}`);
        }
    }

    /**
     * 更新撤销和恢复按钮的可交互状态。
     * @param canUndo 是否可以撤销。
     * @param canRedo 是否可以恢复。
     */
    public updateUndoRedoButtons(canUndo: boolean, canRedo: boolean): void {
        if (this.undoButton) this.undoButton.interactable = canUndo;
        if (this.redoButton) this.redoButton.interactable = canRedo;
        // 可以同时改变按钮透明度等视觉效果
        if (this.undoButton) {
// 假设 UIOpacity 来自 cc 模块，添加导入语句
// 修改后的代码
        const undoOpacity = this.undoButton?.node.getComponent(UIOpacity);
            if (undoOpacity) {
                undoOpacity.opacity = canUndo ? 255 : 128;
            }
        }
        if (this.redoButton){
            const redoOpacity = this.redoButton.node.getComponent(UIOpacity);
            if (redoOpacity) {
                redoOpacity.opacity = canRedo ? 255 : 128;
            }
        }
    }

    /**
     * 更新数字输入面板按钮的可用状态 (根据当前选中格子)。
     * (优化后版本)
     * @param validNumbers 包含有效候选数字的数组。如果数组为空，则所有按钮恢复默认/可用状态。
     */
    public updateNumberPadState(validNumbers: number[]): void {
        const validSet = new Set(validNumbers);
        const isValidInputAvailable = validNumbers.length > 0;

        this._numberButtonComponents.forEach((numButtonComp, number) => {
            const isButtonValid = isValidInputAvailable && validSet.has(number);
            numButtonComp.setState(isButtonValid);
        });
    }

    /**
     * 高亮指定的格子。
     * @param row 行
     * @param col 列
     */
    public highlightCell(row: number, col: number): void {
        this.gridManager?.highlightCell(row, col);
    }

    /**
     * 取消格子高亮。
     */
    public deselectCell(): void {
        this.gridManager?.deselectCell();
    }


    // --- 动画播放 (由 InputManager 调用) ---

    /**
     * 播放数字出现的动画。
     * @param row 行
     * @param col 列
     * @param num 要显示的数字
     * @param callback 动画完成回调
     */
    public playInputAnimation(row: number, col: number, num: number, callback?: () => void): void {
        console.log(`[UIManager] 播放数字输入动画: (${row}, ${col}) -> ${num}`);
        this.gridManager?.updateCellDisplay(row, col, num, false); // 立即更新显示
        this.effectsManager?.animateNumberAppear(this.gridManager?.getCellNode(row, col)!, callback);
    }

    /**
     * 播放数字消失的动画。
     * @param row 行
     * @param col 列
     * @param callback 动画完成回调
     */
    public playClearAnimation(row: number, col: number, callback?: () => void): void {
        console.log(`[UIManager] 播放数字消失动画: (${row}, ${col})`);
        this.gridManager?.updateCellDisplay(row, col, 0, false); 
        this.effectsManager?.animateNumberDisappear(this.gridManager?.getCellNode(row, col)!, callback);
    }

    /**
     * 播放胜利动画（粒子效果）。
     */
    public showWinAnimation(): void {
        console.log('[UIManager] 播放胜利动画。this node is: ', this.node.name);
        this.effectsManager?.playWinEffect(this.node); // 添加到 UIManager 所在的 Canvas 节点
    }

    /**
     * 显示难度选择界面，隐藏游戏主界面。
     */
    public showDifficultySelection(): void {
        console.log('[UIManager] 显示难度选择界面。');
        // 清理可能残留的状态
        this.deselectCell(); // 清除格子高亮
        this.closeAllPopups(); // 关闭所有弹窗
        // 注意：停止胜利效果应该由 GameManager 在状态切换时处理
    }


    // --- 弹窗管理 ---

    /**
     * 显示设置弹窗。
     * @param initialSettings 当前的设置数据，用于初始化弹窗内的开关状态。
     */
    public showSettingsPopup(initialSettings?: SettingsData): void {
        console.log('[UIManager] 准备显示设置弹窗。');
        this.showPopup(this.settingsPopupPrefab, (popupNode) => {
            // --- 初始化弹窗内容 ---
            const controller = popupNode.getComponent(SettingsPopupController); 
            controller?.init(this);
            controller?.show(initialSettings);
        });
    }

    /**
     * 显示关卡记录弹窗。
     * @param records 关卡记录数组。
     */
    public showHistoryPopup(records: LevelRecord[]): void {
        this.showPopup(this.historyPopupPrefab, (popupNode) => {
            // const contentNode = popupNode.getChildByName('Panel')?.getChildByName('ScrollView')?.getChildByName('view')?.getChildByName('content');
            // const closeButton = popupNode.getChildByName('Panel')?.getChildByName('CloseButton')?.getComponent(Button);

            // if (!contentNode || !this.recordItemPrefab) {
            //     error('[UIManager] 历史记录弹窗结构不完整或缺少列表项 Prefab。');
            //     this.closePopup(popupNode); // 关闭无效弹窗
            //     return;
            // }

            // contentNode.removeAllChildren(); // 清空旧记录

            // if (records.length === 0) {
            //     // 显示空状态提示 (可以添加一个 Label)
            //     console.log('[UIManager] 没有关卡记录可显示。');
            // } else {
            //     // 按难度排序，再按关卡序号排序 (可选)
            //     records.sort((a, b) => {
            //         const diffOrder = [Constants.Difficulty.ENTRY, Constants.Difficulty.EASY, Constants.Difficulty.MEDIUM, Constants.Difficulty.HARD, Constants.Difficulty.MASTER];
            //         const diffCompare = diffOrder.indexOf(a.difficulty) - diffOrder.indexOf(b.difficulty);
            //         if (diffCompare !== 0) return diffCompare;
            //         return a.levelIndex - b.levelIndex;
            //     });

            //     // 填充记录列表
            //     for (const record of records) {
            //         const itemNode = instantiate(this.recordItemPrefab);
            //         this.populateRecordItem(itemNode, record);
            //         contentNode.addChild(itemNode);
            //     }
            // }

            // // 绑定关闭按钮事件
            // closeButton?.node.on(Button.EventType.CLICK, () => {
            //     this.closePopup(popupNode);
            // }, this);
            const controller = popupNode.getComponent(HistoryPopupController); 
            controller?.init(this);
            controller?.show(records);
        });
    }

     /**
     * 填充单个关卡记录项的数据。
     * @param itemNode 记录项的节点。
     * @param recordData 记录数据。
     */
    private populateRecordItem(itemNode: Node, recordData: LevelRecord): void {
        const difficultyLabel = itemNode.getChildByName('DifficultyLabel')?.getComponent(Label);
        const levelLabel = itemNode.getChildByName('LevelLabel')?.getComponent(Label);
        const timeLabel = itemNode.getChildByName('BestTimeLabel')?.getComponent(Label);
        const dateLabel = itemNode.getChildByName('DateLabel')?.getComponent(Label);
        const challengeButton = itemNode.getChildByName('ChallengeButton')?.getComponent(Button);

        if (difficultyLabel) difficultyLabel.string = recordData.difficulty;
        if (levelLabel) levelLabel.string = `第 ${recordData.levelIndex} 关`;
        if (timeLabel) {
             const minutes = Math.floor(recordData.bestTimeSeconds / 60);
             const seconds = recordData.bestTimeSeconds % 60;
             timeLabel.string = `最佳: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        if (dateLabel) {
            const date = new Date(recordData.firstCompletionTimestamp);
            dateLabel.string = `完成于: ${date.toLocaleDateString()}`; // 格式化日期
        }
        if (challengeButton) {
            challengeButton.node.off(Button.EventType.CLICK); // 移除旧监听器
            challengeButton.node.on(Button.EventType.CLICK, () => {
                console.log(`[UIManager] Challenge button clicked for ${recordData.difficulty} - ${recordData.levelIndex}`);
                director.emit(Constants.EventName.CHALLENGE_BUTTON_CLICKED, recordData.difficulty, recordData.levelIndex); // GameManager 监听
                this.closeAllPopups(); // 关闭弹窗开始挑战
            }, this);
        }
    }


    /**
     * 显示排行榜弹窗。
     * @param ranks 排行榜条目数组。
     * @param myRank 当前用户的排名信息 (可选)。
     */
    public showRankingPopup(ranks: RankingEntry[], myRank?: RankingEntry): void {
         this.showPopup(this.rankingPopupPrefab, (popupNode) => {
            const controller = popupNode.getComponent(RankingPopupController); 
            controller?.init(this);
            controller?.show(ranks);
            

            //  // 绑定关闭按钮
            //  closeButton?.node.on(Button.EventType.CLICK, () => {
            //      this.closePopup(popupNode);
            //  }, this);
         });
    }

    /**
     * 填充单个排行榜项的数据。
     * @param itemNode 排行榜项的节点。
     * @param rankData 排名数据。
     * @param isMyRank 是否是当前用户的排名项。
     */
    private populateRankItem(itemNode: Node, rankData: RankingEntry, isMyRank: boolean): void {
        const rankLabel = itemNode.getChildByName('RankLabel')?.getComponent(Label);
        const avatarSprite = itemNode.getChildByName('Avatar')?.getComponent(Sprite); // 需要处理头像加载
        const nicknameLabel = itemNode.getChildByName('NicknameLabel')?.getComponent(Label);
        const scoreLabel = itemNode.getChildByName('ScoreLabel')?.getComponent(Label);

        if (rankLabel) rankLabel.string = isMyRank ? `我的排名: ${rankData.rank}` : `${rankData.rank}`;
        if (nicknameLabel) nicknameLabel.string = rankData.nickname || '匿名用户';
        if (scoreLabel) scoreLabel.string = `通关: ${rankData.score}`; // 假设分数是通关数

        // --- 处理头像加载 ---
        if (avatarSprite) {
            if (rankData.avatarUrl) {
                // 注意：微信小游戏加载远程图片需要配置 downloadFile 合法域名
                assetManager.loadRemote<ImageAsset>(rankData.avatarUrl, { ext: '.png' }, (err, imageAsset) => {
                    if (!err && isValid(avatarSprite.node)) { // 检查节点是否仍然有效
                        const spriteFrame = SpriteFrame.createWithImage(imageAsset);
                        avatarSprite.spriteFrame = spriteFrame;
                    } else {
                        // 加载失败或节点失效，可以设置默认头像
                        const defaultAvatarFrame = this.getSpriteFrame(Constants.SpriteFrameName.DEFAULT_AVATAR); // 需要预加载默认头像
                        if (defaultAvatarFrame) avatarSprite.spriteFrame = defaultAvatarFrame;
                        // error(`[UIManager] 加载头像失败: ${rankData.avatarUrl}`, err);
                    }
                });
            } else {
                // 没有头像 URL，设置默认头像
                const defaultAvatarFrame = this.getSpriteFrame(Constants.SpriteFrameName.DEFAULT_AVATAR);
                if (defaultAvatarFrame) avatarSprite.spriteFrame = defaultAvatarFrame;
            }
        }
    }


    /**
     * 通用的显示弹窗方法。
     * @param prefab 要实例化的弹窗 Prefab。
     * @param initCallback (可选) 弹窗节点创建后的初始化回调，用于设置内容和绑定事件。
     */
    private showPopup(prefab: Prefab | null, initCallback?: (popupNode: Node) => void): void {
        if (!prefab) {
            error('[UIManager] 尝试显示一个空的弹窗 Prefab。');
            return;
        }
        if (!this.node) {
             error('[UIManager] UIManager 节点无效，无法添加弹窗。');
             return;
        }

        const popupNode = instantiate(prefab);
        if (!popupNode) {
             error('[UIManager] 实例化弹窗 Prefab 失败。');
             return;
        }

        // 将弹窗添加到 Canvas 下
        this.node.addChild(popupNode);
        this._activePopups.push(popupNode); // 记录打开的弹窗

        // 执行初始化回调
        if (initCallback) {
            initCallback(popupNode);
        }

        // (可选) 播放弹窗打开动画
        popupNode.setScale(0.5, 0.5);
        const popupBg = popupNode.getComponent(UIOpacity);
        if (popupBg) {
            popupBg.opacity = 0;
        }
        tween(popupNode)
            .to(0.2, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
            .start();
        tween(popupNode.getComponent(UIOpacity) || popupNode.addComponent(UIOpacity))
             .to(0.2, { opacity: 255 })
             .start();

        console.log(`[UIManager] 显示弹窗: ${prefab.name}`);
    }

    /**
     * 关闭指定的弹窗。
     * @param popupNode 要关闭的弹窗节点。
     */
    public closePopup(popupNode: Node): void {
        if (!isValid(popupNode)) return;

        const index = this._activePopups.indexOf(popupNode);
        if (index > -1) {
            this._activePopups.splice(index, 1); // 从记录中移除
        }

        // 播放关闭动画，动画结束后销毁节点
        tween(popupNode)
            .to(0.15, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'backIn' })
            .call(() => {
                if (isValid(popupNode)) {
                    popupNode.destroy();
                    console.log(`[UIManager] 关闭弹窗: ${popupNode.name}`);
                }
            })
            .start();
         tween(popupNode.getComponent(UIOpacity) || popupNode.addComponent(UIOpacity))
             .to(0.15, { opacity: 0 })
             .start();
    }

    /**
     * 关闭所有当前打开的弹窗。
     */
    public closeAllPopups(): void {
        console.log('[UIManager] 关闭所有弹窗。');
        // 创建副本进行遍历，因为 closePopup 会修改 _activePopups 数组
        const popupsToClose = [...this._activePopups];
        popupsToClose.forEach(popup => this.closePopup(popup));
        this._activePopups = []; // 确保清空
    }

    // --- 广告层控制 ---

    /**
     * 显示广告遮罩层。
     * @returns 返回用于挂载广告组件的容器节点。
     */
    public showAdOverlay(): Node | null {
        if (this.adOverlayNode) {
            console.log('[UIManager] 显示广告遮罩层。');
            this.adOverlayNode.active = true;
            // (可选) 播放缓动动画显示
            return this.adContainerNode; // 返回给 AdManager 挂载广告
        }
        warn('[UIManager] AdOverlayNode 未设置，无法显示广告层。');
        return null;
    }

    /**
     * 隐藏广告遮罩层。
     */
    public hideAdOverlay(): void {
        if (this.adOverlayNode) {
            console.log('[UIManager] 隐藏广告遮罩层。');
            // (可选) 播放缓动动画隐藏
            this.adOverlayNode.active = false;
            // AdManager 需要负责销毁广告实例
        }
    }

    // --- 清理 ---
    protected onDestroy(): void {
        console.log('[UIManager] onDestroy');
        // 理论上所有事件监听都会随节点销毁而移除，但显式移除更安全
        director.targetOff(this); // 移除所有以 this 为 target 的事件监听
        this.closeAllPopups(); // 确保销毁时关闭所有弹窗
    }
}