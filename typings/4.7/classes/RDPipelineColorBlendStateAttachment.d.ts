// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Pipeline color blend state attachment (used by {@link RenderingDevice}). */
declare class RDPipelineColorBlendStateAttachment extends RefCounted {
  /** The blend mode to use for the alpha channel. */
  alpha_blend_op: int;
  /** The blend mode to use for the red/green/blue color channels. */
  color_blend_op: int;
  /**
   * Controls how the blend factor for the alpha channel is determined based on the destination's fragments.
   */
  dst_alpha_blend_factor: int;
  /**
   * Controls how the blend factor for the color channels is determined based on the destination's fragments.
   */
  dst_color_blend_factor: int;
  /**
   * If `true`, performs blending between the source and destination according to the factors defined in {@link src_color_blend_factor}, {@link dst_color_blend_factor}, {@link src_alpha_blend_factor} and {@link dst_alpha_blend_factor}. The blend modes {@link color_blend_op} and {@link alpha_blend_op} are also taken into account, with {@link write_r}, {@link write_g}, {@link write_b} and {@link write_a} controlling the output.
   */
  enable_blend: boolean;
  /** Controls how the blend factor for the alpha channel is determined based on the source's fragments. */
  src_alpha_blend_factor: int;
  /** Controls how the blend factor for the color channels is determined based on the source's fragments. */
  src_color_blend_factor: int;
  /** If `true`, writes the new alpha channel to the final result. */
  write_a: boolean;
  /** If `true`, writes the new blue color channel to the final result. */
  write_b: boolean;
  /** If `true`, writes the new green color channel to the final result. */
  write_g: boolean;
  /** If `true`, writes the new red color channel to the final result. */
  write_r: boolean;

  /**
   * Convenience method to perform standard mix blending with straight (non-premultiplied) alpha. This sets {@link enable_blend} to `true`, {@link src_color_blend_factor} to {@link RenderingDevice.BLEND_FACTOR_SRC_ALPHA}, {@link dst_color_blend_factor} to {@link RenderingDevice.BLEND_FACTOR_ONE_MINUS_SRC_ALPHA}, {@link src_alpha_blend_factor} to {@link RenderingDevice.BLEND_FACTOR_SRC_ALPHA} and {@link dst_alpha_blend_factor} to {@link RenderingDevice.BLEND_FACTOR_ONE_MINUS_SRC_ALPHA}.
   */
  set_as_mix(): void;
}
