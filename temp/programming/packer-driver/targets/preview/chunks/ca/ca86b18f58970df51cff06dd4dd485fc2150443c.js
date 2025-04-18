System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, ActionRecord, _crd;

  _export("ActionRecord", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "deb43mD841B5pvva4QbSLHJ", "ActionRecord", undefined);

      /**
       * @description 定义用户操作记录的数据结构，用于撤销/恢复功能。
       */
      _export("ActionRecord", ActionRecord = class ActionRecord {
        /**
         * 构造函数
         * @param type 操作类型 ('fill' 或 'clear')
         * @param row 操作的行
         * @param col 操作的列
         * @param previousValue 操作前的值
         * @param newValue 操作后的值
         */
        constructor(type, row, col, previousValue, newValue) {
          /**
           * 操作类型: 'fill' 表示填入数字, 'clear' 表示清除数字。
           */
          this.type = void 0;

          /**
           * 操作发生的行索引 (0-8)。
           */
          this.row = void 0;

          /**
           * 操作发生的列索引 (0-8)。
           */
          this.col = void 0;

          /**
           * 执行此操作之前的格子数值 (0 表示空格)。
           * 对于 'fill' 操作，这是填入前的数字（通常是 0）。
           * 对于 'clear' 操作，这是被清除的数字。
           */
          this.previousValue = void 0;

          /**
           * 执行此操作之后的新格子数值。
           * 对于 'fill' 操作，这是填入的新数字 (1-9)。
           * 对于 'clear' 操作，这通常是 0。
           */
          this.newValue = void 0;
          this.type = type;
          this.row = row;
          this.col = col;
          this.previousValue = previousValue;
          this.newValue = newValue;
        }

      }); // 如果你更倾向于使用接口（Interface），也可以这样定义：

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


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ca86b18f58970df51cff06dd4dd485fc2150443c.js.map