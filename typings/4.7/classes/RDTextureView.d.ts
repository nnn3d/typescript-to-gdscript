// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

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
}
