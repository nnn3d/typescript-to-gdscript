// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** 2D sprite node in 3D world, that can use multiple 2D textures for animation. */
declare class AnimatedSprite3D extends SpriteBase3D {
  /**
   * The current animation from the {@link sprite_frames} resource. If this value is changed, the {@link frame} counter and the {@link frame_progress} are reset.
   */
  animation: string;
  /** The key of the animation to play when the scene loads. */
  autoplay: string;
  /**
   * The displayed animation frame's index. Setting this property also resets {@link frame_progress}. If this is not desired, use {@link set_frame_and_progress}.
   */
  frame: int;
  /**
   * The progress value between `0.0` and `1.0` until the current frame transitions to the next frame. If the animation is playing backwards, the value transitions from `1.0` to `0.0`.
   */
  frame_progress: float;
  /**
   * The speed scaling ratio. For example, if this value is `1`, then the animation plays at normal speed. If it's `0.5`, then it plays at half speed. If it's `2`, then it plays at double speed.
   * If set to a negative value, the animation is played in reverse. If set to `0`, the animation will not advance.
   */
  speed_scale: float;
  /**
   * The {@link SpriteFrames} resource containing the animation(s). Allows you the option to load, edit, clear, make unique and save the states of the {@link SpriteFrames} resource.
   */
  sprite_frames: SpriteFrames | null;
  set_animation(value: string): void;
  get_animation(): string;
  set_autoplay(value: string): void;
  get_autoplay(): string;
  set_frame(value: int): void;
  get_frame(): int;
  set_frame_progress(value: float): void;
  get_frame_progress(): float;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;
  set_sprite_frames(value: SpriteFrames | null): void;
  get_sprite_frames(): SpriteFrames | null;

  /**
   * Returns the actual playing speed of current animation or `0` if not playing. This speed is the {@link speed_scale} property multiplied by `custom_speed` argument specified when calling the {@link play} method.
   * Returns a negative value if the current animation is playing backwards.
   */
  get_playing_speed(): float;
  /**
   * Returns `true` if an animation is currently playing (even if {@link speed_scale} and/or `custom_speed` are `0`).
   */
  is_playing(): boolean;
  /**
   * Pauses the currently playing animation. The {@link frame} and {@link frame_progress} will be kept and calling {@link play} or {@link play_backwards} without arguments will resume the animation from the current playback position.
   * See also {@link stop}.
   */
  pause(): void;
  /**
   * Plays the animation with key `name`. If `custom_speed` is negative and `from_end` is `true`, the animation will play backwards (which is equivalent to calling {@link play_backwards}).
   * If this method is called with that same animation `name`, or with no `name` parameter, the assigned animation will resume playing if it was paused.
   */
  play(name?: string, custom_speed?: float, from_end?: boolean): void;
  /**
   * Plays the animation with key `name` in reverse.
   * This method is a shorthand for {@link play} with `custom_speed = -1.0` and `from_end = true`, so see its description for more information.
   */
  play_backwards(name?: string): void;
  /**
   * Sets {@link frame} and {@link frame_progress} to the given values. Unlike setting {@link frame}, this method does not reset the {@link frame_progress} to `0.0` implicitly.
   * **Example:** Change the animation while keeping the same {@link frame} and {@link frame_progress}:
   */
  set_frame_and_progress(frame: int, progress: float): void;
  /**
   * Stops the currently playing animation. The animation position is reset to `0` and the `custom_speed` is reset to `1.0`. See also {@link pause}.
   */
  stop(): void;

  /** Emitted when {@link animation} changes. */
  animation_changed: Signal<[]>;
  /**
   * Emitted when the animation reaches the end, or the start if it is played in reverse. When the animation finishes, it pauses the playback.
   * **Note:** This signal is not emitted if an animation is looping.
   */
  animation_finished: Signal<[]>;
  /** Emitted when the animation loops. */
  animation_looped: Signal<[]>;
  /** Emitted when {@link frame} changes. */
  frame_changed: Signal<[]>;
  /** Emitted when {@link sprite_frames} changes. */
  sprite_frames_changed: Signal<[]>;
}
