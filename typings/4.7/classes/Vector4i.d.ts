// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 4D vector using integer coordinates. */
declare class Vector4i {
  /** The vector's W component. Also accessible by using the index position `[3]`. */
  w: int;
  /** The vector's X component. Also accessible by using the index position `[0]`. */
  x: int;
  /** The vector's Y component. Also accessible by using the index position `[1]`. */
  y: int;
  /** The vector's Z component. Also accessible by using the index position `[2]`. */
  z: int;

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector4i;
  /**
   * Returns a new vector with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min: Vector4i, max: Vector4i): Vector4i;
  /**
   * Returns a new vector with all components clamped between `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clampi(min: int, max: int): Vector4i;
  /**
   * Returns the squared distance between this vector and `to`.
   * This method runs faster than {@link distance_to}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  distance_squared_to(to: Vector4i): int;
  /** Returns the distance between this vector and `to`. */
  distance_to(to: Vector4i): float;
  /** Returns the length (magnitude) of this vector. */
  length(): float;
  /**
   * Returns the squared length (squared magnitude) of this vector.
   * This method runs faster than {@link length}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  length_squared(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector4i(maxi(x, with.x), maxi(y, with.y), maxi(z, with.z), maxi(w, with.w))`.
   */
  max(with_: Vector4i): Vector4i;
  /**
   * Returns the axis of the vector's highest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_X}.
   */
  max_axis_index(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector4i(maxi(x, with), maxi(y, with), maxi(z, with), maxi(w, with))`.
   */
  maxi(with_: int): Vector4i;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector4i(mini(x, with.x), mini(y, with.y), mini(z, with.z), mini(w, with.w))`.
   */
  min(with_: Vector4i): Vector4i;
  /**
   * Returns the axis of the vector's lowest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_W}.
   */
  min_axis_index(): int;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector4i(mini(x, with), mini(y, with), mini(z, with), mini(w, with))`.
   */
  mini(with_: int): Vector4i;
  /**
   * Returns a new vector with each component set to `1` if it's positive, `-1` if it's negative, and `0` if it's zero. The result is identical to calling {@link @GlobalScope.sign} on each component.
   */
  sign(): Vector4i;
  /**
   * Returns a new vector with each component snapped to the closest multiple of the corresponding component in `step`.
   */
  snapped(step: Vector4i): Vector4i;
  /** Returns a new vector with each component snapped to the closest multiple of `step`. */
  snappedi(step: int): Vector4i;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_Y: int;
  /** Enumerated value for the Z axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_Z: int;
  /** Enumerated value for the W axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_W: int;

  /** Zero vector, a vector with all components set to `0`. */
  static readonly ZERO: int;
  /** One vector, a vector with all components set to `1`. */
  static readonly ONE: int;
  /**
   * Min vector, a vector with all components equal to `INT32_MIN`. Can be used as a negative integer equivalent of {@link Vector4.INF}.
   */
  static readonly MIN: int;
  /**
   * Max vector, a vector with all components equal to `INT32_MAX`. Can be used as an integer equivalent of {@link Vector4.INF}.
   */
  static readonly MAX: int;

  // Operator overloads
  [__ne]: { right: Vector4i; ret: boolean };
  [__mul]: { right: Vector4i; ret: Vector4i } | { right: float; ret: Vector4 } | { right: int; ret: Vector4i };
  [__add]: { right: Vector4i; ret: Vector4i };
  [__sub]: { right: Vector4i; ret: Vector4i };
  [__div]: { right: Vector4i; ret: Vector4i } | { right: float; ret: Vector4 } | { right: int; ret: Vector4i };
  [__lt]: { right: Vector4i; ret: boolean };
  [__lte]: { right: Vector4i; ret: boolean };
  [__eq]: { right: Vector4i; ret: boolean };
  [__gt]: { right: Vector4i; ret: boolean };
  [__gte]: { right: Vector4i; ret: boolean };
  [__plus]: { ret: Vector4i };
  [__minus]: { ret: Vector4i };
}
