// assets/scripts/utils/Constants.ts

/**
 * @description 游戏常量定义
 */
export const Constants = {
    // --- 棋盘尺寸 ---
    GRID_SIZE: 9, // 主网格尺寸 (9x9)
    BOX_SIZE: 3,  // 子区域（宫）尺寸 (3x3)

    // --- 难度定义 ---
    Difficulty: {
        ENTRY: '入门',
        EASY: '初级',
        MEDIUM: '中级',
        HARD: '高级',
        MASTER: '大师级',
    },

    // --- 难度对应的目标空格数 (大致范围，需要根据题库调整) ---
    // 用于关卡内难度递增计算的基准
    DifficultyEmptyCells: {
        ENTRY: { start: 5, end: 7 },
        EASY: { start: 9, end: 12 },
        MEDIUM: { start: 13, end: 18 },
        HARD: { start: 25, end: 35 },
        MASTER: { start: 38, end: 42 },
    },

    // --- 每个难度等级的关卡数量 ---
    LEVELS_PER_DIFFICULTY: 30,

    // --- 本地存储键名 ---
    StorageKeys: {
        SETTINGS: 'sudoku_settings',          // 用户设置
        UNFINISHED_GAME: 'sudoku_unfinished', // 未完成的游戏进度
        // 注意：云端相关的用户数据（如通关记录）不直接用此存储，而是通过 AccountManager 同步
    },
    SpriteFrameName: {
        CELL_PRESET_BG: 'cell_preset_bg', // 对应 resources/textures/game/cell_preset_bg.png (或 .jpg 等)
        CELL_USER_BG: 'cell_user_bg',     // 对应 resources/textures/game/cell_user_bg.png
        NUM_BTN_VALID_BG: 'number_pad_bg_valid', // 蓝色背景
        NUM_BTN_INVALID_BG: 'number_pad_bg_invalid', // 灰色背景
        DEFAULT_AVATAR: 'default_avatar', // 默认头像
    },
    IconName: {
        PAUSE: 'icon_pause',
        RESUME: 'icon_resume',
        // ... 其他图标名称 ...
    },

    // --- 自定义事件名称 ---
    // 用于模块间解耦通信
    EventName: {
        // UI -> Logic / Manager
        CELL_CLICKED: 'event_cell_clicked',         // 格子被点击 (row, col)
        NUMBER_INPUT: 'event_number_input',         // 数字按钮被点击 (number)
        CLEAR_BUTTON_CLICKED: 'event_clear_clicked', // 清除按钮点击
        UNDO_BUTTON_CLICKED: 'event_undo_clicked',   // 撤销按钮点击
        REDO_BUTTON_CLICKED: 'event_redo_clicked',   // 恢复按钮点击
        PAUSE_BUTTON_CLICKED: 'event_pause_clicked', // 暂停按钮点击
        RESUME_BUTTON_CLICKED: 'event_resume_clicked',// 恢复按钮点击
        SETTINGS_BUTTON_CLICKED: 'event_settings_clicked',// 设置按钮点击
        DIFFICULTY_SELECTED: 'event_difficulty_selected',// 难度选择 (difficulty)
        CHALLENGE_BUTTON_CLICKED: 'event_challenge_clicked',// 挑战按钮点击 (difficulty, level)
        SHOW_HISTORY_CLICKED: 'event_show_history_clicked', // 显示历史记录按钮点击
        SHOW_RANKING_CLICKED: 'event_show_ranking_clicked', // 显示排行榜按钮点击
        PAUSE_RESUME_BUTTON_CLICKED: 'event_pause_resume_clicked', // 暂停/恢复按钮被点击
        SETTINGS_BGM_CHANGED: 'event_settings_bgm_changed', // BGM 设置改变 (value: boolean)
        SETTINGS_SFX_CHANGED: 'event_settings_sfx_changed', // SFX 设置改变 (value: boolean)
        // Manager -> UI / Other Managers
        GAME_START: 'event_game_start',             // 游戏开始 (difficulty, level)
        GAME_OVER: 'event_game_over',               // 游戏结束 (isWin, time)
        GAME_PAUSED: 'event_game_paused',           // 游戏已暂停
        GAME_RESUMED: 'event_game_resumed',         // 游戏已恢复
        TIMER_UPDATE: 'event_timer_update',         // 计时器更新 (seconds)
        BOARD_UPDATE: 'event_board_update',         // 棋盘数据更新 (row, col, number, isPreset, previousValue?)
        BOARD_COMPLETED_PART: 'event_board_completed_part', // 完成行/列/宫 (type: 'row'|'col'|'box', index)
        UNDO_STATE_UPDATE: 'event_undo_state_update', // 更新撤销/恢复按钮状态 (canUndo, canRedo)
        SETTINGS_CHANGED: 'event_settings_changed',   // 设置已更改 (settingsData)
        NUMBER_PAD_UPDATE: 'event_number_pad_update', // 更新数字输入板状态 (validNumbers: number[])
        LOGIN_SUCCESS: 'event_login_success',         // 登录成功 (userId)
        LOGIN_FAIL: 'event_login_fail',             // 登录失败
        USER_RECORDS_LOADED: 'event_user_records_loaded', // 用户记录已加载 (records)
        RANKING_LOADED: 'event_ranking_loaded',       // 排行榜已加载 (ranks, myRank)
        SHOW_AD: 'event_show_ad',                   // 请求显示广告
        HIDE_AD: 'event_hide_ad',                   // 请求隐藏广告
    },

    // --- 动画参数 ---
    Animation: {
        NUMBER_APPEAR_SCALE_IN: 0.5, // 数字出现初始缩放
        NUMBER_APPEAR_SCALE_OUT: 1.2, // 数字出现放大峰值
        NUMBER_APPEAR_DURATION: 0.3, // 数字出现动画时长 (秒)
        NUMBER_DISAPPEAR_SCALE: 0.1, // 数字消失目标缩放
        NUMBER_DISAPPEAR_DURATION: 0.2, // 数字消失动画时长 (秒)
    },

    // --- 音效名称 (需要与 AudioManager 中加载的资源名对应) ---
    AudioClipName: {
        BGM: 'bgm/bgm',
        CLICK: 'sfx/click',
        FILL: 'sfx/fill',
        CLEAR: 'sfx/clear',
        APPLAUSE: 'sfx/applause',
        WIN: 'sfx/win',
    }

};

// --- (可选) 定义一些类型别名，方便使用 ---
export type DifficultyType = typeof Constants.Difficulty[keyof typeof Constants.Difficulty];