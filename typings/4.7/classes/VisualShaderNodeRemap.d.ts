// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A visual shader node for remap function. */
declare class VisualShaderNodeRemap extends VisualShaderNode {
  op_type: int;
  set_op_type(value: int): void;
  get_op_type(): int;

  // enum OpType
  /** A floating-point scalar type. */
  static readonly OP_TYPE_SCALAR: int;
  /** A 2D vector type. */
  static readonly OP_TYPE_VECTOR_2D: int;
  /**
   * The `value` port uses a 2D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   */
  static readonly OP_TYPE_VECTOR_2D_SCALAR: int;
  /** A 3D vector type. */
  static readonly OP_TYPE_VECTOR_3D: int;
  /**
   * The `value` port uses a 3D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   */
  static readonly OP_TYPE_VECTOR_3D_SCALAR: int;
  /** A 4D vector type. */
  static readonly OP_TYPE_VECTOR_4D: int;
  /**
   * The `value` port uses a 4D vector type, while the `input min`, `input max`, `output min`, and `output max` ports use a floating-point scalar type.
   */
  static readonly OP_TYPE_VECTOR_4D_SCALAR: int;
  /** Represents the size of the {@link OpType} enum. */
  static readonly OP_TYPE_MAX: int;
}
