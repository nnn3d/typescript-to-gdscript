// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 3D agent used to pathfind to a position while avoiding obstacles. */
declare class NavigationAgent3D extends Node {
  /**
   * If `true` the agent is registered for an RVO avoidance callback on the {@link NavigationServer3D}. When {@link velocity} is set and the processing is completed a `safe_velocity` Vector3 is received with a signal connection to {@link velocity_computed}. Avoidance processing with many registered agents has a significant performance cost and should only be enabled on agents that currently require it.
   */
  avoidance_enabled: boolean;
  /**
   * A bitfield determining the avoidance layers for this NavigationAgent. Other agents with a matching bit on the {@link avoidance_mask} will avoid this agent.
   */
  avoidance_layers: int;
  /**
   * A bitfield determining what other avoidance agents and obstacles this NavigationAgent will avoid when a bit matches at least one of their {@link avoidance_layers}.
   */
  avoidance_mask: int;
  /**
   * The agent does not adjust the velocity for other agents that would match the {@link avoidance_mask} but have a lower {@link avoidance_priority}. This in turn makes the other agents with lower priority adjust their velocities even more to avoid collision with this agent.
   */
  avoidance_priority: float;
  /** If `true` shows debug visuals for this agent. */
  debug_enabled: boolean;
  /** If {@link debug_use_custom} is `true` uses this color for this agent instead of global color. */
  debug_path_custom_color: Color;
  /**
   * If {@link debug_use_custom} is `true` uses this rasterized point size for rendering path points for this agent instead of global point size.
   */
  debug_path_custom_point_size: float;
  /** If `true` uses the defined {@link debug_path_custom_color} for this agent instead of global color. */
  debug_use_custom: boolean;
  /**
   * The height of the avoidance agent. Agents will ignore other agents or obstacles that are above or below their current position + height in 2D avoidance. Does nothing in 3D avoidance which uses radius spheres alone.
   */
  height: float;
  /**
   * If `true`, and the agent uses 2D avoidance, it will remember the set y-axis velocity and reapply it after the avoidance step. While 2D avoidance has no y-axis and simulates on a flat plane this setting can help to soften the most obvious clipping on uneven 3D geometry.
   */
  keep_y_velocity: boolean;
  /** The maximum number of neighbors for the agent to consider. */
  max_neighbors: int;
  /** The maximum speed that an agent can move. */
  max_speed: float;
  /**
   * A bitfield determining which navigation layers of navigation regions this agent will use to calculate a path. Changing it during runtime will clear the current navigation path and generate a new one, according to the new navigation layers.
   */
  navigation_layers: int;
  /** The distance to search for other agents. */
  neighbor_distance: float;
  /**
   * The distance threshold before a path point is considered to be reached. This allows agents to not have to hit a path point on the path exactly, but only to reach its general area. If this value is set too high, the NavigationAgent will skip points on the path, which can lead to it leaving the navigation mesh. If this value is set too low, the NavigationAgent will be stuck in a repath loop because it will constantly overshoot the distance to the next point on each physics frame update.
   */
  path_desired_distance: float;
  /**
   * The height offset is subtracted from the y-axis value of any vector path position for this NavigationAgent. The NavigationAgent height offset does not change or influence the navigation mesh or pathfinding query result. Additional navigation maps that use regions with navigation meshes that the developer baked with appropriate agent radius or height values are required to support different-sized agents.
   */
  path_height_offset: float;
  /**
   * The maximum distance the agent is allowed away from the ideal path to the final position. This can happen due to trying to avoid collisions. When the maximum distance is exceeded, it recalculates the ideal path.
   */
  path_max_distance: float;
  /** Additional information to return with the navigation path. */
  path_metadata_flags: int;
  /**
   * The path postprocessing applied to the raw path corridor found by the {@link pathfinding_algorithm}.
   */
  path_postprocessing: int;
  /**
   * The maximum allowed length of the returned path in world units. A path will be clipped when going over this length.
   */
  path_return_max_length: float;
  /**
   * The maximum allowed radius in world units that the returned path can be from the path start. The path will be clipped when going over this radius. Compared to {@link path_return_max_length}, this allows the agent to go that much further, if they need to walk around a corner.
   * **Note:** This will perform a sphere clip considering only the actual navigation mesh path points with the first path position being the sphere's center.
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
  /**
   * The radius of the avoidance agent. This is the "body" of the avoidance agent and not the avoidance maneuver starting radius (which is controlled by {@link neighbor_distance}).
   * Does not affect normal pathfinding. To change an actor's pathfinding radius bake {@link NavigationMesh} resources with a different {@link NavigationMesh.agent_radius} property and use different navigation maps for each actor size.
   */
  radius: float;
  /** The path simplification amount in worlds units. */
  simplify_epsilon: float;
  /**
   * If `true` a simplified version of the path will be returned with less critical path points removed. The simplification amount is controlled by {@link simplify_epsilon}. The simplification uses a variant of Ramer-Douglas-Peucker algorithm for curve point decimation.
   * Path simplification can be helpful to mitigate various path following issues that can arise with certain agent types and script behaviors. E.g. "steering" agents or avoidance in "open fields".
   */
  simplify_path: boolean;
  /**
   * The distance threshold before the target is considered to be reached. On reaching the target, {@link target_reached} is emitted and navigation ends (see {@link is_navigation_finished} and {@link navigation_finished}).
   * You can make navigation end early by setting this property to a value greater than {@link path_desired_distance} (navigation will end before reaching the last waypoint).
   * You can also make navigation end closer to the target than each individual path position by setting this property to a value lower than {@link path_desired_distance} (navigation won't immediately end when reaching the last waypoint). However, if the value set is too low, the agent will be stuck in a repath loop because it will constantly overshoot the distance to the target on each physics frame update.
   */
  target_desired_distance: float;
  /**
   * If set, a new navigation path from the current agent position to the {@link target_position} is requested from the NavigationServer.
   */
  target_position: Vector3;
  /**
   * The minimal amount of time for which this agent's velocities, that are computed with the collision avoidance algorithm, are safe with respect to other agents. The larger the number, the sooner the agent will respond to other agents, but less freedom in choosing its velocities. A too high value will slow down agents movement considerably. Must be positive.
   */
  time_horizon_agents: float;
  /**
   * The minimal amount of time for which this agent's velocities, that are computed with the collision avoidance algorithm, are safe with respect to static avoidance obstacles. The larger the number, the sooner the agent will respond to static avoidance obstacles, but less freedom in choosing its velocities. A too high value will slow down agents movement considerably. Must be positive.
   */
  time_horizon_obstacles: float;
  /**
   * If `true`, the agent calculates avoidance velocities in 3D omnidirectionally, e.g. for games that take place in air, underwater or space. Agents using 3D avoidance only avoid other agents using 3D avoidance, and react to radius-based avoidance obstacles. They ignore any vertex-based obstacles.
   * If `false`, the agent calculates avoidance velocities in 2D along the x and z-axes, ignoring the y-axis. Agents using 2D avoidance only avoid other agents using 2D avoidance, and react to radius-based avoidance obstacles or vertex-based avoidance obstacles. Other agents using 2D avoidance that are below or above their current position including {@link height} are ignored.
   */
  use_3d_avoidance: boolean;
  /**
   * Sets the new wanted velocity for the agent. The avoidance simulation will try to fulfill this velocity if possible but will modify it to avoid collision with other agents and obstacles. When an agent is teleported to a new position, use {@link set_velocity_forced} as well to reset the internal simulation velocity.
   */
  velocity: Vector3;
  set_avoidance_enabled(value: boolean): void;
  get_avoidance_enabled(): boolean;
  set_avoidance_layers(value: int): void;
  get_avoidance_layers(): int;
  set_avoidance_mask(value: int): void;
  get_avoidance_mask(): int;
  set_avoidance_priority(value: float): void;
  get_avoidance_priority(): float;
  set_debug_enabled(value: boolean): void;
  get_debug_enabled(): boolean;
  set_debug_path_custom_color(value: Color): void;
  get_debug_path_custom_color(): Color;
  set_debug_path_custom_point_size(value: float): void;
  get_debug_path_custom_point_size(): float;
  set_debug_use_custom(value: boolean): void;
  get_debug_use_custom(): boolean;
  set_height(value: float): void;
  get_height(): float;
  set_keep_y_velocity(value: boolean): void;
  get_keep_y_velocity(): boolean;
  set_max_neighbors(value: int): void;
  get_max_neighbors(): int;
  set_max_speed(value: float): void;
  get_max_speed(): float;
  set_navigation_layers(value: int): void;
  get_navigation_layers(): int;
  set_neighbor_distance(value: float): void;
  get_neighbor_distance(): float;
  set_path_desired_distance(value: float): void;
  get_path_desired_distance(): float;
  set_path_height_offset(value: float): void;
  get_path_height_offset(): float;
  set_path_max_distance(value: float): void;
  get_path_max_distance(): float;
  set_path_metadata_flags(value: int): void;
  get_path_metadata_flags(): int;
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
  set_radius(value: float): void;
  get_radius(): float;
  set_simplify_epsilon(value: float): void;
  get_simplify_epsilon(): float;
  set_simplify_path(value: boolean): void;
  get_simplify_path(): boolean;
  set_target_desired_distance(value: float): void;
  get_target_desired_distance(): float;
  set_target_position(value: Vector3 | Vector3i): void;
  get_target_position(): Vector3;
  set_time_horizon_agents(value: float): void;
  get_time_horizon_agents(): float;
  set_time_horizon_obstacles(value: float): void;
  get_time_horizon_obstacles(): float;
  set_use_3d_avoidance(value: boolean): void;
  get_use_3d_avoidance(): boolean;
  set_velocity(value: Vector3 | Vector3i): void;
  get_velocity(): Vector3;

