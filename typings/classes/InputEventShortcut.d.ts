// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a triggered keyboard {@link Shortcut}. */
declare class InputEventShortcut extends InputEvent {
  /**
   * The {@link Shortcut} represented by this event. Its {@link Shortcut.matches_event} method will always return `true` for this event.
   */
  shortcut: Shortcut | null;
  set_shortcut(value: Shortcut | null): void;
  get_shortcut(): Shortcut | null;
}
