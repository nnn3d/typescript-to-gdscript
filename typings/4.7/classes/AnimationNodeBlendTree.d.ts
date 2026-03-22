// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A sub-tree of many type {@link AnimationNode}s used for complex animations. Used by {@link AnimationTree}.
 */
declare class AnimationNodeBlendTree extends AnimationRootNode {
  /** The global offset of all sub animation nodes. */
  graph_offset: Vector2;
  set_graph_offset(value: Vector2): void;
  get_graph_offset(): Vector2;

  /**
   * Adds an {@link AnimationNode} at the given `position`. The `name` is used to identify the created sub animation node later.
   */
  add_node(name: string, node: AnimationNode, position?: Vector2): void;
  /**
   * Connects the output of an {@link AnimationNode} as input for another {@link AnimationNode}, at the input port specified by `input_index`.
   */
  connect_node(input_node: string, input_index: int, output_node: string): void;
  /** Disconnects the animation node connected to the specified input. */
  disconnect_node(input_node: string, input_index: int): void;
  /** Returns the sub animation node with the specified `name`. */
  get_node(name: string): AnimationNode;
  /** Returns a list containing the names of all sub animation nodes in this blend tree. */
  get_node_list(): unknown;
  /** Returns the position of the sub animation node with the specified `name`. */
  get_node_position(name: string): Vector2;
  /** Returns `true` if a sub animation node with specified `name` exists. */
  has_node(name: string): boolean;
  /** Removes a sub animation node. */
  remove_node(name: string): void;
  /** Changes the name of a sub animation node. */
  rename_node(name: string, new_name: string): void;
  /** Modifies the position of a sub animation node. */
  set_node_position(name: string, position: Vector2): void;

  /** Emitted when the input port information is changed. */
  node_changed: Signal<[string]>;

  /** The connection was successful. */
  static readonly CONNECTION_OK: int;
  /** The input node is `null`. */
  static readonly CONNECTION_ERROR_NO_INPUT: int;
  /** The specified input port is out of range. */
  static readonly CONNECTION_ERROR_NO_INPUT_INDEX: int;
  /** The output node is `null`. */
  static readonly CONNECTION_ERROR_NO_OUTPUT: int;
  /** Input and output nodes are the same. */
  static readonly CONNECTION_ERROR_SAME_NODE: int;
  /** The specified connection already exists. */
  static readonly CONNECTION_ERROR_CONNECTION_EXISTS: int;
}
