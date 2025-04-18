import { Constants, DifficultyType } from "../utils/Constants";
import { BoardData, createEmptyBoardData } from "../data/GameData";

//Import SudokuCore: 使用 import SudokuCore from '../vendor/SudokuCore'; 导入。你需要将 SudokuCore 文件放到 assets/scripts/vendor/ 目录下，或者修改这个路径。

// Singleton Pattern: SudokuLogic 被实现为一个单例 (getInstance() 方法)，因为 SudokuCore 需要初始化一次，并且其内部状态（如 SQUARES, UNITS 等）是共享的。
// Initialization: 在 constructor 中创建 SudokuCore 实例并调用其 initialize() 方法。
// Conversion Helpers: 添加了 convertStringToBoardData 和 convertBoardDataToString 两个私有方法，用于在我们的 BoardData 格式和 SudokuCore 使用的字符串格式之间转换。
// generateSudoku:
// 根据 SDD 的要求，结合 difficulty 和 levelIndex 计算出目标预设数字数量 (givens)。
// 调用 this.core.generate(targetGivens) 获取棋盘字符串。
// 调用 this.core.solve() 来获取解字符串 (这对于后续验证和可能的提示功能很有用)。
// 使用 convertStringToBoardData 将生成的棋盘字符串和解字符串转换为 BoardData 格式。
// 添加了错误处理和日志。
// isValidMove: 重新实现了这个方法，直接在 BoardData 上检查行、列、宫的冲突。这比调用 SudokuCore 的内部函数或求解器进行单步验证要高效得多。
// isPartComplete: 实现了检查行、列、宫是否完成的逻辑。
// isBoardComplete: 实现了检查整个棋盘是否完成的逻辑，通过调用 isPartComplete 检查所有部分。注释中也提到了如果 BoardData 包含 solution，可以直接比较 grid 和 solution。
// getValidCandidates: 添加了一个方法，用于获取指定空格所有合法的候选数字，使用了我们自己实现的 isValidMove。
// solveSudoku (Optional): 提供了一个可选的方法，如果游戏逻辑的其他部分需要求解一个棋盘状态，可以调用此方法。
// 下一步:
// 将 SudokuCore 文件放入 assets/scripts/vendor/ 目录 (如果 vendor 目录不存在，请创建它)。
// 检查 tsconfig.json: 确保 compilerOptions 中包含 "allowJs": true。如果 Cocos Creator 的默认配置没有，你可能需要手动添加或修改。
// 检查代码: 请仔细检查 SudokuLogic.ts 的代码，特别是路径、难度计算逻辑以及与 SudokuCore 的交互部分。

// --- Import the external JavaScript Sudoku library ---
// Adjust the path based on where you place SudokuCore
// We assume 'allowJs' is true in tsconfig.json
// If direct import fails, we might need ambient declarations (.d.ts)
import SudokuCore from '../vendor/SudokuCore'; // Adjust path as needed

/**
 * @description 数独核心逻辑模块
 * 封装了外部 SudokuCore 库的功能，提供符合项目数据结构的接口。
 * 负责生成数独谜题、验证移动合法性、检查完成状态等。
 */
export class SudokuLogic {

    private static instance: SudokuLogic | null = null;
    private core: SudokuCore; // Instance of the external library

    private constructor() {
        this.core = new SudokuCore();
        this.core.initialize(); // Initialize the core library structures
        console.log('[SudokuLogic] SudokuCore initialized.');
    }

    /**
     * 获取 SudokuLogic 的单例实例。
     */
    public static getInstance(): SudokuLogic {
        if (!SudokuLogic.instance) {
            SudokuLogic.instance = new SudokuLogic();
        }
        return SudokuLogic.instance;
    }

    // --- Board Conversion Helpers ---

