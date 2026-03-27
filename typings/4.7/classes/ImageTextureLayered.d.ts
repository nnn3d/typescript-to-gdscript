// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Base class for texture types which contain the data of multiple {@link ImageTexture}s. Each image is of the same size and format.
 */
declare class ImageTextureLayered extends TextureLayered {
  /**
   * Creates an {@link ImageTextureLayered} from an array of {@link Image}s. See {@link Image.create} for the expected data format. The first image decides the width, height, image format and mipmapping setting. The other images *must* have the same width, height, image format and mipmapping setting.
   * Each {@link Image} represents one `layer`.
   */
  create_from_images(images: unknown): int;
  /**
   * Replaces the existing {@link Image} data at the given `layer` with this new image.
   * The given {@link Image} must have the same width, height, image format, and mipmapping flag as the rest of the referenced images.
   * If the image format is unsupported, it will be decompressed and converted to a similar and supported {@link Image.Format}.
   * The update is immediate: it's synchronized with drawing.
   */
  update_layer(image: Image, layer: int): void;
}
