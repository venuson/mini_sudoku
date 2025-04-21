System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Button, Prefab, Sprite, director, warn, error, instantiate, isValid, SpriteFrame, resources, Vec3, UIOpacity, tween, Constants, NumberButton, PersistenceManager, SettingsPopupController, HistoryPopupController, RankingPopupController, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _crd, ccclass, property, UIManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSettingsData(extras) {
    _reporterNs.report("SettingsData", "../data/SettingsData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelRecord(extras) {
    _reporterNs.report("LevelRecord", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankingEntry(extras) {
    _reporterNs.report("RankingEntry", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectsManager(extras) {
    _reporterNs.report("EffectsManager", "./EffectsManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGridManager(extras) {
    _reporterNs.report("GridManager", "./GridManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfNumberButton(extras) {
    _reporterNs.report("NumberButton", "../components/NumberButton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPersistenceManager(extras) {
    _reporterNs.report("PersistenceManager", "../services/PersistenceManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSettingsPopupController(extras) {
    _reporterNs.report("SettingsPopupController", "../components/SettingsPopupController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHistoryPopupController(extras) {
    _reporterNs.report("HistoryPopupController", "../components/HistoryPopupController", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankingPopupController(extras) {
    _reporterNs.report("RankingPopupController", "../components/RankingPopupController", _context.meta, extras);
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
      Node = _cc.Node;
      Label = _cc.Label;
      Button = _cc.Button;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
      director = _cc.director;
      warn = _cc.warn;
      error = _cc.error;
      instantiate = _cc.instantiate;
      isValid = _cc.isValid;
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      NumberButton = _unresolved_3.NumberButton;
    }, function (_unresolved_4) {
      PersistenceManager = _unresolved_4.PersistenceManager;
    }, function (_unresolved_5) {
      SettingsPopupController = _unresolved_5.SettingsPopupController;
    }, function (_unresolved_6) {
      HistoryPopupController = _unresolved_6.HistoryPopupController;
    }, function (_unresolved_7) {
      RankingPopupController = _unresolved_7.RankingPopupController;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1fc56ggYntCtazMrgBSowoz", "UIManager", undefined); // assets/scripts/managers/UIManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Button', 'Prefab', 'Sprite', 'director', 'warn', 'error', 'instantiate', 'isValid', 'SpriteFrame', 'resources', 'Vec3', 'UIOpacity', 'tween']); // 需要 EffectsManager 实例来播放动画
      // 引入 NumberButton 组件


      ({
        ccclass,
        property
      } = _decorator);

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec2 = property({
        type: Label,
        tooltip: "显示计时器的 Label 组件"
      }), _dec3 = property({
        type: Button,
        tooltip: "暂停/恢复按钮"
      }), _dec4 = property({
        type: Sprite,
        tooltip: "暂停/恢复按钮的图标 Sprite"
      }), _dec5 = property({
        type: Button,
        tooltip: "设置按钮"
      }), _dec6 = property({
        type: Node,
        tooltip: "棋盘容器节点 (GridManager 挂载点)"
      }), _dec7 = property({
        type: Node,
        tooltip: "难度选择按钮的容器节点"
      }), _dec8 = property({
        type: Button,
        tooltip: "入门难度按钮"
      }), _dec9 = property({
        type: Button,
        tooltip: "初级难度按钮"
      }), _dec10 = property({
        type: Button,
        tooltip: "中级难度按钮"
      }), _dec11 = property({
        type: Button,
        tooltip: "高级难度按钮"
      }), _dec12 = property({
        type: Button,
        tooltip: "大师级难度按钮"
      }), _dec13 = property({
        type: Node,
        tooltip: "数字输入按钮 (1-9) 的容器节点"
      }), _dec14 = property({
        type: Button,
        tooltip: "清除按钮"
      }), _dec15 = property({
        type: Button,
        tooltip: "撤销按钮"
      }), _dec16 = property({
        type: Button,
        tooltip: "恢复按钮"
      }), _dec17 = property({
        type: Prefab,
        tooltip: "设置弹窗预制件"
      }), _dec18 = property({
        type: Prefab,
        tooltip: "关卡记录弹窗预制件"
      }), _dec19 = property({
        type: Prefab,
        tooltip: "排行榜弹窗预制件"
      }), _dec20 = property({
        type: Prefab,
        tooltip: "关卡记录列表项预制件"
      }), _dec21 = property({
        type: Prefab,
        tooltip: "排行榜列表项预制件"
      }), _dec22 = property({
        type: Node,
        tooltip: "广告遮罩层节点"
      }), _dec23 = property({
        type: Node,
        tooltip: "广告实际挂载的容器节点 (在遮罩层内)"
      }), _dec24 = property({
        type: Node,
        tooltip: "底部导航栏容器 (可选)"
      }), _dec25 = property({
        type: Button,
        tooltip: "显示记录按钮 (可选)"
      }), _dec26 = property({
        type: Button,
        tooltip: "显示排行按钮 (可选)"
      }), _dec(_class = (_class2 = class UIManager extends Component {
        constructor() {
          super(...arguments);

          // --- 节点引用 (需要在编辑器中拖拽赋值) ---
          // 顶栏 UI
          _initializerDefineProperty(this, "timerLabel", _descriptor, this);

          _initializerDefineProperty(this, "pauseResumeButton", _descriptor2, this);

          _initializerDefineProperty(this, "pauseResumeIcon", _descriptor3, this);

          // 用于切换图标
          _initializerDefineProperty(this, "settingsButton", _descriptor4, this);

          // 棋盘区域 (GridManager 挂载点)
          _initializerDefineProperty(this, "gameBoardNode", _descriptor5, this);

          // GridManager 实例会挂载在这个节点
          // 难度选择区域
          _initializerDefineProperty(this, "difficultySelectorNode", _descriptor6, this);

          // (可以为每个难度按钮单独设置属性，或通过 getChildByName 查找)
          _initializerDefineProperty(this, "entryButton", _descriptor7, this);

          _initializerDefineProperty(this, "easyButton", _descriptor8, this);

          _initializerDefineProperty(this, "mediumButton", _descriptor9, this);

          _initializerDefineProperty(this, "hardButton", _descriptor10, this);

          _initializerDefineProperty(this, "masterButton", _descriptor11, this);

          // 输入控制区域
          _initializerDefineProperty(this, "numberPadNode", _descriptor12, this);

          this._numberButtonComponents = new Map();

          // 缓存 NumberButton 组件实例
          _initializerDefineProperty(this, "clearButton", _descriptor13, this);

          _initializerDefineProperty(this, "undoButton", _descriptor14, this);

          _initializerDefineProperty(this, "redoButton", _descriptor15, this);

          // 弹窗 Prefab
          _initializerDefineProperty(this, "settingsPopupPrefab", _descriptor16, this);

          _initializerDefineProperty(this, "historyPopupPrefab", _descriptor17, this);

          _initializerDefineProperty(this, "rankingPopupPrefab", _descriptor18, this);

          _initializerDefineProperty(this, "recordItemPrefab", _descriptor19, this);

          _initializerDefineProperty(this, "rankItemPrefab", _descriptor20, this);

          // 广告遮罩层
          _initializerDefineProperty(this, "adOverlayNode", _descriptor21, this);

          _initializerDefineProperty(this, "adContainerNode", _descriptor22, this);

          // AdManager 会用到
          // 底部导航栏 (可选)
          _initializerDefineProperty(this, "bottomNavBarNode", _descriptor23, this);

          _initializerDefineProperty(this, "historyNavButton", _descriptor24, this);

          _initializerDefineProperty(this, "rankingNavButton", _descriptor25, this);

          // --- 内部状态 ---
          this._isInitialized = false;
          this._activePopups = [];
          // 存储当前打开的弹窗节点
          this.loadedSpriteFrames = new Map();
          // 缓存加载的 SpriteFrame
          this.loadedNumberFrames = new Map();
          // 缓存加载的数字 SpriteFrame
          this.loadedIconFrames = new Map();
          // 缓存加载的图标 SpriteFrame
          // --- 依赖 ---
          this.gridManager = null;
          // GridManager 实例
          this.effectsManager = null;
        }

        // EffectsManager 实例
        // --- 初始化与资源加载 ---

        /**
        * 初始化 UIManager，获取节点引用，绑定事件监听，并设置初始 UI 状态。
        * @param gridManager GridManager 实例
        * @param effectsManager EffectsManager 实例
        */
        initialize(gridManager, effectsManager) {
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
          } // 查找并缓存数字按钮及其背景 Sprite


          this.cacheNumberButtons(); // 绑定 UI 按钮事件

          this.bindButtonEvents(); // 设置初始 UI 元素的可见性状态

          this.setupInitialUIState(); // <--- 调用新的辅助方法

          this._isInitialized = true;
          console.log('[UIManager] 初始化成功。');
        }
        /**
        * 查找并缓存数字按钮的 NumberButton 组件实例。
        * @private
        */


        cacheNumberButtons() {
          console.log('[UIManager] 缓存数字按钮...');

          if (this.numberPadNode) {
            this._numberButtonComponents.clear(); // 清空旧缓存


            this.numberPadNode.getComponentsInChildren(_crd && NumberButton === void 0 ? (_reportPossibleCrUseOfNumberButton({
              error: Error()
            }), NumberButton) : NumberButton).forEach(button => {
              console.log("[UIManager] \u7F13\u5B58\u4E86\u6570\u5B57\u6309\u94AE " + button.getNumber() + " \u7684 NumberButton \u7EC4\u4EF6\u3002");
              button.setState(false);

              this._numberButtonComponents.set(button.getNumber(), button);
            });
          } else {
            console.warn('[UIManager] NumberPadNode 未在编辑器中设置。');
          }
        }
        /**
         * 设置初始 UI 状态，确保正确的元素在开始时可见/隐藏。
         * @private
         */


        setupInitialUIState() {
          console.log('[UIManager] 设置初始 UI 状态...'); // 检查并确保广告层初始隐藏

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


        preloadAssets() {
          var _this = this;

          return _asyncToGenerator(function* () {
            console.log('[UIManager] Preloading UI assets...');
            var loadPromises = []; // --- 定义需要加载的资源路径 ---

            var frameResources = {
              // 格子背景
              [(_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.CELL_PRESET_BG]: "textures/game/" + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.CELL_PRESET_BG + "/spriteFrame",
              [(_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.CELL_USER_BG]: "textures/game/" + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.CELL_USER_BG + "/spriteFrame",
              // 图标
              [(_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).IconName.PAUSE]: "textures/ui/" + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).IconName.PAUSE + "/spriteFrame",
              [(_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).IconName.RESUME]: "textures/ui/" + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).IconName.RESUME + "/spriteFrame",
              [(_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.DEFAULT_AVATAR]: "textures/ui/" + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.DEFAULT_AVATAR + "/spriteFrame" // ... 其他需要的 SpriteFrame ...

            };
            var numberResources = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // --- 加载 SpriteFrame ---

            var _loop = function* _loop(name) {
              var path = frameResources[name];
              loadPromises.push(new Promise(resolve => {
                resources.load(path, SpriteFrame, (err, frame) => {
                  if (err || !frame) {
                    console.error("[UIManager] \u52A0\u8F7D SpriteFrame \u5931\u8D25: " + path, err);
                  } else {
                    _this.loadedSpriteFrames.set(name, frame); // --- 缓存特定用途的 Frame ---


                    if (name === (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                      error: Error()
                    }), Constants) : Constants).SpriteFrameName.NUM_BTN_VALID_BG) {
                      _this._validNumPadFrame = frame;
                    } else if (name === (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                      error: Error()
                    }), Constants) : Constants).SpriteFrameName.NUM_BTN_INVALID_BG) {
                      _this._invalidNumPadFrame = frame;
                    } // ... (缓存其他图标等) ...

                  }

                  resolve(null);
                });
              }));
            };

            for (var name in frameResources) {
              yield* _loop(name);
            } // --- 加载数字 SpriteFrame ---


            var _loop2 = function* _loop2(num) {
              var path = "textures/game/numbers/" + num + "/spriteFrame"; // 假设路径

              loadPromises.push(new Promise(resolve => {
                resources.load(path, SpriteFrame, (err, frame) => {
                  if (err || !frame) {
                    console.error("[UIManager] \u52A0\u8F7D\u6570\u5B57 SpriteFrame \u5931\u8D25: " + path, err);
                  } else {
                    _this.loadedNumberFrames.set(num, frame);
                  }

                  resolve(null);
                });
              }));
            };

            for (var num of numberResources) {
              yield* _loop2(num);
            }

            yield Promise.all(loadPromises);
            console.log('[UIManager] UI assets preloaded.');
          })();
        }
        /**
         * 获取缓存的 SpriteFrame。
         * @param name SpriteFrame 的名称 (来自 Constants.SpriteFrameName 或 Constants.IconName)。
         */


        getSpriteFrame(name) {
          return this.loadedSpriteFrames.get(name) || null;
        }
        /**
         * 获取缓存的数字 SpriteFrame。
         * @param num 数字 (1-9)。
         */


        getNumberSpriteFrame(num) {
          return this.loadedNumberFrames.get(num) || null;
        }
        /**
         * 获取缓存的图标 SpriteFrame。
         * @param name 图标名称 (来自 Constants.IconName)。
         */


        getIconFrame(name) {
          return this.loadedIconFrames.get(name) || null;
        } // --- 事件绑定 ---


        bindButtonEvents() {
          var _this$pauseResumeButt, _this$settingsButton, _this$entryButton, _this$easyButton, _this$mediumButton, _this$hardButton, _this$masterButton, _this$clearButton, _this$undoButton, _this$redoButton, _this$historyNavButto, _this$rankingNavButto;

          console.log('[UIManager] Binding button events...'); // 顶栏按钮

          (_this$pauseResumeButt = this.pauseResumeButton) == null || _this$pauseResumeButt.node.on(Button.EventType.CLICK, this.onPauseResumeClick, this);
          (_this$settingsButton = this.settingsButton) == null || _this$settingsButton.node.on(Button.EventType.CLICK, this.onSettingsClick, this); // 难度选择按钮

          (_this$entryButton = this.entryButton) == null || _this$entryButton.node.on(Button.EventType.CLICK, () => this.onDifficultySelect((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty.ENTRY), this);
          (_this$easyButton = this.easyButton) == null || _this$easyButton.node.on(Button.EventType.CLICK, () => this.onDifficultySelect((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty.EASY), this);
          (_this$mediumButton = this.mediumButton) == null || _this$mediumButton.node.on(Button.EventType.CLICK, () => this.onDifficultySelect((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty.MEDIUM), this);
          (_this$hardButton = this.hardButton) == null || _this$hardButton.node.on(Button.EventType.CLICK, () => this.onDifficultySelect((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty.HARD), this);
          (_this$masterButton = this.masterButton) == null || _this$masterButton.node.on(Button.EventType.CLICK, () => this.onDifficultySelect((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty.MASTER), this); // 数字输入按钮 - 现在通过 NumberButton 组件间接绑定或直接在 UIManager 处理
          // 如果 NumberButton 内部处理点击并发出事件，这里就不需要绑定了
          // 如果 UIManager 统一处理，则需要获取 Button 组件来绑定

          this._numberButtonComponents.forEach((numButtonComp, number) => {
            var buttonComp = numButtonComp.getComponent(Button);
            buttonComp == null || buttonComp.node.on(Button.EventType.CLICK, () => this.onNumberPadClick(number), this);
          }); // 功能按钮


          (_this$clearButton = this.clearButton) == null || _this$clearButton.node.on(Button.EventType.CLICK, this.onClearClick, this);
          (_this$undoButton = this.undoButton) == null || _this$undoButton.node.on(Button.EventType.CLICK, this.onUndoClick, this);
          (_this$redoButton = this.redoButton) == null || _this$redoButton.node.on(Button.EventType.CLICK, this.onRedoClick, this); // 底部导航按钮 (可选)

          (_this$historyNavButto = this.historyNavButton) == null || _this$historyNavButto.node.on(Button.EventType.CLICK, this.onHistoryNavClick, this);
          (_this$rankingNavButto = this.rankingNavButton) == null || _this$rankingNavButto.node.on(Button.EventType.CLICK, this.onRankingNavClick, this);
        } // --- 按钮点击处理函数 (发布事件) ---


        onPauseResumeClick() {
          console.log('[UIManager] Pause/Resume button clicked.'); // 判断当前状态并发出相应事件
          // 这个状态应该由 GameManager 管理，UIManager 只负责发出点击事件
          // 假设 GameManager 会根据当前状态决定是暂停还是恢复

          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.PAUSE_RESUME_BUTTON_CLICKED); // GameManager 监听此事件
        }

        onSettingsClick() {
          console.log('[UIManager] Settings button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_BUTTON_CLICKED); // GameManager 或直接 UIManager 处理显示弹窗

          this.showSettingsPopup((_crd && PersistenceManager === void 0 ? (_reportPossibleCrUseOfPersistenceManager({
            error: Error()
          }), PersistenceManager) : PersistenceManager).loadSettings()); // UIManager 直接处理显示
        }

        onDifficultySelect(difficulty) {
          console.log("[UIManager] Difficulty selected: " + difficulty);
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.DIFFICULTY_SELECTED, difficulty); // GameManager 监听
        }

        onNumberPadClick(num) {
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.NUMBER_INPUT, num); // InputManager 监听
        }

        onClearClick() {
          console.log('[UIManager] Clear button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CLEAR_BUTTON_CLICKED); // InputManager 监听
        }

        onUndoClick() {
          console.log('[UIManager] Undo button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.UNDO_BUTTON_CLICKED); // InputManager 监听
        }

        onRedoClick() {
          console.log('[UIManager] Redo button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.REDO_BUTTON_CLICKED); // InputManager 监听
        }

        onHistoryNavClick() {
          console.log('[UIManager] History nav button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SHOW_HISTORY_CLICKED); // GameManager 监听，获取数据后调用 UIManager 显示
        }

        onRankingNavClick() {
          console.log('[UIManager] Ranking nav button clicked.');
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SHOW_RANKING_CLICKED); // GameManager 监听，获取数据后调用 UIManager 显示
        } // --- UI 更新方法 ---

        /**
         * 更新计时器显示。
         * @param seconds 总秒数。
         */


        updateTimer(seconds) {
          if (!this.timerLabel) return;
          var minutes = Math.floor(seconds / 60);
          var remainingSeconds = seconds % 60;
          var timeString = minutes.toString().padStart(2, '0') + ":" + remainingSeconds.toString().padStart(2, '0');
          this.timerLabel.string = timeString;
        }
        /**
         * 更新暂停/恢复按钮的图标和状态。
         * @param isPaused 当前是否处于暂停状态。
         */


        updatePauseResumeButton(isPaused) {
          if (!this.pauseResumeIcon) return;
          var iconName = isPaused ? (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).IconName.RESUME : (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).IconName.PAUSE;
          var iconFrame = this.getIconFrame(iconName);

          if (iconFrame) {
            this.pauseResumeIcon.spriteFrame = iconFrame;
          } else {
            warn("[UIManager] \u56FE\u6807 SpriteFrame \u672A\u627E\u5230: " + iconName);
          }
        }
        /**
         * 更新撤销和恢复按钮的可交互状态。
         * @param canUndo 是否可以撤销。
         * @param canRedo 是否可以恢复。
         */


        updateUndoRedoButtons(canUndo, canRedo) {
          if (this.undoButton) this.undoButton.interactable = canUndo;
          if (this.redoButton) this.redoButton.interactable = canRedo; // 可以同时改变按钮透明度等视觉效果

          if (this.undoButton) {
            var _this$undoButton2;

            // 假设 UIOpacity 来自 cc 模块，添加导入语句
            // 修改后的代码
            var undoOpacity = (_this$undoButton2 = this.undoButton) == null ? void 0 : _this$undoButton2.node.getComponent(UIOpacity);

            if (undoOpacity) {
              undoOpacity.opacity = canUndo ? 255 : 128;
            }
          }

          if (this.redoButton) {
            var redoOpacity = this.redoButton.node.getComponent(UIOpacity);

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


        updateNumberPadState(validNumbers) {
          var validSet = new Set(validNumbers);
          var isValidInputAvailable = validNumbers.length > 0;

          this._numberButtonComponents.forEach((numButtonComp, number) => {
            var isButtonValid = isValidInputAvailable && validSet.has(number);
            numButtonComp.setState(isButtonValid);
          });
        }
        /**
         * 高亮指定的格子。
         * @param row 行
         * @param col 列
         */


        highlightCell(row, col) {
          var _this$gridManager;

          (_this$gridManager = this.gridManager) == null || _this$gridManager.highlightCell(row, col);
        }
        /**
         * 取消格子高亮。
         */


        deselectCell() {
          var _this$gridManager2;

          (_this$gridManager2 = this.gridManager) == null || _this$gridManager2.deselectCell();
        } // --- 动画播放 (由 InputManager 调用) ---

        /**
         * 播放数字出现的动画。
         * @param row 行
         * @param col 列
         * @param num 要显示的数字
         * @param callback 动画完成回调
         */


        playInputAnimation(row, col, num, callback) {
          var _this$gridManager3, _this$effectsManager, _this$gridManager4;

          console.log("[UIManager] \u64AD\u653E\u6570\u5B57\u8F93\u5165\u52A8\u753B: (" + row + ", " + col + ") -> " + num);
          (_this$gridManager3 = this.gridManager) == null || _this$gridManager3.updateCellDisplay(row, col, num, false); // 立即更新显示

          (_this$effectsManager = this.effectsManager) == null || _this$effectsManager.animateNumberAppear((_this$gridManager4 = this.gridManager) == null ? void 0 : _this$gridManager4.getCellNode(row, col), callback);
        }
        /**
         * 播放数字消失的动画。
         * @param row 行
         * @param col 列
         * @param callback 动画完成回调
         */


        playClearAnimation(row, col, callback) {
          var _this$gridManager5, _this$effectsManager2, _this$gridManager6;

          console.log("[UIManager] \u64AD\u653E\u6570\u5B57\u6D88\u5931\u52A8\u753B: (" + row + ", " + col + ")");
          (_this$gridManager5 = this.gridManager) == null || _this$gridManager5.updateCellDisplay(row, col, 0, false);
          (_this$effectsManager2 = this.effectsManager) == null || _this$effectsManager2.animateNumberDisappear((_this$gridManager6 = this.gridManager) == null ? void 0 : _this$gridManager6.getCellNode(row, col), callback);
        }
        /**
         * 播放胜利动画（粒子效果）。
         */


        showWinAnimation() {
          var _this$effectsManager3;

          console.log('[UIManager] 播放胜利动画。this node is: ', this.node.name);
          (_this$effectsManager3 = this.effectsManager) == null || _this$effectsManager3.playWinEffect(this.node); // 添加到 UIManager 所在的 Canvas 节点
        }
        /**
         * 显示难度选择界面，隐藏游戏主界面。
         */


        showDifficultySelection() {
          console.log('[UIManager] 显示难度选择界面。'); // 清理可能残留的状态

          this.deselectCell(); // 清除格子高亮

          this.closeAllPopups(); // 关闭所有弹窗
          // 注意：停止胜利效果应该由 GameManager 在状态切换时处理
        } // --- 弹窗管理 ---

        /**
         * 显示设置弹窗。
         * @param initialSettings 当前的设置数据，用于初始化弹窗内的开关状态。
         */


        showSettingsPopup(initialSettings) {
          console.log('[UIManager] 准备显示设置弹窗。');
          this.showPopup(this.settingsPopupPrefab, popupNode => {
            // --- 初始化弹窗内容 ---
            var controller = popupNode.getComponent(_crd && SettingsPopupController === void 0 ? (_reportPossibleCrUseOfSettingsPopupController({
              error: Error()
            }), SettingsPopupController) : SettingsPopupController);
            controller == null || controller.init(this);
            controller == null || controller.show(initialSettings);
          });
        }
        /**
         * 显示关卡记录弹窗。
         * @param records 关卡记录数组。
         */


        showHistoryPopup(records) {
          this.showPopup(this.historyPopupPrefab, popupNode => {
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
            var controller = popupNode.getComponent(_crd && HistoryPopupController === void 0 ? (_reportPossibleCrUseOfHistoryPopupController({
              error: Error()
            }), HistoryPopupController) : HistoryPopupController);
            controller == null || controller.init(this);
            controller == null || controller.show(records);
          });
        }
        /**
        * 填充单个关卡记录项的数据。
        * @param itemNode 记录项的节点。
        * @param recordData 记录数据。
        */


        populateRecordItem(itemNode, recordData) {
          var _itemNode$getChildByN, _itemNode$getChildByN2, _itemNode$getChildByN3, _itemNode$getChildByN4, _itemNode$getChildByN5;

          var difficultyLabel = (_itemNode$getChildByN = itemNode.getChildByName('DifficultyLabel')) == null ? void 0 : _itemNode$getChildByN.getComponent(Label);
          var levelLabel = (_itemNode$getChildByN2 = itemNode.getChildByName('LevelLabel')) == null ? void 0 : _itemNode$getChildByN2.getComponent(Label);
          var timeLabel = (_itemNode$getChildByN3 = itemNode.getChildByName('BestTimeLabel')) == null ? void 0 : _itemNode$getChildByN3.getComponent(Label);
          var dateLabel = (_itemNode$getChildByN4 = itemNode.getChildByName('DateLabel')) == null ? void 0 : _itemNode$getChildByN4.getComponent(Label);
          var challengeButton = (_itemNode$getChildByN5 = itemNode.getChildByName('ChallengeButton')) == null ? void 0 : _itemNode$getChildByN5.getComponent(Button);
          if (difficultyLabel) difficultyLabel.string = recordData.difficulty;
          if (levelLabel) levelLabel.string = "\u7B2C " + recordData.levelIndex + " \u5173";

          if (timeLabel) {
            var minutes = Math.floor(recordData.bestTimeSeconds / 60);
            var seconds = recordData.bestTimeSeconds % 60;
            timeLabel.string = "\u6700\u4F73: " + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
          }

          if (dateLabel) {
            var date = new Date(recordData.firstCompletionTimestamp);
            dateLabel.string = "\u5B8C\u6210\u4E8E: " + date.toLocaleDateString(); // 格式化日期
          }

          if (challengeButton) {
            challengeButton.node.off(Button.EventType.CLICK); // 移除旧监听器

            challengeButton.node.on(Button.EventType.CLICK, () => {
              console.log("[UIManager] Challenge button clicked for " + recordData.difficulty + " - " + recordData.levelIndex);
              director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).EventName.CHALLENGE_BUTTON_CLICKED, recordData.difficulty, recordData.levelIndex); // GameManager 监听

              this.closeAllPopups(); // 关闭弹窗开始挑战
            }, this);
          }
        }
        /**
         * 显示排行榜弹窗。
         * @param ranks 排行榜条目数组。
         * @param myRank 当前用户的排名信息 (可选)。
         */


        showRankingPopup(ranks, myRank) {
          this.showPopup(this.rankingPopupPrefab, popupNode => {
            var controller = popupNode.getComponent(_crd && RankingPopupController === void 0 ? (_reportPossibleCrUseOfRankingPopupController({
              error: Error()
            }), RankingPopupController) : RankingPopupController);
            controller == null || controller.init(this);
            controller == null || controller.show(ranks); //  // 绑定关闭按钮
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


        populateRankItem(itemNode, rankData, isMyRank) {
          var _itemNode$getChildByN6, _itemNode$getChildByN7, _itemNode$getChildByN8, _itemNode$getChildByN9;

          var rankLabel = (_itemNode$getChildByN6 = itemNode.getChildByName('RankLabel')) == null ? void 0 : _itemNode$getChildByN6.getComponent(Label);
          var avatarSprite = (_itemNode$getChildByN7 = itemNode.getChildByName('Avatar')) == null ? void 0 : _itemNode$getChildByN7.getComponent(Sprite); // 需要处理头像加载

          var nicknameLabel = (_itemNode$getChildByN8 = itemNode.getChildByName('NicknameLabel')) == null ? void 0 : _itemNode$getChildByN8.getComponent(Label);
          var scoreLabel = (_itemNode$getChildByN9 = itemNode.getChildByName('ScoreLabel')) == null ? void 0 : _itemNode$getChildByN9.getComponent(Label);
          if (rankLabel) rankLabel.string = isMyRank ? "\u6211\u7684\u6392\u540D: " + rankData.rank : "" + rankData.rank;
          if (nicknameLabel) nicknameLabel.string = rankData.nickname || '匿名用户';
          if (scoreLabel) scoreLabel.string = "\u901A\u5173: " + rankData.score; // 假设分数是通关数
          // --- 处理头像加载 ---

          if (avatarSprite) {
            if (rankData.avatarUrl) {
              // 注意：微信小游戏加载远程图片需要配置 downloadFile 合法域名
              assetManager.loadRemote(rankData.avatarUrl, {
                ext: '.png'
              }, (err, imageAsset) => {
                if (!err && isValid(avatarSprite.node)) {
                  // 检查节点是否仍然有效
                  var spriteFrame = SpriteFrame.createWithImage(imageAsset);
                  avatarSprite.spriteFrame = spriteFrame;
                } else {
                  // 加载失败或节点失效，可以设置默认头像
                  var defaultAvatarFrame = this.getSpriteFrame((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                    error: Error()
                  }), Constants) : Constants).SpriteFrameName.DEFAULT_AVATAR); // 需要预加载默认头像

                  if (defaultAvatarFrame) avatarSprite.spriteFrame = defaultAvatarFrame; // error(`[UIManager] 加载头像失败: ${rankData.avatarUrl}`, err);
                }
              });
            } else {
              // 没有头像 URL，设置默认头像
              var defaultAvatarFrame = this.getSpriteFrame((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).SpriteFrameName.DEFAULT_AVATAR);
              if (defaultAvatarFrame) avatarSprite.spriteFrame = defaultAvatarFrame;
            }
          }
        }
        /**
         * 通用的显示弹窗方法。
         * @param prefab 要实例化的弹窗 Prefab。
         * @param initCallback (可选) 弹窗节点创建后的初始化回调，用于设置内容和绑定事件。
         */


        showPopup(prefab, initCallback) {
          if (!prefab) {
            error('[UIManager] 尝试显示一个空的弹窗 Prefab。');
            return;
          }

          if (!this.node) {
            error('[UIManager] UIManager 节点无效，无法添加弹窗。');
            return;
          }

          var popupNode = instantiate(prefab);

          if (!popupNode) {
            error('[UIManager] 实例化弹窗 Prefab 失败。');
            return;
          } // 将弹窗添加到 Canvas 下


          this.node.addChild(popupNode);

          this._activePopups.push(popupNode); // 记录打开的弹窗
          // 执行初始化回调


          if (initCallback) {
            initCallback(popupNode);
          } // (可选) 播放弹窗打开动画


          popupNode.setScale(0.5, 0.5);
          var popupBg = popupNode.getComponent(UIOpacity);

          if (popupBg) {
            popupBg.opacity = 0;
          }

          tween(popupNode).to(0.2, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
          tween(popupNode.getComponent(UIOpacity) || popupNode.addComponent(UIOpacity)).to(0.2, {
            opacity: 255
          }).start();
          console.log("[UIManager] \u663E\u793A\u5F39\u7A97: " + prefab.name);
        }
        /**
         * 关闭指定的弹窗。
         * @param popupNode 要关闭的弹窗节点。
         */


        closePopup(popupNode) {
          if (!isValid(popupNode)) return;

          var index = this._activePopups.indexOf(popupNode);

          if (index > -1) {
            this._activePopups.splice(index, 1); // 从记录中移除

          } // 播放关闭动画，动画结束后销毁节点


          tween(popupNode).to(0.15, {
            scale: new Vec3(0.5, 0.5, 1)
          }, {
            easing: 'backIn'
          }).call(() => {
            if (isValid(popupNode)) {
              popupNode.destroy();
              console.log("[UIManager] \u5173\u95ED\u5F39\u7A97: " + popupNode.name);
            }
          }).start();
          tween(popupNode.getComponent(UIOpacity) || popupNode.addComponent(UIOpacity)).to(0.15, {
            opacity: 0
          }).start();
        }
        /**
         * 关闭所有当前打开的弹窗。
         */


        closeAllPopups() {
          console.log('[UIManager] 关闭所有弹窗。'); // 创建副本进行遍历，因为 closePopup 会修改 _activePopups 数组

          var popupsToClose = [...this._activePopups];
          popupsToClose.forEach(popup => this.closePopup(popup));
          this._activePopups = []; // 确保清空
        } // --- 广告层控制 ---

        /**
         * 显示广告遮罩层。
         * @returns 返回用于挂载广告组件的容器节点。
         */


        showAdOverlay() {
          if (this.adOverlayNode) {
            console.log('[UIManager] 显示广告遮罩层。');
            this.adOverlayNode.active = true; // (可选) 播放缓动动画显示

            return this.adContainerNode; // 返回给 AdManager 挂载广告
          }

          warn('[UIManager] AdOverlayNode 未设置，无法显示广告层。');
          return null;
        }
        /**
         * 隐藏广告遮罩层。
         */


        hideAdOverlay() {
          if (this.adOverlayNode) {
            console.log('[UIManager] 隐藏广告遮罩层。'); // (可选) 播放缓动动画隐藏

            this.adOverlayNode.active = false; // AdManager 需要负责销毁广告实例
          }
        } // --- 清理 ---


        onDestroy() {
          console.log('[UIManager] onDestroy'); // 理论上所有事件监听都会随节点销毁而移除，但显式移除更安全

          director.targetOff(this); // 移除所有以 this 为 target 的事件监听

          this.closeAllPopups(); // 确保销毁时关闭所有弹窗
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pauseResumeButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pauseResumeIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "settingsButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "gameBoardNode", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "difficultySelectorNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "entryButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "easyButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "mediumButton", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hardButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "masterButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "numberPadNode", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "clearButton", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "undoButton", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "redoButton", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "settingsPopupPrefab", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "historyPopupPrefab", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "rankingPopupPrefab", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "recordItemPrefab", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "rankItemPrefab", [_dec21], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "adOverlayNode", [_dec22], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "adContainerNode", [_dec23], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "bottomNavBarNode", [_dec24], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "historyNavButton", [_dec25], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "rankingNavButton", [_dec26], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=80115731eefa415ce74c6509c9fd5e04afe092ef.js.map