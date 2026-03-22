// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Plays an animation once in an {@link AnimationNodeBlendTree}. */
declare class AnimationNodeOneShot extends AnimationNodeSync {
  /** If `true`, the sub-animation will abort if resumed with a reset after a prior interruption. */
  abort_on_reset: boolean;
  /**
   * If `true`, the sub-animation will restart automatically after finishing.
   * In other words, to start auto restarting, the animation must be played once with the {@link ONE_SHOT_REQUEST_FIRE} request. The {@link ONE_SHOT_REQUEST_ABORT} request stops the auto restarting, but it does not disable the {@link autorestart} itself. So, the {@link ONE_SHOT_REQUEST_FIRE} request will start auto restarting again.
   */
  autorestart: boolean;
  /** The delay after which the automatic restart is triggered, in seconds. */
  autorestart_delay: float;
  /**
   * If {@link autorestart} is `true`, a random additional delay (in seconds) between 0 and this value will be added to {@link autorestart_delay}.
   */
  autorestart_random_delay: float;
  /**
   * If `true`, breaks the loop at the end of the loop cycle for transition, even if the animation is looping.
   */
  break_loop_at_end: boolean;
  /**
   * Determines how cross-fading between animations is eased. If empty, the transition will be linear. Should be a unit {@link Curve}.
   */
  fadein_curve: Curve;
  /**
   * The fade-in duration. For example, setting this to `1.0` for a 5 second length animation will produce a cross-fade that starts at 0 second and ends at 1 second during the animation.
   * **Note:** {@link AnimationNodeOneShot} transitions the current state after the fading has finished.
   */
  fadein_time: float;
  /**
   * Determines how cross-fading between animations is eased. If empty, the transition will be linear. Should be a unit {@link Curve}.
   */
  fadeout_curve: Curve;
  /**
   * The fade-out duration. For example, setting this to `1.0` for a 5 second length animation will produce a cross-fade that starts at 4 second and ends at 5 second during the animation.
   * **Note:** {@link AnimationNodeOneShot} transitions the current state after the fading has finished.
   */
  fadeout_time: float;
  /** The blend type. */
  mix_mode: int;
  set_abort_on_reset(value: boolean): void;
  is_aborted_on_reset(): boolean;
  set_autorestart(value: boolean): void;
  has_autorestart(): boolean;
  set_autorestart_delay(value: float): void;
  get_autorestart_delay(): float;
  set_autorestart_random_delay(value: float): void;
  get_autorestart_random_delay(): float;
  set_break_loop_at_end(value: boolean): void;
  is_loop_broken_at_end(): boolean;
  set_fadein_curve(value: Curve): void;
  get_fadein_curve(): Curve;
  set_fadein_time(value: float): void;
  get_fadein_time(): float;
  set_fadeout_curve(value: Curve): void;
  get_fadeout_curve(): Curve;
  set_fadeout_time(value: float): void;
  get_fadeout_time(): float;
  set_mix_mode(value: int): void;
  get_mix_mode(): int;

  // enum OneShotRequest
  /** The default state of the request. Nothing is done. */
  static readonly ONE_SHOT_REQUEST_NONE: int;
  /** The request to play the animation connected to "shot" port. */
  static readonly ONE_SHOT_REQUEST_FIRE: int;
  /** The request to stop the animation connected to "shot" port. */
  static readonly ONE_SHOT_REQUEST_ABORT: int;
  /** The request to fade out the animation connected to "shot" port. */
  static readonly ONE_SHOT_REQUEST_FADE_OUT: int;
  // enum MixMode
  /** Blends two animations. See also {@link AnimationNodeBlend2}. */
  static readonly MIX_MODE_BLEND: int;
  /** Blends two animations additively. See also {@link AnimationNodeAdd2}. */
  static readonly MIX_MODE_ADD: int;
}
