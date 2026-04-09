// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * An implementation of A* for finding the shortest path between two vertices on a connected graph in 3D space.
 */
declare class AStar3D extends RefCounted {
  /** If `true` enables the filtering of neighbors via {@link _filter_neighbor}. */
  neighbor_filter_enabled: boolean;
  set_neighbor_filter_enabled(value: boolean): void;
  is_neighbor_filter_enabled(): boolean;

  /**
   * Called when computing the cost between two connected points.
   * Note that this function is hidden in the default {@link AStar3D} class.
   */
  _compute_cost(from_id: int, to_id: int): float;
  /**
   * Called when estimating the cost between a point and the path's ending point.
   * Note that this function is hidden in the default {@link AStar3D} class.
   */
  _estimate_cost(from_id: int, end_id: int): float;
  /**
   * Called when neighboring point enters processing and if {@link neighbor_filter_enabled} is `true`. If `true` is returned the point will not be processed.
   * Note that this function is hidden in the default {@link AStar3D} class.
   */
  _filter_neighbor(from_id: int, neighbor_id: int): boolean;
  /**
   * Adds a new point at the given position with the given identifier. The `id` must be 0 or larger, and the `weight_scale` must be 0.0 or greater.
   * The `weight_scale` is multiplied by the result of {@link _compute_cost} when determining the overall cost of traveling across a segment from a neighboring point to this point. Thus, all else being equal, the algorithm prefers points with lower `weight_scale`s to form a path.
   * If there already exists a point for the given `id`, its position and weight scale are updated to the given values.
   */
  add_point(id: int, position: Vector3 | Vector3i, weight_scale?: float): void;
  /**
   * Returns whether the two given points are directly connected by a segment. If `bidirectional` is `false`, returns whether movement from `id` to `to_id` is possible through this segment.
   */
  are_points_connected(id: int, to_id: int, bidirectional?: boolean): boolean;
  /** Clears all the points and segments. */
  clear(): void;
  /**
   * Creates a segment between the given points. If `bidirectional` is `false`, only movement from `id` to `to_id` is allowed, not the reverse direction.
   */
  connect_points(id: int, to_id: int, bidirectional?: boolean): void;
  /**
   * Deletes the segment between the given points. If `bidirectional` is `false`, only movement from `id` to `to_id` is prevented, and a unidirectional segment possibly remains.
   */
  disconnect_points(id: int, to_id: int, bidirectional?: boolean): void;
  /** Returns the next available point ID with no point associated to it. */
  get_available_point_id(): int;
  /**
   * Returns the ID of the closest point to `to_position`, optionally taking disabled points into account. Returns `-1` if there are no points in the points pool.
   * **Note:** If several points are the closest to `to_position`, the one with the smallest ID will be returned, ensuring a deterministic result.
   */
  get_closest_point(to_position: Vector3 | Vector3i, include_disabled?: boolean): int;
  /**
   * Returns the closest position to `to_position` that resides inside a segment between two connected points.
   * The result is in the segment that goes from `y = 0` to `y = 5`. It's the closest position in the segment to the given point.
   */
  get_closest_position_in_segment(to_position: Vector3 | Vector3i): Vector3;
  /**
   * Returns an array with the IDs of the points that form the path found by AStar3D between the given points. The array is ordered from the starting point to the ending point of the path.
   * If `from_id` point is disabled, returns an empty array (even if `from_id == to_id`).
   * If `from_id` point is not disabled, there is no valid path to the target, and `allow_partial_path` is `true`, returns a path to the point closest to the target that can be reached.
   * **Note:** When `allow_partial_path` is `true` and `to_id` is disabled the search may take an unusually long time to finish.
   * If you change the 2nd point's weight to 3, then the result will be `[1, 4, 3]` instead, because now even though the distance is longer, it's "easier" to get through point 4 than through point 2.
   */
  get_id_path(from_id: int, to_id: int, allow_partial_path?: boolean): PackedInt64Array;
  /**
   * Returns the capacity of the structure backing the points, useful in conjunction with {@link reserve_space}.
   */
  get_point_capacity(): int;
  /** Returns an array with the IDs of the points that form the connection with the given point. */
  get_point_connections(id: int): PackedInt64Array;
  /** Returns the number of points currently in the points pool. */
  get_point_count(): int;
  /** Returns an array of all point IDs. */
  get_point_ids(): PackedInt64Array;
  /**
   * Returns an array with the points that are in the path found by AStar3D between the given points. The array is ordered from the starting point to the ending point of the path.
   * If `from_id` point is disabled, returns an empty array (even if `from_id == to_id`).
   * If `from_id` point is not disabled, there is no valid path to the target, and `allow_partial_path` is `true`, returns a path to the point closest to the target that can be reached.
   * **Note:** This method is not thread-safe; it can only be used from a single {@link Thread} at a given time. Consider using {@link Mutex} to ensure exclusive access to one thread to avoid race conditions.
   * Additionally, when `allow_partial_path` is `true` and `to_id` is disabled the search may take an unusually long time to finish.
   */
  get_point_path(from_id: int, to_id: int, allow_partial_path?: boolean): PackedVector3Array;
  /** Returns the position of the point associated with the given `id`. */
  get_point_position(id: int): Vector3;
  /** Returns the weight scale of the point associated with the given `id`. */
  get_point_weight_scale(id: int): float;
  /** Returns whether a point associated with the given `id` exists. */
  has_point(id: int): boolean;
  /** Returns whether a point is disabled or not for pathfinding. By default, all points are enabled. */
  is_point_disabled(id: int): boolean;
  /** Removes the point associated with the given `id` from the points pool. */
  remove_point(id: int): void;
  /**
   * Reserves space internally for `num_nodes` points. Useful if you're adding a known large number of points at once, such as points on a grid.
   */
  reserve_space(num_nodes: int): void;
  /** Disables or enables the specified point for pathfinding. Useful for making a temporary obstacle. */
  set_point_disabled(id: int, disabled?: boolean): void;
  /** Sets the `position` for the point with the given `id`. */
  set_point_position(id: int, position: Vector3 | Vector3i): void;
  /**
   * Sets the `weight_scale` for the point with the given `id`. The `weight_scale` is multiplied by the result of {@link _compute_cost} when determining the overall cost of traveling across a segment from a neighboring point to this point.
   */
  set_point_weight_scale(id: int, weight_scale: float): void;
}
