// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Settings for a single tile in a {@link TileSet}. */
declare class TileData extends GodotObject {
  /** If `true`, the tile will have its texture flipped horizontally. */
  flip_h: boolean;
  /** If `true`, the tile will have its texture flipped vertically. */
  flip_v: boolean;
  /**
   * The {@link Material} to use for this {@link TileData}. This can be a {@link CanvasItemMaterial} to use the default shader, or a {@link ShaderMaterial} to use a custom shader.
   */
  material: Material | null;
  /** Color modulation of the tile. */
  modulate: Color;
  /** Relative probability of this tile being selected when drawing a pattern of random tiles. */
  probability: float;
  /** ID of the terrain from the terrain set that the tile uses. */
  terrain: int;
  /** ID of the terrain set that the tile uses. */
  terrain_set: int;
  /** Offsets the position of where the tile is drawn. */
  texture_origin: Vector2i;
  /** If `true`, the tile will display transposed, i.e. with horizontal and vertical texture UVs swapped. */
  transpose: boolean;
  /** Vertical point of the tile used for determining y-sorted order. */
  y_sort_origin: int;
  /** Ordering index of this tile, relative to {@link TileMapLayer}. */
  z_index: int;
  set_flip_h(value: boolean): void;
  get_flip_h(): boolean;
  set_flip_v(value: boolean): void;
  get_flip_v(): boolean;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_probability(value: float): void;
  get_probability(): float;
  set_terrain(value: int): void;
  get_terrain(): int;
  set_terrain_set(value: int): void;
  get_terrain_set(): int;
  set_texture_origin(value: Vector2i | Vector2): void;
  get_texture_origin(): Vector2i;
  set_transpose(value: boolean): void;
  get_transpose(): boolean;
  set_y_sort_origin(value: int): void;
  get_y_sort_origin(): int;
  set_z_index(value: int): void;
  get_z_index(): int;

