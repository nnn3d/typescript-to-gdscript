// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A scalar integer function to be used within the visual shader graph. */
declare class VisualShaderNodeIntFunc extends VisualShaderNode {
  /** A function to be applied to the scalar. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Returns the absolute value of the parameter. Translates to `abs(x)` in the Godot Shader Language. */
  static readonly FUNC_ABS: int;
  /** Negates the `x` using `-(x)`. */
  static readonly FUNC_NEGATE: int;
  /** Extracts the sign of the parameter. Translates to `sign(x)` in the Godot Shader Language. */
  static readonly FUNC_SIGN: int;
  /**
   * Returns the result of bitwise `NOT` operation on the integer. Translates to `~a` in the Godot Shader Language.
   */
  static readonly FUNC_BITWISE_NOT: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
