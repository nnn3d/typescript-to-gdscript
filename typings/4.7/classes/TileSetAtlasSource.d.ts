// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Exposes a 2D atlas texture as a set of tiles for a {@link TileSet} resource. */
declare class TileSetAtlasSource extends TileSetSource {
  /** Margins, in pixels, to offset the origin of the grid in the texture. */
  margins: Vector2i;
  /** Separation, in pixels, between each tile texture region of the grid. */
  separation: Vector2i;
  /** The atlas texture. */
  texture: Texture2D | null;
  /**
   * The base tile size in the texture (in pixel). This size must be bigger than or equal to the TileSet's `tile_size` value.
   */
  texture_region_size: Vector2i;
  /**
   * If `true`, generates an internal texture with an additional one pixel padding around each tile. Texture padding avoids a common artifact where lines appear between tiles.
   * Disabling this setting might lead a small performance improvement, as generating the internal texture requires both memory and processing time when the TileSetAtlasSource resource is modified.
   */
  use_texture_padding: boolean;
  set_margins(value: Vector2i): void;
  get_margins(): Vector2i;
  set_separation(value: Vector2i): void;
  get_separation(): Vector2i;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;
  set_texture_region_size(value: Vector2i): void;
  get_texture_region_size(): Vector2i;
  set_use_texture_padding(value: boolean): void;
  get_use_texture_padding(): boolean;

