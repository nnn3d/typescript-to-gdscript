// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides access to an embedded Godot instance. */
declare class GodotInstance extends GodotObject {
  /** Notifies the instance that it is now in focus. */
  focus_in(): void;
  /** Notifies the instance that it is now not in focus. */
  focus_out(): void;
  /** Returns `true` if this instance has been fully started. */
  is_started(): boolean;
  /** Runs a single iteration of the main loop. Returns `true` if the engine is attempting to quit. */
  iteration(): boolean;
  /** Notifies the instance that it is going to be paused. */
  pause(): void;
  /** Notifies the instance that it is being resumed. */
  resume(): void;
  /** Finishes this instance's startup sequence. Returns `true` on success. */
  start(): boolean;
}
