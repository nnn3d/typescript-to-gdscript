// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A material that controls how volumetric fog is rendered, to be assigned to a {@link FogVolume}. */
declare class FogMaterial extends Material {
  /**
   * The single-scattering {@link Color} of the {@link FogVolume}. Internally, {@link albedo} is converted into single-scattering, which is additively blended with other {@link FogVolume}s and the {@link Environment.volumetric_fog_albedo}.
   */
  albedo: Color;
  /**
   * The density of the {@link FogVolume}. Denser objects are more opaque, but may suffer from under-sampling artifacts that look like stripes. Negative values can be used to subtract fog from other {@link FogVolume}s or global volumetric fog.
   * **Note:** Due to limited precision, {@link density} values between `-0.001` and `0.001` (exclusive) act like `0.0`. This does not apply to {@link Environment.volumetric_fog_density}.
   */
  density: float;
  /**
   * The 3D texture that is used to scale the {@link density} of the {@link FogVolume}. This can be used to vary fog density within the {@link FogVolume} with any kind of static pattern. For animated effects, consider using a custom fog shader ($DOCS_URL/tutorials/shaders/shader_reference/fog_shader.html).
   */
  density_texture: Texture3D;
  /**
   * The hardness of the edges of the {@link FogVolume}. A higher value will result in softer edges, while a lower value will result in harder edges.
   */
  edge_fade: float;
  /**
   * The {@link Color} of the light emitted by the {@link FogVolume}. Emitted light will not cast light or shadows on other objects, but can be useful for modulating the {@link Color} of the {@link FogVolume} independently from light sources.
   */
  emission: Color;
  /**
   * The rate by which the height-based fog decreases in density as height increases in world space. A high falloff will result in a sharp transition, while a low falloff will result in a smoother transition. A value of `0.0` results in uniform-density fog. The height threshold is determined by the height of the associated {@link FogVolume}.
   */
  height_falloff: float;
  set_albedo(value: Color): void;
  get_albedo(): Color;
  set_density(value: float): void;
  get_density(): float;
  set_density_texture(value: Texture3D): void;
  get_density_texture(): Texture3D;
  set_edge_fade(value: float): void;
  get_edge_fade(): float;
  set_emission(value: Color): void;
  get_emission(): Color;
  set_height_falloff(value: float): void;
  get_height_falloff(): float;
}
