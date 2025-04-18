System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Button, UIOpacity, tween, Vec3, BlockInputEvents, isValid, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, PopupBase;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../managers/UIManager", _context.meta, extras);
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
      Button = _cc.Button;
      UIOpacity = _cc.UIOpacity;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
      BlockInputEvents = _cc.BlockInputEvents;
      isValid = _cc.isValid;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "c2f24fmfi9H56ESf494BLZB", "PopupBase", undefined); // assets/scripts/components/PopupBase.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'UIOpacity', 'tween', 'Vec3', 'BlockInputEvents', 'log', 'isValid']);

      // 可能需要 UIManager 引用来关闭
      ({
        ccclass,
        property
      } = _decorator);

      _export("PopupBase", PopupBase = (_dec = ccclass('PopupBase'), _dec2 = property({
        type: Node,
        tooltip: "弹窗背景遮罩节点"
      }), _dec3 = property({
        type: Node,
        tooltip: "弹窗主面板节点"
      }), _dec4 = property({
        type: Button,
        tooltip: "关闭按钮"
      }), _dec5 = property({
        type: Number,
        tooltip: "打开动画时长 (秒)"
      }), _dec6 = property({
        type: Number,
        tooltip: "关闭动画时长 (秒)"
      }), _dec(_class = (_class2 = class PopupBase extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backgroundMask", _descriptor, this);

          _initializerDefineProperty(this, "panel", _descriptor2, this);

          _initializerDefineProperty(this, "closeButton", _descriptor3, this);

          // --- 动画参数 ---
          _initializerDefineProperty(this, "openDuration", _descriptor4, this);

          _initializerDefineProperty(this, "closeDuration", _descriptor5, this);

          // --- 内部状态 ---
          this._uiManager = null;
          // UIManager 引用，用于调用关闭
          this._isOpen = false;
        }

        onLoad() {
          var _this$backgroundMask, _this$backgroundMask2, _this$closeButton, _this$closeButton2;

          // 添加 BlockInputEvents 组件到背景遮罩，阻止点击穿透到下层 UI
          if (this.backgroundMask && !this.backgroundMask.getComponent(BlockInputEvents)) {
            this.backgroundMask.addComponent(BlockInputEvents);
          } // 默认给背景遮罩添加点击关闭弹窗的功能 (可选)


          console.log("[PopupBase] \u7ED1\u5B9A\u80CC\u666F\u906E\u7F69\u70B9\u51FB\u4E8B\u4EF6: " + ((_this$backgroundMask = this.backgroundMask) == null ? void 0 : _this$backgroundMask.name));
          (_this$backgroundMask2 = this.backgroundMask) == null || _this$backgroundMask2.on(Node.EventType.TOUCH_END, this.close, this); // 绑定关闭按钮事件

          console.log("[PopupBase] \u7ED1\u5B9A\u5173\u95ED\u6309\u94AE\u4E8B\u4EF6: " + ((_this$closeButton = this.closeButton) == null ? void 0 : _this$closeButton.node.name));
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.on(Button.EventType.CLICK, this.close, this);
        }
        /**
         * 初始化弹窗，由 UIManager 调用。
         * @param uiManager UIManager 的实例引用。
         */


        init(uiManager) {
          this._uiManager = uiManager;
        }
        /**
         * 显示弹窗（通常由 UIManager 调用）。
         * @param args (可选) 传递给 onOpen 的参数。
         */


        show() {
          if (this._isOpen) return;
          this._isOpen = true;
          this.node.active = true; // 确保节点是激活的

          this.onOpen(...arguments); // 调用子类可能覆盖的打开逻辑

          this.playOpenAnimation(); // 播放打开动画

          console.log("[PopupBase] \u663E\u793A\u5F39\u7A97: " + this.node.name);
        }
        /**
         * 关闭弹窗。
         */


        close() {
          if (!this._isOpen) return;
          this._isOpen = false;
          console.log("[PopupBase] \u8BF7\u6C42\u5173\u95ED\u5F39\u7A97: " + this.node.name); // 禁用交互，防止动画期间再次点击

          if (this.closeButton) {
            this.closeButton.interactable = false;
            this.closeButton.node.off(Button.EventType.CLICK, this.close, this);
          }

          if (this.backgroundMask) {
            this.backgroundMask.off(Node.EventType.TOUCH_END, this.close, this); // 移除监听避免重复触发
          } else {
            console.error("[PopupBase] \u80CC\u666F\u906E\u7F69\u8282\u70B9\u672A\u8BBE\u7F6E: " + this.node.name);
          }

          this.playCloseAnimation(() => {
            this.onClose(); // 调用子类可能覆盖的关闭逻辑
            // 动画结束后通知 UIManager (如果 UIManager 管理弹窗实例)
            // 或者直接销毁节点

            if (isValid(this.node)) {
              this.node.destroy();
              console.log("[PopupBase] \u5F39\u7A97\u5DF2\u9500\u6BC1: " + this.node.name);
            } // 如果是由 UIManager 管理弹窗实例的生命周期，则调用 UIManager 的关闭方法
            // this._uiManager?.closePopupNode(this.node);

          });
        }
        /**
         * 播放打开动画。子类可以覆盖此方法实现不同的动画效果。
         */


        playOpenAnimation() {
          if (this.panel) {
            this.panel.setScale(0.5, 0.5);
            tween(this.panel).to(this.openDuration, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: 'backOut'
            }).start();
          }

          var opacityComp = this.node.getComponent(UIOpacity) || this.node.addComponent(UIOpacity);
          opacityComp.opacity = 0;
          tween(opacityComp).to(this.openDuration, {
            opacity: 255
          }).start();
        }
        /**
         * 播放关闭动画。
         * @param callback 动画完成后的回调。
         */


        playCloseAnimation(callback) {
          var actions = [];

          if (this.panel) {
            actions.push(new Promise(resolve => {
              tween(this.panel).to(this.closeDuration, {
                scale: new Vec3(0.5, 0.5, 1)
              }, {
                easing: 'backIn'
              }).call(resolve).start();
            }));
          }

          var opacityComp = this.node.getComponent(UIOpacity);

          if (opacityComp) {
            actions.push(new Promise(resolve => {
              tween(opacityComp).to(this.closeDuration, {
                opacity: 0
              }).call(resolve).start();
            }));
          } // 等待所有动画完成


          Promise.all(actions).then(() => {
            if (callback) {
              callback();
            }
          });
        }
        /**
         * 子类可以覆盖此方法，在弹窗打开时执行特定逻辑（例如加载数据）。
         * @param args 从 show 方法传递过来的参数。
         */


        onOpen() {
          // 子类实现
          console.log("[PopupBase] onOpen called for " + this.node.name);
        }
        /**
         * 子类可以覆盖此方法，在弹窗关闭动画完成、节点销毁前执行特定逻辑（例如清理资源）。
         */


        onClose() {// 子类实现
          // console.log(`[PopupBase] onClose called for ${this.node.name}`);
        }

        onDestroy() {
          console.log("[PopupBase] onDestroy: " + this.node.name);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backgroundMask", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "panel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "openDuration", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.2;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "closeDuration", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.15;
        }
      })), _class2)) || _class));
      /*
      通用节点引用: 使用 @property 定义了 backgroundMask, panel, closeButton 的引用，子类会继承这些属性，方便在编辑器中赋值。
      动画参数: 提供了 openDuration 和 closeDuration 属性，允许在编辑器中调整动画时长。
      BlockInputEvents: 在 onLoad 中自动为背景遮罩添加 BlockInputEvents 组件，防止点击穿透。
      点击背景关闭: 默认给背景遮罩添加了点击事件，调用 close 方法关闭弹窗。
      init 方法: 提供给 UIManager 调用，传递 UIManager 的引用，方便弹窗在关闭时通知 UIManager（如果需要）。
      show 方法:
      设置 _isOpen 状态，激活节点。
      调用 onOpen 虚方法，允许子类执行打开时的特定逻辑。
      调用 playOpenAnimation 播放标准打开动画。
      close 方法:
      设置 _isOpen 状态。
      禁用交互，移除监听，防止重复关闭。
      调用 playCloseAnimation 播放标准关闭动画。
      在关闭动画的回调中，调用 onClose 虚方法，允许子类执行关闭时的清理逻辑。
      默认直接销毁节点。注释中提到了另一种方式：调用 UIManager 的方法来管理弹窗节点的生命周期。
      动画方法 (playOpenAnimation, playCloseAnimation): 提供了默认的缩放和透明度渐变动画。子类可以通过覆盖这两个方法来实现自定义的打开/关闭动画。
      虚方法 (onOpen, onClose): 定义了两个空的保护方法，供子类覆盖，以在弹窗打开和关闭的关键时机执行自定义逻辑，例如加载数据、绑定特定事件、释放资源等。
      onDestroy: 确保移除事件监听。
      如何使用:
      创建具体的弹窗控制脚本，例如 SettingsPopupController.ts。
      让这个脚本继承自 PopupBase：export class SettingsPopupController extends PopupBase { ... }。
      将 SettingsPopupController.ts 挂载到 SettingsPopup.prefab 的根节点。
      在编辑器中，为 SettingsPopupController 组件设置好从 PopupBase 继承来的 backgroundMask, panel, closeButton 属性。
      (可选) 在 SettingsPopupController 中覆盖 onOpen 或 onClose 方法来添加特定逻辑。
      UIManager 在实例化 SettingsPopup.prefab 后，获取其 SettingsPopupController 组件，并调用 init(this) 和 show() 方法。
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e91fedcc55c4282a37753502c75348d6b540019d.js.map