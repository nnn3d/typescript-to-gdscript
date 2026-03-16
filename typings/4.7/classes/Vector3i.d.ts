// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D vector using integer coordinates. */
declare class Vector3i {
  /** The vector's X component. Also accessible by using the index position `[0]`. */
  x: int;
  /** The vector's Y component. Also accessible by using the index position `[1]`. */
  y: int;
  /** The vector's Z component. Also accessible by using the index position `[2]`. */
  z: int;

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector3i;
  /**
   * Returns a new vector with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min: Vector3i, max: Vector3i): Vector3i;
  /**
   * Returns a new vector with all components clamped between `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clampi(min: int, max: int): Vector3i;
  /**
   * Returns the squared distance between this vector and `to`.
   * This method runs faster than {@link distance_to}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  distance_squared_to(to: Vector3i): int;
  /** Returns the distance between this vector and `to`. */
  distance_to(to: Vector3i): float;
  /** Returns the length (magnitude) of this vector. */
  length(): float;
  /**
   * Returns the squared length (squared magnitude) of this vector.
   * This method runs faster than {@link length}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  length_squared(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector3i(maxi(x, with.x), maxi(y, with.y), maxi(z, with.z))`.
   */
  max(with_: Vector3i): Vector3i;
  /**
   * Returns the axis of the vector's highest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_X}.
   */
  max_axis_index(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector3i(maxi(x, with), maxi(y, with), maxi(z, with))`.
   */
  maxi(with_: int): Vector3i;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector3i(mini(x, with.x), mini(y, with.y), mini(z, with.z))`.
   */
  min(with_: Vector3i): Vector3i;
  /**
   * Returns the axis of the vector's lowest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_Z}.
   */
  min_axis_index(): int;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector3i(mini(x, with), mini(y, with), mini(z, with))`.
   */
  mini(with_: int): Vector3i;
  /**
   * Returns a new vector with each component set to `1` if it's positive, `-1` if it's negative, and `0` if it's zero. The result is identical to calling {@link @GlobalScope.sign} on each component.
   */
  sign(): Vector3i;
  /**
   * Returns a new vector with each component snapped to the closest multiple of the corresponding component in `step`.
   */
  snapped(step: Vector3i): Vector3i;
  /** Returns a new vector with each component snapped to the closest multiple of `step`. */
  snappedi(step: int): Vector3i;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_Y: int;
  /** Enumerated value for the Z axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_Z: int;

  /** Zero vector, a vector with all components set to `0`. */
  static readonly ZERO: int;
  /** One vector, a vector with all components set to `1`. */
  static readonly ONE: int;
  /**
   * Min vector, a vector with all components equal to `INT32_MIN`. Can be used as a negative integer equivalent of {@link Vector3.INF}.
   */
  static readonly MIN: int;
  /**
   * Max vector, a vector with all components equal to `INT32_MAX`. Can be used as an integer equivalent of {@link Vector3.INF}.
   */
  static readonly MAX: int;
  /** Left unit vector. Represents the local direction of left, and the global direction of west. */
  static readonly LEFT: int;
  /** Right unit vector. Represents the local direction of right, and the global direction of east. */
  static readonly RIGHT: int;
  /** Up unit vector. */
  static readonly UP: int;
  /** Down unit vector. */
  static readonly DOWN: int;
  /** Forward unit vector. Represents the local direction of forward, and the global direction of north. */
  static readonly FORWARD: int;
  /** Back unit vector. Represents the local direction of back, and the global direction of south. */
  static readonly BACK: int;

  // Operator overloads
  [__ne]: { right: Vector3i; ret: boolean };
  [__mul]: { right: Vector3i; ret: Vector3i } | { right: float; ret: Vector3 } | { right: int; ret: Vector3i };
  [__add]: { right: Vector3i; ret: Vector3i };
  [__sub]: { right: Vector3i; ret: Vector3i };
  [__div]: { right: Vector3i; ret: Vector3i } | { right: float; ret: Vector3 } | { right: int; ret: Vector3i };
  [__lt]: { right: Vector3i; ret: boolean };
  [__lte]: { right: Vector3i; ret: boolean };
  [__eq]: { right: Vector3i; ret: boolean };
  [__gt]: { right: Vector3i; ret: boolean };
  [__gte]: { right: Vector3i; ret: boolean };
  [__plus]: { ret: Vector3i };
  [__minus]: { ret: Vector3i };
}
