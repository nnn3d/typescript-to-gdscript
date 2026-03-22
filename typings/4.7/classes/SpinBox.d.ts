// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An input field for numbers. */
declare class SpinBox extends Range {
  /** Changes the alignment of the underlying {@link LineEdit}. */
  alignment: int;
  /**
   * If `true`, the value will be rounded to a multiple of {@link custom_arrow_step} when interacting with the arrow buttons. Otherwise, increments the value by {@link custom_arrow_step} and then rounds it according to {@link Range.step}.
   */
  custom_arrow_round: boolean;
  /**
   * If not `0`, sets the step when interacting with the arrow buttons of the {@link SpinBox}.
   * **Note:** {@link Range.value} will still be rounded to a multiple of {@link Range.step}.
   */
  custom_arrow_step: float;
  /** If `true`, the {@link SpinBox} will be editable. Otherwise, it will be read only. */
  editable: boolean;
  /** Adds the specified prefix string before the numerical value of the {@link SpinBox}. */
  prefix: string;
  /**
   * If `true`, the {@link SpinBox} will select the whole text when the {@link LineEdit} gains focus. Clicking the up and down arrows won't trigger this behavior.
   */
  select_all_on_focus: boolean;
  /**
   * <member name="step" type="float" setter="set_step" getter="get_step" overrides="Range" default="1.0" />
   * <member name="suffix" type="String" setter="set_suffix" getter="get_suffix" default="&quot;&quot;">
   * Adds the specified suffix string after the numerical value of the {@link SpinBox}.
   */
  size_flags_vertical: int;
  /**
   * Sets the value of the {@link Range} for this {@link SpinBox} when the {@link LineEdit} text is *changed* instead of *submitted*. See {@link LineEdit.text_changed} and {@link LineEdit.text_submitted}.
   * **Note:** If set to `true`, this will interfere with entering mathematical expressions in the {@link SpinBox}. The {@link SpinBox} will try to evaluate the expression as you type, which means symbols like a trailing `+` are removed immediately by the expression being evaluated.
   */
  update_on_text_changed: boolean;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_custom_arrow_round(value: boolean): void;
  is_custom_arrow_rounding(): boolean;
  set_custom_arrow_step(value: float): void;
  get_custom_arrow_step(): float;
  set_editable(value: boolean): void;
  is_editable(): boolean;
  set_prefix(value: string): void;
  get_prefix(): string;
  set_select_all_on_focus(value: boolean): void;
  is_select_all_on_focus(): boolean;
  set_update_on_text_changed(value: boolean): void;
  get_update_on_text_changed(): boolean;

  /**
   * Applies the current value of this {@link SpinBox}. This is equivalent to pressing `Enter` while editing the {@link LineEdit} used by the {@link SpinBox}. This will cause {@link LineEdit.text_submitted} to be emitted and its currently contained expression to be evaluated.
   */
  apply(): void;
  /**
   * Returns the {@link LineEdit} instance from this {@link SpinBox}. You can use it to access properties and methods of {@link LineEdit}.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_line_edit(): LineEdit;
}
