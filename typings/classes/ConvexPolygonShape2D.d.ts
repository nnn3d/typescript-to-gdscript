// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A 2D convex polygon shape used for physics collision. */
declare class ConvexPolygonShape2D extends Shape2D {
  /**
   * The polygon's list of vertices that form a convex hull. Can be in either clockwise or counterclockwise order.
   * **Warning:** Only set this property to a list of points that actually form a convex hull. Use {@link set_point_cloud} to generate the convex hull of an arbitrary set of points.
   */
  points: PackedVector2Array;
  set_points(value: PackedVector2Array | Array<unknown>): void;
  get_points(): PackedVector2Array;

  /**
   * Based on the set of points provided, this assigns the {@link points} property using the convex hull algorithm, removing all unneeded points. See {@link Geometry2D.convex_hull} for details.
   */
  set_point_cloud(point_cloud: PackedVector2Array | Array<unknown>): void;
}