    /**
     * 将 SudokuCore 使用的字符串棋盘格式转换为项目使用的 BoardData 格式。
     * @param boardString 81个字符的字符串，'.' 代表空格。
     * @param solutionString (可选) 81个字符的解字符串。
     * @returns 返回 BoardData 对象。
     */
    private convertStringToBoardData(boardString: string, solutionString?: string): BoardData {
        const boardData = createEmptyBoardData();
        if (boardString.length !== Constants.GRID_SIZE * Constants.GRID_SIZE) {
            console.error("[SudokuLogic] Invalid board string length for conversion:", boardString);
            return boardData; // Return empty board on error
        }

        for (let r = 0; r < Constants.GRID_SIZE; r++) {
            for (let c = 0; c < Constants.GRID_SIZE; c++) {
                const index = r * Constants.GRID_SIZE + c;
                const char = boardString[index];

                if (char >= '1' && char <= '9') {
                    boardData.grid[r][c] = parseInt(char, 10);
                    boardData.presetMask[r][c] = true; // Digits in the initial string are presets
                } else {
                    boardData.grid[r][c] = 0; // '.' or other becomes 0
                    boardData.presetMask[r][c] = false;
                }
            }
        }

        // Convert solution if provided
        if (solutionString && solutionString.length === Constants.GRID_SIZE * Constants.GRID_SIZE) {
            boardData.solution = createEmptyBoardData().grid; // Initialize solution grid
             for (let r = 0; r < Constants.GRID_SIZE; r++) {
                for (let c = 0; c < Constants.GRID_SIZE; c++) {
                    const index = r * Constants.GRID_SIZE + c;
                    const solChar = solutionString[index];
                     if (solChar >= '1' && solChar <= '9') {
                        boardData.solution[r][c] = parseInt(solChar, 10);
                    } else {
                         boardData.solution[r][c] = 0; // Should not happen for a valid solution
                    }
                }
            }
        }


        return boardData;
    }

    /**
     * 将项目使用的 BoardData 格式转换为 SudokuCore 使用的字符串格式。
     * 只转换 grid 数据，忽略 presetMask。
     * @param boardData BoardData 对象。
     * @returns 81个字符的字符串，0 被转换成 '.'。
     */
    private convertBoardDataToString(boardData: BoardData): string {
        let boardString = "";
        for (let r = 0; r < Constants.GRID_SIZE; r++) {
            for (let c = 0; c < Constants.GRID_SIZE; c++) {
                const num = boardData.grid[r][c];
                boardString += (num >= 1 && num <= 9) ? num.toString() : this.core.BLANK_CHAR;
            }
        }
        return boardString;
    }

    // --- Puzzle Generation ---

    /**
     * 根据难度和关卡序号生成数独谜题。
     * @param difficulty 游戏难度 ('入门', '初级', ...)
     * @param levelIndex 关卡序号 (1-30)
     * @returns 返回包含初始棋盘和解的 BoardData 对象，如果生成失败则返回 null。
     */
    public generateSudoku(difficulty: DifficultyType, levelIndex: number): BoardData | null {
        console.log(`[SudokuLogic] Generating puzzle for difficulty: ${difficulty}, level: ${levelIndex}`);

        let difficultyKey: keyof typeof Constants.Difficulty | null = null;
        for (const key in Constants.Difficulty) {
            // 使用类型断言确保 key 是 Difficulty 的有效键
            const typedKey = key as keyof typeof Constants.Difficulty;
            if (Constants.Difficulty[typedKey] === difficulty) {
                difficultyKey = typedKey;
                break;
            }
        }

        if (!difficultyKey) {
            console.error(`[SudokuLogic] 无法找到难度 "${difficulty}" 对应的内部 Key。`);
            return null;
        }

        // 1. 计算目标空格数 (根据 SDD 5.4.2)
        const diffConfig = Constants.DifficultyEmptyCells[difficultyKey];
        if (!diffConfig) {
            console.error(`[SudokuLogic] Invalid difficulty provided: ${difficultyKey}`);
            return null;
        }
        const targetEmpty = Math.round(
            diffConfig.start + ((diffConfig.end - diffConfig.start) / (Constants.LEVELS_PER_DIFFICULTY - 1)) * (levelIndex - 1)
        );

        // 2. 计算目标预设数字数量 (Givens)
        let targetGivens = Constants.GRID_SIZE * Constants.GRID_SIZE - targetEmpty;
        // 确保 Givens 在 SudokuCore 允许的范围内 (它内部有 MIN_GIVENS=17)
        targetGivens = Math.max(this.core.MIN_GIVENS, Math.min(80, targetGivens)); // 81 is trivial, 80 max practical

        console.log(`[SudokuLogic] Target empty cells: ${targetEmpty}, Target givens: ${targetGivens}`);

        try {
            // 3. 调用 SudokuCore 生成棋盘字符串
            // The generate function in SudokuCore takes the number of GIVENS.
            const boardString = this.core.generate(targetGivens);

            if (!boardString || boardString.length !== 81) {
                 console.error('[SudokuLogic] Failed to generate valid board string from core library.');
                 return null;
            }
            console.log('[SudokuLogic] Board string generated:', boardString);

            // 4. (可选但推荐) 获取解
            // Solve the generated puzzle to get the solution string
            const solutionString = this.core.solve(boardString);
             if (!solutionString) {
                 console.warn('[SudokuLogic] Generated board might not have a unique solution or solver failed. Proceeding without solution.');
                 // Decide if you want to retry generation or proceed without a stored solution
                 // return this.generateSudoku(difficulty, levelIndex); // Example: Retry
            }


            // 5. 转换格式
            const boardData = this.convertStringToBoardData(boardString, solutionString || undefined);

            console.log('[SudokuLogic] Puzzle generated successfully.');
            // this.core.print_board(boardString); // Optional: Print to console for debugging
            return boardData;

        } catch (error) {
            console.error('[SudokuLogic] Error during puzzle generation:', error);
            return null;
        }
    }

