// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node used to create a parallax scrolling background. */
declare class ParallaxBackground extends CanvasLayer {
  /**
   * <member name="scroll_base_offset" type="Vector2" setter="set_scroll_base_offset" getter="get_scroll_base_offset" default="Vector2(0, 0)">
   * The base position offset for all {@link ParallaxLayer} children.
   */
  layer: int;
  /** The base motion scale for all {@link ParallaxLayer} children. */
  scroll_base_scale: Vector2;
  /** If `true`, elements in {@link ParallaxLayer} child aren't affected by the zoom level of the camera. */
  scroll_ignore_camera_zoom: boolean;
  /**
   * Top-left limits for scrolling to begin. If the camera is outside of this limit, the background will stop scrolling. Must be lower than {@link scroll_limit_end} to work.
   */
  scroll_limit_begin: Vector2;
  /**
   * Bottom-right limits for scrolling to end. If the camera is outside of this limit, the background will stop scrolling. Must be higher than {@link scroll_limit_begin} to work.
   */
  scroll_limit_end: Vector2;
  /**
   * The ParallaxBackground's scroll value. Calculated automatically when using a {@link Camera2D}, but can be used to manually manage scrolling when no camera is present.
   */
  scroll_offset: Vector2;
  set_scroll_base_scale(value: Vector2): void;
  get_scroll_base_scale(): Vector2;
  set_ignore_camera_zoom(value: boolean): void;
  is_ignore_camera_zoom(): boolean;
  set_limit_begin(value: Vector2): void;
  get_limit_begin(): Vector2;
  set_limit_end(value: Vector2): void;
  get_limit_end(): Vector2;
  set_scroll_offset(value: Vector2): void;
  get_scroll_offset(): Vector2;
}
