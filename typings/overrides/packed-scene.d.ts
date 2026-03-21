/**
 * An abstraction of a serialized scene.
 * @typeParam T - The type of the root node/script. Inferred from `GodotResources` when using `load()`/`preload()`.
 */
declare class PackedScene<T extends Node = Node> extends Resource {
  /**
   * Instantiates the scene's node hierarchy. Triggers child scene instantiation(s).
   */
  instantiate(edit_state?: int): T;
}
