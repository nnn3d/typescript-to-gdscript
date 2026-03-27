// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Contains baked voxel global illumination data for use in a {@link VoxelGI} node. */
declare class VoxelGIData extends Resource {
  /**
   * The normal bias to use for indirect lighting and reflections. Higher values reduce self-reflections visible in non-rough materials, at the cost of more visible light leaking and flatter-looking indirect lighting. To prioritize hiding self-reflections over lighting quality, set {@link bias} to `0.0` and {@link normal_bias} to a value between `1.0` and `2.0`.
   */
  bias: float;
  /**
   * The dynamic range to use (`1.0` represents a low dynamic range scene brightness). Higher values can be used to provide brighter indirect lighting, at the cost of more visible color banding in dark areas (both in indirect lighting and reflections). To avoid color banding, it's recommended to use the lowest value that does not result in visible light clipping.
   */
  dynamic_range: float;
  /**
   * The energy of the indirect lighting and reflections produced by the {@link VoxelGI} node. Higher values result in brighter indirect lighting. If indirect lighting looks too flat, try decreasing {@link propagation} while increasing {@link energy} at the same time. See also {@link use_two_bounces} which influences the indirect lighting's effective brightness.
   */
  energy: float;
  /**
   * If `true`, {@link Environment} lighting is ignored by the {@link VoxelGI} node. If `false`, {@link Environment} lighting is taken into account by the {@link VoxelGI} node. {@link Environment} lighting updates in real-time, which means it can be changed without having to bake the {@link VoxelGI} node again.
   */
  interior: boolean;
  /**
   * The normal bias to use for indirect lighting and reflections. Higher values reduce self-reflections visible in non-rough materials, at the cost of more visible light leaking and flatter-looking indirect lighting. See also {@link bias}. To prioritize hiding self-reflections over lighting quality, set {@link bias} to `0.0` and {@link normal_bias} to a value between `1.0` and `2.0`.
   */
  normal_bias: float;
  /**
   * The multiplier to use when light bounces off a surface. Higher values result in brighter indirect lighting. If indirect lighting looks too flat, try decreasing {@link propagation} while increasing {@link energy} at the same time. See also {@link use_two_bounces} which influences the indirect lighting's effective brightness.
   */
  propagation: float;
  /**
   * If `true`, performs two bounces of indirect lighting instead of one. This makes indirect lighting look more natural and brighter at a small performance cost. The second bounce is also visible in reflections. If the scene appears too bright after enabling {@link use_two_bounces}, adjust {@link propagation} and {@link energy}.
   */
  use_two_bounces: boolean;
  set_bias(value: float): void;
  get_bias(): float;
  set_dynamic_range(value: float): void;
  get_dynamic_range(): float;
  set_energy(value: float): void;
  get_energy(): float;
  set_interior(value: boolean): void;
  is_interior(): boolean;
  set_normal_bias(value: float): void;
  get_normal_bias(): float;
  set_propagation(value: float): void;
  get_propagation(): float;
  set_use_two_bounces(value: boolean): void;
  is_using_two_bounces(): boolean;

  /**
   * Initializes this {@link VoxelGIData} with the specified data. `octree_cells` must be a multiple of 32. `octree_cells` must be double the size of `data_cells`. The allocated data can be retrieved later using the various getter methods.
   */
  allocate(to_cell_xform: Transform3D, aabb: AABB, octree_size: Vector3, octree_cells: PackedByteArray, data_cells: PackedByteArray, distance_field: PackedByteArray, level_counts: PackedInt32Array): void;
  /**
   * Returns the bounds of the baked voxel data as an {@link AABB}, which should match {@link VoxelGI.size} after being baked (which only contains the size as a {@link Vector3}).
   * **Note:** If the size was modified without baking the VoxelGI data, then the value of {@link get_bounds} and {@link VoxelGI.size} will not match.
   */
  get_bounds(): AABB;
  /** Returns the baked cell data for this {@link VoxelGIData}. */
  get_data_cells(): PackedByteArray;
  /** Returns the baked level counts for this {@link VoxelGIData}. */
  get_level_counts(): PackedInt32Array;
  /** Returns the baked octree cell data for this {@link VoxelGIData}. */
  get_octree_cells(): PackedByteArray;
  /**
   * Returns the baked octree size for this {@link VoxelGIData}, which corresponds to the number of subdivisions per axis. This can be viewed in the editor by hovering the **Bake VoxelGI** button at the top of the 3D editor viewport when a {@link VoxelGI} node is selected and looking at the **Subdivisions** field in the tooltip.
   */
  get_octree_size(): Vector3;
  /** Returns the baked cell transform for this {@link VoxelGIData}. */
  get_to_cell_xform(): Transform3D;
}
