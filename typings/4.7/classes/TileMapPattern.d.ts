// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Holds a pattern to be copied from or pasted into {@link TileMap}s. */
declare class TileMapPattern extends Resource {
  /** Returns the tile alternative ID of the cell at `coords`. */
  get_cell_alternative_tile(coords: Vector2i): int;
  /** Returns the tile atlas coordinates ID of the cell at `coords`. */
  get_cell_atlas_coords(coords: Vector2i): Vector2i;
  /** Returns the tile source ID of the cell at `coords`. */
  get_cell_source_id(coords: Vector2i): int;
  /** Returns the size, in cells, of the pattern. */
  get_size(): Vector2i;
  /** Returns the list of used cell coordinates in the pattern. */
  get_used_cells(): unknown;
  /** Returns whether the pattern has a tile at the given coordinates. */
  has_cell(coords: Vector2i): boolean;
  /** Returns whether the pattern is empty or not. */
  is_empty(): boolean;
  /** Remove the cell at the given coordinates. */
  remove_cell(coords: Vector2i, update_size: boolean): void;
  /** Sets the tile identifiers for the cell at coordinates `coords`. See {@link TileMap.set_cell}. */
  set_cell(coords: Vector2i, source_id?: int, atlas_coords?: Vector2i, alternative_tile?: int): void;
  /** Sets the size of the pattern. */
  set_size(size: Vector2i): void;
}
