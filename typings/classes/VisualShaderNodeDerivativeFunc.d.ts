// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Calculates a derivative within the visual shader graph. */
declare class VisualShaderNodeDerivativeFunc extends VisualShaderNode {
  /** A derivative function type. */
  function: int;
  /** A type of operands and returned value. */
  op_type: int;
  /**
   * Sets the level of precision to use for the derivative function. When using the Compatibility renderer, this setting has no effect.
   */
  precision: int;
  set_function(value: int): void;
  get_function(): int;
  set_op_type(value: int): void;
  get_op_type(): int;
  set_precision(value: int): void;
  get_precision(): int;

  // enum OpType
  /** A floating-point scalar. */
  static readonly OP_TYPE_SCALAR: int;
  /** A 2D vector type. */
  static readonly OP_TYPE_VECTOR_2D: int;
  /** A 3D vector type. */
  static readonly OP_TYPE_VECTOR_3D: int;
  /** A 4D vector type. */
  static readonly OP_TYPE_VECTOR_4D: int;
  /** Represents the size of the {@link OpType} enum. */
  static readonly OP_TYPE_MAX: int;
  // enum Function
  /** Sum of absolute derivative in `x` and `y`. */
  static readonly FUNC_SUM: int;
  /** Derivative in `x` using local differencing. */
  static readonly FUNC_X: int;
  /** Derivative in `y` using local differencing. */
  static readonly FUNC_Y: int;
  /** Represents the size of the {@link Function} enum. */
  static readonly FUNC_MAX: int;
  // enum Precision
  /**
   * No precision is specified, the GPU driver is allowed to use whatever level of precision it chooses. This is the default option and is equivalent to using `dFdx()` or `dFdy()` in text shaders.
   */
  static readonly PRECISION_NONE: int;
  /**
   * The derivative will be calculated using the current fragment's neighbors (which may not include the current fragment). This tends to be faster than using {@link PRECISION_FINE}, but may not be suitable when more precision is needed. This is equivalent to using `dFdxCoarse()` or `dFdyCoarse()` in text shaders.
   */
  static readonly PRECISION_COARSE: int;
  /**
   * The derivative will be calculated using the current fragment and its immediate neighbors. This tends to be slower than using {@link PRECISION_COARSE}, but may be necessary when more precision is needed. This is equivalent to using `dFdxFine()` or `dFdyFine()` in text shaders.
   */
  static readonly PRECISION_FINE: int;
  /** Represents the size of the {@link Precision} enum. */
  static readonly PRECISION_MAX: int;
}
