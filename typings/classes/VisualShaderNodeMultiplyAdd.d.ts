// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Performs a fused multiply-add operation within the visual shader graph. */
declare class VisualShaderNodeMultiplyAdd extends VisualShaderNode {
  /** A type of operands and returned value. */
  op_type: int;
  set_op_type(value: int): void;
  get_op_type(): int;

  // enum OpType
  /** A floating-point scalar type. */
  static readonly OP_TYPE_SCALAR: int;
  /** A 2D vector type. */
  static readonly OP_TYPE_VECTOR_2D: int;
  /** A 3D vector type. */
  static readonly OP_TYPE_VECTOR_3D: int;
  /** A 4D vector type. */
  static readonly OP_TYPE_VECTOR_4D: int;
  /** Represents the size of the {@link OpType} enum. */
  static readonly OP_TYPE_MAX: int;
}
