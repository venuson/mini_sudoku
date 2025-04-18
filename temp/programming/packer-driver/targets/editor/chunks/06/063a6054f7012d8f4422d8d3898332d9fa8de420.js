System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, log, warn, error, Constants, cloneBoardData, PersistenceManager, SudokuLogic, UIManager, GridManager, InputManager, AudioManager, EffectsManager, AccountManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _class3, _crd, ccclass, property, GameState, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelData(extras) {
    _reporterNs.report("LevelData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcloneBoardData(extras) {
    _reporterNs.report("cloneBoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLocalUserProgress(extras) {
    _reporterNs.report("LocalUserProgress", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelRecord(extras) {
    _reporterNs.report("LevelRecord", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPersistenceManager(extras) {
    _reporterNs.report("PersistenceManager", "../services/PersistenceManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSudokuLogic(extras) {
    _reporterNs.report("SudokuLogic", "../logic/SudokuLogic", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGridManager(extras) {
    _reporterNs.report("GridManager", "./GridManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfInputManager(extras) {
    _reporterNs.report("InputManager", "./InputManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAudioManager(extras) {
    _reporterNs.report("AudioManager", "./AudioManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectsManager(extras) {
    _reporterNs.report("EffectsManager", "./EffectsManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAccountManager(extras) {
    _reporterNs.report("AccountManager", "./AccountManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      director = _cc.director;
      log = _cc.log;
      warn = _cc.warn;
      error = _cc.error;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      cloneBoardData = _unresolved_3.cloneBoardData;
    }, function (_unresolved_4) {
      PersistenceManager = _unresolved_4.PersistenceManager;
    }, function (_unresolved_5) {
      SudokuLogic = _unresolved_5.SudokuLogic;
    }, function (_unresolved_6) {
      UIManager = _unresolved_6.UIManager;
    }, function (_unresolved_7) {
      GridManager = _unresolved_7.GridManager;
    }, function (_unresolved_8) {
      InputManager = _unresolved_8.InputManager;
    }, function (_unresolved_9) {
      AudioManager = _unresolved_9.AudioManager;
    }, function (_unresolved_10) {
      EffectsManager = _unresolved_10.EffectsManager;
    }, function (_unresolved_11) {
      AccountManager = _unresolved_11.AccountManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bf62cThlR1HbY3WuOHd1Ez/", "GameManager", undefined); // assets/scripts/managers/GameManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'log', 'warn', 'error', 'isValid']);

      // AdManager 可能不需要直接交互，由 UIManager 控制
      ({
        ccclass,
        property
      } = _decorator);

      GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["LOADING"] = 0] = "LOADING";
        GameState[GameState["MENU"] = 1] = "MENU";
        GameState[GameState["LOADING_LEVEL"] = 2] = "LOADING_LEVEL";
        GameState[GameState["PLAYING"] = 3] = "PLAYING";
        GameState[GameState["PAUSED"] = 4] = "PAUSED";
        GameState[GameState["LEVEL_COMPLETE"] = 5] = "LEVEL_COMPLETE";
        GameState[GameState["GAME_OVER"] = 6] = "GAME_OVER";
        return GameState;
      }(GameState || {});

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property({
        type: _crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
          error: Error()
        }), UIManager) : UIManager,
        tooltip: "UI 管理器实例"
      }), _dec3 = property({
        type: _crd && GridManager === void 0 ? (_reportPossibleCrUseOfGridManager({
          error: Error()
        }), GridManager) : GridManager,
        tooltip: "棋盘管理器实例"
      }), _dec4 = property({
        type: _crd && InputManager === void 0 ? (_reportPossibleCrUseOfInputManager({
          error: Error()
        }), InputManager) : InputManager,
        tooltip: "输入管理器实例"
      }), _dec5 = property({
        type: _crd && AudioManager === void 0 ? (_reportPossibleCrUseOfAudioManager({
          error: Error()
        }), AudioManager) : AudioManager,
        tooltip: "音频管理器实例"
      }), _dec6 = property({
        type: _crd && EffectsManager === void 0 ? (_reportPossibleCrUseOfEffectsManager({
          error: Error()
        }), EffectsManager) : EffectsManager,
        tooltip: "效果管理器实例"
      }), _dec7 = property({
        type: _crd && AccountManager === void 0 ? (_reportPossibleCrUseOfAccountManager({
          error: Error()
        }), AccountManager) : AccountManager,
        tooltip: "账户管理器实例"
      }), _dec(_class = (_class2 = (_class3 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          // --- 管理器引用 (需要在编辑器中赋值) ---
          _initializerDefineProperty(this, "uiManager", _descriptor, this);

          _initializerDefineProperty(this, "gridManager", _descriptor2, this);

          _initializerDefineProperty(this, "inputManager", _descriptor3, this);

          _initializerDefineProperty(this, "audioManager", _descriptor4, this);

          _initializerDefineProperty(this, "effectsManager", _descriptor5, this);

          _initializerDefineProperty(this, "accountManager", _descriptor6, this);

          // AdManager 通常由 UIManager 间接控制，GameManager 可能不需要直接引用
          // @property(AdManager) private adManager: AdManager | null = null;
          // --- 游戏状态 ---
          this._currentState = GameState.LOADING;
          this._currentDifficulty = null;
          this._currentLevelIndex = 0;
          // 当前关卡序号 (1-based)
          this._currentLevelData = null;
          // 当前关卡的完整数据
          this._currentGameTime = 0;
          // 当前关卡已用时间 (秒)
          this._timerIntervalId = -1;
          // 计时器 ID
          this._sudokuLogic = null;
        }

        static get instance() {
          if (!GameManager._instance) {
            error("[GameManager] 实例在初始化之前或节点不存在时被请求。");
          }

          return GameManager._instance;
        }

        // 数独逻辑实例
        // --- Lifecycle Callbacks ---
        onLoad() {
          console.log('[GameManager] onLoad');

          if (GameManager._instance && GameManager._instance !== this) {
            warn('[GameManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
          }

          GameManager._instance = this; // 设置为持久节点

          if (this.node.parent) {
            director.addPersistRootNode(this.node);
            console.log('[GameManager] 节点已设为持久化。');
          } // 检查必要的管理器引用


          if (!this.uiManager) {
            error('[GameManager] 缺少必要的管理器引用uiManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          if (!this.gridManager) {
            error('[GameManager] 缺少必要的管理器引用gridManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          if (!this.inputManager) {
            error('[GameManager] 缺少必要的管理器引用inputManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          if (!this.audioManager) {
            error('[GameManager] 缺少必要的管理器引用audioManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          if (!this.effectsManager) {
            error('[GameManager] 缺少必要的管理器引用effectsManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          if (!this.accountManager) {
            error('[GameManager] 缺少必要的管理器引用accountManager，请在编辑器中设置！');
            this._currentState = GameState.GAME_OVER; // 进入错误状态

            return;
          }

          this._sudokuLogic = (_crd && SudokuLogic === void 0 ? (_reportPossibleCrUseOfSudokuLogic({
            error: Error()
          }), SudokuLogic) : SudokuLogic).getInstance(); // 获取数独逻辑单例
          // 绑定需要监听的事件

          this.bindEvents();
          console.log('[GameManager] 初始化完成，等待资源加载和登录...');
        }

        async start() {
          console.log('[GameManager] start - 开始初始化流程');
          this.setGameState(GameState.LOADING); // 1. 加载设置

          const settings = (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).loadSettings();
          console.log('[GameManager] 设置已加载:', settings); // 2. 初始化音频管理器并应用设置

          await this.audioManager.initialize(settings); // 3. 初始化效果管理器
          // EffectsManager 的 onLoad 已经初始化，这里可以不做额外操作
          // 4. 初始化 UI 管理器并预加载资源

          await this.uiManager.preloadAssets(); // 等待 UI 资源加载完成

          this.uiManager.initialize(this.gridManager, this.effectsManager); // 传入依赖
          // 5. 初始化棋盘管理器

          this.gridManager.initialize(this.uiManager); // 传入依赖
          // 6. 初始化输入管理器

          this.inputManager.initialize(this.gridManager, this.uiManager, this.audioManager, this.effectsManager); // 传入依赖
          // 7. 初始化账户管理器 (AccountManager 的 onLoad 已初始化)
          // 8. 尝试自动登录

          await this.accountManager.login(); // 等待登录流程完成
          // 9. 检查是否有未完成的游戏

          const savedGame = (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).loadUnfinishedGame();
          let shouldStartDefaultGame = true; // 默认需要开始新游戏

          if (savedGame) {
            // 检查存档是否属于当前用户 (如果已登录)
            const currentUserId = this.accountManager.getUserId(); // 如果未登录 (currentUserId 为 null)，则任何存档都视为无效或不属于当前匿名会话
            // 如果已登录，则 userId 必须匹配

            if (currentUserId !== null && savedGame.userId === currentUserId) {
              log('[GameManager] 发现当前用户的游戏存档，尝试恢复...'); // TODO: (可选) 如果你想询问用户，可以在这里显示弹窗
              // 如果用户选择继续，则调用 continueSavedGame 并设置 shouldStartDefaultGame = false
              // 示例：直接继续游戏

              this.continueSavedGame(savedGame);
              shouldStartDefaultGame = false; // 成功恢复，不需要开始默认游戏
            } else {
              log('[GameManager] 发现无效或不匹配的游戏存档，将其忽略并清除。');
              (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
                error: Error()
              }), PersistenceManager) : PersistenceManager).clearUnfinishedGame(); // 清理无效存档
            }
          } else {
            log('[GameManager] 没有找到游戏存档。');
          } // 10. 如果没有成功恢复存档，则开始默认游戏


          if (shouldStartDefaultGame) {
            log('[GameManager] 开始默认游戏 (入门级第一关)。'); // 直接调用 startNewGame 开始入门第一关

            this.startNewGame((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Difficulty.ENTRY, 1); // <--- 直接开始默认关卡
          }
        }

        onDestroy() {
          console.log('[GameManager] onDestroy');

          if (GameManager._instance === this) {
            GameManager._instance = null;
          }

          this.stopTimer(); // 解绑事件

          this.unbindEvents();
        } // --- 事件绑定与处理 ---


        bindEvents() {
          console.log('[GameManager] Binding events...');
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.DIFFICULTY_SELECTED, this.onDifficultySelected, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.GAME_OVER, this.onGameOver, this); // InputManager 发出

          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.PAUSE_RESUME_BUTTON_CLICKED, this.onPauseResumeClicked, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_BUTTON_CLICKED, this.onSettingsClicked, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_BGM_CHANGED, this.onBgmSettingChanged, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_SFX_CHANGED, this.onSfxSettingChanged, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SHOW_HISTORY_CLICKED, this.onShowHistory, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SHOW_RANKING_CLICKED, this.onShowRanking, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CHALLENGE_BUTTON_CLICKED, this.onChallengeClicked, this); // 监听登录成功事件，以便在登录后加载云端进度或记录

          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.LOGIN_SUCCESS, this.onLoginSuccess, this);
        }

        unbindEvents() {
          console.log('[GameManager] Unbinding events...');
          director.targetOff(this); // 移除所有以 this 为 target 的监听器
        }

        onDifficultySelected(difficulty) {
          var _highestCompletedReco;

          if (this._currentState !== GameState.MENU) {
            warn('[GameManager] 在非菜单状态下选择了难度，忽略。');
            return;
          }

          console.log(`[GameManager] 难度选择事件: ${difficulty}`);
          const highestCompletedRecord = this.findHighestCompletedLevel(difficulty);
          const startLevel = highestCompletedRecord ? Math.min(highestCompletedRecord.levelIndex + 1, (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).LEVELS_PER_DIFFICULTY) : 1; // 如果该难度从未玩过，从第一关开始

          log(`[GameManager] 玩家在此难度最高完成至 ${(_highestCompletedReco = highestCompletedRecord == null ? void 0 : highestCompletedRecord.levelIndex) != null ? _highestCompletedReco : 0} 关，开始第 ${startLevel} 关。`);
          this.startNewGame(difficulty, startLevel);
        }

        onGameOver(isWin) {
          if (this._currentState !== GameState.PLAYING) return; // 只有在游戏中才能触发结束

          console.log(`[GameManager] 游戏结束事件: isWin=${isWin}`);
          this.stopTimer();

          if (isWin) {
            var _this$uiManager, _this$audioManager, _this$accountManager;

            this.setGameState(GameState.LEVEL_COMPLETE);
            (_this$uiManager = this.uiManager) == null || _this$uiManager.showWinAnimation();
            (_this$audioManager = this.audioManager) == null || _this$audioManager.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).AudioClipName.WIN); // 保存游戏结果到云端

            (_this$accountManager = this.accountManager) == null || _this$accountManager.saveLevelResult(this._currentDifficulty, this._currentLevelIndex, this._currentGameTime).then(success => {
              if (success) {
                console.log('[GameManager] 关卡结果成功保存到云端。');
              } else {
                warn('[GameManager] 关卡结果保存到云端失败。'); // 可以考虑本地缓存或其他重试机制
              }
            }); // 清除本地未完成存档

            (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
              error: Error()
            }), PersistenceManager) : PersistenceManager).clearUnfinishedGame(); // 延迟一段时间后自动进入下一关或返回菜单

            this.scheduleOnce(() => {
              if (this._currentLevelIndex < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).LEVELS_PER_DIFFICULTY) {
                this.startNewGame(this._currentDifficulty, this._currentLevelIndex + 1);
              } else {
                console.log('[GameManager] 已完成当前难度的所有关卡！'); // TODO: 提示用户已通关该难度，并返回菜单

                this.goToMenu();
              }
            }, 3.0); // 延迟 3 秒
          } else {
            // 失败逻辑 (目前数独没有明确的失败条件，除非是计时模式超时)
            this.setGameState(GameState.GAME_OVER); // TODO: 显示失败界面或提示

            this.goToMenu(); // 暂时返回菜单
          }
        }

        onPauseResumeClicked() {
          if (this._currentState === GameState.PLAYING) {
            this.pauseGame();
          } else if (this._currentState === GameState.PAUSED) {
            this.resumeGame();
          } else {
            warn('[GameManager] 在非游戏或暂停状态下点击了暂停/恢复按钮。');
          }
        }

        onSettingsClicked() {
          // 可以在暂停时打开设置，也可以在游戏时打开（会暂停游戏）
          if (this._currentState === GameState.PLAYING) {
            this.pauseGame(false); // 暂停游戏，但不显示广告层
          }
        }

        onBgmSettingChanged(enabled) {
          var _this$audioManager2;

          console.log(`[GameManager] BGM 设置改变: ${enabled}`);
          (_this$audioManager2 = this.audioManager) == null || _this$audioManager2.setBgmEnabled(enabled); // 保存设置

          const settings = (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).loadSettings();
          settings.bgmEnabled = enabled;
          (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).saveSettings(settings);
        }

        onSfxSettingChanged(enabled) {
          var _this$audioManager3;

          console.log(`[GameManager] SFX 设置改变: ${enabled}`);
          (_this$audioManager3 = this.audioManager) == null || _this$audioManager3.setSfxEnabled(enabled); // 保存设置

          const settings = (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).loadSettings();
          settings.sfxEnabled = enabled;
          (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).saveSettings(settings);
        }

        async onShowHistory() {
          var _this$accountManager2, _this$uiManager2;

          if (!((_this$accountManager2 = this.accountManager) != null && _this$accountManager2.isLoggedIn())) {
            warn('[GameManager] 用户未登录，无法显示历史记录。'); // TODO: 提示用户需要登录

            return;
          }

          console.log('[GameManager] 请求显示历史记录...'); // 从 AccountManager 获取缓存的记录

          const records = this.accountManager.getAllLevelRecords();
          (_this$uiManager2 = this.uiManager) == null || _this$uiManager2.showHistoryPopup(records);
        }

        async onShowRanking() {
          var _this$accountManager3;

          if (!((_this$accountManager3 = this.accountManager) != null && _this$accountManager3.isLoggedIn())) {
            warn('[GameManager] 用户未登录，无法显示排行榜。'); // TODO: 提示用户需要登录

            return;
          }

          console.log('[GameManager] 请求显示排行榜...');

          try {
            var _this$uiManager3;

            // 从 CloudService 获取排行榜数据
            const rankingData = await CloudService.fetchGlobalRanking();
            (_this$uiManager3 = this.uiManager) == null || _this$uiManager3.showRankingPopup(rankingData.ranks, rankingData.myRank);
          } catch (err) {
            error('[GameManager] 获取排行榜数据失败:', err); // TODO: 显示错误提示
          }
        }

        onChallengeClicked(difficulty, levelIndex) {
          console.log(`[GameManager] 重新挑战请求: ${difficulty} - ${levelIndex}`);
          this.startNewGame(difficulty, levelIndex);
        }

        onLoginSuccess(userId) {
          console.log(`[GameManager] 登录成功事件，用户 ID: ${userId}`); // 登录成功后可以做一些事情，例如：
          // 1. 如果之前有未完成的游戏，检查 userId 是否匹配
          // 2. 如果当前在菜单界面，可以刷新显示的用户信息或记录入口状态
          // 3. 如果有关卡数据需要从云端加载，可以在这里触发
        } // --- 游戏流程控制 ---

        /**
         * 开始一个新游戏关卡。
         * @param difficulty 难度。
         * @param levelIndex 关卡序号 (1-based)。
         */


        startNewGame(difficulty, levelIndex) {
          var _this$uiManager4, _this$effectsManager;

          log(`[GameManager] 开始新游戏: ${difficulty} - ${levelIndex}`); // 确保状态不是加载中，避免重复加载

          if (this._currentState === GameState.LOADING_LEVEL) {
            warn('[GameManager] 正在加载关卡中，请稍候...');
            return;
          }

          this.setGameState(GameState.LOADING_LEVEL);
          (_this$uiManager4 = this.uiManager) == null || _this$uiManager4.closeAllPopups();
          (_this$effectsManager = this.effectsManager) == null || _this$effectsManager.stopWinEffect();
          this._currentDifficulty = difficulty;
          this._currentLevelIndex = levelIndex;
          this._currentGameTime = 0; // 异步生成或加载关卡数据

          this.loadLevelDataAsync(difficulty, levelIndex).then(levelData => {
            if (levelData) {
              this._currentLevelData = levelData;
              const boardDataClone = this.gridManager.loadLevel(levelData);

              if (boardDataClone) {
                var _this$uiManager5, _this$uiManager6, _this$uiManager7;

                this.inputManager.reset(boardDataClone); // --- 确保游戏 UI 显示 ---

                (_this$uiManager5 = this.uiManager) == null || _this$uiManager5.showGameUI(); // <--- 确保调用

                (_this$uiManager6 = this.uiManager) == null || _this$uiManager6.updateTimer(this._currentGameTime);
                (_this$uiManager7 = this.uiManager) == null || _this$uiManager7.updatePauseResumeButton(false); // 确保按钮是暂停状态

                this.startTimer();
                this.setGameState(GameState.PLAYING);
                log('[GameManager] 关卡加载完成，游戏开始！');
              } else {
                error('[GameManager] 棋盘管理器加载关卡失败！');
                this.goToErrorState(); // 进入错误状态或返回菜单
              }
            } else {
              error(`[GameManager] 无法加载关卡数据: ${difficulty} - ${levelIndex}`);
              this.goToErrorState();
            }
          }).catch(err => {
            error('[GameManager] 加载关卡数据时发生错误:', err);
            this.goToErrorState();
          });
        }
        /**
         * 继续之前保存的游戏。
         * @param savedProgress 本地存储的进度数据。
         */


        continueSavedGame(savedProgress) {
          var _this$uiManager8, _this$effectsManager2;

          log('[GameManager] 继续已保存的游戏...'); // 确保状态不是加载中

          if (this._currentState === GameState.LOADING_LEVEL) {
            warn('[GameManager] 正在加载关卡中，无法同时恢复游戏。');
            return;
          }

          this.setGameState(GameState.LOADING_LEVEL);
          (_this$uiManager8 = this.uiManager) == null || _this$uiManager8.closeAllPopups();
          (_this$effectsManager2 = this.effectsManager) == null || _this$effectsManager2.stopWinEffect();
          this._currentDifficulty = savedProgress.difficulty;
          this._currentLevelIndex = savedProgress.levelIndex;
          this._currentGameTime = savedProgress.elapsedTime;
          const pseudoLevelData = {
            difficulty: savedProgress.difficulty,
            levelIndex: savedProgress.levelIndex,
            initialBoard: savedProgress.currentBoardState,
            emptyCellsCount: 0
          };
          const boardDataClone = this.gridManager.loadLevel(pseudoLevelData);

          if (boardDataClone) {
            var _this$uiManager9, _this$uiManager10, _this$uiManager11;

            this.inputManager.reset((_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
              error: Error()
            }), cloneBoardData) : cloneBoardData)(savedProgress.currentBoardState)); // --- 确保游戏 UI 显示 ---

            (_this$uiManager9 = this.uiManager) == null || _this$uiManager9.showGameUI(); // <--- 确保调用

            (_this$uiManager10 = this.uiManager) == null || _this$uiManager10.updateTimer(this._currentGameTime);
            (_this$uiManager11 = this.uiManager) == null || _this$uiManager11.updatePauseResumeButton(false); // 确保按钮是暂停状态

            this.startTimer();
            this.setGameState(GameState.PLAYING);
            log('[GameManager] 已恢复游戏进度。');
          } else {
            error('[GameManager] 棋盘管理器加载已保存的游戏失败！');
            (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
              error: Error()
            }), PersistenceManager) : PersistenceManager).clearUnfinishedGame();
            this.goToErrorState(); // 进入错误状态或返回菜单
          }
        } // --- 辅助方法 ---

        /**
         * 查找指定难度下已完成的最高关卡记录。
         * @param difficulty 难度。
         * @returns 返回最高关卡的 LevelRecord，如果该难度没有记录则返回 null。
         */


        findHighestCompletedLevel(difficulty) {
          var _this$accountManager4;

          const records = (_this$accountManager4 = this.accountManager) == null ? void 0 : _this$accountManager4.getAllLevelRecords();

          if (!records || records.length === 0) {
            return null;
          }

          let highestLevel = 0;
          let highestRecord = null;

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


        goToErrorState() {
          // 可以选择显示一个错误提示，然后返回菜单
          // 或者直接返回菜单
          this.goToMenu();
        }
        /**
         * 异步加载关卡数据。优先尝试从 SudokuLogic 生成，可以扩展为从云端获取。
         */


        async loadLevelDataAsync(difficulty, levelIndex) {
          console.log(`[GameManager] 异步加载关卡数据: ${difficulty} - ${levelIndex}`); // 方案一：本地生成

          const boardData = this._sudokuLogic.generateSudoku(difficulty, levelIndex);

          if (boardData) {
            // 计算空格数
            let emptyCount = 0;

            for (let r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; r++) {
              for (let c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).GRID_SIZE; c++) {
                if (boardData.grid[r][c] === 0) {
                  emptyCount++;
                }
              }
            }

            const levelData = {
              difficulty: difficulty,
              levelIndex: levelIndex,
              initialBoard: boardData,
              emptyCellsCount: emptyCount
            };
            return levelData;
          } else {
            return null; // 生成失败
          } // 方案二：从云端获取 (如果需要)

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


        pauseGame(showAd = true) {
          var _this$uiManager12;

          if (this._currentState !== GameState.PLAYING) return;
          console.log(`[GameManager] 暂停游戏. Show ad: ${showAd}`);
          this.setGameState(GameState.PAUSED);
          this.stopTimer(); // this.audioManager?.pauseBGM(); // 暂停背景音乐

          (_this$uiManager12 = this.uiManager) == null || _this$uiManager12.updatePauseResumeButton(true);

          if (showAd) {
            var _this$uiManager13;

            const adContainer = (_this$uiManager13 = this.uiManager) == null ? void 0 : _this$uiManager13.showAdOverlay();
          }
        }
        /**
         * 恢复游戏。
         */


        resumeGame() {
          var _this$uiManager14, _this$uiManager15, _this$uiManager16;

          // 只有从暂停状态或设置弹窗打开的状态才能恢复
          if (this._currentState !== GameState.PAUSED && !this.isPopupActive(this.settingsPopupPrefab)) {
            warn(`[GameManager] 无法从当前状态 ${this._currentState} 恢复游戏。`);
            return;
          }

          console.log('[GameManager] 恢复游戏。');
          (_this$uiManager14 = this.uiManager) == null || _this$uiManager14.closeAllPopups(); // 关闭可能打开的设置弹窗

          (_this$uiManager15 = this.uiManager) == null || _this$uiManager15.hideAdOverlay(); // 隐藏广告层
          // director.emit(Constants.EventName.HIDE_AD); // 通知 AdManager 隐藏广告

          this.setGameState(GameState.PLAYING);
          this.startTimer(); // this.audioManager?.resumeBGM();

          (_this$uiManager16 = this.uiManager) == null || _this$uiManager16.updatePauseResumeButton(false);
        }
        /**
        * 检查是否有指定类型的弹窗处于活动状态。
        * @param prefab 弹窗的 Prefab。
        */


        isPopupActive(prefab) {
          var _this$uiManager$isPop, _this$uiManager17;

          if (!prefab) return false;
          return (_this$uiManager$isPop = (_this$uiManager17 = this.uiManager) == null ? void 0 : _this$uiManager17.isPopupActive(prefab.name)) != null ? _this$uiManager$isPop : false; // 需要 UIManager 提供此接口
        }
        /**
         * 返回主菜单/难度选择界面。
         */


        goToMenu() {
          console.log('[GameManager] 返回主菜单。'); // 只有在非菜单状态下才执行切换逻辑

          if (this._currentState !== GameState.MENU) {
            var _this$uiManager18;

            this.setGameState(GameState.MENU);
            this.stopTimer(); // this.audioManager?.playBGM(Constants.AudioClipName.MENU_BGM); // 播放菜单 BGM

            (_this$uiManager18 = this.uiManager) == null || _this$uiManager18.showDifficultySelection(); // <--- 显示难度选择界面

            this._currentDifficulty = null;
            this._currentLevelIndex = 0;
            this._currentLevelData = null; // 清理存档的逻辑可以根据需要添加或移除
            // PersistenceManager.clearUnfinishedGame();
          }
        }
        /**
         * 保存当前游戏状态到本地 (用于中途退出)。
         */


        saveCurrentGame() {
          var _this$inputManager, _this$accountManager5;

          if (this._currentState !== GameState.PLAYING && this._currentState !== GameState.PAUSED) {
            // console.log('[GameManager] 当前非游戏状态，无需保存。');
            return;
          }

          if (!this._currentDifficulty || !this._currentLevelData || !((_this$inputManager = this.inputManager) != null && _this$inputManager.getCurrentBoardData())) {
            warn('[GameManager] 缺少必要数据，无法保存当前游戏。');
            return;
          }

          const progress = {
            userId: ((_this$accountManager5 = this.accountManager) == null ? void 0 : _this$accountManager5.getUserId()) || null,
            difficulty: this._currentDifficulty,
            levelIndex: this._currentLevelIndex,
            currentBoardState: (_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
              error: Error()
            }), cloneBoardData) : cloneBoardData)(this.inputManager.getCurrentBoardData()),
            // 获取 InputManager 当前的棋盘状态副本
            elapsedTime: this._currentGameTime
          };
          (_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).saveUnfinishedGame(progress);
          console.log('[GameManager] 当前游戏状态已保存到本地。');
        } // --- 计时器 ---


        startTimer() {
          this.stopTimer(); // 先停止旧的计时器

          console.log('[GameManager] 启动计时器。');
          this._timerIntervalId = setInterval(() => {
            var _this$uiManager19;

            this._currentGameTime++;
            (_this$uiManager19 = this.uiManager) == null || _this$uiManager19.updateTimer(this._currentGameTime);
          }, 1000);
        }

        stopTimer() {
          if (this._timerIntervalId !== -1) {
            console.log('[GameManager] 停止计时器。');
            clearInterval(this._timerIntervalId);
            this._timerIntervalId = -1;
          }
        } // --- 状态管理 ---


        setGameState(newState) {
          if (this._currentState === newState) return;
          console.log(`[GameManager] 状态改变: ${GameState[this._currentState]} -> ${GameState[newState]}`);
          this._currentState = newState; // 可以在这里根据状态变化执行一些通用逻辑
          // 例如，离开 PLAYING 或 PAUSED 状态时自动保存游戏

          if (newState !== GameState.PLAYING && newState !== GameState.PAUSED) {
            this.saveCurrentGame();
          }
        } // --- 小游戏生命周期回调 ---
        // Cocos Creator 默认不直接处理小游戏 onShow/onHide，
        // 需要在 app.js 或入口脚本中监听并调用 GameManager 的方法。

        /**
         * 处理小游戏切换到前台的事件。
         */


        onGameShow() {
          console.log('[GameManager] 游戏切换到前台 (onShow)'); // 如果之前是暂停状态（因为切换到后台），则恢复游戏
          // 需要一个标记来判断是否是因为切后台导致的暂停
          // if (this._pausedByHide) {
          //     this.resumeGame();
          //     this._pausedByHide = false;
          // }
          // 或者简单地恢复 BGM

          if (this._currentState === GameState.PLAYING || this._currentState === GameState.PAUSED) {
            var _this$audioManager4;

            (_this$audioManager4 = this.audioManager) == null || _this$audioManager4.resumeBGM();
          }
        }
        /**
         * 处理小游戏切换到后台的事件。
         */


        onGameHide() {
          var _this$audioManager5;

          console.log('[GameManager] 游戏切换到后台 (onHide)'); // 自动暂停游戏并保存进度

          if (this._currentState === GameState.PLAYING) {
            // this._pausedByHide = true; // 设置标记
            this.pauseGame(false); // 暂停游戏，不显示广告

            this.saveCurrentGame(); // 保存进度
          } else if (this._currentState === GameState.PAUSED) {
            // 如果已经是暂停状态，确保进度已保存
            this.saveCurrentGame();
          } // 暂停 BGM


          (_this$audioManager5 = this.audioManager) == null || _this$audioManager5.pauseBGM();
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "uiManager", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "gridManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "inputManager", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "audioManager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "effectsManager", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "accountManager", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class)); // --- 在 app.js 或入口脚本中添加监听 ---

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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=063a6054f7012d8f4422d8d3898332d9fa8de420.js.map