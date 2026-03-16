// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Computes and stores baked lightmaps for fast global illumination. */
declare class LightmapGI extends VisualInstance3D {
  /**
   * The bias to use when computing shadows. Increasing {@link bias} can fix shadow acne on the resulting baked lightmap, but can introduce peter-panning (shadows not connecting to their casters). Real-time {@link Light3D} shadows are not affected by this {@link bias} property.
   */
  bias: float;
  /**
   * The energy multiplier for each bounce. Higher values will make indirect lighting brighter. A value of `1.0` represents physically accurate behavior, but higher values can be used to make indirect lighting propagate more visibly when using a low number of bounces. This can be used to speed up bake times by lowering the number of {@link bounces} then increasing {@link bounce_indirect_energy}.
   * **Note:** {@link bounce_indirect_energy} only has an effect if {@link bounces} is set to a value greater than or equal to `1`.
   */
  bounce_indirect_energy: float;
  /**
   * Number of light bounces that are taken into account during baking. Higher values result in brighter, more realistic lighting, at the cost of longer bake times. If set to `0`, only environment lighting, direct light and emissive lighting is baked.
   */
  bounces: int;
  /**
   * The {@link CameraAttributes} resource that specifies exposure levels to bake at. Auto-exposure and non exposure properties will be ignored. Exposure settings should be used to reduce the dynamic range present when baking. If exposure is too high, the {@link LightmapGI} will have banding artifacts or may have over-exposure artifacts.
   */
  camera_attributes: CameraAttributes;
  /**
   * The distance in pixels from which the denoiser samples. Lower values preserve more details, but may give blotchy results if the lightmap quality is not high enough. Only effective if {@link use_denoiser} is `true` and {@link ProjectSettings.rendering/lightmapping/denoising/denoiser} is set to JNLM.
   */
  denoiser_range: int;
  /**
   * The strength of denoising step applied to the generated lightmaps. Only effective if {@link use_denoiser} is `true` and {@link ProjectSettings.rendering/lightmapping/denoising/denoiser} is set to JNLM.
   */
  denoiser_strength: float;
  /**
   * If `true`, bakes lightmaps to contain directional information as spherical harmonics. This results in more realistic lighting appearance, especially with normal mapped materials and for lights that have their direct light baked ({@link Light3D.light_bake_mode} set to {@link Light3D.BAKE_STATIC} and with {@link Light3D.editor_only} set to `false`). The directional information is also used to provide rough reflections for static and dynamic objects. This has a small run-time performance cost as the shader has to perform more work to interpret the direction information from the lightmap. Directional lightmaps also take longer to bake and result in larger file sizes.
   * **Note:** The property's name has no relationship with {@link DirectionalLight3D}. {@link directional} works with all light types.
   */
  directional: boolean;
  /**
   * The color to use for environment lighting. Only effective if {@link environment_mode} is {@link ENVIRONMENT_MODE_CUSTOM_COLOR}.
   */
  environment_custom_color: Color;
  /**
   * The color multiplier to use for environment lighting. Only effective if {@link environment_mode} is {@link ENVIRONMENT_MODE_CUSTOM_COLOR}.
   */
  environment_custom_energy: float;
  /**
   * The sky to use as a source of environment lighting. Only effective if {@link environment_mode} is {@link ENVIRONMENT_MODE_CUSTOM_SKY}.
   */
  environment_custom_sky: Sky;
  /** The environment mode to use when baking lightmaps. */
  environment_mode: int;
  /**
   * The level of subdivision to use when automatically generating {@link LightmapProbe}s for dynamic object lighting. Higher values result in more accurate indirect lighting on dynamic objects, at the cost of longer bake times and larger file sizes.
   * **Note:** Automatically generated {@link LightmapProbe}s are not visible as nodes in the Scene tree dock, and cannot be modified this way after they are generated.
   * **Note:** Regardless of {@link generate_probes_subdiv}, direct lighting on dynamic objects is always applied using {@link Light3D} nodes in real-time.
   */
  generate_probes_subdiv: int;
  /** If `true`, ignore environment lighting when baking lightmaps. */
  interior: boolean;
  /**
   * The {@link LightmapGIData} associated to this {@link LightmapGI} node. This resource is automatically created after baking, and is not meant to be created manually.
   */
  light_data: LightmapGIData;
  /**
   * The maximum texture size for the generated texture atlas. Higher values will result in fewer slices being generated, but may not work on all hardware as a result of hardware limitations on texture sizes. Leave {@link max_texture_size} at its default value of `16384` if unsure.
   */
  max_texture_size: int;
  /**
   * The quality preset to use when baking lightmaps. This affects bake times, but output file sizes remain mostly identical across quality levels.
   * To further speed up bake times, decrease {@link bounces}, disable {@link use_denoiser} and/or decrease {@link texel_scale}.
   * To further increase quality, enable {@link supersampling} and/or increase {@link texel_scale}.
   */
  quality: int;
  /**
   * The shadowmasking policy to use for directional shadows on static objects that are baked with this {@link LightmapGI} instance.
   * Shadowmasking allows {@link DirectionalLight3D} nodes to cast shadows even outside the range defined by their {@link DirectionalLight3D.directional_shadow_max_distance} property. This is done by baking a texture that contains a shadowmap for the directional light, then using this texture according to the current shadowmask mode.
   * **Note:** The shadowmask texture is only created if {@link shadowmask_mode} is not {@link LightmapGIData.SHADOWMASK_MODE_NONE}. To see a difference, you need to bake lightmaps again after switching from {@link LightmapGIData.SHADOWMASK_MODE_NONE} to any other mode.
   */
  shadowmask_mode: int;
  /**
   * If `true`, lightmaps are baked with the texel scale multiplied with {@link supersampling_factor} and downsampled before saving the lightmap (so the effective texel density is identical to having supersampling disabled).
   * Supersampling provides increased lightmap quality with less noise, smoother shadows and better shadowing of small-scale features in objects. However, it may result in significantly increased bake times and memory usage while baking lightmaps. Padding is automatically adjusted to avoid increasing light leaking.
   */
  supersampling: boolean;
  /**
   * The factor by which the texel density is multiplied for supersampling. For best results, use an integer value. While fractional values are allowed, they can result in increased light leaking and a blurry lightmap.
   * Higher values may result in better quality, but also increase bake times and memory usage while baking.
   * See {@link supersampling} for more information.
   */
  supersampling_factor: float;
  /**
   * Scales the lightmap texel density of all meshes for the current bake. This is a multiplier that builds upon the existing lightmap texel size defined in each imported 3D scene, along with the per-mesh density multiplier (which is designed to be used when the same mesh is used at different scales). Lower values will result in faster bake times.
   * For example, doubling {@link texel_scale} doubles the lightmap texture resolution for all objects *on each axis*, so it will *quadruple* the texel count.
   */
  texel_scale: float;
  /**
   * If `true`, uses a GPU-based denoising algorithm on the generated lightmap. This eliminates most noise within the generated lightmap at the cost of longer bake times. File sizes are generally not impacted significantly by the use of a denoiser, although lossless compression may do a better job at compressing a denoised image.
   */
  use_denoiser: boolean;
  /**
   * If `true`, a texture with the lighting information will be generated to speed up the generation of indirect lighting at the cost of some accuracy. The geometry might exhibit extra light leak artifacts when using low resolution lightmaps or UVs that stretch the lightmap significantly across surfaces. Leave {@link use_texture_for_bounces} at its default value of `true` if unsure.
   * **Note:** {@link use_texture_for_bounces} only has an effect if {@link bounces} is set to a value greater than or equal to `1`.
   */
  use_texture_for_bounces: boolean;

