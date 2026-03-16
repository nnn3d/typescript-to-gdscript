// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

declare class PolygonPathFinder extends Resource {
  find_path(from_: Vector2, to: Vector2): PackedVector2Array;
  get_bounds(): Rect2;
  get_closest_point(point: Vector2): Vector2;
  get_intersections(from_: Vector2, to: Vector2): PackedVector2Array;
  get_point_penalty(idx: int): float;
  /** Returns `true` if `point` falls inside the polygon area. */
  is_point_inside(point: Vector2): boolean;
  set_point_penalty(idx: int, penalty: float): void;
  /**
   * Sets up {@link PolygonPathFinder} with an array of points that define the vertices of the polygon, and an array of indices that determine the edges of the polygon.
   * The length of `connections` must be even, returns an error if odd.
   */
  setup(points: PackedVector2Array, connections: PackedInt32Array): void;
}
