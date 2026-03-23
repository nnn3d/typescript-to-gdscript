/**
 * Override: SceneTree — typed call_group, call_group_flags, and change_scene_to_file.
 */
declare class SceneTree {
  call_group(group: string, method: string, ...args: any[]): void;
  call_group_flags(
    flags: int,
    group: string,
    method: string,
    ...args: any[]
  ): void;
  change_scene_to_file(path: GodotScenePaths): int;
  change_scene_to_file(path: string): int;
}
