// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Godot editor's control for editing numeric values. */
declare class EditorSpinSlider extends Range {
  /** The state in which the control used to manipulate the value will be. */
  control_state: int;
  /**
   * If `true`, the {@link EditorSpinSlider} is considered to be editing an integer value. If `false`, the {@link EditorSpinSlider} is considered to be editing a floating-point value. This is used to determine whether a slider should be drawn by default. The slider is only drawn for floats; integers use up-down arrows similar to {@link SpinBox} instead, unless {@link control_state} is set to {@link CONTROL_STATE_PREFER_SLIDER}. It will also use {@link EditorSettings.interface/inspector/integer_drag_speed} instead of {@link EditorSettings.interface/inspector/float_drag_speed} if the slider is available.
   */
  editing_integer: boolean;
  /** If `true`, the slider will not draw background. */
  flat: boolean;
  /**
   * <member name="hide_slider" type="bool" setter="set_hide_slider" getter="is_hiding_slider" default="false" deprecated="Use {@link control_state} instead.">
   * If `true`, the slider and up/down arrows are hidden.
   */
  focus_mode: int;
  /** The text that displays to the left of the value. */
  label: string;
  /** If `true`, the slider can't be interacted with. */
  read_only: boolean;
  /**
   * <member name="step" type="float" setter="set_step" getter="get_step" overrides="Range" default="1.0" />
   * <member name="suffix" type="String" setter="set_suffix" getter="get_suffix" default="&quot;&quot;">
   * The suffix to display after the value (in a faded color). This should generally be a plural word. You may have to use an abbreviation if the suffix is too long to be displayed.
   */
  size_flags_vertical: int;
  set_control_state(value: int): void;
  get_control_state(): int;
  set_editing_integer(value: boolean): void;
  is_editing_integer(): boolean;
  set_flat(value: boolean): void;
  is_flat(): boolean;
  set_label(value: string | NodePath): void;
  get_label(): string;
  set_read_only(value: boolean): void;

  /** Emitted when the spinner/slider is grabbed. */
  grabbed: Signal<[]>;
  /** Emitted when the spinner/slider is ungrabbed. */
  ungrabbed: Signal<[]>;
  /** Emitted when the updown button is pressed. */
  updown_pressed: Signal<[]>;
  /** Emitted when the value form gains focus. */
  value_focus_entered: Signal<[]>;
  /** Emitted when the value form loses focus. */
  value_focus_exited: Signal<[]>;

  // enum ControlState
  /**
   * The type of control used will depend on the value of {@link editing_integer}. Up-down arrows if `true`, a slider if `false`.
   */
  static readonly CONTROL_STATE_DEFAULT: int;
  /** A slider will always be used, even if {@link editing_integer} is enabled. */
  static readonly CONTROL_STATE_PREFER_SLIDER: int;
  /** Neither the up-down arrows nor the slider will be shown. */
  static readonly CONTROL_STATE_HIDE: int;
}
