// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Resource for environment nodes (like {@link WorldEnvironment}) that define multiple rendering options.
 */
declare class Environment extends Resource {
  /**
   * Applies a simple brightness adjustment to the rendered image after tonemaping. To adjust scene brightness use {@link tonemap_exposure} instead, which is applied before tonemapping and thus less prone to issues with bright colors. Effective only if {@link adjustment_enabled} is `true`.
   */
  adjustment_brightness: float;
  /**
   * The {@link Texture2D} or {@link Texture3D} lookup table (LUT) to use for the built-in post-process color grading. Can use a {@link GradientTexture1D} for a 1-dimensional LUT, or a {@link Texture3D} for a more complex LUT. Effective only if {@link adjustment_enabled} is `true`.
   * **Note:** Color correction does not currently support HDR output due to only supporting values in the SDR (0.0 to 1.0) range.
   */
  adjustment_color_correction: Texture;
  /**
   * Increasing {@link adjustment_contrast} will make dark values darker and bright values brighter. This simple adjustment is applied to the rendered image after tonemaping. When set to a value greater than `1.0`, {@link adjustment_contrast} is prone to clipping colors that become too bright or too dark. Effective only if {@link adjustment_enabled} is `true`.
   */
  adjustment_contrast: float;
  /**
   * If `true`, enables the `adjustment_*` properties provided by this resource. If `false`, modifications to the `adjustment_*` properties will have no effect on the rendered scene.
   */
  adjustment_enabled: boolean;
  /**
   * Applies a simple saturation adjustment to the rendered image after tonemaping. When {@link adjustment_saturation} is set to `0.0`, the rendered image will be fully converted to a grayscale image. Effective only if {@link adjustment_enabled} is `true`.
   */
  adjustment_saturation: float;
  /**
   * The ambient light's {@link Color}. Only effective if {@link ambient_light_sky_contribution} is lower than `1.0` (exclusive).
   */
  ambient_light_color: Color;
  /**
   * The ambient light's energy. The higher the value, the stronger the light. Only effective if {@link ambient_light_sky_contribution} is lower than `1.0` (exclusive).
   */
  ambient_light_energy: float;
  /**
   * Defines the amount of light that the sky brings on the scene. A value of `0.0` means that the sky's light emission has no effect on the scene illumination, thus all ambient illumination is provided by the ambient light. On the contrary, a value of `1.0` means that *all* the light that affects the scene is provided by the sky, thus the ambient light parameter has no effect on the scene.
   * **Note:** {@link ambient_light_sky_contribution} is internally clamped between `0.0` and `1.0` (inclusive).
   */
  ambient_light_sky_contribution: float;
  /** The ambient light source to use for rendering materials and global illumination. */
  ambient_light_source: int;
  /** The ID of the camera feed to show in the background. */
  background_camera_feed_id: int;
  /** The maximum layer ID to display. Only effective when using the {@link BG_CANVAS} background mode. */
  background_canvas_max_layer: int;
  /**
   * The {@link Color} displayed for clear areas of the scene. Only effective when using the {@link BG_COLOR} background mode.
   */
  background_color: Color;
  /**
   * Multiplier for background energy. Increase to make background brighter, decrease to make background dimmer.
   */
  background_energy_multiplier: float;
  /**
   * Luminance of background measured in nits (candela per square meter). Only used when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is enabled. The default value is roughly equivalent to the sky at midday.
   */
  background_intensity: float;
  /** The background mode. */
  background_mode: int;
  /**
   * If set above `0.0` (exclusive), blends between the fog's color and the color of the background {@link Sky}, as read from the radiance cubemap. This has a small performance cost when set above `0.0`. Must have {@link background_mode} set to {@link BG_SKY}.
   * This is useful to simulate aerial perspective (https://en.wikipedia.org/wiki/Aerial_perspective) in large scenes with low density fog. However, it is not very useful for high-density fog, as the sky will shine through. When set to `1.0`, the fog color comes completely from the {@link Sky}. If set to `0.0`, aerial perspective is disabled.
   * Notice that this does not sample the {@link Sky} directly, but rather the radiance cubemap. The cubemap is sampled at a mipmap level depending on the depth of the rendered pixel; the farther away, the higher the resolution of the sampled mipmap. This results in the actual color being a blurred version of the sky, with more blur closer to the camera. The highest mipmap resolution is used at a depth of {@link Camera3D.far}.
   */
  fog_aerial_perspective: float;
  /**
   * The fog density to be used. This is demonstrated in different ways depending on the {@link fog_mode} mode chosen:
   * **Exponential Fog Mode:** Higher values result in denser fog. The fog rendering is exponential like in real life.
   * **Depth Fog mode:** The maximum intensity of the deep fog, effect will appear in the distance (relative to the camera). At `1.0` the fog will fully obscure the scene, at `0.0` the fog will not be visible.
   */
  fog_density: float;
  /**
   * The fog's depth starting distance from the camera. Only available when {@link fog_mode} is set to {@link FOG_MODE_DEPTH}.
   */
  fog_depth_begin: float;
  /**
   * The fog depth's intensity curve. A number of presets are available in the Inspector by right-clicking the curve. Only available when {@link fog_mode} is set to {@link FOG_MODE_DEPTH}.
   */
  fog_depth_curve: float;
  /**
   * The fog's depth end distance from the camera. If this value is set to `0`, it will be equal to the current camera's {@link Camera3D.far} value. Only available when {@link fog_mode} is set to {@link FOG_MODE_DEPTH}.
   */
  fog_depth_end: float;
  /** If `true`, fog effects are enabled. */
  fog_enabled: boolean;
  /** The height at which the height fog effect begins. */
  fog_height: float;
  /**
   * The density used to increase fog as height decreases. To make fog increase as height increases, use a negative value.
   */
  fog_height_density: float;
  /** The fog's color. */
  fog_light_color: Color;
  /** The fog's brightness. Higher values result in brighter fog. */
  fog_light_energy: float;
  /** The fog mode. */
  fog_mode: int;
  /**
   * The factor to use when affecting the sky with non-volumetric fog. `1.0` means that fog can fully obscure the sky. Lower values reduce the impact of fog on sky rendering, with `0.0` not affecting sky rendering at all.
   * **Note:** {@link fog_sky_affect} has no visual effect if {@link fog_aerial_perspective} is `1.0`.
   */
  fog_sky_affect: float;
  /**
   * If set above `0.0`, renders the scene's directional light(s) in the fog color depending on the view angle. This can be used to give the impression that the sun is "piercing" through the fog.
   */
  fog_sun_scatter: float;
  /**
   * The glow blending mode.
   * **Note:** The Compatibility renderer always uses {@link GLOW_BLEND_MODE_SCREEN} and {@link glow_blend_mode} will have no effect.
   */
  glow_blend_mode: int;
  /**
   * The bloom's intensity. If set to a value higher than `0`, this will make glow visible in areas darker than the {@link glow_hdr_threshold}.
   */
  glow_bloom: float;
  /**
   * If `true`, the glow effect is enabled. This simulates real world atmosphere and eye/camera behavior by causing bright pixels to bleed onto surrounding pixels.
   * **Note:** When using the Mobile rendering method, glow looks different due to the lower dynamic range available in the Mobile rendering method.
   * **Note:** When using the Compatibility rendering method, glow uses a different implementation with some properties being unavailable and hidden from the inspector: `glow_levels/*`, {@link glow_normalized}, {@link glow_strength}, {@link glow_blend_mode}, {@link glow_mix}, {@link glow_map}, and {@link glow_map_strength}. This implementation is optimized to run on low-end devices and is less flexible as a result.
   */
  glow_enabled: boolean;
  /**
   * The higher threshold of the HDR glow. Areas brighter than this threshold will be clamped for the purposes of the glow effect.
   */
  glow_hdr_luminance_cap: float;
  /**
   * Smooths the transition between values that are below and above {@link glow_hdr_threshold} by reducing the amount of glow generated by values that are close to {@link glow_hdr_threshold}. Values above `glow_hdr_threshold + glow_hdr_scale` will not have glow reduced in this way.
   */
  glow_hdr_scale: float;
  /**
   * The lower threshold of the HDR glow. When using the Mobile rendering method (which only supports a lower dynamic range up to `2.0`), this may need to be below `1.0` for glow to be visible. A value of `0.9` works well in this case. This value also needs to be decreased below `1.0` when using glow in 2D, as 2D rendering is performed in SDR.
   */
  glow_hdr_threshold: float;
  /**
   * The overall brightness multiplier that is applied to the glow effect just before it is blended with the scene. When using the Mobile rendering method (which only supports a lower dynamic range up to `2.0`), this should be increased to `1.5` to compensate.
   */
  glow_intensity: float;
  /**
   * The intensity of the 1st level of glow. This is the most "local" level (least blurry).
   * **Note:** {@link glow_levels/1} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/1': float;
  /**
   * The intensity of the 2nd level of glow.
   * **Note:** {@link glow_levels/2} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/2': float;
  /**
   * The intensity of the 3rd level of glow.
   * **Note:** {@link glow_levels/3} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/3': float;
  /**
   * The intensity of the 4th level of glow.
   * **Note:** {@link glow_levels/4} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/4': float;
  /**
   * The intensity of the 5th level of glow.
   * **Note:** {@link glow_levels/5} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/5': float;
  /**
   * The intensity of the 6th level of glow.
   * **Note:** {@link glow_levels/6} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/6': float;
  /**
   * The intensity of the 7th level of glow. This is the most "global" level (blurriest).
   * **Note:** {@link glow_levels/7} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  'glow_levels/7': float;
  /**
   * The texture that should be used as a glow map to *multiply* the resulting glow color according to {@link glow_map_strength}. This can be used to create a "lens dirt" effect. The texture's RGB color channels are used for modulation, but the alpha channel is ignored.
   * **Note:** The texture will be stretched to fit the screen. Therefore, it's recommended to use a texture with an aspect ratio that matches your project's base aspect ratio (typically 16:9).
   * **Note:** {@link glow_map} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  glow_map: Texture;
  /**
   * How strong of an influence the {@link glow_map} should have on the overall glow effect. A strength of `0.0` means the glow map has no influence, while a strength of `1.0` means the glow map has full influence.
   * **Note:** If the glow map has black areas, a value of `1.0` can also turn off the glow effect entirely in specific areas of the screen.
   * **Note:** {@link glow_map_strength} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  glow_map_strength: float;
  /**
   * When using the {@link GLOW_BLEND_MODE_MIX} {@link glow_blend_mode}, this controls how much the source image is blended with the glow layer. A value of `0.0` makes the glow rendering invisible, while a value of `1.0` is equivalent to {@link GLOW_BLEND_MODE_REPLACE}.
   * **Note:** {@link glow_mix} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  glow_mix: float;
  /**
   * If `true`, glow levels will be normalized so that summed together their intensities equal `1.0`.
   * **Note:** {@link glow_normalized} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  glow_normalized: boolean;
  /**
   * The strength that is used when blurring across the screen to generate the glow effect. This affects the distance and intensity of the blur. When using the Mobile rendering method, this should be increased to compensate for the lower dynamic range.
   * **Note:** {@link glow_strength} has no effect when using the Compatibility rendering method, due to this rendering method using a simpler glow implementation optimized for low-end devices.
   */
  glow_strength: float;
  /** The reflected (specular) light source. */
  reflected_light_source: int;
  /**
   * The energy multiplier applied to light every time it bounces from a surface when using SDFGI. Values greater than `0.0` will simulate multiple bounces, resulting in a more realistic appearance. Increasing {@link sdfgi_bounce_feedback} generally has no performance impact. See also {@link sdfgi_energy}.
   * **Note:** Values greater than `0.5` can cause infinite feedback loops and should be avoided in scenes with bright materials.
   * **Note:** If {@link sdfgi_bounce_feedback} is `0.0`, indirect lighting will not be represented in reflections as light will only bounce one time.
   */
  sdfgi_bounce_feedback: float;
  /**
   * **Note:** This property is linked to {@link sdfgi_min_cell_size} and {@link sdfgi_max_distance}. Changing its value will automatically change those properties as well.
   */
  sdfgi_cascade0_distance: float;
  /**
   * The number of cascades to use for SDFGI (between 1 and 8). A higher number of cascades allows displaying SDFGI further away while preserving detail up close, at the cost of performance. When using SDFGI on small-scale levels, {@link sdfgi_cascades} can often be decreased between `1` and `4` to improve performance.
   */
  sdfgi_cascades: int;
  /**
   * If `true`, enables signed distance field global illumination for meshes that have their {@link GeometryInstance3D.gi_mode} set to {@link GeometryInstance3D.GI_MODE_STATIC}. SDFGI is a real-time global illumination technique that works well with procedurally generated and user-built levels, including in situations where geometry is created during gameplay. The signed distance field is automatically generated around the camera as it moves. Dynamic lights are supported, but dynamic occluders and emissive surfaces are not.
   * **Note:** SDFGI is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   * **Performance:** SDFGI is relatively demanding on the GPU and is not suited to low-end hardware such as integrated graphics (consider {@link LightmapGI} instead). To improve SDFGI performance, enable {@link ProjectSettings.rendering/global_illumination/gi/use_half_resolution} in the Project Settings.
   * **Note:** Meshes should have sufficiently thick walls to avoid light leaks (avoid one-sided walls). For interior levels, enclose your level geometry in a sufficiently large box and bridge the loops to close the mesh.
   */
  sdfgi_enabled: boolean;
  /**
   * The energy multiplier to use for SDFGI. Higher values will result in brighter indirect lighting and reflections. See also {@link sdfgi_bounce_feedback}.
   */
  sdfgi_energy: float;
  /**
   * The maximum distance at which SDFGI is visible. Beyond this distance, environment lighting or other sources of GI such as {@link ReflectionProbe} will be used as a fallback.
   * **Note:** This property is linked to {@link sdfgi_min_cell_size} and {@link sdfgi_cascade0_distance}. Changing its value will automatically change those properties as well.
   */
  sdfgi_max_distance: float;
  /**
   * The cell size to use for the closest SDFGI cascade (in 3D units). Lower values allow SDFGI to be more precise up close, at the cost of making SDFGI updates more demanding. This can cause stuttering when the camera moves fast. Higher values allow SDFGI to cover more ground, while also reducing the performance impact of SDFGI updates.
   * **Note:** This property is linked to {@link sdfgi_max_distance} and {@link sdfgi_cascade0_distance}. Changing its value will automatically change those properties as well.
   */
  sdfgi_min_cell_size: float;
  /**
   * The normal bias to use for SDFGI probes. Increasing this value can reduce visible streaking artifacts on sloped surfaces, at the cost of increased light leaking.
   */
  sdfgi_normal_bias: float;
  /**
   * The constant bias to use for SDFGI probes. Increasing this value can reduce visible streaking artifacts on sloped surfaces, at the cost of increased light leaking.
   */
  sdfgi_probe_bias: float;
  /**
   * If `true`, SDFGI takes the environment lighting into account. This should be set to `false` for interior scenes.
   */
  sdfgi_read_sky_light: boolean;
  /**
   * If `true`, SDFGI uses an occlusion detection approach to reduce light leaking. Occlusion may however introduce dark blotches in certain spots, which may be undesired in mostly outdoor scenes. {@link sdfgi_use_occlusion} has a performance impact and should only be enabled when needed.
   */
  sdfgi_use_occlusion: boolean;
  /**
   * The Y scale to use for SDFGI cells. Lower values will result in SDFGI cells being packed together more closely on the Y axis. This is used to balance between quality and covering a lot of vertical ground. {@link sdfgi_y_scale} should be set depending on how vertical your scene is (and how fast your camera may move on the Y axis).
   */
  sdfgi_y_scale: int;
  /** The {@link Sky} resource used for this {@link Environment}. */
  sky: Sky;
  /**
   * If set to a value greater than `0.0`, overrides the field of view to use for sky rendering. If set to `0.0`, the same FOV as the current {@link Camera3D} is used for sky rendering.
   */
  sky_custom_fov: float;
  /** The rotation to use for sky rendering. */
  sky_rotation: Vector3;
  /**
   * The screen-space ambient occlusion intensity on materials that have an AO texture defined. Values higher than `0` will make the SSAO effect visible in areas darkened by AO textures.
   */
  ssao_ao_channel_affect: float;
  /**
   * Sets the strength of the additional level of detail for the screen-space ambient occlusion effect. A high value makes the detail pass more prominent, but it may contribute to aliasing in your final image.
   */
  ssao_detail: float;
  /**
   * If `true`, the screen-space ambient occlusion effect is enabled. This darkens objects' corners and cavities to simulate ambient light not reaching the entire object as in real life. This works well for small, dynamic objects, but baked lighting or ambient occlusion textures will do a better job at displaying ambient occlusion on large static objects. Godot uses a form of SSAO called Adaptive Screen Space Ambient Occlusion which is itself a form of Horizon Based Ambient Occlusion.
   * **Note:** SSAO is only supported in the Forward+ and Compatibility rendering methods, not Mobile.
   */
  ssao_enabled: boolean;
  /**
   * The threshold for considering whether a given point on a surface is occluded or not represented as an angle from the horizon mapped into the `0.0-1.0` range. A value of `1.0` results in no occlusion.
   */
  ssao_horizon: float;
  /**
   * The primary screen-space ambient occlusion intensity. Acts as a multiplier for the screen-space ambient occlusion effect. A higher value results in darker occlusion.
   */
  ssao_intensity: float;
  /**
   * The screen-space ambient occlusion intensity in direct light. In real life, ambient occlusion only applies to indirect light, which means its effects can't be seen in direct light. Values higher than `0` will make the SSAO effect visible in direct light.
   */
  ssao_light_affect: float;
  /**
   * The distribution of occlusion. A higher value results in darker occlusion, similar to {@link ssao_intensity}, but with a sharper falloff.
   */
  ssao_power: float;
  /**
   * The distance at which objects can occlude each other when calculating screen-space ambient occlusion. Higher values will result in occlusion over a greater distance at the cost of performance and quality.
   */
  ssao_radius: float;
  /**
   * The amount that the screen-space ambient occlusion effect is allowed to blur over the edges of objects. Setting too high will result in aliasing around the edges of objects. Setting too low will make object edges appear blurry.
   */
  ssao_sharpness: float;
  /**
   * If `true`, the screen-space indirect lighting effect is enabled. Screen space indirect lighting is a form of indirect lighting that allows diffuse light to bounce between nearby objects. Screen-space indirect lighting works very similarly to screen-space ambient occlusion, in that it only affects a limited range. It is intended to be used along with a form of proper global illumination like SDFGI or {@link VoxelGI}. Screen-space indirect lighting is not affected by individual light's {@link Light3D.light_indirect_energy}.
   * **Note:** SSIL is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   */
  ssil_enabled: boolean;
  /**
   * The brightness multiplier for the screen-space indirect lighting effect. A higher value will result in brighter light.
   */
  ssil_intensity: float;
  /**
   * Amount of normal rejection used when calculating screen-space indirect lighting. Normal rejection uses the normal of a given sample point to reject samples that are facing away from the current pixel. Normal rejection is necessary to avoid light leaking when only one side of an object is illuminated. However, normal rejection can be disabled if light leaking is desirable, such as when the scene mostly contains emissive objects that emit light from faces that cannot be seen from the camera.
   */
  ssil_normal_rejection: float;
  /**
   * The distance that bounced lighting can travel when using the screen space indirect lighting effect. A larger value will result in light bouncing further in a scene, but may result in under-sampling artifacts which look like long spikes surrounding light sources.
   */
  ssil_radius: float;
  /**
   * The amount that the screen-space indirect lighting effect is allowed to blur over the edges of objects. Setting too high will result in aliasing around the edges of objects. Setting too low will make object edges appear blurry.
   */
  ssil_sharpness: float;
  /** The depth tolerance for screen-space reflections. */
  ssr_depth_tolerance: float;
  /**
   * If `true`, screen-space reflections are enabled. Screen-space reflections are more accurate than reflections from {@link VoxelGI}s or {@link ReflectionProbe}s, but are slower and can't reflect surfaces occluded by others.
   * **Note:** SSR is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   * **Note:** SSR is not supported on viewports that have a transparent background (where {@link Viewport.transparent_bg} is `true`).
   */
  ssr_enabled: boolean;
  /**
   * The fade-in distance for screen-space reflections. Affects the area from the reflected material to the screen-space reflection. Only positive values are valid (negative values will be clamped to `0.0`).
   */
  ssr_fade_in: float;
  /**
   * The fade-out distance for screen-space reflections. Affects the area from the screen-space reflection to the "global" reflection. Only positive values are valid (negative values will be clamped to `0.0`).
   */
  ssr_fade_out: float;
  /** The maximum number of steps for screen-space reflections. Higher values are slower. */
  ssr_max_steps: int;
  /**
   * Increasing {@link tonemap_agx_contrast} will make dark values darker and bright values brighter. Produces a higher quality result than {@link adjustment_contrast} without any additional performance cost, but is only available when using the {@link TONE_MAPPER_AGX} tonemapper.
   */
  tonemap_agx_contrast: float;
  /**
   * The white reference value for tonemapping, which indicates where bright white is located in the scale of values provided to the tonemapper. For photorealistic lighting, it is recommended to set {@link tonemap_agx_white} to at least `6.0`. Higher values result in less blown out highlights, but may make the scene appear lower contrast. {@link tonemap_agx_white} is the same as {@link tonemap_white}, but is only effective with the {@link TONE_MAPPER_AGX} tonemapper. See also {@link tonemap_exposure}.
   * **Note:** When using the Mobile renderer with {@link Viewport.use_hdr_2d} disabled, {@link tonemap_agx_white} is ignored and a white value of `2.0` will always be used instead. Otherwise, {@link tonemap_agx_white} will be dynamically adjusted at runtime by multiplying it by the parent window's {@link Window.get_output_max_linear_value} when using {@link Viewport.use_hdr_2d} to ensure good behavior with both SDR and HDR output.
   */
  tonemap_agx_white: float;
  /**
   * Adjusts the brightness of values before they are provided to the tonemapper. Higher {@link tonemap_exposure} values result in a brighter image. See also {@link tonemap_white}.
   * **Note:** Values provided to the tonemapper will also be multiplied by `2.0` and `1.8` for {@link TONE_MAPPER_FILMIC} and {@link TONE_MAPPER_ACES} respectively to produce a similar apparent brightness as {@link TONE_MAPPER_LINEAR}.
   */
  tonemap_exposure: float;
  /**
   * The tonemapping mode to use. Tonemapping is the process that "converts" HDR values to be suitable for rendering on an LDR display. (Godot doesn't support rendering on HDR displays yet.)
   */
  tonemap_mode: int;
  /**
   * The white reference value for tonemapping, which indicates where bright white is located in the scale of values provided to the tonemapper. For photorealistic lighting, it is recommended to set {@link tonemap_white} to at least `6.0`. Higher values result in less blown out highlights, but may make the scene appear lower contrast. {@link tonemap_agx_white} will be used instead when using the {@link TONE_MAPPER_AGX} tonemapper. See also {@link tonemap_exposure}.
   * **Note:** {@link tonemap_white} must be set to `2.0` or lower on the Mobile renderer to produce bright images.
   * **Note:** {@link tonemap_white} is ignored when using {@link TONE_MAPPER_LINEAR} and will be dynamically adjusted at runtime to never be less than the parent window's {@link Window.get_output_max_linear_value} when using {@link TONE_MAPPER_REINHARDT} with {@link Viewport.use_hdr_2d}.
   */
  tonemap_white: float;
  /**
   * The {@link Color} of the volumetric fog when interacting with lights. Mist and fog have an albedo close to `Color(1, 1, 1, 1)` while smoke has a darker albedo.
   */
  volumetric_fog_albedo: Color;
  /**
   * Scales the strength of ambient light used in the volumetric fog. A value of `0.0` means that ambient light will not impact the volumetric fog. {@link volumetric_fog_ambient_inject} has a small performance cost when set above `0.0`.
   * **Note:** This has no visible effect if {@link volumetric_fog_density} is `0.0` or if {@link volumetric_fog_albedo} is a fully black color.
   */
  volumetric_fog_ambient_inject: float;
  /**
   * The direction of scattered light as it goes through the volumetric fog. A value close to `1.0` means almost all light is scattered forward. A value close to `0.0` means light is scattered equally in all directions. A value close to `-1.0` means light is scattered mostly backward. Fog and mist scatter light slightly forward, while smoke scatters light equally in all directions.
   */
  volumetric_fog_anisotropy: float;
  /**
   * The base *exponential* density of the volumetric fog. Set this to the lowest density you want to have globally. {@link FogVolume}s can be used to add to or subtract from this density in specific areas. Fog rendering is exponential as in real life.
   * A value of `0.0` disables global volumetric fog while allowing {@link FogVolume}s to display volumetric fog in specific areas.
   * To make volumetric fog work as a volumetric *lighting* solution, set {@link volumetric_fog_density} to the lowest non-zero value (`0.0001`) then increase lights' {@link Light3D.light_volumetric_fog_energy} to values between `10000` and `100000` to compensate for the very low density.
   */
  volumetric_fog_density: float;
  /**
   * The distribution of size down the length of the froxel buffer. A higher value compresses the froxels closer to the camera and places more detail closer to the camera.
   */
  volumetric_fog_detail_spread: float;
  /**
   * The emitted light from the volumetric fog. Even with emission, volumetric fog will not cast light onto other surfaces. Emission is useful to establish an ambient color. As the volumetric fog effect uses single-scattering only, fog tends to need a little bit of emission to soften the harsh shadows.
   */
  volumetric_fog_emission: Color;
  /** The brightness of the emitted light from the volumetric fog. */
  volumetric_fog_emission_energy: float;
  /**
   * Enables the volumetric fog effect. Volumetric fog uses a screen-aligned froxel buffer to calculate accurate volumetric scattering in the short to medium range. Volumetric fog interacts with {@link FogVolume}s and lights to calculate localized and global fog. Volumetric fog uses a PBR single-scattering model based on extinction, scattering, and emission which it exposes to users as density, albedo, and emission.
   * **Note:** Volumetric fog is only supported in the Forward+ rendering method, not Mobile or Compatibility.
   */
  volumetric_fog_enabled: boolean;
  /**
   * Scales the strength of Global Illumination used in the volumetric fog's albedo color. A value of `0.0` means that Global Illumination will not impact the volumetric fog. {@link volumetric_fog_gi_inject} has a small performance cost when set above `0.0`.
   * **Note:** This has no visible effect if {@link volumetric_fog_density} is `0.0` or if {@link volumetric_fog_albedo} is a fully black color.
   * **Note:** Only {@link VoxelGI} and SDFGI ({@link Environment.sdfgi_enabled}) are taken into account when using {@link volumetric_fog_gi_inject}. Global illumination from {@link LightmapGI}, {@link ReflectionProbe} and SSIL (see {@link ssil_enabled}) will be ignored by volumetric fog.
   */
  volumetric_fog_gi_inject: float;
  /**
   * The distance over which the volumetric fog is computed. Increase to compute fog over a greater range, decrease to add more detail when a long range is not needed. For best quality fog, keep this as low as possible. See also {@link ProjectSettings.rendering/environment/volumetric_fog/volume_depth}.
   */
  volumetric_fog_length: float;
  /**
   * The factor to use when affecting the sky with volumetric fog. `1.0` means that volumetric fog can fully obscure the sky. Lower values reduce the impact of volumetric fog on sky rendering, with `0.0` not affecting sky rendering at all.
   * **Note:** {@link volumetric_fog_sky_affect} also affects {@link FogVolume}s, even if {@link volumetric_fog_density} is `0.0`. If you notice {@link FogVolume}s are disappearing when looking towards the sky, set {@link volumetric_fog_sky_affect} to `1.0`.
   */
  volumetric_fog_sky_affect: float;
  /**
   * The amount by which to blend the last frame with the current frame. A higher number results in smoother volumetric fog, but makes "ghosting" much worse. A lower value reduces ghosting but can result in the per-frame temporal jitter becoming visible.
   */
  volumetric_fog_temporal_reprojection_amount: float;
  /**
   * Enables temporal reprojection in the volumetric fog. Temporal reprojection blends the current frame's volumetric fog with the last frame's volumetric fog to smooth out jagged edges. The performance cost is minimal; however, it leads to moving {@link FogVolume}s and {@link Light3D}s "ghosting" and leaving a trail behind them. When temporal reprojection is enabled, try to avoid moving {@link FogVolume}s or {@link Light3D}s too fast. Short-lived dynamic lighting effects should have {@link Light3D.light_volumetric_fog_energy} set to `0.0` to avoid ghosting.
   */
  volumetric_fog_temporal_reprojection_enabled: boolean;

