System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, Color, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, GridCell;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "80743Ot10FKrrPUCH1OKjlO", "GridCell", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'Label', 'Button', 'error', 'log', 'isValid', 'Color']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GridCell", GridCell = (_dec = ccclass('GridCell'), _dec2 = property({
        type: Sprite,
        tooltip: "背景 Sprite 组件"
      }), _dec3 = property({
        type: Node,
        tooltip: "用于显示数字的节点 (可以是 Sprite 或 Label)"
      }), _dec4 = property({
        type: Sprite,
        tooltip: "高亮状态的 Sprite 组件 (可选)"
      }), _dec(_class = (_class2 = class GridCell extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "bgSprite", _descriptor, this);

          _initializerDefineProperty(this, "numberDisplayNode", _descriptor2, this);

          _initializerDefineProperty(this, "highlightSprite", _descriptor3, this);

          // --- 格子自身属性 ---
          this._row = -1;
          this._col = -1;
          this._isPreset = false;
          this._currentValue = 0;
        }

        // --- 初始化 ---

        /**
         * 初始化格子组件。
         * 通常由 GridManager 在创建格子时调用。
         * @param row 格子的行索引 (0-8)。
         * @param col 格子的列索引 (0-8)。
         */
        init(row, col) {
          this._row = row;
          this._col = col;
        } // --- 公共方法 ---

        /**
         * 获取格子的行索引。
         */


        get row() {
          return this._row;
        }
        /**
         * 获取格子的列索引。
         */


        get col() {
          return this._col;
        }
        /**
         * 获取格子当前显示的数值。
         */


        get value() {
          return this._currentValue;
        }
        /**
         * 获取格子是否是预设数字。
         */


        get isPreset() {
          return this._isPreset;
        }
        /**
         * 更新格子的显示状态。
         * (这个方法可以替代 GridManager 中的 updateCellNode 部分逻辑，让 GridManager 调用此方法)
         * @param value 新的数值 (0-9)。
         * @param isPreset 是否是预设。
         * @param bgFrame 背景 SpriteFrame。
         * @param numberFrame 数字 SpriteFrame (如果用 Sprite 显示)。
         * @param presetColor 预设数字颜色 (如果用 Label 或需要区分 Sprite 颜色)。
         * @param userColor 用户输入数字颜色。
         */


        updateDisplay(value, isPreset, numberFrame) {
          this._currentValue = value;
          this._isPreset = isPreset;
          var presetColor = new Color(0xcc, 0xcc, 0xcc, 255); // 更新数字

          if (this.numberDisplayNode) {
            var numSprite = this.numberDisplayNode.getComponent(Sprite);

            if (value > 0) {
              this.numberDisplayNode.active = true;
              console.log("[GridCell] \u66F4\u65B0\u6570\u5B57: " + value + "\uFF0C\u9884\u8BBE: " + isPreset);

              if (numSprite && numberFrame) {
                // 优先使用 Sprite
                numSprite.spriteFrame = numberFrame;

                if (isPreset) {
                  numSprite.color = presetColor;
                }
              } else {
                console.warn("[GridCell] \u672A\u627E\u5230\u6570\u5B57\u663E\u793A\u7EC4\u4EF6 (Sprite \u6216 Label)\u3002"); // this.numberDisplayNode.active = false;
              }
            } else {
              // numSprite.spriteFrame = null;
              console.log("[GridCell] \u6E05\u9664\u6570\u5B57: " + value);
              this.numberDisplayNode.active = false;
            }
          } // 隐藏高亮
          // this.setHighlight(false);

        }
        /**
         * 设置格子的高亮状态。
         * @param active 是否激活高亮。
         */


        setHighlight(active) {
          if (this.highlightSprite) {
            this.highlightSprite.node.active = active;
          } // 如果高亮是改变背景颜色或边框，在这里处理

        }
        /**
         * 获取数字显示节点的引用，用于动画。
         */


        getNumberDisplayNode() {
          return this.numberDisplayNode;
        } // --- (可选) 点击事件处理 ---
        // private onClick(): void {
        //     if (this._row === -1 || this._col === -1) return;
        //     log(`[GridCell] Clicked: (${this._row}, ${this._col})`);
        //     // 发射事件，携带行列信息
        //     director.emit(Constants.EventName.CELL_CLICKED, this._row, this._col);
        // }


        onDestroy() {// 移除事件监听 (如果在这里添加了的话)
          // this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "numberDisplayNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "highlightSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      /*
      节点引用: 使用 @property 获取预制件内部的背景、数字显示节点和高亮节点的引用。
      自身属性: 存储了格子的行列号 (_row, _col)、是否预设 (_isPreset) 和当前值 (_currentValue)。
      init 方法: 提供一个初始化方法，供 GridManager 在创建格子时调用，传入行列号。
      Getter 方法: 提供了获取格子属性的 getter 方法。
      updateDisplay 方法: 封装了更新格子视觉表现的核心逻辑，包括设置背景、显示/隐藏数字（支持 Sprite 或 Label）、设置颜色等。GridManager 可以调用这个方法来更新格子，而不是直接操作格子的子节点。
      setHighlight 方法: 控制格子的高亮状态（如果高亮效果是格子的一部分）。
      getNumberDisplayNode 方法: 提供获取数字显示节点的接口，方便 UIManager 或 EffectsManager 获取动画目标。
      点击事件 (注释掉): 代码中包含了可选的点击事件处理逻辑。如果选择在 GridCell 组件内部处理点击并发出事件，可以取消注释这部分代码，并移除 GridManager 中的相应监听逻辑。目前的设计是由 GridManager 统一处理点击。
      请检查 GridCell.ts 文件。这个组件虽然可选，但有助于将格子的状态和显示逻辑封装在一起，使 GridManager 的代码更简洁。
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d55ac9344588102c7d3d623fa120bbb530d42c45.js.map