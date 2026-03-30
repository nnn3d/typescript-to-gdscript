// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Node for 2D tile-based maps. */
declare class TileMapLayer extends Node2D {
  /** Enable or disable collisions. */
  collision_enabled: boolean;
  /**
   * Show or hide the {@link TileMapLayer}'s collision shapes. If set to {@link DEBUG_VISIBILITY_MODE_DEFAULT}, this depends on the show collision debug settings.
   */
  collision_visibility_mode: int;
  /**
   * If `false`, disables this {@link TileMapLayer} completely (rendering, collision, navigation, scene tiles, etc.)
   */
  enabled: boolean;
  /** If `true`, navigation regions are enabled. */
  navigation_enabled: boolean;
  /**
   * Show or hide the {@link TileMapLayer}'s navigation meshes. If set to {@link DEBUG_VISIBILITY_MODE_DEFAULT}, this depends on the show navigation debug settings.
   */
  navigation_visibility_mode: int;
  /** Enable or disable light occlusion. */
  occlusion_enabled: boolean;
  /**
   * The {@link TileMapLayer}'s physics quadrant size. Within a physics quadrant, cells with similar physics properties are grouped together and their collision shapes get merged. {@link physics_quadrant_size} defines the length of a square's side, in the map's coordinate system, that forms the quadrant. Thus, the default quadrant size groups together `16 * 16 = 256` tiles.
   * **Note:** As quadrants are created according to the map's coordinate system, the quadrant's "square shape" might not look like square in the {@link TileMapLayer}'s local coordinate system.
   * **Note:** This impacts the value returned by {@link get_coords_for_body_rid}. Higher values will make that function less precise. To get the exact cell coordinates, you need to set {@link physics_quadrant_size} to `1`, which disables physics chunking.
   */
  physics_quadrant_size: int;
  /**
   * The {@link TileMapLayer}'s rendering quadrant size. A quadrant is a group of tiles to be drawn together on a single canvas item, for optimization purposes. {@link rendering_quadrant_size} defines the length of a square's side, in the map's coordinate system, that forms the quadrant. Thus, the default quadrant size groups together `16 * 16 = 256` tiles.
   * The quadrant size does not apply on a Y-sorted {@link TileMapLayer}, as tiles are grouped by Y position instead in that case.
   * **Note:** As quadrants are created according to the map's coordinate system, the quadrant's "square shape" might not look like square in the {@link TileMapLayer}'s local coordinate system.
   */
  rendering_quadrant_size: int;
  /** The raw tile map data as a byte array. */
  tile_map_data: PackedByteArray;
  /**
   * The {@link TileSet} used by this layer. The textures, collisions, and additional behavior of all available tiles are stored here.
   */
  tile_set: TileSet;
  /**
   * If `true`, this {@link TileMapLayer} collision shapes will be instantiated as kinematic bodies. This can be needed for moving {@link TileMapLayer} nodes (i.e. moving platforms).
   */
  use_kinematic_bodies: boolean;
  /**
   * If {@link CanvasItem.y_sort_enabled} is enabled, setting this to `true` will reverse the order the tiles are drawn on the X-axis.
   */
  x_draw_order_reversed: boolean;
  /**
   * This Y-sort origin value is added to each tile's Y-sort origin value. This allows, for example, to fake a different height level. This can be useful for top-down view games.
   */
  y_sort_origin: int;
  set_collision_enabled(value: boolean): void;
  is_collision_enabled(): boolean;
  set_collision_visibility_mode(value: int): void;
  get_collision_visibility_mode(): int;
  set_enabled(value: boolean): void;
  is_enabled(): boolean;
  set_navigation_enabled(value: boolean): void;
  is_navigation_enabled(): boolean;
  set_navigation_visibility_mode(value: int): void;
  get_navigation_visibility_mode(): int;
  set_occlusion_enabled(value: boolean): void;
  is_occlusion_enabled(): boolean;
  set_physics_quadrant_size(value: int): void;
  get_physics_quadrant_size(): int;
  set_rendering_quadrant_size(value: int): void;
  get_rendering_quadrant_size(): int;
  set_tile_map_data_from_array(value: PackedByteArray): void;
  get_tile_map_data_as_array(): PackedByteArray;
  set_tile_set(value: TileSet): void;
  get_tile_set(): TileSet;
  set_use_kinematic_bodies(value: boolean): void;
  is_using_kinematic_bodies(): boolean;
  set_x_draw_order_reversed(value: boolean): void;
  is_x_draw_order_reversed(): boolean;
  set_y_sort_origin(value: int): void;
  get_y_sort_origin(): int;