  // enum BakeQuality
  /**
   * Low bake quality (fastest bake times). The quality of this preset can be adjusted by changing {@link ProjectSettings.rendering/lightmapping/bake_quality/low_quality_ray_count} and {@link ProjectSettings.rendering/lightmapping/bake_quality/low_quality_probe_ray_count}.
   */
  static readonly BAKE_QUALITY_LOW: int;
  /**
   * Medium bake quality (fast bake times). The quality of this preset can be adjusted by changing {@link ProjectSettings.rendering/lightmapping/bake_quality/medium_quality_ray_count} and {@link ProjectSettings.rendering/lightmapping/bake_quality/medium_quality_probe_ray_count}.
   */
  static readonly BAKE_QUALITY_MEDIUM: int;
  /**
   * High bake quality (slow bake times). The quality of this preset can be adjusted by changing {@link ProjectSettings.rendering/lightmapping/bake_quality/high_quality_ray_count} and {@link ProjectSettings.rendering/lightmapping/bake_quality/high_quality_probe_ray_count}.
   */
  static readonly BAKE_QUALITY_HIGH: int;
  /**
   * Highest bake quality (slowest bake times). The quality of this preset can be adjusted by changing {@link ProjectSettings.rendering/lightmapping/bake_quality/ultra_quality_ray_count} and {@link ProjectSettings.rendering/lightmapping/bake_quality/ultra_quality_probe_ray_count}.
   */
  static readonly BAKE_QUALITY_ULTRA: int;
  // enum GenerateProbes
  /** Don't generate lightmap probes for lighting dynamic objects. */
  static readonly GENERATE_PROBES_DISABLED: int;
  /** Lowest level of subdivision (fastest bake times, smallest file sizes). */
  static readonly GENERATE_PROBES_SUBDIV_4: int;
  /** Low level of subdivision (fast bake times, small file sizes). */
  static readonly GENERATE_PROBES_SUBDIV_8: int;
  /** High level of subdivision (slow bake times, large file sizes). */
  static readonly GENERATE_PROBES_SUBDIV_16: int;
  /** Highest level of subdivision (slowest bake times, largest file sizes). */
  static readonly GENERATE_PROBES_SUBDIV_32: int;
  // enum BakeError
  /** Lightmap baking was successful. */
  static readonly BAKE_ERROR_OK: int;
  /** Lightmap baking failed because the root node for the edited scene could not be accessed. */
  static readonly BAKE_ERROR_NO_SCENE_ROOT: int;
  /** Lightmap baking failed as the lightmap data resource is embedded in a foreign resource. */
  static readonly BAKE_ERROR_FOREIGN_DATA: int;
  /** Lightmap baking failed as there is no lightmapper available in this Godot build. */
  static readonly BAKE_ERROR_NO_LIGHTMAPPER: int;
  /** Lightmap baking failed as the {@link LightmapGIData} save path isn't configured in the resource. */
  static readonly BAKE_ERROR_NO_SAVE_PATH: int;
  /**
   * Lightmap baking failed as there are no meshes whose {@link GeometryInstance3D.gi_mode} is {@link GeometryInstance3D.GI_MODE_STATIC} and with valid UV2 mapping in the current scene. You may need to select 3D scenes in the Import dock and change their global illumination mode accordingly.
   */
  static readonly BAKE_ERROR_NO_MESHES: int;
  /**
   * Lightmap baking failed as the lightmapper failed to analyze some of the meshes marked as static for baking.
   */
  static readonly BAKE_ERROR_MESHES_INVALID: int;
  /**
   * Lightmap baking failed as the resulting image couldn't be saved or imported by Godot after it was saved.
   */
  static readonly BAKE_ERROR_CANT_CREATE_IMAGE: int;
  /**
   * The user aborted the lightmap baking operation (typically by clicking the **Cancel** button in the progress dialog).
   */
  static readonly BAKE_ERROR_USER_ABORTED: int;
  /**
   * Lightmap baking failed as the maximum texture size is too small to fit some of the meshes marked for baking.
   */
  static readonly BAKE_ERROR_TEXTURE_SIZE_TOO_SMALL: int;
  /** Lightmap baking failed as the lightmap is too small. */
  static readonly BAKE_ERROR_LIGHTMAP_TOO_SMALL: int;
  /** Lightmap baking failed as the lightmap was unable to fit into an atlas. */
  static readonly BAKE_ERROR_ATLAS_TOO_SMALL: int;
  // enum EnvironmentMode
  /** Ignore environment lighting when baking lightmaps. */
  static readonly ENVIRONMENT_MODE_DISABLED: int;
  /**
   * Use the scene's environment lighting when baking lightmaps.
   * **Note:** If baking lightmaps in a scene with no {@link WorldEnvironment} node, this will act like {@link ENVIRONMENT_MODE_DISABLED}. The editor's preview sky and sun is *not* taken into account by {@link LightmapGI} when baking lightmaps.
   */
  static readonly ENVIRONMENT_MODE_SCENE: int;
  /** Use {@link environment_custom_sky} as a source of environment lighting when baking lightmaps. */
  static readonly ENVIRONMENT_MODE_CUSTOM_SKY: int;
  /**
   * Use {@link environment_custom_color} multiplied by {@link environment_custom_energy} as a constant source of environment lighting when baking lightmaps.
   */
  static readonly ENVIRONMENT_MODE_CUSTOM_COLOR: int;
}
