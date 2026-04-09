// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A visual shader node for shader parameter (uniform) of type [int]. */
declare class VisualShaderNodeIntParameter extends VisualShaderNodeParameter {
  /**
   * Default value of this parameter, which will be used if not set externally. {@link default_value_enabled} must be enabled; defaults to `0` otherwise.
   */
  default_value: int;
  /** If `true`, the node will have a custom default value. */
  default_value_enabled: boolean;
  /**
   * The names used for the enum select in the editor. {@link hint} must be {@link HINT_ENUM} for this to take effect.
   */
  enum_names: PackedStringArray;
  /** Range hint of this node. Use it to customize valid parameter range. */
  hint: int;
  /**
   * The maximum value this parameter can take. {@link hint} must be either {@link HINT_RANGE} or {@link HINT_RANGE_STEP} for this to take effect.
   */
  max: int;
  /**
   * The minimum value this parameter can take. {@link hint} must be either {@link HINT_RANGE} or {@link HINT_RANGE_STEP} for this to take effect.
   */
  min: int;
  /**
   * The step between parameter's values. Forces the parameter to be a multiple of the given value. {@link hint} must be {@link HINT_RANGE_STEP} for this to take effect.
   */
  step: int;
  set_default_value(value: int): void;
  get_default_value(): int;
  set_default_value_enabled(value: boolean): void;
  is_default_value_enabled(): boolean;
  set_enum_names(value: PackedStringArray): void;
  get_enum_names(): PackedStringArray;
  set_hint(value: int): void;
  get_hint(): int;
  set_max(value: int): void;
  get_max(): int;
  set_min(value: int): void;
  get_min(): int;
  set_step(value: int): void;
  get_step(): int;

  // enum Hint
  /** The parameter will not constrain its value. */
  static readonly HINT_NONE: int;
  /** The parameter's value must be within the specified {@link min}/{@link max} range. */
  static readonly HINT_RANGE: int;
  /**
   * The parameter's value must be within the specified range, with the given {@link step} between values.
   */
  static readonly HINT_RANGE_STEP: int;
  /** The parameter uses an enum to associate preset values to names in the editor. */
  static readonly HINT_ENUM: int;
  /** Represents the size of the {@link Hint} enum. */
  static readonly HINT_MAX: int;
}
