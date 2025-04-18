import { Constants, DifficultyType } from "../utils/Constants";
import { BoardData } from "./GameData"; // Import BoardData for LocalUserProgress

/**
 * @description 定义单个已通关关卡的记录结构 (通常存储在云端)。
 */
export interface LevelRecord {
    /**
     * 关卡难度。
     */
    difficulty: DifficultyType;

    /**
     * 关卡序号 (1-30)。
     */
    levelIndex: number;

    /**
     * 完成该关卡的个人最佳用时 (单位：秒)。
     */
    bestTimeSeconds: number;

    /**
     * 首次完成该关卡的日期时间戳 (例如 Date.now() 或服务器时间)。
     */
    firstCompletionTimestamp: number;

    // 可以添加最后完成日期等信息
    // lastCompletionTimestamp?: number;
}

/**
 * @description 定义用户账户的核心数据结构 (通常存储在云端)。
 */
export interface UserAccount {
    /**
     * 用户唯一标识符 (通常是微信的 openid)。
     * 作为数据库主键。
     */
    userId: string; // Corresponds to _id in some databases like MongoDB

    /**
     * 用户昵称 (需要用户授权获取)。
     * 可选。
     */
    nickname?: string;

    /**
     * 用户头像 URL (需要用户授权获取)。
     * 可选。
     */
    avatarUrl?: string;

    /**
     * 用户所有已通关的关卡记录。
     * 可以使用数组存储，或者使用 Map/Object 结构方便按 难度-关卡 查找。
     * 示例：使用 Map，键为 "难度-关卡序号" (e.g., "入门-1", "初级-15")。
     */
    levelRecords: { [key: string]: LevelRecord }; // Map<string, LevelRecord> in concept

    /**
     * 用户总共完成的关卡数量。
     * (冗余字段，方便快速查询和排名)。
     */
    totalLevelsCompleted: number;

    /**
     * 用户最后登录时间戳。
     * 可选。
     */
    lastLoginTimestamp?: number;

    // 可以添加其他统计信息，如平均用时等
    // averageTimeSeconds?: number;
}

/**
 * @description 定义排行榜单个条目的数据结构 (从云端获取)。
 */
export interface RankingEntry {
    /**
     * 排名序号。
     */
    rank: number;

    /**
     * 用户 ID。
     */
    userId: string;

    /**
     * 用户昵称。
     */
    nickname: string; // 通常排行榜需要显示昵称

    /**
     * 用户头像 URL。
     */
    avatarUrl: string; // 通常排行榜需要显示头像

    /**
     * 用于排名的分数或指标 (例如：总通关数)。
     */
    score: number;
}

/**
 * @description 定义本地存储的、未完成的游戏进度数据结构。
 */
export interface LocalUserProgress {
    /**
     * 与该进度关联的用户 ID。
     * 如果用户未登录时保存，则可能为 null 或特定标识。
     */
    userId: string | null;

    /**
     * 未完成游戏的难度。
     */
    difficulty: DifficultyType;

    /**
     * 未完成游戏的关卡序号。
     */
    levelIndex: number;

    /**
     * 退出时棋盘的完整状态 (包括用户已填入的数字)。
     */
    currentBoardState: BoardData;

    /**
     * 退出时已经过的游戏时间 (单位：秒)。
     */
    elapsedTime: number;
}

/**
 * @description (辅助函数) 创建一个空的 UserAccount 对象。
 * @param userId 用户 ID
 * @returns 返回一个初始化的 UserAccount 对象
 */
export function createEmptyUserAccount(userId: string): UserAccount {
    return {
        userId: userId,
        levelRecords: {},
        totalLevelsCompleted: 0,
        // nickname 和 avatarUrl 需要后续授权获取
    };
}

/**
 * @description (辅助函数) 生成 LevelRecord 的 key
 * @param difficulty 难度
 * @param levelIndex 关卡序号
 * @returns 返回 "难度-关卡序号" 格式的字符串
 */
export function generateLevelRecordKey(difficulty: DifficultyType, levelIndex: number): string {
    return `${difficulty}-${levelIndex}`;
}