// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Node that instances meshes into a scenario. */
declare class MeshInstance3D extends GeometryInstance3D {
  /** The {@link Mesh} resource for the instance. */
  mesh: Mesh;
  /**
   * {@link NodePath} to the {@link Skeleton3D} associated with the instance.
   * **Note:** The default value of this property has changed in Godot 4.6. Enable {@link ProjectSettings.animation/compatibility/default_parent_skeleton_in_mesh_instance_3d} if the old behavior is needed for compatibility.
   */
  skeleton: string;
  /** The {@link Skin} to be used by this instance. */
  skin: Skin;

  /**
   * Takes a snapshot from the current {@link ArrayMesh} with all blend shapes applied according to their current weights and bakes it to the provided `existing` mesh. If no `existing` mesh is provided a new {@link ArrayMesh} is created, baked and returned. Mesh surface materials are not copied.
   * **Performance:** {@link Mesh} data needs to be received from the GPU, stalling the {@link RenderingServer} in the process.
   */
  bake_mesh_from_current_blend_shape_mix(existing?: ArrayMesh): ArrayMesh;
  /**
   * Takes a snapshot of the current animated skeleton pose of the skinned mesh and bakes it to the provided `existing` mesh. If no `existing` mesh is provided a new {@link ArrayMesh} is created, baked, and returned. Requires a skeleton with a registered skin to work. Blendshapes are ignored. Mesh surface materials are not copied.
   * **Performance:** {@link Mesh} data needs to be retrieved from the GPU, stalling the {@link RenderingServer} in the process.
   */
  bake_mesh_from_current_skeleton_pose(existing?: ArrayMesh): ArrayMesh;
  /**
   * This helper creates a {@link StaticBody3D} child node with a {@link ConvexPolygonShape3D} collision shape calculated from the mesh geometry. It's mainly used for testing.
   * If `clean` is `true` (default), duplicate and interior vertices are removed automatically. You can set it to `false` to make the process faster if not needed.
   * If `simplify` is `true`, the geometry can be further simplified to reduce the number of vertices. Disabled by default.
   */
  create_convex_collision(clean?: boolean, simplify?: boolean): void;
  /**
   * This helper creates a {@link MeshInstance3D} child node with gizmos at every vertex calculated from the mesh geometry. It's mainly used for testing.
   */
  create_debug_tangents(): void;
  /**
   * This helper creates a {@link StaticBody3D} child node with multiple {@link ConvexPolygonShape3D} collision shapes calculated from the mesh geometry via convex decomposition. The convex decomposition operation can be controlled with parameters from the optional `settings`.
   */
  create_multiple_convex_collisions(settings?: MeshConvexDecompositionSettings): void;
  /**
   * This helper creates a {@link StaticBody3D} child node with a {@link ConcavePolygonShape3D} collision shape calculated from the mesh geometry. It's mainly used for testing.
   */
  create_trimesh_collision(): void;
  /**
   * Returns the index of the blend shape with the given `name`. Returns `-1` if no blend shape with this name exists, including when {@link mesh} is `null`.
   */
  find_blend_shape_by_name(name: string): int;
  /**
   * Returns the {@link Material} that will be used by the {@link Mesh} when drawing. This can return the {@link GeometryInstance3D.material_override}, the surface override {@link Material} defined in this {@link MeshInstance3D}, or the surface {@link Material} defined in the {@link mesh}. For example, if {@link GeometryInstance3D.material_override} is used, all surfaces will return the override material.
   * Returns `null` if no material is active, including when {@link mesh} is `null`.
   */
  get_active_material(surface: int): Material;
  /** Returns the number of blend shapes available. Produces an error if {@link mesh} is `null`. */
  get_blend_shape_count(): int;
  /**
   * Returns the value of the blend shape at the given `blend_shape_idx`. Returns `0.0` and produces an error if {@link mesh} is `null` or doesn't have a blend shape at that index.
   */
  get_blend_shape_value(blend_shape_idx: int): float;
  /**
   * Returns the internal {@link SkinReference} containing the skeleton's {@link RID} attached to this RID. See also {@link Resource.get_rid}, {@link SkinReference.get_skeleton}, and {@link RenderingServer.instance_attach_skeleton}.
   */
  get_skin_reference(): SkinReference;
  /**
   * Returns the override {@link Material} for the specified `surface` of the {@link Mesh} resource. See also {@link get_surface_override_material_count}.
   * **Note:** This returns the {@link Material} associated to the {@link MeshInstance3D}'s Surface Material Override properties, not the material within the {@link Mesh} resource. To get the material within the {@link Mesh} resource, use {@link Mesh.surface_get_material} instead.
   */
  get_surface_override_material(surface: int): Material;
  /**
   * Returns the number of surface override materials. This is equivalent to {@link Mesh.get_surface_count}. See also {@link get_surface_override_material}.
   */
  get_surface_override_material_count(): int;
  /**
   * Sets the value of the blend shape at `blend_shape_idx` to `value`. Produces an error if {@link mesh} is `null` or doesn't have a blend shape at that index.
   */
  set_blend_shape_value(blend_shape_idx: int, value: float): void;
  /**
   * Sets the override `material` for the specified `surface` of the {@link Mesh} resource. This material is associated with this {@link MeshInstance3D} rather than with {@link mesh}.
   * **Note:** This assigns the {@link Material} associated to the {@link MeshInstance3D}'s Surface Material Override properties, not the material within the {@link Mesh} resource. To set the material within the {@link Mesh} resource, use {@link Mesh.surface_set_material} instead.
   */
  set_surface_override_material(surface: int, material: Material): void;
}
