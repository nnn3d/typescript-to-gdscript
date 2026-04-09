// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A scalar floating-point function to be used within the visual shader graph. */
declare class VisualShaderNodeFloatFunc extends VisualShaderNode {
  /** A function to be applied to the scalar. */
  function: int;
  set_function(value: int): void;
  get_function(): int;

  // enum Function
  /** Returns the sine of the parameter. Translates to `sin(x)` in the Godot Shader Language. */
  static readonly FUNC_SIN: int;
  /** Returns the cosine of the parameter. Translates to `cos(x)` in the Godot Shader Language. */
  static readonly FUNC_COS: int;
  /** Returns the tangent of the parameter. Translates to `tan(x)` in the Godot Shader Language. */
  static readonly FUNC_TAN: int;
  /** Returns the arc-sine of the parameter. Translates to `asin(x)` in the Godot Shader Language. */
  static readonly FUNC_ASIN: int;
  /** Returns the arc-cosine of the parameter. Translates to `acos(x)` in the Godot Shader Language. */
  static readonly FUNC_ACOS: int;
  /** Returns the arc-tangent of the parameter. Translates to `atan(x)` in the Godot Shader Language. */
  static readonly FUNC_ATAN: int;
  /** Returns the hyperbolic sine of the parameter. Translates to `sinh(x)` in the Godot Shader Language. */
  static readonly FUNC_SINH: int;
  /**
   * Returns the hyperbolic cosine of the parameter. Translates to `cosh(x)` in the Godot Shader Language.
   */
  static readonly FUNC_COSH: int;
  /**
   * Returns the hyperbolic tangent of the parameter. Translates to `tanh(x)` in the Godot Shader Language.
   */
  static readonly FUNC_TANH: int;
  /**
   * Returns the natural logarithm of the parameter. Translates to `log(x)` in the Godot Shader Language.
   */
  static readonly FUNC_LOG: int;
  /**
   * Returns the natural exponentiation of the parameter. Translates to `exp(x)` in the Godot Shader Language.
   */
  static readonly FUNC_EXP: int;
  /** Returns the square root of the parameter. Translates to `sqrt(x)` in the Godot Shader Language. */
  static readonly FUNC_SQRT: int;
  /** Returns the absolute value of the parameter. Translates to `abs(x)` in the Godot Shader Language. */
  static readonly FUNC_ABS: int;
  /** Extracts the sign of the parameter. Translates to `sign(x)` in the Godot Shader Language. */
  static readonly FUNC_SIGN: int;
  /**
   * Finds the nearest integer less than or equal to the parameter. Translates to `floor(x)` in the Godot Shader Language.
   */
  static readonly FUNC_FLOOR: int;
  /** Finds the nearest integer to the parameter. Translates to `round(x)` in the Godot Shader Language. */
  static readonly FUNC_ROUND: int;
  /**
   * Finds the nearest integer that is greater than or equal to the parameter. Translates to `ceil(x)` in the Godot Shader Language.
   */
  static readonly FUNC_CEIL: int;
  /**
   * Computes the fractional part of the argument. Translates to `fract(x)` in the Godot Shader Language.
   */
  static readonly FUNC_FRACT: int;
  /** Clamps the value between `0.0` and `1.0` using `min(max(x, 0.0), 1.0)`. */
  static readonly FUNC_SATURATE: int;
  /** Negates the `x` using `-(x)`. */
  static readonly FUNC_NEGATE: int;
  /**
   * Returns the arc-hyperbolic-cosine of the parameter. Translates to `acosh(x)` in the Godot Shader Language.
   */
  static readonly FUNC_ACOSH: int;
  /**
   * Returns the arc-hyperbolic-sine of the parameter. Translates to `asinh(x)` in the Godot Shader Language.
   */
  static readonly FUNC_ASINH: int;
  /**
   * Returns the arc-hyperbolic-tangent of the parameter. Translates to `atanh(x)` in the Godot Shader Language.
   */
  static readonly FUNC_ATANH: int;
  /** Convert a quantity in radians to degrees. Translates to `degrees(x)` in the Godot Shader Language. */
  static readonly FUNC_DEGREES: int;
  /**
   * Returns 2 raised by the power of the parameter. Translates to `exp2(x)` in the Godot Shader Language.
   */
  static readonly FUNC_EXP2: int;
  /**
   * Returns the inverse of the square root of the parameter. Translates to `inversesqrt(x)` in the Godot Shader Language.
   */
  static readonly FUNC_INVERSE_SQRT: int;
  /**
   * Returns the base 2 logarithm of the parameter. Translates to `log2(x)` in the Godot Shader Language.
   */
  static readonly FUNC_LOG2: int;
  /** Convert a quantity in degrees to radians. Translates to `radians(x)` in the Godot Shader Language. */
  static readonly FUNC_RADIANS: int;
  /** Finds reciprocal value of dividing 1 by `x` (i.e. `1 / x`). */
  static readonly FUNC_RECIPROCAL: int;
  /**
   * Finds the nearest even integer to the parameter. Translates to `roundEven(x)` in the Godot Shader Language.
   */
  static readonly FUNC_ROUNDEVEN: int;
  /**
   * Returns a value equal to the nearest integer to `x` whose absolute value is not larger than the absolute value of `x`. Translates to `trunc(x)` in the Godot Shader Language.
   */
  static readonly FUNC_TRUNC: int;
  /** Subtracts scalar `x` from 1 (i.e. `1 - x`). */
  static readonly FUNC_ONEMINUS: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
}
