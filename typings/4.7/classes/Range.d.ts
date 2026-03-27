// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for controls that represent a number within a range. */
declare class Range<Tree extends object = any> extends Control<Tree> {
  /** If `true`, {@link value} may be greater than {@link max_value}. */
  allow_greater: boolean;
  /** If `true`, {@link value} may be less than {@link min_value}. */
  allow_lesser: boolean;
  /**
   * If `true`, and {@link min_value} is greater or equal to `0`, {@link value} will be represented exponentially rather than linearly.
   */
  exp_edit: boolean;
  /** Maximum value. Range is clamped if {@link value} is greater than {@link max_value}. */
  max_value: float;
  /** Minimum value. Range is clamped if {@link value} is less than {@link min_value}. */
  min_value: float;
  /**
   * Page size. Used mainly for {@link ScrollBar}. A {@link ScrollBar}'s grabber length is the {@link ScrollBar}'s size multiplied by {@link page} over the difference between {@link min_value} and {@link max_value}.
   */
  page: float;
  /** The value mapped between 0 and 1. */
  ratio: float;
  /** If `true`, {@link value} will always be rounded to the nearest integer. */
  rounded: boolean;
  /**
   * <member name="step" type="float" setter="set_step" getter="get_step" default="0.01">
   * If greater than `0.0`, {@link value} will always be rounded to a multiple of this property's value above {@link min_value}. For example, if {@link min_value} is `0.1` and step is `0.2`, then {@link value} is limited to `0.1`, `0.3`, `0.5`, and so on. If {@link rounded} is also `true`, {@link value} will first be rounded to a multiple of this property's value, then rounded to the nearest integer.
   */
  size_flags_vertical: int;
  /**
   * Range's current value. Changing this property (even via code) will trigger {@link value_changed} signal. Use {@link set_value_no_signal} if you want to avoid it.
   */
  value: float;
  set_allow_greater(value: boolean): void;
  is_greater_allowed(): boolean;
  set_allow_lesser(value: boolean): void;
  is_lesser_allowed(): boolean;
  set_exp_ratio(value: boolean): void;
  is_ratio_exp(): boolean;
  set_max(value: float): void;
  get_max(): float;
  set_min(value: float): void;
  get_min(): float;
  set_page(value: float): void;
  get_page(): float;
  set_as_ratio(value: float): void;
  get_as_ratio(): float;
  set_use_rounded_values(value: boolean): void;
  is_using_rounded_values(): boolean;
  set_value(value: float): void;
  get_value(): float;

  /**
   * Called when the {@link Range}'s value is changed (following the same conditions as {@link value_changed}).
   */
  _value_changed(new_value: float): void;
  /**
   * Sets the {@link Range}'s current value to the specified `value`, without emitting the {@link value_changed} signal.
   */
  set_value_no_signal(value: float): void;
  /**
   * Binds two {@link Range}s together along with any ranges previously grouped with either of them. When any of range's member variables change, it will share the new value with all other ranges in its group.
   */
  share(with_: Node): void;
  /** Stops the {@link Range} from sharing its member variables with any other. */
  unshare(): void;

  /** Emitted when {@link min_value}, {@link max_value}, {@link page}, or {@link step} change. */
  changed: Signal<[]>;
  /**
   * Emitted when {@link value} changes. When used on a {@link Slider}, this is called continuously while dragging (potentially every frame). If you are performing an expensive operation in a function connected to {@link value_changed}, consider using a *debouncing* {@link Timer} to call the function less often.
   * **Note:** Unlike signals such as {@link LineEdit.text_changed}, {@link value_changed} is also emitted when `value` is set directly via code.
   */
  value_changed: Signal<[float]>;
}
