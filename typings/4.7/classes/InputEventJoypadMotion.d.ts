// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents axis motions (such as joystick or analog triggers) from a gamepad. */
declare class InputEventJoypadMotion extends InputEvent {
  /** Axis identifier. */
  axis: int;
  /**
   * Current position of the joystick on the given axis. The value ranges from `-1.0` to `1.0`. A value of `0` means the axis is in its resting position.
   */
  axis_value: float;
  set_axis(value: int): void;
  get_axis(): int;
  set_axis_value(value: float): void;
  get_axis_value(): float;
}
