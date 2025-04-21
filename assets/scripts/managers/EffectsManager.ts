// assets/scripts/managers/EffectsManager.ts

import { _decorator, Component, Node, Prefab, instantiate, ParticleSystem2D, error, warn, Vec3, tween, UIOpacity, isValid ,UITransform} from 'cc';
import { Constants } from '../utils/Constants';

const { ccclass, property } = _decorator;

@ccclass('EffectsManager')
export class EffectsManager extends Component {
    // --- Singleton Instance ---
    private static _instance: EffectsManager | null = null;
    public static get instance(): EffectsManager {
        if (!this._instance) {
            error("[EffectsManager] 实例在初始化之前或节点不存在时被请求。");
        }
        return this._instance!;
    }

    // --- Editor Properties ---
    @property({ type: Prefab, tooltip: "胜利时播放的粒子效果预制件" })
    private winParticlesPrefab: Prefab | null = null;

    // --- Private State ---
    private _winParticlesNode: Node | null = null; // 缓存实例化的粒子节点
    private _isInitialized: boolean = false;

    // --- Lifecycle Callbacks ---
    protected onLoad(): void {
        console.log('[EffectsManager] onLoad');
        if (EffectsManager._instance && EffectsManager._instance !== this) {
            warn('[EffectsManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
        }
        EffectsManager._instance = this;
        this._isInitialized = true;
        console.log('[EffectsManager] 初始化完成。');
    }

    protected onDestroy(): void {
        console.log('[EffectsManager] onDestroy');
        if (EffectsManager._instance === this) {
            EffectsManager._instance = null;
            // 清理可能存在的粒子节点
            if (isValid(this._winParticlesNode)) {
                this._winParticlesNode.destroy();
                this._winParticlesNode = null;
            }
        }
    }

    // --- Public Methods ---

    /**
     * 播放胜利粒子效果。
     * @param parentNode 粒子效果应该添加到的父节点 (通常是主游戏场景的 Canvas 或特定层)。
     * @param position (可选) 粒子效果在父节点坐标系下的生成位置，默认为底部中心。
     */
    public playWinEffect(parentNode: Node, position?: Vec3): void {
        if (!this._isInitialized) {
            warn('[EffectsManager] playWinEffect 在初始化之前被调用。');
            return;
        }
        if (!this.winParticlesPrefab) {
            error('[EffectsManager] 胜利粒子效果预制件未设置！');
            return;
        }
        if (!isValid(parentNode)) {
             error('[EffectsManager] 提供的父节点无效！');
             return;
        }

        // 如果粒子节点已存在且有效，先停止并重置，然后重新播放
        if (isValid(this._winParticlesNode)) {
            console.log('[EffectsManager] 检测到已存在的胜利粒子节点，准备重新播放。');
            const ps = this._winParticlesNode!.getComponent(ParticleSystem2D);
            if (ps) {
                console.log('[EffectsManager] 检测到已存在的胜利粒子效果，准备重新播放。');
                ps.stop(); // 停止当前的发射
                ps.clear(); // 清除已有的粒子
                // 重新设置位置（如果提供了）
                if (position) {
                    console.log('[EffectsManager] 重新设置粒子位置为:', position);
                    this._winParticlesNode!.setPosition(position);
                } else {
                     // 默认位置：父节点底部中心 (需要父节点有 UITransform)
                     console.log('[EffectsManager] ParticleSystem2D无效， 使用父节点的 UITransform 设置粒子位置。');
                     const parentUITransform = parentNode.getComponent(UITransform);
                     if (parentUITransform) {
                         this._winParticlesNode!.setPosition(0, -parentUITransform.height / 2, 0);
                     } else {
                         this._winParticlesNode!.setPosition(0, 0, 0); // Fallback
                     }
                }
                if(ps && typeof ps.play === 'function'){
                    ps.play(); // 重新开始播放
                } else {
                    console.log('[EffectsManager] 粒子系统没有 play 方法。');
                }
                
                console.log('[EffectsManager] 重新播放胜利粒子效果。');
                return;
            } else {
                 // 节点存在但没有粒子组件？销毁它重新创建
                 console.log('[EffectsManager] 节点存在但没有 ParticleSystem 组件，重新创建。');
                 this._winParticlesNode.destroy();
                 this._winParticlesNode = null;
            }
        }


        // 实例化粒子效果
        console.log('[EffectsManager] 开始实例化胜利粒子效果。');
        this._winParticlesNode = instantiate(this.winParticlesPrefab);
        if (!this._winParticlesNode) {
             error('[EffectsManager] 实例化胜利粒子效果失败！');
             return;
        }
        

        // 设置父节点和位置
        parentNode.addChild(this._winParticlesNode);
        if (position) {
            this._winParticlesNode.setPosition(position);
        } else {
            // 默认位置：父节点底部中心
            console.log('[EffectsManager] position不存在， 使用父节点的 UITransform 设置粒子位置。');
            const parentUITransform = parentNode.getComponent(UITransform);
            if (parentUITransform) {
                console.log('[EffectsManager] 设置粒子位置为:', 0, -parentUITransform.height / 2, 0);
                this._winParticlesNode.setPosition(0, -parentUITransform.height / 2, 0);
            } else {
                console.log('[EffectsManager] 使用父节点的 Transform 设置粒子位置。');
                 this._winParticlesNode.setPosition(0, 0, 0);
            }
        }

        // 获取粒子系统组件并播放
        console.log('[EffectsManager] 实例化完成，准备播放粒子效果。');
        const particleSystem = this._winParticlesNode!.getComponent(ParticleSystem2D);
        if (particleSystem) {
            console.log('[EffectsManager] 开始播放胜利粒子效果。');
            if (typeof particleSystem.play === 'function') {
                particleSystem.play();
            }
        } else {
            console.error('[EffectsManager] 胜利粒子预制件上缺少 ParticleSystem 组件！');
        }
    }

    /**
     * 停止并移除胜利粒子效果。
     */
    public stopWinEffect(): void {
        if (!this._isInitialized) {
            warn('[EffectsManager] stopWinEffect 在初始化之前被调用。');
            return;
        }

        if (isValid(this._winParticlesNode)) {
            console.log('[EffectsManager] 检测到正在播放的胜利粒子节点，准备停止。');
            const ps = this._winParticlesNode!.getComponent(ParticleSystem2D);
            if (ps) {
                console.log('[EffectsManager] 检测到粒子系统组件，准备停止粒子效果。');
                if (typeof ps.stop === 'function') {
                    ps.stop();    
                } else {
                    console.log('[EffectsManager] 粒子系统没有 stop 方法。');
                }
                
                // 或者立即销毁
                 this._winParticlesNode.destroy();
                 this._winParticlesNode = null;
                 console.log('[EffectsManager] 胜利粒子效果已停止并移除。');

            } else {
                // 没有粒子组件，直接销毁节点
                console.log('[EffectsManager] 检测到节点没有 ParticleSystem 组件，直接销毁。');
                this._winParticlesNode.destroy();
                this._winParticlesNode = null;
                 console.log('[EffectsManager] 胜利粒子节点已移除 (无粒子系统)。');
            }
        } else {
            // console.log('[EffectsManager] 没有正在播放的胜利粒子效果可停止。');
        }
    }

    /**
     * 播放数字出现的动画 (放大弹跳)。
     * @param targetNode 要应用动画的数字节点 (通常是一个包含 Sprite 的节点)。
     * @param callback (可选) 动画完成后的回调函数。
     */
    public animateNumberAppear(targetNode: Node, callback?: () => void): void {
        if (!this._isInitialized || !isValid(targetNode)) {
            warn('[EffectsManager] animateNumberAppear 调用时参数无效或未初始化。');
            if (callback) callback();
            return;
        }

        // 确保节点初始状态正确 (如果需要的话)
        targetNode.setScale(Constants.Animation.NUMBER_APPEAR_SCALE_IN, Constants.Animation.NUMBER_APPEAR_SCALE_IN);
        const uiOpacity = targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity);
        uiOpacity.opacity = 0;
        targetNode.active = true; // 确保节点是激活的

        // 创建并执行动画
        tween(targetNode)
            .to(Constants.Animation.NUMBER_APPEAR_DURATION * 0.7, // 70% 时间放大
                { scale: new Vec3(Constants.Animation.NUMBER_APPEAR_SCALE_OUT, Constants.Animation.NUMBER_APPEAR_SCALE_OUT, 1) },
                { easing: 'sineOut' } // 使用缓动效果
            )
            .to(Constants.Animation.NUMBER_APPEAR_DURATION * 0.3, // 30% 时间缩小回正常
                { scale: new Vec3(1, 1, 1) },
                { easing: 'sineIn' }
            )
            .call(() => {
                // 动画完成后的回调
                if (callback) {
                    callback();
                }
            })
            .start(); // 启动动画

        // 同时处理透明度
        tween(uiOpacity)
            .to(Constants.Animation.NUMBER_APPEAR_DURATION * 0.5, { opacity: 255 }) // 较快达到完全不透明
            .start();
    }

