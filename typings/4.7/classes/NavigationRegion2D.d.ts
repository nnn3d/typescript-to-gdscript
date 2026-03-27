// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A traversable 2D region that {@link NavigationAgent2D}s can use for pathfinding. */
declare class NavigationRegion2D<Tree extends object = any> extends Node2D<Tree> {
  /** Determines if the {@link NavigationRegion2D} is enabled or disabled. */
  enabled: boolean;
  /**
   * When pathfinding enters this region's navigation mesh from another regions navigation mesh the {@link enter_cost} value is added to the path distance for determining the shortest path.
   */
  enter_cost: float;
  /**
   * A bitfield determining all navigation layers the region belongs to. These navigation layers can be checked upon when requesting a path with {@link NavigationServer2D.map_get_path}.
   */
  navigation_layers: int;
  /** The {@link NavigationPolygon} resource to use. */
  navigation_polygon: NavigationPolygon;
  /**
   * When pathfinding moves inside this region's navigation mesh the traveled distances are multiplied with {@link travel_cost} for determining the shortest path.
   */
  travel_cost: float;
  /**
   * If enabled the navigation region will use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  use_edge_connections: boolean;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_enter_cost(value: float): void;
  get_enter_cost(): float;
  set_navigation_layers(value: int): void;
  get_navigation_layers(): int;
  set_navigation_polygon(value: NavigationPolygon): void;
  get_navigation_polygon(): NavigationPolygon;
  set_travel_cost(value: float): void;
  get_travel_cost(): float;
  set_use_edge_connections(value: boolean): void;
  get_use_edge_connections(): boolean;

  /**
   * Bakes the {@link NavigationPolygon}. If `on_thread` is set to `true` (default), the baking is done on a separate thread.
   */
  bake_navigation_polygon(on_thread?: boolean): void;
  /** Returns the axis-aligned rectangle for the region's transformed navigation mesh. */
  get_bounds(): Rect2;
  /**
   * Returns whether or not the specified layer of the {@link navigation_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_navigation_layer_value(layer_number: int): boolean;
  /** Returns the current navigation map {@link RID} used by this region. */
  get_navigation_map(): RID;
  /** Returns the {@link RID} of this region on the {@link NavigationServer2D}. */
  get_region_rid(): RID;
  /**
   * Returns the {@link RID} of this region on the {@link NavigationServer2D}. Combined with {@link NavigationServer2D.map_get_closest_point_owner} can be used to identify the {@link NavigationRegion2D} closest to a point on the merged navigation map.
   */
  get_rid(): RID;
  /** Returns `true` when the {@link NavigationPolygon} is being baked on a background thread. */
  is_baking(): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link navigation_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_navigation_layer_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this region should use. By default the region will automatically join the {@link World2D} default navigation map so this function is only required to override the default map.
   */
  set_navigation_map(navigation_map: RID): void;

  /** Emitted when a navigation polygon bake operation is completed. */
  bake_finished: Signal<[]>;
  /**
   * Emitted when the used navigation polygon is replaced or changes to the internals of the current navigation polygon are committed.
   */
  navigation_polygon_changed: Signal<[]>;
}
