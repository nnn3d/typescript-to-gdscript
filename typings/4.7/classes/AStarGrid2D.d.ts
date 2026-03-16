// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An implementation of A* for finding the shortest path between two points on a partial 2D grid. */
declare class AStarGrid2D extends RefCounted {
  /**
   * The cell shape. Affects how the positions are placed in the grid. If changed, {@link update} needs to be called before finding the next path.
   */
  cell_shape: int;
  /**
   * The size of the point cell which will be applied to calculate the resulting point position returned by {@link get_point_path}. If changed, {@link update} needs to be called before finding the next path.
   */
  cell_size: Vector2;
  /**
   * The default {@link Heuristic} which will be used to calculate the cost between two points if {@link _compute_cost} was not overridden.
   */
  default_compute_heuristic: int;
  /**
   * The default {@link Heuristic} which will be used to calculate the cost between the point and the end point if {@link _estimate_cost} was not overridden.
   */
  default_estimate_heuristic: int;
  /**
   * A specific {@link DiagonalMode} mode which will force the path to avoid or accept the specified diagonals.
   */
  diagonal_mode: int;
  /**
   * Enables or disables jumping to skip up the intermediate points and speeds up the searching algorithm.
   * **Note:** Currently, toggling it on disables the consideration of weight scaling in pathfinding.
   */
  jumping_enabled: boolean;
  /**
   * The offset of the grid which will be applied to calculate the resulting point position returned by {@link get_point_path}. If changed, {@link update} needs to be called before finding the next path.
   */
  offset: Vector2;
  /**
   * The region of grid cells available for pathfinding. If changed, {@link update} needs to be called before finding the next path.
   */
  region: Rect2i;
  /**
   * The size of the grid (number of cells of size {@link cell_size} on each axis). If changed, {@link update} needs to be called before finding the next path.
   */
  size: Vector2i;

  /**
   * Called when computing the cost between two connected points.
   * Note that this function is hidden in the default {@link AStarGrid2D} class.
   */
  _compute_cost(from_id: Vector2i, to_id: Vector2i): float;
  /**
   * Called when estimating the cost between a point and the path's ending point.
   * Note that this function is hidden in the default {@link AStarGrid2D} class.
   */
  _estimate_cost(from_id: Vector2i, end_id: Vector2i): float;
  /** Clears the grid and sets the {@link region} to `Rect2i(0, 0, 0, 0)`. */
  clear(): void;
  /**
   * Fills the given `region` on the grid with the specified value for the solid flag.
   * **Note:** Calling {@link update} is not needed after the call of this function.
   */
  fill_solid_region(region: Rect2i, solid?: boolean): void;
  /**
   * Fills the given `region` on the grid with the specified value for the weight scale.
   * **Note:** Calling {@link update} is not needed after the call of this function.
   */
  fill_weight_scale_region(region: Rect2i, weight_scale: float): void;
  /**
   * Returns an array with the IDs of the points that form the path found by AStar2D between the given points. The array is ordered from the starting point to the ending point of the path.
   * If `from_id` point is disabled, returns an empty array (even if `from_id == to_id`).
   * If `from_id` point is not disabled, there is no valid path to the target, and `allow_partial_path` is `true`, returns a path to the point closest to the target that can be reached.
   * **Note:** When `allow_partial_path` is `true` and `to_id` is solid the search may take an unusually long time to finish.
   */
  get_id_path(from_id: Vector2i, to_id: Vector2i, allow_partial_path?: boolean): unknown;
  /**
   * Returns an array of dictionaries with point data (`id`: {@link Vector2i}, `position`: {@link Vector2}, `solid`: [bool], `weight_scale`: [float]) within a `region`.
   */
  get_point_data_in_region(region: Rect2i): Dictionary;
  /**
   * Returns an array with the points that are in the path found by {@link AStarGrid2D} between the given points. The array is ordered from the starting point to the ending point of the path.
   * If `from_id` point is disabled, returns an empty array (even if `from_id == to_id`).
   * If `from_id` point is not disabled, there is no valid path to the target, and `allow_partial_path` is `true`, returns a path to the point closest to the target that can be reached.
   * **Note:** This method is not thread-safe; it can only be used from a single {@link Thread} at a given time. Consider using {@link Mutex} to ensure exclusive access to one thread to avoid race conditions.
   * Additionally, when `allow_partial_path` is `true` and `to_id` is solid the search may take an unusually long time to finish.
   */
  get_point_path(from_id: Vector2i, to_id: Vector2i, allow_partial_path?: boolean): PackedVector2Array;
  /** Returns the position of the point associated with the given `id`. */
  get_point_position(id: Vector2i): Vector2;
  /** Returns the weight scale of the point associated with the given `id`. */
  get_point_weight_scale(id: Vector2i): float;
  /** Indicates that the grid parameters were changed and {@link update} needs to be called. */
  is_dirty(): boolean;
  /**
   * Returns `true` if the `x` and `y` is a valid grid coordinate (id), i.e. if it is inside {@link region}. Equivalent to `region.has_point(Vector2i(x, y))`.
   */
  is_in_bounds(x: int, y: int): boolean;
  /**
   * Returns `true` if the `id` vector is a valid grid coordinate, i.e. if it is inside {@link region}. Equivalent to `region.has_point(id)`.
   */
  is_in_boundsv(id: Vector2i): boolean;
  /** Returns `true` if a point is disabled for pathfinding. By default, all points are enabled. */
  is_point_solid(id: Vector2i): boolean;
  /**
   * Disables or enables the specified point for pathfinding. Useful for making an obstacle. By default, all points are enabled.
   * **Note:** Calling {@link update} is not needed after the call of this function.
   */
  set_point_solid(id: Vector2i, solid?: boolean): void;
  /**
   * Sets the `weight_scale` for the point with the given `id`. The `weight_scale` is multiplied by the result of {@link _compute_cost} when determining the overall cost of traveling across a segment from a neighboring point to this point.
   * **Note:** Calling {@link update} is not needed after the call of this function.
   */
  set_point_weight_scale(id: Vector2i, weight_scale: float): void;
  /**
   * Updates the internal state of the grid according to the parameters to prepare it to search the path. Needs to be called if parameters like {@link region}, {@link cell_size} or {@link offset} are changed. {@link is_dirty} will return `true` if this is the case and this needs to be called.
   * **Note:** All point data (solidity and weight scale) will be cleared.
   */
  update(): void;

