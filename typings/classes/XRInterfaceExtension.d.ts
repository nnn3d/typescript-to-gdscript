// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for XR interface extensions (plugins). */
declare class XRInterfaceExtension extends XRInterface {
  /** Called if interface is active and queues have been submitted. */
  _end_frame(): void;
  /** Return `true` if anchor detection is enabled for this interface. */
  _get_anchor_detection_is_enabled(): boolean;
  /**
   * Returns the camera feed ID for the {@link CameraFeed} registered with the {@link CameraServer} that should be presented as the background on an AR capable device (if applicable).
   */
  _get_camera_feed_id(): int;
  /** Returns the {@link Transform3D} that positions the {@link XRCamera3D} in the world. */
  _get_camera_transform(): Transform3D;
  /** Returns the capabilities of this interface. */
  _get_capabilities(): int;
  /** Return color texture into which to render (if applicable). */
  _get_color_texture(): RID;
  /** Return depth texture into which to render (if applicable). */
  _get_depth_texture(): RID;
  /** Returns the name of this interface. */
  _get_name(): string;
  /** Returns a {@link PackedVector3Array} that represents the play areas boundaries (if applicable). */
  _get_play_area(): PackedVector3Array;
  /** Returns the play area mode that sets up our play area. */
  _get_play_area_mode(): int;
  /** Returns the projection matrix for the given view as a {@link PackedFloat64Array}. */
  _get_projection_for_view(view: int, aspect: float, z_near: float, z_far: float): PackedFloat64Array;
  /**
   * Returns the size of our render target for this interface, this overrides the size of the {@link Viewport} marked as the xr viewport.
   */
  _get_render_target_size(): Vector2;
  /**
   * Returns a {@link PackedStringArray} with pose names configured by this interface. Note that user configuration can override this list.
   */
  _get_suggested_pose_names(tracker_name: string): PackedStringArray;
  /**
   * Returns a {@link PackedStringArray} with tracker names configured by this interface. Note that user configuration can override this list.
   */
  _get_suggested_tracker_names(): PackedStringArray;
  /** Returns a {@link Dictionary} with system information related to this interface. */
  _get_system_info(): Dictionary;
  /** Returns the current status of our tracking. */
  _get_tracking_status(): int;
  /** Returns a {@link Transform3D} for a given view. */
  _get_transform_for_view(view: int, cam_transform: Transform3D | Projection): Transform3D;
  /** Return velocity texture into which to render (if applicable). */
  _get_velocity_texture(): RID;
  /** Returns the number of views this interface requires, 1 for mono, 2 for stereoscopic. */
  _get_view_count(): int;
  _get_vrs_texture(): RID;
  /** Returns the format of the texture returned by {@link _get_vrs_texture}. */
  _get_vrs_texture_format(): int;
  /** Initializes the interface, returns `true` on success. */
  _initialize(): boolean;
  /** Returns `true` if this interface has been initialized. */
  _is_initialized(): boolean;
  /** Called after the XR {@link Viewport} draw logic has completed. */
  _post_draw_viewport(render_target: RID, screen_rect: Rect2 | Rect2i): void;
  /**
   * Called if this is our primary {@link XRInterfaceExtension} before we start processing a {@link Viewport} for every active XR {@link Viewport}, returns `true` if that viewport should be rendered. An XR interface may return `false` if the user has taken off their headset and we can pause rendering.
   */
  _pre_draw_viewport(render_target: RID): boolean;
  /**
   * Called if this {@link XRInterfaceExtension} is active before rendering starts. Most XR interfaces will sync tracking at this point in time.
   */
  _pre_render(): void;
  /**
   * Called if this {@link XRInterfaceExtension} is active before our physics and game process is called. Most XR interfaces will update its {@link XRPositionalTracker}s at this point in time.
   */
  _process(): void;
  /** Enables anchor detection on this interface if supported. */
  _set_anchor_detection_is_enabled(enabled: boolean): void;
  /** Set the play area mode for this interface. */
  _set_play_area_mode(mode: int): boolean;
  /** Returns `true` if this interface supports this play area mode. */
  _supports_play_area_mode(mode: int): boolean;
  /** Triggers a haptic pulse to be emitted on the specified tracker. */
  _trigger_haptic_pulse(action_name: string, tracker_name: string, frequency: float, amplitude: float, duration_sec: float, delay_sec: float): void;
  /** Uninitialize the interface. */
  _uninitialize(): void;
  /**
   * Blits our render results to screen optionally applying lens distortion. This can only be called while processing `_commit_views`.
   */
  add_blit(render_target: RID, src_rect: Rect2 | Rect2i, dst_rect: Rect2i | Rect2, use_layer: boolean, layer: int, apply_lens_distortion: boolean, eye_center: Vector2 | Vector2i, k1: float, k2: float, upscale: float, aspect_ratio: float): void;
  get_color_texture(): RID;
  get_depth_texture(): RID;
  /**
   * Returns a valid {@link RID} for a texture to which we should render the current frame if supported by the interface.
   */
  get_render_target_texture(render_target: RID): RID;
  get_velocity_texture(): RID;
}
