// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An input field for single-line text. */
declare class LineEdit extends Control {
  /** The text's horizontal alignment. */
  alignment: int;
  /**
   * If `true` and {@link caret_mid_grapheme} is `false`, backspace deletes an entire composite character such as ❤️‍🩹, instead of deleting part of the composite character.
   */
  backspace_deletes_composite_character_enabled: boolean;
  /** If `true`, makes the caret blink. */
  caret_blink: boolean;
  /** The interval at which the caret blinks (in seconds). */
  caret_blink_interval: float;
  /**
   * The caret's column position inside the {@link LineEdit}. When set, the text may scroll to accommodate it.
   */
  caret_column: int;
  /** If `true`, the {@link LineEdit} will always show the caret, even if not editing or focus is lost. */
  caret_force_displayed: boolean;
  /**
   * Allow moving caret, selecting and removing the individual composite character components.
   * **Note:** `Backspace` is always removing individual composite character components.
   */
  caret_mid_grapheme: boolean;
  /**
   * If `true`, the {@link LineEdit} will show a clear button if {@link text} is not empty, which can be used to clear the text quickly.
   */
  clear_button_enabled: boolean;
  /** If `true`, the context menu will appear when right-clicked. */
  context_menu_enabled: boolean;
  /** If `true`, the selected text will be deselected when focus is lost. */
  deselect_on_focus_loss_enabled: boolean;
  /** If `true`, allow drag and drop of selected text. */
  drag_and_drop_selection_enabled: boolean;
  /** If `true`, control characters are displayed. */
  draw_control_chars: boolean;
  /** If `false`, existing text cannot be modified and new text cannot be added. */
  editable: boolean;
  /** If `true`, "Emoji and Symbols" menu is enabled. */
  emoji_menu_enabled: boolean;
  /**
   * If `true`, the {@link LineEdit} width will increase to stay longer than the {@link text}. It will **not** compress if the {@link text} is shortened.
   */
  expand_to_text_length: boolean;
  /** If `true`, the {@link LineEdit} doesn't display decoration. */
  flat: boolean;
  /**
   * <member name="icon_expand_mode" type="int" setter="set_icon_expand_mode" getter="get_icon_expand_mode" enum="LineEdit.ExpandMode" default="0">
   * Define the scaling behavior of the {@link right_icon}.
   */
  focus_mode: int;
  /**
   * If `true`, the {@link LineEdit} will not exit edit mode when text is submitted by pressing `ui_text_submit` action (by default: `Enter` or `Kp Enter`).
   */
  keep_editing_on_text_submit: boolean;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /**
   * Maximum number of characters that can be entered inside the {@link LineEdit}. If `0`, there is no limit.
   * When a limit is defined, characters that would exceed {@link max_length} are truncated. This happens both for existing {@link text} contents when setting the max length, or for new text inserted in the {@link LineEdit}, including pasting.
   * If any input text is truncated, the {@link text_change_rejected} signal is emitted with the truncated substring as a parameter:
   */
  max_length: int;
  /**
   * If `false`, using middle mouse button to paste clipboard will be disabled.
   * **Note:** This method is only implemented on Linux.
   */
  middle_mouse_paste_enabled: boolean;
  /**
   * <member name="placeholder_text" type="String" setter="set_placeholder" getter="get_placeholder" default="&quot;&quot;">
   * Text shown when the {@link LineEdit} is empty. It is **not** the {@link LineEdit}'s default value (see {@link text}).
   */
  mouse_default_cursor_shape: int;
  /**
   * Sets the icon that will appear in the right end of the {@link LineEdit} if there's no {@link text}, or always, if {@link clear_button_enabled} is set to `false`.
   */
  right_icon: Texture2D | null;
  /**
   * Scale ratio of the icon when {@link icon_expand_mode} is set to {@link EXPAND_MODE_FIT_TO_LINE_EDIT}.
   */
  right_icon_scale: float;
  /** If `true`, every character is replaced with the secret character (see {@link secret_character}). */
  secret: boolean;
  /**
   * The character to use to mask secret input. Only a single character can be used as the secret character. If it is longer than one character, only the first one will be used. If it is empty, a space will be used instead.
   */
  secret_character: string;
  /** If `true`, the {@link LineEdit} will select the whole text when it gains focus. */
  select_all_on_focus: boolean;
  /** If `false`, it's impossible to select the text using mouse nor keyboard. */
  selecting_enabled: boolean;
  /** If `true`, shortcut keys for context menu items are enabled, even if the context menu is disabled. */
  shortcut_keys_enabled: boolean;
  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /**
   * String value of the {@link LineEdit}.
   * **Note:** Changing text using this property won't emit the {@link text_changed} signal.
   */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** If `true`, the native virtual keyboard is enabled on platforms that support it. */
  virtual_keyboard_enabled: boolean;
  /** If `true`, the native virtual keyboard is shown on focus events on platforms that support it. */
  virtual_keyboard_show_on_focus: boolean;
  /** Specifies the type of virtual keyboard to show. */
  virtual_keyboard_type: int;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_backspace_deletes_composite_character_enabled(value: boolean): void;
  is_backspace_deletes_composite_character_enabled(): boolean;
  set_caret_blink_enabled(value: boolean): void;
  is_caret_blink_enabled(): boolean;
  set_caret_blink_interval(value: float): void;
  get_caret_blink_interval(): float;
  set_caret_column(value: int): void;
  get_caret_column(): int;
  set_caret_force_displayed(value: boolean): void;
  is_caret_force_displayed(): boolean;
  set_caret_mid_grapheme_enabled(value: boolean): void;
  is_caret_mid_grapheme_enabled(): boolean;
  set_clear_button_enabled(value: boolean): void;
  is_clear_button_enabled(): boolean;
  set_context_menu_enabled(value: boolean): void;
  is_context_menu_enabled(): boolean;
  set_deselect_on_focus_loss_enabled(value: boolean): void;
  is_deselect_on_focus_loss_enabled(): boolean;
  set_drag_and_drop_selection_enabled(value: boolean): void;
  is_drag_and_drop_selection_enabled(): boolean;
  set_draw_control_chars(value: boolean): void;
  get_draw_control_chars(): boolean;
  set_editable(value: boolean): void;
  is_editable(): boolean;
  set_emoji_menu_enabled(value: boolean): void;
  is_emoji_menu_enabled(): boolean;
  set_expand_to_text_length_enabled(value: boolean): void;
  is_expand_to_text_length_enabled(): boolean;
  set_flat(value: boolean): void;
  is_flat(): boolean;
  set_keep_editing_on_text_submit(value: boolean): void;
  is_editing_kept_on_text_submit(): boolean;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_max_length(value: int): void;
  get_max_length(): int;
  set_middle_mouse_paste_enabled(value: boolean): void;
  is_middle_mouse_paste_enabled(): boolean;
  set_right_icon(value: Texture2D | null): void;
  get_right_icon(): Texture2D | null;
  set_right_icon_scale(value: float): void;
  get_right_icon_scale(): float;
  set_secret(value: boolean): void;
  is_secret(): boolean;
  set_secret_character(value: string | NodePath): void;
  get_secret_character(): string;
  set_select_all_on_focus(value: boolean): void;
  is_select_all_on_focus(): boolean;
  set_selecting_enabled(value: boolean): void;
  is_selecting_enabled(): boolean;
  set_shortcut_keys_enabled(value: boolean): void;
  is_shortcut_keys_enabled(): boolean;
  set_structured_text_bidi_override(value: int): void;
  get_structured_text_bidi_override(): int;
  set_structured_text_bidi_override_options(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_text(value: string | NodePath): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_virtual_keyboard_enabled(value: boolean): void;
  is_virtual_keyboard_enabled(): boolean;
  set_virtual_keyboard_show_on_focus(value: boolean): void;
  get_virtual_keyboard_show_on_focus(): boolean;
  set_virtual_keyboard_type(value: int): void;
  get_virtual_keyboard_type(): int;

  /**
   * Applies text from the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME) and closes the IME if it is open.
   */
  apply_ime(): void;
  /**
   * Closes the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME) if it is open. Any text in the IME will be lost.
   */
  cancel_ime(): void;
  /** Erases the {@link LineEdit}'s {@link text}. */
  clear(): void;
  /** Deletes one character at the caret's current position (equivalent to pressing `Delete`). */
  delete_char_at_caret(): void;
  /**
   * Deletes a section of the {@link text} going from position `from_column` to `to_column`. Both parameters should be within the text's length.
   */
  delete_text(from_column: int, to_column: int): void;
  /** Clears the current selection. */
  deselect(): void;
  /**
   * Allows entering edit mode whether the {@link LineEdit} is focused or not. If `hide_focus` is `true`, the focused state will not be shown (see {@link Control.grab_focus}).
   * See also {@link keep_editing_on_text_submit}.
   */
  edit(hide_focus?: boolean): void;
  /**
   * Returns the {@link PopupMenu} of this {@link LineEdit}. By default, this menu is displayed when right-clicking on the {@link LineEdit}.
   * You can add custom menu items or remove standard ones. Make sure your IDs don't conflict with the standard ones (see {@link MenuItems}). For example:
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_menu(): PopupMenu;
  /**
   * Returns the correct column at the end of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the start of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   * **Note:** To check at caret location use `get_next_composite_character_column(get_caret_column())`
   */
  get_next_composite_character_column(column: int): int;
  /**
   * Returns the correct column at the start of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the end of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   * **Note:** To check at caret location use `get_previous_composite_character_column(get_caret_column())`
   */
  get_previous_composite_character_column(column: int): int;
  /** Returns the scroll offset due to {@link caret_column}, as a number of characters. */
  get_scroll_offset(): float;
  /** Returns the text inside the selection. */
  get_selected_text(): string;
  /** Returns the selection begin column. */
  get_selection_from_column(): int;
  /** Returns the selection end column. */
  get_selection_to_column(): int;
  /**
   * Returns `true` if the user has text in the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME).
   */
  has_ime_text(): boolean;
  /** Returns `true` if a "redo" action is available. */
  has_redo(): boolean;
  /** Returns `true` if the user has selected text. */
  has_selection(): boolean;
  /** Returns `true` if an "undo" action is available. */
  has_undo(): boolean;
  /**
   * Inserts `text` at the caret. If the resulting value is longer than {@link max_length}, nothing happens.
   */
  insert_text_at_caret(text: string | NodePath): void;
  /** Returns whether the {@link LineEdit} is being edited. */
  is_editing(): boolean;
  /**
   * Returns whether the menu is visible. Use this instead of `get_menu().visible` to improve performance (so the creation of the menu is avoided).
   */
  is_menu_visible(): boolean;
  /** Executes a given action as defined in the {@link MenuItems} enum. */
  menu_option(option: int): void;
  /**
   * Selects characters inside {@link LineEdit} between `from` and `to`. By default, `from` is at the beginning and `to` at the end.
   */
  select(from_?: int, to?: int): void;
  /** Selects the whole {@link String}. */
  select_all(): void;
  /** Allows exiting edit mode while preserving focus. */
  unedit(): void;

  /** Emitted when the {@link LineEdit} switches in or out of edit mode. */
  editing_toggled: Signal<[boolean]>;
  /**
   * Emitted when appending text that overflows the {@link max_length}. The appended text is truncated to fit {@link max_length}, and the part that couldn't fit is passed as the `rejected_substring` argument.
   */
  text_change_rejected: Signal<[string]>;
  /** Emitted when the text changes. */
  text_changed: Signal<[string]>;
  /**
   * Emitted when the user presses the `ui_text_submit` action (by default: `Enter` or `Kp Enter`) while the {@link LineEdit} has focus.
   */
  text_submitted: Signal<[string]>;

  // enum MenuItems
  /** Cuts (copies and clears) the selected text. */
  static readonly MENU_CUT: int;
  /** Copies the selected text. */
  static readonly MENU_COPY: int;
  /**
   * Pastes the clipboard text over the selected text (or at the caret's position).
   * Non-printable escape characters are automatically stripped from the OS clipboard via {@link String.strip_escapes}.
   */
  static readonly MENU_PASTE: int;
  /** Erases the whole {@link LineEdit} text. */
  static readonly MENU_CLEAR: int;
  /** Selects the whole {@link LineEdit} text. */
  static readonly MENU_SELECT_ALL: int;
  /** Undoes the previous action. */
  static readonly MENU_UNDO: int;
  /** Reverse the last undo action. */
  static readonly MENU_REDO: int;
  /** ID of "Text Writing Direction" submenu. */
  static readonly MENU_SUBMENU_TEXT_DIR: int;
  /** Sets text direction to inherited. */
  static readonly MENU_DIR_INHERITED: int;
  /** Sets text direction to automatic. */
  static readonly MENU_DIR_AUTO: int;
  /** Sets text direction to left-to-right. */
  static readonly MENU_DIR_LTR: int;
  /** Sets text direction to right-to-left. */
  static readonly MENU_DIR_RTL: int;
  /** Toggles control character display. */
  static readonly MENU_DISPLAY_UCC: int;
  /** ID of "Insert Control Character" submenu. */
  static readonly MENU_SUBMENU_INSERT_UCC: int;
  /** Inserts left-to-right mark (LRM) character. */
  static readonly MENU_INSERT_LRM: int;
  /** Inserts right-to-left mark (RLM) character. */
  static readonly MENU_INSERT_RLM: int;
  /** Inserts start of left-to-right embedding (LRE) character. */
  static readonly MENU_INSERT_LRE: int;
  /** Inserts start of right-to-left embedding (RLE) character. */
  static readonly MENU_INSERT_RLE: int;
  /** Inserts start of left-to-right override (LRO) character. */
  static readonly MENU_INSERT_LRO: int;
  /** Inserts start of right-to-left override (RLO) character. */
  static readonly MENU_INSERT_RLO: int;
  /** Inserts pop direction formatting (PDF) character. */
  static readonly MENU_INSERT_PDF: int;
  /** Inserts Arabic letter mark (ALM) character. */
  static readonly MENU_INSERT_ALM: int;
  /** Inserts left-to-right isolate (LRI) character. */
  static readonly MENU_INSERT_LRI: int;
  /** Inserts right-to-left isolate (RLI) character. */
  static readonly MENU_INSERT_RLI: int;
  /** Inserts first strong isolate (FSI) character. */
  static readonly MENU_INSERT_FSI: int;
  /** Inserts pop direction isolate (PDI) character. */
  static readonly MENU_INSERT_PDI: int;
  /** Inserts zero width joiner (ZWJ) character. */
  static readonly MENU_INSERT_ZWJ: int;
  /** Inserts zero width non-joiner (ZWNJ) character. */
  static readonly MENU_INSERT_ZWNJ: int;
  /** Inserts word joiner (WJ) character. */
  static readonly MENU_INSERT_WJ: int;
  /** Inserts soft hyphen (SHY) character. */
  static readonly MENU_INSERT_SHY: int;
  /** Opens system emoji and symbol picker. */
  static readonly MENU_EMOJI_AND_SYMBOL: int;
  /** Represents the size of the {@link MenuItems} enum. */
  static readonly MENU_MAX: int;
  // enum VirtualKeyboardType
  /** Default text virtual keyboard. */
  static readonly KEYBOARD_TYPE_DEFAULT: int;
  /** Multiline virtual keyboard. */
  static readonly KEYBOARD_TYPE_MULTILINE: int;
  /** Virtual number keypad, useful for PIN entry. */
  static readonly KEYBOARD_TYPE_NUMBER: int;
  /** Virtual number keypad, useful for entering fractional numbers. */
  static readonly KEYBOARD_TYPE_NUMBER_DECIMAL: int;
  /** Virtual phone number keypad. */
  static readonly KEYBOARD_TYPE_PHONE: int;
  /** Virtual keyboard with additional keys to assist with typing email addresses. */
  static readonly KEYBOARD_TYPE_EMAIL_ADDRESS: int;
  /**
   * Virtual keyboard for entering a password. On most platforms, this should disable autocomplete and autocapitalization.
   * **Note:** This is not supported on Web. Instead, this behaves identically to {@link KEYBOARD_TYPE_DEFAULT}.
   */
  static readonly KEYBOARD_TYPE_PASSWORD: int;
  /** Virtual keyboard with additional keys to assist with typing URLs. */
  static readonly KEYBOARD_TYPE_URL: int;
  // enum ExpandMode
  /** Use the original size for the right icon. */
  static readonly EXPAND_MODE_ORIGINAL_SIZE: int;
  /** Scale the right icon's size to match the size of the text. */
  static readonly EXPAND_MODE_FIT_TO_TEXT: int;
  /** Scale the right icon to fit the LineEdit. */
  static readonly EXPAND_MODE_FIT_TO_LINE_EDIT: int;
}
