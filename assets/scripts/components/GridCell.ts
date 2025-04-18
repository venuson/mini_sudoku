import { _decorator, Component, Node, Sprite, Label, Button, error, log, isValid,Color } from 'cc';

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

    /**
     * 更新格子的显示状态。
     * (这个方法可以替代 GridManager 中的 updateCellNode 部分逻辑，让 GridManager 调用此方法)
     * @param value 新的数值 (0-9)。
     * @param isPreset 是否是预设。
     * @param bgFrame 背景 SpriteFrame。
     * @param numberFrame 数字 SpriteFrame (如果用 Sprite 显示)。
     * @param presetColor 预设数字颜色 (如果用 Label 或需要区分 Sprite 颜色)。
     * @param userColor 用户输入数字颜色。
     */
    public updateDisplay(
        value: number,
        isPreset: boolean,
        numberFrame: SpriteFrame | null
    ): void {
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
                    // this.numberDisplayNode.active = false;
                }
            } else {
                // numSprite.spriteFrame = null;
                console.log(`[GridCell] 清除数字: ${value}`);
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
        }
        // 如果高亮是改变背景颜色或边框，在这里处理
    }

    /**
     * 获取数字显示节点的引用，用于动画。
     */
    public getNumberDisplayNode(): Node | null {
        return this.numberDisplayNode;
    }

    // --- (可选) 点击事件处理 ---
    // private onClick(): void {
    //     if (this._row === -1 || this._col === -1) return;
    //     log(`[GridCell] Clicked: (${this._row}, ${this._col})`);
    //     // 发射事件，携带行列信息
    //     director.emit(Constants.EventName.CELL_CLICKED, this._row, this._col);
    // }

    protected onDestroy(): void {
        // 移除事件监听 (如果在这里添加了的话)
        // this.node.off(Node.EventType.TOUCH_END, this.onClick, this);
    }
}

/*
节点引用: 使用 @property 获取预制件内部的背景、数字显示节点和高亮节点的引用。
自身属性: 存储了格子的行列号 (_row, _col)、是否预设 (_isPreset) 和当前值 (_currentValue)。
init 方法: 提供一个初始化方法，供 GridManager 在创建格子时调用，传入行列号。
Getter 方法: 提供了获取格子属性的 getter 方法。
updateDisplay 方法: 封装了更新格子视觉表现的核心逻辑，包括设置背景、显示/隐藏数字（支持 Sprite 或 Label）、设置颜色等。GridManager 可以调用这个方法来更新格子，而不是直接操作格子的子节点。
setHighlight 方法: 控制格子的高亮状态（如果高亮效果是格子的一部分）。
getNumberDisplayNode 方法: 提供获取数字显示节点的接口，方便 UIManager 或 EffectsManager 获取动画目标。
点击事件 (注释掉): 代码中包含了可选的点击事件处理逻辑。如果选择在 GridCell 组件内部处理点击并发出事件，可以取消注释这部分代码，并移除 GridManager 中的相应监听逻辑。目前的设计是由 GridManager 统一处理点击。
请检查 GridCell.ts 文件。这个组件虽然可选，但有助于将格子的状态和显示逻辑封装在一起，使 GridManager 的代码更简洁。
*/