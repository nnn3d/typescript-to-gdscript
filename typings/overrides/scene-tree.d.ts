/**
 * Override: SceneTree — typed call_group, call_group_flags, and change_scene_to_file.
 */
declare class SceneTree {
  /** Calls `method` on each node in the given `group`. */
  call_group(group: string, method: string, ...args: any[]): void;
  /** Calls `method` on each node in the given `group`, using `flags` to customize behavior. */
  call_group_flags(
    flags: int,
    group: string,
    method: string,
    ...args: any[]
  ): void;
  /** Changes the running scene to the one at the given path. Accepts known scene paths from GodotResources. */
  change_scene_to_file(path: GodotScenePaths): int;
  change_scene_to_file(path: string): int;
}
