// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A scalar float parameter to be used within the visual shader graph. */
declare class VisualShaderNodeFloatParameter extends VisualShaderNodeParameter {
  /** A default value to be assigned within the shader. */
  default_value: float;
  /** Enables usage of the {@link default_value}. */
  default_value_enabled: boolean;
  /**
   * A hint applied to the uniform, which controls the values it can take when set through the Inspector.
   */
  hint: int;
  /**
   * Minimum value for range hints. Used if {@link hint} is set to {@link HINT_RANGE} or {@link HINT_RANGE_STEP}.
   */
  max: float;
  /**
   * Maximum value for range hints. Used if {@link hint} is set to {@link HINT_RANGE} or {@link HINT_RANGE_STEP}.
   */
  min: float;
  /**
   * Step (increment) value for the range hint with step. Used if {@link hint} is set to {@link HINT_RANGE_STEP}.
   */
  step: float;
  set_default_value(value: float): void;
  get_default_value(): float;
  set_default_value_enabled(value: boolean): void;
  is_default_value_enabled(): boolean;
  set_hint(value: int): void;
  get_hint(): int;
  set_max(value: float): void;
  get_max(): float;
  set_min(value: float): void;
  get_min(): float;
  set_step(value: float): void;
  get_step(): float;

  // enum Hint
  /** No hint used. */
  static readonly HINT_NONE: int;
  /**
   * A range hint for scalar value, which limits possible input values between {@link min} and {@link max}. Translated to `hint_range(min, max)` in shader code.
   */
  static readonly HINT_RANGE: int;
  /**
   * A range hint for scalar value with step, which limits possible input values between {@link min} and {@link max}, with a step (increment) of {@link step}). Translated to `hint_range(min, max, step)` in shader code.
   */
  static readonly HINT_RANGE_STEP: int;
  /** Represents the size of the {@link Hint} enum. */
  static readonly HINT_MAX: int;
}
