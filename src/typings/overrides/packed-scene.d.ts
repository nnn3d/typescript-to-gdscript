/**
 * Override: PackedScene — generic type parameter for root node type.
 * @typeParam T - The type of the root node/script. Inferred from `GodotResources` when using `load()`/`preload()`.
 */
declare class PackedScene<T extends Node = Node> extends Resource {
  instantiate(edit_state?: int): T;
}
