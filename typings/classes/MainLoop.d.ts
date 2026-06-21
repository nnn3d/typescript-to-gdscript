// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for the game's main loop. */
declare class MainLoop extends GodotObject {
  /** Called before the program exits. */
  _finalize(): void;
  /** Called once during initialization. */
  _initialize(): void;
  /**
   * Called each physics tick. `delta` is the logical time between physics ticks in seconds and is equal to {@link Engine.time_scale} / {@link Engine.physics_ticks_per_second}. Equivalent to {@link Node._physics_process}.
   * If implemented, the method must return a boolean value. `true` ends the main loop, while `false` lets it proceed to the next step.
   * **Note:** {@link _physics_process} may be called up to {@link Engine.max_physics_steps_per_frame} times per (idle) frame. This step limit may be reached when the engine is suffering performance issues.
   * **Note:** Accumulated `delta` may diverge from real world seconds.
   */
  _physics_process(delta: float): boolean;
  /**
   * Called on each idle frame, prior to rendering, and after physics ticks have been processed. `delta` is the time between frames in seconds. Equivalent to {@link Node._process}.
   * If implemented, the method must return a boolean value. `true` ends the main loop, while `false` lets it proceed to the next frame.
   * **Note:** When the engine is struggling and the frame rate is lowered, `delta` will increase. When `delta` is increased, it's capped at a maximum of {@link Engine.time_scale} * {@link Engine.max_physics_steps_per_frame} / {@link Engine.physics_ticks_per_second}. As a result, accumulated `delta` may not represent real world time.
   * **Note:** When `--fixed-fps` is enabled or the engine is running in Movie Maker mode (see {@link MovieWriter}), process `delta` will always be the same for every frame, regardless of how much time the frame took to render.
   * **Note:** Frame delta may be post-processed by {@link OS.delta_smoothing} if this is enabled for the project.
   */
  _process(delta: float): boolean;

  /** Emitted when a user responds to a permission request. */
  on_request_permissions_result: Signal<[string, boolean]>;

  /**
   * Notification received from the OS when the application is exceeding its allocated memory.
   * Specific to the iOS platform.
   */
  static readonly NOTIFICATION_OS_MEMORY_WARNING: int;
  /**
   * Notification received when translations may have changed. Can be triggered by the user changing the locale. Can be used to respond to language changes, for example to change the UI strings on the fly. Useful when working with the built-in translation support, like {@link Object.tr}.
   */
  static readonly NOTIFICATION_TRANSLATION_CHANGED: int;
  /**
   * Notification received from the OS when a request for "About" information is sent.
   * Specific to the macOS platform.
   */
  static readonly NOTIFICATION_WM_ABOUT: int;
  /**
   * Notification received from Godot's crash handler when the engine is about to crash.
   * Implemented on desktop platforms if the crash handler is enabled.
   */
  static readonly NOTIFICATION_CRASH: int;
  /**
   * Notification received from the OS when an update of the Input Method Engine occurs (e.g. change of IME cursor position or composition string).
   * Implemented on desktop and web platforms.
   */
  static readonly NOTIFICATION_OS_IME_UPDATE: int;
  /**
   * Notification received from the OS when the application is resumed.
   * Specific to the Android and iOS platforms.
   */
  static readonly NOTIFICATION_APPLICATION_RESUMED: int;
  /**
   * Notification received from the OS when the application is paused.
   * Specific to the Android and iOS platforms.
   * **Note:** On iOS, you only have approximately 5 seconds to finish a task started by this signal. If you go over this allotment, iOS will kill the app instead of pausing it.
   */
  static readonly NOTIFICATION_APPLICATION_PAUSED: int;
  /**
   * Notification received from the OS when the application is focused, i.e. when changing the focus from the OS desktop or a thirdparty application to any open window of the Godot instance.
   * Implemented on desktop and mobile platforms.
   */
  static readonly NOTIFICATION_APPLICATION_FOCUS_IN: int;
  /**
   * Notification received from the OS when the application is defocused, i.e. when changing the focus from any open window of the Godot instance to the OS desktop or a thirdparty application.
   * Implemented on desktop and mobile platforms.
   */
  static readonly NOTIFICATION_APPLICATION_FOCUS_OUT: int;
  /** Notification received when text server is changed. */
  static readonly NOTIFICATION_TEXT_SERVER_CHANGED: int;
  /** Notification received when the application enters picture-in-picture mode. */
  static readonly NOTIFICATION_APPLICATION_PIP_MODE_ENTERED: int;
  /** Notification received when the application exits picture-in-picture mode. */
  static readonly NOTIFICATION_APPLICATION_PIP_MODE_EXITED: int;
}
