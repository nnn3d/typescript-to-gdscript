// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Contains functions to modify texture coordinates (`uv`) to be used within the visual shader graph. */
declare class VisualShaderNodeUVFunc extends VisualShaderNode {
  /** A function to be applied to the texture coordinates. */
  function: int;

  // enum Function
  /**
   * Translates `uv` by using `scale` and `offset` values using the following formula: `uv = uv + offset * scale`. `uv` port is connected to `UV` built-in by default.
   */
  static readonly FUNC_PANNING: int;
  /**
   * Scales `uv` by using `scale` and `pivot` values using the following formula: `uv = (uv - pivot) * scale + pivot`. `uv` port is connected to `UV` built-in by default.
   */
  static readonly FUNC_SCALING: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
