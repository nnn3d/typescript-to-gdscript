// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides a base class for different kinds of light nodes. */
declare class Light3D extends VisualInstance3D {
  /**
   * The distance from the camera at which the light begins to fade away (in 3D units).
   * **Note:** Only effective for {@link OmniLight3D} and {@link SpotLight3D}.
   */
  distance_fade_begin: float;
  /**
   * If `true`, the light will smoothly fade away when far from the active {@link Camera3D} starting at {@link distance_fade_begin}. This acts as a form of level of detail (LOD). The light will fade out over {@link distance_fade_begin} + {@link distance_fade_length}, after which it will be culled and not sent to the shader at all. Use this to reduce the number of active lights in a scene and thus improve performance.
   * **Note:** Only effective for {@link OmniLight3D} and {@link SpotLight3D}.
   */
  distance_fade_enabled: boolean;
  /**
   * Distance over which the light and its shadow fades. The light's energy and shadow's opacity is progressively reduced over this distance and is completely invisible at the end.
   * **Note:** Only effective for {@link OmniLight3D} and {@link SpotLight3D}.
   */
  distance_fade_length: float;
  /**
   * The distance from the camera at which the light's shadow cuts off (in 3D units). Set this to a value lower than {@link distance_fade_begin} + {@link distance_fade_length} to further improve performance, as shadow rendering is often more expensive than light rendering itself.
   * **Note:** Only effective for {@link OmniLight3D} and {@link SpotLight3D}, and only when {@link shadow_enabled} is `true`.
   */
  distance_fade_shadow: float;
  /**
   * If `true`, the light only appears in the editor and will not be visible at runtime. If `true`, the light will never be baked in {@link LightmapGI} regardless of its {@link light_bake_mode}.
   */
  editor_only: boolean;
  /**
   * The light's angular size in degrees. Increasing this will make shadows softer at greater distances (also called percentage-closer soft shadows, or PCSS). Only available for {@link DirectionalLight3D}s. For reference, the Sun from the Earth is approximately `0.5`. Increasing this value above `0.0` for lights with shadows enabled will have a noticeable performance cost due to PCSS.
   * **Note:** {@link light_angular_distance} is not affected by {@link Node3D.scale} (the light's scale or its parent's scale).
   * **Note:** PCSS for directional lights is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   */
  light_angular_distance: float;
  /**
   * The light's bake mode. This will affect the global illumination techniques that have an effect on the light's rendering.
   * **Note:** Meshes' global illumination mode will also affect the global illumination rendering. See {@link GeometryInstance3D.gi_mode}.
   */
  light_bake_mode: int;
  /**
   * The light's color in nonlinear sRGB encoding. An *overbright* color can be used to achieve a result equivalent to increasing the light's {@link light_energy}.
   */
  light_color: Color;
  /**
   * The light will affect objects in the selected layers.
   * **Note:** The light cull mask is ignored by {@link VoxelGI}, SDFGI, {@link LightmapGI}, and volumetric fog. These will always render lights in a way that ignores the cull mask. See also {@link VisualInstance3D.layers}.
   */
  light_cull_mask: int;
  /**
   * The light's strength multiplier (this is not a physical unit). For {@link OmniLight3D} and {@link SpotLight3D}, changing this value will only change the light color's intensity, not the light's radius.
   */
  light_energy: float;
  /**
   * Secondary multiplier used with indirect light (light bounces). Used with {@link VoxelGI} and SDFGI (see {@link Environment.sdfgi_enabled}).
   * **Note:** This property is ignored if {@link light_energy} is equal to `0.0`, as the light won't be present at all in the GI shader.
   */
  light_indirect_energy: float;
  /**
   * Used by positional lights ({@link OmniLight3D} and {@link SpotLight3D}) when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is `true`. Sets the intensity of the light source measured in Lumens. Lumens are a measure of luminous flux, which is the total amount of visible light emitted by a light source per unit of time.
   * For {@link SpotLight3D}s, we assume that the area outside the visible cone is surrounded by a perfect light absorbing material. Accordingly, the apparent brightness of the cone area does not change as the cone increases and decreases in size.
   * A typical household lightbulb can range from around 600 lumens to 1,200 lumens, a candle is about 13 lumens, while a streetlight can be approximately 60,000 lumens.
   */
  light_intensity_lumens: float;
  /**
   * Used by {@link DirectionalLight3D}s when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is `true`. Sets the intensity of the light source measured in Lux. Lux is a measure of luminous flux per unit area, it is equal to one lumen per square meter. Lux is the measure of how much light hits a surface at a given time.
   * On a clear sunny day a surface in direct sunlight may be approximately 100,000 lux, a typical room in a home may be approximately 50 lux, while the moonlit ground may be approximately 0.1 lux.
   */
  light_intensity_lux: float;
  /** If `true`, the light's effect is reversed, darkening areas and casting bright shadows. */
  light_negative: boolean;
  /**
   * {@link Texture2D} projected by light. {@link shadow_enabled} must be on for the projector to work. Light projectors make the light appear as if it is shining through a colored but transparent object, almost like light shining through stained-glass.
   * **Note:** Unlike {@link BaseMaterial3D} whose filter mode can be adjusted on a per-material basis, the filter mode for light projector textures is set globally with {@link ProjectSettings.rendering/textures/light_projectors/filter}.
   * **Note:** Light projector textures are only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   */
  light_projector: Texture2D;
  /**
   * The size of the light in Godot units. Only available for {@link OmniLight3D}s and {@link SpotLight3D}s. Increasing this value will make the light fade out slower and shadows appear blurrier (also called percentage-closer soft shadows, or PCSS). This can be used to simulate area lights to an extent. Increasing this value above `0.0` for lights with shadows enabled will have a noticeable performance cost due to PCSS.
   * **Note:** {@link light_size} is not affected by {@link Node3D.scale} (the light's scale or its parent's scale).
   * **Note:** PCSS for positional lights is only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   */
  light_size: float;
  /**
   * The intensity of the specular blob in objects affected by the light. At `0`, the light becomes a pure diffuse light. When not baking emission, this can be used to avoid unrealistic reflections when placing lights above an emissive surface.
   */
  light_specular: float;
  /**
   * Sets the color temperature of the light source, measured in Kelvin. This is used to calculate a correlated color temperature which tints the {@link light_color}.
   * The sun on a cloudy day is approximately 6500 Kelvin, on a clear day it is between 5500 to 6000 Kelvin, and on a clear day at sunrise or sunset it ranges to around 1850 Kelvin.
   */
  light_temperature: float;
  /**
   * Secondary multiplier multiplied with {@link light_energy} then used with the {@link Environment}'s volumetric fog (if enabled). If set to `0.0`, computing volumetric fog will be skipped for this light, which can improve performance for large amounts of lights when volumetric fog is enabled.
   * **Note:** To prevent short-lived dynamic light effects from poorly interacting with volumetric fog, lights used in those effects should have {@link light_volumetric_fog_energy} set to `0.0` unless {@link Environment.volumetric_fog_temporal_reprojection_enabled} is disabled (or unless the reprojection amount is significantly lowered).
   */
  light_volumetric_fog_energy: float;
  /**
   * Used to adjust shadow appearance. Too small a value results in self-shadowing ("shadow acne"), while too large a value causes shadows to separate from casters ("peter-panning"). Adjust as needed.
   */
  shadow_bias: float;
  /**
   * Blurs the edges of the shadow. Can be used to hide pixel artifacts in low-resolution shadow maps. A high value can impact performance, make shadows appear grainy and can cause other unwanted artifacts. Try to keep as near default as possible.
   */
  shadow_blur: float;
  /** The light will only cast shadows using objects in the selected layers. */
  shadow_caster_mask: int;
  /**
   * If `true`, the light will cast real-time shadows. This has a significant performance cost. Only enable shadow rendering when it makes a noticeable difference in the scene's appearance, and consider using {@link distance_fade_enabled} to hide the light when far away from the {@link Camera3D}.
   */
  shadow_enabled: boolean;
  /**
   * Offsets the lookup into the shadow map by the object's normal. This can be used to reduce self-shadowing artifacts without using {@link shadow_bias}. In practice, this value should be tweaked along with {@link shadow_bias} to reduce artifacts as much as possible.
   */
  shadow_normal_bias: float;
  /**
   * The opacity to use when rendering the light's shadow map. Values lower than `1.0` make the light appear through shadows. This can be used to fake global illumination at a low performance cost.
   */
  shadow_opacity: float;
  /**
   * If `true`, reverses the backface culling of the mesh. This can be useful when you have a flat mesh that has a light behind it. If you need to cast a shadow on both sides of the mesh, set the mesh to use double-sided shadows with {@link GeometryInstance3D.SHADOW_CASTING_SETTING_DOUBLE_SIDED}.
   */
  shadow_reverse_cull_face: boolean;
  shadow_transmittance_bias: float;

