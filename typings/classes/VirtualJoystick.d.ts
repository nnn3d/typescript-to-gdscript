// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A virtual joystick control for touchscreen devices. */
declare class VirtualJoystick extends Control {
  /** The action to trigger when the joystick is moved down. */
  action_down: string;
  /** The action to trigger when the joystick is moved left. */
  action_left: string;
  /** The action to trigger when the joystick is moved right. */
  action_right: string;
  /** The action to trigger when the joystick is moved up. */
  action_up: string;
  /**
   * The multiplier applied to the joystick's radius that defines the clamp zone.
   * This zone limits how far the joystick tip can move from its center before being clamped.
   * A value of `1.0` means the tip can move up to the edge of the joystick's visual size.
   * In {@link JOYSTICK_FOLLOWING} mode, this radius also determines how far the finger can move before the joystick base starts following the touch input.
   */
  clampzone_ratio: float;
  /**
   * The ratio of the joystick size that defines the joystick deadzone. The joystick tip must move beyond this ratio before being considered active.
   * This deadzone is applied before triggering input actions and affects the joystick's input vector and all related signals.
   * Note that input actions may also define their own deadzones in the InputMap. If both are set, the joystick deadzone is applied first, followed by the action's deadzone.
   * By default, this value is `0.0`, meaning the joystick does not apply its own deadzone and relies entirely on the InputMap action deadzones.
   */
  deadzone_ratio: float;
  /**
   * The initial position of the joystick as a ratio of the control's size. `(0, 0)` is top-left and `(1, 1)` is bottom-right.
   */
  initial_offset_ratio: Vector2;
  /** The joystick mode to use. */
  joystick_mode: int;
  /** The size of the joystick in pixels. */
  joystick_size: float;
  /** The size of the joystick tip in pixels. */
  tip_size: float;
  /** The visibility mode to use. */
  visibility_mode: int;
  set_action_down(value: string): void;
  get_action_down(): string;
  set_action_left(value: string): void;
  get_action_left(): string;
  set_action_right(value: string): void;
  get_action_right(): string;
  set_action_up(value: string): void;
  get_action_up(): string;
  set_clampzone_ratio(value: float): void;
  get_clampzone_ratio(): float;
  set_deadzone_ratio(value: float): void;
  get_deadzone_ratio(): float;
  set_initial_offset_ratio(value: Vector2 | Vector2i): void;
  get_initial_offset_ratio(): Vector2;
  set_joystick_mode(value: int): void;
  get_joystick_mode(): int;
  set_joystick_size(value: float): void;
  get_joystick_size(): float;
  set_tip_size(value: float): void;
  get_tip_size(): float;
  set_visibility_mode(value: int): void;
  get_visibility_mode(): int;

  /** Emitted when the tip enters the deadzone after being outside of it. */
  flick_canceled: Signal<[]>;
  /**
   * Emitted when the tip moved outside the deadzone and the joystick is released. The `input_vector` contains the last input direction and strength before release. Its length is between `0.0` and `1.0`.
   */
  flicked: Signal<[Vector2]>;
  /** Emitted when the joystick is pressed. */
  pressed: Signal<[]>;
  /**
   * Emitted when the joystick is released. The `input_vector` is the final input direction and strength, with a length between `0.0` and `1.0`.
   */
  released: Signal<[Vector2]>;
  /** Emitted when the joystick is released without moving the tip. */
  tapped: Signal<[]>;

  // enum JoystickMode
  /** The joystick doesn't move. */
  static readonly JOYSTICK_FIXED: int;
  /**
   * The joystick is moved to the initial touch position as long as it's within the joystick's bounds. It moves back to its original position when released.
   */
  static readonly JOYSTICK_DYNAMIC: int;
  /**
   * The joystick is moved to the initial touch position as long as it's within the joystick's bounds. It will follow the touch input if it goes outside the joystick's range. It moves back to its original position when released.
   */
  static readonly JOYSTICK_FOLLOWING: int;
  // enum VisibilityMode
  /** The joystick is always visible. */
  static readonly VISIBILITY_ALWAYS: int;
  /** The joystick is only visible when being touched. */
  static readonly VISIBILITY_WHEN_TOUCHED: int;
}
