// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 4D vector using floating-point coordinates. */
declare interface Vector4 {
  /** The vector's W component. Also accessible by using the index position `[3]`. */
  w: float;
  /** The vector's X component. Also accessible by using the index position `[0]`. */
  x: float;
  /** The vector's Y component. Also accessible by using the index position `[1]`. */
  y: float;
  /** The vector's Z component. Also accessible by using the index position `[2]`. */
  z: float;

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector4;
  /** Returns a new vector with all components rounded up (towards positive infinity). */
  ceil(): Vector4;
  /**
   * Returns a new vector with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min: Vector4, max: Vector4): Vector4;
  /**
   * Returns a new vector with all components clamped between `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clampf(min: float, max: float): Vector4;
  /**
   * Performs a cubic interpolation between this vector and `b` using `pre_a` and `post_b` as handles, and returns the result at position `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
   */
  cubic_interpolate(b: Vector4, pre_a: Vector4, post_b: Vector4, weight: float): Vector4;
  /**
   * Performs a cubic interpolation between this vector and `b` using `pre_a` and `post_b` as handles, and returns the result at position `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
   * It can perform smoother interpolation than {@link cubic_interpolate} by the time values.
   */
  cubic_interpolate_in_time(b: Vector4, pre_a: Vector4, post_b: Vector4, weight: float, b_t: float, pre_a_t: float, post_b_t: float): Vector4;
  /**
   * Returns the normalized vector pointing from this vector to `to`. This is equivalent to using `(b - a).normalized()`.
   */
  direction_to(to: Vector4): Vector4;
  /**
   * Returns the squared distance between this vector and `to`.
   * This method runs faster than {@link distance_to}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  distance_squared_to(to: Vector4): float;
  /** Returns the distance between this vector and `to`. */
  distance_to(to: Vector4): float;
  /** Returns the dot product of this vector and `with`. */
  dot(with_: Vector4): float;
  /** Returns a new vector with all components rounded down (towards negative infinity). */
  floor(): Vector4;
  /**
   * Returns the inverse of the vector. This is the same as `Vector4(1.0 / v.x, 1.0 / v.y, 1.0 / v.z, 1.0 / v.w)`.
   */
  inverse(): Vector4;
  /**
   * Returns `true` if this vector and `to` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(to: Vector4): boolean;
  /**
   * Returns `true` if this vector is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /** Returns `true` if the vector is normalized, i.e. its length is approximately equal to 1. */
  is_normalized(): boolean;
  /**
   * Returns `true` if this vector's values are approximately zero, by running {@link @GlobalScope.is_zero_approx} on each component.
   * This method is faster than using {@link is_equal_approx} with one value as a zero vector.
   */
  is_zero_approx(): boolean;
  /** Returns the length (magnitude) of this vector. */
  length(): float;
  /**
   * Returns the squared length (squared magnitude) of this vector.
   * This method runs faster than {@link length}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  length_squared(): float;
  /**
   * Returns the result of the linear interpolation between this vector and `to` by amount `weight`. `weight` is on the range of `0.0` to `1.0`, representing the amount of interpolation.
   */
  lerp(to: Vector4, weight: float): Vector4;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector4(maxf(x, with.x), maxf(y, with.y), maxf(z, with.z), maxf(w, with.w))`.
   */
  max(with_: Vector4): Vector4;
  /**
   * Returns the axis of the vector's highest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_X}.
   */
  max_axis_index(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector4(maxf(x, with), maxf(y, with), maxf(z, with), maxf(w, with))`.
   */
  maxf(with_: float): Vector4;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector4(minf(x, with.x), minf(y, with.y), minf(z, with.z), minf(w, with.w))`.
   */
  min(with_: Vector4): Vector4;
  /**
   * Returns the axis of the vector's lowest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_W}.
   */
  min_axis_index(): int;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector4(minf(x, with), minf(y, with), minf(z, with), minf(w, with))`.
   */
  minf(with_: float): Vector4;
  /**
   * Returns the result of scaling the vector to unit length. Equivalent to `v / v.length()`. Returns `(0, 0, 0, 0)` if `v.length() == 0`. See also {@link is_normalized}.
   * **Note:** This function may return incorrect values if the input vector length is near zero.
   */
  normalized(): Vector4;
  /**
   * Returns a vector composed of the {@link @GlobalScope.fposmod} of this vector's components and `mod`.
   */
  posmod(mod: float): Vector4;
  /**
   * Returns a vector composed of the {@link @GlobalScope.fposmod} of this vector's components and `modv`'s components.
   */
  posmodv(modv: Vector4): Vector4;
  /**
   * Returns a new vector with all components rounded to the nearest integer, with halfway cases rounded away from zero.
   */
  round(): Vector4;
  /**
   * Returns a new vector with each component set to `1.0` if it's positive, `-1.0` if it's negative, and `0.0` if it's zero. The result is identical to calling {@link @GlobalScope.sign} on each component.
   */
  sign(): Vector4;
  /**
   * Returns a new vector with each component snapped to the nearest multiple of the corresponding component in `step`. This can also be used to round the components to an arbitrary number of decimals.
   */
  snapped(step: Vector4): Vector4;
  /**
   * Returns a new vector with each component snapped to the nearest multiple of `step`. This can also be used to round the components to an arbitrary number of decimals.
   */
  snappedf(step: float): Vector4;