    /**
     * 播放数字消失的动画 (缩小消失)。
     * @param targetNode 要应用动画的数字节点。
     * @param callback (可选) 动画完成后的回调函数 (通常用于在动画后实际移除节点或数据)。
     */
    public animateNumberDisappear(targetNode: Node, callback?: () => void): void {
        if (!this._isInitialized || !isValid(targetNode)) {
            warn('[EffectsManager] animateNumberDisappear 调用时参数无效或未初始化。');
            if (callback) callback();
            return;
        }

        const uiOpacity = targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity);

        // 创建并执行动画
        tween(targetNode)
            .to(Constants.Animation.NUMBER_DISAPPEAR_DURATION,
                { scale: new Vec3(Constants.Animation.NUMBER_DISAPPEAR_SCALE, Constants.Animation.NUMBER_DISAPPEAR_SCALE, 1) },
                { easing: 'sineIn' } // 加速消失
            )
            .call(() => {
                // 动画完成后的回调, 恢复正常显示
                targetNode.setScale(1, 1, 1); // 确保节点恢复到原始大小
                // let op = targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity);
                // op.opacity = 255; // 确保完全不透明
                if (callback) {
                    callback();
                }
            })
            .start(); // 启动动画

        // 同时处理透明度
        // tween(uiOpacity)
        //     .to(Constants.Animation.NUMBER_DISAPPEAR_DURATION, { opacity: 0 })
        //     .start();
    }
}
