// assets/scripts/utils/TimeFormatter.ts

import { _decorator } from 'cc'; // 引入 cc 模块以消除可能的警告，虽然这里没用到装饰器

/**
 * @description 时间格式化工具类
 */
export class TimeFormatter {

    /**
     * 将总秒数格式化为 "MM:SS" 格式的字符串。
     * @param totalSeconds 总秒数。可以接受小数，但会向下取整。
     * @returns 返回 "MM:SS" 格式的字符串。如果输入无效，则返回 "00:00"。
     */
    public static formatSeconds(totalSeconds: number): string {
        // 处理无效输入
        if (isNaN(totalSeconds) || totalSeconds < 0) {
            totalSeconds = 0;
        }

        // 向下取整确保得到整数秒
        const secondsInt = Math.floor(totalSeconds);

        // 计算分钟和剩余秒数
        const minutes = Math.floor(secondsInt / 60);
        const seconds = secondsInt % 60;

        // 使用 padStart 补零，确保总是两位数
        const minutesString = minutes.toString().padStart(2, '0');
        const secondsString = seconds.toString().padStart(2, '0');

        return `${minutesString}:${secondsString}`;
    }

    /**
     * (可选) 将总秒数格式化为 "HH:MM:SS" 格式的字符串。
     * @param totalSeconds 总秒数。可以接受小数，但会向下取整。
     * @returns 返回 "HH:MM:SS" 格式的字符串。如果输入无效，则返回 "00:00:00"。
     */
    public static formatSecondsWithHours(totalSeconds: number): string {
        // 处理无效输入
        if (isNaN(totalSeconds) || totalSeconds < 0) {
            totalSeconds = 0;
        }

        const secondsInt = Math.floor(totalSeconds);

        const hours = Math.floor(secondsInt / 3600);
        const minutes = Math.floor((secondsInt % 3600) / 60);
        const seconds = secondsInt % 60;

        const hoursString = hours.toString().padStart(2, '0');
        const minutesString = minutes.toString().padStart(2, '0');
        const secondsString = seconds.toString().padStart(2, '0');

        return `${hoursString}:${minutesString}:${secondsString}`;
    }
}

// --- 使用示例 ---
/*
import { TimeFormatter } from './TimeFormatter';

let time1 = 75; // 1 分 15 秒
let time2 = 5;  // 5 秒
let time3 = 3661; // 1 小时 1 分 1 秒
let time4 = -10;

console.log(TimeFormatter.formatSeconds(time1)); // 输出: "01:15"
console.log(TimeFormatter.formatSeconds(time2)); // 输出: "00:05"
console.log(TimeFormatter.formatSeconds(time4)); // 输出: "00:00"

console.log(TimeFormatter.formatSecondsWithHours(time3)); // 输出: "01:01:01"
console.log(TimeFormatter.formatSecondsWithHours(time1)); // 输出: "00:01:15"
*/

/*
静态类: TimeFormatter 是一个静态类，所有方法都是静态的，可以直接通过 TimeFormatter.formatSeconds(...) 调用。
formatSeconds 方法:
接收总秒数 totalSeconds 作为参数。
处理了无效输入（NaN, 负数），将其视为 0。
使用 Math.floor 确保秒数是整数。
计算分钟 minutes 和剩余秒数 seconds。
使用 toString().padStart(2, '0') 来确保分钟和秒数始终显示为两位数（例如，5 秒显示为 "05"）。
返回 MM:SS 格式的字符串。
formatSecondsWithHours 方法 (可选): 提供了另一个格式化方法，可以输出 HH:MM:SS 格式，适用于可能超过一小时的游戏时间。
无依赖: 这个工具类不依赖 Cocos Creator 的特定组件或生命周期，是一个纯粹的 TypeScript 类。
使用示例: 代码末尾注释中提供了如何导入和使用这个工具类的示例。
请检查 TimeFormatter.ts 文件。这个文件比较简单，主要是字符串处理。
*/