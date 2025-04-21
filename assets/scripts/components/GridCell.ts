import { _decorator, Component, Node, Sprite, Color, SpriteFrame, Button, UIOpacity } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('GridCell')
export class GridCell extends Component {

    @property({ type: Sprite, tooltip: "背景 Sprite 组件" })
    private bgSprite: Sprite | null = null;

    @property({ type: Node, tooltip: "用于显示数字的节点 (可以是 Sprite 或 Label)" })
    private numberDisplayNode: Node | null = null;

    @property({ type: Sprite, tooltip: "高亮状态的 Sprite 组件 (可选)" })
    private highlightSprite: Sprite | null = null;

    // --- 格子自身属性 ---
    private _row: number = -1;
    private _col: number = -1;
    private _isPreset: boolean = false;
    private _currentValue: number = 0;

    // --- 初始化 ---
    /**
     * 初始化格子组件。
     * 通常由 GridManager 在创建格子时调用。
     * @param row 格子的行索引 (0-8)。
     * @param col 格子的列索引 (0-8)。
     */
    public init(row: number, col: number): void {
        this._row = row;
        this._col = col;
    }

    // --- 公共方法 ---

    /**
     * 获取格子的行索引。
     */
    public get row(): number {
        return this._row;
    }

    /**
     * 获取格子的列索引。
     */
    public get col(): number {
        return this._col;
    }

    /**
     * 获取格子当前显示的数值。
     */
    public get value(): number {
        return this._currentValue;
    }

    /**
     * 获取格子是否是预设数字。
     */
    public get isPreset(): boolean {
        return this._isPreset;
    }

    public updateDisplay(value: number, isPreset: boolean, numberFrame: SpriteFrame | null): void {
        this._currentValue = value;
        this._isPreset = isPreset;
        let presetColor: Color = new Color(0xcc, 0xcc, 0xcc, 255);

        // 更新数字
        if (this.numberDisplayNode) {
            const numSprite = this.numberDisplayNode.getComponent(Sprite);
            if (value > 0) {
                this.numberDisplayNode.active = true;
                console.log(`[GridCell] 更新数字: ${value}，预设: ${isPreset}`);
                if (numSprite && numberFrame) { // 优先使用 Sprite
                    numSprite.spriteFrame = numberFrame;
                    if (isPreset) {
                        numSprite.color = presetColor;
                    } 
                } else {
                    console.warn(`[GridCell] 未找到数字显示组件 (Sprite 或 Label)。`);
                }
            } else {
                console.log(`[GridCell] 清除数字: ${value}`);
                numSprite.spriteFrame = null;
                this.numberDisplayNode.active = false;
            }
        }

        // 隐藏高亮
        // this.setHighlight(false);
    }

    /**
     * 设置格子的高亮状态。
     * @param active 是否激活高亮。
     */
    public setHighlight(active: boolean): void {
        if (this.highlightSprite) {
            this.highlightSprite.node.active = active;
            console.log(`[GridCell] setHighlight:${active}`);
        }
    }

    /**
     * 获取数字显示节点的引用，用于动画。
     */
    public getNumberDisplayNode(): Node | null {
        return this.numberDisplayNode;
    }


    protected onDestroy(): void {
    }
}
