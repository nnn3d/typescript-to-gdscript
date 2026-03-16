// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Texture format (used by {@link RenderingDevice}). */
declare class RDTextureFormat extends RefCounted {
  /** The number of layers in the texture. Only relevant for 2D texture arrays. */
  array_layers: int;
  /** The texture's depth (in pixels). This is always `1` for 2D textures. */
  depth: int;
  /** The texture's pixel data format. */
  format: int;
  /** The texture's height (in pixels). */
  height: int;
  /**
   * If a texture is discardable, its contents do not need to be preserved between frames. This flag is only relevant when the texture is used as target in a draw list.
   * This information is used by {@link RenderingDevice} to figure out if a texture's contents can be discarded, eliminating unnecessary writes to memory and boosting performance.
   */
  is_discardable: boolean;
  /** The texture will be used as the destination of a resolve operation. */
  is_resolve_buffer: boolean;
  /** The number of mipmaps available in the texture. */
  mipmaps: int;
  /** The number of samples used when sampling the texture. */
  samples: int;
  /** The texture type. */
  texture_type: int;
  /** The texture's usage bits, which determine what can be done using the texture. */
  usage_bits: int;
  /** The texture's width (in pixels). */
  width: int;

  /**
   * Adds `format` as a valid format for the corresponding {@link RDTextureView}'s {@link RDTextureView.format_override} property. If any format is added as shareable, then the main {@link format} must also be added.
   */
  add_shareable_format(format: int): void;
  /**
   * Removes `format` from the list of valid formats that the corresponding {@link RDTextureView}'s {@link RDTextureView.format_override} property can be set to.
   */
  remove_shareable_format(format: int): void;
}
