// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** 2D sprite node in 3D environment. */
declare class SpriteBase3D<Tree extends object = any> extends GeometryInstance3D<Tree> {
  /** Threshold at which antialiasing will be applied on the alpha channel. */
  alpha_antialiasing_edge: float;
  /** The type of alpha antialiasing to apply. */
  alpha_antialiasing_mode: int;
  /** The alpha cutting mode to use for the sprite. */
  alpha_cut: int;
  /** The hashing scale for Alpha Hash. Recommended values between `0` and `2`. */
  alpha_hash_scale: float;
  /** Threshold at which the alpha scissor will discard values. */
  alpha_scissor_threshold: float;
  /** The direction in which the front of the texture faces. */
  axis: int;
  /**
   * The billboard mode to use for the sprite.
   * **Note:** When billboarding is enabled and the material also casts shadows, billboards will face **the** camera in the scene when rendering shadows. In scenes with multiple cameras, the intended shadow cannot be determined and this will result in undefined behavior. See GitHub Pull Request #72638 (https://github.com/godotengine/godot/pull/72638) for details.
   */
  billboard: int;
  /** If `true`, texture will be centered. */
  centered: boolean;
  /**
   * If `true`, texture can be seen from the back as well, if `false`, it is invisible when looking at it from behind.
   */
  double_sided: boolean;
  /**
   * If `true`, the texture is rendered at the same size regardless of distance. The texture's size on screen is the same as if the camera was `1.0` units away from the texture's origin, regardless of the actual distance from the camera. The {@link Camera3D}'s field of view (or {@link Camera3D.size} when in orthogonal/frustum mode) still affects the size the sprite is drawn at.
   */
  fixed_size: boolean;
  /** If `true`, texture is flipped horizontally. */
  flip_h: boolean;
  /** If `true`, texture is flipped vertically. */
  flip_v: boolean;
  /**
   * A color value used to *multiply* the texture's colors. Can be used for mood-coloring or to simulate the color of ambient light.
   * **Note:** Unlike {@link CanvasItem.modulate} for 2D, colors with values above `1.0` (overbright) are not supported.
   * **Note:** If a {@link GeometryInstance3D.material_override} is defined on the {@link SpriteBase3D}, the material override must be configured to take vertex colors into account for albedo. Otherwise, the color defined in {@link modulate} will be ignored. For a {@link BaseMaterial3D}, {@link BaseMaterial3D.vertex_color_use_as_albedo} must be `true`. For a {@link ShaderMaterial}, `ALBEDO *= COLOR.rgb;` must be inserted in the shader's `fragment()` function.
   */
  modulate: Color;
  /** If `true`, depth testing is disabled and the object will be drawn in render order. */
  no_depth_test: boolean;
  /**
   * The texture's drawing offset.
   * **Note:** When you increase {@link offset}.y in Sprite3D, the sprite moves upward in world space (i.e., +Y is up).
   */
  offset: Vector2;
  /** The size of one pixel's width on the sprite to scale it in 3D. */
  pixel_size: float;
  /**
   * Sets the render priority for the sprite. Higher priority objects will be sorted in front of lower priority objects.
   * **Note:** This only applies if {@link alpha_cut} is set to {@link ALPHA_CUT_DISABLED} (default value).
   * **Note:** This only applies to sorting of transparent objects. This will not impact how transparent objects are sorted relative to opaque objects. This is because opaque objects are not sorted, while transparent objects are sorted from back to front (subject to priority).
   */
  render_priority: int;
  /** If `true`, the {@link Light3D} in the {@link Environment} has effects on the sprite. */
  shaded: boolean;
  /**
   * Filter flags for the texture.
   * **Note:** Linear filtering may cause artifacts around the edges, which are especially noticeable on opaque textures. To prevent this, use textures with transparent or identical colors around the edges.
   */
  texture_filter: int;
  /**
   * If `true`, the texture's transparency and the opacity are used to make those parts of the sprite invisible.
   */
  transparent: boolean;
  set_alpha_antialiasing_edge(value: float): void;
  get_alpha_antialiasing_edge(): float;
  set_alpha_antialiasing(value: int): void;
  get_alpha_antialiasing(): int;
  set_alpha_cut_mode(value: int): void;
  get_alpha_cut_mode(): int;
  set_alpha_hash_scale(value: float): void;
  get_alpha_hash_scale(): float;
  set_alpha_scissor_threshold(value: float): void;
  get_alpha_scissor_threshold(): float;
  set_axis(value: int): void;
  get_axis(): int;
  set_billboard_mode(value: int): void;
  get_billboard_mode(): int;
  set_centered(value: boolean): void;
  is_centered(): boolean;
  set_flip_h(value: boolean): void;
  is_flipped_h(): boolean;
  set_flip_v(value: boolean): void;
  is_flipped_v(): boolean;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_offset(value: Vector2): void;
  get_offset(): Vector2;
  set_pixel_size(value: float): void;
  get_pixel_size(): float;
  set_render_priority(value: int): void;
  get_render_priority(): int;
  set_texture_filter(value: int): void;
  get_texture_filter(): int;

  /**
   * Returns a {@link TriangleMesh} with the sprite's vertices following its current configuration (such as its {@link axis} and {@link pixel_size}).
   */
  generate_triangle_mesh(): TriangleMesh;
  /** Returns the value of the specified flag. */
  get_draw_flag(flag: int): boolean;
  /** Returns the rectangle representing this sprite. */
  get_item_rect(): Rect2;
  /** If `true`, the specified flag will be enabled. */
  set_draw_flag(flag: int, enabled: boolean): void;

  // enum DrawFlags
  /**
   * If set, the texture's transparency and the opacity are used to make those parts of the sprite invisible.
   */
  static readonly FLAG_TRANSPARENT: int;
  /** If set, lights in the environment affect the sprite. */
  static readonly FLAG_SHADED: int;
  /**
   * If set, texture can be seen from the back as well. If not, the texture is invisible when looking at it from behind.
   */
  static readonly FLAG_DOUBLE_SIDED: int;
  /**
   * Disables the depth test, so this object is drawn on top of all others. However, objects drawn after it in the draw order may cover it.
   */
  static readonly FLAG_DISABLE_DEPTH_TEST: int;
  /** Label is scaled by depth so that it always appears the same size on screen. */
  static readonly FLAG_FIXED_SIZE: int;
  /** Represents the size of the {@link DrawFlags} enum. */
  static readonly FLAG_MAX: int;
  // enum AlphaCutMode
  /**
   * This mode performs standard alpha blending. It can display translucent areas, but transparency sorting issues may be visible when multiple transparent materials are overlapping.
   */
  static readonly ALPHA_CUT_DISABLED: int;
  /**
   * This mode only allows fully transparent or fully opaque pixels. Harsh edges will be visible unless some form of screen-space antialiasing is enabled (see {@link ProjectSettings.rendering/anti_aliasing/quality/screen_space_aa}). On the bright side, this mode doesn't suffer from transparency sorting issues when multiple transparent materials are overlapping. This mode is also known as *alpha testing* or *1-bit transparency*.
   */
  static readonly ALPHA_CUT_DISCARD: int;
  /**
   * This mode draws fully opaque pixels in the depth prepass. This is slower than {@link ALPHA_CUT_DISABLED} or {@link ALPHA_CUT_DISCARD}, but it allows displaying translucent areas and smooth edges while using proper sorting.
   */
  static readonly ALPHA_CUT_OPAQUE_PREPASS: int;
  /**
   * This mode draws cuts off all values below a spatially-deterministic threshold, the rest will remain opaque.
   */
  static readonly ALPHA_CUT_HASH: int;
}
