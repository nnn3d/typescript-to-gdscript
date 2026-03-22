// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A shortcut for binding input. */
declare class Shortcut extends Resource {
  /**
   * The shortcut's {@link InputEvent} array.
   * Generally the {@link InputEvent} used is an {@link InputEventKey}, though it can be any {@link InputEvent}, including an {@link InputEventAction}.
   */
  events: Array<unknown>;
  set_events(value: Array<unknown>): void;
  get_events(): Array<unknown>;

  /** Returns the shortcut's first valid {@link InputEvent} as a {@link String}. */
  get_as_text(): string;
  /** Returns whether {@link events} contains an {@link InputEvent} which is valid. */
  has_valid_event(): boolean;
  /**
   * Returns whether any {@link InputEvent} in {@link events} equals `event`. This uses {@link InputEvent.is_match} to compare events.
   */
  matches_event(event: InputEvent): boolean;
}
