// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for GUI buttons. */
declare class BaseButton extends Control {
  /** Determines when the button is considered clicked. */
  action_mode: int;
  /**
   * The {@link ButtonGroup} associated with the button. Not to be confused with node groups.
   * **Note:** The button will be configured as a radio button if a {@link ButtonGroup} is assigned to it.
   */
  button_group: ButtonGroup | null;
  /**
   * Binary mask to choose which mouse buttons this button will respond to.
   * To allow both left-click and right-click, use `MOUSE_BUTTON_MASK_LEFT | MOUSE_BUTTON_MASK_RIGHT`.
   */
  button_mask: int;
  /**
   * If `true`, the button's state is pressed. Means the button is pressed down or toggled (if {@link toggle_mode} is active). Only works if {@link toggle_mode} is `true`.
   * **Note:** Changing the value of {@link button_pressed} will result in {@link toggled} to be emitted. If you want to change the pressed state without emitting that signal, use {@link set_pressed_no_signal}.
   */
  button_pressed: boolean;
  /**
   * If `true`, the button is in disabled state and can't be clicked or toggled.
   * **Note:** If the button is disabled while held down, {@link button_up} will be emitted.
   */
  disabled: boolean;
  /**
   * <member name="keep_pressed_outside" type="bool" setter="set_keep_pressed_outside" getter="is_keep_pressed_outside" default="false">
   * If `true`, the button stays pressed when moving the cursor outside the button while pressing it.
   * **Note:** This property only affects the button's visual appearance. Signals will be emitted at the same moment regardless of this property's value.
   */
  focus_mode: int;
  /** {@link Shortcut} associated to the button. */
  shortcut: Shortcut | null;
  /**
   * If `true`, the button will highlight for a short amount of time when its shortcut is activated. If `false` and {@link toggle_mode} is `false`, the shortcut will activate without any visual feedback.
   */
  shortcut_feedback: boolean;
  /**
   * If `true`, the button will add information about its shortcut in the tooltip.
   * **Note:** This property does nothing when the tooltip control is customized using {@link Control._make_custom_tooltip}.
   */
  shortcut_in_tooltip: boolean;
  /**
   * If `true`, the button is in toggle mode. Makes the button flip state between pressed and unpressed each time its area is clicked.
   */
  toggle_mode: boolean;
  set_action_mode(value: int): void;
  get_action_mode(): int;
  set_button_group(value: ButtonGroup | null): void;
  get_button_group(): ButtonGroup | null;
  set_button_mask(value: int): void;
  get_button_mask(): int;
  set_pressed(value: boolean): void;
  is_pressed(): boolean;
  set_disabled(value: boolean): void;
  is_disabled(): boolean;
  set_shortcut(value: Shortcut | null): void;
  get_shortcut(): Shortcut | null;
  set_shortcut_feedback(value: boolean): void;
  is_shortcut_feedback(): boolean;
  set_shortcut_in_tooltip(value: boolean): void;
  is_shortcut_in_tooltip_enabled(): boolean;
  set_toggle_mode(value: boolean): void;
  is_toggle_mode(): boolean;

  /**
   * Called when the button is pressed. If you need to know the button's pressed state (and {@link toggle_mode} is active), use {@link _toggled} instead.
   */
  _pressed(): void;
  /** Called when the button is toggled (only if {@link toggle_mode} is active). */
  _toggled(toggled_on: boolean): void;
  /**
   * Returns the visual state used to draw the button. This is useful mainly when implementing your own draw code by either overriding _draw() or connecting to "draw" signal. The visual state of the button is defined by the {@link DrawMode} enum.
   */
  get_draw_mode(): int;
  /** Returns `true` if the mouse has entered the button and has not left it yet. */
  is_hovered(): boolean;
  /**
   * Changes the {@link button_pressed} state of the button, without emitting {@link toggled}. Use when you just want to change the state of the button without sending the pressed event (e.g. when initializing scene). Only works if {@link toggle_mode} is `true`.
   * **Note:** This method doesn't unpress other buttons in {@link button_group}.
   */
  set_pressed_no_signal(pressed: boolean): void;

  /** Emitted when the button starts being held down. */
  button_down: Signal<[]>;
  /** Emitted when the button stops being held down. */
  button_up: Signal<[]>;
  /**
   * Emitted when the button is toggled or pressed. This is on {@link button_down} if {@link action_mode} is {@link ACTION_MODE_BUTTON_PRESS} and on {@link button_up} otherwise.
   * If you need to know the button's pressed state (and {@link toggle_mode} is active), use {@link toggled} instead.
   */
  pressed: Signal<[]>;
  /**
   * Emitted when the button was just toggled between pressed and normal states (only if {@link toggle_mode} is active). The new state is contained in the `toggled_on` argument.
   */
  toggled: Signal<[boolean]>;

  // enum DrawMode
  /** The normal state (i.e. not pressed, not hovered, not toggled and enabled) of buttons. */
  static readonly DRAW_NORMAL: int;
  /** The state of buttons are pressed. */
  static readonly DRAW_PRESSED: int;
  /** The state of buttons are hovered. */
  static readonly DRAW_HOVER: int;
  /** The state of buttons are disabled. */
  static readonly DRAW_DISABLED: int;
  /** The state of buttons are both hovered and pressed. */
  static readonly DRAW_HOVER_PRESSED: int;
  // enum ActionMode
  /** Require just a press to consider the button clicked. */
  static readonly ACTION_MODE_BUTTON_PRESS: int;
  /** Require a press and a subsequent release before considering the button clicked. */
  static readonly ACTION_MODE_BUTTON_RELEASE: int;
}
