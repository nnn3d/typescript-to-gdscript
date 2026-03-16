// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D vector using integer coordinates. */
declare class Vector2i {
  /** The vector's X component. Also accessible by using the index position `[0]`. */
  x: int;
  /** The vector's Y component. Also accessible by using the index position `[1]`. */
  y: int;

  /** Returns a new vector with all components in absolute values (i.e. positive). */
  abs(): Vector2i;
  /** Returns the aspect ratio of this vector, the ratio of {@link x} to {@link y}. */
  aspect(): float;
  /**
   * Returns a new vector with all components clamped between the components of `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clamp(min: Vector2i, max: Vector2i): Vector2i;
  /**
   * Returns a new vector with all components clamped between `min` and `max`, by running {@link @GlobalScope.clamp} on each component.
   */
  clampi(min: int, max: int): Vector2i;
  /**
   * Returns the squared distance between this vector and `to`.
   * This method runs faster than {@link distance_to}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  distance_squared_to(to: Vector2i): int;
  /** Returns the distance between this vector and `to`. */
  distance_to(to: Vector2i): float;
  /** Returns the length (magnitude) of this vector. */
  length(): float;
  /**
   * Returns the squared length (squared magnitude) of this vector.
   * This method runs faster than {@link length}, so prefer it if you need to compare vectors or need the squared distance for some formula.
   */
  length_squared(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector2i(maxi(x, with.x), maxi(y, with.y))`.
   */
  max(with_: Vector2i): Vector2i;
  /**
   * Returns the axis of the vector's highest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_X}.
   */
  max_axis_index(): int;
  /**
   * Returns the component-wise maximum of this and `with`, equivalent to `Vector2i(maxi(x, with), maxi(y, with))`.
   */
  maxi(with_: int): Vector2i;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector2i(mini(x, with.x), mini(y, with.y))`.
   */
  min(with_: Vector2i): Vector2i;
  /**
   * Returns the axis of the vector's lowest value. See `AXIS_*` constants. If all components are equal, this method returns {@link AXIS_Y}.
   */
  min_axis_index(): int;
  /**
   * Returns the component-wise minimum of this and `with`, equivalent to `Vector2i(mini(x, with), mini(y, with))`.
   */
  mini(with_: int): Vector2i;
  /**
   * Returns a new vector with each component set to `1` if it's positive, `-1` if it's negative, and `0` if it's zero. The result is identical to calling {@link @GlobalScope.sign} on each component.
   */
  sign(): Vector2i;
  /**
   * Returns a new vector with each component snapped to the closest multiple of the corresponding component in `step`.
   */
  snapped(step: Vector2i): Vector2i;
  /** Returns a new vector with each component snapped to the closest multiple of `step`. */
  snappedi(step: int): Vector2i;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  static readonly AXIS_Y: int;

  /** Zero vector, a vector with all components set to `0`. */
  static readonly ZERO: int;
  /** One vector, a vector with all components set to `1`. */
  static readonly ONE: int;
  /**
   * Min vector, a vector with all components equal to `INT32_MIN`. Can be used as a negative integer equivalent of {@link Vector2.INF}.
   */
  static readonly MIN: int;
  /**
   * Max vector, a vector with all components equal to `INT32_MAX`. Can be used as an integer equivalent of {@link Vector2.INF}.
   */
  static readonly MAX: int;
  /** Left unit vector. Represents the direction of left. */
  static readonly LEFT: int;
  /** Right unit vector. Represents the direction of right. */
  static readonly RIGHT: int;
  /** Up unit vector. Y is down in 2D, so this vector points -Y. */
  static readonly UP: int;
  /** Down unit vector. Y is down in 2D, so this vector points +Y. */
  static readonly DOWN: int;

  // Operator overloads
  [__ne]: { right: Vector2i; ret: boolean };
  [__mul]: { right: Vector2i; ret: Vector2i } | { right: float; ret: Vector2 } | { right: int; ret: Vector2i };
  [__add]: { right: Vector2i; ret: Vector2i };
  [__sub]: { right: Vector2i; ret: Vector2i };
  [__div]: { right: Vector2i; ret: Vector2i } | { right: float; ret: Vector2 } | { right: int; ret: Vector2i };
  [__lt]: { right: Vector2i; ret: boolean };
  [__lte]: { right: Vector2i; ret: boolean };
  [__eq]: { right: Vector2i; ret: boolean };
  [__gt]: { right: Vector2i; ret: boolean };
  [__gte]: { right: Vector2i; ret: boolean };
  [__plus]: { ret: Vector2i };
  [__minus]: { ret: Vector2i };
}
