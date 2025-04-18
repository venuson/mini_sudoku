System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, director, warn, error, sys, Constants, CloudService, createEmptyUserAccount, generateLevelRecordKey, _dec, _class, _class2, _crd, ccclass, property, AccountManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCloudService(extras) {
    _reporterNs.report("CloudService", "../services/CloudService", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUserAccount(extras) {
    _reporterNs.report("UserAccount", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelRecord(extras) {
    _reporterNs.report("LevelRecord", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateEmptyUserAccount(extras) {
    _reporterNs.report("createEmptyUserAccount", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgenerateLevelRecordKey(extras) {
    _reporterNs.report("generateLevelRecordKey", "../data/UserData", _context.meta, extras);
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
      director = _cc.director;
      warn = _cc.warn;
      error = _cc.error;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }, function (_unresolved_3) {
      CloudService = _unresolved_3.CloudService;
    }, function (_unresolved_4) {
      createEmptyUserAccount = _unresolved_4.createEmptyUserAccount;
      generateLevelRecordKey = _unresolved_4.generateLevelRecordKey;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b6cadotBjxHkqpf6uEpsycs", "AccountManager", undefined); // assets/scripts/managers/AccountManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'director', 'log', 'warn', 'error', 'sys']); // 依赖 CloudService


      ({
        ccclass,
        property
      } = _decorator); // 微信 API 类型定义 (简化版)

      _export("AccountManager", AccountManager = (_dec = ccclass('AccountManager'), _dec(_class = (_class2 = class AccountManager extends Component {
        constructor() {
          super(...arguments);
          // --- 内部状态 ---
          this._isInitialized = false;
          this._isLoggingIn = false;
          // 防止重复登录
          this._isLoggedIn = false;
          this._userId = null;
          // openid
          this._userAccount = null;
          // 缓存从云端获取的用户账户信息
          this._isNewUser = false;
        }

        static get instance() {
          if (!this._instance) {
            error("[AccountManager] 实例在初始化之前或节点不存在时被请求。");
          }

          return this._instance;
        }

        // 标记是否是新用户
        // --- Lifecycle Callbacks ---
        onLoad() {
          console.log('[AccountManager] onLoad');

          if (AccountManager._instance && AccountManager._instance !== this) {
            warn('[AccountManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
          }

          AccountManager._instance = this; // 设置为持久节点

          if (this.node.parent) {
            director.addPersistRootNode(this.node);
            console.log('[AccountManager] 节点已设为持久化。');
          }

          this._isInitialized = true;
          console.log('[AccountManager] 初始化完成。'); // 可以在初始化时尝试自动登录
          // this.login();
        }

        onDestroy() {
          console.log('[AccountManager] onDestroy');

          if (AccountManager._instance === this) {
            AccountManager._instance = null;
          } // 清理状态


          this._isLoggedIn = false;
          this._userId = null;
          this._userAccount = null;
        } // --- 公共接口 ---

        /**
         * 尝试进行用户登录和认证。
         * 如果已经在登录中或已登录，则直接返回。
         * @param forceRefresh (可选) 是否强制重新从云端拉取用户信息，默认为 false。
         * @returns Promise<boolean> 登录是否成功。
         */


        login(forceRefresh) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (forceRefresh === void 0) {
              forceRefresh = false;
            }

            if (!_this._isInitialized) {
              warn('[AccountManager] login 在初始化之前被调用。');
              return false;
            }

            if (_this._isLoggingIn) {
              warn('[AccountManager] 正在登录中，请稍候...'); // 可以返回一个正在进行的 Promise，或者简单返回 false

              return false;
            }

            if (_this._isLoggedIn && !forceRefresh) {
              console.log('[AccountManager] 用户已登录。');
              return true;
            } // 检查是否在微信平台


            if (!sys.platform.toLowerCase().includes('wechat')) {
              warn('[AccountManager] 非微信平台，跳过登录流程。'); // 可以模拟一个游客登录状态

              _this._isLoggedIn = false; // 或者设为 true 代表游客登录？

              _this._userId = 'guest_user';
              _this._userAccount = (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                error: Error()
              }), createEmptyUserAccount) : createEmptyUserAccount)(_this._userId);
              director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).EventName.LOGIN_SUCCESS, _this._userId); // 发送游客登录成功事件

              return true; // 返回 true 表示流程完成（即使是游客）
            }

            console.log('[AccountManager] 开始登录流程...');
            _this._isLoggingIn = true;
            _this._isLoggedIn = false; // 重置登录状态

            try {
              // 1. 调用 wx.login 获取 code
              var loginRes = yield _this.wxLogin();

              if (!loginRes || !loginRes.code) {
                throw new Error('wx.login 调用失败或未返回 code。');
              }

              var code = loginRes.code;
              console.log('[AccountManager] wx.login 成功, code:', code); // 2. 调用 CloudService 进行认证

              var authResult = yield (_crd && CloudService === void 0 ? (_reportPossibleCrUseOfCloudService({
                error: Error()
              }), CloudService) : CloudService).authenticateUser(code);
              _this._userId = authResult.userId;
              _this._isNewUser = authResult.isNewUser;
              console.log("[AccountManager] \u4E91\u7AEF\u8BA4\u8BC1\u6210\u529F, userId: " + _this._userId + ", isNewUser: " + _this._isNewUser); // 3. (可选) 如果是新用户，可能需要创建基础账户信息 (云函数内部可能已处理)
              // if (this._isNewUser) {
              //     console.log('[AccountManager] 新用户，尝试在数据库创建账户...');
              //     // 可以调用 CloudService.upsertUserAccountToDB 或特定云函数
              // }
              // 4. 获取用户账户信息 (包含关卡记录等)

              console.log('[AccountManager] 获取用户账户信息...');
              _this._userAccount = yield _this.fetchUserAccountData(); // 从云端获取

              _this._isLoggedIn = true;
              console.log('[AccountManager] 登录成功！');
              director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).EventName.LOGIN_SUCCESS, _this._userId); // 发送登录成功事件
              // (可选) 登录成功后，可以尝试获取用户昵称和头像信息
              // this.tryFetchWxUserInfo();

              return true;
            } catch (err) {
              error('[AccountManager] 登录流程失败:', err);
              _this._isLoggedIn = false;
              _this._userId = null;
              _this._userAccount = null;
              director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).EventName.LOGIN_FAIL); // 发送登录失败事件

              return false;
            } finally {
              _this._isLoggingIn = false;
            }
          })();
        }
        /**
         * 获取当前用户的登录状态。
         */


        isLoggedIn() {
          return this._isLoggedIn;
        }
        /**
         * 获取当前用户的 User ID (openid)。
         * @returns 返回用户 ID，如果未登录则返回 null。
         */


        getUserId() {
          return this._userId;
        }
        /**
         * 获取当前用户的账户信息 (包含关卡记录等)。
         * @returns 返回 UserAccount 对象，如果未登录或未获取到则返回 null。
         */


        getUserAccount() {
          return this._userAccount;
        }
        /**
         * 获取当前用户指定关卡的记录。
         * @param difficulty 难度
         * @param levelIndex 关卡序号
         * @returns 返回 LevelRecord，如果无记录则返回 null。
         */


        getLevelRecord(difficulty, levelIndex) {
          if (!this._userAccount || !this._userAccount.levelRecords) {
            return null;
          }

          var key = (_crd && generateLevelRecordKey === void 0 ? (_reportPossibleCrUseOfgenerateLevelRecordKey({
            error: Error()
          }), generateLevelRecordKey) : generateLevelRecordKey)(difficulty, levelIndex);
          return this._userAccount.levelRecords[key] || null;
        }
        /**
        * 获取当前用户所有已完成的关卡记录。
        * @returns 返回 LevelRecord 数组。
        */


        getAllLevelRecords() {
          if (!this._userAccount || !this._userAccount.levelRecords) {
            return [];
          }

          return Object.values(this._userAccount.levelRecords);
        }
        /**
         * 保存用户完成关卡的结果到云端。
         * @param difficulty 难度。
         * @param levelIndex 关卡序号。
         * @param timeSeconds 完成用时 (秒)。
         * @returns Promise<boolean> 保存是否成功。
         */


        saveLevelResult(difficulty, levelIndex, timeSeconds) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (!_this2._isLoggedIn || !_this2._userId) {
              warn('[AccountManager] 用户未登录，无法保存关卡结果。'); // 可以考虑本地缓存，登录后上传

              return false;
            }

            if (!_this2._isInitialized) {
              warn('[AccountManager] saveLevelResult 在初始化之前被调用。');
              return false;
            }

            console.log("[AccountManager] \u4FDD\u5B58\u5173\u5361\u7ED3\u679C: " + difficulty + "-" + levelIndex + ", time=" + timeSeconds + "s");
            var completionTimestamp = Date.now(); // 使用客户端时间戳

            try {
              // 调用 CloudService 更新记录
              yield (_crd && CloudService === void 0 ? (_reportPossibleCrUseOfCloudService({
                error: Error()
              }), CloudService) : CloudService).updateUserRecord(_this2._userId, difficulty, levelIndex, timeSeconds, completionTimestamp); // --- 更新本地缓存的用户账户信息 ---

              if (_this2._userAccount) {
                var key = (_crd && generateLevelRecordKey === void 0 ? (_reportPossibleCrUseOfgenerateLevelRecordKey({
                  error: Error()
                }), generateLevelRecordKey) : generateLevelRecordKey)(difficulty, levelIndex);
                var existingRecord = _this2._userAccount.levelRecords[key];
                var isNewCompletion = false;

                if (existingRecord) {
                  // 更新最佳时间
                  if (timeSeconds < existingRecord.bestTimeSeconds) {
                    console.log("[AccountManager] \u65B0\u7684\u6700\u4F73\u65F6\u95F4\u8BB0\u5F55: " + timeSeconds + "s (\u539F: " + existingRecord.bestTimeSeconds + "s)");
                    existingRecord.bestTimeSeconds = timeSeconds; // 可以考虑更新完成时间戳，或只记录首次完成时间
                  }
                } else {
                  // 新完成的关卡
                  console.log("[AccountManager] \u9996\u6B21\u5B8C\u6210\u5173\u5361: " + difficulty + "-" + levelIndex);
                  _this2._userAccount.levelRecords[key] = {
                    difficulty: difficulty,
                    levelIndex: levelIndex,
                    bestTimeSeconds: timeSeconds,
                    firstCompletionTimestamp: completionTimestamp
                  };
                  _this2._userAccount.totalLevelsCompleted = (_this2._userAccount.totalLevelsCompleted || 0) + 1;
                  isNewCompletion = true;
                } // 通知 UI 可能需要更新 (例如，如果记录界面是打开的)


                director.emit((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                  error: Error()
                }), Constants) : Constants).EventName.USER_RECORDS_UPDATED, _this2.getAllLevelRecords());
              } else {
                // 如果本地缓存不存在，可以选择重新拉取或标记为需要刷新
                warn('[AccountManager] 用户账户本地缓存不存在，无法立即更新。将在下次登录时同步。');
              }

              return true;
            } catch (err) {
              error('[AccountManager] 保存关卡结果失败:', err);
              return false;
            }
          })();
        } // --- 私有辅助方法 ---

        /**
         * 封装 wx.login 的 Promise 调用。
         */


        wxLogin() {
          return new Promise(resolve => {
            wx.login({
              success: res => {
                resolve(res);
              },
              fail: err => {
                error('[AccountManager] wx.login fail:', err);
                resolve(null); // 失败时 resolve null
              }
            });
          });
        }
        /**
         * 从云端获取用户账户数据 (包含记录)。
         * @returns 返回 UserAccount 对象，如果获取失败或用户不存在则返回一个空的 UserAccount。
         */


        fetchUserAccountData() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            if (!_this3._userId) {
              error('[AccountManager] 无法获取用户账户数据：userId 为空。');
              return (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                error: Error()
              }), createEmptyUserAccount) : createEmptyUserAccount)('unknown_user'); // 返回空账户
            }

            try {
              // 方式一：调用特定云函数获取整合后的 UserAccount
              var recordsMap = yield (_crd && CloudService === void 0 ? (_reportPossibleCrUseOfCloudService({
                error: Error()
              }), CloudService) : CloudService).fetchUserRecords(_this3._userId); // 需要从其他地方获取 totalLevelsCompleted, nickname, avatarUrl 等信息
              // 或者 fetchUserRecords 云函数直接返回完整的 UserAccount 结构
              // 假设 fetchUserRecords 返回的就是记录 Map

              var account = (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                error: Error()
              }), createEmptyUserAccount) : createEmptyUserAccount)(_this3._userId);
              account.levelRecords = recordsMap;
              account.totalLevelsCompleted = Object.keys(recordsMap).length; // TODO: 获取昵称、头像等其他信息 (如果需要)

              console.log('[AccountManager] 从云端获取用户账户数据成功。');
              return account; // 方式二：直接从数据库读取 (如果权限允许且结构简单)

              /*
              const account = await CloudService.fetchUserAccountFromDB(this._userId);
              if (account) {
                  console.log('[AccountManager] 从数据库获取用户账户数据成功。');
                  return account;
              } else {
                   console.log('[AccountManager] 数据库中未找到用户账户，返回空账户。');
                   return createEmptyUserAccount(this._userId);
              }
              */
            } catch (err) {
              error('[AccountManager] 获取用户账户数据失败:', err); // 返回一个空账户，避免后续逻辑出错

              return (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                error: Error()
              }), createEmptyUserAccount) : createEmptyUserAccount)(_this3._userId);
            }
          })();
        } // --- (可选) 获取微信用户昵称和头像 ---

        /**
         * 尝试获取并更新用户的微信昵称和头像。
         * 注意：这通常需要用户通过按钮点击触发授权 (wx.getUserProfile)。
         *       静默获取方式 (wx.getUserInfo) 已不推荐或废弃。
         *       这里仅作示例，实际实现需要 UI 按钮配合。
         */


        tryFetchWxUserInfo() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            if (!_this4._isLoggedIn || !sys.platform.toLowerCase().includes('wechat')) {
              warn('[AccountManager] 用户未登录或非微信平台，无法获取用户信息。');
              return false;
            }

            if (_this4._userAccount && _this4._userAccount.nickname && _this4._userAccount.avatarUrl) {
              console.log('[AccountManager] 用户昵称和头像已存在，跳过获取。');
              return true; // 已有信息
            }

            console.log('[AccountManager] 尝试获取微信用户信息 (需要用户授权)...'); // --- 使用 wx.getUserProfile (推荐方式，需要按钮触发) ---

            return new Promise(resolve => {
              wx.getUserProfile({
                desc: '用于完善用户信息及排行榜展示',
                // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                success: res => {
                  console.log('[AccountManager] wx.getUserProfile 成功:', res.userInfo);
                  var {
                    nickName,
                    avatarUrl
                  } = res.userInfo; // 更新本地缓存

                  if (_this4._userAccount) {
                    _this4._userAccount.nickname = nickName;
                    _this4._userAccount.avatarUrl = avatarUrl;
                  } // TODO: 将获取到的昵称和头像信息上传到云端保存
                  // 例如调用一个 updateUserProfile 云函数
                  // CloudService.updateUserProfile(this._userId, nickName, avatarUrl);


                  resolve(true);
                },
                fail: err => {
                  error('[AccountManager] wx.getUserProfile 失败:', err); // 用户拒绝授权或发生错误

                  resolve(false);
                }
              });
            }); // --- 使用 wx.getUserInfo (旧方式，可能需要授权设置) ---

            /*
            return new Promise((resolve) => {
                wx.getUserInfo({
                    success: (res: WxGetUserInfoSuccessResult) => {
                        console.log('[AccountManager] wx.getUserInfo 成功:', res.userInfo);
                        // ... 更新逻辑同上 ...
                        resolve(true);
                    },
                    fail: (err: WxGetUserInfoErrorResult) => {
                        error('[AccountManager] wx.getUserInfo 失败:', err);
                        // 可能需要引导用户去设置页开启授权
                        resolve(false);
                    }
                });
            });
            */
          })();
        }

      }, _class2._instance = null, _class2)) || _class)); // --- 在 Constants.ts 中补充事件名 ---

      /*
      // assets/scripts/utils/Constants.ts
      export const Constants = {
          // ...
          EventName: {
              // ...
              LOGIN_SUCCESS: 'event_login_success',         // 登录成功 (userId: string)
              LOGIN_FAIL: 'event_login_fail',             // 登录失败
              USER_RECORDS_UPDATED: 'event_user_records_updated', // 用户记录已更新 (records: LevelRecord[])
              // ...
          }
          // ...
      };
      */

      /*
      Singleton & Persistence: 同样使用了单例模式和持久化节点。
      依赖 CloudService: 依赖 CloudService 来执行所有与云端的交互。
      状态管理:
      _isLoggingIn: 防止并发登录请求。
      _isLoggedIn: 标记用户是否已成功登录。
      _userId: 存储用户的 openid。
      _userAccount: 缓存从云端获取的完整用户账户信息（包括 levelRecords）。
      _isNewUser: 标记本次登录是否是新用户。
      登录流程 (login):
      包含了状态检查（是否已登录、是否正在登录、是否微信平台）。
      调用 wxLogin 获取 code。
      调用 CloudService.authenticateUser 进行认证，获取 userId 和 isNewUser 状态。
      调用 fetchUserAccountData 从云端拉取用户的详细信息（主要是关卡记录）。
      更新内部状态并发出 LOGIN_SUCCESS 或 LOGIN_FAIL 事件。
      包含了错误处理。
      数据获取接口:
      isLoggedIn, getUserId, getUserAccount: 提供获取当前状态和数据的接口。
      getLevelRecord, getAllLevelRecords: 方便地从缓存的 _userAccount 中获取特定或全部关卡记录。
      保存结果 (saveLevelResult):
      检查登录状态。
      调用 CloudService.updateUserRecord 将结果上传到云端。
      重要: 在云端保存成功后，同步更新本地缓存的 _userAccount 信息（包括最佳时间和总完成数），这样 UI 可以立即反映最新数据，而不需要重新从服务器拉取。
      发出 USER_RECORDS_UPDATED 事件，通知其他模块（如 UIManager）数据已更新。
      微信 API 封装: wxLogin 方法将回调式的 wx.login 封装成了 Promise，使 async/await 语法更流畅。
      获取账户数据 (fetchUserAccountData): 封装了从云端获取用户数据的逻辑，优先考虑调用云函数获取整合后的数据，并处理了获取失败或用户不存在的情况（返回空账户对象）。
      获取微信用户信息 (tryFetchWxUserInfo) (可选): 演示了如何使用 wx.getUserProfile（推荐方式，需要按钮触发）来获取用户昵称和头像。获取后需要调用云服务将信息保存到用户账户中。此功能需要 UI 配合（例如，在排行榜或个人资料页添加一个授权按钮）。
      常量补充: 提示了需要在 Constants.ts 中添加新的事件名。
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ed1da8d4f3b167daec2a8901c9dbf8e9a9c5c81e.js.map