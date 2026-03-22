// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A vector operator to be used within the visual shader graph. */
declare class VisualShaderNodeVectorOp extends VisualShaderNodeVectorBase {
  /** The operator to be used. */
  operator: int;
  set_operator(value: int): void;
  get_operator(): int;

  // enum Operator
  /** Adds two vectors. */
  static readonly OP_ADD: int;
  /** Subtracts a vector from a vector. */
  static readonly OP_SUB: int;
  /** Multiplies two vectors. */
  static readonly OP_MUL: int;
  /** Divides vector by vector. */
  static readonly OP_DIV: int;
  /** Returns the remainder of the two vectors. */
  static readonly OP_MOD: int;
  /**
   * Returns the value of the first parameter raised to the power of the second, for each component of the vectors.
   */
  static readonly OP_POW: int;
  /** Returns the greater of two values, for each component of the vectors. */
  static readonly OP_MAX: int;
  /** Returns the lesser of two values, for each component of the vectors. */
  static readonly OP_MIN: int;
  /** Calculates the cross product of two vectors. */
  static readonly OP_CROSS: int;
  /** Returns the arc-tangent of the parameters. */
  static readonly OP_ATAN2: int;
  /**
   * Returns the vector that points in the direction of reflection. `a` is incident vector and `b` is the normal vector.
   */
  static readonly OP_REFLECT: int;
  /** Vector step operator. Returns `0.0` if `a` is smaller than `b` and `1.0` otherwise. */
  static readonly OP_STEP: int;
  /** Represents the size of the {@link Operator} enum. */
  static readonly OP_ENUM_SIZE: int;
}
