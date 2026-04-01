// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A node used for animation playback. */
declare class AnimationPlayer extends AnimationMixer {
  /**
   * If playing, the current animation's key, otherwise, the animation last played. When set, this changes the animation, but will not play it unless already playing. See also {@link current_animation}.
   */
  assigned_animation: string;
  /** The key of the animation to play when the scene loads. */
  autoplay: string;
  /**
   * The key of the currently playing animation. If no animation is playing, the property's value is an empty string. Changing this value does not restart the animation. See {@link play} for more information on playing animations.
   * **Note:** While this property appears in the Inspector, it's not meant to be edited, and it's not saved in the scene. This property is mainly used to get the currently playing animation, and internally for animation playback tracks. For more information, see {@link Animation}.
   */
  current_animation: string;
  /** The length (in seconds) of the currently playing animation. */
  current_animation_length: float;
  /** The position (in seconds) of the currently playing animation. */
  current_animation_position: float;
  /**
   * If `true` and the engine is running in Movie Maker mode (see {@link MovieWriter}), exits the engine with {@link SceneTree.quit} as soon as an animation is done playing in this {@link AnimationPlayer}. A message is printed when the engine quits for this reason.
   * **Note:** This obeys the same logic as the {@link AnimationMixer.animation_finished} signal, so it will not quit the engine if the animation is set to be looping.
   */
  movie_quit_on_finish: boolean;
  /**
   * If `true`, performs {@link AnimationMixer.capture} before playback automatically. This means just {@link play_with_capture} is executed with default arguments instead of {@link play}.
   * **Note:** Capture interpolation is only performed if the animation contains a capture track. See also {@link Animation.UPDATE_CAPTURE}.
   */
  playback_auto_capture: boolean;
  /**
   * See also {@link play_with_capture} and {@link AnimationMixer.capture}.
   * If {@link playback_auto_capture_duration} is negative value, the duration is set to the interval between the current position and the first key.
   */
  playback_auto_capture_duration: float;
  /** The ease type of the capture interpolation. See also {@link Tween.EaseType}. */
  playback_auto_capture_ease_type: int;
  /** The transition type of the capture interpolation. See also {@link Tween.TransitionType}. */
  playback_auto_capture_transition_type: int;
  /** The default time in which to blend animations. Ranges from 0 to 4096 with 0.01 precision. */
  playback_default_blend_time: float;
  /**
   * The speed scaling ratio. For example, if this value is `1`, then the animation plays at normal speed. If it's `0.5`, then it plays at half speed. If it's `2`, then it plays at double speed.
   * If set to a negative value, the animation is played in reverse. If set to `0`, the animation will not advance.
   */
  speed_scale: float;
  set_assigned_animation(value: string): void;
  get_assigned_animation(): string;
  set_autoplay(value: string): void;
  get_autoplay(): string;
  set_current_animation(value: string): void;
  get_current_animation(): string;
  get_current_animation_length(): float;
  get_current_animation_position(): float;
  set_movie_quit_on_finish_enabled(value: boolean): void;
  is_movie_quit_on_finish_enabled(): boolean;
  set_auto_capture(value: boolean): void;
  is_auto_capture(): boolean;
  set_auto_capture_duration(value: float): void;
  get_auto_capture_duration(): float;
  set_auto_capture_ease_type(value: int): void;
  get_auto_capture_ease_type(): int;
  set_auto_capture_transition_type(value: int): void;
  get_auto_capture_transition_type(): int;
  set_default_blend_time(value: float): void;
  get_default_blend_time(): float;
  set_speed_scale(value: float): void;
  get_speed_scale(): float;

