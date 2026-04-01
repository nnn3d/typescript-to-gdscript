declare class Node extends GodotObject {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
}
