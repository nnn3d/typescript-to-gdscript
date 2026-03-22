// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides methods for some common 3D geometric operations. */
declare interface Geometry3D extends GodotObject {
  /**
   * Returns an array with 6 {@link Plane}s that describe the sides of a box centered at the origin. The box size is defined by `extents`, which represents one (positive) corner of the box (i.e. half its actual size).
   */
  build_box_planes(extents: Vector3): unknown;
  /**
   * Returns an array of {@link Plane}s closely bounding a faceted capsule centered at the origin with radius `radius` and height `height`. The parameter `sides` defines how many planes will be generated for the side part of the capsule, whereas `lats` gives the number of latitudinal steps at the bottom and top of the capsule. The parameter `axis` describes the axis along which the capsule is oriented (0 for X, 1 for Y, 2 for Z).
   */
  build_capsule_planes(radius: float, height: float, sides: int, lats: int, axis: int): unknown;
  /**
   * Returns an array of {@link Plane}s closely bounding a faceted cylinder centered at the origin with radius `radius` and height `height`. The parameter `sides` defines how many planes will be generated for the round part of the cylinder. The parameter `axis` describes the axis along which the cylinder is oriented (0 for X, 1 for Y, 2 for Z).
   */
  build_cylinder_planes(radius: float, height: float, sides: int, axis: int): unknown;
  /**
   * Clips the polygon defined by the points in `points` against the `plane` and returns the points of the clipped polygon.
   */
  clip_polygon(points: PackedVector3Array, plane: Plane): PackedVector3Array;
  /** Calculates and returns all the vertex points of a convex shape defined by an array of `planes`. */
  compute_convex_mesh_points(planes: unknown): PackedVector3Array;
  /**
   * Returns the 3D point on the 3D segment (`s1`, `s2`) that is closest to `point`. The returned point will always be inside the specified segment.
   */
  get_closest_point_to_segment(point: Vector3, s1: Vector3, s2: Vector3): Vector3;
  /**
   * Returns the 3D point on the 3D line defined by (`s1`, `s2`) that is closest to `point`. The returned point can be inside the segment (`s1`, `s2`) or outside of it, i.e. somewhere on the line extending from the segment.
   */
  get_closest_point_to_segment_uncapped(point: Vector3, s1: Vector3, s2: Vector3): Vector3;
  /**
   * Given the two 3D segments (`p1`, `p2`) and (`q1`, `q2`), finds those two points on the two segments that are closest to each other. Returns a {@link PackedVector3Array} that contains this point on (`p1`, `p2`) as well the accompanying point on (`q1`, `q2`).
   */
  get_closest_points_between_segments(p1: Vector3, p2: Vector3, q1: Vector3, q2: Vector3): PackedVector3Array;
  /**
   * Returns a {@link Vector3} containing weights based on how close a 3D position (`point`) is to a triangle's different vertices (`a`, `b` and `c`). This is useful for interpolating between the data of different vertices in a triangle. One example use case is using this to smoothly rotate over a mesh instead of relying solely on face normals.
   * Here is a more detailed explanation of barycentric coordinates. (https://en.wikipedia.org/wiki/Barycentric_coordinate_system)
   */
  get_triangle_barycentric_coords(point: Vector3, a: Vector3, b: Vector3, c: Vector3): Vector3;
  /**
   * Tests if the 3D ray starting at `from` with the direction of `dir` intersects the triangle specified by `a`, `b` and `c`. If yes, returns the point of intersection as {@link Vector3}. If no intersection takes place, returns `null`.
   */
  ray_intersects_triangle(from_: Vector3, dir: Vector3, a: Vector3, b: Vector3, c: Vector3): unknown;
  /**
   * Given a convex hull defined though the {@link Plane}s in the array `planes`, tests if the segment (`from`, `to`) intersects with that hull. If an intersection is found, returns a {@link PackedVector3Array} containing the point the intersection and the hull's normal. Otherwise, returns an empty array.
   */
  segment_intersects_convex(from_: Vector3, to: Vector3, planes: unknown): PackedVector3Array;
  /**
   * Checks if the segment (`from`, `to`) intersects the cylinder with height `height` that is centered at the origin and has radius `radius`. If no, returns an empty {@link PackedVector3Array}. If an intersection takes place, the returned array contains the point of intersection and the cylinder's normal at the point of intersection.
   */
  segment_intersects_cylinder(from_: Vector3, to: Vector3, height: float, radius: float): PackedVector3Array;
  /**
   * Checks if the segment (`from`, `to`) intersects the sphere that is located at `sphere_position` and has radius `sphere_radius`. If no, returns an empty {@link PackedVector3Array}. If yes, returns a {@link PackedVector3Array} containing the point of intersection and the sphere's normal at the point of intersection.
   */
  segment_intersects_sphere(from_: Vector3, to: Vector3, sphere_position: Vector3, sphere_radius: float): PackedVector3Array;
  /**
   * Tests if the segment (`from`, `to`) intersects the triangle `a`, `b`, `c`. If yes, returns the point of intersection as {@link Vector3}. If no intersection takes place, returns `null`.
   */
  segment_intersects_triangle(from_: Vector3, to: Vector3, a: Vector3, b: Vector3, c: Vector3): unknown;
  /**
   * Tetrahedralizes the volume specified by a discrete set of `points` in 3D space, ensuring that no point lies within the circumsphere of any resulting tetrahedron. The method returns a {@link PackedInt32Array} where each tetrahedron consists of four consecutive point indices into the `points` array (resulting in an array with `n * 4` elements, where `n` is the number of tetrahedra found). If the tetrahedralization is unsuccessful, an empty {@link PackedInt32Array} is returned.
   */
  tetrahedralize_delaunay(points: PackedVector3Array): PackedInt32Array;
}
declare const Geometry3D: Geometry3D;

