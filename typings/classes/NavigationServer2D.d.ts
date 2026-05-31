// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A server interface for low-level 2D navigation access. */
declare interface NavigationServer2D extends GodotObject {
  /** Creates the agent. */
  agent_create(): RID;
  /** Return `true` if the specified `agent` uses avoidance. */
  agent_get_avoidance_enabled(agent: RID): boolean;
  /** Returns the `avoidance_layers` bitmask of the specified `agent`. */
  agent_get_avoidance_layers(agent: RID): int;
  /** Returns the `avoidance_mask` bitmask of the specified `agent`. */
  agent_get_avoidance_mask(agent: RID): int;
  /** Returns the `avoidance_priority` of the specified `agent`. */
  agent_get_avoidance_priority(agent: RID): float;
  /** Returns the navigation map {@link RID} the requested `agent` is currently assigned to. */
  agent_get_map(agent: RID): RID;
  /**
   * Returns the maximum number of other agents the specified `agent` takes into account in the navigation.
   */
  agent_get_max_neighbors(agent: RID): int;
  /** Returns the maximum speed of the specified `agent`. */
  agent_get_max_speed(agent: RID): float;
  /**
   * Returns the maximum distance to other agents the specified `agent` takes into account in the navigation.
   */
  agent_get_neighbor_distance(agent: RID): float;
  /** Returns `true` if the specified `agent` is paused. */
  agent_get_paused(agent: RID): boolean;
  /** Returns the position of the specified `agent` in world space. */
  agent_get_position(agent: RID): Vector2;
  /** Returns the radius of the specified `agent`. */
  agent_get_radius(agent: RID): float;
  /**
   * Returns the minimal amount of time for which the specified `agent`'s velocities that are computed by the simulation are safe with respect to other agents.
   */
  agent_get_time_horizon_agents(agent: RID): float;
  /**
   * Returns the minimal amount of time for which the specified `agent`'s velocities that are computed by the simulation are safe with respect to static avoidance obstacles.
   */
  agent_get_time_horizon_obstacles(agent: RID): float;
  /** Returns the velocity of the specified `agent`. */
  agent_get_velocity(agent: RID): Vector2;
  /** Return `true` if the specified `agent` has an avoidance callback. */
  agent_has_avoidance_callback(agent: RID): boolean;
  /** Returns `true` if the map got changed the previous frame. */
  agent_is_map_changed(agent: RID): boolean;
  /**
   * Sets the callback {@link Callable} that gets called after each avoidance processing step for the `agent`. The calculated `safe_velocity` will be dispatched with a signal to the object just before the physics calculations.
   * **Note:** Created callbacks are always processed independently of the SceneTree state as long as the agent is on a navigation map and not freed. To disable the dispatch of a callback from an agent use {@link agent_set_avoidance_callback} again with an empty {@link Callable}.
   */
  agent_set_avoidance_callback(agent: RID, callback: Callable): void;
  /** If `enabled` is `true`, the specified `agent` uses avoidance. */
  agent_set_avoidance_enabled(agent: RID, enabled: boolean): void;
  /** Set the agent's `avoidance_layers` bitmask. */
  agent_set_avoidance_layers(agent: RID, layers: int): void;
  /** Set the agent's `avoidance_mask` bitmask. */
  agent_set_avoidance_mask(agent: RID, mask: int): void;
  /**
   * Set the agent's `avoidance_priority` with a `priority` between 0.0 (lowest priority) to 1.0 (highest priority).
   * The specified `agent` does not adjust the velocity for other agents that would match the `avoidance_mask` but have a lower `avoidance_priority`. This in turn makes the other agents with lower priority adjust their velocities even more to avoid collision with this agent.
   */
  agent_set_avoidance_priority(agent: RID, priority: float): void;
  /** Puts the agent in the map. */
  agent_set_map(agent: RID, map: RID): void;
  /**
   * Sets the maximum number of other agents the agent takes into account in the navigation. The larger this number, the longer the running time of the simulation. If the number is too low, the simulation will not be safe.
   */
  agent_set_max_neighbors(agent: RID, count: int): void;
  /** Sets the maximum speed of the agent. Must be positive. */
  agent_set_max_speed(agent: RID, max_speed: float): void;
  /**
   * Sets the maximum distance to other agents this agent takes into account in the navigation. The larger this number, the longer the running time of the simulation. If the number is too low, the simulation will not be safe.
   */
  agent_set_neighbor_distance(agent: RID, distance: float): void;
  /**
   * If `paused` is `true` the specified `agent` will not be processed. For example, it will not calculate avoidance velocities or receive avoidance callbacks.
   */
  agent_set_paused(agent: RID, paused: boolean): void;
  /** Sets the position of the agent in world space. */
  agent_set_position(agent: RID, position: Vector2 | Vector2i): void;
  /** Sets the radius of the agent. */
  agent_set_radius(agent: RID, radius: float): void;
  /**
   * The minimal amount of time for which the agent's velocities that are computed by the simulation are safe with respect to other agents. The larger this number, the sooner this agent will respond to the presence of other agents, but the less freedom this agent has in choosing its velocities. A too high value will slow down agents movement considerably. Must be positive.
   */
  agent_set_time_horizon_agents(agent: RID, time_horizon: float): void;
  /**
   * The minimal amount of time for which the agent's velocities that are computed by the simulation are safe with respect to static avoidance obstacles. The larger this number, the sooner this agent will respond to the presence of static avoidance obstacles, but the less freedom this agent has in choosing its velocities. A too high value will slow down agents movement considerably. Must be positive.
   */
  agent_set_time_horizon_obstacles(agent: RID, time_horizon: float): void;
  /**
   * Sets `velocity` as the new wanted velocity for the specified `agent`. The avoidance simulation will try to fulfill this velocity if possible but will modify it to avoid collision with other agent's and obstacles. When an agent is teleported to a new position far away use {@link agent_set_velocity_forced} instead to reset the internal velocity state.
   */
  agent_set_velocity(agent: RID, velocity: Vector2 | Vector2i): void;
  /**
   * Replaces the internal velocity in the collision avoidance simulation with `velocity` for the specified `agent`. When an agent is teleported to a new position far away this function should be used in the same frame. If called frequently this function can get agents stuck.
   */
  agent_set_velocity_forced(agent: RID, velocity: Vector2 | Vector2i): void;
  /**
   * Bakes the provided `navigation_polygon` with the data from the provided `source_geometry_data`. After the process is finished the optional `callback` will be called.
   */
  bake_from_source_geometry_data(navigation_polygon: NavigationPolygon, source_geometry_data: NavigationMeshSourceGeometryData2D, callback?: Callable): void;
  /**
   * Bakes the provided `navigation_polygon` with the data from the provided `source_geometry_data` as an async task running on a background thread. After the process is finished the optional `callback` will be called.
   */
  bake_from_source_geometry_data_async(navigation_polygon: NavigationPolygon, source_geometry_data: NavigationMeshSourceGeometryData2D, callback?: Callable): void;
  /** Destroys the given RID. */
  free_rid(rid: RID): void;
  /** Returns `true` when the NavigationServer has debug enabled. */
  get_debug_enabled(): boolean;
  /**
   * Returns all created navigation map {@link RID}s on the NavigationServer. This returns both 2D and 3D created navigation maps as there is technically no distinction between them.
   */
  get_maps(): Array<RID>;
  /** Returns information about the current state of the NavigationServer. */
  get_process_info(process_info: int): int;
  /** Returns `true` when the provided navigation polygon is being baked on a background thread. */
  is_baking_navigation_polygon(navigation_polygon: NavigationPolygon): boolean;
  /** Create a new link between two positions on a map. */
  link_create(): RID;
  /** Returns `true` if the specified `link` is enabled. */
  link_get_enabled(link: RID): boolean;
  /** Returns the ending position of this `link`. */
  link_get_end_position(link: RID): Vector2;
  /** Returns the enter cost of this `link`. */
  link_get_enter_cost(link: RID): float;
  /**
   * Returns the current iteration ID of the navigation link. Every time the navigation link changes and synchronizes, the iteration ID increases. An iteration ID of `0` means the navigation link has never synchronized.
   * **Note:** The iteration ID will wrap around to `1` after reaching its range limit.
   */
  link_get_iteration_id(link: RID): int;
  /** Returns the navigation map {@link RID} the requested `link` is currently assigned to. */
  link_get_map(link: RID): RID;
  /** Returns the navigation layers for this `link`. */
  link_get_navigation_layers(link: RID): int;
  /** Returns the `ObjectID` of the object which manages this link. */
  link_get_owner_id(link: RID): int;
  /** Returns the starting position of this `link`. */
  link_get_start_position(link: RID): Vector2;
  /** Returns the travel cost of this `link`. */
  link_get_travel_cost(link: RID): float;
  /** Returns whether this `link` can be travelled in both directions. */
  link_is_bidirectional(link: RID): boolean;
  /** Sets whether this `link` can be travelled in both directions. */
  link_set_bidirectional(link: RID, bidirectional: boolean): void;
  /** If `enabled` is `true`, the specified `link` will contribute to its current navigation map. */
  link_set_enabled(link: RID, enabled: boolean): void;
  /** Sets the exit position for the `link`. */
  link_set_end_position(link: RID, position: Vector2 | Vector2i): void;
  /** Sets the `enter_cost` for this `link`. */
  link_set_enter_cost(link: RID, enter_cost: float): void;
  /** Sets the navigation map {@link RID} for the link. */
  link_set_map(link: RID, map: RID): void;
  /**
   * Set the links's navigation layers. This allows selecting links from a path request (when using {@link NavigationServer2D.map_get_path}).
   */
  link_set_navigation_layers(link: RID, navigation_layers: int): void;
  /** Set the `ObjectID` of the object which manages this link. */
  link_set_owner_id(link: RID, owner_id: int): void;
  /** Sets the entry position for this `link`. */
  link_set_start_position(link: RID, position: Vector2 | Vector2i): void;
  /** Sets the `travel_cost` for this `link`. */
  link_set_travel_cost(link: RID, travel_cost: float): void;
  /** Create a new map. */
  map_create(): RID;
  /**
   * This function immediately forces synchronization of the specified navigation `map` {@link RID}. By default navigation maps are only synchronized at the end of each physics frame. This function can be used to immediately (re)calculate all the navigation meshes and region connections of the navigation map. This makes it possible to query a navigation path for a changed map immediately and in the same frame (multiple times if needed).
   * Due to technical restrictions the current NavigationServer command queue will be flushed. This means all already queued update commands for this physics frame will be executed, even those intended for other maps, regions and agents not part of the specified map. The expensive computation of the navigation meshes and region connections of a map will only be done for the specified map. Other maps will receive the normal synchronization at the end of the physics frame. Should the specified map receive changes after the forced update it will update again as well when the other maps receive their update.
   * Avoidance processing and dispatch of the `safe_velocity` signals is unaffected by this function and continues to happen for all maps and agents at the end of the physics frame.
   * **Note:** With great power comes great responsibility. This function should only be used by users that really know what they are doing and have a good reason for it. Forcing an immediate update of a navigation map requires locking the NavigationServer and flushing the entire NavigationServer command queue. Not only can this severely impact the performance of a game but it can also introduce bugs if used inappropriately without much foresight.
   */
  map_force_update(map: RID): void;
  /**
   * Returns all navigation agents {@link RID}s that are currently assigned to the requested navigation `map`.
   */
  map_get_agents(map: RID): Array<RID>;
  /** Returns the map cell size used to rasterize the navigation mesh vertices. */
  map_get_cell_size(map: RID): float;
  /**
   * Returns the navigation mesh surface point closest to the provided `to_point` on the navigation `map`.
   */
  map_get_closest_point(map: RID, to_point: Vector2 | Vector2i): Vector2;
  /**
   * Returns the owner region RID for the navigation mesh surface point closest to the provided `to_point` on the navigation `map`.
   */
  map_get_closest_point_owner(map: RID, to_point: Vector2 | Vector2i): RID;
  /**
   * Returns the edge connection margin of the map. The edge connection margin is a distance used to connect two regions.
   */
  map_get_edge_connection_margin(map: RID): float;
  /**
   * Returns the current iteration id of the navigation map. Every time the navigation map changes and synchronizes the iteration id increases. An iteration id of 0 means the navigation map has never synchronized.
   * **Note:** The iteration id will wrap back to 1 after reaching its range limit.
   */
  map_get_iteration_id(map: RID): int;
  /**
   * Returns the link connection radius of the map. This distance is the maximum range any link will search for navigation mesh polygons to connect to.
   */
  map_get_link_connection_radius(map: RID): float;
  /**
   * Returns all navigation link {@link RID}s that are currently assigned to the requested navigation `map`.
   */
  map_get_links(map: RID): Array<RID>;
  /** Returns map's internal merge rasterizer cell scale. */
  map_get_merge_rasterizer_cell_scale(map: RID): float;
  /**
   * Returns all navigation obstacle {@link RID}s that are currently assigned to the requested navigation `map`.
   */
  map_get_obstacles(map: RID): Array<RID>;
  /**
   * Returns the navigation path to reach the destination from the origin. `navigation_layers` is a bitmask of all region navigation layers that are allowed to be in the path.
   */
  map_get_path(map: RID, origin: Vector2 | Vector2i, destination: Vector2 | Vector2i, optimize: boolean, navigation_layers?: int): PackedVector2Array;
  /**
   * Returns a random position picked from all map region polygons with matching `navigation_layers`.
   * If `uniformly` is `true`, all map regions, polygons, and faces are weighted by their surface area (slower).
   * If `uniformly` is `false`, just a random region and a random polygon are picked (faster).
   */
  map_get_random_point(map: RID, navigation_layers: int, uniformly: boolean): Vector2;
  /**
   * Returns all navigation regions {@link RID}s that are currently assigned to the requested navigation `map`.
   */
  map_get_regions(map: RID): Array<RID>;
  /** Returns `true` if the `map` synchronization uses an async process that runs on a background thread. */
  map_get_use_async_iterations(map: RID): boolean;
  /**
   * Returns whether the navigation `map` allows navigation regions to use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  map_get_use_edge_connections(map: RID): boolean;
  /** Returns `true` if the map is active. */
  map_is_active(map: RID): boolean;
  /** Sets the map active. */
  map_set_active(map: RID, active: boolean): void;
  /**
   * Sets the map cell size used to rasterize the navigation mesh vertices. Must match with the cell size of the used navigation meshes.
   */
  map_set_cell_size(map: RID, cell_size: float): void;
  /** Set the map edge connection margin used to weld the compatible region edges. */
  map_set_edge_connection_margin(map: RID, margin: float): void;
  /** Set the map's link connection radius used to connect links to navigation polygons. */
  map_set_link_connection_radius(map: RID, radius: float): void;
  /** Set the map's internal merge rasterizer cell scale used to control merging sensitivity. */
  map_set_merge_rasterizer_cell_scale(map: RID, scale: float): void;
  /**
   * If `enabled` is `true` the `map` synchronization uses an async process that runs on a background thread.
   */
  map_set_use_async_iterations(map: RID, enabled: boolean): void;
  /**
   * Set the navigation `map` edge connection use. If `enabled` is `true`, the navigation map allows navigation regions to use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  map_set_use_edge_connections(map: RID, enabled: boolean): void;
  /** Creates a new navigation obstacle. */
  obstacle_create(): RID;
  /** Returns `true` if the provided `obstacle` has avoidance enabled. */
  obstacle_get_avoidance_enabled(obstacle: RID): boolean;
  /** Returns the `avoidance_layers` bitmask of the specified `obstacle`. */
  obstacle_get_avoidance_layers(obstacle: RID): int;
  /** Returns the navigation map {@link RID} the requested `obstacle` is currently assigned to. */
  obstacle_get_map(obstacle: RID): RID;
  /** Returns `true` if the specified `obstacle` is paused. */
  obstacle_get_paused(obstacle: RID): boolean;
  /** Returns the position of the specified `obstacle` in world space. */
  obstacle_get_position(obstacle: RID): Vector2;
  /** Returns the radius of the specified dynamic `obstacle`. */
  obstacle_get_radius(obstacle: RID): float;
  /** Returns the velocity of the specified dynamic `obstacle`. */
  obstacle_get_velocity(obstacle: RID): Vector2;
  /** Returns the outline vertices for the specified `obstacle`. */
  obstacle_get_vertices(obstacle: RID): PackedVector2Array;
  /** If `enabled` is `true`, the provided `obstacle` affects avoidance using agents. */
  obstacle_set_avoidance_enabled(obstacle: RID, enabled: boolean): void;
  /** Set the obstacles's `avoidance_layers` bitmask. */
  obstacle_set_avoidance_layers(obstacle: RID, layers: int): void;
  /** Sets the navigation map {@link RID} for the obstacle. */
  obstacle_set_map(obstacle: RID, map: RID): void;
  /**
   * If `paused` is `true` the specified `obstacle` will not be processed. For example, it will no longer affect avoidance velocities.
   */
  obstacle_set_paused(obstacle: RID, paused: boolean): void;
  /** Sets the position of the obstacle in world space. */
  obstacle_set_position(obstacle: RID, position: Vector2 | Vector2i): void;
  /** Sets the radius of the dynamic obstacle. */
  obstacle_set_radius(obstacle: RID, radius: float): void;
  /**
   * Sets `velocity` of the dynamic `obstacle`. Allows other agents to better predict the movement of the dynamic obstacle. Only works in combination with the radius of the obstacle.
   */
  obstacle_set_velocity(obstacle: RID, velocity: Vector2 | Vector2i): void;
  /**
   * Sets the outline vertices for the obstacle. If the vertices are winded in clockwise order agents will be pushed in by the obstacle, else they will be pushed out.
   */
  obstacle_set_vertices(obstacle: RID, vertices: PackedVector2Array | Array<unknown>): void;
  /**
   * Parses the {@link SceneTree} for source geometry according to the properties of `navigation_polygon`. Updates the provided `source_geometry_data` resource with the resulting data. The resource can then be used to bake a navigation mesh with {@link bake_from_source_geometry_data}. After the process is finished the optional `callback` will be called.
   * **Note:** This function needs to run on the main thread or with a deferred call as the SceneTree is not thread-safe.
   * **Performance:** While convenient, reading data arrays from {@link Mesh} resources can affect the frame rate negatively. The data needs to be received from the GPU, stalling the {@link RenderingServer} in the process. For performance prefer the use of e.g. collision shapes or creating the data arrays entirely in code.
   */
  parse_source_geometry_data(navigation_polygon: NavigationPolygon, source_geometry_data: NavigationMeshSourceGeometryData2D, root_node: Node, callback?: Callable): void;
  /**
   * Queries a path in a given navigation map. Start and target position and other parameters are defined through {@link NavigationPathQueryParameters2D}. Updates the provided {@link NavigationPathQueryResult2D} result object with the path among other results requested by the query. After the process is finished the optional `callback` will be called.
   */
  query_path(parameters: NavigationPathQueryParameters2D, result: NavigationPathQueryResult2D, callback?: Callable): void;
  /** Creates a new region. */
  region_create(): RID;
  /** Returns the axis-aligned rectangle for the `region`'s transformed navigation mesh. */
  region_get_bounds(region: RID): Rect2;
  /**
   * Returns the navigation mesh surface point closest to the provided `to_point` on the navigation `region`.
   */
  region_get_closest_point(region: RID, to_point: Vector2 | Vector2i): Vector2;
  /**
   * Returns the ending point of a connection door. `connection` is an index between 0 and the return value of {@link region_get_connections_count}.
   */
  region_get_connection_pathway_end(region: RID, connection: int): Vector2;
  /**
   * Returns the starting point of a connection door. `connection` is an index between 0 and the return value of {@link region_get_connections_count}.
   */
  region_get_connection_pathway_start(region: RID, connection: int): Vector2;
  /** Returns how many connections this `region` has with other regions in the map. */
  region_get_connections_count(region: RID): int;
  /** Returns `true` if the specified `region` is enabled. */
  region_get_enabled(region: RID): boolean;
  /** Returns the enter cost of this `region`. */
  region_get_enter_cost(region: RID): float;
  /**
   * Returns the current iteration ID of the navigation region. Every time the navigation region changes and synchronizes, the iteration ID increases. An iteration ID of `0` means the navigation region has never synchronized.
   * **Note:** The iteration ID will wrap around to `1` after reaching its range limit.
   */
  region_get_iteration_id(region: RID): int;
  /** Returns the navigation map {@link RID} the requested `region` is currently assigned to. */
  region_get_map(region: RID): RID;
  /** Returns the region's navigation layers. */
  region_get_navigation_layers(region: RID): int;
  /** Returns the `ObjectID` of the object which manages this region. */
  region_get_owner_id(region: RID): int;
  /**
   * Returns a random position picked from all region polygons with matching `navigation_layers`.
   * If `uniformly` is `true`, all region polygons and faces are weighted by their surface area (slower).
   * If `uniformly` is `false`, just a random polygon and face is picked (faster).
   */
  region_get_random_point(region: RID, navigation_layers: int, uniformly: boolean): Vector2;
  /** Returns the global transformation of this `region`. */
  region_get_transform(region: RID): Transform2D;
  /** Returns the travel cost of this `region`. */
  region_get_travel_cost(region: RID): float;
  /**
   * Returns `true` if the `region` uses an async synchronization process that runs on a background thread.
   */
  region_get_use_async_iterations(region: RID): boolean;
  /**
   * Returns whether the navigation `region` is set to use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  region_get_use_edge_connections(region: RID): boolean;
  /**
   * Returns `true` if the provided `point` in world space is currently owned by the provided navigation `region`. Owned in this context means that one of the region's navigation mesh polygon faces has a possible position at the closest distance to this point compared to all other navigation meshes from other navigation regions that are also registered on the navigation map of the provided region.
   * If multiple navigation meshes have positions at equal distance the navigation region whose polygons are processed first wins the ownership. Polygons are processed in the same order that navigation regions were registered on the NavigationServer.
   * **Note:** If navigation meshes from different navigation regions overlap (which should be avoided in general) the result might not be what is expected.
   */
  region_owns_point(region: RID, point: Vector2 | Vector2i): boolean;
  /** If `enabled` is `true` the specified `region` will contribute to its current navigation map. */
  region_set_enabled(region: RID, enabled: boolean): void;
  /** Sets the `enter_cost` for this `region`. */
  region_set_enter_cost(region: RID, enter_cost: float): void;
  /** Sets the map for the region. */
  region_set_map(region: RID, map: RID): void;
  /**
   * Set the region's navigation layers. This allows selecting regions from a path request (when using {@link NavigationServer2D.map_get_path}).
   */
  region_set_navigation_layers(region: RID, navigation_layers: int): void;
  /** Sets the `navigation_polygon` for the region. */
  region_set_navigation_polygon(region: RID, navigation_polygon: NavigationPolygon): void;
  /** Set the `ObjectID` of the object which manages this region. */
  region_set_owner_id(region: RID, owner_id: int): void;
  /** Sets the global transformation for the region. */
  region_set_transform(region: RID, transform: Transform2D): void;
  /** Sets the `travel_cost` for this `region`. */
  region_set_travel_cost(region: RID, travel_cost: float): void;
  /**
   * If `enabled` is `true` the `region` uses an async synchronization process that runs on a background thread.
   */
  region_set_use_async_iterations(region: RID, enabled: boolean): void;
  /**
   * If `enabled` is `true`, the navigation `region` will use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  region_set_use_edge_connections(region: RID, enabled: boolean): void;
  /** Control activation of this server. */
  set_active(active: boolean): void;
  /** If `true` enables debug mode on the NavigationServer. */
  set_debug_enabled(enabled: boolean): void;
  /**
   * Returns a simplified version of `path` with less critical path points removed. The simplification amount is in worlds units and controlled by `epsilon`. The simplification uses a variant of Ramer-Douglas-Peucker algorithm for curve point decimation.
   * Path simplification can be helpful to mitigate various path following issues that can arise with certain agent types and script behaviors. E.g. "steering" agents or avoidance in "open fields".
   */
  simplify_path(path: PackedVector2Array | Array<unknown>, epsilon: float): PackedVector2Array;
  /**
   * Creates a new source geometry parser. If a {@link Callable} is set for the parser with {@link source_geometry_parser_set_callback} the callback will be called for every single node that gets parsed whenever {@link parse_source_geometry_data} is used.
   */
  source_geometry_parser_create(): RID;
  /**
   * Sets the `callback` {@link Callable} for the specific source geometry `parser`. The {@link Callable} will receive a call with the following parameters:
   * - `navigation_mesh` - The {@link NavigationPolygon} reference used to define the parse settings. Do NOT edit or add directly to the navigation mesh.
   * - `source_geometry_data` - The {@link NavigationMeshSourceGeometryData2D} reference. Add custom source geometry for navigation mesh baking to this object.
   * - `node` - The {@link Node} that is parsed.
   */
  source_geometry_parser_set_callback(parser: RID, callback: Callable): void;

