System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Button, director, Constants, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, HistoryItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfLevelRecord(extras) {
    _reporterNs.report("LevelRecord", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
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
      Label = _cc.Label;
      Button = _cc.Button;
      director = _cc.director;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a5825ffMHNIsIdKz29Zpkf4", "HistoryItem", undefined); // assets/scripts/components/HistoryItem.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Button', 'log', 'director']); // 需要 LevelRecord 接口定义


      // 需要常量和类型
      ({
        ccclass,
        property
      } = _decorator);

      _export("HistoryItem", HistoryItem = (_dec = ccclass('HistoryItem'), _dec2 = property({
        type: Label,
        tooltip: "显示难度的 Label"
      }), _dec3 = property({
        type: Label,
        tooltip: "显示关卡序号的 Label"
      }), _dec4 = property({
        type: Label,
        tooltip: "显示最佳用时的 Label"
      }), _dec5 = property({
        type: Label,
        tooltip: "显示首次完成日期的 Label"
      }), _dec6 = property({
        type: Button,
        tooltip: "再次挑战按钮"
      }), _dec(_class = (_class2 = class HistoryItem extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "difficultyLabel", _descriptor, this);

          _initializerDefineProperty(this, "levelLabel", _descriptor2, this);

          _initializerDefineProperty(this, "bestTimeLabel", _descriptor3, this);

          _initializerDefineProperty(this, "dateLabel", _descriptor4, this);

          _initializerDefineProperty(this, "challengeButton", _descriptor5, this);

          // --- 内部数据 ---
          this._recordData = null;
        }

        // 存储当前项对应的记录数据
        onLoad() {
          var _this$challengeButton;

          // 绑定按钮点击事件
          (_this$challengeButton = this.challengeButton) == null || _this$challengeButton.node.on(Button.EventType.CLICK, this.onChallengeClick, this);
        }
        /**
         * 设置并显示关卡记录数据。
         * 由 UIManager 在填充列表时调用。
         * @param recordData 关卡记录数据。
         */


        setData(recordData) {
          this._recordData = recordData;

          if (!recordData) {
            console.log('[HistoryItem] 设置了空的记录数据。'); // 可以选择隐藏节点或显示空状态

            this.node.active = false;
            return;
          }

          this.node.active = true; // 更新 UI 显示

          if (this.difficultyLabel) {
            this.difficultyLabel.string = recordData.difficulty; // 可以根据难度设置不同的颜色 (可选)
            // this.difficultyLabel.color = this.getDifficultyColor(recordData.difficulty);
          }

          if (this.levelLabel) {
            this.levelLabel.string = "\u7B2C " + recordData.levelIndex + " \u5173";
          }

          if (this.bestTimeLabel) {
            this.bestTimeLabel.string = "\u6700\u4F73: " + this.formatTime(recordData.bestTimeSeconds);
          }

          if (this.dateLabel) {
            var date = new Date(recordData.firstCompletionTimestamp); // 使用更友好的日期格式

            this.dateLabel.string = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getDate().toString().padStart(2, '0');
          }
        }
        /**
         * 处理再次挑战按钮点击事件。
         */


        onChallengeClick() {
          if (this._recordData) {
            console.log("[HistoryItem] \u6311\u6218\u6309\u94AE\u70B9\u51FB: " + this._recordData.difficulty + " - " + this._recordData.levelIndex); // 发射全局事件，携带难度和关卡信息，由 GameManager 监听处理

            director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).EventName.CHALLENGE_BUTTON_CLICKED, this._recordData.difficulty, this._recordData.levelIndex); // UIManager 应该在 GameManager 处理后关闭弹窗
          } else {
            console.log('[HistoryItem] 挑战按钮点击时记录数据为空。');
          }
        }
        /**
         * 格式化时间（秒）为 MM:SS 格式。
         * @param totalSeconds 总秒数。
         * @returns 返回 MM:SS 格式的字符串。
         */


        formatTime(totalSeconds) {
          if (isNaN(totalSeconds) || totalSeconds < 0) {
            return "00:00";
          }

          var minutes = Math.floor(totalSeconds / 60);
          var seconds = Math.floor(totalSeconds % 60); // 取整秒

          return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
        } // 可选：根据难度获取颜色
        // private getDifficultyColor(difficulty: DifficultyType): Color {
        //     switch (difficulty) {
        //         case Constants.Difficulty.ENTRY: return Color.GREEN;
        //         case Constants.Difficulty.EASY: return Color.BLUE;
        //         case Constants.Difficulty.MEDIUM: return Color.YELLOW; // 可能需要调整颜色使其可见
        //         case Constants.Difficulty.HARD: return Color.ORANGE;
        //         case Constants.Difficulty.MASTER: return Color.RED;
        //         default: return Color.WHITE;
        //     }
        // }


        onDestroy() {
          // 移除事件监听
          if (this.challengeButton) {
            if (this.challengeButton.node) {
              this.challengeButton.node.off(Button.EventType.CLICK, this.onChallengeClick, this);
            } else {
              console.error('ChallengeButton node is not set in HistoryItem!');
            }
          } else {
            console.error('ChallengeButton is not set in HistoryItem!');
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "difficultyLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bestTimeLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "dateLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "challengeButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      /*
      节点引用: 获取 Prefab 内部各个 Label 和 Button 的引用。
      
      _recordData: 存储传递给该列表项的 LevelRecord 数据。
      
      setData 方法:
      
      这是核心方法，由 UIManager 在创建和填充历史记录列表时调用。
      
      接收 LevelRecord 数据并存储。
      
      根据数据更新各个 Label 的显示内容。
      
      包含了时间格式化 (formatTime) 和可选的日期格式化。
      
      onChallengeClick 方法:
      
      当“再次挑战”按钮被点击时触发。
      
      从存储的 _recordData 中获取难度和关卡序号。
      
      发射全局事件 Constants.EventName.CHALLENGE_BUTTON_CLICKED，携带必要信息。GameManager 会监听此事件来启动对应的关卡。
      
      formatTime 方法: 一个简单的辅助方法，将秒数格式化为 MM:SS 字符串。
      
      事件绑定与解绑: 在 onLoad 中绑定按钮事件，在 onDestroy 中解绑。
      
      
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=1dd1a4b9b0d647045ebc1fd57f46c790d95fcf84.js.map