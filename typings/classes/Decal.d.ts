// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Node that projects a texture onto a {@link MeshInstance3D}. */
declare class Decal extends VisualInstance3D {
  /**
   * Blends the albedo {@link Color} of the decal with albedo {@link Color} of the underlying mesh. This can be set to `0.0` to create a decal that only affects normal or ORM. In this case, an albedo texture is still required as its alpha channel will determine where the normal and ORM will be overridden. See also {@link modulate}.
   */
  albedo_mix: float;
  /**
   * Specifies which {@link VisualInstance3D.layers} this decal will project on. By default, Decals affect all layers. This is used so you can specify which types of objects receive the Decal and which do not. This is especially useful so you can ensure that dynamic objects don't accidentally receive a Decal intended for the terrain under them.
   */
  cull_mask: int;
  /** The distance from the camera at which the Decal begins to fade away (in 3D units). */
  distance_fade_begin: float;
  /**
   * If `true`, decals will smoothly fade away when far from the active {@link Camera3D} starting at {@link distance_fade_begin}. The Decal will fade out over {@link distance_fade_begin} + {@link distance_fade_length}, after which it will be culled and not sent to the shader at all. Use this to reduce the number of active Decals in a scene and thus improve performance.
   */
  distance_fade_enabled: boolean;
  /**
   * The distance over which the Decal fades (in 3D units). The Decal becomes slowly more transparent over this distance and is completely invisible at the end. Higher values result in a smoother fade-out transition, which is more suited when the camera moves fast.
   */
  distance_fade_length: float;
  /**
   * Energy multiplier for the emission texture. This will make the decal emit light at a higher or lower intensity, independently of the albedo color. See also {@link modulate}.
   */
  emission_energy: float;
  /**
   * Sets the curve over which the decal will fade as the surface gets further from the center of the {@link AABB}. Only positive values are valid (negative values will be clamped to `0.0`). See also {@link upper_fade}.
   */
  lower_fade: float;
  /**
   * Changes the {@link Color} of the Decal by multiplying the albedo and emission colors with this value. The alpha component is only taken into account when multiplying the albedo color, not the emission color. See also {@link emission_energy} and {@link albedo_mix} to change the emission and albedo intensity independently of each other.
   */
  modulate: Color;
  /**
   * Fades the Decal if the angle between the Decal's {@link AABB} and the target surface becomes too large. A value of `0` projects the Decal regardless of angle, a value of `1` limits the Decal to surfaces that are nearly perpendicular.
   * **Note:** Setting {@link normal_fade} to a value greater than `0.0` has a small performance cost due to the added normal angle computations.
   */
  normal_fade: float;
  /**
   * Sets the size of the {@link AABB} used by the decal. All dimensions must be set to a value greater than zero (they will be clamped to `0.001` if this is not the case). The AABB goes from `-size/2` to `size/2`.
   * **Note:** To improve culling efficiency of "hard surface" decals, set their {@link upper_fade} and {@link lower_fade} to `0.0` and set the Y component of the {@link size} as low as possible. This will reduce the decals' AABB size without affecting their appearance.
   */
  size: Vector3;
  /**
   * {@link Texture2D} with the base {@link Color} of the Decal. Either this or the {@link texture_emission} must be set for the Decal to be visible. Use the alpha channel like a mask to smoothly blend the edges of the decal with the underlying object.
   * **Note:** Unlike {@link BaseMaterial3D} whose filter mode can be adjusted on a per-material basis, the filter mode for {@link Decal} textures is set globally with {@link ProjectSettings.rendering/textures/decals/filter}.
   */
  texture_albedo: Texture2D | null;
  /**
   * {@link Texture2D} with the emission {@link Color} of the Decal. Either this or the {@link texture_albedo} must be set for the Decal to be visible. Use the alpha channel like a mask to smoothly blend the edges of the decal with the underlying object.
   * **Note:** Unlike {@link BaseMaterial3D} whose filter mode can be adjusted on a per-material basis, the filter mode for {@link Decal} textures is set globally with {@link ProjectSettings.rendering/textures/decals/filter}.
   */
  texture_emission: Texture2D | null;
  /**
   * {@link Texture2D} with the per-pixel normal map for the decal. Use this to add extra detail to decals.
   * **Note:** Unlike {@link BaseMaterial3D} whose filter mode can be adjusted on a per-material basis, the filter mode for {@link Decal} textures is set globally with {@link ProjectSettings.rendering/textures/decals/filter}.
   * **Note:** Setting this texture alone will not result in a visible decal, as {@link texture_albedo} must also be set. To create a normal-only decal, load an albedo texture into {@link texture_albedo} and set {@link albedo_mix} to `0.0`. The albedo texture's alpha channel will be used to determine where the underlying surface's normal map should be overridden (and its intensity).
   */
  texture_normal: Texture2D | null;
  /**
   * {@link Texture2D} storing ambient occlusion, roughness, and metallic for the decal. Use this to add extra detail to decals.
   * **Note:** Unlike {@link BaseMaterial3D} whose filter mode can be adjusted on a per-material basis, the filter mode for {@link Decal} textures is set globally with {@link ProjectSettings.rendering/textures/decals/filter}.
   * **Note:** Setting this texture alone will not result in a visible decal, as {@link texture_albedo} must also be set. To create an ORM-only decal, load an albedo texture into {@link texture_albedo} and set {@link albedo_mix} to `0.0`. The albedo texture's alpha channel will be used to determine where the underlying surface's ORM map should be overridden (and its intensity).
   * **Note:** Due to technical limitations, modifying the underlying surface's roughness using {@link texture_orm} does *not* affect screen-space reflections ({@link Environment.ssr_enabled}), reflections from {@link VoxelGI}, and reflections from SDFGI ({@link Environment.sdfgi_enabled}). Only reflections from {@link ReflectionProbe}s are affected.
   */
  texture_orm: Texture2D | null;
  /**
   * Sets the curve over which the decal will fade as the surface gets further from the center of the {@link AABB}. Only positive values are valid (negative values will be clamped to `0.0`). See also {@link lower_fade}.
   */
  upper_fade: float;
  set_albedo_mix(value: float): void;
  get_albedo_mix(): float;
  set_cull_mask(value: int): void;
  get_cull_mask(): int;
  set_distance_fade_begin(value: float): void;
  get_distance_fade_begin(): float;
  set_enable_distance_fade(value: boolean): void;
  is_distance_fade_enabled(): boolean;
  set_distance_fade_length(value: float): void;
  get_distance_fade_length(): float;
  set_emission_energy(value: float): void;
  get_emission_energy(): float;
  set_lower_fade(value: float): void;
  get_lower_fade(): float;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_normal_fade(value: float): void;
  get_normal_fade(): float;
  set_size(value: Vector3 | Vector3i): void;
  get_size(): Vector3;
  set_upper_fade(value: float): void;
  get_upper_fade(): float;

