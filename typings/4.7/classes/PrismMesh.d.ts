// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Class representing a prism-shaped {@link PrimitiveMesh}. */
declare class PrismMesh extends PrimitiveMesh {
  /**
   * Displacement of the upper edge along the X axis. 0.0 positions edge straight above the bottom-left edge.
   */
  left_to_right: float;
  /** Size of the prism. */
  size: Vector3;
  /** Number of added edge loops along the Z axis. */
  subdivide_depth: int;
  /** Number of added edge loops along the Y axis. */
  subdivide_height: int;
  /** Number of added edge loops along the X axis. */
  subdivide_width: int;
}
