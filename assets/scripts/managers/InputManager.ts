// assets/scripts/managers/InputManager.ts

import { _decorator, Component, EventTouch, Node, log, warn, error, director, SystemEventType } from 'cc';
import { Constants, DifficultyType } from '../utils/Constants';
import { ActionRecord } from '../data/ActionRecord';
import { GridManager } from './GridManager'; // 需要 GridManager 实例
import { SudokuLogic } from '../logic/SudokuLogic'; // 需要 SudokuLogic 实例
import { UIManager } from './UIManager'; // 需要 UIManager 实例
import { AudioManager } from './AudioManager'; // 需要 AudioManager 实例
import { EffectsManager } from './EffectsManager'; // 需要 EffectsManager 实例
import { BoardData,cloneBoardData } from '../data/GameData';

const { ccclass, property } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    // --- 依赖注入（或查找） ---
    // 这些管理器实例需要在 InputManager 初始化时被设置或找到
    private gridManager: GridManager | null = null;
    private sudokuLogic: SudokuLogic | null = null;
    private uiManager: UIManager | null = null;
    private audioManager: AudioManager | null = null;
    private effectsManager: EffectsManager | null = null;

    // --- 内部状态 ---
    private _selectedRow: number = -1; // 当前选中的行 (-1 表示未选中)
    private _selectedCol: number = -1; // 当前选中的列 (-1 表示未选中)
    private _undoStack: ActionRecord[] = []; // 撤销栈
    private _redoStack: ActionRecord[] = []; // 恢复栈
    private _isInputEnabled: boolean = true; // 控制是否接受输入（例如，动画播放期间可以禁用）
    private _currentBoardData: BoardData | null = null; // 缓存当前棋盘数据，避免频繁从 GridManager 获取

    // --- 初始化 ---
    /**
     * 初始化 InputManager，设置依赖的管理器实例。
     * 通常由 GameManager 在游戏启动时调用。
     * @param gridManager GridManager 实例
     * @param uiManager UIManager 实例
     * @param audioManager AudioManager 实例
     * @param effectsManager EffectsManager 实例
     */
    public initialize(
        gridManager: GridManager,
        uiManager: UIManager,
        audioManager: AudioManager,
        effectsManager: EffectsManager
    ): void {
        console.log('[InputManager] Initializing...');
        this.gridManager = gridManager;
        this.uiManager = uiManager;
        this.audioManager = audioManager;
        this.effectsManager = effectsManager;
        this.sudokuLogic = SudokuLogic.getInstance(); // 获取 SudokuLogic 单例

        if (!this.gridManager || !this.uiManager || !this.audioManager || !this.effectsManager || !this.sudokuLogic) {
            error('[InputManager] Initialization failed: Missing required manager instances.');
            return;
        }

        // 监听来自 UIManager 的事件 (或者直接让 UIManager 调用这里的 public 方法)
        // 使用事件系统可以更好地解耦
        director.on(Constants.EventName.CELL_CLICKED, this.onCellClicked, this);
        director.on(Constants.EventName.NUMBER_INPUT, this.onNumberInput, this);
        director.on(Constants.EventName.CLEAR_BUTTON_CLICKED, this.onClearButtonClicked, this);
        director.on(Constants.EventName.UNDO_BUTTON_CLICKED, this.onUndoButtonClicked, this);
        director.on(Constants.EventName.REDO_BUTTON_CLICKED, this.onRedoButtonClicked, this);

        console.log('[InputManager] Initialized successfully and listening for UI events.');
    }

    /**
     * 当开始新游戏或加载游戏时，重置 InputManager 的状态。
     * @param boardData 当前关卡的棋盘数据副本。
     */
    public reset(boardData: BoardData): void {
        console.log('[InputManager] Resetting state.');
        this._selectedRow = -1;
        this._selectedCol = -1;
        this._undoStack = [];
        this._redoStack = [];
        this._isInputEnabled = true;
        // **非常重要**: 存储棋盘数据的副本，而不是引用
        this._currentBoardData = boardData; // 假设传入的是克隆后的数据
        this.updateUndoRedoState();
        this.updateNumberPadState(); // 清除数字面板状态
    }

    // --- 事件处理 ---

    /**
     * 处理格子点击事件。
     * @param row 被点击的行 (0-8)。
     * @param col 被点击的列 (0-8)。
     */
    private onCellClicked(row: number, col: number): void {
        console.log(`[InputManager] Cell clicked: (${row}, ${col})`);
        if (!this._isInputEnabled || !this._currentBoardData) return;
        
        // 检查点击的是否是可编辑的格子
        if (this._currentBoardData.presetMask[row][col]) {
            console.log('[InputManager] Clicked on a preset cell. Ignoring selection.');
            return;
        }

        // 如果点击的是已选中的格子，则取消选择 (可选逻辑)
        if (this._selectedRow === row && this._selectedCol === col) {
            this.deselectCurrentCell();
            return;
        }

        // 更新选中状态
        this._selectedRow = row;
        this._selectedCol = col;

        // 通知 UIManager 更新格子高亮
        this.uiManager?.highlightCell(row, col);

        // 播放音效
        this.audioManager?.playSFX(Constants.AudioClipName.CLICK);

        // 更新数字输入板状态
        this.updateNumberPadState();
    }

    /**
     * 处理数字输入按钮点击事件。
     * @param number 被点击的数字 (1-9)。
     */
    private onNumberInput(num: number): void {
        if (!this._isInputEnabled || this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            console.log('[InputManager] Number input ignored: No cell selected or input disabled.');
            return;
        }

        const row = this._selectedRow;
        const col = this._selectedCol;

        // 再次检查是否为预设格子 (安全校验)
        if (this._currentBoardData.presetMask[row][col]) {
            warn('[InputManager] Attempted to input number into a preset cell.');
            return;
        }

        // 检查输入是否合法 (是否会引起冲突)
        // 注意：这里可以根据游戏策略决定是否允许输入冲突数字
        // 如果允许冲突，则不需要 isValidMove 检查，只在完成时判断
        // 如果不允许冲突，则进行检查
        const isValid = this.sudokuLogic!.isValidMove(this._currentBoardData, row, col, num);
        if (!isValid) {
            console.log(`[InputManager] Invalid move: Placing ${num} at (${row}, ${col}) creates a conflict.`);
            // 可以给用户反馈，例如震动或提示
            // this.uiManager?.showInvalidMoveIndicator(row, col);
            // 播放错误音效？
            return; // 阻止无效输入
        }

        const previousValue = this._currentBoardData.grid[row][col];

        if (previousValue === num) {
            console.log('[InputManager] 输入数字与当前格子数字相同，则视为无效操作.');
            return;
        }

        console.log(`[InputManager] Inputting number ${num} at (${row}, ${col}). Previous value: ${previousValue} set _isInputEnabled to false`);

        // 禁用输入，防止动画期间的干扰
        this._isInputEnabled = false;

        // 1. 播放音效
        this.audioManager?.playSFX(Constants.AudioClipName.FILL);

        // 2. 通知 UIManager 播放数字出现动画，并在动画后更新数据
        this.uiManager?.playInputAnimation(row, col, num, () => {
            this.performFillAction(row, col, num, previousValue);
            // 重新启用输入
            this._isInputEnabled = true;
        });
    }

    /**
     * 处理清除按钮点击事件。
     */
    private onClearButtonClicked(): void {
        if (!this._isInputEnabled || this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            console.log('[InputManager] Clear ignored: No cell selected or input disabled.');
            return;
        }

        const row = this._selectedRow;
        const col = this._selectedCol;

        // 检查是否为预设格子
        if (this._currentBoardData.presetMask[row][col]) {
            console.warn('[InputManager] Attempted to clear a preset cell.');
            return;
        }

        const previousValue = this._currentBoardData.grid[row][col];
        if (previousValue === 0) {
            console.log('[InputManager] 格子本来就是空的，则无需操作.');
            return;
        }

        this._isInputEnabled = false;
        this.audioManager?.playSFX(Constants.AudioClipName.CLEAR);

        console.log(`[InputManager] 开始清理 (${row}, ${col}). 原先数字为 : ${previousValue}`);
        // 2. 通知 UIManager 播放数字消失动画，并在动画后更新数据
        this.uiManager?.playClearAnimation(row, col, () => {
            this.performClearAction(row, col, previousValue);
            this._isInputEnabled = true;
        });
    }

    /**
     * 处理撤销按钮点击事件。
     */
    private onUndoButtonClicked(): void {
        if (!this._isInputEnabled || this._undoStack.length === 0) {
            console.log('[InputManager] Undo ignored: Stack empty or input disabled.');
            return;
        }

        const action = this._undoStack.pop()!; // 从撤销栈弹出
        console.log(`[InputManager] Undoing action: type=${action.type}, cell=(${action.row}, ${action.col}), prev=${action.previousValue}, new=${action.newValue}`);

        // 执行反向操作
        if (action.type === 'fill') {
            // 撤销 'fill' 就是 'clear' 回 previousValue (通常是 0)
            this.uiManager?.playInputAnimation(action.row, action.col, action.previousValue, () => {
            
            });
        } else { // action.type === 'clear'
            this.uiManager?.playClearAnimation(action.row, action.col, () => {
                
            });
        }
        this.updateGridCellValue(action.row, action.col, action.previousValue); // 更新数据

        this._redoStack.push(action); // 将操作压入恢复栈

        // 播放音效
        this.audioManager?.playSFX(Constants.AudioClipName.CLICK); // 使用通用点击音效？

        // 更新按钮状态和数字面板
        this.updateUndoRedoState();
        this.updateNumberPadState(); // 撤销后当前选中格子的候选数字可能变化
        this.checkCompletionAfterUpdate(action.row, action.col); // 检查完成状态
    }

    /**
     * 处理恢复按钮点击事件。
     */
    private onRedoButtonClicked(): void {
        if (!this._isInputEnabled || this._redoStack.length === 0) {
            console.log('[InputManager] Redo ignored: Stack empty or input disabled.');
            return;
        }

        const action = this._redoStack.pop()!; // 从恢复栈弹出
        console.log(`[InputManager] Redoing action: type=${action.type}, cell=(${action.row}, ${action.col}), prev=${action.previousValue}, new=${action.newValue}`);

        // 执行反向操作
        if (action.type === 'fill') {
            this.uiManager?.playInputAnimation(action.row, action.col, action.newValue, () => {
                
            });
        } else {
            this.uiManager?.playClearAnimation(action.row, action.col, () => {
                
            });
        }
        this.updateGridCellValue(action.row, action.col, action.newValue); // 更新数据
        this._undoStack.push(action); // 将操作压回撤销栈
        this.audioManager?.playSFX(Constants.AudioClipName.CLICK);// 播放音效

        // 更新按钮状态和数字面板
        this.updateUndoRedoState();
        this.updateNumberPadState();
        this.checkCompletionAfterUpdate(action.row, action.col); // 检查完成状态
    }

    // --- 核心操作逻辑 ---

    /**
     * 执行填充数字的操作，包括更新数据、记录操作、更新UI状态。
     * @param row 行
     * @param col 列
     * @param num 填入的数字
     * @param previousValue 之前的值
     */
    private performFillAction(row: number, col: number, num: number, previousValue: number): void {
        // 1. 更新棋盘数据
        this.updateGridCellValue(row, col, num);

        // 2. 创建并记录操作
        const action = new ActionRecord('fill', row, col, previousValue, num);
        this.recordAction(action);

        // 3. 更新数字面板状态 (因为当前格子的候选数字变了)
        this.updateNumberPadState();

        // 4. 检查完成状态 (行、列、宫、全局)
        this.checkCompletionAfterUpdate(row, col);
    }

    /**
     * 执行清除数字的操作，包括更新数据、记录操作、更新UI状态。
     * @param row 行
     * @param col 列
     * @param previousValue 被清除的数字
     */
    private performClearAction(row: number, col: number, previousValue: number): void {
        console.log(`[InputManager] performClearAction: row=${row}, col=${col}, prevValue=${previousValue}`);
        // 1. 更新棋盘数据 (清除为 0)
        this.updateGridCellValue(row, col, 0);

        // 2. 创建并记录操作
        const action = new ActionRecord('clear', row, col, previousValue, 0);
        this.recordAction(action);

        // 3. 更新数字面板状态 (因为当前格子的候选数字变了)
        this.updateNumberPadState();
    }


    /**
     * 获取当前棋盘数据的克隆副本。
     * 提供给 GameManager 用于保存游戏状态。
     * @returns 返回当前棋盘数据的深拷贝副本，如果数据无效则返回 null。
     */
    public getCurrentBoardData(): BoardData | null {
        if (!this._currentBoardData) {
            warn('[InputManager] 尝试获取棋盘数据，但内部缓存为空。');
            return null;
        }
        // 返回克隆副本，防止外部修改影响 InputManager 的内部状态
        return cloneBoardData(this._currentBoardData);
    }

    /**
     * 更新内部棋盘数据模型和通知 GridManager 更新视觉。
     * @param row 行
     * @param col 列
     * @param value 新的值 (0-9)
     */
    private updateGridCellValue(row: number, col: number, value: number): void {
        console.log(`[InputManager] Updating cell (${row}, ${col}) to value: ${value}`);
        if (!this._currentBoardData) {
            console.warn('[InputManager] 尝试更新格子，但当前棋盘数据为空。');
            return;
        }
        
        this._currentBoardData.grid[row][col] = value;
    }

    /**
     * 记录一个用户操作到撤销栈，并清空恢复栈。
     * @param action 要记录的操作。
     */
    private recordAction(action: ActionRecord): void {
        this._undoStack.push(action);
        this._redoStack = []; 
        this.updateUndoRedoState();
    }

    // --- 状态更新与检查 ---

    /**
     * 更新撤销和恢复按钮的可用状态，并通知 UIManager。
     */
    private updateUndoRedoState(): void {
        const canUndo = this._undoStack.length > 0;
        const canRedo = this._redoStack.length > 0;
        // 通知 UIManager 更新按钮状态
        this.uiManager?.updateUndoRedoButtons(canUndo, canRedo);
        // 或者使用事件
        // director.emit(Constants.EventName.UNDO_STATE_UPDATE, canUndo, canRedo);
    }

    /**
     * 更新数字输入面板按钮的可用状态 (根据当前选中格子)。
     */
    private updateNumberPadState(): void {
        console.log(`[InputManager] Updating number pad state., row ${this._selectedRow}, col ${this._selectedCol}`);
        if (this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            this.uiManager?.updateNumberPadState([]); // 传入空数组表示默认状态或全部可用
            return;
        }

        // 获取当前选中格子的合法候选数字
        const validNumbers = this.sudokuLogic!.getValidCandidates(this._currentBoardData, this._selectedRow, this._selectedCol);
        // 通知 UIManager 更新数字按钮背景
        this.uiManager?.updateNumberPadState(validNumbers);
    }

    /**
     * 在用户更新格子后检查相关行、列、宫以及整个棋盘的完成状态。
     * @param row 发生更新的行
     * @param col 发生更新的列
     */
    private checkCompletionAfterUpdate(row: number, col: number): void {
        console.log(`[InputManager] checkCompletionAfterUpdate: row=${row}, col=${col}`);
        if (!this._currentBoardData) return;

        const boxIndex = Math.floor(row / Constants.BOX_SIZE) * Constants.BOX_SIZE + Math.floor(col / Constants.BOX_SIZE);

        let partCompleted = false;

        // 检查行
        if (this.sudokuLogic!.isPartComplete(this._currentBoardData, 'row', row)) {
            console.log(`[InputManager] Row ${row} completed!`);
            this.audioManager?.playSFX(Constants.AudioClipName.APPLAUSE);
            // 可以通知 UIManager 高亮该行
            // this.uiManager?.highlightCompletedPart('row', row);
            partCompleted = true;
        }
        // 检查列
        if (this.sudokuLogic!.isPartComplete(this._currentBoardData, 'col', col)) {
             console.log(`[InputManager] Column ${col} completed!`);
             this.audioManager?.playSFX(Constants.AudioClipName.APPLAUSE);
             // this.uiManager?.highlightCompletedPart('col', col);
             partCompleted = true;
        }
        // 检查宫
        if (this.sudokuLogic!.isPartComplete(this._currentBoardData, 'box', boxIndex)) {
             console.log(`[InputManager] Box ${boxIndex} completed!`);
             this.audioManager?.playSFX(Constants.AudioClipName.APPLAUSE);
             // this.uiManager?.highlightCompletedPart('box', boxIndex);
             partCompleted = true;
        }

        // 如果有部分完成，检查全局是否完成
        if (partCompleted) {
            console.log('[InputManager] Checking global completion...');
            if (this.sudokuLogic!.isBoardComplete(this._currentBoardData)) {
                console.log('[InputManager] Board completed!');
                this._isInputEnabled = false; // 游戏结束，禁用输入
                this.deselectCurrentCell(); // 取消选择
                // 通知 GameManager 游戏胜利
                director.emit(Constants.EventName.GAME_OVER, true); // isWin = true
            }
        }
    }


    /**
     * 取消当前选中的格子。
     */
    private deselectCurrentCell(): void {
        if (this._selectedRow !== -1 || this._selectedCol !== -1) {
            console.log('[InputManager] Deselecting cell.');
            this._selectedRow = -1;
            this._selectedCol = -1;
            this.uiManager?.deselectCell(); // 通知 UI 取消高亮
            this.updateNumberPadState(); // 更新数字面板状态
        }
    }

    // --- 清理 ---
    protected onDestroy(): void {
        console.log('[InputManager] onDestroy');
        // 移除事件监听器
        director.off(Constants.EventName.CELL_CLICKED, this.onCellClicked, this);
        director.off(Constants.EventName.NUMBER_INPUT, this.onNumberInput, this);
        director.off(Constants.EventName.CLEAR_BUTTON_CLICKED, this.onClearButtonClicked, this);
        director.off(Constants.EventName.UNDO_BUTTON_CLICKED, this.onUndoButtonClicked, this);
        director.off(Constants.EventName.REDO_BUTTON_CLICKED, this.onRedoButtonClicked, this);
    }
}