  /**
   * Called with a {@link TileData} object about to be used internally by the {@link TileMapLayer}, allowing its modification at runtime.
   * This method is only called if {@link _use_tile_data_runtime_update} is implemented and returns `true` for the given tile `coords`.
   * **Warning:** The `tile_data` object's sub-resources are the same as the one in the TileSet. Modifying them might impact the whole TileSet. Instead, make sure to duplicate those resources.
   * **Note:** If the properties of `tile_data` object should change over time, use {@link notify_runtime_tile_data_update} to notify the {@link TileMapLayer} it needs an update.
   */
  _tile_data_runtime_update(coords: Vector2i, tile_data: TileData): void;
  /**
   * Called when this {@link TileMapLayer}'s cells need an internal update. This update may be caused from individual cells being modified or by a change in the {@link tile_set} (causing all cells to be queued for an update). The first call to this function is always for initializing all the {@link TileMapLayer}'s cells. `coords` contains the coordinates of all modified cells, roughly in the order they were modified. `forced_cleanup` is `true` when the {@link TileMapLayer}'s internals should be fully cleaned up. This is the case when:
   * - The layer is disabled;
   * - The layer is not visible;
   * - {@link tile_set} is set to `null`;
   * - The node is removed from the tree;
   * - The node is freed.
   * Note that any internal update happening while one of these conditions is verified is considered to be a "cleanup". See also {@link update_internals}.
   * **Warning:** Implementing this method may degrade the {@link TileMapLayer}'s performance.
   */
  _update_cells(coords: unknown, forced_cleanup: boolean): void;
  /**
   * Should return `true` if the tile at coordinates `coords` requires a runtime update.
   * **Warning:** Make sure this function only returns `true` when needed. Any tile processed at runtime without a need for it will imply a significant performance penalty.
   * **Note:** If the result of this function should change, use {@link notify_runtime_tile_data_update} to notify the {@link TileMapLayer} it needs an update.
   */
  _use_tile_data_runtime_update(coords: Vector2i): boolean;
  /** Clears all cells. */
  clear(): void;
  /** Erases the cell at coordinates `coords`. */
  erase_cell(coords: Vector2i): void;
  /** Clears cells containing tiles that do not exist in the {@link tile_set}. */
  fix_invalid_tiles(): void;
  /** Returns the tile alternative ID of the cell at coordinates `coords`. */
  get_cell_alternative_tile(coords: Vector2i): int;
  /**
   * Returns the tile atlas coordinates ID of the cell at coordinates `coords`. Returns `Vector2i(-1, -1)` if the cell does not exist.
   */
  get_cell_atlas_coords(coords: Vector2i): Vector2i;
  /**
   * Returns the tile source ID of the cell at coordinates `coords`. Returns `-1` if the cell does not exist.
   */
  get_cell_source_id(coords: Vector2i): int;
  /**
   * Returns the {@link TileData} object associated with the given cell, or `null` if the cell does not exist or is not a {@link TileSetAtlasSource}.
   */
  get_cell_tile_data(coords: Vector2i): TileData;
  /**
   * Returns the coordinates of the physics quadrant (see {@link physics_quadrant_size}) for given physics body {@link RID}. Such an {@link RID} can be retrieved from {@link KinematicCollision2D.get_collider_rid}, when colliding with a tile.
   * **Note:** Higher values of {@link physics_quadrant_size} will make this function less precise. To get the exact cell coordinates, you need to set {@link physics_quadrant_size} to `1`, which disables physics chunking.
   */
  get_coords_for_body_rid(body: RID): Vector2i;
  /**
   * Returns the {@link RID} of the {@link NavigationServer2D} navigation used by this {@link TileMapLayer}.
   * By default this returns the default {@link World2D} navigation map, unless a custom map was provided using {@link set_navigation_map}.
   */
  get_navigation_map(): RID;
  /**
   * Returns the neighboring cell to the one at coordinates `coords`, identified by the `neighbor` direction. This method takes into account the different layouts a TileMap can take.
   */
  get_neighbor_cell(coords: Vector2i, neighbor: int): Vector2i;
  /**
   * Creates and returns a new {@link TileMapPattern} from the given array of cells. See also {@link set_pattern}.
   */
  get_pattern(coords_array: unknown): TileMapPattern;
  /**
   * Returns the list of all neighboring cells to the one at `coords`. Any neighboring cell is one that is touching edges, so for a square cell 4 cells would be returned, for a hexagon 6 cells are returned.
   */
  get_surrounding_cells(coords: Vector2i): unknown;
  /**
   * Returns a {@link Vector2i} array with the positions of all cells containing a tile. A cell is considered empty if its source identifier equals `-1`, its atlas coordinate identifier is `Vector2(-1, -1)` and its alternative identifier is `-1`.
   */
  get_used_cells(): unknown;
  /**
   * Returns a {@link Vector2i} array with the positions of all cells containing a tile. Tiles may be filtered according to their source (`source_id`), their atlas coordinates (`atlas_coords`), or alternative id (`alternative_tile`).
   * If a parameter has its value set to the default one, this parameter is not used to filter a cell. Thus, if all parameters have their respective default values, this method returns the same result as {@link get_used_cells}.
   * A cell is considered empty if its source identifier equals `-1`, its atlas coordinate identifier is `Vector2(-1, -1)` and its alternative identifier is `-1`.
   */
  get_used_cells_by_id(source_id?: int, atlas_coords?: Vector2i, alternative_tile?: int): unknown;
  /** Returns a rectangle enclosing the used (non-empty) tiles of the map. */
  get_used_rect(): Rect2i;
  /**
   * Returns whether the provided `body` {@link RID} belongs to one of this {@link TileMapLayer}'s cells.
   */
  has_body_rid(body: RID): boolean;
  /**
   * Returns `true` if the cell at coordinates `coords` is flipped horizontally. The result is valid only for atlas sources.
   */
  is_cell_flipped_h(coords: Vector2i): boolean;
  /**
   * Returns `true` if the cell at coordinates `coords` is flipped vertically. The result is valid only for atlas sources.
   */
  is_cell_flipped_v(coords: Vector2i): boolean;
  /**
   * Returns `true` if the cell at coordinates `coords` is transposed. The result is valid only for atlas sources.
   */
  is_cell_transposed(coords: Vector2i): boolean;
  /**
   * Returns the map coordinates of the cell containing the given `local_position`. If `local_position` is in global coordinates, consider using {@link Node2D.to_local} before passing it to this method. See also {@link map_to_local}.
   */
  local_to_map(local_position: Vector2): Vector2i;
  /**
   * Returns for the given coordinates `coords_in_pattern` in a {@link TileMapPattern} the corresponding cell coordinates if the pattern was pasted at the `position_in_tilemap` coordinates (see {@link set_pattern}). This mapping is required as in half-offset tile shapes, the mapping might not work by calculating `position_in_tile_map + coords_in_pattern`.
   */
  map_pattern(position_in_tilemap: Vector2i, coords_in_pattern: Vector2i, pattern: TileMapPattern): Vector2i;
  /**
   * Returns the centered position of a cell in the {@link TileMapLayer}'s local coordinate space. To convert the returned value into global coordinates, use {@link Node2D.to_global}. See also {@link local_to_map}.
   * **Note:** This may not correspond to the visual position of the tile, i.e. it ignores the {@link TileData.texture_origin} property of individual tiles.
   */
  map_to_local(map_position: Vector2i): Vector2;
  /**
   * Notifies the {@link TileMapLayer} node that calls to {@link _use_tile_data_runtime_update} or {@link _tile_data_runtime_update} will lead to different results. This will thus trigger a {@link TileMapLayer} update.
   * **Warning:** Updating the {@link TileMapLayer} is computationally expensive and may impact performance. Try to limit the number of calls to this function to avoid unnecessary update.
   * **Note:** This does not trigger a direct update of the {@link TileMapLayer}, the update will be done at the end of the frame as usual (unless you call {@link update_internals}).
   */
  notify_runtime_tile_data_update(): void;
  /**
   * Sets the tile identifiers for the cell at coordinates `coords`. Each tile of the {@link TileSet} is identified using three parts:
   * - The source identifier `source_id` identifies a {@link TileSetSource} identifier. See {@link TileSet.set_source_id},
   * - The atlas coordinate identifier `atlas_coords` identifies a tile coordinates in the atlas (if the source is a {@link TileSetAtlasSource}). For {@link TileSetScenesCollectionSource} it should always be `Vector2i(0, 0)`,
   * - The alternative tile identifier `alternative_tile` identifies a tile alternative in the atlas (if the source is a {@link TileSetAtlasSource}), and the scene for a {@link TileSetScenesCollectionSource}.
   * If `source_id` is set to `-1`, `atlas_coords` to `Vector2i(-1, -1)`, or `alternative_tile` to `-1`, the cell will be erased. An erased cell gets **all** its identifiers automatically set to their respective invalid values, namely `-1`, `Vector2i(-1, -1)` and `-1`.
   */
  set_cell(coords: Vector2i, source_id?: int, atlas_coords?: Vector2i, alternative_tile?: int): void;
  /**
   * Update all the cells in the `cells` coordinates array so that they use the given `terrain` for the given `terrain_set`. If an updated cell has the same terrain as one of its neighboring cells, this function tries to join the two. This function might update neighboring tiles if needed to create correct terrain transitions.
   * If `ignore_empty_terrains` is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   * **Note:** To work correctly, this method requires the {@link TileMapLayer}'s TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   */
  set_cells_terrain_connect(cells: unknown, terrain_set: int, terrain: int, ignore_empty_terrains?: boolean): void;
  /**
   * Update all the cells in the `path` coordinates array so that they use the given `terrain` for the given `terrain_set`. The function will also connect two successive cell in the path with the same terrain. This function might update neighboring tiles if needed to create correct terrain transitions.
   * If `ignore_empty_terrains` is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   * **Note:** To work correctly, this method requires the {@link TileMapLayer}'s TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   */
  set_cells_terrain_path(path: unknown, terrain_set: int, terrain: int, ignore_empty_terrains?: boolean): void;
  /**
   * Sets a custom `map` as a {@link NavigationServer2D} navigation map. If not set, uses the default {@link World2D} navigation map instead.
   */
  set_navigation_map(map: RID): void;
  /**
   * Pastes the {@link TileMapPattern} at the given `position` in the tile map. See also {@link get_pattern}.
   */
  set_pattern(position: Vector2i, pattern: TileMapPattern): void;
  /**
   * Triggers a direct update of the {@link TileMapLayer}. Usually, calling this function is not needed, as {@link TileMapLayer} node updates automatically when one of its properties or cells is modified.
   * However, for performance reasons, those updates are batched and delayed to the end of the frame. Calling this function will force the {@link TileMapLayer} to update right away instead.
   * **Warning:** Updating the {@link TileMapLayer} is computationally expensive and may impact performance. Try to limit the number of updates and how many tiles they impact.
   */
  update_internals(): void;

  /**
   * Emitted when this {@link TileMapLayer}'s properties changes. This includes modified cells, properties, or changes made to its assigned {@link TileSet}.
   * **Note:** This signal may be emitted very often when batch-modifying a {@link TileMapLayer}. Avoid executing complex processing in a connected function, and consider delaying it to the end of the frame instead (i.e. calling {@link Object.call_deferred}).
   */
  changed: Signal<[]>;

  // enum DebugVisibilityMode
  /**
   * Hide the collisions or navigation debug shapes in the editor, and use the debug settings to determine their visibility in game (i.e. {@link SceneTree.debug_collisions_hint} or {@link SceneTree.debug_navigation_hint}).
   */
  static readonly DEBUG_VISIBILITY_MODE_DEFAULT: int;
  /** Always hide the collisions or navigation debug shapes. */
  static readonly DEBUG_VISIBILITY_MODE_FORCE_HIDE: int;
  /** Always show the collisions or navigation debug shapes. */
  static readonly DEBUG_VISIBILITY_MODE_FORCE_SHOW: int;
}
