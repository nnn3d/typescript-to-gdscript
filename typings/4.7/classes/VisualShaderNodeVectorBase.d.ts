// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A base type for the nodes that perform vector operations within the visual shader graph. */
declare class VisualShaderNodeVectorBase extends VisualShaderNode {
  /** A vector type that this operation is performed on. */
  op_type: int;
  set_op_type(value: int): void;
  get_op_type(): int;

  // enum OpType
  /** A 2D vector type. */
  static readonly OP_TYPE_VECTOR_2D: int;
  /** A 3D vector type. */
  static readonly OP_TYPE_VECTOR_3D: int;
  /** A 4D vector type. */
  static readonly OP_TYPE_VECTOR_4D: int;
  /** Represents the size of the {@link OpType} enum. */
  static readonly OP_TYPE_MAX: int;
}
