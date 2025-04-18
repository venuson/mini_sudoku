System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, log, warn, error, createEmptyUserAccount, generateLevelRecordKey, CloudService, _crd;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfDifficultyType(extras) {
    _reporterNs.report("DifficultyType", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUserAccount(extras) {
    _reporterNs.report("UserAccount", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelRecord(extras) {
    _reporterNs.report("LevelRecord", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankingEntry(extras) {
    _reporterNs.report("RankingEntry", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcreateEmptyUserAccount(extras) {
    _reporterNs.report("createEmptyUserAccount", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgenerateLevelRecordKey(extras) {
    _reporterNs.report("generateLevelRecordKey", "../data/UserData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfLevelData(extras) {
    _reporterNs.report("LevelData", "../data/GameData", _context.meta, extras);
  }

  _export("CloudService", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      log = _cc.log;
      warn = _cc.warn;
      error = _cc.error;
    }, function (_unresolved_2) {
      createEmptyUserAccount = _unresolved_2.createEmptyUserAccount;
      generateLevelRecordKey = _unresolved_2.generateLevelRecordKey;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5537cq1lTlMN6DAWCBdIkCC", "CloudService", undefined);
      /*
      开通微信云开发: 你需要在微信开发者工具中开通云开发，并创建一个云环境。获取到云环境 ID。
      创建云函数: 你需要在云开发控制台或微信开发者工具中创建 SDD 中提到的云函数，例如：
      authenticateUser: 处理用户登录认证，换取 openid。
      updateUserRecord: 更新用户的关卡记录和最佳成绩。
      fetchUserRecords: 获取指定用户的所有关卡记录。
      fetchGlobalRanking: 获取全局排行榜数据。
      (可选) fetchLevelData: 如果数独题目存储在云端，则需要此函数获取。
      创建数据库集合: 在云数据库中创建需要的集合，例如：
      users: 存储 UserAccount 数据。
      (可能需要) levels: 如果题目存储在云端。
      为集合设置合适的索引（例如 users 集合的 userId 字段）和权限规则（例如，用户只能读写自己的记录，排行榜函数可以读取所有用户的必要信息）。
      配置环境 ID: 在小游戏项目的 app.js (或等效的入口文件) 中初始化云开发 SDK，并指定你的云环境 ID。
      */
      // app.js (或其他入口文件)

      /*
      App({
        onLaunch() {
          if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
          } else {
            wx.cloud.init({
              // env 参数说明：
              //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
              //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
              //   如不填则使用默认环境（第一个创建的环境）
              env: 'YOUR_CLOUD_ENV_ID', // !! 替换成你的云环境 ID
              traceUser: true, // 是否要捕捉每个用户的访问记录。设置为 true 不会增加额外的费用。
            });
            console.log('微信云开发已初始化, Env ID:', 'YOUR_CLOUD_ENV_ID');
          }
        },
        // ... 其他 App 配置
      });
      */


      __checkObsolete__(['log', 'warn', 'error']);

      // 如果关卡数据在云端
      // 微信云开发 API 类型定义 (简化版)

      /**
       * @description 云服务接口模块
       * 封装与微信云开发 (Cloud Base) 的交互逻辑，包括调用云函数和操作数据库。
       * 为 AccountManager 等提供统一的异步接口。
       */
      _export("CloudService", CloudService = class CloudService {
        // 模拟模式开关

        /**
             * 初始化模拟数据 (只执行一次)。
             * @private
             */
        static initializeSimulatedData() {
          if (this.isSimulatedDataInitialized) return;
          log('[CloudService (Sim)] 初始化模拟数据...');
          this.simulatedUserDatabase.clear(); // 创建一个默认的模拟用户

          var defaultUser = (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
            error: Error()
          }), createEmptyUserAccount) : createEmptyUserAccount)(this.simulatedUserId); // (可选) 添加一些模拟数据用于测试

          defaultUser.nickname = "模拟玩家";
          defaultUser.avatarUrl = ""; // 本地模拟通常不处理头像 URL
          // 添加一些模拟记录
          // const key1 = generateLevelRecordKey(Constants.Difficulty.ENTRY, 1);
          // defaultUser.levelRecords[key1] = { difficulty: Constants.Difficulty.ENTRY, levelIndex: 1, bestTimeSeconds: 120, firstCompletionTimestamp: Date.now() - 86400000 };
          // const key2 = generateLevelRecordKey(Constants.Difficulty.ENTRY, 2);
          // defaultUser.levelRecords[key2] = { difficulty: Constants.Difficulty.ENTRY, levelIndex: 2, bestTimeSeconds: 155, firstCompletionTimestamp: Date.now() };
          // defaultUser.totalLevelsCompleted = 2;

          this.simulatedUserDatabase.set(this.simulatedUserId, defaultUser);
          this.isSimulatedDataInitialized = true;
          log('[CloudService (Sim)] 模拟数据初始化完成。用户:', defaultUser);
        }
        /**
         * 调用云函数。
         * @param name 云函数名称。
         * @param data 传递给云函数的参数。
         * @returns 返回云函数执行结果 (result 字段)。
         * @throws 如果调用失败或云函数返回错误，则抛出错误。
         */


        static callCloudFunction(name, data) {
          return _asyncToGenerator(function* () {
            if (data === void 0) {
              data = {};
            }

            console.log("[CloudService] \u8C03\u7528\u4E91\u51FD\u6570: " + name + ", \u53C2\u6570:", data);

            try {
              var res = yield wx.cloud.callFunction({
                name: name,
                data: data
              });
              console.log("[CloudService] \u4E91\u51FD\u6570 " + name + " \u8FD4\u56DE:", res); // 检查微信调用本身的错误信息

              if (res.errMsg !== 'cloud.callFunction:ok') {
                throw new Error("\u8C03\u7528\u4E91\u51FD\u6570 " + name + " \u5931\u8D25: " + res.errMsg);
              } // 检查云函数内部是否返回了错误状态 (需要与云函数约定)


              if (res.result && res.result.success === false) {
                throw new Error("\u4E91\u51FD\u6570 " + name + " \u6267\u884C\u5931\u8D25: " + (res.result.message || '未知错误'));
              }

              if (res.result && res.result.code && res.result.code !== 0 && res.result.code !== 200) {
                throw new Error("\u4E91\u51FD\u6570 " + name + " \u8FD4\u56DE\u9519\u8BEF\u7801 " + res.result.code + ": " + (res.result.message || '未知错误'));
              } // 返回云函数的实际结果


              return res.result;
            } catch (err) {
              error("[CloudService] \u8C03\u7528\u4E91\u51FD\u6570 " + name + " \u65F6\u53D1\u751F\u5F02\u5E38:", err);
              throw err; // 将错误继续向上抛出，由调用者处理
            }
          })();
        } // --- 用户认证 ---

        /**
         * 调用云函数进行用户认证。
         * @param code wx.login 获取到的临时登录凭证。
         * @returns 返回包含 userId (openid) 和可能的其他用户信息的结果。
         *          需要与 authenticateUser 云函数的返回值约定。
         *          例如: { success: true, userId: string, isNewUser: boolean }
         */


        static authenticateUser(code) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this.isSimulatedMode) {
              _this.initializeSimulatedData(); // 确保模拟数据已初始化


              log("[CloudService (Sim)] \u6A21\u62DF\u7528\u6237\u8BA4\u8BC1 (code: " + code + ")");
              var isNewUser = false;

              if (!_this.simulatedUserDatabase.has(_this.simulatedUserId)) {
                isNewUser = true;
                var newUser = (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                  error: Error()
                }), createEmptyUserAccount) : createEmptyUserAccount)(_this.simulatedUserId);
                newUser.nickname = "模拟新玩家";

                _this.simulatedUserDatabase.set(_this.simulatedUserId, newUser);

                log('[CloudService (Sim)] 模拟新用户创建:', newUser);
              }

              log("[CloudService (Sim)] \u6A21\u62DF\u8BA4\u8BC1\u6210\u529F: userId=" + _this.simulatedUserId + ", isNewUser=" + isNewUser); // 使用 Promise.resolve 保持异步接口

              return Promise.resolve({
                userId: _this.simulatedUserId,
                isNewUser: isNewUser
              });
            } else {
              try {
                var result = yield _this.callCloudFunction(_this.CLOUD_FUNC_AUTH, {
                  code: code
                }); // 假设云函数直接返回 { userId: '...', isNewUser: true/false }

                if (!result || !result.userId) {
                  throw new Error('认证云函数未返回有效的 userId。');
                }

                console.log("[CloudService] \u7528\u6237\u8BA4\u8BC1\u6210\u529F: userId=" + result.userId + ", isNewUser=" + result.isNewUser);
                return result;
              } catch (err) {
                error('[CloudService] 用户认证失败:', err);
                throw err; // 重新抛出错误
              }
            }
          })();
        } // --- 用户记录读写 ---

        /**
         * 调用云函数更新用户的关卡记录和最佳成绩。
         * 云函数内部会处理比较时间、更新记录、更新总完成数等逻辑。
         * @param userId 用户 ID (openid)。
         * @param difficulty 难度。
         * @param levelIndex 关卡序号。
         * @param timeSeconds 完成用时 (秒)。
         * @param completionTimestamp 完成时间戳。
         * @returns 返回操作结果，例如 { success: true }。需要与 updateUserRecord 云函数约定。
         */


        static updateUserRecord(userId, difficulty, levelIndex, timeSeconds, completionTimestamp) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (_this2.isSimulatedMode) {
              log("[CloudService (Sim)] \u6A21\u62DF\u66F4\u65B0\u7528\u6237\u8BB0\u5F55: User=" + userId + ", Level=" + difficulty + "-" + levelIndex + ", Time=" + timeSeconds + "s");

              var userAccount = _this2.simulatedUserDatabase.get(_this2.simulatedUserId); // 操作固定模拟用户的数据


              if (!userAccount) {
                error("[CloudService (Sim)] \u6A21\u62DF\u7528\u6237 " + _this2.simulatedUserId + " \u4E0D\u5B58\u5728\uFF0C\u65E0\u6CD5\u66F4\u65B0\u8BB0\u5F55\u3002");
                return Promise.resolve({
                  success: false
                });
              }

              var _key = (_crd && generateLevelRecordKey === void 0 ? (_reportPossibleCrUseOfgenerateLevelRecordKey({
                error: Error()
              }), generateLevelRecordKey) : generateLevelRecordKey)(difficulty, levelIndex);

              var existingRecord = userAccount.levelRecords[_key];
              var isNewCompletion = false;

              if (existingRecord) {
                // 记录已存在，比较时间
                if (timeSeconds < existingRecord.bestTimeSeconds) {
                  log("[CloudService (Sim)] \u66F4\u65B0\u6700\u4F73\u65F6\u95F4: " + timeSeconds + "s (\u539F: " + existingRecord.bestTimeSeconds + "s)");
                  existingRecord.bestTimeSeconds = timeSeconds; // 可以选择是否更新完成时间戳
                  // existingRecord.lastCompletionTimestamp = completionTimestamp;
                } else {
                  log("[CloudService (Sim)] \u672C\u6B21\u7528\u65F6 " + timeSeconds + "s \u672A\u8D85\u8FC7\u6700\u4F73\u65F6\u95F4 " + existingRecord.bestTimeSeconds + "s");
                }
              } else {
                // 新记录
                log("[CloudService (Sim)] \u6DFB\u52A0\u65B0\u8BB0\u5F55: " + _key);
                userAccount.levelRecords[_key] = {
                  difficulty: difficulty,
                  levelIndex: levelIndex,
                  bestTimeSeconds: timeSeconds,
                  firstCompletionTimestamp: completionTimestamp
                };
                userAccount.totalLevelsCompleted = (userAccount.totalLevelsCompleted || 0) + 1;
                isNewCompletion = true;
                log("[CloudService (Sim)] \u7528\u6237\u603B\u5B8C\u6210\u6570\u66F4\u65B0\u4E3A: " + userAccount.totalLevelsCompleted);
              } // 可以在这里打印更新后的用户数据以供调试
              // log('[CloudService (Sim)] 更新后的模拟用户数据:', userAccount);


              return Promise.resolve({
                success: true
              });
            } else {
              try {
                var result = yield _this2.callCloudFunction(_this2.CLOUD_FUNC_UPDATE_RECORD, {
                  // userId 会通过云函数上下文自动获取，通常不需要显式传递
                  // userId: userId,
                  difficulty: difficulty,
                  levelIndex: levelIndex,
                  timeSeconds: timeSeconds,
                  completionTimestamp: completionTimestamp
                });

                if (!result || result.success !== true) {
                  throw new Error('更新用户记录云函数执行失败或未返回成功状态。');
                }

                console.log("[CloudService] \u7528\u6237\u8BB0\u5F55\u66F4\u65B0\u6210\u529F: " + difficulty + "-" + levelIndex + ", time=" + timeSeconds + "s");
                return result;
              } catch (err) {
                error('[CloudService] 更新用户记录失败:', err);
                throw err;
              }
            }
          })();
        }
        /**
         * 调用云函数获取指定用户的所有关卡记录。
         * @param userId 用户 ID (openid)。
         * @returns 返回包含 LevelRecord 对象的 Map 或数组。需要与 fetchUserRecords 云函数约定。
         *          例如: { success: true, records: { [key: string]: LevelRecord } }
         */


        static fetchUserRecords(userId) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            if (_this3.isSimulatedMode) {
              _this3.initializeSimulatedData();

              log("[CloudService (Sim)] \u6A21\u62DF\u83B7\u53D6\u7528\u6237\u8BB0\u5F55: User=" + userId);

              var userAccount = _this3.simulatedUserDatabase.get(_this3.simulatedUserId); // 获取固定模拟用户的数据


              if (userAccount && userAccount.levelRecords) {
                log("[CloudService (Sim)] \u8FD4\u56DE " + Object.keys(userAccount.levelRecords).length + " \u6761\u6A21\u62DF\u8BB0\u5F55\u3002"); // 返回记录数据的副本，防止外部直接修改模拟数据库

                var recordsCopy = JSON.parse(JSON.stringify(userAccount.levelRecords));
                return Promise.resolve({
                  records: recordsCopy
                });
              } else {
                console.log('[CloudService (Sim)] 模拟用户不存在或无记录，返回空记录。');
                return Promise.resolve({
                  records: {}
                });
              }
            } else {
              try {
                // 通常获取自己的记录不需要传 userId，云函数从上下文获取
                var result = yield _this3.callCloudFunction(_this3.CLOUD_FUNC_FETCH_RECORDS // { userId: userId } // 如果需要获取其他用户的记录（通常不这么做）
                );

                if (!result || typeof result.records !== 'object') {
                  // 如果记录为空，云函数应该返回 { records: {} } 而不是 null 或 undefined
                  warn('[CloudService] 获取用户记录云函数未返回有效的 records 对象，可能用户无记录。');
                  return {}; // 返回空对象
                }

                console.log("[CloudService] \u83B7\u53D6\u7528\u6237\u8BB0\u5F55\u6210\u529F\uFF0C\u5171 " + Object.keys(result.records).length + " \u6761\u3002");
                return result.records;
              } catch (err) {
                error('[CloudService] 获取用户记录失败:', err);
                throw err;
              }
            }
          })();
        } // --- 排行榜 ---

        /**
         * 调用云函数获取全局排行榜数据。
         * @param limit 获取排行的数量，默认为 100。
         * @returns 返回包含 RankingEntry 数组和当前用户排名信息的结果。
         *          需要与 fetchGlobalRanking 云函数约定。
         *          例如: { success: true, ranks: RankingEntry[], myRank?: RankingEntry }
         */


        static fetchGlobalRanking(limit) {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            if (limit === void 0) {
              limit = 100;
            }

            if (_this4.isSimulatedMode) {
              _this4.initializeSimulatedData();

              console.log("[CloudService (Sim)] \u6A21\u62DF\u83B7\u53D6\u6392\u884C\u699C\u6570\u636E (limit: " + limit + ")"); // 1. 将 Map 转换为数组并排序

              var allUsers = Array.from(_this4.simulatedUserDatabase.values());
              allUsers.sort((a, b) => {
                // 主要按总完成数降序
                var scoreDiff = (b.totalLevelsCompleted || 0) - (a.totalLevelsCompleted || 0);
                if (scoreDiff !== 0) return scoreDiff; // (可选) 次要排序条件，例如按平均时间升序或按最后登录时间降序
                // const avgTimeA = calculateAverageTime(a.levelRecords); // 需要实现计算平均时间的逻辑
                // const avgTimeB = calculateAverageTime(b.levelRecords);
                // return avgTimeA - avgTimeB;

                return 0; // 暂不添加次要排序
              }); // 2. 生成排名列表 (RankingEntry)

              var ranks = [];
              var myRankData = undefined;
              var currentUserRank = -1;

              for (var i = 0; i < allUsers.length; i++) {
                var user = allUsers[i];
                var rank = i + 1; // 创建 RankingEntry

                var rankEntry = {
                  rank: rank,
                  userId: user.userId,
                  nickname: user.nickname || "\u73A9\u5BB6" + user.userId.substring(user.userId.length - 4),
                  // 默认昵称
                  avatarUrl: user.avatarUrl || "",
                  // 默认空头像
                  score: user.totalLevelsCompleted || 0
                }; // 添加到列表 (限制数量)

                if (rank <= limit) {
                  ranks.push(rankEntry);
                } // 记录当前模拟用户的排名


                if (user.userId === _this4.simulatedUserId) {
                  currentUserRank = rank;
                  myRankData = _extends({}, rankEntry); // 复制一份作为 myRank
                } // 如果已经找到了当前用户且排名超出了 limit，可以提前结束循环（优化）
                // if (currentUserRank !== -1 && rank > limit) {
                //     break;
                // }

              }

              console.log("[CloudService (Sim)] \u751F\u6210\u6392\u884C\u699C " + ranks.length + " \u6761\u3002\u6211\u7684\u6392\u540D: " + (currentUserRank !== -1 ? currentUserRank : '未上榜'));
              return Promise.resolve({
                ranks: ranks,
                myRank: myRankData
              });
            } else {
              try {
                var result = yield _this4.callCloudFunction(_this4.CLOUD_FUNC_FETCH_RANKING, {
                  limit: limit
                });

                if (!result || !Array.isArray(result.ranks)) {
                  throw new Error('获取排行榜云函数未返回有效的 ranks 数组。');
                }

                console.log("[CloudService] \u83B7\u53D6\u6392\u884C\u699C\u6210\u529F\uFF0C\u5171 " + result.ranks.length + " \u6761\u3002\u6211\u7684\u6392\u540D:", result.myRank);
                return result;
              } catch (err) {
                error('[CloudService] 获取排行榜失败:', err);
                throw err;
              }
            }
          })();
        } // --- 关卡数据 (如果存储在云端) ---

        /**
         * (可选) 调用云函数或直接查询数据库获取指定关卡的题目数据。
         * @param difficulty 难度。
         * @param levelIndex 关卡序号。
         * @returns 返回 LevelData 对象。
         */


        static fetchLevelData(difficulty, levelIndex) {
          return _asyncToGenerator(function* () {
            console.log("[CloudService (Sim)] \u6A21\u62DF\u83B7\u53D6\u5173\u5361\u6570\u636E: " + difficulty + "-" + levelIndex + " (\u8FD4\u56DE null\uFF0C\u7531\u672C\u5730\u751F\u6210)");
            return Promise.resolve(null); // 假设关卡总是本地生成
            // 如果使用云函数:

            /*
            try {
                const result = await this.callCloudFunction<LevelData>(
                    this.CLOUD_FUNC_FETCH_LEVEL,
                    { difficulty: difficulty, levelIndex: levelIndex }
                );
                if (!result || !result.initialBoard) { // 简单校验
                     throw new Error('获取关卡数据云函数未返回有效数据。');
                }
                console.log(`[CloudService] 获取关卡数据成功: ${difficulty}-${levelIndex}`);
                return result;
            } catch (err) {
                error(`[CloudService] 获取关卡数据失败 (${difficulty}-${levelIndex}):`, err);
                throw err;
            }
            */
            // 如果直接查询数据库 (假设权限允许):

            /*
            try {
                const db = wx.cloud.database();
                const res: CloudDBQueryResult = await db.collection(this.DB_COLLECTION_LEVELS)
                    .where({
                        difficulty: difficulty,
                        levelIndex: levelIndex
                    })
                    .limit(1)
                    .get();
                 if (res.data && res.data.length > 0) {
                    console.log(`[CloudService] 从数据库获取关卡数据成功: ${difficulty}-${levelIndex}`);
                    // 注意：数据库返回的数据可能包含 _id, _openid 等字段，需要清理或转换
                    return res.data[0] as LevelData; // 需要确保类型匹配
                } else {
                     warn(`[CloudService] 在数据库中未找到关卡数据: ${difficulty}-${levelIndex}`);
                     return null;
                }
            } catch (err) {
                 error(`[CloudService] 从数据库获取关卡数据失败 (${difficulty}-${levelIndex}):`, err);
                 throw err;
            }
            */
          })();
        } // --- (可选) 直接操作数据库的示例 (如果云函数逻辑简单) ---

        /**
         * (示例) 直接查询数据库获取用户信息。
         * 注意：需要配置好数据库权限，通常只允许用户读取自己的信息。
         * @param userId 用户 ID。
         * @returns 返回 UserAccount 对象，如果找不到则返回 null。
         */


        static fetchUserAccountFromDB(userId) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            if (_this5.isSimulatedMode) {
              _this5.initializeSimulatedData();

              console.log("[CloudService (Sim)] \u6A21\u62DF\u4ECE DB \u83B7\u53D6\u7528\u6237\u8D26\u6237: " + userId);

              var userAccount = _this5.simulatedUserDatabase.get(userId);

              if (userAccount) {
                // 返回副本
                return Promise.resolve(JSON.parse(JSON.stringify(userAccount)));
              } else {
                return Promise.resolve(null);
              }
            } else {
              try {
                var db = wx.cloud.database();
                var res = yield db.collection(_this5.DB_COLLECTION_USERS).doc(userId) // 直接用 openid 作为文档 ID
                .get();

                if (res.data) {
                  console.log("[CloudService] \u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u7528\u6237\u8D26\u6237\u6210\u529F: " + userId); // 数据库返回的数据可能与 UserAccount 接口不完全匹配，需要转换

                  return res.data; // 假设结构一致
                } else {
                  // 用户不存在或权限不足
                  warn("[CloudService] \u5728\u6570\u636E\u5E93\u4E2D\u672A\u627E\u5230\u7528\u6237\u8D26\u6237\u6216\u65E0\u6743\u9650: " + userId);
                  return null;
                }
              } catch (err) {
                // err.errCode === -502004 表示记录不存在
                if (err.errCode === -502004) {
                  warn("[CloudService] \u6570\u636E\u5E93\u8BB0\u5F55\u4E0D\u5B58\u5728: " + userId);
                  return null;
                }

                error("[CloudService] \u4ECE\u6570\u636E\u5E93\u83B7\u53D6\u7528\u6237\u8D26\u6237\u5931\u8D25 (" + userId + "):", err);
                throw err;
              }
            }
          })();
        }
        /**
        * (示例) 直接使用 upsert (更新或插入) 创建/更新用户信息。
        * 注意：权限配置！通常只允许用户更新自己的文档。
        * @param userData 要更新或创建的用户数据。
        * @returns 返回操作结果。
        */


        static upsertUserAccountToDB(userData) {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            if (_this6.isSimulatedMode) {
              _this6.initializeSimulatedData();

              var userId = userData.userId;
              console.log("[CloudService (Sim)] \u6A21\u62DF Upsert \u7528\u6237\u8D26\u6237\u5230 DB: " + userId);

              var dataToUpdate = _extends({}, userData); // delete dataToUpdate.userId; // userId 是 Map 的 key，不需要删除


              var created = false;
              var updated = false;

              if (_this6.simulatedUserDatabase.has(userId)) {
                // 更新现有用户
                var existingUser = _this6.simulatedUserDatabase.get(userId); // 合并数据 (简单覆盖)


                Object.assign(existingUser, dataToUpdate);
                updated = true;
                console.log("[CloudService (Sim)] \u6A21\u62DF\u66F4\u65B0\u7528\u6237: " + userId);
              } else {
                // 创建新用户
                var newUser = (_crd && createEmptyUserAccount === void 0 ? (_reportPossibleCrUseOfcreateEmptyUserAccount({
                  error: Error()
                }), createEmptyUserAccount) : createEmptyUserAccount)(userId);
                Object.assign(newUser, dataToUpdate);

                _this6.simulatedUserDatabase.set(userId, newUser);

                created = true;
                console.log("[CloudService (Sim)] \u6A21\u62DF\u521B\u5EFA\u7528\u6237: " + userId);
              }

              return Promise.resolve({
                success: true,
                created: created,
                updated: updated
              });
            } else {
              try {
                var db = wx.cloud.database();
                var _userId = userData.userId; // 从 userData 中移除 userId，因为它通常是文档 ID

                var _dataToUpdate = _extends({}, userData);

                delete _dataToUpdate.userId;
                var res = yield db.collection(_this6.DB_COLLECTION_USERS).doc(_userId).set({
                  // set 会覆盖整个文档，如果只想更新部分字段用 update
                  data: _dataToUpdate
                }); // 或者使用 update，如果只想更新特定字段，且需要处理记录不存在的情况

                /*
                const res = await db.collection(this.DB_COLLECTION_USERS).doc(userId).update({
                    data: dataToUpdate // 只包含要更新的字段
                });
                // update 在记录不存在时会报错，需要先查询或使用 upsert (云函数中更容易实现)
                */

                console.log("[CloudService] Upsert \u7528\u6237\u8D26\u6237\u5230\u6570\u636E\u5E93\u6210\u529F: " + _userId, res);
                return res;
              } catch (err) {
                error("[CloudService] Upsert \u7528\u6237\u8D26\u6237\u5230\u6570\u636E\u5E93\u5931\u8D25 (" + userData.userId + "):", err);
                throw err;
              }
            }
          })();
        }

      });
      /*
      静态类: CloudService 被设计为一个静态类，所有方法都是静态的，方便直接调用 CloudService.authenticateUser(...)，无需实例化。
      
      封装微信 API: 核心是封装了 wx.cloud.callFunction 和可能的 wx.cloud.database() 调用。
      
      callCloudFunction 辅助方法: 提供了一个通用的调用云函数的私有方法，包含了基本的日志记录、错误检查（微信 API 错误和云函数内部返回的错误状态）。它使用了泛型 <T> 来指定期望的返回类型。
      
      接口方法: 为 SDD 中定义的每个云服务交互点（认证、更新记录、获取记录、获取排行、获取关卡数据）提供了对应的异步 (async) 静态方法。
      
      参数与返回值: 每个方法的参数和返回值都尽量清晰地定义，并注释了需要与对应云函数约定的数据结构。例如，authenticateUser 返回 { userId: string; isNewUser: boolean }。
      
      错误处理: 每个接口方法都包含了 try...catch块，捕获调用云服务时可能发生的错误，记录错误日志，并将错误向上抛出，由调用者（如 AccountManager）处理用户反馈。
      
      云函数优先: 主要逻辑是通过调用云函数实现的。云函数可以更好地处理复杂的业务逻辑（如比较最佳时间、计算排名、处理数据库权限）和原子操作。
      
      直接操作数据库示例 (可选): 代码中也包含了直接使用 wx.cloud.database() 查询 (get) 和更新/插入 (set) 数据库的示例方法 (fetchUserAccountFromDB, upsertUserAccountToDB)。但是，直接在客户端操作数据库需要非常谨慎地配置数据库权限规则，以防安全问题。对于写操作（如更新记录），强烈建议通过云函数进行，云函数天然拥有更高的权限，并且可以进行更严格的数据校验。
      
      常量定义: 定义了云函数和数据库集合的名称常量，方便管理和修改。
      
      环境 ID 配置: 强调了需要在 app.js 中初始化云开发并配置环境 ID。
      
      请仔细检查 CloudService.ts 的代码，特别是云函数名称、数据库集合名称以及与云函数约定的数据结构。确保你已经在微信云开发环境中创建了对应的云函数和数据库集合，并配置好了权限*/


      // --- 云函数名称定义 ---
      CloudService.CLOUD_FUNC_AUTH = 'authenticateUser';
      CloudService.CLOUD_FUNC_UPDATE_RECORD = 'updateUserRecord';
      CloudService.CLOUD_FUNC_FETCH_RECORDS = 'fetchUserRecords';
      CloudService.CLOUD_FUNC_FETCH_RANKING = 'fetchGlobalRanking';
      CloudService.CLOUD_FUNC_FETCH_LEVEL = 'fetchLevelData';
      // 如果需要
      // --- 云数据库集合名称定义 ---
      CloudService.DB_COLLECTION_USERS = 'users';
      CloudService.DB_COLLECTION_LEVELS = 'levels';
      // 如果需要
      // --- 模拟数据存储 ---

      /** 模拟当前登录的用户 ID */
      CloudService.simulatedUserId = "local_user_001";

      /** 模拟的用户数据库 (Map: userId -> UserAccount) */
      CloudService.simulatedUserDatabase = new Map();

      /** 标记模拟数据是否已初始化 */
      CloudService.isSimulatedDataInitialized = false;
      CloudService.isSimulatedMode = true;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ade831ac7338d68b97426041f7f870bc069db896.js.map