// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 3D node representing a spatially-tracked controller. */
declare class XRController3D extends XRNode3D {
  /**
   * Returns a numeric value for the input with the given `name`. This is used for triggers and grip sensors.
   * **Note:** The current {@link XRInterface} defines the `name` for each input. In the case of OpenXR, these are the names of actions in the current action set.
   */
  get_float(name: string): float;
  /**
   * Returns a {@link Variant} for the input with the given `name`. This works for any input type, the variant will be typed according to the actions configuration.
   * **Note:** The current {@link XRInterface} defines the `name` for each input. In the case of OpenXR, these are the names of actions in the current action set.
   */
  get_input(name: string): unknown;
  /** Returns the hand holding this controller, if known. */
  get_tracker_hand(): int;
  /**
   * Returns a {@link Vector2} for the input with the given `name`. This is used for thumbsticks and thumbpads found on many controllers.
   * **Note:** The current {@link XRInterface} defines the `name` for each input. In the case of OpenXR, these are the names of actions in the current action set.
   */
  get_vector2(name: string): Vector2;
  /**
   * Returns `true` if the button with the given `name` is pressed.
   * **Note:** The current {@link XRInterface} defines the `name` for each input. In the case of OpenXR, these are the names of actions in the current action set.
   */
  is_button_pressed(name: string): boolean;

  /** Emitted when a button on this controller is pressed. */
  button_pressed: Signal<[string]>;
  /** Emitted when a button on this controller is released. */
  button_released: Signal<[string]>;
  /** Emitted when a trigger or similar input on this controller changes value. */
  input_float_changed: Signal<[string, float]>;
  /** Emitted when a thumbstick or thumbpad on this controller is moved. */
  input_vector2_changed: Signal<[string, Vector2]>;
  /** Emitted when the interaction profile on this controller is changed. */
  profile_changed: Signal<[string]>;
}
