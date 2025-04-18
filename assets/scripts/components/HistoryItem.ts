// assets/scripts/components/HistoryItem.ts

import { _decorator, Component, Node, Label, Button, log, director } from 'cc';
import { LevelRecord } from '../data/UserData'; // 需要 LevelRecord 接口定义
import { Constants, DifficultyType } from '../utils/Constants'; // 需要常量和类型

const { ccclass, property } = _decorator;

@ccclass('HistoryItem')
export class HistoryItem extends Component {

    @property({ type: Label, tooltip: "显示难度的 Label" })
    private difficultyLabel: Label | null = null;

    @property({ type: Label, tooltip: "显示关卡序号的 Label" })
    private levelLabel: Label | null = null;

    @property({ type: Label, tooltip: "显示最佳用时的 Label" })
    private bestTimeLabel: Label | null = null;

    @property({ type: Label, tooltip: "显示首次完成日期的 Label" })
    private dateLabel: Label | null = null;

    @property({ type: Button, tooltip: "再次挑战按钮" })
    private challengeButton: Button | null = null;

    // --- 内部数据 ---
    private _recordData: LevelRecord | null = null; // 存储当前项对应的记录数据

    protected onLoad(): void {
        // 绑定按钮点击事件
        this.challengeButton?.node.on(Button.EventType.CLICK, this.onChallengeClick, this);
    }

    /**
     * 设置并显示关卡记录数据。
     * 由 UIManager 在填充列表时调用。
     * @param recordData 关卡记录数据。
     */
    public setData(recordData: LevelRecord): void {
        this._recordData = recordData;

        if (!recordData) {
            console.log('[HistoryItem] 设置了空的记录数据。');
            // 可以选择隐藏节点或显示空状态
            this.node.active = false;
            return;
        }

        this.node.active = true;

        // 更新 UI 显示
        if (this.difficultyLabel) {
            this.difficultyLabel.string = recordData.difficulty;
            // 可以根据难度设置不同的颜色 (可选)
            // this.difficultyLabel.color = this.getDifficultyColor(recordData.difficulty);
        }
        if (this.levelLabel) {
            this.levelLabel.string = `第 ${recordData.levelIndex} 关`;
        }
        if (this.bestTimeLabel) {
            this.bestTimeLabel.string = `最佳: ${this.formatTime(recordData.bestTimeSeconds)}`;
        }
        if (this.dateLabel) {
            const date = new Date(recordData.firstCompletionTimestamp);
            // 使用更友好的日期格式
            this.dateLabel.string = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        }
    }

    /**
     * 处理再次挑战按钮点击事件。
     */
    private onChallengeClick(): void {
        if (this._recordData) {
            console.log(`[HistoryItem] 挑战按钮点击: ${this._recordData.difficulty} - ${this._recordData.levelIndex}`);
            // 发射全局事件，携带难度和关卡信息，由 GameManager 监听处理
            director.emit(Constants.EventName.CHALLENGE_BUTTON_CLICKED, this._recordData.difficulty, this._recordData.levelIndex);
            // UIManager 应该在 GameManager 处理后关闭弹窗
        } else {
            console.log('[HistoryItem] 挑战按钮点击时记录数据为空。');
        }
    }

    /**
     * 格式化时间（秒）为 MM:SS 格式。
     * @param totalSeconds 总秒数。
     * @returns 返回 MM:SS 格式的字符串。
     */
    private formatTime(totalSeconds: number): string {
        if (isNaN(totalSeconds) || totalSeconds < 0) {
            return "00:00";
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60); // 取整秒
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // 可选：根据难度获取颜色
    // private getDifficultyColor(difficulty: DifficultyType): Color {
    //     switch (difficulty) {
    //         case Constants.Difficulty.ENTRY: return Color.GREEN;
    //         case Constants.Difficulty.EASY: return Color.BLUE;
    //         case Constants.Difficulty.MEDIUM: return Color.YELLOW; // 可能需要调整颜色使其可见
    //         case Constants.Difficulty.HARD: return Color.ORANGE;
    //         case Constants.Difficulty.MASTER: return Color.RED;
    //         default: return Color.WHITE;
    //     }
    // }

    protected onDestroy(): void {
        // 移除事件监听
        if (this.challengeButton) {
            if (this.challengeButton.node) {
                this.challengeButton.node.off(Button.EventType.CLICK, this.onChallengeClick, this);    
            } else {
                console.error('ChallengeButton node is not set in HistoryItem!');
            }   
        }else{
            console.error('ChallengeButton is not set in HistoryItem!');
        }
    }
}

/*
节点引用: 获取 Prefab 内部各个 Label 和 Button 的引用。

_recordData: 存储传递给该列表项的 LevelRecord 数据。

setData 方法:

这是核心方法，由 UIManager 在创建和填充历史记录列表时调用。

接收 LevelRecord 数据并存储。

根据数据更新各个 Label 的显示内容。

包含了时间格式化 (formatTime) 和可选的日期格式化。

onChallengeClick 方法:

当“再次挑战”按钮被点击时触发。

从存储的 _recordData 中获取难度和关卡序号。

发射全局事件 Constants.EventName.CHALLENGE_BUTTON_CLICKED，携带必要信息。GameManager 会监听此事件来启动对应的关卡。

formatTime 方法: 一个简单的辅助方法，将秒数格式化为 MM:SS 字符串。

事件绑定与解绑: 在 onLoad 中绑定按钮事件，在 onDestroy 中解绑。


*/