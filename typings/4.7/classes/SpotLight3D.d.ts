// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A spotlight, such as a reflector spotlight or a lantern. */
declare class SpotLight3D<Tree extends object = any> extends Light3D<Tree> {
  /**
   * <member name="shadow_bias" type="float" setter="set_param" getter="get_param" overrides="Light3D" default="0.03" />
   * <member name="shadow_normal_bias" type="float" setter="set_param" getter="get_param" overrides="Light3D" default="1.0" />
   * <member name="spot_angle" type="float" setter="set_param" getter="get_param" default="45.0">
   * The spotlight's angle in degrees. This is the angular radius, meaning the angle from the -Z axis, the cone's center, to the edge of the cone. The default angular radius of 45 degrees corresponds to a cone with an angular diameter of 90 degrees.
   * **Note:** {@link spot_angle} is not affected by {@link Node3D.scale} (the light's scale or its parent's scale).
   */
  light_specular: float;
  /** The spotlight's *angular* attenuation curve. See also {@link spot_attenuation}. */
  spot_angle_attenuation: float;
  /**
   * Controls the distance attenuation function for spotlights.
   * A value of `0.0` will maintain a constant brightness through most of the range, but smoothly attenuate the light at the edge of the range. Use a value of `2.0` for physically accurate lights as it results in the proper inverse square attenutation.
   * **Note:** Setting attenuation to `2.0` or higher may result in distant objects receiving minimal light, even within range. For example, with a range of `4096`, an object at `100` units is attenuated by a factor of `0.0001`. With a default brightness of `1`, the light would not be visible at that distance.
   * **Note:** Using negative or values higher than `10.0` may lead to unexpected results.
   */
  spot_attenuation: float;
  /**
   * The maximal range that can be reached by the spotlight. Note that the effectively lit area may appear to be smaller depending on the {@link spot_attenuation} in use. No matter the {@link spot_attenuation} in use, the light will never reach anything outside this range.
   * **Note:** {@link spot_range} is not affected by {@link Node3D.scale} (the light's scale or its parent's scale).
   */
  spot_range: float;
}
