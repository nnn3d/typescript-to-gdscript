// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Node for 2D tile-based maps. */
declare class TileMap<Tree extends object = any> extends Node2D<Tree> {
  /**
   * If enabled, the TileMap will see its collisions synced to the physics tick and change its collision type from static to kinematic. This is required to create TileMap-based moving platform.
   * **Note:** Enabling {@link collision_animatable} may have a small performance impact, only do it if the TileMap is moving and has colliding tiles.
   */
  collision_animatable: boolean;
  /**
   * Show or hide the TileMap's collision shapes. If set to {@link VISIBILITY_MODE_DEFAULT}, this depends on the show collision debug settings.
   */
  collision_visibility_mode: int;
  /**
   * Show or hide the TileMap's navigation meshes. If set to {@link VISIBILITY_MODE_DEFAULT}, this depends on the show navigation debug settings.
   */
  navigation_visibility_mode: int;
  /**
   * The TileMap's quadrant size. A quadrant is a group of tiles to be drawn together on a single canvas item, for optimization purposes. {@link rendering_quadrant_size} defines the length of a square's side, in the map's coordinate system, that forms the quadrant. Thus, the default quadrant size groups together `16 * 16 = 256` tiles.
   * The quadrant size does not apply on Y-sorted layers, as tiles are grouped by Y position instead in that case.
   * **Note:** As quadrants are created according to the map's coordinate system, the quadrant's "square shape" might not look like square in the TileMap's local coordinate system.
   */
  rendering_quadrant_size: int;
  /**
   * The {@link TileSet} used by this {@link TileMap}. The textures, collisions, and additional behavior of all available tiles are stored here.
   */
  tile_set: TileSet;
  set_collision_animatable(value: boolean): void;
  is_collision_animatable(): boolean;
  set_collision_visibility_mode(value: int): void;
  get_collision_visibility_mode(): int;
  set_navigation_visibility_mode(value: int): void;
  get_navigation_visibility_mode(): int;
  set_rendering_quadrant_size(value: int): void;
  get_rendering_quadrant_size(): int;
  set_tileset(value: TileSet): void;
  get_tileset(): TileSet;

