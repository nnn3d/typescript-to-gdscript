/**
 * Override: Node — typed get_node / get_node_or_null.
 * Base returns Node / Node|null. Per-class SceneNodes interfaces (generated
 * by scene typings) narrow the return type for known paths via conditional types.
 */
declare class Node {
  /** Fetches a node by {@link NodePath}. The path can be absolute or relative. */
  get_node(path: string): Node;
  /** Fetches a node by {@link NodePath}. Returns `null` if the path does not point to a valid node. */
  get_node_or_null(path: string): Node | null;
}
