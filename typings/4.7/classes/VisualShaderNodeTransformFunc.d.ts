// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Computes a {@link Transform3D} function within the visual shader graph. */
declare class VisualShaderNodeTransformFunc extends VisualShaderNode {
  /** The function to be computed. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Perform the inverse operation on the {@link Transform3D} matrix. */
  static readonly FUNC_INVERSE: int;
  /** Perform the transpose operation on the {@link Transform3D} matrix. */
  static readonly FUNC_TRANSPOSE: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
