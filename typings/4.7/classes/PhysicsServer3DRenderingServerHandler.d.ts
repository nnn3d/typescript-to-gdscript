// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * A class used to provide {@link PhysicsServer3DExtension._soft_body_update_rendering_server} with a rendering handler for soft bodies.
 */
declare class PhysicsServer3DRenderingServerHandler extends GodotObject {
  /** Called by the {@link PhysicsServer3D} to set the bounding box for the {@link SoftBody3D}. */
  _set_aabb(aabb: AABB): void;
  /**
   * Called by the {@link PhysicsServer3D} to set the normal for the {@link SoftBody3D} vertex at the index specified by `vertex_id`.
   * **Note:** The `normal` parameter used to be of type `const void*` prior to Godot 4.2.
   */
  _set_normal(vertex_id: int, normal: Vector3): void;
  /**
   * Called by the {@link PhysicsServer3D} to set the position for the {@link SoftBody3D} vertex at the index specified by `vertex_id`.
   * **Note:** The `vertex` parameter used to be of type `const void*` prior to Godot 4.2.
   */
  _set_vertex(vertex_id: int, vertex: Vector3): void;
  /** Sets the bounding box for the {@link SoftBody3D}. */
  set_aabb(aabb: AABB): void;
  /** Sets the normal for the {@link SoftBody3D} vertex at the index specified by `vertex_id`. */
  set_normal(vertex_id: int, normal: Vector3): void;
  /** Sets the position for the {@link SoftBody3D} vertex at the index specified by `vertex_id`. */
  set_vertex(vertex_id: int, vertex: Vector3): void;
}
