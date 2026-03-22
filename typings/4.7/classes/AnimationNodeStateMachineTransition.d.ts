// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A transition within an {@link AnimationNodeStateMachine} connecting two {@link AnimationRootNode}s. */
declare class AnimationNodeStateMachineTransition extends Resource {
  /**
   * Turn on auto advance when this condition is set. The provided name will become a boolean parameter on the {@link AnimationTree} that can be controlled from code (see Using AnimationTree ($DOCS_URL/tutorials/animation/animation_tree.html#controlling-from-code)). For example, if {@link AnimationTree.tree_root} is an {@link AnimationNodeStateMachine} and {@link advance_condition} is set to `"idle"`:
   */
  advance_condition: string;
  /**
   * Use an expression as a condition for state machine transitions. It is possible to create complex animation advance conditions for switching between states and gives much greater flexibility for creating complex state machines by directly interfacing with the script code.
   */
  advance_expression: string;
  /**
   * Determines whether the transition should be disabled, enabled when using {@link AnimationNodeStateMachinePlayback.travel}, or traversed automatically if the {@link advance_condition} and {@link advance_expression} checks are `true` (if assigned).
   */
  advance_mode: int;
  /**
   * If `true`, breaks the loop at the end of the loop cycle for transition, even if the animation is looping.
   */
  break_loop_at_end: boolean;
  /**
   * Lower priority transitions are preferred when travelling through the tree via {@link AnimationNodeStateMachinePlayback.travel} or {@link advance_mode} is set to {@link ADVANCE_MODE_AUTO}.
   */
  priority: int;
  /** If `true`, the destination animation is played back from the beginning when switched. */
  reset: boolean;
  /** The transition type. */
  switch_mode: int;
  /**
   * Ease curve for better control over cross-fade between this state and the next. Should be a unit {@link Curve}.
   */
  xfade_curve: Curve;
  /**
   * The time to cross-fade between this state and the next.
   * **Note:** {@link AnimationNodeStateMachine} transitions the current state immediately after the start of the fading. The precise remaining time can only be inferred from the main animation. When {@link AnimationNodeOutput} is considered as the most upstream, so the {@link xfade_time} is not scaled depending on the downstream delta. See also {@link AnimationNodeOneShot.fadeout_time}.
   */
  xfade_time: float;
  set_advance_condition(value: string): void;
  get_advance_condition(): string;
  set_advance_expression(value: string): void;
  get_advance_expression(): string;
  set_advance_mode(value: int): void;
  get_advance_mode(): int;
  set_break_loop_at_end(value: boolean): void;
  is_loop_broken_at_end(): boolean;
  set_priority(value: int): void;
  get_priority(): int;
  set_reset(value: boolean): void;
  is_reset(): boolean;
  set_switch_mode(value: int): void;
  get_switch_mode(): int;
  set_xfade_curve(value: Curve): void;
  get_xfade_curve(): Curve;
  set_xfade_time(value: float): void;
  get_xfade_time(): float;

  /** Emitted when {@link advance_condition} is changed. */
  advance_condition_changed: Signal<[]>;

  // enum SwitchMode
  /**
   * Switch to the next state immediately. The current state will end and blend into the beginning of the new one.
   */
  static readonly SWITCH_MODE_IMMEDIATE: int;
  /**
   * Switch to the next state immediately, but will seek the new state to the playback position of the old state.
   */
  static readonly SWITCH_MODE_SYNC: int;
  /**
   * Wait for the current state playback to end, then switch to the beginning of the next state animation.
   */
  static readonly SWITCH_MODE_AT_END: int;
  // enum AdvanceMode
  /** Don't use this transition. */
  static readonly ADVANCE_MODE_DISABLED: int;
  /** Only use this transition during {@link AnimationNodeStateMachinePlayback.travel}. */
  static readonly ADVANCE_MODE_ENABLED: int;
  /**
   * Automatically use this transition if the {@link advance_condition} and {@link advance_expression} checks are `true` (if assigned).
   */
  static readonly ADVANCE_MODE_AUTO: int;
}
