// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Class representing a planar {@link PrimitiveMesh}. */
declare class PlaneMesh extends PrimitiveMesh {
  /** Offset of the generated plane. Useful for particles. */
  center_offset: Vector3;
  /** Direction that the {@link PlaneMesh} is facing. */
  orientation: int;
  /** Size of the generated plane. */
  size: Vector2;
  /** Number of subdivision along the Z axis. */
  subdivide_depth: int;
  /** Number of subdivision along the X axis. */
  subdivide_width: int;
  set_center_offset(value: Vector3): void;
  get_center_offset(): Vector3;
  set_orientation(value: int): void;
  get_orientation(): int;
  set_size(value: Vector2): void;
  get_size(): Vector2;
  set_subdivide_depth(value: int): void;
  get_subdivide_depth(): int;
  set_subdivide_width(value: int): void;
  get_subdivide_width(): int;

  // enum Orientation
  /** {@link PlaneMesh} will face the positive X-axis. */
  static readonly FACE_X: int;
  /**
   * {@link PlaneMesh} will face the positive Y-axis. This matches the behavior of the {@link PlaneMesh} in Godot 3.x.
   */
  static readonly FACE_Y: int;
  /**
   * {@link PlaneMesh} will face the positive Z-axis. This matches the behavior of the QuadMesh in Godot 3.x.
   */
  static readonly FACE_Z: int;
}
