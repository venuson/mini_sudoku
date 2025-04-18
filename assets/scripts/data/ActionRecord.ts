/**
 * @description 定义用户操作记录的数据结构，用于撤销/恢复功能。
 */
export class ActionRecord {
    /**
     * 操作类型: 'fill' 表示填入数字, 'clear' 表示清除数字。
     */
    type: 'fill' | 'clear';

    /**
     * 操作发生的行索引 (0-8)。
     */
    row: number;

    /**
     * 操作发生的列索引 (0-8)。
     */
    col: number;

    /**
     * 执行此操作之前的格子数值 (0 表示空格)。
     * 对于 'fill' 操作，这是填入前的数字（通常是 0）。
     * 对于 'clear' 操作，这是被清除的数字。
     */
    previousValue: number;

    /**
     * 执行此操作之后的新格子数值。
     * 对于 'fill' 操作，这是填入的新数字 (1-9)。
     * 对于 'clear' 操作，这通常是 0。
     */
    newValue: number;

    /**
     * 构造函数
     * @param type 操作类型 ('fill' 或 'clear')
     * @param row 操作的行
     * @param col 操作的列
     * @param previousValue 操作前的值
     * @param newValue 操作后的值
     */
    constructor(type: 'fill' | 'clear', row: number, col: number, previousValue: number, newValue: number) {
        this.type = type;
        this.row = row;
        this.col = col;
        this.previousValue = previousValue;
        this.newValue = newValue;
    }
}

// 如果你更倾向于使用接口（Interface），也可以这样定义：
/*
export interface ActionRecord {
    type: 'fill' | 'clear';
    row: number;
    col: number;
    previousValue: number;
    newValue: number;
}
*/
// 使用类（Class）的好处是可以包含构造函数或其他方法（虽然这里不需要）。
// 使用接口则更轻量级，只定义结构。选择哪种取决于你的偏好和项目需求。
// 在这个场景下，两者皆可。我们暂时使用 Class。