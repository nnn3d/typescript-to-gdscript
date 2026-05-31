// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for an XR interface implementation. */
declare class XRInterface extends RefCounted {
  /** On an AR interface, `true` if anchor detection is enabled. */
  ar_is_anchor_detection_enabled: boolean;
  /**
   * Specify how XR should blend in the environment. This is specific to certain AR and passthrough devices where camera images are blended in by the XR compositor.
   */
  environment_blend_mode: int;
  /** `true` if this is the primary interface. */
  interface_is_primary: boolean;
  /** The play area mode for this interface. */
  xr_play_area_mode: int;
  set_anchor_detection_is_enabled(value: boolean): void;
  get_anchor_detection_is_enabled(): boolean;
  get_environment_blend_mode(): int;
  set_primary(value: boolean): void;
  is_primary(): boolean;
  get_play_area_mode(): int;

  /**
   * If this is an AR interface that requires displaying a camera feed as the background, this method returns the feed ID in the {@link CameraServer} for this interface.
   */
  get_camera_feed_id(): int;
  /**
   * Returns a combination of {@link Capabilities} flags providing information about the capabilities of this interface.
   */
  get_capabilities(): int;
  /** Returns the name of this interface (`"OpenXR"`, `"OpenVR"`, `"OpenHMD"`, `"ARKit"`, etc.). */
  get_name(): string;
  /**
   * Returns an array of vectors that represent the physical play area mapped to the virtual space around the {@link XROrigin3D} point. The points form a convex polygon that can be used to react to or visualize the play area. This returns an empty array if this feature is not supported or if the information is not yet available.
   */
  get_play_area(): PackedVector3Array;
  /** Returns the projection matrix for a view/eye. */
  get_projection_for_view(view: int, aspect: float, near: float, far: float): Projection;
  /**
   * Returns the resolution at which we should render our intermediate results before things like lens distortion are applied by the VR platform.
   */
  get_render_target_size(): Vector2;
  /**
   * Returns the an array of supported environment blend modes, see {@link XRInterface.EnvironmentBlendMode}.
   */
  get_supported_environment_blend_modes(): Array<unknown>;
  /**
   * Returns a {@link Dictionary} with extra system info. Interfaces are expected to return `XRRuntimeName` and `XRRuntimeVersion` providing info about the used XR runtime. Additional entries may be provided specific to an interface.
   * **Note:**This information may only be available after {@link initialize} was successfully called.
   */
  get_system_info(): Dictionary;
  /**
   * If supported, returns the status of our tracking. This will allow you to provide feedback to the user whether there are issues with positional tracking.
   */
  get_tracking_status(): int;
  /**
   * Returns the transform for a view/eye.
   * `view` is the view/eye index.
   * `cam_transform` is the transform that maps device coordinates to scene coordinates, typically the {@link Node3D.global_transform} of the current XROrigin3D.
   */
  get_transform_for_view(view: int, cam_transform: Transform3D | Projection): Transform3D;
  /**
   * Returns the number of views that need to be rendered for this device. 1 for Monoscopic, 2 for Stereoscopic.
   */
  get_view_count(): int;
  /**
   * Call this to initialize this interface. The first interface that is initialized is identified as the primary interface and it will be used for rendering output.
   * After initializing the interface you want to use you then need to enable the AR/VR mode of a viewport and rendering should commence.
   * **Note:** You must enable the XR mode on the main viewport for any device that uses the main output of Godot, such as for mobile VR.
   * If you do this for a platform that handles its own output (such as OpenVR) Godot will show just one eye without distortion on screen. Alternatively, you can add a separate viewport node to your scene and enable AR/VR on that viewport. It will be used to output to the HMD, leaving you free to do anything you like in the main window, such as using a separate camera as a spectator camera or rendering something completely different.
   * While currently not used, you can activate additional interfaces. You may wish to do this if you want to track controllers from other platforms. However, at this point in time only one interface can render to an HMD.
   */
  initialize(): boolean;
  /** Returns `true` if this interface has been initialized. */
  is_initialized(): boolean;
  /** Returns `true` if passthrough is enabled. */
  is_passthrough_enabled(): boolean;
  /** Returns `true` if this interface supports passthrough. */
  is_passthrough_supported(): boolean;
  /**
   * Sets the active environment blend mode.
   * `mode` is the environment blend mode starting with the next frame.
   * **Note:** Not all runtimes support all environment blend modes, so it is important to check this at startup. For example:
   */
  set_environment_blend_mode(mode: int): boolean;
  /**
   * Sets the active play area mode, will return `false` if the mode can't be used with this interface.
   * **Note:** Changing this after the interface has already been initialized can be jarring for the player, so it's recommended to recenter on the HMD with {@link XRServer.center_on_hmd} (if switching to {@link XRInterface.XR_PLAY_AREA_STAGE}) or make the switch during a scene change.
   */
  set_play_area_mode(mode: int): boolean;
  /**
   * Starts passthrough, will return `false` if passthrough couldn't be started.
   * **Note:** The viewport used for XR must have a transparent background, otherwise passthrough may not properly render.
   */
  start_passthrough(): boolean;
  /** Stops passthrough. */
  stop_passthrough(): void;
  /** Call this to find out if a given play area mode is supported by this interface. */
  supports_play_area_mode(mode: int): boolean;
  /**
   * Triggers a haptic pulse on a device associated with this interface.
   * `action_name` is the name of the action for this pulse.
   * `tracker_name` is optional and can be used to direct the pulse to a specific device provided that device is bound to this haptic.
   * `frequency` is the frequency of the pulse, set to `0.0` to have the system use a default frequency.
   * `amplitude` is the amplitude of the pulse between `0.0` and `1.0`.
   * `duration_sec` is the duration of the pulse in seconds.
   * `delay_sec` is a delay in seconds before the pulse is given.
   */
  trigger_haptic_pulse(action_name: string | NodePath, tracker_name: string, frequency: float, amplitude: float, duration_sec: float, delay_sec: float): void;
  /** Turns the interface off. */
  uninitialize(): void;

