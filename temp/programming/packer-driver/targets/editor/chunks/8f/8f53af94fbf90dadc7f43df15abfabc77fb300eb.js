System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Constants, _crd;

  /**
   * @description 定义数独棋盘的数据结构。
   */

  /**
   * @description 定义单个游戏关卡的数据结构。
   */

  /**
   * @description (辅助函数) 创建一个空的棋盘数据对象。
   * @param size 棋盘尺寸，默认为 Constants.GRID_SIZE (9)
   * @returns 返回一个初始化的 BoardData 对象，所有格子为空且非预设。
   */

  /**
   * @description (辅助函数) 深拷贝一个 BoardData 对象。
   * 防止直接修改原始数据。
   * @param boardData 要拷贝的 BoardData 对象
   * @returns 返回一个新的、独立的 BoardData 对象
   */
  function createEmptyBoardData(size = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
    error: Error()
  }), Constants) : Constants).GRID_SIZE) {
    const grid = [];
    const presetMask = []; // 可选：如果需要，也初始化 solution
    // const solution: number[][] = [];

    for (let i = 0; i < size; i++) {
      grid[i] = Array(size).fill(0);
      presetMask[i] = Array(size).fill(false); // if (solution) solution[i] = Array(size).fill(0);
    }

    return {
      grid,
      presetMask
      /*, solution */

    };
  }

  function cloneBoardData(boardData) {
    const newGrid = boardData.grid.map(row => [...row]); // 深拷贝二维数组

    const newPresetMask = boardData.presetMask.map(row => [...row]); // 深拷贝二维数组

    const newSolution = boardData.solution ? boardData.solution.map(row => [...row]) : undefined; // 深拷贝可选的 solution

    return {
      grid: newGrid,
      presetMask: newPresetMask,
      solution: newSolution
    };
  }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  _export({
    createEmptyBoardData: createEmptyBoardData,
    cloneBoardData: cloneBoardData
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3cb90o0BkFB1Iuj21iElX1t", "GameData", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8f53af94fbf90dadc7f43df15abfabc77fb300eb.js.map