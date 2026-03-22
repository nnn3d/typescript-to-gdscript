// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A {@link Transform3D} operator to be used within the visual shader graph. */
declare class VisualShaderNodeTransformOp extends VisualShaderNode {
  /** The type of the operation to be performed on the transforms. */
  operator: int;
  set_operator(value: int): void;
  get_operator(): int;

  // enum Operator
  /** Multiplies transform `a` by the transform `b`. */
  static readonly OP_AxB: int;
  /** Multiplies transform `b` by the transform `a`. */
  static readonly OP_BxA: int;
  /** Performs a component-wise multiplication of transform `a` by the transform `b`. */
  static readonly OP_AxB_COMP: int;
  /** Performs a component-wise multiplication of transform `b` by the transform `a`. */
  static readonly OP_BxA_COMP: int;
  /** Adds two transforms. */
  static readonly OP_ADD: int;
  /** Subtracts the transform `a` from the transform `b`. */
  static readonly OP_A_MINUS_B: int;
  /** Subtracts the transform `b` from the transform `a`. */
  static readonly OP_B_MINUS_A: int;
  /** Divides the transform `a` by the transform `b`. */
  static readonly OP_A_DIV_B: int;
  /** Divides the transform `b` by the transform `a`. */
  static readonly OP_B_DIV_A: int;
  /** Represents the size of the {@link Operator} enum. */
  static readonly OP_MAX: int;
}
