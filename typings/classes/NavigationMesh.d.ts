// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A navigation mesh that defines traversable areas and obstacles. */
declare class NavigationMesh extends Resource {
  /**
   * The minimum floor to ceiling height that will still allow the floor area to be considered walkable.
   * **Note:** While baking, this value will be rounded up to the nearest multiple of {@link cell_height}.
   */
  agent_height: float;
  /**
   * The minimum ledge height that is considered to still be traversable.
   * **Note:** While baking, this value will be rounded down to the nearest multiple of {@link cell_height}.
   */
  agent_max_climb: float;
  /** The maximum slope that is considered walkable, in degrees. */
  agent_max_slope: float;
  /**
   * The distance to erode/shrink the walkable area of the heightfield away from obstructions.
   * **Note:** While baking, this value will be rounded up to the nearest multiple of {@link cell_size}.
   * **Note:** The radius must be equal or higher than `0.0`. If the radius is `0.0`, it won't be possible to fix invalid outline overlaps and other precision errors during the baking process. As a result, some obstacles may be excluded incorrectly from the final navigation mesh, or may delete the navigation mesh's polygons.
   */
  agent_radius: float;
  /**
   * The size of the non-navigable border around the bake bounding area.
   * In conjunction with the {@link filter_baking_aabb} and a {@link edge_max_error} value at `1.0` or below the border size can be used to bake tile aligned navigation meshes without the tile edges being shrunk by {@link agent_radius}.
   * **Note:** If this value is not `0.0`, it will be rounded up to the nearest multiple of {@link cell_size} during baking.
   */
  border_size: float;
  /**
   * The cell height used to rasterize the navigation mesh vertices on the Y axis. Must match with the cell height on the navigation map.
   */
  cell_height: float;
  /**
   * The cell size used to rasterize the navigation mesh vertices on the XZ plane. Must match with the cell size on the navigation map.
   */
  cell_size: float;
  /** The sampling distance to use when generating the detail mesh, in cell unit. */
  detail_sample_distance: float;
  /** The maximum distance the detail mesh surface should deviate from heightfield, in cell unit. */
  detail_sample_max_error: float;
  /** The maximum distance a simplified contour's border edges should deviate the original raw contour. */
  edge_max_error: float;
  /**
   * The maximum allowed length for contour edges along the border of the mesh. A value of `0.0` disables this feature.
   * **Note:** While baking, this value will be rounded up to the nearest multiple of {@link cell_size}.
   */
  edge_max_length: float;
  /**
   * If the baking {@link AABB} has a volume the navigation mesh baking will be restricted to its enclosing area.
   */
  filter_baking_aabb: AABB;
  /** The position offset applied to the {@link filter_baking_aabb} {@link AABB}. */
  filter_baking_aabb_offset: Vector3;
  /** If `true`, marks spans that are ledges as non-walkable. */
  filter_ledge_spans: boolean;
  /**
   * If `true`, marks non-walkable spans as walkable if their maximum is within {@link agent_max_climb} of a walkable neighbor.
   */
  filter_low_hanging_obstacles: boolean;
  /**
   * If `true`, marks walkable spans as not walkable if the clearance above the span is less than {@link agent_height}.
   */
  filter_walkable_low_height_spans: boolean;
  /**
   * The physics layers to scan for static colliders.
   * Only used when {@link geometry_parsed_geometry_type} is {@link PARSED_GEOMETRY_STATIC_COLLIDERS} or {@link PARSED_GEOMETRY_BOTH}.
   */
  geometry_collision_mask: int;
  /** Determines which type of nodes will be parsed as geometry. */
  geometry_parsed_geometry_type: int;
  /** The source of the geometry used when baking. */
  geometry_source_geometry_mode: int;
  /**
   * The name of the group to scan for geometry.
   * Only used when {@link geometry_source_geometry_mode} is {@link SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN} or {@link SOURCE_GEOMETRY_GROUPS_EXPLICIT}.
   */
  geometry_source_group_name: string;
  /**
   * Any regions with a size smaller than this will be merged with larger regions if possible.
   * **Note:** This value will be squared to calculate the number of cells. For example, a value of 20 will set the number of cells to 400.
   */
  region_merge_size: float;
  /**
   * The minimum size of a region for it to be created.
   * **Note:** This value will be squared to calculate the minimum number of cells allowed to form isolated island areas. For example, a value of 8 will set the number of cells to 64.
   */
  region_min_size: float;
  /** Partitioning algorithm for creating the navigation mesh polys. */
  sample_partition_type: int;
  /**
   * The maximum number of vertices allowed for polygons generated during the contour to polygon conversion process.
   */
  vertices_per_polygon: float;
  set_agent_height(value: float): void;
  get_agent_height(): float;
  set_agent_max_climb(value: float): void;
  get_agent_max_climb(): float;
  set_agent_max_slope(value: float): void;
  get_agent_max_slope(): float;
  set_agent_radius(value: float): void;
  get_agent_radius(): float;
  set_border_size(value: float): void;
  get_border_size(): float;
  set_cell_height(value: float): void;
  get_cell_height(): float;
  set_cell_size(value: float): void;
  get_cell_size(): float;
  set_detail_sample_distance(value: float): void;
  get_detail_sample_distance(): float;
  set_detail_sample_max_error(value: float): void;
  get_detail_sample_max_error(): float;
  set_edge_max_error(value: float): void;
  get_edge_max_error(): float;
  set_edge_max_length(value: float): void;
  get_edge_max_length(): float;
  set_filter_baking_aabb(value: AABB): void;
  get_filter_baking_aabb(): AABB;
  set_filter_baking_aabb_offset(value: Vector3 | Vector3i): void;
  get_filter_baking_aabb_offset(): Vector3;
  set_filter_ledge_spans(value: boolean): void;
  get_filter_ledge_spans(): boolean;
  set_filter_low_hanging_obstacles(value: boolean): void;
  get_filter_low_hanging_obstacles(): boolean;
  set_filter_walkable_low_height_spans(value: boolean): void;
  get_filter_walkable_low_height_spans(): boolean;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_parsed_geometry_type(value: int): void;
  get_parsed_geometry_type(): int;
  set_source_geometry_mode(value: int): void;
  get_source_geometry_mode(): int;
  set_source_group_name(value: string): void;
  get_source_group_name(): string;
  set_region_merge_size(value: float): void;
  get_region_merge_size(): float;
  set_region_min_size(value: float): void;
  get_region_min_size(): float;
  set_sample_partition_type(value: int): void;
  get_sample_partition_type(): int;
  set_vertices_per_polygon(value: float): void;
  get_vertices_per_polygon(): float;