  /** Emitted when avoidance debug settings are changed. Only available in debug builds. */
  avoidance_debug_changed: Signal<[]>;
  /** Emitted when a navigation map is updated, when a region moves or is modified. */
  map_changed: Signal<[RID]>;
  /** Emitted when navigation debug settings are changed. Only available in debug builds. */
  navigation_debug_changed: Signal<[]>;

  // enum ProcessInfo
  /** Constant to get the number of active navigation maps. */
  readonly INFO_ACTIVE_MAPS: int;
  /** Constant to get the number of active navigation regions. */
  readonly INFO_REGION_COUNT: int;
  /** Constant to get the number of active navigation agents processing avoidance. */
  readonly INFO_AGENT_COUNT: int;
  /** Constant to get the number of active navigation links. */
  readonly INFO_LINK_COUNT: int;
  /** Constant to get the number of navigation mesh polygons. */
  readonly INFO_POLYGON_COUNT: int;
  /** Constant to get the number of navigation mesh polygon edges. */
  readonly INFO_EDGE_COUNT: int;
  /**
   * Constant to get the number of navigation mesh polygon edges that were merged due to edge key overlap.
   */
  readonly INFO_EDGE_MERGE_COUNT: int;
  /**
   * Constant to get the number of navigation mesh polygon edges that are considered connected by edge proximity.
   */
  readonly INFO_EDGE_CONNECTION_COUNT: int;
  /**
   * Constant to get the number of navigation mesh polygon edges that could not be merged but may be still connected by edge proximity or with links.
   */
  readonly INFO_EDGE_FREE_COUNT: int;
  /** Constant to get the number of active navigation obstacles. */
  readonly INFO_OBSTACLE_COUNT: int;
}
declare const NavigationServer2D: NavigationServer2D;

