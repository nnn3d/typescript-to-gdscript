// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for texture arrays that can optionally be compressed. */
declare class CompressedTextureLayered extends TextureLayered {
  /** The path the texture should be loaded from. */
  load_path: string;
  get_load_path(): string;

  /** Loads the texture at `path`. */
  load(path: string | NodePath): int;
}
