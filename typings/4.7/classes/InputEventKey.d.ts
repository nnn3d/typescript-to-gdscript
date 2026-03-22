// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a key on a keyboard being pressed or released. */
declare class InputEventKey extends InputEventWithModifiers {
  /**
   * If `true`, the key was already pressed before this event. An echo event is a repeated key event sent when the user is holding down the key.
   * **Note:** The rate at which echo events are sent is typically around 20 events per second (after holding down the key for roughly half a second). However, the key repeat delay/speed can be changed by the user or disabled entirely in the operating system settings. To ensure your project works correctly on all configurations, do not assume the user has a specific key repeat configuration in your project's behavior.
   */
  echo: boolean;
  /**
   * Represents the localized label printed on the key in the current keyboard layout, which corresponds to one of the {@link Key} constants or any valid Unicode character. Key labels are meant for key prompts.
   * For keyboard layouts with a single label on the key, it is equivalent to {@link keycode}.
   * To get a human-readable representation of the {@link InputEventKey}, use `OS.get_keycode_string(event.key_label)` where `event` is the {@link InputEventKey}.
   * [codeblock lang=text]
   * +-----+ +-----+
   * | Q   | | Q   | - "Q" - keycode
   * |   Й | |  ض | - "Й" and "ض" - key_label
   * +-----+ +-----+
   * [/codeblock]
   */
  key_label: int;
  /**
   * Latin label printed on the key in the current keyboard layout, which corresponds to one of the {@link Key} constants. Key codes are meant for shortcuts expressed with a standard Latin keyboard, such as `Ctrl + S` for a "Save" shortcut.
   * To get a human-readable representation of the {@link InputEventKey}, use `OS.get_keycode_string(event.keycode)` where `event` is the {@link InputEventKey}.
   * [codeblock lang=text]
   * +-----+ +-----+
   * | Q   | | Q   | - "Q" - keycode
   * |   Й | |  ض | - "Й" and "ض" - key_label
   * +-----+ +-----+
   * [/codeblock]
   */
  keycode: int;
  /** Represents the location of a key which has both left and right versions, such as `Shift` or `Alt`. */
  location: int;
  /**
   * Represents the physical location of a key on the 101/102-key US QWERTY keyboard, which corresponds to one of the {@link Key} constants. Physical key codes meant for game input, such as WASD movement, where only the location of the keys is important.
   * To get a human-readable representation of the {@link InputEventKey}, use {@link OS.get_keycode_string} in combination with {@link DisplayServer.keyboard_get_keycode_from_physical} or {@link DisplayServer.keyboard_get_label_from_physical}:
   */
  physical_keycode: int;
  /** If `true`, the key's state is pressed. If `false`, the key's state is released. */
  pressed: boolean;
  /**
   * The key Unicode character code (when relevant), shifted by modifier keys. Unicode character codes for composite characters and complex scripts may not be available unless IME input mode is active. See {@link Window.set_ime_active} for more information. Unicode character codes are meant for text input.
   * **Note:** This property is set by the engine only for a pressed event. If the event is sent by an IME or a virtual keyboard, no corresponding key released event is sent.
   */
  unicode: int;
  set_echo(value: boolean): void;
  set_key_label(value: int): void;
  get_key_label(): int;
  set_keycode(value: int): void;
  get_keycode(): int;
  set_location(value: int): void;
  get_location(): int;
  set_physical_keycode(value: int): void;
  get_physical_keycode(): int;
  set_pressed(value: boolean): void;
  set_unicode(value: int): void;
  get_unicode(): int;

  /** Returns a {@link String} representation of the event's {@link key_label} and modifiers. */
  as_text_key_label(): string;
  /** Returns a {@link String} representation of the event's {@link keycode} and modifiers. */
  as_text_keycode(): string;
  /**
   * Returns a {@link String} representation of the event's {@link location}. This will be a blank string if the event is not specific to a location.
   */
  as_text_location(): string;
  /** Returns a {@link String} representation of the event's {@link physical_keycode} and modifiers. */
  as_text_physical_keycode(): string;
  /**
   * Returns the localized key label combined with modifier keys such as `Shift` or `Alt`. See also {@link InputEventWithModifiers}.
   * To get a human-readable representation of the {@link InputEventKey} with modifiers, use `OS.get_keycode_string(event.get_key_label_with_modifiers())` where `event` is the {@link InputEventKey}.
   */
  get_key_label_with_modifiers(): int;
  /**
   * Returns the Latin keycode combined with modifier keys such as `Shift` or `Alt`. See also {@link InputEventWithModifiers}.
   * To get a human-readable representation of the {@link InputEventKey} with modifiers, use `OS.get_keycode_string(event.get_keycode_with_modifiers())` where `event` is the {@link InputEventKey}.
   */
  get_keycode_with_modifiers(): int;
  /**
   * Returns the physical keycode combined with modifier keys such as `Shift` or `Alt`. See also {@link InputEventWithModifiers}.
   * To get a human-readable representation of the {@link InputEventKey} with modifiers, use `OS.get_keycode_string(event.get_physical_keycode_with_modifiers())` where `event` is the {@link InputEventKey}.
   */
  get_physical_keycode_with_modifiers(): int;
}
