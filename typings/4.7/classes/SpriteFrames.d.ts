// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Sprite frame library for AnimatedSprite2D and AnimatedSprite3D. */
declare class SpriteFrames extends Resource {
  /** Adds a new `anim` animation to the library. */
  add_animation(anim: string): void;
  /**
   * Adds a frame to the `anim` animation. If `at_position` is `-1`, the frame will be added to the end of the animation. `duration` specifies the relative duration, see {@link get_frame_duration} for details.
   */
  add_frame(anim: string, texture: Texture2D, duration?: float, at_position?: int): void;
  /** Removes all frames from the `anim` animation. */
  clear(anim: string): void;
  /** Removes all animations. An empty `default` animation will be created. */
  clear_all(): void;
  /**
   * Duplicates the animation `anim_from` to a new animation named `anim_to`. Fails if `anim_to` already exists, or if `anim_from` does not exist.
   */
  duplicate_animation(anim_from: string, anim_to: string): void;
  /**
   * Returns `true` if the given animation is configured to loop when it finishes playing. Otherwise, returns `false`.
   */
  get_animation_loop(anim: string): boolean;
  /**
   * Returns an array containing the names associated to each animation. Values are placed in alphabetical order.
   */
  get_animation_names(): PackedStringArray;
  /** Returns the speed in frames per second for the `anim` animation. */
  get_animation_speed(anim: string): float;
  /** Returns the number of frames for the `anim` animation. */
  get_frame_count(anim: string): int;
  /**
   * Returns a relative duration of the frame `idx` in the `anim` animation (defaults to `1.0`). For example, a frame with a duration of `2.0` is displayed twice as long as a frame with a duration of `1.0`. You can calculate the absolute duration (in seconds) of a frame using the following formula:
   * In this example, `playing_speed` refers to either {@link AnimatedSprite2D.get_playing_speed} or {@link AnimatedSprite3D.get_playing_speed}.
   */
  get_frame_duration(anim: string, idx: int): float;
  /** Returns the texture of the frame `idx` in the `anim` animation. */
  get_frame_texture(anim: string, idx: int): Texture2D;
  /** Returns `true` if the `anim` animation exists. */
  has_animation(anim: string): boolean;
  /** Removes the `anim` animation. */
  remove_animation(anim: string): void;
  /** Removes the `anim` animation's frame `idx`. */
  remove_frame(anim: string, idx: int): void;
  /** Changes the `anim` animation's name to `newname`. */
  rename_animation(anim: string, newname: string): void;
  /**
   * If `loop` is `true`, the `anim` animation will loop when it reaches the end, or the start if it is played in reverse.
   */
  set_animation_loop(anim: string, loop: boolean): void;
  /** Sets the speed for the `anim` animation in frames per second. */
  set_animation_speed(anim: string, fps: float): void;
  /**
   * Sets the `texture` and the `duration` of the frame `idx` in the `anim` animation. `duration` specifies the relative duration, see {@link get_frame_duration} for details.
   */
  set_frame(anim: string, idx: int, texture: Texture2D, duration?: float): void;
}
