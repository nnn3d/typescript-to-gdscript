// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An unsigned scalar integer function to be used within the visual shader graph. */
declare class VisualShaderNodeUIntFunc extends VisualShaderNode {
  /** A function to be applied to the scalar. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Negates the `x` using `-(x)`. */
  static readonly FUNC_NEGATE: int;
  /**
   * Returns the result of bitwise `NOT` operation on the integer. Translates to `~a` in the Godot Shader Language.
   */
  static readonly FUNC_BITWISE_NOT: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
