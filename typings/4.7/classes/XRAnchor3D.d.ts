// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An anchor point in AR space. */
declare class XRAnchor3D extends XRNode3D {
  /** Returns a plane aligned with our anchor; handy for intersection testing. */
  get_plane(): Plane;
  /**
   * Returns the estimated size of the plane that was detected. Say when the anchor relates to a table in the real world, this is the estimated size of the surface of that table.
   */
  get_size(): Vector3;
}
