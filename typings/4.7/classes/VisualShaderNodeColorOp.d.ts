// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A {@link Color} operator to be used within the visual shader graph. */
declare class VisualShaderNodeColorOp extends VisualShaderNode {
  /** An operator to be applied to the inputs. */
  operator: int;
  set_operator(value: int): void;
  get_operator(): int;

  // enum Operator
  /** Produce a screen effect with the following formula: */
  static readonly OP_SCREEN: int;
  /** Produce a difference effect with the following formula: */
  static readonly OP_DIFFERENCE: int;
  /** Produce a darken effect with the following formula: */
  static readonly OP_DARKEN: int;
  /** Produce a lighten effect with the following formula: */
  static readonly OP_LIGHTEN: int;
  /** Produce an overlay effect with the following formula: */
  static readonly OP_OVERLAY: int;
  /** Produce a dodge effect with the following formula: */
  static readonly OP_DODGE: int;
  /** Produce a burn effect with the following formula: */
  static readonly OP_BURN: int;
  /** Produce a soft light effect with the following formula: */
  static readonly OP_SOFT_LIGHT: int;
  /** Produce a hard light effect with the following formula: */
  static readonly OP_HARD_LIGHT: int;
  /** Represents the size of the {@link Operator} enum. */
  static readonly OP_MAX: int;
}
