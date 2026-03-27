// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Multiplies a {@link Transform3D} and a {@link Vector3} within the visual shader graph. */
declare class VisualShaderNodeTransformVecMult extends VisualShaderNode {
  /** The multiplication type to be performed. */
  operator: int;
  set_operator(value: int): void;
  get_operator(): int;

  // enum Operator
  /** Multiplies transform `a` by the vector `b`. */
  static readonly OP_AxB: int;
  /** Multiplies vector `b` by the transform `a`. */
  static readonly OP_BxA: int;
  /** Multiplies transform `a` by the vector `b`, skipping the last row and column of the transform. */
  static readonly OP_3x3_AxB: int;
  /** Multiplies vector `b` by the transform `a`, skipping the last row and column of the transform. */
  static readonly OP_3x3_BxA: int;
  /** Represents the size of the {@link Operator} enum. */
  static readonly OP_MAX: int;
}
