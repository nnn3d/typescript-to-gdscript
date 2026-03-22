// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides parameters for 2D navigation path queries. */
declare class NavigationPathQueryParameters2D extends RefCounted {
  /**
   * The list of region {@link RID}s that will be excluded from the path query. Use {@link NavigationRegion2D.get_rid} to get the {@link RID} associated with a {@link NavigationRegion2D} node.
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then set it to the property again.
   */
  excluded_regions: unknown;
  /**
   * The list of region {@link RID}s that will be included by the path query. Use {@link NavigationRegion2D.get_rid} to get the {@link RID} associated with a {@link NavigationRegion2D} node. If left empty all regions are included. If a region ends up being both included and excluded at the same time it will be excluded.
   * **Note:** The returned array is copied and any changes to it will not update the original property value. To update the value you need to modify the returned array, and then set it to the property again.
   */
  included_regions: unknown;
  /** The navigation map {@link RID} used in the path query. */
  map: RID;
  /** Additional information to include with the navigation path. */
  metadata_flags: int;
  /** The navigation layers the query will use (as a bitmask). */
  navigation_layers: int;
  /**
   * The path postprocessing applied to the raw path corridor found by the {@link pathfinding_algorithm}.
   */
  path_postprocessing: int;
  /**
   * The maximum allowed length of the returned path in world units. A path will be clipped when going over this length. A value of `0` or below counts as disabled.
   */
  path_return_max_length: float;
  /**
   * The maximum allowed radius in world units that the returned path can be from the path start. The path will be clipped when going over this radius. A value of `0` or below counts as disabled.
   * **Note:** This will perform a circle shaped clip operation on the path with the first path position being the circle's center position.
   */
  path_return_max_radius: float;
  /**
   * The maximum distance a searched polygon can be away from the start polygon before the pathfinding cancels the search for a path to the (possibly unreachable or very far away) target position polygon. In this case the pathfinding resets and builds a path from the start polygon to the polygon that was found closest to the target position so far. A value of `0` or below counts as unlimited. In case of unlimited the pathfinding will search all polygons connected with the start polygon until either the target position polygon is found or all available polygon search options are exhausted.
   */
  path_search_max_distance: float;
  /**
   * The maximum number of polygons that are searched before the pathfinding cancels the search for a path to the (possibly unreachable or very far away) target position polygon. In this case the pathfinding resets and builds a path from the start polygon to the polygon that was found closest to the target position so far. A value of `0` or below counts as unlimited. In case of unlimited the pathfinding will search all polygons connected with the start polygon until either the target position polygon is found or all available polygon search options are exhausted.
   */
  path_search_max_polygons: int;
  /** The pathfinding algorithm used in the path query. */
  pathfinding_algorithm: int;
  /** The path simplification amount in worlds units. */
  simplify_epsilon: float;
  /**
   * If `true` a simplified version of the path will be returned with less critical path points removed. The simplification amount is controlled by {@link simplify_epsilon}. The simplification uses a variant of Ramer-Douglas-Peucker algorithm for curve point decimation.
   * Path simplification can be helpful to mitigate various path following issues that can arise with certain agent types and script behaviors. E.g. "steering" agents or avoidance in "open fields".
   */
  simplify_path: boolean;
  /** The pathfinding start position in global coordinates. */
  start_position: Vector2;
  /** The pathfinding target position in global coordinates. */
  target_position: Vector2;
  set_excluded_regions(value: unknown): void;
  get_excluded_regions(): unknown;
  set_included_regions(value: unknown): void;
  get_included_regions(): unknown;
  set_map(value: RID): void;
  get_map(): RID;
  set_metadata_flags(value: int): void;
  get_metadata_flags(): int;
  set_navigation_layers(value: int): void;
  get_navigation_layers(): int;
  set_path_postprocessing(value: int): void;
  get_path_postprocessing(): int;
  set_path_return_max_length(value: float): void;
  get_path_return_max_length(): float;
  set_path_return_max_radius(value: float): void;
  get_path_return_max_radius(): float;
  set_path_search_max_distance(value: float): void;
  get_path_search_max_distance(): float;
  set_path_search_max_polygons(value: int): void;
  get_path_search_max_polygons(): int;
  set_pathfinding_algorithm(value: int): void;
  get_pathfinding_algorithm(): int;
  set_simplify_epsilon(value: float): void;
  get_simplify_epsilon(): float;
  set_simplify_path(value: boolean): void;
  get_simplify_path(): boolean;
  set_start_position(value: Vector2): void;
  get_start_position(): Vector2;
  set_target_position(value: Vector2): void;
  get_target_position(): Vector2;

  // enum PathfindingAlgorithm
  /** The path query uses the default A* pathfinding algorithm. */
  static readonly PATHFINDING_ALGORITHM_ASTAR: int;
  // enum PathPostProcessing
  /**
   * Applies a funnel algorithm to the raw path corridor found by the pathfinding algorithm. This will result in the shortest path possible inside the path corridor. This postprocessing very much depends on the navigation mesh polygon layout and the created corridor. Especially tile- or gridbased layouts can face artificial corners with diagonal movement due to a jagged path corridor imposed by the cell shapes.
   */
  static readonly PATH_POSTPROCESSING_CORRIDORFUNNEL: int;
  /**
   * Centers every path position in the middle of the traveled navigation mesh polygon edge. This creates better paths for tile- or gridbased layouts that restrict the movement to the cells center.
   */
  static readonly PATH_POSTPROCESSING_EDGECENTERED: int;
  /** Applies no postprocessing and returns the raw path corridor as found by the pathfinding algorithm. */
  static readonly PATH_POSTPROCESSING_NONE: int;
  // enum PathMetadataFlags
  /** Don't include any additional metadata about the returned path. */
  static readonly PATH_METADATA_INCLUDE_NONE: int;
  /** Include the type of navigation primitive (region or link) that each point of the path goes through. */
  static readonly PATH_METADATA_INCLUDE_TYPES: int;
  /** Include the {@link RID}s of the regions and links that each point of the path goes through. */
  static readonly PATH_METADATA_INCLUDE_RIDS: int;
  /**
   * Include the `ObjectID`s of the {@link Object}s which manage the regions and links each point of the path goes through.
   */
  static readonly PATH_METADATA_INCLUDE_OWNERS: int;
  /** Include all available metadata about the returned path. */
  static readonly PATH_METADATA_INCLUDE_ALL: int;
}
