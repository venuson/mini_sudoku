// assets/scripts/components/HistoryPopupController.ts
import { _decorator, Component, Node, ScrollView } from 'cc';
import { PopupBase } from './PopupBase';

const { ccclass, property } = _decorator;

@ccclass('HistoryPopupController')
export class HistoryPopupController extends PopupBase {
    @property(ScrollView) scrollView: ScrollView | null = null;
    @property(Node) contentNode: Node | null = null; // ScrollView 的 content 节点

    protected onOpen(records?: any[]): void { // UIManager 会传入记录数据
        super.onOpen(records);
        // 清空 contentNode 的旧内容等逻辑可以在这里做，
        // 但目前设计是由 UIManager 在 showHistoryPopup 中处理填充。
    }
}