/**
 * Override: SceneTree — typed group methods and change_scene_to_file.
 */
declare class SceneTree {
  // Group query methods with typed group names and return types
  get_nodes_in_group<G extends string>(group: G): Array<GodotGroupNodes<G>>;
  get_first_node_in_group<G extends string>(group: G): GodotGroupNodes<G>;
  has_group(name: GodotGroupNames): boolean;
  has_group(name: string): boolean;
  get_node_count_in_group(group: GodotGroupNames): int;
  get_node_count_in_group(group: string): int;

  // Group action methods with typed group names
  call_group(group: GodotGroupNames, method: string, ...args: any[]): void;
  call_group(group: string, method: string, ...args: any[]): void;
  call_group_flags(
    flags: int,
    group: GodotGroupNames,
    method: string,
    ...args: any[]
  ): void;
  call_group_flags(
    flags: int,
    group: string,
    method: string,
    ...args: any[]
  ): void;
  notify_group(group: GodotGroupNames, notification: int): void;
  notify_group(group: string, notification: int): void;
  notify_group_flags(
    call_flags: int,
    group: GodotGroupNames,
    notification: int,
  ): void;
  notify_group_flags(call_flags: int, group: string, notification: int): void;
  set_group(group: GodotGroupNames, property: string, value: unknown): void;
  set_group(group: string, property: string, value: unknown): void;
  set_group_flags(
    call_flags: int,
    group: GodotGroupNames,
    property: string,
    value: unknown,
  ): void;
  set_group_flags(
    call_flags: int,
    group: string,
    property: string,
    value: unknown,
  ): void;

  // Scene navigation
  change_scene_to_file(path: GodotScenePaths): int;
  change_scene_to_file(path: string): int;
}