  /**
   * Returns the {@link Texture2D} associated with the specified {@link DecalTexture}. This is a convenience method, in most cases you should access the texture directly.
   * For example, instead of `albedo_tex = $Decal.get_texture(Decal.TEXTURE_ALBEDO)`, use `albedo_tex = $Decal.texture_albedo`.
   * One case where this is better than accessing the texture directly is when you want to copy one Decal's textures to another. For example:
   */
  get_texture(type_: int): Texture2D | null;
  /**
   * Sets the {@link Texture2D} associated with the specified {@link DecalTexture}. This is a convenience method, in most cases you should access the texture directly.
   * For example, instead of `$Decal.set_texture(Decal.TEXTURE_ALBEDO, albedo_tex)`, use `$Decal.texture_albedo = albedo_tex`.
   * One case where this is better than accessing the texture directly is when you want to copy one Decal's textures to another. For example:
   */
  set_texture(type_: int, texture: Texture2D): void;

  // enum DecalTexture
  /** {@link Texture2D} corresponding to {@link texture_albedo}. */
  static readonly TEXTURE_ALBEDO: int;
  /** {@link Texture2D} corresponding to {@link texture_normal}. */
  static readonly TEXTURE_NORMAL: int;
  /** {@link Texture2D} corresponding to {@link texture_orm}. */
  static readonly TEXTURE_ORM: int;
  /** {@link Texture2D} corresponding to {@link texture_emission}. */
  static readonly TEXTURE_EMISSION: int;
  /** Max size of {@link DecalTexture} enum. */
  static readonly TEXTURE_MAX: int;
}
