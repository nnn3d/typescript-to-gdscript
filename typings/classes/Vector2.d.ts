// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A 2D vector using floating-point coordinates. */
declare interface Vector2 {
  /** The vector's X component. Also accessible by using the index position `[0]`. */
  x: float;
  /** The vector's Y component. Also accessible by using the index position `[1]`. */
  y: float;

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector2;
  /**
   * Returns this vector's angle with respect to the positive X axis, or `(1, 0)` vector, in radians.
   * For example, `Vector2.RIGHT.angle()` will return zero, `Vector2.DOWN.angle()` will return `PI / 2` (a quarter turn, or 90 degrees), and `Vector2(1, -1).angle()` will return `-PI / 4` (a negative eighth turn, or -45 degrees).
   * This is equivalent to calling {@link @GlobalScope.atan2} with {@link y} and {@link x}.
   * Illustration of the returned angle. (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle.png)
   */
  angle(): float;
  /**
   * Returns the signed angle to the given vector, in radians. The result ranges from `-PI` to `PI` (inclusive).
   * Illustration of the returned angle. (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to.png)
   */
  angle_to(to: Vector2 | Vector2i): float;
  /**
   * Returns the signed angle between the X axis and the line from this vector to point `to`, in radians. The result ranges from `-PI` to `PI` (inclusive).
   * `a.angle_to_point(b)` is equivalent to `(b - a).angle()`. See also {@link angle}.
   * Illustration of the returned angle. (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/vector2_angle_to_point.png)
   */
  angle_to_point(to: Vector2 | Vector2i): float;
  /** Returns this vector's aspect ratio, which is {@link x} divided by {@link y}. */
  aspect(): float;
  /**
   * Returns the derivative at the given `t` on the Bézier curve (https://en.wikipedia.org/wiki/B%C3%A9zier_curve) defined by this vector and the given `control_1`, `control_2`, and `end` points.
   */
  bezier_derivative(control_1: Vector2 | Vector2i, control_2: Vector2 | Vector2i, end: Vector2 | Vector2i, t: float): Vector2;
  /**
   * Returns the point at the given `t` on the Bézier curve (https://en.wikipedia.org/wiki/B%C3%A9zier_curve) defined by this vector and the given `control_1`, `control_2`, and `end` points.
   */
  bezier_interpolate(control_1: Vector2 | Vector2i, control_2: Vector2 | Vector2i, end: Vector2 | Vector2i, t: float): Vector2;
  /**
   * Returns the vector "bounced off" from a line defined by the given normal `n` perpendicular to the line.
   * **Note:** {@link bounce} performs the operation that most engines and frameworks call [code skip-lint]reflect()[/code].
   */
  bounce(n: Vector2 | Vector2i): Vector2;
  /** Returns a new vector with all components rounded up (towards positive infinity). */
  ceil(): Vector2;
  /**
   * Returns a new vector with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min: Vector2 | Vector2i, max: Vector2 | Vector2i): Vector2;
  /**
   * Returns a new vector with all components clamped between `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clampf(min: float, max: float): Vector2;
  /**
   * Returns the 2D analog of the cross product for this vector and `with`.
   * This is the signed area of the parallelogram formed by the two vectors. If the second vector is clockwise from the first vector, then the cross product is the positive area. If counter-clockwise, the cross product is the negative area. If the two vectors are parallel this returns zero, making it useful for testing if two vectors are parallel.
   * **Note:** Cross product is not defined in 2D mathematically. This method embeds the 2D vectors in the XY plane of 3D space and uses their cross product's Z component as the analog.
   */
  cross(with_: Vector2 | Vector2i): float;
  /**
   * Performs a cubic interpolation between this vector and `b` using `pre_a` and `post_b` as handles, and returns the result at position `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
   */
  cubic_interpolate(b: Vector2 | Vector2i, pre_a: Vector2 | Vector2i, post_b: Vector2 | Vector2i, weight: float): Vector2;
  /**
   * Performs a cubic interpolation between this vector and `b` using `pre_a` and `post_b` as handles, and returns the result at position `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
   * It can perform smoother interpolation than {@link cubic_interpolate} by the time values.
   */
  cubic_interpolate_in_time(b: Vector2 | Vector2i, pre_a: Vector2 | Vector2i, post_b: Vector2 | Vector2i, weight: float, b_t: float, pre_a_t: float, post_b_t: float): Vector2;
  /**
   * Returns the normalized vector pointing from this vector to `to`.
   * `a.direction_to(b)` is equivalent to `(b - a).normalized()`. See also {@link normalized}.
   */
  direction_to(to: Vector2 | Vector2i): Vector2;
  /**
   * Returns the squared distance between this vector and `to`.
   * This method runs faster than {@link distance_to}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  distance_squared_to(to: Vector2 | Vector2i): float;
  /** Returns the distance between this vector and `to`. */
  distance_to(to: Vector2 | Vector2i): float;
  /**
   * Returns the dot product of this vector and `with`. This can be used to compare the angle between two vectors. For example, this can be used to determine whether an enemy is facing the player.
   * The dot product will be `0` for a right angle (90 degrees), greater than 0 for angles narrower than 90 degrees and lower than 0 for angles wider than 90 degrees.
   * When using unit (normalized) vectors, the result will always be between `-1.0` (180 degree angle) when the vectors are facing opposite directions, and `1.0` (0 degree angle) when the vectors are aligned.
   * **Note:** `a.dot(b)` is equivalent to `b.dot(a)`.
   */
  dot(with_: Vector2 | Vector2i): float;
  /** Returns a new vector with all components rounded down (towards negative infinity). */
  floor(): Vector2;
  /**
   * Returns `true` if this vector and `to` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(to: Vector2 | Vector2i): boolean;
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
  lerp(to: Vector2 | Vector2i, weight: float): Vector2;
  /**
   * Returns the vector with a maximum length by limiting its length to `length`. If the vector is non-finite, the result is undefined.
   */
  limit_length(length?: float): Vector2;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector2(maxf(x, with.x), maxf(y, with.y))`.
   */
  max(with_: Vector2 | Vector2i): Vector2;
  /**
   * Returns the axis of the vector's highest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_X}.
   */
  max_axis_index(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector2(maxf(x, with), maxf(y, with))`.
   */
  maxf(with_: float): Vector2;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector2(minf(x, with.x), minf(y, with.y))`.
   */
  min(with_: Vector2 | Vector2i): Vector2;
  /**
   * Returns the axis of the vector's lowest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_Y}.
   */
  min_axis_index(): int;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector2(minf(x, with), minf(y, with))`.
   */
  minf(with_: float): Vector2;
  /**
   * Returns a new vector moved toward `to` by the fixed `delta` amount. Will not go past the final value.
   */
  move_toward(to: Vector2 | Vector2i, delta: float): Vector2;
  /**
   * Returns the result of scaling the vector to unit length. Equivalent to `v / v.length()`. Returns `(0, 0)` if `v.length() == 0`. See also {@link is_normalized}.
   * **Note:** This function may return incorrect values if the input vector length is near zero.
   */
  normalized(): Vector2;
  /**
   * Returns a perpendicular vector rotated 90 degrees counter-clockwise compared to the original, with the same length.
   */
  orthogonal(): Vector2;
  /**
   * Returns a vector composed of the {@link @GlobalScope.fposmod} of this vector's components and `mod`.
   */
  posmod(mod: float): Vector2;
  /**
   * Returns a vector composed of the {@link @GlobalScope.fposmod} of this vector's components and `modv`'s components.
   */
  posmodv(modv: Vector2 | Vector2i): Vector2;
  /**
   * Returns a new vector resulting from projecting this vector onto the given vector `b`. The resulting new vector is parallel to `b`. See also {@link slide}.
   * **Note:** If the vector `b` is a zero vector, the components of the resulting new vector will be {@link @GDScript.NAN}.
   */
  project(b: Vector2 | Vector2i): Vector2;
  /**
   * Returns the result of reflecting the vector from a line defined by the given direction vector `line`.
   * **Note:** {@link reflect} differs from what other engines and frameworks call [code skip-lint]reflect()[/code]. In other engines, [code skip-lint]reflect()[/code] takes a normal direction which is a direction perpendicular to the line. In Godot, you specify the direction of the line directly. See also {@link bounce} which does what most engines call [code skip-lint]reflect()[/code].
   */
  reflect(line: Vector2 | Vector2i): Vector2;
  /**
   * Returns the result of rotating this vector by `angle` (in radians). See also {@link @GlobalScope.deg_to_rad}.
   */
  rotated(angle: float): Vector2;
  /**
   * Returns a new vector with all components rounded to the nearest integer, with halfway cases rounded away from zero.
   */
  round(): Vector2;
  /**
   * Returns a new vector with each component set to `1.0` if it's positive, `-1.0` if it's negative, and `0.0` if it's zero. The result is identical to calling {@link @GlobalScope.sign} on each component.
   */
  sign(): Vector2;
  /**
   * Returns the result of spherical linear interpolation between this vector and `to`, by amount `weight`. `weight` is on the range of 0.0 to 1.0, representing the amount of interpolation.
   * This method also handles interpolating the lengths if the input vectors have different lengths. For the special case of one or both input vectors having zero length, this method behaves like {@link lerp}.
   */
  slerp(to: Vector2 | Vector2i, weight: float): Vector2;
  /**
   * Returns a new vector resulting from sliding this vector along a line with normal `n`. The resulting new vector is perpendicular to `n`, and is equivalent to this vector minus its projection on `n`. See also {@link project}.
   * **Note:** The vector `n` must be normalized. See also {@link normalized}.
   */
  slide(n: Vector2 | Vector2i): Vector2;
  /**
   * Returns a new vector with each component snapped to the nearest multiple of the corresponding component in `step`. This can also be used to round the components to an arbitrary number of decimals.
   */
  snapped(step: Vector2 | Vector2i): Vector2;
  /**
   * Returns a new vector with each component snapped to the nearest multiple of `step`. This can also be used to round the components to an arbitrary number of decimals.
   */
  snappedf(step: float): Vector2;

