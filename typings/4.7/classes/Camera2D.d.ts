// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Camera node for 2D scenes. */
declare class Camera2D extends Node2D {
  /** The Camera2D's anchor point. */
  anchor_mode: int;
  /**
   * The custom {@link Viewport} node attached to the {@link Camera2D}. If `null` or not a {@link Viewport}, uses the default viewport instead.
   */
  custom_viewport: Node;
  /**
   * Bottom margin needed to drag the camera. A value of `1` makes the camera move only when reaching the bottom edge of the screen.
   */
  drag_bottom_margin: float;
  /**
   * If `true`, the camera only moves when reaching the horizontal (left and right) drag margins. If `false`, the camera moves horizontally regardless of margins.
   */
  drag_horizontal_enabled: boolean;
  /**
   * The relative horizontal drag offset of the camera between the right (`-1`) and left (`1`) drag margins.
   * **Note:** Used to set the initial horizontal drag offset; determine the current offset; or force the current offset. It's not automatically updated when {@link drag_horizontal_enabled} is `true` or the drag margins are changed.
   */
  drag_horizontal_offset: float;
  /**
   * Left margin needed to drag the camera. A value of `1` makes the camera move only when reaching the left edge of the screen.
   */
  drag_left_margin: float;
  /**
   * Right margin needed to drag the camera. A value of `1` makes the camera move only when reaching the right edge of the screen.
   */
  drag_right_margin: float;
  /**
   * Top margin needed to drag the camera. A value of `1` makes the camera move only when reaching the top edge of the screen.
   */
  drag_top_margin: float;
  /**
   * If `true`, the camera only moves when reaching the vertical (top and bottom) drag margins. If `false`, the camera moves vertically regardless of the drag margins.
   */
  drag_vertical_enabled: boolean;
  /**
   * The relative vertical drag offset of the camera between the bottom (`-1`) and top (`1`) drag margins.
   * **Note:** Used to set the initial vertical drag offset; determine the current offset; or force the current offset. It's not automatically updated when {@link drag_vertical_enabled} is `true` or the drag margins are changed.
   */
  drag_vertical_offset: float;
  /** If `true`, draws the camera's drag margin rectangle in the editor. */
  editor_draw_drag_margin: boolean;
  /** If `true`, draws the camera's limits rectangle in the editor. */
  editor_draw_limits: boolean;
  /** If `true`, draws the camera's screen rectangle in the editor. */
  editor_draw_screen: boolean;
  /**
   * Controls whether the camera can be active or not. If `true`, the {@link Camera2D} will become the main camera when it enters the scene tree and there is no active camera currently (see {@link Viewport.get_camera_2d}).
   * When the camera is currently active and {@link enabled} is set to `false`, the next enabled {@link Camera2D} in the scene tree will become active.
   */
  enabled: boolean;
  /**
   * If `true`, the camera's rendered view is not affected by its {@link Node2D.rotation} and {@link Node2D.global_rotation}.
   */
  ignore_rotation: boolean;
  /**
   * Bottom scroll limit in pixels. The camera stops moving when reaching this value, but {@link offset} can push the view past the limit.
   */
  limit_bottom: int;
  /**
   * If `true`, the limits will be enabled. Disabling this will allow the camera to focus anywhere, when the four `limit_*` properties will not work.
   */
  limit_enabled: boolean;
  /**
   * Left scroll limit in pixels. The camera stops moving when reaching this value, but {@link offset} can push the view past the limit.
   */
  limit_left: int;
  /**
   * Right scroll limit in pixels. The camera stops moving when reaching this value, but {@link offset} can push the view past the limit.
   */
  limit_right: int;
  /**
   * If `true`, the camera smoothly stops when reaches its limits.
   * This property has no effect if {@link position_smoothing_enabled} is `false`.
   * **Note:** To immediately update the camera's position to be within limits without smoothing, even with this setting enabled, invoke {@link reset_smoothing}.
   */
  limit_smoothed: boolean;
  /**
   * Top scroll limit in pixels. The camera stops moving when reaching this value, but {@link offset} can push the view past the limit.
   */
  limit_top: int;
  /**
   * The camera's relative offset. Useful for looking around or camera shake animations. The offsetted camera can go past the limits defined in {@link limit_top}, {@link limit_bottom}, {@link limit_left} and {@link limit_right}.
   */
  offset: Vector2;
  /**
   * If `true`, the camera's view smoothly moves towards its target position at {@link position_smoothing_speed}.
   */
  position_smoothing_enabled: boolean;
  /**
   * Speed in pixels per second of the camera's smoothing effect when {@link position_smoothing_enabled} is `true`.
   */
  position_smoothing_speed: float;
  /** The camera's process callback. */
  process_callback: int;
  /**
   * If `true`, the camera's view smoothly rotates, via asymptotic smoothing, to align with its target rotation at {@link rotation_smoothing_speed}.
   * **Note:** This property has no effect if {@link ignore_rotation} is `true`.
   */
  rotation_smoothing_enabled: boolean;
  /**
   * The angular, asymptotic speed of the camera's rotation smoothing effect when {@link rotation_smoothing_enabled} is `true`.
   */
  rotation_smoothing_speed: float;
  /**
   * The camera's zoom. Higher values are more zoomed in. For example, a zoom of `Vector2(2.0, 2.0)` will be twice as zoomed in on each axis (the view covers an area four times smaller). In contrast, a zoom of `Vector2(0.5, 0.5)` will be twice as zoomed out on each axis (the view covers an area four times larger). The X and Y components should generally always be set to the same value, unless you wish to stretch the camera view.
   * **Note:** {@link FontFile.oversampling} does *not* take {@link Camera2D} zoom into account. This means that zooming in/out will cause bitmap fonts and rasterized (non-MSDF) dynamic fonts to appear blurry or pixelated unless the font is part of a {@link CanvasLayer} that makes it ignore camera zoom. To ensure text remains crisp regardless of zoom, you can enable MSDF font rendering by enabling {@link ProjectSettings.gui/theme/default_font_multichannel_signed_distance_field} (applies to the default project font only), or enabling **Multichannel Signed Distance Field** in the import options of a DynamicFont for custom fonts. On system fonts, {@link SystemFont.multichannel_signed_distance_field} can be enabled in the inspector.
   */
  zoom: Vector2;

