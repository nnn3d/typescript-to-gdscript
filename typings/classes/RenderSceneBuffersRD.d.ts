// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Render scene buffer implementation for the RenderingDevice based renderers. */
declare class RenderSceneBuffersRD extends RenderSceneBuffers {
  /** Frees all buffers related to this context. */
  clear_context(context: string): void;
  /**
   * Create a new texture with the given definition and cache this under the given name. Will return the existing texture if it already exists.
   */
  create_texture(context: string, name: string, data_format: int, usage_bits: int, texture_samples: int, size: Vector2i, layers: int, mipmaps: int, unique: boolean, discardable: boolean): RID;
  /**
   * Create a new texture using the given format and view and cache this under the given name. Will return the existing texture if it already exists.
   */
  create_texture_from_format(context: string, name: string, format: RDTextureFormat, view: RDTextureView, unique: boolean): RID;
  /**
   * Create a new texture view for an existing texture and cache this under the given `view_name`. Will return the existing texture view if it already exists. Will error if the source texture doesn't exist.
   */
  create_texture_view(context: string, name: string, view_name: string, view: RDTextureView): RID;
  /**
   * Returns the specified layer from the color texture we are rendering 3D content to.
   * If `msaa` is `true` and MSAA is enabled, this returns the MSAA variant of the buffer.
   */
  get_color_layer(layer: int, msaa?: boolean): RID;
  /**
   * Returns the color texture we are rendering 3D content to. If multiview is used this will be a texture array with all views.
   * If `msaa` is `true` and MSAA is enabled, this returns the MSAA variant of the buffer.
   */
  get_color_texture(msaa?: boolean): RID;
  /**
   * Returns the specified layer from the depth texture we are rendering 3D content to.
   * If `msaa` is `true` and MSAA is enabled, this returns the MSAA variant of the buffer.
   */
  get_depth_layer(layer: int, msaa?: boolean): RID;
  /**
   * Returns the depth texture we are rendering 3D content to. If multiview is used this will be a texture array with all views.
   * If `msaa` is `true` and MSAA is enabled, this returns the MSAA variant of the buffer.
   */
  get_depth_texture(msaa?: boolean): RID;
  /**
   * Returns the FSR sharpness value used while rendering the 3D content (if {@link get_scaling_3d_mode} is an FSR mode).
   */
  get_fsr_sharpness(): float;
  /**
   * Returns the internal size of the render buffer (size before upscaling) with which textures are created by default.
   */
  get_internal_size(): Vector2i;
  /** Returns the applied 3D MSAA mode for this viewport. */
  get_msaa_3d(): int;
  /** Returns the render target associated with this buffers object. */
  get_render_target(): RID;
  /** Returns the scaling mode used for upscaling. */
  get_scaling_3d_mode(): int;
  /** Returns the screen-space antialiasing method applied. */
  get_screen_space_aa(): int;
  /** Returns the target size of the render buffer (size after upscaling). */
  get_target_size(): Vector2i;
  /** Returns a cached texture with this name. */
  get_texture(context: string, name: string): RID;
  /** Returns the texture format information with which a cached texture was created. */
  get_texture_format(context: string, name: string): RDTextureFormat | null;
  /** Returns the number of MSAA samples used. */
  get_texture_samples(): int;
  /** Returns a specific slice (layer or mipmap) for a cached texture. */
  get_texture_slice(context: string, name: string, layer: int, mipmap: int, layers: int, mipmaps: int): RID;
  /** Returns the texture size of a given slice of a cached texture. */
  get_texture_slice_size(context: string, name: string, mipmap: int): Vector2i;
  /** Returns a specific view of a slice (layer or mipmap) for a cached texture. */
  get_texture_slice_view(context: string, name: string, layer: int, mipmap: int, layers: int, mipmaps: int, view: RDTextureView): RID;
  /** Returns `true` if debanding is enabled. */
  get_use_debanding(): boolean;
  /** Returns `true` if TAA is enabled. */
  get_use_taa(): boolean;
  /** Returns the specified layer from the velocity texture we are rendering 3D content to. */
  get_velocity_layer(layer: int, msaa?: boolean): RID;
  /**
   * Returns the velocity texture we are rendering 3D content to. If multiview is used this will be a texture array with all views.
   * If `msaa` is **true** and MSAA is enabled, this returns the MSAA variant of the buffer.
   */
  get_velocity_texture(msaa?: boolean): RID;
  /** Returns the view count for the associated viewport. */
  get_view_count(): int;
  /** Returns `true` if a cached texture exists for this name. */
  has_texture(context: string, name: string): boolean;
}
