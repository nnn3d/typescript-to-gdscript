// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A singleton that allocates some {@link Thread}s on startup, used to offload tasks to these threads. */
declare interface WorkerThreadPool extends GodotObject {
  /**
   * Adds `action` as a group task to be executed by the worker threads. The {@link Callable} will be called a number of times based on `elements`, with the first thread calling it with the value `0` as a parameter, and each consecutive execution incrementing this value by 1 until it reaches `element - 1`.
   * The number of threads the task is distributed to is defined by `tasks_needed`, where the default value `-1` means it is distributed to all worker threads. `high_priority` determines if the task has a high priority or a low priority (default). You can optionally provide a `description` to help with debugging.
   * Returns a group task ID that can be used by other methods.
   * **Warning:** Every task must be waited for completion using {@link wait_for_task_completion} or {@link wait_for_group_task_completion} at some point so that any allocated resources inside the task can be cleaned up.
   */
  add_group_task(action: Callable, elements: int, tasks_needed?: int, high_priority?: boolean, description?: string): int;
  /**
   * Adds `action` as a task to be executed by a worker thread. `high_priority` determines if the task has a high priority or a low priority (default). You can optionally provide a `description` to help with debugging.
   * Returns a task ID that can be used by other methods.
   * **Warning:** Every task must be waited for completion using {@link wait_for_task_completion} or {@link wait_for_group_task_completion} at some point so that any allocated resources inside the task can be cleaned up.
   */
  add_task(action: Callable, high_priority?: boolean, description?: string): int;
  /**
   * Returns the task group ID of the current thread calling this method, or `-1` if invalid or the current thread is not part of a task group.
   */
  get_caller_group_id(): int;
  /**
   * Returns the task ID of the current thread calling this method, or `-1` if the task is a group task, invalid or the current thread is not part of the thread pool (e.g. the main thread).
   * Can be used by a task to get its own task ID, or to determine whether the current code is running inside the worker thread pool.
   * **Note:** Group tasks have their own IDs, so this method will return `-1` for group tasks.
   */
  get_caller_task_id(): int;
  /**
   * Returns how many times the {@link Callable} of the group task with the given ID has already been executed by the worker threads.
   * **Note:** If a thread has started executing the {@link Callable} but is yet to finish, it won't be counted.
   */
  get_group_processed_element_count(group_id: int): int;
  /**
   * Returns `true` if the group task with the given ID is completed.
   * **Note:** You should only call this method between adding the group task and awaiting its completion.
   */
  is_group_task_completed(group_id: int): boolean;
  /**
   * Returns `true` if the task with the given ID is completed.
   * **Note:** You should only call this method between adding the task and awaiting its completion.
   */
  is_task_completed(task_id: int): boolean;
  /** Pauses the thread that calls this method until the group task with the given ID is completed. */
  wait_for_group_task_completion(group_id: int): void;
  /**
   * Pauses the thread that calls this method until the task with the given ID is completed.
   * Returns {@link @GlobalScope.OK} if the task could be successfully awaited.
   * Returns {@link @GlobalScope.ERR_INVALID_PARAMETER} if a task with the passed ID does not exist (maybe because it was already awaited and disposed of).
   * Returns {@link @GlobalScope.ERR_BUSY} if the call is made from another running task and, due to task scheduling, there's potential for deadlocking (e.g., the task to await may be at a lower level in the call stack and therefore can't progress). This is an advanced situation that should only matter when some tasks depend on others (in the current implementation, the tricky case is a task trying to wait on an older one).
   */
  wait_for_task_completion(task_id: int): int;
}
declare const WorkerThreadPool: WorkerThreadPool;

