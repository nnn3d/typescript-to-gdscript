// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base input event type for mouse events. */
declare class InputEventMouse extends InputEventWithModifiers {
  /**
   * The mouse button mask identifier, one of or a bitwise combination of the {@link MouseButton} button masks.
   */
  button_mask: int;
  /**
   * When received in {@link Node._input} or {@link Node._unhandled_input}, returns the mouse's position in the root {@link Viewport} using the coordinate system of the root {@link Viewport}.
   * When received in {@link Control._gui_input}, returns the mouse's position in the {@link CanvasLayer} that the {@link Control} is in using the coordinate system of the {@link CanvasLayer}.
   */
  global_position: Vector2;
  /**
   * When received in {@link Node._input} or {@link Node._unhandled_input}, returns the mouse's position in the {@link Viewport} this {@link Node} is in using the coordinate system of this {@link Viewport}.
   * When received in {@link Control._gui_input}, returns the mouse's position in the {@link Control} using the local coordinate system of the {@link Control}.
   */
  position: Vector2;
  set_button_mask(value: int): void;
  get_button_mask(): int;
  set_global_position(value: Vector2 | Vector2i): void;
  get_global_position(): Vector2;
  set_position(value: Vector2 | Vector2i): void;
  get_position(): Vector2;
}
