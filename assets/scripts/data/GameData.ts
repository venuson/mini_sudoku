import { Constants, DifficultyType } from "../utils/Constants";

/**
 * @description 定义数独棋盘的数据结构。
 */
export interface BoardData {
    /**
     * 9x9 的二维数组，存储棋盘上每个格子的数字。
     * 0 表示该格子为空。
     * 1-9 表示对应的数字。
     */
    grid: number[][];

    /**
     * 9x9 的二维布尔数组，标记哪些格子是预设的数字。
     * true 表示该格子是预设数字，不可修改。
     * false 表示该格子是用户可填写的空格。
     */
    presetMask: boolean[][];

    /**
     * (可选但推荐) 9x9 的二维数组，存储当前谜题的完整解。
     * 用于快速验证用户输入或检查游戏完成状态。
     * 如果不存储解，则需要在验证时实时计算或使用其他逻辑。
     */
    solution?: number[][]; // 使用 ? 表示可选
}

/**
 * @description 定义单个游戏关卡的数据结构。
 */
export interface LevelData {
    /**
     * 关卡难度。
     * 使用 Constants 中定义的难度类型。
     */
    difficulty: DifficultyType;

    /**
     * 关卡在该难度下的序号 (例如 1 到 30)。
     */
    levelIndex: number;

    /**
     * 关卡开始时的初始棋盘状态。
     * 包含预设数字和空格。
     */
    initialBoard: BoardData;

    /**
     * 该关卡需要用户填写的空格数量。
     * 用于难度控制和可能的提示功能。
     */
    emptyCellsCount: number;
}

/**
 * @description (辅助函数) 创建一个空的棋盘数据对象。
 * @param size 棋盘尺寸，默认为 Constants.GRID_SIZE (9)
 * @returns 返回一个初始化的 BoardData 对象，所有格子为空且非预设。
 */
export function createEmptyBoardData(size: number = Constants.GRID_SIZE): BoardData {
    const grid: number[][] = [];
    const presetMask: boolean[][] = [];
    // 可选：如果需要，也初始化 solution
    // const solution: number[][] = [];

    for (let i = 0; i < size; i++) {
        grid[i] = Array(size).fill(0);
        presetMask[i] = Array(size).fill(false);
        // if (solution) solution[i] = Array(size).fill(0);
    }

    return { grid, presetMask /*, solution */ };
}

/**
 * @description (辅助函数) 深拷贝一个 BoardData 对象。
 * 防止直接修改原始数据。
 * @param boardData 要拷贝的 BoardData 对象
 * @returns 返回一个新的、独立的 BoardData 对象
 */
export function cloneBoardData(boardData: BoardData): BoardData {
    const newGrid = boardData.grid.map(row => [...row]); // 深拷贝二维数组
    const newPresetMask = boardData.presetMask.map(row => [...row]); // 深拷贝二维数组
    const newSolution = boardData.solution ? boardData.solution.map(row => [...row]) : undefined; // 深拷贝可选的 solution

    return {
        grid: newGrid,
        presetMask: newPresetMask,
        solution: newSolution
    };
}