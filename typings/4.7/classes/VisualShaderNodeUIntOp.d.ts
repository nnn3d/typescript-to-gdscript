// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An unsigned integer scalar operator to be used within the visual shader graph. */
declare class VisualShaderNodeUIntOp extends VisualShaderNode {
  /** An operator to be applied to the inputs. */
  operator: int;

  // enum Operator
  /** Sums two numbers using `a + b`. */
  static readonly OP_ADD: int;
  /** Subtracts two numbers using `a - b`. */
  static readonly OP_SUB: int;
  /** Multiplies two numbers using `a * b`. */
  static readonly OP_MUL: int;
  /** Divides two numbers using `a / b`. */
  static readonly OP_DIV: int;
  /** Calculates the remainder of two numbers using `a % b`. */
  static readonly OP_MOD: int;
  /** Returns the greater of two numbers. Translates to `max(a, b)` in the Godot Shader Language. */
  static readonly OP_MAX: int;
  /** Returns the lesser of two numbers. Translates to `max(a, b)` in the Godot Shader Language. */
  static readonly OP_MIN: int;
  /**
   * Returns the result of bitwise `AND` operation on the integer. Translates to `a & b` in the Godot Shader Language.
   */
  static readonly OP_BITWISE_AND: int;
  /**
   * Returns the result of bitwise `OR` operation for two integers. Translates to `a | b` in the Godot Shader Language.
   */
  static readonly OP_BITWISE_OR: int;
  /**
   * Returns the result of bitwise `XOR` operation for two integers. Translates to `a ^ b` in the Godot Shader Language.
   */
  static readonly OP_BITWISE_XOR: int;
  /**
   * Returns the result of bitwise left shift operation on the integer. Translates to `a << b` in the Godot Shader Language.
   */
  static readonly OP_BITWISE_LEFT_SHIFT: int;
  /**
   * Returns the result of bitwise right shift operation on the integer. Translates to `a >> b` in the Godot Shader Language.
   */
  static readonly OP_BITWISE_RIGHT_SHIFT: int;
  /** Represents the size of the {@link Operator} enum. */
  static readonly OP_ENUM_SIZE: int;
}
