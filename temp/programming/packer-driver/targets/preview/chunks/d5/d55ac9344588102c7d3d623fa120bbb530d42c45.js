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

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'Color', 'SpriteFrame', 'Button', 'UIOpacity']);

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
                console.warn("[GridCell] \u672A\u627E\u5230\u6570\u5B57\u663E\u793A\u7EC4\u4EF6 (Sprite \u6216 Label)\u3002");
              }
            } else {
              console.log("[GridCell] \u6E05\u9664\u6570\u5B57: " + value);
              numSprite.spriteFrame = null;
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
            console.log("[GridCell] setHighlight:" + active);
          }
        }
        /**
         * 获取数字显示节点的引用，用于动画。
         */


        getNumberDisplayNode() {
          return this.numberDisplayNode;
        }

        onDestroy() {}

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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d55ac9344588102c7d3d623fa120bbb530d42c45.js.map