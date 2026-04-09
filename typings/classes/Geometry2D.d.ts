// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides methods for some common 2D geometric operations. */
declare interface Geometry2D extends GodotObject {
  /**
   * Returns the Bresenham line (https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm) between the `from` and `to` points. A Bresenham line is a series of pixels that draws a line and is always 1-pixel thick on every row and column of the drawing (never more, never less).
   * Example code to draw a line between two {@link Marker2D} nodes using a series of {@link CanvasItem.draw_rect} calls:
   */
  bresenham_line(from_: Vector2i | Vector2, to: Vector2i | Vector2): Array<Vector2i>;
  /**
   * Clips `polygon_a` against `polygon_b` and returns an array of clipped polygons. This performs {@link OPERATION_DIFFERENCE} between polygons. Returns an empty array if `polygon_b` completely overlaps `polygon_a`.
   * If `polygon_b` is enclosed by `polygon_a`, returns an outer polygon (boundary) and inner polygon (hole) which could be distinguished by calling {@link is_polygon_clockwise}.
   */
  clip_polygons(polygon_a: PackedVector2Array | Array<unknown>, polygon_b: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Clips `polyline` against `polygon` and returns an array of clipped polylines. This performs {@link OPERATION_DIFFERENCE} between the polyline and the polygon. This operation can be thought of as cutting a line with a closed shape.
   */
  clip_polyline_with_polygon(polyline: PackedVector2Array | Array<unknown>, polygon: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Given an array of {@link Vector2}s, returns the convex hull as a list of points in counterclockwise order. The last point is the same as the first one.
   */
  convex_hull(points: PackedVector2Array | Array<unknown>): PackedVector2Array;
  /**
   * Decomposes the `polygon` into multiple convex hulls and returns an array of {@link PackedVector2Array}.
   */
  decompose_polygon_in_convex(polygon: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Mutually excludes common area defined by intersection of `polygon_a` and `polygon_b` (see {@link intersect_polygons}) and returns an array of excluded polygons. This performs {@link OPERATION_XOR} between polygons. In other words, returns all but common area between polygons.
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling {@link is_polygon_clockwise}.
   */
  exclude_polygons(polygon_a: PackedVector2Array | Array<unknown>, polygon_b: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Returns the 2D point on the 2D segment (`s1`, `s2`) that is closest to `point`. The returned point will always be inside the specified segment.
   */
  get_closest_point_to_segment(point: Vector2 | Vector2i, s1: Vector2 | Vector2i, s2: Vector2 | Vector2i): Vector2;
  /**
   * Returns the 2D point on the 2D line defined by (`s1`, `s2`) that is closest to `point`. The returned point can be inside the segment (`s1`, `s2`) or outside of it, i.e. somewhere on the line extending from the segment.
   */
  get_closest_point_to_segment_uncapped(point: Vector2 | Vector2i, s1: Vector2 | Vector2i, s2: Vector2 | Vector2i): Vector2;
  /**
   * Given the two 2D segments (`p1`, `q1`) and (`p2`, `q2`), finds those two points on the two segments that are closest to each other. Returns a {@link PackedVector2Array} that contains this point on (`p1`, `q1`) as well the accompanying point on (`p2`, `q2`).
   */
  get_closest_points_between_segments(p1: Vector2 | Vector2i, q1: Vector2 | Vector2i, p2: Vector2 | Vector2i, q2: Vector2 | Vector2i): PackedVector2Array;
  /**
   * Intersects `polygon_a` with `polygon_b` and returns an array of intersected polygons. This performs {@link OPERATION_INTERSECTION} between polygons. In other words, returns common area shared by polygons. Returns an empty array if no intersection occurs.
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling {@link is_polygon_clockwise}.
   */
  intersect_polygons(polygon_a: PackedVector2Array | Array<unknown>, polygon_b: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Intersects `polyline` with `polygon` and returns an array of intersected polylines. This performs {@link OPERATION_INTERSECTION} between the polyline and the polygon. This operation can be thought of as chopping a line with a closed shape.
   */
  intersect_polyline_with_polygon(polyline: PackedVector2Array | Array<unknown>, polygon: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Returns `true` if `point` is inside the circle or if it's located exactly *on* the circle's boundary, otherwise returns `false`.
   */
  is_point_in_circle(point: Vector2 | Vector2i, circle_position: Vector2 | Vector2i, circle_radius: float): boolean;
  /**
   * Returns `true` if `point` is inside `polygon` or if it's located exactly *on* polygon's boundary, otherwise returns `false`.
   */
  is_point_in_polygon(point: Vector2 | Vector2i, polygon: PackedVector2Array | Array<unknown>): boolean;
  /**
   * Returns `true` if `polygon`'s vertices are ordered in clockwise order, otherwise returns `false`.
   * **Note:** Assumes a Cartesian coordinate system where `+x` is right and `+y` is up. If using screen coordinates (`+y` is down), the result will need to be flipped (i.e. a `true` result will indicate counter-clockwise).
   */
  is_polygon_clockwise(polygon: PackedVector2Array | Array<unknown>): boolean;
  /**
   * Returns the point of intersection between the two lines (`from_a`, `dir_a`) and (`from_b`, `dir_b`). Returns a {@link Vector2}, or `null` if the lines are parallel.
   * `from` and `dir` are *not* endpoints of a line segment or ray but the slope (`dir`) and a known point (`from`) on that line.
   */
  line_intersects_line(from_a: Vector2 | Vector2i, dir_a: Vector2 | Vector2i, from_b: Vector2 | Vector2i, dir_b: Vector2 | Vector2i): unknown;
  /**
   * Given an array of {@link Vector2}s representing tiles, builds an atlas. The returned dictionary has two keys: `points` is a {@link PackedVector2Array} that specifies the positions of each tile, `size` contains the overall size of the whole atlas as {@link Vector2i}.
   */
  make_atlas(sizes: PackedVector2Array | Array<unknown>): Dictionary;
  /**
   * Merges (combines) `polygon_a` and `polygon_b` and returns an array of merged polygons. This performs {@link OPERATION_UNION} between polygons.
   * The operation may result in an outer polygon (boundary) and multiple inner polygons (holes) produced which could be distinguished by calling {@link is_polygon_clockwise}.
   */
  merge_polygons(polygon_a: PackedVector2Array | Array<unknown>, polygon_b: PackedVector2Array | Array<unknown>): Array<PackedVector2Array>;
  /**
   * Inflates or deflates `polygon` by `delta` units (pixels). If `delta` is positive, makes the polygon grow outward. If `delta` is negative, shrinks the polygon inward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. Returns an empty array if `delta` is negative and the absolute value of it approximately exceeds the minimum bounding rectangle dimensions of the polygon.
   * Each polygon's vertices will be rounded as determined by `join_type`.
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling {@link is_polygon_clockwise}.
   * **Note:** To translate the polygon's vertices specifically, multiply them to a {@link Transform2D}:
   */
  offset_polygon(polygon: PackedVector2Array | Array<unknown>, delta: float, join_type: int): Array<PackedVector2Array>;
  /**
   * Inflates or deflates `polyline` by `delta` units (pixels), producing polygons. If `delta` is positive, makes the polyline grow outward. Returns an array of polygons because inflating/deflating may result in multiple discrete polygons. If `delta` is negative, returns an empty array.
   * Each polygon's vertices will be rounded as determined by `join_type`.
   * Each polygon's endpoints will be rounded as determined by `end_type`.
   * The operation may result in an outer polygon (boundary) and inner polygon (hole) produced which could be distinguished by calling {@link is_polygon_clockwise}.
   */
  offset_polyline(polyline: PackedVector2Array | Array<unknown>, delta: float, join_type: int, end_type: int): Array<PackedVector2Array>;
  /** Returns if `point` is inside the triangle specified by `a`, `b` and `c`. */
  point_is_inside_triangle(point: Vector2 | Vector2i, a: Vector2 | Vector2i, b: Vector2 | Vector2i, c: Vector2 | Vector2i): boolean;
  /**
   * Given the 2D segment (`segment_from`, `segment_to`), returns the position on the segment (as a number between 0 and 1) at which the segment hits the circle that is located at position `circle_position` and has radius `circle_radius`. If the segment does not intersect the circle, -1 is returned (this is also the case if the line extending the segment would intersect the circle, but the segment does not).
   */
  segment_intersects_circle(segment_from: Vector2 | Vector2i, segment_to: Vector2 | Vector2i, circle_position: Vector2 | Vector2i, circle_radius: float): float;
  /**
   * Checks if the two segments (`from_a`, `to_a`) and (`from_b`, `to_b`) intersect. If yes, return the point of intersection as {@link Vector2}. If no intersection takes place, returns `null`.
   */
  segment_intersects_segment(from_a: Vector2 | Vector2i, to_a: Vector2 | Vector2i, from_b: Vector2 | Vector2i, to_b: Vector2 | Vector2i): unknown;
  /**
   * Triangulates the area specified by discrete set of `points` such that no point is inside the circumcircle of any resulting triangle. Returns a {@link PackedInt32Array} where each triangle consists of three consecutive point indices into `points` (i.e. the returned array will have `n * 3` elements, with `n` being the number of found triangles). If the triangulation did not succeed, an empty {@link PackedInt32Array} is returned.
   */
  triangulate_delaunay(points: PackedVector2Array | Array<unknown>): PackedInt32Array;
  /**
   * Triangulates the polygon specified by the points in `polygon`. Returns a {@link PackedInt32Array} where each triangle consists of three consecutive point indices into `polygon` (i.e. the returned array will have `n * 3` elements, with `n` being the number of found triangles). Output triangles will always be counter clockwise, and the contour will be flipped if it's clockwise. If the triangulation did not succeed, an empty {@link PackedInt32Array} is returned.
   */
  triangulate_polygon(polygon: PackedVector2Array | Array<unknown>): PackedInt32Array;

  // enum PolyBooleanOperation
  /** Create regions where either subject or clip polygons (or both) are filled. */
  readonly OPERATION_UNION: int;
  /** Create regions where subject polygons are filled except where clip polygons are filled. */
  readonly OPERATION_DIFFERENCE: int;
  /** Create regions where both subject and clip polygons are filled. */
  readonly OPERATION_INTERSECTION: int;
  /** Create regions where either subject or clip polygons are filled but not where both are filled. */
  readonly OPERATION_XOR: int;
  // enum PolyJoinType
  /** Squaring is applied uniformally at all convex edge joins at `1 * delta`. */
  readonly JOIN_SQUARE: int;
  /**
   * While flattened paths can never perfectly trace an arc, they are approximated by a series of arc chords.
   */
  readonly JOIN_ROUND: int;
  /**
   * There's a necessary limit to mitered joins since offsetting edges that join at very acute angles will produce excessively long and narrow "spikes". For any given edge join, when miter offsetting would exceed that maximum distance, "square" joining is applied.
   */
  readonly JOIN_MITER: int;
  // enum PolyEndType
  /** Endpoints are joined using the {@link PolyJoinType} value and the path filled as a polygon. */
  readonly END_POLYGON: int;
  /** Endpoints are joined using the {@link PolyJoinType} value and the path filled as a polyline. */
  readonly END_JOINED: int;
  /** Endpoints are squared off with no extension. */
  readonly END_BUTT: int;
  /** Endpoints are squared off and extended by `delta` units. */
  readonly END_SQUARE: int;
  /** Endpoints are rounded off and extended by `delta` units. */
  readonly END_ROUND: int;
}
declare const Geometry2D: Geometry2D;

