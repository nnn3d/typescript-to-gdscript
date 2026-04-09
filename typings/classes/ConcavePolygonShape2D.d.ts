// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D polyline shape used for physics collision. */
declare class ConcavePolygonShape2D extends Shape2D {
  /**
   * The array of points that make up the {@link ConcavePolygonShape2D}'s line segments. The array (of length divisible by two) is naturally divided into pairs (one pair for each segment); each pair consists of the starting point of a segment and the endpoint of a segment.
   */
  segments: PackedVector2Array;
  set_segments(value: PackedVector2Array | Array<unknown>): void;
  get_segments(): PackedVector2Array;
}