  /** Returns the key of the animation which is queued to play after the `animation_from` animation. */
  animation_get_next(animation_from: string): string;
  /** Triggers the `animation_to` animation when the `animation_from` animation completes. */
  animation_set_next(animation_from: string, animation_to: string): void;
  /** Clears all queued, unplayed animations. */
  clear_queue(): void;
  /** Returns the blend time (in seconds) between two animations, referenced by their keys. */
  get_blend_time(animation_from: string, animation_to: string): float;
  /** Returns the call mode used for "Call Method" tracks. */
  get_method_call_mode(): int;
  /**
   * Returns the actual playing speed of current animation or `0` if not playing. This speed is the {@link speed_scale} property multiplied by `custom_speed` argument specified when calling the {@link play} method.
   * Returns a negative value if the current animation is playing backwards.
   */
  get_playing_speed(): float;
  /** Returns the process notification in which to update animations. */
  get_process_callback(): int;
  /** Returns a list of the animation keys that are currently queued to play. */
  get_queue(): Array<string>;
  /** Returns the node which node path references will travel from. */
  get_root(): string;
  /** Returns the end time of the section currently being played. */
  get_section_end_time(): float;
  /** Returns the start time of the section currently being played. */
  get_section_start_time(): float;
  /** Returns `true` if an animation is currently playing with a section. */
  has_section(): boolean;
  /**
   * Returns `true` if the an animation is currently active. An animation is active if it was played by calling {@link play} and was not finished yet, or was stopped by calling {@link stop}.
   * This can be used to check whether an animation is currently paused or stopped.
   */
  is_animation_active(): boolean;
  /**
   * Returns `true` if an animation is currently playing (even if {@link speed_scale} and/or `custom_speed` are `0`).
   */
  is_playing(): boolean;
  /**
   * Pauses the currently playing animation. The {@link current_animation_position} will be kept and calling {@link play} or {@link play_backwards} without arguments or with the same animation name as {@link assigned_animation} will resume the animation.
   * See also {@link stop}.
   */
  pause(): void;
  /**
   * Plays the animation with key `name`. Custom blend times and speed can be set.
   * The `from_end` option only affects when switching to a new animation track, or if the same track but at the start or end. It does not affect resuming playback that was paused in the middle of an animation. If `custom_speed` is negative and `from_end` is `true`, the animation will play backwards (which is equivalent to calling {@link play_backwards}).
   * The {@link AnimationPlayer} keeps track of its current or last played animation with {@link assigned_animation}. If this method is called with that same animation `name`, or with no `name` parameter, the assigned animation will resume playing if it was paused.
   * **Note:** The animation will be updated the next time the {@link AnimationPlayer} is processed. If other variables are updated at the same time this is called, they may be updated too early. To perform the update immediately, call `advance(0)`.
   */
  play(name?: string, custom_blend?: float, custom_speed?: float, from_end?: boolean): void;
  /**
   * Plays the animation with key `name` in reverse.
   * This method is a shorthand for {@link play} with `custom_speed = -1.0` and `from_end = true`, so see its description for more information.
   */
  play_backwards(name?: string, custom_blend?: float): void;
  /**
   * Plays the animation with key `name` and the section starting from `start_time` and ending on `end_time`. See also {@link play}.
   * Setting `start_time` to a value outside the range of the animation means the start of the animation will be used instead, and setting `end_time` to a value outside the range of the animation means the end of the animation will be used instead. `start_time` cannot be equal to `end_time`.
   */
  play_section(name?: string, start_time?: float, end_time?: float, custom_blend?: float, custom_speed?: float, from_end?: boolean): void;
  /**
   * Plays the animation with key `name` and the section starting from `start_time` and ending on `end_time` in reverse.
   * This method is a shorthand for {@link play_section} with `custom_speed = -1.0` and `from_end = true`, see its description for more information.
   */
  play_section_backwards(name?: string, start_time?: float, end_time?: float, custom_blend?: float): void;
  /**
   * Plays the animation with key `name` and the section starting from `start_marker` and ending on `end_marker`.
   * If the start marker is empty, the section starts from the beginning of the animation. If the end marker is empty, the section ends on the end of the animation. See also {@link play}.
   */
  play_section_with_markers(name?: string, start_marker?: string, end_marker?: string, custom_blend?: float, custom_speed?: float, from_end?: boolean): void;
  /**
   * Plays the animation with key `name` and the section starting from `start_marker` and ending on `end_marker` in reverse.
   * This method is a shorthand for {@link play_section_with_markers} with `custom_speed = -1.0` and `from_end = true`, see its description for more information.
   */
  play_section_with_markers_backwards(name?: string, start_marker?: string, end_marker?: string, custom_blend?: float): void;
  /**
   * See also {@link AnimationMixer.capture}.
   * You can use this method to use more detailed options for capture than those performed by {@link playback_auto_capture}. When {@link playback_auto_capture} is `false`, this method is almost the same as the following:
   * If `name` is blank, it specifies {@link assigned_animation}.
   * If `duration` is a negative value, the duration is set to the interval between the current position and the first key, when `from_end` is `true`, uses the interval between the current position and the last key instead.
   * **Note:** The `duration` takes {@link speed_scale} into account, but `custom_speed` does not, because the capture cache is interpolated with the blend result and the result may contain multiple animations.
   */
  play_with_capture(name?: string, duration?: float, custom_blend?: float, custom_speed?: float, from_end?: boolean, trans_type?: int, ease_type?: int): void;
  /**
   * Queues an animation for playback once the current animation and all previously queued animations are done.
   * **Note:** If a looped animation is currently playing, the queued animation will never play unless the looped animation is stopped somehow.
   */
  queue(name: string): void;
  /** Resets the current section. Does nothing if a section has not been set. */
  reset_section(): void;
  /**
   * Seeks the animation to the `seconds` point in time (in seconds). If `update` is `true`, the animation updates too, otherwise it updates at process time. Events between the current frame and `seconds` are skipped.
   * If `update_only` is `true`, the method / audio / animation playback tracks will not be processed.
   * **Note:** Seeking to the end of the animation doesn't emit {@link AnimationMixer.animation_finished}. If you want to skip animation and emit the signal, use {@link AnimationMixer.advance}.
   */
  seek(seconds: float, update?: boolean, update_only?: boolean): void;
  /** Specifies a blend time (in seconds) between two animations, referenced by their keys. */
  set_blend_time(animation_from: string, animation_to: string, sec: float): void;
  /** Sets the call mode used for "Call Method" tracks. */
  set_method_call_mode(mode: int): void;
  /** Sets the process notification in which to update animations. */
  set_process_callback(mode: int): void;
  /** Sets the node which node path references will travel from. */
  set_root(path: string): void;
  /**
   * Changes the start and end times of the section being played. The current playback position will be clamped within the new section. See also {@link play_section}.
   */
  set_section(start_time?: float, end_time?: float): void;
  /**
   * Changes the start and end markers of the section being played. The current playback position will be clamped within the new section. See also {@link play_section_with_markers}.
   * If the argument is empty, the section uses the beginning or end of the animation. If both are empty, it means that the section is not set.
   */
  set_section_with_markers(start_marker?: string, end_marker?: string): void;
  /**
   * Stops the currently playing animation. The animation position is reset to `0` and the `custom_speed` is reset to `1.0`. See also {@link pause}.
   * If `keep_state` is `true`, the animation state is not updated visually.
   * **Note:** The method / audio / animation playback tracks will not be processed by this method.
   */
  stop(keep_state?: boolean): void;

  /**
   * Emitted when a queued animation plays after the previous animation finished. See also {@link AnimationPlayer.queue}.
   * **Note:** The signal is not emitted when the animation is changed via {@link AnimationPlayer.play} or by an {@link AnimationTree}.
   */
  animation_changed: Signal<[string, string]>;
  /** Emitted when {@link current_animation} changes. */
  current_animation_changed: Signal<[string]>;

  // enum AnimationProcessCallback
  static readonly ANIMATION_PROCESS_PHYSICS: int;
  static readonly ANIMATION_PROCESS_IDLE: int;
  static readonly ANIMATION_PROCESS_MANUAL: int;
  // enum AnimationMethodCallMode
  static readonly ANIMATION_METHOD_CALL_DEFERRED: int;
  static readonly ANIMATION_METHOD_CALL_IMMEDIATE: int;
}
