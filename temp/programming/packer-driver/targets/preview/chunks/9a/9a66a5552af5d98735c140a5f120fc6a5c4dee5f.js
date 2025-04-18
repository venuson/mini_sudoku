System.register(["__unresolved_0", "cc"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Label, Sprite, SpriteFrame, assetManager, isValid, Color, error, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, RankItem;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfRankingEntry(extras) {
    _reporterNs.report("RankingEntry", "../data/UserData", _context.meta, extras);
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
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      assetManager = _cc.assetManager;
      isValid = _cc.isValid;
      Color = _cc.Color;
      error = _cc.error;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dfdedRO+0NJxIYLqHjU93ID", "RankItem", undefined); // assets/scripts/components/RankItem.ts


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Sprite', 'SpriteFrame', 'assetManager', 'ImageAsset', 'isValid', 'Color', 'log', 'error']); // 需要 RankingEntry 接口定义


      // 可能需要默认头像名称
      ({
        ccclass,
        property
      } = _decorator);

      _export("RankItem", RankItem = (_dec = ccclass('RankItem'), _dec2 = property({
        type: Label,
        tooltip: "显示排名的 Label"
      }), _dec3 = property({
        type: Sprite,
        tooltip: "显示用户头像的 Sprite"
      }), _dec4 = property({
        type: Label,
        tooltip: "显示用户昵称的 Label"
      }), _dec5 = property({
        type: Label,
        tooltip: "显示分数的 Label"
      }), _dec6 = property({
        type: Sprite,
        tooltip: "排名前三的特殊图标或背景 (可选)"
      }), _dec7 = property({
        type: Color,
        tooltip: "第一名的颜色 (可选)"
      }), _dec8 = property({
        type: Color,
        tooltip: "第二名的颜色 (可选)"
      }), _dec9 = property({
        type: Color,
        tooltip: "第三名的颜色 (可选)"
      }), _dec10 = property({
        type: Color,
        tooltip: "用户自己排名的背景色 (可选)"
      }), _dec(_class = (_class2 = class RankItem extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "rankLabel", _descriptor, this);

          _initializerDefineProperty(this, "avatarSprite", _descriptor2, this);

          _initializerDefineProperty(this, "nicknameLabel", _descriptor3, this);

          _initializerDefineProperty(this, "scoreLabel", _descriptor4, this);

          // --- (可选) 用于区分前三名或自己的样式 ---
          _initializerDefineProperty(this, "topRankSprite", _descriptor5, this);

          _initializerDefineProperty(this, "rank1Color", _descriptor6, this);

          _initializerDefineProperty(this, "rank2Color", _descriptor7, this);

          _initializerDefineProperty(this, "rank3Color", _descriptor8, this);

          _initializerDefineProperty(this, "myRankBgColor", _descriptor9, this);

          // 淡蓝色
          // --- 内部状态 ---
          this._rankData = null;
          this._isMyRank = false;
          // 标记是否是当前用户的条目
          this._defaultAvatarFrame = null;
        }

        // 缓存默认头像

        /**
         * 设置并显示排行榜条目数据。
         * 由 UIManager 在填充列表时调用。
         * @param rankData 排行榜条目数据。
         * @param isMyRank 是否是当前用户的排名项。
         * @param defaultAvatar (可选) 预加载的默认头像 SpriteFrame。
         */
        setData(rankData, isMyRank, defaultAvatar) {
          this._rankData = rankData;
          this._isMyRank = isMyRank;
          this._defaultAvatarFrame = defaultAvatar != null ? defaultAvatar : this._defaultAvatarFrame; // 更新或使用已缓存的

          if (!rankData) {
            console.log('[RankItem] 设置了空的排行数据。');
            this.node.active = false;
            return;
          }

          this.node.active = true; // 更新排名显示和样式

          if (this.rankLabel) {
            this.rankLabel.string = "" + rankData.rank; // 根据排名设置特殊颜色或图标

            this.rankLabel.color = Color.WHITE; // 重置为默认颜色

            if (this.topRankSprite) this.topRankSprite.node.active = false; // 隐藏特殊图标

            if (rankData.rank === 1) {
              this.rankLabel.color = this.rank1Color; // if (this.topRankSprite) this.topRankSprite.node.active = true; // 显示第一名图标
            } else if (rankData.rank === 2) {
              this.rankLabel.color = this.rank2Color; // if (this.topRankSprite) this.topRankSprite.node.active = true; // 显示第二名图标
            } else if (rankData.rank === 3) {
              this.rankLabel.color = this.rank3Color; // if (this.topRankSprite) this.topRankSprite.node.active = true; // 显示第三名图标
            }
          } // 更新昵称


          if (this.nicknameLabel) {
            this.nicknameLabel.string = rankData.nickname || '匿名用户';
          } // 更新分数 (假设分数是通关数)


          if (this.scoreLabel) {
            this.scoreLabel.string = "\u901A\u5173: " + rankData.score;
          } // 更新头像


          this.loadAvatar(rankData.avatarUrl); // 如果是当前用户的排名，设置特殊背景色 (可选)

          var bgSprite = this.getComponent(Sprite); // 假设背景 Sprite 在根节点

          if (bgSprite) {
            bgSprite.color = isMyRank ? this.myRankBgColor : Color.WHITE; // 或者其他默认背景色
          }
        }
        /**
         * 加载并设置用户头像。
         * @param avatarUrl 头像的 URL。
         */


        loadAvatar(avatarUrl) {
          if (!this.avatarSprite) return;

          if (avatarUrl) {
            // 注意：微信小游戏加载远程图片需要配置 downloadFile 合法域名
            assetManager.loadRemote(avatarUrl, {
              ext: '.png'
            }, (err, imageAsset) => {
              // 检查组件和节点是否仍然有效，因为加载是异步的
              if (isValid(this.node) && isValid(this.avatarSprite)) {
                if (err || !imageAsset) {
                  error("[RankItem] \u52A0\u8F7D\u5934\u50CF\u5931\u8D25: " + avatarUrl, err); // 加载失败，设置默认头像

                  this.setDefaultAvatar();
                } else {
                  var spriteFrame = SpriteFrame.createWithImage(imageAsset);
                  this.avatarSprite.spriteFrame = spriteFrame;
                }
              } else {
                console.log('[RankItem] 加载头像完成时节点或 Sprite 已销毁。');
              }
            });
          } else {
            // 没有头像 URL，设置默认头像
            this.setDefaultAvatar();
          }
        }
        /**
         * 设置默认头像。
         */


        setDefaultAvatar() {
          if (this.avatarSprite) {
            if (this._defaultAvatarFrame) {
              this.avatarSprite.spriteFrame = this._defaultAvatarFrame;
            } else {
              // 如果没有缓存的默认头像，可以尝试从 UIManager 或资源管理器加载
              // 或者显示一个纯色块
              this.avatarSprite.spriteFrame = null; // 清空

              this.avatarSprite.color = Color.GRAY;
              warn('[RankItem] 未能设置默认头像。');
            }
          }
        } // RankItem 通常不需要 onDestroy 来解绑事件，因为它主要是显示数据
        // protected onDestroy(): void {
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rankLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "avatarSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nicknameLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "topRankSprite", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rank1Color", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.RED;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rank2Color", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.ORANGE;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "rank3Color", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Color.YELLOW;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "myRankBgColor", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color(200, 230, 255);
        }
      })), _class2)) || _class));
      /*
      节点引用: 获取排名、头像、昵称、分数等 Label 和 Sprite 的引用。还包括了可选的用于前三名特殊显示的 topRankSprite 和颜色属性。
      _rankData, _isMyRank: 存储传递给该项的 RankingEntry 数据和是否为当前用户的标记。
      _defaultAvatarFrame: 用于缓存从 UIManager 传入或加载的默认头像 SpriteFrame。
      setData 方法:
      核心方法，由 UIManager 调用。
      接收 RankingEntry 数据、isMyRank 标记和可选的默认头像。
      更新排名 Label，并根据排名（1、2、3）设置不同的颜色或激活特殊图标（如果配置了）。
      更新昵称和分数 Label。
      调用 loadAvatar 方法加载用户头像。
      如果 isMyRank 为 true，设置不同的背景色以突出显示。
      loadAvatar 方法:
      负责异步加载远程头像 URL。
      特别注意: 微信小游戏加载远程图片需要在微信公众平台后台配置 downloadFile 的合法域名。
      使用 assetManager.loadRemote 加载图片资源 (ImageAsset)。
      加载成功后，使用 SpriteFrame.createWithImage 创建 SpriteFrame 并设置给 avatarSprite。
      包含有效性检查: 在异步回调中，使用 isValid(this.node) 和 isValid(this.avatarSprite) 检查节点和组件是否在加载完成时仍然存在，防止报错。
      加载失败或 URL 为空时，调用 setDefaultAvatar。
      setDefaultAvatar 方法: 设置预加载或缓存的默认头像 SpriteFrame。如果默认头像也未加载，则清空 SpriteFrame 并显示灰色背景。
      */


      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9a66a5552af5d98735c140a5f120fc6a5c4dee5f.js.map