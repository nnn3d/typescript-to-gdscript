declare class Node extends GodotObject {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
  add_to_group(group: GodotGroupNames, persistent?: boolean): void;
  add_to_group(group: string, persistent?: boolean): void;
  is_in_group(group: GodotGroupNames): boolean;
  is_in_group(group: string): boolean;
  remove_from_group(group: GodotGroupNames): void;
  remove_from_group(group: string): void;
}