  /**
   * Called with a TileData object about to be used internally by the TileMap, allowing its modification at runtime.
   * This method is only called if {@link _use_tile_data_runtime_update} is implemented and returns `true` for the given tile `coords` and `layer`.
   * **Warning:** The `tile_data` object's sub-resources are the same as the one in the TileSet. Modifying them might impact the whole TileSet. Instead, make sure to duplicate those resources.
   * **Note:** If the properties of `tile_data` object should change over time, use {@link notify_runtime_tile_data_update} to notify the TileMap it needs an update.
   */
  _tile_data_runtime_update(layer: int, coords: Vector2i, tile_data: TileData): void;
  /**
   * Should return `true` if the tile at coordinates `coords` on layer `layer` requires a runtime update.
   * **Warning:** Make sure this function only return `true` when needed. Any tile processed at runtime without a need for it will imply a significant performance penalty.
   * **Note:** If the result of this function should changed, use {@link notify_runtime_tile_data_update} to notify the TileMap it needs an update.
   */
  _use_tile_data_runtime_update(layer: int, coords: Vector2i): boolean;
  /**
   * Adds a layer at the given position `to_position` in the array. If `to_position` is negative, the position is counted from the end, with `-1` adding the layer at the end of the array.
   */
  add_layer(to_position: int): void;
  /** Clears all cells. */
  clear(): void;
  /**
   * Clears all cells on the given layer.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  clear_layer(layer: int): void;
  /**
   * Erases the cell on layer `layer` at coordinates `coords`.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  erase_cell(layer: int, coords: Vector2i): void;
  /** Clears cells that do not exist in the tileset. */
  fix_invalid_tiles(): void;
  /** Forces the TileMap and the layer `layer` to update. */
  force_update(layer?: int): void;
  /**
   * Returns the tile alternative ID of the cell on layer `layer` at `coords`.
   * If `use_proxies` is `false`, ignores the {@link TileSet}'s tile proxies, returning the raw alternative identifier. See {@link TileSet.map_tile_proxy}.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_cell_alternative_tile(layer: int, coords: Vector2i, use_proxies?: boolean): int;
  /**
   * Returns the tile atlas coordinates ID of the cell on layer `layer` at coordinates `coords`. Returns `Vector2i(-1, -1)` if the cell does not exist.
   * If `use_proxies` is `false`, ignores the {@link TileSet}'s tile proxies, returning the raw atlas coordinate identifier. See {@link TileSet.map_tile_proxy}.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_cell_atlas_coords(layer: int, coords: Vector2i, use_proxies?: boolean): Vector2i;
  /**
   * Returns the tile source ID of the cell on layer `layer` at coordinates `coords`. Returns `-1` if the cell does not exist.
   * If `use_proxies` is `false`, ignores the {@link TileSet}'s tile proxies, returning the raw source identifier. See {@link TileSet.map_tile_proxy}.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_cell_source_id(layer: int, coords: Vector2i, use_proxies?: boolean): int;
  /**
   * Returns the {@link TileData} object associated with the given cell, or `null` if the cell does not exist or is not a {@link TileSetAtlasSource}.
   * If `layer` is negative, the layers are accessed from the last one.
   * If `use_proxies` is `false`, ignores the {@link TileSet}'s tile proxies. See {@link TileSet.map_tile_proxy}.
   */
  get_cell_tile_data(layer: int, coords: Vector2i, use_proxies?: boolean): TileData;
  /**
   * Returns the coordinates of the tile for given physics body RID. Such RID can be retrieved from {@link KinematicCollision2D.get_collider_rid}, when colliding with a tile.
   */
  get_coords_for_body_rid(body: RID): Vector2i;
  /**
   * Returns the tilemap layer of the tile for given physics body RID. Such RID can be retrieved from {@link KinematicCollision2D.get_collider_rid}, when colliding with a tile.
   */
  get_layer_for_body_rid(body: RID): int;
  /**
   * Returns a TileMap layer's modulate.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_layer_modulate(layer: int): Color;
  /**
   * Returns a TileMap layer's name.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_layer_name(layer: int): string;
  /**
   * Returns the {@link RID} of the {@link NavigationServer2D} navigation map assigned to the specified TileMap layer `layer`.
   * By default the TileMap uses the default {@link World2D} navigation map for the first TileMap layer. For each additional TileMap layer a new navigation map is created for the additional layer.
   * In order to make {@link NavigationAgent2D} switch between TileMap layer navigation maps use {@link NavigationAgent2D.set_navigation_map} with the navigation map received from {@link get_layer_navigation_map}.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_layer_navigation_map(layer: int): RID;
  /**
   * Returns a TileMap layer's Y sort origin.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_layer_y_sort_origin(layer: int): int;
  /**
   * Returns a TileMap layer's Z-index value.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_layer_z_index(layer: int): int;
  /** Returns the number of layers in the TileMap. */
  get_layers_count(): int;
  /**
   * Returns the {@link RID} of the {@link NavigationServer2D} navigation map assigned to the specified TileMap layer `layer`.
   */
  get_navigation_map(layer: int): RID;
  /**
   * Returns the neighboring cell to the one at coordinates `coords`, identified by the `neighbor` direction. This method takes into account the different layouts a TileMap can take.
   */
  get_neighbor_cell(coords: Vector2i, neighbor: int): Vector2i;
  /**
   * Creates a new {@link TileMapPattern} from the given layer and set of cells.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_pattern(layer: int, coords_array: unknown): TileMapPattern;
  /** Returns the list of all neighbourings cells to the one at `coords`. */
  get_surrounding_cells(coords: Vector2i): unknown;
  /**
   * Returns a {@link Vector2i} array with the positions of all cells containing a tile in the given layer. A cell is considered empty if its source identifier equals -1, its atlas coordinates identifiers is `Vector2(-1, -1)` and its alternative identifier is -1.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_used_cells(layer: int): unknown;
  /**
   * Returns a {@link Vector2i} array with the positions of all cells containing a tile in the given layer. Tiles may be filtered according to their source (`source_id`), their atlas coordinates (`atlas_coords`) or alternative id (`alternative_tile`).
   * If a parameter has its value set to the default one, this parameter is not used to filter a cell. Thus, if all parameters have their respective default value, this method returns the same result as {@link get_used_cells}.
   * A cell is considered empty if its source identifier equals -1, its atlas coordinates identifiers is `Vector2(-1, -1)` and its alternative identifier is -1.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  get_used_cells_by_id(layer: int, source_id?: int, atlas_coords?: Vector2i, alternative_tile?: int): unknown;
  /** Returns a rectangle enclosing the used (non-empty) tiles of the map, including all layers. */
  get_used_rect(): Rect2i;
  /**
   * Returns `true` if the cell on layer `layer` at coordinates `coords` is flipped horizontally. The result is valid only for atlas sources.
   */
  is_cell_flipped_h(layer: int, coords: Vector2i, use_proxies?: boolean): boolean;
  /**
   * Returns `true` if the cell on layer `layer` at coordinates `coords` is flipped vertically. The result is valid only for atlas sources.
   */
  is_cell_flipped_v(layer: int, coords: Vector2i, use_proxies?: boolean): boolean;
  /**
   * Returns `true` if the cell on layer `layer` at coordinates `coords` is transposed. The result is valid only for atlas sources.
   */
  is_cell_transposed(layer: int, coords: Vector2i, use_proxies?: boolean): boolean;
  /**
   * Returns if a layer is enabled.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  is_layer_enabled(layer: int): boolean;
  /** Returns if a layer's built-in navigation regions generation is enabled. */
  is_layer_navigation_enabled(layer: int): boolean;
  /**
   * Returns if a layer Y-sorts its tiles.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  is_layer_y_sort_enabled(layer: int): boolean;
  /**
   * Returns the map coordinates of the cell containing the given `local_position`. If `local_position` is in global coordinates, consider using {@link Node2D.to_local} before passing it to this method. See also {@link map_to_local}.
   */
  local_to_map(local_position: Vector2): Vector2i;
  /**
   * Returns for the given coordinate `coords_in_pattern` in a {@link TileMapPattern} the corresponding cell coordinates if the pattern was pasted at the `position_in_tilemap` coordinates (see {@link set_pattern}). This mapping is required as in half-offset tile shapes, the mapping might not work by calculating `position_in_tile_map + coords_in_pattern`.
   */
  map_pattern(position_in_tilemap: Vector2i, coords_in_pattern: Vector2i, pattern: TileMapPattern): Vector2i;
  /**
   * Returns the centered position of a cell in the TileMap's local coordinate space. To convert the returned value into global coordinates, use {@link Node2D.to_global}. See also {@link local_to_map}.
   * **Note:** This may not correspond to the visual position of the tile, i.e. it ignores the {@link TileData.texture_origin} property of individual tiles.
   */
  map_to_local(map_position: Vector2i): Vector2;
  /** Moves the layer at index `layer` to the given position `to_position` in the array. */
  move_layer(layer: int, to_position: int): void;
  /**
   * Notifies the TileMap node that calls to {@link _use_tile_data_runtime_update} or {@link _tile_data_runtime_update} will lead to different results. This will thus trigger a TileMap update.
   * If `layer` is provided, only notifies changes for the given layer. Providing the `layer` argument (when applicable) is usually preferred for performance reasons.
   * **Warning:** Updating the TileMap is computationally expensive and may impact performance. Try to limit the number of calls to this function to avoid unnecessary update.
   * **Note:** This does not trigger a direct update of the TileMap, the update will be done at the end of the frame as usual (unless you call {@link update_internals}).
   */
  notify_runtime_tile_data_update(layer?: int): void;
  /** Removes the layer at index `layer`. */
  remove_layer(layer: int): void;
  /**
   * Sets the tile identifiers for the cell on layer `layer` at coordinates `coords`. Each tile of the {@link TileSet} is identified using three parts:
   * - The source identifier `source_id` identifies a {@link TileSetSource} identifier. See {@link TileSet.set_source_id},
   * - The atlas coordinates identifier `atlas_coords` identifies a tile coordinates in the atlas (if the source is a {@link TileSetAtlasSource}). For {@link TileSetScenesCollectionSource} it should always be `Vector2i(0, 0)`),
   * - The alternative tile identifier `alternative_tile` identifies a tile alternative in the atlas (if the source is a {@link TileSetAtlasSource}), and the scene for a {@link TileSetScenesCollectionSource}.
   * If `source_id` is set to `-1`, `atlas_coords` to `Vector2i(-1, -1)` or `alternative_tile` to `-1`, the cell will be erased. An erased cell gets **all** its identifiers automatically set to their respective invalid values, namely `-1`, `Vector2i(-1, -1)` and `-1`.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_cell(layer: int, coords: Vector2i, source_id?: int, atlas_coords?: Vector2i, alternative_tile?: int): void;
  /**
   * Update all the cells in the `cells` coordinates array so that they use the given `terrain` for the given `terrain_set`. If an updated cell has the same terrain as one of its neighboring cells, this function tries to join the two. This function might update neighboring tiles if needed to create correct terrain transitions.
   * If `ignore_empty_terrains` is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   * If `layer` is negative, the layers are accessed from the last one.
   * **Note:** To work correctly, this method requires the TileMap's TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   */
  set_cells_terrain_connect(layer: int, cells: unknown, terrain_set: int, terrain: int, ignore_empty_terrains?: boolean): void;
  /**
   * Update all the cells in the `path` coordinates array so that they use the given `terrain` for the given `terrain_set`. The function will also connect two successive cell in the path with the same terrain. This function might update neighboring tiles if needed to create correct terrain transitions.
   * If `ignore_empty_terrains` is `true`, empty terrains will be ignored when trying to find the best fitting tile for the given terrain constraints.
   * If `layer` is negative, the layers are accessed from the last one.
   * **Note:** To work correctly, this method requires the TileMap's TileSet to have terrains set up with all required terrain combinations. Otherwise, it may produce unexpected results.
   */
  set_cells_terrain_path(layer: int, path: unknown, terrain_set: int, terrain: int, ignore_empty_terrains?: boolean): void;
  /**
   * Enables or disables the layer `layer`. A disabled layer is not processed at all (no rendering, no physics, etc.).
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_enabled(layer: int, enabled: boolean): void;
  /**
   * Sets a layer's color. It will be multiplied by tile's color and TileMap's modulate.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_modulate(layer: int, modulate: Color): void;
  /**
   * Sets a layer's name. This is mostly useful in the editor.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_name(layer: int, name: string): void;
  /**
   * Enables or disables a layer's built-in navigation regions generation. Disable this if you need to bake navigation regions from a TileMap using a {@link NavigationRegion2D} node.
   */
  set_layer_navigation_enabled(layer: int, enabled: boolean): void;
  /**
   * Assigns `map` as a {@link NavigationServer2D} navigation map for the specified TileMap layer `layer`.
   * By default the TileMap uses the default {@link World2D} navigation map for the first TileMap layer. For each additional TileMap layer a new navigation map is created for the additional layer.
   * In order to make {@link NavigationAgent2D} switch between TileMap layer navigation maps use {@link NavigationAgent2D.set_navigation_map} with the navigation map received from {@link get_layer_navigation_map}.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_navigation_map(layer: int, map: RID): void;
  /**
   * Enables or disables a layer's Y-sorting. If a layer is Y-sorted, the layer will behave as a CanvasItem node where each of its tile gets Y-sorted.
   * Y-sorted layers should usually be on different Z-index values than not Y-sorted layers, otherwise, each of those layer will be Y-sorted as whole with the Y-sorted one. This is usually an undesired behavior.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_y_sort_enabled(layer: int, y_sort_enabled: boolean): void;
  /**
   * Sets a layer's Y-sort origin value. This Y-sort origin value is added to each tile's Y-sort origin value.
   * This allows, for example, to fake a different height level on each layer. This can be useful for top-down view games.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_y_sort_origin(layer: int, y_sort_origin: int): void;
  /**
   * Sets a layers Z-index value. This Z-index is added to each tile's Z-index value.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_layer_z_index(layer: int, z_index: int): void;
  /**
   * Assigns `map` as a {@link NavigationServer2D} navigation map for the specified TileMap layer `layer`.
   */
  set_navigation_map(layer: int, map: RID): void;
  /**
   * Paste the given {@link TileMapPattern} at the given `position` and `layer` in the tile map.
   * If `layer` is negative, the layers are accessed from the last one.
   */
  set_pattern(layer: int, position: Vector2i, pattern: TileMapPattern): void;
  /**
   * Triggers a direct update of the TileMap. Usually, calling this function is not needed, as TileMap node updates automatically when one of its properties or cells is modified.
   * However, for performance reasons, those updates are batched and delayed to the end of the frame. Calling this function will force the TileMap to update right away instead.
   * **Warning:** Updating the TileMap is computationally expensive and may impact performance. Try to limit the number of updates and how many tiles they impact.
   */
  update_internals(): void;

  /** Emitted when the {@link TileSet} of this TileMap changes. */
  changed: Signal<[]>;

  // enum VisibilityMode
  /** Use the debug settings to determine visibility. */
  static readonly VISIBILITY_MODE_DEFAULT: int;
  /** Always hide. */
  static readonly VISIBILITY_MODE_FORCE_HIDE: int;
  /** Always show. */
  static readonly VISIBILITY_MODE_FORCE_SHOW: int;
}
