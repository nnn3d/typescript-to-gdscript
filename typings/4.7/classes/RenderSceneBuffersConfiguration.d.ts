// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Configuration object used to setup a {@link RenderSceneBuffers} object. */
declare class RenderSceneBuffersConfiguration extends RefCounted {
  /** Level of the anisotropic filter. */
  anisotropic_filtering_level: int;
  /** FSR Sharpness applicable if FSR upscaling is used. */
  fsr_sharpness: float;
  /** The size of the 3D render buffer used for rendering. */
  internal_size: Vector2i;
  /** The MSAA mode we're using for 3D rendering. */
  msaa_3d: int;
  /** The render target associated with these buffer. */
  render_target: RID;
  /**
   * The requested scaling mode with which we upscale/downscale if {@link internal_size} and {@link target_size} are not equal.
   */
  scaling_3d_mode: int;
  /** The requested screen space AA applied in post processing. */
  screen_space_aa: int;
  /** The target (upscale) size if scaling is used. */
  target_size: Vector2i;
  /** Bias applied to mipmaps. */
  texture_mipmap_bias: float;
  /** The number of views we're rendering. */
  view_count: int;
  set_anisotropic_filtering_level(value: int): void;
  get_anisotropic_filtering_level(): int;
  set_fsr_sharpness(value: float): void;
  get_fsr_sharpness(): float;
  set_internal_size(value: Vector2i): void;
  get_internal_size(): Vector2i;
  set_msaa_3d(value: int): void;
  get_msaa_3d(): int;
  set_render_target(value: RID): void;
  get_render_target(): RID;
  set_scaling_3d_mode(value: int): void;
  get_scaling_3d_mode(): int;
  set_screen_space_aa(value: int): void;
  get_screen_space_aa(): int;
  set_target_size(value: Vector2i): void;
  get_target_size(): Vector2i;
  set_texture_mipmap_bias(value: float): void;
  get_texture_mipmap_bias(): float;
  set_view_count(value: int): void;
  get_view_count(): int;
}
