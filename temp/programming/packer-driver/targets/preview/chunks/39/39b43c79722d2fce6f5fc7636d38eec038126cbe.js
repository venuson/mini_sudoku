System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Toggle, director, PopupBase, Constants, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, SettingsPopupController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPopupBase(extras) {
    _reporterNs.report("PopupBase", "./PopupBase", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Toggle = _cc.Toggle;
      director = _cc.director;
    }, function (_unresolved_2) {
      PopupBase = _unresolved_2.PopupBase;
    }, function (_unresolved_3) {
      Constants = _unresolved_3.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ef939S5qqZPm7MRngyJVMPX", "SettingsPopupController", undefined); // assets/scripts/components/SettingsPopupController.ts


      __checkObsolete__(['_decorator', 'Component', 'Toggle', 'director']); // 继承基类


      ({
        ccclass,
        property
      } = _decorator);

      _export("SettingsPopupController", SettingsPopupController = (_dec = ccclass('SettingsPopupController'), _dec2 = property(Toggle), _dec3 = property(Toggle), _dec(_class = (_class2 = class SettingsPopupController extends (_crd && PopupBase === void 0 ? (_reportPossibleCrUseOfPopupBase({
        error: Error()
      }), PopupBase) : PopupBase) {
        constructor() {
          super(...arguments);

          // 可以添加此弹窗特有的属性引用，例如 Toggle 组件
          _initializerDefineProperty(this, "bgmToggle", _descriptor, this);

          _initializerDefineProperty(this, "sfxToggle", _descriptor2, this);
        }

        // 可以在 onOpen 中根据传入的数据设置 Toggle 初始状态
        onOpen(initialSettings) {
          super.onOpen(initialSettings); // 调用父类方法

          console.log("[SettingsPopupController] onOpen: " + this.node.name + ", initialSettings: " + JSON.stringify(initialSettings) + " " + this.bgmToggle + " " + this.sfxToggle);

          if (initialSettings && this.bgmToggle) {
            this.bgmToggle.isChecked = initialSettings.bgmEnabled;
          }

          if (initialSettings && this.sfxToggle) {
            this.sfxToggle.isChecked = initialSettings.sfxEnabled;
          } // 可以在这里绑定 Toggle 的事件监听，并发出特定事件


          if (this.bgmToggle && this.bgmToggle.node) {
            this.bgmToggle.node.on('toggle', this.onBgmToggleChanged, this);
          }

          if (this.sfxToggle && this.sfxToggle.node) {
            this.sfxToggle.node.on('toggle', this.onSfxToggleChanged, this);
          }
        }

        onBgmToggleChanged(toggle) {
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_BGM_CHANGED, toggle.isChecked);
        }

        onSfxToggleChanged(toggle) {
          director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SETTINGS_SFX_CHANGED, toggle.isChecked);
        }

        onClose() {
          // 移除监听
          if (this.bgmToggle && this.bgmToggle.node) {
            this.bgmToggle.node.off('toggle', this.onBgmToggleChanged, this);
          } else {
            console.error('BgmToggle is not set in SettingsPopupController!');
          }

          if (this.sfxToggle && this.sfxToggle.node) {
            this.sfxToggle.node.off('toggle', this.onSfxToggleChanged, this);
          } else {
            console.error('SfxToggle is not set in SettingsPopupController!');
          }

          super.onClose(); // 调用父类方法
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfxToggle", [_dec3], {
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
//# sourceMappingURL=39b43c79722d2fce6f5fc7636d38eec038126cbe.js.map