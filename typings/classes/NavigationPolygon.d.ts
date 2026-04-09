// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D navigation mesh that describes a traversable surface for pathfinding. */
declare class NavigationPolygon extends Resource {
  /**
   * The distance to erode/shrink the walkable surface when baking the navigation mesh.
   * **Note:** The radius must be equal or higher than `0.0`. If the radius is `0.0`, it won't be possible to fix invalid outline overlaps and other precision errors during the baking process. As a result, some obstacles may be excluded incorrectly from the final navigation mesh, or may delete the navigation mesh's polygons.
   */
  agent_radius: float;
  /**
   * If the baking {@link Rect2} has an area the navigation mesh baking will be restricted to its enclosing area.
   */
  baking_rect: Rect2;
  /** The position offset applied to the {@link baking_rect} {@link Rect2}. */
  baking_rect_offset: Vector2;
  /**
   * The size of the non-navigable border around the bake bounding area defined by the {@link baking_rect} {@link Rect2}.
   * In conjunction with the {@link baking_rect} the border size can be used to bake tile aligned navigation meshes without the tile edges being shrunk by {@link agent_radius}.
   */
  border_size: float;
  /**
   * The cell size used to rasterize the navigation mesh vertices. Must match with the cell size on the navigation map.
   */
  cell_size: float;
  /**
   * The physics layers to scan for static colliders.
   * Only used when {@link parsed_geometry_type} is {@link PARSED_GEOMETRY_STATIC_COLLIDERS} or {@link PARSED_GEOMETRY_BOTH}.
   */
  parsed_collision_mask: int;
  /** Determines which type of nodes will be parsed as geometry. */
  parsed_geometry_type: int;
  /** Partitioning algorithm for creating the navigation mesh polys. */
  sample_partition_type: int;
  /**
   * The group name of nodes that should be parsed for baking source geometry.
   * Only used when {@link source_geometry_mode} is {@link SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN} or {@link SOURCE_GEOMETRY_GROUPS_EXPLICIT}.
   */
  source_geometry_group_name: string;
  /** The source of the geometry used when baking. */
  source_geometry_mode: int;
  set_agent_radius(value: float): void;
  get_agent_radius(): float;
  set_baking_rect(value: Rect2): void;
  get_baking_rect(): Rect2;
  set_baking_rect_offset(value: Vector2): void;
  get_baking_rect_offset(): Vector2;
  set_border_size(value: float): void;
  get_border_size(): float;
  set_cell_size(value: float): void;
  get_cell_size(): float;
  set_parsed_collision_mask(value: int): void;
  get_parsed_collision_mask(): int;
  set_parsed_geometry_type(value: int): void;
  get_parsed_geometry_type(): int;
  set_sample_partition_type(value: int): void;
  get_sample_partition_type(): int;
  set_source_geometry_group_name(value: string): void;
  get_source_geometry_group_name(): string;
  set_source_geometry_mode(value: int): void;
  get_source_geometry_mode(): int;

  /**
   * Appends a {@link PackedVector2Array} that contains the vertices of an outline to the internal array that contains all the outlines.
   */
  add_outline(outline: PackedVector2Array): void;
  /**
   * Adds a {@link PackedVector2Array} that contains the vertices of an outline to the internal array that contains all the outlines at a fixed position.
   */
  add_outline_at_index(outline: PackedVector2Array, index: int): void;
  /** Adds a polygon using the indices of the vertices you get when calling {@link get_vertices}. */
  add_polygon(polygon: PackedInt32Array): void;
  /** Clears the internal arrays for vertices and polygon indices. */
  clear(): void;
  /**
   * Clears the array of the outlines, but it doesn't clear the vertices and the polygons that were created by them.
   */
  clear_outlines(): void;
  /** Clears the array of polygons, but it doesn't clear the array of outlines and vertices. */
  clear_polygons(): void;
  /**
   * Returns the {@link NavigationMesh} resulting from this navigation polygon. This navigation mesh can be used to update the navigation mesh of a region with the {@link NavigationServer3D.region_set_navigation_mesh} API directly.
   */
  get_navigation_mesh(): NavigationMesh | null;
  /**
   * Returns a {@link PackedVector2Array} containing the vertices of an outline that was created in the editor or by script.
   */
  get_outline(idx: int): PackedVector2Array;
  /** Returns the number of outlines that were created in the editor or by script. */
  get_outline_count(): int;
  /**
   * Returns whether or not the specified layer of the {@link parsed_collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_parsed_collision_mask_value(layer_number: int): boolean;
  /** Returns a {@link PackedInt32Array} containing the indices of the vertices of a created polygon. */
  get_polygon(idx: int): PackedInt32Array;
  /** Returns the count of all polygons. */
  get_polygon_count(): int;
  /** Returns a {@link PackedVector2Array} containing all the vertices being used to create the polygons. */
  get_vertices(): PackedVector2Array;
  /** Creates polygons from the outlines added in the editor or by script. */
  make_polygons_from_outlines(): void;
  /**
   * Removes an outline created in the editor or by script. You have to call {@link make_polygons_from_outlines} for the polygons to update.
   */
  remove_outline(idx: int): void;
  /**
   * Changes an outline created in the editor or by script. You have to call {@link make_polygons_from_outlines} for the polygons to update.
   */
  set_outline(idx: int, outline: PackedVector2Array): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link parsed_collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_parsed_collision_mask_value(layer_number: int, value: boolean): void;
  /** Sets the vertices that can be then indexed to create polygons with the {@link add_polygon} method. */
  set_vertices(vertices: PackedVector2Array): void;

  // enum SamplePartitionType
  /** Convex partitioning that results in a navigation mesh with convex polygons. */
  static readonly SAMPLE_PARTITION_CONVEX_PARTITION: int;
  /** Triangulation partitioning that results in a navigation mesh with triangle polygons. */
  static readonly SAMPLE_PARTITION_TRIANGULATE: int;
  /** Represents the size of the {@link SamplePartitionType} enum. */
  static readonly SAMPLE_PARTITION_MAX: int;
  // enum ParsedGeometryType
  /**
   * Parses mesh instances as obstruction geometry. This includes {@link Polygon2D}, {@link MeshInstance2D}, {@link MultiMeshInstance2D}, and {@link TileMap} nodes.
   * Meshes are only parsed when they use a 2D vertices surface format.
   */
  static readonly PARSED_GEOMETRY_MESH_INSTANCES: int;
  /**
   * Parses {@link StaticBody2D} and {@link TileMap} colliders as obstruction geometry. The collider should be in any of the layers specified by {@link parsed_collision_mask}.
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
   * Scans nodes in a group and their child nodes recursively for geometry. The group is specified by {@link source_geometry_group_name}.
   */
  static readonly SOURCE_GEOMETRY_GROUPS_WITH_CHILDREN: int;
  /** Uses nodes in a group for geometry. The group is specified by {@link source_geometry_group_name}. */
  static readonly SOURCE_GEOMETRY_GROUPS_EXPLICIT: int;
  /** Represents the size of the {@link SourceGeometryMode} enum. */
  static readonly SOURCE_GEOMETRY_MAX: int;
}
