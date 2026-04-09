// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Texture view (used by {@link RenderingDevice}). */
declare class RDTextureView extends RefCounted {
  /**
   * Optional override for the data format to return sampled values in. The corresponding {@link RDTextureFormat} must have had this added as a shareable format. The default value of {@link RenderingDevice.DATA_FORMAT_MAX} does not override the format.
   */
  format_override: int;
  /** The channel to sample when sampling the alpha channel. */
  swizzle_a: int;
  /** The channel to sample when sampling the blue color channel. */
  swizzle_b: int;
  /** The channel to sample when sampling the green color channel. */
  swizzle_g: int;
  /** The channel to sample when sampling the red color channel. */
  swizzle_r: int;
  set_format_override(value: int): void;
  get_format_override(): int;
  set_swizzle_a(value: int): void;
  get_swizzle_a(): int;
  set_swizzle_b(value: int): void;
  get_swizzle_b(): int;
  set_swizzle_g(value: int): void;
  get_swizzle_g(): int;
  set_swizzle_r(value: int): void;
  get_swizzle_r(): int;
}