  // Operator overloads
  [__ops_ne]: { right: Vector4; ret: boolean };
  [__ops_mul]: { right: Projection; ret: Vector4 } | { right: Vector4; ret: Vector4 } | { right: float; ret: Vector4 } | { right: int; ret: Vector4 };
  [__ops_add]: { right: Vector4; ret: Vector4 };
  [__ops_sub]: { right: Vector4; ret: Vector4 };
  [__ops_div]: { right: Vector4; ret: Vector4 } | { right: float; ret: Vector4 } | { right: int; ret: Vector4 };
  [__ops_lt]: { right: Vector4; ret: boolean };
  [__ops_lte]: { right: Vector4; ret: boolean };
  [__ops_eq]: { right: Vector4; ret: boolean };
  [__ops_gt]: { right: Vector4; ret: boolean };
  [__ops_gte]: { right: Vector4; ret: boolean };
  [__ops_plus]: { ret: Vector4 };
  [__ops_minus]: { ret: Vector4 };

  [__variant_converts]: Vector4 | Vector4i;

  // Dictionary method overrides (prevent Object interface leaking)
  assign: never;
  clear: never;
  duplicate: never;
  duplicate_deep: never;
  erase: never;
  find_key: never;
  get: never;
  get_or_add: never;
  get_typed_key_builtin: never;
  get_typed_key_class_name: never;
  get_typed_key_script: never;
  get_typed_value_builtin: never;
  get_typed_value_class_name: never;
  get_typed_value_script: never;
  has: never;
  has_all: never;
  hash: never;
  is_empty: never;
  is_read_only: never;
  is_same_typed: never;
  is_same_typed_key: never;
  is_same_typed_value: never;
  is_typed: never;
  is_typed_key: never;
  is_typed_value: never;
  keys: never;
  make_read_only: never;
  merge: never;
  merged: never;
  recursive_equal: never;
  set: never;
  size: never;
  sort: never;
  values: never;
}

declare interface Vector4Constructor {
  readonly prototype: Vector4;
  /** Constructs a default-initialized {@link Vector4} with all components set to `0`. */
  (): Vector4;
  /** Constructs a {@link Vector4} as a copy of the given {@link Vector4}. */
  (from_: Vector4): Vector4;
  /** Constructs a new {@link Vector4} from the given {@link Vector4i}. */
  (from_: Vector4i): Vector4;
  /** Returns a {@link Vector4} with the given components. */
  (x: float, y: float, z: float, w: float): Vector4;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_Y: int;
  /** Enumerated value for the Z axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_Z: int;
  /** Enumerated value for the W axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_W: int;

  /** Zero vector, a vector with all components set to `0`. */
  readonly ZERO: Vector4;
  /** One vector, a vector with all components set to `1`. */
  readonly ONE: Vector4;
  /** Infinity vector, a vector with all components set to {@link @GDScript.INF}. */
  readonly INF: Vector4;
}
declare const Vector4: Vector4Constructor;
