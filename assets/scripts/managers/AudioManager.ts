/*
Singleton Pattern: Standard singleton implementation using _instance and instance getter. Includes checks for duplicate instances and ensures persistence using director.addPersistRootNode.
@property Decorators: Allows assigning AudioSource components directly in the Cocos Creator editor for bgmSource and sfxSource. Includes fallback logic in onLoad to add components if they aren't assigned.
AudioSource Components: Uses separate AudioSource components for BGM (looping) and SFX (non-looping, using playOneShot).
Initialization (initialize):
Takes initialSettings to set the initial enabled state.
Is async to properly handle asynchronous resource loading.
Includes loading state (_isLoading) to prevent multiple initializations.
Calls loadAudioAssets.
Automatically plays BGM after successful initialization if enabled.
Resource Loading (loadAudioAssets):
Uses resources.load to load AudioClips from the assets/resources/audio/ directory.
Uses Promise.all to wait for all clips to load (or fail).
Stores loaded clips in the _audioClips Map.
Includes error handling for individual clip loading failures.
Settings Control (setBgmEnabled, setSfxEnabled): Updates internal flags and immediately plays/stops BGM as needed.
Playback Methods: Provides clear methods (playBGM, stopBGM, pauseBGM, resumeBGM, playSFX) that check initialization status and enabled flags before interacting with the AudioSource components.
playOneShot for SFX: Uses playOneShot which is ideal for sound effects, allowing them to overlap without interrupting each other or the main sfxSource state.
Logging: Includes console.log, warn, and error calls for better debugging.
*/

import { _decorator, Component, Node, AudioClip, AudioSource, resources, director, error, warn, log, CCBoolean } from 'cc';
import { Constants } from '../utils/Constants';
import { SettingsData } from '../data/SettingsData';

