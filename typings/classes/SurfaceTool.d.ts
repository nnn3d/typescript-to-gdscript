// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Helper tool to create geometry. */
declare class SurfaceTool extends RefCounted {
  /**
   * Adds a vertex to index array if you are using indexed vertices. Does not need to be called before adding vertices.
   */
  add_index(index: int): void;
  /**
   * Inserts a triangle fan made of array data into {@link Mesh} being constructed.
   * Requires the primitive type be set to {@link Mesh.PRIMITIVE_TRIANGLES}.
   */
  add_triangle_fan(vertices: PackedVector3Array, uvs?: PackedVector2Array, colors?: PackedColorArray, uv2s?: PackedVector2Array, normals?: PackedVector3Array, tangents?: Array<Plane>): void;
  /**
   * Specifies the position of current vertex. Should be called after specifying other vertex properties (e.g. Color, UV).
   */
  add_vertex(vertex: Vector3): void;
  /**
   * Append vertices from a given {@link Mesh} surface onto the current vertex array with specified {@link Transform3D}.
   */
  append_from(existing: Mesh, surface: int, transform: Transform3D): void;
  /**
   * Called before adding any vertices. Takes the primitive type as an argument (e.g. {@link Mesh.PRIMITIVE_TRIANGLES}).
   */
  begin(primitive: int): void;
  /** Clear all information passed into the surface tool so far. */
  clear(): void;
  /**
   * Returns a constructed {@link ArrayMesh} from current information passed in. If an existing {@link ArrayMesh} is passed in as an argument, will add an extra surface to the existing {@link ArrayMesh}.
   * The `flags` argument can be the bitwise OR of {@link Mesh.ARRAY_FLAG_USE_DYNAMIC_UPDATE}, {@link Mesh.ARRAY_FLAG_USE_8_BONE_WEIGHTS}, or {@link Mesh.ARRAY_FLAG_USES_EMPTY_VERTEX_ARRAY}.
   */
  commit(existing?: ArrayMesh, flags?: int): ArrayMesh;
  /**
   * Commits the data to the same format used by {@link ArrayMesh.add_surface_from_arrays}, {@link ImporterMesh.add_surface}, and {@link create_from_arrays}. This way you can further process the mesh data using the {@link ArrayMesh} or {@link ImporterMesh} APIs.
   */
  commit_to_arrays(): Array<unknown>;
  /** Creates a vertex array from an existing {@link Mesh}. */
  create_from(existing: Mesh, surface: int): void;
  /**
   * Creates this SurfaceTool from existing vertex arrays such as returned by {@link commit_to_arrays}, {@link Mesh.surface_get_arrays}, {@link Mesh.surface_get_blend_shape_arrays}, {@link ImporterMesh.get_surface_arrays}, and {@link ImporterMesh.get_surface_blend_shape_arrays}. `primitive_type` controls the type of mesh data, defaulting to {@link Mesh.PRIMITIVE_TRIANGLES}.
   */
  create_from_arrays(arrays: Array<unknown>, primitive_type: int): void;
  /**
   * Creates a vertex array from the specified blend shape of an existing {@link Mesh}. This can be used to extract a specific pose from a blend shape.
   */
  create_from_blend_shape(existing: Mesh, surface: int, blend_shape: string): void;
  /** Removes the index array by expanding the vertex array. */
  deindex(): void;
  /**
   * Generates an LOD for a given `nd_threshold` in linear units (square root of quadric error metric), using at most `target_index_count` indices.
   */
  generate_lod(nd_threshold: float, target_index_count?: int): PackedInt32Array;
  /**
   * Generates normals from vertices so you do not have to do it manually. If `flip` is `true`, the resulting normals will be inverted. {@link generate_normals} should be called *after* generating geometry and *before* committing the mesh using {@link commit} or {@link commit_to_arrays}. For correct display of normal-mapped surfaces, you will also have to generate tangents using {@link generate_tangents}.
   * **Note:** {@link generate_normals} only works if the primitive type is set to {@link Mesh.PRIMITIVE_TRIANGLES}.
   * **Note:** {@link generate_normals} takes smooth groups into account. To generate smooth normals, set the smooth group to a value greater than or equal to `0` using {@link set_smooth_group} or leave the smooth group at the default of `0`. To generate flat normals, set the smooth group to `-1` using {@link set_smooth_group} prior to adding vertices.
   */
  generate_normals(flip?: boolean): void;
  /**
   * Generates a tangent vector for each vertex. Requires that each vertex already has UVs and normals set (see {@link generate_normals}).
   */
  generate_tangents(): void;
  /** Returns the axis-aligned bounding box of the vertex positions. */
  get_aabb(): AABB;
  /**
   * Returns the format for custom `channel_index` (currently up to 4). Returns {@link CUSTOM_MAX} if this custom channel is unused.
   */
  get_custom_format(channel_index: int): int;
  /** Returns the type of mesh geometry, such as {@link Mesh.PRIMITIVE_TRIANGLES}. */
  get_primitive_type(): int;
  /**
   * By default, returns {@link SKIN_4_WEIGHTS} to indicate only 4 bone influences per vertex are used.
   * Returns {@link SKIN_8_WEIGHTS} if up to 8 influences are used.
   * **Note:** This function returns an enum, not the exact number of weights.
   */
  get_skin_weight_count(): int;
  /**
   * Shrinks the vertex array by creating an index array. This can improve performance by avoiding vertex reuse.
   */
  index(): void;
  /**
   * Optimizes triangle sorting for performance. Requires that {@link get_primitive_type} is {@link Mesh.PRIMITIVE_TRIANGLES}.
   */
  optimize_indices_for_cache(): void;
  /** Specifies an array of bones to use for the *next* vertex. `bones` must contain 4 integers. */
  set_bones(bones: PackedInt32Array): void;
  /**
   * Specifies a {@link Color} to use for the *next* vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   * **Note:** The material must have {@link BaseMaterial3D.vertex_color_use_as_albedo} enabled for the vertex color to be visible.
   */
  set_color(color: Color): void;
  /**
   * Sets the custom value on this vertex for `channel_index`.
   * {@link set_custom_format} must be called first for this `channel_index`. Formats which are not RGBA will ignore other color channels.
   */
  set_custom(channel_index: int, custom_color: Color): void;
  /**
   * Sets the color format for this custom `channel_index`. Use {@link CUSTOM_MAX} to disable.
   * Must be invoked after {@link begin} and should be set before {@link commit} or {@link commit_to_arrays}.
   */
  set_custom_format(channel_index: int, format: int): void;
  /** Sets {@link Material} to be used by the {@link Mesh} you are constructing. */
  set_material(material: Material): void;
  /**
   * Specifies a normal to use for the *next* vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   */
  set_normal(normal: Vector3): void;
  /**
   * Set to {@link SKIN_8_WEIGHTS} to indicate that up to 8 bone influences per vertex may be used.
   * By default, only 4 bone influences are used ({@link SKIN_4_WEIGHTS}).
   * **Note:** This function takes an enum, not the exact number of weights.
   */
  set_skin_weight_count(count: int): void;
  /**
   * Specifies the smooth group to use for the *next* vertex. If this is never called, all vertices will have the default smooth group of `0` and will be smoothed with adjacent vertices of the same group. To produce a mesh with flat normals, set the smooth group to `-1`.
   * **Note:** This function actually takes a `uint32_t`, so C# users should use `uint32.MaxValue` instead of `-1` to produce a mesh with flat normals.
   */
  set_smooth_group(index: int): void;
  /**
   * Specifies a tangent to use for the *next* vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   * **Note:** Even though `tangent` is a {@link Plane}, it does not directly represent the tangent plane. Its {@link Plane.x}, {@link Plane.y}, and {@link Plane.z} represent the tangent vector and {@link Plane.d} should be either `-1` or `1`. See also {@link Mesh.ARRAY_TANGENT}.
   */
  set_tangent(tangent: Plane): void;
  /**
   * Specifies a set of UV coordinates to use for the *next* vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   */
  set_uv(uv: Vector2): void;
  /**
   * Specifies an optional second set of UV coordinates to use for the *next* vertex. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   */
  set_uv2(uv2: Vector2): void;
  /**
   * Specifies weight values to use for the *next* vertex. `weights` must contain 4 values. If every vertex needs to have this information set and you fail to submit it for the first vertex, this information may not be used at all.
   */
  set_weights(weights: PackedFloat32Array): void;

