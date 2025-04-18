System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, ScrollView, PopupBase, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, RankingPopupController;

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

      _cclegacy._RF.push({}, "2cdfdH3Q+JJC7tA7A0290qP", "RankingPopupController", undefined); // assets/scripts/components/RankingPopupController.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'ScrollView']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("RankingPopupController", RankingPopupController = (_dec = ccclass('RankingPopupController'), _dec2 = property(Node), _dec3 = property(ScrollView), _dec4 = property(Node), _dec(_class = (_class2 = class RankingPopupController extends (_crd && PopupBase === void 0 ? (_reportPossibleCrUseOfPopupBase({
        error: Error()
      }), PopupBase) : PopupBase) {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "myRankNode", _descriptor, this);

          // 个人排名项节点
          _initializerDefineProperty(this, "scrollView", _descriptor2, this);

          _initializerDefineProperty(this, "contentNode", _descriptor3, this);
        }

        // ScrollView 的 content 节点
        onOpen(ranks) {
          super.onOpen(ranks); // const myRankNode = popupNode.getChildByName('Panel')?.getChildByName('MyRankItem');
          // const contentNode = popupNode.getChildByName('Panel')?.getChildByName('ScrollView')?.getChildByName('view')?.getChildByName('content');
          // const closeButton = popupNode.getChildByName('Panel')?.getChildByName('CloseButton')?.getComponent(Button);
          //  if (!contentNode || !this.rankItemPrefab) {
          //     error('[UIManager] 排行榜弹窗结构不完整或缺少列表项 Prefab。');
          //     this.closePopup(popupNode);
          //     return;
          // }
          //  // 显示个人排名
          //  if (myRankNode) {
          //      if (myRank) {
          //          this.populateRankItem(myRankNode, myRank, true); // true 表示是个人排名项
          //          myRankNode.active = true;
          //      } else {
          //          myRankNode.active = false; // 未登录或未上榜则隐藏
          //      }
          //  }
          //  // 填充排行榜列表
          //  contentNode.removeAllChildren();
          //  if (ranks.length === 0) {
          //      console.log('[UIManager] 排行榜为空。');
          //  } else {
          //      for (const rankEntry of ranks) {
          //          const itemNode = instantiate(this.rankItemPrefab);
          //          this.populateRankItem(itemNode, rankEntry, false); // false 表示非个人排名项
          //          contentNode.addChild(itemNode);
          //      }
          //  }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "myRankNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contentNode", [_dec4], {
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
//# sourceMappingURL=3f079aca9b59f9b01218777ed0aa3d6eaca0b6d1.js.map