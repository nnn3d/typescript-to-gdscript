// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a gamepad button being pressed or released. */
declare class InputEventJoypadButton extends InputEvent {
  /** Button identifier. One of the {@link JoyButton} button constants. */
  button_index: int;
  /** If `true`, the button's state is pressed. If `false`, the button's state is released. */
  pressed: boolean;
  pressure: float;
}
