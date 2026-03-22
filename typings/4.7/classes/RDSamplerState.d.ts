// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Sampler state (used by {@link RenderingDevice}). */
declare class RDSamplerState extends RefCounted {
  /**
   * Maximum anisotropy that can be used when sampling. Only effective if {@link use_anisotropy} is `true`. Higher values result in a sharper sampler at oblique angles, at the cost of performance (due to memory bandwidth). This value may be limited by the graphics hardware in use. Most graphics hardware only supports values up to `16.0`.
   * If {@link anisotropy_max} is `1.0`, forcibly disables anisotropy even if {@link use_anisotropy} is `true`.
   */
  anisotropy_max: float;
  /**
   * The border color that will be returned when sampling outside the sampler's bounds and the {@link repeat_u}, {@link repeat_v} or {@link repeat_w} modes have repeating disabled.
   */
  border_color: int;
  /** The compare operation to use. Only effective if {@link enable_compare} is `true`. */
  compare_op: int;
  /**
   * If `true`, returned values will be based on the comparison operation defined in {@link compare_op}. This is a hardware-based approach and is therefore faster than performing this manually in a shader. For example, compare operations are used for shadow map rendering by comparing depth values from a shadow sampler.
   */
  enable_compare: boolean;
  /**
   * The mipmap LOD bias to use. Positive values will make the sampler blurrier at a given distance, while negative values will make the sampler sharper at a given distance (at the risk of looking grainy). Recommended values are between `-0.5` and `0.0`. Only effective if the sampler has mipmaps available.
   */
  lod_bias: float;
  /**
   * The sampler's magnification filter. It is the filtering method used when sampling texels that appear bigger than on-screen pixels.
   */
  mag_filter: int;
  /**
   * The maximum mipmap LOD bias to display (lowest resolution). Only effective if the sampler has mipmaps available.
   */
  max_lod: float;
  /**
   * The sampler's minification filter. It is the filtering method used when sampling texels that appear smaller than on-screen pixels.
   */
  min_filter: int;
  /**
   * The minimum mipmap LOD bias to display (highest resolution). Only effective if the sampler has mipmaps available.
   */
  min_lod: float;
  /** The filtering method to use for mipmaps. */
  mip_filter: int;
  /**
   * The repeat mode to use along the U axis of UV coordinates. This affects the returned values if sampling outside the UV bounds.
   */
  repeat_u: int;
  /**
   * The repeat mode to use along the V axis of UV coordinates. This affects the returned values if sampling outside the UV bounds.
   */
  repeat_v: int;
  /**
   * The repeat mode to use along the W axis of UV coordinates. This affects the returned values if sampling outside the UV bounds. Only effective for 3D samplers.
   */
  repeat_w: int;
  /**
   * If `true`, the texture will be sampled with coordinates ranging from 0 to the texture's resolution. Otherwise, the coordinates will be normalized and range from 0 to 1.
   */
  unnormalized_uvw: boolean;
  /** If `true`, perform anisotropic sampling. See {@link anisotropy_max}. */
  use_anisotropy: boolean;
  set_anisotropy_max(value: float): void;
  get_anisotropy_max(): float;
  set_border_color(value: int): void;
  get_border_color(): int;
  set_compare_op(value: int): void;
  get_compare_op(): int;
  set_enable_compare(value: boolean): void;
  get_enable_compare(): boolean;
  set_lod_bias(value: float): void;
  get_lod_bias(): float;
  set_mag_filter(value: int): void;
  get_mag_filter(): int;
  set_max_lod(value: float): void;
  get_max_lod(): float;
  set_min_filter(value: int): void;
  get_min_filter(): int;
  set_min_lod(value: float): void;
  get_min_lod(): float;
  set_mip_filter(value: int): void;
  get_mip_filter(): int;
  set_repeat_u(value: int): void;
  get_repeat_u(): int;
  set_repeat_v(value: int): void;
  get_repeat_v(): int;
  set_repeat_w(value: int): void;
  get_repeat_w(): int;
  set_unnormalized_uvw(value: boolean): void;
  get_unnormalized_uvw(): boolean;
  set_use_anisotropy(value: boolean): void;
  get_use_anisotropy(): boolean;
}
