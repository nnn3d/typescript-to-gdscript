// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** {@link Mesh} type that provides utility for constructing a surface from arrays. */
declare class ArrayMesh extends Mesh {
  /** The blend shape mode. */
  blend_shape_mode: int;
  /**
   * Overrides the {@link AABB} with one defined by user for use with frustum culling. Especially useful to avoid unexpected culling when using a shader to offset vertices.
   */
  custom_aabb: AABB;
  /**
   * An optional mesh which can be used for rendering shadows and the depth prepass. Can be used to increase performance by supplying a mesh with fused vertices and only vertex position data (without normals, UVs, colors, etc.).
   * **Note:** This mesh must have exactly the same vertex positions as the source mesh (including the source mesh's LODs, if present). If vertex positions differ, then the mesh will not draw correctly.
   */
  shadow_mesh: ArrayMesh | null;
  set_blend_shape_mode(value: int): void;
  get_blend_shape_mode(): int;
  set_custom_aabb(value: AABB): void;
  get_custom_aabb(): AABB;
  set_shadow_mesh(value: ArrayMesh | null): void;
  get_shadow_mesh(): ArrayMesh | null;

  /**
   * Adds name for a blend shape that will be added with {@link add_surface_from_arrays}. Must be called before surface is added.
   */
  add_blend_shape(name: string): void;
  /**
   * Creates a new surface. {@link Mesh.get_surface_count} will become the `surf_idx` for this new surface.
   * Surfaces are created to be rendered using a `primitive`, which may be any of the values defined in {@link Mesh.PrimitiveType}.
   * The `arrays` argument is an array of arrays. Each of the {@link Mesh.ARRAY_MAX} elements contains an array with some of the mesh data for this surface as described by the corresponding member of {@link Mesh.ArrayType} or `null` if it is not used by the surface. For example, `arrays[0]` is the array of vertices. That first vertex sub-array is always required; the others are optional. Adding an index array puts this surface into "index mode" where the vertex and other arrays become the sources of data and the index array defines the vertex order. All sub-arrays must have the same length as the vertex array (or be an exact multiple of the vertex array's length, when multiple elements of a sub-array correspond to a single vertex) or be empty, except for {@link Mesh.ARRAY_INDEX} if it is used.
   * The `blend_shapes` argument is an array of vertex data for each blend shape. Each element is an array of the same structure as `arrays`, but {@link Mesh.ARRAY_VERTEX}, {@link Mesh.ARRAY_NORMAL}, and {@link Mesh.ARRAY_TANGENT} are set if and only if they are set in `arrays` and all other entries are `null`.
   * The `lods` argument is a dictionary with [float] keys and {@link PackedInt32Array} values. Each entry in the dictionary represents an LOD level of the surface, where the value is the {@link Mesh.ARRAY_INDEX} array to use for the LOD level and the key is roughly proportional to the distance at which the LOD stats being used. I.e., increasing the key of an LOD also increases the distance that the objects has to be from the camera before the LOD is used.
   * The `flags` argument is the bitwise OR of, as required: One value of {@link Mesh.ArrayCustomFormat} left shifted by `ARRAY_FORMAT_CUSTOMn_SHIFT` for each custom channel in use, {@link Mesh.ARRAY_FLAG_USE_DYNAMIC_UPDATE}, {@link Mesh.ARRAY_FLAG_USE_8_BONE_WEIGHTS}, or {@link Mesh.ARRAY_FLAG_USES_EMPTY_VERTEX_ARRAY}.
   * **Note:** When using indices, it is recommended to only use points, lines, or triangles.
   */
  add_surface_from_arrays(primitive: int, arrays: Array<unknown>, blend_shapes?: Array<Array<unknown>>, lods?: Dictionary, flags?: int): void;
  /** Removes all blend shapes from this {@link ArrayMesh}. */
  clear_blend_shapes(): void;
  /** Removes all surfaces from this {@link ArrayMesh}. */
  clear_surfaces(): void;
  /** Returns the number of blend shapes that the {@link ArrayMesh} holds. */
  get_blend_shape_count(): int;
  /** Returns the name of the blend shape at this index. */
  get_blend_shape_name(index: int): string;
  /** Performs a UV unwrap on the {@link ArrayMesh} to prepare the mesh for lightmapping. */
  lightmap_unwrap(transform: Transform3D, texel_size: float): int;
  /** Regenerates tangents for each of the {@link ArrayMesh}'s surfaces. */
  regen_normal_maps(): void;
  /** Sets the name of the blend shape at this index. */
  set_blend_shape_name(index: int, name: string): void;
  /**
   * Returns the index of the first surface with this name held within this {@link ArrayMesh}. If none are found, -1 is returned.
   */
  surface_find_by_name(name: string): int;
  /**
   * Returns the length in indices of the index array in the requested surface (see {@link add_surface_from_arrays}).
   */
  surface_get_array_index_len(surf_idx: int): int;
  /**
   * Returns the length in vertices of the vertex array in the requested surface (see {@link add_surface_from_arrays}).
   */
  surface_get_array_len(surf_idx: int): int;
  /** Returns the format mask of the requested surface (see {@link add_surface_from_arrays}). */
  surface_get_format(surf_idx: int): int;
  /** Gets the name assigned to this surface. */
  surface_get_name(surf_idx: int): string;
  /** Returns the primitive type of the requested surface (see {@link add_surface_from_arrays}). */
  surface_get_primitive_type(surf_idx: int): int;
  /**
   * Removes the surface at the given index from the Mesh, shifting surfaces with higher index down by one.
   */
  surface_remove(surf_idx: int): void;
  /** Sets a name for a given surface. */
  surface_set_name(surf_idx: int, name: string): void;
  /**
   * Updates the attribute buffer of this mesh's surface with the given `data`. The expected data per attribute is 12 or 8 bytes (4 bytes per float, 2 floats per {@link Vector2}, and 3 floats per {@link Vector3}) depending on if the mesh is using {@link Vector3} or {@link Vector2} vertices. This value can be determined with {@link RenderingServer.mesh_surface_get_format_attribute_stride}.
   * The starting point of the updates can be changed with `offset`. The value of `offset` should be a multiple of 12 bytes in most cases to align to each attribute.
   * A {@link PackedVector3Array} of attribute locations can be converted into a {@link PackedByteArray} using {@link PackedVector3Array.to_byte_array} for use in `data`.
   */
  surface_update_attribute_region(surf_idx: int, offset: int, data: PackedByteArray): void;
  /**
   * Updates the skin buffer of this mesh's surface with the given `data`. The expected data per skin is 12 or 8 bytes (4 bytes per float, 2 floats per {@link Vector2}, and 3 floats per {@link Vector3}) depending on if the mesh is using {@link Vector3} or {@link Vector2} vertices. This value can be determined with {@link RenderingServer.mesh_surface_get_format_skin_stride}.
   * The starting point of the updates can be changed with `offset`. The value of `offset` should be a multiple of 12 bytes in most cases to align to each skin.
   * A {@link PackedVector3Array} of skin locations can be converted into a {@link PackedByteArray} using {@link PackedVector3Array.to_byte_array} for use in `data`.
   */
  surface_update_skin_region(surf_idx: int, offset: int, data: PackedByteArray): void;
  /**
   * Updates the vertex buffer of this mesh's surface with the given `data`. The expected data per vertex is 12 or 8 bytes (4 bytes per float, 2 floats per {@link Vector2}, and 3 floats per {@link Vector3}) depending on if the mesh is using {@link Vector3} or {@link Vector2} vertices. This value can be determined with {@link RenderingServer.mesh_surface_get_format_vertex_stride}.
   * The starting point of the updates can be changed with `offset`. The value of `offset` should be a multiple of 12 bytes in most cases to align to each vertex.
   * A {@link PackedVector3Array} of vertex locations can be converted into a {@link PackedByteArray} using {@link PackedVector3Array.to_byte_array} for use in `data`.
   */
  surface_update_vertex_region(surf_idx: int, offset: int, data: PackedByteArray): void;
}
