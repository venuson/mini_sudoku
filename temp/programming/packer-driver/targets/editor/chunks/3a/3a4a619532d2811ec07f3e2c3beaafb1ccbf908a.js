System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, UITransform, error, warn, isValid, director, Constants, cloneBoardData, GridCell, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, GridManager;

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
      UITransform = _cc.UITransform;
      error = _cc.error;
      warn = _cc.warn;
      isValid = _cc.isValid;
      director = _cc.director;
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


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Sprite', 'Label', 'Button', 'UITransform', 'Color', 'error', 'warn', 'log', 'isValid', 'SpriteFrame', 'resources', 'director']); // 需要 BoardData 定义和克隆函数
      // 可能需要 UIManager 引用来获取资源


      ({
        ccclass,
        property
      } = _decorator); // (可选) 定义格子组件，如果格子本身逻辑复杂
      // @ccclass('GridCellComponent')
      // export class GridCellComponent extends Component {
      //     @property(Sprite) bgSprite: Sprite | null = null;
      //     @property(Node) numberDisplayNode: Node | null = null; // 可以是 Sprite 或 Label
      //     @property(Sprite) highlightSprite: Sprite | null = null;
      //     public row: number = -1;
      //     public col: number = -1;
      //     // ... 其他格子特有逻辑
      // }

      _export("GridManager", GridManager = (_dec = ccclass('GridManager'), _dec2 = property({
        type: Prefab,
        tooltip: "单个棋盘格子的预制件"
      }), _dec3 = property({
        type: Node,
        tooltip: "格子高亮效果节点 (可选, 如果高亮是附加在格子上的)"
      }), _dec(_class = (_class2 = class GridManager extends Component {
        constructor(...args) {
          super(...args);

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
          this._cellWidth = 0;
          // 缓存计算出的格子宽度
          this._cellHeight = 0;
          // 缓存计算出的格子高度
          // --- 依赖 ---
          this.uiManager = null;
        }

        // 用于获取 SpriteFrame 等资源
        // --- 初始化 ---
        initialize(uiManager) {
          console.log('[GridManager] Initializing...');
          this.uiManager = uiManager;

          if (!this.cellPrefab) {
            error('[GridManager] Cell Prefab 未设置!');
            return;
          }

          if (!this.uiManager) {
            error('[GridManager] UIManager instance is required!');
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
          console.log('[GridManager] Creating grid cells...');
          this.node.removeAllChildren(); // 清除旧格子（如果需要重新创建）

          this._gridCells = [];
          const gridSize = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE;

          for (let r = 0; r < gridSize; r++) {
            this._gridCells[r] = [];

            for (let c = 0; c < gridSize; c++) {
              const cellNode = instantiate(this.cellPrefab);

              if (!cellNode) {
                error(`[GridManager] 实例化格子 (${r}, ${c}) 失败!`);
                continue;
              }

              this.node.addChild(cellNode);
              this._gridCells[r][c] = cellNode; // --- 添加点击事件监听 ---

              cellNode.on(Node.EventType.TOUCH_END, event => {
                // 可以在这里添加一些触摸判断逻辑，例如触摸点是否在节点内
                this.onCellNodeClicked(r, c);
                event.propagationStopped = true; // 阻止事件冒泡到父节点
              }, this); // 缓存格子尺寸 (假设所有格子尺寸相同)

              if (r === 0 && c === 0) {
                const uiTransform = cellNode.getComponent(UITransform);

                if (uiTransform) {
                  this._cellWidth = uiTransform.width;
                  this._cellHeight = uiTransform.height;
                  console.log(`[GridManager] 格子尺寸: ${this._cellWidth}x${this._cellHeight}`);
                }
              }
            }
          }

          console.log(`[GridManager] ${gridSize * gridSize} grid cells created.`);
        }
        /**
         * 处理格子节点的点击事件，将事件转发给 InputManager。
         * @param row 被点击的行
         * @param col 被点击的列
         */


        onCellNodeClicked(row, col) {
          console.log(`[GridManager] Cell node clicked: (${row}, ${col}). Emitting event.`); // 使用 director 发布全局事件，InputManager 会监听

          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CELL_CLICKED, row, col);
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

          console.log(`[GridManager] Loading level: ${levelData.difficulty} - ${levelData.levelIndex}`);
          console.log(`[GridManager] level data: ${levelData.initialBoard}`); // **非常重要**: 克隆棋盘数据，GridManager 只持有显示相关的数据副本

          this._currentBoardData = (_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
            error: Error()
          }), cloneBoardData) : cloneBoardData)(levelData.initialBoard);
          const gridSize = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE;

          for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
              if (!this._gridCells[r] || !this._gridCells[r][c]) {
                warn(`[GridManager] 格子节点 (${r}, ${c}) 无效，跳过加载。`);
                continue;
              }

              const cellNode = this._gridCells[r][c];
              const value = this._currentBoardData.grid[r][c];
              const isPreset = this._currentBoardData.presetMask[r][c];
              this.updateCellNode(cellNode, value, isPreset);
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


        updateCellNode(cellNode, value, isPreset) {
          if (!isValid(cellNode) || !this.uiManager) return;
          const gridCell = cellNode.getComponent(_crd && GridCell === void 0 ? (_reportPossibleCrUseOfGridCell({
            error: Error()
          }), GridCell) : GridCell);

          if (gridCell) {
            gridCell.updateDisplay(value, isPreset, this.uiManager.getNumberSpriteFrame(value));
          }
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
            console.error(`[GridManager] updateCellDisplay 收到无效的行列索引: (${row}, ${col})`);
            return;
          }

          if (!this._gridCells[row] || !this._gridCells[row][col]) {
            console.warn(`[GridManager] 格子节点 (${row}, ${col}) 无效，无法更新显示。`);
            return;
          }

          const cellNode = this._gridCells[row][col];
          console.log(`[GridManager] Updating cell display: (${row}, ${col}), ${isPreset} to ${value} `);
          this.updateCellNode(cellNode, value, isPreset);
        } // --- 高亮控制 ---

        /**
         * 高亮显示指定的格子。
         * @param row 行
         * @param col 列
         */


        highlightCell(row, col) {
          var _this$_gridCells$row;

          if (!this._isInitialized) return;
          if (row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) return; // 先取消之前的高亮

          this.deselectCell(); // 方式一：激活格子内部的高亮节点

          const cellNode = (_this$_gridCells$row = this._gridCells[row]) == null ? void 0 : _this$_gridCells$row[col];

          if (isValid(cellNode)) {
            const highlightSpriteNode = cellNode.getChildByName('HighlightSprite');

            if (highlightSpriteNode) {
              highlightSpriteNode.active = true;
              this._currentSelectedNode = cellNode;
            }
          } // 方式二：移动独立的高亮节点到目标位置
          // if (this.highlightNode && this._gridCells[row]?.[col]) {
          //      const targetCellNode = this._gridCells[row][col];
          //      this.highlightNode.setPosition(targetCellNode.position);
          //      this.highlightNode.active = true;
          // }


          console.log(`[GridManager] Cell highlighted: (${row}, ${col})`);
        }
        /**
         * 取消所有格子的高亮状态。
         */


        deselectCell() {
          if (!this._isInitialized) return;

          if (this._currentSelectedNode) {
            const highlightSpriteNode = this._currentSelectedNode.getChildByName('HighlightSprite');

            if (highlightSpriteNode) {
              highlightSpriteNode.active = false;
              this._currentSelectedNode = null;
            }
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
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "highlightNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=3a4a619532d2811ec07f3e2c3beaafb1ccbf908a.js.map