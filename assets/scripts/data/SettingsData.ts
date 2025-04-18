/**
 * @description 定义游戏设置的数据结构，用于本地存储。
 */
export class SettingsData {
    /**
     * 背景音乐 (BGM) 是否启用。
     * 默认为 true。
     */
    bgmEnabled: boolean;

    /**
     * 触控音效 (SFX) 是否启用。
     * 默认为 true。
     */
    sfxEnabled: boolean;

    /**
     * 构造函数，可以设置默认值。
     * @param bgmEnabled 背景音乐开关状态，默认为 true
     * @param sfxEnabled 触控音效开关状态，默认为 true
     */
    constructor(bgmEnabled: boolean = true, sfxEnabled: boolean = true) {
        this.bgmEnabled = bgmEnabled;
        this.sfxEnabled = sfxEnabled;
    }

    /**
     * (可选) 提供一个从普通对象加载数据的方法，增加健壮性。
     * @param data 一个可能包含设置数据的对象
     * @returns 返回一个 SettingsData 实例
     */
    static fromObject(data: any): SettingsData {
        const settings = new SettingsData(); // 使用默认值创建实例
        if (data) {
            // 只有当传入的对象中明确存在且类型为 boolean 时才覆盖默认值
            if (typeof data.bgmEnabled === 'boolean') {
                settings.bgmEnabled = data.bgmEnabled;
            }
            if (typeof data.sfxEnabled === 'boolean') {
                settings.sfxEnabled = data.sfxEnabled;
            }
        }
        return settings;
    }
}

// 同样，也可以使用接口：
/*
export interface SettingsData {
    bgmEnabled: boolean;
    sfxEnabled: boolean;
}
*/