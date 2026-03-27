// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * A font loaded from a system font. Falls back to a default theme font if not implemented on the host OS.
 */
declare class SystemFont extends Font {
  /** If set to `true`, system fonts can be automatically used as fallbacks. */
  allow_system_fallback: boolean;
  /** Font anti-aliasing mode. */
  antialiasing: int;
  /**
   * If set to `true`, embedded font bitmap loading is disabled (bitmap-only and color fonts ignore this property).
   */
  disable_embedded_bitmaps: boolean;
  /** If set to `true`, italic or oblique font is preferred. */
  font_italic: boolean;
  /** Array of font family names to search, first matching font found is used. */
  font_names: PackedStringArray;
  /**
   * Preferred font stretch amount, compared to a normal width. A percentage value between `50%` and `200%`.
   */
  font_stretch: int;
  /**
   * Preferred weight (boldness) of the font. A value in the `100...999` range, normal font weight is `400`, bold font weight is `700`.
   */
  font_weight: int;
  /** If set to `true`, auto-hinting is supported and preferred over font built-in hinting. */
  force_autohinter: boolean;
  /** If set to `true`, generate mipmaps for the font textures. */
  generate_mipmaps: boolean;
  /** Font hinting mode. */
  hinting: int;
  /**
   * If set to `true`, when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled.
   */
  keep_rounding_remainders: boolean;
  /**
   * If set to `true`, color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only.
   */
  modulate_color_glyphs: boolean;
  /**
   * The width of the range around the shape between the minimum and maximum representable signed distance. If using font outlines, {@link msdf_pixel_range} must be set to at least *twice* the size of the largest font outline. The default {@link msdf_pixel_range} value of `16` allows outline sizes up to `8` to look correct.
   */
  msdf_pixel_range: int;
  /**
   * Source font size used to generate MSDF textures. Higher values allow for more precision, but are slower to render and require more memory. Only increase this value if you notice a visible lack of precision in glyph rendering.
   */
  msdf_size: int;
  /**
   * If set to `true`, glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data.
   */
  multichannel_signed_distance_field: boolean;
  /**
   * If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See {@link Viewport.oversampling}. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods.
   */
  oversampling: float;
  /**
   * Font glyph subpixel positioning mode. Subpixel positioning provides shaper text and better kerning for smaller font sizes, at the cost of memory usage and font rasterization speed. Use {@link TextServer.SUBPIXEL_POSITIONING_AUTO} to automatically enable it based on the font size.
   */
  subpixel_positioning: int;
  set_allow_system_fallback(value: boolean): void;
  is_allow_system_fallback(): boolean;
  set_antialiasing(value: int): void;
  get_antialiasing(): int;
  set_disable_embedded_bitmaps(value: boolean): void;
  get_disable_embedded_bitmaps(): boolean;
  set_font_italic(value: boolean): void;
  get_font_italic(): boolean;
  set_font_names(value: PackedStringArray): void;
  get_font_names(): PackedStringArray;
  set_font_stretch(value: int): void;
  set_font_weight(value: int): void;
  set_force_autohinter(value: boolean): void;
  is_force_autohinter(): boolean;
  set_generate_mipmaps(value: boolean): void;
  get_generate_mipmaps(): boolean;
  set_hinting(value: int): void;
  get_hinting(): int;
  set_keep_rounding_remainders(value: boolean): void;
  get_keep_rounding_remainders(): boolean;
  set_modulate_color_glyphs(value: boolean): void;
  is_modulate_color_glyphs(): boolean;
  set_msdf_pixel_range(value: int): void;
  get_msdf_pixel_range(): int;
  set_msdf_size(value: int): void;
  get_msdf_size(): int;
  set_multichannel_signed_distance_field(value: boolean): void;
  is_multichannel_signed_distance_field(): boolean;
  set_oversampling(value: float): void;
  get_oversampling(): float;
  set_subpixel_positioning(value: int): void;
  get_subpixel_positioning(): int;
}
