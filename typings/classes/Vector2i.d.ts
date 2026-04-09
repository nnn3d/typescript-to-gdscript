// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D vector using integer coordinates. */
declare interface Vector2i {
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

  // Operator overloads
  [__ops_ne]: { right: Vector2i; ret: boolean };
  [__ops_rem]: { right: Vector2i; ret: Vector2i } | { right: int; ret: Vector2i };
  [__ops_mul]: { right: Vector2i; ret: Vector2i } | { right: float; ret: Vector2 } | { right: int; ret: Vector2i };
  [__ops_add]: { right: Vector2i; ret: Vector2i };
  [__ops_sub]: { right: Vector2i; ret: Vector2i };
  [__ops_div]: { right: Vector2i; ret: Vector2i } | { right: float; ret: Vector2 } | { right: int; ret: Vector2i };
  [__ops_lt]: { right: Vector2i; ret: boolean };
  [__ops_lte]: { right: Vector2i; ret: boolean };
  [__ops_eq]: { right: Vector2i; ret: boolean };
  [__ops_gt]: { right: Vector2i; ret: boolean };
  [__ops_gte]: { right: Vector2i; ret: boolean };
  [__ops_plus]: { ret: Vector2i };
  [__ops_minus]: { ret: Vector2i };

  [__variant_converts]: Vector2i | Vector2;

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

declare interface Vector2iConstructor {
  readonly prototype: Vector2i;
  /** Constructs a default-initialized {@link Vector2i} with all components set to `0`. */
  (): Vector2i;
  /** Constructs a {@link Vector2i} as a copy of the given {@link Vector2i}. */
  (from_: Vector2i): Vector2i;
  /**
   * Constructs a new {@link Vector2i} from the given {@link Vector2} by truncating components' fractional parts (rounding towards zero). For a different behavior consider passing the result of {@link Vector2.ceil}, {@link Vector2.floor} or {@link Vector2.round} to this constructor instead.
   */
  (from_: Vector2): Vector2i;
  /** Constructs a new {@link Vector2i} from the given `x` and `y`. */
  (x: int, y: int): Vector2i;

  // enum Axis
  /** Enumerated value for the X axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_X: int;
  /** Enumerated value for the Y axis. Returned by {@link max_axis_index} and {@link min_axis_index}. */
  readonly AXIS_Y: int;

  /** Zero vector, a vector with all components set to `0`. */
  readonly ZERO: Vector2i;
  /** One vector, a vector with all components set to `1`. */
  readonly ONE: Vector2i;
  /**
   * Min vector, a vector with all components equal to `INT32_MIN`. Can be used as a negative integer equivalent of {@link Vector2.INF}.
   */
  readonly MIN: Vector2i;
  /**
   * Max vector, a vector with all components equal to `INT32_MAX`. Can be used as an integer equivalent of {@link Vector2.INF}.
   */
  readonly MAX: Vector2i;
  /** Left unit vector. Represents the direction of left. */
  readonly LEFT: Vector2i;
  /** Right unit vector. Represents the direction of right. */
  readonly RIGHT: Vector2i;
  /** Up unit vector. Y is down in 2D, so this vector points -Y. */
  readonly UP: Vector2i;
  /** Down unit vector. Y is down in 2D, so this vector points +Y. */
  readonly DOWN: Vector2i;
}
declare const Vector2i: Vector2iConstructor;
