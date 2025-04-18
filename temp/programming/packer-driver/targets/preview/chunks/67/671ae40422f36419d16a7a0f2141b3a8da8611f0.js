System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, SettingsData, _crd;

  _export("SettingsData", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3caee+VVkxMTbu2kdreYUAU", "SettingsData", undefined);

      /**
       * @description 定义游戏设置的数据结构，用于本地存储。
       */
      _export("SettingsData", SettingsData = class SettingsData {
        /**
         * 构造函数，可以设置默认值。
         * @param bgmEnabled 背景音乐开关状态，默认为 true
         * @param sfxEnabled 触控音效开关状态，默认为 true
         */
        constructor(bgmEnabled, sfxEnabled) {
          if (bgmEnabled === void 0) {
            bgmEnabled = true;
          }

          if (sfxEnabled === void 0) {
            sfxEnabled = true;
          }

          /**
           * 背景音乐 (BGM) 是否启用。
           * 默认为 true。
           */
          this.bgmEnabled = void 0;

          /**
           * 触控音效 (SFX) 是否启用。
           * 默认为 true。
           */
          this.sfxEnabled = void 0;
          this.bgmEnabled = bgmEnabled;
          this.sfxEnabled = sfxEnabled;
        }
        /**
         * (可选) 提供一个从普通对象加载数据的方法，增加健壮性。
         * @param data 一个可能包含设置数据的对象
         * @returns 返回一个 SettingsData 实例
         */


        static fromObject(data) {
          var settings = new SettingsData(); // 使用默认值创建实例

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

      }); // 同样，也可以使用接口：

      /*
      export interface SettingsData {
          bgmEnabled: boolean;
          sfxEnabled: boolean;
      }
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=671ae40422f36419d16a7a0f2141b3a8da8611f0.js.map