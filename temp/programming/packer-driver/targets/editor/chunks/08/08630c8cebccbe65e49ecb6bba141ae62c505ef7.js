System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, Constants, SettingsData, PersistenceManager, _crd;

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSettingsData(extras) {
    _reporterNs.report("SettingsData", "../data/SettingsData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLocalUserProgress(extras) {
    _reporterNs.report("LocalUserProgress", "../data/UserData", _context.meta, extras);
  }

  _export("PersistenceManager", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      SettingsData = _unresolved_3.SettingsData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "25f566AKvZLnqD/kJWFK28Y", "PersistenceManager", undefined);

      // Import BoardData related functions if needed for deep cloning on load/save,
      // but typically cloning happens *before* saving or *after* loading in the calling manager.
      // import { cloneBoardData } from "../data/GameData";

      /**
       * @description 本地持久化管理器
       * 使用微信小程序的同步本地存储 API (wx.setStorageSync, wx.getStorageSync, wx.removeStorageSync)
       * 负责游戏设置和未完成游戏进度的本地读写。
       *
       * 注意：此类仅处理本地存储。云端数据的同步由 AccountManager 和 CloudService 处理。
       */
      _export("PersistenceManager", PersistenceManager = class PersistenceManager {
        /**
         * 保存游戏设置到本地存储。
         * @param settings 要保存的 SettingsData 对象。
         */
        static saveSettings(settings) {
          try {
            const dataString = JSON.stringify(settings);
            wx.setStorageSync((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.SETTINGS, dataString);
            console.log('[PersistenceManager] Settings saved.');
          } catch (error) {
            console.error('[PersistenceManager] Error saving settings:', error); // 在小游戏中，同步存储通常不会抛出序列化错误，除非对象非常复杂或循环引用
            // 但捕获以防万一
          }
        }
        /**
         * 从本地存储加载游戏设置。
         * 如果本地没有存储或数据无效，则返回包含默认值的 SettingsData 对象。
         * @returns 返回 SettingsData 实例。
         */


        static loadSettings() {
          try {
            const dataString = wx.getStorageSync((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.SETTINGS);

            if (dataString && typeof dataString === 'string') {
              const data = JSON.parse(dataString); // 使用 SettingsData.fromObject 来处理可能不完整的旧数据或格式问题

              const settings = (_crd && SettingsData === void 0 ? (_reportPossibleCrUseOfSettingsData({
                error: Error()
              }), SettingsData) : SettingsData).fromObject(data);
              console.log('[PersistenceManager] Settings loaded:', settings);
              return settings;
            } else {
              console.log('[PersistenceManager] No settings found in storage, returning defaults.'); // 没有找到数据，返回默认设置

              return new (_crd && SettingsData === void 0 ? (_reportPossibleCrUseOfSettingsData({
                error: Error()
              }), SettingsData) : SettingsData)();
            }
          } catch (error) {
            console.error('[PersistenceManager] Error loading or parsing settings, returning defaults:', error); // 解析失败或发生其他错误，返回默认设置

            return new (_crd && SettingsData === void 0 ? (_reportPossibleCrUseOfSettingsData({
              error: Error()
            }), SettingsData) : SettingsData)();
          }
        }
        /**
         * 保存未完成的游戏进度到本地存储。
         * @param progress 要保存的 LocalUserProgress 对象。
         */


        static saveUnfinishedGame(progress) {
          try {
            // 考虑是否需要深拷贝 progress.currentBoardState，
            // 但通常调用者（如 GameManager）在调用此方法前应确保传入的是独立副本。
            const dataString = JSON.stringify(progress);
            wx.setStorageSync((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.UNFINISHED_GAME, dataString);
            console.log('[PersistenceManager] Unfinished game saved.');
          } catch (error) {
            console.error('[PersistenceManager] Error saving unfinished game:', error);
          }
        }
        /**
         * 从本地存储加载未完成的游戏进度。
         * @returns 返回 LocalUserProgress 对象，如果不存在或加载失败则返回 null。
         */


        static loadUnfinishedGame() {
          try {
            const dataString = wx.getStorageSync((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.UNFINISHED_GAME);

            if (dataString && typeof dataString === 'string') {
              const data = JSON.parse(dataString); // 这里可以添加更严格的类型检查，确保加载的数据结构符合 LocalUserProgress
              // 例如，检查必要的字段是否存在

              if (data && data.difficulty && data.levelIndex !== undefined && data.currentBoardState && data.elapsedTime !== undefined) {
                // 考虑是否需要深拷贝 data.currentBoardState，
                // 调用者（如 GameManager）在接收到数据后通常会进行拷贝以防后续意外修改。
                console.log('[PersistenceManager] Unfinished game loaded.');
                return data; // 类型断言
              } else {
                console.warn('[PersistenceManager] Loaded unfinished game data is invalid or incomplete.');
                this.clearUnfinishedGame(); // 清理无效数据

                return null;
              }
            } else {
              console.log('[PersistenceManager] No unfinished game found in storage.');
              return null;
            }
          } catch (error) {
            console.error('[PersistenceManager] Error loading or parsing unfinished game:', error);
            this.clearUnfinishedGame(); // 加载或解析出错时也清理掉，避免下次再出错

            return null;
          }
        }
        /**
         * 清除本地存储的未完成游戏进度。
         */


        static clearUnfinishedGame() {
          try {
            wx.removeStorageSync((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.UNFINISHED_GAME);
            console.log('[PersistenceManager] Unfinished game cleared from storage.');
          } catch (error) {
            console.error('[PersistenceManager] Error clearing unfinished game:', error);
          }
        }
        /**
         * 检查本地是否存在未完成的游戏进度。
         * @returns 如果存在则返回 true，否则返回 false。
         */


        static hasSavedGame() {
          try {
            const info = wx.getStorageInfoSync();
            return info.keys.includes((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).StorageKeys.UNFINISHED_GAME); // 或者直接尝试获取值判断是否为空
            // return !!wx.getStorageSync(Constants.StorageKeys.UNFINISHED_GAME);
          } catch (error) {
            console.error('[PersistenceManager] Error checking for saved game:', error);
            return false;
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=08630c8cebccbe65e49ecb6bba141ae62c505ef7.js.map