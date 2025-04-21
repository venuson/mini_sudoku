// assets/scripts/managers/GridManager.ts

import { _decorator, Component, Node, Prefab, instantiate, UITransform, error, warn, log, isValid, EventTouch,director ,UIOpacity} from 'cc';
import { Constants } from '../utils/Constants';
import { BoardData, LevelData, cloneBoardData } from '../data/GameData'; // 需要 BoardData 定义和克隆函数
import { UIManager } from './UIManager'; // 可能需要 UIManager 引用来获取资源
import { EffectsManager } from './EffectsManager'; // 引入 EffectsManager
import { GridCell } from '../components/GridCell';

const { ccclass, property } = _decorator;


@ccclass('GridManager')
export class GridManager extends Component {

    @property({ type: Prefab, tooltip: "单个棋盘格子的预制件" })
    private cellPrefab: Prefab | null = null;

    @property({ type: Node, tooltip: "格子高亮效果节点 (可选, 如果高亮是附加在格子上的)" })
    private highlightNode: Node | null = null; // 另一种高亮方式：一个独立的节点移动到选中格子上

    private _currentSelectedNode: Node | null = null;
    // --- 内部状态 ---
    private _gridCells: Node[][] = []; // 存储所有格子节点的二维数组
    private _currentBoardData: BoardData | null = null; // 存储当前关卡的逻辑数据副本
    private _isInitialized: boolean = false;
    private _presetCellsToReveal: { row: number, col: number, value: number }[] = []; // 存储待显示的预设格子信息

    // --- 依赖 ---
    private uiManager: UIManager | null = null; // 用于获取 SpriteFrame 等资源
    private effectsManager: EffectsManager | null = null; // 添加 EffectsManager 引用

    // --- 初始化 ---
    public initialize(uiManager: UIManager, effectsManager: EffectsManager): void {
        console.log('[GridManager] Initializing...');
        this.uiManager = uiManager;
        this.effectsManager = effectsManager;
        if (!this.cellPrefab) {
            error('[GridManager] Cell Prefab 未设置!');
            return;
        }
        if (!this.uiManager) {
             error('[GridManager] UIManager instance is required!');
             return;
        }
        if (!this.effectsManager) { // 检查 EffectsManager
            error('[GridManager] EffectsManager instance is required!');
            return;
       }

        this.createGridCells();
        this._isInitialized = true;
        console.log('[GridManager] Initialized successfully.');
    }

    /**
     * 创建 9x9 的格子并添加到棋盘容器节点。
     */
    private createGridCells(): void {
        console.log('[GridManager] Creating grid cells...');
        this.node.removeAllChildren(); 
        this._gridCells = [];

        const gridSize = Constants.GRID_SIZE;
        for (let r = 0; r < gridSize; r++) {
            this._gridCells[r] = [];
            for (let c = 0; c < gridSize; c++) {
                const cellNode = instantiate(this.cellPrefab!);
                if (!cellNode) {
                    error(`[GridManager] 实例化格子 (${r}, ${c}) 失败!`);
                    continue;
                }
                this.node.addChild(cellNode);
                this._gridCells[r][c] = cellNode;

                cellNode.on(Node.EventType.TOUCH_END, (event: EventTouch) => {
                    this.onCellNodeClicked(r, c);
                    event.propagationStopped = true; 
                }, this);
            }
        }
        console.log(`[GridManager] ${gridSize * gridSize} grid cells created.`);
    }


    private onCellNodeClicked(row: number, col: number): void {
        console.log(`[GridManager] Cell node clicked: (${row}, ${col}). Emitting event.`);
        director.emit(Constants.EventName.CELL_CLICKED, row, col);
    }