  /**
   * Aligns the camera to the tracked node.
   * **Note:** Calling {@link force_update_scroll} after this method is not required.
   */
  align(): void;
  /** Forces the camera to update scroll immediately. */
  force_update_scroll(): void;
  /**
   * Returns the specified {@link Side}'s margin. See also {@link drag_bottom_margin}, {@link drag_top_margin}, {@link drag_left_margin}, and {@link drag_right_margin}.
   */
  get_drag_margin(margin: int): float;
  /**
   * Returns the camera limit for the specified {@link Side}. See also {@link limit_bottom}, {@link limit_top}, {@link limit_left}, and {@link limit_right}.
   */
  get_limit(margin: int): int;
  /**
   * Returns the center of the screen from this camera's point of view, in global coordinates.
   * **Note:** The exact targeted position of the camera may be different. See {@link get_target_position}.
   */
  get_screen_center_position(): Vector2;
  /**
   * Returns the current screen rotation from this camera's point of view.
   * **Note:** The screen rotation can be different from {@link Node2D.global_rotation} if the camera is rotating smoothly due to {@link rotation_smoothing_enabled}.
   */
  get_screen_rotation(): float;
  /**
   * Returns this camera's target position, in global coordinates.
   * **Note:** The returned value is not the same as {@link Node2D.global_position}, as it is affected by the drag properties. It is also not the same as the current position if {@link position_smoothing_enabled} is `true` (see {@link get_screen_center_position}).
   */
  get_target_position(): Vector2;
  /** Returns `true` if this {@link Camera2D} is the active camera (see {@link Viewport.get_camera_2d}). */
  is_current(): boolean;
  /** Forces this {@link Camera2D} to become the current active one. {@link enabled} must be `true`. */
  make_current(): void;
  /**
   * Sets the camera's position immediately to its current smoothing destination.
   * This method has no effect if {@link position_smoothing_enabled} is `false`.
   */
  reset_smoothing(): void;
  /**
   * Sets the specified {@link Side}'s margin. See also {@link drag_bottom_margin}, {@link drag_top_margin}, {@link drag_left_margin}, and {@link drag_right_margin}.
   */
  set_drag_margin(margin: int, drag_margin: float): void;
  /**
   * Sets the camera limit for the specified {@link Side}. See also {@link limit_bottom}, {@link limit_top}, {@link limit_left}, and {@link limit_right}.
   */
  set_limit(margin: int, limit: int): void;

  // enum AnchorMode
  /** The camera's position is fixed so that the top-left corner is always at the origin. */
  static readonly ANCHOR_MODE_FIXED_TOP_LEFT: int;
  /** The camera's position takes into account vertical/horizontal offsets and the screen size. */
  static readonly ANCHOR_MODE_DRAG_CENTER: int;
  // enum Camera2DProcessCallback
  /** The camera updates during physics frames (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}). */
  static readonly CAMERA2D_PROCESS_PHYSICS: int;
  /** The camera updates during process frames (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}). */
  static readonly CAMERA2D_PROCESS_IDLE: int;
}