  /**
   * Returns the {@link Color} of an idealized blackbody at the given {@link light_temperature}. This value is calculated internally based on the {@link light_temperature}. This {@link Color} is multiplied by {@link light_color} before being sent to the {@link RenderingServer}.
   */
  get_correlated_color(): Color;
  /** Returns the value of the specified {@link Light3D.Param} parameter. */
  get_param(param: int): float;
  /** Sets the value of the specified {@link Light3D.Param} parameter. */
  set_param(param: int, value: float): void;

  // enum Param
  /** Constant for accessing {@link light_energy}. */
  static readonly PARAM_ENERGY: int;
  /** Constant for accessing {@link light_indirect_energy}. */
  static readonly PARAM_INDIRECT_ENERGY: int;
  /** Constant for accessing {@link light_volumetric_fog_energy}. */
  static readonly PARAM_VOLUMETRIC_FOG_ENERGY: int;
  /** Constant for accessing {@link light_specular}. */
  static readonly PARAM_SPECULAR: int;
  /** Constant for accessing {@link OmniLight3D.omni_range} or {@link SpotLight3D.spot_range}. */
  static readonly PARAM_RANGE: int;
  /** Constant for accessing {@link light_size}. */
  static readonly PARAM_SIZE: int;
  /**
   * Constant for accessing {@link OmniLight3D.omni_attenuation} or {@link SpotLight3D.spot_attenuation}.
   */
  static readonly PARAM_ATTENUATION: int;
  /** Constant for accessing {@link SpotLight3D.spot_angle}. */
  static readonly PARAM_SPOT_ANGLE: int;
  /** Constant for accessing {@link SpotLight3D.spot_angle_attenuation}. */
  static readonly PARAM_SPOT_ATTENUATION: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_max_distance}. */
  static readonly PARAM_SHADOW_MAX_DISTANCE: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_split_1}. */
  static readonly PARAM_SHADOW_SPLIT_1_OFFSET: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_split_2}. */
  static readonly PARAM_SHADOW_SPLIT_2_OFFSET: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_split_3}. */
  static readonly PARAM_SHADOW_SPLIT_3_OFFSET: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_fade_start}. */
  static readonly PARAM_SHADOW_FADE_START: int;
  /** Constant for accessing {@link shadow_normal_bias}. */
  static readonly PARAM_SHADOW_NORMAL_BIAS: int;
  /** Constant for accessing {@link shadow_bias}. */
  static readonly PARAM_SHADOW_BIAS: int;
  /** Constant for accessing {@link DirectionalLight3D.directional_shadow_pancake_size}. */
  static readonly PARAM_SHADOW_PANCAKE_SIZE: int;
  /** Constant for accessing {@link shadow_opacity}. */
  static readonly PARAM_SHADOW_OPACITY: int;
  /** Constant for accessing {@link shadow_blur}. */
  static readonly PARAM_SHADOW_BLUR: int;
  /** Constant for accessing {@link shadow_transmittance_bias}. */
  static readonly PARAM_TRANSMITTANCE_BIAS: int;
  /**
   * Constant for accessing {@link light_intensity_lumens} and {@link light_intensity_lux}. Only used when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is `true`.
   */
  static readonly PARAM_INTENSITY: int;
  /** Represents the size of the {@link Param} enum. */
  static readonly PARAM_MAX: int;
  // enum BakeMode
  /**
   * Light is ignored when baking. This is the fastest mode, but the light will not be taken into account when baking global illumination. This mode should generally be used for dynamic lights that change quickly, as the effect of global illumination is less noticeable on those lights.
   * **Note:** Hiding a light does *not* affect baking {@link LightmapGI}. Hiding a light will still affect baking {@link VoxelGI} and SDFGI (see {@link Environment.sdfgi_enabled}).
   */
  static readonly BAKE_DISABLED: int;
  /**
   * Light is taken into account in static baking ({@link VoxelGI}, {@link LightmapGI}, SDFGI ({@link Environment.sdfgi_enabled})). The light can be moved around or modified, but its global illumination will not update in real-time. This is suitable for subtle changes (such as flickering torches), but generally not large changes such as toggling a light on and off.
   * **Note:** The light is not baked in {@link LightmapGI} if {@link editor_only} is `true`.
   */
  static readonly BAKE_STATIC: int;
  /**
   * Light is taken into account in dynamic baking ({@link VoxelGI} and SDFGI ({@link Environment.sdfgi_enabled}) only). The light can be moved around or modified with global illumination updating in real-time. The light's global illumination appearance will be slightly different compared to {@link BAKE_STATIC}. This has a greater performance cost compared to {@link BAKE_STATIC}. When using SDFGI, the update speed of dynamic lights is affected by {@link ProjectSettings.rendering/global_illumination/sdfgi/frames_to_update_lights}.
   */
  static readonly BAKE_DYNAMIC: int;
}
