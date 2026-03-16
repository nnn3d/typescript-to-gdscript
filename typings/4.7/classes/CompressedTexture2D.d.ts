// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Texture with 2 dimensions, optionally compressed. */
declare class CompressedTexture2D extends Texture2D {
  /** The {@link CompressedTexture2D}'s file path to a `.ctex` file. */
  load_path: string;
  resource_local_to_scene: boolean;

  /** Loads the texture from the specified `path`. */
  load(path: string): int;
}
