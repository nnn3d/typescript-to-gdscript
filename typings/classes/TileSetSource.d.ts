// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Exposes a set of tiles for a {@link TileSet} resource. */
declare class TileSetSource extends Resource {
  /** Returns the alternative ID for the tile with coordinates ID `atlas_coords` at index `index`. */
  get_alternative_tile_id(atlas_coords: Vector2i, index: int): int;
  /**
   * Returns the number of alternatives tiles for the coordinates ID `atlas_coords`.
   * For {@link TileSetAtlasSource}, this always return at least 1, as the base tile with ID 0 is always part of the alternatives list.
   * Returns -1 if there is not tile at the given coords.
   */
  get_alternative_tiles_count(atlas_coords: Vector2i): int;
  /** Returns the tile coordinates ID of the tile with index `index`. */
  get_tile_id(index: int): Vector2i;
  /** Returns how many tiles this atlas source defines (not including alternative tiles). */
  get_tiles_count(): int;
  /**
   * Returns if the base tile at coordinates `atlas_coords` has an alternative with ID `alternative_tile`.
   */
  has_alternative_tile(atlas_coords: Vector2i, alternative_tile: int): boolean;
  /** Returns if this atlas has a tile with coordinates ID `atlas_coords`. */
  has_tile(atlas_coords: Vector2i): boolean;
}
