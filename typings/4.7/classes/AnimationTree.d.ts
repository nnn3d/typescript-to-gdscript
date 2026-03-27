// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A node used for advanced animation transitions in an {@link AnimationPlayer}. */
declare class AnimationTree<Tree extends object = any> extends AnimationMixer<Tree> {
  /**
   * The path to the {@link Node} used to evaluate the {@link AnimationNode} {@link Expression} if one is not explicitly specified internally.
   */
  advance_expression_base_node: string;
  /** The path to the {@link AnimationPlayer} used for animating. */
  anim_player: string;
  /**
   * <member name="deterministic" type="bool" setter="set_deterministic" getter="is_deterministic" overrides="AnimationMixer" default="true" />
   * <member name="tree_root" type="AnimationRootNode" setter="set_tree_root" getter="get_tree_root">
   * The root animation node of this {@link AnimationTree}. See {@link AnimationRootNode}.
   */
  callback_mode_discrete: int;
  set_advance_expression_base_node(value: string): void;
  get_advance_expression_base_node(): string;
  set_animation_player(value: string): void;
  get_animation_player(): string;

  /** Returns the process notification in which to update animations. */
  get_process_callback(): int;
  /** Sets the process notification in which to update animations. */
  set_process_callback(mode: int): void;

  /** Emitted when the {@link anim_player} is changed. */
  animation_player_changed: Signal<[]>;

  // enum AnimationProcessCallback
  static readonly ANIMATION_PROCESS_PHYSICS: int;
  static readonly ANIMATION_PROCESS_IDLE: int;
  static readonly ANIMATION_PROCESS_MANUAL: int;
}
