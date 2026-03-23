// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Override: PackedScene — generic type parameter for root node type.
 * @typeParam T - The type of the root node/script. Inferred from `GodotResources` when using `load()`/`preload()`.
 */
declare class PackedScene<T extends Node = Node> extends Resource {
  /** Returns `true` if the scene file has nodes. */
  can_instantiate(): boolean;
  /** Returns the {@link SceneState} representing the scene file contents. */
  get_state(): SceneState;
  /**
   * Instantiates the scene's node hierarchy. Triggers child scene instantiation(s). Triggers a {@link Node.NOTIFICATION_SCENE_INSTANTIATED} notification on the root node.
   */
  instantiate(edit_state?: int): T;
  /**
   * Packs the `path` node, and all owned sub-nodes, into this {@link PackedScene}. Any existing data will be cleared. See {@link Node.owner}.
   */
  pack(path: Node): int;

  // enum GenEditState
  /** If passed to {@link instantiate}, blocks edits to the scene state. */
  static readonly GEN_EDIT_STATE_DISABLED: int;
  /**
   * If passed to {@link instantiate}, provides local scene resources to the local scene.
   * **Note:** Only available in editor builds.
   */
  static readonly GEN_EDIT_STATE_INSTANCE: int;
  /**
   * If passed to {@link instantiate}, provides local scene resources to the local scene. Only the main scene should receive the main edit state.
   * **Note:** Only available in editor builds.
   */
  static readonly GEN_EDIT_STATE_MAIN: int;
  /**
   * It's similar to {@link GEN_EDIT_STATE_MAIN}, but for the case where the scene is being instantiated to be the base of another one.
   * **Note:** Only available in editor builds.
   */
  static readonly GEN_EDIT_STATE_MAIN_INHERITED: int;
}
