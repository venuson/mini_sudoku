System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, _crd;

  /**
   * @description (辅助函数) 创建一个空的 UserAccount 对象。
   * @param userId 用户 ID
   * @returns 返回一个初始化的 UserAccount 对象
   */
  function createEmptyUserAccount(userId) {
    return {
      userId: userId,
      levelRecords: {},
      totalLevelsCompleted: 0 // nickname 和 avatarUrl 需要后续授权获取

    };
  }
  /**
   * @description (辅助函数) 生成 LevelRecord 的 key
   * @param difficulty 难度
   * @param levelIndex 关卡序号
   * @returns 返回 "难度-关卡序号" 格式的字符串
   */


  function generateLevelRecordKey(difficulty, levelIndex) {
    return `${difficulty}-${levelIndex}`;
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardData(extras) {
    _reporterNs.report("BoardData", "./GameData", _context.meta, extras);
  }

  _export({
    createEmptyUserAccount: createEmptyUserAccount,
    generateLevelRecordKey: generateLevelRecordKey
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dfe6fGUs9hM/Z4t6eU0bBZI", "UserData", undefined); // Import BoardData for LocalUserProgress

      /**
       * @description 定义单个已通关关卡的记录结构 (通常存储在云端)。
       */

      /**
       * @description 定义用户账户的核心数据结构 (通常存储在云端)。
       */

      /**
       * @description 定义排行榜单个条目的数据结构 (从云端获取)。
       */

      /**
       * @description 定义本地存储的、未完成的游戏进度数据结构。
       */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=81d600da8549217f51b14db14958fbf655c7f6ce.js.map