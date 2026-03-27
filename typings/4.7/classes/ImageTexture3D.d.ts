// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Texture with 3 dimensions. */
declare class ImageTexture3D extends Texture3D {
  /**
   * Creates the {@link ImageTexture3D} with specified `format`, `width`, `height`, and `depth`. If `use_mipmaps` is `true`, generates mipmaps for the {@link ImageTexture3D}.
   */
  create(format: int, width: int, height: int, depth: int, use_mipmaps: boolean, data: unknown): int;
  /**
   * Replaces the texture's existing data with the layers specified in `data`. The size of `data` must match the parameters that were used for {@link create}. In other words, the texture cannot be resized or have its format changed by calling {@link update}.
   */
  update(data: unknown): void;
}
