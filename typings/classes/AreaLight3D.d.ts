// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An area light, such as a neon light tube or a screen. */
declare class AreaLight3D extends Light3D {
  /**
   * Controls the distance attenuation function for this area light.
   * A value of `0.0` will maintain a constant brightness through most of the range, but will smoothly attenuate the light at the edge of the range. Use a value of `2.0` for physically accurate lights as it results in the proper inverse square attenuation.
   * **Note:** Setting attenuation to `2.0` or higher may result in distant objects receiving minimal light, even when within range. For example, with a range of `4096`, an object at `100` units is attenuated by a factor of `0.0001`. With a default brightness of `1`, the light would not be visible at that distance.
   * **Note:** Using negative values or values higher than `10.0` may lead to unexpected results.
   */
  area_attenuation: float;
  /**
   * Defines whether the energy is normalized (divided) by the surface area of the light. If set to `true`, changing the size does not affect the total energy output, and does not dramatically alter the brightness of the scene.
   */
  area_normalize_energy: boolean;
  /**
   * The range of the area in meters. This determines the maximum distance from any point on the area at which the area can still emit light.
   */
  area_range: float;
  /** The extents (width and height) of the area in meters. */
  area_size: Vector2;
  /**
   * An optional texture to use as a light source. Changing the texture at runtime might impact performance, as it needs to be drawn to the area light atlas with filtered mipmaps.
   * If no texture is assigned, the area light emits uniform light across its surface.
   * **Note:** Area light textures are only supported in the Forward+ and Mobile rendering methods, not Compatibility. To reduce the performance impact of switching textures at runtime, make sure each dimension of an area texture is either a multiple of 128 pixels, or a power of two. This removes the need for a scaling pass, which slows down texture changes. The textures don't necessarily have to be square to be optimal. Examples of optimal texture sizes include 32x64, 128x128, and 256x384.
   */
  area_texture: Texture2D | null;
  light_size: float;
  shadow_normal_bias: float;
  set_area_normalize_energy(value: boolean): void;
  is_area_normalizing_energy(): boolean;
  set_area_size(value: Vector2 | Vector2i): void;
  get_area_size(): Vector2;
  set_area_texture(value: Texture2D | null): void;
  get_area_texture(): Texture2D | null;
}
