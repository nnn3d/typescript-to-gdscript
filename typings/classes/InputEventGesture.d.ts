// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for touch gestures. */
declare class InputEventGesture extends InputEventWithModifiers {
  /**
   * The local gesture position relative to the {@link Viewport}. If used in {@link Control._gui_input}, the position is relative to the current {@link Control} that received this gesture.
   */
  position: Vector2;
  set_position(value: Vector2 | Vector2i): void;
  get_position(): Vector2;
}
