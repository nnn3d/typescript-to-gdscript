// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** General-purpose sprite node. */
declare class Sprite2D<Tree extends object = any> extends Node2D<Tree> {
  /**
   * If `true`, texture is centered.
   * **Note:** For games with a pixel art aesthetic, textures may appear deformed when centered. This is caused by their position being between pixels. To prevent this, set this property to `false`, or consider enabling {@link ProjectSettings.rendering/2d/snap/snap_2d_vertices_to_pixel} and {@link ProjectSettings.rendering/2d/snap/snap_2d_transforms_to_pixel}.
   */
  centered: boolean;
  /** If `true`, texture is flipped horizontally. */
  flip_h: boolean;
  /** If `true`, texture is flipped vertically. */
  flip_v: boolean;
  /**
   * Current frame to display from sprite sheet. {@link hframes} or {@link vframes} must be greater than 1. This property is automatically adjusted when {@link hframes} or {@link vframes} are changed to keep pointing to the same visual frame (same column and row). If that's impossible, this value is reset to `0`.
   */
  frame: int;
  /**
   * Coordinates of the frame to display from sprite sheet. This is as an alias for the {@link frame} property. {@link hframes} or {@link vframes} must be greater than 1.
   */
  frame_coords: Vector2i;
  /**
   * The number of columns in the sprite sheet. When this property is changed, {@link frame} is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, {@link frame} is reset to `0`.
   */
  hframes: int;
  /**
   * The texture's drawing offset.
   * **Note:** When you increase {@link offset}.y in Sprite2D, the sprite moves downward on screen (i.e., +Y is down).
   */
  offset: Vector2;
  /**
   * If `true`, texture is cut from a larger atlas texture. See {@link region_rect}.
   * **Note:** When using a custom {@link Shader} on a {@link Sprite2D}, the `UV` shader built-in will refer to the entire texture space. Use the `REGION_RECT` built-in to get the currently visible region defined in {@link region_rect} instead. See CanvasItem shaders ($DOCS_URL/tutorials/shaders/shader_reference/canvas_item_shader.html) for details.
   */
  region_enabled: boolean;
  /**
   * If `true`, the area outside of the {@link region_rect} is clipped to avoid bleeding of the surrounding texture pixels. {@link region_enabled} must be `true`.
   */
  region_filter_clip_enabled: boolean;
  /** The region of the atlas texture to display. {@link region_enabled} must be `true`. */
  region_rect: Rect2;
  /** {@link Texture2D} object to draw. */
  texture: Texture2D;
  /**
   * The number of rows in the sprite sheet. When this property is changed, {@link frame} is adjusted so that the same visual frame is maintained (same row and column). If that's impossible, {@link frame} is reset to `0`.
   */
  vframes: int;
  set_centered(value: boolean): void;
  is_centered(): boolean;
  set_flip_h(value: boolean): void;
  is_flipped_h(): boolean;
  set_flip_v(value: boolean): void;
  is_flipped_v(): boolean;
  set_frame(value: int): void;
  get_frame(): int;
  set_frame_coords(value: Vector2i): void;
  get_frame_coords(): Vector2i;
  set_hframes(value: int): void;
  get_hframes(): int;
  set_offset(value: Vector2): void;
  get_offset(): Vector2;
  set_region_enabled(value: boolean): void;
  is_region_enabled(): boolean;
  set_region_filter_clip_enabled(value: boolean): void;
  is_region_filter_clip_enabled(): boolean;
  set_region_rect(value: Rect2): void;
  get_region_rect(): Rect2;
  set_texture(value: Texture2D): void;
  get_texture(): Texture2D;
  set_vframes(value: int): void;
  get_vframes(): int;

  /**
   * Returns a {@link Rect2} representing the Sprite2D's boundary in local coordinates.
   * **Example:** Detect if the Sprite2D was clicked:
   */
  get_rect(): Rect2;
  /**
   * Returns `true` if the pixel at the given position is opaque, `false` otherwise. Also returns `false` if the given position is out of bounds or this sprite's {@link texture} is `null`. `pos` is in local coordinates.
   */
  is_pixel_opaque(pos: Vector2): boolean;

  /** Emitted when the {@link frame} changes. */
  frame_changed: Signal<[]>;
  /** Emitted when the {@link texture} changes. */
  texture_changed: Signal<[]>;
}
