// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Base class for texture types which contain the data of multiple {@link Image}s. Each image is of the same size and format.
 */
declare class TextureLayered extends Texture {
  /** Called when the {@link TextureLayered}'s format is queried. */
  _get_format(): int;
  /** Called when the {@link TextureLayered}'s height is queried. */
  _get_height(): int;
  /** Called when the data for a layer in the {@link TextureLayered} is queried. */
  _get_layer_data(layer_index: int): Image;
  /** Called when the layers' type in the {@link TextureLayered} is queried. */
  _get_layered_type(): int;
  /** Called when the number of layers in the {@link TextureLayered} is queried. */
  _get_layers(): int;
  /** Called when the {@link TextureLayered}'s width queried. */
  _get_width(): int;
  /** Called when the presence of mipmaps in the {@link TextureLayered} is queried. */
  _has_mipmaps(): boolean;
  /** Returns the current format being used by this texture. */
  get_format(): int;
  /** Returns the height of the texture in pixels. Height is typically represented by the Y axis. */
  get_height(): int;
  /** Returns an {@link Image} resource with the data from specified `layer`. */
  get_layer_data(layer: int): Image;
  /**
   * Returns the {@link TextureLayered}'s type. The type determines how the data is accessed, with cubemaps having special types.
   */
  get_layered_type(): int;
  /** Returns the number of referenced {@link Image}s. */
  get_layers(): int;
  /** Returns the width of the texture in pixels. Width is typically represented by the X axis. */
  get_width(): int;
  /** Returns `true` if the layers have generated mipmaps. */
  has_mipmaps(): boolean;

  // enum LayeredType
  /** Texture is a generic {@link Texture2DArray}. */
  static readonly LAYERED_TYPE_2D_ARRAY: int;
  /** Texture is a {@link Cubemap}, with each side in its own layer (6 in total). */
  static readonly LAYERED_TYPE_CUBEMAP: int;
  /** Texture is a {@link CubemapArray}, with each cubemap being made of 6 layers. */
  static readonly LAYERED_TYPE_CUBEMAP_ARRAY: int;
}
