declare class Node extends GodotObject {
  add_to_group(group: GodotGroupNames, persistent?: boolean): void;
  add_to_group(group: string, persistent?: boolean): void;
  is_in_group(group: GodotGroupNames): boolean;
  is_in_group(group: string): boolean;
  remove_from_group(group: GodotGroupNames): void;
  remove_from_group(group: string): void;
  get_parent<N extends Node = Node>(): N;
}
