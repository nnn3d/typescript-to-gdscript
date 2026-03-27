// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides a compressed texture for disk and/or VRAM in a way that is portable. */
declare class PortableCompressedTexture2D extends Texture2D {
  /**
   * If `true`, when running in the editor, this texture will keep the source-compressed data in memory, allowing the data to persist after loading. Otherwise, the source-compressed data is lost after loading and the texture can't be re-saved.
   * **Note:** This property must be set before {@link create_from_image} for this to work.
   */
  keep_compressed_buffer: boolean;
  /**
   * <member name="size_override" type="Vector2" setter="set_size_override" getter="get_size_override" default="Vector2(0, 0)">
   * Allows overriding the texture's size (for 2D only).
   */
  resource_local_to_scene: boolean;
  set_keep_compressed_buffer(value: boolean): void;
  is_keeping_compressed_buffer(): boolean;

  /**
   * Initializes the compressed texture from a base image. The compression mode must be provided.
   * `normal_map` is recommended to ensure optimum quality if this image will be used as a normal map.
   * If lossy compression is requested, the quality setting can optionally be provided. This maps to Lossy WebP compression quality.
   */
  create_from_image(image: Image, compression_mode: int, normal_map?: boolean, lossy_quality?: float): void;
  /** Return the compression mode used (valid after initialized). */
  get_compression_mode(): int;
  /** Returns `true` if the flag is overridden for all textures of this type. */
  static is_keeping_all_compressed_buffers(): boolean;
  /**
   * Sets the compressor parameters for Basis Universal compression. See also the settings in {@link ResourceImporterTexture}.
   * **Note:** This method must be called before {@link create_from_image} for this to work.
   */
  set_basisu_compressor_params(uastc_level: int, rdo_quality_loss: float): void;
  /**
   * If `keep` is `true`, overrides the flag globally for all textures of this type. This is used primarily by the editor.
   */
  static set_keep_all_compressed_buffers(keep: boolean): void;

  // enum CompressionMode
  static readonly COMPRESSION_MODE_LOSSLESS: int;
  static readonly COMPRESSION_MODE_LOSSY: int;
  static readonly COMPRESSION_MODE_BASIS_UNIVERSAL: int;
  static readonly COMPRESSION_MODE_S3TC: int;
  static readonly COMPRESSION_MODE_ETC2: int;
  static readonly COMPRESSION_MODE_BPTC: int;
  static readonly COMPRESSION_MODE_ASTC: int;
}
