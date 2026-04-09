// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A base dialog used for user notification. */
declare class AcceptDialog extends Window {
  /** Sets autowrapping for the text in the dialog. */
  dialog_autowrap: boolean;
  /**
   * If `true`, the dialog will be hidden when the `ui_close_dialog` action is pressed (by default, this action is bound to `Escape`, or `Cmd + W` on macOS).
   */
  dialog_close_on_escape: boolean;
  /**
   * If `true`, the dialog is hidden when the OK button is pressed. You can set it to `false` if you want to do e.g. input validation when receiving the {@link confirmed} signal, and handle hiding the dialog in your own logic.
   * **Note:** Some nodes derived from this class can have a different default value, and potentially their own built-in logic overriding this setting. For example {@link FileDialog} defaults to `false`, and has its own input validation code that is called when you press OK, which eventually hides the dialog if the input is valid. As such, this property can't be used in {@link FileDialog} to disable hiding the dialog when pressing OK.
   */
  dialog_hide_on_ok: boolean;
  /** The text displayed by the dialog. */
  dialog_text: string;
  /**
   * <member name="keep_title_visible" type="bool" setter="set_keep_title_visible" getter="get_keep_title_visible" overrides="Window" default="true" />
   * <member name="maximize_disabled" type="bool" setter="set_flag" getter="get_flag" overrides="Window" default="true" />
   * <member name="minimize_disabled" type="bool" setter="set_flag" getter="get_flag" overrides="Window" default="true" />
   * <member name="ok_button_text" type="String" setter="set_ok_button_text" getter="get_ok_button_text" default="&quot;&quot;">
   * The text displayed by the OK button (see {@link get_ok_button}). If empty, a default text will be used.
   */
  exclusive: boolean;
  title: string;
  transient: boolean;
  visible: boolean;
  wrap_controls: boolean;
  set_autowrap(value: boolean): void;
  has_autowrap(): boolean;
  set_close_on_escape(value: boolean): void;
  get_close_on_escape(): boolean;
  set_hide_on_ok(value: boolean): void;
  get_hide_on_ok(): boolean;
  set_text(value: string | NodePath): void;
  get_text(): string;

  /**
   * Adds a button with label `text` and a custom `action` to the dialog and returns the created button.
   * If `action` is not empty, pressing the button will emit the {@link custom_action} signal with the specified action string.
   * If `true`, `right` will place the button to the right of any sibling buttons.
   * You can use {@link remove_button} method to remove a button created with this method from the dialog.
   */
  add_button(text: string | NodePath, right?: boolean, action?: string | NodePath): Button;
  /**
   * Adds a button with label `name` and a cancel action to the dialog and returns the created button.
   * You can use {@link remove_button} method to remove a button created with this method from the dialog.
   */
  add_cancel_button(name: string | NodePath): Button;
  /**
   * Returns the label used for built-in text.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_label(): Label;
  /**
   * Returns the OK {@link Button} instance.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_ok_button(): Button;
  /**
   * Registers a {@link LineEdit} in the dialog. When the enter key is pressed, the dialog will be accepted.
   */
  register_text_enter(line_edit: LineEdit): void;
  /**
   * Removes the `button` from the dialog. Does NOT free the `button`. The `button` must be a {@link Button} added with {@link add_button} or {@link add_cancel_button} method. After removal, pressing the `button` will no longer emit this dialog's {@link custom_action} or {@link canceled} signals.
   */
  remove_button(button: Button): void;

  /** Emitted when the dialog is closed or the button created with {@link add_cancel_button} is pressed. */
  canceled: Signal<[]>;
  /** Emitted when the dialog is accepted, i.e. the OK button is pressed. */
  confirmed: Signal<[]>;
  /** Emitted when a custom button with an action is pressed. See {@link add_button}. */
  custom_action: Signal<[string]>;
}
