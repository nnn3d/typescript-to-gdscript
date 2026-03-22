// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A {@link Color} function to be used within the visual shader graph. */
declare class VisualShaderNodeColorFunc extends VisualShaderNode {
  /** A function to be applied to the input color. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Converts the color to grayscale using the following formula: */
  static readonly FUNC_GRAYSCALE: int;
  /** Converts HSV vector to RGB equivalent. */
  static readonly FUNC_HSV2RGB: int;
  /** Converts RGB vector to HSV equivalent. */
  static readonly FUNC_RGB2HSV: int;
  /** Applies sepia tone effect using the following formula: */
  static readonly FUNC_SEPIA: int;
  /**
   * Converts color from linear encoding to nonlinear sRGB encoding using the following formula:
   * The Compatibility renderer uses a simpler formula that may produce undefined behavior with negative input values:
   */
  static readonly FUNC_LINEAR_TO_SRGB: int;
  /**
   * Converts color from nonlinear sRGB encoding to linear encoding using the following formula:
   * The Compatibility renderer uses a simpler formula that behaves poorly with negative input values:
   */
  static readonly FUNC_SRGB_TO_LINEAR: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
