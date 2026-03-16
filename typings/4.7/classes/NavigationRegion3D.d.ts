// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A traversable 3D region that {@link NavigationAgent3D}s can use for pathfinding. */
declare class NavigationRegion3D extends Node3D {
  /** Determines if the {@link NavigationRegion3D} is enabled or disabled. */
  enabled: boolean;
  /**
   * When pathfinding enters this region's navigation mesh from another regions navigation mesh the {@link enter_cost} value is added to the path distance for determining the shortest path.
   */
  enter_cost: float;
  /**
   * A bitfield determining all navigation layers the region belongs to. These navigation layers can be checked upon when requesting a path with {@link NavigationServer3D.map_get_path}.
   */
  navigation_layers: int;
  /** The {@link NavigationMesh} resource to use. */
  navigation_mesh: NavigationMesh;
  /**
   * When pathfinding moves inside this region's navigation mesh the traveled distances are multiplied with {@link travel_cost} for determining the shortest path.
   */
  travel_cost: float;
  /**
   * If enabled the navigation region will use edge connections to connect with other navigation regions within proximity of the navigation map edge connection margin.
   */
  use_edge_connections: boolean;

  /**
   * Bakes the {@link NavigationMesh}. If `on_thread` is set to `true` (default), the baking is done on a separate thread. Baking on separate thread is useful because navigation baking is not a cheap operation. When it is completed, it automatically sets the new {@link NavigationMesh}. Please note that baking on separate thread may be very slow if geometry is parsed from meshes as async access to each mesh involves heavy synchronization. Also, please note that baking on a separate thread is automatically disabled on operating systems that cannot use threads (such as Web with threads disabled).
   */
  bake_navigation_mesh(on_thread?: boolean): void;
  /** Returns the axis-aligned bounding box for the region's transformed navigation mesh. */
  get_bounds(): AABB;
  /**
   * Returns whether or not the specified layer of the {@link navigation_layers} bitmask is enabled, given a `layer_number` between 1 and 32.
   */
  get_navigation_layer_value(layer_number: int): boolean;
  /** Returns the current navigation map {@link RID} used by this region. */
  get_navigation_map(): RID;
  /** Returns the {@link RID} of this region on the {@link NavigationServer3D}. */
  get_region_rid(): RID;
  /**
   * Returns the {@link RID} of this region on the {@link NavigationServer3D}. Combined with {@link NavigationServer3D.map_get_closest_point_owner} can be used to identify the {@link NavigationRegion3D} closest to a point on the merged navigation map.
   */
  get_rid(): RID;
  /** Returns `true` when the {@link NavigationMesh} is being baked on a background thread. */
  is_baking(): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link navigation_layers} bitmask, given a `layer_number` between 1 and 32.
   */
  set_navigation_layer_value(layer_number: int, value: boolean): void;
  /**
   * Sets the {@link RID} of the navigation map this region should use. By default the region will automatically join the {@link World3D} default navigation map so this function is only required to override the default map.
   */
  set_navigation_map(navigation_map: RID): void;

  /** Notifies when the navigation mesh bake operation is completed. */
  bake_finished: Signal<[]>;
  /** Notifies when the {@link NavigationMesh} has changed. */
  navigation_mesh_changed: Signal<[]>;
}
