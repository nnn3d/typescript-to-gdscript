// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Calculates a Step function within the visual shader graph. */
declare class VisualShaderNodeStep extends VisualShaderNode {
  /** A type of operands and returned value. */
  op_type: int;
  set_op_type(value: int): void;
  get_op_type(): int;

  // enum OpType
  /** A floating-point scalar type. */
  static readonly OP_TYPE_SCALAR: int;
  /** A 2D vector type. */
  static readonly OP_TYPE_VECTOR_2D: int;
  /** The `x` port uses a 2D vector type, while the `edge` port uses a floating-point scalar type. */
  static readonly OP_TYPE_VECTOR_2D_SCALAR: int;
  /** A 3D vector type. */
  static readonly OP_TYPE_VECTOR_3D: int;
  /** The `x` port uses a 3D vector type, while the `edge` port uses a floating-point scalar type. */
  static readonly OP_TYPE_VECTOR_3D_SCALAR: int;
  /** A 4D vector type. */
  static readonly OP_TYPE_VECTOR_4D: int;
  /** The `a` and `b` ports use a 4D vector type. The `weight` port uses a scalar type. */
  static readonly OP_TYPE_VECTOR_4D_SCALAR: int;
  /** Represents the size of the {@link OpType} enum. */
  static readonly OP_TYPE_MAX: int;
}