  /** Adds a polygon using the indices of the vertices you get when calling {@link get_vertices}. */
  add_polygon(polygon: PackedInt32Array | Array<unknown>): void;
  /** Clears the internal arrays for vertices and polygon indices. */
  clear(): void;
  /** Clears the array of polygons, but it doesn't clear the array of vertices. */
  clear_polygons(): void;
  /**
   * Initializes the navigation mesh by setting the vertices and indices according to a {@link Mesh}.
   * **Note:** The given `mesh` must be of type {@link Mesh.PRIMITIVE_TRIANGLES} and have an index array.
   */
  create_from_mesh(mesh: Mesh): void;
  /**
   * Returns whether or not the specified layer of the {@link geometry_collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /** Returns a {@link PackedInt32Array} containing the indices of the vertices of a created polygon. */
  get_polygon(idx: int): PackedInt32Array;
  /** Returns the number of polygons in the navigation mesh. */
  get_polygon_count(): int;
  /** Returns a {@link PackedVector3Array} containing all the vertices being used to create the polygons. */
  get_vertices(): PackedVector3Array;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link geometry_collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
  /** Sets the vertices that can be then indexed to create polygons with the {@link add_polygon} method. */
  set_vertices(vertices: PackedVector3Array | Array<unknown>): void;

  // enum SamplePartitionType
  /**
   * Watershed partitioning. Generally the best choice if you precompute the navigation mesh, use this if you have large open areas.
   */
  static readonly SAMPLE_PARTITION_WATERSHED: int;
  /** Monotone partitioning. Use this if you want fast navigation mesh generation. */
  static readonly SAMPLE_PARTITION_MONOTONE: int;
  /** Layer partitioning. Good choice to use for tiled navigation mesh with medium and small sized tiles. */
  static readonly SAMPLE_PARTITION_LAYERS: int;
  /** Represents the size of the {@link SamplePartitionType} enum. */
  static readonly SAMPLE_PARTITION_MAX: int;
  // enum ParsedGeometryType
  /**
   * Parses mesh instances as geometry. This includes {@link MeshInstance3D}, {@link CSGShape3D}, and {@link GridMap} nodes.
   */
  static readonly PARSED_GEOMETRY_MESH_INSTANCES: int;
  /**
   * Parses {@link StaticBody3D} colliders as geometry. The collider should be in any of the layers specified by {@link geometry_collision_mask}.
   */
  static readonly PARSED_GEOMETRY_STATIC_COLLIDERS: int;
  /** Both {@link PARSED_GEOMETRY_MESH_INSTANCES} and {@link PARSED_GEOMETRY_STATIC_COLLIDERS}. */
  static readonly PARSED_GEOMETRY_BOTH: int;
  /** Represents the size of the {@link ParsedGeometryType} enum. */
  static readonly PARSED_GEOMETRY_MAX: int;
  // enum SourceGeometryMode
  /** Scans the child nodes of the root node recursively for geometry. */
  static readonly SOURCE_GEOMETRY_ROOT_NODE_CHILDREN: int;
  /**
   * Scans nodes in a group and their child nodes recursively for geometry. The group is specified by {@link geometry_source_group_name}.
   */
  static readonly SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN: int;
  /** Uses nodes in a group for geometry. The group is specified by {@link geometry_source_group_name}. */
  static readonly SOURCE_GEOMETRY_GROUPS_EXPLICIT: int;
  /** Represents the size of the {@link SourceGeometryMode} enum. */
  static readonly SOURCE_GEOMETRY_MAX: int;
}
