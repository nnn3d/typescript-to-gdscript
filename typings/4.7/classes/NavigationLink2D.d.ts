// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A link between two positions on {@link NavigationRegion2D}s that agents can be routed through. */
declare class NavigationLink2D extends Node2D {
  /**
   * Whether this link can be traveled in both directions or only from {@link start_position} to {@link end_position}.
   */
  bidirectional: boolean;
  /**
   * Whether this link is currently active. If `false`, {@link NavigationServer2D.map_get_path} will ignore this link.
   */
  enabled: boolean;
  /**
   * Ending position of the link.
   * This position will search out the nearest polygon in the navigation mesh to attach to.
   * The distance the link will search is controlled by {@link NavigationServer2D.map_set_link_connection_radius}.
   */
  end_position: Vector2;
  /**
   * When pathfinding enters this link from another regions navigation mesh the {@link enter_cost} value is added to the path distance for determining the shortest path.
   */
  enter_cost: float;
  /**
   * A bitfield determining all navigation layers the link belongs to. These navigation layers will be checked when requesting a path with {@link NavigationServer2D.map_get_path}.
   */
  navigation_layers: int;
  /**
   * Starting position of the link.
   * This position will search out the nearest polygon in the navigation mesh to attach to.
   * The distance the link will search is controlled by {@link NavigationServer2D.map_set_link_connection_radius}.
   */
  start_position: Vector2;
  /**
   * When pathfinding moves along the link the traveled distance is multiplied with {@link travel_cost} for determining the shortest path.
   */
  travel_cost: float;
  set_bidirectional(value: boolean): void;
  is_bidirectional(): boolean;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_end_position(value: Vector2): void;
  get_end_position(): Vector2;
  set_enter_cost(value: float): void;
  get_enter_cost(): float;
  set_navigation_layers(value: int): void;
  get_navigation_layers(): int;
  set_start_position(value: Vector2): void;
  get_start_position(): Vector2;
  set_travel_cost(value: float): void;
  get_travel_cost(): float;

  /** Returns the {@link end_position} that is relative to the link as a global position. */
  get_global_end_position(): Vector2;
  /** Returns the {@link start_position} that is relative to the link as a global position. */
  get_global_start_position(): Vector2;
  /**
   * Returns whether or not the specified layer of the {@link navigation_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_navigation_layer_value(layer_number: int): boolean;
  /** Returns the current navigation map {@link RID} used by this link. */
  get_navigation_map(): RID;
  /** Returns the {@link RID} of this link on the {@link NavigationServer2D}. */
  get_rid(): RID;
  /** Sets the {@link end_position} that is relative to the link from a global `position`. */
  set_global_end_position(position: Vector2): void;
  /** Sets the {@link start_position} that is relative to the link from a global `position`. */
  set_global_start_position(position: Vector2): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link navigation_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_navigation_layer_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this link should use. By default the link will automatically join the {@link World2D} default navigation map so this function is only required to override the default map.
   */
  set_navigation_map(navigation_map: RID): void;
}