  /**
   * Removes all tiles that don't fit the available texture area. This method iterates over all the source's tiles, so it's advised to use {@link has_tiles_outside_texture} beforehand.
   */
  clear_tiles_outside_texture(): void;
  /**
   * Creates an alternative tile for the tile at coordinates `atlas_coords`. If `alternative_id_override` is -1, give it an automatically generated unique ID, or assigns it the given ID otherwise.
   * Returns the new alternative identifier, or -1 if the alternative could not be created with a provided `alternative_id_override`.
   */
  create_alternative_tile(atlas_coords: Vector2i, alternative_id_override?: int): int;
  /** Creates a new tile at coordinates `atlas_coords` with the given `size`. */
  create_tile(atlas_coords: Vector2i, size?: Vector2i): void;
  /**
   * Returns the atlas grid size, which depends on how many tiles can fit in the texture. It thus depends on the {@link texture}'s size, the atlas {@link margins}, and the tiles' {@link texture_region_size}.
   */
  get_atlas_grid_size(): Vector2i;
  /** Returns the alternative ID a following call to {@link create_alternative_tile} would return. */
  get_next_alternative_tile_id(atlas_coords: Vector2i): int;
  /**
   * If {@link use_texture_padding} is `false`, returns {@link texture}. Otherwise, returns an internal {@link ImageTexture} created that includes the padding.
   */
  get_runtime_texture(): Texture2D | null;
  /**
   * Returns the region of the tile at coordinates `atlas_coords` for the given `frame` inside the texture returned by {@link get_runtime_texture}.
   * **Note:** If {@link use_texture_padding} is `false`, returns the same as {@link get_tile_texture_region}.
   */
  get_runtime_tile_texture_region(atlas_coords: Vector2i, frame: int): Rect2i;
  /** Returns how many columns the tile at `atlas_coords` has in its animation layout. */
  get_tile_animation_columns(atlas_coords: Vector2i): int;
  /**
   * Returns the animation frame duration of frame `frame_index` for the tile at coordinates `atlas_coords`.
   */
  get_tile_animation_frame_duration(atlas_coords: Vector2i, frame_index: int): float;
  /** Returns how many animation frames has the tile at coordinates `atlas_coords`. */
  get_tile_animation_frames_count(atlas_coords: Vector2i): int;
  /**
   * Returns the tile animation mode of the tile at `atlas_coords`. See also {@link set_tile_animation_mode}.
   */
  get_tile_animation_mode(atlas_coords: Vector2i): int;
  /**
   * Returns the separation (as in the atlas grid) between each frame of an animated tile at coordinates `atlas_coords`.
   */
  get_tile_animation_separation(atlas_coords: Vector2i): Vector2i;
  /** Returns the animation speed of the tile at coordinates `atlas_coords`. */
  get_tile_animation_speed(atlas_coords: Vector2i): float;
  /**
   * Returns the sum of the sum of the frame durations of the tile at coordinates `atlas_coords`. This value needs to be divided by the animation speed to get the actual animation loop duration.
   */
  get_tile_animation_total_duration(atlas_coords: Vector2i): float;
  /**
   * If there is a tile covering the `atlas_coords` coordinates, returns the top-left coordinates of the tile (thus its coordinate ID). Returns `Vector2i(-1, -1)` otherwise.
   */
  get_tile_at_coords(atlas_coords: Vector2i): Vector2i;
  /** Returns the {@link TileData} object for the given atlas coordinates and alternative ID. */
  get_tile_data(atlas_coords: Vector2i, alternative_tile: int): TileData | null;
  /** Returns the size of the tile (in the grid coordinates system) at coordinates `atlas_coords`. */
  get_tile_size_in_atlas(atlas_coords: Vector2i): Vector2i;
  /**
   * Returns a tile's texture region in the atlas texture. For animated tiles, a `frame` argument might be provided for the different frames of the animation.
   */
  get_tile_texture_region(atlas_coords: Vector2i, frame?: int): Rect2i;
  /**
   * Returns an array of tiles coordinates ID that will be automatically removed when modifying one or several of those properties: `texture`, `margins`, `separation` or `texture_region_size`. This can be used to undo changes that would have caused tiles data loss.
   */
  get_tiles_to_be_removed_on_change(texture: Texture2D, margins: Vector2i, separation: Vector2i, texture_region_size: Vector2i): PackedVector2Array;
  /**
   * Returns whether there is enough room in an atlas to create/modify a tile with the given properties. If `ignored_tile` is provided, act as is the given tile was not present in the atlas. This may be used when you want to modify a tile's properties.
   */
  has_room_for_tile(atlas_coords: Vector2i, size: Vector2i, animation_columns: int, animation_separation: Vector2i, frames_count: int, ignored_tile?: Vector2i): boolean;
  /**
   * Checks if the source has any tiles that don't fit the texture area (either partially or completely).
   */
  has_tiles_outside_texture(): boolean;
  /**
   * Move the tile and its alternatives at the `atlas_coords` coordinates to the `new_atlas_coords` coordinates with the `new_size` size. This functions will fail if a tile is already present in the given area.
   * If `new_atlas_coords` is `Vector2i(-1, -1)`, keeps the tile's coordinates. If `new_size` is `Vector2i(-1, -1)`, keeps the tile's size.
   * To avoid an error, first check if a move is possible using {@link has_room_for_tile}.
   */
  move_tile_in_atlas(atlas_coords: Vector2i, new_atlas_coords?: Vector2i, new_size?: Vector2i): void;
  /**
   * Remove a tile's alternative with alternative ID `alternative_tile`.
   * Calling this function with `alternative_tile` equals to 0 will fail, as the base tile alternative cannot be removed.
   */
  remove_alternative_tile(atlas_coords: Vector2i, alternative_tile: int): void;
  /** Remove a tile and its alternative at coordinates `atlas_coords`. */
  remove_tile(atlas_coords: Vector2i): void;
  /**
   * Change a tile's alternative ID from `alternative_tile` to `new_id`.
   * Calling this function with `new_id` of 0 will fail, as the base tile alternative cannot be moved.
   */
  set_alternative_tile_id(atlas_coords: Vector2i, alternative_tile: int, new_id: int): void;
  /**
   * Sets the number of columns in the animation layout of the tile at coordinates `atlas_coords`. If set to 0, then the different frames of the animation are laid out as a single horizontal line in the atlas.
   */
  set_tile_animation_columns(atlas_coords: Vector2i, frame_columns: int): void;
  /**
   * Sets the animation frame `duration` of frame `frame_index` for the tile at coordinates `atlas_coords`.
   */
  set_tile_animation_frame_duration(atlas_coords: Vector2i, frame_index: int, duration: float): void;
  /** Sets how many animation frames the tile at coordinates `atlas_coords` has. */
  set_tile_animation_frames_count(atlas_coords: Vector2i, frames_count: int): void;
  /**
   * Sets the tile animation mode of the tile at `atlas_coords` to `mode`. See also {@link get_tile_animation_mode}.
   */
  set_tile_animation_mode(atlas_coords: Vector2i, mode: int): void;
  /**
   * Sets the margin (in grid tiles) between each tile in the animation layout of the tile at coordinates `atlas_coords` has.
   */
  set_tile_animation_separation(atlas_coords: Vector2i, separation: Vector2i): void;
  /** Sets the animation speed of the tile at coordinates `atlas_coords` has. */
  set_tile_animation_speed(atlas_coords: Vector2i, speed: float): void;

  // enum TileAnimationMode
  /** Tile animations start at same time, looking identical. */
  static readonly TILE_ANIMATION_MODE_DEFAULT: int;
  /** Tile animations start at random times, looking varied. */
  static readonly TILE_ANIMATION_MODE_RANDOM_START_TIMES: int;
  /** Represents the size of the {@link TileAnimationMode} enum. */
  static readonly TILE_ANIMATION_MODE_MAX: int;

  /**
   * Represents cell's horizontal flip flag. Should be used directly with {@link TileMapLayer} to flip placed tiles by altering their alternative IDs.
   * **Note:** These transformations can be combined to do the equivalent of 0, 90, 180, and 270 degree rotations, as shown below:
   */
  static readonly TRANSFORM_FLIP_H: int;
  /** Represents cell's vertical flip flag. See {@link TRANSFORM_FLIP_H} for usage. */
  static readonly TRANSFORM_FLIP_V: int;
  /** Represents cell's transposed flag. See {@link TRANSFORM_FLIP_H} for usage. */
  static readonly TRANSFORM_TRANSPOSE: int;
}
