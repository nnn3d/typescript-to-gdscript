// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for {@link AnimationTree} nodes. Not related to scene nodes. */
declare class AnimationNode extends Resource {
  /** If `true`, filtering is enabled. */
  filter_enabled: boolean;
  set_filter_enabled(value: boolean): void;
  is_filter_enabled(): boolean;

  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to override the text caption for this animation node.
   */
  _get_caption(): string;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return a child animation node by its `name`.
   */
  _get_child_by_name(name: string): AnimationNode;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return all child animation nodes in order as a `name: node` dictionary.
   */
  _get_child_nodes(): Dictionary;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return the default value of a `parameter`. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees.
   */
  _get_parameter_default_value(parameter: string): unknown;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return a list of the properties on this animation node. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees. Format is similar to {@link Object.get_property_list}.
   */
  _get_parameter_list(): Array<unknown>;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return whether the blend tree editor should display filter editing on this animation node.
   */
  _has_filter(): boolean;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to return whether the `parameter` is read-only. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees.
   */
  _is_parameter_read_only(parameter: string): boolean;
  /**
   * When inheriting from {@link AnimationRootNode}, implement this virtual method to run some code when this animation node is processed. The `time` parameter is a relative delta, unless `seek` is `true`, in which case it is absolute.
   * Here, call the {@link blend_input}, {@link blend_node} or {@link blend_animation} functions. You can also use {@link get_parameter} and {@link set_parameter} to modify local memory.
   * This function should return the delta.
   */
  _process(time: float, seek: boolean, is_external_seeking: boolean, test_only: boolean): float;
  /**
   * Adds an input to the animation node. This is only useful for animation nodes created for use in an {@link AnimationNodeBlendTree}. If the addition fails, returns `false`.
   */
  add_input(name: string): boolean;
  /**
   * Blends an animation by `blend` amount (name must be valid in the linked {@link AnimationPlayer}). A `time` and `delta` may be passed, as well as whether `seeked` happened.
   * A `looped_flag` is used by internal processing immediately after the loop.
   */
  blend_animation(animation: string, time: float, delta: float, seeked: boolean, is_external_seeking: boolean, blend: float, looped_flag: int): void;
  /**
   * Blends an input. This is only useful for animation nodes created for an {@link AnimationNodeBlendTree}. The `time` parameter is a relative delta, unless `seek` is `true`, in which case it is absolute. A filter mode may be optionally passed.
   */
  blend_input(input_index: int, time: float, seek: boolean, is_external_seeking: boolean, blend: float, filter: int, sync?: boolean, test_only?: boolean): float;
  /**
   * Blend another animation node (in case this animation node contains child animation nodes). This function is only useful if you inherit from {@link AnimationRootNode} instead, otherwise editors will not display your animation node for addition.
   */
  blend_node(name: string, node: AnimationNode, time: float, seek: boolean, is_external_seeking: boolean, blend: float, filter: int, sync?: boolean, test_only?: boolean): float;
  /** Returns the input index which corresponds to `name`. If not found, returns `-1`. */
  find_input(name: string): int;
  /**
   * Amount of inputs in this animation node, only useful for animation nodes that go into {@link AnimationNodeBlendTree}.
   */
  get_input_count(): int;
  /** Gets the name of an input by index. */
  get_input_name(input: int): string;
  /**
   * Gets the value of a parameter. Parameters are custom local memory used for your animation nodes, given a resource can be reused in multiple trees.
   */
  get_parameter(name: string): unknown;
  /**
   * Returns the object id of the {@link AnimationTree} that owns this node.
   * **Note:** This method should only be called from within the {@link AnimationNodeExtension._process_animation_node} method, and will return an invalid id otherwise.
   */
  get_processing_animation_tree_instance_id(): int;
  /** Returns `true` if the given path is filtered. */
  is_path_filtered(path: string): boolean;
  /** Returns `true` if this animation node is being processed in test-only mode. */
  is_process_testing(): boolean;
  /** Removes an input, call this only when inactive. */
  remove_input(index: int): void;
  /** Adds or removes a path for the filter. */
  set_filter_path(path: string, enable: boolean): void;
  /** Sets the name of the input at the given `input` index. If the setting fails, returns `false`. */
  set_input_name(input: int, name: string): boolean;
  /**
   * Sets a custom parameter. These are used as local memory, because resources can be reused across the tree or scenes.
   */
  set_parameter(name: string, value: unknown): void;

  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation nodes removes. The animation nodes that emit this signal are {@link AnimationNodeBlendSpace1D}, {@link AnimationNodeBlendSpace2D}, {@link AnimationNodeStateMachine}, and {@link AnimationNodeBlendTree}.
   */
  animation_node_removed: Signal<[int, string]>;
  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation node names changes. The animation nodes that emit this signal are {@link AnimationNodeBlendSpace1D}, {@link AnimationNodeBlendSpace2D}, {@link AnimationNodeStateMachine}, and {@link AnimationNodeBlendTree}.
   */
  animation_node_renamed: Signal<[int, string, string]>;
  /**
   * Emitted by nodes that inherit from this class and that have an internal tree when one of their animation nodes changes. The animation nodes that emit this signal are {@link AnimationNodeBlendSpace1D}, {@link AnimationNodeBlendSpace2D}, {@link AnimationNodeStateMachine}, {@link AnimationNodeBlendTree} and {@link AnimationNodeTransition}.
   */
  tree_changed: Signal<[]>;

  // enum FilterAction
  /** Do not use filtering. */
  static readonly FILTER_IGNORE: int;
  /** Paths matching the filter will be allowed to pass. */
  static readonly FILTER_PASS: int;
  /** Paths matching the filter will be discarded. */
  static readonly FILTER_STOP: int;
  /** Paths matching the filter will be blended (by the blend value). */
  static readonly FILTER_BLEND: int;
}