  /**
   * Returns the distance to the target position, using the agent's global position. The user must set {@link target_position} in order for this to be accurate.
   */
  distance_to_target(): float;
  /**
   * Returns whether or not the specified layer of the {@link avoidance_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_avoidance_layer_value(layer_number: int): boolean;
  /**
   * Returns whether or not the specified mask of the {@link avoidance_mask} bitmask is enabled, given a `mask_number` between 1 and 32.
   */
  get_avoidance_mask_value(mask_number: int): boolean;
  /**
   * Returns this agent's current path from start to finish in global coordinates. The path only updates when the target position is changed or the agent requires a repath. The path array is not intended to be used in direct path movement as the agent has its own internal path logic that would get corrupted by changing the path array manually. Use the intended {@link get_next_path_position} once every physics frame to receive the next path point for the agents movement as this function also updates the internal path logic.
   */
  get_current_navigation_path(): PackedVector3Array;
  /** Returns which index the agent is currently on in the navigation path's {@link PackedVector3Array}. */
  get_current_navigation_path_index(): int;
  /** Returns the path query result for the path the agent is currently following. */
  get_current_navigation_result(): NavigationPathQueryResult3D | null;
  /**
   * Returns the reachable final position of the current navigation path in global coordinates. This position can change if the agent needs to update the navigation path which makes the agent emit the {@link path_changed} signal.
   */
  get_final_position(): Vector3;
  /**
   * Returns whether or not the specified layer of the {@link navigation_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_navigation_layer_value(layer_number: int): boolean;
  /**
   * Returns the {@link RID} of the navigation map for this NavigationAgent node. This function returns always the map set on the NavigationAgent node and not the map of the abstract agent on the NavigationServer. If the agent map is changed directly with the NavigationServer API the NavigationAgent node will not be aware of the map change. Use {@link set_navigation_map} to change the navigation map for the NavigationAgent and also update the agent on the NavigationServer.
   */
  get_navigation_map(): RID;
  /**
   * Returns the next position in global coordinates that can be moved to, making sure that there are no static objects in the way. If the agent does not have a navigation path, it will return the position of the agent's parent. The use of this function once every physics frame is required to update the internal path logic of the NavigationAgent.
   */
  get_next_path_position(): Vector3;
  /**
   * Returns the length of the currently calculated path. The returned value is `0.0`, if the path is still calculating or no calculation has been requested yet.
   */
  get_path_length(): float;
  /** Returns the {@link RID} of this agent on the {@link NavigationServer3D}. */
  get_rid(): RID;
  /**
   * Returns `true` if the agent's navigation has finished. If the target is reachable, navigation ends when the target is reached. If the target is unreachable, navigation ends when the last waypoint of the path is reached.
   * **Note:** While `true` prefer to stop calling update functions like {@link get_next_path_position}. This avoids jittering the standing agent due to calling repeated path updates.
   */
  is_navigation_finished(): boolean;
  /**
   * Returns `true` if {@link get_final_position} is within {@link target_desired_distance} of the {@link target_position}.
   */
  is_target_reachable(): boolean;
  /**
   * Returns `true` if the agent reached the target, i.e. the agent moved within {@link target_desired_distance} of the {@link target_position}. It may not always be possible to reach the target but it should always be possible to reach the final position. See {@link get_final_position}.
   */
  is_target_reached(): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link avoidance_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_avoidance_layer_value(layer_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified mask in the {@link avoidance_mask} bitmask, given a `mask_number` between 1 and 32.
   */
  set_avoidance_mask_value(mask_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link navigation_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_navigation_layer_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this NavigationAgent node should use and also updates the `agent` on the NavigationServer.
   */
  set_navigation_map(navigation_map: RID): void;
  /**
   * Replaces the internal velocity in the collision avoidance simulation with `velocity`. When an agent is teleported to a new position this function should be used in the same frame. If called frequently this function can get agents stuck.
   */
  set_velocity_forced(velocity: Vector3 | Vector3i): void;

  /**
   * Signals that the agent reached a navigation link. Emitted when the agent moves within {@link path_desired_distance} of the next position of the path when that position is a navigation link.
   * The details dictionary may contain the following keys depending on the value of {@link path_metadata_flags}:
   * - `position`: The start position of the link that was reached.
   * - `type`: Always {@link NavigationPathQueryResult3D.PATH_SEGMENT_TYPE_LINK}.
   * - `rid`: The {@link RID} of the link.
   * - `owner`: The object which manages the link (usually {@link NavigationLink3D}).
   * - `link_entry_position`: If `owner` is available and the owner is a {@link NavigationLink3D}, it will contain the global position of the link's point the agent is entering.
   * - `link_exit_position`: If `owner` is available and the owner is a {@link NavigationLink3D}, it will contain the global position of the link's point which the agent is exiting.
   */
  link_reached: Signal<[Dictionary]>;
  /**
   * Signals that the agent's navigation has finished. If the target is reachable, navigation ends when the target is reached. If the target is unreachable, navigation ends when the last waypoint of the path is reached. This signal is emitted only once per loaded path.
   * This signal will be emitted just after {@link target_reached} when the target is reachable.
   */
  navigation_finished: Signal<[]>;
  /**
   * Emitted when the agent had to update the loaded path:
   * - because path was previously empty.
   * - because navigation map has changed.
   * - because agent pushed further away from the current path segment than the {@link path_max_distance}.
   */
  path_changed: Signal<[]>;
  /**
   * Signals that the agent reached the target, i.e. the agent moved within {@link target_desired_distance} of the {@link target_position}. This signal is emitted only once per loaded path.
   * This signal will be emitted just before {@link navigation_finished} when the target is reachable.
   * It may not always be possible to reach the target but it should always be possible to reach the final position. See {@link get_final_position}.
   */
  target_reached: Signal<[]>;
  /**
   * Notifies when the collision avoidance velocity is calculated. Emitted every update as long as {@link avoidance_enabled} is `true` and the agent has a navigation map.
   */
  velocity_computed: Signal<[Vector3]>;
  /**
   * Signals that the agent reached a waypoint. Emitted when the agent moves within {@link path_desired_distance} of the next position of the path.
   * The details dictionary may contain the following keys depending on the value of {@link path_metadata_flags}:
   * - `position`: The position of the waypoint that was reached.
   * - `type`: The type of navigation primitive (region or link) that contains this waypoint.
   * - `rid`: The {@link RID} of the containing navigation primitive (region or link).
   * - `owner`: The object which manages the containing navigation primitive (region or link).
   */
  waypoint_reached: Signal<[Dictionary]>;
}
