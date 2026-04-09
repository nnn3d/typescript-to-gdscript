// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Tile library for tilemaps. */
declare class TileSet extends Resource {
  /**
   * For all half-offset shapes (Isometric, Hexagonal and Half-Offset square), changes the way tiles are indexed in the {@link TileMapLayer} grid.
   */
  tile_layout: int;
  /**
   * For all half-offset shapes (Isometric, Hexagonal and Half-Offset square), determines the offset axis.
   */
  tile_offset_axis: int;
  /** The tile shape. */
  tile_shape: int;
  /**
   * The tile size, in pixels. For all tile shapes, this size corresponds to the encompassing rectangle of the tile shape. This is thus the minimal cell size required in an atlas.
   */
  tile_size: Vector2i;
  /** Enables/Disable uv clipping when rendering the tiles. */
  uv_clipping: boolean;
  set_tile_layout(value: int): void;
  get_tile_layout(): int;
  set_tile_offset_axis(value: int): void;
  get_tile_offset_axis(): int;
  set_tile_shape(value: int): void;
  get_tile_shape(): int;
  set_tile_size(value: Vector2i | Vector2): void;
  get_tile_size(): Vector2i;
  set_uv_clipping(value: boolean): void;
  is_uv_clipping(): boolean;

  /**
   * Adds a custom data layer to the TileSet at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   * Custom data layers allow assigning custom properties to atlas tiles.
   */
  add_custom_data_layer(to_position?: int): void;
  /**
   * Adds a navigation layer to the TileSet at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   * Navigation layers allow assigning a navigable area to atlas tiles.
   */
  add_navigation_layer(to_position?: int): void;
  /**
   * Adds an occlusion layer to the TileSet at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   * Occlusion layers allow assigning occlusion polygons to atlas tiles.
   */
  add_occlusion_layer(to_position?: int): void;
  /**
   * Adds a {@link TileMapPattern} to be stored in the TileSet resource. If provided, insert it at the given `index`.
   */
  add_pattern(pattern: TileMapPattern, index?: int): int;
  /**
   * Adds a physics layer to the TileSet at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   * Physics layers allow assigning collision polygons to atlas tiles.
   */
  add_physics_layer(to_position?: int): void;
  /**
   * Adds a {@link TileSetSource} to the TileSet. If `atlas_source_id_override` is not -1, also set its source ID. Otherwise, a unique identifier is automatically generated.
   * The function returns the added source ID or -1 if the source could not be added.
   * **Warning:** A source cannot belong to two TileSets at the same time. If the added source was attached to another {@link TileSet}, it will be removed from that one.
   */
  add_source(source: TileSetSource, atlas_source_id_override?: int): int;
  /**
   * Adds a new terrain to the given terrain set `terrain_set` at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   */
  add_terrain(terrain_set: int, to_position?: int): void;
  /**
   * Adds a new terrain set at the given position `to_position` in the array. If `to_position` is -1, adds it at the end of the array.
   */
  add_terrain_set(to_position?: int): void;
  /** Clears tile proxies pointing to invalid tiles. */
  cleanup_invalid_tile_proxies(): void;
  /** Clears all tile proxies. */
  clear_tile_proxies(): void;
  /**
   * Returns the alternative-level proxy for the given identifiers. The returned array contains the three proxie's target identifiers (source ID, atlas coords ID and alternative tile ID).
   * If the TileSet has no proxy for the given identifiers, returns an empty Array.
   */
  get_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2, alternative_from: int): Array<unknown>;
  /**
   * Returns the coordinate-level proxy for the given identifiers. The returned array contains the two target identifiers of the proxy (source ID and atlas coordinates ID).
   * If the TileSet has no proxy for the given identifiers, returns an empty Array.
   */
  get_coords_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2): Array<unknown>;
  /** Returns the index of the custom data layer identified by the given name. */
  get_custom_data_layer_by_name(layer_name: string): int;
  /** Returns the name of the custom data layer identified by the given index. */
  get_custom_data_layer_name(layer_index: int): string;
  /** Returns the type of the custom data layer identified by the given index. */
  get_custom_data_layer_type(layer_index: int): int;
  /** Returns the custom data layers count. */
  get_custom_data_layers_count(): int;
  /**
   * Returns whether or not the specified navigation layer of the TileSet navigation data layer identified by the given `layer_index` is enabled, given a navigation_layers `layer_number` between 1 and 32.
   */
  get_navigation_layer_layer_value(layer_index: int, layer_number: int): boolean;
  /** Returns the navigation layers (as in the Navigation server) of the given TileSet navigation layer. */
  get_navigation_layer_layers(layer_index: int): int;
  /** Returns the navigation layers count. */
  get_navigation_layers_count(): int;
  /**
   * Returns a new unused source ID. This generated ID is the same that a call to {@link add_source} would return.
   */
  get_next_source_id(): int;
  /** Returns the light mask of the occlusion layer. */
  get_occlusion_layer_light_mask(layer_index: int): int;
  /** Returns if the occluders from this layer use `sdf_collision`. */
  get_occlusion_layer_sdf_collision(layer_index: int): boolean;
  /** Returns the occlusion layers count. */
  get_occlusion_layers_count(): int;
  /** Returns the {@link TileMapPattern} at the given `index`. */
  get_pattern(index?: int): TileMapPattern | null;
  /** Returns the number of {@link TileMapPattern} this tile set handles. */
  get_patterns_count(): int;
  /**
   * Returns the collision layer (as in the physics server) bodies on the given TileSet's physics layer are in.
   */
  get_physics_layer_collision_layer(layer_index: int): int;
  /** Returns the collision mask of bodies on the given TileSet's physics layer. */
  get_physics_layer_collision_mask(layer_index: int): int;
  /** Returns the collision priority of bodies on the given TileSet's physics layer. */
  get_physics_layer_collision_priority(layer_index: int): float;
  /** Returns the physics material of bodies on the given TileSet's physics layer. */
  get_physics_layer_physics_material(layer_index: int): PhysicsMaterial | null;
  /** Returns the physics layers count. */
  get_physics_layers_count(): int;
  /** Returns the {@link TileSetSource} with ID `source_id`. */
  get_source(source_id: int): TileSetSource | null;
  /** Returns the number of {@link TileSetSource} in this TileSet. */
  get_source_count(): int;
  /** Returns the source ID for source with index `index`. */
  get_source_id(index: int): int;
  /**
   * Returns the source-level proxy for the given source identifier.
   * If the TileSet has no proxy for the given identifier, returns -1.
   */
  get_source_level_tile_proxy(source_from: int): int;
  /** Returns a terrain's color. */
  get_terrain_color(terrain_set: int, terrain_index: int): Color;
  /** Returns a terrain's name. */
  get_terrain_name(terrain_set: int, terrain_index: int): string;
  /** Returns a terrain set mode. */
  get_terrain_set_mode(terrain_set: int): int;
  /** Returns the terrain sets count. */
  get_terrain_sets_count(): int;
  /** Returns the number of terrains in the given terrain set. */
  get_terrains_count(terrain_set: int): int;
  /** Returns if there is an alternative-level proxy for the given identifiers. */
  has_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2, alternative_from: int): boolean;
  /** Returns if there is a coodinates-level proxy for the given identifiers. */
  has_coords_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2): boolean;
  /** Returns if there is a custom data layer named `layer_name`. */
  has_custom_data_layer_by_name(layer_name: string): boolean;
  /** Returns if this TileSet has a source for the given source ID. */
  has_source(source_id: int): boolean;
  /** Returns if there is a source-level proxy for the given source ID. */
  has_source_level_tile_proxy(source_from: int): boolean;
  /**
   * According to the configured proxies, maps the provided identifiers to a new set of identifiers. The source ID, atlas coordinates ID and alternative tile ID are returned as a 3 elements Array.
   * This function first look for matching alternative-level proxies, then coordinates-level proxies, then source-level proxies.
   * If no proxy corresponding to provided identifiers are found, returns the same values the ones used as arguments.
   */
  map_tile_proxy(source_from: int, coords_from: Vector2i | Vector2, alternative_from: int): Array<unknown>;
  /**
   * Moves the custom data layer at index `layer_index` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_custom_data_layer(layer_index: int, to_position: int): void;
  /**
   * Moves the navigation layer at index `layer_index` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_navigation_layer(layer_index: int, to_position: int): void;
  /**
   * Moves the occlusion layer at index `layer_index` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_occlusion_layer(layer_index: int, to_position: int): void;
  /**
   * Moves the physics layer at index `layer_index` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_physics_layer(layer_index: int, to_position: int): void;
  /**
   * Moves the terrain at index `terrain_index` for terrain set `terrain_set` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_terrain(terrain_set: int, terrain_index: int, to_position: int): void;
  /**
   * Moves the terrain set at index `terrain_set` to the given position `to_position` in the array. Also updates the atlas tiles accordingly.
   */
  move_terrain_set(terrain_set: int, to_position: int): void;
  /** Removes an alternative-level proxy for the given identifiers. */
  remove_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2, alternative_from: int): void;
  /** Removes a coordinates-level proxy for the given identifiers. */
  remove_coords_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2): void;
  /** Removes the custom data layer at index `layer_index`. Also updates the atlas tiles accordingly. */
  remove_custom_data_layer(layer_index: int): void;
  /** Removes the navigation layer at index `layer_index`. Also updates the atlas tiles accordingly. */
  remove_navigation_layer(layer_index: int): void;
  /** Removes the occlusion layer at index `layer_index`. Also updates the atlas tiles accordingly. */
  remove_occlusion_layer(layer_index: int): void;
  /** Remove the {@link TileMapPattern} at the given index. */
  remove_pattern(index: int): void;
  /** Removes the physics layer at index `layer_index`. Also updates the atlas tiles accordingly. */
  remove_physics_layer(layer_index: int): void;
  /** Removes the source with the given source ID. */
  remove_source(source_id: int): void;
  /** Removes a source-level tile proxy. */
  remove_source_level_tile_proxy(source_from: int): void;
  /**
   * Removes the terrain at index `terrain_index` in the given terrain set `terrain_set`. Also updates the atlas tiles accordingly.
   */
  remove_terrain(terrain_set: int, terrain_index: int): void;
  /** Removes the terrain set at index `terrain_set`. Also updates the atlas tiles accordingly. */
  remove_terrain_set(terrain_set: int): void;
  /**
   * Create an alternative-level proxy for the given identifiers. A proxy will map set of tile identifiers to another set of identifiers.
   * Proxied tiles can be automatically replaced in TileMapLayer nodes using the editor.
   */
  set_alternative_level_tile_proxy(source_from: int, coords_from: Vector2i | Vector2, alternative_from: int, source_to: int, coords_to: Vector2i | Vector2, alternative_to: int): void;
  /**
   * Creates a coordinates-level proxy for the given identifiers. A proxy will map set of tile identifiers to another set of identifiers. The alternative tile ID is kept the same when using coordinates-level proxies.
   * Proxied tiles can be automatically replaced in TileMapLayer nodes using the editor.
   */
  set_coords_level_tile_proxy(p_source_from: int, coords_from: Vector2i | Vector2, source_to: int, coords_to: Vector2i | Vector2): void;
  /**
   * Sets the name of the custom data layer identified by the given index. Names are identifiers of the layer therefore if the name is already taken it will fail and raise an error.
   */
  set_custom_data_layer_name(layer_index: int, layer_name: string): void;
  /** Sets the type of the custom data layer identified by the given index. */
  set_custom_data_layer_type(layer_index: int, layer_type: int): void;
  /**
   * Based on `value`, enables or disables the specified navigation layer of the TileSet navigation data layer identified by the given `layer_index`, given a navigation_layers `layer_number` between 1 and 32.
   */
  set_navigation_layer_layer_value(layer_index: int, layer_number: int, value: boolean): void;
  /**
   * Sets the navigation layers (as in the navigation server) for navigation regions in the given TileSet navigation layer.
   */
  set_navigation_layer_layers(layer_index: int, layers: int): void;
  /**
   * Sets the occlusion layer (as in the rendering server) for occluders in the given TileSet occlusion layer.
   */
  set_occlusion_layer_light_mask(layer_index: int, light_mask: int): void;
  /** Enables or disables SDF collision for occluders in the given TileSet occlusion layer. */
  set_occlusion_layer_sdf_collision(layer_index: int, sdf_collision: boolean): void;
  /** Sets the collision layer (as in the physics server) for bodies in the given TileSet physics layer. */
  set_physics_layer_collision_layer(layer_index: int, layer: int): void;
  /** Sets the collision mask for bodies in the given TileSet physics layer. */
  set_physics_layer_collision_mask(layer_index: int, mask: int): void;
  /** Sets the collision priority for bodies in the given TileSet physics layer. */
  set_physics_layer_collision_priority(layer_index: int, priority: float): void;
  /** Sets the physics material for bodies in the given TileSet physics layer. */
  set_physics_layer_physics_material(layer_index: int, physics_material: PhysicsMaterial): void;
  /** Changes a source's ID. */
  set_source_id(source_id: int, new_source_id: int): void;
  /**
   * Creates a source-level proxy for the given source ID. A proxy will map set of tile identifiers to another set of identifiers. Both the atlas coordinates ID and the alternative tile ID are kept the same when using source-level proxies.
   * Proxied tiles can be automatically replaced in TileMapLayer nodes using the editor.
   */
  set_source_level_tile_proxy(source_from: int, source_to: int): void;
  /**
   * Sets a terrain's color. This color is used for identifying the different terrains in the TileSet editor.
   */
  set_terrain_color(terrain_set: int, terrain_index: int, color: Color): void;
  /** Sets a terrain's name. */
  set_terrain_name(terrain_set: int, terrain_index: int, name: string): void;
  /**
   * Sets a terrain mode. Each mode determines which bits of a tile shape is used to match the neighboring tiles' terrains.
   */
  set_terrain_set_mode(terrain_set: int, mode: int): void;

  // enum TileShape
  /** Rectangular tile shape. */
  static readonly TILE_SHAPE_SQUARE: int;
  /**
   * Diamond tile shape (for isometric look).
   * **Note:** Isometric {@link TileSet} works best if all sibling {@link TileMapLayer}s and their parent inheriting from {@link Node2D} have Y-sort enabled.
   */
  static readonly TILE_SHAPE_ISOMETRIC: int;
  /** Rectangular tile shape with one row/column out of two offset by half a tile. */
  static readonly TILE_SHAPE_HALF_OFFSET_SQUARE: int;
  /** Hexagonal tile shape. */
  static readonly TILE_SHAPE_HEXAGON: int;
  // enum TileLayout
  /**
   * Tile coordinates layout where both axis stay consistent with their respective local horizontal and vertical axis.
   */
  static readonly TILE_LAYOUT_STACKED: int;
  /** Same as {@link TILE_LAYOUT_STACKED}, but the first half-offset is negative instead of positive. */
  static readonly TILE_LAYOUT_STACKED_OFFSET: int;
  /**
   * Tile coordinates layout where the horizontal axis stay horizontal, and the vertical one goes down-right.
   */
  static readonly TILE_LAYOUT_STAIRS_RIGHT: int;
  /**
   * Tile coordinates layout where the vertical axis stay vertical, and the horizontal one goes down-right.
   */
  static readonly TILE_LAYOUT_STAIRS_DOWN: int;
  /**
   * Tile coordinates layout where the horizontal axis goes up-right, and the vertical one goes down-right.
   */
  static readonly TILE_LAYOUT_DIAMOND_RIGHT: int;
  /**
   * Tile coordinates layout where the horizontal axis goes down-right, and the vertical one goes down-left.
   */
  static readonly TILE_LAYOUT_DIAMOND_DOWN: int;
  // enum TileOffsetAxis
  /** Horizontal half-offset. */
  static readonly TILE_OFFSET_AXIS_HORIZONTAL: int;
  /** Vertical half-offset. */
  static readonly TILE_OFFSET_AXIS_VERTICAL: int;
  // enum CellNeighbor
  /** Neighbor on the right side. */
  static readonly CELL_NEIGHBOR_RIGHT_SIDE: int;
  /** Neighbor in the right corner. */
  static readonly CELL_NEIGHBOR_RIGHT_CORNER: int;
  /** Neighbor on the bottom right side. */
  static readonly CELL_NEIGHBOR_BOTTOM_RIGHT_SIDE: int;
  /** Neighbor in the bottom right corner. */
  static readonly CELL_NEIGHBOR_BOTTOM_RIGHT_CORNER: int;
  /** Neighbor on the bottom side. */
  static readonly CELL_NEIGHBOR_BOTTOM_SIDE: int;
  /** Neighbor in the bottom corner. */
  static readonly CELL_NEIGHBOR_BOTTOM_CORNER: int;
  /** Neighbor on the bottom left side. */
  static readonly CELL_NEIGHBOR_BOTTOM_LEFT_SIDE: int;
  /** Neighbor in the bottom left corner. */
  static readonly CELL_NEIGHBOR_BOTTOM_LEFT_CORNER: int;
  /** Neighbor on the left side. */
  static readonly CELL_NEIGHBOR_LEFT_SIDE: int;
  /** Neighbor in the left corner. */
  static readonly CELL_NEIGHBOR_LEFT_CORNER: int;
  /** Neighbor on the top left side. */
  static readonly CELL_NEIGHBOR_TOP_LEFT_SIDE: int;
  /** Neighbor in the top left corner. */
  static readonly CELL_NEIGHBOR_TOP_LEFT_CORNER: int;
  /** Neighbor on the top side. */
  static readonly CELL_NEIGHBOR_TOP_SIDE: int;
  /** Neighbor in the top corner. */
  static readonly CELL_NEIGHBOR_TOP_CORNER: int;
  /** Neighbor on the top right side. */
  static readonly CELL_NEIGHBOR_TOP_RIGHT_SIDE: int;
  /** Neighbor in the top right corner. */
  static readonly CELL_NEIGHBOR_TOP_RIGHT_CORNER: int;
  // enum TerrainMode
  /** Requires both corners and side to match with neighboring tiles' terrains. */
  static readonly TERRAIN_MODE_MATCH_CORNERS_AND_SIDES: int;
  /** Requires corners to match with neighboring tiles' terrains. */
  static readonly TERRAIN_MODE_MATCH_CORNERS: int;
  /** Requires sides to match with neighboring tiles' terrains. */
  static readonly TERRAIN_MODE_MATCH_SIDES: int;
}
