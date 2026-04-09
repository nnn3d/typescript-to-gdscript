// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for input events affected by modifier keys like `Shift` and `Alt`. */
declare class InputEventWithModifiers extends InputEventFromWindow {
  /** State of the `Alt` modifier. */
  alt_pressed: boolean;
  /**
   * Automatically use `Meta` (`Cmd`) on macOS and `Ctrl` on other platforms. If `true`, {@link ctrl_pressed} and {@link meta_pressed} cannot be set.
   */
  command_or_control_autoremap: boolean;
  /** State of the `Ctrl` modifier. */
  ctrl_pressed: boolean;
  /**
   * <member name="meta_pressed" type="bool" setter="set_meta_pressed" getter="is_meta_pressed" default="false">
   * State of the `Meta` modifier. On Windows and Linux, this represents the Windows key (sometimes called "meta" or "super" on Linux). On macOS, this represents the Command key.
   */
  device: int;
  /** State of the `Shift` modifier. */
  shift_pressed: boolean;
  set_alt_pressed(value: boolean): void;
  is_alt_pressed(): boolean;
  set_command_or_control_autoremap(value: boolean): void;
  is_command_or_control_autoremap(): boolean;
  set_ctrl_pressed(value: boolean): void;
  is_ctrl_pressed(): boolean;
  set_shift_pressed(value: boolean): void;
  is_shift_pressed(): boolean;

  /** Returns the keycode combination of modifier keys. */
  get_modifiers_mask(): int;
  /**
   * On macOS, returns `true` if `Meta` (`Cmd`) is pressed.
   * On other platforms, returns `true` if `Ctrl` is pressed.
   */
  is_command_or_control_pressed(): boolean;
}
