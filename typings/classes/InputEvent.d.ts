// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for input events. */
declare class InputEvent extends Resource {
  /**
   * The event's device ID.
   * **Note:** {@link device} can be negative for special use cases that don't refer to devices physically present on the system. See {@link DEVICE_ID_EMULATION}.
   */
  device: int;
  set_device(value: int): void;
  get_device(): int;

  /**
   * Returns `true` if the given input event and this input event can be added together (only for events of type {@link InputEventMouseMotion}).
   * The given input event's position, global position and speed will be copied. The resulting `relative` is a sum of both events. Both events' modifiers have to be identical.
   */
  accumulate(with_event: InputEvent): boolean;
  /** Returns a {@link String} representation of the event. */
  as_text(): string;
  /**
   * Returns a value between 0.0 and 1.0 depending on the given actions' state. Useful for getting the value of events of type {@link InputEventJoypadMotion}.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  get_action_strength(action: string, exact_match?: boolean): float;
  /**
   * Returns `true` if this input event matches a pre-defined action of any type.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  is_action(action: string, exact_match?: boolean): boolean;
  /**
   * Returns `true` if the given action matches this event and is being pressed (and is not an echo event for {@link InputEventKey} events, unless `allow_echo` is `true`). Not relevant for events of type {@link InputEventMouseMotion} or {@link InputEventScreenDrag}.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** Due to keyboard ghosting, {@link is_action_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_action_pressed(action: string, allow_echo?: boolean, exact_match?: boolean): boolean;
  /**
   * Returns `true` if the given action matches this event and is released (i.e. not pressed). Not relevant for events of type {@link InputEventMouseMotion} or {@link InputEventScreenDrag}.
   * If `exact_match` is `false`, it ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   */
  is_action_released(action: string, exact_match?: boolean): boolean;
  /**
   * Returns `true` if this input event's type is one that can be assigned to an input action: {@link InputEventKey}, {@link InputEventMouseButton}, {@link InputEventJoypadButton}, {@link InputEventJoypadMotion}, {@link InputEventAction}. Returns `false` for all other input event types.
   */
  is_action_type(): boolean;
  /** Returns `true` if this input event has been canceled. */
  is_canceled(): boolean;
  /**
   * Returns `true` if this input event is an echo event (only for events of type {@link InputEventKey}). An echo event is a repeated key event sent when the user is holding down the key. Any other event type returns `false`.
   * **Note:** The rate at which echo events are sent is typically around 20 events per second (after holding down the key for roughly half a second). However, the key repeat delay/speed can be changed by the user or disabled entirely in the operating system settings. To ensure your project works correctly on all configurations, do not assume the user has a specific key repeat configuration in your project's behavior.
   */
  is_echo(): boolean;
  /**
   * Returns `true` if the specified `event` matches this event. Only valid for action events, which include key ({@link InputEventKey}), button ({@link InputEventMouseButton} or {@link InputEventJoypadButton}), axis {@link InputEventJoypadMotion}, and action ({@link InputEventAction}) events.
   * If `exact_match` is `false`, the check ignores additional input modifiers for {@link InputEventKey} and {@link InputEventMouseButton} events, and the direction for {@link InputEventJoypadMotion} events.
   * **Note:** This method only considers the event configuration (such as the keyboard key or the joypad axis), not state information like {@link is_pressed}, {@link is_released}, {@link is_echo}, or {@link is_canceled}.
   */
  is_match(event: InputEvent, exact_match?: boolean): boolean;
  /**
   * Returns `true` if this input event is pressed. Not relevant for events of type {@link InputEventMouseMotion} or {@link InputEventScreenDrag}.
   * **Note:** Due to keyboard ghosting, {@link is_pressed} may return `false` even if one of the action's keys is pressed. See Input examples ($DOCS_URL/tutorials/inputs/input_examples.html#keyboard-events) in the documentation for more information.
   */
  is_pressed(): boolean;
  /**
   * Returns `true` if this input event is released. Not relevant for events of type {@link InputEventMouseMotion} or {@link InputEventScreenDrag}.
   */
  is_released(): boolean;
  /**
   * Returns a copy of the given input event which has been offset by `local_ofs` and transformed by `xform`. Relevant for events of type {@link InputEventMouseButton}, {@link InputEventMouseMotion}, {@link InputEventScreenTouch}, {@link InputEventScreenDrag}, {@link InputEventMagnifyGesture} and {@link InputEventPanGesture}.
   */
  xformed_by(xform: Transform2D, local_ofs?: Vector2 | Vector2i): InputEvent;

  /**
   * Device ID used for emulated mouse input from a touchscreen, or for emulated touch input from a mouse. This can be used to distinguish emulated mouse input from physical mouse input, or emulated touch input from physical touch input.
   */
  static readonly DEVICE_ID_EMULATION: int;
}
