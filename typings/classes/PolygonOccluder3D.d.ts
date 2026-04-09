// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Flat 2D polygon shape for use with occlusion culling in {@link OccluderInstance3D}. */
declare class PolygonOccluder3D extends Occluder3D {
  /**
   * The polygon to use for occlusion culling. The polygon can be convex or concave, but it should have as few points as possible to maximize performance.
   * The polygon must *not* have intersecting lines. Otherwise, triangulation will fail (with an error message printed).
   */
  polygon: PackedVector2Array;
  set_polygon(value: PackedVector2Array | Array<unknown>): void;
  get_polygon(): PackedVector2Array;
}
