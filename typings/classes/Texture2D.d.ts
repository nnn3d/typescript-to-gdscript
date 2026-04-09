// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Texture for 2D and 3D. */
declare class Texture2D extends Texture {
  /**
   * Called when the entire {@link Texture2D} is requested to be drawn over a {@link CanvasItem}, with the top-left offset specified in `pos`. `modulate` specifies a multiplier for the colors being drawn, while `transpose` specifies whether drawing should be performed in column-major order instead of row-major order (resulting in 90-degree clockwise rotation).
   * **Note:** This is only used in 2D rendering, not 3D.
   */
  _draw(to_canvas_item: RID, pos: Vector2 | Vector2i, modulate: Color, transpose: boolean): void;
  /**
   * Called when the {@link Texture2D} is requested to be drawn onto {@link CanvasItem}'s specified `rect`. `modulate` specifies a multiplier for the colors being drawn, while `transpose` specifies whether drawing should be performed in column-major order instead of row-major order (resulting in 90-degree clockwise rotation).
   * **Note:** This is only used in 2D rendering, not 3D.
   */
  _draw_rect(to_canvas_item: RID, rect: Rect2 | Rect2i, tile: boolean, modulate: Color, transpose: boolean): void;
  /**
   * Called when a part of the {@link Texture2D} specified by `src_rect`'s coordinates is requested to be drawn onto {@link CanvasItem}'s specified `rect`. `modulate` specifies a multiplier for the colors being drawn, while `transpose` specifies whether drawing should be performed in column-major order instead of row-major order (resulting in 90-degree clockwise rotation).
   * **Note:** This is only used in 2D rendering, not 3D.
   */
  _draw_rect_region(to_canvas_item: RID, rect: Rect2 | Rect2i, src_rect: Rect2 | Rect2i, modulate: Color, transpose: boolean, clip_uv: boolean): void;
  /** Called when {@link get_format} is called. */
  _get_format(): int;
  /** Called when the {@link Texture2D}'s height is queried. */
  _get_height(): int;
  /** Called when {@link get_image} is called. */
  _get_image(): Image | null;
  /** Called when {@link get_mipmap_count} is called. */
  _get_mipmap_count(): int;
  /** Called when the {@link Texture2D}'s width is queried. */
  _get_width(): int;
  /** Called when the presence of an alpha channel in the {@link Texture2D} is queried. */
  _has_alpha(): boolean;
  /** Called when {@link has_mipmaps} is called. */
  _has_mipmaps(): boolean;
  /**
   * Called when a pixel's opaque state in the {@link Texture2D} is queried at the specified `(x, y)` position.
   */
  _is_pixel_opaque(x: int, y: int): boolean;
  /** Creates a placeholder version of this resource ({@link PlaceholderTexture2D}). */
  create_placeholder(): Resource;
  /**
   * Draws the texture using a {@link CanvasItem} with the {@link RenderingServer} API at the specified `position`.
   */
  draw(canvas_item: RID, position: Vector2 | Vector2i, modulate?: Color, transpose?: boolean): void;
  /** Draws the texture using a {@link CanvasItem} with the {@link RenderingServer} API. */
  draw_rect(canvas_item: RID, rect: Rect2 | Rect2i, tile: boolean, modulate?: Color, transpose?: boolean): void;
  /** Draws a part of the texture using a {@link CanvasItem} with the {@link RenderingServer} API. */
  draw_rect_region(canvas_item: RID, rect: Rect2 | Rect2i, src_rect: Rect2 | Rect2i, modulate?: Color, transpose?: boolean, clip_uv?: boolean): void;
  /** Returns the image format of the texture. */
  get_format(): int;
  /** Returns the texture height in pixels. */
  get_height(): int;
  /**
   * Returns an {@link Image} that is a copy of data from this {@link Texture2D} (a new {@link Image} is created each time). {@link Image}s can be accessed and manipulated directly.
   * **Note:** This will return `null` if this {@link Texture2D} is invalid.
   * **Note:** This will fetch the texture data from the GPU, which might cause performance problems when overused. Avoid calling {@link get_image} every frame, especially on large textures.
   */
  get_image(): Image | null;
  /** Returns the number of mipmaps of the texture. */
  get_mipmap_count(): int;
  /** Returns the texture size in pixels. */
  get_size(): Vector2;
  /** Returns the texture width in pixels. */
  get_width(): int;
  /** Returns `true` if this {@link Texture2D} has an alpha channel. */
  has_alpha(): boolean;
  /** Returns `true` if the texture has mipmaps. */
  has_mipmaps(): boolean;
}
