// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A transition within an {@link AnimationTree} connecting two {@link AnimationNode}s. */
declare class AnimationNodeTransition extends AnimationNodeSync {
  /**
   * If `true`, allows transition to the self state. When the reset option is enabled in input, the animation is restarted. If `false`, nothing happens on the transition to the self state.
   */
  allow_transition_to_self: boolean;
  /** The number of enabled input ports for this animation node. */
  input_count: int;
  /**
   * Determines how cross-fading between animations is eased. If empty, the transition will be linear. Should be a unit {@link Curve}.
   */
  xfade_curve: Curve;
  /**
   * Cross-fading time (in seconds) between each animation connected to the inputs.
   * **Note:** {@link AnimationNodeTransition} transitions the current state immediately after the start of the fading. The precise remaining time can only be inferred from the main animation. When {@link AnimationNodeOutput} is considered as the most upstream, so the {@link xfade_time} is not scaled depending on the downstream delta. See also {@link AnimationNodeOneShot.fadeout_time}.
   */
  xfade_time: float;
  set_allow_transition_to_self(value: boolean): void;
  is_allow_transition_to_self(): boolean;
  set_input_count(value: int): void;
  set_xfade_curve(value: Curve): void;
  get_xfade_curve(): Curve;
  set_xfade_time(value: float): void;
  get_xfade_time(): float;

  /** Returns whether the animation breaks the loop at the end of the loop cycle for transition. */
  is_input_loop_broken_at_end(input: int): boolean;
  /** Returns whether the animation restarts when the animation transitions from the other animation. */
  is_input_reset(input: int): boolean;
  /** Returns `true` if auto-advance is enabled for the given `input` index. */
  is_input_set_as_auto_advance(input: int): boolean;
  /**
   * Enables or disables auto-advance for the given `input` index. If enabled, state changes to the next input after playing the animation once. If enabled for the last input state, it loops to the first.
   */
  set_input_as_auto_advance(input: int, enable: boolean): void;
  /**
   * If `true`, breaks the loop at the end of the loop cycle for transition, even if the animation is looping.
   */
  set_input_break_loop_at_end(input: int, enable: boolean): void;
  /** If `true`, the destination animation is restarted when the animation transitions. */
  set_input_reset(input: int, enable: boolean): void;
}
