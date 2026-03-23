/**
 * Override: Node — typed get_node / get_node_or_null.
 * Base returns Node / Node|null. Per-class SceneNodes interfaces (generated
 * by scene typings) narrow the return type for known paths via conditional types.
 */
declare class Node {
  get_node<T extends Node = Node>(path: string): T;
  get_node_or_null<T extends Node = Node>(path: string): T | null;
  get_parent<T extends Node = Node>(): T;
  duplicate(flags?: int): this;
}
