// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Stores globally-accessible variables. */
declare interface ProjectSettings {
  /**
   * Accessibility driver:
   * -**accesskit** (default): AccessKit driver.
   * -**dummy**: Dummy driver, screen reader support is disabled.
   */
  'accessibility/general/accessibility_driver': string;
  /**
   * Accessibility support mode:
   * - **Auto** (`0`): Accessibility support is enabled, but updates to the accessibility information are processed only if an assistive app (such as a screen reader or a Braille display) is active (default).
   * - **Always Active** (`1`): Accessibility support is enabled, and updates to the accessibility information are always processed, regardless of the status of assistive apps.
   * - **Disabled** (`2`): Accessibility support is fully disabled.
   * **Note:** Accessibility debugging tools, such as Accessibility Insights for Windows, Accessibility Inspector (macOS), or AT-SPI Browser (Linux/BSD), do not count as assistive apps. To test your project with these tools, use **Always Active**.
   */
  'accessibility/general/accessibility_support': int;
  /** The number of accessibility information updates per second. */
  'accessibility/general/updates_per_second': int;
  /**
   * If `true`, {@link MeshInstance3D.skeleton} will point to the parent node (`..`) by default, which was the behavior before Godot 4.6. It's recommended to keep this setting disabled unless the old behavior is needed for compatibility.
   * **Note:** If you disable this option in an existing project, it's strongly recommended to use the `Project > Tools > Upgrade Project Files...` option to ensure existing scenes do not break.
   */
  'animation/compatibility/default_parent_skeleton_in_mesh_instance_3d': boolean;
  /**
   * If `true`, {@link AnimationMixer} prints the warning of interpolation being forced to choose the shortest rotation path due to multiple angle interpolation types being mixed in the {@link AnimationMixer} cache.
   */
  'animation/warnings/check_angle_interpolation_type_conflicting': boolean;
  /**
   * If `true`, {@link AnimationMixer} prints the warning of no matching object of the track path in the scene.
   */
  'animation/warnings/check_invalid_track_paths': boolean;
  /** Background color for the boot splash. */
  'application/boot_splash/bg_color': Color;
  /**
   * Path to an image used as the boot splash. If left empty, the default Godot Engine splash will be displayed instead.
   * **Note:** Only effective if {@link application/boot_splash/show_image} is `true`.
   * **Note:** The only supported format is PNG. Using another image format will result in an error.
   * **Note:** The image will also show when opening the project in the editor. If you want to display the default splash image in the editor, add an empty override for `editor_hint` feature.
   */
  'application/boot_splash/image': string;
  /**
   * Minimum boot splash display time (in milliseconds). It is not recommended to set too high values for this setting.
   */
  'application/boot_splash/minimum_display_time': int;
  /**
   * If `true`, displays the image specified in {@link application/boot_splash/image} when the engine starts. If `false`, only displays the plain color specified in {@link application/boot_splash/bg_color}.
   */
  'application/boot_splash/show_image': boolean;
  /**
   * Specifies how the splash image will be stretched. For the original size without stretching, set to disabled. See {@link RenderingServer.SplashStretchMode} constants for more information.
   */
  'application/boot_splash/stretch_mode': int;
  /**
   * If `true`, applies linear filtering when scaling the image (recommended for high-resolution artwork). If `false`, uses nearest-neighbor interpolation (recommended for pixel art).
   */
  'application/boot_splash/use_filter': boolean;
  /** If `true`, the application automatically accepts quitting requests. */
  'application/config/auto_accept_quit': boolean;
  /**
   * This user directory is used for storing persistent data (`user://` filesystem). If a custom directory name is defined, this name will be appended to the system-specific user data directory (same parent folder as the Godot configuration folder documented in {@link OS.get_user_data_dir}).
   * The {@link application/config/use_custom_user_dir} setting must be enabled for this to take effect.
   * **Note:** If {@link application/config/custom_user_dir_name} contains trailing periods, they will be stripped as folder names ending with a period are not allowed on Windows.
   */
  'application/config/custom_user_dir_name': string;
  /** The project's description, displayed as a tooltip in the Project Manager when hovering the project. */
  'application/config/description': string;
  /**
   * If `true`, disables loading of project settings overrides (file defined in {@link application/config/project_settings_override} and `res://override.cfg`) and related CLI arguments.
   */
  'application/config/disable_project_settings_override': boolean;
  /**
   * Icon used for the project, set when project loads. Exporters will also use this icon as a fallback if necessary.
   */
  'application/config/icon': string;
  /**
   * Icon set in `.icns` format used on macOS to set the game's icon. This is done automatically on start by calling {@link DisplayServer.set_native_icon}.
   */
  'application/config/macos_native_icon': string;
  /**
   * The project's name. It is used both by the Project Manager and by exporters. The project name can be translated by translating its value in localization files. The window title will be set to match the project name automatically on startup.
   * **Note:** Changing this value will also change the user data folder's path if {@link application/config/use_custom_user_dir} is `false`. After renaming the project, you will no longer be able to access existing data in `user://` unless you rename the old folder to match the new project name. See Data paths ($DOCS_URL/tutorials/io/data_paths.html) in the documentation for more information.
   */
  'application/config/name': string;
  /**
   * Translations of the project's name. This setting is used by OS tools to translate application name on Android, iOS and macOS.
   * **Note:** When left empty, the application name is translated using the project translations.
   */
  'application/config/name_localized': Dictionary;
  /**
   * Specifies a file to override project settings. For example: `user://custom_settings.cfg`. See "Overriding" in the {@link ProjectSettings} class description at the top for more information.
   * **Note:** Regardless of this setting's value, `res://override.cfg` will still be read to override the project settings.
   */
  'application/config/project_settings_override': string;
  /**
   * If `true`, the application quits automatically when navigating back (e.g. using the system "Back" button on Android).
   */
  'application/config/quit_on_go_back': boolean;
  /**
   * If `true`, the project will save user data to its own user directory. If {@link application/config/custom_user_dir_name} is empty, `<OS user data directory>/<project name>` directory will be used. If `false`, the project will save user data to `<OS user data directory>/Godot/app_userdata/<project name>`.
   * See also File paths in Godot projects ($DOCS_URL/tutorials/io/data_paths.html#accessing-persistent-user-data-user). This setting is only effective on desktop platforms.
   */
  'application/config/use_custom_user_dir': boolean;
  /**
   * If `true`, the project will use a hidden directory (`.godot`) for storing project-specific data (metadata, shader cache, etc.).
   * If `false`, a non-hidden directory (`godot`) will be used instead.
   * **Note:** Restart the application after changing this setting.
   * **Note:** Changing this value can help on platforms or with third-party tools where hidden directory patterns are disallowed. Only modify this setting if you know that your environment requires it, as changing the default can impact compatibility with some external tools or plugins which expect the default `.godot` folder.
   */
  'application/config/use_hidden_project_data_directory': boolean;
  /**
   * The project's human-readable version identifier. This is used by exporters if the version identifier isn't overridden there. If {@link application/config/version} is an empty string and the version identifier isn't overridden in an exporter, the exporter will use `1.0.0` as a version identifier.
   */
  'application/config/version': string;
  /**
   * Icon set in `.ico` format used on Windows to set the game's icon. This is done automatically on start by calling {@link DisplayServer.set_native_icon}.
   */
  'application/config/windows_native_icon': string;
  /**
   * Time samples for frame deltas are subject to random variation introduced by the platform, even when frames are displayed at regular intervals thanks to V-Sync. This can lead to jitter. Delta smoothing can often give a better result by filtering the input deltas to correct for minor fluctuations from the refresh rate.
   * **Note:** Delta smoothing is only attempted when {@link display/window/vsync/vsync_mode} is set to `enabled`, as it does not work well without V-Sync.
   * It may take several seconds at a stable frame rate before the smoothing is initially activated. It will only be active on machines where performance is adequate to render frames at the refresh rate.
   */
  'application/run/delta_smoothing': boolean;
  /**
   * If `true`, disables printing to standard error. If `true`, this also hides error and warning messages printed by {@link @GlobalScope.push_error} and {@link @GlobalScope.push_warning}. See also {@link application/run/disable_stdout}.
   * Changes to this setting will only be applied upon restarting the application. To control this at runtime, use {@link Engine.print_error_messages}.
   */
  'application/run/disable_stderr': boolean;
  /**
   * If `true`, disables printing to standard output. This is equivalent to starting the editor or project with the `--quiet` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html). See also {@link application/run/disable_stderr}.
   * Changes to this setting will only be applied upon restarting the application. To control this at runtime, use {@link Engine.print_to_stdout}.
   */
  'application/run/disable_stdout': boolean;
  /**
   * If `true`, allows the `Alt + Space` keys to display the window menu. This menu allows the user to perform various window management operations such as moving, resizing, or minimizing the window.
   * **Note:** When the menu is displayed, project execution will pause until the menu is *fully* closed due to Windows behavior. Consider this when enabling this setting in a networked multiplayer game. The menu is only considered fully closed when an option is selected, when the user clicks outside, or when `Escape` is pressed after bringing up the window menu *and* another key is pressed afterwards.
   * **Note:** This setting is implemented only on Windows.
   */
  'application/run/enable_alt_space_menu': boolean;
  /**
   * If `true`, flushes the standard output stream every time a line is printed. This affects both terminal logging and file logging.
   * When running a project, this setting must be enabled if you want logs to be collected by service managers such as systemd/journalctl. This setting is disabled by default on release builds, since flushing on every printed line will negatively affect performance if lots of lines are printed in a rapid succession. Also, if this setting is enabled, logged files will still be written successfully if the application crashes or is otherwise killed by the user (without being closed "normally").
   * **Note:** Regardless of this setting, the standard error stream (`stderr`) is always flushed when a line is printed to it.
   * Changes to this setting will only be applied upon restarting the application.
   */
  'application/run/flush_stdout_on_print': boolean;
  /**
   * Debug build override for {@link application/run/flush_stdout_on_print}, as performance is less important during debugging.
   * Changes to this setting will only be applied upon restarting the application.
   */
  'application/run/flush_stdout_on_print.debug': boolean;
  /**
   * Forces a *constant* delay between frames in the main loop (in milliseconds). In most situations, {@link application/run/max_fps} should be preferred as an FPS limiter as it's more precise.
   * This setting can be overridden using the `--frame-delay <ms;>` command line argument.
   */
  'application/run/frame_delay_msec': int;
  /**
   * If `true`, loads the default shell and copies environment variables set by the shell startup scripts to the app environment.
   * **Note:** This setting is implemented on macOS for non-sandboxed applications only.
   */
  'application/run/load_shell_environment': boolean;
  /**
   * If `true`, enables low-processor usage mode. When enabled, the engine takes longer to redraw, but only redraws the screen if necessary. This may lower power consumption, and is intended for editors or mobile applications. For most games, because the screen needs to be redrawn every frame, it is recommended to keep this setting disabled.
   */
  'application/run/low_processor_mode': boolean;
  /**
   * Amount of sleeping between frames when the low-processor usage mode is enabled (in microseconds). Higher values will result in lower CPU usage.
   */
  'application/run/low_processor_mode_sleep_usec': int;
  /** The name of the type implementing the engine's main loop. */
  'application/run/main_loop_type': string;
  /** Path to the main scene file that will be loaded when the project runs. */
  'application/run/main_scene': string;
  /**
   * Maximum number of frames per second allowed. A value of `0` means "no limit". The actual number of frames per second may still be below this value if the CPU or GPU cannot keep up with the project logic and rendering.
   * Limiting the FPS can be useful to reduce system power consumption, which reduces heat and noise emissions (and improves battery life on mobile devices).
   * If {@link display/window/vsync/vsync_mode} is set to `Enabled` or `Adaptive`, it takes precedence and the forced FPS number cannot exceed the monitor's refresh rate. See also {@link DisplayServer.screen_get_refresh_rate}.
   * If {@link display/window/vsync/vsync_mode} is `Enabled`, on monitors with variable refresh rate enabled (G-Sync/FreeSync), using an FPS limit slightly lower than the monitor's refresh rate will reduce input lag while avoiding tearing (https://blurbusters.com/howto-low-lag-vsync-on/). At higher refresh rates, the difference between the FPS limit and the monitor refresh rate should be increased to ensure frames to account for timing inaccuracies. The optimal formula for the FPS limit value in this scenario is `r - (r * r) / 3600.0`, where `r` is the monitor's refresh rate.
   * If {@link display/window/vsync/vsync_mode} is `Disabled`, limiting the FPS to a high value that can be consistently reached on the system can reduce input lag compared to an uncapped framerate. Since this works by ensuring the GPU load is lower than 100%, this latency reduction is only effective in GPU-bottlenecked scenarios, not CPU-bottlenecked scenarios.
   * See also {@link physics/common/physics_ticks_per_second}.
   * This setting can be overridden using the `--max-fps <fps>` command line argument (including with a value of `0` for unlimited framerate).
   * **Note:** This property is only read when the project starts. To change the rendering FPS cap at runtime, set {@link Engine.max_fps} instead.
   */
  'application/run/max_fps': int;
  /**
   * If `true`, the engine header is printed in the console on startup. This header describes the current version of the engine, as well as the renderer being used. This behavior can also be disabled on the command line with the `--no-header` option.
   */
  'application/run/print_header': boolean;
  /**
   * Audio buses will disable automatically when sound goes below a given dB threshold for a given time. This saves CPU as effects assigned to that bus will no longer do any processing.
   */
  'audio/buses/channel_disable_threshold_db': float;
  /**
   * Audio buses will disable automatically when sound goes below a given dB threshold for a given time. This saves CPU as effects assigned to that bus will no longer do any processing.
   */
  'audio/buses/channel_disable_time': float;
  /** Default {@link AudioBusLayout} resource file to use in the project, unless overridden by the scene. */
  'audio/buses/default_bus_layout': string;
  /**
   * Specifies the audio driver to use. This setting is platform-dependent as each platform supports different audio drivers. If left empty, the default audio driver will be used.
   * The `Dummy` audio driver disables all audio playback and recording, which is useful for non-game applications as it reduces CPU usage. It also prevents the engine from appearing as an application playing audio in the OS' audio mixer.
   * To query the value that is being used at run-time (which may be overridden by command-line arguments or headless mode), use {@link AudioServer.get_driver_name}.
   * **Note:** The driver in use can be overridden at runtime via the `--audio-driver` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  'audio/driver/driver': string;
  /**
   * If `true`, microphone input will be allowed. This requires appropriate permissions to be set when exporting to Android or iOS.
   * **Note:** If the operating system blocks access to audio input devices (due to the user's privacy settings), audio capture will only return silence. On Windows, make sure that apps are allowed to access the microphone in the OS' privacy settings.
   */
  'audio/driver/enable_input': boolean;
  /**
   * Target mixing rate used for audio (in Hz). In general, it's better to not touch this and leave it to the host operating system.
   * **Note:** On iOS and macOS, mixing rate is determined by audio driver, this value is ignored.
   * **Note:** Input and output mixing rates might be different. Use {@link AudioServer.get_mix_rate} and {@link AudioServer.get_input_mix_rate} to get actual values.
   */
  'audio/driver/mix_rate': int;
  /**
   * Safer override for {@link audio/driver/mix_rate} in the Web platform. Here `0` means "let the browser choose" (since some browsers do not like forcing the mix rate).
   */
  'audio/driver/mix_rate.web': int;
  /**
   * Specifies the preferred output latency in milliseconds for audio. Lower values will result in lower audio latency at the cost of increased CPU usage. Low values may result in audible crackling on slower hardware.
   * Audio output latency may be constrained by the host operating system and audio hardware drivers. If the host can not provide the specified audio output latency then Godot will attempt to use the nearest latency allowed by the host. As such you should always use {@link AudioServer.get_output_latency} to determine the actual audio output latency.
   * Audio output latency can be overridden using the `--audio-output-latency <ms>` command line argument.
   * **Note:** This setting is ignored on Android.
   */
  'audio/driver/output_latency': int;
  /**
   * Safer override for {@link audio/driver/output_latency} in the Web platform, to avoid audio issues especially on mobile devices.
   */
  'audio/driver/output_latency.web': int;
  /**
   * The base strength of the panning effect for all {@link AudioStreamPlayer2D} nodes. The panning strength can be further scaled on each Node using {@link AudioStreamPlayer2D.panning_strength}. A value of `0.0` disables stereo panning entirely, leaving only volume attenuation in place. A value of `1.0` completely mutes one of the channels if the sound is located exactly to the left (or right) of the listener.
   * The default value of `0.5` is tuned for headphones. When using speakers, you may find lower values to sound better as speakers have a lower stereo separation compared to headphones.
   */
  'audio/general/2d_panning_strength': float;
  /**
   * The base strength of the panning effect for all {@link AudioStreamPlayer3D} nodes. The panning strength can be further scaled on each Node using {@link AudioStreamPlayer3D.panning_strength}. A value of `0.0` disables stereo panning entirely, leaving only volume attenuation in place. A value of `1.0` completely mutes one of the channels if the sound is located exactly to the left (or right) of the listener.
   * The default value of `0.5` is tuned for headphones which means that the opposite side channel goes no lower than 50% of the volume of the nearside channel. You may find that you can set this value higher for speakers to have the same effect since both ears can hear from each speaker.
   */
  'audio/general/3d_panning_strength': float;
  /**
   * Specifies the default playback type of the platform.
   * The default value is set to **Stream**, as most platforms have no issues mixing streams.
   */
  'audio/general/default_playback_type': int;
  /**
   * Specifies the default playback type of the Web platform.
   * The default value is set to **Sample** as the Web platform is not suited to mix audio streams outside of the Web Audio API, especially when exporting a single-threaded game. **Sample** allows for lower latency on the web platform at the cost of flexibility ({@link AudioEffect}s are not supported).
   * **Warning:** Forcing **Stream** on the Web platform may cause high audio latency and crackling, especially when exporting a multi-threaded game.
   */
  'audio/general/default_playback_type.web': int;
  /**
   * Sets the mixWithOthers (https://developer.apple.com/documentation/avfaudio/avaudiosession/categoryoptions/1616611-mixwithothers) option for the AVAudioSession on iOS. This will override the mix behavior, if the category is set to `Play and Record`, `Playback`, or `Multi Route`.
   * `Ambient` always has this set per default.
   */
  'audio/general/ios/mix_with_others': boolean;
  /**
   * Sets the AVAudioSessionCategory (https://developer.apple.com/documentation/avfaudio/avaudiosessioncategory) on iOS. Use the `Playback` category to get sound output, even if the phone is in silent mode.
   */
  'audio/general/ios/session_category': int;
  /**
   * If `true`, text-to-speech support is enabled on startup, otherwise it is enabled the first time any TTS method is used. See also {@link DisplayServer.tts_get_voices} and {@link DisplayServer.tts_speak}.
   * **Note:** Enabling TTS can cause additional idle CPU usage and interfere with the sleep mode, so consider disabling it if TTS is not used.
   */
  'audio/general/text_to_speech': boolean;
  /**
   * Setting to hardcode audio delay when playing video. Best to leave this unchanged unless you know what you are doing.
   */
  'audio/video/video_delay_compensation_ms': int;
  /**
   * If `true`, ambient lights will be imported from COLLADA models as {@link DirectionalLight3D}. If `false`, ambient lights will be ignored.
   */
  'collada/use_ambient': boolean;
  /**
   * The default compression level for gzip. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. `-1` uses the default gzip compression level, which is identical to `6` but could change in the future due to underlying zlib updates.
   */
  'compression/formats/gzip/compression_level': int;
  /**
   * The default compression level for Zlib. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level. `-1` uses the default gzip compression level, which is identical to `6` but could change in the future due to underlying zlib updates.
   */
  'compression/formats/zlib/compression_level': int;
  /**
   * The default compression level for Zstandard. Affects compressed scenes and resources. Higher levels result in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression level.
   */
  'compression/formats/zstd/compression_level': int;
  /** Enables long-distance matching (https://github.com/facebook/zstd/releases/tag/v1.3.2) in Zstandard. */
  'compression/formats/zstd/long_distance_matching': boolean;
  /**
   * Largest size limit (in power of 2) allowed when compressing using long-distance matching with Zstandard. Higher values can result in better compression, but will require more memory when compressing and decompressing.
   */
  'compression/formats/zstd/window_log_size': int;
  /**
   * If canvas item redraw debugging is active, this color will be flashed on canvas items when they redraw.
   */
  'debug/canvas_items/debug_redraw_color': Color;
  /**
   * If canvas item redraw debugging is active, this will be the time the flash will last each time they redraw.
   */
  'debug/canvas_items/debug_redraw_time': float;
  /**
   * If `true`, logs all output and error messages to files. See also {@link debug/file_logging/log_path}, {@link debug/file_logging/max_log_files}, and {@link application/run/flush_stdout_on_print}.
   */
  'debug/file_logging/enable_file_logging': boolean;
  /**
   * Desktop override for {@link debug/file_logging/enable_file_logging}, as log files are not readily accessible on mobile/Web platforms.
   */
  'debug/file_logging/enable_file_logging.pc': boolean;
  /**
   * Path at which to store log files for the project. Using a path under `user://` is recommended.
   * This can be specified manually on the command line using the `--log-file <file>` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html). If this command line argument is specified, log rotation is automatically disabled (see {@link debug/file_logging/max_log_files}).
   */
  'debug/file_logging/log_path': string;
  /**
   * Specifies the maximum number of log files allowed (used for rotation). Set to `1` to disable log file rotation.
   * If the `--log-file <file>` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html) is used, log rotation is always disabled.
   */
  'debug/file_logging/max_log_files': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an `assert` call always evaluates to `false`.
   */
  'debug/gdscript/warnings/assert_always_false': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an `assert` call always evaluates to `true`.
   */
  'debug/gdscript/warnings/assert_always_true': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a local variable captured by a lambda is reassigned, since this does not modify the outer local variable.
   */
  'debug/gdscript/warnings/confusable_capture_reassignment': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an identifier contains characters that can be confused with something else, like when mixing different alphabets.
   */
  'debug/gdscript/warnings/confusable_identifier': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an identifier declared in the nested block has the same name as an identifier declared below in the parent block.
   */
  'debug/gdscript/warnings/confusable_local_declaration': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an identifier that will be shadowed below in the block is used.
   */
  'debug/gdscript/warnings/confusable_local_usage': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when deprecated keywords are used.
   * **Note:** There are currently no deprecated keywords, so this warning is never produced.
   */
  'debug/gdscript/warnings/deprecated_keyword': int;
  /**
   * The rules for including or excluding scripts when generating warnings, as a dictionary. Each rule is an entry consisting of a directory path (key) and a decision (value). When trying to generate a warning, the GDScript parser chooses the most specific rule, i.e. the most nested directory containing the script. If the decision is **Exclude**, warnings are not generated for this script. If the decision is **Include** or the script doesn't satisfy any of the rules, the warning configuration specified in the Project Settings is applied.
   * It is recommended to include your own addons/libraries, either project-specific or actively being developed at the moment. Third-party or project-agnostic addons/libraries should be excluded, as they may be incompatible with the project's warning configuration.
   * **Note:** It is not recommended to remove or change the rule for `"res://addons"` as the project's warning configuration may break third-party addons. Instead, consider including individual addons, if necessary.
   * **Note:** The editor does not check whether the specified paths are existing directories. It also does not automatically update these paths when directories are moved.
   */
  'debug/gdscript/warnings/directory_rules': Dictionary;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an empty file is parsed.
   */
  'debug/gdscript/warnings/empty_file': int;
  /**
   * If `true`, enables specific GDScript warnings (see `debug/gdscript/warnings/*` settings). If `false`, disables all GDScript warnings.
   */
  'debug/gdscript/warnings/enable': boolean;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a variable has an enum type but no explicit default value, but only if the enum does not contain `0` as a valid value.
   */
  'debug/gdscript/warnings/enum_variable_without_default': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when {@link Node.get_node} (or the shorthand `$`) is used as default value of a class variable without the `@onready` annotation.
   */
  'debug/gdscript/warnings/get_node_default_without_onready': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a ternary operator may emit values with incompatible types.
   */
  'debug/gdscript/warnings/incompatible_ternary': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a static inferred type uses a {@link Variant} as initial value, which makes the static type to also be Variant.
   */
  'debug/gdscript/warnings/inference_on_variant': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a variable, constant, or parameter has an implicitly inferred static type. In GDScript, type inference is performed by declaring a variable with `:=` instead of `=` and leaving out the type specifier. For example, `var x := 1` will *infer* the [int] type, while `var x: int = 1` explicitly declares the variable as [int].
   * **Note:** This warning is recommended *in addition* to {@link debug/gdscript/warnings/untyped_declaration} if you want to always specify the type explicitly. Having `INFERRED_DECLARATION` warning level higher than `UNTYPED_DECLARATION` warning level makes little sense and is not recommended.
   */
  'debug/gdscript/warnings/inferred_declaration': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when trying to use an integer as an enum without an explicit cast.
   */
  'debug/gdscript/warnings/int_as_enum_without_cast': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when trying to use an integer as an enum when there is no matching enum member for that numeric value.
   */
  'debug/gdscript/warnings/int_as_enum_without_match': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when dividing an integer by another integer (the decimal part will be discarded).
   */
  'debug/gdscript/warnings/integer_division': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling a coroutine without `await`.
   */
  'debug/gdscript/warnings/missing_await': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when the base class script has the `@tool` annotation, but the current class script does not have it.
   */
  'debug/gdscript/warnings/missing_tool': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when passing a floating-point value to a function that expects an integer (it will be converted and lose precision).
   */
  'debug/gdscript/warnings/narrowing_conversion': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a method in the script overrides a native method, because it may not behave as expected.
   */
  'debug/gdscript/warnings/native_method_override': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when the `@onready` annotation is used together with the `@export` annotation, since it may not behave as expected.
   */
  'debug/gdscript/warnings/onready_with_export': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a function that is not a coroutine is called with await.
   */
  'debug/gdscript/warnings/redundant_await': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when the `@static_unload` annotation is used in a script without any static variables.
   */
  'debug/gdscript/warnings/redundant_static_unload': int;
  /**
   * When enabled, using a property, enum, or function that was renamed since Godot 3 will produce a hint if an error occurs.
   */
  'debug/gdscript/warnings/renamed_in_godot_4_hint': boolean;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling a function without using its return value (by assigning it to a variable or using it as a function argument). These return values are sometimes used to indicate possible errors using the {@link Error} enum.
   */
  'debug/gdscript/warnings/return_value_discarded': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when defining a local or member variable, signal, or enum that would have the same name as a built-in function or global class name, thus shadowing it.
   */
  'debug/gdscript/warnings/shadowed_global_identifier': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a local variable or local constant shadows a member declared in the current class.
   */
  'debug/gdscript/warnings/shadowed_variable': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a local variable or local constant shadows a member declared in a base class.
   */
  'debug/gdscript/warnings/shadowed_variable_base_class': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling an expression that may have no effect on the surrounding code, such as writing `2 + 2` as a statement.
   */
  'debug/gdscript/warnings/standalone_expression': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling a ternary expression that may have no effect on the surrounding code, such as writing `42 if active else 0` as a statement.
   */
  'debug/gdscript/warnings/standalone_ternary': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling a static method from an instance of a class instead of from the class directly.
   */
  'debug/gdscript/warnings/static_called_on_instance': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when using a variable that wasn't previously assigned.
   */
  'debug/gdscript/warnings/unassigned_variable': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when assigning a variable using an assignment operator like `+=` if the variable wasn't previously assigned.
   */
  'debug/gdscript/warnings/unassigned_variable_op_assign': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when unreachable code is detected (such as after a `return` statement that will always be executed).
   */
  'debug/gdscript/warnings/unreachable_code': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when an unreachable `match` pattern is detected.
   */
  'debug/gdscript/warnings/unreachable_pattern': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when using an expression whose type may not be compatible with the function parameter expected.
   */
  'debug/gdscript/warnings/unsafe_call_argument': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a {@link Variant} value is cast to a non-Variant.
   */
  'debug/gdscript/warnings/unsafe_cast': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when calling a method whose presence is not guaranteed at compile-time in the class.
   */
  'debug/gdscript/warnings/unsafe_method_access': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when accessing a property whose presence is not guaranteed at compile-time in the class.
   */
  'debug/gdscript/warnings/unsafe_property_access': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when returning a call from a `void` function when such call cannot be guaranteed to be also `void`.
   */
  'debug/gdscript/warnings/unsafe_void_return': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a variable or parameter has no static type, or if a function has no static return type.
   * **Note:** This warning is recommended together with {@link EditorSettings.text_editor/completion/add_type_hints} to help achieve type safety.
   */
  'debug/gdscript/warnings/untyped_declaration': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a local constant is never used.
   */
  'debug/gdscript/warnings/unused_local_constant': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a function parameter is never used.
   */
  'debug/gdscript/warnings/unused_parameter': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a private member variable is never used.
   */
  'debug/gdscript/warnings/unused_private_class_variable': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a signal is declared but never explicitly used in the class.
   */
  'debug/gdscript/warnings/unused_signal': int;
  /**
   * When set to **Warn** or **Error**, produces a warning or an error respectively when a local variable is unused.
   */
  'debug/gdscript/warnings/unused_variable': int;
  /**
   * Message to be displayed before the backtrace when the engine crashes. By default, this message is only used in exported projects due to the editor-only override applied to this setting.
   */
  'debug/settings/crash_handler/message': string;
  /**
   * Editor-only override for {@link debug/settings/crash_handler/message}. Does not affect exported projects in debug or release mode.
   */
  'debug/settings/crash_handler/message.editor': string;
  /**
   * Whether GDScript call stacks will be tracked in release builds, thus allowing {@link Engine.capture_script_backtraces} to function.
   * **Note:** This setting has no effect on editor builds or debug builds, where GDScript call stacks are tracked regardless.
   */
  'debug/settings/gdscript/always_track_call_stacks': boolean;
  /**
   * Whether GDScript local variables will be tracked in all builds, including export builds, thus allowing {@link Engine.capture_script_backtraces} to capture them when enabling its `include_variables` parameter.
   * Enabling this comes at the cost of roughly 50 bytes of memory per local variable, for every compiled class in the entire project, so can be several MiB in larger projects.
   * **Note:** This setting has no effect when running the game from the editor, where GDScript local variables are tracked regardless.
   */
  'debug/settings/gdscript/always_track_local_variables': boolean;
  /** Maximum call stack allowed for debugging GDScript. */
  'debug/settings/gdscript/max_call_stack': int;
  /**
   * If `true`, enables warnings which can help pinpoint where nodes are being incorrectly updated, which will result in incorrect interpolation and visual glitches.
   * When a node is being interpolated, it is essential that the transform is set during {@link Node._physics_process} (during a physics tick) rather than {@link Node._process} (during a frame).
   */
  'debug/settings/physics_interpolation/enable_warnings': boolean;
  /** Maximum number of functions per frame allowed when profiling. */
  'debug/settings/profiler/max_functions': int;
  /** Maximum number of timestamp query elements allowed per frame for visual profiling. */
  'debug/settings/profiler/max_timestamp_query_elements': int;
  /** Print frames per second to standard output every second. */
  'debug/settings/stdout/print_fps': boolean;
  /**
   * Print GPU profile information to standard output every second. This includes how long each frame takes the GPU to render on average, broken down into different steps of the render pipeline, such as CanvasItems, shadows, glow, etc.
   */
  'debug/settings/stdout/print_gpu_profile': boolean;
  /**
   * Print more information to standard output when running. It displays information such as memory leaks, which scenes and resources are being loaded, etc. This can also be enabled using the `--verbose` or `-v` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html), even on an exported project. See also {@link OS.is_stdout_verbose} and {@link @GlobalScope.print_verbose}.
   */
  'debug/settings/stdout/verbose_stdout': boolean;
  /**
   * When set to `true`, produces a warning when the shader exceeds certain device limits. Currently, the only device limit checked is the limit on uniform buffer size. More device limits will be added in the future.
   */
  'debug/shader_language/warnings/device_limit_exceeded': boolean;
  /**
   * If `true`, enables specific shader warnings (see `debug/shader_language/warnings/*` settings). If `false`, disables all shader warnings.
   */
  'debug/shader_language/warnings/enable': boolean;
  /**
   * When set to `true`, produces a warning when two floating-point numbers are compared directly with the `==` operator or the `!=` operator.
   */
  'debug/shader_language/warnings/float_comparison': boolean;
  /**
   * When set to `true`, produces a warning upon encountering certain formatting errors. Currently this only checks for empty statements. More formatting errors may be added over time.
   */
  'debug/shader_language/warnings/formatting_error': boolean;
  /**
   * When set to `true`, produces a warning when the shader contains `POSITION = vec4(vertex,` as this was very common code written in Godot 4.2 and earlier that was paired with a QuadMesh to produce a full screen post processes pass. With the switch to reversed z in 4.3, this trick no longer works, as it implicitly relied on the `VERTEX.z` being 0.
   */
  'debug/shader_language/warnings/magic_position_write': boolean;
  /** When set to `true`, warnings are treated as errors. */
  'debug/shader_language/warnings/treat_warnings_as_errors': boolean;
  /** When set to `true`, produces a warning when a constant is never used. */
  'debug/shader_language/warnings/unused_constant': boolean;
  /** When set to `true`, produces a warning when a function is never used. */
  'debug/shader_language/warnings/unused_function': boolean;
  /** When set to `true`, produces a warning when a local variable is never used. */
  'debug/shader_language/warnings/unused_local_variable': boolean;
  /** When set to `true`, produces a warning when a struct is never used. */
  'debug/shader_language/warnings/unused_struct': boolean;
  /** When set to `true`, produces a warning when a uniform is never used. */
  'debug/shader_language/warnings/unused_uniform': boolean;
  /** When set to `true`, produces a warning when a varying is never used. */
  'debug/shader_language/warnings/unused_varying': boolean;
  /**
   * Color of the avoidance agents radius, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/agents_radius_color': Color;
  /** If enabled, displays avoidance agents radius when "Visible Avoidance" is enabled in the Debug menu. */
  'debug/shapes/avoidance/2d/enable_agents_radius': boolean;
  /**
   * If enabled, displays avoidance obstacles radius when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/enable_obstacles_radius': boolean;
  /**
   * If enabled, displays static avoidance obstacles when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/enable_obstacles_static': boolean;
  /**
   * Color of the avoidance obstacles radius, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/obstacles_radius_color': Color;
  /**
   * Color of the static avoidance obstacles edges when their vertices are winded in order to push agents in, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/obstacles_static_edge_pushin_color': Color;
  /**
   * Color of the static avoidance obstacles edges when their vertices are winded in order to push agents out, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/obstacles_static_edge_pushout_color': Color;
  /**
   * Color of the static avoidance obstacles faces when their vertices are winded in order to push agents in, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/obstacles_static_face_pushin_color': Color;
  /**
   * Color of the static avoidance obstacles faces when their vertices are winded in order to push agents out, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/2d/obstacles_static_face_pushout_color': Color;
  /**
   * Color of the avoidance agents radius, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/agents_radius_color': Color;
  /** If enabled, displays avoidance agents radius when "Visible Avoidance" is enabled in the Debug menu. */
  'debug/shapes/avoidance/3d/enable_agents_radius': boolean;
  /**
   * If enabled, displays avoidance obstacles radius when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/enable_obstacles_radius': boolean;
  /**
   * If enabled, displays static avoidance obstacles when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/enable_obstacles_static': boolean;
  /**
   * Color of the avoidance obstacles radius, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/obstacles_radius_color': Color;
  /**
   * Color of the static avoidance obstacles edges when their vertices are winded in order to push agents in, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/obstacles_static_edge_pushin_color': Color;
  /**
   * Color of the static avoidance obstacles edges when their vertices are winded in order to push agents out, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/obstacles_static_edge_pushout_color': Color;
  /**
   * Color of the static avoidance obstacles faces when their vertices are winded in order to push agents in, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/obstacles_static_face_pushin_color': Color;
  /**
   * Color of the static avoidance obstacles faces when their vertices are winded in order to push agents out, visible when "Visible Avoidance" is enabled in the Debug menu.
   */
  'debug/shapes/avoidance/3d/obstacles_static_face_pushout_color': Color;
  /**
   * Color of the contact points between collision shapes, visible when "Visible Collision Shapes" is enabled in the Debug menu.
   */
  'debug/shapes/collision/contact_color': Color;
  /**
   * Sets whether 2D physics will display collision outlines in game when "Visible Collision Shapes" is enabled in the Debug menu.
   */
  'debug/shapes/collision/draw_2d_outlines': boolean;
  /**
   * Maximum number of contact points between collision shapes to display when "Visible Collision Shapes" is enabled in the Debug menu.
   */
  'debug/shapes/collision/max_contacts_displayed': int;
  /**
   * Color of the collision shapes, visible when "Visible Collision Shapes" is enabled in the Debug menu.
   */
  'debug/shapes/collision/shape_color': Color;
  /** Color to display enabled navigation agent paths when an agent has debug enabled. */
  'debug/shapes/navigation/2d/agent_path_color': Color;
  /**
   * Rasterized size (pixel) used to render navigation agent path points when an agent has debug enabled.
   */
  'debug/shapes/navigation/2d/agent_path_point_size': float;
  /**
   * Color to display edge connections between navigation regions, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/edge_connection_color': Color;
  /** If enabled, displays navigation agent paths when an agent has debug enabled. */
  'debug/shapes/navigation/2d/enable_agent_paths': boolean;
  /**
   * If enabled, displays edge connections between navigation regions when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/enable_edge_connections': boolean;
  /**
   * If enabled, displays navigation mesh polygon edges when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/enable_edge_lines': boolean;
  /**
   * If enabled, colorizes each navigation mesh polygon face with a random color when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/enable_geometry_face_random_color': boolean;
  /**
   * If enabled, displays navigation link connections when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/enable_link_connections': boolean;
  /**
   * Color to display enabled navigation mesh polygon edges, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/geometry_edge_color': Color;
  /**
   * Color to display disabled navigation mesh polygon edges, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/geometry_edge_disabled_color': Color;
  /**
   * Color to display enabled navigation mesh polygon faces, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/geometry_face_color': Color;
  /**
   * Color to display disabled navigation mesh polygon faces, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/geometry_face_disabled_color': Color;
  /**
   * Color to use to display navigation link connections, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/link_connection_color': Color;
  /**
   * Color to use to display disabled navigation link connections, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/2d/link_connection_disabled_color': Color;
  /** Color to display enabled navigation agent paths when an agent has debug enabled. */
  'debug/shapes/navigation/3d/agent_path_color': Color;
  /**
   * Rasterized size (pixel) used to render navigation agent path points when an agent has debug enabled.
   */
  'debug/shapes/navigation/3d/agent_path_point_size': float;
  /**
   * Color to display edge connections between navigation regions, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/edge_connection_color': Color;
  /** If enabled, displays navigation agent paths when an agent has debug enabled. */
  'debug/shapes/navigation/3d/enable_agent_paths': boolean;
  /** If enabled, displays navigation agent paths through geometry when an agent has debug enabled. */
  'debug/shapes/navigation/3d/enable_agent_paths_xray': boolean;
  /**
   * If enabled, displays edge connections between navigation regions when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_edge_connections': boolean;
  /**
   * If enabled, displays edge connections between navigation regions through geometry when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_edge_connections_xray': boolean;
  /**
   * If enabled, displays navigation mesh polygon edges when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_edge_lines': boolean;
  /**
   * If enabled, displays navigation mesh polygon edges through geometry when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_edge_lines_xray': boolean;
  /**
   * If enabled, colorizes each navigation mesh polygon face with a random color when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_geometry_face_random_color': boolean;
  /**
   * If enabled, displays navigation link connections when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_link_connections': boolean;
  /**
   * If enabled, displays navigation link connections through geometry when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/enable_link_connections_xray': boolean;
  /**
   * Color to display enabled navigation mesh polygon edges, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/geometry_edge_color': Color;
  /**
   * Color to display disabled navigation mesh polygon edges, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/geometry_edge_disabled_color': Color;
  /**
   * Color to display enabled navigation mesh polygon faces, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/geometry_face_color': Color;
  /**
   * Color to display disabled navigation mesh polygon faces, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/geometry_face_disabled_color': Color;
  /**
   * Color to use to display navigation link connections, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/link_connection_color': Color;
  /**
   * Color to use to display disabled navigation link connections, visible when "Visible Navigation" is enabled in the Debug menu.
   */
  'debug/shapes/navigation/3d/link_connection_disabled_color': Color;
  /** Color of the curve path geometry, visible when "Visible Paths" is enabled in the Debug menu. */
  'debug/shapes/paths/geometry_color': Color;
  /** Line width of the curve path geometry, visible when "Visible Paths" is enabled in the Debug menu. */
  'debug/shapes/paths/geometry_width': float;
  /**
   * Sets the driver to be used by the display server. This property can not be edited directly, instead, set the driver using the platform-specific overrides.
   */
  'display/display_server/driver': string;
  /** Android override for {@link display/display_server/driver}. */
  'display/display_server/driver.android': string;
  /** iOS override for {@link display/display_server/driver}. */
  'display/display_server/driver.ios': string;
  /** LinuxBSD override for {@link display/display_server/driver}. */
  'display/display_server/driver.linuxbsd': string;
  /** MacOS override for {@link display/display_server/driver}. */
  'display/display_server/driver.macos': string;
  /** visionOS override for {@link display/display_server/driver}. */
  'display/display_server/driver.visionos': string;
  /** Windows override for {@link display/display_server/driver}. */
  'display/display_server/driver.windows': string;
  /** Custom image for the mouse cursor (limited to 256×256). */
  'display/mouse_cursor/custom_image': string;
  /** Hotspot for the custom mouse cursor image. */
  'display/mouse_cursor/custom_image_hotspot': Vector2;
  /** Position offset for tooltips, relative to the mouse cursor's hotspot. */
  'display/mouse_cursor/tooltip_position_offset': Vector2;
  /**
   * If `true`, allows HiDPI display on Windows, macOS, Android, iOS and Web. If `false`, the platform's low-DPI fallback will be used on HiDPI displays, which causes the window to be displayed in a blurry or pixelated manner (and can cause various window management bugs). Therefore, it is recommended to make your project scale to multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) instead of disabling this setting.
   * **Note:** This setting has no effect on Linux as DPI-awareness fallbacks are not supported there.
   */
  'display/window/dpi/allow_hidpi': boolean;
  /**
   * If `true`, keeps the screen on (even in case of inactivity), so the screensaver does not take over. Works on desktop and mobile platforms.
   */
  'display/window/energy_saving/keep_screen_on': boolean;
  /**
   * Enable Swappy for stable frame pacing on Android. Highly recommended.
   * **Note:** This option will be forced off when using OpenXR.
   */
  'display/window/frame_pacing/android/enable_frame_pacing': boolean;
  /**
   * Swappy mode to use. The options are:
   * - `pipeline_forced_on`: Try to honor {@link Engine.max_fps}. Pipelining is always on. This is the same behavior as a desktop PC.
   * - `auto_fps_pipeline_forced_on`: Calculate the max FPS automatically. The actual max FPS will be between `0` and {@link Engine.max_fps}. While this sounds convenient, beware that Swappy will often downgrade the max FPS until it finds a value that can be maintained. That means, if your game runs between 40fps and 60fps on a 60hz screen, after some time Swappy will downgrade the max FPS so that the game renders at a perfect 30fps.
   * - `auto_fps_auto_pipeline`: Same as `auto_fps_pipeline_forced_on`, but if Swappy detects that rendering is very fast (for example it takes less than 8ms to render on a 60hz screen), Swappy will disable pipelining to minimize input latency. This is the default.
   * **Note:** If {@link Engine.max_fps} is `0`, the actual max FPS will be considered to be the screen's refresh rate (often 60hz, 90hz, or 120hz, depending on device model and OS settings).
   */
  'display/window/frame_pacing/android/swappy_mode': int;
  /**
   * The default screen orientation to use on mobile devices. See {@link DisplayServer.ScreenOrientation} for possible values.
   * **Note:** When set to a portrait orientation, this project setting does not flip the project resolution's width and height automatically. Instead, you have to set {@link display/window/size/viewport_width} and {@link display/window/size/viewport_height} accordingly.
   */
  'display/window/handheld/orientation': int;
  /**
   * If `true`, HDR output is requested for the main window and the editor. The main window and editor will automatically switch between HDR and SDR if it is moved between screens, screen capabilities change, or system settings are modified. This will internally force {@link Viewport.use_hdr_2d} to be enabled on the main {@link Viewport}. All other {@link SubViewport} of the {@link Window} must have their {@link Viewport.use_hdr_2d} property enabled to produce HDR output.
   * **Note:** This property is only read when the project starts. To change this property at runtime, set {@link Window.hdr_output_requested}.
   */
  'display/window/hdr/request_hdr_output': boolean;
  /**
   * If `true`, iOS devices that support high refresh rate/"ProMotion" will be allowed to render at up to 120 frames per second.
   */
  'display/window/ios/allow_high_refresh_rate': boolean;
  /**
   * If `true`, the home indicator is hidden automatically. This only affects iOS devices without a physical home button.
   */
  'display/window/ios/hide_home_indicator': boolean;
  /** If `true`, the status bar is hidden while the app is running. */
  'display/window/ios/hide_status_bar': boolean;
  /**
   * If `true`, it will require two swipes to access iOS UI that uses gestures.
   * **Note:** This setting has no effect on the home indicator if `hide_home_indicator` is `true`.
   */
  'display/window/ios/suppress_ui_gesture': boolean;
  /**
   * If `true`, allows per-pixel transparency for the window background. This affects performance, so leave it on `false` unless you need it. See also {@link display/window/size/transparent} and {@link rendering/viewport/transparent_background}.
   */
  'display/window/per_pixel_transparency/allowed': boolean;
  /**
   * Forces the main window to be always on top.
   * **Note:** This setting is ignored on iOS, Android, and Web.
   */
  'display/window/size/always_on_top': boolean;
  /**
   * Forces the main window to be borderless.
   * **Note:** This setting is ignored on iOS, Android, and Web.
   */
  'display/window/size/borderless': boolean;
  /**
   * Main window content is expanded to the full size of the window. Unlike a borderless window, the frame is left intact and can be used to resize the window, and the title bar is transparent, but has minimize/maximize/close buttons.
   * **Note:** This setting is implemented only on macOS.
   */
  'display/window/size/extend_to_title': boolean;
  /**
   * Main window initial position (in virtual desktop coordinates), this setting is used only if {@link display/window/size/initial_position_type} is set to "Absolute" (`0`).
   * **Note:** This setting only affects the exported project, or when the project is run from the command line. In the editor, the value of {@link EditorSettings.run/window_placement/rect_custom_position} is used instead.
   */
  'display/window/size/initial_position': Vector2i;
  /**
   * Main window initial position.
   * `0` - "Absolute", {@link display/window/size/initial_position} is used to set window position.
   * `1` - "Primary Screen Center".
   * `3` - "Other Screen Center", {@link display/window/size/initial_screen} is used to set the screen.
   * `4` - "Center of Screen With Mouse Pointer".
   * `5` - "Center of Screen With Keyboard Focus".
   * **Note:** This setting only affects the exported project, or when the project is run from the command line. In the editor, the value of {@link EditorSettings.run/window_placement/rect} is used instead.
   */
  'display/window/size/initial_position_type': int;
  /**
   * Main window initial screen, this setting is used only if {@link display/window/size/initial_position_type} is set to "Other Screen Center" (`2`).
   * **Note:** This setting only affects the exported project, or when the project is run from the command line. In the editor, the value of {@link EditorSettings.run/window_placement/screen} is used instead.
   */
  'display/window/size/initial_screen': int;
  /** If `true`, the main window's maximize button is disabled. */
  'display/window/size/maximize_disabled': boolean;
  /** If `true`, the main window's minimize button is disabled. */
  'display/window/size/minimize_disabled': boolean;
  /**
   * Main window mode. See {@link DisplayServer.WindowMode} for possible values and how each mode behaves.
   * **Note:** Game embedding is available only in the "Windowed" mode.
   */
  'display/window/size/mode': int;
  /** Main window can't be focused. No-focus window will ignore all input, except mouse clicks. */
  'display/window/size/no_focus': boolean;
  /**
   * If `true`, allows the window to be resizable by default.
   * **Note:** This property is only read when the project starts. To change whether the window is resizable at runtime, set {@link Window.unresizable} instead on the root Window, which can be retrieved using `get_viewport().get_window()`. {@link Window.unresizable} takes the opposite value of this setting.
   * **Note:** Certain window managers can be configured to ignore the non-resizable status of a window. Do not rely on this setting as a guarantee that the window will *never* be resizable.
   * **Note:** This setting is ignored on iOS.
   */
  'display/window/size/resizable': boolean;
  /**
   * If `true`, the main window uses sharp corners by default.
   * **Note:** This property is implemented only on Windows (11).
   */
  'display/window/size/sharp_corners': boolean;
  /**
   * If `true`, enables a window manager hint that the main window background *can* be transparent. This does not make the background actually transparent. For the background to be transparent, the root viewport must also be made transparent by enabling {@link rendering/viewport/transparent_background}.
   * **Note:** To use a transparent splash screen, set {@link application/boot_splash/bg_color} to `Color(0, 0, 0, 0)`.
   * **Note:** This setting has no effect if {@link display/window/per_pixel_transparency/allowed} is set to `false`.
   * **Note:** This setting has no effect on Android as transparency is controlled only via {@link display/window/per_pixel_transparency/allowed}.
   */
  'display/window/size/transparent': boolean;
  /**
   * Sets the game's main viewport height. On desktop platforms, this is also the initial window height, represented by an indigo-colored rectangle in the 2D editor. Stretch mode settings also use this as a reference when using the `canvas_items` or `viewport` stretch modes. See also {@link display/window/size/viewport_width}, {@link display/window/size/window_width_override} and {@link display/window/size/window_height_override}.
   */
  'display/window/size/viewport_height': int;
  /**
   * Sets the game's main viewport width. On desktop platforms, this is also the initial window width, represented by an indigo-colored rectangle in the 2D editor. Stretch mode settings also use this as a reference when using the `canvas_items` or `viewport` stretch modes. See also {@link display/window/size/viewport_height}, {@link display/window/size/window_width_override} and {@link display/window/size/window_height_override}.
   */
  'display/window/size/viewport_width': int;
  /**
   * On desktop platforms, overrides the game's initial window height. See also {@link display/window/size/window_width_override}, {@link display/window/size/viewport_width} and {@link display/window/size/viewport_height}.
   * **Note:** By default, or when set to `0`, the initial window height is the {@link display/window/size/viewport_height}. This setting is ignored on iOS, Android, and Web.
   */
  'display/window/size/window_height_override': int;
  /**
   * On desktop platforms, overrides the game's initial window width. See also {@link display/window/size/window_height_override}, {@link display/window/size/viewport_width} and {@link display/window/size/viewport_height}.
   * **Note:** By default, or when set to `0`, the initial window width is the {@link display/window/size/viewport_width}. This setting is ignored on iOS, Android, and Web.
   */
  'display/window/size/window_width_override': int;
  /**
   * Defines how the aspect ratio of the base size is preserved when stretching to fit the resolution of the window or screen.
   * `"ignore"`: Ignore the aspect ratio when stretching the screen. This means that the original resolution will be stretched to exactly fill the screen, even if it's wider or narrower. This may result in non-uniform stretching: things looking wider or taller than designed.
   * `"keep"`: Keep aspect ratio when stretching the screen. This means that the viewport retains its original size regardless of the screen resolution, and black bars will be added to the top/bottom of the screen ("letterboxing") or the sides ("pillarboxing").
   * `"keep_width"`: Keep aspect ratio when stretching the screen. If the screen is wider than the base size, black bars are added at the left and right (pillarboxing). But if the screen is taller than the base resolution, the viewport will be grown in the vertical direction (and more content will be visible at the bottom). You can also think of this as "Expand Vertically".
   * `"keep_height"`: Keep aspect ratio when stretching the screen. If the screen is taller than the base size, black bars are added at the top and bottom (letterboxing). But if the screen is wider than the base resolution, the viewport will be grown in the horizontal direction (and more content will be visible to the right). You can also think of this as "Expand Horizontally".
   * `"expand"`: Keep aspect ratio when stretching the screen, but keep neither the base width nor height. Depending on the screen aspect ratio, the viewport will either be larger in the horizontal direction (if the screen is wider than the base size) or in the vertical direction (if the screen is taller than the original size).
   */
  'display/window/stretch/aspect': string;
  /**
   * Defines how the base size is stretched to fit the resolution of the window or screen.
   * `"disabled"`: No stretching happens. One unit in the scene corresponds to one pixel on the screen. In this mode, {@link display/window/stretch/aspect} has no effect. Recommended for non-game applications.
   * `"canvas_items"`: The base size specified in width and height in the project settings is stretched to cover the whole screen (taking {@link display/window/stretch/aspect} into account). This means that everything is rendered directly at the target resolution. 3D is unaffected, while in 2D, there is no longer a 1:1 correspondence between sprite pixels and screen pixels, which may result in scaling artifacts. Recommended for most games that don't use a pixel art aesthetic, although it is possible to use this stretch mode for pixel art games too (especially in 3D).
   * `"viewport"`: The size of the root {@link Viewport} is set precisely to the base size specified in the Project Settings' Display section. The scene is rendered to this viewport first. Finally, this viewport is scaled to fit the screen (taking {@link display/window/stretch/aspect} into account). Recommended for games that use a pixel art aesthetic.
   */
  'display/window/stretch/mode': string;
  /**
   * The scale factor multiplier to use for 2D elements. This multiplies the final scale factor determined by {@link display/window/stretch/mode}. If using the **Disabled** stretch mode, this scale factor is applied as-is. This can be adjusted to make the UI easier to read on certain displays.
   */
  'display/window/stretch/scale': float;
  /**
   * The policy to use to determine the final scale factor for 2D elements. This affects how {@link display/window/stretch/scale} is applied, in addition to the automatic scale factor determined by {@link display/window/stretch/mode}.
   * `"fractional"`: The scale factor will not be modified.
   * `"integer"`: The scale factor will be floored to an integer value, which means that the screen size will always be an integer multiple of the base viewport size. This provides a crisp pixel art appearance.
   * **Note:** When using integer scaling with a stretch mode, resizing the window to be smaller than the base viewport size will clip the contents. Consider preventing that by setting {@link Window.min_size} to the same value as the base viewport size defined in {@link display/window/size/viewport_width} and {@link display/window/size/viewport_height}.
   */
  'display/window/stretch/scale_mode': string;
  /**
   * If `true`, subwindows are embedded in the main window (this is also called single-window mode). Single-window mode can be faster as it does not need to create a separate window for every popup and tooltip, which can be a slow operation depending on the operating system and rendering method in use.
   * If `false`, subwindows are created as separate windows (this is also called multi-window mode). This allows them to be moved outside the main window and use native operating system window decorations.
   * This is equivalent to {@link EditorSettings.interface/editor/display/single_window_mode} in the editor.
   */
  'display/window/subwindows/embed_subwindows': boolean;
  /**
   * Sets the V-Sync mode for the main game window. The editor's own V-Sync mode can be set using {@link EditorSettings.interface/editor/display/vsync_mode}.
   * See {@link DisplayServer.VSyncMode} for possible values and how they affect the behavior of your application.
   * Depending on the platform and rendering method, the engine will fall back to **Enabled** if the desired mode is not supported.
   * V-Sync can be disabled on the command line using the `--disable-vsync` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   * **Note:** The **Adaptive** and **Mailbox** V-Sync modes are only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** This property is only read when the project starts. To change the V-Sync mode at runtime, call {@link DisplayServer.window_set_vsync_mode} instead.
   */
  'display/window/vsync/vsync_mode': int;
  /**
   * Name of the .NET assembly. This name is used as the name of the `.csproj` and `.sln` files. By default, it's set to the name of the project ({@link application/config/name}) allowing to change it in the future without affecting the .NET assembly.
   */
  'dotnet/project/assembly_name': string;
  /**
   * Number of times to attempt assembly reloading after rebuilding .NET assemblies. Effectively also the timeout in seconds to wait for unloading of script assemblies to finish.
   */
  'dotnet/project/assembly_reload_attempts': int;
  /**
   * Directory that contains the `.sln` file. By default, the `.sln` files is in the root of the project directory, next to the `project.godot` and `.csproj` files.
   * Changing this value allows setting up a multi-project scenario where there are multiple `.csproj`. Keep in mind that the Godot project is considered one of the C# projects in the workspace and it's root directory should contain the `project.godot` and `.csproj` next to each other.
   */
  'dotnet/project/solution_directory': string;
  /**
   * If `true`, text resource (`tres`) and text scene (`tscn`) files are converted to their corresponding binary format on export. This decreases file sizes and speeds up loading slightly.
   * **Note:** Because a resource's file extension may change in an exported project, it is heavily recommended to use {@link @GDScript.load} or {@link ResourceLoader} instead of {@link FileAccess} to load resources dynamically.
   * **Note:** The project settings file (`project.godot`) will always be converted to binary on export, regardless of this setting.
   */
  'editor/export/convert_text_resources_to_binary': boolean;
  /**
   * The maximum width to use when importing textures as an atlas. The value will be rounded to the nearest power of two when used. Use this to prevent imported textures from growing too large in the other direction.
   */
  'editor/import/atlas_max_width': int;
  'editor/import/reimport_missing_imported_files': boolean;
  /** If `true` importing of resources is run on multiple threads. */
  'editor/import/use_multiple_threads': boolean;
  /** Number of bits per audio sample written to the `.avi` file. Only 16 and 32-bit are supported. */
  'editor/movie_writer/audio_bit_depth': int;
  /**
   * If `true`, requests V-Sync to be disabled when writing a movie (similar to setting {@link display/window/vsync/vsync_mode} to **Disabled**). This can speed up video writing if the hardware is fast enough to render, encode and save the video at a framerate higher than the monitor's refresh rate.
   * **Note:** {@link editor/movie_writer/disable_vsync} has no effect if the operating system or graphics driver forces V-Sync with no way for applications to disable it.
   */
  'editor/movie_writer/disable_vsync': boolean;
  /**
   * The number of frames per second to record in the video when writing a movie. Simulation speed will adjust to always match the specified framerate, which means the engine will appear to run slower at higher {@link editor/movie_writer/fps} values. Certain FPS values will require you to adjust {@link editor/movie_writer/mix_rate} to prevent audio from desynchronizing over time.
   * This can be specified manually on the command line using the `--fixed-fps <fps>` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  'editor/movie_writer/fps': int;
  /**
   * The audio mix rate to use in the recorded audio when writing a movie (in Hz). This can be different from {@link audio/driver/mix_rate}, but this value must be divisible by {@link editor/movie_writer/fps} to prevent audio from desynchronizing over time.
   */
  'editor/movie_writer/mix_rate': int;
  /**
   * The output path for the movie. The file extension determines the {@link MovieWriter} that will be used.
   * Godot has 3 built-in {@link MovieWriter}s:
   * - OGV container with Theora for video and Vorbis for audio (`.ogv` file extension). Lossy compression, medium file sizes, fast encoding. The lossy compression quality can be adjusted by changing {@link ProjectSettings.editor/movie_writer/video_quality} and {@link ProjectSettings.editor/movie_writer/ogv/audio_quality}. The resulting file can be viewed in Godot with {@link VideoStreamPlayer} and most video players, but not web browsers as they don't support Theora.
   * - AVI container with MJPEG for video and uncompressed audio (`.avi` file extension). Lossy compression, medium file sizes, fast encoding. The lossy compression quality can be adjusted by changing {@link ProjectSettings.editor/movie_writer/video_quality}. The resulting file can be viewed in most video players, but it must be converted to another format for viewing on the web or by Godot with {@link VideoStreamPlayer}. MJPEG does not support transparency. AVI output is currently limited to a file of 4 GB in size at most.
   * - PNG image sequence for video and WAV for audio (`.png` file extension). Lossless compression, large file sizes, slow encoding. Designed to be encoded to a video file with another tool such as FFmpeg (https://ffmpeg.org/) after recording. Transparency is currently not supported, even if the root viewport is set to be transparent.
   * If you need to encode to a different format or pipe a stream through third-party software, you can extend this {@link MovieWriter} class to create your own movie writers.
   * When using PNG output, the frame number will be appended at the end of the file name. It starts from 0 and is padded with 8 digits to ensure correct sorting and easier processing. For example, if the output path is `/tmp/hello.png`, the first two frames will be `/tmp/hello00000000.png` and `/tmp/hello00000001.png`. The audio will be saved at `/tmp/hello.wav`.
   */
  'editor/movie_writer/movie_file': string;
  /**
   * The audio encoding quality to use when writing Vorbis audio to a file, between `-0.1` and `1.0` (inclusive). Higher `quality` values result in better-sounding output at the cost of larger file sizes. Even at quality `1.0`, compression remains lossy.
   * **Note:** This does not affect video quality, which is controlled by {@link editor/movie_writer/video_quality} instead.
   */
  'editor/movie_writer/ogv/audio_quality': float;
  /**
   * The tradeoff between encoding speed and compression efficiency. Speed `1` is the slowest but provides the best compression. Speed `4` is the fastest but provides the worst compression. Video quality is generally not affected significantly by this setting.
   */
  'editor/movie_writer/ogv/encoding_speed': int;
  /**
   * Forces keyframes at the specified interval (in frame count). Higher values can improve compression up to a certain level at the expense of higher latency when seeking.
   */
  'editor/movie_writer/ogv/keyframe_interval': int;
  /**
   * The speaker mode to use in the recorded audio when writing a movie. See {@link AudioServer.SpeakerMode} for possible values.
   */
  'editor/movie_writer/speaker_mode': int;
  /**
   * The video encoding quality to use when writing a Theora or AVI (MJPEG) video to a file, between `0.0` and `1.0` (inclusive). Higher `quality` values result in better-looking output at the cost of larger file sizes. Recommended `quality` values are between `0.75` and `0.9`. Even at quality `1.0`, compression remains lossy.
   */
  'editor/movie_writer/video_quality': float;
  /**
   * The format of the default signal callback name (in the Signal Connection Dialog). The following substitutions are available: `{NodeName}`, `{nodeName}`, `{node_name}`, `{SignalName}`, `{signalName}`, and `{signal_name}`.
   */
  'editor/naming/default_signal_callback_name': string;
  /**
   * The format of the default signal callback name when a signal connects to the same node that emits it (in the Signal Connection Dialog). The following substitutions are available: `{NodeName}`, `{nodeName}`, `{node_name}`, `{SignalName}`, `{signalName}`, and `{signal_name}`.
   */
  'editor/naming/default_signal_callback_to_self_name': string;
  /**
   * When creating node names automatically, set the type of casing to use in this project. This is mostly an editor setting.
   */
  'editor/naming/node_name_casing': int;
  /** What to use to separate node name from number. This is mostly an editor setting. */
  'editor/naming/node_name_num_separator': int;
  /**
   * When generating scene file names from scene root node, set the type of casing to use in this project. This is mostly an editor setting.
   */
  'editor/naming/scene_name_casing': int;
  /**
   * When generating script file names from the selected node, set the type of casing to use in this project. This is mostly an editor setting.
   */
  'editor/naming/script_name_casing': int;
  /**
   * The command-line arguments to append to Godot's own command line when running the project. This doesn't affect the editor itself.
   * It is possible to make another executable run Godot by using the `%command%` placeholder. The placeholder will be replaced with Godot's own command line. Program-specific arguments should be placed *before* the placeholder, whereas Godot-specific arguments should be placed *after* the placeholder.
   * For example, this can be used to force the project to run on the dedicated GPU in an NVIDIA Optimus system on Linux:
   * [codeblock lang=text]
   * prime-run %command%
   * [/codeblock]
   */
  'editor/run/main_run_args': string;
  /**
   * Text-based file extensions to include in the script editor's "Find in Files" feature. You can add e.g. `tscn` if you wish to also parse your scene files, especially if you use built-in scripts which are serialized in the scene files.
   */
  'editor/script/search_in_file_extensions': PackedStringArray;
  /**
   * Search path for project-specific script templates. Godot will search for script templates both in the editor-specific path and in this project-specific path.
   */
  'editor/script/templates_search_path': string;
  'editor/version_control/autoload_on_startup': boolean;
  'editor/version_control/plugin_name': string;
  /**
   * If `true`, Blender 3D scene files with the `.blend` extension will be imported by converting them to glTF 2.0.
   * This requires configuring a path to a Blender executable in the {@link EditorSettings.filesystem/import/blender/blender_path} setting. Blender 3.0 or later is required.
   */
  'filesystem/import/blender/enabled': boolean;
  /**
   * Override for {@link filesystem/import/blender/enabled} on Android where Blender can't easily be accessed from Godot.
   */
  'filesystem/import/blender/enabled.android': boolean;
  /**
   * Override for {@link filesystem/import/blender/enabled} on the Web where Blender can't easily be accessed from Godot.
   */
  'filesystem/import/blender/enabled.web': boolean;
  /**
   * If `true`, Autodesk FBX 3D scene files with the `.fbx` extension will be imported by converting them to glTF 2.0.
   * This requires configuring a path to an FBX2glTF executable in the editor settings at {@link EditorSettings.filesystem/import/fbx/fbx2gltf_path}.
   */
  'filesystem/import/fbx2gltf/enabled': boolean;
  /**
   * Override for {@link filesystem/import/fbx2gltf/enabled} on Android where FBX2glTF can't easily be accessed from Godot.
   */
  'filesystem/import/fbx2gltf/enabled.android': boolean;
  /**
   * Override for {@link filesystem/import/fbx2gltf/enabled} on the Web where FBX2glTF can't easily be accessed from Godot.
   */
  'filesystem/import/fbx2gltf/enabled.web': boolean;
  /**
   * Default value for {@link ScrollContainer.scroll_deadzone}, which will be used for all {@link ScrollContainer}s unless overridden.
   */
  'gui/common/default_scroll_deadzone': int;
  /**
   * The minimum distance the mouse cursor must move while pressed before a drag operation begins in the default viewport. For custom viewports see {@link Viewport.gui_drag_threshold}.
   */
  'gui/common/drag_threshold': int;
  /**
   * Determines whether a {@link Control} should visually indicate focus when said focus is gained using a mouse or touch input.
   * - **Never** (`0`) show the focused state for mouse/touch input.
   * - **Control Supports Keyboard Input** (`1`) shows the focused state even when gained via mouse/touch input (similar to how browsers handle focus).
   * - **Always** (`2`) show the focused state, even if said focus was gained via mouse/touch input.
   */
  'gui/common/show_focus_state_on_pointer_event': int;
  /**
   * If `true`, snaps {@link Control} node vertices to the nearest pixel to ensure they remain crisp even when the camera moves or zooms.
   */
  'gui/common/snap_controls_to_pixels': boolean;
  /**
   * How to position the Cancel and OK buttons in the project's {@link AcceptDialog} windows. Different platforms have different conventions for this, which can be overridden through this setting.
   * - **Auto** follows the platform convention: OK first on Windows, KDE, and LXQt; Cancel first on macOS and other Linux desktop environments.
   * - **Cancel First** forces the Cancel/OK ordering.
   * - **OK First** forces the OK/Cancel ordering.
   * To check if these buttons are swapped at runtime, use {@link DisplayServer.get_swap_cancel_ok}.
   * **Note:** This doesn't affect native dialogs such as the ones spawned by {@link DisplayServer.dialog_show}.
   */
  'gui/common/swap_cancel_ok': int;
  /** Maximum undo/redo history size for {@link TextEdit} fields. */
  'gui/common/text_edit_undo_stack_max_size': int;
  /**
   * If set to `true` and {@link display/window/stretch/mode} is set to `"canvas_items"`, font and {@link DPITexture} oversampling is enabled in the main window. Use {@link Viewport.oversampling} to control oversampling in other viewports and windows.
   */
  'gui/fonts/dynamic_fonts/use_oversampling': boolean;
  /**
   * Path to a custom {@link Theme} resource file to use for the project (`.theme` or generic `.tres`/`.res` extension).
   */
  'gui/theme/custom': string;
  /** Path to a custom {@link Font} resource to use as default for all GUI elements of the project. */
  'gui/theme/custom_font': string;
  /**
   * Font anti-aliasing mode for the default project font. See {@link FontFile.antialiasing}.
   * **Note:** This setting does not affect custom {@link Font}s used within the project. Use the **Import** dock for that instead (see {@link ResourceImporterDynamicFont.antialiasing}).
   */
  'gui/theme/default_font_antialiasing': int;
  /**
   * If set to `true`, the default font will have mipmaps generated. This prevents text from looking grainy when a {@link Control} is scaled down, or when a {@link Label3D} is viewed from a long distance (if {@link Label3D.texture_filter} is set to a mode that displays mipmaps).
   * Enabling {@link gui/theme/default_font_generate_mipmaps} increases font generation time and memory usage. Only enable this setting if you actually need it.
   * **Note:** This setting does not affect custom {@link Font}s used within the project. Use the **Import** dock for that instead (see {@link ResourceImporterDynamicFont.generate_mipmaps}).
   */
  'gui/theme/default_font_generate_mipmaps': boolean;
  /**
   * Font hinting mode for the default project font. See {@link FontFile.hinting}.
   * **Note:** This setting does not affect custom {@link Font}s used within the project. Use the **Import** dock for that instead (see {@link ResourceImporterDynamicFont.hinting}).
   */
  'gui/theme/default_font_hinting': int;
  /**
   * If set to `true`, the default font will use multichannel signed distance field (MSDF) for crisp rendering at any size. Since this approach does not rely on rasterizing the font every time its size changes, this allows for resizing the font in real-time without any performance penalty. Text will also not look grainy for {@link Control}s that are scaled down (or for {@link Label3D}s viewed from a long distance).
   * MSDF font rendering can be combined with {@link gui/theme/default_font_generate_mipmaps} to further improve font rendering quality when scaled down.
   * **Note:** This setting does not affect custom {@link Font}s used within the project. Use the **Import** dock for that instead (see {@link ResourceImporterDynamicFont.multichannel_signed_distance_field}).
   */
  'gui/theme/default_font_multichannel_signed_distance_field': boolean;
  /**
   * Font glyph subpixel positioning mode for the default project font. See {@link FontFile.subpixel_positioning}.
   * **Note:** This setting does not affect custom {@link Font}s used within the project. Use the **Import** dock for that instead (see {@link ResourceImporterDynamicFont.subpixel_positioning}).
   */
  'gui/theme/default_font_subpixel_positioning': int;
  /**
   * The default scale factor for {@link Control}s, when not overridden by a {@link Theme}.
   * **Note:** This property is only read when the project starts. To change the default theme scale at runtime, set {@link ThemeDB.fallback_base_scale} instead. However, to adjust the scale of all 2D elements at runtime, it's preferable to use {@link Window.content_scale_factor} on the root {@link Window} node instead (as this also affects overridden {@link Theme}s). See Multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) in the documentation for details.
   */
  'gui/theme/default_theme_scale': float;
  /** LCD subpixel layout used for font anti-aliasing. See {@link TextServer.FontLCDSubpixelLayout}. */
  'gui/theme/lcd_subpixel_layout': int;
  /**
   * When {@link BaseButton.shortcut_feedback} is enabled, this is the time the {@link BaseButton} will remain highlighted after a shortcut.
   */
  'gui/timers/button_shortcut_feedback_highlight_time': float;
  /**
   * Timer setting for incremental search in {@link Tree}, {@link ItemList}, etc. controls (in milliseconds).
   */
  'gui/timers/incremental_search_max_interval_msec': int;
  /** Timer for detecting idle in {@link TextEdit} (in seconds). */
  'gui/timers/text_edit_idle_detect_sec': float;
  /** Default delay for tooltips (in seconds). */
  'gui/timers/tooltip_delay_sec': float;
  /** Delay for tooltips in the editor. */
  'gui/timers/tooltip_delay_sec.editor_hint': float;
  /**
   * Default {@link InputEventAction} to confirm a focused button, menu or list item, or validate input.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_accept': Dictionary;
  /**
   * Default {@link InputEventAction} to start or end a drag-and-drop operation without using mouse.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_accessibility_drag_and_drop': Dictionary;
  /**
   * Default {@link InputEventAction} to discard a modal or pending input.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_cancel': Dictionary;
  /**
   * Default {@link InputEventAction} to close a dialog window.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_close_dialog': Dictionary;
  /** macOS specific override for the shortcut to close a dialog window. */
  'input/ui_close_dialog.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to delete a color preset in a {@link ColorPicker}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_colorpicker_delete_preset': Dictionary;
  /**
   * Default {@link InputEventAction} to copy a selection to the clipboard.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_copy': Dictionary;
  /**
   * Default {@link InputEventAction} to cut a selection to the clipboard.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_cut': Dictionary;
  /**
   * Default {@link InputEventAction} to move down in the UI.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_down': Dictionary;
  /**
   * Default {@link InputEventAction} to go to the end position of a {@link Control} (e.g. last item in an {@link ItemList} or a {@link Tree}), matching the behavior of {@link KEY_END} on typical desktop UI systems.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_end': Dictionary;
  /**
   * Default {@link InputEventAction} to delete the selected file in a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_delete': Dictionary;
  /**
   * Default {@link InputEventAction} to open file filter in a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_find': Dictionary;
  /**
   * Default {@link InputEventAction} to focus path edit field in a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_focus_path': Dictionary;
  /** macOS specific override for the shortcut to focus path edit field in {@link FileDialog}. */
  'input/ui_filedialog_focus_path.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to refresh the contents of the current directory of a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_refresh': Dictionary;
  /**
   * Default {@link InputEventAction} to toggle showing hidden files and directories in a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_show_hidden': Dictionary;
  /**
   * Default {@link InputEventAction} to go up one directory in a {@link FileDialog}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_filedialog_up_one_level': Dictionary;
  /**
   * Default {@link InputEventAction} to switch {@link TextEdit} {@link input/ui_text_indent} between moving keyboard focus to the next {@link Control} in the scene and inputting a `Tab` character.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_focus_mode': Dictionary;
  /**
   * Default {@link InputEventAction} to focus the next {@link Control} in the scene. The focus behavior can be configured via {@link Control.focus_next}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_focus_next': Dictionary;
  /**
   * Default {@link InputEventAction} to focus the previous {@link Control} in the scene. The focus behavior can be configured via {@link Control.focus_previous}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_focus_prev': Dictionary;
  /**
   * Default {@link InputEventAction} to delete a {@link GraphNode} in a {@link GraphEdit}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_graph_delete': Dictionary;
  /**
   * Default {@link InputEventAction} to duplicate a {@link GraphNode} in a {@link GraphEdit}.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_graph_duplicate': Dictionary;
  /**
   * Default {@link InputEventAction} to follow a {@link GraphNode} input port connection.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_graph_follow_left': Dictionary;
  /** macOS specific override for the shortcut to follow a {@link GraphNode} input port connection. */
  'input/ui_graph_follow_left.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to follow a {@link GraphNode} output port connection.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_graph_follow_right': Dictionary;
  /** macOS specific override for the shortcut to follow a {@link GraphNode} output port connection. */
  'input/ui_graph_follow_right.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to go to the start position of a {@link Control} (e.g. first item in an {@link ItemList} or a {@link Tree}), matching the behavior of {@link KEY_HOME} on typical desktop UI systems.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_home': Dictionary;
  /**
   * Default {@link InputEventAction} to move left in the UI.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_left': Dictionary;
  /**
   * Default {@link InputEventAction} to open a context menu in a text field.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_menu': Dictionary;
  /**
   * Default {@link InputEventAction} to go down a page in a {@link Control} (e.g. in an {@link ItemList} or a {@link Tree}), matching the behavior of {@link KEY_PAGEDOWN} on typical desktop UI systems.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_page_down': Dictionary;
  /**
   * Default {@link InputEventAction} to go up a page in a {@link Control} (e.g. in an {@link ItemList} or a {@link Tree}), matching the behavior of {@link KEY_PAGEUP} on typical desktop UI systems.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_page_up': Dictionary;
  /**
   * Default {@link InputEventAction} to paste from the clipboard.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_paste': Dictionary;
  /**
   * Default {@link InputEventAction} to redo an undone action.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_redo': Dictionary;
  /**
   * Default {@link InputEventAction} to move right in the UI.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_right': Dictionary;
  /**
   * Default {@link InputEventAction} to select an item in a {@link Control} (e.g. in an {@link ItemList} or a {@link Tree}).
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_select': Dictionary;
  /**
   * Default {@link InputEventAction} to swap input direction, i.e. change between left-to-right to right-to-left modes. Affects text-editing controls ({@link LineEdit}, {@link TextEdit}).
   */
  'input/ui_swap_input_direction': Dictionary;
  /**
   * If a selection is currently active with the last caret in text fields, searches for the next occurrence of the selection, adds a caret and selects the next occurrence.
   * If no selection is currently active with the last caret in text fields, selects the word currently under the caret.
   * The action can be performed sequentially for all occurrences of the selection of the last caret and for all existing carets.
   * The viewport is adjusted to the latest newly added caret.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_add_selection_for_next_occurrence': Dictionary;
  /**
   * Default {@link InputEventAction} to delete the character before the text cursor.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_backspace': Dictionary;
  /**
   * Default {@link InputEventAction} to delete **all** text before the text cursor.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_backspace_all_to_left': Dictionary;
  /** macOS specific override for the shortcut to delete all text before the text cursor. */
  'input/ui_text_backspace_all_to_left.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to delete all characters before the cursor up until a whitespace or punctuation character.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_backspace_word': Dictionary;
  /** macOS specific override for the shortcut to delete a word. */
  'input/ui_text_backspace_word.macos': Dictionary;
  /** Default {@link InputEventAction} to add an additional caret above every caret of a text. */
  'input/ui_text_caret_add_above': Dictionary;
  /** macOS specific override for the shortcut to add a caret above every caret. */
  'input/ui_text_caret_add_above.macos': Dictionary;
  /** Default {@link InputEventAction} to add an additional caret below every caret of a text. */
  'input/ui_text_caret_add_below': Dictionary;
  /** macOS specific override for the shortcut to add a caret below every caret. */
  'input/ui_text_caret_add_below.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor to the end of the text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_document_end': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor to the end of the text. */
  'input/ui_text_caret_document_end.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor to the start of the text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_document_start': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor to the start of the text. */
  'input/ui_text_caret_document_start.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor down.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_down': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor left.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_left': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor to the end of the line.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_line_end': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor to the end of the line. */
  'input/ui_text_caret_line_end.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor to the start of the line.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_line_start': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor to the start of the line. */
  'input/ui_text_caret_line_start.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor down one page.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_page_down': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor up one page.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_page_up': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor right.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_right': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor up.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_up': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor left to the next whitespace or punctuation.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_word_left': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor back one word. */
  'input/ui_text_caret_word_left.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to move the text cursor right to the next whitespace or punctuation.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_caret_word_right': Dictionary;
  /** macOS specific override for the shortcut to move the text cursor forward one word. */
  'input/ui_text_caret_word_right.macos': Dictionary;
  /**
   * If there's only one caret active and with a selection, clears the selection.
   * In case there's more than one caret active, removes the secondary carets and clears their selections.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_clear_carets_and_selection': Dictionary;
  /**
   * Default {@link InputEventAction} to accept an autocompletion hint.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_completion_accept': Dictionary;
  /**
   * Default {@link InputEventAction} to request autocompletion.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_completion_query': Dictionary;
  /**
   * Default {@link InputEventAction} to accept an autocompletion hint, replacing existing text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_completion_replace': Dictionary;
  /**
   * Default {@link InputEventAction} to unindent text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_dedent': Dictionary;
  /**
   * Default {@link InputEventAction} to delete the character after the text cursor.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_delete': Dictionary;
  /**
   * Default {@link InputEventAction} to delete **all** text after the text cursor.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_delete_all_to_right': Dictionary;
  /** macOS specific override for the shortcut to delete all text after the text cursor. */
  'input/ui_text_delete_all_to_right.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to delete all characters after the cursor up until a whitespace or punctuation character.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_delete_word': Dictionary;
  /** macOS specific override for the shortcut to delete a word after the text cursor. */
  'input/ui_text_delete_word.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to indent the current line.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_indent': Dictionary;
  /**
   * Default {@link InputEventAction} to insert a new line at the position of the text cursor.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_newline': Dictionary;
  /**
   * Default {@link InputEventAction} to insert a new line before the current one.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_newline_above': Dictionary;
  /**
   * Default {@link InputEventAction} to insert a new line after the current one.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_newline_blank': Dictionary;
  /**
   * Default {@link InputEventAction} to scroll down one line of text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_scroll_down': Dictionary;
  /** macOS specific override for the shortcut to scroll down one line. */
  'input/ui_text_scroll_down.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to scroll up one line of text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_scroll_up': Dictionary;
  /** macOS specific override for the shortcut to scroll up one line. */
  'input/ui_text_scroll_up.macos': Dictionary;
  /**
   * Default {@link InputEventAction} to select all text.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_select_all': Dictionary;
  /**
   * If no selection is currently active, selects the word currently under the caret in text fields. If a selection is currently active, deselects the current selection.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_select_word_under_caret': Dictionary;
  /** macOS specific override for the shortcut to select the word currently under the caret. */
  'input/ui_text_select_word_under_caret.macos': Dictionary;
  /**
   * If no selection is currently active with the last caret in text fields, searches for the next occurrence of the word currently under the caret and moves the caret to the next occurrence. The action can be performed sequentially for other occurrences of the word under the last caret.
   * If a selection is currently active with the last caret in text fields, searches for the next occurrence of the selection, adds a caret, selects the next occurrence then deselects the previous selection and its associated caret. The action can be performed sequentially for other occurrences of the selection of the last caret.
   * The viewport is adjusted to the latest newly added caret.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_skip_selection_for_next_occurrence': Dictionary;
  /**
   * Default {@link InputEventAction} to submit a text field.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_submit': Dictionary;
  /**
   * Default {@link InputEventAction} to toggle *insert mode* in a text field. While in insert mode, inserting new text overrides the character after the cursor, unless the next character is a new line.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_text_toggle_insert_mode': Dictionary;
  /**
   * Default {@link InputEventAction} to undo the most recent action.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_undo': Dictionary;
  /**
   * Default {@link InputEventAction} to start Unicode character hexadecimal code input in a text field.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_unicode_start': Dictionary;
  /**
   * Default {@link InputEventAction} to move up in the UI.
   * **Note:** Default `ui_*` actions cannot be removed as they are necessary for the internal logic of several {@link Control}s. The events assigned to the action can however be modified.
   */
  'input/ui_up': Dictionary;
  /**
   * If `true`, key/touch/joystick events will be flushed just before every idle and physics frame.
   * If `false`, such events will be flushed only once per process frame, between iterations of the engine.
   * Enabling this can greatly improve the responsiveness to input, specially in devices that need to run multiple physics frames per visible (process) frame, because they can't run at the target frame rate.
   * **Note:** Currently implemented only on Android.
   */
  'input_devices/buffering/agile_event_flushing': boolean;
  /**
   * If `true`, {@link Input.is_action_just_pressed} and {@link Input.is_action_just_released} will only return `true` if the action is still in the respective state, i.e. an action that is pressed *and* released on the same frame will be missed.
   * If `false`, no input will be lost.
   * **Note:** You should in nearly all cases prefer the `false` setting. The legacy behavior is to enable supporting old projects that rely on the old logic, without changes to script.
   */
  'input_devices/compatibility/legacy_just_pressed_behavior': boolean;
  /**
   * If `true`, joypad input (including motion sensors) and LED light changes will be ignored and joypad vibration will be stopped when the application is not focused.
   */
  'input_devices/joypads/ignore_joypad_on_unfocused_application': boolean;
  /**
   * Specifies the tablet driver to use. If left empty, the default driver will be used.
   * **Note:** The driver in use can be overridden at runtime via the `--tablet-driver` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   * **Note:** Use {@link DisplayServer.tablet_set_current_driver} to switch tablet driver in runtime.
   */
  'input_devices/pen_tablet/driver': string;
  /**
   * Override for {@link input_devices/pen_tablet/driver} on Windows. Supported values are:
   * - `auto` (default), uses `wintab` if Windows Ink is disabled in the Wacom Tablet Properties or system settings, `winink` otherwise.
   * - `winink`, uses Windows native "Windows Ink" driver.
   * - `wintab`, uses Wacom "WinTab" driver.
   * - `dummy`, tablet input is disabled.
   */
  'input_devices/pen_tablet/driver.windows': string;
  /**
   * If `true`, disables the scroll deadzone on Android, allowing even very small scroll movements to be registered. This may increase scroll sensitivity but can also lead to unintended scrolling from slight finger movements.
   */
  'input_devices/pointing/android/disable_scroll_deadzone': boolean;
  /** If `true`, long press events on an Android touchscreen are transformed into right click events. */
  'input_devices/pointing/android/enable_long_press_as_right_click': boolean;
  /** If `true`, multi-touch pan and scale gestures are enabled on Android devices. */
  'input_devices/pointing/android/enable_pan_and_scale_gestures': boolean;
  /** If `true`, system volume changes are disabled when the buttons are used within the app. */
  'input_devices/pointing/android/override_volume_buttons': boolean;
  /**
   * On Wear OS devices, defines which axis of the mouse wheel rotary input is mapped to. This rotary input is usually performed by rotating the physical or virtual (touch-based) bezel on a smartwatch.
   */
  'input_devices/pointing/android/rotary_input_scroll_axis': int;
  /** If `true`, sends mouse input events when tapping or swiping on the touchscreen. */
  'input_devices/pointing/emulate_mouse_from_touch': boolean;
  /** If `true`, sends touch input events when clicking or dragging the mouse. */
  'input_devices/pointing/emulate_touch_from_mouse': boolean;
  /**
   * If `true`, the accelerometer sensor is enabled and {@link Input.get_accelerometer} returns valid data.
   */
  'input_devices/sensors/enable_accelerometer': boolean;
  /** If `true`, the gravity sensor is enabled and {@link Input.get_gravity} returns valid data. */
  'input_devices/sensors/enable_gravity': boolean;
  /** If `true`, the gyroscope sensor is enabled and {@link Input.get_gyroscope} returns valid data. */
  'input_devices/sensors/enable_gyroscope': boolean;
  /**
   * If `true`, the magnetometer sensor is enabled and {@link Input.get_magnetometer} returns valid data.
   */
  'input_devices/sensors/enable_magnetometer': boolean;
  /**
   * The locale to fall back to if a translation isn't available in a given language. If left empty, `en` (English) will be used.
   * **Note:** Not to be confused with {@link TextServerFallback}.
   */
  'internationalization/locale/fallback': string;
  /**
   * If `true`, text server break iteration rule sets, dictionaries and other optional data are included in the exported project.
   * **Note:** "ICU / HarfBuzz / Graphite" text server data includes dictionaries for Burmese, Chinese, Japanese, Khmer, Lao and Thai as well as Unicode Standard Annex #29 and Unicode Standard Annex #14 word and line breaking rules. Data is about 4 MB large.
   * **Note:** {@link TextServerFallback} does not use additional data.
   */
  'internationalization/locale/include_text_server_data': boolean;
  /**
   * Default strictness of line-breaking rules. Can be overridden by adding `@lb={auto,loose,normal,strict}` to the language code.
   * - **Auto** (`0`) - strictness is based on the length of the line.
   * - **Loose** (`1`) - the least restrictive set of line-breaking rules. Typically used for short lines.
   * - **Normal** (`2`) - the most common set of line-breaking rules.
   * - **Strict** (`3`) - the most stringent set of line-breaking rules.
   * See Line Breaking Strictness: the line-break property (https://www.w3.org/TR/css-text-3/#line-break-property) for more info.
   */
  'internationalization/locale/line_breaking_strictness': int;
  /**
   * If non-empty, this locale will be used instead of the automatically detected system locale.
   * **Note:** This setting also applies to the exported project. To only affect testing within the editor, override this setting with an `editor` feature tag ($DOCS_URL/tutorials/export/feature_tags.html) for localization testing purposes.
   */
  'internationalization/locale/test': string;
  /**
   * Double vowels in strings during pseudolocalization to simulate the lengthening of text due to localization.
   */
  'internationalization/pseudolocalization/double_vowels': boolean;
  /**
   * The expansion ratio to use during pseudolocalization. A value of `0.3` is sufficient for most practical purposes, and will increase the length of each string by 30%.
   */
  'internationalization/pseudolocalization/expansion_ratio': float;
  /**
   * If `true`, emulate bidirectional (right-to-left) text when pseudolocalization is enabled. This can be used to spot issues with RTL layout and UI mirroring that will crop up if the project is localized to RTL languages such as Arabic or Hebrew. See also {@link internationalization/rendering/force_right_to_left_layout_direction}.
   */
  'internationalization/pseudolocalization/fake_bidi': boolean;
  /** Replace all characters in the string with `*`. Useful for finding non-localizable strings. */
  'internationalization/pseudolocalization/override': boolean;
  /** Prefix that will be prepended to the pseudolocalized string. */
  'internationalization/pseudolocalization/prefix': string;
  /** Replace all characters with their accented variants during pseudolocalization. */
  'internationalization/pseudolocalization/replace_with_accents': boolean;
  /**
   * Skip placeholders for string formatting like `%s` or `%f` during pseudolocalization. Useful to identify strings which need additional control characters to display correctly.
   */
  'internationalization/pseudolocalization/skip_placeholders': boolean;
  /** Suffix that will be appended to the pseudolocalized string. */
  'internationalization/pseudolocalization/suffix': string;
  /**
   * If `true`, enables pseudolocalization for the project. This can be used to spot untranslatable strings or layout issues that may occur once the project is localized to languages that have longer strings than the source language.
   * **Note:** This property is only read when the project starts. To toggle pseudolocalization at run-time, use {@link TranslationServer.pseudolocalization_enabled} instead.
   */
  'internationalization/pseudolocalization/use_pseudolocalization': boolean;
  /**
   * Force layout direction and text writing direction to RTL for all controls, even if the current locale is intended to use a left-to-right layout and text writing direction. This should be enabled for testing purposes only. See also {@link internationalization/pseudolocalization/fake_bidi}.
   */
  'internationalization/rendering/force_right_to_left_layout_direction': boolean;
  /**
   * If `true`, root node will use {@link Node.AUTO_TRANSLATE_MODE_ALWAYS}, otherwise {@link Node.AUTO_TRANSLATE_MODE_DISABLED} will be used.
   * **Note:** This property is only read when the project starts. To change the auto translate mode at runtime, set {@link Node.auto_translate_mode} of {@link SceneTree.root} instead.
   */
  'internationalization/rendering/root_node_auto_translate': boolean;
  /** Root node default layout direction. */
  'internationalization/rendering/root_node_layout_direction': int;
  /**
   * Specifies the {@link TextServer} to use. If left empty, the default will be used.
   * "ICU / HarfBuzz / Graphite" ({@link TextServerAdvanced}) is the most advanced text driver, supporting right-to-left typesetting and complex scripts (for languages like Arabic, Hebrew, etc.). The "Fallback" text driver ({@link TextServerFallback}) does not support right-to-left typesetting and complex scripts.
   * **Note:** The driver in use can be overridden at runtime via the `--text-driver` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   * **Note:** There is an additional `Dummy` text driver available, which disables all text rendering and font-related functionality. This driver is not listed in the project settings, but it can be enabled when running the editor or project using the `--text-driver Dummy` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html).
   */
  'internationalization/rendering/text_driver': string;
  /** Optional name for the 2D navigation layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/2d_navigation/layer_1': string;
  /** Optional name for the 2D navigation layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/2d_navigation/layer_2': string;
  /** Optional name for the 2D navigation layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/2d_navigation/layer_3': string;
  /** Optional name for the 2D navigation layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/2d_navigation/layer_4': string;
  /** Optional name for the 2D navigation layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/2d_navigation/layer_5': string;
  /** Optional name for the 2D navigation layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/2d_navigation/layer_6': string;
  /** Optional name for the 2D navigation layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/2d_navigation/layer_7': string;
  /** Optional name for the 2D navigation layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/2d_navigation/layer_8': string;
  /** Optional name for the 2D navigation layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/2d_navigation/layer_9': string;
  /** Optional name for the 2D navigation layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/2d_navigation/layer_10': string;
  /** Optional name for the 2D navigation layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/2d_navigation/layer_11': string;
  /** Optional name for the 2D navigation layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/2d_navigation/layer_12': string;
  /** Optional name for the 2D navigation layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/2d_navigation/layer_13': string;
  /** Optional name for the 2D navigation layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/2d_navigation/layer_14': string;
  /** Optional name for the 2D navigation layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/2d_navigation/layer_15': string;
  /** Optional name for the 2D navigation layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/2d_navigation/layer_16': string;
  /** Optional name for the 2D navigation layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/2d_navigation/layer_17': string;
  /** Optional name for the 2D navigation layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/2d_navigation/layer_18': string;
  /** Optional name for the 2D navigation layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/2d_navigation/layer_19': string;
  /** Optional name for the 2D navigation layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/2d_navigation/layer_20': string;
  /** Optional name for the 2D navigation layer 21. If left empty, the layer will display as "Layer 21". */
  'layer_names/2d_navigation/layer_21': string;
  /** Optional name for the 2D navigation layer 22. If left empty, the layer will display as "Layer 22". */
  'layer_names/2d_navigation/layer_22': string;
  /** Optional name for the 2D navigation layer 23. If left empty, the layer will display as "Layer 23". */
  'layer_names/2d_navigation/layer_23': string;
  /** Optional name for the 2D navigation layer 24. If left empty, the layer will display as "Layer 24". */
  'layer_names/2d_navigation/layer_24': string;
  /** Optional name for the 2D navigation layer 25. If left empty, the layer will display as "Layer 25". */
  'layer_names/2d_navigation/layer_25': string;
  /** Optional name for the 2D navigation layer 26. If left empty, the layer will display as "Layer 26". */
  'layer_names/2d_navigation/layer_26': string;
  /** Optional name for the 2D navigation layer 27. If left empty, the layer will display as "Layer 27". */
  'layer_names/2d_navigation/layer_27': string;
  /** Optional name for the 2D navigation layer 28. If left empty, the layer will display as "Layer 28". */
  'layer_names/2d_navigation/layer_28': string;
  /** Optional name for the 2D navigation layer 29. If left empty, the layer will display as "Layer 29". */
  'layer_names/2d_navigation/layer_29': string;
  /** Optional name for the 2D navigation layer 30. If left empty, the layer will display as "Layer 30". */
  'layer_names/2d_navigation/layer_30': string;
  /** Optional name for the 2D navigation layer 31. If left empty, the layer will display as "Layer 31". */
  'layer_names/2d_navigation/layer_31': string;
  /** Optional name for the 2D navigation layer 32. If left empty, the layer will display as "Layer 32". */
  'layer_names/2d_navigation/layer_32': string;
  /** Optional name for the 2D physics layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/2d_physics/layer_1': string;
  /** Optional name for the 2D physics layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/2d_physics/layer_2': string;
  /** Optional name for the 2D physics layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/2d_physics/layer_3': string;
  /** Optional name for the 2D physics layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/2d_physics/layer_4': string;
  /** Optional name for the 2D physics layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/2d_physics/layer_5': string;
  /** Optional name for the 2D physics layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/2d_physics/layer_6': string;
  /** Optional name for the 2D physics layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/2d_physics/layer_7': string;
  /** Optional name for the 2D physics layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/2d_physics/layer_8': string;
  /** Optional name for the 2D physics layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/2d_physics/layer_9': string;
  /** Optional name for the 2D physics layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/2d_physics/layer_10': string;
  /** Optional name for the 2D physics layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/2d_physics/layer_11': string;
  /** Optional name for the 2D physics layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/2d_physics/layer_12': string;
  /** Optional name for the 2D physics layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/2d_physics/layer_13': string;
  /** Optional name for the 2D physics layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/2d_physics/layer_14': string;
  /** Optional name for the 2D physics layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/2d_physics/layer_15': string;
  /** Optional name for the 2D physics layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/2d_physics/layer_16': string;
  /** Optional name for the 2D physics layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/2d_physics/layer_17': string;
  /** Optional name for the 2D physics layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/2d_physics/layer_18': string;
  /** Optional name for the 2D physics layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/2d_physics/layer_19': string;
  /** Optional name for the 2D physics layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/2d_physics/layer_20': string;
  /** Optional name for the 2D physics layer 21. If left empty, the layer will display as "Layer 21". */
  'layer_names/2d_physics/layer_21': string;
  /** Optional name for the 2D physics layer 22. If left empty, the layer will display as "Layer 22". */
  'layer_names/2d_physics/layer_22': string;
  /** Optional name for the 2D physics layer 23. If left empty, the layer will display as "Layer 23". */
  'layer_names/2d_physics/layer_23': string;
  /** Optional name for the 2D physics layer 24. If left empty, the layer will display as "Layer 24". */
  'layer_names/2d_physics/layer_24': string;
  /** Optional name for the 2D physics layer 25. If left empty, the layer will display as "Layer 25". */
  'layer_names/2d_physics/layer_25': string;
  /** Optional name for the 2D physics layer 26. If left empty, the layer will display as "Layer 26". */
  'layer_names/2d_physics/layer_26': string;
  /** Optional name for the 2D physics layer 27. If left empty, the layer will display as "Layer 27". */
  'layer_names/2d_physics/layer_27': string;
  /** Optional name for the 2D physics layer 28. If left empty, the layer will display as "Layer 28". */
  'layer_names/2d_physics/layer_28': string;
  /** Optional name for the 2D physics layer 29. If left empty, the layer will display as "Layer 29". */
  'layer_names/2d_physics/layer_29': string;
  /** Optional name for the 2D physics layer 30. If left empty, the layer will display as "Layer 30". */
  'layer_names/2d_physics/layer_30': string;
  /** Optional name for the 2D physics layer 31. If left empty, the layer will display as "Layer 31". */
  'layer_names/2d_physics/layer_31': string;
  /** Optional name for the 2D physics layer 32. If left empty, the layer will display as "Layer 32". */
  'layer_names/2d_physics/layer_32': string;
  /** Optional name for the 2D render layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/2d_render/layer_1': string;
  /** Optional name for the 2D render layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/2d_render/layer_2': string;
  /** Optional name for the 2D render layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/2d_render/layer_3': string;
  /** Optional name for the 2D render layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/2d_render/layer_4': string;
  /** Optional name for the 2D render layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/2d_render/layer_5': string;
  /** Optional name for the 2D render layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/2d_render/layer_6': string;
  /** Optional name for the 2D render layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/2d_render/layer_7': string;
  /** Optional name for the 2D render layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/2d_render/layer_8': string;
  /** Optional name for the 2D render layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/2d_render/layer_9': string;
  /** Optional name for the 2D render layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/2d_render/layer_10': string;
  /** Optional name for the 2D render layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/2d_render/layer_11': string;
  /** Optional name for the 2D render layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/2d_render/layer_12': string;
  /** Optional name for the 2D render layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/2d_render/layer_13': string;
  /** Optional name for the 2D render layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/2d_render/layer_14': string;
  /** Optional name for the 2D render layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/2d_render/layer_15': string;
  /** Optional name for the 2D render layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/2d_render/layer_16': string;
  /** Optional name for the 2D render layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/2d_render/layer_17': string;
  /** Optional name for the 2D render layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/2d_render/layer_18': string;
  /** Optional name for the 2D render layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/2d_render/layer_19': string;
  /** Optional name for the 2D render layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/2d_render/layer_20': string;
  /** Optional name for the 3D navigation layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/3d_navigation/layer_1': string;
  /** Optional name for the 3D navigation layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/3d_navigation/layer_2': string;
  /** Optional name for the 3D navigation layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/3d_navigation/layer_3': string;
  /** Optional name for the 3D navigation layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/3d_navigation/layer_4': string;
  /** Optional name for the 3D navigation layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/3d_navigation/layer_5': string;
  /** Optional name for the 3D navigation layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/3d_navigation/layer_6': string;
  /** Optional name for the 3D navigation layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/3d_navigation/layer_7': string;
  /** Optional name for the 3D navigation layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/3d_navigation/layer_8': string;
  /** Optional name for the 3D navigation layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/3d_navigation/layer_9': string;
  /** Optional name for the 3D navigation layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/3d_navigation/layer_10': string;
  /** Optional name for the 3D navigation layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/3d_navigation/layer_11': string;
  /** Optional name for the 3D navigation layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/3d_navigation/layer_12': string;
  /** Optional name for the 3D navigation layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/3d_navigation/layer_13': string;
  /** Optional name for the 3D navigation layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/3d_navigation/layer_14': string;
  /** Optional name for the 3D navigation layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/3d_navigation/layer_15': string;
  /** Optional name for the 3D navigation layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/3d_navigation/layer_16': string;
  /** Optional name for the 3D navigation layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/3d_navigation/layer_17': string;
  /** Optional name for the 3D navigation layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/3d_navigation/layer_18': string;
  /** Optional name for the 3D navigation layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/3d_navigation/layer_19': string;
  /** Optional name for the 3D navigation layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/3d_navigation/layer_20': string;
  /** Optional name for the 3D navigation layer 21. If left empty, the layer will display as "Layer 21". */
  'layer_names/3d_navigation/layer_21': string;
  /** Optional name for the 3D navigation layer 22. If left empty, the layer will display as "Layer 22". */
  'layer_names/3d_navigation/layer_22': string;
  /** Optional name for the 3D navigation layer 23. If left empty, the layer will display as "Layer 23". */
  'layer_names/3d_navigation/layer_23': string;
  /** Optional name for the 3D navigation layer 24. If left empty, the layer will display as "Layer 24". */
  'layer_names/3d_navigation/layer_24': string;
  /** Optional name for the 3D navigation layer 25. If left empty, the layer will display as "Layer 25". */
  'layer_names/3d_navigation/layer_25': string;
  /** Optional name for the 3D navigation layer 26. If left empty, the layer will display as "Layer 26". */
  'layer_names/3d_navigation/layer_26': string;
  /** Optional name for the 3D navigation layer 27. If left empty, the layer will display as "Layer 27". */
  'layer_names/3d_navigation/layer_27': string;
  /** Optional name for the 3D navigation layer 28. If left empty, the layer will display as "Layer 28". */
  'layer_names/3d_navigation/layer_28': string;
  /** Optional name for the 3D navigation layer 29. If left empty, the layer will display as "Layer 29". */
  'layer_names/3d_navigation/layer_29': string;
  /** Optional name for the 3D navigation layer 30. If left empty, the layer will display as "Layer 30". */
  'layer_names/3d_navigation/layer_30': string;
  /** Optional name for the 3D navigation layer 31. If left empty, the layer will display as "Layer 31". */
  'layer_names/3d_navigation/layer_31': string;
  /** Optional name for the 3D navigation layer 32. If left empty, the layer will display as "Layer 32". */
  'layer_names/3d_navigation/layer_32': string;
  /** Optional name for the 3D physics layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/3d_physics/layer_1': string;
  /** Optional name for the 3D physics layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/3d_physics/layer_2': string;
  /** Optional name for the 3D physics layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/3d_physics/layer_3': string;
  /** Optional name for the 3D physics layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/3d_physics/layer_4': string;
  /** Optional name for the 3D physics layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/3d_physics/layer_5': string;
  /** Optional name for the 3D physics layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/3d_physics/layer_6': string;
  /** Optional name for the 3D physics layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/3d_physics/layer_7': string;
  /** Optional name for the 3D physics layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/3d_physics/layer_8': string;
  /** Optional name for the 3D physics layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/3d_physics/layer_9': string;
  /** Optional name for the 3D physics layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/3d_physics/layer_10': string;
  /** Optional name for the 3D physics layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/3d_physics/layer_11': string;
  /** Optional name for the 3D physics layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/3d_physics/layer_12': string;
  /** Optional name for the 3D physics layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/3d_physics/layer_13': string;
  /** Optional name for the 3D physics layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/3d_physics/layer_14': string;
  /** Optional name for the 3D physics layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/3d_physics/layer_15': string;
  /** Optional name for the 3D physics layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/3d_physics/layer_16': string;
  /** Optional name for the 3D physics layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/3d_physics/layer_17': string;
  /** Optional name for the 3D physics layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/3d_physics/layer_18': string;
  /** Optional name for the 3D physics layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/3d_physics/layer_19': string;
  /** Optional name for the 3D physics layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/3d_physics/layer_20': string;
  /** Optional name for the 3D physics layer 21. If left empty, the layer will display as "Layer 21". */
  'layer_names/3d_physics/layer_21': string;
  /** Optional name for the 3D physics layer 22. If left empty, the layer will display as "Layer 22". */
  'layer_names/3d_physics/layer_22': string;
  /** Optional name for the 3D physics layer 23. If left empty, the layer will display as "Layer 23". */
  'layer_names/3d_physics/layer_23': string;
  /** Optional name for the 3D physics layer 24. If left empty, the layer will display as "Layer 24". */
  'layer_names/3d_physics/layer_24': string;
  /** Optional name for the 3D physics layer 25. If left empty, the layer will display as "Layer 25". */
  'layer_names/3d_physics/layer_25': string;
  /** Optional name for the 3D physics layer 26. If left empty, the layer will display as "Layer 26". */
  'layer_names/3d_physics/layer_26': string;
  /** Optional name for the 3D physics layer 27. If left empty, the layer will display as "Layer 27". */
  'layer_names/3d_physics/layer_27': string;
  /** Optional name for the 3D physics layer 28. If left empty, the layer will display as "Layer 28". */
  'layer_names/3d_physics/layer_28': string;
  /** Optional name for the 3D physics layer 29. If left empty, the layer will display as "Layer 29". */
  'layer_names/3d_physics/layer_29': string;
  /** Optional name for the 3D physics layer 30. If left empty, the layer will display as "Layer 30". */
  'layer_names/3d_physics/layer_30': string;
  /** Optional name for the 3D physics layer 31. If left empty, the layer will display as "Layer 31". */
  'layer_names/3d_physics/layer_31': string;
  /** Optional name for the 3D physics layer 32. If left empty, the layer will display as "Layer 32". */
  'layer_names/3d_physics/layer_32': string;
  /** Optional name for the 3D render layer 1. If left empty, the layer will display as "Layer 1". */
  'layer_names/3d_render/layer_1': string;
  /** Optional name for the 3D render layer 2. If left empty, the layer will display as "Layer 2". */
  'layer_names/3d_render/layer_2': string;
  /** Optional name for the 3D render layer 3. If left empty, the layer will display as "Layer 3". */
  'layer_names/3d_render/layer_3': string;
  /** Optional name for the 3D render layer 4. If left empty, the layer will display as "Layer 4". */
  'layer_names/3d_render/layer_4': string;
  /** Optional name for the 3D render layer 5. If left empty, the layer will display as "Layer 5". */
  'layer_names/3d_render/layer_5': string;
  /** Optional name for the 3D render layer 6. If left empty, the layer will display as "Layer 6". */
  'layer_names/3d_render/layer_6': string;
  /** Optional name for the 3D render layer 7. If left empty, the layer will display as "Layer 7". */
  'layer_names/3d_render/layer_7': string;
  /** Optional name for the 3D render layer 8. If left empty, the layer will display as "Layer 8". */
  'layer_names/3d_render/layer_8': string;
  /** Optional name for the 3D render layer 9. If left empty, the layer will display as "Layer 9". */
  'layer_names/3d_render/layer_9': string;
  /** Optional name for the 3D render layer 10. If left empty, the layer will display as "Layer 10". */
  'layer_names/3d_render/layer_10': string;
  /** Optional name for the 3D render layer 11. If left empty, the layer will display as "Layer 11". */
  'layer_names/3d_render/layer_11': string;
  /** Optional name for the 3D render layer 12. If left empty, the layer will display as "Layer 12". */
  'layer_names/3d_render/layer_12': string;
  /** Optional name for the 3D render layer 13. If left empty, the layer will display as "Layer 13". */
  'layer_names/3d_render/layer_13': string;
  /** Optional name for the 3D render layer 14. If left empty, the layer will display as "Layer 14". */
  'layer_names/3d_render/layer_14': string;
  /** Optional name for the 3D render layer 15. If left empty, the layer will display as "Layer 15". */
  'layer_names/3d_render/layer_15': string;
  /** Optional name for the 3D render layer 16. If left empty, the layer will display as "Layer 16". */
  'layer_names/3d_render/layer_16': string;
  /** Optional name for the 3D render layer 17. If left empty, the layer will display as "Layer 17". */
  'layer_names/3d_render/layer_17': string;
  /** Optional name for the 3D render layer 18. If left empty, the layer will display as "Layer 18". */
  'layer_names/3d_render/layer_18': string;
  /** Optional name for the 3D render layer 19. If left empty, the layer will display as "Layer 19". */
  'layer_names/3d_render/layer_19': string;
  /** Optional name for the 3D render layer 20. If left empty, the layer will display as "Layer 20". */
  'layer_names/3d_render/layer_20': string;
  /**
   * Optional name for the navigation avoidance layer 1. If left empty, the layer will display as "Layer 1".
   */
  'layer_names/avoidance/layer_1': string;
  /**
   * Optional name for the navigation avoidance layer 2. If left empty, the layer will display as "Layer 2".
   */
  'layer_names/avoidance/layer_2': string;
  /**
   * Optional name for the navigation avoidance layer 3. If left empty, the layer will display as "Layer 3".
   */
  'layer_names/avoidance/layer_3': string;
  /**
   * Optional name for the navigation avoidance layer 4. If left empty, the layer will display as "Layer 4".
   */
  'layer_names/avoidance/layer_4': string;
  /**
   * Optional name for the navigation avoidance layer 5. If left empty, the layer will display as "Layer 5".
   */
  'layer_names/avoidance/layer_5': string;
  /**
   * Optional name for the navigation avoidance layer 6. If left empty, the layer will display as "Layer 6".
   */
  'layer_names/avoidance/layer_6': string;
  /**
   * Optional name for the navigation avoidance layer 7. If left empty, the layer will display as "Layer 7".
   */
  'layer_names/avoidance/layer_7': string;
  /**
   * Optional name for the navigation avoidance layer 8. If left empty, the layer will display as "Layer 8".
   */
  'layer_names/avoidance/layer_8': string;
  /**
   * Optional name for the navigation avoidance layer 9. If left empty, the layer will display as "Layer 9".
   */
  'layer_names/avoidance/layer_9': string;
  /**
   * Optional name for the navigation avoidance layer 10. If left empty, the layer will display as "Layer 10".
   */
  'layer_names/avoidance/layer_10': string;
  /**
   * Optional name for the navigation avoidance layer 11. If left empty, the layer will display as "Layer 11".
   */
  'layer_names/avoidance/layer_11': string;
  /**
   * Optional name for the navigation avoidance layer 12. If left empty, the layer will display as "Layer 12".
   */
  'layer_names/avoidance/layer_12': string;
  /**
   * Optional name for the navigation avoidance layer 13. If left empty, the layer will display as "Layer 13".
   */
  'layer_names/avoidance/layer_13': string;
  /**
   * Optional name for the navigation avoidance layer 14. If left empty, the layer will display as "Layer 14".
   */
  'layer_names/avoidance/layer_14': string;
  /**
   * Optional name for the navigation avoidance layer 15. If left empty, the layer will display as "Layer 15".
   */
  'layer_names/avoidance/layer_15': string;
  /**
   * Optional name for the navigation avoidance layer 16. If left empty, the layer will display as "Layer 16".
   */
  'layer_names/avoidance/layer_16': string;
  /**
   * Optional name for the navigation avoidance layer 17. If left empty, the layer will display as "Layer 17".
   */
  'layer_names/avoidance/layer_17': string;
  /**
   * Optional name for the navigation avoidance layer 18. If left empty, the layer will display as "Layer 18".
   */
  'layer_names/avoidance/layer_18': string;
  /**
   * Optional name for the navigation avoidance layer 19. If left empty, the layer will display as "Layer 19".
   */
  'layer_names/avoidance/layer_19': string;
  /**
   * Optional name for the navigation avoidance layer 20. If left empty, the layer will display as "Layer 20".
   */
  'layer_names/avoidance/layer_20': string;
  /**
   * Optional name for the navigation avoidance layer 21. If left empty, the layer will display as "Layer 21".
   */
  'layer_names/avoidance/layer_21': string;
  /**
   * Optional name for the navigation avoidance layer 22. If left empty, the layer will display as "Layer 22".
   */
  'layer_names/avoidance/layer_22': string;
  /**
   * Optional name for the navigation avoidance layer 23. If left empty, the layer will display as "Layer 23".
   */
  'layer_names/avoidance/layer_23': string;
  /**
   * Optional name for the navigation avoidance layer 24. If left empty, the layer will display as "Layer 24".
   */
  'layer_names/avoidance/layer_24': string;
  /**
   * Optional name for the navigation avoidance layer 25. If left empty, the layer will display as "Layer 25".
   */
  'layer_names/avoidance/layer_25': string;
  /**
   * Optional name for the navigation avoidance layer 26. If left empty, the layer will display as "Layer 26".
   */
  'layer_names/avoidance/layer_26': string;
  /**
   * Optional name for the navigation avoidance layer 27. If left empty, the layer will display as "Layer 27".
   */
  'layer_names/avoidance/layer_27': string;
  /**
   * Optional name for the navigation avoidance layer 28. If left empty, the layer will display as "Layer 28".
   */
  'layer_names/avoidance/layer_28': string;
  /**
   * Optional name for the navigation avoidance layer 29. If left empty, the layer will display as "Layer 29".
   */
  'layer_names/avoidance/layer_29': string;
  /**
   * Optional name for the navigation avoidance layer 30. If left empty, the layer will display as "Layer 30".
   */
  'layer_names/avoidance/layer_30': string;
  /**
   * Optional name for the navigation avoidance layer 31. If left empty, the layer will display as "Layer 31".
   */
  'layer_names/avoidance/layer_31': string;
  /**
   * Optional name for the navigation avoidance layer 32. If left empty, the layer will display as "Layer 32".
   */
  'layer_names/avoidance/layer_32': string;
  /**
   * Godot uses a message queue to defer some function calls. If you run out of space on it (you will see an error), you can increase the size here.
   */
  'memory/limits/message_queue/max_size_mb': int;
  /** Default cell size for 2D navigation maps. See {@link NavigationServer2D.map_set_cell_size}. */
  'navigation/2d/default_cell_size': float;
  /**
   * Default edge connection margin for 2D navigation maps. See {@link NavigationServer2D.map_set_edge_connection_margin}.
   */
  'navigation/2d/default_edge_connection_margin': float;
  /**
   * Default link connection radius for 2D navigation maps. See {@link NavigationServer2D.map_set_link_connection_radius}.
   */
  'navigation/2d/default_link_connection_radius': float;
  /**
   * Default merge rasterizer cell scale for 2D navigation maps. See {@link NavigationServer2D.map_set_merge_rasterizer_cell_scale}.
   */
  'navigation/2d/merge_rasterizer_cell_scale': float;
  /**
   * Sets which navigation engine to use for 2D navigation.
   * **DEFAULT** is equivalent to **GodotNavigation2D**, but may change in future releases. Select an explicit implementation if you want to ensure that your project stays on the same engine.
   * **GodotNavigation2D** is Godot's internal 2D navigation engine.
   * **Dummy** is a 2D navigation server that does nothing and returns only dummy values, effectively disabling all 2D navigation functionality.
   * Third-party modules can add other navigation engines to select with this setting.
   */
  'navigation/2d/navigation_engine': string;
  /**
   * If enabled 2D navigation regions will use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin. This setting only affects World2D default navigation maps.
   */
  'navigation/2d/use_edge_connections': boolean;
  /**
   * If `true`, the navigation system will print warnings when a navigation mesh with a small cell size is used on a navigation map with a larger size as this commonly causes rasterization errors.
   */
  'navigation/2d/warnings/navmesh_cell_size_mismatch': boolean;
  /**
   * If `true`, the navigation system will print warnings about navigation mesh edge merge errors occurring in navigation regions or maps.
   */
  'navigation/2d/warnings/navmesh_edge_merge_errors': boolean;
  /** Default cell height for 3D navigation maps. See {@link NavigationServer3D.map_set_cell_height}. */
  'navigation/3d/default_cell_height': float;
  /** Default cell size for 3D navigation maps. See {@link NavigationServer3D.map_set_cell_size}. */
  'navigation/3d/default_cell_size': float;
  /**
   * Default edge connection margin for 3D navigation maps. See {@link NavigationServer3D.map_set_edge_connection_margin}.
   */
  'navigation/3d/default_edge_connection_margin': float;
  /**
   * Default link connection radius for 3D navigation maps. See {@link NavigationServer3D.map_set_link_connection_radius}.
   */
  'navigation/3d/default_link_connection_radius': float;
  /** Default up orientation for 3D navigation maps. See {@link NavigationServer3D.map_set_up}. */
  'navigation/3d/default_up': Vector3;
  /**
   * Default merge rasterizer cell scale for 3D navigation maps. See {@link NavigationServer3D.map_set_merge_rasterizer_cell_scale}.
   */
  'navigation/3d/merge_rasterizer_cell_scale': float;
  /**
   * Sets which navigation engine to use for 3D navigation.
   * **DEFAULT** is equivalent to **GodotNavigation3D**, but may change in future releases. Select an explicit implementation if you want to ensure that your project stays on the same engine.
   * **GodotNavigation3D** is Godot's internal 3D navigation engine.
   * **Dummy** is a 3D navigation server that does nothing and returns only dummy values, effectively disabling all 3D navigation functionality.
   * Third-party modules can add other navigation engines to select with this setting.
   */
  'navigation/3d/navigation_engine': string;
  /**
   * If enabled 3D navigation regions will use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin. This setting only affects World3D default navigation maps.
   */
  'navigation/3d/use_edge_connections': boolean;
  /**
   * If `true`, the navigation system will print warnings when a navigation mesh with a small cell size (or in 3D height) is used on a navigation map with a larger size as this commonly causes rasterization errors.
   */
  'navigation/3d/warnings/navmesh_cell_size_mismatch': boolean;
  /**
   * If `true`, the navigation system will print warnings about navigation mesh edge merge errors occurring in navigation regions or maps.
   */
  'navigation/3d/warnings/navmesh_edge_merge_errors': boolean;
  /** If enabled and avoidance calculations use multiple threads the threads run with high priority. */
  'navigation/avoidance/thread_model/avoidance_use_high_priority_threads': boolean;
  /** If enabled the avoidance calculations use multiple threads. */
  'navigation/avoidance/thread_model/avoidance_use_multiple_threads': boolean;
  /** If enabled and async navmesh baking uses multiple threads the threads run with high priority. */
  'navigation/baking/thread_model/baking_use_high_priority_threads': boolean;
  /** If enabled the async navmesh baking uses multiple threads. */
  'navigation/baking/thread_model/baking_use_multiple_threads': boolean;
  /**
   * If enabled, and baking would potentially lead to an engine crash, the baking will be interrupted and an error message with explanation will be raised.
   */
  'navigation/baking/use_crash_prevention_checks': boolean;
  /**
   * Maximum number of threads that can run pathfinding queries simultaneously on the same pathfinding graph, for example the same navigation map. Additional threads increase memory consumption and synchronization time due to the need for extra data copies prepared for each thread. A value of `-1` means unlimited and the maximum available OS processor count is used. Defaults to `1` when the OS does not support threads.
   */
  'navigation/pathfinding/max_threads': int;
  /**
   * If enabled, navigation map synchronization uses an async process that runs on a background thread. This avoids stalling the main thread but adds an additional delay to any navigation map change.
   */
  'navigation/world/map_use_async_iterations': boolean;
  /**
   * If enabled, navigation region synchronization uses an async process that runs on a background thread. This avoids stalling the main thread but adds an additional delay to any navigation region change.
   */
  'navigation/world/region_use_async_iterations': boolean;
  /**
   * Maximum number of characters allowed to send as output from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection.
   */
  'network/limits/debugger/max_chars_per_second': int;
  /**
   * Maximum number of errors allowed to be sent from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection.
   */
  'network/limits/debugger/max_errors_per_second': int;
  /**
   * Maximum number of messages in the debugger queue. Over this value, content is dropped. This helps to limit the debugger memory usage.
   */
  'network/limits/debugger/max_queued_messages': int;
  /**
   * Maximum number of warnings allowed to be sent from the debugger. Over this value, content is dropped. This helps not to stall the debugger connection.
   */
  'network/limits/debugger/max_warnings_per_second': int;
  /**
   * Default size of packet peer stream for deserializing Godot data (in bytes, specified as a power of two). The default value `16` is equal to 65,536 bytes. Over this size, data is dropped.
   */
  'network/limits/packet_peer_stream/max_buffer_po2': int;
  /** Timeout (in seconds) for connection attempts using TCP. */
  'network/limits/tcp/connect_timeout_seconds': int;
  /** Timeout (in seconds) for connection attempts using UNIX domain socket. */
  'network/limits/unix/connect_timeout_seconds': int;
  /** Maximum size (in kiB) for the {@link WebRTCDataChannel} input buffer. */
  'network/limits/webrtc/max_channel_in_buffer_kb': int;
  /**
   * The CA certificates bundle to use for TLS connections. If this is set to a non-empty value, this will *override* Godot's default Mozilla certificate bundle (https://github.com/godotengine/godot/blob/master/thirdparty/certs/ca-bundle.crt). If left empty, the default certificate bundle will be used.
   * If in doubt, leave this setting empty.
   */
  'network/tls/certificate_bundle_override': string;
  /**
   * If `true`, enable TLSv1.3 negotiation.
   * **Note:** Only supported when using Mbed TLS 3.0 or later (Linux distribution packages may be compiled against older system Mbed TLS packages), otherwise the maximum supported TLS version is always TLSv1.2.
   */
  'network/tls/enable_tls_v1.3': boolean;
  /**
   * The default rotational motion damping in 2D. Damping is used to gradually slow down physical objects over time. RigidBodies will fall back to this value when combining their own damping values and no area damping value is present.
   * Suggested values are in the range `0` to `30`. At value `0` objects will keep moving with the same velocity. Greater values will stop the object faster. A value equal to or greater than the physics tick rate ({@link physics/common/physics_ticks_per_second}) will bring the object to a stop in one iteration.
   * **Note:** Godot damping calculations are velocity-dependent, meaning bodies moving faster will take a longer time to come to rest. They do not simulate inertia, friction, or air resistance. Therefore heavier or larger bodies will lose speed at the same proportional rate as lighter or smaller bodies.
   * During each physics tick, Godot will multiply the linear velocity of RigidBodies by `1.0 - combined_damp / physics_ticks_per_second`. By default, bodies combine damp factors: `combined_damp` is the sum of the damp value of the body and this value or the area's value the body is in. See {@link RigidBody2D.DampMode}.
   * **Warning:** Godot's damping calculations are simulation tick rate dependent. Changing {@link physics/common/physics_ticks_per_second} may significantly change the outcomes and feel of your simulation. This is true for the entire range of damping values greater than 0. To get back to a similar feel, you also need to change your damp values. This needed change is not proportional and differs from case to case.
   */
  'physics/2d/default_angular_damp': float;
  /**
   * The default gravity strength in 2D (in pixels per second squared).
   * **Note:** This property is only read when the project starts. To change the default gravity at runtime, use the following code sample:
   */
  'physics/2d/default_gravity': float;
  /**
   * The default gravity direction in 2D.
   * **Note:** This property is only read when the project starts. To change the default gravity vector at runtime, use the following code sample:
   */
  'physics/2d/default_gravity_vector': Vector2;
  /**
   * The default linear motion damping in 2D. Damping is used to gradually slow down physical objects over time. RigidBodies will fall back to this value when combining their own damping values and no area damping value is present.
   * Suggested values are in the range `0` to `30`. At value `0` objects will keep moving with the same velocity. Greater values will stop the object faster. A value equal to or greater than the physics tick rate ({@link physics/common/physics_ticks_per_second}) will bring the object to a stop in one iteration.
   * **Note:** Godot damping calculations are velocity-dependent, meaning bodies moving faster will take a longer time to come to rest. They do not simulate inertia, friction, or air resistance. Therefore heavier or larger bodies will lose speed at the same proportional rate as lighter or smaller bodies.
   * During each physics tick, Godot will multiply the linear velocity of RigidBodies by `1.0 - combined_damp / physics_ticks_per_second`, where `combined_damp` is the sum of the linear damp of the body and this value, or the area's value the body is in, assuming the body defaults to combine damp values. See {@link RigidBody2D.DampMode}.
   * **Warning:** Godot's damping calculations are simulation tick rate dependent. Changing {@link physics/common/physics_ticks_per_second} may significantly change the outcomes and feel of your simulation. This is true for the entire range of damping values greater than 0. To get back to a similar feel, you also need to change your damp values. This needed change is not proportional and differs from case to case.
   */
  'physics/2d/default_linear_damp': float;
  /**
   * Sets which physics engine to use for 2D physics.
   * **DEFAULT** is currently equivalent to **GodotPhysics2D**, but may change in future releases. Select an explicit implementation if you want to ensure that your project stays on the same engine.
   * **GodotPhysics2D** is Godot's internal 2D physics engine.
   * **Dummy** is a 2D physics server that does nothing and returns only dummy values, effectively disabling all 2D physics functionality.
   * Third-party extensions and modules can add other physics engines to select with this setting.
   */
  'physics/2d/physics_engine': string;
  /**
   * If `true`, the 2D physics server runs on a separate thread, making better use of multi-core CPUs. If `false`, the 2D physics server runs on the main thread. Running the physics server on a separate thread can increase performance, but restricts API access to only physics process.
   */
  'physics/2d/run_on_separate_thread': boolean;
  /**
   * Threshold angular velocity under which a 2D physics body will be considered inactive. See {@link PhysicsServer2D.SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD}.
   */
  'physics/2d/sleep_threshold_angular': float;
  /**
   * Threshold linear velocity under which a 2D physics body will be considered inactive. See {@link PhysicsServer2D.SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD}.
   * **Note:** Only supported when using GodotPhysics3D. This project setting is ignored when using Jolt Physics.
   */
  'physics/2d/sleep_threshold_linear': float;
  /**
   * Maximum distance a shape can penetrate another shape before it is considered a collision. See {@link PhysicsServer2D.SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION}.
   * **Note:** Only supported when using GodotPhysics3D. This project setting is ignored when using Jolt Physics.
   */
  'physics/2d/solver/contact_max_allowed_penetration': float;
  /**
   * Maximum distance a shape can be from another before they are considered separated and the contact is discarded. See {@link PhysicsServer2D.SPACE_PARAM_CONTACT_MAX_SEPARATION}.
   */
  'physics/2d/solver/contact_max_separation': float;
  /**
   * Maximum distance a pair of bodies has to move before their collision status has to be recalculated. See {@link PhysicsServer2D.SPACE_PARAM_CONTACT_RECYCLE_RADIUS}.
   */
  'physics/2d/solver/contact_recycle_radius': float;
  /**
   * Default solver bias for all physics constraints. Defines how much bodies react to enforce constraints. See {@link PhysicsServer2D.SPACE_PARAM_CONSTRAINT_DEFAULT_BIAS}.
   * Individual constraints can have a specific bias value (see {@link Joint2D.bias}).
   */
  'physics/2d/solver/default_constraint_bias': float;
  /**
   * Default solver bias for all physics contacts. Defines how much bodies react to enforce contact separation. See {@link PhysicsServer2D.SPACE_PARAM_CONTACT_DEFAULT_BIAS}.
   * Individual shapes can have a specific bias value (see {@link Shape2D.custom_solver_bias}).
   */
  'physics/2d/solver/default_contact_bias': float;
  /**
   * Number of solver iterations for all contacts and constraints. The greater the number of iterations, the more accurate the collisions will be. However, a greater number of iterations requires more CPU power, which can decrease performance. See {@link PhysicsServer2D.SPACE_PARAM_SOLVER_ITERATIONS}.
   */
  'physics/2d/solver/solver_iterations': int;
  /**
   * Time (in seconds) of inactivity before which a 2D physics body will put to sleep. See {@link PhysicsServer2D.SPACE_PARAM_BODY_TIME_TO_SLEEP}.
   */
  'physics/2d/time_before_sleep': float;
  /**
   * The default rotational motion damping in 3D. Damping is used to gradually slow down physical objects over time. RigidBodies will fall back to this value when combining their own damping values and no area damping value is present.
   * Suggested values are in the range `0` to `30`. At value `0` objects will keep moving with the same velocity. Greater values will stop the object faster. A value equal to or greater than the physics tick rate ({@link physics/common/physics_ticks_per_second}) will bring the object to a stop in one iteration.
   * **Note:** Godot damping calculations are velocity-dependent, meaning bodies moving faster will take a longer time to come to rest. They do not simulate inertia, friction, or air resistance. Therefore heavier or larger bodies will lose speed at the same proportional rate as lighter or smaller bodies.
   * During each physics tick, Godot will multiply the angular velocity of RigidBodies by `1.0 - combined_damp / physics_ticks_per_second`. By default, bodies combine damp factors: `combined_damp` is the sum of the damp value of the body and this value or the area's value the body is in. See {@link RigidBody3D.DampMode}.
   * **Warning:** Godot's damping calculations are simulation tick rate dependent. Changing {@link physics/common/physics_ticks_per_second} may significantly change the outcomes and feel of your simulation. This is true for the entire range of damping values greater than 0. To get back to a similar feel, you also need to change your damp values. This needed change is not proportional and differs from case to case.
   */
  'physics/3d/default_angular_damp': float;
  /**
   * The default gravity strength in 3D (in meters per second squared).
   * **Note:** This property is only read when the project starts. To change the default gravity at runtime, use the following code sample:
   */
  'physics/3d/default_gravity': float;
  /**
   * The default gravity direction in 3D.
   * **Note:** This property is only read when the project starts. To change the default gravity vector at runtime, use the following code sample:
   */
  'physics/3d/default_gravity_vector': Vector3;
  /**
   * The default linear motion damping in 3D. Damping is used to gradually slow down physical objects over time. RigidBodies will fall back to this value when combining their own damping values and no area damping value is present.
   * Suggested values are in the range `0` to `30`. At value `0` objects will keep moving with the same velocity. Greater values will stop the object faster. A value equal to or greater than the physics tick rate ({@link physics/common/physics_ticks_per_second}) will bring the object to a stop in one iteration.
   * **Note:** Godot damping calculations are velocity-dependent, meaning bodies moving faster will take a longer time to come to rest. They do not simulate inertia, friction, or air resistance. Therefore heavier or larger bodies will lose speed at the same proportional rate as lighter or smaller bodies.
   * During each physics tick, Godot will multiply the linear velocity of RigidBodies by `1.0 - combined_damp / physics_ticks_per_second`. By default, bodies combine damp factors: `combined_damp` is the sum of the damp value of the body and this value or the area's value the body is in. See {@link RigidBody3D.DampMode}.
   * **Warning:** Godot's damping calculations are simulation tick rate dependent. Changing {@link physics/common/physics_ticks_per_second} may significantly change the outcomes and feel of your simulation. This is true for the entire range of damping values greater than 0. To get back to a similar feel, you also need to change your damp values. This needed change is not proportional and differs from case to case.
   */
  'physics/3d/default_linear_damp': float;
  /**
   * Sets which physics engine to use for 3D physics.
   * **DEFAULT** is currently equivalent to **GodotPhysics3D**, but may change in future releases. Select an explicit implementation if you want to ensure that your project stays on the same engine.
   * **GodotPhysics3D** is Godot's internal 3D physics engine.
   * **Jolt Physics** is an alternative physics engine that is generally faster and more reliable than **GodotPhysics3D**. Jolt Physics is the default for projects created starting in Godot 4.6.
   * **Dummy** is a 3D physics server that does nothing and returns only dummy values, effectively disabling all 3D physics functionality.
   * Third-party extensions and modules can add other physics engines to select with this setting.
   */
  'physics/3d/physics_engine': string;
  /**
   * The approach used for 3D scene traversal when physics interpolation is enabled.
   * - `DEFAULT`: The default optimized method.
   * - `Legacy`: The previous reference method used for scene tree traversal, which is slower.
   * - `Debug`: Swaps between `DEFAULT` and `Legacy` methods on alternating frames, and provides logging information (which in turn makes it slower). Intended for debugging only; you should use the `DEFAULT` method in most cases.
   */
  'physics/3d/physics_interpolation/scene_traversal': string;
  /**
   * If `true`, the 3D physics server runs on a separate thread, making better use of multi-core CPUs. If `false`, the 3D physics server runs on the main thread. Running the physics server on a separate thread can increase performance, but restricts API access to only physics process.
   * **Note:** When {@link physics/3d/physics_engine} is set to `Jolt Physics`, enabling this setting will prevent the 3D physics server from being able to provide any context when reporting errors and warnings, and will instead always refer to nodes as `<unknown>`.
   */
  'physics/3d/run_on_separate_thread': boolean;
  /**
   * Threshold angular velocity under which a 3D physics body will be considered inactive. See {@link PhysicsServer3D.SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/sleep_threshold_angular': float;
  /**
   * Threshold linear velocity under which a 3D physics body will be considered inactive. See {@link PhysicsServer3D.SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/sleep_threshold_linear': float;
  /**
   * Maximum distance a shape can penetrate another shape before it is considered a collision. See {@link PhysicsServer3D.SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/solver/contact_max_allowed_penetration': float;
  /**
   * Maximum distance a shape can be from another before they are considered separated and the contact is discarded. See {@link PhysicsServer3D.SPACE_PARAM_CONTACT_MAX_SEPARATION}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/solver/contact_max_separation': float;
  /**
   * Maximum distance a pair of bodies has to move before their collision status has to be recalculated. See {@link PhysicsServer3D.SPACE_PARAM_CONTACT_RECYCLE_RADIUS}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/solver/contact_recycle_radius': float;
  /**
   * Default solver bias for all physics contacts. Defines how much bodies react to enforce contact separation. See {@link PhysicsServer3D.SPACE_PARAM_CONTACT_DEFAULT_BIAS}.
   * Individual shapes can have a specific bias value (see {@link Shape3D.custom_solver_bias}).
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/solver/default_contact_bias': float;
  /**
   * Number of solver iterations for all contacts and constraints. The greater the number of iterations, the more accurate the collisions will be. However, a greater number of iterations requires more CPU power, which can decrease performance. See {@link PhysicsServer3D.SPACE_PARAM_SOLVER_ITERATIONS}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/solver/solver_iterations': int;
  /**
   * Time (in seconds) of inactivity before which a 3D physics body will put to sleep. See {@link PhysicsServer3D.SPACE_PARAM_BODY_TIME_TO_SLEEP}.
   * **Note:** This project setting is only effective when using GodotPhysics3D. It has no effect when using Jolt Physics.
   */
  'physics/3d/time_before_sleep': float;
  /** Enables {@link Viewport.physics_object_picking} on the root viewport. */
  'physics/common/enable_object_picking': boolean;
  /**
   * Controls the maximum number of physics steps that can be simulated each rendered frame. The default value is tuned to avoid situations where the framerate suddenly drops to a very low value beyond a certain amount of physics simulation. This occurs because the physics engine can't keep up with the expected simulation rate. In this case, the framerate will start dropping, but the engine is only allowed to simulate a certain number of physics steps per rendered frame. This snowballs into a situation where framerate keeps dropping until it reaches a very low framerate (typically 1-2 FPS) and is called the *physics spiral of death*.
   * However, the game will appear to slow down if the rendering FPS is less than `1 / max_physics_steps_per_frame` of {@link physics/common/physics_ticks_per_second}. This occurs even if `delta` is consistently used in physics calculations. To avoid this, increase {@link physics/common/max_physics_steps_per_frame} if you have increased {@link physics/common/physics_ticks_per_second} significantly above its default value.
   * **Note:** This property is only read when the project starts. To change the maximum number of simulated physics steps per frame at runtime, set {@link Engine.max_physics_steps_per_frame} instead.
   */
  'physics/common/max_physics_steps_per_frame': int;
  /**
   * If `true`, the renderer will interpolate the transforms of objects (both physics and non-physics) between the last two transforms, so that smooth motion is seen even when physics ticks do not coincide with rendered frames. See also {@link Node.reset_physics_interpolation}.
   * **Note:** Although this is a global setting, finer control of individual branches of the {@link SceneTree} is possible using {@link Node.physics_interpolation_mode}.
   * **Note:** This property is only read when the project starts. To toggle physics interpolation at runtime, set {@link SceneTree.physics_interpolation} instead.
   * **Note:** Property {@link physics/common/physics_jitter_fix} is automatically disabled if {@link physics/common/physics_interpolation} is set to `true`, as the two methods are incompatible.
   */
  'physics/common/physics_interpolation': boolean;
  /**
   * Controls how much physics ticks are synchronized with real time. For 0 or less, the ticks are synchronized. Such values are recommended for network games, where clock synchronization matters. Higher values cause higher deviation of in-game clock and real clock, but allows smoothing out framerate jitters. The default value of 0.5 should be good enough for most; values above 2 could cause the game to react to dropped frames with a noticeable delay and are not recommended.
   * **Note:** Jitter fix is automatically disabled at runtime when {@link physics/common/physics_interpolation} is enabled.
   * **Note:** When using a custom physics interpolation solution, the physics jitter fix should be disabled by setting {@link physics/common/physics_jitter_fix} to `0.0`.
   * **Note:** This property is only read when the project starts. To change the physics jitter fix at runtime, set {@link Engine.physics_jitter_fix} instead.
   */
  'physics/common/physics_jitter_fix': float;
  /**
   * The number of fixed iterations per second. This controls how often physics simulation and the {@link Node._physics_process} method are run.
   * CPU usage scales approximately with the physics tick rate. However, at very low tick rates (usually below 30), physics behavior can break down. Input can also become less responsive at low tick rates as there can be a gap between input being registered, and the response on the next physics tick. High tick rates give more accurate physics simulation, particularly for fast moving objects. For example, racing games may benefit from increasing the tick rate above the default 60.
   * See also {@link application/run/max_fps}.
   * **Note:** This property is only read when the project starts. To change the physics FPS at runtime, set {@link Engine.physics_ticks_per_second} instead.
   * **Note:** Only {@link physics/common/max_physics_steps_per_frame} physics ticks may be simulated per rendered frame at most. If more physics ticks have to be simulated per rendered frame to keep up with rendering, the project will appear to slow down (even if `delta` is used consistently in physics calculations). Therefore, it is recommended to also increase {@link physics/common/max_physics_steps_per_frame} if increasing {@link physics/common/physics_ticks_per_second} significantly above its default value.
   * **Note:** Consider enabling physics interpolation ($DOCS_URL/tutorials/physics/interpolation/index.html) if you change {@link physics/common/physics_ticks_per_second} to a value that is not a multiple of `60`. Using physics interpolation will avoid jittering when the monitor refresh rate and physics update rate don't exactly match.
   */
  'physics/common/physics_ticks_per_second': int;
  /**
   * The maximum angle, in radians, between two adjacent triangles in a {@link ConcavePolygonShape3D} or {@link HeightMapShape3D} for which the edge between those triangles is considered inactive.
   * Collisions against an inactive edge will have its normal overridden to instead be the surface normal of the triangle. This can help alleviate ghost collisions.
   * **Note:** Setting this too high can result in objects not depenetrating properly.
   * **Note:** This applies to all shape queries, as well as physics bodies within the simulation.
   * **Note:** This does not apply when enabling Jolt's enhanced internal edge removal, which supersedes this.
   */
  'physics/jolt_physics_3d/collisions/active_edge_threshold': float;
  /**
   * The amount of collision margin to use for certain convex collision shapes, such as {@link BoxShape3D}, {@link CylinderShape3D} and {@link ConvexPolygonShape3D}, as a fraction of the shape's shortest axis, with {@link Shape3D.margin} as the upper bound. This is mainly used to speed up collision detection with convex shapes.
   * **Note:** Collision margins in Jolt do not add any extra size to the shape. Instead the shape is first shrunk by the margin and then expanded by the same amount, resulting in a shape with rounded corners.
   * **Note:** Setting this value too close to `0.0` may also negatively affect the accuracy of the collision detection with convex shapes.
   */
  'physics/jolt_physics_3d/collisions/collision_margin_fraction': float;
  /**
   * Which of the two nodes bound by a joint should represent the world when one of the two is omitted, as either {@link Joint3D.node_a} or {@link Joint3D.node_b}. This can be thought of as having the omitted node be a {@link StaticBody3D} at the joint's position. Joint limits are more easily expressed when {@link Joint3D.node_a} represents the world.
   * **Note:** In Godot Physics, only {@link Joint3D.node_b} can represent the world.
   */
  'physics/jolt_physics_3d/joints/world_node': int;
  /**
   * The maximum angular velocity that a {@link RigidBody3D} can reach, in radians per second.
   * This is mainly used as a fail-safe, to prevent the simulation from exploding, as fast-moving objects colliding with complex physics structures can otherwise cause them to go out of control. Fast-moving objects can also cause a lot of stress on the collision detection system, which can slow down the simulation considerably.
   */
  'physics/jolt_physics_3d/limits/max_angular_velocity': float;
  /**
   * The maximum number of {@link PhysicsBody3D} to support at the same time, awake or sleeping. When this limit is exceeded, an error is reported and anything past that point is undefined behavior.
   * **Note:** This limit also applies within the editor.
   */
  'physics/jolt_physics_3d/limits/max_bodies': int;
  /**
   * The maximum number of body pairs to allow processing of. When this limit is exceeded, a warning is reported and collisions will randomly be ignored while bodies pass through each other.
   */
  'physics/jolt_physics_3d/limits/max_body_pairs': int;
  /**
   * The maximum number of contact constraints to allow processing of. When this limit is exceeded, a warning is reported and collisions will randomly be ignored while bodies pass through each other.
   */
  'physics/jolt_physics_3d/limits/max_contact_constraints': int;
  /**
   * The maximum linear velocity that a {@link RigidBody3D} can reach, in meters per second.
   * This is mainly used as a fail-safe, to prevent the simulation from exploding, as fast-moving objects colliding with complex physics structures can otherwise cause them to go out of control. Fast-moving objects can also cause a lot of stress on the collision detection system, which can slow down the simulation considerably.
   */
  'physics/jolt_physics_3d/limits/max_linear_velocity': float;
  /**
   * The amount of memory to pre-allocate for the stack allocator used within Jolt, in MiB. This allocator is used within the physics step to store things that are only needed during it, like which bodies are in contact, how they form islands and the data needed to solve the contacts.
   */
  'physics/jolt_physics_3d/limits/temporary_memory_buffer_size': int;
  /**
   * The size of {@link WorldBoundaryShape3D} boundaries, for all three dimensions. The plane is effectively centered within a box of this size, and anything outside of the box will not collide with it. This is necessary as {@link WorldBoundaryShape3D} is not unbounded when using Jolt, in order to prevent precision issues.
   * **Note:** Setting this value too high can make collision detection less accurate.
   * **Note:** Collisions against the effective edges of a {@link WorldBoundaryShape3D} will be inconsistent.
   */
  'physics/jolt_physics_3d/limits/world_boundary_shape_size': float;
  /**
   * Fraction of the total penetration to depenetrate per iteration during motion queries.
   * **Note:** This affects methods {@link CharacterBody3D.move_and_slide}, {@link PhysicsBody3D.move_and_collide}, {@link PhysicsBody3D.test_move} and {@link PhysicsServer3D.body_test_motion}.
   */
  'physics/jolt_physics_3d/motion_queries/recovery_amount': float;
  /**
   * The number of iterations to run when depenetrating during motion queries.
   * **Note:** This affects methods {@link CharacterBody3D.move_and_slide}, {@link PhysicsBody3D.move_and_collide}, {@link PhysicsBody3D.test_move} and {@link PhysicsServer3D.body_test_motion}.
   */
  'physics/jolt_physics_3d/motion_queries/recovery_iterations': int;
  /**
   * If `true`, enables Jolt's enhanced internal edge removal during motion queries. This can help alleviate ghost collisions, but only with edges within a single body, meaning edges between separate bodies can still cause ghost collisions.
   * **Note:** This affects methods {@link CharacterBody3D.move_and_slide}, {@link PhysicsBody3D.move_and_collide}, {@link PhysicsBody3D.test_move} and {@link PhysicsServer3D.body_test_motion}.
   */
  'physics/jolt_physics_3d/motion_queries/use_enhanced_internal_edge_removal': boolean;
  /**
   * If `true`, populates the `face_index` field in the results of {@link PhysicsDirectSpaceState3D.intersect_ray}, also accessed through {@link RayCast3D.get_collision_face_index}. If `false`, the `face_index` field will be left at its default value of `-1`.
   * **Note:** Enabling this setting will increase Jolt's memory usage for {@link ConcavePolygonShape3D} by around 25%.
   */
  'physics/jolt_physics_3d/queries/enable_ray_cast_face_index': boolean;
  /**
   * If `true`, enables Jolt's enhanced internal edge removal during shape queries. This can help alleviate ghost collisions when using shape queries for things like character movement, but only with edges within a single body, meaning edges between separate bodies can still cause ghost collisions.
   * **Note:** This affects methods {@link PhysicsDirectSpaceState3D.cast_motion}, {@link PhysicsDirectSpaceState3D.collide_shape}, {@link PhysicsDirectSpaceState3D.get_rest_info} and {@link PhysicsDirectSpaceState3D.intersect_shape}.
   * **Note:** Enabling this setting can cause certain shapes to be culled from the results entirely, but you will get at least one intersection per body.
   */
  'physics/jolt_physics_3d/queries/use_enhanced_internal_edge_removal': boolean;
  /**
   * If `true`, {@link RigidBody3D} nodes are allowed to go to sleep if their velocity is below the threshold defined in {@link physics/jolt_physics_3d/simulation/sleep_velocity_threshold} for the duration set in {@link physics/jolt_physics_3d/simulation/sleep_time_threshold}. This can improve physics simulation performance when there are non-moving {@link RigidBody3D} nodes, at the cost of some nodes possibly failing to wake up in certain scenarios. Consider disabling this temporarily to troubleshoot {@link RigidBody3D} nodes not moving when they should.
   */
  'physics/jolt_physics_3d/simulation/allow_sleep': boolean;
  /**
   * How much of the position error of a {@link RigidBody3D} to fix during a physics step, where `0.0` is none and `1.0` is the full amount. This affects things like how quickly bodies depenetrate.
   * **Note:** Setting this value too high can make {@link RigidBody3D} nodes unstable.
   */
  'physics/jolt_physics_3d/simulation/baumgarte_stabilization_factor': float;
  /**
   * The maximum relative angle by which a body pair can move and still reuse the collision results from the previous physics step, in radians.
   */
  'physics/jolt_physics_3d/simulation/body_pair_contact_cache_angle_threshold': float;
  /**
   * The maximum relative distance by which a body pair can move and still reuse the collision results from the previous physics step, in meters.
   */
  'physics/jolt_physics_3d/simulation/body_pair_contact_cache_distance_threshold': float;
  /**
   * If `true`, enables the body pair contact cache, which removes the need for potentially expensive collision detection when the relative orientation between two bodies hasn't changed much.
   */
  'physics/jolt_physics_3d/simulation/body_pair_contact_cache_enabled': boolean;
  /** The minimum velocity needed before a collision can be bouncy, in meters per second. */
  'physics/jolt_physics_3d/simulation/bounce_velocity_threshold': float;
  /**
   * Fraction of a body's inner radius that may penetrate another body while using continuous collision detection.
   */
  'physics/jolt_physics_3d/simulation/continuous_cd_max_penetration': float;
  /**
   * Fraction of a body's inner radius that the body must move per step to make use of continuous collision detection.
   */
  'physics/jolt_physics_3d/simulation/continuous_cd_movement_threshold': float;
  /**
   * If `true`, a {@link RigidBody3D} frozen with {@link RigidBody3D.FREEZE_MODE_KINEMATIC} is able to collide with other kinematic and static bodies, and therefore generate contacts for them.
   * **Note:** This setting can come at a heavy CPU and memory cost if you allow many/large frozen kinematic bodies with a non-zero {@link RigidBody3D.max_contacts_reported} to overlap with complex static geometry, such as {@link ConcavePolygonShape3D} or {@link HeightMapShape3D}.
   */
  'physics/jolt_physics_3d/simulation/generate_all_kinematic_contacts': boolean;
  /** How much bodies are allowed to penetrate each other, in meters. */
  'physics/jolt_physics_3d/simulation/penetration_slop': float;
  /**
   * Number of solver position iterations. The greater the number of iterations, the more accurate the simulation will be, at the cost of CPU performance.
   */
  'physics/jolt_physics_3d/simulation/position_steps': int;
  /**
   * Time in seconds a {@link RigidBody3D} will spend below the sleep velocity threshold before going to sleep.
   */
  'physics/jolt_physics_3d/simulation/sleep_time_threshold': float;
  /**
   * The linear velocity of specific points on the bounding box of a {@link RigidBody3D}, below which it can be put to sleep, in meters per second. These points help capture both the linear and angular motion of a {@link RigidBody3D}.
   */
  'physics/jolt_physics_3d/simulation/sleep_velocity_threshold': float;
  /**
   * How big the points of a {@link SoftBody3D} are, in meters. A higher value can prevent behavior such as cloth laying perfectly flush against other surfaces and causing Z-fighting.
   */
  'physics/jolt_physics_3d/simulation/soft_body_point_radius': float;
  /**
   * Radius around physics bodies, inside which speculative contact points will be detected, in meters. This is mainly used to prevent tunneling/penetration for {@link RigidBody3D} nodes during simulation.
   * **Note:** Setting this too high may result in ghost collisions, as speculative contacts are based on the closest points during the collision detection step which may not be the actual closest points by the time the two bodies hit.
   */
  'physics/jolt_physics_3d/simulation/speculative_contact_distance': float;
  /**
   * If `true`, enables Jolt's enhanced internal edge removal for {@link RigidBody3D}. This can help alleviate ghost collisions when, for example, a {@link RigidBody3D} collides with the edges of two perfectly joined {@link BoxShape3D}. The removal only applies to edges internal to a single body, meaning edges between separate bodies can still cause ghost collisions.
   */
  'physics/jolt_physics_3d/simulation/use_enhanced_internal_edge_removal': boolean;
  /**
   * Number of solver velocity iterations. The greater the number of iterations, the more accurate the simulation will be, at the cost of CPU performance.
   * **Note:** This needs to be at least `2` in order for friction to work, as friction is applied using the non-penetration impulse from the previous iteration.
   */
  'physics/jolt_physics_3d/simulation/velocity_steps': int;
  /** Maximum number of canvas item commands that can be batched into a single draw call. */
  'rendering/2d/batching/item_buffer_size': int;
  /**
   * Maximum number of uniform sets that will be cached by the 2D renderer when batching draw calls.
   * **Note:** Increasing this value can improve performance if the project renders many unique sprite textures every frame.
   */
  'rendering/2d/batching/uniform_set_cache_size': int;
  /**
   * Controls how much of the original viewport size should be covered by the 2D signed distance field. This SDF can be sampled in {@link CanvasItem} shaders and is used for {@link GPUParticles2D} collision. Higher values allow portions of occluders located outside the viewport to still be taken into account in the generated signed distance field, at the cost of performance. If you notice particles falling through {@link LightOccluder2D}s as the occluders leave the viewport, increase this setting.
   * The percentage specified is added on each axis and on both sides. For example, with the default setting of 120%, the signed distance field will cover 20% of the viewport's size outside the viewport on each side (top, right, bottom, left).
   * **Note:** This property is only read when the project starts. To change the 2D SDF oversizing percentage at runtime, use {@link RenderingServer.viewport_set_sdf_oversize_and_scale} instead.
   */
  'rendering/2d/sdf/oversize': int;
  /**
   * The resolution scale to use for the 2D signed distance field. Higher values lead to a more precise and more stable signed distance field as the camera moves, at the cost of performance. The default value (50%) renders at half the resolution of the viewport size on each axis, which means the SDF is generated with 25% of the viewport's pixel count.
   * **Note:** This property is only read when the project starts. To change the 2D SDF resolution scale at runtime, use {@link RenderingServer.viewport_set_sdf_oversize_and_scale} instead.
   */
  'rendering/2d/sdf/scale': int;
  /**
   * The size of the 2D shadow atlas in pixels. Higher values result in more precise {@link Light2D} shadows, at the cost of performance and video memory usage. The specified value is rounded up to the nearest power of 2.
   * **Note:** This property is only read when the project starts. To change the 2D shadow atlas size at runtime, use {@link RenderingServer.canvas_set_shadow_texture_size} instead.
   */
  'rendering/2d/shadow_atlas/size': int;
  /**
   * If `true`, {@link CanvasItem} nodes will internally snap to full pixels. Useful for low-resolution pixel art games. Their position can still be sub-pixel, but the decimals will not have effect as the position is rounded. This can lead to a crisper appearance at the cost of less smooth movement, especially when {@link Camera2D} smoothing is enabled.
   * **Note:** This property is only read when the project starts. To toggle 2D transform snapping at runtime, use {@link RenderingServer.viewport_set_snap_2d_transforms_to_pixel} on the root {@link Viewport} instead.
   * **Note:** {@link Control} nodes are snapped to the nearest pixel by default. This is controlled by {@link gui/common/snap_controls_to_pixels}.
   * **Note:** It is not recommended to use this setting together with {@link rendering/2d/snap/snap_2d_vertices_to_pixel}, as movement may appear even less smooth. Prefer only enabling this setting instead.
   */
  'rendering/2d/snap/snap_2d_transforms_to_pixel': boolean;
  /**
   * If `true`, vertices of {@link CanvasItem} nodes will snap to full pixels. Useful for low-resolution pixel art games. Only affects the final vertex positions, not the transforms. This can lead to a crisper appearance at the cost of less smooth movement, especially when {@link Camera2D} smoothing is enabled.
   * **Note:** This property is only read when the project starts. To toggle 2D vertex snapping at runtime, use {@link RenderingServer.viewport_set_snap_2d_vertices_to_pixel} on the root {@link Viewport} instead.
   * **Note:** {@link Control} nodes are snapped to the nearest pixel by default. This is controlled by {@link gui/common/snap_controls_to_pixels}.
   * **Note:** It is not recommended to use this setting together with {@link rendering/2d/snap/snap_2d_transforms_to_pixel}, as movement may appear even less smooth. Prefer only enabling that setting instead.
   */
  'rendering/2d/snap/snap_2d_vertices_to_pixel': boolean;
  /**
   * Sets the number of multisample antialiasing (MSAA) samples to use for 2D/Canvas rendering (as a power of two). MSAA is used to reduce aliasing around the edges of polygons. A higher MSAA value results in smoother edges but can be significantly slower on some hardware, especially integrated graphics due to their limited memory bandwidth. This has no effect on shader-induced aliasing or texture aliasing.
   * **Note:** MSAA is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** This property is only read when the project starts. To set the number of 2D MSAA samples at runtime, set {@link Viewport.msaa_2d} or use {@link RenderingServer.viewport_set_msaa_2d}.
   */
  'rendering/anti_aliasing/quality/msaa_2d': int;
  /**
   * Sets the number of multisample antialiasing (MSAA) samples to use for 3D rendering (as a power of two). MSAA is used to reduce aliasing around the edges of polygons. A higher MSAA value results in smoother edges but can be significantly slower on some hardware, especially integrated graphics due to their limited memory bandwidth. See also {@link rendering/scaling_3d/mode} for supersampling, which provides higher quality but is much more expensive. This has no effect on shader-induced aliasing or texture aliasing.
   * **Note:** This property is only read when the project starts. To set the number of 3D MSAA samples at runtime, set {@link Viewport.msaa_3d} or use {@link RenderingServer.viewport_set_msaa_3d}.
   */
  'rendering/anti_aliasing/quality/msaa_3d': int;
  /**
   * Sets the screen-space antialiasing mode for the default screen {@link Viewport}. Screen-space antialiasing works by selectively blurring edges in a post-process shader. It differs from MSAA which takes multiple coverage samples while rendering objects. Screen-space AA methods are typically faster than MSAA and will smooth out specular aliasing, but tend to make scenes appear blurry. The blurriness is partially counteracted by automatically using a negative mipmap LOD bias (see {@link rendering/textures/default_filters/texture_mipmap_bias}).
   * Another way to combat specular aliasing is to enable {@link rendering/anti_aliasing/screen_space_roughness_limiter/enabled}.
   * **Note:** Screen-space antialiasing is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** This property is only read when the project starts. To set the screen-space antialiasing mode at runtime, set {@link Viewport.screen_space_aa} on the root {@link Viewport} instead, or use {@link RenderingServer.viewport_set_screen_space_aa}.
   */
  'rendering/anti_aliasing/quality/screen_space_aa': int;
  /**
   * Sets the sensitivity to edges when using SMAA for antialiasing. Lower values will catch more edges, at a potentially higher performance cost.
   * **Note:** This property is only read when the project starts. There is currently no way to change this setting at run-time.
   */
  'rendering/anti_aliasing/quality/smaa_edge_detection_threshold': float;
  /**
   * If `true`, uses a fast dithering filter just before transforming floating point color values to integer color values to make banding significantly less visible. Debanding is applied at different steps of the rendering process depending on the rendering method and {@link rendering/viewport/hdr_2d} setting.
   * In some cases, debanding may introduce a slightly noticeable dithering pattern. It's recommended to enable debanding only when actually needed since the dithering pattern will make lossless-compressed screenshots larger.
   * **Note:** This property is only read when the project starts and configures {@link RenderingServer.material_set_use_debanding} and {@link Viewport.use_debanding} of the root {@link Viewport}. When {@link rendering/viewport/hdr_2d} is disabled, you should additionally set the {@link Viewport.use_debanding} of other viewports in your project. To set debanding at run-time, the property that should be set depends on the renderer: Forward+ only uses {@link Viewport.use_debanding} and Mobile uses both {@link RenderingServer.material_set_use_debanding} and {@link Viewport.use_debanding}.
   */
  'rendering/anti_aliasing/quality/use_debanding': boolean;
  /**
   * Enables temporal antialiasing for the default screen {@link Viewport}. TAA works by jittering the camera and accumulating the images of the last rendered frames, motion vector rendering is used to account for camera and object motion. Enabling TAA can make the image blurrier, which is partially counteracted by automatically using a negative mipmap LOD bias (see {@link rendering/textures/default_filters/texture_mipmap_bias}).
   * **Note:** The implementation is not complete yet. Some visual instances such as particles and skinned meshes may show ghosting artifacts in motion.
   * **Note:** TAA is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   * **Note:** This property is only read when the project starts. To set TAA at runtime, set {@link Viewport.use_taa} on the root {@link Viewport} instead, or use {@link RenderingServer.viewport_set_use_taa}.
   */
  'rendering/anti_aliasing/quality/use_taa': boolean;
  /**
   * **Note:** This property is only read when the project starts. To control the screen-space roughness limiter at runtime, call {@link RenderingServer.screen_space_roughness_limiter_set_active} instead.
   */
  'rendering/anti_aliasing/screen_space_roughness_limiter/amount': float;
  /**
   * If `true`, enables a spatial filter to limit roughness in areas with high-frequency detail. This can help reduce specular aliasing to an extent, though not as much as enabling {@link rendering/anti_aliasing/quality/use_taa}. This filter has a small performance cost, so consider disabling it if it doesn't benefit your scene noticeably.
   * **Note:** The screen-space roughness limiter is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   * **Note:** This property is only read when the project starts. To control the screen-space roughness limiter at runtime, call {@link RenderingServer.screen_space_roughness_limiter_set_active} instead.
   */
  'rendering/anti_aliasing/screen_space_roughness_limiter/enabled': boolean;
  /**
   * **Note:** This property is only read when the project starts. To control the screen-space roughness limiter at runtime, call {@link RenderingServer.screen_space_roughness_limiter_set_active} instead.
   */
  'rendering/anti_aliasing/screen_space_roughness_limiter/limit': float;
  /**
   * Sets the quality of the depth of field effect. Higher quality takes more samples, which is slower but looks smoother.
   */
  'rendering/camera/depth_of_field/depth_of_field_bokeh_quality': int;
  /**
   * Sets the depth of field shape. Can be Box, Hexagon, or Circle. Box is the fastest. Circle is the most realistic, but also the most expensive to compute.
   */
  'rendering/camera/depth_of_field/depth_of_field_bokeh_shape': int;
  /**
   * If `true`, jitters DOF samples to make effect slightly blurrier and hide lines created from low sample rates. This can result in a slightly grainy appearance when used with a low number of samples.
   */
  'rendering/camera/depth_of_field/depth_of_field_use_jitter': boolean;
  /**
   * Disables {@link rendering/driver/depth_prepass/enable} conditionally for certain vendors. By default, disables the depth prepass for mobile devices as mobile devices do not benefit from the depth prepass due to their unique architecture.
   */
  'rendering/driver/depth_prepass/disable_for_vendors': string;
  /**
   * If `true`, performs a previous depth pass before rendering 3D materials. This increases performance significantly in scenes with high overdraw, when complex materials and lighting are used. However, in scenes with few occluded surfaces, the depth prepass may reduce performance. If your game is viewed from a fixed angle that makes it easy to avoid overdraw (such as top-down or side-scrolling perspective), consider disabling the depth prepass to improve performance. This setting can be changed at run-time to optimize performance depending on the scene currently being viewed.
   * **Note:** Depth prepass is only supported when using the Forward+ or Compatibility rendering method. When using the Mobile rendering method, there is no depth prepass performed.
   */
  'rendering/driver/depth_prepass/enable': boolean;
  /**
   * The thread model to use for rendering. Rendering on a thread may improve performance, but synchronizing to the main thread can cause a bit more jitter.
   */
  'rendering/driver/threads/thread_model': int;
  /**
   * Default background clear color. Overridable per {@link Viewport} using its {@link Environment}. See {@link Environment.background_mode} and {@link Environment.background_color} in particular. To change this default color programmatically, use {@link RenderingServer.set_default_clear_color}.
   */
  'rendering/environment/defaults/default_clear_color': Color;
  /**
   * {@link Environment} that will be used as a fallback environment in case a scene does not specify its own environment. The default environment is loaded in at scene load time regardless of whether you have set an environment or not. If you do not rely on the fallback environment, you do not need to set this property.
   */
  'rendering/environment/defaults/default_environment': string;
  /**
   * Sets how the glow effect is upscaled before being copied onto the screen. Linear is faster, but looks blocky. Bicubic is slower but looks smooth.
   * **Note:** {@link rendering/environment/glow/upscale_mode} is only effective when using the Forward+ or Mobile rendering methods, as Compatibility uses a different glow implementation.
   */
  'rendering/environment/glow/upscale_mode': int;
  /**
   * Lower-end override for {@link rendering/environment/glow/upscale_mode} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/environment/glow/upscale_mode.mobile': int;
  /**
   * If `true`, screen-space reflections will be rendered at half size and then upscaled before being added to the scene. This is faster but may look pixelated or cause flickering. If `false`, screen-space reflections will be rendered at full size.
   */
  'rendering/environment/screen_space_reflection/half_size': boolean;
  /**
   * Quality target to use when {@link rendering/environment/ssao/quality} is set to `Ultra`. A value of `0.0` provides a quality and speed similar to `Medium` while a value of `1.0` provides much higher quality than any of the other settings at the cost of performance.
   */
  'rendering/environment/ssao/adaptive_target': float;
  /**
   * Number of blur passes to use when computing screen-space ambient occlusion. A higher number will result in a smoother look, but will be slower to compute and will have less high-frequency detail.
   */
  'rendering/environment/ssao/blur_passes': int;
  /**
   * Distance at which the screen-space ambient occlusion effect starts to fade out. Use this hide ambient occlusion from far away.
   */
  'rendering/environment/ssao/fadeout_from': float;
  /**
   * Distance at which the screen-space ambient occlusion is fully faded out. Use this hide ambient occlusion from far away.
   */
  'rendering/environment/ssao/fadeout_to': float;
  /**
   * If `true`, screen-space ambient occlusion will be rendered at half size and then upscaled before being added to the scene. This is significantly faster but may miss small details. If `false`, screen-space ambient occlusion will be rendered at full size.
   */
  'rendering/environment/ssao/half_size': boolean;
  /**
   * Sets the quality of the screen-space ambient occlusion effect. Higher values take more samples and so will result in better quality, at the cost of performance. Setting to `Ultra` will use the {@link rendering/environment/ssao/adaptive_target} setting.
   */
  'rendering/environment/ssao/quality': int;
  /**
   * Quality target to use when {@link rendering/environment/ssil/quality} is set to `Ultra`. A value of `0.0` provides a quality and speed similar to `Medium` while a value of `1.0` provides much higher quality than any of the other settings at the cost of performance. When using the adaptive target, the performance cost scales with the complexity of the scene.
   */
  'rendering/environment/ssil/adaptive_target': float;
  /**
   * Number of blur passes to use when computing screen-space indirect lighting. A higher number will result in a smoother look, but will be slower to compute and will have less high-frequency detail.
   */
  'rendering/environment/ssil/blur_passes': int;
  /**
   * Distance at which the screen-space indirect lighting effect starts to fade out. Use this to hide screen-space indirect lighting from far away.
   */
  'rendering/environment/ssil/fadeout_from': float;
  /**
   * Distance at which the screen-space indirect lighting is fully faded out. Use this to hide screen-space indirect lighting from far away.
   */
  'rendering/environment/ssil/fadeout_to': float;
  /**
   * If `true`, screen-space indirect lighting will be rendered at half size and then upscaled before being added to the scene. This is significantly faster but may miss small details and may result in some objects appearing to glow at their edges.
   */
  'rendering/environment/ssil/half_size': boolean;
  /**
   * Sets the quality of the screen-space indirect lighting effect. Higher values take more samples and so will result in better quality, at the cost of performance. Setting to `Ultra` will use the {@link rendering/environment/ssil/adaptive_target} setting.
   */
  'rendering/environment/ssil/quality': int;
  /**
   * Scales the depth over which the subsurface scattering effect is applied. A high value may allow light to scatter into a part of the mesh or another mesh that is close in screen space but far in depth. See also {@link rendering/environment/subsurface_scattering/subsurface_scattering_scale}.
   * **Note:** This property is only read when the project starts. To set the subsurface scattering depth scale at runtime, call {@link RenderingServer.sub_surface_scattering_set_scale} instead.
   */
  'rendering/environment/subsurface_scattering/subsurface_scattering_depth_scale': float;
  /**
   * Sets the quality of the subsurface scattering effect. Higher values are slower but look nicer. This affects the rendering of materials that have {@link BaseMaterial3D.subsurf_scatter_enabled} set to `true`, along with {@link ShaderMaterial}s that set `SSS_STRENGTH`.
   * **Note:** This property is only read when the project starts. To set the subsurface scattering quality at runtime, call {@link RenderingServer.sub_surface_scattering_set_quality} instead.
   */
  'rendering/environment/subsurface_scattering/subsurface_scattering_quality': int;
  /**
   * Scales the distance over which samples are taken for subsurface scattering effect. Changing this does not impact performance, but higher values will result in significant artifacts as the samples will become obviously spread out. A lower value results in a smaller spread of scattered light. See also {@link rendering/environment/subsurface_scattering/subsurface_scattering_depth_scale}.
   * **Note:** This property is only read when the project starts. To set the subsurface scattering scale at runtime, call {@link RenderingServer.sub_surface_scattering_set_scale} instead.
   */
  'rendering/environment/subsurface_scattering/subsurface_scattering_scale': float;
  /**
   * Enables filtering of the volumetric fog effect prior to integration. This substantially blurs the fog which reduces fine details but also smooths out harsh edges and aliasing artifacts. Disable when more detail is required.
   */
  'rendering/environment/volumetric_fog/use_filter': int;
  /**
   * Number of slices to use along the depth of the froxel buffer for volumetric fog. A lower number will be more efficient but may result in artifacts appearing during camera movement. See also {@link Environment.volumetric_fog_length}.
   */
  'rendering/environment/volumetric_fog/volume_depth': int;
  /**
   * Base size used to determine size of froxel buffer in the camera X-axis and Y-axis. The final size is scaled by the aspect ratio of the screen, so actual values may differ from what is set. Set a larger size for more detailed fog, set a smaller size for better performance.
   */
  'rendering/environment/volumetric_fog/volume_size': int;
  /**
   * Sets the driver to be used by the renderer when using the Compatibility renderer. Editing this property has no effect in the default configuration, as first-party platforms each have platform-specific overrides. Use those overrides to configure the driver for each platform.
   * This can be overridden using the `--rendering-driver <driver>` command line argument.
   * Supported values are:
   * - `opengl3`, OpenGL 3.3 on desktop platforms, OpenGL ES 3.0 on mobile platforms, WebGL 2.0 on web.
   * - `opengl3_angle`, OpenGL ES 3.0 using the ANGLE compatibility layer, supported on macOS (over native OpenGL) and Windows (over Direct3D 11).
   * - `opengl3_es`, OpenGL ES 3.0 on Linux/BSD.
   * **Note:** The availability of these options depends on whether the engine was compiled with support for them (determined by SCons options `opengl3` and `angle_libs`).
   * **Note:** The actual rendering driver may be automatically changed by the engine as a result of a fallback, or a user-specified command line argument. To get the actual rendering driver that is used at runtime, use {@link RenderingServer.get_current_rendering_driver_name} instead of reading this project setting's value.
   */
  'rendering/gl_compatibility/driver': string;
  /**
   * Android override for {@link rendering/gl_compatibility/driver}.
   * Only one option is supported:
   * - `opengl3`, OpenGL ES 3.0 from native drivers.
   */
  'rendering/gl_compatibility/driver.android': string;
  /**
   * iOS override for {@link rendering/gl_compatibility/driver}.
   * Only one option is supported:
   * - `opengl3`, OpenGL ES 3.0 from native drivers.
   */
  'rendering/gl_compatibility/driver.ios': string;
  /**
   * LinuxBSD override for {@link rendering/gl_compatibility/driver}.
   * Two options are supported:
   * - `opengl3` (default), OpenGL 3.3 from native drivers.
   * - `opengl3_es`, OpenGL ES 3.0 from native drivers. If {@link rendering/gl_compatibility/fallback_to_gles} is enabled, this is used as a fallback if OpenGL 3.3 is not supported.
   */
  'rendering/gl_compatibility/driver.linuxbsd': string;
  /**
   * macOS override for {@link rendering/gl_compatibility/driver}.
   * Two options are supported:
   * - `opengl3` (default), OpenGL 3.3 from native drivers. If {@link rendering/gl_compatibility/fallback_to_native} is enabled, this is used as a fallback if ANGLE is configured as the preferred driver but not supported.
   * - `opengl3_angle`, OpenGL ES 3.0 using the ANGLE compatibility layer over native OpenGL drivers. If {@link rendering/gl_compatibility/fallback_to_angle} is enabled, this is used as a fallback if OpenGL 3.3 is not supported.
   */
  'rendering/gl_compatibility/driver.macos': string;
  /**
   * Web override for {@link rendering/gl_compatibility/driver}.
   * Only one option is supported:
   * - `opengl3`, WebGL 2.0. The underlying native API depends on the target OS, browser, and browser configuration.
   */
  'rendering/gl_compatibility/driver.web': string;
  /**
   * Windows override for {@link rendering/gl_compatibility/driver}.
   * Two options are supported:
   * - `opengl3` (default), OpenGL 3.3 from native drivers. If {@link rendering/gl_compatibility/fallback_to_native} is enabled, this is used as a fallback if ANGLE is configured as the preferred driver but not supported.
   * - `opengl3_angle`, OpenGL ES 3.0 using the ANGLE compatibility layer over native Direct3D 11 drivers. If {@link rendering/gl_compatibility/fallback_to_angle} is enabled, this is used as a fallback if OpenGL 3.3 is not supported. By default, ANGLE is used as the default driver for some devices listed in {@link rendering/gl_compatibility/force_angle_on_devices}.
   */
  'rendering/gl_compatibility/driver.windows': string;
  /**
   * If `true`, the Compatibility renderer will fall back to ANGLE if native OpenGL is not supported or the device is listed in {@link rendering/gl_compatibility/force_angle_on_devices}.
   * **Note:** This setting is implemented only on Windows.
   */
  'rendering/gl_compatibility/fallback_to_angle': boolean;
  /**
   * If `true`, the Compatibility renderer will fall back to OpenGLES if desktop OpenGL is not supported.
   * **Note:** This setting is implemented only on Linux/X11.
   */
  'rendering/gl_compatibility/fallback_to_gles': boolean;
  /**
   * If `true`, the Compatibility renderer will fall back to native OpenGL if ANGLE is not supported, or ANGLE dynamic libraries aren't found.
   * **Note:** This setting is implemented on macOS and Windows.
   */
  'rendering/gl_compatibility/fallback_to_native': boolean;
  /**
   * An {@link Array} of devices which should always use the ANGLE renderer.
   * Each entry is a {@link Dictionary} with the following keys: `vendor` and `name`. `name` can be set to `*` to add all devices with the specified `vendor`.
   * **Note:** This setting is implemented only on Windows.
   */
  'rendering/gl_compatibility/force_angle_on_devices': Array<unknown>;
  /**
   * Maximum number of canvas items commands that can be drawn in a single viewport update. If more render commands are issued they will be ignored. Decreasing this limit may improve performance on bandwidth limited devices. Increase this limit if you find that not all objects are being drawn in a frame.
   */
  'rendering/gl_compatibility/item_buffer_size': int;
  /**
   * If `true`, disables the threaded optimization feature from the NVIDIA drivers, which are known to cause stuttering in most OpenGL applications.
   * **Note:** This setting only works on Windows, as threaded optimization is disabled by default on other platforms.
   */
  'rendering/gl_compatibility/nvidia_disable_threaded_optimization': boolean;
  /**
   * If `true`, renders {@link VoxelGI} and SDFGI ({@link Environment.sdfgi_enabled}) buffers at halved resolution (e.g. 960×540 when the viewport size is 1920×1080). This improves performance significantly when VoxelGI or SDFGI is enabled, at the cost of artifacts that may be visible on polygon edges. The loss in quality becomes less noticeable as the viewport resolution increases. {@link LightmapGI} rendering is not affected by this setting.
   * **Note:** This property is only read when the project starts. To set half-resolution GI at run-time, call {@link RenderingServer.gi_set_use_half_resolution} instead.
   */
  'rendering/global_illumination/gi/use_half_resolution': boolean;
  /**
   * The number of frames to use for converging signed distance field global illumination. Higher values lead to a less noisy result, at the cost of taking a longer time to fully converge. This means the scene's global illumination will be too dark for a longer period of time, especially when the camera moves fast. The actual convergence speed depends on rendered framerate. For example, with the default setting of 30 frames, rendering at 60 FPS will make SDFGI fully converge after 0.5 seconds. See also {@link rendering/global_illumination/sdfgi/frames_to_update_lights} and {@link rendering/global_illumination/sdfgi/probe_ray_count}.
   * **Note:** This property is only read when the project starts. To control SDFGI convergence speed at runtime, call {@link RenderingServer.environment_set_sdfgi_frames_to_converge} instead.
   */
  'rendering/global_illumination/sdfgi/frames_to_converge': int;
  /**
   * The number of frames over which dynamic lights should be updated in signed distance field global illumination. Higher values take more time to update indirect lighting coming from dynamic lights, but result in better performance when many dynamic lights are present. See also {@link rendering/global_illumination/sdfgi/frames_to_converge} and {@link rendering/global_illumination/sdfgi/probe_ray_count}.
   * **Note:** This only affects {@link Light3D} nodes whose {@link Light3D.light_bake_mode} is {@link Light3D.BAKE_DYNAMIC} (which is the default). Consider making non-moving lights use the {@link Light3D.BAKE_STATIC} bake mode to improve performance.
   * **Note:** This property is only read when the project starts. To control SDFGI light update speed at runtime, call {@link RenderingServer.environment_set_sdfgi_frames_to_update_light} instead.
   */
  'rendering/global_illumination/sdfgi/frames_to_update_lights': int;
  /**
   * The number of rays to throw per frame when computing signed distance field global illumination. Higher values lead to a less noisy result, at the cost of performance. See also {@link rendering/global_illumination/sdfgi/frames_to_converge} and {@link rendering/global_illumination/sdfgi/frames_to_update_lights}.
   * **Note:** This property is only read when the project starts. To control SDFGI quality at runtime, call {@link RenderingServer.environment_set_sdfgi_ray_count} instead.
   */
  'rendering/global_illumination/sdfgi/probe_ray_count': int;
  /**
   * The VoxelGI quality to use. High quality leads to more precise lighting and better reflections, but is slower to render. This setting does not affect the baked data and doesn't require baking the {@link VoxelGI} again to apply.
   * **Note:** This property is only read when the project starts. To control VoxelGI quality at runtime, call {@link RenderingServer.voxel_gi_set_quality} instead.
   */
  'rendering/global_illumination/voxel_gi/quality': int;
  /**
   * The maximum number of rays that can be thrown per pass when baking lightmaps with {@link LightmapGI}. Depending on the scene, adjusting this value may result in higher GPU utilization when baking lightmaps, leading to faster bake times.
   * **Note:** Using a value that is too high for your system can cause crashes due to the GPU being unresponsive for long periods of time, and the graphics driver being reset by the OS.
   */
  'rendering/lightmapping/bake_performance/max_rays_per_pass': int;
  /**
   * The maximum number of rays that can be thrown per pass when baking dynamic object lighting in {@link LightmapProbe}s with {@link LightmapGI}. Depending on the scene, adjusting this value may result in higher GPU utilization when baking lightmaps, leading to faster bake times.
   * **Note:** Using a value that is too high for your system can cause crashes due to the GPU being unresponsive for long periods of time, and the graphics driver being reset by the OS.
   */
  'rendering/lightmapping/bake_performance/max_rays_per_probe_pass': int;
  /**
   * The maximum number of retry rays that can be thrown per pass when hitting a transparent surface when baking lightmaps with {@link LightmapGI}. Depending on the scene, reducing this value may lead to faster bake times.
   * **Note:** Using a value that is too high for your system can cause crashes due to the GPU being unresponsive for long periods of time, and the graphics driver being reset by the OS.
   */
  'rendering/lightmapping/bake_performance/max_transparency_rays': int;
  /**
   * The region size to use when baking lightmaps with {@link LightmapGI}. The specified value is rounded up to the nearest power of 2.
   * **Note:** Using a value that is too high for your system can cause crashes due to the GPU being unresponsive for long periods of time, and the graphics driver being reset by the OS.
   */
  'rendering/lightmapping/bake_performance/region_size': int;
  /**
   * The number of rays to use for baking dynamic object lighting in {@link LightmapProbe}s when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_HIGH}.
   */
  'rendering/lightmapping/bake_quality/high_quality_probe_ray_count': int;
  /**
   * The number of rays to use for baking lightmaps with {@link LightmapGI} when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_HIGH}.
   */
  'rendering/lightmapping/bake_quality/high_quality_ray_count': int;
  /**
   * The number of rays to use for baking dynamic object lighting in {@link LightmapProbe}s when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_LOW}.
   */
  'rendering/lightmapping/bake_quality/low_quality_probe_ray_count': int;
  /**
   * The number of rays to use for baking lightmaps with {@link LightmapGI} when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_LOW}.
   */
  'rendering/lightmapping/bake_quality/low_quality_ray_count': int;
  /**
   * The number of rays to use for baking dynamic object lighting in {@link LightmapProbe}s when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_MEDIUM}.
   */
  'rendering/lightmapping/bake_quality/medium_quality_probe_ray_count': int;
  /**
   * The number of rays to use for baking lightmaps with {@link LightmapGI} when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_MEDIUM}.
   */
  'rendering/lightmapping/bake_quality/medium_quality_ray_count': int;
  /**
   * The number of rays to use for baking dynamic object lighting in {@link LightmapProbe}s when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_ULTRA}.
   */
  'rendering/lightmapping/bake_quality/ultra_quality_probe_ray_count': int;
  /**
   * The number of rays to use for baking lightmaps with {@link LightmapGI} when {@link LightmapGI.quality} is {@link LightmapGI.BAKE_QUALITY_ULTRA}.
   */
  'rendering/lightmapping/bake_quality/ultra_quality_ray_count': int;
  /**
   * Denoiser tool used for denoising lightmaps.
   * Using OpenImageDenoise (https://www.openimagedenoise.org/) (OIDN) requires configuring a path to an OIDN executable in the editor settings at {@link EditorSettings.filesystem/tools/oidn/oidn_denoise_path}. OIDN can be downloaded from OpenImageDenoise's downloads page (https://www.openimagedenoise.org/downloads.html).
   * OIDN will use GPU acceleration when available. Unlike JNLM which uses compute shaders for acceleration, OIDN uses vendor-specific acceleration methods. For GPU acceleration to be available, the following libraries must be installed on the system depending on your GPU:
   * - NVIDIA GPUs: CUDA libraries
   * - AMD GPUs: HIP libraries
   * - Intel GPUs: SYCL libraries
   * If no GPU acceleration is configured on the system, multi-threaded CPU-based denoising will be performed instead. This CPU-based denoising is significantly slower than the JNLM denoiser in most cases.
   */
  'rendering/lightmapping/denoising/denoiser': int;
  /**
   * If `true`, applies a bicubic filter during lightmap sampling. This makes lightmaps look much smoother, at a moderate performance cost.
   * **Note:** The bicubic filter exaggerates the 'bleeding' effect that occurs when a lightmap's resolution is low enough.
   */
  'rendering/lightmapping/lightmap_gi/use_bicubic_filter': boolean;
  /**
   * The texel_size that is used to calculate the {@link Mesh.lightmap_size_hint} on {@link PrimitiveMesh} resources if {@link PrimitiveMesh.add_uv2} is enabled.
   */
  'rendering/lightmapping/primitive_meshes/texel_size': float;
  /**
   * The framerate-independent update speed when representing dynamic object lighting from {@link LightmapProbe}s. Higher values make dynamic object lighting update faster. Higher values can prevent fast-moving objects from having "outdated" indirect lighting displayed on them, at the cost of possible flickering when an object moves from a bright area to a shaded area.
   * **Note:** This property is only read when the project starts. To adjust the BVH build quality at runtime, use {@link RenderingServer.lightmap_set_probe_capture_update_speed}.
   */
  'rendering/lightmapping/probe_capture/update_speed': float;
  /**
   * Use 16 bits for the directional shadow depth map. Enabling this results in shadows having less precision and may result in shadow acne, but can lead to performance improvements on some devices.
   */
  'rendering/lights_and_shadows/directional_shadow/16_bits': boolean;
  /**
   * The directional shadow's size in pixels. Higher values will result in sharper shadows, at the cost of performance. The value is rounded up to the nearest power of 2.
   */
  'rendering/lights_and_shadows/directional_shadow/size': int;
  /**
   * Lower-end override for {@link rendering/lights_and_shadows/directional_shadow/size} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/lights_and_shadows/directional_shadow/size.mobile': int;
  /**
   * Quality setting for shadows cast by {@link DirectionalLight3D}s. Higher quality settings use more samples when reading from shadow maps and are thus slower. Low quality settings may result in shadows looking grainy.
   * **Note:** The Soft Very Low setting will automatically multiply *constant* shadow blur by 0.75x to reduce the amount of noise visible. This automatic blur change only affects the constant blur factor defined in {@link Light3D.shadow_blur}, not the variable blur performed by {@link DirectionalLight3D}s' {@link Light3D.light_angular_distance}.
   * **Note:** The Soft High and Soft Ultra settings will automatically multiply *constant* shadow blur by 1.5× and 2× respectively to make better use of the increased sample count. This increased blur also improves stability of dynamic object shadows.
   */
  'rendering/lights_and_shadows/directional_shadow/soft_shadow_filter_quality': int;
  /**
   * Lower-end override for {@link rendering/lights_and_shadows/directional_shadow/soft_shadow_filter_quality} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/lights_and_shadows/directional_shadow/soft_shadow_filter_quality.mobile': int;
  /**
   * Use 16 bits for the omni/spot shadow depth map. Enabling this results in shadows having less precision and may result in shadow acne, but can lead to performance improvements on some devices.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_16_bits': boolean;
  /**
   * The subdivision amount of the first quadrant on the shadow atlas. See the documentation ($DOCS_URL/tutorials/3d/lights_and_shadows.html#shadow-atlas) for more information.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_quadrant_0_subdiv': int;
  /**
   * The subdivision amount of the second quadrant on the shadow atlas. See the documentation ($DOCS_URL/tutorials/3d/lights_and_shadows.html#shadow-atlas) for more information.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_quadrant_1_subdiv': int;
  /**
   * The subdivision amount of the third quadrant on the shadow atlas. See the documentation ($DOCS_URL/tutorials/3d/lights_and_shadows.html#shadow-atlas) for more information.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_quadrant_2_subdiv': int;
  /**
   * The subdivision amount of the fourth quadrant on the shadow atlas. See the documentation ($DOCS_URL/tutorials/3d/lights_and_shadows.html#shadow-atlas) for more information.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_quadrant_3_subdiv': int;
  /**
   * The size of the shadow atlas used for {@link OmniLight3D} and {@link SpotLight3D} nodes. See the documentation ($DOCS_URL/tutorials/3d/lights_and_shadows.html#shadow-atlas) for more information.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_size': int;
  /**
   * Lower-end override for {@link rendering/lights_and_shadows/positional_shadow/atlas_size} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/lights_and_shadows/positional_shadow/atlas_size.mobile': int;
  /**
   * Quality setting for shadows cast by {@link OmniLight3D}s and {@link SpotLight3D}s. Higher quality settings use more samples when reading from shadow maps and are thus slower. Low quality settings may result in shadows looking grainy.
   * **Note:** The Soft Very Low setting will automatically multiply *constant* shadow blur by 0.75x to reduce the amount of noise visible. This automatic blur change only affects the constant blur factor defined in {@link Light3D.shadow_blur}, not the variable blur performed by {@link DirectionalLight3D}s' {@link Light3D.light_angular_distance}.
   * **Note:** The Soft High and Soft Ultra settings will automatically multiply shadow blur by 1.5× and 2× respectively to make better use of the increased sample count. This increased blur also improves stability of dynamic object shadows.
   */
  'rendering/lights_and_shadows/positional_shadow/soft_shadow_filter_quality': int;
  /**
   * Lower-end override for {@link rendering/lights_and_shadows/positional_shadow/soft_shadow_filter_quality} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/lights_and_shadows/positional_shadow/soft_shadow_filter_quality.mobile': int;
  /**
   * If `true`, items that cannot cast shadows into the view frustum will not be rendered into shadow maps.
   * This can increase performance.
   */
  'rendering/lights_and_shadows/tighter_shadow_caster_culling': boolean;
  /**
   * Enables the use of physically based units for light sources. Physically based units tend to be much larger than the arbitrary units used by Godot, but they can be used to match lighting within Godot to real-world lighting. Due to the large dynamic range of lighting conditions present in nature, Godot bakes exposure into the various lighting quantities before rendering. Most light sources bake exposure automatically at run time based on the active {@link CameraAttributes} resource, but {@link LightmapGI} and {@link VoxelGI} require a {@link CameraAttributes} resource to be set at bake time to reduce the dynamic range. At run time, Godot will automatically reconcile the baked exposure with the active exposure to ensure lighting remains consistent.
   */
  'rendering/lights_and_shadows/use_physical_light_units': boolean;
  /**
   * The maximum number of clustered elements ({@link OmniLight3D} + {@link SpotLight3D} + {@link Decal} + {@link ReflectionProbe}) that can be rendered at once in the camera view. If there are more clustered elements present in the camera view, some of them will not be rendered (leading to pop-in during camera movement). Enabling distance fade on lights and decals ({@link Light3D.distance_fade_enabled}, {@link Decal.distance_fade_enabled}) can help avoid reaching this limit.
   * Decreasing this value may improve GPU performance on certain setups, even if the maximum number of clustered elements is never reached in the project.
   * **Note:** This setting is only effective when using the Forward+ rendering method, not Mobile and Compatibility.
   */
  'rendering/limits/cluster_builder/max_clustered_elements': float;
  /**
   * The maximum number of uniforms that can be used by the global shader uniform buffer. Each item takes up one slot. In other words, a single uniform float and a uniform vec4 will take the same amount of space in the buffer.
   * **Note:** When using the Compatibility renderer, most mobile devices (and all web exports) will be limited to a maximum size of 1024 due to hardware constraints.
   */
  'rendering/limits/global_shader_variables/buffer_size': int;
  /**
   * Max number of omnilights and spotlights renderable per object. At the default value of 8, this means that each surface can be affected by up to 8 omnilights and 8 spotlights. This is further limited by hardware support and {@link rendering/limits/opengl/max_renderable_lights}. Setting this low will slightly reduce memory usage, may decrease shader compile times, and may result in faster rendering on low-end, mobile, or web devices.
   * **Note:** This setting is only effective when using the Compatibility rendering method, not Forward+ and Mobile.
   */
  'rendering/limits/opengl/max_lights_per_object': int;
  /**
   * Max number of elements renderable in a frame. If more elements than this are visible per frame, they will not be drawn. Keep in mind elements refer to mesh surfaces and not meshes themselves. Setting this low will slightly reduce memory usage and may decrease shader compile times, particularly on web. For most uses, the default value is suitable, but consider lowering as much as possible on web export.
   * **Note:** This setting is only effective when using the Compatibility rendering method, not Forward+ and Mobile.
   */
  'rendering/limits/opengl/max_renderable_elements': int;
  /**
   * Max number of positional lights renderable in a frame. If more lights than this number are used, they will be ignored. Setting this low will slightly reduce memory usage and may decrease shader compile times, particularly on web. For most uses, the default value is suitable, but consider lowering as much as possible on web export.
   * **Note:** This setting is only effective when using the Compatibility rendering method, not Forward+ and Mobile.
   */
  'rendering/limits/opengl/max_renderable_lights': int;
  /**
   * The minimum number of instances that must be present in a scene to enable culling computations on multiple threads. If a scene has fewer instances than this number, culling is done on a single thread.
   */
  'rendering/limits/spatial_indexer/threaded_cull_minimum_instances': int;
  'rendering/limits/spatial_indexer/update_iterations_per_frame': int;
  /**
   * Maximum time (in seconds) before the `TIME` shader built-in variable rolls over. The `TIME` variable increments by `delta` each frame, and when it exceeds this value, it rolls over to `0.0`. Since large floating-point values are less precise than small floating-point values, this should be set as low as possible to maximize the precision of the `TIME` built-in variable in shaders. This is especially important on mobile platforms where precision in shaders is significantly reduced. However, if this is set too low, shader animations may appear to restart from the beginning while the project is running.
   * On desktop platforms, values below `4096` are recommended, ideally below `2048`. On mobile platforms, values below `64` are recommended, ideally below `32`.
   */
  'rendering/limits/time/time_rollover_secs': float;
  /**
   * The automatic LOD bias to use for meshes rendered within the {@link ReflectionProbe}. Higher values will use less detailed versions of meshes that have LOD variations generated. If set to `0.0`, automatic LOD is disabled. Increase {@link rendering/mesh_lod/lod_change/threshold_pixels} to improve performance at the cost of geometry detail.
   * **Note:** Depending on the mesh's attributes (vertex colors, blend shapes, ...), a mesh may have fewer levels of LOD generated to avoid visible distortion of the mesh once it is affected by vertex colors or blend shapes. Meshes with a very low vertex count will also not have any LODs generated, which means this setting will not affect them at all. In general, this setting makes the largest impact on static meshes with a high vertex count.
   * **Note:** {@link rendering/mesh_lod/lod_change/threshold_pixels} does not affect {@link GeometryInstance3D} visibility ranges (also known as "manual" LOD or hierarchical LOD).
   * **Note:** This property is only read when the project starts. To adjust the automatic LOD threshold at runtime, set {@link Viewport.mesh_lod_threshold} on the root {@link Viewport}.
   */
  'rendering/mesh_lod/lod_change/threshold_pixels': float;
  /**
   * The Bounding Volume Hierarchy (https://en.wikipedia.org/wiki/Bounding_volume_hierarchy) quality to use when rendering the occlusion culling buffer. Higher values will result in more accurate occlusion culling, at the cost of higher CPU usage. See also {@link rendering/occlusion_culling/occlusion_rays_per_thread}.
   * **Note:** This property is only read when the project starts. To adjust the BVH build quality at runtime, use {@link RenderingServer.viewport_set_occlusion_culling_build_quality}.
   */
  'rendering/occlusion_culling/bvh_build_quality': int;
  /**
   * If `true`, the projection used for rendering the occlusion buffer will be jittered. This can help prevent objects being incorrectly culled when visible through small gaps.
   */
  'rendering/occlusion_culling/jitter_projection': boolean;
  /**
   * The number of occlusion rays traced per CPU thread. Higher values will result in more accurate occlusion culling, at the cost of higher CPU usage. The occlusion culling buffer's pixel count is roughly equal to `occlusion_rays_per_thread * number_of_logical_cpu_cores`, so it will depend on the system's CPU. Therefore, CPUs with fewer cores will use a lower resolution to attempt keeping performance costs even across devices. See also {@link rendering/occlusion_culling/bvh_build_quality}.
   * **Note:** This property is only read when the project starts. To adjust the number of occlusion rays traced per thread at runtime, use {@link RenderingServer.viewport_set_occlusion_rays_per_thread}.
   */
  'rendering/occlusion_culling/occlusion_rays_per_thread': int;
  /**
   * If `true`, {@link OccluderInstance3D} nodes will be usable for occlusion culling in 3D in the root viewport. In custom viewports, {@link Viewport.use_occlusion_culling} must be set to `true` instead.
   * **Note:** Enabling occlusion culling has a cost on the CPU. Only enable occlusion culling if you actually plan to use it. Large open scenes with few or no objects blocking the view will generally not benefit much from occlusion culling. Large open scenes generally benefit more from mesh LOD and visibility ranges ({@link GeometryInstance3D.visibility_range_begin} and {@link GeometryInstance3D.visibility_range_end}) compared to occlusion culling.
   * **Note:** Due to memory constraints, occlusion culling is not supported by default in Web export templates. It can be enabled by compiling custom Web export templates with `module_raycast_enabled=yes`.
   */
  'rendering/occlusion_culling/use_occlusion_culling': boolean;
  /**
   * Number of cubemaps to store in the reflection atlas. The number of {@link ReflectionProbe}s in a scene will be limited by this amount. A higher number requires more VRAM.
   */
  'rendering/reflections/reflection_atlas/reflection_count': int;
  /**
   * Size of cubemap faces for {@link ReflectionProbe}s. A higher number requires more VRAM and may make reflection probe updating slower.
   */
  'rendering/reflections/reflection_atlas/reflection_size': int;
  /**
   * Lower-end override for {@link rendering/reflections/reflection_atlas/reflection_size} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/reflections/reflection_atlas/reflection_size.mobile': int;
  /**
   * Use a higher quality variant of the fast filtering algorithm. Significantly slower than using default quality, but results in smoother reflections. Should only be used when the scene is especially detailed.
   */
  'rendering/reflections/sky_reflections/fast_filter_high_quality': boolean;
  /**
   * Sets the number of samples to take when using importance sampling for {@link Sky}s and {@link ReflectionProbe}s. A higher value will result in smoother, higher quality reflections, but increases time to calculate radiance maps. In general, fewer samples are needed for simpler, low dynamic range environments while more samples are needed for HDR environments and environments with a high level of detail.
   */
  'rendering/reflections/sky_reflections/ggx_samples': int;
  /**
   * Lower-end override for {@link rendering/reflections/sky_reflections/ggx_samples} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/reflections/sky_reflections/ggx_samples.mobile': int;
  /**
   * Limits the number of layers to use in radiance maps when using importance sampling. A lower number will be slightly faster and take up less VRAM.
   */
  'rendering/reflections/sky_reflections/roughness_layers': int;
  /**
   * If `true`, uses texture arrays instead of mipmaps for reflection probes and panorama backgrounds (sky). This reduces jitter noise and upscaling artifacts on reflections, but is significantly slower to compute and uses {@link rendering/reflections/sky_reflections/roughness_layers} times more memory.
   * **Note:** Texture array reflections are always disabled on macOS on Intel GPUs due to driver bugs.
   */
  'rendering/reflections/sky_reflections/texture_array_reflections': boolean;
  /**
   * Lower-end override for {@link rendering/reflections/sky_reflections/texture_array_reflections} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/reflections/sky_reflections/texture_array_reflections.mobile': boolean;
  /** If `true`, reduces reflections based on ambient light. */
  'rendering/reflections/specular_occlusion/enabled': boolean;
  /**
   * Sets the renderer that will be used by the project. Options are:
   * **forward_plus** (Forward+): High-end renderer designed for desktop devices. Has a higher base overhead, but scales well with complex scenes. Not suitable for older devices or mobile.
   * **mobile** (Mobile): Modern renderer designed for mobile devices. Has a lower base overhead than Forward+, but does not scale as well to large scenes with many elements.
   * **gl_compatibility** (Compatibility): Low-end renderer designed for older devices. Based on the limitations of the OpenGL 3.3 / OpenGL ES 3.0 / WebGL 2 APIs. Lighting calculations are performed on nonlinear sRGB-encoded color data, which produces inaccurate results that may look acceptable for some games.
   * This can be overridden using the `--rendering-method <method>` command line argument.
   * **Note:** The actual rendering method may be automatically changed by the engine as a result of a fallback, or a user-specified command line argument. To get the actual rendering method that is used at runtime, use {@link RenderingServer.get_current_rendering_method} instead of reading this project setting's value.
   */
  'rendering/renderer/rendering_method': string;
  /** Override for {@link rendering/renderer/rendering_method} on mobile devices. */
  'rendering/renderer/rendering_method.mobile': string;
  /** Override for {@link rendering/renderer/rendering_method} on web. */
  'rendering/renderer/rendering_method.web': string;
  /**
   * Version code of the Direct3D 12 Agility SDK (https://devblogs.microsoft.com/directx/directx12agility/) to use (`D3D12SDKVersion`). This must match the *minor* version that is installed next to the editor binary and in the export templates directory for the current editor version. For example, if you have `1.618.5` installed, you need to input `618` here.
   */
  'rendering/rendering_device/d3d12/agility_sdk_version': int;
  /**
   * The number of entries in the resource descriptor heap the Direct3D 12 rendering driver uses for most rendering operations.
   * Depending on the complexity of scenes, this value may be lowered or may need to be raised.
   */
  'rendering/rendering_device/d3d12/max_resource_descriptors': int;
  /**
   * The number of entries in the sampler descriptor heap the Direct3D 12 rendering driver uses for most rendering operations.
   * Depending on the complexity of scenes, this value may be lowered or may need to be raised.
   */
  'rendering/rendering_device/d3d12/max_sampler_descriptors': int;
  /**
   * Sets the driver to be used by the renderer when using a RenderingDevice-based renderer like the Forward+ or Mobile renderers. Editing this property has no effect in the default configuration, as first-party platforms each have platform-specific overrides. Use those overrides to configure the driver for each platform.
   * This can be overridden using the `--rendering-driver <driver>` command line argument.
   * Supported values are:
   * - `metal`, Metal (supported on Apple Silicon Macs and iOS).
   * - `vulkan`, Vulkan (supported on all desktop and mobile platforms).
   * - `d3d12`, Direct3D 12 (supported on Windows).
   * **Note:** The availability of these options depends on whether the engine was compiled with support for them (determined by SCons options `vulkan`, `metal`, and `d3d12`).
   * **Note:** If a given platform has no registered drivers, it can fall back to the Compatibility renderer (OpenGL 3) if {@link rendering/rendering_device/fallback_to_opengl3} is enabled. This fallback happens automatically for the Web platform regardless of that property.
   * **Note:** The actual rendering driver may be automatically changed by the engine as a result of a fallback, or a user-specified command line argument. To get the actual rendering driver that is used at runtime, use {@link RenderingServer.get_current_rendering_driver_name} instead of reading this project setting's value.
   */
  'rendering/rendering_device/driver': string;
  /**
   * Android override for {@link rendering/rendering_device/driver}.
   * Only one option is supported:
   * - `vulkan`, Vulkan from native drivers.
   * **Note:** If Vulkan was disabled at compile time, there is no alternative RenderingDevice driver.
   */
  'rendering/rendering_device/driver.android': string;
  /**
   * iOS override for {@link rendering/rendering_device/driver}.
   * Two options are supported:
   * - `metal` (default), Metal from native drivers.
   * - `vulkan`, Vulkan over Metal via MoltenVK.
   */
  'rendering/rendering_device/driver.ios': string;
  /**
   * LinuxBSD override for {@link rendering/rendering_device/driver}.
   * Only one option is supported:
   * - `vulkan`, Vulkan from native drivers.
   * **Note:** If Vulkan was disabled at compile time, there is no alternative RenderingDevice driver.
   */
  'rendering/rendering_device/driver.linuxbsd': string;
  /**
   * macOS override for {@link rendering/rendering_device/driver}.
   * Two options are supported:
   * - `metal` (default), Metal from native drivers, only supported on Apple Silicon Macs. On Intel Macs, it will automatically fall back to `vulkan` as Metal support is not implemented.
   * - `vulkan`, Vulkan over Metal via MoltenVK, supported on both Apple Silicon and Intel Macs.
   */
  'rendering/rendering_device/driver.macos': string;
  /**
   * visionOS override for {@link rendering/rendering_device/driver}.
   * Only one option is supported:
   * - `metal` (default), Metal from native drivers.
   */
  'rendering/rendering_device/driver.visionos': string;
  /**
   * Windows override for {@link rendering/rendering_device/driver}.
   * Two options are supported:
   * - `vulkan` (default), Vulkan from native drivers. If {@link rendering/rendering_device/fallback_to_vulkan} is enabled, this is used as a fallback if Direct3D 12 is not supported.
   * - `d3d12`, Direct3D 12 from native drivers. If {@link rendering/rendering_device/fallback_to_d3d12} is enabled, this is used as a fallback if Vulkan is not supported.
   * **Note:** Starting with Godot 4.6, new projects are configured by default to use `d3d12` on Windows. Projects created before Godot 4.6 keep `vulkan` for compatibility reasons, but it is recommended to switch them manually to `d3d12`.
   */
  'rendering/rendering_device/driver.windows': string;
  /**
   * If `true`, the Forward+ renderer will fall back to Direct3D 12 if Vulkan is not supported. The fallback is always attempted regardless of this setting if Vulkan driver support was disabled at compile time.
   * **Note:** This setting is implemented only on Windows.
   */
  'rendering/rendering_device/fallback_to_d3d12': boolean;
  /**
   * If `true`, the Forward+ renderer will fall back to OpenGL 3 if Direct3D 12, Metal, and Vulkan are not supported.
   * **Note:** This setting is implemented on Windows, Android, macOS, iOS, and Linux/X11.
   */
  'rendering/rendering_device/fallback_to_opengl3': boolean;
  /**
   * If `true`, the Forward+ renderer will fall back to Vulkan if Direct3D 12 (on Windows) or Metal (on macOS x86_64) are not supported. The fallback is always attempted regardless of this setting if Direct3D 12 (Windows) or Metal (macOS) driver support was disabled at compile time.
   * **Note:** This setting is implemented on Windows and macOS.
   */
  'rendering/rendering_device/fallback_to_vulkan': boolean;
  /**
   * Enable the pipeline cache that is saved to disk if the graphics API supports it.
   * **Note:** This property is unable to control the pipeline caching the GPU driver itself does. Only turn this off along with deleting the contents of the driver's cache if you wish to simulate the experience a user will get when starting the game for the first time.
   */
  'rendering/rendering_device/pipeline_cache/enable': boolean;
  /**
   * Determines at which interval pipeline cache is saved to disk. The lower the value, the more often it is saved.
   */
  'rendering/rendering_device/pipeline_cache/save_chunk_size_mb': float;
  /**
   * The size of a block allocated in the staging buffers. Staging buffers are the intermediate resources the engine uses to upload or download data to the GPU. This setting determines the max amount of data that can be transferred in a copy operation. Increasing this will result in faster data transfers at the cost of extra memory.
   * **Note:** This property is only read when the project starts. There is currently no way to change this value at run-time.
   */
  'rendering/rendering_device/staging_buffer/block_size_kb': int;
  /**
   * The maximum amount of memory allowed to be used by staging buffers. If the amount of data being uploaded or downloaded exceeds this amount, the GPU will stall and wait for previous frames to finish.
   * **Note:** This property is only read when the project starts. There is currently no way to change this value at run-time.
   */
  'rendering/rendering_device/staging_buffer/max_size_mb': int;
  /**
   * The region size in pixels used to download texture data from the GPU when using methods like {@link RenderingDevice.texture_get_data_async}.
   * **Note:** This property's upper limit is controlled by {@link rendering/rendering_device/staging_buffer/block_size_kb} and whether it's possible to allocate a single block of texture data with this region size in the format that is requested.
   * **Note:** This property is only read when the project starts. There is currently no way to change this value at run-time.
   */
  'rendering/rendering_device/staging_buffer/texture_download_region_size_px': int;
  /**
   * The region size in pixels used to upload texture data from the GPU when using methods like {@link RenderingDevice.texture_update}.
   * **Note:** This property's upper limit is controlled by {@link rendering/rendering_device/staging_buffer/block_size_kb} and whether it's possible to allocate a single block of texture data with this region size in the format that is requested.
   * **Note:** This property is only read when the project starts. There is currently no way to change this value at run-time.
   */
  'rendering/rendering_device/staging_buffer/texture_upload_region_size_px': int;
  /**
   * The number of frames to track on the CPU side before stalling to wait for the GPU.
   * Try the V-Sync Simulator (https://darksylinc.github.io/vsync_simulator/), an interactive interface that simulates presentation to better understand how it is affected by different variables under various conditions.
   * **Note:** This property is only read when the project starts. There is currently no way to change this value at run-time.
   */
  'rendering/rendering_device/vsync/frame_queue_size': int;
  /**
   * The number of images the swapchain will consist of (back buffers + front buffer).
   * `2` corresponds to double-buffering and `3` to triple-buffering.
   * Double-buffering may give you the lowest lag/latency but if V-Sync is on and the system can't render at 60 fps, the framerate will go down in multiples of it (e.g. 30 fps, 15, 7.5, etc.). Triple buffering gives you higher framerate (specially if the system can't reach a constant 60 fps) at the cost of up to 1 frame of latency, with {@link DisplayServer.VSYNC_ENABLED} (FIFO).
   * Use double-buffering with {@link DisplayServer.VSYNC_ENABLED}. Triple-buffering is a must if you plan on using {@link DisplayServer.VSYNC_MAILBOX} mode.
   * Try the V-Sync Simulator (https://darksylinc.github.io/vsync_simulator/), an interactive interface that simulates presentation to better understand how it is affected by different variables under various conditions.
   * **Note:** Changes to this setting will only be applied on startup or when the swapchain is recreated (e.g. when setting the V-Sync mode).
   * **Note:** Some platforms may restrict the actual value.
   */
  'rendering/rendering_device/vsync/swapchain_image_count': int;
  /**
   * The number of descriptors per pool. Godot's Vulkan backend uses linear pools for descriptors that will be created and destroyed within a single frame. Instead of destroying every single descriptor every frame, they all can be destroyed at once by resetting the pool they belong to.
   * A larger number is more efficient up to a limit, after that it will only waste RAM (maximum efficiency is achieved when there is no more than 1 pool per frame). A small number could end up with one pool per descriptor, which negatively impacts performance.
   * **Note:** Changing this property requires a restart to take effect.
   */
  'rendering/rendering_device/vulkan/max_descriptors_per_pool': int;
  /**
   * Determines how sharp the upscaled image will be when using the FSR upscaling mode. Sharpness halves with every whole number. Values go from 0.0 (sharpest) to 2.0. Values above 2.0 won't make a visible difference.
   */
  'rendering/scaling_3d/fsr_sharpness': float;
  /**
   * Sets the scaling 3D mode. Bilinear scaling renders at different resolution to either undersample or supersample the viewport. FidelityFX Super Resolution 1.0, abbreviated to FSR, is an upscaling technology that produces high quality images at fast framerates by using a spatially-aware upscaling algorithm. FSR is slightly more expensive than bilinear, but it produces significantly higher image quality. On particularly low-end GPUs, the added cost of FSR may not be worth it (compared to using bilinear scaling with a slightly higher resolution scale to match performance).
   * **Note:** FSR is only effective when using the Forward+ rendering method, not Mobile or Compatibility. If using an incompatible rendering method, FSR will fall back to bilinear scaling.
   */
  'rendering/scaling_3d/mode': int;
  /**
   * iOS override for {@link rendering/scaling_3d/mode}. This allows selecting the MetalFX spatial and MetalFX temporal scaling modes, which are exclusive to platforms where the Metal rendering driver is used.
   */
  'rendering/scaling_3d/mode.ios': int;
  /**
   * macOS override for {@link rendering/scaling_3d/mode}. This allows selecting the MetalFX spatial and MetalFX temporal scaling modes, which are exclusive to platforms where the Metal rendering driver is used.
   */
  'rendering/scaling_3d/mode.macos': int;
  /**
   * Scales the 3D render buffer based on the viewport size uses an image filter specified in {@link rendering/scaling_3d/mode} to scale the output image to the full viewport size. Values lower than `1.0` can be used to speed up 3D rendering at the cost of quality (undersampling). Values greater than `1.0` are only valid for bilinear mode and can be used to improve 3D rendering quality at a high performance cost (supersampling). See also {@link rendering/anti_aliasing/quality/msaa_3d} for multi-sample antialiasing, which is significantly cheaper but only smooths the edges of polygons.
   */
  'rendering/scaling_3d/scale': float;
  'rendering/shader_compiler/shader_cache/compress': boolean;
  /**
   * Enable the shader cache, which stores compiled shaders to disk to prevent stuttering from shader compilation the next time the shader is needed.
   */
  'rendering/shader_compiler/shader_cache/enabled': boolean;
  'rendering/shader_compiler/shader_cache/strip_debug': boolean;
  'rendering/shader_compiler/shader_cache/strip_debug.release': boolean;
  'rendering/shader_compiler/shader_cache/use_zstd_compression': boolean;
  /** If `true`, uses faster but lower-quality Lambert material lighting model instead of Burley. */
  'rendering/shading/overrides/force_lambert_over_burley': boolean;
  /**
   * Lower-end override for {@link rendering/shading/overrides/force_lambert_over_burley} on mobile devices, due to performance concerns or driver support.
   */
  'rendering/shading/overrides/force_lambert_over_burley.mobile': boolean;
  /**
   * If `true`, forces vertex shading for all rendering. This can increase performance a lot, but also reduces quality immensely. Can be used to optimize performance on low-end mobile devices.
   */
  'rendering/shading/overrides/force_vertex_shading': boolean;
  /**
   * The dictionary size for Rate-Distortion Optimization (RDO) when importing textures as Basis Universal and when RDO is enabled, ranging from `64` to `65536`. Higher values reduce the file sizes further, but make encoding times significantly longer.
   */
  'rendering/textures/basis_universal/rdo_dict_size': int;
  /**
   * If `true`, enables Zstandard supercompression to reduce file size when importing textures as Basis Universal.
   * **Note:** Basis Universal textures need to be compressed to gain the benefit of smaller file sizes, otherwise they are as large as VRAM-compressed textures.
   */
  'rendering/textures/basis_universal/zstd_supercompression': boolean;
  /**
   * Specify the compression level for Basis Universal Zstandard supercompression, ranging from `1` to `22`.
   */
  'rendering/textures/basis_universal/zstd_supercompression_level': int;
  /**
   * The default texture filtering mode to use for {@link CanvasItem}s built-in texture. In shaders, this texture is accessed as `TEXTURE`.
   * **Note:** For pixel art aesthetics, see also {@link rendering/2d/snap/snap_2d_vertices_to_pixel} and {@link rendering/2d/snap/snap_2d_transforms_to_pixel}.
   */
  'rendering/textures/canvas_textures/default_texture_filter': int;
  /**
   * The default texture repeating mode to use for {@link CanvasItem}s built-in texture. In shaders, this texture is accessed as `TEXTURE`.
   */
  'rendering/textures/canvas_textures/default_texture_repeat': int;
  /**
   * The filtering quality to use for {@link Decal} nodes. When using one of the anisotropic filtering modes, the anisotropic filtering level is controlled by {@link rendering/textures/default_filters/anisotropic_filtering_level}.
   */
  'rendering/textures/decals/filter': int;
  /**
   * Sets the maximum number of samples to take when using anisotropic filtering on textures (as a power of two). A higher sample count will result in sharper textures at oblique angles, but is more expensive to compute. A value of `0` forcibly disables anisotropic filtering, even on materials where it is enabled.
   * The anisotropic filtering level also affects decals and light projectors if they are configured to use anisotropic filtering. See {@link rendering/textures/decals/filter} and {@link rendering/textures/light_projectors/filter}.
   * **Note:** In 3D, for this setting to have an effect, set {@link BaseMaterial3D.texture_filter} to {@link BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC} or {@link BaseMaterial3D.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC} on materials.
   * **Note:** In 2D, for this setting to have an effect, set {@link CanvasItem.texture_filter} to {@link CanvasItem.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC} or {@link CanvasItem.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC} on the {@link CanvasItem} node displaying the texture (or in {@link CanvasTexture}). However, anisotropic filtering is rarely useful in 2D, so only enable it for textures in 2D if it makes a meaningful visual difference.
   * **Note:** This property is only read when the project starts. To change the anisotropic filtering level at runtime, set {@link Viewport.anisotropic_filtering_level} on the root {@link Viewport} instead.
   */
  'rendering/textures/default_filters/anisotropic_filtering_level': int;
  /**
   * Affects the final texture sharpness by reading from a lower or higher mipmap (also called "texture LOD bias"). Negative values make mipmapped textures sharper but grainier when viewed at a distance, while positive values make mipmapped textures blurrier (even when up close).
   * Enabling temporal antialiasing ({@link rendering/anti_aliasing/quality/use_taa}) will automatically apply a `-0.5` offset to this value, while enabling FXAA ({@link rendering/anti_aliasing/quality/screen_space_aa}) will automatically apply a `-0.25` offset to this value. If both TAA and FXAA are enabled at the same time, an offset of `-0.75` is applied to this value.
   * **Note:** If {@link rendering/scaling_3d/scale} is lower than `1.0` (exclusive), {@link rendering/textures/default_filters/texture_mipmap_bias} is used to adjust the automatic mipmap bias which is calculated internally based on the scale factor. The formula for this is `log2(scaling_3d_scale) + mipmap_bias`.
   */
  'rendering/textures/default_filters/texture_mipmap_bias': float;
  /**
   * If `true`, uses nearest-neighbor mipmap filtering when using mipmaps (also called "bilinear filtering"), which will result in visible seams appearing between mipmap stages. This may increase performance in mobile as less memory bandwidth is used. If `false`, linear mipmap filtering (also called "trilinear filtering") is used.
   * **Note:** This property is only read when the project starts. There is currently no way to change this setting at run-time.
   */
  'rendering/textures/default_filters/use_nearest_mipmap_filter': boolean;
  /**
   * The filtering quality to use for {@link OmniLight3D} and {@link SpotLight3D} projectors. When using one of the anisotropic filtering modes, the anisotropic filtering level is controlled by {@link rendering/textures/default_filters/anisotropic_filtering_level}.
   */
  'rendering/textures/light_projectors/filter': int;
  /**
   * If `true`, the texture importer will import lossless textures using the PNG format. Otherwise, it will default to using WebP.
   */
  'rendering/textures/lossless_compression/force_png': boolean;
  /**
   * If `true`, the GPU texture compressor will cache the local RenderingDevice and its resources (shaders and pipelines), making subsequent imports faster at the cost of increased memory usage.
   */
  'rendering/textures/vram_compression/cache_gpu_compressor': boolean;
  /**
   * If `true`, the texture importer will utilize the GPU for compressing textures, improving the import time of large images.
   * **Note:** This only functions on a device which supports either Vulkan, Direct3D 12, or Metal as a rendering driver.
   * **Note:** Currently this only affects certain compressed formats (BC1, BC3, BC4, BC5, and BC6), all of which are exclusive to desktop platforms and consoles.
   */
  'rendering/textures/vram_compression/compress_with_gpu': boolean;
  /**
   * If `true`, the texture importer will import VRAM-compressed textures using the Ericsson Texture Compression 2 algorithm for lower quality textures and normal maps and Adaptable Scalable Texture Compression algorithm for high quality textures (in 4×4 block size).
   * **Note:** This setting is an override. The texture importer will always import the format the host platform needs, even if this is set to `false`.
   * **Note:** Changing this setting does *not* impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.godot/imported/` folder located inside the project folder then restart the editor (see {@link application/config/use_hidden_project_data_directory}).
   */
  'rendering/textures/vram_compression/import_etc2_astc': boolean;
  /**
   * If `true`, the texture importer will import VRAM-compressed textures using the S3 Texture Compression algorithm (DXT1-5) for lower quality textures and the BPTC algorithm (BC6H and BC7) for high quality textures. This algorithm is only supported on PC desktop platforms and consoles.
   * **Note:** This setting is an override. The texture importer will always import the format the host platform needs, even if this is set to `false`.
   * **Note:** Changing this setting does *not* impact textures that were already imported before. To make this setting apply to textures that were already imported, exit the editor, remove the `.godot/imported/` folder located inside the project folder then restart the editor (see {@link application/config/use_hidden_project_data_directory}).
   */
  'rendering/textures/vram_compression/import_s3tc_bptc': boolean;
  /**
   * The default compression method for WebP. Affects both lossy and lossless WebP. A higher value results in smaller files at the cost of compression speed. Decompression speed is mostly unaffected by the compression method. Supported values are 0 to 6. Note that compression methods above 4 are very slow and offer very little savings.
   */
  'rendering/textures/webp_compression/compression_method': int;
  /**
   * The default compression factor for lossless WebP. Decompression speed is mostly unaffected by the compression factor. Supported values are 0 to 100.
   */
  'rendering/textures/webp_compression/lossless_compression_factor': float;
  /**
   * If `true`, enables {@link Viewport.use_hdr_2d} on the root Viewport. 2D rendering will use a high dynamic range (HDR) `RGBA16` format framebuffer. Additionally, 2D rendering will be performed on linear values and will be converted using the appropriate transfer function immediately before blitting to the screen.
   * Practically speaking, this means that the end result of the Viewport will not be clamped to the `0-1` range and can be used in 3D rendering without color encoding adjustments. This allows 2D rendering to take advantage of effects requiring high dynamic range (e.g. 2D glow) as well as substantially improves the appearance of effects requiring highly detailed gradients.
   * **Note:** This property is only read when the project starts. To toggle HDR 2D at runtime, set {@link Viewport.use_hdr_2d} on the root {@link Viewport}.
   */
  'rendering/viewport/hdr_2d': boolean;
  /**
   * If `true`, enables {@link Viewport.transparent_bg} on the root viewport. This allows per-pixel transparency to be effective after also enabling {@link display/window/size/transparent} and {@link display/window/per_pixel_transparency/allowed}.
   */
  'rendering/viewport/transparent_background': boolean;
  /**
   * Set the default Variable Rate Shading (VRS) mode for the main viewport. See {@link Viewport.vrs_mode} to change this at runtime, and {@link Viewport.VRSMode} for possible values.
   */
  'rendering/vrs/mode': int;
  /**
   * If {@link rendering/vrs/mode} is set to **Texture**, this is the path to default texture loaded as the VRS image.
   * The texture *must* use a lossless compression format so that colors can be matched precisely. The following VRS densities are mapped to various colors, with brighter colors representing a lower level of shading precision:
   * [codeblock lang=text]
   * - 1×1 = rgb(0, 0, 0)     - #000000
   * - 1×2 = rgb(0, 85, 0)    - #005500
   * - 2×1 = rgb(85, 0, 0)    - #550000
   * - 2×2 = rgb(85, 85, 0)   - #555500
   * - 2×4 = rgb(85, 170, 0)  - #55aa00
   * - 4×2 = rgb(170, 85, 0)  - #aa5500
   * - 4×4 = rgb(170, 170, 0) - #aaaa00
   * - 4×8 = rgb(170, 255, 0) - #aaff00 - Not supported on most hardware
   * - 8×4 = rgb(255, 170, 0) - #ffaa00 - Not supported on most hardware
   * - 8×8 = rgb(255, 255, 0) - #ffff00 - Not supported on most hardware
   * [/codeblock]
   */
  'rendering/vrs/texture': string;
  /**
   * The ratio of {@link WorkerThreadPool}'s threads that will be reserved for low-priority tasks. For example, if 10 threads are available and this value is set to `0.3`, 3 of the worker threads will be reserved for low-priority tasks. The actual value won't exceed the number of CPU cores minus one, and if possible, at least one worker thread will be dedicated to low-priority tasks.
   */
  'threading/worker_pool/low_priority_thread_ratio': float;
  /**
   * Maximum number of threads to be used by {@link WorkerThreadPool}. On Web, a value of `-1` means `1`. On other platforms, it means all *logical* CPU cores available (see {@link OS.get_processor_count}).
   */
  'threading/worker_pool/max_threads': int;
  /** If `true`, enables the analog threshold binding modifier if supported by the XR runtime. */
  'xr/openxr/binding_modifiers/analog_threshold': boolean;
  /** If `true`, enables the D-pad binding modifier if supported by the XR runtime. */
  'xr/openxr/binding_modifiers/dpad_binding': boolean;
  /** Action map configuration to load by default. */
  'xr/openxr/default_action_map': string;
  /** If `true`, Godot will setup and initialize OpenXR on startup. */
  'xr/openxr/enabled': boolean;
  /**
   * Specify how OpenXR should blend in the environment. This is specific to certain AR and passthrough devices where camera images are blended in by the XR compositor.
   */
  'xr/openxr/environment_blend_mode': int;
  /**
   * Specifies the message types for which we request debug messages. Requires {@link xr/openxr/extensions/debug_utils} to be set and the extension to be supported by the XR runtime.
   */
  'xr/openxr/extensions/debug_message_types': int;
  /**
   * Enables debug utilities on XR runtimes that supports the debug utils extension. Sets the maximum severity being reported (0 = disabled, 1 = error, 2 = warning, 3 = info, 4 = verbose).
   */
  'xr/openxr/extensions/debug_utils': int;
  /**
   * Specify whether to enable eye tracking for this project. Depending on the platform, additional export configuration may be needed.
   */
  'xr/openxr/extensions/eye_gaze_interaction': boolean;
  /**
   * If `true` the frame synthesis extension will be activated if supported by the platform.
   * **Note:** This feature should not be enabled in conjunction with Application Space Warp, if supported this replaces ASW.
   */
  'xr/openxr/extensions/frame_synthesis': boolean;
  /** If `true` the hand interaction profile extension will be activated if supported by the platform. */
  'xr/openxr/extensions/hand_interaction_profile': boolean;
  /**
   * If `true`, the hand tracking extension is enabled if available.
   * **Note:** By default hand tracking will only work for data sources chosen by the XR runtime. For SteamVR this is the controller inferred data source, for most other runtimes this is the unobstructed data source. There is no way to query this. If a runtime supports the OpenXR data source extension you can use the {@link xr/openxr/extensions/hand_tracking_controller_data_source} and/or {@link xr/openxr/extensions/hand_tracking_unobstructed_data_source} to indicate you wish to enable these data sources. If neither is selected the data source extension is not enabled and the XR runtimes default behavior persists.
   */
  'xr/openxr/extensions/hand_tracking': boolean;
  /**
   * If `true`, support for the controller inferred data source is requested. If supported, you will receive hand tracking data even if the user has a controller in hand, with finger positions automatically inferred from controller input and/or sensors.
   * **Note:** This requires the OpenXR data source extension and controller inferred handtracking to be supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/hand_tracking} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/hand_tracking_controller_data_source': boolean;
  /**
   * If `true`, support for the unobstructed data source is requested. If supported, you will receive hand tracking data based on the actual finger positions of the user often determined by optical tracking.
   * **Note:** This requires the OpenXR data source extension and unobstructed handtracking to be supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/hand_tracking} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/hand_tracking_unobstructed_data_source': boolean;
  /**
   * If `true` we enable the render model extension if available.
   * **Note:** This relates to the core OpenXR render model extension and has no relation to any vendor render model extensions.
   */
  'xr/openxr/extensions/render_model': boolean;
  /**
   * The April Tag marker types the built-in marker tracking is set to recognize (if April Tag marker tracking is available and enabled).
   */
  'xr/openxr/extensions/spatial_entity/april_tag_dict': int;
  /**
   * The ArUco marker types the built-in marker tracking is set to recognize (if ArUco marker tracking is available and enabled).
   */
  'xr/openxr/extensions/spatial_entity/aruco_dict': int;
  /**
   * If `true`, we enable the built-in logic for handling anchors. Godot will query (persistent) anchors and manage {@link OpenXRAnchorTracker} instances for you. If disabled you'll need to create your own spatial and persistence context and perform your own discovery queries.
   * **Note:** This functionality requires that spatial anchors are supported and enabled.
   */
  'xr/openxr/extensions/spatial_entity/enable_builtin_anchor_detection': boolean;
  /**
   * If `true`, we enable the built-in logic for handling marker tracking. Godot will query markers and manage {@link OpenXRMarkerTracker} instances for you. If disabled you'll need to create your own spatial context and perform your own discovery queries.
   * **Note:** This functionality requires that marker tracking is supported and enabled.
   */
  'xr/openxr/extensions/spatial_entity/enable_builtin_marker_tracking': boolean;
  /**
   * If `true`, we enable the built-in logic for handling plane detection. Godot will query detected planes (walls, floors, ceilings, etc.) and manage {@link OpenXRPlaneTracker} instances for you. If disabled you'll need to create your own spatial context and perform your own discovery queries.
   * **Note:** This functionality requires that plane tracking is supported and enabled.
   */
  'xr/openxr/extensions/spatial_entity/enable_builtin_plane_detection': boolean;
  /**
   * If `true`, support for the marker tracking extension is requested. If supported, you will be able to query information about markers detected by the XR runtime, e.g. QR codes, aruca markers and april tags.
   * **Note:** This requires that the OpenXR spatial entities and marker tracking extensions are supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/spatial_entity/enabled} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/spatial_entity/enable_marker_tracking': boolean;
  /**
   * If `true`, support for the persistent anchors extension is requested. If supported, you will be able to store spatial anchors and they will be restored on application startup.
   * **Note:** This requires that the OpenXR spatial entities, spatial anchors, and spatial persistence extensions are supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/spatial_entity/enabled} and {@link xr/openxr/extensions/spatial_entity/enable_spatial_anchors} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/spatial_entity/enable_persistent_anchors': boolean;
  /**
   * If `true`, support for the plane tracking extension is requested. If supported, you will be able to query information about planes detected by the XR runtime, e.g. walls, floors, etc.
   * **Note:** This requires that the OpenXR spatial entities and plane tracking extensions are supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/spatial_entity/enabled} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/spatial_entity/enable_plane_tracking': boolean;
  /**
   * If `true`, support for the spatial anchors extension is requested. If supported, you will be able to register anchor locations in the real world that the XR runtime will adjust as needed and/or potentially share with other headsets.
   * **Note:** This requires that the OpenXR spatial entities and spatial anchors extensions are supported by the XR runtime. If not supported this setting will be ignored. {@link xr/openxr/extensions/spatial_entity/enabled} must be enabled for this setting to be used.
   */
  'xr/openxr/extensions/spatial_entity/enable_spatial_anchors': boolean;
  /**
   * If `true`, support for the spatial entity extension is requested. If supported, you will be able to access spatial information about the real environment around you. What information is available is dependent on additional extensions.
   * **Note:** This requires that the OpenXR spatial entities extension is supported by the XR runtime. If not supported this setting will be ignored.
   */
  'xr/openxr/extensions/spatial_entity/enabled': boolean;
  /** If `true`, the user presence extension is enabled if available. */
  'xr/openxr/extensions/user_presence': boolean;
  /** Specify whether OpenXR should be configured for an HMD or a hand held device. */
  'xr/openxr/form_factor': int;
  /**
   * If `true` and foveation is supported, will automatically adjust foveation level based on framerate up to the level set on {@link xr/openxr/foveation_level}.
   */
  'xr/openxr/foveation_dynamic': boolean;
  /**
   * Applied foveation level if supported.
   * **Note:** On platforms other than Android, if {@link rendering/anti_aliasing/quality/msaa_3d} is enabled, this feature will be disabled.
   */
  'xr/openxr/foveation_level': int;
  /** Specify the default reference space. */
  'xr/openxr/reference_space': int;
  /** If `true`, Godot will display an alert modal when OpenXR initialization fails on startup. */
  'xr/openxr/startup_alert': boolean;
  /**
   * If `true`, OpenXR will manage the depth buffer and use the depth buffer for advanced reprojection provided this is supported by the XR runtime. Note that some rendering features in Godot can't be used with this feature.
   */
  'xr/openxr/submit_depth_buffer': boolean;
  /**
   * Optionally sets a specific API version of OpenXR to initialize in `major.minor.patch` notation. Some XR runtimes gate old behavior behind version checks. This is non-standard OpenXR behavior.
   */
  'xr/openxr/target_api_version': string;
  /**
   * Specify the view configuration with which to configure OpenXR setting up either Mono or Stereo rendering.
   */
  'xr/openxr/view_configuration': int;
  /** If `true`, Godot will compile shaders required for XR. */
  'xr/shaders/enabled': boolean;

