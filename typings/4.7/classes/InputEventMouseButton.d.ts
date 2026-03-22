// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a mouse button being pressed or released. */
declare class InputEventMouseButton extends InputEventMouse {
  /** The mouse button identifier, one of the {@link MouseButton} button or button wheel constants. */
  button_index: int;
  /** If `true`, the mouse button event has been canceled. */
  canceled: boolean;
  /** If `true`, the mouse button's state is a double-click. */
  double_click: boolean;
  /**
   * The amount (or delta) of the event. When used for high-precision scroll events, this indicates the scroll amount (vertical or horizontal). This is only supported on some platforms; the reported sensitivity varies depending on the platform. May be `0` if not supported.
   */
  factor: float;
  /** If `true`, the mouse button's state is pressed. If `false`, the mouse button's state is released. */
  pressed: boolean;
  set_button_index(value: int): void;
  get_button_index(): int;
  set_canceled(value: boolean): void;
  set_double_click(value: boolean): void;
  is_double_click(): boolean;
  set_factor(value: float): void;
  get_factor(): float;
  set_pressed(value: boolean): void;
}