    // --- Validation and Checking ---

    /**
     * 检查在指定位置填入数字是否符合数独规则（行、列、宫不冲突）。
     * 注意：这只检查直接冲突，不检查是否会导致无解。
     * @param boardData 当前棋盘数据。
     * @param row 检查的行 (0-8)。
     * @param col 检查的列 (0-8)。
     * @param num 要填入的数字 (1-9)。
     * @returns 如果填入合法则返回 true，否则返回 false。
     */
    public isValidMove(boardData: BoardData, row: number, col: number, num: number): boolean {
        if (num < 1 || num > 9 || row < 0 || row >= Constants.GRID_SIZE || col < 0 || col >= Constants.GRID_SIZE) {
            return false; // Invalid input
        }

        // 1. 检查行冲突
        for (let c = 0; c < Constants.GRID_SIZE; c++) {
            if (boardData.grid[row][c] === num && c !== col) {
                return false;
            }
        }

        // 2. 检查列冲突
        for (let r = 0; r < Constants.GRID_SIZE; r++) {
            if (boardData.grid[r][col] === num && r !== row) {
                return false;
            }
        }

        // 3. 检查宫冲突
        const boxStartRow = Math.floor(row / Constants.BOX_SIZE) * Constants.BOX_SIZE;
        const boxStartCol = Math.floor(col / Constants.BOX_SIZE) * Constants.BOX_SIZE;
        for (let r = boxStartRow; r < boxStartRow + Constants.BOX_SIZE; r++) {
            for (let c = boxStartCol; c < boxStartCol + Constants.BOX_SIZE; c++) {
                if (boardData.grid[r][c] === num && (r !== row || c !== col)) {
                    return false;
                }
            }
        }

        // 如果都没有冲突，则是合法的移动
        return true;
    }

     /**
     * 检查指定的行/列/宫是否已经完成（填满且无重复数字）。
     * @param boardData 当前棋盘数据。
     * @param type 类型: 'row', 'col', 或 'box'。
     * @param index 行号(0-8), 列号(0-8), 或宫索引(0-8, 从左到右, 从上到下)。
     * @returns 如果完成则返回 true，否则返回 false。
     */
    public isPartComplete(boardData: BoardData, type: 'row' | 'col' | 'box', index: number): boolean {
        const numbers = new Set<number>();
        let count = 0;

        if (type === 'row') {
            if (index < 0 || index >= Constants.GRID_SIZE) return false;
            for (let c = 0; c < Constants.GRID_SIZE; c++) {
                const num = boardData.grid[index][c];
                if (num > 0) {
                    if (numbers.has(num)) return false; // Duplicate
                    numbers.add(num);
                    count++;
                }
            }
        } else if (type === 'col') {
             if (index < 0 || index >= Constants.GRID_SIZE) return false;
            for (let r = 0; r < Constants.GRID_SIZE; r++) {
                const num = boardData.grid[r][index];
                 if (num > 0) {
                    if (numbers.has(num)) return false; // Duplicate
                    numbers.add(num);
                    count++;
                }
            }
        } else if (type === 'box') {
             if (index < 0 || index >= Constants.GRID_SIZE) return false;
            const boxStartRow = Math.floor(index / Constants.BOX_SIZE) * Constants.BOX_SIZE;
            const boxStartCol = (index % Constants.BOX_SIZE) * Constants.BOX_SIZE;
            for (let r = boxStartRow; r < boxStartRow + Constants.BOX_SIZE; r++) {
                for (let c = boxStartCol; c < boxStartCol + Constants.BOX_SIZE; c++) {
                    const num = boardData.grid[r][c];
                     if (num > 0) {
                        if (numbers.has(num)) return false; // Duplicate
                        numbers.add(num);
                        count++;
                    }
                }
            }
        } else {
            return false; // Invalid type
        }

        // Must have exactly 9 unique numbers (1-9)
        return count === Constants.GRID_SIZE && numbers.size === Constants.GRID_SIZE;
    }