  /**
   * Adds a custom property info to a property. The dictionary must contain:
   * - `"name"`: {@link String} (the property's name)
   * - `"type"`: [int] (see {@link Variant.Type})
   * - optionally `"hint"`: [int] (see {@link PropertyHint}) and `"hint_string"`: {@link String}
   * **Note:** Setting `"usage"` for the property is not supported. Use {@link set_as_basic}, {@link set_restart_if_changed}, and {@link set_as_internal} to modify usage flags.
   */
  add_property_info(hint: Dictionary): void;
  /**
   * Checks if any settings with the prefix `setting_prefix` exist in the set of changed settings. See also {@link get_changed_settings}.
   */
  check_changed_settings_in_group(setting_prefix: string): boolean;
  /** Clears the whole configuration (not recommended, may break things). */
  clear<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): void;
  clear(name: string): void;
  /**
   * Gets an array of the settings which have been changed since the last save. Note that internally `changed_settings` is cleared after a successful save, so generally the most appropriate place to use this method is when processing {@link settings_changed}.
   */
  get_changed_settings(): PackedStringArray;
  /**
   * Returns an {@link Array} of registered global classes. Each global class is represented as a {@link Dictionary} that contains the following entries:
   * - `base` is a name of the base class;
   * - `class` is a name of the registered global class;
   * - `icon` is a path to a custom icon of the global class, if it has any;
   * - `language` is a name of a programming language in which the global class is written;
   * - `path` is a path to a file containing the global class.
   * **Note:** Both the script and the icon paths are local to the project filesystem, i.e. they start with `res://`.
   */
  get_global_class_list(): Dictionary;
  /** Returns the order of a configuration value (influences when saved to the config file). */
  get_order<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): int;
  get_order(name: string): int;
  /**
   * Returns the value of the setting identified by `name`. If the setting doesn't exist and `default_value` is specified, the value of `default_value` is returned. Otherwise, `null` is returned.
   * **Note:** This method doesn't take potential feature overrides into account automatically. Use {@link get_setting_with_override} to handle seamlessly.
   * See also {@link has_setting} to check whether a setting exists.
   */
  get_setting<const T extends keyof ProjectSettings & `${string}/${string}`, D>(name: T, default_value?: ProjectSettings[T]): ProjectSettings[T];
  get_setting(name: string, default_value?: unknown): unknown;
  /**
   * Similar to {@link get_setting}, but applies feature tag overrides if any exists and is valid.
   * **Example:** If the setting override `"application/config/name.windows"` exists, and the following code is executed on a *Windows* operating system, the overridden setting is printed instead:
   */
  get_setting_with_override<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): ProjectSettings[T];
  get_setting_with_override(name: string): unknown;
  /**
   * Similar to {@link get_setting_with_override}, but applies feature tag overrides instead of current OS features.
   */
  get_setting_with_override_and_custom_features<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, features: PackedStringArray): ProjectSettings[T];
  get_setting_with_override_and_custom_features(name: string, features: PackedStringArray): unknown;
  /**
   * Returns the absolute, native OS path corresponding to the localized `path` (starting with `res://` or `user://`). The returned path will vary depending on the operating system and user preferences. See File paths in Godot projects ($DOCS_URL/tutorials/io/data_paths.html) to see what those paths convert to. See also {@link localize_path}.
   * **Note:** {@link globalize_path} with `res://` will not work in an exported project. Instead, prepend the executable's base directory to the path when running from an exported project:
   */
  globalize_path(path: string): string;
  /**
   * Returns `true` if a configuration value is present.
   * **Note:** In order to be be detected, custom settings have to be either defined with {@link set_setting}, or exist in the `project.godot` file. This is especially relevant when using {@link set_initial_value}.
   */
  has_setting<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T): boolean;
  has_setting(name: string): boolean;
  /**
   * Loads the contents of the .pck or .zip file specified by `pack` into the resource filesystem (`res://`). Returns `true` on success.
   * **Note:** If a file from `pack` shares the same path as a file already in the resource filesystem, any attempts to load that file will use the file from `pack` unless `replace_files` is set to `false`.
   * **Note:** The optional `offset` parameter can be used to specify the offset in bytes to the start of the resource pack. This is only supported for .pck files.
   * **Note:** {@link DirAccess} will not show changes made to the contents of `res://` after calling this function.
   */
  load_resource_pack(pack: string, replace_files?: boolean, offset?: int): boolean;
  /**
   * Returns the localized path (starting with `res://`) corresponding to the absolute, native OS `path`. See also {@link globalize_path}.
   */
  localize_path(path: string): string;
  /**
   * Saves the configuration to the `project.godot` file.
   * **Note:** This method is intended to be used by editor plugins, as modified {@link ProjectSettings} can't be loaded back in the running app. If you want to change project settings in exported projects, use {@link save_custom} to save `override.cfg` file.
   */
  save(): int;
  /**
   * Saves the configuration to a custom file. The file extension must be `.godot` (to save in text-based {@link ConfigFile} format) or `.binary` (to save in binary format). You can also save `override.cfg` file, which is also text, but can be used in exported projects unlike other formats.
   */
  save_custom(file: string): int;
  /**
   * Defines if the specified setting is considered basic or advanced. Basic settings will always be shown in the project settings. Advanced settings will only be shown if the user enables the "Advanced Settings" option.
   */
  set_as_basic<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, basic: boolean): void;
  set_as_basic(name: string, basic: boolean): void;
  /**
   * Defines if the specified setting is considered internal. An internal setting won't show up in the Project Settings dialog. This is mostly useful for addons that need to store their own internal settings without exposing them directly to the user.
   */
  set_as_internal<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, internal: boolean): void;
  set_as_internal(name: string, internal: boolean): void;
  /**
   * Sets the specified setting's initial value. This is the value the setting reverts to. The setting should already exist before calling this method. Note that project settings equal to their default value are not saved, so your code needs to account for that.
   * If you have a project setting defined by an {@link EditorPlugin}, but want to use it in a running project, you will need a similar code at runtime.
   */
  set_initial_value<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, value: unknown): void;
  set_initial_value(name: string, value: unknown): void;
  /** Sets the order of a configuration value (influences when saved to the config file). */
  set_order<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, position: int): void;
  set_order(name: string, position: int): void;
  /**
   * Sets whether a setting requires restarting the editor to properly take effect.
   * **Note:** This is just a hint to display to the user that the editor must be restarted for changes to take effect. Enabling {@link set_restart_if_changed} does *not* delay the setting being set when changed.
   */
  set_restart_if_changed<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, restart: boolean): void;
  set_restart_if_changed(name: string, restart: boolean): void;
  /**
   * Sets the value of a setting.
   * This can also be used to erase custom project settings. To do this change the setting value to `null`.
   */
  set_setting<const T extends keyof ProjectSettings & `${string}/${string}`>(name: T, value: unknown): void;
  set_setting(name: string, value: unknown): void;

  /** Emitted when any setting is changed, up to once per process frame. */
  settings_changed: Signal<[]>;
}
declare const ProjectSettings: ProjectSettings;

