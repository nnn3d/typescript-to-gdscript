/**
 * Override: SceneTree — typed call_group and call_group_flags.
 */
declare class SceneTree {
  /** Calls `method` on each node in the given `group`. */
  call_group(group: string, method: string, ...args: any[]): void;
  /** Calls `method` on each node in the given `group`, using `flags` to customize behavior. */
  call_group_flags(flags: int, group: string, method: string, ...args: any[]): void;
}