    /**
     * 检查整个棋盘是否已经完成。
     * @param boardData 当前棋盘数据。
     * @returns 如果完成则返回 true，否则返回 false。
     */
    public isBoardComplete(boardData: BoardData): boolean {
        // 简单方法：检查每一行、每一列、每一宫是否都完成
        for (let i = 0; i < Constants.GRID_SIZE; i++) {
            if (!this.isPartComplete(boardData, 'row', i)) return false;
            if (!this.isPartComplete(boardData, 'col', i)) return false;
            if (!this.isPartComplete(boardData, 'box', i)) return false;
        }
        return true;

        // 或者，如果 BoardData 中存储了 solution，可以直接比较：
        /*
        if (!boardData.solution) {
            console.warn("[SudokuLogic] Cannot check board completion against solution: solution is missing.");
            // Fallback to checking all parts
             for (let i = 0; i < Constants.GRID_SIZE; i++) {
                if (!this.isPartComplete(boardData, 'row', i)) return false;
                if (!this.isPartComplete(boardData, 'col', i)) return false;
                if (!this.isPartComplete(boardData, 'box', i)) return false;
            }
            return true;
        }

        for (let r = 0; r < Constants.GRID_SIZE; r++) {
            for (let c = 0; c < Constants.GRID_SIZE; c++) {
                if (boardData.grid[r][c] !== boardData.solution[r][c]) {
                    return false;
                }
            }
        }
        return true;
        */
    }

    /**
     * 获取指定格子所有合法的候选数字。
     * @param boardData 当前棋盘数据。
     * @param row 行 (0-8)。
     * @param col 列 (0-8)。
     * @returns 返回一个包含所有合法候选数字的数组，如果格子已填或无效则返回空数组。
     */
    public getValidCandidates(boardData: BoardData, row: number, col: number): number[] {
        if (row < 0 || row >= Constants.GRID_SIZE || col < 0 || col >= Constants.GRID_SIZE || boardData.grid[row][col] !== 0) {
            return []; // Invalid cell or already filled
        }

        const candidates: number[] = [];
        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(boardData, row, col, num)) {
                candidates.push(num);
            }
        }
        return candidates;
    }

    // --- (Optional) Expose Solver if needed elsewhere ---
    /**
     * 尝试解决给定的棋盘状态。
     * @param boardData 要解决的棋盘数据。
     * @returns 返回包含解的 BoardData，如果无解则返回 null。
     */
    public solveSudoku(boardData: BoardData): BoardData | null {
         try {
            const boardString = this.convertBoardDataToString(boardData);
            const solutionString = this.core.solve(boardString);
            if (solutionString) {
                // Convert solution string back to BoardData (grid only)
                const solvedBoard = createEmptyBoardData();
                 for (let r = 0; r < Constants.GRID_SIZE; r++) {
                    for (let c = 0; c < Constants.GRID_SIZE; c++) {
                        const index = r * Constants.GRID_SIZE + c;
                        solvedBoard.grid[r][c] = parseInt(solutionString[index], 10);
                        // Preset mask is irrelevant for a solved board
                    }
                }
                return solvedBoard;
            } else {
                return null; // No solution found
            }
        } catch (error) {
            console.error('[SudokuLogic] Error during solving:', error);
            return null;
        }
    }
}