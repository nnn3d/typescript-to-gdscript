// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A binary {@link Semaphore} for synchronization of multiple {@link Thread}s. */
declare class Mutex extends RefCounted {
  /**
   * Locks this {@link Mutex}, blocks until it is unlocked by the current owner.
   * **Note:** This function returns without blocking if the thread already has ownership of the mutex.
   */
  lock(): void;
  /**
   * Tries locking this {@link Mutex}, but does not block. Returns `true` on success, `false` otherwise.
   * **Note:** This function returns `true` if the thread already has ownership of the mutex.
   */
  try_lock(): boolean;
  /**
   * Unlocks this {@link Mutex}, leaving it to other threads.
   * **Note:** If a thread called {@link lock} or {@link try_lock} multiple times while already having ownership of the mutex, it must also call {@link unlock} the same number of times in order to unlock it correctly.
   * **Warning:** Calling {@link unlock} more times than {@link lock} on a given thread, thus ending up trying to unlock a non-locked mutex, is wrong and may causes crashes or deadlocks.
   */
  unlock(): void;
}