const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    // --- Singleton Instance ---
    private static _instance: AudioManager | null = null;
    public static get instance(): AudioManager {
        if (!this._instance) {
            // This error indicates the AudioManagerNode hasn't been loaded or initialized yet.
            error("[AudioManager] Instance requested before initialization or node doesn't exist.");
        }
        // The '!' asserts that _instance is non-null, assuming proper setup.
        return this._instance!;
    }

    // --- Editor Properties ---
    // Assign these in the Cocos Creator Editor Inspector panel by dragging AudioSource components here.
    // If left null, the script will attempt to add them in onLoad.
    @property({ type: AudioSource, tooltip: "AudioSource component for background music (looping)" })
    private bgmSource: AudioSource | null = null;

    @property({ type: AudioSource, tooltip: "AudioSource component for sound effects (non-looping)" })
    private sfxSource: AudioSource | null = null;

    // --- Private State ---
    private _audioClips: Map<string, AudioClip> = new Map();
    private _isInitialized: boolean = false;
    private _isLoading: boolean = false; // Prevent concurrent loading
    private _isBgmEnabled: boolean = true;
    private _isSfxEnabled: boolean = true;
    private _currentBgmName: string | null = null; // Track the currently intended BGM

    // --- Lifecycle Callbacks ---
    protected onLoad(): void {
        console.log('[AudioManager] onLoad');
        // Implement Singleton pattern
        if (AudioManager._instance && AudioManager._instance !== this) {
            warn('[AudioManager] Another instance already exists. Destroying this one.');
            this.destroy();
            return;
        }
        AudioManager._instance = this;

        // Make this node persistent across scene changes (if your game has multiple scenes)
        // If it's a single-scene game, this might not be strictly necessary but doesn't hurt.
        if (this.node.parent) { // Avoid error if it's already a root node somehow
             director.addPersistRootNode(this.node);
             console.log('[AudioManager] Node made persistent.');
        }


        // Ensure AudioSource components exist if not assigned in editor
        if (!this.bgmSource) {
            this.bgmSource = this.node.getComponent(AudioSource); // Check if already exists
            if (!this.bgmSource) {
                this.bgmSource = this.node.addComponent(AudioSource);
                console.log('[AudioManager] Added BGM AudioSource component.');
            }
        }
        if (this.bgmSource) {
            this.bgmSource.loop = true; // Ensure BGM loops
        } else {
             error('[AudioManager] Failed to get or create BGM AudioSource!');
        }


        if (!this.sfxSource) {
            // Check if another AudioSource exists (maybe user added one for SFX)
            const sources = this.node.getComponents(AudioSource);
            this.sfxSource = sources.find(s => s !== this.bgmSource) || null; // Find one that isn't the BGM source
             if (!this.sfxSource) {
                this.sfxSource = this.node.addComponent(AudioSource);
                console.log('[AudioManager] Added SFX AudioSource component.');
            }
        }
         if (this.sfxSource) {
            this.sfxSource.loop = false; // Ensure SFX does not loop
        } else {
             error('[AudioManager] Failed to get or create SFX AudioSource!');
        }
    }

    protected onDestroy(): void {
        console.log('[AudioManager] onDestroy');
        if (AudioManager._instance === this) {
            AudioManager._instance = null;
            // Consider stopping audio explicitly here if needed, though components usually handle it.
            // if (this.bgmSource) this.bgmSource.stop();
            // if (this.sfxSource) this.sfxSource.stop(); // Might cut off last SFX
        }
    }

    // --- Public Initialization Method ---
    /**
     * Initializes the AudioManager, loads audio assets, and applies initial settings.
     * Should be called once during game startup after settings are loaded.
     * @param initialSettings The initial sound settings (BGM/SFX enabled state).
     */
    public async initialize(initialSettings: SettingsData): Promise<void> {
        if (this._isInitialized) {
            warn('[AudioManager] Already initialized.');
            return;
        }
        if (this._isLoading) {
             warn('[AudioManager] Initialization already in progress.');
            return;
        }

        console.log('[AudioManager] Initializing...');
        this._isLoading = true;
        this._isBgmEnabled = initialSettings.bgmEnabled;
        this._isSfxEnabled = initialSettings.sfxEnabled;
        console.log(`[AudioManager] Initial settings - BGM: ${this._isBgmEnabled}, SFX: ${this._isSfxEnabled}`);

        try {
            await this.loadAudioAssets();
            this._isInitialized = true;
            console.log('[AudioManager] Initialized successfully.');

            // Automatically play BGM if it was enabled and loaded
            if (this._isBgmEnabled) {
                this.playBGM(Constants.AudioClipName.BGM); // Specify the default BGM
            }
        } catch (err) {
             error('[AudioManager] Initialization failed during audio loading.', err);
             // Handle initialization failure if necessary
        } finally {
             this._isLoading = false;
        }
    }

    // --- Asset Loading ---
    /**
     * Loads all audio clips defined in Constants.AudioClipName.
     * Assumes clips are located in 'assets/resources/audio/'.
     */
    private async loadAudioAssets(): Promise<void> {
        console.log('[AudioManager] Starting audio asset loading...');
        const clipNames = Object.values(Constants.AudioClipName);
        const loadPromises: Promise<void>[] = [];

        this._audioClips.clear(); // Clear previous clips if any

        for (const name of clipNames) {
            // Path relative to the 'resources' folder
            const path = `audio/${name}`;
            loadPromises.push(
                new Promise((resolve, reject) => {
                    resources.load(path, AudioClip, (err, clip) => {
                        if (err) {
                            error(`[AudioManager] Failed to load audio clip: ${path}`, err);
                            // Decide if loading failure for one clip is critical
                            // For now, we just console.log the error and continue
                            resolve(); // Resolve even on error to not block Promise.all entirely
                        } else if (clip) {
                            this._audioClips.set(name, clip);
                            console.log(`[AudioManager] Loaded audio clip: ${path}`);
                            resolve();
                        } else {
                             error(`[AudioManager] Loaded audio clip is null: ${path}`);
                             resolve();
                        }
                    });
                })
            );
        }

        await Promise.all(loadPromises);
        console.log(`[AudioManager] Audio asset loading finished. Loaded ${this._audioClips.size} clips.`);
    }

    // --- Settings Control ---
    /**
     * Updates the enabled state for Background Music (BGM).
     * Automatically plays or stops the current BGM based on the new state.
     * @param enabled True to enable BGM, false to disable.
     */
    public setBgmEnabled(enabled: boolean): void {
        if (this._isBgmEnabled === enabled) return; // No change

        this._isBgmEnabled = enabled;
        console.log(`[AudioManager] Set BGM Enabled: ${enabled}`);

        if (!this._isInitialized) {
             warn('[AudioManager] setBgmEnabled called before initialization.');
             return;
        }

        if (enabled) {
            if (this._currentBgmName) {
                 this.playBGM(this._currentBgmName);
            } else {
                 this.playBGM(Constants.AudioClipName.BGM);
            }
        } else {
            this.stopBGM();
        }
    }

    /**
     * Updates the enabled state for Sound Effects (SFX).
     * @param enabled True to enable SFX, false to disable.
     */
    public setSfxEnabled(enabled: boolean): void {
         if (this._isSfxEnabled === enabled) return; // No change

        this._isSfxEnabled = enabled;
        console.log(`[AudioManager] Set SFX Enabled: ${enabled}`);

        if (!this._isInitialized) {
             warn('[AudioManager] setSfxEnabled called before initialization.');
             return;
        }
        // No immediate action needed, just prevents future SFX plays if disabled.
    }

    // --- Playback Control ---

    /**
     * Plays the specified background music clip. Stops any currently playing BGM first.
     * Does nothing if BGM is disabled or AudioManager is not initialized.
     * @param clipName The name of the BGM clip (from Constants.AudioClipName).
     */
    public playBGM(clipName: string): void {
        if (!this._isInitialized || !this._isBgmEnabled || !this.bgmSource) {
            // console.log(`[AudioManager] BGM play skipped. Initialized: ${this._isInitialized}, Enabled: ${this._isBgmEnabled}`);
            return;
        }

        const clip = this._audioClips.get(clipName);
        if (!clip) {
            warn(`[AudioManager] BGM clip '${clipName}' not found or not loaded.`);
            return;
        }

        // If the requested BGM is already playing, do nothing.
        if (this.bgmSource.clip === clip && this.bgmSource.playing) {
            // console.log(`[AudioManager] BGM '${clipName}' is already playing.`);
            return;
        }

        console.log(`[AudioManager] Playing BGM: ${clipName}`);
        this.bgmSource.stop(); // Stop previous BGM if any
        this.bgmSource.clip = clip;
        this.bgmSource.play();
        this._currentBgmName = clipName; // Remember which BGM should be playing
    }

    /**
     * Stops the currently playing background music.
     */
    public stopBGM(): void {
        if (!this._isInitialized || !this.bgmSource) return;

        if (this.bgmSource.playing) {
            console.log('[AudioManager] Stopping BGM.');
            this.bgmSource.stop();
        }
         this._currentBgmName = null; // Clear the intended BGM
    }

    /**
     * Pauses the currently playing background music.
     */
     public pauseBGM(): void {
        if (!this._isInitialized || !this.bgmSource) return;

        if (this.bgmSource.playing) {
            console.log('[AudioManager] Pausing BGM.');
            this.bgmSource.pause();
        }
    }

    /**
     * Resumes the paused background music.
     * Does nothing if BGM is disabled or was not playing/paused.
     */
     public resumeBGM(): void {
        if (!this._isInitialized || !this._isBgmEnabled || !this.bgmSource) return;

        if (this._currentBgmName && !this.bgmSource.playing) {
             const clip = this._audioClips.get(this._currentBgmName);
             if (clip && this.bgmSource.clip !== clip) {
                 this.bgmSource.clip = clip;
             }
             console.log('[AudioManager] Resuming BGM.');
             this.bgmSource.play();
        } else if (!this._currentBgmName) {
             warn('[AudioManager] Resume BGM called but no BGM was intended to be playing.');
        }
    }

    /**
     * Plays the specified sound effect clip once.
     * Does nothing if SFX is disabled or AudioManager is not initialized.
     * @param clipName The name of the SFX clip (from Constants.AudioClipName).
     * @param volume Optional volume multiplier (0.0 to 1.0). Defaults to 1.0.
     */
    public playSFX(clipName: string, volume: number = 1.0): void {
        if (!this._isInitialized || !this._isSfxEnabled || !this.sfxSource) {
            // console.log(`[AudioManager] SFX play skipped. Initialized: ${this._isInitialized}, Enabled: ${this._isSfxEnabled}`);
            return;
        }

        const clip = this._audioClips.get(clipName);
        if (clip) {
            // Use playOneShot for sound effects. It allows overlapping sounds
            // and doesn't interfere with the main AudioSource state (like clip or loop).
            this.sfxSource.playOneShot(clip, volume);
            // console.log(`[AudioManager] Playing SFX: ${clipName}`); // Logging every SFX can be noisy
        } else {
            warn(`[AudioManager] SFX clip '${clipName}' not found or not loaded.`);
        }
    }

    /**
     * Retrieves a loaded AudioClip by name.
     * @param clipName The name of the clip.
     * @returns The AudioClip if loaded, otherwise undefined.
     */
    public getAudioClip(clipName: string): AudioClip | undefined {
        return this._audioClips.get(clipName);
    }
}