  // Operator overloads
  [__ops_ne]: { right: Vector2; ret: boolean };
  [__ops_mul]: { right: Transform2D; ret: Vector2 } | { right: Vector2; ret: Vector2 } | { right: float; ret: Vector2 } | { right: int; ret: Vector2 };
  [__ops_add]: { right: Vector2; ret: Vector2 };
  [__ops_sub]: { right: Vector2; ret: Vector2 };
  [__ops_div]: { right: Vector2; ret: Vector2 } | { right: float; ret: Vector2 } | { right: int; ret: Vector2 };
  [__ops_lt]: { right: Vector2; ret: boolean };
  [__ops_lte]: { right: Vector2; ret: boolean };
  [__ops_eq]: { right: Vector2; ret: boolean };
  [__ops_gt]: { right: Vector2; ret: boolean };
  [__ops_gte]: { right: Vector2; ret: boolean };
  [__ops_plus]: { ret: Vector2 };
  [__ops_minus]: { ret: Vector2 };

  [__variant_converts]: Vector2 | Vector2i;

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

declare interface Vector2Constructor {
  readonly prototype: Vector2;
  /** Constructs a default-initialized {@link Vector2} with all components set to `0`. */
  (): Vector2;
  /** Constructs a {@link Vector2} as a copy of the given {@link Vector2}. */
  (from_: Vector2): Vector2;
  /** Constructs a new {@link Vector2} from {@link Vector2i}. */
  (from_: Vector2i): Vector2;
  /** Constructs a new {@link Vector2} from the given `x` and `y`. */
  (x: float, y: float): Vector2;
  /**
   * Creates a {@link Vector2} rotated to the given `angle` in radians. This is equivalent to doing `Vector2(cos(angle), sin(angle))` or `Vector2.RIGHT.rotated(angle)`.
   * **Note:** The length of the returned {@link Vector2} is *approximately* `1.0`, but is is not guaranteed to be exactly `1.0` due to floating-point precision issues. Call {@link normalized} on the returned {@link Vector2} if you require a unit vector.
   */
  from_angle(angle: float): Vector2;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_Y: int;

  /** Zero vector, a vector with all components set to `0`. */
  readonly ZERO: Vector2;
  /** One vector, a vector with all components set to `1`. */
  readonly ONE: Vector2;
  /** Infinity vector, a vector with all components set to {@link @GDScript.INF}. */
  readonly INF: Vector2;
  /** Left unit vector. Represents the direction of left. */
  readonly LEFT: Vector2;
  /** Right unit vector. Represents the direction of right. */
  readonly RIGHT: Vector2;
  /** Up unit vector. Y is down in 2D, so this vector points -Y. */
  readonly UP: Vector2;
  /** Down unit vector. Y is down in 2D, so this vector points +Y. */
  readonly DOWN: Vector2;
}
declare const Vector2: Vector2Constructor;
