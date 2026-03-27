// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A plane in Hessian normal form. */
declare interface Plane {
  /**
   * The distance from the origin to the plane, expressed in terms of {@link normal} (according to its direction and magnitude). Actual absolute distance from the origin to the plane can be calculated as `abs(d) / normal.length()` (if {@link normal} has zero length then this {@link Plane} does not represent a valid plane).
   * In the scalar equation of the plane `ax + by + cz = d`, this is [code skip-lint]d[/code], while the `(a, b, c)` coordinates are represented by the {@link normal} property.
   */
  d: float;
  /**
   * The normal of the plane, typically a unit vector. Shouldn't be a zero vector as {@link Plane} with such {@link normal} does not represent a valid plane.
   * In the scalar equation of the plane `ax + by + cz = d`, this is the vector `(a, b, c)`, where [code skip-lint]d[/code] is the {@link d} property.
   */
  normal: Vector3;
  /** The X component of the plane's {@link normal} vector. */
  x: float;
  /** The Y component of the plane's {@link normal} vector. */
  y: float;
  /** The Z component of the plane's {@link normal} vector. */
  z: float;

  /**
   * Returns the shortest distance from the plane to the position `point`. If the point is above the plane, the distance will be positive. If below, the distance will be negative.
   */
  distance_to(point: Vector3): float;
  /** Returns the center of the plane. */
  get_center(): Vector3;
  /**
   * Returns `true` if `point` is inside the plane. Comparison uses a custom minimum `tolerance` threshold.
   */
  has_point(point: Vector3, tolerance?: float): boolean;
  /**
   * Returns the intersection point of the three planes `b`, `c` and this plane. If no intersection is found, `null` is returned.
   */
  intersect_3(b: Plane, c: Plane): unknown;
  /**
   * Returns the intersection point of a ray consisting of the position `from` and the direction normal `dir` with this plane. If no intersection is found, `null` is returned.
   */
  intersects_ray(from_: Vector3, dir: Vector3): unknown;
  /**
   * Returns the intersection point of a segment from position `from` to position `to` with this plane. If no intersection is found, `null` is returned.
   */
  intersects_segment(from_: Vector3, to: Vector3): unknown;
  /**
   * Returns `true` if this plane and `to_plane` are approximately equal, by running {@link @GlobalScope.is_equal_approx} on each component.
   */
  is_equal_approx(to_plane: Plane): boolean;
  /**
   * Returns `true` if this plane is finite, by calling {@link @GlobalScope.is_finite} on each component.
   */
  is_finite(): boolean;
  /** Returns `true` if `point` is located above the plane. */
  is_point_over(point: Vector3): boolean;
  /**
   * Returns a copy of the plane, with normalized {@link normal} (so it's a unit vector). Returns `Plane(0, 0, 0, 0)` if {@link normal} can't be normalized (it has zero length).
   */
  normalized(): Plane;
  /** Returns the orthogonal projection of `point` into a point in the plane. */
  project(point: Vector3): Vector3;

  // Operator overloads
  [__ne]: { right: Plane; ret: boolean };
  [__mul]: { right: Transform3D; ret: Plane };
  [__eq]: { right: Plane; ret: boolean };
  [__plus]: { ret: Plane };
  [__minus]: { ret: Plane };

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

declare interface PlaneConstructor {
  /** Constructs a default-initialized {@link Plane} with all components set to `0`. */
  (): Plane;
  /** Constructs a {@link Plane} as a copy of the given {@link Plane}. */
  (from_: Plane): Plane;
  /**
   * Creates a plane from the four parameters. The three components of the resulting plane's {@link normal} are `a`, `b` and `c`, and the plane has a distance of `d` from the origin.
   */
  (a: float, b: float, c: float, d: float): Plane;
  /**
   * Creates a plane from the normal vector. The plane will intersect the origin.
   * The `normal` of the plane must be a unit vector.
   */
  (normal: Vector3): Plane;
  /**
   * Creates a plane from the normal vector and the plane's distance from the origin.
   * The `normal` of the plane must be a unit vector.
   */
  (normal: Vector3, d: float): Plane;
  /**
   * Creates a plane from the normal vector and a point on the plane.
   * The `normal` of the plane must be a unit vector.
   */
  (normal: Vector3, point: Vector3): Plane;
  /** Creates a plane from the three points, given in clockwise order. */
  (point1: Vector3, point2: Vector3, point3: Vector3): Plane;

  /** A plane that extends in the Y and Z axes (normal vector points +X). */
  readonly PLANE_YZ: Plane;
  /** A plane that extends in the X and Z axes (normal vector points +Y). */
  readonly PLANE_XZ: Plane;
  /** A plane that extends in the X and Y axes (normal vector points +Z). */
  readonly PLANE_XY: Plane;
}
declare const Plane: PlaneConstructor;
