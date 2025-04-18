System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, instantiate, ParticleSystem2D, error, warn, Vec3, tween, UIOpacity, isValid, UITransform, Constants, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, EffectsManager;

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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      ParticleSystem2D = _cc.ParticleSystem2D;
      error = _cc.error;
      warn = _cc.warn;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
      UIOpacity = _cc.UIOpacity;
      isValid = _cc.isValid;
      UITransform = _cc.UITransform;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3c60aNfxwZNAZZPV1G98PJ3", "EffectsManager", undefined); // assets/scripts/managers/EffectsManager.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'ParticleSystem2D', 'error', 'warn', 'log', 'Vec3', 'tween', 'UIOpacity', 'isValid', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("EffectsManager", EffectsManager = (_dec = ccclass('EffectsManager'), _dec2 = property({
        type: Prefab,
        tooltip: "胜利时播放的粒子效果预制件"
      }), _dec(_class = (_class2 = (_class3 = class EffectsManager extends Component {
        constructor(...args) {
          super(...args);

          // --- Editor Properties ---
          _initializerDefineProperty(this, "winParticlesPrefab", _descriptor, this);

          // --- Private State ---
          this._winParticlesNode = null;
          // 缓存实例化的粒子节点
          this._isInitialized = false;
        }

        static get instance() {
          if (!this._instance) {
            error("[EffectsManager] 实例在初始化之前或节点不存在时被请求。");
          }

          return this._instance;
        }

        // --- Lifecycle Callbacks ---
        onLoad() {
          console.log('[EffectsManager] onLoad');

          if (EffectsManager._instance && EffectsManager._instance !== this) {
            warn('[EffectsManager] 另一个实例已存在，销毁当前实例。');
            this.destroy();
            return;
          }

          EffectsManager._instance = this; // 如果挂载在 AudioManagerNode 或其他需要持久化的节点上，则不需要再次设置持久化
          // 如果是独立节点，则需要设置：
          // if (this.node.parent) {
          //     director.addPersistRootNode(this.node);
          //     console.log('[EffectsManager] 节点已设为持久化。');
          // }

          this._isInitialized = true;
          console.log('[EffectsManager] 初始化完成。');
        }

        onDestroy() {
          console.log('[EffectsManager] onDestroy');

          if (EffectsManager._instance === this) {
            EffectsManager._instance = null; // 清理可能存在的粒子节点

            if (isValid(this._winParticlesNode)) {
              this._winParticlesNode.destroy();

              this._winParticlesNode = null;
            }
          }
        } // --- Public Methods ---

        /**
         * 播放胜利粒子效果。
         * @param parentNode 粒子效果应该添加到的父节点 (通常是主游戏场景的 Canvas 或特定层)。
         * @param position (可选) 粒子效果在父节点坐标系下的生成位置，默认为底部中心。
         */


        playWinEffect(parentNode, position) {
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
          } // 如果粒子节点已存在且有效，先停止并重置，然后重新播放


          if (isValid(this._winParticlesNode)) {
            console.log('[EffectsManager] 检测到已存在的胜利粒子节点，准备重新播放。');

            const ps = this._winParticlesNode.getComponent(ParticleSystem2D);

            if (ps) {
              console.log('[EffectsManager] 检测到已存在的胜利粒子效果，准备重新播放。');
              ps.stop(); // 停止当前的发射

              ps.clear(); // 清除已有的粒子
              // 重新设置位置（如果提供了）

              if (position) {
                console.log('[EffectsManager] 重新设置粒子位置为:', position);

                this._winParticlesNode.setPosition(position);
              } else {
                // 默认位置：父节点底部中心 (需要父节点有 UITransform)
                console.log('[EffectsManager] ParticleSystem2D无效， 使用父节点的 UITransform 设置粒子位置。');
                const parentUITransform = parentNode.getComponent(UITransform);

                if (parentUITransform) {
                  this._winParticlesNode.setPosition(0, -parentUITransform.height / 2, 0);
                } else {
                  this._winParticlesNode.setPosition(0, 0, 0); // Fallback

                }
              }

              if (ps && typeof ps.play === 'function') {
                console.log('[EffectsManager] 粒子系统属性:', Object.keys(ps));
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
          } // 实例化粒子效果


          console.log('[EffectsManager] 开始实例化胜利粒子效果。');
          this._winParticlesNode = instantiate(this.winParticlesPrefab);

          if (!this._winParticlesNode) {
            error('[EffectsManager] 实例化胜利粒子效果失败！');
            return;
          } // 设置父节点和位置


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
          } // 获取粒子系统组件并播放


          console.log('[EffectsManager] 实例化完成，准备播放粒子效果。');

          const particleSystem = this._winParticlesNode.getComponent(ParticleSystem2D);

          if (particleSystem) {
            console.log('[EffectsManager] 开始播放胜利粒子效果。');
            console.log('[EffectsManager] 粒子系统属性:', Object.keys(particleSystem));

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


        stopWinEffect() {
          if (!this._isInitialized) {
            warn('[EffectsManager] stopWinEffect 在初始化之前被调用。');
            return;
          }

          if (isValid(this._winParticlesNode)) {
            console.log('[EffectsManager] 检测到正在播放的胜利粒子节点，准备停止。');

            const ps = this._winParticlesNode.getComponent(ParticleSystem2D);

            if (ps) {
              console.log('[EffectsManager] 检测到粒子系统组件，准备停止粒子效果。');

              if (typeof ps.stop === 'function') {
                ps.stop();
              } else {
                console.log('[EffectsManager] 粒子系统没有 stop 方法。');
              } // 或者立即销毁


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
          } else {// console.log('[EffectsManager] 没有正在播放的胜利粒子效果可停止。');
          }
        }
        /**
         * 播放数字出现的动画 (放大弹跳)。
         * @param targetNode 要应用动画的数字节点 (通常是一个包含 Sprite 的节点)。
         * @param callback (可选) 动画完成后的回调函数。
         */


        animateNumberAppear(targetNode, callback) {
          if (!this._isInitialized || !isValid(targetNode)) {
            warn('[EffectsManager] animateNumberAppear 调用时参数无效或未初始化。');
            if (callback) callback();
            return;
          } // 确保节点初始状态正确 (如果需要的话)


          targetNode.setScale((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_APPEAR_SCALE_IN, (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_APPEAR_SCALE_IN);
          const uiOpacity = targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity);
          uiOpacity.opacity = 0;
          targetNode.active = true; // 确保节点是激活的
          // 创建并执行动画

          tween(targetNode).to((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_APPEAR_DURATION * 0.7, // 70% 时间放大
          {
            scale: new Vec3((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Animation.NUMBER_APPEAR_SCALE_OUT, (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Animation.NUMBER_APPEAR_SCALE_OUT, 1)
          }, {
            easing: 'sineOut'
          } // 使用缓动效果
          ).to((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_APPEAR_DURATION * 0.3, // 30% 时间缩小回正常
          {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineIn'
          }).call(() => {
            // 动画完成后的回调
            if (callback) {
              callback();
            }
          }).start(); // 启动动画
          // 同时处理透明度

          tween(uiOpacity).to((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_APPEAR_DURATION * 0.5, {
            opacity: 255
          }) // 较快达到完全不透明
          .start();
        }
        /**
         * 播放数字消失的动画 (缩小消失)。
         * @param targetNode 要应用动画的数字节点。
         * @param callback (可选) 动画完成后的回调函数 (通常用于在动画后实际移除节点或数据)。
         */


        animateNumberDisappear(targetNode, callback) {
          if (!this._isInitialized || !isValid(targetNode)) {
            warn('[EffectsManager] animateNumberDisappear 调用时参数无效或未初始化。');
            if (callback) callback();
            return;
          }

          const uiOpacity = targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity); // 创建并执行动画

          tween(targetNode).to((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_DISAPPEAR_DURATION, {
            scale: new Vec3((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Animation.NUMBER_DISAPPEAR_SCALE, (_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).Animation.NUMBER_DISAPPEAR_SCALE, 1)
          }, {
            easing: 'sineIn'
          } // 加速消失
          ).call(() => {
            // 动画完成后的回调
            // targetNode.active = false; // 动画结束后隐藏节点
            if (callback) {
              callback();
            }
          }).start(); // 启动动画
          // 同时处理透明度

          tween(uiOpacity).to((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
            error: Error()
          }), Constants) : Constants).Animation.NUMBER_DISAPPEAR_DURATION, {
            opacity: 0
          }).start();
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "winParticlesPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9f60fcb4c52bf85c0f848e87f5bf5ad687a3af16.js.map