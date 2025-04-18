// assets/scripts/components/SettingsPopupController.ts
import { _decorator, Component, Toggle, director } from 'cc';
import { PopupBase } from './PopupBase'; // 继承基类
import { Constants } from '../utils/Constants';

const { ccclass, property } = _decorator;

@ccclass('SettingsPopupController')
export class SettingsPopupController extends PopupBase {
    // 可以添加此弹窗特有的属性引用，例如 Toggle 组件
    @property(Toggle) bgmToggle: Toggle | null = null;
    @property(Toggle) sfxToggle: Toggle | null = null;

    // 可以在 onOpen 中根据传入的数据设置 Toggle 初始状态
    protected onOpen(initialSettings?: any): void {
        super.onOpen(initialSettings); // 调用父类方法
        console.log(`[SettingsPopupController] onOpen: ${this.node.name}, initialSettings: ${JSON.stringify(initialSettings)} ${this.bgmToggle} ${this.sfxToggle}`);
        if (initialSettings && this.bgmToggle) {
            this.bgmToggle.isChecked = initialSettings.bgmEnabled;
        }
         if (initialSettings && this.sfxToggle) {
            this.sfxToggle.isChecked = initialSettings.sfxEnabled;
        }
        // 可以在这里绑定 Toggle 的事件监听，并发出特定事件
        if(this.bgmToggle && this.bgmToggle.node) {
            this.bgmToggle.node.on('toggle', this.onBgmToggleChanged, this);
        }
        if(this.sfxToggle && this.sfxToggle.node) {
            this.sfxToggle.node.on('toggle', this.onSfxToggleChanged, this);
        }
    }

    private onBgmToggleChanged(toggle: Toggle): void {
         director.emit(Constants.EventName.SETTINGS_BGM_CHANGED, toggle.isChecked);
    }
     private onSfxToggleChanged(toggle: Toggle): void {
         director.emit(Constants.EventName.SETTINGS_SFX_CHANGED, toggle.isChecked);
    }

    protected onClose(): void {
         // 移除监听
         if(this.bgmToggle && this.bgmToggle.node) {
            this.bgmToggle.node.off('toggle', this.onBgmToggleChanged, this);
         } else {
            console.error('BgmToggle is not set in SettingsPopupController!');
         }
         if(this.sfxToggle && this.sfxToggle.node) {
            this.sfxToggle.node.off('toggle', this.onSfxToggleChanged, this);
         } else{
            console.error('SfxToggle is not set in SettingsPopupController!');
         }
         super.onClose(); // 调用父类方法
    }
}