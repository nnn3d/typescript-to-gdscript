// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides playback control for an {@link AnimationNodeStateMachine}. */
declare class AnimationNodeStateMachinePlayback extends Resource {
  resource_local_to_scene: boolean;

  /**
   * Returns the current state length.
   * **Note:** It is possible that any {@link AnimationRootNode} can be nodes as well as animations. This means that there can be multiple animations within a single state. Which animation length has priority depends on the nodes connected inside it. Also, if a transition does not reset, the remaining length at that point will be returned.
   */
  get_current_length(): float;
  /**
   * Returns the currently playing animation state.
   * **Note:** When using a cross-fade, the current state changes to the next state immediately after the cross-fade begins.
   */
  get_current_node(): string;
  /** Returns the playback position within the current animation state. */
  get_current_play_position(): float;
  /**
   * Returns the playback state length of the node from {@link get_fading_from_node}. Returns `0` if no animation fade is occurring.
   */
  get_fading_from_length(): float;
  /** Returns the starting state of currently fading animation. */
  get_fading_from_node(): string;
  /**
   * Returns the playback position of the node from {@link get_fading_from_node}. Returns `0` if no animation fade is occurring.
   */
  get_fading_from_play_position(): float;
  /** Returns the length of the current fade animation. Returns `0` if no animation fade is occurring. */
  get_fading_length(): float;
  /**
   * Returns the playback position of the current fade animation. Returns `0` if no animation fade is occurring.
   */
  get_fading_position(): float;
  /** Returns the current travel path as computed internally by the A* algorithm. */
  get_travel_path(): unknown;
  /** Returns `true` if an animation is playing. */
  is_playing(): boolean;
  /**
   * If there is a next path by travel or auto advance, immediately transitions from the current state to the next state.
   */
  next(): void;
  /**
   * Starts playing the given animation.
   * If `reset` is `true`, the animation is played from the beginning.
   */
  start(node: string, reset?: boolean): void;
  /** Stops the currently playing animation. */
  stop(): void;
  /**
   * Transitions from the current state to another one, following the shortest path.
   * If the path does not connect from the current state, the animation will play after the state teleports.
   * If `reset_on_teleport` is `true`, the animation is played from the beginning when the travel cause a teleportation.
   */
  travel(to_node: string, reset_on_teleport?: boolean): void;

  /**
   * Emitted when the `state` finishes playback. If `state` is a state machine set to grouped mode, its signals are passed through with its name prefixed.
   * If there is a crossfade, this will be fired when the influence of the {@link get_fading_from_node} animation is no longer present.
   */
  state_finished: Signal<[string]>;
  /**
   * Emitted when the `state` starts playback. If `state` is a state machine set to grouped mode, its signals are passed through with its name prefixed.
   */
  state_started: Signal<[string]>;
}
