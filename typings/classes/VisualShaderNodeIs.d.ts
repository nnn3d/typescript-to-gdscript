// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A boolean comparison operator to be used within the visual shader graph. */
declare class VisualShaderNodeIs extends VisualShaderNode {
  /** The comparison function. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Comparison with `INF` (Infinity). */
  static readonly FUNC_IS_INF: int;
  /** Comparison with `NaN` (Not a Number; indicates invalid numeric results, such as division by zero). */
  static readonly FUNC_IS_NAN: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