  /** Returns the intensity of the glow level `idx`. */
  get_glow_level(idx: int): float;
  /**
   * Sets the intensity of the glow level `idx`. A value above `0.0` enables the level. Each level relies on the previous level. This means that enabling higher glow levels will slow down the glow effect rendering, even if previous levels aren't enabled.
   */
  set_glow_level(idx: int, intensity: float): void;

  // enum BGMode
  /**
   * Clears the background using the clear color defined in {@link ProjectSettings.rendering/environment/defaults/default_clear_color}.
   */
  static readonly BG_CLEAR_COLOR: int;
  /** Clears the background using a custom clear color. */
  static readonly BG_COLOR: int;
  /** Displays a user-defined sky in the background. */
  static readonly BG_SKY: int;
  /** Displays a {@link CanvasLayer} in the background. */
  static readonly BG_CANVAS: int;
  /**
   * Keeps on screen every pixel drawn in the background. This is the fastest background mode, but it can only be safely used in fully-interior scenes (no visible sky or sky reflections). If enabled in a scene where the background is visible, "ghost trail" artifacts will be visible when moving the camera.
   */
  static readonly BG_KEEP: int;
  /** Displays a camera feed in the background. */
  static readonly BG_CAMERA_FEED: int;
  /** Represents the size of the {@link BGMode} enum. */
  static readonly BG_MAX: int;
  // enum AmbientSource
  /** Gather ambient light from whichever source is specified as the background. */
  static readonly AMBIENT_SOURCE_BG: int;
  /** Disable ambient light. This provides a slight performance boost over {@link AMBIENT_SOURCE_SKY}. */
  static readonly AMBIENT_SOURCE_DISABLED: int;
  /**
   * Specify a specific {@link Color} for ambient light. This provides a slight performance boost over {@link AMBIENT_SOURCE_SKY}.
   */
  static readonly AMBIENT_SOURCE_COLOR: int;
  /** Gather ambient light from the {@link Sky} regardless of what the background is. */
  static readonly AMBIENT_SOURCE_SKY: int;
  // enum ReflectionSource
  /** Use the background for reflections. */
  static readonly REFLECTION_SOURCE_BG: int;
  /** Disable reflections. This provides a slight performance boost over other options. */
  static readonly REFLECTION_SOURCE_DISABLED: int;
  /** Use the {@link Sky} for reflections regardless of what the background is. */
  static readonly REFLECTION_SOURCE_SKY: int;
  // enum ToneMapper
  /**
   * Does not modify color data, resulting in a linear tonemapping curve which unnaturally clips bright values, causing bright lighting to look blown out. The simplest and fastest tonemapper.
   */
  static readonly TONE_MAPPER_LINEAR: int;
  /**
   * A simple tonemapping curve that rolls off bright values to prevent clipping. This results in an image that can appear dull and low contrast. Slower than {@link TONE_MAPPER_LINEAR}.
   * **Note:** When {@link tonemap_white} is left at the default value of `1.0`, {@link TONE_MAPPER_REINHARDT} produces an identical image to {@link TONE_MAPPER_LINEAR}.
   */
  static readonly TONE_MAPPER_REINHARDT: int;
  /**
   * Uses a film-like tonemapping curve to prevent clipping of bright values and provide better contrast than {@link TONE_MAPPER_REINHARDT}. Slightly slower than {@link TONE_MAPPER_REINHARDT}.
   * **Note:** This tonemapper does not support HDR output because it produces output in the SDR range. It is recommended to use a different tonemapper when rendering to an HDR screen.
   */
  static readonly TONE_MAPPER_FILMIC: int;
  /**
   * Uses a high-contrast film-like tonemapping curve and desaturates bright values for a more realistic appearance. Slightly slower than {@link TONE_MAPPER_FILMIC}.
   * **Note:** This tonemapping operator is called "ACES Fitted" in Godot 3.x.
   * **Note:** This tonemapper does not support HDR output because it produces output in the SDR range. It is recommended to use a different tonemapper when rendering to an HDR screen.
   */
  static readonly TONE_MAPPER_ACES: int;
  /**
   * Uses an adjustable film-like tonemapping curve and desaturates bright values for a more realistic appearance. Better than other tonemappers at maintaining the hue of colors as they become brighter. The slowest tonemapping option.
   */
  static readonly TONE_MAPPER_AGX: int;
  // enum GlowBlendMode
  /** Adds the glow effect to the scene. */
  static readonly GLOW_BLEND_MODE_ADDITIVE: int;
  /**
   * Adds the glow effect to the scene after modifying the glow influence based on the scene value; dark values will be highly influenced by glow and bright values will not be influenced by glow. This approach avoids bright values becoming overly bright from the glow effect. {@link tonemap_white} is used to determine the maximum scene value where the glow should have no influence. When {@link tonemap_mode} is set to {@link TONE_MAPPER_LINEAR} and {@link Viewport.use_hdr_2d} is `true`, the parent window's {@link Window.get_output_max_linear_value} will be used as the maximum scene value.
   */
  static readonly GLOW_BLEND_MODE_SCREEN: int;
  /**
   * Adds the glow effect to the tonemapped image after modifying the glow influence based on the image value; dark values and bright values will not be influenced by glow and mid-range values will be highly influenced by glow. This approach avoids bright values becoming overly bright from the glow effect. The glow will have the largest influence on image values of `0.25` and will have no influence when applied to image values greater than `1.0`.
   * **Note:** This blend mode does not support HDR output because expects a maximum output value of `1.0`. It is recommended to use a different blend mode when rendering to an HDR screen.
   */
  static readonly GLOW_BLEND_MODE_SOFTLIGHT: int;
  /**
   * Replaces all pixels' color by the glow effect. This can be used to simulate a full-screen blur effect by tweaking the glow parameters to match the original image's brightness or to preview glow configuration in the editor.
   */
  static readonly GLOW_BLEND_MODE_REPLACE: int;
  /**
   * Mixes the glow image with the scene image. Best used with {@link glow_bloom} to avoid darkening the scene.
   */
  static readonly GLOW_BLEND_MODE_MIX: int;
  // enum FogMode
  /** Use a physically-based fog model defined primarily by fog density. */
  static readonly FOG_MODE_EXPONENTIAL: int;
  /**
   * Use a simple fog model defined by start and end positions and a custom curve. While not physically accurate, this model can be useful when you need more artistic control.
   */
  static readonly FOG_MODE_DEPTH: int;
  // enum SDFGIYScale
  /**
   * Use 50% scale for SDFGI on the Y (vertical) axis. SDFGI cells will be twice as short as they are wide. This allows providing increased GI detail and reduced light leaking with thin floors and ceilings. This is usually the best choice for scenes that don't feature much verticality.
   */
  static readonly SDFGI_Y_SCALE_50_PERCENT: int;
  /**
   * Use 75% scale for SDFGI on the Y (vertical) axis. This is a balance between the 50% and 100% SDFGI Y scales.
   */
  static readonly SDFGI_Y_SCALE_75_PERCENT: int;
  /**
   * Use 100% scale for SDFGI on the Y (vertical) axis. SDFGI cells will be as tall as they are wide. This is usually the best choice for highly vertical scenes. The downside is that light leaking may become more noticeable with thin floors and ceilings.
   */
  static readonly SDFGI_Y_SCALE_100_PERCENT: int;
}
