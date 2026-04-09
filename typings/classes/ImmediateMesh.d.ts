// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Mesh optimized for creating geometry manually. */
declare class ImmediateMesh extends Mesh {
  /** Clear all surfaces. */
  clear_surfaces(): void;
  /** Add a 3D vertex using the current attributes previously set. */
  surface_add_vertex(vertex: Vector3): void;
  /** Add a 2D vertex using the current attributes previously set. */
  surface_add_vertex_2d(vertex: Vector2): void;
  /** Begin a new surface. */
  surface_begin(primitive: int, material?: Material): void;
  /**
   * End and commit current surface. Note that surface being created will not be visible until this function is called.
   */
  surface_end(): void;
  /** Set the color attribute that will be pushed with the next vertex. */
  surface_set_color(color: Color): void;
  /** Set the normal attribute that will be pushed with the next vertex. */
  surface_set_normal(normal: Vector3): void;
  /**
   * Set the tangent attribute that will be pushed with the next vertex.
   * **Note:** Even though `tangent` is a {@link Plane}, it does not directly represent the tangent plane. Its {@link Plane.x}, {@link Plane.y}, and {@link Plane.z} represent the tangent vector and {@link Plane.d} should be either `-1` or `1`. See also {@link Mesh.ARRAY_TANGENT}.
   */
  surface_set_tangent(tangent: Plane): void;
  /** Set the UV attribute that will be pushed with the next vertex. */
  surface_set_uv(uv: Vector2): void;
  /** Set the UV2 attribute that will be pushed with the next vertex. */
  surface_set_uv2(uv2: Vector2): void;
}
