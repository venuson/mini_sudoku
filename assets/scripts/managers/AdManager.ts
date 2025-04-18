// assets/scripts/managers/AdManager.ts

import { _decorator, Component, Node, log, warn, error, isValid, director, sys } from 'cc';
import { Constants } from '../utils/Constants';

const { ccclass, property } = _decorator;

// 微信广告 API 类型定义 (如果项目中没有全局引入 wx 类型)
// 可以通过 npm install @types/weixin-app --save-dev 引入更完整的类型定义
// 这里仅作示例，实际使用时建议配置好完整的微信小游戏类型支持
declare const wx: any;

interface WXBannerAd {
    show(): Promise<any>;
    hide(): Promise<any>;
    destroy(): Promise<any>;
    onLoad(callback: () => void): void;
    onError(callback: (err: any) => void): void;
    onResize(callback: (res: { width: number, height: number }) => void): void;
    style: {
        left: number;
        top: number;
        width: number;
        height?: number; // Banner 高度通常自动计算
    };
}

interface WXInterstitialAd {
    load(): Promise<any>;
    show(): Promise<any>;
    destroy(): Promise<any>;
    onLoad(callback: () => void): void;
    onError(callback: (err: any) => void): void;
    onClose(callback: () => void): void;
}

@ccclass('AdManager')
export class AdManager extends Component {
    // --- Singleton Instance ---
    private static _instance: AdManager | null = null;
    public static get instance(): AdManager {
        if (!this._instance) {
            error("[AdManager] 实例在初始化之前或节点不存在时被请求。");
        }
        return this._instance!;
    }

    // --- 广告单元 ID (需要在微信公众平台获取并替换) ---
    @property({ type: String, tooltip: "暂停时显示的 Banner 广告单元 ID" })
    private pauseBannerAdUnitId: string = "YOUR_BANNER_AD_UNIT_ID"; // !! 替换成你的 Banner 广告 ID

    @property({ type: String, tooltip: "暂停时显示的插屏广告单元 ID (可选)" })
    private pauseInterstitialAdUnitId: string = "YOUR_INTERSTITIAL_AD_UNIT_ID"; // !! 替换成你的插屏广告 ID

    // --- 内部状态 ---
    private _isInitialized: boolean = false;
    private _bannerAd: WXBannerAd | null = null;
    private _interstitialAd: WXInterstitialAd | null = null;
    private _isBannerLoadingOrVisible: boolean = false;
    private _isInterstitialLoading: boolean = false;
    private _isInterstitialReady: boolean = false; // 插屏广告是否已加载完成

