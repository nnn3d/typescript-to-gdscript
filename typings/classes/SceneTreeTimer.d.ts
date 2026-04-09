// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** One-shot timer. */
declare class SceneTreeTimer extends RefCounted {
  /** The time remaining (in seconds). */
  time_left: float;
  set_time_left(value: float): void;
  get_time_left(): float;

  /** Emitted when the timer reaches 0. */
  timeout: Signal<[]>;
}
