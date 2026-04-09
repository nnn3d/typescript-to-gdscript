// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Parameters to be used with a {@link Mesh} convex decomposition operation. */
declare class MeshConvexDecompositionSettings extends RefCounted {
  /** If `true`, uses approximation for computing convex hulls. */
  convex_hull_approximation: boolean;
  /**
   * Controls the precision of the convex-hull generation process during the clipping plane selection stage. Ranges from `1` to `16`.
   */
  convex_hull_downsampling: int;
  /** Maximum concavity. Ranges from `0.0` to `1.0`. */
  max_concavity: float;
  /** The maximum number of convex hulls to produce from the merge operation. */
  max_convex_hulls: int;
  /** Controls the maximum number of triangles per convex-hull. Ranges from `4` to `1024`. */
  max_num_vertices_per_convex_hull: int;
  /** Controls the adaptive sampling of the generated convex-hulls. Ranges from `0.0` to `0.01`. */
  min_volume_per_convex_hull: float;
  /** Mode for the approximate convex decomposition. */
  mode: int;
  /** If `true`, normalizes the mesh before applying the convex decomposition. */
  normalize_mesh: boolean;
  /** Controls the granularity of the search for the "best" clipping plane. Ranges from `1` to `16`. */
  plane_downsampling: int;
  /**
   * If `true`, projects output convex hull vertices onto the original source mesh to increase floating-point accuracy of the results.
   */
  project_hull_vertices: boolean;
  /** Maximum number of voxels generated during the voxelization stage. */
  resolution: int;
  /** Controls the bias toward clipping along revolution axes. Ranges from `0.0` to `1.0`. */
  revolution_axes_clipping_bias: float;
  /** Controls the bias toward clipping along symmetry planes. Ranges from `0.0` to `1.0`. */
  symmetry_planes_clipping_bias: float;
  set_convex_hull_approximation(value: boolean): void;
  get_convex_hull_approximation(): boolean;
  set_convex_hull_downsampling(value: int): void;
  get_convex_hull_downsampling(): int;
  set_max_concavity(value: float): void;
  get_max_concavity(): float;
  set_max_convex_hulls(value: int): void;
  get_max_convex_hulls(): int;
  set_max_num_vertices_per_convex_hull(value: int): void;
  get_max_num_vertices_per_convex_hull(): int;
  set_min_volume_per_convex_hull(value: float): void;
  get_min_volume_per_convex_hull(): float;
  set_mode(value: int): void;
  get_mode(): int;
  set_normalize_mesh(value: boolean): void;
  get_normalize_mesh(): boolean;
  set_plane_downsampling(value: int): void;
  get_plane_downsampling(): int;
  set_project_hull_vertices(value: boolean): void;
  get_project_hull_vertices(): boolean;
  set_resolution(value: int): void;
  get_resolution(): int;
  set_revolution_axes_clipping_bias(value: float): void;
  get_revolution_axes_clipping_bias(): float;
  set_symmetry_planes_clipping_bias(value: float): void;
  get_symmetry_planes_clipping_bias(): float;

  // enum Mode
  /** Constant for voxel-based approximate convex decomposition. */
  static readonly CONVEX_DECOMPOSITION_MODE_VOXEL: int;
  /** Constant for tetrahedron-based approximate convex decomposition. */
  static readonly CONVEX_DECOMPOSITION_MODE_TETRAHEDRON: int;
}