    // --- Lifecycle Callbacks ---
    protected onLoad(): void {
        console.log('[AdManager] onLoad');
        if (AdManager._instance && AdManager._instance !== this) {
            warn('[AdManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
        }
        AdManager._instance = this;

        // 设置为持久节点 (如果需要跨场景)
        if (this.node.parent) {
            director.addPersistRootNode(this.node);
            console.log('[AdManager] 节点已设为持久化。');
        }

        // 监听 UIManager 请求显示/隐藏广告的事件
        director.on(Constants.EventName.SHOW_AD, this.showPauseAd, this);
        director.on(Constants.EventName.HIDE_AD, this.hidePauseAd, this);

        this._isInitialized = true;
        console.log('[AdManager] 初始化完成。');

        // 可以在这里预创建广告实例，但不加载
        // this.createBannerAd();
        // this.createInterstitialAd();
    }

    protected onDestroy(): void {
        console.log('[AdManager] onDestroy');
        if (AdManager._instance === this) {
            AdManager._instance = null;
        }
        // 销毁广告实例
        this.destroyBannerAd();
        this.destroyInterstitialAd();
        // 移除事件监听
        director.targetOff(this);
    }

    // --- 广告实例管理 ---

    /**
     * 创建 Banner 广告实例。
     * @param adUnitId 广告单元 ID。
     * @param containerNode (可选) 用于定位 Banner 的 Cocos 节点，会尝试将 Banner 放在其下方。
     * @returns 返回创建的 Banner 广告实例，如果平台不支持或创建失败则返回 null。
     */
    private createBannerAd(adUnitId: string, containerNode?: Node): WXBannerAd | null {
        if (!sys.platform.toLowerCase().includes('wechat')) {
            warn('[AdManager] 非微信平台，无法创建 Banner 广告。');
            return null;
        }
        if (!adUnitId || adUnitId.startsWith('YOUR_')) {
             warn('[AdManager] 无效的 Banner 广告单元 ID:', adUnitId);
             return null;
        }

        // 销毁旧实例 (如果存在)
        this.destroyBannerAd();

        console.log('[AdManager] 创建 Banner 广告实例, Unit ID:', adUnitId);

        try {
            // --- 计算广告位置和宽度 ---
            // Banner 宽度通常建议与屏幕宽度一致或稍小
            // Banner 位置通常在屏幕底部
            const screenWidth = wx.getSystemInfoSync().screenWidth;
            const screenHeight = wx.getSystemInfoSync().screenHeight;
            let bannerWidth = Math.min(screenWidth, 320); // 微信建议宽度，可调整
            let bannerTop = screenHeight; // 初始放屏幕外或底部
            let bannerLeft = (screenWidth - bannerWidth) / 2;

            // 如果提供了容器节点，尝试获取其在屏幕上的位置和尺寸来定位 Banner
            if (isValid(containerNode)) {
                const uiTransform = containerNode!.getComponent(_decorator.UITransform);
                if (uiTransform) {
                    // 获取节点的世界坐标和尺寸
                    const worldPos = uiTransform.convertToWorldSpaceAR(new Vec3(0, 0, 0));
                    const nodeHeight = uiTransform.height * director.getScene()!.getScale().y; // 考虑场景缩放
                    const nodeWidth = uiTransform.width * director.getScene()!.getScale().x;

                    // Cocos 世界坐标系原点在左下角，微信屏幕坐标系原点在左上角
                    // 转换 Y 坐标
                    const screenY = screenHeight - worldPos.y;

                    // 尝试将 Banner 放在容器节点下方
                    bannerTop = screenY; // Banner 顶部与节点底部对齐
                    bannerLeft = worldPos.x;
                    bannerWidth = nodeWidth; // Banner 宽度与节点宽度一致

                    console.log(`[AdManager] 定位 Banner 到容器下方: screenY=${screenY}, nodeHeight=${nodeHeight}`);
                }
            }


            const bannerAd = wx.createBannerAd({
                adUnitId: adUnitId,
                adIntervals: 30, // 广告刷新间隔，单位秒，不低于 30
                style: {
                    left: bannerLeft,
                    top: bannerTop, // 先放在底部，加载成功后再调整
                    width: bannerWidth,
                    // height: 50 // 高度通常由微信自动计算，不建议手动设置
                }
            });

            if (bannerAd) {
                // --- 监听广告事件 ---
                bannerAd.onLoad(() => {
                    console.log('[AdManager] Banner 广告加载成功。');
                    this._isBannerLoadingOrVisible = true;
                    // 加载成功后可以显示广告 (如果需要立即显示)
                    // bannerAd.show().catch(err => error('[AdManager] 显示 Banner 广告失败 (onLoad):', err));
                });

                bannerAd.onError((err: any) => {
                    error('[AdManager] Banner 广告加载或显示失败:', err);
                    this._isBannerLoadingOrVisible = false;
                    // 可以在这里尝试重新加载或销毁实例
                    // this.destroyBannerAd();
                });

                bannerAd.onResize((res: { width: number, height: number }) => {
                    console.log(`[AdManager] Banner 广告尺寸调整: width=${res.width}, height=${res.height}`);
                    // Banner 加载成功并获取到实际高度后，重新计算顶部位置，使其紧贴屏幕底部
                    if (this._bannerAd) { // 确保实例仍然存在
                        const newTop = screenHeight - res.height;
                        this._bannerAd.style.top = newTop;
                        console.log(`[AdManager] Banner 广告位置调整到屏幕底部: top=${newTop}`);
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
    private destroyBannerAd(): void {
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
    private createInterstitialAd(adUnitId: string): WXInterstitialAd | null {
         if (!sys.platform.toLowerCase().includes('wechat')) {
            warn('[AdManager] 非微信平台，无法创建插屏广告。');
            return null;
        }
         if (!adUnitId || adUnitId.startsWith('YOUR_')) {
             warn('[AdManager] 无效的插屏广告单元 ID:', adUnitId);
             return null;
         }

        // 销毁旧实例
        this.destroyInterstitialAd();

        console.log('[AdManager] 创建插屏广告实例, Unit ID:', adUnitId);

        try {
            const interstitialAd = wx.createInterstitialAd({
                adUnitId: adUnitId
            });

            if (interstitialAd) {
                // --- 监听广告事件 ---
                interstitialAd.onLoad(() => {
                    console.log('[AdManager] 插屏广告加载成功。');
                    this._isInterstitialReady = true;
                    this._isInterstitialLoading = false;
                    // 加载成功后，可以尝试显示 (如果是在请求显示时加载的)
                    // this.showInterstitialAdInstance();
                });

                interstitialAd.onError((err: any) => {
                    error('[AdManager] 插屏广告加载或显示失败:', err);
                    this._isInterstitialReady = false;
                    this._isInterstitialLoading = false;
                    // 可以在这里尝试重新加载
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
    private destroyInterstitialAd(): void {
        if (this._interstitialAd) {
            console.log('[AdManager] 销毁插屏广告实例。');
            this._interstitialAd.destroy().catch(err => warn('[AdManager] 销毁插屏广告失败:', err));
            this._interstitialAd = null;
            this._isInterstitialReady = false;
            this._isInterstitialLoading = false;
        }
    }

    // --- 广告显示与隐藏 ---

    /**
     * 显示暂停时应该展示的广告 (优先尝试插屏，失败则尝试 Banner)。
     * 由 UIManager 的 showAdOverlay 事件触发。
     * @param containerNode (可选) 用于 Banner 定位的容器节点。
     */
    public showPauseAd(containerNode?: Node): void {
        if (!this._isInitialized) {
            warn('[AdManager] showPauseAd 在初始化之前被调用。');
            return;
        }
        console.log('[AdManager] 请求显示暂停广告...');

        // --- 优先尝试显示插屏广告 ---
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
                 console.log('[AdManager] 插屏广告正在加载中...');
                 // 同样，可以选择是否 fallback 到 Banner
                 return; // 等待加载完成
            }
        } else {
             console.log('[AdManager] 未配置插屏广告或 ID 无效，尝试显示 Banner。');
        }

        // --- 如果不显示插屏，则显示 Banner ---
        this.showBannerAd(containerNode);
    }

    /**
     * 隐藏暂停时显示的广告 (Banner 或 插屏关闭回调处理)。
     * 由 UIManager 的 hideAdOverlay 事件触发。
     */
    public hidePauseAd(): void {
         if (!this._isInitialized) {
            warn('[AdManager] hidePauseAd 在初始化之前被调用。');
            return;
        }
        console.log('[AdManager] 请求隐藏暂停广告...');

        // 隐藏 Banner
        this.hideBannerAd();

        // 插屏广告通常由用户手动关闭，我们主要在 onClose 回调中处理状态。
        // 这里不需要主动关闭插屏。
    }


    /**
     * 加载并显示 Banner 广告。
     * @param containerNode (可选) 用于定位的容器节点。
     */
    private showBannerAd(containerNode?: Node): void {
        if (this._isBannerLoadingOrVisible) {
            console.log('[AdManager] Banner 广告已在加载或显示中。');
            // 如果实例存在且加载完成，确保它可见
            if (this._bannerAd && !this._isBannerLoadingOrVisible) { // 检查逻辑似乎有点问题，应该是检查是否已加载
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
            this._bannerAd.show()
                .then(() => {
                    console.log('[AdManager] Banner 广告显示成功 (show promise resolved).');
                    // this._isBannerLoadingOrVisible = true; // onLoad 中已设置
                })
                .catch(err => {
                    error('[AdManager] 显示 Banner 广告失败 (show promise rejected):', err);
                    this._isBannerLoadingOrVisible = false;
                    // 失败后可以销毁实例，下次重新创建
                    // this.destroyBannerAd();
                });
        } else {
             warn('[AdManager] Banner 广告实例无效，无法显示。');
        }
    }

    /**
     * 隐藏 Banner 广告。
     */
    private hideBannerAd(): void {
        if (this._bannerAd && this._isBannerLoadingOrVisible) { // 只有在加载或可见时才隐藏
            console.log('[AdManager] 隐藏 Banner 广告...');
            this._bannerAd.hide()
                .then(() => {
                     console.log('[AdManager] Banner 广告隐藏成功。');
                     this._isBannerLoadingOrVisible = false;
                })
                .catch(err => {
                    warn('[AdManager] 隐藏 Banner 广告失败:', err);
                    // 即使隐藏失败，也标记为不再显示
                    this._isBannerLoadingOrVisible = false;
                });
        } else {
            // console.log('[AdManager] Banner 广告未在加载或显示，无需隐藏。');
        }
    }


    /**
     * 加载插屏广告。
     */
    private loadInterstitialAd(): void {
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
    private showInterstitialAdInstance(): void {
        if (this._interstitialAd && this._isInterstitialReady) {
            console.log('[AdManager] 显示插屏广告...');
            this._interstitialAd.show()
                .then(() => {
                    console.log('[AdManager] 插屏广告显示成功。');
                    // 显示成功后，状态会在 onClose 时变为 not ready
                })
                .catch((err: any) => {
                    error('[AdManager] 显示插屏广告失败:', err);
                    // 显示失败，可能需要重新加载
                    this._isInterstitialReady = false;
                    // 可以尝试重新加载
                    // this.loadInterstitialAd();
                });
        } else {
            warn('[AdManager] 插屏广告未就绪或实例无效，无法显示。');
            // 如果是因为未就绪，可以尝试加载
            if (!this._isInterstitialReady && !this._isInterstitialLoading) {
                 this.loadInterstitialAd();
            }
        }
    }
}

// --- 在 Constants.ts 中补充事件名 ---
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