System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, error, warn, log, isValid, director, UIOpacity, Constants, cloneBoardData, GridCell, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, GridManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardData(extras) {
    _reporterNs.report("BoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelData(extras) {
    _reporterNs.report("LevelData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcloneBoardData(extras) {
    _reporterNs.report("cloneBoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectsManager(extras) {
    _reporterNs.report("EffectsManager", "./EffectsManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGridCell(extras) {
    _reporterNs.report("GridCell", "../components/GridCell", _context.meta, extras);
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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      error = _cc.error;
      warn = _cc.warn;
      log = _cc.log;
      isValid = _cc.isValid;
      director = _cc.director;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      cloneBoardData = _unresolved_3.cloneBoardData;
    }, function (_unresolved_4) {
      GridCell = _unresolved_4.GridCell;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dcf23slAg1Isov8T9E0R5KE", "GridManager", undefined); // assets/scripts/managers/GridManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'UITransform', 'error', 'warn', 'log', 'isValid', 'EventTouch', 'director', 'UIOpacity']); // 需要 BoardData 定义和克隆函数
      // 可能需要 UIManager 引用来获取资源
      // 引入 EffectsManager


      ({
        ccclass,
        property
      } = _decorator);

      _export("GridManager", GridManager = (_dec = ccclass('GridManager'), _dec2 = property({
        type: Prefab,
        tooltip: "单个棋盘格子的预制件"
      }), _dec3 = property({
        type: Node,
        tooltip: "格子高亮效果节点 (可选, 如果高亮是附加在格子上的)"
      }), _dec(_class = (_class2 = class GridManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "cellPrefab", _descriptor, this);

          _initializerDefineProperty(this, "highlightNode", _descriptor2, this);

          // 另一种高亮方式：一个独立的节点移动到选中格子上
          this._currentSelectedNode = null;
          // --- 内部状态 ---
          this._gridCells = [];
          // 存储所有格子节点的二维数组
          this._currentBoardData = null;
          // 存储当前关卡的逻辑数据副本
          this._isInitialized = false;
          this._presetCellsToReveal = [];
          // 存储待显示的预设格子信息
          // --- 依赖 ---
          this.uiManager = null;
          // 用于获取 SpriteFrame 等资源
          this.effectsManager = null;
        }

        // 添加 EffectsManager 引用
        // --- 初始化 ---
        initialize(uiManager, effectsManager) {
          console.log('[GridManager] Initializing...');
          this.uiManager = uiManager;
          this.effectsManager = effectsManager;

          if (!this.cellPrefab) {
            error('[GridManager] Cell Prefab 未设置!');
            return;
          }

          if (!this.uiManager) {
            error('[GridManager] UIManager instance is required!');
            return;
          }

          if (!this.effectsManager) {
            // 检查 EffectsManager
            error('[GridManager] EffectsManager instance is required!');
            return;
          }

          this.createGridCells();
          this._isInitialized = true;
          console.log('[GridManager] Initialized successfully.');
        }
        /**
         * 创建 9x9 的格子并添加到棋盘容器节点。
         */


        createGridCells() {
          var _this = this;

          console.log('[GridManager] Creating grid cells...');
          this.node.removeAllChildren();
          this._gridCells = [];
          var gridSize = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE;

          var _loop = function _loop(r) {
            _this._gridCells[r] = [];

            var _loop2 = function _loop2(c) {
              var cellNode = instantiate(_this.cellPrefab);

              if (!cellNode) {
                error("[GridManager] \u5B9E\u4F8B\u5316\u683C\u5B50 (" + r + ", " + c + ") \u5931\u8D25!");
                return 1; // continue
              }

              _this.node.addChild(cellNode);

              _this._gridCells[r][c] = cellNode;
              cellNode.on(Node.EventType.TOUCH_END, event => {
                _this.onCellNodeClicked(r, c);

                event.propagationStopped = true;
              }, _this);
            };

            for (var c = 0; c < gridSize; c++) {
              if (_loop2(c)) continue;
            }
          };

          for (var r = 0; r < gridSize; r++) {
            _loop(r);
          }

          console.log("[GridManager] " + gridSize * gridSize + " grid cells created.");
        }

        onCellNodeClicked(row, col) {
          console.log("[GridManager] Cell node clicked: (" + row + ", " + col + "). Emitting event.");
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CELL_CLICKED, row, col);
        }
        /**
         * 随机打乱数组 (Fisher-Yates Shuffle)。
         * @param array 要打乱的数组。
         * @private
         */


        shuffleArray(array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 交换元素
          }

          return array;
        }
        /**
         * 创建一个延迟 Promise。
         * @param ms 延迟的毫秒数。
         * @private
         */


        delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        } // --- 数据加载与更新 ---

        /**
         * 加载关卡数据到棋盘。
         * @param levelData 关卡数据。
         * @returns 返回棋盘数据的克隆副本，供 InputManager 缓存。
         */


        loadLevel(levelData) {
          if (!this._isInitialized) {
            console.error('[GridManager] loadLevel 在初始化之前被调用。');
            return null;
          }

          console.log("[GridManager] Loading level: " + levelData.difficulty + " - " + levelData.levelIndex);
          console.log("[GridManager] level data: " + levelData.initialBoard);
          this._currentBoardData = (_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
            error: Error()
          }), cloneBoardData) : cloneBoardData)(levelData.initialBoard);
          this._presetCellsToReveal = []; // 清空待显示列表

          var gridSize = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE;

          for (var r = 0; r < gridSize; r++) {
            for (var c = 0; c < gridSize; c++) {
              if (!this._gridCells[r] || !this._gridCells[r][c]) {
                warn("[GridManager] \u683C\u5B50\u8282\u70B9 (" + r + ", " + c + ") \u65E0\u6548\uFF0C\u8DF3\u8FC7\u52A0\u8F7D\u3002");
                continue;
              }

              var cellNode = this._gridCells[r][c];
              var value = this._currentBoardData.grid[r][c];
              var isPreset = this._currentBoardData.presetMask[r][c];
              this.updateCellNode(cellNode, value, isPreset, true);

              if (isPreset && value > 0) {
                this._presetCellsToReveal.push({
                  row: r,
                  col: c,
                  value: value
                });
              }
            }
          }

          console.log('[GridManager] Level loaded onto grid.'); // 返回克隆的数据给调用者（通常是 GameManager，再传给 InputManager）

          return (_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
            error: Error()
          }), cloneBoardData) : cloneBoardData)(this._currentBoardData);
        }
        /**
         * 更新单个格子节点的视觉表现（背景、数字）。
         * 由 loadLevel 或 updateCellDisplay 调用。
         * @param cellNode 要更新的格子节点。
         * @param value 格子的数字 (0 表示空)。
         * @param isPreset 是否是预设数字。
         */


        updateCellNode(cellNode, value, isPreset, initialHidePreset) {
          if (initialHidePreset === void 0) {
            initialHidePreset = false;
          }

          if (!isValid(cellNode) || !this.uiManager) return;
          var gridCell = cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
            error: Error()
          }), GridCell) : GridCell);

          if (gridCell) {
            gridCell.updateDisplay(value, isPreset, this.uiManager.getNumberSpriteFrame(value));

            if (initialHidePreset && isPreset && value > 0) {
              console.log("[GridManager] \u521D\u59CB\u52A0\u8F7D\u65F6\u9690\u85CF\u9884\u8BBE\u6570\u5B57: (" + gridCell.row + ", " + gridCell.col + ") = " + value);
              var numberDisplayNode = gridCell.getNumberDisplayNode();

              if (numberDisplayNode) {
                numberDisplayNode.setScale(1, 1, 1);
                var opacity = numberDisplayNode.getComponent(UIOpacity) || numberDisplayNode.addComponent(UIOpacity);
                opacity.opacity = 255;
              }
            }
          }
        }
        /**
         * (新增) 播放预设数字逐个弹出的动画。
         * @param delayBetweenMs 每个数字弹出之间的延迟（毫秒）。
         * @returns 返回一个 Promise，在所有动画开始播放后（或完成后）解析。
         */


        revealPresetNumbersAnimated(delayBetweenMs) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (delayBetweenMs === void 0) {
              delayBetweenMs = 50;
            }

            if (!_this2._isInitialized || !_this2.effectsManager) {
              warn('[GridManager] revealPresetNumbersAnimated 调用时未初始化或缺少 EffectsManager。');
              return;
            }

            if (_this2._presetCellsToReveal.length === 0) {
              log('[GridManager] 没有预设数字需要显示动画。');
              return;
            }

            log("[GridManager] \u5F00\u59CB\u64AD\u653E " + _this2._presetCellsToReveal.length + " \u4E2A\u9884\u8BBE\u6570\u5B57\u7684\u663E\u793A\u52A8\u753B..."); // 随机打乱顺序

            var shuffledPresets = _this2.shuffleArray([..._this2._presetCellsToReveal]); // 复制一份再打乱


            for (var preset of shuffledPresets) {
              var cellNode = _this2.getCellNode(preset.row, preset.col);

              if (isValid(cellNode)) {
                var numberDisplayNode = null; // 获取数字节点 (优先使用 GridCell 组件)

                var gridCell = cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
                  error: Error()
                }), GridCell) : GridCell);

                if (gridCell) {
                  gridCell.updateDisplay(preset.value, true, _this2.uiManager.getNumberSpriteFrame(preset.value));
                  numberDisplayNode = gridCell.getNumberDisplayNode();

                  if (numberDisplayNode) {
                    _this2.effectsManager.animateNumberAppear(numberDisplayNode);
                  } else {
                    warn("[GridManager] \u672A\u627E\u5230\u683C\u5B50 (" + preset.row + ", " + preset.col + ") \u7684 NumberDisplay \u8282\u70B9\u7528\u4E8E\u52A8\u753B\u3002");
                  }
                }
              } else {
                warn("[GridManager] \u672A\u627E\u5230\u683C\u5B50 (" + preset.row + ", " + preset.col + ") \u8282\u70B9\u7528\u4E8E\u52A8\u753B\u3002");
              } // 等待一小段时间再显示下一个


              yield _this2.delay(delayBetweenMs);
            }

            log('[GridManager] 所有预设数字动画已开始播放。');
            _this2._presetCellsToReveal = []; // 清空列表
          })();
        }
        /**
         * 由 InputManager 调用，用于更新特定格子的数字显示（通常是用户操作的结果）。
         * @param row 行
         * @param col 列
         * @param value 新的数字 (0 表示清除)
         * @param isPreset 理论上用户操作的都不是预设，但保留参数以防万一
         */


        updateCellDisplay(row, col, value, isPreset) {
          if (!this._isInitialized) {
            console.warn('[GridManager] updateCellDisplay 在初始化之前被调用。');
            return;
          }

          if (row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) {
            console.error("[GridManager] updateCellDisplay \u6536\u5230\u65E0\u6548\u7684\u884C\u5217\u7D22\u5F15: (" + row + ", " + col + ")");
            return;
          }

          if (!this._gridCells[row] || !this._gridCells[row][col]) {
            console.warn("[GridManager] \u683C\u5B50\u8282\u70B9 (" + row + ", " + col + ") \u65E0\u6548\uFF0C\u65E0\u6CD5\u66F4\u65B0\u663E\u793A\u3002");
            return;
          }

          var cellNode = this._gridCells[row][col];
          console.log("[GridManager] Updating cell display: (" + row + ", " + col + "), " + isPreset + " to " + value + " ");
          this.updateCellNode(cellNode, value, isPreset);
        } // --- 高亮控制 ---

        /**
         * 高亮显示指定的格子。
         * @param row 行
         * @param col 列
         */


        highlightCell(row, col) {
          var _this$_gridCells$row;

          console.log("[GridManager] Highlighting cell: (" + row + ", " + col + ")");
          if (!this._isInitialized) return;
          if (row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) return; // 先取消之前的高亮

          this.deselectCell(); // 方式一：激活格子内部的高亮节点

          var cellNode = (_this$_gridCells$row = this._gridCells[row]) == null ? void 0 : _this$_gridCells$row[col];

          if (isValid(cellNode)) {
            var _cellNode$getComponen;

            (_cellNode$getComponen = cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
              error: Error()
            }), GridCell) : GridCell)) == null || _cellNode$getComponen.setHighlight(true);

            if (cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
              error: Error()
            }), GridCell) : GridCell) && cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
              error: Error()
            }), GridCell) : GridCell).getComponent(UIOpacity)) {
              console.log("[GridManager] \u683C\u5B50 (" + row + ", " + col + ") \u9AD8\u4EAE\u8282\u70B9\u5DF2\u542F\u7528\u3002" + cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
                error: Error()
              }), GridCell) : GridCell).getComponent(UIOpacity).opacity);
            }

            this._currentSelectedNode = cellNode;
          } else {
            console.warn("[GridManager] \u672A\u627E\u5230\u683C\u5B50 (" + row + ", " + col + ") \u8282\u70B9\u7528\u4E8E\u9AD8\u4EAE\u3002");
          }
        }
        /**
         * 取消所有格子的高亮状态。
         */


        deselectCell() {
          console.log("[GridManager] Deselecting current cell.");
          if (!this._isInitialized) return;

          if (this._currentSelectedNode) {
            var _this$_currentSelecte;

            (_this$_currentSelecte = this._currentSelectedNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
              error: Error()
            }), GridCell) : GridCell)) == null || _this$_currentSelecte.setHighlight(false);
            this._currentSelectedNode = null;
          }
        }
        /**
        * 获取指定行列对应的格子节点。
        * @param row 行
        * @param col 列
        * @returns 返回格子节点 Node，如果无效则返回 null。
        */


        getCellNode(row, col) {
          var _this$_gridCells$row$, _this$_gridCells$row2;

          if (!this._isInitialized || row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) {
            return null;
          }

          return (_this$_gridCells$row$ = (_this$_gridCells$row2 = this._gridCells[row]) == null ? void 0 : _this$_gridCells$row2[col]) != null ? _this$_gridCells$row$ : null;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cellPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "highlightNode", [_dec3], {
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
//# sourceMappingURL=3a4a619532d2811ec07f3e2c3beaafb1ccbf908a.js.map