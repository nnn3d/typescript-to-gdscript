// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A unit of execution in a process. */
declare class Thread extends RefCounted {
  /**
   * Returns the current {@link Thread}'s ID, uniquely identifying it among all threads. If the {@link Thread} has not started running or if {@link wait_to_finish} has been called, this returns an empty string.
   */
  get_id(): string;
  /**
   * Returns `true` if this {@link Thread} is currently running the provided function. This is useful for determining if {@link wait_to_finish} can be called without blocking the calling thread.
   * To check if a {@link Thread} is joinable, use {@link is_started}.
   */
  is_alive(): boolean;
  /**
   * Returns `true` if the thread this method was called from is the main thread.
   * **Note:** This is a static method and isn't associated with a specific {@link Thread} object.
   */
  static is_main_thread(): boolean;
  /**
   * Returns `true` if this {@link Thread} has been started. Once started, this will return `true` until it is joined using {@link wait_to_finish}. For checking if a {@link Thread} is still executing its task, use {@link is_alive}.
   */
  is_started(): boolean;
  /**
   * Sets whether the thread safety checks the engine normally performs in methods of certain classes (e.g., {@link Node}) should happen **on the current thread**.
   * The default, for every thread, is that they are enabled (as if called with `enabled` being `true`).
   * Those checks are conservative. That means that they will only succeed in considering a call thread-safe (and therefore allow it to happen) if the engine can guarantee such safety.
   * Because of that, there may be cases where the user may want to disable them (`enabled` being `false`) to make certain operations allowed again. By doing so, it becomes the user's responsibility to ensure thread safety (e.g., by using {@link Mutex}) for those objects that are otherwise protected by the engine.
   * **Note:** This is an advanced usage of the engine. You are advised to use it only if you know what you are doing and there is no safer way.
   * **Note:** This is useful for scripts running on either arbitrary {@link Thread} objects or tasks submitted to the {@link WorkerThreadPool}. It doesn't apply to code running during {@link Node} group processing, where the checks will be always performed.
   * **Note:** Even in the case of having disabled the checks in a {@link WorkerThreadPool} task, there's no need to re-enable them at the end. The engine will do so.
   */
  static set_thread_safety_checks_enabled(enabled: boolean): void;
  /**
   * Starts a new {@link Thread} that calls `callable`.
   * If the method takes some arguments, you can pass them using {@link Callable.bind}.
   * The `priority` of the {@link Thread} can be changed by passing a value from the {@link Priority} enum.
   * Returns {@link OK} on success, or {@link ERR_CANT_CREATE} on failure.
   */
  start(callable: Callable, priority: int): int;
  /**
   * Joins the {@link Thread} and waits for it to finish. Returns the output of the {@link Callable} passed to {@link start}.
   * Should either be used when you want to retrieve the value returned from the method called by the {@link Thread} or before freeing the instance that contains the {@link Thread}.
   * To determine if this can be called without blocking the calling thread, check if {@link is_alive} is `false`.
   */
  wait_to_finish(): unknown;

  // enum Priority
  /** A thread running with lower priority than normally. */
  static readonly PRIORITY_LOW: int;
  /** A thread with a standard priority. */
  static readonly PRIORITY_NORMAL: int;
  /** A thread running with higher priority than normally. */
  static readonly PRIORITY_HIGH: int;
}
