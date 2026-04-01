// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for viewports. Encapsulates drawing and interaction with a game world. */
declare class Viewport extends Node {
  /**
   * Sets the maximum number of samples to take when using anisotropic filtering on textures (as a power of two). A higher sample count will result in sharper textures at oblique angles, but is more expensive to compute. A value of `0` forcibly disables anisotropic filtering, even on materials where it is enabled.
   * The anisotropic filtering level also affects decals and light projectors if they are configured to use anisotropic filtering. See {@link ProjectSettings.rendering/textures/decals/filter} and {@link ProjectSettings.rendering/textures/light_projectors/filter}.
   * **Note:** In 3D, for this setting to have an effect, set {@link BaseMaterial3D.texture_filter} to {@link BaseMaterial3D.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC} or {@link BaseMaterial3D.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC} on materials.
   * **Note:** In 2D, for this setting to have an effect, set {@link CanvasItem.texture_filter} to {@link CanvasItem.TEXTURE_FILTER_LINEAR_WITH_MIPMAPS_ANISOTROPIC} or {@link CanvasItem.TEXTURE_FILTER_NEAREST_WITH_MIPMAPS_ANISOTROPIC} on the {@link CanvasItem} node displaying the texture (or in {@link CanvasTexture}). However, anisotropic filtering is rarely useful in 2D, so only enable it for textures in 2D if it makes a meaningful visual difference.
   */
  anisotropic_filtering_level: int;
  /** If `true`, the viewport will process 2D audio streams. */
  audio_listener_enable_2d: boolean;
  /** If `true`, the viewport will process 3D audio streams. */
  audio_listener_enable_3d: boolean;
  /**
   * The rendering layers in which this {@link Viewport} renders {@link CanvasItem} nodes.
   * **Note:** A {@link CanvasItem} does not inherit its parents' visibility layers. See {@link CanvasItem.visibility_layer}'s description for details.
   */
  canvas_cull_mask: int;
  /** The default filter mode used by {@link CanvasItem} nodes in this viewport. */
  canvas_item_default_texture_filter: int;
  /** The default repeat mode used by {@link CanvasItem} nodes in this viewport. */
  canvas_item_default_texture_repeat: int;
  /**
   * The canvas transform of the viewport, useful for changing the on-screen positions of all child {@link CanvasItem}s. This is relative to the global canvas transform of the viewport.
   */
  canvas_transform: Transform2D;
  /** The overlay mode for test rendered geometry in debug purposes. */
  debug_draw: int;
  /** Disable 3D rendering (but keep 2D rendering). */
  disable_3d: boolean;
  /**
   * Determines how sharp the upscaled image will be when using the FSR upscaling mode. Sharpness halves with every whole number. Values go from 0.0 (sharpest) to 2.0. Values above 2.0 won't make a visible difference.
   * To control this property on the root viewport, set the {@link ProjectSettings.rendering/scaling_3d/fsr_sharpness} project setting.
   */
  fsr_sharpness: float;
  /** The global canvas transform of the viewport. The canvas transform is relative to this. */
  global_canvas_transform: Transform2D;
  /** If `true`, the viewport will not receive input events. */
  gui_disable_input: boolean;
  /** The minimum distance the mouse cursor must move while pressed before a drag operation begins. */
  gui_drag_threshold: int;
  /**
   * If `true`, sub-windows (popups and dialogs) will be embedded inside application window as control-like nodes. If `false`, they will appear as separate windows handled by the operating system.
   */
  gui_embed_subwindows: boolean;
  /** If `true`, the GUI controls on the viewport will lay pixel perfectly. */
  gui_snap_controls_to_pixels: boolean;
  /**
   * If `true`, this viewport will mark incoming input events as handled by itself. If `false`, this is instead done by the first parent viewport that is set to handle input locally.
   * A {@link SubViewportContainer} will automatically set this property to `false` for the {@link Viewport} contained inside of it.
   * See also {@link set_input_as_handled} and {@link is_input_handled}.
   */
  handle_input_locally: boolean;
  /**
   * The automatic LOD bias to use for meshes rendered within the {@link Viewport} (this is analogous to {@link ReflectionProbe.mesh_lod_threshold}). Higher values will use less detailed versions of meshes that have LOD variations generated. If set to `0.0`, automatic LOD is disabled. Increase {@link mesh_lod_threshold} to improve performance at the cost of geometry detail.
   * To control this property on the root viewport, set the {@link ProjectSettings.rendering/mesh_lod/lod_change/threshold_pixels} project setting.
   * **Note:** Depending on the mesh's attributes (vertex colors, blend shapes, ...), a mesh may have fewer levels of LOD generated to avoid visible distortion of the mesh once it is affected by vertex colors or blend shapes. Meshes with a very low vertex count will also not have any LODs generated, which means this setting will not affect them at all. In general, this setting makes the largest impact on static meshes with a high vertex count.
   * **Note:** {@link mesh_lod_threshold} does not affect {@link GeometryInstance3D} visibility ranges (also known as "manual" LOD or hierarchical LOD).
   */
  mesh_lod_threshold: float;
  /**
   * The multisample antialiasing mode for 2D/Canvas rendering. A higher number results in smoother edges at the cost of significantly worse performance. A value of {@link Viewport.MSAA_2X} or {@link Viewport.MSAA_4X} is best unless targeting very high-end systems. This has no effect on shader-induced aliasing or texture aliasing.
   * See also {@link ProjectSettings.rendering/anti_aliasing/quality/msaa_2d} and {@link RenderingServer.viewport_set_msaa_2d}.
   */
  msaa_2d: int;
  /**
   * The multisample antialiasing mode for 3D rendering. A higher number results in smoother edges at the cost of significantly worse performance. A value of {@link Viewport.MSAA_2X} or {@link Viewport.MSAA_4X} is best unless targeting very high-end systems. See also bilinear scaling 3D {@link scaling_3d_mode} for supersampling, which provides higher quality but is much more expensive. This has no effect on shader-induced aliasing or texture aliasing.
   * See also {@link ProjectSettings.rendering/anti_aliasing/quality/msaa_3d} and {@link RenderingServer.viewport_set_msaa_3d}.
   */
  msaa_3d: int;
  /**
   * If `true` and one of the following conditions are true: {@link SubViewport.size_2d_override_stretch} and {@link SubViewport.size_2d_override} are set, {@link Window.content_scale_factor} is set and scaling is enabled, {@link oversampling_override} is set, font and {@link DPITexture} oversampling are enabled.
   */
  oversampling: boolean;
  /**
   * If greater than zero, this value is used as the font oversampling factor, otherwise oversampling is equal to viewport scale.
   */
  oversampling_override: float;
  /** If `true`, the viewport will use a unique copy of the {@link World3D} defined in {@link world_3d}. */
  own_world_3d: boolean;
  /**
   * <member name="physics_object_picking" type="bool" setter="set_physics_object_picking" getter="get_physics_object_picking" default="false">
   * If `true`, the objects rendered by viewport become subjects of mouse picking process.
   * **Note:** The number of simultaneously pickable objects is limited to 64 and they are selected in a non-deterministic order, which can be different in each picking process.
   */
  physics_interpolation_mode: int;
  /**
   * If `true`, the input_event signal will only be sent to one physics object in the mouse picking process. If you want to get the top object only, you must also enable {@link physics_object_picking_sort}.
   * If `false`, an input_event signal will be sent to all physics objects in the mouse picking process.
   * This applies to 2D CanvasItem object picking only.
   */
  physics_object_picking_first_only: boolean;
  /**
   * If `true`, objects receive mouse picking events sorted primarily by their {@link CanvasItem.z_index} and secondarily by their position in the scene tree. If `false`, the order is undetermined.
   * **Note:** This setting is disabled by default because of its potential expensive computational cost.
   * **Note:** Sorting happens after selecting the pickable objects. Because of the limitation of 64 simultaneously pickable objects, it is not guaranteed that the object with the highest {@link CanvasItem.z_index} receives the picking event.
   */
  physics_object_picking_sort: boolean;
  /**
   * Use 16 bits for the omni/spot shadow depth map. Enabling this results in shadows having less precision and may result in shadow acne, but can lead to performance improvements on some devices.
   */
  positional_shadow_atlas_16_bits: boolean;
  /** The subdivision amount of the first quadrant on the shadow atlas. */
  positional_shadow_atlas_quad_0: int;
  /** The subdivision amount of the second quadrant on the shadow atlas. */
  positional_shadow_atlas_quad_1: int;
  /** The subdivision amount of the third quadrant on the shadow atlas. */
  positional_shadow_atlas_quad_2: int;
  /** The subdivision amount of the fourth quadrant on the shadow atlas. */
  positional_shadow_atlas_quad_3: int;
  /**
   * The shadow atlas' resolution (used for omni and spot lights). The value is rounded up to the nearest power of 2.
   * **Note:** If this is set to `0`, no positional shadows will be visible at all. This can improve performance significantly on low-end systems by reducing both the CPU and GPU load (as fewer draw calls are needed to draw the scene without shadows).
   */
  positional_shadow_atlas_size: int;
  /**
   * Sets scaling 3D mode. Bilinear scaling renders at different resolution to either undersample or supersample the viewport. FidelityFX Super Resolution 1.0, abbreviated to FSR, is an upscaling technology that produces high quality images at fast framerates by using a spatially aware upscaling algorithm. FSR is slightly more expensive than bilinear, but it produces significantly higher image quality. FSR should be used where possible.
   * To control this property on the root viewport, set the {@link ProjectSettings.rendering/scaling_3d/mode} project setting.
   */
  scaling_3d_mode: int;
  /**
   * Scales the 3D render buffer based on the viewport size uses an image filter specified in {@link ProjectSettings.rendering/scaling_3d/mode} to scale the output image to the full viewport size. Values lower than `1.0` can be used to speed up 3D rendering at the cost of quality (undersampling). Values greater than `1.0` are only valid for bilinear mode and can be used to improve 3D rendering quality at a high performance cost (supersampling). See also {@link ProjectSettings.rendering/anti_aliasing/quality/msaa_3d} for multi-sample antialiasing, which is significantly cheaper but only smooths the edges of polygons.
   * When using FSR upscaling, AMD recommends exposing the following values as preset options to users "Ultra Quality: 0.77", "Quality: 0.67", "Balanced: 0.59", "Performance: 0.5" instead of exposing the entire scale.
   * To control this property on the root viewport, set the {@link ProjectSettings.rendering/scaling_3d/scale} project setting.
   */
  scaling_3d_scale: float;
  /**
   * Sets the screen-space antialiasing method used. Screen-space antialiasing works by selectively blurring edges in a post-process shader. It differs from MSAA which takes multiple coverage samples while rendering objects. Screen-space AA methods are typically faster than MSAA and will smooth out specular aliasing, but tend to make scenes appear blurry.
   * See also {@link ProjectSettings.rendering/anti_aliasing/quality/screen_space_aa} and {@link RenderingServer.viewport_set_screen_space_aa}.
   */
  screen_space_aa: int;
  /**
   * Controls how much of the original viewport's size should be covered by the 2D signed distance field. This SDF can be sampled in {@link CanvasItem} shaders and is also used for {@link GPUParticles2D} collision. Higher values allow portions of occluders located outside the viewport to still be taken into account in the generated signed distance field, at the cost of performance. If you notice particles falling through {@link LightOccluder2D}s as the occluders leave the viewport, increase this setting.
   * The percentage is added on each axis and on both sides. For example, with the default {@link SDF_OVERSIZE_120_PERCENT}, the signed distance field will cover 20% of the viewport's size outside the viewport on each side (top, right, bottom, left).
   */
  sdf_oversize: int;
  /**
   * The resolution scale to use for the 2D signed distance field. Higher values lead to a more precise and more stable signed distance field as the camera moves, at the cost of performance.
   */
  sdf_scale: int;
  /**
   * If `true`, {@link CanvasItem} nodes will internally snap to full pixels. Their position can still be sub-pixel, but the decimals will not have effect. This can lead to a crisper appearance at the cost of less smooth movement, especially when {@link Camera2D} smoothing is enabled.
   */
  snap_2d_transforms_to_pixel: boolean;
  /**
   * If `true`, vertices of {@link CanvasItem} nodes will snap to full pixels. Only affects the final vertex positions, not the transforms. This can lead to a crisper appearance at the cost of less smooth movement, especially when {@link Camera2D} smoothing is enabled.
   */
  snap_2d_vertices_to_pixel: boolean;
  /**
   * Affects the final texture sharpness by reading from a lower or higher mipmap (also called "texture LOD bias"). Negative values make mipmapped textures sharper but grainier when viewed at a distance, while positive values make mipmapped textures blurrier (even when up close).
   * Enabling temporal antialiasing ({@link use_taa}) will automatically apply a `-0.5` offset to this value, while enabling FXAA ({@link screen_space_aa}) will automatically apply a `-0.25` offset to this value. If both TAA and FXAA are enabled at the same time, an offset of `-0.75` is applied to this value.
   * **Note:** If {@link scaling_3d_scale} is lower than `1.0` (exclusive), {@link texture_mipmap_bias} is used to adjust the automatic mipmap bias which is calculated internally based on the scale factor. The formula for this is `log2(scaling_3d_scale) + mipmap_bias`.
   * To control this property on the root viewport, set the {@link ProjectSettings.rendering/textures/default_filters/texture_mipmap_bias} project setting.
   */
  texture_mipmap_bias: float;
  /**
   * If `true`, the viewport should render its background as transparent.
   * **Note:** Due to technical limitations, certain rendering features are disabled when a viewport has a transparent background. This currently applies to screen-space reflections, subsurface scattering, and depth of field.
   */
  transparent_bg: boolean;
  /**
   * When using the Mobile or Forward+ renderers, set {@link use_debanding} to enable or disable the debanding feature of this {@link Viewport}. If {@link use_hdr_2d} is `false`, 2D rendering is *not* affected by debanding unless the {@link Environment.background_mode} is {@link Environment.BG_CANVAS}. If {@link use_hdr_2d} is `true`, debanding will only be applied if this is the root {@link Viewport} and will affect all 2D and 3D rendering, including canvas items.
   * {@link use_debanding} has no effect when using the Compatibility rendering method. The Mobile renderer can also use material debanding, which can be set with {@link RenderingServer.material_set_use_debanding} or configured with {@link ProjectSettings.rendering/anti_aliasing/quality/use_debanding}.
   * See also {@link ProjectSettings.rendering/anti_aliasing/quality/use_debanding}, {@link RenderingServer.material_set_use_debanding}, and {@link RenderingServer.viewport_set_use_debanding}.
   */
  use_debanding: boolean;
  /**
   * If `true`, 2D rendering will use a high dynamic range (HDR) `RGBA16` format framebuffer. Additionally, 2D rendering will be performed on linear values and will be converted using the appropriate transfer function immediately before blitting to the screen (if the Viewport is attached to the screen).
   * Practically speaking, this means that the end result of the Viewport will not be clamped to the `0-1` range and can be used in 3D rendering without color encoding adjustments. This allows 2D rendering to take advantage of effects requiring high dynamic range (e.g. 2D glow) as well as substantially improves the appearance of effects requiring highly detailed gradients.
   */
  use_hdr_2d: boolean;
  /**
   * If `true`, {@link OccluderInstance3D} nodes will be usable for occlusion culling in 3D for this viewport. For the root viewport, {@link ProjectSettings.rendering/occlusion_culling/use_occlusion_culling} must be set to `true` instead.
   * **Note:** Enabling occlusion culling has a cost on the CPU. Only enable occlusion culling if you actually plan to use it, and think whether your scene can actually benefit from occlusion culling. Large, open scenes with few or no objects blocking the view will generally not benefit much from occlusion culling. Large open scenes generally benefit more from mesh LOD and visibility ranges ({@link GeometryInstance3D.visibility_range_begin} and {@link GeometryInstance3D.visibility_range_end}) compared to occlusion culling.
   * **Note:** Due to memory constraints, occlusion culling is not supported by default in Web export templates. It can be enabled by compiling custom Web export templates with `module_raycast_enabled=yes`.
   */
  use_occlusion_culling: boolean;
  /**
   * Enables temporal antialiasing for this viewport. TAA works by jittering the camera and accumulating the images of the last rendered frames, motion vector rendering is used to account for camera and object motion.
   * **Note:** The implementation is not complete yet, some visual instances such as particles and skinned meshes may show artifacts.
   * See also {@link ProjectSettings.rendering/anti_aliasing/quality/use_taa} and {@link RenderingServer.viewport_set_use_taa}.
   */
  use_taa: boolean;
  /**
   * If `true`, the viewport will use the primary XR interface to render XR output. When applicable this can result in a stereoscopic image and the resulting render being output to a headset.
   */
  use_xr: boolean;
  /**
   * The Variable Rate Shading (VRS) mode that is used for this viewport. Note, if hardware does not support VRS this property is ignored.
   */
  vrs_mode: int;
  /**
   * Texture to use when {@link vrs_mode} is set to {@link Viewport.VRS_TEXTURE}.
   * The texture *must* use a lossless compression format so that colors can be matched precisely. The following VRS densities are mapped to various colors, with brighter colors representing a lower level of shading precision:
   * [codeblock lang=text]
   * - 1×1 = rgb(0, 0, 0)     - #000000
   * - 1×2 = rgb(0, 85, 0)    - #005500
   * - 2×1 = rgb(85, 0, 0)    - #550000
   * - 2×2 = rgb(85, 85, 0)   - #555500
   * - 2×4 = rgb(85, 170, 0)  - #55aa00
   * - 4×2 = rgb(170, 85, 0)  - #aa5500
   * - 4×4 = rgb(170, 170, 0) - #aaaa00
   * - 4×8 = rgb(170, 255, 0) - #aaff00 - Not supported on most hardware
   * - 8×4 = rgb(255, 170, 0) - #ffaa00 - Not supported on most hardware
   * - 8×8 = rgb(255, 255, 0) - #ffff00 - Not supported on most hardware
   * [/codeblock]
   */
  vrs_texture: Texture2D;
  /**
   * Sets the update mode for Variable Rate Shading (VRS) for the viewport. VRS requires the input texture to be converted to the format usable by the VRS method supported by the hardware. The update mode defines how often this happens. If the GPU does not support VRS, or VRS is not enabled, this property is ignored.
   */
  vrs_update_mode: int;
  /** The custom {@link World2D} which can be used as 2D environment source. */
  world_2d: World2D;
  /** The custom {@link World3D} which can be used as 3D environment source. */
  world_3d: World3D;
  set_anisotropic_filtering_level(value: int): void;
  get_anisotropic_filtering_level(): int;
  set_as_audio_listener_2d(value: boolean): void;
  is_audio_listener_2d(): boolean;
  set_as_audio_listener_3d(value: boolean): void;
  is_audio_listener_3d(): boolean;
  set_canvas_cull_mask(value: int): void;
  get_canvas_cull_mask(): int;
  set_default_canvas_item_texture_filter(value: int): void;
  get_default_canvas_item_texture_filter(): int;
  set_default_canvas_item_texture_repeat(value: int): void;
  get_default_canvas_item_texture_repeat(): int;
  set_canvas_transform(value: Transform2D): void;
  get_canvas_transform(): Transform2D;
  set_debug_draw(value: int): void;
  get_debug_draw(): int;
  set_disable_3d(value: boolean): void;
  is_3d_disabled(): boolean;
  set_fsr_sharpness(value: float): void;
  get_fsr_sharpness(): float;
  set_global_canvas_transform(value: Transform2D): void;
  get_global_canvas_transform(): Transform2D;
  set_disable_input(value: boolean): void;
  is_input_disabled(): boolean;
  set_drag_threshold(value: int): void;
  get_drag_threshold(): int;
  set_embedding_subwindows(value: boolean): void;
  is_embedding_subwindows(): boolean;
  set_snap_controls_to_pixels(value: boolean): void;
  is_snap_controls_to_pixels_enabled(): boolean;
  set_handle_input_locally(value: boolean): void;
  is_handling_input_locally(): boolean;
  set_mesh_lod_threshold(value: float): void;
  get_mesh_lod_threshold(): float;
  set_msaa_2d(value: int): void;
  get_msaa_2d(): int;
  set_msaa_3d(value: int): void;
  get_msaa_3d(): int;
  set_use_oversampling(value: boolean): void;
  is_using_oversampling(): boolean;
  set_oversampling_override(value: float): void;
  get_oversampling_override(): float;
  set_use_own_world_3d(value: boolean): void;
  is_using_own_world_3d(): boolean;
  set_physics_object_picking_first_only(value: boolean): void;
  get_physics_object_picking_first_only(): boolean;
  set_physics_object_picking_sort(value: boolean): void;
  get_physics_object_picking_sort(): boolean;
  set_positional_shadow_atlas_16_bits(value: boolean): void;
  get_positional_shadow_atlas_16_bits(): boolean;
  set_positional_shadow_atlas_size(value: int): void;
  get_positional_shadow_atlas_size(): int;
  set_scaling_3d_mode(value: int): void;
  get_scaling_3d_mode(): int;
  set_scaling_3d_scale(value: float): void;
  get_scaling_3d_scale(): float;
  set_screen_space_aa(value: int): void;
  get_screen_space_aa(): int;
  set_sdf_oversize(value: int): void;
  get_sdf_oversize(): int;
  set_sdf_scale(value: int): void;
  get_sdf_scale(): int;
  set_snap_2d_transforms_to_pixel(value: boolean): void;
  is_snap_2d_transforms_to_pixel_enabled(): boolean;
  set_snap_2d_vertices_to_pixel(value: boolean): void;
  is_snap_2d_vertices_to_pixel_enabled(): boolean;
  set_texture_mipmap_bias(value: float): void;
  get_texture_mipmap_bias(): float;
  set_transparent_background(value: boolean): void;
  has_transparent_background(): boolean;
  set_use_debanding(value: boolean): void;
  is_using_debanding(): boolean;
  set_use_hdr_2d(value: boolean): void;
  is_using_hdr_2d(): boolean;
  set_use_occlusion_culling(value: boolean): void;
  is_using_occlusion_culling(): boolean;
  set_use_taa(value: boolean): void;
  is_using_taa(): boolean;
  set_use_xr(value: boolean): void;
  is_using_xr(): boolean;
  set_vrs_mode(value: int): void;
  get_vrs_mode(): int;
  set_vrs_texture(value: Texture2D): void;
  get_vrs_texture(): Texture2D;
  set_vrs_update_mode(value: int): void;
  get_vrs_update_mode(): int;
  set_world_2d(value: World2D): void;
  get_world_2d(): World2D;
  set_world_3d(value: World3D): void;
  get_world_3d(): World3D;

