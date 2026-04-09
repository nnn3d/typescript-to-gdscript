// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A state machine with multiple {@link AnimationRootNode}s, used by {@link AnimationTree}. */
declare class AnimationNodeStateMachine extends AnimationRootNode {
  /**
   * If `true`, allows teleport to the self state with {@link AnimationNodeStateMachinePlayback.travel}. When the reset option is enabled in {@link AnimationNodeStateMachinePlayback.travel}, the animation is restarted. If `false`, nothing happens on the teleportation to the self state.
   */
  allow_transition_to_self: boolean;
  /**
   * If `true`, treat the cross-fade to the start and end nodes as a blend with the RESET animation.
   * In most cases, when additional cross-fades are performed in the parent {@link AnimationNode} of the state machine, setting this property to `false` and matching the cross-fade time of the parent {@link AnimationNode} and the state machine's start node and end node gives good results.
   */
  reset_ends: boolean;
  /**
   * This property can define the process of transitions for different use cases. See also {@link AnimationNodeStateMachine.StateMachineType}.
   */
  state_machine_type: int;
  set_allow_transition_to_self(value: boolean): void;
  is_allow_transition_to_self(): boolean;
  set_reset_ends(value: boolean): void;
  are_ends_reset(): boolean;
  set_state_machine_type(value: int): void;
  get_state_machine_type(): int;

  /** Adds a new animation node to the graph. The `position` is used for display in the editor. */
  add_node(name: string, node: AnimationNode, position?: Vector2 | Vector2i): void;
  /** Adds a transition between the given animation nodes. */
  add_transition(from_: string, to: string, transition: AnimationNodeStateMachineTransition): void;
  /** Returns the draw offset of the graph. Used for display in the editor. */
  get_graph_offset(): Vector2;
  /** Returns the animation node with the given name. */
  get_node(name: string): AnimationNode | null;
  /** Returns a list containing the names of all animation nodes in this state machine. */
  get_node_list(): Array<string>;
  /** Returns the given animation node's name. */
  get_node_name(node: AnimationNode): string;
  /** Returns the given animation node's coordinates. Used for display in the editor. */
  get_node_position(name: string): Vector2;
  /** Returns the given transition. */
  get_transition(idx: int): AnimationNodeStateMachineTransition | null;
  /** Returns the number of connections in the graph. */
  get_transition_count(): int;
  /** Returns the given transition's start node. */
  get_transition_from(idx: int): string;
  /** Returns the given transition's end node. */
  get_transition_to(idx: int): string;
  /** Returns `true` if the graph contains the given animation node. */
  has_node(name: string): boolean;
  /** Returns `true` if there is a transition between the given animation nodes. */
  has_transition(from_: string, to: string): boolean;
  /** Deletes the given animation node from the graph. */
  remove_node(name: string): void;
  /** Deletes the transition between the two specified animation nodes. */
  remove_transition(from_: string, to: string): void;
  /** Deletes the given transition by index. */
  remove_transition_by_index(idx: int): void;
  /** Renames the given animation node. */
  rename_node(name: string, new_name: string): void;
  /** Replaces the given animation node with a new animation node. */
  replace_node(name: string, node: AnimationNode): void;
  /** Sets the draw offset of the graph. Used for display in the editor. */
  set_graph_offset(offset: Vector2 | Vector2i): void;
  /** Sets the animation node's coordinates. Used for display in the editor. */
  set_node_position(name: string, position: Vector2 | Vector2i): void;

  // enum StateMachineType
  /**
   * Seeking to the beginning is treated as playing from the start state. Transition to the end state is treated as exiting the state machine.
   */
  static readonly STATE_MACHINE_TYPE_ROOT: int;
  /**
   * Seeking to the beginning is treated as seeking to the beginning of the animation in the current state. Transition to the end state, or the absence of transitions in each state, is treated as exiting the state machine.
   */
  static readonly STATE_MACHINE_TYPE_NESTED: int;
  /**
   * This is a grouped state machine that can be controlled from a parent state machine. It does not work independently. There must be a state machine with {@link state_machine_type} of {@link STATE_MACHINE_TYPE_ROOT} or {@link STATE_MACHINE_TYPE_NESTED} in the parent or ancestor.
   */
  static readonly STATE_MACHINE_TYPE_GROUPED: int;
}