  // enum CustomFormat
  /**
   * Limits range of data passed to {@link set_custom} to unsigned normalized 0 to 1 stored in 8 bits per channel. See {@link Mesh.ARRAY_CUSTOM_RGBA8_UNORM}.
   */
  static readonly CUSTOM_RGBA8_UNORM: int;
  /**
   * Limits range of data passed to {@link set_custom} to signed normalized -1 to 1 stored in 8 bits per channel. See {@link Mesh.ARRAY_CUSTOM_RGBA8_SNORM}.
   */
  static readonly CUSTOM_RGBA8_SNORM: int;
  /**
   * Stores data passed to {@link set_custom} as half precision floats, and uses only red and green color channels. See {@link Mesh.ARRAY_CUSTOM_RG_HALF}.
   */
  static readonly CUSTOM_RG_HALF: int;
  /**
   * Stores data passed to {@link set_custom} as half precision floats and uses all color channels. See {@link Mesh.ARRAY_CUSTOM_RGBA_HALF}.
   */
  static readonly CUSTOM_RGBA_HALF: int;
  /**
   * Stores data passed to {@link set_custom} as full precision floats, and uses only red color channel. See {@link Mesh.ARRAY_CUSTOM_R_FLOAT}.
   */
  static readonly CUSTOM_R_FLOAT: int;
  /**
   * Stores data passed to {@link set_custom} as full precision floats, and uses only red and green color channels. See {@link Mesh.ARRAY_CUSTOM_RG_FLOAT}.
   */
  static readonly CUSTOM_RG_FLOAT: int;
  /**
   * Stores data passed to {@link set_custom} as full precision floats, and uses only red, green and blue color channels. See {@link Mesh.ARRAY_CUSTOM_RGB_FLOAT}.
   */
  static readonly CUSTOM_RGB_FLOAT: int;
  /**
   * Stores data passed to {@link set_custom} as full precision floats, and uses all color channels. See {@link Mesh.ARRAY_CUSTOM_RGBA_FLOAT}.
   */
  static readonly CUSTOM_RGBA_FLOAT: int;
  /** Used to indicate a disabled custom channel. */
  static readonly CUSTOM_MAX: int;
  // enum SkinWeightCount
  /** Each individual vertex can be influenced by only 4 bone weights. */
  static readonly SKIN_4_WEIGHTS: int;
  /** Each individual vertex can be influenced by up to 8 bone weights. */
  static readonly SKIN_8_WEIGHTS: int;
}
