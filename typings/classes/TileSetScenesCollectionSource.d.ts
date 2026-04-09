// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Exposes a set of scenes as tiles for a {@link TileSet} resource. */
declare class TileSetScenesCollectionSource extends TileSetSource {
  /**
   * Creates a scene-based tile out of the given scene.
   * Returns a newly generated unique ID.
   */
  create_scene_tile(packed_scene: PackedScene, id_override?: int): int;
  /** Returns the scene ID a following call to {@link create_scene_tile} would return. */
  get_next_scene_tile_id(): int;
  /** Returns whether the scene tile with `id` displays a placeholder in the editor. */
  get_scene_tile_display_placeholder(id: int): boolean;
  /** Returns the scene tile ID of the scene tile at `index`. */
  get_scene_tile_id(index: int): int;
  /** Returns the {@link PackedScene} resource of scene tile with `id`. */
  get_scene_tile_scene(id: int): PackedScene | null;
  /** Returns the number or scene tiles this TileSet source has. */
  get_scene_tiles_count(): int;
  /** Returns whether this TileSet source has a scene tile with `id`. */
  has_scene_tile_id(id: int): boolean;
  /** Remove the scene tile with `id`. */
  remove_scene_tile(id: int): void;
  /**
   * Sets whether or not the scene tile with `id` should display a placeholder in the editor. This might be useful for scenes that are not visible.
   */
  set_scene_tile_display_placeholder(id: int, display_placeholder: boolean): void;
  /**
   * Changes a scene tile's ID from `id` to `new_id`. This will fail if there is already a tile with an ID equal to `new_id`.
   */
  set_scene_tile_id(id: int, new_id: int): void;
  /**
   * Assigns a {@link PackedScene} resource to the scene tile with `id`. This will fail if the scene does not extend {@link CanvasItem}, as positioning properties are needed to place the scene on the {@link TileMapLayer}.
   */
  set_scene_tile_scene(id: int, packed_scene: PackedScene): void;
}
