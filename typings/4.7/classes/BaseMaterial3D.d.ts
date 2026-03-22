// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract base class for defining the 3D rendering properties of meshes. */
declare class BaseMaterial3D extends Material {
  /**
   * The material's base color.
   * **Note:** If {@link detail_enabled} is `true` and a {@link detail_albedo} texture is specified, {@link albedo_color} will *not* modulate the detail texture. This can be used to color partial areas of a material by not specifying an albedo texture and using a transparent {@link detail_albedo} texture instead.
   */
  albedo_color: Color;
  /**
   * Texture to multiply by {@link albedo_color}. Used for basic texturing of objects.
   * If the texture appears unexpectedly too dark or too bright, check {@link albedo_texture_force_srgb}.
   */
  albedo_texture: Texture2D;
  /**
   * If `true`, forces a conversion of the {@link albedo_texture} from nonlinear sRGB encoding to linear encoding. See also {@link vertex_color_is_srgb}.
   * This should only be enabled when needed (typically when using a {@link ViewportTexture} as {@link albedo_texture}). If {@link albedo_texture_force_srgb} is `true` when it shouldn't be, the texture will appear to be too dark. If {@link albedo_texture_force_srgb} is `false` when it shouldn't be, the texture will appear to be too bright.
   */
  albedo_texture_force_srgb: boolean;
  /**
   * Enables multichannel signed distance field rendering shader. Use {@link msdf_pixel_range} and {@link msdf_outline_size} to configure MSDF parameters.
   */
  albedo_texture_msdf: boolean;
  /** Threshold at which antialiasing will be applied on the alpha channel. */
  alpha_antialiasing_edge: float;
  /** The type of alpha antialiasing to apply. */
  alpha_antialiasing_mode: int;
  /** The hashing scale for Alpha Hash. Recommended values between `0` and `2`. */
  alpha_hash_scale: float;
  /**
   * Threshold at which the alpha scissor will discard values. Higher values will result in more pixels being discarded. If the material becomes too opaque at a distance, try increasing {@link alpha_scissor_threshold}. If the material disappears at a distance, try decreasing {@link alpha_scissor_threshold}.
   */
  alpha_scissor_threshold: float;
  /**
   * The strength of the anisotropy effect. This is multiplied by {@link anisotropy_flowmap}'s alpha channel if a texture is defined there and the texture contains an alpha channel.
   */
  anisotropy: float;
  /**
   * If `true`, anisotropy is enabled. Anisotropy changes the shape of the specular blob and aligns it to tangent space. This is useful for brushed aluminum and hair reflections.
   * **Note:** Mesh tangents are needed for anisotropy to work. If the mesh does not contain tangents, the anisotropy effect will appear broken.
   * **Note:** Material anisotropy should not to be confused with anisotropic texture filtering, which can be enabled by setting {@link texture_filter} to {@link TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC}.
   */
  anisotropy_enabled: boolean;
  /**
   * Texture that offsets the tangent map for anisotropy calculations and optionally controls the anisotropy effect (if an alpha channel is present). The flowmap texture is expected to be a derivative map, with the red channel representing distortion on the X axis and green channel representing distortion on the Y axis. Values below 0.5 will result in negative distortion, whereas values above 0.5 will result in positive distortion.
   * If present, the texture's alpha channel will be used to multiply the strength of the {@link anisotropy} effect. Fully opaque pixels will keep the anisotropy effect's original strength while fully transparent pixels will disable the anisotropy effect entirely. The flowmap texture's blue channel is ignored.
   */
  anisotropy_flowmap: Texture2D;
  /**
   * If `true`, ambient occlusion is enabled. Ambient occlusion darkens areas based on the {@link ao_texture}.
   */
  ao_enabled: boolean;
  /**
   * Amount that ambient occlusion affects lighting from lights. If `0`, ambient occlusion only affects ambient light. If `1`, ambient occlusion affects lights just as much as it affects ambient light. This can be used to impact the strength of the ambient occlusion effect, but typically looks unrealistic.
   */
  ao_light_affect: float;
  /** If `true`, use `UV2` coordinates to look up from the {@link ao_texture}. */
  ao_on_uv2: boolean;
  /** Texture that defines the amount of ambient occlusion for a given point on the object. */
  ao_texture: Texture2D;
  /**
   * Specifies the channel of the {@link ao_texture} in which the ambient occlusion information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use.
   */
  ao_texture_channel: int;
  /** The color used by the backlight effect. Represents the light passing through an object. */
  backlight: Color;
  /** If `true`, the backlight effect is enabled. See also {@link subsurf_scatter_transmittance_enabled}. */
  backlight_enabled: boolean;
  /** Texture used to control the backlight effect per-pixel. Added to {@link backlight}. */
  backlight_texture: Texture2D;
  /**
   * If `true`, the bent normal map is enabled. This allows for more accurate indirect lighting and specular occlusion.
   */
  bent_normal_enabled: boolean;
  /**
   * Texture that specifies the average direction of incoming ambient light at a given pixel. The {@link bent_normal_texture} only uses the red and green channels; the blue and alpha channels are ignored. The normal read from {@link bent_normal_texture} is oriented around the surface normal provided by the {@link Mesh}.
   * **Note:** A bent normal map is different from a regular normal map. When baking a bent normal map make sure to use **a cosine distribution** for the bent normal map to work correctly.
   * **Note:** The mesh must have both normals and tangents defined in its vertex data. Otherwise, the shading produced by the bent normal map will not look correct. If creating geometry with {@link SurfaceTool}, you can use {@link SurfaceTool.generate_normals} and {@link SurfaceTool.generate_tangents} to automatically generate normals and tangents respectively.
   * **Note:** Godot expects the bent normal map to use X+, Y+, and Z+ coordinates. See this page (http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates) for a comparison of normal map coordinates expected by popular engines.
   */
  bent_normal_texture: Texture2D;
  /**
   * If `true`, the shader will keep the scale set for the mesh. Otherwise, the scale is lost when billboarding. Only applies when {@link billboard_mode} is not {@link BILLBOARD_DISABLED}.
   */
  billboard_keep_scale: boolean;
  /**
   * Controls how the object faces the camera.
   * **Note:** Billboard mode is not suitable for VR because the left-right vector of the camera is not horizontal when the screen is attached to your head instead of on the table. See GitHub issue #41567 (https://github.com/godotengine/godot/issues/41567) for details.
   */
  billboard_mode: int;
  /**
   * The material's blend mode.
   * **Note:** Values other than `Mix` force the object into the transparent pipeline.
   */
  blend_mode: int;
  /**
   * Sets the strength of the clearcoat effect. Setting to `0` looks the same as disabling the clearcoat effect.
   */
  clearcoat: float;
  /**
   * If `true`, clearcoat rendering is enabled. Adds a secondary transparent pass to the lighting calculation resulting in an added specular blob. This makes materials appear as if they have a clear layer on them that can be either glossy or rough.
   * **Note:** Clearcoat rendering is not visible if the material's {@link shading_mode} is {@link SHADING_MODE_UNSHADED}.
   */
  clearcoat_enabled: boolean;
  /**
   * Sets the roughness of the clearcoat pass. A higher value results in a rougher clearcoat while a lower value results in a smoother clearcoat.
   */
  clearcoat_roughness: float;
  /**
   * Texture that defines the strength of the clearcoat effect and the glossiness of the clearcoat. Strength is specified in the red channel while glossiness is specified in the green channel.
   */
  clearcoat_texture: Texture2D;
  /**
   * Determines which side of the triangle to cull depending on whether the triangle faces towards or away from the camera.
   */
  cull_mode: int;
  /** Determines when depth rendering takes place. See also {@link transparency}. */
  depth_draw_mode: int;
  /**
   * Determines which comparison operator is used when testing depth.
   * **Note:** Changing {@link depth_test} to a non-default value only has a visible effect when used on a transparent material, or a material that has {@link depth_draw_mode} set to {@link DEPTH_DRAW_DISABLED}.
   */
  depth_test: int;
  /**
   * Texture that specifies the color of the detail overlay. {@link detail_albedo}'s alpha channel is used as a mask, even when the material is opaque. To use a dedicated texture as a mask, see {@link detail_mask}.
   * **Note:** {@link detail_albedo} is *not* modulated by {@link albedo_color}.
   */
  detail_albedo: Texture2D;
  /** Specifies how the {@link detail_albedo} should blend with the current `ALBEDO`. */
  detail_blend_mode: int;
  /**
   * If `true`, enables the detail overlay. Detail is a second texture that gets mixed over the surface of the object based on {@link detail_mask} and {@link detail_albedo}'s alpha channel. This can be used to add variation to objects, or to blend between two different albedo/normal textures.
   */
  detail_enabled: boolean;
  /**
   * Texture used to specify how the detail textures get blended with the base textures. {@link detail_mask} can be used together with {@link detail_albedo}'s alpha channel (if any).
   */
  detail_mask: Texture2D;
  /**
   * Texture that specifies the per-pixel normal of the detail overlay. The {@link detail_normal} texture only uses the red and green channels; the blue and alpha channels are ignored. The normal read from {@link detail_normal} is oriented around the surface normal provided by the {@link Mesh}.
   * **Note:** Godot expects the normal map to use X+, Y+, and Z+ coordinates. See this page (http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates) for a comparison of normal map coordinates expected by popular engines.
   */
  detail_normal: Texture2D;
  /** Specifies whether to use `UV` or `UV2` for the detail layer. */
  detail_uv_layer: int;
  /** The algorithm used for diffuse light scattering. */
  diffuse_mode: int;
  /** If `true`, the object receives no ambient light. */
  disable_ambient_light: boolean;
  /**
   * If `true`, the object will not be affected by fog (neither volumetric nor depth fog). This is useful for unshaded or transparent materials (e.g. particles), which without this setting will be affected even if fully transparent.
   */
  disable_fog: boolean;
  /** If `true`, the object receives no shadow that would otherwise be cast onto it. */
  disable_receive_shadows: boolean;
  /**
   * If `true`, disables specular occlusion even if {@link ProjectSettings.rendering/reflections/specular_occlusion/enabled} is `false`.
   */
  disable_specular_occlusion: boolean;
  /**
   * Distance at which the object appears fully opaque.
   * **Note:** If {@link distance_fade_max_distance} is less than {@link distance_fade_min_distance}, the behavior will be reversed. The object will start to fade away at {@link distance_fade_max_distance} and will fully disappear once it reaches {@link distance_fade_min_distance}.
   */
  distance_fade_max_distance: float;
  /**
   * Distance at which the object starts to become visible. If the object is less than this distance away, it will be invisible.
   * **Note:** If {@link distance_fade_min_distance} is greater than {@link distance_fade_max_distance}, the behavior will be reversed. The object will start to fade away at {@link distance_fade_max_distance} and will fully disappear once it reaches {@link distance_fade_min_distance}.
   */
  distance_fade_min_distance: float;
  /** Specifies which type of fade to use. Can be any of the {@link DistanceFadeMode}s. */
  distance_fade_mode: int;
  /** The emitted light's color. See {@link emission_enabled}. */
  emission: Color;
  /**
   * If `true`, the body emits light. Emitting light makes the object appear brighter. The object can also cast light on other objects if a {@link VoxelGI}, SDFGI, or {@link LightmapGI} is used and this object is used in baked lighting.
   */
  emission_enabled: boolean;
  /** Multiplier for emitted light. See {@link emission_enabled}. */
  emission_energy_multiplier: float;
  /**
   * Luminance of emitted light, measured in nits (candela per square meter). Only available when {@link ProjectSettings.rendering/lights_and_shadows/use_physical_light_units} is enabled. The default is roughly equivalent to an indoor lightbulb.
   */
  emission_intensity: float;
  /** Use `UV2` to read from the {@link emission_texture}. */
  emission_on_uv2: boolean;
  /** Sets how {@link emission} interacts with {@link emission_texture}. Can either add or multiply. */
  emission_operator: int;
  /** Texture that specifies how much surface emits light at a given point. */
  emission_texture: Texture2D;
  /**
   * If `true`, the object is rendered at the same size regardless of distance. The object's size on screen is the same as if the camera was `1.0` units away from the object's origin, regardless of the actual distance from the camera. The {@link Camera3D}'s field of view (or {@link Camera3D.size} when in orthogonal/frustum mode) still affects the size the object is drawn at.
   */
  fixed_size: boolean;
  /**
   * Overrides the {@link Camera3D}'s field of view angle (in degrees).
   * **Note:** This behaves as if the field of view is set on a {@link Camera3D} with {@link Camera3D.keep_aspect} set to {@link Camera3D.KEEP_HEIGHT}. Additionally, it may not look correct on a non-perspective camera where the field of view setting is ignored.
   */
  fov_override: float;
  /**
   * If `true`, enables the vertex grow setting. This can be used to create mesh-based outlines using a second material pass and its {@link cull_mode} set to {@link CULL_FRONT}. See also {@link grow_amount}.
   * **Note:** Vertex growth cannot create new vertices, which means that visible gaps may occur in sharp corners. This can be alleviated by designing the mesh to use smooth normals exclusively using face weighted normals (http://wiki.polycount.com/wiki/Face_weighted_normals) in the 3D authoring software. In this case, grow will be able to join every outline together, just like in the original mesh.
   */
  grow: boolean;
  /** Grows object vertices in the direction of their normals. Only effective if {@link grow} is `true`. */
  grow_amount: float;
  /**
   * If `true`, uses parallax occlusion mapping to represent depth in the material instead of simple offset mapping (see {@link heightmap_enabled}). This results in a more convincing depth effect, but is much more expensive on the GPU. Only enable this on materials where it makes a significant visual difference.
   */
  heightmap_deep_parallax: boolean;
  /**
   * If `true`, height mapping is enabled (also called "parallax mapping" or "depth mapping"). See also {@link normal_enabled}. Height mapping is a demanding feature on the GPU, so it should only be used on materials where it makes a significant visual difference.
   * **Note:** Height mapping is not supported if triplanar mapping is used on the same material. The value of {@link heightmap_enabled} will be ignored if {@link uv1_triplanar} is enabled.
   */
  heightmap_enabled: boolean;
  /**
   * If `true`, flips the mesh's binormal vectors when interpreting the height map. If the heightmap effect looks strange when the camera moves (even with a reasonable {@link heightmap_scale}), try setting this to `true`.
   */
  heightmap_flip_binormal: boolean;
  /**
   * If `true`, flips the mesh's tangent vectors when interpreting the height map. If the heightmap effect looks strange when the camera moves (even with a reasonable {@link heightmap_scale}), try setting this to `true`.
   */
  heightmap_flip_tangent: boolean;
  /**
   * If `true`, interprets the height map texture as a depth map, with brighter values appearing to be "lower" in altitude compared to darker values.
   * This can be enabled for compatibility with some materials authored for Godot 3.x. This is not necessary if the Invert import option was used to invert the depth map in Godot 3.x, in which case {@link heightmap_flip_texture} should remain `false`.
   */
  heightmap_flip_texture: boolean;
  /**
   * The number of layers to use for parallax occlusion mapping when the camera is up close to the material. Higher values result in a more convincing depth effect, especially in materials that have steep height changes. Higher values have a significant cost on the GPU, so it should only be increased on materials where it makes a significant visual difference.
   * **Note:** Only effective if {@link heightmap_deep_parallax} is `true`.
   */
  heightmap_max_layers: int;
  /**
   * The number of layers to use for parallax occlusion mapping when the camera is far away from the material. Higher values result in a more convincing depth effect, especially in materials that have steep height changes. Higher values have a significant cost on the GPU, so it should only be increased on materials where it makes a significant visual difference.
   * **Note:** Only effective if {@link heightmap_deep_parallax} is `true`.
   */
  heightmap_min_layers: int;
  /**
   * The heightmap scale to use for the parallax effect (see {@link heightmap_enabled}). The default value is tuned so that the highest point (value = 255) appears to be 5 cm higher than the lowest point (value = 0). Higher values result in a deeper appearance, but may result in artifacts appearing when looking at the material from oblique angles, especially when the camera moves. Negative values can be used to invert the parallax effect, but this is different from inverting the texture using {@link heightmap_flip_texture} as the material will also appear to be "closer" to the camera. In most cases, {@link heightmap_scale} should be kept to a positive value.
   * **Note:** If the height map effect looks strange regardless of this value, try adjusting {@link heightmap_flip_binormal} and {@link heightmap_flip_tangent}. See also {@link heightmap_texture} for recommendations on authoring heightmap textures, as the way the heightmap texture is authored affects how {@link heightmap_scale} behaves.
   */
  heightmap_scale: float;
  /**
   * The texture to use as a height map. See also {@link heightmap_enabled}.
   * For best results, the texture should be normalized (with {@link heightmap_scale} reduced to compensate). In GIMP (https://gimp.org), this can be done using **Colors > Auto > Equalize**. If the texture only uses a small part of its available range, the parallax effect may look strange, especially when the camera moves.
   * **Note:** To reduce memory usage and improve loading times, you may be able to use a lower-resolution heightmap texture as most heightmaps are only comprised of low-frequency data.
   */
  heightmap_texture: Texture2D;
  /**
   * A high value makes the material appear more like a metal. Non-metals use their albedo as the diffuse color and add diffuse to the specular reflection. With non-metals, the reflection appears on top of the albedo color. Metals use their albedo as a multiplier to the specular reflection and set the diffuse color to black resulting in a tinted reflection. Materials work better when fully metal or fully non-metal, values between `0` and `1` should only be used for blending between metal and non-metal sections. To alter the amount of reflection use {@link roughness}.
   */
  metallic: float;
  /**
   * Adjusts the strength of specular reflections. Specular reflections are composed of scene reflections and the specular lobe which is the bright spot that is reflected from light sources. When set to `0.0`, no specular reflections will be visible. This differs from the {@link SPECULAR_DISABLED} {@link SpecularMode} as {@link SPECULAR_DISABLED} only applies to the specular lobe from the light source.
   * **Note:** Unlike {@link metallic}, this is not energy-conserving, so it should be left at `0.5` in most cases. See also {@link roughness}.
   */
  metallic_specular: float;
  /** Texture used to specify metallic for an object. This is multiplied by {@link metallic}. */
  metallic_texture: Texture2D;
  /**
   * Specifies the channel of the {@link metallic_texture} in which the metallic information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use.
   */
  metallic_texture_channel: int;
  /** The width of the shape outline. */
  msdf_outline_size: float;
  /**
   * The width of the range around the shape between the minimum and maximum representable signed distance.
   */
  msdf_pixel_range: float;
  /** If `true`, depth testing is disabled and the object will be drawn in render order. */
  no_depth_test: boolean;
  /**
   * If `true`, normal mapping is enabled. This has a slight performance cost, especially on mobile GPUs.
   */
  normal_enabled: boolean;
  /** The strength of the normal map's effect. */
  normal_scale: float;
  /**
   * Texture used to specify the normal at a given pixel. The {@link normal_texture} only uses the red and green channels; the blue and alpha channels are ignored. The normal read from {@link normal_texture} is oriented around the surface normal provided by the {@link Mesh}.
   * **Note:** The mesh must have both normals and tangents defined in its vertex data. Otherwise, the normal map won't render correctly and will only appear to darken the whole surface. If creating geometry with {@link SurfaceTool}, you can use {@link SurfaceTool.generate_normals} and {@link SurfaceTool.generate_tangents} to automatically generate normals and tangents respectively.
   * **Note:** Godot expects the normal map to use X+, Y+, and Z+ coordinates. See this page (http://wiki.polycount.com/wiki/Normal_Map_Technical_Details#Common_Swizzle_Coordinates) for a comparison of normal map coordinates expected by popular engines.
   * **Note:** If {@link detail_enabled} is `true`, the {@link detail_albedo} texture is drawn *below* the {@link normal_texture}. To display a normal map *above* the {@link detail_albedo} texture, use {@link detail_normal} instead.
   */
  normal_texture: Texture2D;
  /**
   * The Occlusion/Roughness/Metallic texture to use. This is a more efficient replacement of {@link ao_texture}, {@link roughness_texture} and {@link metallic_texture} in {@link ORMMaterial3D}. Ambient occlusion is stored in the red channel. Roughness map is stored in the green channel. Metallic map is stored in the blue channel. The alpha channel is ignored.
   */
  orm_texture: Texture2D;
  /**
   * The number of horizontal frames in the particle sprite sheet. Only enabled when using {@link BILLBOARD_PARTICLES}. See {@link billboard_mode}.
   */
  particles_anim_h_frames: int;
  /**
   * If `true`, particle animations are looped. Only enabled when using {@link BILLBOARD_PARTICLES}. See {@link billboard_mode}.
   */
  particles_anim_loop: boolean;
  /**
   * The number of vertical frames in the particle sprite sheet. Only enabled when using {@link BILLBOARD_PARTICLES}. See {@link billboard_mode}.
   */
  particles_anim_v_frames: int;
  /** The point size in pixels. See {@link use_point_size}. */
  point_size: float;
  /**
   * Distance over which the fade effect takes place. The larger the distance the longer it takes for an object to fade.
   */
  proximity_fade_distance: float;
  /**
   * If `true`, the proximity fade effect is enabled. The proximity fade effect fades out each pixel based on its distance to another object.
   */
  proximity_fade_enabled: boolean;
  /**
   * If `true`, the refraction effect is enabled. Distorts transparency based on light from behind the object.
   * **Note:** Refraction is implemented using the screen texture. Only opaque materials will appear in the refraction, since transparent materials do not appear in the screen texture.
   */
  refraction_enabled: boolean;
  /** The strength of the refraction effect. */
  refraction_scale: float;
  /**
   * Texture that controls the strength of the refraction per-pixel. Multiplied by {@link refraction_scale}.
   */
  refraction_texture: Texture2D;
  /**
   * Specifies the channel of the {@link refraction_texture} in which the refraction information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored refraction in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use.
   */
  refraction_texture_channel: int;
  /** Sets the strength of the rim lighting effect. */
  rim: float;
  /**
   * If `true`, rim effect is enabled. Rim lighting increases the brightness at glancing angles on an object.
   * **Note:** Rim lighting is not visible if the material's {@link shading_mode} is {@link SHADING_MODE_UNSHADED}.
   */
  rim_enabled: boolean;
  /** Texture used to set the strength of the rim lighting effect per-pixel. Multiplied by {@link rim}. */
  rim_texture: Texture2D;
  /**
   * The amount of to blend light and albedo color when rendering rim effect. If `0` the light color is used, while `1` means albedo color is used. An intermediate value generally works best.
   */
  rim_tint: float;
  /**
   * Surface reflection. A value of `0` represents a perfect mirror while a value of `1` completely blurs the reflection. See also {@link metallic}.
   */
  roughness: float;
  /** Texture used to control the roughness per-pixel. Multiplied by {@link roughness}. */
  roughness_texture: Texture2D;
  /**
   * Specifies the channel of the {@link roughness_texture} in which the roughness information is stored. This is useful when you store the information for multiple effects in a single texture. For example if you stored metallic in the red channel, roughness in the blue, and ambient occlusion in the green you could reduce the number of textures you use.
   */
  roughness_texture_channel: int;
  /**
   * Sets whether the shading takes place, per-pixel, per-vertex or unshaded. Per-vertex lighting is faster, making it the best choice for mobile applications, however it looks considerably worse than per-pixel. Unshaded rendering is the fastest, but disables all interactions with lights.
   */
  shading_mode: int;
  /**
   * If `true`, enables the "shadow to opacity" render mode where lighting modifies the alpha so shadowed areas are opaque and non-shadowed areas are transparent. Useful for overlaying shadows onto a camera feed in AR.
   */
  shadow_to_opacity: boolean;
  /**
   * The method for rendering the specular blob.
   * **Note:** {@link specular_mode} only applies to the specular blob. It does not affect specular reflections from the sky, screen-space reflections, {@link VoxelGI}, SDFGI or {@link ReflectionProbe}s. To disable reflections from these sources as well, set {@link metallic_specular} to `0.0` instead.
   */
  specular_mode: int;
  /** The primary color of the stencil effect. */
  stencil_color: Color;
  /** The comparison operator to use for stencil masking operations. */
  stencil_compare: int;
  /** The flags dictating how the stencil operation behaves. */
  stencil_flags: int;
  /** The stencil effect mode. */
  stencil_mode: int;
  /** The outline thickness for {@link STENCIL_MODE_OUTLINE}. */
  stencil_outline_thickness: float;
  /** The stencil reference value (0-255). Typically a power of 2. */
  stencil_reference: int;
  /**
   * If `true`, subsurface scattering is enabled. Emulates light that penetrates an object's surface, is scattered, and then emerges. Subsurface scattering quality is controlled by {@link ProjectSettings.rendering/environment/subsurface_scattering/subsurface_scattering_quality}.
   * **Note:** Subsurface scattering is not supported on viewports that have a transparent background (where {@link Viewport.transparent_bg} is `true`).
   */
  subsurf_scatter_enabled: boolean;
  /**
   * If `true`, subsurface scattering will use a special mode optimized for the color and density of human skin, such as boosting the intensity of the red channel in subsurface scattering.
   */
  subsurf_scatter_skin_mode: boolean;
  /**
   * The strength of the subsurface scattering effect. The depth of the effect is also controlled by {@link ProjectSettings.rendering/environment/subsurface_scattering/subsurface_scattering_scale}, which is set globally.
   */
  subsurf_scatter_strength: float;
  /**
   * Texture used to control the subsurface scattering strength. Stored in the red texture channel. Multiplied by {@link subsurf_scatter_strength}.
   */
  subsurf_scatter_texture: Texture2D;
  /** The intensity of the subsurface scattering transmittance effect. */
  subsurf_scatter_transmittance_boost: float;
  /**
   * The color to multiply the subsurface scattering transmittance effect with. Ignored if {@link subsurf_scatter_skin_mode} is `true`.
   */
  subsurf_scatter_transmittance_color: Color;
  /** The depth of the subsurface scattering transmittance effect. */
  subsurf_scatter_transmittance_depth: float;
  /**
   * If `true`, enables subsurface scattering transmittance. Only effective if {@link subsurf_scatter_enabled} is `true`. See also {@link backlight_enabled}.
   */
  subsurf_scatter_transmittance_enabled: boolean;
  /**
   * The texture to use for multiplying the intensity of the subsurface scattering transmittance intensity. See also {@link subsurf_scatter_texture}. Ignored if {@link subsurf_scatter_skin_mode} is `true`.
   */
  subsurf_scatter_transmittance_texture: Texture2D;
  /**
   * Filter flags for the texture.
   * **Note:** {@link heightmap_texture} is always sampled with linear filtering, even if nearest-neighbor filtering is selected here. This is to ensure the heightmap effect looks as intended. If you need sharper height transitions between pixels, resize the heightmap texture in an image editor with nearest-neighbor filtering.
   */
  texture_filter: int;
  /**
   * If `true`, the texture repeats when exceeding the texture's size. See {@link FLAG_USE_TEXTURE_REPEAT}.
   */
  texture_repeat: boolean;
  /**
   * The material's transparency mode. Some transparency modes will disable shadow casting. Any transparency mode other than {@link TRANSPARENCY_DISABLED} has a greater performance impact compared to opaque rendering. See also {@link blend_mode}.
   */
  transparency: int;
  /** If `true` use {@link fov_override} to override the {@link Camera3D}'s field of view angle. */
  use_fov_override: boolean;
  /**
   * If `true`, enables parts of the shader required for {@link GPUParticles3D} trails to function. This also requires using a mesh with appropriate skinning, such as {@link RibbonTrailMesh} or {@link TubeTrailMesh}. Enabling this feature outside of materials used in {@link GPUParticles3D} meshes will break material rendering.
   */
  use_particle_trails: boolean;
  /**
   * If `true`, render point size can be changed.
   * **Note:** This is only effective for objects whose geometry is point-based rather than triangle-based. See also {@link point_size}.
   */
  use_point_size: boolean;
  /**
   * If `true` use {@link z_clip_scale} to scale the object being rendered towards the camera to avoid clipping into things like walls.
   */
  use_z_clip_scale: boolean;
  /**
   * How much to offset the `UV` coordinates. This amount will be added to `UV` in the vertex function. This can be used to offset a texture. The Z component is used when {@link uv1_triplanar} is enabled, but it is not used anywhere else.
   */
  uv1_offset: Vector3;
  /**
   * How much to scale the `UV` coordinates. This is multiplied by `UV` in the vertex function. The Z component is used when {@link uv1_triplanar} is enabled, but it is not used anywhere else.
   */
  uv1_scale: Vector3;
  /**
   * If `true`, instead of using `UV` textures will use a triplanar texture lookup to determine how to apply textures. Triplanar uses the orientation of the object's surface to blend between texture coordinates. It reads from the source texture 3 times, once for each axis and then blends between the results based on how closely the pixel aligns with each axis. This is often used for natural features to get a realistic blend of materials. Because triplanar texturing requires many more texture reads per-pixel it is much slower than normal UV texturing. Additionally, because it is blending the texture between the three axes, it is unsuitable when you are trying to achieve crisp texturing.
   */
  uv1_triplanar: boolean;
  /**
   * A lower number blends the texture more softly while a higher number blends the texture more sharply.
   * **Note:** {@link uv1_triplanar_sharpness} is clamped between `0.0` and `150.0` (inclusive) as values outside that range can look broken depending on the mesh.
   */
  uv1_triplanar_sharpness: float;
  /**
   * If `true`, triplanar mapping for `UV` is calculated in world space rather than object local space. See also {@link uv1_triplanar}.
   */
  uv1_world_triplanar: boolean;
  /**
   * How much to offset the `UV2` coordinates. This amount will be added to `UV2` in the vertex function. This can be used to offset a texture. The Z component is used when {@link uv2_triplanar} is enabled, but it is not used anywhere else.
   */
  uv2_offset: Vector3;
  /**
   * How much to scale the `UV2` coordinates. This is multiplied by `UV2` in the vertex function. The Z component is used when {@link uv2_triplanar} is enabled, but it is not used anywhere else.
   */
  uv2_scale: Vector3;
  /**
   * If `true`, instead of using `UV2` textures will use a triplanar texture lookup to determine how to apply textures. Triplanar uses the orientation of the object's surface to blend between texture coordinates. It reads from the source texture 3 times, once for each axis and then blends between the results based on how closely the pixel aligns with each axis. This is often used for natural features to get a realistic blend of materials. Because triplanar texturing requires many more texture reads per-pixel it is much slower than normal UV texturing. Additionally, because it is blending the texture between the three axes, it is unsuitable when you are trying to achieve crisp texturing.
   */
  uv2_triplanar: boolean;
  /**
   * A lower number blends the texture more softly while a higher number blends the texture more sharply.
   * **Note:** {@link uv2_triplanar_sharpness} is clamped between `0.0` and `150.0` (inclusive) as values outside that range can look broken depending on the mesh.
   */
  uv2_triplanar_sharpness: float;
  /**
   * If `true`, triplanar mapping for `UV2` is calculated in world space rather than object local space. See also {@link uv2_triplanar}.
   */
  uv2_world_triplanar: boolean;
  /**
   * If `true`, vertex colors are considered to be stored in nonlinear sRGB encoding and are converted to linear encoding during rendering. If `false`, vertex colors are considered to be stored in linear encoding and are rendered as-is. See also {@link albedo_texture_force_srgb}.
   * **Note:** Only effective when using the Forward+ and Mobile rendering methods, not Compatibility.
   */
  vertex_color_is_srgb: boolean;
  /** If `true`, the vertex color is used as albedo color. */
  vertex_color_use_as_albedo: boolean;
  /**
   * Scales the object being rendered towards the camera to avoid clipping into things like walls. This is intended to be used for objects that are fixed with respect to the camera like player arms, tools, etc. Lighting and shadows will continue to work correctly when this setting is adjusted, but screen-space effects like SSAO and SSR may break with lower scales. Therefore, try to keep this setting as close to `1.0` as possible.
   */
  z_clip_scale: float;
  set_albedo(value: Color): void;
  get_albedo(): Color;
  set_alpha_antialiasing_edge(value: float): void;
  get_alpha_antialiasing_edge(): float;
  set_alpha_antialiasing(value: int): void;
  get_alpha_antialiasing(): int;
  set_alpha_hash_scale(value: float): void;
  get_alpha_hash_scale(): float;
  set_alpha_scissor_threshold(value: float): void;
  get_alpha_scissor_threshold(): float;
  set_anisotropy(value: float): void;
  get_anisotropy(): float;
  set_ao_light_affect(value: float): void;
  get_ao_light_affect(): float;
  set_ao_texture_channel(value: int): void;
  get_ao_texture_channel(): int;
  set_backlight(value: Color): void;
  get_backlight(): Color;
  set_billboard_mode(value: int): void;
  get_billboard_mode(): int;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;
  set_clearcoat(value: float): void;
  get_clearcoat(): float;
  set_clearcoat_roughness(value: float): void;
  get_clearcoat_roughness(): float;
  set_cull_mode(value: int): void;
  get_cull_mode(): int;
  set_depth_draw_mode(value: int): void;
  get_depth_draw_mode(): int;
  set_depth_test(value: int): void;
  get_depth_test(): int;
  set_detail_blend_mode(value: int): void;
  get_detail_blend_mode(): int;
  set_detail_uv(value: int): void;
  get_detail_uv(): int;
  set_diffuse_mode(value: int): void;
  get_diffuse_mode(): int;
  set_distance_fade_max_distance(value: float): void;
  get_distance_fade_max_distance(): float;
  set_distance_fade_min_distance(value: float): void;
  get_distance_fade_min_distance(): float;
  set_distance_fade(value: int): void;
  get_distance_fade(): int;
  set_emission(value: Color): void;
  get_emission(): Color;
  set_emission_energy_multiplier(value: float): void;
  get_emission_energy_multiplier(): float;
  set_emission_intensity(value: float): void;
  get_emission_intensity(): float;
  set_emission_operator(value: int): void;
  get_emission_operator(): int;
  set_fov_override(value: float): void;
  get_fov_override(): float;
  set_grow_enabled(value: boolean): void;
  is_grow_enabled(): boolean;
  set_grow(value: float): void;
  get_grow(): float;
  set_heightmap_deep_parallax(value: boolean): void;
  is_heightmap_deep_parallax_enabled(): boolean;
  set_heightmap_deep_parallax_flip_binormal(value: boolean): void;
  get_heightmap_deep_parallax_flip_binormal(): boolean;
  set_heightmap_deep_parallax_flip_tangent(value: boolean): void;
  get_heightmap_deep_parallax_flip_tangent(): boolean;
  set_heightmap_deep_parallax_max_layers(value: int): void;
  get_heightmap_deep_parallax_max_layers(): int;
  set_heightmap_deep_parallax_min_layers(value: int): void;
  get_heightmap_deep_parallax_min_layers(): int;
  set_heightmap_scale(value: float): void;
  get_heightmap_scale(): float;
  set_metallic(value: float): void;
  get_metallic(): float;
  set_specular(value: float): void;
  get_specular(): float;
  set_metallic_texture_channel(value: int): void;
  get_metallic_texture_channel(): int;
  set_msdf_outline_size(value: float): void;
  get_msdf_outline_size(): float;
  set_msdf_pixel_range(value: float): void;
  get_msdf_pixel_range(): float;
  set_normal_scale(value: float): void;
  get_normal_scale(): float;
  set_particles_anim_h_frames(value: int): void;
  get_particles_anim_h_frames(): int;
  set_particles_anim_loop(value: boolean): void;
  get_particles_anim_loop(): boolean;
  set_particles_anim_v_frames(value: int): void;
  get_particles_anim_v_frames(): int;
  set_point_size(value: float): void;
  get_point_size(): float;
  set_proximity_fade_distance(value: float): void;
  get_proximity_fade_distance(): float;
  set_proximity_fade_enabled(value: boolean): void;
  is_proximity_fade_enabled(): boolean;
  set_refraction(value: float): void;
  get_refraction(): float;
  set_refraction_texture_channel(value: int): void;
  get_refraction_texture_channel(): int;
  set_rim(value: float): void;
  get_rim(): float;
  set_rim_tint(value: float): void;
  get_rim_tint(): float;
  set_roughness(value: float): void;
  get_roughness(): float;
  set_roughness_texture_channel(value: int): void;
  get_roughness_texture_channel(): int;
  set_shading_mode(value: int): void;
  get_shading_mode(): int;
  set_specular_mode(value: int): void;
  get_specular_mode(): int;
  set_stencil_effect_color(value: Color): void;
  get_stencil_effect_color(): Color;
  set_stencil_compare(value: int): void;
  get_stencil_compare(): int;
  set_stencil_flags(value: int): void;
  get_stencil_flags(): int;
  set_stencil_mode(value: int): void;
  get_stencil_mode(): int;
  set_stencil_effect_outline_thickness(value: float): void;
  get_stencil_effect_outline_thickness(): float;
  set_stencil_reference(value: int): void;
  get_stencil_reference(): int;
  set_subsurface_scattering_strength(value: float): void;
  get_subsurface_scattering_strength(): float;
  set_transmittance_boost(value: float): void;
  get_transmittance_boost(): float;
  set_transmittance_color(value: Color): void;
  get_transmittance_color(): Color;
  set_transmittance_depth(value: float): void;
  get_transmittance_depth(): float;
  set_texture_filter(value: int): void;
  get_texture_filter(): int;
  set_transparency(value: int): void;
  get_transparency(): int;
  set_uv1_offset(value: Vector3): void;
  get_uv1_offset(): Vector3;
  set_uv1_scale(value: Vector3): void;
  get_uv1_scale(): Vector3;
  set_uv1_triplanar_blend_sharpness(value: float): void;
  get_uv1_triplanar_blend_sharpness(): float;
  set_uv2_offset(value: Vector3): void;
  get_uv2_offset(): Vector3;
  set_uv2_scale(value: Vector3): void;
  get_uv2_scale(): Vector3;
  set_uv2_triplanar_blend_sharpness(value: float): void;
  get_uv2_triplanar_blend_sharpness(): float;
  set_z_clip_scale(value: float): void;
  get_z_clip_scale(): float;

