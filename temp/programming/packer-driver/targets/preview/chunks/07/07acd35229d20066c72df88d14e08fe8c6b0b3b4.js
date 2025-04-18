System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Constants, createEmptyBoardData, SudokuCore, SudokuLogic, _crd;

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardData(extras) {
    _reporterNs.report("BoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateEmptyBoardData(extras) {
    _reporterNs.report("createEmptyBoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSudokuCore(extras) {
    _reporterNs.report("SudokuCore", "../vendor/SudokuCore", _context.meta, extras);
  }

  _export("SudokuLogic", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      createEmptyBoardData = _unresolved_3.createEmptyBoardData;
    }, function (_unresolved_4) {
      SudokuCore = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d53bbJKwQRLWYNNrit+cMEX", "SudokuLogic", undefined); //Import SudokuCore: 使用 import SudokuCore from '../vendor/SudokuCore'; 导入。你需要将 SudokuCore 文件放到 assets/scripts/vendor/ 目录下，或者修改这个路径。
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


      // Adjust path as needed

      /**
       * @description 数独核心逻辑模块
       * 封装了外部 SudokuCore 库的功能，提供符合项目数据结构的接口。
       * 负责生成数独谜题、验证移动合法性、检查完成状态等。
       */
      _export("SudokuLogic", SudokuLogic = class SudokuLogic {
        // Instance of the external library
        constructor() {
          this.core = void 0;
          this.core = new (_crd && SudokuCore === void 0 ? (_reportPossibleCrUseOfSudokuCore({
            error: Error()
          }), SudokuCore) : SudokuCore)();
          this.core.initialize(); // Initialize the core library structures

          console.log('[SudokuLogic] SudokuCore initialized.');
        }
        /**
         * 获取 SudokuLogic 的单例实例。
         */


        static getInstance() {
          if (!SudokuLogic.instance) {
            SudokuLogic.instance = new SudokuLogic();
          }

          return SudokuLogic.instance;
        } // --- Board Conversion Helpers ---

        /**
         * 将 SudokuCore 使用的字符串棋盘格式转换为项目使用的 BoardData 格式。
         * @param boardString 81个字符的字符串，'.' 代表空格。
         * @param solutionString (可选) 81个字符的解字符串。
         * @returns 返回 BoardData 对象。
         */


        convertStringToBoardData(boardString, solutionString) {
          var boardData = (_crd && createEmptyBoardData === void 0 ? (_reportPossibleCrUseOfcreateEmptyBoardData({
            error: Error()
          }), createEmptyBoardData) : createEmptyBoardData)();

          if (boardString.length !== (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) {
            console.error("[SudokuLogic] Invalid board string length for conversion:", boardString);
            return boardData; // Return empty board on error
          }

          for (var r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE; r++) {
            for (var c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; c++) {
              var index = r * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).GRID_SIZE + c;
              var char = boardString[index];

              if (char >= '1' && char <= '9') {
                boardData.grid[r][c] = parseInt(char, 10);
                boardData.presetMask[r][c] = true; // Digits in the initial string are presets
              } else {
                boardData.grid[r][c] = 0; // '.' or other becomes 0

                boardData.presetMask[r][c] = false;
              }
            }
          } // Convert solution if provided


          if (solutionString && solutionString.length === (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) {
            boardData.solution = (_crd && createEmptyBoardData === void 0 ? (_reportPossibleCrUseOfcreateEmptyBoardData({
              error: Error()
            }), createEmptyBoardData) : createEmptyBoardData)().grid; // Initialize solution grid

            for (var _r = 0; _r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; _r++) {
              for (var _c = 0; _c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).GRID_SIZE; _c++) {
                var _index = _r * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                  error: Error()
                }), Constants) : Constants).GRID_SIZE + _c;

                var solChar = solutionString[_index];

                if (solChar >= '1' && solChar <= '9') {
                  boardData.solution[_r][_c] = parseInt(solChar, 10);
                } else {
                  boardData.solution[_r][_c] = 0; // Should not happen for a valid solution
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


        convertBoardDataToString(boardData) {
          var boardString = "";

          for (var r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE; r++) {
            for (var c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; c++) {
              var num = boardData.grid[r][c];
              boardString += num >= 1 && num <= 9 ? num.toString() : this.core.BLANK_CHAR;
            }
          }

          return boardString;
        } // --- Puzzle Generation ---

        /**
         * 根据难度和关卡序号生成数独谜题。
         * @param difficulty 游戏难度 ('入门', '初级', ...)
         * @param levelIndex 关卡序号 (1-30)
         * @returns 返回包含初始棋盘和解的 BoardData 对象，如果生成失败则返回 null。
         */


        generateSudoku(difficulty, levelIndex) {
          console.log("[SudokuLogic] Generating puzzle for difficulty: " + difficulty + ", level: " + levelIndex);
          var difficultyKey = null;

          for (var key in (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Difficulty) {
            // 使用类型断言确保 key 是 Difficulty 的有效键
            var typedKey = key;

            if ((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Difficulty[typedKey] === difficulty) {
              difficultyKey = typedKey;
              break;
            }
          }

          if (!difficultyKey) {
            console.error("[SudokuLogic] \u65E0\u6CD5\u627E\u5230\u96BE\u5EA6 \"" + difficulty + "\" \u5BF9\u5E94\u7684\u5185\u90E8 Key\u3002");
            return null;
          } // 1. 计算目标空格数 (根据 SDD 5.4.2)


          var diffConfig = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).DifficultyEmptyCells[difficultyKey];

          if (!diffConfig) {
            console.error("[SudokuLogic] Invalid difficulty provided: " + difficultyKey);
            return null;
          }

          var targetEmpty = Math.round(diffConfig.start + (diffConfig.end - diffConfig.start) / ((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).LEVELS_PER_DIFFICULTY - 1) * (levelIndex - 1)); // 2. 计算目标预设数字数量 (Givens)

          var targetGivens = (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE - targetEmpty; // 确保 Givens 在 SudokuCore 允许的范围内 (它内部有 MIN_GIVENS=17)

          targetGivens = Math.max(this.core.MIN_GIVENS, Math.min(80, targetGivens)); // 81 is trivial, 80 max practical

          console.log("[SudokuLogic] Target empty cells: " + targetEmpty + ", Target givens: " + targetGivens);

          try {
            // 3. 调用 SudokuCore 生成棋盘字符串
            // The generate function in SudokuCore takes the number of GIVENS.
            var boardString = this.core.generate(targetGivens);

            if (!boardString || boardString.length !== 81) {
              console.error('[SudokuLogic] Failed to generate valid board string from core library.');
              return null;
            }

            console.log('[SudokuLogic] Board string generated:', boardString); // 4. (可选但推荐) 获取解
            // Solve the generated puzzle to get the solution string

            var solutionString = this.core.solve(boardString);

            if (!solutionString) {
              console.warn('[SudokuLogic] Generated board might not have a unique solution or solver failed. Proceeding without solution.'); // Decide if you want to retry generation or proceed without a stored solution
              // return this.generateSudoku(difficulty, levelIndex); // Example: Retry
            } // 5. 转换格式


            var boardData = this.convertStringToBoardData(boardString, solutionString || undefined);
            console.log('[SudokuLogic] Puzzle generated successfully.'); // this.core.print_board(boardString); // Optional: Print to console for debugging

            return boardData;
          } catch (error) {
            console.error('[SudokuLogic] Error during puzzle generation:', error);
            return null;
          }
        } // --- Validation and Checking ---

        /**
         * 检查在指定位置填入数字是否符合数独规则（行、列、宫不冲突）。
         * 注意：这只检查直接冲突，不检查是否会导致无解。
         * @param boardData 当前棋盘数据。
         * @param row 检查的行 (0-8)。
         * @param col 检查的列 (0-8)。
         * @param num 要填入的数字 (1-9)。
         * @returns 如果填入合法则返回 true，否则返回 false。
         */


        isValidMove(boardData, row, col, num) {
          if (num < 1 || num > 9 || row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE) {
            return false; // Invalid input
          } // 1. 检查行冲突


          for (var c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE; c++) {
            if (boardData.grid[row][c] === num && c !== col) {
              return false;
            }
          } // 2. 检查列冲突


          for (var r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE; r++) {
            if (boardData.grid[r][col] === num && r !== row) {
              return false;
            }
          } // 3. 检查宫冲突


          var boxStartRow = Math.floor(row / (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE) * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE;
          var boxStartCol = Math.floor(col / (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE) * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE;

          for (var _r2 = boxStartRow; _r2 < boxStartRow + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE; _r2++) {
            for (var _c2 = boxStartCol; _c2 < boxStartCol + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE; _c2++) {
              if (boardData.grid[_r2][_c2] === num && (_r2 !== row || _c2 !== col)) {
                return false;
              }
            }
          } // 如果都没有冲突，则是合法的移动


          return true;
        }
        /**
        * 检查指定的行/列/宫是否已经完成（填满且无重复数字）。
        * @param boardData 当前棋盘数据。
        * @param type 类型: 'row', 'col', 或 'box'。
        * @param index 行号(0-8), 列号(0-8), 或宫索引(0-8, 从左到右, 从上到下)。
        * @returns 如果完成则返回 true，否则返回 false。
        */


        isPartComplete(boardData, type, index) {
          var numbers = new Set();
          var count = 0;

          if (type === 'row') {
            if (index < 0 || index >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE) return false;

            for (var c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; c++) {
              var num = boardData.grid[index][c];

              if (num > 0) {
                if (numbers.has(num)) return false; // Duplicate

                numbers.add(num);
                count++;
              }
            }
          } else if (type === 'col') {
            if (index < 0 || index >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE) return false;

            for (var r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE; r++) {
              var _num = boardData.grid[r][index];

              if (_num > 0) {
                if (numbers.has(_num)) return false; // Duplicate

                numbers.add(_num);
                count++;
              }
            }
          } else if (type === 'box') {
            if (index < 0 || index >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).GRID_SIZE) return false;
            var boxStartRow = Math.floor(index / (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE) * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE;
            var boxStartCol = index % (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE;

            for (var _r3 = boxStartRow; _r3 < boxStartRow + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).BOX_SIZE; _r3++) {
              for (var _c3 = boxStartCol; _c3 < boxStartCol + (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).BOX_SIZE; _c3++) {
                var _num2 = boardData.grid[_r3][_c3];

                if (_num2 > 0) {
                  if (numbers.has(_num2)) return false; // Duplicate

                  numbers.add(_num2);
                  count++;
                }
              }
            }
          } else {
            return false; // Invalid type
          } // Must have exactly 9 unique numbers (1-9)


          return count === (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE && numbers.size === (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE;
        }
        /**
         * 检查整个棋盘是否已经完成。
         * @param boardData 当前棋盘数据。
         * @returns 如果完成则返回 true，否则返回 false。
         */


        isBoardComplete(boardData) {
          // 简单方法：检查每一行、每一列、每一宫是否都完成
          for (var i = 0; i < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE; i++) {
            if (!this.isPartComplete(boardData, 'row', i)) return false;
            if (!this.isPartComplete(boardData, 'col', i)) return false;
            if (!this.isPartComplete(boardData, 'box', i)) return false;
          }

          return true; // 或者，如果 BoardData 中存储了 solution，可以直接比较：

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


        getValidCandidates(boardData, row, col) {
          if (row < 0 || row >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || col < 0 || col >= (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).GRID_SIZE || boardData.grid[row][col] !== 0) {
            return []; // Invalid cell or already filled
          }

          var candidates = [];

          for (var num = 1; num <= 9; num++) {
            if (this.isValidMove(boardData, row, col, num)) {
              candidates.push(num);
            }
          }

          return candidates;
        } // --- (Optional) Expose Solver if needed elsewhere ---

        /**
         * 尝试解决给定的棋盘状态。
         * @param boardData 要解决的棋盘数据。
         * @returns 返回包含解的 BoardData，如果无解则返回 null。
         */


        solveSudoku(boardData) {
          try {
            var boardString = this.convertBoardDataToString(boardData);
            var solutionString = this.core.solve(boardString);

            if (solutionString) {
              // Convert solution string back to BoardData (grid only)
              var solvedBoard = (_crd && createEmptyBoardData === void 0 ? (_reportPossibleCrUseOfcreateEmptyBoardData({
                error: Error()
              }), createEmptyBoardData) : createEmptyBoardData)();

              for (var r = 0; r < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).GRID_SIZE; r++) {
                for (var c = 0; c < (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                  error: Error()
                }), Constants) : Constants).GRID_SIZE; c++) {
                  var index = r * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                    error: Error()
                  }), Constants) : Constants).GRID_SIZE + c;
                  solvedBoard.grid[r][c] = parseInt(solutionString[index], 10); // Preset mask is irrelevant for a solved board
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

      });

      SudokuLogic.instance = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=07acd35229d20066c72df88d14e08fe8c6b0b3b4.js.map