  /**
   * Emitted when the play area is changed. This can be a result of the player resetting the boundary or entering a new play area, the player changing the play area mode, the world scale changing or the player resetting their headset orientation.
   */
  play_area_changed: Signal<[int]>;

  // enum Capabilities
  /** No XR capabilities. */
  static readonly XR_NONE: int;
  /** This interface can work with normal rendering output (non-HMD based AR). */
  static readonly XR_MONO: int;
  /** This interface supports stereoscopic rendering. */
  static readonly XR_STEREO: int;
  /** This interface supports quad rendering (not yet supported by Godot). */
  static readonly XR_QUAD: int;
  /** This interface supports VR. */
  static readonly XR_VR: int;
  /** This interface supports AR (video background and real world tracking). */
  static readonly XR_AR: int;
  /**
   * This interface outputs to an external device. If the main viewport is used, the on screen output is an unmodified buffer of either the left or right eye (stretched if the viewport size is not changed to the same aspect ratio of {@link get_render_target_size}). Using a separate viewport node frees up the main viewport for other purposes.
   */
  static readonly XR_EXTERNAL: int;
  // enum TrackingStatus
  /** Tracking is behaving as expected. */
  static readonly XR_NORMAL_TRACKING: int;
  /** Tracking is hindered by excessive motion (the player is moving faster than tracking can keep up). */
  static readonly XR_EXCESSIVE_MOTION: int;
  /**
   * Tracking is hindered by insufficient features, it's too dark (for camera-based tracking), player is blocked, etc.
   */
  static readonly XR_INSUFFICIENT_FEATURES: int;
  /** We don't know the status of the tracking or this interface does not provide feedback. */
  static readonly XR_UNKNOWN_TRACKING: int;
  /** Tracking is not functional (camera not plugged in or obscured, lighthouses turned off, etc.). */
  static readonly XR_NOT_TRACKING: int;
  // enum PlayAreaMode
  /** Play area mode not set or not available. */
  static readonly XR_PLAY_AREA_UNKNOWN: int;
  /**
   * Play area only supports orientation tracking, no positional tracking, area will center around player.
   */
  static readonly XR_PLAY_AREA_3DOF: int;
  /** Player is in seated position, limited positional tracking, fixed guardian around player. */
  static readonly XR_PLAY_AREA_SITTING: int;
  /** Player is free to move around, full positional tracking. */
  static readonly XR_PLAY_AREA_ROOMSCALE: int;
  /**
   * Same as {@link XR_PLAY_AREA_ROOMSCALE} but origin point is fixed to the center of the physical space. In this mode, system-level recentering may be disabled, requiring the use of {@link XRServer.center_on_hmd}.
   */
  static readonly XR_PLAY_AREA_STAGE: int;
  /** Custom play area set by a GDExtension. */
  static readonly XR_PLAY_AREA_CUSTOM: int;
  // enum EnvironmentBlendMode
  /** Opaque blend mode. This is typically used for VR devices. */
  static readonly XR_ENV_BLEND_MODE_OPAQUE: int;
  /** Additive blend mode. This is typically used for AR devices or VR devices with passthrough. */
  static readonly XR_ENV_BLEND_MODE_ADDITIVE: int;
  /**
   * Alpha blend mode. This is typically used for AR or VR devices with passthrough capabilities. The alpha channel controls how much of the passthrough is visible. Alpha of 0.0 means the passthrough is visible and this pixel works in ADDITIVE mode. Alpha of 1.0 means that the passthrough is not visible and this pixel works in OPAQUE mode.
   */
  static readonly XR_ENV_BLEND_MODE_ALPHA_BLEND: int;
  // enum VRSTextureFormat
  /** The texture format is the same as returned by {@link XRVRS.make_vrs_texture}. */
  static readonly XR_VRS_TEXTURE_FORMAT_UNIFIED: int;
  /** The texture format is the same as expected by the Vulkan `VK_KHR_fragment_shading_rate` extension. */
  static readonly XR_VRS_TEXTURE_FORMAT_FRAGMENT_SHADING_RATE: int;
  /** The texture format is the same as expected by the Vulkan `VK_EXT_fragment_density_map` extension. */
  static readonly XR_VRS_TEXTURE_FORMAT_FRAGMENT_DENSITY_MAP: int;
}
