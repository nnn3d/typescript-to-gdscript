// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node used to create a parallax scrolling background. */
declare class Parallax2D<Tree extends object = any> extends Node2D<Tree> {
  /** Velocity at which the offset scrolls automatically, in pixels per second. */
  autoscroll: Vector2;
  /**
   * If `true`, this {@link Parallax2D} is offset by the current camera's position. If the {@link Parallax2D} is in a {@link CanvasLayer} separate from the current camera, it may be desired to match the value with {@link CanvasLayer.follow_viewport_enabled}.
   */
  follow_viewport: boolean;
  /** If `true`, {@link Parallax2D}'s position is not affected by the position of the camera. */
  ignore_camera_scroll: boolean;
  /**
   * Top-left limits for scrolling to begin. If the camera is outside of this limit, the {@link Parallax2D} stops scrolling. Must be lower than {@link limit_end} minus the viewport size to work.
   */
  limit_begin: Vector2;
  /**
   * Bottom-right limits for scrolling to end. If the camera is outside of this limit, the {@link Parallax2D} will stop scrolling. Must be higher than {@link limit_begin} and the viewport size combined to work.
   */
  limit_end: Vector2;
  /**
   * <member name="repeat_size" type="Vector2" setter="set_repeat_size" getter="get_repeat_size" default="Vector2(0, 0)">
   * Repeats the {@link Texture2D} of each of this node's children and offsets them by this value. When scrolling, the node's position loops, giving the illusion of an infinite scrolling background if the values are larger than the screen size. If an axis is set to `0`, the {@link Texture2D} will not be repeated.
   */
  physics_interpolation_mode: int;
  /**
   * Overrides the amount of times the texture repeats. Each texture copy spreads evenly from the original by {@link repeat_size}. Useful for when zooming out with a camera.
   */
  repeat_times: int;
  /**
   * Offset used to scroll this {@link Parallax2D}. This value is updated automatically unless {@link ignore_camera_scroll} is `true`.
   */
  screen_offset: Vector2;
  /**
   * The {@link Parallax2D}'s offset. Similar to {@link screen_offset} and {@link Node2D.position}, but will not be overridden.
   * **Note:** Values will loop if {@link repeat_size} is set higher than `0`.
   */
  scroll_offset: Vector2;
  /**
   * Multiplier to the final {@link Parallax2D}'s offset. Can be used to simulate distance from the camera.
   * For example, a value of `1` scrolls at the same speed as the camera. A value greater than `1` scrolls faster, making objects appear closer. Less than `1` scrolls slower, making objects appear further, and a value of `0` stops the objects completely.
   */
  scroll_scale: Vector2;
  set_autoscroll(value: Vector2): void;
  get_autoscroll(): Vector2;
  set_follow_viewport(value: boolean): void;
  get_follow_viewport(): boolean;
  set_ignore_camera_scroll(value: boolean): void;
  is_ignore_camera_scroll(): boolean;
  set_limit_begin(value: Vector2): void;
  get_limit_begin(): Vector2;
  set_limit_end(value: Vector2): void;
  get_limit_end(): Vector2;
  set_repeat_times(value: int): void;
  get_repeat_times(): int;
  set_screen_offset(value: Vector2): void;
  get_screen_offset(): Vector2;
  set_scroll_offset(value: Vector2): void;
  get_scroll_offset(): Vector2;
  set_scroll_scale(value: Vector2): void;
  get_scroll_scale(): Vector2;
}
