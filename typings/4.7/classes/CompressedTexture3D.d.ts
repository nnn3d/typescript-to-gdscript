// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Texture with 3 dimensions, optionally compressed. */
declare class CompressedTexture3D extends Texture3D {
  /** The {@link CompressedTexture3D}'s file path to a `.ctex3d` file. */
  load_path: string;
  get_load_path(): string;

  /** Loads the texture from the specified `path`. */
  load(path: string): int;
}