  /**
   * Returns the first valid {@link World2D} for this viewport, searching the {@link world_2d} property of itself and any Viewport ancestor.
   */
  find_world_2d(): World2D;
  /**
   * Returns the first valid {@link World3D} for this viewport, searching the {@link world_3d} property of itself and any Viewport ancestor.
   */
  find_world_3d(): World3D;
  /**
   * Returns the currently active 2D audio listener. Returns `null` if there are no active 2D audio listeners, in which case the active 2D camera will be treated as listener.
   */
  get_audio_listener_2d(): AudioListener2D;
  /**
   * Returns the currently active 3D audio listener. Returns `null` if there are no active 3D audio listeners, in which case the active 3D camera will be treated as listener.
   */
  get_audio_listener_3d(): AudioListener3D;
  /**
   * Returns the currently active 2D camera. Returns `null` if there are no active cameras.
   * **Note:** If called while the *Camera Override* system is active in editor, this will return the internally managed override camera. It is therefore advised to avoid caching the return value, or to check that the cached value is still a valid instance and is the current camera before use. See {@link @GlobalScope.is_instance_valid} and {@link Camera2D.is_current}.
   */
  get_camera_2d(): Camera2D;
  /**
   * Returns the currently active 3D camera. Returns `null` if there are no active cameras.
   * **Note:** If called while the *Camera Override* system is active in editor, this will return the internally managed override camera. It is therefore advised to avoid caching the return value, or to check that the cached value is a valid instance and is the current camera before use. See {@link @GlobalScope.is_instance_valid} and {@link Camera3D.current}.
   */
  get_camera_3d(): Camera3D;
  /** Returns an individual bit on the rendering layer mask. */
  get_canvas_cull_mask_bit(layer: int): boolean;
  /**
   * Returns a list of the visible embedded {@link Window}s inside the viewport.
   * **Note:** {@link Window}s inside other viewports will not be listed.
   */
  get_embedded_subwindows(): Array<Window>;
  /** Returns the transform from the viewport's coordinate system to the embedder's coordinate system. */
  get_final_transform(): Transform2D;
  /**
   * Returns the mouse's position in this {@link Viewport} using the coordinate system of this {@link Viewport}.
   */
  get_mouse_position(): Vector2;
  /** Returns viewport oversampling factor. */
  get_oversampling(): float;
  /** Returns the positional shadow atlas quadrant subdivision of the specified quadrant. */
  get_positional_shadow_atlas_quadrant_subdiv(quadrant: int): int;
  /** Returns rendering statistics of the given type. */
  get_render_info(type_: int, info: int): int;
  /**
   * Returns the transform from the Viewport's coordinates to the screen coordinates of the containing window manager window.
   */
  get_screen_transform(): Transform2D;
  /**
   * Returns the automatically computed 2D stretch transform, taking the {@link Viewport}'s stretch settings into account. The final value is multiplied by {@link Window.content_scale_factor}, but only for the root viewport. If this method is called on a {@link SubViewport} (e.g., in a scene tree with {@link SubViewportContainer} and {@link SubViewport}), the scale factor of the root window will not be applied. Using {@link Transform2D.get_scale} on the returned value, this can be used to compensate for scaling when zooming a {@link Camera2D} node, or to scale down a {@link TextureRect} to be pixel-perfect regardless of the automatically computed scale factor.
   * **Note:** Due to how pixel scaling works, the returned transform's X and Y scale may differ slightly, even when {@link Window.content_scale_aspect} is set to a mode that preserves the pixels' aspect ratio. If {@link Window.content_scale_aspect} is {@link Window.CONTENT_SCALE_ASPECT_IGNORE}, the X and Y scale may differ *significantly*.
   */
  get_stretch_transform(): Transform2D;
  /**
   * Returns the viewport's texture.
   * **Note:** When trying to store the current texture (e.g. in a file), it might be completely black or outdated if used too early, especially when used in e.g. {@link Node._ready}. To make sure the texture you get is correct, you can await {@link RenderingServer.frame_post_draw} signal.
   * **Note:** When {@link use_hdr_2d} is `true` the returned texture will be an HDR image using linear encoding.
   */
  get_texture(): ViewportTexture;
  /** Returns the viewport's RID from the {@link RenderingServer}. */
  get_viewport_rid(): RID;
  /** Returns the visible rectangle in global screen coordinates. */
  get_visible_rect(): Rect2;
  /**
   * Cancels the drag operation that was previously started through {@link Control._get_drag_data} or forced with {@link Control.force_drag}.
   */
  gui_cancel_drag(): void;
  /** Returns the drag data from the GUI, that was previously returned by {@link Control._get_drag_data}. */
  gui_get_drag_data(): unknown;
  /** Returns the human-readable description of the drag data, used for assistive apps. */
  gui_get_drag_description(): string;
  /**
   * Returns the currently focused {@link Control} within this viewport. If no {@link Control} is focused, returns `null`.
   */
  gui_get_focus_owner(): Control;
  /**
   * Returns the {@link Control} that the mouse is currently hovering over in this viewport. If no {@link Control} has the cursor, returns `null`.
   * Typically the leaf {@link Control} node or deepest level of the subtree which claims hover. This is very useful when used together with {@link Node.is_ancestor_of} to find if the mouse is within a control tree.
   */
  gui_get_hovered_control(): Control;
  /** Returns `true` if the drag operation is successful. */
  gui_is_drag_successful(): boolean;
  /**
   * Returns `true` if a drag operation is currently ongoing and where the drop action could happen in this viewport.
   * Alternative to {@link Node.NOTIFICATION_DRAG_BEGIN} and {@link Node.NOTIFICATION_DRAG_END} when you prefer polling the value.
   */
  gui_is_dragging(): boolean;
  /**
   * Removes the focus from the currently focused {@link Control} within this viewport. If no {@link Control} has the focus, does nothing.
   */
  gui_release_focus(): void;
  /** Sets the human-readable description of the drag data to `description`, used for assistive apps. */
  gui_set_drag_description(description: string): void;
  /**
   * Returns whether the current {@link InputEvent} has been handled. Input events are not handled until {@link set_input_as_handled} has been called during the lifetime of an {@link InputEvent}.
   * This is usually done as part of input handling methods like {@link Node._input}, {@link Control._gui_input} or others, as well as in corresponding signal handlers.
   * If {@link handle_input_locally} is set to `false`, this method will try finding the first parent viewport that is set to handle input locally, and return its value for {@link is_input_handled} instead.
   */
  is_input_handled(): boolean;
  /**
   * Inform the Viewport that the mouse has entered its area. Use this function before sending an {@link InputEventMouseButton} or {@link InputEventMouseMotion} to the {@link Viewport} with {@link Viewport.push_input}. See also {@link notify_mouse_exited}.
   * **Note:** In most cases, it is not necessary to call this function because {@link SubViewport} nodes that are children of {@link SubViewportContainer} are notified automatically. This is only necessary when interacting with viewports in non-default ways, for example as textures in {@link TextureRect} or with an {@link Area3D} that forwards input events.
   */
  notify_mouse_entered(): void;
  /**
   * Inform the Viewport that the mouse has left its area. Use this function when the node that displays the viewport notices the mouse has left the area of the displayed viewport. See also {@link notify_mouse_entered}.
   * **Note:** In most cases, it is not necessary to call this function because {@link SubViewport} nodes that are children of {@link SubViewportContainer} are notified automatically. This is only necessary when interacting with viewports in non-default ways, for example as textures in {@link TextureRect} or with an {@link Area3D} that forwards input events.
   */
  notify_mouse_exited(): void;
  /**
   * Triggers the given `event` in this {@link Viewport}. This can be used to pass an {@link InputEvent} between viewports, or to locally apply inputs that were sent over the network or saved to a file.
   * If `in_local_coords` is `false`, the event's position is in the embedder's coordinates and will be converted to viewport coordinates. If `in_local_coords` is `true`, the event's position is in viewport coordinates.
   * While this method serves a similar purpose as {@link Input.parse_input_event}, it does not remap the specified `event` based on project settings like {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse}.
   * Calling this method will propagate calls to child nodes for following methods in the given order:
   * - {@link Node._input}
   * - {@link Control._gui_input} for {@link Control} nodes
   * - {@link Node._shortcut_input}
   * - {@link Node._unhandled_key_input}
   * - {@link Node._unhandled_input}
   * If an earlier method marks the input as handled via {@link set_input_as_handled}, any later method in this list will not be called.
   * If none of the methods handle the event and {@link physics_object_picking} is `true`, the event is used for physics object picking.
   */
  push_input(event: InputEvent, in_local_coords?: boolean): void;
  /**
   * Helper method which calls the `set_text()` method on the currently focused {@link Control}, provided that it is defined (e.g. if the focused Control is {@link Button} or {@link LineEdit}).
   */
  push_text_input(text: string): void;
  /**
   * Triggers the given `event` in this {@link Viewport}. This can be used to pass an {@link InputEvent} between viewports, or to locally apply inputs that were sent over the network or saved to a file.
   * If `in_local_coords` is `false`, the event's position is in the embedder's coordinates and will be converted to viewport coordinates. If `in_local_coords` is `true`, the event's position is in viewport coordinates.
   * Calling this method will propagate calls to child nodes for following methods in the given order:
   * - {@link Node._shortcut_input}
   * - {@link Node._unhandled_key_input}
   * - {@link Node._unhandled_input}
   * If an earlier method marks the input as handled via {@link set_input_as_handled}, any later method in this list will not be called.
   * If none of the methods handle the event and {@link physics_object_picking} is `true`, the event is used for physics object picking.
   * **Note:** This method doesn't propagate input events to embedded {@link Window}s or {@link SubViewport}s.
   */
  push_unhandled_input(event: InputEvent, in_local_coords?: boolean): void;
  /**
   * Set/clear individual bits on the rendering layer mask. This simplifies editing this {@link Viewport}'s layers.
   */
  set_canvas_cull_mask_bit(layer: int, enable: boolean): void;
  /**
   * Stops the input from propagating further up the {@link SceneTree}.
   * **Note:** This does not affect the methods in {@link Input}, only the way events are propagated.
   */
  set_input_as_handled(): void;
  /**
   * Sets the number of subdivisions to use in the specified quadrant. A higher number of subdivisions allows you to have more shadows in the scene at once, but reduces the quality of the shadows. A good practice is to have quadrants with a varying number of subdivisions and to have as few subdivisions as possible.
   */
  set_positional_shadow_atlas_quadrant_subdiv(quadrant: int, subdiv: int): void;
  /**
   * Force instantly updating the display based on the current mouse cursor position. This includes updating the mouse cursor shape and sending necessary {@link Control.mouse_entered}, {@link CollisionObject2D.mouse_entered}, {@link CollisionObject3D.mouse_entered} and {@link Window.mouse_entered} signals and their respective `mouse_exited` counterparts.
   */
  update_mouse_cursor_state(): void;
  /**
   * Moves the mouse pointer to the specified position in this {@link Viewport} using the coordinate system of this {@link Viewport}.
   * **Note:** {@link warp_mouse} is only supported on Windows, macOS and Linux. It has no effect on Android, iOS and Web.
   */
  warp_mouse(position: Vector2): void;

