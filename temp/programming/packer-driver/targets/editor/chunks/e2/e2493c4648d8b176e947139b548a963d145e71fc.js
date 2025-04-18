System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Color, find, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, NumberButton;

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
      Button = _cc.Button;
      Label = _cc.Label;
      Color = _cc.Color;
      find = _cc.find;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2c986V5lOtJaLH4lBZLJukZ", "NumberButton", undefined); // assets/scripts/components/NumberButton.ts


      // 引入 find
      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Sprite', 'Label', 'log', 'Color', 'UIOpacity', 'SpriteFrame', 'find']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("NumberButton", NumberButton = (_dec = ccclass('NumberButton'), _dec2 = property({
        type: Label,
        tooltip: "显示数字的 Label 组件 (通常在按钮子节点上)"
      }), _dec3 = property({
        type: Number,
        tooltip: "此按钮代表的数字 (1-9)"
      }), _dec(_class = (_class2 = class NumberButton extends Component {
        constructor(...args) {
          super(...args);

          // 不再需要 bgSprite 的 @property，因为背景由 Button 组件管理
          // 获取 Label 组件的引用
          _initializerDefineProperty(this, "numberLabel", _descriptor, this);

          // **确保在 Prefab 中链接此属性**
          _initializerDefineProperty(this, "buttonNumber", _descriptor2, this);

          this._buttonComponent = null;
          // 不再需要 _uiOpacity，Button 的 Disabled 状态会处理视觉
          // --- 预设的视觉参数 ---
          this.validNumberColor = Color.RED;
          // 有效数字显示为红色
          this.invalidNumberColor = Color.GRAY;
          // 无效数字显示为灰色
          this.defaultNumberColor = Color.BLACK;
        }

        // 默认数字颜色 (例如，未选中格子时)
        onLoad() {
          this._buttonComponent = this.getComponent(Button);

          if (!this._buttonComponent) {
            console.log(`[NumberButton] 节点 ${this.node.name} 未找到 Button 组件。`);
          } // 如果 Label 没有在编辑器中链接，尝试查找名为 "Label" 的子节点


          if (!this.numberLabel) {
            const labelNode = find("Label", this.node); // 查找名为 "Label" 的子节点

            if (labelNode) {
              this.numberLabel = labelNode.getComponent(Label);
            }
          }

          if (!this.numberLabel) {
            console.warn(`[NumberButton ${this.buttonNumber}] 未能找到或链接 Label 组件用于显示数字。`);
          }
        }

        getNumber() {
          return this.buttonNumber;
        }

        setNumber(num) {
          // 更新 Label 显示的数字
          if (this.numberLabel) {
            console.log(`[NumberButton ${this.buttonNumber}] 设置数字: ${num}`);
            this.numberLabel.string = num > 0 ? num.toString() : '';
          } else {
            console.warn(`[NumberButton ${this.buttonNumber}] 未找到 Label 组件用于设置数字。`);
          }
        }
        /**
         * 设置按钮的有效状态和数字标签颜色。
         * 背景由 Button 组件根据 interactable 状态自动处理。
         * 由 UIManager 调用。
         * @param isValid 数字是否有效 (即是否可以合法填入选中格子)。
         * @param isCellSelected 当前是否有格子被选中。
         */


        setState(isValid) {
          if (this._buttonComponent) {
            this._buttonComponent.interactable = isValid;
          } // 2. 设置按钮上数字的颜色


          let targetNumberColor;
          targetNumberColor = isValid ? this.validNumberColor : this.invalidNumberColor; // 选中时：有效为红，无效为灰

          if (this.numberLabel) {
            this.numberLabel.color = targetNumberColor;
          } // 3. 背景和透明度由 Button 组件的 Transition 和 Disabled 状态自动处理，无需手动设置

        } // ... (可选的 onClick 和 onDestroy) ...


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "numberLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "buttonNumber", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0;
        }
      })), _class2)) || _class));
      /*
      节点引用: 获取按钮背景 Sprite 的引用。
      buttonNumber 属性: 存储该按钮代表的数字，需要在编辑器中为每个按钮实例设置正确的值（1 到 9）。
      getNumber, setNumber: 提供获取和设置按钮数字的方法。
      setState 方法: 封装了根据有效性状态更新按钮视觉表现（背景 SpriteFrame、可交互性、透明度）的逻辑。UIManager 可以调用此方法来更新每个数字按钮的状态，而不是直接操作按钮的子节点和组件。这使得 UIManager 的代码更简洁。
      点击事件 (注释掉): 同样包含了可选的内部点击处理逻辑。当前设计是由 UIManager 统一监听和处理所有按钮的点击事件。
      这个 NumberButton.ts 组件主要是为了更好地组织按钮自身的属性和状态更新逻辑。如果你的数字按钮非常简单，也可以不使用这个组件，完全由 UIManager 来控制。
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e2493c4648d8b176e947139b548a963d145e71fc.js.map