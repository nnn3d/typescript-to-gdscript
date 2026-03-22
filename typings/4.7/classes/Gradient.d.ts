// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A color transition. */
declare class Gradient extends Resource {
  /**
   * Gradient's colors as a {@link PackedColorArray}.
   * **Note:** Setting this property updates all colors at once. To update any color individually use {@link set_color}.
   */
  colors: PackedColorArray;
  /**
   * The color space used to interpolate between points of the gradient. It does not affect the returned colors, which will always use nonlinear sRGB encoding.
   * **Note:** This setting has no effect when {@link interpolation_mode} is set to {@link GRADIENT_INTERPOLATE_CONSTANT}.
   */
  interpolation_color_space: int;
  /** The algorithm used to interpolate between points of the gradient. */
  interpolation_mode: int;
  /**
   * Gradient's offsets as a {@link PackedFloat32Array}.
   * **Note:** Setting this property updates all offsets at once. To update any offset individually use {@link set_offset}.
   */
  offsets: PackedFloat32Array;
  set_colors(value: PackedColorArray): void;
  get_colors(): PackedColorArray;
  set_interpolation_color_space(value: int): void;
  get_interpolation_color_space(): int;
  set_interpolation_mode(value: int): void;
  get_interpolation_mode(): int;
  set_offsets(value: PackedFloat32Array): void;
  get_offsets(): PackedFloat32Array;

  /** Adds the specified color to the gradient, with the specified offset. */
  add_point(offset: float, color: Color): void;
  /** Returns the color of the gradient color at index `point`. */
  get_color(point: int): Color;
  /** Returns the offset of the gradient color at index `point`. */
  get_offset(point: int): float;
  /** Returns the number of colors in the gradient. */
  get_point_count(): int;
  /** Removes the color at index `point`. */
  remove_point(point: int): void;
  /**
   * Reverses/mirrors the gradient.
   * **Note:** This method mirrors all points around the middle of the gradient, which may produce unexpected results when {@link interpolation_mode} is set to {@link GRADIENT_INTERPOLATE_CONSTANT}.
   */
  reverse(): void;
  /**
   * Returns the interpolated color specified by `offset`. `offset` should be between `0.0` and `1.0` (inclusive). Using a value lower than `0.0` will return the same color as `0.0`, and using a value higher than `1.0` will return the same color as `1.0`. If your input value is not within this range, consider using {@link @GlobalScope.remap} on the input value with output values set to `0.0` and `1.0`.
   */
  sample(offset: float): Color;
  /** Sets the color of the gradient color at index `point`. */
  set_color(point: int, color: Color): void;
  /** Sets the offset for the gradient color at index `point`. */
  set_offset(point: int, offset: float): void;

  // enum InterpolationMode
  /** Linear interpolation. */
  static readonly GRADIENT_INTERPOLATE_LINEAR: int;
  /**
   * Constant interpolation, color changes abruptly at each point and stays uniform between. This might cause visible aliasing when used for a gradient texture in some cases.
   */
  static readonly GRADIENT_INTERPOLATE_CONSTANT: int;
  /** Cubic interpolation. */
  static readonly GRADIENT_INTERPOLATE_CUBIC: int;
  // enum ColorSpace
  /** sRGB color space. */
  static readonly GRADIENT_COLOR_SPACE_SRGB: int;
  /** Linear sRGB color space. */
  static readonly GRADIENT_COLOR_SPACE_LINEAR_SRGB: int;
  /**
   * Oklab (https://bottosson.github.io/posts/oklab/) color space. This color space provides a smooth and uniform-looking transition between colors.
   */
  static readonly GRADIENT_COLOR_SPACE_OKLAB: int;
}