  /**
   * Emitted when a Control node grabs keyboard focus.
   * **Note:** A Control node losing focus doesn't cause this signal to be emitted.
   */
  gui_focus_changed: Signal<[Control]>;
  /**
   * Emitted when the size of the viewport is changed, whether by resizing of window, or some other means.
   */
  size_changed: Signal<[]>;

  // enum PositionalShadowAtlasQuadrantSubdiv
  /** This quadrant will not be used. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_DISABLED: int;
  /** This quadrant will only be used by one shadow map. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_1: int;
  /** This quadrant will be split in 4 and used by up to 4 shadow maps. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_4: int;
  /** This quadrant will be split 16 ways and used by up to 16 shadow maps. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_16: int;
  /** This quadrant will be split 64 ways and used by up to 64 shadow maps. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_64: int;
  /**
   * This quadrant will be split 256 ways and used by up to 256 shadow maps. Unless the {@link positional_shadow_atlas_size} is very high, the shadows in this quadrant will be very low resolution.
   */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_256: int;
  /**
   * This quadrant will be split 1024 ways and used by up to 1024 shadow maps. Unless the {@link positional_shadow_atlas_size} is very high, the shadows in this quadrant will be very low resolution.
   */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_1024: int;
  /** Represents the size of the {@link PositionalShadowAtlasQuadrantSubdiv} enum. */
  static readonly SHADOW_ATLAS_QUADRANT_SUBDIV_MAX: int;
  // enum Scaling3DMode
  /**
   * Use bilinear scaling for the viewport's 3D buffer. The amount of scaling can be set using {@link scaling_3d_scale}. Values less than `1.0` will result in undersampling while values greater than `1.0` will result in supersampling. A value of `1.0` disables scaling.
   */
  static readonly SCALING_3D_MODE_BILINEAR: int;
  /**
   * Use AMD FidelityFX Super Resolution 1.0 upscaling for the viewport's 3D buffer. The amount of scaling can be set using {@link scaling_3d_scale}. Values less than `1.0` will result in the viewport being upscaled using FSR. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` disables scaling.
   */
  static readonly SCALING_3D_MODE_FSR: int;
  /**
   * Use AMD FidelityFX Super Resolution 2.2 upscaling for the viewport's 3D buffer. The amount of scaling can be set using {@link Viewport.scaling_3d_scale}. Values less than `1.0` will result in the viewport being upscaled using FSR2. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` will use FSR2 at native resolution as a TAA solution.
   */
  static readonly SCALING_3D_MODE_FSR2: int;
  /**
   * Use the MetalFX spatial upscaler (https://developer.apple.com/documentation/metalfx/mtlfxspatialscaler#overview) for the viewport's 3D buffer.
   * The amount of scaling can be set using {@link scaling_3d_scale}.
   * Values less than `1.0` will result in the viewport being upscaled using MetalFX. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` disables scaling.
   * More information: MetalFX (https://developer.apple.com/documentation/metalfx).
   * **Note:** Only supported when the Metal rendering driver is in use, which limits this scaling mode to macOS and iOS.
   */
  static readonly SCALING_3D_MODE_METALFX_SPATIAL: int;
  /**
   * Use the MetalFX temporal upscaler (https://developer.apple.com/documentation/metalfx/mtlfxtemporalscaler#overview) for the viewport's 3D buffer.
   * The amount of scaling can be set using {@link scaling_3d_scale}. To determine the minimum input scale, use the {@link RenderingDevice.limit_get} method with {@link RenderingDevice.LIMIT_METALFX_TEMPORAL_SCALER_MIN_SCALE}.
   * Values less than `1.0` will result in the viewport being upscaled using MetalFX. Values greater than `1.0` are not supported and bilinear downsampling will be used instead. A value of `1.0` will use MetalFX at native resolution as a TAA solution.
   * More information: MetalFX (https://developer.apple.com/documentation/metalfx).
   * **Note:** Only supported when the Metal rendering driver is in use, which limits this scaling mode to macOS and iOS.
   */
  static readonly SCALING_3D_MODE_METALFX_TEMPORAL: int;
  /** Represents the size of the {@link Scaling3DMode} enum. */
  static readonly SCALING_3D_MODE_MAX: int;
  // enum MSAA
  /** Multisample antialiasing mode disabled. This is the default value, and is also the fastest setting. */
  static readonly MSAA_DISABLED: int;
  /**
   * Use 2× Multisample Antialiasing. This has a moderate performance cost. It helps reduce aliasing noticeably, but 4× MSAA still looks substantially better.
   */
  static readonly MSAA_2X: int;
  /**
   * Use 4× Multisample Antialiasing. This has a significant performance cost, and is generally a good compromise between performance and quality.
   */
  static readonly MSAA_4X: int;
  /**
   * Use 8× Multisample Antialiasing. This has a very high performance cost. The difference between 4× and 8× MSAA may not always be visible in real gameplay conditions. Likely unsupported on low-end and older hardware.
   */
  static readonly MSAA_8X: int;
  /** Represents the size of the {@link MSAA} enum. */
  static readonly MSAA_MAX: int;
  // enum AnisotropicFiltering
  /** Anisotropic filtering is disabled. */
  static readonly ANISOTROPY_DISABLED: int;
  /** Use 2× anisotropic filtering. */
  static readonly ANISOTROPY_2X: int;
  /** Use 4× anisotropic filtering. This is the default value. */
  static readonly ANISOTROPY_4X: int;
  /** Use 8× anisotropic filtering. */
  static readonly ANISOTROPY_8X: int;
  /** Use 16× anisotropic filtering. */
  static readonly ANISOTROPY_16X: int;
  /** Represents the size of the {@link AnisotropicFiltering} enum. */
  static readonly ANISOTROPY_MAX: int;
  // enum ScreenSpaceAA
  /** Do not perform any antialiasing in the full screen post-process. */
  static readonly SCREEN_SPACE_AA_DISABLED: int;
  /**
   * Use fast approximate antialiasing. FXAA is a popular screen-space antialiasing method, which is fast but will make the image look blurry, especially at lower resolutions. It can still work relatively well at large resolutions such as 1440p and 4K.
   */
  static readonly SCREEN_SPACE_AA_FXAA: int;
  /**
   * Use subpixel morphological antialiasing. SMAA may produce clearer results than FXAA, but at a slightly higher performance cost.
   */
  static readonly SCREEN_SPACE_AA_SMAA: int;
  /** Represents the size of the {@link ScreenSpaceAA} enum. */
  static readonly SCREEN_SPACE_AA_MAX: int;
  // enum RenderInfo
  /** Amount of objects in frame. */
  static readonly RENDER_INFO_OBJECTS_IN_FRAME: int;
  /** Amount of vertices in frame. */
  static readonly RENDER_INFO_PRIMITIVES_IN_FRAME: int;
  /** Amount of draw calls in frame. */
  static readonly RENDER_INFO_DRAW_CALLS_IN_FRAME: int;
  /** Represents the size of the {@link RenderInfo} enum. */
  static readonly RENDER_INFO_MAX: int;
  // enum RenderInfoType
  /** Visible render pass (excluding shadows). */
  static readonly RENDER_INFO_TYPE_VISIBLE: int;
  /**
   * Shadow render pass. Objects will be rendered several times depending on the number of amounts of lights with shadows and the number of directional shadow splits.
   */
  static readonly RENDER_INFO_TYPE_SHADOW: int;
  /** Canvas item rendering. This includes all 2D rendering. */
  static readonly RENDER_INFO_TYPE_CANVAS: int;
  /** Represents the size of the {@link RenderInfoType} enum. */
  static readonly RENDER_INFO_TYPE_MAX: int;
  // enum DebugDraw
  /** Objects are displayed normally. */
  static readonly DEBUG_DRAW_DISABLED: int;
  /** Objects are displayed without light information. */
  static readonly DEBUG_DRAW_UNSHADED: int;
  /**
   * Objects are displayed without textures and only with lighting information.
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   */
  static readonly DEBUG_DRAW_LIGHTING: int;
  /**
   * Objects are displayed semi-transparent with additive blending so you can see where they are drawing over top of one another. A higher overdraw means you are wasting performance on drawing pixels that are being hidden behind others.
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   */
  static readonly DEBUG_DRAW_OVERDRAW: int;
  /**
   * Objects are displayed as wireframe models.
   * **Note:** {@link RenderingServer.set_debug_generate_wireframes} must be called before loading any meshes for wireframes to be visible when using the Compatibility renderer.
   * **Note:** In the Compatibility renderer, backfaces are always visible when using wireframe rendering. In the Forward+ and Mobile renderers, wireframes follow the material's backface culling properties instead.
   */
  static readonly DEBUG_DRAW_WIREFRAME: int;
  /**
   * Objects are displayed without lighting information and their textures replaced by normal mapping.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_NORMAL_BUFFER: int;
  /**
   * Objects are displayed with only the albedo value from {@link VoxelGI}s. Requires at least one visible {@link VoxelGI} node that has been baked to have a visible effect.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_VOXEL_GI_ALBEDO: int;
  /**
   * Objects are displayed with only the lighting value from {@link VoxelGI}s. Requires at least one visible {@link VoxelGI} node that has been baked to have a visible effect.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_VOXEL_GI_LIGHTING: int;
  /**
   * Objects are displayed with only the emission color from {@link VoxelGI}s. Requires at least one visible {@link VoxelGI} node that has been baked to have a visible effect.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_VOXEL_GI_EMISSION: int;
  /**
   * Draws the shadow atlas that stores shadows from {@link OmniLight3D}s and {@link SpotLight3D}s in the upper left quadrant of the {@link Viewport}.
   */
  static readonly DEBUG_DRAW_SHADOW_ATLAS: int;
  /**
   * Draws the shadow atlas that stores shadows from {@link DirectionalLight3D}s in the upper left quadrant of the {@link Viewport}.
   */
  static readonly DEBUG_DRAW_DIRECTIONAL_SHADOW_ATLAS: int;
  /**
   * Draws the scene luminance buffer (if available) in the upper left quadrant of the {@link Viewport}.
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   */
  static readonly DEBUG_DRAW_SCENE_LUMINANCE: int;
  /**
   * Draws the screen-space ambient occlusion texture instead of the scene so that you can clearly see how it is affecting objects. In order for this display mode to work, you must have {@link Environment.ssao_enabled} set in your {@link WorldEnvironment}.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_SSAO: int;
  /**
   * Draws the screen-space indirect lighting texture instead of the scene so that you can clearly see how it is affecting objects. In order for this display mode to work, you must have {@link Environment.ssil_enabled} set in your {@link WorldEnvironment}.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_SSIL: int;
  /**
   * Colors each PSSM split for the {@link DirectionalLight3D}s in the scene a different color so you can see where the splits are. In order (from closest to furthest from the camera), they are colored red, green, blue, and yellow.
   * **Note:** When using this debug draw mode, custom shaders are ignored since all materials in the scene temporarily use a debug material. This means the result from custom shader functions (such as vertex displacement) won't be visible anymore when using this debug draw mode.
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   */
  static readonly DEBUG_DRAW_PSSM_SPLITS: int;
  /**
   * Draws the decal atlas used by {@link Decal}s and light projector textures in the upper left quadrant of the {@link Viewport}.
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   */
  static readonly DEBUG_DRAW_DECAL_ATLAS: int;
  /**
   * Draws the cascades used to render signed distance field global illumination (SDFGI).
   * Does nothing if the current environment's {@link Environment.sdfgi_enabled} is `false`.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_SDFGI: int;
  /**
   * Draws the probes used for signed distance field global illumination (SDFGI).
   * When in the editor, left-clicking a probe will display additional bright dots that show its occlusion information. A white dot means the light is not occluded at all at the dot's position, while a red dot means the light is fully occluded. Intermediate values are possible.
   * Does nothing if the current environment's {@link Environment.sdfgi_enabled} is `false`.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_SDFGI_PROBES: int;
  /**
   * Draws the buffer used for global illumination from {@link VoxelGI} or SDFGI. Requires {@link VoxelGI} (at least one visible baked VoxelGI node) or SDFGI ({@link Environment.sdfgi_enabled}) to be enabled to have a visible effect.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_GI_BUFFER: int;
  /**
   * Draws all of the objects at their highest polycount regardless of their distance from the camera. No low level of detail (LOD) is applied.
   */
  static readonly DEBUG_DRAW_DISABLE_LOD: int;
  /**
   * Draws the cluster used by {@link OmniLight3D} nodes to optimize light rendering.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_CLUSTER_OMNI_LIGHTS: int;
  /**
   * Draws the cluster used by {@link SpotLight3D} nodes to optimize light rendering.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_CLUSTER_SPOT_LIGHTS: int;
  /**
   * Draws the cluster used by {@link Decal} nodes to optimize decal rendering.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_CLUSTER_DECALS: int;
  /**
   * Draws the cluster used by {@link ReflectionProbe} nodes to optimize reflection probes.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_CLUSTER_REFLECTION_PROBES: int;
  /**
   * Draws the buffer used for occlusion culling.
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   */
  static readonly DEBUG_DRAW_OCCLUDERS: int;
  /**
   * Draws vector lines over the viewport to indicate the movement of pixels between frames.
   * **Note:** Only supported when using the Forward+ rendering method.
   */
  static readonly DEBUG_DRAW_MOTION_VECTORS: int;
  /**
   * Draws the internal resolution buffer of the scene in linear colorspace before tonemapping or post-processing is applied.
   * **Note:** Only supported when using the Forward+ or Mobile rendering methods.
   */
  static readonly DEBUG_DRAW_INTERNAL_BUFFER: int;
  // enum DefaultCanvasItemTextureFilter
  /**
   * The texture filter reads from the nearest pixel only. This makes the texture look pixelated from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_NEAREST: int;
  /**
   * The texture filter blends between the nearest 4 pixels. This makes the texture look smooth from up close, and grainy from a distance (due to mipmaps not being sampled).
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_LINEAR: int;
  /**
   * The texture filter blends between the nearest 4 pixels and between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look smooth from up close, and smooth from a distance.
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to {@link Camera2D} zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_LINEAR_WITH_MIPMAPS: int;
  /**
   * The texture filter reads from the nearest pixel and blends between the nearest 2 mipmaps (or uses the nearest mipmap if {@link ProjectSettings.rendering/textures/default_filters/use_nearest_mipmap_filter} is `true`). This makes the texture look pixelated from up close, and smooth from a distance.
   * Use this for non-pixel art textures that may be viewed at a low scale (e.g. due to {@link Camera2D} zoom or sprite scaling), as mipmaps are important to smooth out pixels that are smaller than on-screen pixels.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_NEAREST_WITH_MIPMAPS: int;
  /**
   * The {@link Viewport} will inherit the filter from its parent {@link CanvasItem} or {@link Viewport}.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_PARENT_NODE: int;
  /** Represents the size of the {@link DefaultCanvasItemTextureFilter} enum. */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_FILTER_MAX: int;
  // enum DefaultCanvasItemTextureRepeat
  /**
   * Disables textures repeating. Instead, when reading UVs outside the 0-1 range, the value will be clamped to the edge of the texture, resulting in a stretched out look at the borders of the texture.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_DISABLED: int;
  /**
   * Enables the texture to repeat when UV coordinates are outside the 0-1 range. If using one of the linear filtering modes, this can result in artifacts at the edges of a texture when the sampler filters across the edges of the texture.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_ENABLED: int;
  /** Flip the texture when repeating so that the edge lines up instead of abruptly changing. */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_MIRROR: int;
  /**
   * The {@link Viewport} will inherit the repeat mode from its parent {@link CanvasItem} or {@link Viewport}.
   */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_PARENT_NODE: int;
  /** Represents the size of the {@link DefaultCanvasItemTextureRepeat} enum. */
  static readonly DEFAULT_CANVAS_ITEM_TEXTURE_REPEAT_MAX: int;
  // enum SDFOversize
  /** The signed distance field only covers the viewport's own rectangle. */
  static readonly SDF_OVERSIZE_100_PERCENT: int;
  /** The signed distance field is expanded to cover 20% of the viewport's size around the borders. */
  static readonly SDF_OVERSIZE_120_PERCENT: int;
  /** The signed distance field is expanded to cover 50% of the viewport's size around the borders. */
  static readonly SDF_OVERSIZE_150_PERCENT: int;
  /**
   * The signed distance field is expanded to cover 100% (double) of the viewport's size around the borders.
   */
  static readonly SDF_OVERSIZE_200_PERCENT: int;
  /** Represents the size of the {@link SDFOversize} enum. */
  static readonly SDF_OVERSIZE_MAX: int;
  // enum SDFScale
  /** The signed distance field is rendered at full resolution. */
  static readonly SDF_SCALE_100_PERCENT: int;
  /** The signed distance field is rendered at half the resolution of this viewport. */
  static readonly SDF_SCALE_50_PERCENT: int;
  /** The signed distance field is rendered at a quarter the resolution of this viewport. */
  static readonly SDF_SCALE_25_PERCENT: int;
  /** Represents the size of the {@link SDFScale} enum. */
  static readonly SDF_SCALE_MAX: int;
  // enum VRSMode
  /** Variable Rate Shading is disabled. */
  static readonly VRS_DISABLED: int;
  /**
   * Variable Rate Shading uses a texture. Note, for stereoscopic use a texture atlas with a texture for each view.
   */
  static readonly VRS_TEXTURE: int;
  /** Variable Rate Shading's texture is supplied by the primary {@link XRInterface}. */
  static readonly VRS_XR: int;
  /** Represents the size of the {@link VRSMode} enum. */
  static readonly VRS_MAX: int;
  // enum VRSUpdateMode
  /** The input texture for variable rate shading will not be processed. */
  static readonly VRS_UPDATE_DISABLED: int;
  /** The input texture for variable rate shading will be processed once. */
  static readonly VRS_UPDATE_ONCE: int;
  /** The input texture for variable rate shading will be processed each frame. */
  static readonly VRS_UPDATE_ALWAYS: int;
  /** Represents the size of the {@link VRSUpdateMode} enum. */
  static readonly VRS_UPDATE_MAX: int;
}
