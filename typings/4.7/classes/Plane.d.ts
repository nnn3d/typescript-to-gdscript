// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A plane in Hessian normal form. */
declare class Plane {
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

  /** A plane that extends in the Y and Z axes (normal vector points +X). */
  static readonly PLANE_YZ: int;
  /** A plane that extends in the X and Z axes (normal vector points +Y). */
  static readonly PLANE_XZ: int;
  /** A plane that extends in the X and Y axes (normal vector points +Z). */
  static readonly PLANE_XY: int;

  // Operator overloads
  [__ne]: { right: Plane; ret: boolean };
  [__mul]: { right: Transform3D; ret: Plane };
  [__eq]: { right: Plane; ret: boolean };
  [__plus]: { ret: Plane };
  [__minus]: { ret: Plane };
}
