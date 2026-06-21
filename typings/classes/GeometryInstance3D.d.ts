// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base node for geometry-based visual instances. */
declare class GeometryInstance3D extends VisualInstance3D {
  /** The mode used to cast shadows from this instance. */
  cast_shadow: int;
  /**
   * Overrides the bounding box of this node with a custom one. This can be used to avoid the expensive {@link AABB} recalculation that happens when a skeleton is used with a {@link MeshInstance3D} or to have precise control over the {@link MeshInstance3D}'s bounding box. To use the default AABB, set value to an {@link AABB} with all fields set to `0.0`. To avoid frustum culling, set {@link custom_aabb} to a very large AABB that covers your entire game world such as `AABB(-10000, -10000, -10000, 20000, 20000, 20000)`. To disable all forms of culling (including occlusion and layer culling), call {@link RenderingServer.instance_set_ignore_culling} on the {@link GeometryInstance3D}'s {@link RID}.
   */
  custom_aabb: AABB;
  /**
   * The extra distance added to the GeometryInstance3D's bounding box ({@link AABB}) to increase its cull box.
   */
  extra_cull_margin: float;
  /** The texel density to use for lightmapping in {@link LightmapGI}. */
  gi_lightmap_scale: int;
  /**
   * The texel density to use for lightmapping in {@link LightmapGI}. Greater scale values provide higher resolution in the lightmap, which can result in sharper shadows for lights that have both direct and indirect light baked. However, greater scale values will also increase the space taken by the mesh in the lightmap texture, which increases the memory, storage, and bake time requirements. When using a single mesh at different scales, consider adjusting this value to keep the lightmap texel density consistent across meshes.
   * For example, doubling {@link gi_lightmap_texel_scale} doubles the lightmap texture resolution for this object *on each axis*, so it will *quadruple* the texel count.
   */
  gi_lightmap_texel_scale: float;
  /**
   * The global illumination mode to use for the whole geometry. To avoid inconsistent results, use a mode that matches the purpose of the mesh during gameplay (static/dynamic).
   * **Note:** Lights' bake mode will also affect the global illumination rendering. See {@link Light3D.light_bake_mode}.
   */
  gi_mode: int;
  /**
   * If `true`, disables occlusion culling for this instance. Useful for gizmos that must be rendered even when occlusion culling is in use.
   * **Note:** {@link ignore_occlusion_culling} does not affect frustum culling (which is what happens when an object is not visible given the camera's angle). To avoid frustum culling, set {@link custom_aabb} to a very large AABB that covers your entire game world such as `AABB(-10000, -10000, -10000, 20000, 20000, 20000)`.
   */
  ignore_occlusion_culling: boolean;
  /**
   * Changes how quickly the mesh transitions to a lower level of detail. A value of 0 will force the mesh to its lowest level of detail, a value of 1 will use the default settings, and larger values will keep the mesh in a higher level of detail at farther distances.
   * Useful for testing level of detail transitions in the editor.
   */
  lod_bias: float;
  /**
   * The material overlay for the whole geometry.
   * If a material is assigned to this property, it will be rendered on top of any other active material for all the surfaces.
   */
  material_overlay: Material | null;
  /**
   * The material override for the whole geometry.
   * If a material is assigned to this property, it will be used instead of any material set in any material slot of the mesh.
   */
  material_override: Material | null;
  /**
   * The transparency applied to the whole geometry (as a multiplier of the materials' existing transparency). `0.0` is fully opaque, while `1.0` is fully transparent. Values greater than `0.0` (exclusive) will force the geometry's materials to go through the transparent pipeline, which is slower to render and can exhibit rendering issues due to incorrect transparency sorting. However, unlike using a transparent material, setting {@link transparency} to a value greater than `0.0` (exclusive) will *not* disable shadow rendering.
   * In spatial shaders, `1.0 - transparency` is set as the default value of the `ALPHA` built-in.
   * **Note:** {@link transparency} is clamped between `0.0` and `1.0`, so this property cannot be used to make transparent materials more opaque than they originally are.
   * **Note:** Only supported when using the Forward+ rendering method. When using the Mobile or Compatibility rendering method, {@link transparency} is ignored and is considered as always being `0.0`.
   */
  transparency: float;
  /**
   * Starting distance from which the GeometryInstance3D will be visible, taking {@link visibility_range_begin_margin} into account as well. The default value of 0 is used to disable the range check.
   */
  visibility_range_begin: float;
  /**
   * Margin for the {@link visibility_range_begin} threshold. The GeometryInstance3D will only change its visibility state when it goes over or under the {@link visibility_range_begin} threshold by this amount.
   * If {@link visibility_range_fade_mode} is {@link VISIBILITY_RANGE_FADE_DISABLED}, this acts as a hysteresis distance. If {@link visibility_range_fade_mode} is {@link VISIBILITY_RANGE_FADE_SELF} or {@link VISIBILITY_RANGE_FADE_DEPENDENCIES}, this acts as a fade transition distance and must be set to a value greater than `0.0` for the effect to be noticeable.
   */
  visibility_range_begin_margin: float;
  /**
   * Distance from which the GeometryInstance3D will be hidden, taking {@link visibility_range_end_margin} into account as well. The default value of 0 is used to disable the range check.
   */
  visibility_range_end: float;
  /**
   * Margin for the {@link visibility_range_end} threshold. The GeometryInstance3D will only change its visibility state when it goes over or under the {@link visibility_range_end} threshold by this amount.
   * If {@link visibility_range_fade_mode} is {@link VISIBILITY_RANGE_FADE_DISABLED}, this acts as a hysteresis distance. If {@link visibility_range_fade_mode} is {@link VISIBILITY_RANGE_FADE_SELF} or {@link VISIBILITY_RANGE_FADE_DEPENDENCIES}, this acts as a fade transition distance and must be set to a value greater than `0.0` for the effect to be noticeable.
   */
  visibility_range_end_margin: float;
  /** Controls which instances will be faded when approaching the limits of the visibility range. */
  visibility_range_fade_mode: int;
  set_cast_shadows_setting(value: int): void;
  get_cast_shadows_setting(): int;
  set_custom_aabb(value: AABB): void;
  get_custom_aabb(): AABB;
  set_extra_cull_margin(value: float): void;
  get_extra_cull_margin(): float;
  set_lightmap_scale(value: int): void;
  get_lightmap_scale(): int;
  set_lightmap_texel_scale(value: float): void;
  get_lightmap_texel_scale(): float;
  set_gi_mode(value: int): void;
  get_gi_mode(): int;
  set_ignore_occlusion_culling(value: boolean): void;
  is_ignoring_occlusion_culling(): boolean;
  set_lod_bias(value: float): void;
  get_lod_bias(): float;
  set_material_overlay(value: Material | null): void;
  get_material_overlay(): Material | null;
  set_material_override(value: Material | null): void;
  get_material_override(): Material | null;
  set_transparency(value: float): void;
  get_transparency(): float;
  set_visibility_range_begin(value: float): void;
  get_visibility_range_begin(): float;
  set_visibility_range_begin_margin(value: float): void;
  get_visibility_range_begin_margin(): float;
  set_visibility_range_end(value: float): void;
  get_visibility_range_end(): float;
  set_visibility_range_end_margin(value: float): void;
  get_visibility_range_end_margin(): float;
  set_visibility_range_fade_mode(value: int): void;
  get_visibility_range_fade_mode(): int;

