// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A synchronization mechanism used to control access to a shared resource by {@link Thread}s. */
declare class Semaphore extends RefCounted {
  /** Lowers the {@link Semaphore}, allowing one thread in, or more if `count` is specified. */
  post(count?: int): void;
  /**
   * Like {@link wait}, but won't block, so if the value is zero, fails immediately and returns `false`. If non-zero, it returns `true` to report success.
   */
  try_wait(): boolean;
  /** Waits for the {@link Semaphore}, if its value is zero, blocks until non-zero. */
  wait(): void;
}