  // enum Heuristic
  /**
   * The Euclidean heuristic (https://en.wikipedia.org/wiki/Euclidean_distance) to be used for the pathfinding using the following formula:
   * **Note:** This is also the internal heuristic used in {@link AStar3D} and {@link AStar2D} by default (with the inclusion of possible z-axis coordinate).
   */
  static readonly HEURISTIC_EUCLIDEAN: int;
  /**
   * The Manhattan heuristic (https://en.wikipedia.org/wiki/Taxicab_geometry) to be used for the pathfinding using the following formula:
   * **Note:** This heuristic is intended to be used with 4-side orthogonal movements, provided by setting the {@link diagonal_mode} to {@link DIAGONAL_MODE_NEVER}.
   */
  static readonly HEURISTIC_MANHATTAN: int;
  /** The Octile heuristic to be used for the pathfinding using the following formula: */
  static readonly HEURISTIC_OCTILE: int;
  /**
   * The Chebyshev heuristic (https://en.wikipedia.org/wiki/Chebyshev_distance) to be used for the pathfinding using the following formula:
   */
  static readonly HEURISTIC_CHEBYSHEV: int;
  /** Represents the size of the {@link Heuristic} enum. */
  static readonly HEURISTIC_MAX: int;
  // enum DiagonalMode
  /**
   * The pathfinding algorithm will ignore solid neighbors around the target cell and allow passing using diagonals.
   */
  static readonly DIAGONAL_MODE_ALWAYS: int;
  /** The pathfinding algorithm will ignore all diagonals and the way will be always orthogonal. */
  static readonly DIAGONAL_MODE_NEVER: int;
  /**
   * The pathfinding algorithm will avoid using diagonals if at least two obstacles have been placed around the neighboring cells of the specific path segment.
   */
  static readonly DIAGONAL_MODE_AT_LEAST_ONE_WALKABLE: int;
  /**
   * The pathfinding algorithm will avoid using diagonals if any obstacle has been placed around the neighboring cells of the specific path segment.
   */
  static readonly DIAGONAL_MODE_ONLY_IF_NO_OBSTACLES: int;
  /** Represents the size of the {@link DiagonalMode} enum. */
  static readonly DIAGONAL_MODE_MAX: int;
  // enum CellShape
  /** Rectangular cell shape. */
  static readonly CELL_SHAPE_SQUARE: int;
  /**
   * Diamond cell shape (for isometric look). Cell coordinates layout where the horizontal axis goes up-right, and the vertical one goes down-right.
   */
  static readonly CELL_SHAPE_ISOMETRIC_RIGHT: int;
  /**
   * Diamond cell shape (for isometric look). Cell coordinates layout where the horizontal axis goes down-right, and the vertical one goes down-left.
   */
  static readonly CELL_SHAPE_ISOMETRIC_DOWN: int;
  /** Represents the size of the {@link CellShape} enum. */
  static readonly CELL_SHAPE_MAX: int;
}