  /** Get the value of a shader parameter as set on this instance. */
  get_instance_shader_parameter(name: string): unknown;
  /**
   * Set the value of a shader uniform for this instance only (per-instance uniform ($DOCS_URL/tutorials/shaders/shader_reference/shading_language.html#per-instance-uniforms)). See also {@link ShaderMaterial.set_shader_parameter} to assign a uniform on all instances using the same {@link ShaderMaterial}.
   * **Note:** For a shader uniform to be assignable on a per-instance basis, it *must* be defined with `instance uniform ...` rather than `uniform ...` in the shader code.
   * **Note:** `name` is case-sensitive and must match the name of the uniform in the code exactly (not the capitalized name in the inspector).
   * **Note:** Per-instance shader uniforms are only available in Spatial and CanvasItem shaders, but not for Fog, Sky, or Particles shaders.
   */
  set_instance_shader_parameter(name: string, value: unknown): void;

  // enum ShadowCastingSetting
  /**
   * Will not cast any shadows. Use this to improve performance for small geometry that is unlikely to cast noticeable shadows (such as debris).
   */
  static readonly SHADOW_CASTING_SETTING_OFF: int;
  /**
   * Will cast shadows from all visible faces in the GeometryInstance3D.
   * Will take culling into account, so faces not being rendered will not be taken into account when shadow casting.
   */
  static readonly SHADOW_CASTING_SETTING_ON: int;
  /**
   * Will cast shadows from all visible faces in the GeometryInstance3D.
   * Will not take culling into account, so all faces will be taken into account when shadow casting.
   */
  static readonly SHADOW_CASTING_SETTING_DOUBLE_SIDED: int;
  /**
   * Will only show the shadows casted from this object.
   * In other words, the actual mesh will not be visible, only the shadows casted from the mesh will be.
   */
  static readonly SHADOW_CASTING_SETTING_SHADOWS_ONLY: int;
  // enum GIMode
  /**
   * Disabled global illumination mode. Use for dynamic objects that do not contribute to global illumination (such as characters). When using {@link VoxelGI} and SDFGI, the geometry will *receive* indirect lighting and reflections but the geometry will not be considered in GI baking.
   */
  static readonly GI_MODE_DISABLED: int;
  /**
   * Baked global illumination mode. Use for static objects that contribute to global illumination (such as level geometry). This GI mode is effective when using {@link VoxelGI}, SDFGI and {@link LightmapGI}.
   */
  static readonly GI_MODE_STATIC: int;
  /**
   * Dynamic global illumination mode. Use for dynamic objects that contribute to global illumination. This GI mode is only effective when using {@link VoxelGI}, but it has a higher performance impact than {@link GI_MODE_STATIC}. When using other GI methods, this will act the same as {@link GI_MODE_DISABLED}. When using {@link LightmapGI}, the object will receive indirect lighting using lightmap probes instead of using the baked lightmap texture.
   */
  static readonly GI_MODE_DYNAMIC: int;
  // enum LightmapScale
  /** The standard texel density for lightmapping with {@link LightmapGI}. */
  static readonly LIGHTMAP_SCALE_1X: int;
  /**
   * Multiplies texel density by 2× for lightmapping with {@link LightmapGI}. To ensure consistency in texel density, use this when scaling a mesh by a factor between 1.5 and 3.0.
   */
  static readonly LIGHTMAP_SCALE_2X: int;
  /**
   * Multiplies texel density by 4× for lightmapping with {@link LightmapGI}. To ensure consistency in texel density, use this when scaling a mesh by a factor between 3.0 and 6.0.
   */
  static readonly LIGHTMAP_SCALE_4X: int;
  /**
   * Multiplies texel density by 8× for lightmapping with {@link LightmapGI}. To ensure consistency in texel density, use this when scaling a mesh by a factor greater than 6.0.
   */
  static readonly LIGHTMAP_SCALE_8X: int;
  /** Represents the size of the {@link LightmapScale} enum. */
  static readonly LIGHTMAP_SCALE_MAX: int;
  // enum VisibilityRangeFadeMode
  /**
   * Will not fade itself nor its visibility dependencies, hysteresis will be used instead. This is the fastest approach to manual LOD, but it can result in noticeable LOD transitions depending on how the LOD meshes are authored. See {@link visibility_range_begin} and {@link Node3D.visibility_parent} for more information.
   */
  static readonly VISIBILITY_RANGE_FADE_DISABLED: int;
  /**
   * Will fade-out itself when reaching the limits of its own visibility range. This is slower than {@link VISIBILITY_RANGE_FADE_DISABLED}, but it can provide smoother transitions. The fading range is determined by {@link visibility_range_begin_margin} and {@link visibility_range_end_margin}.
   * **Note:** Only supported when using the Forward+ rendering method. When using the Mobile or Compatibility rendering method, this mode acts like {@link VISIBILITY_RANGE_FADE_DISABLED} but with hysteresis disabled.
   */
  static readonly VISIBILITY_RANGE_FADE_SELF: int;
  /**
   * Will fade-in its visibility dependencies (see {@link Node3D.visibility_parent}) when reaching the limits of its own visibility range. This is slower than {@link VISIBILITY_RANGE_FADE_DISABLED}, but it can provide smoother transitions. The fading range is determined by {@link visibility_range_begin_margin} and {@link visibility_range_end_margin}.
   * **Note:** Only supported when using the Forward+ rendering method. When using the Mobile or Compatibility rendering method, this mode acts like {@link VISIBILITY_RANGE_FADE_DISABLED} but with hysteresis disabled.
   */
  static readonly VISIBILITY_RANGE_FADE_DEPENDENCIES: int;
}
