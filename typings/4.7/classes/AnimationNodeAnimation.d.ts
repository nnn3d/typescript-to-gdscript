// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** An input animation for an {@link AnimationNodeBlendTree}. */
declare class AnimationNodeAnimation extends AnimationRootNode {
  /**
   * If `true`, on receiving a request to play an animation from the start, the first frame is not drawn, but only processed, and playback starts from the next frame.
   * See also the notes of {@link AnimationPlayer.play}.
   */
  advance_on_start: boolean;
  /**
   * Animation to use as an output. It is one of the animations provided by {@link AnimationTree.anim_player}.
   */
  animation: string;
  /**
   * If {@link use_custom_timeline} is `true`, override the loop settings of the original {@link Animation} resource with the value.
   * **Note:** If the {@link Animation.loop_mode} isn't set to looping, the {@link Animation.track_set_interpolation_loop_wrap} option will not be respected. If you cannot get the expected behavior, consider duplicating the {@link Animation} resource and changing the loop settings.
   */
  loop_mode: int;
  /** Determines the playback direction of the animation. */
  play_mode: int;
  /**
   * If {@link use_custom_timeline} is `true`, offset the start position of the animation.
   * This is useful for adjusting which foot steps first in 3D walking animations.
   */
  start_offset: float;
  /**
   * If `true`, scales the time so that the length specified in {@link timeline_length} is one cycle.
   * This is useful for matching the periods of walking and running animations.
   * If `false`, the original animation length is respected. If you set the loop to {@link loop_mode}, the animation will loop in {@link timeline_length}.
   */
  stretch_time_scale: boolean;
  /**
   * The length of the custom timeline.
   * If {@link stretch_time_scale} is `true`, scales the animation to this length.
   */
  timeline_length: float;
  /**
   * If `true`, {@link AnimationNode} provides an animation based on the {@link Animation} resource with some parameters adjusted.
   */
  use_custom_timeline: boolean;
  set_advance_on_start(value: boolean): void;
  is_advance_on_start(): boolean;
  set_animation(value: string): void;
  get_animation(): string;
  set_loop_mode(value: int): void;
  get_loop_mode(): int;
  set_play_mode(value: int): void;
  get_play_mode(): int;
  set_start_offset(value: float): void;
  get_start_offset(): float;
  set_stretch_time_scale(value: boolean): void;
  is_stretching_time_scale(): boolean;
  set_timeline_length(value: float): void;
  get_timeline_length(): float;
  set_use_custom_timeline(value: boolean): void;
  is_using_custom_timeline(): boolean;

  // enum PlayMode
  /** Plays animation in forward direction. */
  static readonly PLAY_MODE_FORWARD: int;
  /** Plays animation in backward direction. */
  static readonly PLAY_MODE_BACKWARD: int;
}
