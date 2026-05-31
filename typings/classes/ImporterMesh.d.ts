// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A {@link Resource} that contains vertex array-based geometry during the import process. */
declare class ImporterMesh extends Resource {
  /**
   * Adds name for a blend shape that will be added with {@link add_surface}. Must be called before surface is added.
   */
  add_blend_shape(name: string | NodePath): void;
  /**
   * Creates a new surface. {@link Mesh.get_surface_count} will become the `surf_idx` for this new surface.
   * Surfaces are created to be rendered using a `primitive`, which may be any of the values defined in {@link Mesh.PrimitiveType}.
   * The `arrays` argument is an array of arrays. Each of the {@link Mesh.ARRAY_MAX} elements contains an array with some of the mesh data for this surface as described by the corresponding member of {@link Mesh.ArrayType} or `null` if it is not used by the surface. For example, `arrays[0]` is the array of vertices. That first vertex sub-array is always required; the others are optional. Adding an index array puts this surface into "index mode" where the vertex and other arrays become the sources of data and the index array defines the vertex order. All sub-arrays must have the same length as the vertex array (or be an exact multiple of the vertex array's length, when multiple elements of a sub-array correspond to a single vertex) or be empty, except for {@link Mesh.ARRAY_INDEX} if it is used.
   * The `blend_shapes` argument is an array of vertex data for each blend shape. Each element is an array of the same structure as `arrays`, but {@link Mesh.ARRAY_VERTEX}, {@link Mesh.ARRAY_NORMAL}, and {@link Mesh.ARRAY_TANGENT} are set if and only if they are set in `arrays` and all other entries are `null`.
   * The `lods` argument is a dictionary with [float] keys and {@link PackedInt32Array} values. Each entry in the dictionary represents an LOD level of the surface, where the value is the {@link Mesh.ARRAY_INDEX} array to use for the LOD level and the key is roughly proportional to the distance at which the LOD stats being used. I.e., increasing the key of an LOD also increases the distance that the objects has to be from the camera before the LOD is used.
   * The `flags` argument is the bitwise OR of, as required: One value of {@link Mesh.ArrayCustomFormat} left shifted by `ARRAY_FORMAT_CUSTOMn_SHIFT` for each custom channel in use, {@link Mesh.ARRAY_FLAG_USE_DYNAMIC_UPDATE}, {@link Mesh.ARRAY_FLAG_USE_8_BONE_WEIGHTS}, or {@link Mesh.ARRAY_FLAG_USES_EMPTY_VERTEX_ARRAY}.
   * **Note:** When using indices, it is recommended to only use points, lines, or triangles.
   */
  add_surface(primitive: int, arrays: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array, blend_shapes?: Array<Array<unknown>>, lods?: Dictionary, material?: Material, name?: string | NodePath, flags?: int): void;
  /** Removes all surfaces and blend shapes from this {@link ImporterMesh}. */
  clear(): void;
  /**
   * Converts the given {@link Mesh} into an {@link ImporterMesh} by copying all its surfaces, blend shapes, materials, and metadata into a new {@link ImporterMesh} object.
   */
  static from_mesh(mesh: Mesh): ImporterMesh | null;
  /**
   * Generates all lods for this ImporterMesh.
   * `normal_merge_angle` is in degrees and used in the same way as the importer settings in `lods`.
   * `normal_split_angle` is not used and only remains for compatibility with older versions of the API.
   * The number of generated lods can be accessed using {@link get_surface_lod_count}, and each LOD is available in {@link get_surface_lod_size} and {@link get_surface_lod_indices}.
   * `bone_transform_array` is an {@link Array} which can be either empty or contain {@link Transform3D}s which, for each of the mesh's bone IDs, will apply mesh skinning when generating the LOD mesh variations. This is usually used to account for discrepancies in scale between the mesh itself and its skinning data.
   */
  generate_lods(normal_merge_angle: float, normal_split_angle: float, bone_transform_array: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /** Returns the number of blend shapes that the mesh holds. */
  get_blend_shape_count(): int;
  /** Returns the blend shape mode for this Mesh. */
  get_blend_shape_mode(): int;
  /** Returns the name of the blend shape at this index. */
  get_blend_shape_name(blend_shape_idx: int): string;
  /** Returns the size hint of this mesh for lightmap-unwrapping in UV-space. */
  get_lightmap_size_hint(): Vector2i;
  /**
   * Returns the mesh data represented by this {@link ImporterMesh} as a usable {@link ArrayMesh}.
   * This method caches the returned mesh, and subsequent calls will return the cached data until {@link clear} is called.
   * If not yet cached and `base_mesh` is provided, `base_mesh` will be used and mutated.
   */
  get_mesh(base_mesh?: ArrayMesh): ArrayMesh | null;
  /**
   * Returns the arrays for the vertices, normals, UVs, etc. that make up the requested surface. See {@link add_surface}.
   */
  get_surface_arrays(surface_idx: int): Array<unknown>;
  /** Returns a single set of blend shape arrays for the requested blend shape index for a surface. */
  get_surface_blend_shape_arrays(surface_idx: int, blend_shape_idx: int): Array<unknown>;
  /** Returns the number of surfaces that the mesh holds. */
  get_surface_count(): int;
  /** Returns the format of the surface that the mesh holds. */
  get_surface_format(surface_idx: int): int;
  /** Returns the number of lods that the mesh holds on a given surface. */
  get_surface_lod_count(surface_idx: int): int;
  /** Returns the index buffer of a lod for a surface. */
  get_surface_lod_indices(surface_idx: int, lod_idx: int): PackedInt32Array;
  /** Returns the screen ratio which activates a lod for a surface. */
  get_surface_lod_size(surface_idx: int, lod_idx: int): float;
  /** Returns a {@link Material} in a given surface. Surface is rendered using this material. */
  get_surface_material(surface_idx: int): Material | null;
  /** Gets the name assigned to this surface. */
  get_surface_name(surface_idx: int): string;
  /** Returns the primitive type of the requested surface (see {@link add_surface}). */
  get_surface_primitive_type(surface_idx: int): int;
  /**
   * Merges multiple {@link ImporterMesh}es into a single {@link ImporterMesh}. Each input mesh is transformed by the corresponding {@link Transform3D} in the `relative_transforms` array, which must be the same size as `importer_meshes`. Negative scales are supported, and the winding order in the mesh data will be corrected to account for this.
   * If `deduplicate_surfaces` is `true` and multiple meshes have surfaces with the same names and formats, the surfaces will be merged together when the meshes are merged, and will use the material from the first matching surface. This is useful for reducing the number of surfaces in the resulting mesh, and avoids duplicating materials. Surfaces with bone weights will never be deduplicated. If `deduplicate_surfaces` is `false`, the surfaces will always be kept separate, and will be given unique names.
   * **Warning:** Blend shapes and LODs are not supported and will be discarded. Do not use this function to discard blend shapes and LODs, as support for these may be added in the future.
   */
  static merge_importer_meshes(importer_meshes: Array<ImporterMesh>, relative_transforms: Array<Transform3D>, deduplicate_surfaces?: boolean): ImporterMesh | null;
  /** Sets the blend shape mode. */
  set_blend_shape_mode(mode: int): void;
  /** Sets the size hint of this mesh for lightmap-unwrapping in UV-space. */
  set_lightmap_size_hint(size: Vector2i | Vector2): void;
  /** Sets a {@link Material} for a given surface. Surface will be rendered using this material. */
  set_surface_material(surface_idx: int, material: Material): void;
  /** Sets a name for a given surface. */
  set_surface_name(surface_idx: int, name: string | NodePath): void;
}
