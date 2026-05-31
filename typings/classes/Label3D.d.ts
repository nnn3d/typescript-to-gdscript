// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A node for displaying plain text in 3D space. */
declare class Label3D extends GeometryInstance3D {
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
  /**
   * If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text.
   */
  autowrap_mode: int;
  /**
   * Autowrap space trimming flags. See {@link TextServer.BREAK_TRIM_START_EDGE_SPACES} and {@link TextServer.BREAK_TRIM_END_EDGE_SPACES} for more info.
   */
  autowrap_trim_flags: int;
  /** The billboard mode to use for the label. */
  billboard: int;
  /**
   * <member name="double_sided" type="bool" setter="set_draw_flag" getter="get_draw_flag" default="true">
   * If `true`, text can be seen from the back as well, if `false`, it is invisible when looking at it from behind.
   */
  cast_shadow: int;
  /**
   * If `true`, the label is rendered at the same size regardless of distance. The label's size on screen is the same as if the camera was `1.0` units away from the label's origin, regardless of the actual distance from the camera. The {@link Camera3D}'s field of view (or {@link Camera3D.size} when in orthogonal/frustum mode) still affects the size the label is drawn at.
   */
  fixed_size: boolean;
  /** Font configuration used to display text. */
  font: Font | null;
  /**
   * Font size of the {@link Label3D}'s text. To make the font look more detailed when up close, increase {@link font_size} while decreasing {@link pixel_size} at the same time.
   * Higher font sizes require more time to render new characters, which can cause stuttering during gameplay.
   */
  font_size: int;
  /**
   * <member name="horizontal_alignment" type="int" setter="set_horizontal_alignment" getter="get_horizontal_alignment" enum="HorizontalAlignment" default="1">
   * Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify).
   */
  gi_mode: int;
  /** Line fill alignment rules. */
  justification_flags: int;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /**
   * Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative.
   */
  line_spacing: float;
  /** Text {@link Color} of the {@link Label3D}. */
  modulate: Color;
  /** If `true`, depth testing is disabled and the object will be drawn in render order. */
  no_depth_test: boolean;
  /** The text drawing offset (in pixels). */
  offset: Vector2;
  /** The tint of text outline. */
  outline_modulate: Color;
  /**
   * Sets the render priority for the text outline. Higher priority objects will be sorted in front of lower priority objects.
   * **Note:** This only applies if {@link alpha_cut} is set to {@link ALPHA_CUT_DISABLED} (default value).
   * **Note:** This only applies to sorting of transparent objects. This will not impact how transparent objects are sorted relative to opaque objects. This is because opaque objects are not sorted, while transparent objects are sorted from back to front (subject to priority).
   */
  outline_render_priority: int;
  /** Text outline size. */
  outline_size: int;
  /**
   * The size of one pixel's width on the label to scale it in 3D. To make the font look more detailed when up close, increase {@link font_size} while decreasing {@link pixel_size} at the same time.
   */
  pixel_size: float;
  /**
   * Sets the render priority for the text. Higher priority objects will be sorted in front of lower priority objects.
   * **Note:** This only applies if {@link alpha_cut} is set to {@link ALPHA_CUT_DISABLED} (default value).
   * **Note:** This only applies to sorting of transparent objects. This will not impact how transparent objects are sorted relative to opaque objects. This is because opaque objects are not sorted, while transparent objects are sorted from back to front (subject to priority).
   */
  render_priority: int;
  /** If `true`, the {@link Light3D} in the {@link Environment} has effects on the label. */
  shaded: boolean;
  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /** The text to display on screen. */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** Filter flags for the texture. */
  texture_filter: int;
  /** If `true`, all the text displays as UPPERCASE. */
  uppercase: boolean;
  /** Controls the text's vertical alignment. Supports top, center, and bottom. */
  vertical_alignment: int;
  /** Text width (in pixels), used for autowrap and fill alignment. */
  width: float;
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
  set_autowrap_mode(value: int): void;
  get_autowrap_mode(): int;
  set_autowrap_trim_flags(value: int): void;
  get_autowrap_trim_flags(): int;
  set_billboard_mode(value: int): void;
  get_billboard_mode(): int;
  set_font(value: Font | null): void;
  get_font(): Font | null;
  set_font_size(value: int): void;
  get_font_size(): int;
  set_justification_flags(value: int): void;
  get_justification_flags(): int;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_line_spacing(value: float): void;
  get_line_spacing(): float;
  set_modulate(value: Color): void;
  get_modulate(): Color;
  set_offset(value: Vector2 | Vector2i): void;
  get_offset(): Vector2;
  set_outline_modulate(value: Color): void;
  get_outline_modulate(): Color;
  set_outline_render_priority(value: int): void;
  get_outline_render_priority(): int;
  set_outline_size(value: int): void;
  get_outline_size(): int;
  set_pixel_size(value: float): void;
  get_pixel_size(): float;
  set_render_priority(value: int): void;
  get_render_priority(): int;
  set_structured_text_bidi_override(value: int): void;
  get_structured_text_bidi_override(): int;
  set_structured_text_bidi_override_options(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_text(value: string | NodePath): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_texture_filter(value: int): void;
  get_texture_filter(): int;
  set_uppercase(value: boolean): void;
  is_uppercase(): boolean;
  set_vertical_alignment(value: int): void;
  get_vertical_alignment(): int;
  set_width(value: float): void;
  get_width(): float;

  /**
   * Returns a {@link TriangleMesh} with the label's vertices following its current configuration (such as its {@link pixel_size}).
   */
  generate_triangle_mesh(): TriangleMesh | null;
  /** Returns the value of the specified flag. */
  get_draw_flag(flag: int): boolean;
  /** If `true`, the specified `flag` will be enabled. */
  set_draw_flag(flag: int, enabled: boolean): void;

  // enum DrawFlags
  /** If set, lights in the environment affect the label. */
  static readonly FLAG_SHADED: int;
  /**
   * If set, text can be seen from the back as well. If not, the text is invisible when looking at it from behind.
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
   * This mode performs standard alpha blending. It can display translucent areas, but transparency sorting issues may be visible when multiple transparent materials are overlapping. {@link GeometryInstance3D.cast_shadow} has no effect when this transparency mode is used; the {@link Label3D} will never cast shadows.
   */
  static readonly ALPHA_CUT_DISABLED: int;
  /**
   * This mode only allows fully transparent or fully opaque pixels. Harsh edges will be visible unless some form of screen-space antialiasing is enabled (see {@link ProjectSettings.rendering/anti_aliasing/quality/screen_space_aa}). This mode is also known as *alpha testing* or *1-bit transparency*.
   * **Note:** This mode might have issues with anti-aliased fonts and outlines, try adjusting {@link alpha_scissor_threshold} or using MSDF font.
   * **Note:** When using text with overlapping glyphs (e.g., cursive scripts), this mode might have transparency sorting issues between the main text and the outline.
   */
  static readonly ALPHA_CUT_DISCARD: int;
  /**
   * This mode draws fully opaque pixels in the depth prepass. This is slower than {@link ALPHA_CUT_DISABLED} or {@link ALPHA_CUT_DISCARD}, but it allows displaying translucent areas and smooth edges while using proper sorting.
   * **Note:** When using text with overlapping glyphs (e.g., cursive scripts), this mode might have transparency sorting issues between the main text and the outline.
   */
  static readonly ALPHA_CUT_OPAQUE_PREPASS: int;
  /**
   * This mode draws cuts off all values below a spatially-deterministic threshold, the rest will remain opaque.
   */
  static readonly ALPHA_CUT_HASH: int;
}
