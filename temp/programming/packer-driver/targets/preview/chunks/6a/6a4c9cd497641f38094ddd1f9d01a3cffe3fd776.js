System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, log, warn, error, director, Constants, ActionRecord, SudokuLogic, cloneBoardData, _dec, _class, _crd, ccclass, property, InputManager;

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfActionRecord(extras) {
    _reporterNs.report("ActionRecord", "../data/ActionRecord", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGridManager(extras) {
    _reporterNs.report("GridManager", "./GridManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSudokuLogic(extras) {
    _reporterNs.report("SudokuLogic", "../logic/SudokuLogic", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAudioManager(extras) {
    _reporterNs.report("AudioManager", "./AudioManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEffectsManager(extras) {
    _reporterNs.report("EffectsManager", "./EffectsManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardData(extras) {
    _reporterNs.report("BoardData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcloneBoardData(extras) {
    _reporterNs.report("cloneBoardData", "../data/GameData", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      log = _cc.log;
      warn = _cc.warn;
      error = _cc.error;
      director = _cc.director;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      ActionRecord = _unresolved_3.ActionRecord;
    }, function (_unresolved_4) {
      SudokuLogic = _unresolved_4.SudokuLogic;
    }, function (_unresolved_5) {
      cloneBoardData = _unresolved_5.cloneBoardData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ba489B4zSRCKKBvaBW6pI7f", "InputManager", undefined); // assets/scripts/managers/InputManager.ts


      __checkObsolete__(['_decorator', 'Component', 'log', 'warn', 'error', 'director']); // 需要 GridManager 实例
      // 需要 SudokuLogic 实例
      // 需要 UIManager 实例
      // 需要 AudioManager 实例
      // 需要 EffectsManager 实例


      ({
        ccclass,
        property
      } = _decorator);

      _export("InputManager", InputManager = (_dec = ccclass('InputManager'), _dec(_class = class InputManager extends Component {
        constructor() {
          super(...arguments);
          // --- 依赖注入（或查找） ---
          // 这些管理器实例需要在 InputManager 初始化时被设置或找到
          this.gridManager = null;
          this.sudokuLogic = null;
          this.uiManager = null;
          this.audioManager = null;
          this.effectsManager = null;
          // --- 内部状态 ---
          this._selectedRow = -1;
          // 当前选中的行 (-1 表示未选中)
          this._selectedCol = -1;
          // 当前选中的列 (-1 表示未选中)
          this._undoStack = [];
          // 撤销栈
          this._redoStack = [];
          // 恢复栈
          this._isInputEnabled = false;
          // 控制是否接受输入（例如，动画播放期间可以禁用）
          this._currentBoardData = null;
        }

        // 缓存当前棋盘数据，避免频繁从 GridManager 获取
        // --- 初始化 ---

        /**
         * 初始化 InputManager，设置依赖的管理器实例。
         * 通常由 GameManager 在游戏启动时调用。
         * @param gridManager GridManager 实例
         * @param uiManager UIManager 实例
         * @param audioManager AudioManager 实例
         * @param effectsManager EffectsManager 实例
         */
        initialize(gridManager, uiManager, audioManager, effectsManager) {
          console.log('[InputManager] Initializing...');
          this.gridManager = gridManager;
          this.uiManager = uiManager;
          this.audioManager = audioManager;
          this.effectsManager = effectsManager;
          this.sudokuLogic = (_crd && SudokuLogic === void 0 ? (_reportPossibleCrUseOfSudokuLogic({
            error: Error()
          }), SudokuLogic) : SudokuLogic).getInstance(); // 获取 SudokuLogic 单例

          if (!this.gridManager || !this.uiManager || !this.audioManager || !this.effectsManager || !this.sudokuLogic) {
            error('[InputManager] Initialization failed: Missing required manager instances.');
            return;
          } // 监听来自 UIManager 的事件 (或者直接让 UIManager 调用这里的 public 方法)
          // 使用事件系统可以更好地解耦


          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CELL_CLICKED, this.onCellClicked, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.NUMBER_INPUT, this.onNumberInput, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CLEAR_BUTTON_CLICKED, this.onClearButtonClicked, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.UNDO_BUTTON_CLICKED, this.onUndoButtonClicked, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.REDO_BUTTON_CLICKED, this.onRedoButtonClicked, this);
          console.log('[InputManager] Initialized successfully and listening for UI events.');
        }
        /**
         * 当开始新游戏或加载游戏时，重置 InputManager 的状态。
         * @param boardData 当前关卡的棋盘数据副本。
         */


        reset(boardData) {
          console.log('[InputManager] Resetting state.');
          this._selectedRow = -1;
          this._selectedCol = -1;
          this._undoStack = [];
          this._redoStack = [];
          this._isInputEnabled = true; // **非常重要**: 存储棋盘数据的副本，而不是引用

          this._currentBoardData = boardData; // 假设传入的是克隆后的数据

          this.updateUndoRedoState();
          this.updateNumberPadState(); // 清除数字面板状态
        } // --- 事件处理 ---

        /**
         * 处理格子点击事件。
         * @param row 被点击的行 (0-8)。
         * @param col 被点击的列 (0-8)。
         */


        onCellClicked(row, col) {
          var _this$uiManager, _this$audioManager;

          console.log("[InputManager] Cell clicked: (" + row + ", " + col + ")");
          if (!this._isInputEnabled || !this._currentBoardData) return; // 检查点击的是否是可编辑的格子

          if (this._currentBoardData.presetMask[row][col]) {
            console.log('[InputManager] Clicked on a preset cell. Ignoring selection.');
            return;
          } // 如果点击的是已选中的格子，则取消选择 (可选逻辑)


          if (this._selectedRow === row && this._selectedCol === col) {
            this.deselectCurrentCell();
            return;
          } // 更新选中状态


          this._selectedRow = row;
          this._selectedCol = col; // 通知 UIManager 更新格子高亮

          (_this$uiManager = this.uiManager) == null || _this$uiManager.highlightCell(row, col); // 播放音效

          (_this$audioManager = this.audioManager) == null || _this$audioManager.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).AudioClipName.CLICK); // 更新数字输入板状态

          this.updateNumberPadState();
        }
        /**
         * 处理数字输入按钮点击事件。
         * @param number 被点击的数字 (1-9)。
         */


        onNumberInput(num) {
          var _this$audioManager2, _this$uiManager2;

          if (!this._isInputEnabled || this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            console.log('[InputManager] Number input ignored: No cell selected or input disabled.');
            return;
          }

          var row = this._selectedRow;
          var col = this._selectedCol; // 再次检查是否为预设格子 (安全校验)

          if (this._currentBoardData.presetMask[row][col]) {
            warn('[InputManager] Attempted to input number into a preset cell.');
            return;
          } // 检查输入是否合法 (是否会引起冲突)
          // 注意：这里可以根据游戏策略决定是否允许输入冲突数字
          // 如果允许冲突，则不需要 isValidMove 检查，只在完成时判断
          // 如果不允许冲突，则进行检查


          var isValid = this.sudokuLogic.isValidMove(this._currentBoardData, row, col, num);

          if (!isValid) {
            console.log("[InputManager] Invalid move: Placing " + num + " at (" + row + ", " + col + ") creates a conflict."); // 可以给用户反馈，例如震动或提示
            // this.uiManager?.showInvalidMoveIndicator(row, col);
            // 播放错误音效？

            return; // 阻止无效输入
          }

          var previousValue = this._currentBoardData.grid[row][col];

          if (previousValue === num) {
            console.log('[InputManager] 输入数字与当前格子数字相同，则视为无效操作.');
            return;
          }

          console.log("[InputManager] Inputting number " + num + " at (" + row + ", " + col + "). Previous value: " + previousValue + " set _isInputEnabled to false"); // 禁用输入，防止动画期间的干扰

          this._isInputEnabled = false; // 1. 播放音效

          (_this$audioManager2 = this.audioManager) == null || _this$audioManager2.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).AudioClipName.FILL); // 2. 通知 UIManager 播放数字出现动画，并在动画后更新数据

          (_this$uiManager2 = this.uiManager) == null || _this$uiManager2.playInputAnimation(row, col, num, () => {
            this.performFillAction(row, col, num, previousValue); // 重新启用输入

            this._isInputEnabled = true;
          });
        }
        /**
         * 处理清除按钮点击事件。
         */


        onClearButtonClicked() {
          var _this$audioManager3, _this$uiManager3;

          if (!this._isInputEnabled || this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            console.log('[InputManager] Clear ignored: No cell selected or input disabled.');
            return;
          }

          var row = this._selectedRow;
          var col = this._selectedCol; // 检查是否为预设格子

          if (this._currentBoardData.presetMask[row][col]) {
            console.warn('[InputManager] Attempted to clear a preset cell.');
            return;
          }

          var previousValue = this._currentBoardData.grid[row][col];

          if (previousValue === 0) {
            console.log('[InputManager] 格子本来就是空的，则无需操作.');
            return;
          }

          this._isInputEnabled = false;
          (_this$audioManager3 = this.audioManager) == null || _this$audioManager3.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).AudioClipName.CLEAR);
          console.log("[InputManager] \u5F00\u59CB\u6E05\u7406 (" + row + ", " + col + "). \u539F\u5148\u6570\u5B57\u4E3A : " + previousValue); // 2. 通知 UIManager 播放数字消失动画，并在动画后更新数据

          (_this$uiManager3 = this.uiManager) == null || _this$uiManager3.playClearAnimation(row, col, () => {
            this.performClearAction(row, col, previousValue);
            this._isInputEnabled = true;
          });
        }

        switchHighlight(row, col) {
          var _this$uiManager4;

          this._selectedRow = row;
          this._selectedCol = col;
          (_this$uiManager4 = this.uiManager) == null || _this$uiManager4.highlightCell(row, col);
        }
        /**
         * 处理撤销按钮点击事件。
         */


        onUndoButtonClicked() {
          var _this$audioManager4;

          if (!this._isInputEnabled || this._undoStack.length === 0) {
            console.log('[InputManager] Undo ignored: Stack empty or input disabled.');
            return;
          }

          var action = this._undoStack.pop();

          console.log("[InputManager] Undoing action: type=" + action.type + ", cell=(" + action.row + ", " + action.col + "), prev=" + action.previousValue + ", new=" + action.newValue);

          if (action.type === 'fill') {
            var _this$uiManager5;

            (_this$uiManager5 = this.uiManager) == null || _this$uiManager5.playInputAnimation(action.row, action.col, action.previousValue, () => {});
          } else {
            var _this$uiManager6;

            (_this$uiManager6 = this.uiManager) == null || _this$uiManager6.playClearAnimation(action.row, action.col, () => {});
          }

          this.switchHighlight(action.row, action.col);

          this._redoStack.push(action);

          this.updateGridCellValue(action.row, action.col, action.previousValue);
          (_this$audioManager4 = this.audioManager) == null || _this$audioManager4.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).AudioClipName.CLICK);
          this.updateUndoRedoState();
          this.updateNumberPadState();
          this.checkCompletionAfterUpdate(action.row, action.col);
        }
        /**
         * 处理恢复按钮点击事件。
         */


        onRedoButtonClicked() {
          var _this$audioManager5;

          if (!this._isInputEnabled || this._redoStack.length === 0) {
            console.log('[InputManager] Redo ignored: Stack empty or input disabled.');
            return;
          }

          var action = this._redoStack.pop();

          console.log("[InputManager] Redoing action: type=" + action.type + ", cell=(" + action.row + ", " + action.col + "), prev=" + action.previousValue + ", new=" + action.newValue);
          this.switchHighlight(action.row, action.col);

          if (action.type === 'fill') {
            var _this$uiManager7;

            (_this$uiManager7 = this.uiManager) == null || _this$uiManager7.playInputAnimation(action.row, action.col, action.newValue, () => {});
          } else {
            var _this$uiManager8;

            (_this$uiManager8 = this.uiManager) == null || _this$uiManager8.playClearAnimation(action.row, action.col, () => {});
          }

          this._undoStack.push(action);

          this.updateGridCellValue(action.row, action.col, action.newValue);
          (_this$audioManager5 = this.audioManager) == null || _this$audioManager5.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).AudioClipName.CLICK);
          this.updateUndoRedoState();
          this.updateNumberPadState();
          this.checkCompletionAfterUpdate(action.row, action.col);
        } // --- 核心操作逻辑 ---

        /**
         * 执行填充数字的操作，包括更新数据、记录操作、更新UI状态。
         * @param row 行
         * @param col 列
         * @param num 填入的数字
         * @param previousValue 之前的值
         */


        performFillAction(row, col, num, previousValue) {
          this.updateGridCellValue(row, col, num);
          var action = new (_crd && ActionRecord === void 0 ? (_reportPossibleCrUseOfActionRecord({
            error: Error()
          }), ActionRecord) : ActionRecord)('fill', row, col, previousValue, num);
          this.recordAction(action);
          this.updateNumberPadState();
          this.checkCompletionAfterUpdate(row, col);
        }

        performClearAction(row, col, previousValue) {
          console.log("[InputManager] performClearAction: row=" + row + ", col=" + col + ", prevValue=" + previousValue);
          this.updateGridCellValue(row, col, 0);
          var action = new (_crd && ActionRecord === void 0 ? (_reportPossibleCrUseOfActionRecord({
            error: Error()
          }), ActionRecord) : ActionRecord)('clear', row, col, previousValue, 0);
          this.recordAction(action);
          this.updateNumberPadState();
        }
        /**
         * 获取当前棋盘数据的克隆副本。
         * 提供给 GameManager 用于保存游戏状态。
         * @returns 返回当前棋盘数据的深拷贝副本，如果数据无效则返回 null。
         */


        getCurrentBoardData() {
          if (!this._currentBoardData) {
            warn('[InputManager] 尝试获取棋盘数据，但内部缓存为空。');
            return null;
          } // 返回克隆副本，防止外部修改影响 InputManager 的内部状态


          return (_crd && cloneBoardData === void 0 ? (_reportPossibleCrUseOfcloneBoardData({
            error: Error()
          }), cloneBoardData) : cloneBoardData)(this._currentBoardData);
        }

        setInputEnabled(enabled) {
          log("[InputManager] \u8BBE\u7F6E\u8F93\u5165\u72B6\u6001: " + enabled);
          this._isInputEnabled = enabled;
        }
        /**
         * 更新内部棋盘数据模型和通知 GridManager 更新视觉。
         * @param row 行
         * @param col 列
         * @param value 新的值 (0-9)
         */


        updateGridCellValue(row, col, value) {
          console.log("[InputManager] Updating cell (" + row + ", " + col + ") to value: " + value);

          if (!this._currentBoardData) {
            console.warn('[InputManager] 尝试更新格子，但当前棋盘数据为空。');
            return;
          }

          this._currentBoardData.grid[row][col] = value;
        }
        /**
         * 记录一个用户操作到撤销栈，并清空恢复栈。
         * @param action 要记录的操作。
         */


        recordAction(action) {
          this._undoStack.push(action);

          this._redoStack = [];
          this.updateUndoRedoState();
        } // --- 状态更新与检查 ---

        /**
         * 更新撤销和恢复按钮的可用状态，并通知 UIManager。
         */


        updateUndoRedoState() {
          var _this$uiManager9;

          var canUndo = this._undoStack.length > 0;
          var canRedo = this._redoStack.length > 0; // 通知 UIManager 更新按钮状态

          (_this$uiManager9 = this.uiManager) == null || _this$uiManager9.updateUndoRedoButtons(canUndo, canRedo); // 或者使用事件
          // director.emit(Constants.EventName.UNDO_STATE_UPDATE, canUndo, canRedo);
        }
        /**
         * 更新数字输入面板按钮的可用状态 (根据当前选中格子)。
         */


        updateNumberPadState() {
          var _this$uiManager11;

          console.log("[InputManager] Updating number pad state., row " + this._selectedRow + ", col " + this._selectedCol);

          if (this._selectedRow === -1 || this._selectedCol === -1 || !this._currentBoardData) {
            var _this$uiManager10;

            (_this$uiManager10 = this.uiManager) == null || _this$uiManager10.updateNumberPadState([]); // 传入空数组表示默认状态或全部可用

            return;
          } // 获取当前选中格子的合法候选数字


          var validNumbers = this.sudokuLogic.getValidCandidates(this._currentBoardData, this._selectedRow, this._selectedCol); // 通知 UIManager 更新数字按钮背景

          (_this$uiManager11 = this.uiManager) == null || _this$uiManager11.updateNumberPadState(validNumbers);
        }
        /**
         * 在用户更新格子后检查相关行、列、宫以及整个棋盘的完成状态。
         * @param row 发生更新的行
         * @param col 发生更新的列
         */


        checkCompletionAfterUpdate(row, col) {
          console.log("[InputManager] checkCompletionAfterUpdate: row=" + row + ", col=" + col);
          if (!this._currentBoardData) return;
          var boxIndex = Math.floor(row / (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE) * (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE + Math.floor(col / (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).BOX_SIZE);
          var partCompleted = false; // 检查行

          if (this.sudokuLogic.isPartComplete(this._currentBoardData, 'row', row)) {
            var _this$audioManager6;

            console.log("[InputManager] Row " + row + " completed!");
            (_this$audioManager6 = this.audioManager) == null || _this$audioManager6.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).AudioClipName.APPLAUSE);
            partCompleted = true;
          } // 检查列


          if (this.sudokuLogic.isPartComplete(this._currentBoardData, 'col', col)) {
            var _this$audioManager7;

            console.log("[InputManager] Column " + col + " completed!");
            (_this$audioManager7 = this.audioManager) == null || _this$audioManager7.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).AudioClipName.APPLAUSE);
            partCompleted = true;
          } // 检查宫


          if (this.sudokuLogic.isPartComplete(this._currentBoardData, 'box', boxIndex)) {
            var _this$audioManager8;

            console.log("[InputManager] Box " + boxIndex + " completed!");
            (_this$audioManager8 = this.audioManager) == null || _this$audioManager8.playSFX((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).AudioClipName.APPLAUSE);
            partCompleted = true;
          } // 如果有部分完成，检查全局是否完成


          if (partCompleted) {
            console.log('[InputManager] Checking global completion...');

            if (this.sudokuLogic.isBoardComplete(this._currentBoardData)) {
              console.log('[InputManager] Board completed!');
              this._isInputEnabled = false; // 游戏结束，禁用输入

              this.deselectCurrentCell(); // 取消选择

              director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).EventName.GAME_OVER, true); // isWin = true
            }
          }
        }
        /**
         * 取消当前选中的格子。
         */


        deselectCurrentCell() {
          if (this._selectedRow !== -1 || this._selectedCol !== -1) {
            var _this$uiManager12;

            console.log('[InputManager] Deselecting cell.');
            this._selectedRow = -1;
            this._selectedCol = -1;
            (_this$uiManager12 = this.uiManager) == null || _this$uiManager12.deselectCell(); // 通知 UI 取消高亮

            this.updateNumberPadState(); // 更新数字面板状态
          }
        } // --- 清理 ---


        onDestroy() {
          console.log('[InputManager] onDestroy'); // 移除事件监听器

          director.off((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CELL_CLICKED, this.onCellClicked, this);
          director.off((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.NUMBER_INPUT, this.onNumberInput, this);
          director.off((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.CLEAR_BUTTON_CLICKED, this.onClearButtonClicked, this);
          director.off((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.UNDO_BUTTON_CLICKED, this.onUndoButtonClicked, this);
          director.off((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.REDO_BUTTON_CLICKED, this.onRedoButtonClicked, this);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6a4c9cd497641f38094ddd1f9d01a3cffe3fd776.js.map