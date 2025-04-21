System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, AudioClip, AudioSource, resources, director, error, warn, Constants, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3, _crd, ccclass, property, AudioManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfConstants(extras) {
    _reporterNs.report("Constants", "../utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSettingsData(extras) {
    _reporterNs.report("SettingsData", "../data/SettingsData", _context.meta, extras);
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
      AudioClip = _cc.AudioClip;
      AudioSource = _cc.AudioSource;
      resources = _cc.resources;
      director = _cc.director;
      error = _cc.error;
      warn = _cc.warn;
    }, function (_unresolved_2) {
      Constants = _unresolved_2.Constants;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "284b1f7WbdBRLExYXbrxaG9", "AudioManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'AudioClip', 'AudioSource', 'resources', 'director', 'error', 'warn', 'log', 'CCBoolean']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("AudioManager", AudioManager = (_dec = ccclass('AudioManager'), _dec2 = property({
        type: AudioSource,
        tooltip: "AudioSource component for background music (looping)"
      }), _dec3 = property({
        type: AudioSource,
        tooltip: "AudioSource component for sound effects (non-looping)"
      }), _dec(_class = (_class2 = (_class3 = class AudioManager extends Component {
        constructor() {
          super(...arguments);

          // --- Editor Properties ---
          // Assign these in the Cocos Creator Editor Inspector panel by dragging AudioSource components here.
          // If left null, the script will attempt to add them in onLoad.
          _initializerDefineProperty(this, "bgmSource", _descriptor, this);

          _initializerDefineProperty(this, "sfxSource", _descriptor2, this);

          // --- Private State ---
          this._audioClips = new Map();
          this._isInitialized = false;
          this._isLoading = false;
          // Prevent concurrent loading
          this._isBgmEnabled = true;
          this._isSfxEnabled = true;
          this._currentBgmName = null;
        }

        static get instance() {
          if (!this._instance) {
            // This error indicates the AudioManagerNode hasn't been loaded or initialized yet.
            error("[AudioManager] Instance requested before initialization or node doesn't exist.");
          } // The '!' asserts that _instance is non-null, assuming proper setup.


          return this._instance;
        }

        // Track the currently intended BGM
        // --- Lifecycle Callbacks ---
        onLoad() {
          console.log('[AudioManager] onLoad'); // Implement Singleton pattern

          if (AudioManager._instance && AudioManager._instance !== this) {
            warn('[AudioManager] Another instance already exists. Destroying this one.');
            this.destroy();
            return;
          }

          AudioManager._instance = this; // Make this node persistent across scene changes (if your game has multiple scenes)
          // If it's a single-scene game, this might not be strictly necessary but doesn't hurt.

          if (this.node.parent) {
            // Avoid error if it's already a root node somehow
            director.addPersistRootNode(this.node);
            console.log('[AudioManager] Node made persistent.');
          } // Ensure AudioSource components exist if not assigned in editor


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
            var sources = this.node.getComponents(AudioSource);
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

        onDestroy() {
          console.log('[AudioManager] onDestroy');

          if (AudioManager._instance === this) {
            AudioManager._instance = null; // Consider stopping audio explicitly here if needed, though components usually handle it.
            // if (this.bgmSource) this.bgmSource.stop();
            // if (this.sfxSource) this.sfxSource.stop(); // Might cut off last SFX
          }
        } // --- Public Initialization Method ---

        /**
         * Initializes the AudioManager, loads audio assets, and applies initial settings.
         * Should be called once during game startup after settings are loaded.
         * @param initialSettings The initial sound settings (BGM/SFX enabled state).
         */


        initialize(initialSettings) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this._isInitialized) {
              warn('[AudioManager] Already initialized.');
              return;
            }

            if (_this._isLoading) {
              warn('[AudioManager] Initialization already in progress.');
              return;
            }

            console.log('[AudioManager] Initializing...');
            _this._isLoading = true;
            _this._isBgmEnabled = initialSettings.bgmEnabled;
            _this._isSfxEnabled = initialSettings.sfxEnabled;
            console.log("[AudioManager] Initial settings - BGM: " + _this._isBgmEnabled + ", SFX: " + _this._isSfxEnabled);

            try {
              yield _this.loadAudioAssets();
              _this._isInitialized = true;
              console.log('[AudioManager] Initialized successfully.'); // Automatically play BGM if it was enabled and loaded

              if (_this._isBgmEnabled) {
                _this.playBGM((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                  error: Error()
                }), Constants) : Constants).AudioClipName.BGM); // Specify the default BGM

              }
            } catch (err) {
              error('[AudioManager] Initialization failed during audio loading.', err); // Handle initialization failure if necessary
            } finally {
              _this._isLoading = false;
            }
          })();
        } // --- Asset Loading ---

        /**
         * Loads all audio clips defined in Constants.AudioClipName.
         * Assumes clips are located in 'assets/resources/audio/'.
         */


        loadAudioAssets() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            console.log('[AudioManager] Starting audio asset loading...');
            var clipNames = Object.values((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
              error: Error()
            }), Constants) : Constants).AudioClipName);
            var loadPromises = [];

            _this2._audioClips.clear(); // Clear previous clips if any


            var _loop = function* _loop(name) {
              // Path relative to the 'resources' folder
              var path = "audio/" + name;
              loadPromises.push(new Promise((resolve, reject) => {
                resources.load(path, AudioClip, (err, clip) => {
                  if (err) {
                    error("[AudioManager] Failed to load audio clip: " + path, err); // Decide if loading failure for one clip is critical
                    // For now, we just console.log the error and continue

                    resolve(); // Resolve even on error to not block Promise.all entirely
                  } else if (clip) {
                    _this2._audioClips.set(name, clip);

                    console.log("[AudioManager] Loaded audio clip: " + path);
                    resolve();
                  } else {
                    error("[AudioManager] Loaded audio clip is null: " + path);
                    resolve();
                  }
                });
              }));
            };

            for (var name of clipNames) {
              yield* _loop(name);
            }

            yield Promise.all(loadPromises);
            console.log("[AudioManager] Audio asset loading finished. Loaded " + _this2._audioClips.size + " clips.");
          })();
        } // --- Settings Control ---

        /**
         * Updates the enabled state for Background Music (BGM).
         * Automatically plays or stops the current BGM based on the new state.
         * @param enabled True to enable BGM, false to disable.
         */


        setBgmEnabled(enabled) {
          if (this._isBgmEnabled === enabled) return; // No change

          this._isBgmEnabled = enabled;
          console.log("[AudioManager] Set BGM Enabled: " + enabled);

          if (!this._isInitialized) {
            warn('[AudioManager] setBgmEnabled called before initialization.');
            return;
          }

          if (enabled) {
            if (this._currentBgmName) {
              this.playBGM(this._currentBgmName);
            } else {
              this.playBGM((_crd && Constants === void 0 ? (_reportPossibleCrUseOfConstants({
                error: Error()
              }), Constants) : Constants).AudioClipName.BGM);
            }
          } else {
            this.stopBGM();
          }
        }
        /**
         * Updates the enabled state for Sound Effects (SFX).
         * @param enabled True to enable SFX, false to disable.
         */


        setSfxEnabled(enabled) {
          if (this._isSfxEnabled === enabled) return; // No change

          this._isSfxEnabled = enabled;
          console.log("[AudioManager] Set SFX Enabled: " + enabled);

          if (!this._isInitialized) {
            warn('[AudioManager] setSfxEnabled called before initialization.');
            return;
          } // No immediate action needed, just prevents future SFX plays if disabled.

        } // --- Playback Control ---

        /**
         * Plays the specified background music clip. Stops any currently playing BGM first.
         * Does nothing if BGM is disabled or AudioManager is not initialized.
         * @param clipName The name of the BGM clip (from Constants.AudioClipName).
         */


        playBGM(clipName) {
          if (!this._isInitialized || !this._isBgmEnabled || !this.bgmSource) {
            // console.log(`[AudioManager] BGM play skipped. Initialized: ${this._isInitialized}, Enabled: ${this._isBgmEnabled}`);
            return;
          }

          var clip = this._audioClips.get(clipName);

          if (!clip) {
            warn("[AudioManager] BGM clip '" + clipName + "' not found or not loaded.");
            return;
          } // If the requested BGM is already playing, do nothing.


          if (this.bgmSource.clip === clip && this.bgmSource.playing) {
            // console.log(`[AudioManager] BGM '${clipName}' is already playing.`);
            return;
          }

          console.log("[AudioManager] Playing BGM: " + clipName);
          this.bgmSource.stop(); // Stop previous BGM if any

          this.bgmSource.clip = clip;
          this.bgmSource.play();
          this._currentBgmName = clipName; // Remember which BGM should be playing
        }
        /**
         * Stops the currently playing background music.
         */


        stopBGM() {
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


        pauseBGM() {
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


        resumeBGM() {
          if (!this._isInitialized || !this._isBgmEnabled || !this.bgmSource) return;

          if (this._currentBgmName && !this.bgmSource.playing) {
            var clip = this._audioClips.get(this._currentBgmName);

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


        playSFX(clipName, volume) {
          if (volume === void 0) {
            volume = 1.0;
          }

          if (!this._isInitialized || !this._isSfxEnabled || !this.sfxSource) {
            // console.log(`[AudioManager] SFX play skipped. Initialized: ${this._isInitialized}, Enabled: ${this._isSfxEnabled}`);
            return;
          }

          var clip = this._audioClips.get(clipName);

          if (clip) {
            // Use playOneShot for sound effects. It allows overlapping sounds
            // and doesn't interfere with the main AudioSource state (like clip or loop).
            this.sfxSource.playOneShot(clip, volume); // console.log(`[AudioManager] Playing SFX: ${clipName}`); // Logging every SFX can be noisy
          } else {
            warn("[AudioManager] SFX clip '" + clipName + "' not found or not loaded.");
          }
        }
        /**
         * Retrieves a loaded AudioClip by name.
         * @param clipName The name of the clip.
         * @returns The AudioClip if loaded, otherwise undefined.
         */


        getAudioClip(clipName) {
          return this._audioClips.get(clipName);
        }

      }, _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmSource", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfxSource", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=96f5f4b43f0cef87632b0345579e22856f2ba5bd.js.map