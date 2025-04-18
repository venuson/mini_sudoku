System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, warn, error, isValid, director, sys, Constants, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _crd, ccclass, property, AdManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
      warn = _cc.warn;
      error = _cc.error;
      isValid = _cc.isValid;
      director = _cc.director;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f43b1WTC95O9LpK7Ne8TX0s", "AdManager", undefined); // assets/scripts/managers/AdManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'log', 'warn', 'error', 'isValid', 'director', 'sys']);

      ({
        ccclass,
        property
      } = _decorator); // 微信广告 API 类型定义 (如果项目中没有全局引入 wx 类型)
      // 可以通过 npm install @types/weixin-app --save-dev 引入更完整的类型定义
      // 这里仅作示例，实际使用时建议配置好完整的微信小游戏类型支持

      _export("AdManager", AdManager = (_dec = ccclass('AdManager'), _dec2 = property({
        type: String,
        tooltip: "暂停时显示的 Banner 广告单元 ID"
      }), _dec3 = property({
        type: String,
        tooltip: "暂停时显示的插屏广告单元 ID (可选)"
      }), _dec(_class = (_class2 = (_class3 = class AdManager extends Component {
        constructor() {
          super(...arguments);

          // --- 广告单元 ID (需要在微信公众平台获取并替换) ---
          _initializerDefineProperty(this, "pauseBannerAdUnitId", _descriptor, this);

          // !! 替换成你的 Banner 广告 ID
          _initializerDefineProperty(this, "pauseInterstitialAdUnitId", _descriptor2, this);

          // !! 替换成你的插屏广告 ID
          // --- 内部状态 ---
          this._isInitialized = false;
          this._bannerAd = null;
          this._interstitialAd = null;
          this._isBannerLoadingOrVisible = false;
          this._isInterstitialLoading = false;
          this._isInterstitialReady = false;
        }

        static get instance() {
          if (!this._instance) {
            error("[AdManager] 实例在初始化之前或节点不存在时被请求。");
          }

          return this._instance;
        }

        // 插屏广告是否已加载完成
        // --- Lifecycle Callbacks ---
        onLoad() {
          console.log('[AdManager] onLoad');

          if (AdManager._instance && AdManager._instance !== this) {
            warn('[AdManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
          }

          AdManager._instance = this; // 设置为持久节点 (如果需要跨场景)

          if (this.node.parent) {
            director.addPersistRootNode(this.node);
            console.log('[AdManager] 节点已设为持久化。');
          } // 监听 UIManager 请求显示/隐藏广告的事件


          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.SHOW_AD, this.showPauseAd, this);
          director.on((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).EventName.HIDE_AD, this.hidePauseAd, this);
          this._isInitialized = true;
          console.log('[AdManager] 初始化完成。'); // 可以在这里预创建广告实例，但不加载
          // this.createBannerAd();
          // this.createInterstitialAd();
        }

        onDestroy() {
          console.log('[AdManager] onDestroy');

          if (AdManager._instance === this) {
            AdManager._instance = null;
          } // 销毁广告实例


          this.destroyBannerAd();
          this.destroyInterstitialAd(); // 移除事件监听

          director.targetOff(this);
        } // --- 广告实例管理 ---

        /**
         * 创建 Banner 广告实例。
         * @param adUnitId 广告单元 ID。
         * @param containerNode (可选) 用于定位 Banner 的 Cocos 节点，会尝试将 Banner 放在其下方。
         * @returns 返回创建的 Banner 广告实例，如果平台不支持或创建失败则返回 null。
         */


        createBannerAd(adUnitId, containerNode) {
          if (!sys.platform.toLowerCase().includes('wechat')) {
            warn('[AdManager] 非微信平台，无法创建 Banner 广告。');
            return null;
          }

          if (!adUnitId || adUnitId.startsWith('YOUR_')) {
            warn('[AdManager] 无效的 Banner 广告单元 ID:', adUnitId);
            return null;
          } // 销毁旧实例 (如果存在)


          this.destroyBannerAd();
          console.log('[AdManager] 创建 Banner 广告实例, Unit ID:', adUnitId);

          try {
            // --- 计算广告位置和宽度 ---
            // Banner 宽度通常建议与屏幕宽度一致或稍小
            // Banner 位置通常在屏幕底部
            var screenWidth = wx.getSystemInfoSync().screenWidth;
            var screenHeight = wx.getSystemInfoSync().screenHeight;
            var bannerWidth = Math.min(screenWidth, 320); // 微信建议宽度，可调整

            var bannerTop = screenHeight; // 初始放屏幕外或底部

            var bannerLeft = (screenWidth - bannerWidth) / 2; // 如果提供了容器节点，尝试获取其在屏幕上的位置和尺寸来定位 Banner

            if (isValid(containerNode)) {
              var uiTransform = containerNode.getComponent(_decorator.UITransform);

              if (uiTransform) {
                // 获取节点的世界坐标和尺寸
                var worldPos = uiTransform.convertToWorldSpaceAR(new Vec3(0, 0, 0));
                var nodeHeight = uiTransform.height * director.getScene().getScale().y; // 考虑场景缩放

                var nodeWidth = uiTransform.width * director.getScene().getScale().x; // Cocos 世界坐标系原点在左下角，微信屏幕坐标系原点在左上角
                // 转换 Y 坐标

                var screenY = screenHeight - worldPos.y; // 尝试将 Banner 放在容器节点下方

                bannerTop = screenY; // Banner 顶部与节点底部对齐

                bannerLeft = worldPos.x;
                bannerWidth = nodeWidth; // Banner 宽度与节点宽度一致

                console.log("[AdManager] \u5B9A\u4F4D Banner \u5230\u5BB9\u5668\u4E0B\u65B9: screenY=" + screenY + ", nodeHeight=" + nodeHeight);
              }
            }

            var bannerAd = wx.createBannerAd({
              adUnitId: adUnitId,
              adIntervals: 30,
              // 广告刷新间隔，单位秒，不低于 30
              style: {
                left: bannerLeft,
                top: bannerTop,
                // 先放在底部，加载成功后再调整
                width: bannerWidth // height: 50 // 高度通常由微信自动计算，不建议手动设置

              }
            });

            if (bannerAd) {
              // --- 监听广告事件 ---
              bannerAd.onLoad(() => {
                console.log('[AdManager] Banner 广告加载成功。');
                this._isBannerLoadingOrVisible = true; // 加载成功后可以显示广告 (如果需要立即显示)
                // bannerAd.show().catch(err => error('[AdManager] 显示 Banner 广告失败 (onLoad):', err));
              });
              bannerAd.onError(err => {
                error('[AdManager] Banner 广告加载或显示失败:', err);
                this._isBannerLoadingOrVisible = false; // 可以在这里尝试重新加载或销毁实例
                // this.destroyBannerAd();
              });
              bannerAd.onResize(res => {
                console.log("[AdManager] Banner \u5E7F\u544A\u5C3A\u5BF8\u8C03\u6574: width=" + res.width + ", height=" + res.height); // Banner 加载成功并获取到实际高度后，重新计算顶部位置，使其紧贴屏幕底部

                if (this._bannerAd) {
                  // 确保实例仍然存在
                  var newTop = screenHeight - res.height;
                  this._bannerAd.style.top = newTop;
                  console.log("[AdManager] Banner \u5E7F\u544A\u4F4D\u7F6E\u8C03\u6574\u5230\u5C4F\u5E55\u5E95\u90E8: top=" + newTop);
                }
              });
              this._bannerAd = bannerAd;
              return bannerAd;
            } else {
              error('[AdManager] wx.createBannerAd 返回 null。');
              return null;
            }
          } catch (e) {
            error('[AdManager] 创建 Banner 广告时发生异常:', e);
            return null;
          }
        }
        /**
         * 销毁当前的 Banner 广告实例。
         */


        destroyBannerAd() {
          if (this._bannerAd) {
            console.log('[AdManager] 销毁 Banner 广告实例。');

            this._bannerAd.destroy().catch(err => warn('[AdManager] 销毁 Banner 广告失败:', err));

            this._bannerAd = null;
            this._isBannerLoadingOrVisible = false;
          }
        }
        /**
         * 创建插屏广告实例。
         * @param adUnitId 广告单元 ID。
         * @returns 返回创建的插屏广告实例，如果平台不支持或创建失败则返回 null。
         */


        createInterstitialAd(adUnitId) {
          if (!sys.platform.toLowerCase().includes('wechat')) {
            warn('[AdManager] 非微信平台，无法创建插屏广告。');
            return null;
          }

          if (!adUnitId || adUnitId.startsWith('YOUR_')) {
            warn('[AdManager] 无效的插屏广告单元 ID:', adUnitId);
            return null;
          } // 销毁旧实例


          this.destroyInterstitialAd();
          console.log('[AdManager] 创建插屏广告实例, Unit ID:', adUnitId);

          try {
            var interstitialAd = wx.createInterstitialAd({
              adUnitId: adUnitId
            });

            if (interstitialAd) {
              // --- 监听广告事件 ---
              interstitialAd.onLoad(() => {
                console.log('[AdManager] 插屏广告加载成功。');
                this._isInterstitialReady = true;
                this._isInterstitialLoading = false; // 加载成功后，可以尝试显示 (如果是在请求显示时加载的)
                // this.showInterstitialAdInstance();
              });
              interstitialAd.onError(err => {
                error('[AdManager] 插屏广告加载或显示失败:', err);
                this._isInterstitialReady = false;
                this._isInterstitialLoading = false; // 可以在这里尝试重新加载
              });
              interstitialAd.onClose(() => {
                console.log('[AdManager] 插屏广告已关闭。');
                this._isInterstitialReady = false; // 关闭后需要重新加载才能再次显示
                // 可以在这里预加载下一次的广告
                // this.loadInterstitialAd();
              });
              this._interstitialAd = interstitialAd;
              return interstitialAd;
            } else {
              error('[AdManager] wx.createInterstitialAd 返回 null。');
              return null;
            }
          } catch (e) {
            error('[AdManager] 创建插屏广告时发生异常:', e);
            return null;
          }
        }
        /**
        * 销毁当前的插屏广告实例。
        */


        destroyInterstitialAd() {
          if (this._interstitialAd) {
            console.log('[AdManager] 销毁插屏广告实例。');

            this._interstitialAd.destroy().catch(err => warn('[AdManager] 销毁插屏广告失败:', err));

            this._interstitialAd = null;
            this._isInterstitialReady = false;
            this._isInterstitialLoading = false;
          }
        } // --- 广告显示与隐藏 ---

        /**
         * 显示暂停时应该展示的广告 (优先尝试插屏，失败则尝试 Banner)。
         * 由 UIManager 的 showAdOverlay 事件触发。
         * @param containerNode (可选) 用于 Banner 定位的容器节点。
         */


        showPauseAd(containerNode) {
          if (!this._isInitialized) {
            warn('[AdManager] showPauseAd 在初始化之前被调用。');
            return;
          }

          console.log('[AdManager] 请求显示暂停广告...'); // --- 优先尝试显示插屏广告 ---

          if (this.pauseInterstitialAdUnitId && !this.pauseInterstitialAdUnitId.startsWith('YOUR_')) {
            if (this._isInterstitialReady) {
              console.log('[AdManager] 插屏广告已就绪，尝试显示...');
              this.showInterstitialAdInstance();
              return; // 显示了插屏，不再显示 Banner
            } else if (!this._isInterstitialLoading) {
              console.log('[AdManager] 插屏广告未就绪，开始加载...');
              this.loadInterstitialAd(); // 加载插屏，加载成功后会自动尝试显示 (如果逻辑如此设计)
              // 此时可以选择是否 fallback 到 Banner，或者等待插屏加载
              // Fallback to Banner for now:
              // console.log('[AdManager] 插屏加载中，暂时显示 Banner 作为后备。');
              // this.showBannerAd(containerNode);

              return; // 正在加载插屏，暂时不显示 Banner (避免同时显示)
            } else {
              console.log('[AdManager] 插屏广告正在加载中...'); // 同样，可以选择是否 fallback 到 Banner

              return; // 等待加载完成
            }
          } else {
            console.log('[AdManager] 未配置插屏广告或 ID 无效，尝试显示 Banner。');
          } // --- 如果不显示插屏，则显示 Banner ---


          this.showBannerAd(containerNode);
        }
        /**
         * 隐藏暂停时显示的广告 (Banner 或 插屏关闭回调处理)。
         * 由 UIManager 的 hideAdOverlay 事件触发。
         */


        hidePauseAd() {
          if (!this._isInitialized) {
            warn('[AdManager] hidePauseAd 在初始化之前被调用。');
            return;
          }

          console.log('[AdManager] 请求隐藏暂停广告...'); // 隐藏 Banner

          this.hideBannerAd(); // 插屏广告通常由用户手动关闭，我们主要在 onClose 回调中处理状态。
          // 这里不需要主动关闭插屏。
        }
        /**
         * 加载并显示 Banner 广告。
         * @param containerNode (可选) 用于定位的容器节点。
         */


        showBannerAd(containerNode) {
          if (this._isBannerLoadingOrVisible) {
            console.log('[AdManager] Banner 广告已在加载或显示中。'); // 如果实例存在且加载完成，确保它可见

            if (this._bannerAd && !this._isBannerLoadingOrVisible) {
              // 检查逻辑似乎有点问题，应该是检查是否已加载
              this._bannerAd.show().catch(err => error('[AdManager] 重新显示 Banner 广告失败:', err));
            }

            return;
          }

          if (!this._bannerAd) {
            this.createBannerAd(this.pauseBannerAdUnitId, containerNode);
          }

          if (this._bannerAd) {
            console.log('[AdManager] 显示 Banner 广告...');
            this._isBannerLoadingOrVisible = true; // 标记为尝试显示

            this._bannerAd.show().then(() => {
              console.log('[AdManager] Banner 广告显示成功 (show promise resolved).'); // this._isBannerLoadingOrVisible = true; // onLoad 中已设置
            }).catch(err => {
              error('[AdManager] 显示 Banner 广告失败 (show promise rejected):', err);
              this._isBannerLoadingOrVisible = false; // 失败后可以销毁实例，下次重新创建
              // this.destroyBannerAd();
            });
          } else {
            warn('[AdManager] Banner 广告实例无效，无法显示。');
          }
        }
        /**
         * 隐藏 Banner 广告。
         */


        hideBannerAd() {
          if (this._bannerAd && this._isBannerLoadingOrVisible) {
            // 只有在加载或可见时才隐藏
            console.log('[AdManager] 隐藏 Banner 广告...');

            this._bannerAd.hide().then(() => {
              console.log('[AdManager] Banner 广告隐藏成功。');
              this._isBannerLoadingOrVisible = false;
            }).catch(err => {
              warn('[AdManager] 隐藏 Banner 广告失败:', err); // 即使隐藏失败，也标记为不再显示

              this._isBannerLoadingOrVisible = false;
            });
          } else {// console.log('[AdManager] Banner 广告未在加载或显示，无需隐藏。');
          }
        }
        /**
         * 加载插屏广告。
         */


        loadInterstitialAd() {
          if (this._isInterstitialLoading || this._isInterstitialReady) {
            console.log('[AdManager] 插屏广告已加载或正在加载中。');
            return;
          }

          if (!this._interstitialAd) {
            this.createInterstitialAd(this.pauseInterstitialAdUnitId);
          }

          if (this._interstitialAd) {
            console.log('[AdManager] 开始加载插屏广告...');
            this._isInterstitialLoading = true;

            this._interstitialAd.load().catch(err => {
              error('[AdManager] 调用插屏广告 load 方法失败:', err);
              this._isInterstitialLoading = false;
            });
          } else {
            warn('[AdManager] 插屏广告实例无效，无法加载。');
          }
        }
        /**
         * 显示已加载的插屏广告实例。
         */


        showInterstitialAdInstance() {
          if (this._interstitialAd && this._isInterstitialReady) {
            console.log('[AdManager] 显示插屏广告...');

            this._interstitialAd.show().then(() => {
              console.log('[AdManager] 插屏广告显示成功。'); // 显示成功后，状态会在 onClose 时变为 not ready
            }).catch(err => {
              error('[AdManager] 显示插屏广告失败:', err); // 显示失败，可能需要重新加载

              this._isInterstitialReady = false; // 可以尝试重新加载
              // this.loadInterstitialAd();
            });
          } else {
            warn('[AdManager] 插屏广告未就绪或实例无效，无法显示。'); // 如果是因为未就绪，可以尝试加载

            if (!this._isInterstitialReady && !this._isInterstitialLoading) {
              this.loadInterstitialAd();
            }
          }
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pauseBannerAdUnitId", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "YOUR_BANNER_AD_UNIT_ID";
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pauseInterstitialAdUnitId", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return "YOUR_INTERSTITIAL_AD_UNIT_ID";
        }
      })), _class2)) || _class)); // --- 在 Constants.ts 中补充事件名 ---

      /*
      // assets/scripts/utils/Constants.ts
      export const Constants = {
          // ...
          EventName: {
              // ...
              SHOW_AD: 'event_show_ad',                   // 请求显示广告 (可带参数指定类型或位置?)
              HIDE_AD: 'event_hide_ad',                   // 请求隐藏广告
              // ...
          }
          // ...
      };
      */

      /*
      平台检查: 在创建广告实例前，使用 sys.platform 检查是否在微信平台运行。
      广告单元 ID: 使用 @property 暴露了 pauseBannerAdUnitId 和 pauseInterstitialAdUnitId，务必在编辑器中或代码中替换为你在微信公众平台申请到的真实 ID。
      实例管理:
      createBannerAd, destroyBannerAd, createInterstitialAd, destroyInterstitialAd: 分别负责创建和销毁两种广告类型的实例。创建时会先销毁旧实例。
      包含了对微信 API 调用的 try...catch 保护。
      事件监听: 在创建广告实例时，为其绑定了 onLoad, onError, onResize (Banner), onClose (Interstitial) 等关键事件的回调函数，用于更新广告状态和处理异常。
      状态管理: 使用内部变量 (_isBannerLoadingOrVisible, _isInterstitialLoading, _isInterstitialReady) 来跟踪广告的加载和显示状态。
      显示逻辑 (showPauseAd):
      这是核心的广告显示入口，由 UIManager 通过事件触发。
      优先尝试插屏广告: 如果配置了插屏广告 ID，会先检查插屏广告是否已加载就绪 (_isInterstitialReady)。如果就绪则直接显示。如果未就绪且未在加载中，则开始加载 (loadInterstitialAd)。
      后备 Banner 广告: 如果没有配置插屏，或者插屏正在加载中（根据设计决定是否等待），则会调用 showBannerAd 来显示 Banner 广告。
      隐藏逻辑 (hidePauseAd): 主要负责调用 hideBannerAd。插屏广告的关闭由用户操作触发，我们通过 onClose 回调来处理其状态。
      Banner 定位: createBannerAd 中包含了根据屏幕尺寸和可选的 containerNode 来计算 Banner 位置和宽度的逻辑，并利用 onResize 回调在 Banner 加载后将其精确定位到屏幕底部。
      插屏加载与显示: 插屏广告需要先调用 load() 加载，加载成功后 (onLoad 回调触发) 才能调用 show() 显示。showInterstitialAdInstance 封装了显示逻辑。
      事件驱动: 通过监听 Constants.EventName.SHOW_AD 和 Constants.EventName.HIDE_AD 事件来响应 UIManager 的请求，实现了模块解耦。
      常量补充: 提示了需要在 Constants.ts 中添加广告相关的事件名。
      请仔细检查 AdManager.ts 的代码，特别是广告单元 ID 是否已替换，以及广告显示/隐藏的逻辑是否符合你的预期（例如，插屏加载时是否要显示 Banner 作为后备）*/


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4a63c2fd2c248e30cb9c7e4d174869f4695ab12b.js.map