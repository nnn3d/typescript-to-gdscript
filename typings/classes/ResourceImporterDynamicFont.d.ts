// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports a TTF, TTC, OTF, OTC, WOFF or WOFF2 font file for font rendering that adapts to any size. */
declare class ResourceImporterDynamicFont extends ResourceImporter {
  /**
   * If `true`, automatically use system fonts as a fallback if a glyph isn't found in this dynamic font. This makes supporting CJK characters or emoji more straightforward, as you don't need to include a CJK/emoji font in your project. See also {@link fallbacks}.
   * **Note:** The appearance of system fonts varies across platforms. Loading system fonts is only supported on Windows, macOS, Linux, Android and iOS.
   */
  allow_system_fallback: boolean;
  /**
   * The font antialiasing method to use.
   * **Disabled:** Most suited for pixel art fonts, although you do not *have* to change the antialiasing from the default **Grayscale** if the font file was well-created and the font is used at an integer multiple of its intended size. If pixel art fonts have a bad appearance at their intended size, try setting {@link subpixel_positioning} to **Disabled** instead.
   * **Grayscale:** Use grayscale antialiasing. This is the approach used by the operating system on macOS, Android and iOS.
   * **LCD Subpixel:** Use antialiasing with subpixel patterns to make fonts sharper on LCD displays. This is the approach used by the operating system on Windows and most Linux distributions. The downside is that this can introduce "fringing" on edges, especially on display technologies that don't use standard RGB subpixels (such as OLED displays). The LCD subpixel layout is globally controlled by {@link ProjectSettings.gui/theme/lcd_subpixel_layout}, which also allows falling back to grayscale antialiasing.
   */
  antialiasing: int;
  /** If `true`, uses lossless compression for the resulting font. */
  compress: boolean;
  /**
   * If set to `true`, embedded font bitmap loading is disabled (bitmap-only and color fonts ignore this property).
   */
  disable_embedded_bitmaps: boolean;
  /**
   * List of font fallbacks to use if a glyph isn't found in this dynamic font. Fonts at the beginning of the array are attempted first, but fallback fonts that don't support the glyph's language and script are attempted last (see {@link language_support} and {@link script_support}). See also {@link allow_system_fallback}.
   */
  fallbacks: Array<unknown>;
  /**
   * If `true`, forces generation of hinting data for the font using FreeType (https://freetype.org/)'s autohinter. This will make {@link hinting} effective with fonts that don't include hinting data.
   */
  force_autohinter: boolean;
  /**
   * If `true`, this font will have mipmaps generated. This prevents text from looking grainy when a {@link Control} is scaled down, or when a {@link Label3D} is viewed from a long distance (if {@link Label3D.texture_filter} is set to a mode that displays mipmaps).
   * Enabling {@link generate_mipmaps} increases font generation time and memory usage. Only enable this setting if you actually need it.
   */
  generate_mipmaps: boolean;
  /**
   * The hinting mode to use. This controls how aggressively glyph edges should be snapped to pixels when rasterizing the font. Depending on personal preference, you may prefer using one hinting mode over the other. Hinting modes other than **None** are only effective if the font contains hinting data (see {@link force_autohinter}).
   * **None:** Smoothest appearance, which can make the font look blurry at small sizes.
   * **Light:** Sharp result by snapping glyph edges to pixels on the Y axis only.
   * **Normal:** Sharpest by snapping glyph edges to pixels on both X and Y axes.
   */
  hinting: int;
  /**
   * If set to `true`, when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled.
   */
  keep_rounding_remainders: boolean;
  /**
   * Override the list of languages supported by this font. If left empty, this is supplied by the font metadata. There is usually no need to change this. See also {@link script_support}.
   */
  language_support: Dictionary;
  /**
   * If set to `true`, color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only.
   */
  modulate_color_glyphs: boolean;
  /**
   * The width of the range around the shape between the minimum and maximum representable signed distance. If using font outlines, {@link msdf_pixel_range} must be set to at least *twice* the size of the largest font outline. The default {@link msdf_pixel_range} value of `8` allows outline sizes up to `4` to look correct.
   */
  msdf_pixel_range: int;
  /**
   * Source font size used to generate MSDF textures. Higher values allow for more precision, but are slower to render and require more memory. Only increase this value if you notice a visible lack of precision in glyph rendering. Only effective if {@link multichannel_signed_distance_field} is `true`.
   */
  msdf_size: int;
  /**
   * If set to `true`, the font will use multichannel signed distance field (MSDF) for crisp rendering at any size. Since this approach does not rely on rasterizing the font every time its size changes, this allows for resizing the font in real-time without any performance penalty. Text will also not look grainy for {@link Control}s that are scaled down (or for {@link Label3D}s viewed from a long distance).
   * MSDF font rendering can be combined with {@link generate_mipmaps} to further improve font rendering quality when scaled down.
   */
  multichannel_signed_distance_field: boolean;
  /**
   * The OpenType features to enable, disable or set a value for this font. This can be used to enable optional features provided by the font, such as ligatures or alternative glyphs. The list of supported OpenType features varies on a per-font basis.
   */
  opentype_features: Dictionary;
  /**
   * If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See {@link Viewport.oversampling}. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods.
   */
  oversampling: float;
  /**
   * The glyph ranges to prerender. This can avoid stuttering during gameplay when new characters need to be rendered, especially if {@link subpixel_positioning} is enabled. The downside of using preloading is that initial project load times will increase, as well as memory usage.
   */
  preload: Array<unknown>;
  /**
   * Override the list of language scripts supported by this font. If left empty, this is supplied by the font metadata. There is usually no need to change this. See also {@link language_support}.
   */
  script_support: Dictionary;
  /**
   * Subpixel positioning improves font rendering appearance, especially at smaller font sizes. The downside is that it takes more time to initially render the font, which can cause stuttering during gameplay, especially if used with large font sizes. This should be set to **Disabled** for fonts with a pixel art appearance.
   * **Disabled:** No subpixel positioning. Lowest quality, fastest rendering.
   * **Auto:** Use subpixel positioning at small font sizes (the chosen quality varies depending on font size). Large fonts will not use subpixel positioning. This is a good tradeoff between performance and quality.
   * **One Half of a Pixel:** Always perform intermediate subpixel positioning regardless of font size. High quality, slow rendering.
   * **One Quarter of a Pixel:** Always perform precise subpixel positioning regardless of font size. Highest quality, slowest rendering.
   * **Auto (Except Pixel Fonts):** **Disabled** for the pixel style fonts (each glyph contours contain only straight horizontal and vertical lines), **Auto** for the other fonts.
   */
  subpixel_positioning: int;
}
