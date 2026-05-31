// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for all primitive meshes. Handles applying a {@link Material} to a primitive mesh. */
declare class PrimitiveMesh extends Mesh {
  /**
   * If set, generates UV2 UV coordinates applying a padding using the {@link uv2_padding} setting. UV2 is needed for lightmapping.
   */
  add_uv2: boolean;
  /**
   * Overrides the {@link AABB} with one defined by user for use with frustum culling. Especially useful to avoid unexpected culling when using a shader to offset vertices.
   */
  custom_aabb: AABB;
  /**
   * If `true`, the order of the vertices in each triangle is reversed, resulting in the backside of the mesh being drawn.
   * This gives the same result as using {@link BaseMaterial3D.CULL_FRONT} in {@link BaseMaterial3D.cull_mode}.
   */
  flip_faces: boolean;
  /** The current {@link Material} of the primitive mesh. */
  material: Material | null;
  /**
   * If {@link add_uv2} is set, specifies the padding in pixels applied along seams of the mesh. Lower padding values allow making better use of the lightmap texture (resulting in higher texel density), but may introduce visible lightmap bleeding along edges.
   * If the size of the lightmap texture can't be determined when generating the mesh, UV2 is calculated assuming a texture size of 1024x1024.
   */
  uv2_padding: float;
  set_add_uv2(value: boolean): void;
  get_add_uv2(): boolean;
  set_custom_aabb(value: AABB): void;
  get_custom_aabb(): AABB;
  set_flip_faces(value: boolean): void;
  get_flip_faces(): boolean;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_uv2_padding(value: float): void;
  get_uv2_padding(): float;

  /**
   * Override this method to customize how this primitive mesh should be generated. Should return an {@link Array} where each element is another Array of values required for the mesh (see the {@link Mesh.ArrayType} constants).
   */
  _create_mesh_array(): Array<unknown>;
  /**
   * Returns the mesh arrays used to make up the surface of this primitive mesh.
   * **Example:** Pass the result to {@link ArrayMesh.add_surface_from_arrays} to create a new surface:
   */
  get_mesh_arrays(): Array<unknown>;
  /** Request an update of this primitive mesh based on its properties. */
  request_update(): void;
}
