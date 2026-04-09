// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Omnidirectional light, such as a light bulb or a candle. */
declare class OmniLight3D extends Light3D {
  /**
   * <member name="omni_attenuation" type="float" setter="set_param" getter="get_param" default="1.0">
   * Controls the distance attenuation function for omnilights.
   * A value of `0.0` will maintain a constant brightness through most of the range, but smoothly attenuate the light at the edge of the range. Use a value of `2.0` for physically accurate lights as it results in the proper inverse square attenutation.
   * **Note:** Setting attenuation to `2.0` or higher may result in distant objects receiving minimal light, even within range. For example, with a range of `4096`, an object at `100` units is attenuated by a factor of `0.0001`. With a default brightness of `1`, the light would not be visible at that distance.
   * **Note:** Using negative or values higher than `10.0` may lead to unexpected results.
   */
  light_specular: float;
  /**
   * The light's radius. Note that the effectively lit area may appear to be smaller depending on the {@link omni_attenuation} in use. No matter the {@link omni_attenuation} in use, the light will never reach anything outside this radius.
   * **Note:** {@link omni_range} is not affected by {@link Node3D.scale} (the light's scale or its parent's scale).
   */
  omni_range: float;
  omni_shadow_mode: int;
  shadow_normal_bias: float;
  set_shadow_mode(value: int): void;
  get_shadow_mode(): int;

  // enum ShadowMode
  /**
   * Shadows are rendered to a dual-paraboloid texture. Faster than {@link SHADOW_CUBE}, but lower-quality.
   */
  static readonly SHADOW_DUAL_PARABOLOID: int;
  /** Shadows are rendered to a cubemap. Slower than {@link SHADOW_DUAL_PARABOLOID}, but higher-quality. */
  static readonly SHADOW_CUBE: int;
}