    /**
     * 随机打乱数组 (Fisher-Yates Shuffle)。
     * @param array 要打乱的数组。
     * @private
     */
    private shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // ES6 交换元素
        }
        return array;
    }

    /**
     * 创建一个延迟 Promise。
     * @param ms 延迟的毫秒数。
     * @private
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // --- 数据加载与更新 ---

    /**
     * 加载关卡数据到棋盘。
     * @param levelData 关卡数据。
     * @returns 返回棋盘数据的克隆副本，供 InputManager 缓存。
     */
    public loadLevel(levelData: LevelData): BoardData | null {
        if (!this._isInitialized) {
            console.error('[GridManager] loadLevel 在初始化之前被调用。');
            return null;
        }
        console.log(`[GridManager] Loading level: ${levelData.difficulty} - ${levelData.levelIndex}`);
        console.log(`[GridManager] level data: ${levelData.initialBoard}`);
        this._currentBoardData = cloneBoardData(levelData.initialBoard);
        this._presetCellsToReveal = []; // 清空待显示列表

        const gridSize = Constants.GRID_SIZE;
        for (let r = 0; r < gridSize; r++) {
            for (let c = 0; c < gridSize; c++) {
                if (!this._gridCells[r] || !this._gridCells[r][c]) {
                    warn(`[GridManager] 格子节点 (${r}, ${c}) 无效，跳过加载。`);
                    continue;
                }
                const cellNode = this._gridCells[r][c];
                const value = this._currentBoardData.grid[r][c];
                const isPreset = this._currentBoardData.presetMask[r][c];
                this.updateCellNode(cellNode, value, isPreset, true);

                if (isPreset && value > 0) {
                    this._presetCellsToReveal.push({ row: r, col: c, value: value });
                }
            }
        }
        console.log('[GridManager] Level loaded onto grid.');
        // 返回克隆的数据给调用者（通常是 GameManager，再传给 InputManager）
        return cloneBoardData(this._currentBoardData);
    }

    /**
     * 更新单个格子节点的视觉表现（背景、数字）。
     * 由 loadLevel 或 updateCellDisplay 调用。
     * @param cellNode 要更新的格子节点。
     * @param value 格子的数字 (0 表示空)。
     * @param isPreset 是否是预设数字。
     */
    private updateCellNode(cellNode: Node, value: number, isPreset: boolean, initialHidePreset: boolean = false): void {
        if (!isValid(cellNode) || !this.uiManager) return;

        const gridCell = cellNode.getComponent(GridCell);
        if (gridCell) {
            gridCell.updateDisplay(value, isPreset, this.uiManager.getNumberSpriteFrame(value));

            if (initialHidePreset && isPreset && value > 0) {
                console.log(`[GridManager] 初始加载时隐藏预设数字: (${gridCell.row}, ${gridCell.col}) = ${value}`);
                const numberDisplayNode = gridCell.getNumberDisplayNode();
                if (numberDisplayNode) {
                    numberDisplayNode.setScale(1, 1, 1);
                    const opacity = numberDisplayNode.getComponent(UIOpacity) || numberDisplayNode.addComponent(UIOpacity);
                    opacity.opacity = 255;
                }
            }
        }
    }

    /**
     * (新增) 播放预设数字逐个弹出的动画。
     * @param delayBetweenMs 每个数字弹出之间的延迟（毫秒）。
     * @returns 返回一个 Promise，在所有动画开始播放后（或完成后）解析。
     */
    public async revealPresetNumbersAnimated(delayBetweenMs: number = 50): Promise<void> {
        if (!this._isInitialized || !this.effectsManager) {
            warn('[GridManager] revealPresetNumbersAnimated 调用时未初始化或缺少 EffectsManager。');
            return;
        }
        if (this._presetCellsToReveal.length === 0) {
            log('[GridManager] 没有预设数字需要显示动画。');
            return;
        }

        log(`[GridManager] 开始播放 ${this._presetCellsToReveal.length} 个预设数字的显示动画...`);

        // 随机打乱顺序
        const shuffledPresets = this.shuffleArray([...this._presetCellsToReveal]); // 复制一份再打乱

        for (const preset of shuffledPresets) {
            const cellNode = this.getCellNode(preset.row, preset.col);
            if (isValid(cellNode)) {
                let numberDisplayNode: Node | null = null;

                // 获取数字节点 (优先使用 GridCell 组件)
                const gridCell = cellNode.getComponent(GridCell);
                if (gridCell) {
                    gridCell.updateDisplay(preset.value, true, this.uiManager.getNumberSpriteFrame(preset.value));
                    numberDisplayNode = gridCell.getNumberDisplayNode();
                    if (numberDisplayNode) {
                        this.effectsManager.animateNumberAppear(numberDisplayNode);
                    } else {
                         warn(`[GridManager] 未找到格子 (${preset.row}, ${preset.col}) 的 NumberDisplay 节点用于动画。`);
                    }
                }
            } else {
                 warn(`[GridManager] 未找到格子 (${preset.row}, ${preset.col}) 节点用于动画。`);
            }

            // 等待一小段时间再显示下一个
            await this.delay(delayBetweenMs);
        }

        log('[GridManager] 所有预设数字动画已开始播放。');
        this._presetCellsToReveal = []; // 清空列表
    }

    /**
     * 由 InputManager 调用，用于更新特定格子的数字显示（通常是用户操作的结果）。
     * @param row 行
     * @param col 列
     * @param value 新的数字 (0 表示清除)
     * @param isPreset 理论上用户操作的都不是预设，但保留参数以防万一
     */
    public updateCellDisplay(row: number, col: number, value: number, isPreset: boolean): void {
        if (!this._isInitialized) {
            console.warn('[GridManager] updateCellDisplay 在初始化之前被调用。');
            return;
        }
        if (row < 0 || row >= Constants.GRID_SIZE || col < 0 || col >= Constants.GRID_SIZE) {
            console.error(`[GridManager] updateCellDisplay 收到无效的行列索引: (${row}, ${col})`);
             return;
         }
         if (!this._gridCells[row] || !this._gridCells[row][col]) {
            console.warn(`[GridManager] 格子节点 (${row}, ${col}) 无效，无法更新显示。`);
             return;
         }

         const cellNode = this._gridCells[row][col];
         console.log(`[GridManager] Updating cell display: (${row}, ${col}), ${isPreset} to ${value} `);
         this.updateCellNode(cellNode, value, isPreset);
    }


    // --- 高亮控制 ---

    /**
     * 高亮显示指定的格子。
     * @param row 行
     * @param col 列
     */
    public highlightCell(row: number, col: number): void {
        console.log(`[GridManager] Highlighting cell: (${row}, ${col})`);
        if (!this._isInitialized) return;
        if (row < 0 || row >= Constants.GRID_SIZE || col < 0 || col >= Constants.GRID_SIZE) return;

        // 先取消之前的高亮
        this.deselectCell();

        // 方式一：激活格子内部的高亮节点
        const cellNode = this._gridCells[row]?.[col];
        if (isValid(cellNode)) {
            cellNode.getComponent(GridCell)?.setHighlight(true);
            if(cellNode.getComponent(GridCell) && cellNode.getComponent(GridCell).getComponent(UIOpacity)){
                console.log(`[GridManager] 格子 (${row}, ${col}) 高亮节点已启用。${cellNode.getComponent(GridCell).getComponent(UIOpacity).opacity}`);
            }
            
            this._currentSelectedNode = cellNode;
        } else {
            console.warn(`[GridManager] 未找到格子 (${row}, ${col}) 节点用于高亮。`);
        }
    }

    /**
     * 取消所有格子的高亮状态。
     */
    public deselectCell(): void {
        console.log(`[GridManager] Deselecting current cell.`);
        if (!this._isInitialized) return;
        if (this._currentSelectedNode) {
            this._currentSelectedNode.getComponent(GridCell)?.setHighlight(false);
            this._currentSelectedNode = null;
        }
    }

     /**
     * 获取指定行列对应的格子节点。
     * @param row 行
     * @param col 列
     * @returns 返回格子节点 Node，如果无效则返回 null。
     */
     public getCellNode(row: number, col: number): Node | null {
         if (!this._isInitialized || row < 0 || row >= Constants.GRID_SIZE || col < 0 || col >= Constants.GRID_SIZE) {
             return null;
         }
         return this._gridCells[row]?.[col] ?? null;
     }
}