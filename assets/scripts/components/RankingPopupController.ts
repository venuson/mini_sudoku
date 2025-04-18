// assets/scripts/components/RankingPopupController.ts
import { _decorator, Component, Node, ScrollView } from 'cc';
import { PopupBase } from './PopupBase';

const { ccclass, property } = _decorator;

@ccclass('RankingPopupController')
export class RankingPopupController extends PopupBase {
    @property(Node) myRankNode: Node | null = null; // 个人排名项节点
    @property(ScrollView) scrollView: ScrollView | null = null;
    @property(Node) contentNode: Node | null = null; // ScrollView 的 content 节点
    
    protected onOpen(ranks?: any): void {
        super.onOpen(ranks);
        // const myRankNode = popupNode.getChildByName('Panel')?.getChildByName('MyRankItem');
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
}