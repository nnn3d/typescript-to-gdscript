/**
 * Override: Node — typed get_node with generic cast.
 */
declare class Node {
  /** Fetches a node by {@link NodePath}. The path can be absolute or relative. */
  get_node<T extends Node = Node>(path: string): T;
  /** Fetches a node by {@link NodePath}. Returns `null` if the path does not point to a valid node. */
  get_node_or_null<T extends Node = Node>(path: string): T | null;
}
