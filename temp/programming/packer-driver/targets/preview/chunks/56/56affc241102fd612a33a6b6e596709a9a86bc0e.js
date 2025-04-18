System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, ScrollView, PopupBase, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, HistoryPopupController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPopupBase(extras) {
    _reporterNs.report("PopupBase", "./PopupBase", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Node = _cc.Node;
      ScrollView = _cc.ScrollView;
    }, function (_unresolved_2) {
      PopupBase = _unresolved_2.PopupBase;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b560ffBY+pNJKP4ePxZJGmJ", "HistoryPopupController", undefined); // assets/scripts/components/HistoryPopupController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'ScrollView']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("HistoryPopupController", HistoryPopupController = (_dec = ccclass('HistoryPopupController'), _dec2 = property(ScrollView), _dec3 = property(Node), _dec(_class = (_class2 = class HistoryPopupController extends (_crd && PopupBase === void 0 ? (_reportPossibleCrUseOfPopupBase({
        error: Error()
      }), PopupBase) : PopupBase) {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "scrollView", _descriptor, this);

          _initializerDefineProperty(this, "contentNode", _descriptor2, this);
        }

        // ScrollView 的 content 节点
        onOpen(records) {
          // UIManager 会传入记录数据
          super.onOpen(records); // 清空 contentNode 的旧内容等逻辑可以在这里做，
          // 但目前设计是由 UIManager 在 showHistoryPopup 中处理填充。
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "contentNode", [_dec3], {
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
//# sourceMappingURL=56affc241102fd612a33a6b6e596709a9a86bc0e.js.map