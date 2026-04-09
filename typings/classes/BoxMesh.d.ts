// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Generate an axis-aligned box {@link PrimitiveMesh}. */
declare class BoxMesh extends PrimitiveMesh {
  /** The box's width, height and depth. */
  size: Vector3;
  /** Number of extra edge loops inserted along the Z axis. */
  subdivide_depth: int;
  /** Number of extra edge loops inserted along the Y axis. */
  subdivide_height: int;
  /** Number of extra edge loops inserted along the X axis. */
  subdivide_width: int;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;
  set_subdivide_depth(value: int): void;
  get_subdivide_depth(): int;
  set_subdivide_height(value: int): void;
  get_subdivide_height(): int;
  set_subdivide_width(value: int): void;
  get_subdivide_width(): int;
}