  /** Returns `true` if the specified `feature` is enabled. */
  get_feature(feature: int): boolean;
  /** Returns `true` if the specified `flag` is enabled. */
  get_flag(flag: int): boolean;
  /** Returns the {@link Texture2D} associated with the specified texture `param`. */
  get_texture(param: int): Texture2D;
  /**
   * If `enable` is `true`, enables the specified `feature`. Many features that are available in {@link BaseMaterial3D} need to be enabled before use. This way, the cost for using the feature is only incurred when specified. Features can also be enabled by setting their corresponding property to `true`.
   */
  set_feature(feature: int, enable: boolean): void;
  /**
   * If `enable` is `true`, enables the specified `flag`. Flags are optional behavior that can be turned on and off. Only one flag can be enabled at a time with this function, the flag enumerators cannot be bit-masked together to enable or disable multiple flags at once. Flags can also be enabled by setting their corresponding property to `true`.
   */
  set_flag(flag: int, enable: boolean): void;
  /** Sets the texture for the slot specified by `param`. */
  set_texture(param: int, texture: Texture2D): void;

  // enum TextureParam
  /** Texture specifying per-pixel color. */
  static readonly TEXTURE_ALBEDO: int;
  /** Texture specifying per-pixel metallic value. */
  static readonly TEXTURE_METALLIC: int;
  /** Texture specifying per-pixel roughness value. */
  static readonly TEXTURE_ROUGHNESS: int;
  /** Texture specifying per-pixel emission color. */
  static readonly TEXTURE_EMISSION: int;
  /** Texture specifying per-pixel normal vector. */
  static readonly TEXTURE_NORMAL: int;
  /** Texture specifying per-pixel bent normal vector. */
  static readonly TEXTURE_BENT_NORMAL: int;
  /** Texture specifying per-pixel rim value. */
  static readonly TEXTURE_RIM: int;
  /** Texture specifying per-pixel clearcoat value. */
  static readonly TEXTURE_CLEARCOAT: int;
  /** Texture specifying per-pixel flowmap direction for use with {@link anisotropy}. */
  static readonly TEXTURE_FLOWMAP: int;
  /** Texture specifying per-pixel ambient occlusion value. */
  static readonly TEXTURE_AMBIENT_OCCLUSION: int;
  /** Texture specifying per-pixel height. */
  static readonly TEXTURE_HEIGHTMAP: int;
  /** Texture specifying per-pixel subsurface scattering. */
  static readonly TEXTURE_SUBSURFACE_SCATTERING: int;
  /** Texture specifying per-pixel transmittance for subsurface scattering. */
  static readonly TEXTURE_SUBSURFACE_TRANSMITTANCE: int;
  /** Texture specifying per-pixel backlight color. */
  static readonly TEXTURE_BACKLIGHT: int;
  /** Texture specifying per-pixel refraction strength. */
  static readonly TEXTURE_REFRACTION: int;
  /** Texture specifying per-pixel detail mask blending value. */
  static readonly TEXTURE_DETAIL_MASK: int;
  /** Texture specifying per-pixel detail color. */
  static readonly TEXTURE_DETAIL_ALBEDO: int;
  /** Texture specifying per-pixel detail normal. */
  static readonly TEXTURE_DETAIL_NORMAL: int;
  /** Texture holding ambient occlusion, roughness, and metallic. */
  static readonly TEXTURE_ORM: int;
  /** Represents the size of the {@link TextureParam} enum. */
  static readonly TEXTURE_MAX: int;
  // enum TextureFilter
  /**
   * The texture filter reads from the nearest pixel only. This makes the texture look pixelated from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly TEXTURE_FILTER_NEAREST: int;
  /**
   * The texture filter blends between the nearest 4 pixels. This makes the texture look smooth from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly TEXTURE_FILTER_LINEAR: int;
  /**
   * The texture filter reads from the nearest pixel and blends between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look pixelated from up close, and smooth from a distance.
   */
  static readonly TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: int;
  /**
   * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look smooth from up close, and smooth from a distance.
   */
  static readonly TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: int;
  /**
   * The texture filter reads from the nearest pixel and blends between 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`) based on the angle between the surface and the camera view. This makes the texture look pixelated from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting {@link ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level}.
   */
  static readonly TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC: int;
  /**
   * The texture filter blends between the nearest 4 pixels and blends between 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`) based on the angle between the surface and the camera view. This makes the texture look smooth from up close, and smooth from a distance. Anisotropic filtering improves texture quality on surfaces that are almost in line with the camera, but is slightly slower. The anisotropic filtering level can be changed by adjusting {@link ProjectSettings.rendering/textures/default_filters/anisotropic_filtering_level}.
   */
  static readonly TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC: int;
  /** Represents the size of the {@link TextureFilter} enum. */
  static readonly TEXTURE_FILTER_MAX: int;
  // enum DetailUV
  /** Use `UV` with the detail texture. */
  static readonly DETAIL_UV_1: int;
  /** Use `UV2` with the detail texture. */
  static readonly DETAIL_UV_2: int;
  // enum Transparency
  /** The material will not use transparency. This is the fastest to render. */
  static readonly TRANSPARENCY_DISABLED: int;
  /**
   * The material will use the texture's alpha values for transparency. This is the slowest to render, and disables shadow casting.
   */
  static readonly TRANSPARENCY_ALPHA: int;
  /**
   * The material will cut off all values below a threshold, the rest will remain opaque. The opaque portions will be rendered in the depth prepass. This is faster to render than alpha blending, but slower than opaque rendering. This also supports casting shadows.
   */
  static readonly TRANSPARENCY_ALPHA_SCISSOR: int;
  /**
   * The material will cut off all values below a spatially-deterministic threshold, the rest will remain opaque. This is faster to render than alpha blending, but slower than opaque rendering. This also supports casting shadows. Alpha hashing is suited for hair rendering.
   */
  static readonly TRANSPARENCY_ALPHA_HASH: int;
  /**
   * The material will use the texture's alpha value for transparency, but will discard fragments with an alpha of less than 0.99 during the depth prepass and fragments with an alpha less than 0.1 during the shadow pass. This also supports casting shadows.
   */
  static readonly TRANSPARENCY_ALPHA_DEPTH_PRE_PASS: int;
  /** Represents the size of the {@link Transparency} enum. */
  static readonly TRANSPARENCY_MAX: int;
  // enum ShadingMode
  /**
   * The object will not receive shadows. This is the fastest to render, but it disables all interactions with lights.
   */
  static readonly SHADING_MODE_UNSHADED: int;
  /** The object will be shaded per pixel. Useful for realistic shading effects. */
  static readonly SHADING_MODE_PER_PIXEL: int;
  /**
   * The object will be shaded per vertex. Useful when you want cheaper shaders and do not care about visual quality.
   */
  static readonly SHADING_MODE_PER_VERTEX: int;
  /** Represents the size of the {@link ShadingMode} enum. */
  static readonly SHADING_MODE_MAX: int;
  // enum Feature
  /** Constant for setting {@link emission_enabled}. */
  static readonly FEATURE_EMISSION: int;
  /** Constant for setting {@link normal_enabled}. */
  static readonly FEATURE_NORMAL_MAPPING: int;
  /** Constant for setting {@link rim_enabled}. */
  static readonly FEATURE_RIM: int;
  /** Constant for setting {@link clearcoat_enabled}. */
  static readonly FEATURE_CLEARCOAT: int;
  /** Constant for setting {@link anisotropy_enabled}. */
  static readonly FEATURE_ANISOTROPY: int;
  /** Constant for setting {@link ao_enabled}. */
  static readonly FEATURE_AMBIENT_OCCLUSION: int;
  /** Constant for setting {@link heightmap_enabled}. */
  static readonly FEATURE_HEIGHT_MAPPING: int;
  /** Constant for setting {@link subsurf_scatter_enabled}. */
  static readonly FEATURE_SUBSURFACE_SCATTERING: int;
  /** Constant for setting {@link subsurf_scatter_transmittance_enabled}. */
  static readonly FEATURE_SUBSURFACE_TRANSMITTANCE: int;
  /** Constant for setting {@link backlight_enabled}. */
  static readonly FEATURE_BACKLIGHT: int;
  /** Constant for setting {@link refraction_enabled}. */
  static readonly FEATURE_REFRACTION: int;
  /** Constant for setting {@link detail_enabled}. */
  static readonly FEATURE_DETAIL: int;
  /** Constant for setting {@link bent_normal_enabled}. */
  static readonly FEATURE_BENT_NORMAL_MAPPING: int;
  /** Represents the size of the {@link Feature} enum. */
  static readonly FEATURE_MAX: int;
  // enum BlendMode
  /**
   * Default blend mode. The color of the object is blended over the background based on the object's alpha value.
   */
  static readonly BLEND_MODE_MIX: int;
  /** The color of the object is added to the background. */
  static readonly BLEND_MODE_ADD: int;
  /** The color of the object is subtracted from the background. */
  static readonly BLEND_MODE_SUB: int;
  /** The color of the object is multiplied by the background. */
  static readonly BLEND_MODE_MUL: int;
  /**
   * The color of the object is added to the background and the alpha channel is used to mask out the background. This is effectively a hybrid of the blend mix and add modes, useful for effects like fire where you want the flame to add but the smoke to mix. By default, this works with unshaded materials using premultiplied textures. For shaded materials, use the `PREMUL_ALPHA_FACTOR` built-in so that lighting can be modulated as well.
   */
  static readonly BLEND_MODE_PREMULT_ALPHA: int;
  // enum AlphaAntiAliasing
  /** Disables Alpha AntiAliasing for the material. */
  static readonly ALPHA_ANTIALIASING_OFF: int;
  /** Enables AlphaToCoverage. Alpha values in the material are passed to the AntiAliasing sample mask. */
  static readonly ALPHA_ANTIALIASING_ALPHA_TO_COVERAGE: int;
  /**
   * Enables AlphaToCoverage and forces all non-zero alpha values to `1`. Alpha values in the material are passed to the AntiAliasing sample mask.
   */
  static readonly ALPHA_ANTIALIASING_ALPHA_TO_COVERAGE_AND_TO_ONE: int;
  // enum DepthDrawMode
  /**
   * Default depth draw mode. Depth is drawn only for opaque objects during the opaque prepass (if any) and during the opaque pass.
   */
  static readonly DEPTH_DRAW_OPAQUE_ONLY: int;
  /**
   * Objects will write to depth during the opaque and the transparent passes. Transparent objects that are close to the camera may obscure other transparent objects behind them.
   * **Note:** This does not influence whether transparent objects are included in the depth prepass or not. For that, see {@link Transparency}.
   */
  static readonly DEPTH_DRAW_ALWAYS: int;
  /** Objects will not write their depth to the depth buffer, even during the depth prepass (if enabled). */
  static readonly DEPTH_DRAW_DISABLED: int;
  // enum DepthTest
  /** Depth test will discard the pixel if it is behind other pixels. */
  static readonly DEPTH_TEST_DEFAULT: int;
  /** Depth test will discard the pixel if it is in front of other pixels. Useful for stencil effects. */
  static readonly DEPTH_TEST_INVERTED: int;
  // enum CullMode
  /**
   * Default cull mode. The back of the object is culled when not visible. Back face triangles will be culled when facing the camera. This results in only the front side of triangles being drawn. For closed-surface meshes, this means that only the exterior of the mesh will be visible.
   */
  static readonly CULL_BACK: int;
  /**
   * Front face triangles will be culled when facing the camera. This results in only the back side of triangles being drawn. For closed-surface meshes, this means that the interior of the mesh will be drawn instead of the exterior.
   */
  static readonly CULL_FRONT: int;
  /** No face culling is performed; both the front face and back face will be visible. */
  static readonly CULL_DISABLED: int;
  // enum Flags
  /**
   * Disables the depth test, so this object is drawn on top of all others drawn before it. This puts the object in the transparent draw pass where it is sorted based on distance to camera. Objects drawn after it in the draw order may cover it. This also disables writing to depth.
   */
  static readonly FLAG_DISABLE_DEPTH_TEST: int;
  /** Set `ALBEDO` to the per-vertex color specified in the mesh. */
  static readonly FLAG_ALBEDO_FROM_VERTEX_COLOR: int;
  /**
   * Vertex colors are considered to be stored in nonlinear sRGB encoding and are converted to linear encoding during rendering. See also {@link vertex_color_is_srgb}.
   * **Note:** Only effective when using the Forward+ and Mobile rendering methods.
   */
  static readonly FLAG_SRGB_VERTEX_COLOR: int;
  /**
   * Uses point size to alter the size of primitive points. Also changes the albedo texture lookup to use `POINT_COORD` instead of `UV`.
   */
  static readonly FLAG_USE_POINT_SIZE: int;
  /** Object is scaled by depth so that it always appears the same size on screen. */
  static readonly FLAG_FIXED_SIZE: int;
  /**
   * Shader will keep the scale set for the mesh. Otherwise the scale is lost when billboarding. Only applies when {@link billboard_mode} is {@link BILLBOARD_ENABLED}.
   */
  static readonly FLAG_BILLBOARD_KEEP_SCALE: int;
  /** Use triplanar texture lookup for all texture lookups that would normally use `UV`. */
  static readonly FLAG_UV1_USE_TRIPLANAR: int;
  /** Use triplanar texture lookup for all texture lookups that would normally use `UV2`. */
  static readonly FLAG_UV2_USE_TRIPLANAR: int;
  /** Use triplanar texture lookup for all texture lookups that would normally use `UV`. */
  static readonly FLAG_UV1_USE_WORLD_TRIPLANAR: int;
  /** Use triplanar texture lookup for all texture lookups that would normally use `UV2`. */
  static readonly FLAG_UV2_USE_WORLD_TRIPLANAR: int;
  /** Use `UV2` coordinates to look up from the {@link ao_texture}. */
  static readonly FLAG_AO_ON_UV2: int;
  /** Use `UV2` coordinates to look up from the {@link emission_texture}. */
  static readonly FLAG_EMISSION_ON_UV2: int;
  /**
   * Forces the shader to convert albedo from nonlinear sRGB encoding to linear encoding. See also {@link albedo_texture_force_srgb}.
   */
  static readonly FLAG_ALBEDO_TEXTURE_FORCE_SRGB: int;
  /** Disables receiving shadows from other objects. */
  static readonly FLAG_DONT_RECEIVE_SHADOWS: int;
  /** Disables receiving ambient light. */
  static readonly FLAG_DISABLE_AMBIENT_LIGHT: int;
  /** Enables the shadow to opacity feature. */
  static readonly FLAG_USE_SHADOW_TO_OPACITY: int;
  /**
   * Enables the texture to repeat when UV coordinates are outside the 0-1 range. If using one of the linear filtering modes, this can result in artifacts at the edges of a texture when the sampler filters across the edges of the texture.
   */
  static readonly FLAG_USE_TEXTURE_REPEAT: int;
  /** Invert values read from a depth texture to convert them to height values (heightmap). */
  static readonly FLAG_INVERT_HEIGHTMAP: int;
  /**
   * Enables the skin mode for subsurface scattering which is used to improve the look of subsurface scattering when used for human skin.
   */
  static readonly FLAG_SUBSURFACE_MODE_SKIN: int;
  /**
   * Enables parts of the shader required for {@link GPUParticles3D} trails to function. This also requires using a mesh with appropriate skinning, such as {@link RibbonTrailMesh} or {@link TubeTrailMesh}. Enabling this feature outside of materials used in {@link GPUParticles3D} meshes will break material rendering.
   */
  static readonly FLAG_PARTICLE_TRAILS_MODE: int;
  /** Enables multichannel signed distance field rendering shader. */
  static readonly FLAG_ALBEDO_TEXTURE_MSDF: int;
  /** Disables receiving depth-based or volumetric fog. */
  static readonly FLAG_DISABLE_FOG: int;
  /** Disables specular occlusion. */
  static readonly FLAG_DISABLE_SPECULAR_OCCLUSION: int;
  /** Enables using {@link z_clip_scale}. */
  static readonly FLAG_USE_Z_CLIP_SCALE: int;
  /** Enables using {@link fov_override}. */
  static readonly FLAG_USE_FOV_OVERRIDE: int;
  /** Represents the size of the {@link Flags} enum. */
  static readonly FLAG_MAX: int;
  // enum DiffuseMode
  /** Default diffuse scattering algorithm. */
  static readonly DIFFUSE_BURLEY: int;
  /** Diffuse scattering ignores roughness. */
  static readonly DIFFUSE_LAMBERT: int;
  /** Extends Lambert to cover more than 90 degrees when roughness increases. */
  static readonly DIFFUSE_LAMBERT_WRAP: int;
  /** Uses a hard cut for lighting, with smoothing affected by roughness. */
  static readonly DIFFUSE_TOON: int;
  // enum SpecularMode
  /**
   * Default specular blob.
   * **Note:** Forward+ uses multiscattering for more accurate reflections, although the impact of multiscattering is more noticeable on rough metallic surfaces than on smooth, non-metallic surfaces.
   * **Note:** Mobile and Compatibility don't perform multiscattering for performance reasons. Instead, they perform single scattering, which means rough metallic surfaces may look slightly darker than intended.
   */
  static readonly SPECULAR_SCHLICK_GGX: int;
  /** Toon blob which changes size based on roughness. */
  static readonly SPECULAR_TOON: int;
  /** No specular blob. This is slightly faster to render than other specular modes. */
  static readonly SPECULAR_DISABLED: int;
  // enum BillboardMode
  /** Billboard mode is disabled. */
  static readonly BILLBOARD_DISABLED: int;
  /** The object's Z axis will always face the camera. */
  static readonly BILLBOARD_ENABLED: int;
  /** The object's X axis will always face the camera. */
  static readonly BILLBOARD_FIXED_Y: int;
  /**
   * Used for particle systems when assigned to {@link GPUParticles3D} and {@link CPUParticles3D} nodes (flipbook animation). Enables `particles_anim_*` properties.
   * The {@link ParticleProcessMaterial.anim_speed_min} or {@link CPUParticles3D.anim_speed_min} should also be set to a value bigger than zero for the animation to play.
   */
  static readonly BILLBOARD_PARTICLES: int;
  // enum TextureChannel
  /** Used to read from the red channel of a texture. */
  static readonly TEXTURE_CHANNEL_RED: int;
  /** Used to read from the green channel of a texture. */
  static readonly TEXTURE_CHANNEL_GREEN: int;
  /** Used to read from the blue channel of a texture. */
  static readonly TEXTURE_CHANNEL_BLUE: int;
  /** Used to read from the alpha channel of a texture. */
  static readonly TEXTURE_CHANNEL_ALPHA: int;
  /**
   * Used to read from the linear (non-perceptual) average of the red, green and blue channels of a texture.
   */
  static readonly TEXTURE_CHANNEL_GRAYSCALE: int;
  // enum EmissionOperator
  /** Adds the emission color to the color from the emission texture. */
  static readonly EMISSION_OP_ADD: int;
  /** Multiplies the emission color by the color from the emission texture. */
  static readonly EMISSION_OP_MULTIPLY: int;
  // enum DistanceFadeMode
  /** Do not use distance fade. */
  static readonly DISTANCE_FADE_DISABLED: int;
  /**
   * Smoothly fades the object out based on each pixel's distance from the camera using the alpha channel.
   */
  static readonly DISTANCE_FADE_PIXEL_ALPHA: int;
  /**
   * Smoothly fades the object out based on each pixel's distance from the camera using a dithering approach. Dithering discards pixels based on a set pattern to smoothly fade without enabling transparency. On certain hardware, this can be faster than {@link DISTANCE_FADE_PIXEL_ALPHA}.
   */
  static readonly DISTANCE_FADE_PIXEL_DITHER: int;
  /**
   * Smoothly fades the object out based on the object's distance from the camera using a dithering approach. Dithering discards pixels based on a set pattern to smoothly fade without enabling transparency. On certain hardware, this can be faster than {@link DISTANCE_FADE_PIXEL_ALPHA} and {@link DISTANCE_FADE_PIXEL_DITHER}.
   */
  static readonly DISTANCE_FADE_OBJECT_DITHER: int;
  // enum StencilMode
  /** Disables stencil operations. */
  static readonly STENCIL_MODE_DISABLED: int;
  /**
   * Stencil preset which applies an outline to the object.
   * **Note:** Requires a {@link Material.next_pass} material which will be automatically applied. Any manual changes made to {@link Material.next_pass} will be lost when the stencil properties are modified or the scene is reloaded. To safely apply a {@link Material.next_pass} material on a material that uses stencil presets, use {@link GeometryInstance3D.material_overlay} instead.
   */
  static readonly STENCIL_MODE_OUTLINE: int;
  /**
   * Stencil preset which shows a silhouette of the object behind walls.
   * **Note:** Requires a {@link Material.next_pass} material which will be automatically applied. Any manual changes made to {@link Material.next_pass} will be lost when the stencil properties are modified or the scene is reloaded. To safely apply a {@link Material.next_pass} material on a material that uses stencil presets, use {@link GeometryInstance3D.material_overlay} instead.
   */
  static readonly STENCIL_MODE_XRAY: int;
  /** Enables stencil operations without a preset. */
  static readonly STENCIL_MODE_CUSTOM: int;
  // enum StencilFlags
  /**
   * The material will only be rendered where it passes a stencil comparison with existing stencil buffer values.
   */
  static readonly STENCIL_FLAG_READ: int;
  /** The material will write the reference value to the stencil buffer where it passes the depth test. */
  static readonly STENCIL_FLAG_WRITE: int;
  /** The material will write the reference value to the stencil buffer where it fails the depth test. */
  static readonly STENCIL_FLAG_WRITE_DEPTH_FAIL: int;
  // enum StencilCompare
  /** Always passes the stencil test. */
  static readonly STENCIL_COMPARE_ALWAYS: int;
  /** Passes the stencil test when the reference value is less than the existing stencil value. */
  static readonly STENCIL_COMPARE_LESS: int;
  /** Passes the stencil test when the reference value is equal to the existing stencil value. */
  static readonly STENCIL_COMPARE_EQUAL: int;
  /**
   * Passes the stencil test when the reference value is less than or equal to the existing stencil value.
   */
  static readonly STENCIL_COMPARE_LESS_OR_EQUAL: int;
  /** Passes the stencil test when the reference value is greater than the existing stencil value. */
  static readonly STENCIL_COMPARE_GREATER: int;
  /** Passes the stencil test when the reference value is not equal to the existing stencil value. */
  static readonly STENCIL_COMPARE_NOT_EQUAL: int;
  /**
   * Passes the stencil test when the reference value is greater than or equal to the existing stencil value.
   */
  static readonly STENCIL_COMPARE_GREATER_OR_EQUAL: int;
}