  /** Adds a collision polygon to the tile on the given TileSet physics layer. */
  add_collision_polygon(layer_id: int): void;
  /** Adds an occlusion polygon to the tile on the TileSet occlusion layer with index `layer_id`. */
  add_occluder_polygon(layer_id: int): void;
  /**
   * Returns the one-way margin (for one-way platforms) of the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  get_collision_polygon_one_way_margin(layer_id: int, polygon_index: int): float;
  /**
   * Returns the points of the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  get_collision_polygon_points(layer_id: int, polygon_index: int): PackedVector2Array;
  /** Returns how many polygons the tile has for TileSet physics layer with index `layer_id`. */
  get_collision_polygons_count(layer_id: int): int;
  /** Returns the constant angular velocity applied to objects colliding with this tile. */
  get_constant_angular_velocity(layer_id: int): float;
  /** Returns the constant linear velocity applied to objects colliding with this tile. */
  get_constant_linear_velocity(layer_id: int): Vector2;
  /**
   * Returns the custom data value for custom data layer named `layer_name`. To check if a custom data layer exists, use {@link has_custom_data}.
   */
  get_custom_data(layer_name: string | NodePath): unknown;
  /** Returns the custom data value for custom data layer with index `layer_id`. */
  get_custom_data_by_layer_id(layer_id: int): unknown;
  /**
   * Returns the navigation polygon of the tile for the TileSet navigation layer with index `layer_id`.
   * `flip_h`, `flip_v`, and `transpose` allow transforming the returned polygon.
   */
  get_navigation_polygon(layer_id: int, flip_h?: boolean, flip_v?: boolean, transpose?: boolean): NavigationPolygon | null;
  /**
   * Returns the occluder polygon of the tile for the TileSet occlusion layer with index `layer_id`.
   * `flip_h`, `flip_v`, and `transpose` allow transforming the returned polygon.
   */
  get_occluder(layer_id: int, flip_h?: boolean, flip_v?: boolean, transpose?: boolean): OccluderPolygon2D | null;
  /**
   * Returns the occluder polygon at index `polygon_index` from the TileSet occlusion layer with index `layer_id`.
   * The `flip_h`, `flip_v`, and `transpose` parameters can be `true` to transform the returned polygon.
   */
  get_occluder_polygon(layer_id: int, polygon_index: int, flip_h?: boolean, flip_v?: boolean, transpose?: boolean): OccluderPolygon2D | null;
  /**
   * Returns the number of occluder polygons of the tile in the TileSet occlusion layer with index `layer_id`.
   */
  get_occluder_polygons_count(layer_id: int): int;
  /**
   * Returns the tile's terrain bit for the given `peering_bit` direction. To check that a direction is valid, use {@link is_valid_terrain_peering_bit}.
   */
  get_terrain_peering_bit(peering_bit: int): int;
  /** Returns whether there exists a custom data layer named `layer_name`. */
  has_custom_data(layer_name: string | NodePath): boolean;
  /**
   * Returns whether one-way collisions are enabled for the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  is_collision_polygon_one_way(layer_id: int, polygon_index: int): boolean;
  /** Returns whether the given `peering_bit` direction is valid for this tile. */
  is_valid_terrain_peering_bit(peering_bit: int): boolean;
  /** Removes the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`. */
  remove_collision_polygon(layer_id: int, polygon_index: int): void;
  /** Removes the polygon at index `polygon_index` for TileSet occlusion layer with index `layer_id`. */
  remove_occluder_polygon(layer_id: int, polygon_index: int): void;
  /**
   * Enables/disables one-way collisions on the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  set_collision_polygon_one_way(layer_id: int, polygon_index: int, one_way: boolean): void;
  /**
   * Sets the one-way margin (for one-way platforms) of the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  set_collision_polygon_one_way_margin(layer_id: int, polygon_index: int, one_way_margin: float): void;
  /**
   * Sets the points of the polygon at index `polygon_index` for TileSet physics layer with index `layer_id`.
   */
  set_collision_polygon_points(layer_id: int, polygon_index: int, polygon: PackedVector2Array | Array<unknown>): void;
  /** Sets the polygons count for TileSet physics layer with index `layer_id`. */
  set_collision_polygons_count(layer_id: int, polygons_count: int): void;
  /**
   * Sets the constant angular velocity. This does not rotate the tile. This angular velocity is applied to objects colliding with this tile.
   */
  set_constant_angular_velocity(layer_id: int, velocity: float): void;
  /**
   * Sets the constant linear velocity. This does not move the tile. This linear velocity is applied to objects colliding with this tile. This is useful to create conveyor belts.
   */
  set_constant_linear_velocity(layer_id: int, velocity: Vector2 | Vector2i): void;
  /** Sets the tile's custom data value for the TileSet custom data layer with name `layer_name`. */
  set_custom_data(layer_name: string | NodePath, value: unknown): void;
  /** Sets the tile's custom data value for the TileSet custom data layer with index `layer_id`. */
  set_custom_data_by_layer_id(layer_id: int, value: unknown): void;
  /** Sets the navigation polygon for the TileSet navigation layer with index `layer_id`. */
  set_navigation_polygon(layer_id: int, navigation_polygon: NavigationPolygon): void;
  /** Sets the occluder for the TileSet occlusion layer with index `layer_id`. */
  set_occluder(layer_id: int, occluder_polygon: OccluderPolygon2D): void;
  /**
   * Sets the occluder for polygon with index `polygon_index` in the TileSet occlusion layer with index `layer_id`.
   */
  set_occluder_polygon(layer_id: int, polygon_index: int, polygon: OccluderPolygon2D): void;
  /** Sets the occluder polygon count in the TileSet occlusion layer with index `layer_id`. */
  set_occluder_polygons_count(layer_id: int, polygons_count: int): void;
  /**
   * Sets the tile's terrain bit for the given `peering_bit` direction. To check that a direction is valid, use {@link is_valid_terrain_peering_bit}.
   */
  set_terrain_peering_bit(peering_bit: int, terrain: int): void;

  /** Emitted when any of the properties are changed. */
  changed: Signal<[]>;
}
