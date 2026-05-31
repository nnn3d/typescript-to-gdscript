// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for custom {@link TextServer} implementations (plugins). */
declare class TextServerExtension extends TextServer {
  /** This method is called before text server is unregistered. */
  _cleanup(): void;
  /** Creates a new, empty font cache entry resource. */
  _create_font(): RID;
  /**
   * Optional, implement if font supports extra spacing or baseline offset.
   * Creates a new variation existing font which is reusing the same glyph cache and font data.
   */
  _create_font_linked_variation(font_rid: RID): RID;
  /** Creates a new buffer for complex text layout, with the given `direction` and `orientation`. */
  _create_shaped_text(direction: int, orientation: int): RID;
  /** Draws box displaying character hexadecimal code. */
  _draw_hex_code_box(canvas: RID, size: int, pos: Vector2 | Vector2i, index: int, color: Color): void;
  /** Removes all rendered glyph information from the cache entry. */
  _font_clear_glyphs(font_rid: RID, size: Vector2i | Vector2): void;
  /** Removes all kerning overrides. */
  _font_clear_kerning_map(font_rid: RID, size: int): void;
  /** Removes all font sizes from the cache entry. */
  _font_clear_size_cache(font_rid: RID): void;
  /** Frees all automatically loaded system fonts. */
  _font_clear_system_fallback_cache(): void;
  /** Removes all textures from font cache entry. */
  _font_clear_textures(font_rid: RID, size: Vector2i | Vector2): void;
  /**
   * Draws single glyph into a canvas item at the position, using `font_rid` at the size `size`. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  _font_draw_glyph(font_rid: RID, canvas: RID, size: int, pos: Vector2 | Vector2i, index: int, color: Color, oversampling: float): void;
  /**
   * Draws single glyph outline of size `outline_size` into a canvas item at the position, using `font_rid` at the size `size`. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  _font_draw_glyph_outline(font_rid: RID, canvas: RID, size: int, outline_size: int, pos: Vector2 | Vector2i, index: int, color: Color, oversampling: float): void;
  /** Returns font anti-aliasing mode. */
  _font_get_antialiasing(font_rid: RID): int;
  /** Returns the font ascent (number of pixels above the baseline). */
  _font_get_ascent(font_rid: RID, size: int): float;
  /** Returns extra baseline offset (as a fraction of font height). */
  _font_get_baseline_offset(font_rid: RID): float;
  /** Returns character code associated with `glyph_index`, or `0` if `glyph_index` is invalid. */
  _font_get_char_from_glyph_index(font_rid: RID, size: int, glyph_index: int): int;
  /** Returns the font descent (number of pixels below the baseline). */
  _font_get_descent(font_rid: RID, size: int): float;
  /** Returns whether the font's embedded bitmap loading is disabled. */
  _font_get_disable_embedded_bitmaps(font_rid: RID): boolean;
  /** Returns font embolden strength. */
  _font_get_embolden(font_rid: RID): float;
  /** Returns number of faces in the TrueType / OpenType collection. */
  _font_get_face_count(font_rid: RID): int;
  /** Returns an active face index in the TrueType / OpenType collection. */
  _font_get_face_index(font_rid: RID): int;
  /** Returns bitmap font fixed size. */
  _font_get_fixed_size(font_rid: RID): int;
  /** Returns bitmap font scaling mode. */
  _font_get_fixed_size_scale_mode(font_rid: RID): int;
  /** Returns `true` if font texture mipmap generation is enabled. */
  _font_get_generate_mipmaps(font_rid: RID): boolean;
  /** Returns the font oversampling factor, shared by all fonts in the TextServer. */
  _font_get_global_oversampling(): float;
  /** Returns glyph advance (offset of the next glyph). */
  _font_get_glyph_advance(font_rid: RID, size: int, glyph: int): Vector2;
  /** Returns outline contours of the glyph. */
  _font_get_glyph_contours(font_rid: RID, size: int, index: int): Dictionary;
  /** Returns the glyph index of a `char`, optionally modified by the `variation_selector`. */
  _font_get_glyph_index(font_rid: RID, size: int, char: int, variation_selector: int): int;
  /** Returns list of rendered glyphs in the cache entry. */
  _font_get_glyph_list(font_rid: RID, size: Vector2i | Vector2): PackedInt32Array;
  /** Returns glyph offset from the baseline. */
  _font_get_glyph_offset(font_rid: RID, size: Vector2i | Vector2, glyph: int): Vector2;
  /** Returns size of the glyph. */
  _font_get_glyph_size(font_rid: RID, size: Vector2i | Vector2, glyph: int): Vector2;
  /** Returns index of the cache texture containing the glyph. */
  _font_get_glyph_texture_idx(font_rid: RID, size: Vector2i | Vector2, glyph: int): int;
  /** Returns resource ID of the cache texture containing the glyph. */
  _font_get_glyph_texture_rid(font_rid: RID, size: Vector2i | Vector2, glyph: int): RID;
  /** Returns size of the cache texture containing the glyph. */
  _font_get_glyph_texture_size(font_rid: RID, size: Vector2i | Vector2, glyph: int): Vector2;
  /** Returns rectangle in the cache texture containing the glyph. */
  _font_get_glyph_uv_rect(font_rid: RID, size: Vector2i | Vector2, glyph: int): Rect2;
  /** Returns the font hinting mode. Used by dynamic fonts only. */
  _font_get_hinting(font_rid: RID): int;
  /**
   * Returns glyph position rounding behavior. If set to `true`, when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled.
   */
  _font_get_keep_rounding_remainders(font_rid: RID): boolean;
  /** Returns kerning for the pair of glyphs. */
  _font_get_kerning(font_rid: RID, size: int, glyph_pair: Vector2i | Vector2): Vector2;
  /** Returns list of the kerning overrides. */
  _font_get_kerning_list(font_rid: RID, size: int): Array<Vector2i>;
  /** Returns `true` if support override is enabled for the `language`. */
  _font_get_language_support_override(font_rid: RID, language: string | NodePath): boolean;
  /** Returns list of language support overrides. */
  _font_get_language_support_overrides(font_rid: RID): PackedStringArray;
  /**
   * Returns the width of the range around the shape between the minimum and maximum representable signed distance.
   */
  _font_get_msdf_pixel_range(font_rid: RID): int;
  /** Returns source font size used to generate MSDF textures. */
  _font_get_msdf_size(font_rid: RID): int;
  /** Returns font family name. */
  _font_get_name(font_rid: RID): string;
  /** Returns font OpenType feature set override. */
  _font_get_opentype_feature_overrides(font_rid: RID): Dictionary;
  /**
   * Returns {@link Dictionary} with OpenType font name strings (localized font names, version, description, license information, sample text, etc.).
   */
  _font_get_ot_name_strings(font_rid: RID): Dictionary;
  /**
   * Returns oversampling factor override. If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See {@link Viewport.oversampling}. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only.
   */
  _font_get_oversampling(font_rid: RID): float;
  /** Returns scaling factor of the color bitmap font. */
  _font_get_scale(font_rid: RID, size: int): float;
  /** Returns `true` if support override is enabled for the `script`. */
  _font_get_script_support_override(font_rid: RID, script: string | NodePath): boolean;
  /** Returns list of script support overrides. */
  _font_get_script_support_overrides(font_rid: RID): PackedStringArray;
  /**
   * Returns font cache information, each entry contains the following fields: `Vector2i size_px` - font size in pixels, `float viewport_oversampling` - viewport oversampling factor, `int glyphs` - number of rendered glyphs, `int textures` - number of used textures, `int textures_size` - size of texture data in bytes.
   */
  _font_get_size_cache_info(font_rid: RID): Array<Dictionary>;
  /**
   * Returns list of the font sizes in the cache. Each size is {@link Vector2i} with font size and outline size.
   */
  _font_get_size_cache_list(font_rid: RID): Array<Vector2i>;
  /** Returns the spacing for `spacing` in pixels (not relative to the font size). */
  _font_get_spacing(font_rid: RID, spacing: int): int;
  /**
   * Returns font stretch amount, compared to a normal width. A percentage value between `50%` and `200%`.
   */
  _font_get_stretch(font_rid: RID): int;
  /** Returns font style flags. */
  _font_get_style(font_rid: RID): int;
  /** Returns font style name. */
  _font_get_style_name(font_rid: RID): string;
  /** Returns font subpixel glyph positioning mode. */
  _font_get_subpixel_positioning(font_rid: RID): int;
  /** Returns a string containing all the characters available in the font. */
  _font_get_supported_chars(font_rid: RID): string;
  /** Returns an array containing all glyph indices in the font. */
  _font_get_supported_glyphs(font_rid: RID): PackedInt32Array;
  /** Returns number of textures used by font cache entry. */
  _font_get_texture_count(font_rid: RID, size: Vector2i | Vector2): int;
  /** Returns font cache texture image data. */
  _font_get_texture_image(font_rid: RID, size: Vector2i | Vector2, texture_index: int): Image | null;
  /** Returns array containing glyph packing data. */
  _font_get_texture_offsets(font_rid: RID, size: Vector2i | Vector2, texture_index: int): PackedInt32Array;
  /** Returns 2D transform applied to the font outlines. */
  _font_get_transform(font_rid: RID): Transform2D;
  /** Returns pixel offset of the underline below the baseline. */
  _font_get_underline_position(font_rid: RID, size: int): float;
  /** Returns thickness of the underline in pixels. */
  _font_get_underline_thickness(font_rid: RID, size: int): float;
  /** Returns variation coordinates for the specified font cache entry. */
  _font_get_variation_coordinates(font_rid: RID): Dictionary;
  /**
   * Returns weight (boldness) of the font. A value in the `100...999` range, normal font weight is `400`, bold font weight is `700`.
   */
  _font_get_weight(font_rid: RID): int;
  /** Returns `true` if a Unicode `char` is available in the font. */
  _font_has_char(font_rid: RID, char: int): boolean;
  /** Returns `true` if system fonts can be automatically used as fallbacks. */
  _font_is_allow_system_fallback(font_rid: RID): boolean;
  /** Returns `true` if auto-hinting is supported and preferred over font built-in hinting. */
  _font_is_force_autohinter(font_rid: RID): boolean;
  /**
   * Returns `true` if the font supports the given language (as a ISO 639 (https://en.wikipedia.org/wiki/ISO_639-1) code).
   */
  _font_is_language_supported(font_rid: RID, language: string | NodePath): boolean;
  /** Returns `true` if color modulation is applied when drawing the font's colored glyphs. */
  _font_is_modulate_color_glyphs(font_rid: RID): boolean;
  /**
   * Returns `true` if glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data.
   */
  _font_is_multichannel_signed_distance_field(font_rid: RID): boolean;
  /**
   * Returns `true` if the font supports the given script (as a ISO 15924 (https://en.wikipedia.org/wiki/ISO_15924) code).
   */
  _font_is_script_supported(font_rid: RID, script: string | NodePath): boolean;
  /** Removes specified rendered glyph information from the cache entry. */
  _font_remove_glyph(font_rid: RID, size: Vector2i | Vector2, glyph: int): void;
  /** Removes kerning override for the pair of glyphs. */
  _font_remove_kerning(font_rid: RID, size: int, glyph_pair: Vector2i | Vector2): void;
  /** Remove language support override. */
  _font_remove_language_support_override(font_rid: RID, language: string | NodePath): void;
  /** Removes script support override. */
  _font_remove_script_support_override(font_rid: RID, script: string | NodePath): void;
  /** Removes specified font size from the cache entry. */
  _font_remove_size_cache(font_rid: RID, size: Vector2i | Vector2): void;
  /** Removes specified texture from the cache entry. */
  _font_remove_texture(font_rid: RID, size: Vector2i | Vector2, texture_index: int): void;
  /** Renders specified glyph to the font cache texture. */
  _font_render_glyph(font_rid: RID, size: Vector2i | Vector2, index: int): void;
  /** Renders the range of characters to the font cache texture. */
  _font_render_range(font_rid: RID, size: Vector2i | Vector2, start: int, end: int): void;
  /** If set to `true`, system fonts can be automatically used as fallbacks. */
  _font_set_allow_system_fallback(font_rid: RID, allow_system_fallback: boolean): void;
  /** Sets font anti-aliasing mode. */
  _font_set_antialiasing(font_rid: RID, antialiasing: int): void;
  /** Sets the font ascent (number of pixels above the baseline). */
  _font_set_ascent(font_rid: RID, size: int, ascent: float): void;
  /** Sets extra baseline offset (as a fraction of font height). */
  _font_set_baseline_offset(font_rid: RID, baseline_offset: float): void;
  /** Sets font source data, e.g contents of the dynamic font source file. */
  _font_set_data(font_rid: RID, data: PackedByteArray | Array<unknown>): void;
  /** Sets pointer to the font source data, e.g contents of the dynamic font source file. */
  _font_set_data_ptr(font_rid: RID, data_ptr: int, data_size: int): void;
  /** Sets the font descent (number of pixels below the baseline). */
  _font_set_descent(font_rid: RID, size: int, descent: float): void;
  /** If set to `true`, embedded font bitmap loading is disabled. */
  _font_set_disable_embedded_bitmaps(font_rid: RID, disable_embedded_bitmaps: boolean): void;
  /**
   * Sets font embolden strength. If `strength` is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness.
   */
  _font_set_embolden(font_rid: RID, strength: float): void;
  /** Sets an active face index in the TrueType / OpenType collection. */
  _font_set_face_index(font_rid: RID, face_index: int): void;
  /**
   * Sets bitmap font fixed size. If set to value greater than zero, same cache entry will be used for all font sizes.
   */
  _font_set_fixed_size(font_rid: RID, fixed_size: int): void;
  /** Sets bitmap font scaling mode. This property is used only if `fixed_size` is greater than zero. */
  _font_set_fixed_size_scale_mode(font_rid: RID, fixed_size_scale_mode: int): void;
  /** If set to `true` auto-hinting is preferred over font built-in hinting. */
  _font_set_force_autohinter(font_rid: RID, force_autohinter: boolean): void;
  /** If set to `true` font texture mipmap generation is enabled. */
  _font_set_generate_mipmaps(font_rid: RID, generate_mipmaps: boolean): void;
  /** Sets oversampling factor, shared by all font in the TextServer. */
  _font_set_global_oversampling(oversampling: float): void;
  /** Sets glyph advance (offset of the next glyph). */
  _font_set_glyph_advance(font_rid: RID, size: int, glyph: int, advance: Vector2 | Vector2i): void;
  /** Sets glyph offset from the baseline. */
  _font_set_glyph_offset(font_rid: RID, size: Vector2i | Vector2, glyph: int, offset: Vector2 | Vector2i): void;
  /** Sets size of the glyph. */
  _font_set_glyph_size(font_rid: RID, size: Vector2i | Vector2, glyph: int, gl_size: Vector2 | Vector2i): void;
  /** Sets index of the cache texture containing the glyph. */
  _font_set_glyph_texture_idx(font_rid: RID, size: Vector2i | Vector2, glyph: int, texture_idx: int): void;
  /** Sets rectangle in the cache texture containing the glyph. */
  _font_set_glyph_uv_rect(font_rid: RID, size: Vector2i | Vector2, glyph: int, uv_rect: Rect2 | Rect2i): void;
  /** Sets font hinting mode. Used by dynamic fonts only. */
  _font_set_hinting(font_rid: RID, hinting: int): void;
  /**
   * Sets glyph position rounding behavior. If set to `true`, when aligning glyphs to the pixel boundaries rounding remainders are accumulated to ensure more uniform glyph distribution. This setting has no effect if subpixel positioning is enabled.
   */
  _font_set_keep_rounding_remainders(font_rid: RID, keep_rounding_remainders: boolean): void;
  /** Sets kerning for the pair of glyphs. */
  _font_set_kerning(font_rid: RID, size: int, glyph_pair: Vector2i | Vector2, kerning: Vector2 | Vector2i): void;
  /** Adds override for {@link _font_is_language_supported}. */
  _font_set_language_support_override(font_rid: RID, language: string | NodePath, supported: boolean): void;
  /**
   * If set to `true`, color modulation is applied when drawing colored glyphs, otherwise it's applied to the monochrome glyphs only.
   */
  _font_set_modulate_color_glyphs(font_rid: RID, modulate: boolean): void;
  /**
   * Sets the width of the range around the shape between the minimum and maximum representable signed distance.
   */
  _font_set_msdf_pixel_range(font_rid: RID, msdf_pixel_range: int): void;
  /** Sets source font size used to generate MSDF textures. */
  _font_set_msdf_size(font_rid: RID, msdf_size: int): void;
  /**
   * If set to `true`, glyphs of all sizes are rendered using single multichannel signed distance field generated from the dynamic font vector data. MSDF rendering allows displaying the font at any scaling factor without blurriness, and without incurring a CPU cost when the font size changes (since the font no longer needs to be rasterized on the CPU). As a downside, font hinting is not available with MSDF. The lack of font hinting may result in less crisp and less readable fonts at small sizes.
   */
  _font_set_multichannel_signed_distance_field(font_rid: RID, msdf: boolean): void;
  /** Sets the font family name. */
  _font_set_name(font_rid: RID, name: string | NodePath): void;
  /** Sets font OpenType feature set override. */
  _font_set_opentype_feature_overrides(font_rid: RID, overrides: Dictionary): void;
  /**
   * If set to a positive value, overrides the oversampling factor of the viewport this font is used in. See {@link Viewport.oversampling}. This value doesn't override the [code skip-lint]oversampling[/code] parameter of [code skip-lint]draw_*[/code] methods. Used by dynamic fonts only.
   */
  _font_set_oversampling(font_rid: RID, oversampling: float): void;
  /** Sets scaling factor of the color bitmap font. */
  _font_set_scale(font_rid: RID, size: int, scale: float): void;
  /** Adds override for {@link _font_is_script_supported}. */
  _font_set_script_support_override(font_rid: RID, script: string | NodePath, supported: boolean): void;
  /** Sets the spacing for `spacing` to `value` in pixels (not relative to the font size). */
  _font_set_spacing(font_rid: RID, spacing: int, value: int): void;
  /** Sets font stretch amount, compared to a normal width. A percentage value between `50%` and `200%`. */
  _font_set_stretch(font_rid: RID, stretch: int): void;
  /** Sets the font style flags. */
  _font_set_style(font_rid: RID, style: int): void;
  /** Sets the font style name. */
  _font_set_style_name(font_rid: RID, name_style: string | NodePath): void;
  /** Sets font subpixel glyph positioning mode. */
  _font_set_subpixel_positioning(font_rid: RID, subpixel_positioning: int): void;
  /** Sets font cache texture image data. */
  _font_set_texture_image(font_rid: RID, size: Vector2i | Vector2, texture_index: int, image: Image): void;
  /** Sets array containing glyph packing data. */
  _font_set_texture_offsets(font_rid: RID, size: Vector2i | Vector2, texture_index: int, offset: PackedInt32Array | Array<unknown>): void;
  /**
   * Sets 2D transform, applied to the font outlines, can be used for slanting, flipping, and rotating glyphs.
   */
  _font_set_transform(font_rid: RID, transform: Transform2D): void;
  /** Sets pixel offset of the underline below the baseline. */
  _font_set_underline_position(font_rid: RID, size: int, underline_position: float): void;
  /** Sets thickness of the underline in pixels. */
  _font_set_underline_thickness(font_rid: RID, size: int, underline_thickness: float): void;
  /** Sets variation coordinates for the specified font cache entry. */
  _font_set_variation_coordinates(font_rid: RID, variation_coordinates: Dictionary): void;
  /**
   * Sets weight (boldness) of the font. A value in the `100...999` range, normal font weight is `400`, bold font weight is `700`.
   */
  _font_set_weight(font_rid: RID, weight: int): void;
  /** Returns the dictionary of the supported OpenType features. */
  _font_supported_feature_list(font_rid: RID): Dictionary;
  /** Returns the dictionary of the supported OpenType variation coordinates. */
  _font_supported_variation_list(font_rid: RID): Dictionary;
  /**
   * Converts a number from Western Arabic (0..9) to the numeral system used in the given `language`.
   * If `language` is an empty string, the active locale will be used.
   */
  _format_number(number: string | NodePath, language: string | NodePath): string;
  /** Frees an object created by this {@link TextServer}. */
  _free_rid(rid: RID): void;
  /** Returns text server features, see {@link TextServer.Feature}. */
  _get_features(): int;
  /**
   * Returns size of the replacement character (box with character hexadecimal code that is drawn in place of invalid characters).
   */
  _get_hex_code_box_size(size: int, index: int): Vector2;
  /** Returns the name of the server interface. */
  _get_name(): string;
  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries). */
  _get_support_data(): PackedByteArray;
  /** Returns default TextServer database (e.g. ICU break iterators and dictionaries) filename. */
  _get_support_data_filename(): string;
  /** Returns TextServer database (e.g. ICU break iterators and dictionaries) description. */
  _get_support_data_info(): string;
  /** Returns `true` if `rid` is valid resource owned by this text server. */
  _has(rid: RID): boolean;
  /** Returns `true` if the server supports a feature. */
  _has_feature(feature: int): boolean;
  /**
   * Returns index of the first string in `dict` which is visually confusable with the `string`, or `-1` if none is found.
   */
  _is_confusable(string: string | NodePath, dict: PackedStringArray | Array<unknown>): int;
  /** Returns `true` if locale is right-to-left. */
  _is_locale_right_to_left(locale: string | NodePath): boolean;
  /** Returns `true` if the locale requires text server support data for line/word breaking. */
  _is_locale_using_support_data(locale: string | NodePath): boolean;
  /** Returns `true` if `string` is a valid identifier. */
  _is_valid_identifier(string: string | NodePath): boolean;
  _is_valid_letter(unicode: int): boolean;
  /** Loads optional TextServer database (e.g. ICU break iterators and dictionaries). */
  _load_support_data(filename: string | NodePath): boolean;
  /** Converts the given readable name of a feature, variation, script, or language to an OpenType tag. */
  _name_to_tag(name: string | NodePath): int;
  /**
   * Converts `number` from the numeral system used in the given `language` to Western Arabic (0..9).
   * If `language` is an empty string, the active locale will be used.
   */
  _parse_number(number: string | NodePath, language: string | NodePath): string;
  /** Default implementation of the BiDi algorithm override function. */
  _parse_structured_text(parser_type: int, args: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array, text: string | NodePath): Array<Vector3i>;
  /** Returns percent sign used in the given `language`. */
  _percent_sign(language: string | NodePath): string;
  /**
   * Increases the reference count of the specified oversampling level. This method is called by {@link Viewport}, and should not be used directly.
   */
  _reference_oversampling_level(oversampling: float): void;
  /** Saves optional TextServer database (e.g. ICU break iterators and dictionaries) to the file. */
  _save_support_data(filename: string | NodePath): boolean;
  /** Returns the number of uniform text runs in the buffer. */
  _shaped_get_run_count(shaped: RID): int;
  /** Returns the direction of the `index` text run (in visual order). */
  _shaped_get_run_direction(shaped: RID, index: int): int;
  /** Returns the font RID of the `index` text run (in visual order). */
  _shaped_get_run_font_rid(shaped: RID, index: int): RID;
  /** Returns the font size of the `index` text run (in visual order). */
  _shaped_get_run_font_size(shaped: RID, index: int): int;
  /** Returns the glyph range of the `index` text run (in visual order). */
  _shaped_get_run_glyph_range(shaped: RID, index: int): Vector2i;
  /** Returns the language of the `index` text run (in visual order). */
  _shaped_get_run_language(shaped: RID, index: int): string;
  /** Returns the embedded object of the `index` text run (in visual order). */
  _shaped_get_run_object(shaped: RID, index: int): unknown;
  /** Returns the source text range of the `index` text run (in visual order). */
  _shaped_get_run_range(shaped: RID, index: int): Vector2i;
  /** Returns the source text of the `index` text run (in visual order). */
  _shaped_get_run_text(shaped: RID, index: int): string;
  /**
   * Returns number of text spans added using {@link _shaped_text_add_string} or {@link _shaped_text_add_object}.
   */
  _shaped_get_span_count(shaped: RID): int;
  /** Returns text embedded object key. */
  _shaped_get_span_embedded_object(shaped: RID, index: int): unknown;
  /** Returns text span metadata. */
  _shaped_get_span_meta(shaped: RID, index: int): unknown;
  /** Returns the text span embedded object key. */
  _shaped_get_span_object(shaped: RID, index: int): unknown;
  /** Returns the text span source text. */
  _shaped_get_span_text(shaped: RID, index: int): string;
  /** Returns the text buffer source text, including object replacement characters. */
  _shaped_get_text(shaped: RID): string;
  /** Changes text span font, font size, and OpenType features, without changing the text. */
  _shaped_set_span_update_font(shaped: RID, index: int, fonts: Array<RID>, size: int, opentype_features: Dictionary): void;
  /**
   * Adds inline object to the text buffer, `key` must be unique. In the text, object is represented as `length` object replacement characters.
   */
  _shaped_text_add_object(shaped: RID, key: unknown, size: Vector2 | Vector2i, inline_align: int, length: int, baseline: float): boolean;
  /** Adds text span and font to draw it to the text buffer. */
  _shaped_text_add_string(shaped: RID, text: string | NodePath, fonts: Array<RID>, size: int, opentype_features: Dictionary, language: string | NodePath, meta: unknown): boolean;
  /** Clears text buffer (removes text and inline objects). */
  _shaped_text_clear(shaped: RID): void;
  /** Returns composite character position closest to the `pos`. */
  _shaped_text_closest_character_pos(shaped: RID, pos: int): int;
  /**
   * Draw shaped text into a canvas item at a given position, with `color`. `pos` specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  _shaped_text_draw(shaped: RID, canvas: RID, pos: Vector2 | Vector2i, clip_l: float, clip_r: float, color: Color, oversampling: float): void;
  /**
   * Draw the outline of the shaped text into a canvas item at a given position, with `color`. `pos` specifies the leftmost point of the baseline (for horizontal layout) or topmost point of the baseline (for vertical layout). If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  _shaped_text_draw_outline(shaped: RID, canvas: RID, pos: Vector2 | Vector2i, clip_l: float, clip_r: float, outline_size: int, color: Color, oversampling: float): void;
  /** Duplicates shaped text buffer. */
  _shaped_text_duplicate(shaped: RID): RID;
  /** Adjusts text width to fit to specified width, returns new text width. */
  _shaped_text_fit_to_width(shaped: RID, width: float, justification_flags: int): float;
  /**
   * Returns the text ascent (number of pixels above the baseline for horizontal layout or to the left of baseline for vertical).
   */
  _shaped_text_get_ascent(shaped: RID): float;
  /**
   * Returns shapes of the carets corresponding to the character offset `position` in the text. Returned caret shape is 1 pixel wide rectangle.
   */
  _shaped_text_get_carets(shaped: RID, position: int, caret: unknown): void;
  /** Returns array of the composite character boundaries. */
  _shaped_text_get_character_breaks(shaped: RID): PackedInt32Array;
  /** Returns ellipsis character used for text clipping. */
  _shaped_text_get_custom_ellipsis(shaped: RID): int;
  /**
   * Returns custom punctuation character list, used for word breaking. If set to empty string, server defaults are used.
   */
  _shaped_text_get_custom_punctuation(shaped: RID): string;
  /**
   * Returns the text descent (number of pixels below the baseline for horizontal layout or to the right of baseline for vertical).
   */
  _shaped_text_get_descent(shaped: RID): float;
  /** Returns direction of the text. */
  _shaped_text_get_direction(shaped: RID): int;
  /** Returns dominant direction of in the range of text. */
  _shaped_text_get_dominant_direction_in_range(shaped: RID, start: int, end: int): int;
  /** Returns number of glyphs in the ellipsis. */
  _shaped_text_get_ellipsis_glyph_count(shaped: RID): int;
  /** Returns array of the glyphs in the ellipsis. */
  _shaped_text_get_ellipsis_glyphs(shaped: RID): unknown;
  /** Returns position of the ellipsis. */
  _shaped_text_get_ellipsis_pos(shaped: RID): int;
  /** Returns number of glyphs in the buffer. */
  _shaped_text_get_glyph_count(shaped: RID): int;
  /** Returns an array of glyphs in the visual order. */
  _shaped_text_get_glyphs(shaped: RID): unknown;
  /** Returns composite character's bounds as offsets from the start of the line. */
  _shaped_text_get_grapheme_bounds(shaped: RID, pos: int): Vector2;
  /** Returns direction of the text, inferred by the BiDi algorithm. */
  _shaped_text_get_inferred_direction(shaped: RID): int;
  /** Breaks text to the lines and returns character ranges for each line. */
  _shaped_text_get_line_breaks(shaped: RID, width: float, start: int, break_flags: int): PackedInt32Array;
  /** Breaks text to the lines and columns. Returns character ranges for each segment. */
  _shaped_text_get_line_breaks_adv(shaped: RID, width: PackedFloat32Array | Array<unknown>, start: int, once: boolean, break_flags: int): PackedInt32Array;
  /** Returns the glyph index of the inline object. */
  _shaped_text_get_object_glyph(shaped: RID, key: unknown): int;
  /** Returns the character range of the inline object. */
  _shaped_text_get_object_range(shaped: RID, key: unknown): Vector2i;
  /** Returns bounding rectangle of the inline object. */
  _shaped_text_get_object_rect(shaped: RID, key: unknown): Rect2;
  /** Returns array of inline objects. */
  _shaped_text_get_objects(shaped: RID): Array<unknown>;
  /** Returns text orientation. */
  _shaped_text_get_orientation(shaped: RID): int;
  /** Returns the parent buffer from which the substring originates. */
  _shaped_text_get_parent(shaped: RID): RID;
  /** Returns `true` if text buffer is configured to display control characters. */
  _shaped_text_get_preserve_control(shaped: RID): boolean;
  /**
   * Returns `true` if text buffer is configured to display hexadecimal codes in place of invalid characters.
   */
  _shaped_text_get_preserve_invalid(shaped: RID): boolean;
  /** Returns substring buffer character range in the parent buffer. */
  _shaped_text_get_range(shaped: RID): Vector2i;
  /** Returns selection rectangles for the specified character range. */
  _shaped_text_get_selection(shaped: RID, start: int, end: int): PackedVector2Array;
  /** Returns size of the text. */
  _shaped_text_get_size(shaped: RID): Vector2;
  /** Returns extra spacing added between glyphs or lines in pixels. */
  _shaped_text_get_spacing(shaped: RID, spacing: int): int;
  /** Returns the position of the overrun trim. */
  _shaped_text_get_trim_pos(shaped: RID): int;
  /** Returns pixel offset of the underline below the baseline. */
  _shaped_text_get_underline_position(shaped: RID): float;
  /** Returns thickness of the underline. */
  _shaped_text_get_underline_thickness(shaped: RID): float;
  /** Returns width (for horizontal layout) or height (for vertical) of the text. */
  _shaped_text_get_width(shaped: RID): float;
  /**
   * Breaks text into words and returns array of character ranges. Use `grapheme_flags` to set what characters are used for breaking.
   */
  _shaped_text_get_word_breaks(shaped: RID, grapheme_flags: int, skip_grapheme_flags: int): PackedInt32Array;
  /** Returns `true` if an object with `key` is embedded in this shaped text buffer. */
  _shaped_text_has_object(shaped: RID, key: unknown): boolean;
  /** Returns grapheme index at the specified pixel offset at the baseline, or `-1` if none is found. */
  _shaped_text_hit_test_grapheme(shaped: RID, coord: float): int;
  /**
   * Returns caret character offset at the specified pixel offset at the baseline. This function always returns a valid position.
   */
  _shaped_text_hit_test_position(shaped: RID, coord: float): int;
  /** Returns `true` if buffer is successfully shaped. */
  _shaped_text_is_ready(shaped: RID): boolean;
  /** Returns composite character end position closest to the `pos`. */
  _shaped_text_next_character_pos(shaped: RID, pos: int): int;
  /** Returns grapheme end position closest to the `pos`. */
  _shaped_text_next_grapheme_pos(shaped: RID, pos: int): int;
  /** Trims text if it exceeds the given width. */
  _shaped_text_overrun_trim_to_width(shaped: RID, width: float, trim_flags: int): void;
  /** Returns composite character start position closest to the `pos`. */
  _shaped_text_prev_character_pos(shaped: RID, pos: int): int;
  /** Returns grapheme start position closest to the `pos`. */
  _shaped_text_prev_grapheme_pos(shaped: RID, pos: int): int;
  /** Sets new size and alignment of embedded object. */
  _shaped_text_resize_object(shaped: RID, key: unknown, size: Vector2 | Vector2i, inline_align: int, baseline: float): boolean;
  /** Overrides BiDi for the structured text. */
  _shaped_text_set_bidi_override(shaped: RID, override: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /** Sets ellipsis character used for text clipping. */
  _shaped_text_set_custom_ellipsis(shaped: RID, char: int): void;
  /**
   * Sets custom punctuation character list, used for word breaking. If set to empty string, server defaults are used.
   */
  _shaped_text_set_custom_punctuation(shaped: RID, punct: string | NodePath): void;
  /**
   * Sets desired text direction. If set to {@link TextServer.DIRECTION_AUTO}, direction will be detected based on the buffer contents and current locale.
   */
  _shaped_text_set_direction(shaped: RID, direction: int): void;
  /** Sets desired text orientation. */
  _shaped_text_set_orientation(shaped: RID, orientation: int): void;
  /** If set to `true` text buffer will display control characters. */
  _shaped_text_set_preserve_control(shaped: RID, enabled: boolean): void;
  /**
   * If set to `true` text buffer will display invalid characters as hexadecimal codes, otherwise nothing is displayed.
   */
  _shaped_text_set_preserve_invalid(shaped: RID, enabled: boolean): void;
  /** Sets extra spacing added between glyphs or lines in pixels. */
  _shaped_text_set_spacing(shaped: RID, spacing: int, value: int): void;
  /** Shapes buffer if it's not shaped. Returns `true` if the string is shaped successfully. */
  _shaped_text_shape(shaped: RID): boolean;
  /** Returns text glyphs in the logical order. */
  _shaped_text_sort_logical(shaped: RID): unknown;
  /**
   * Returns text buffer for the substring of the text in the `shaped` text buffer (including inline objects).
   */
  _shaped_text_substr(shaped: RID, start: int, length: int): RID;
  /** Aligns shaped text to the given tab-stops. */
  _shaped_text_tab_align(shaped: RID, tab_stops: PackedFloat32Array | Array<unknown>): float;
  /**
   * Updates break points in the shaped text. This method is called by default implementation of text breaking functions.
   */
  _shaped_text_update_breaks(shaped: RID): boolean;
  /**
   * Updates justification points in the shaped text. This method is called by default implementation of text justification functions.
   */
  _shaped_text_update_justification_ops(shaped: RID): boolean;
  /** Returns `true` if `string` is likely to be an attempt at confusing the reader. */
  _spoof_check(string: string | NodePath): boolean;
  /** Returns array of the composite character boundaries. */
  _string_get_character_breaks(string: string | NodePath, language: string | NodePath): PackedInt32Array;
  /**
   * Returns an array of the word break boundaries. Elements in the returned array are the offsets of the start and end of words. Therefore the length of the array is always even.
   */
  _string_get_word_breaks(string: string | NodePath, language: string | NodePath, chars_per_line: int): PackedInt32Array;
  /** Returns the string converted to `lowercase`. */
  _string_to_lower(string: string | NodePath, language: string | NodePath): string;
  /** Returns the string converted to `Title Case`. */
  _string_to_title(string: string | NodePath, language: string | NodePath): string;
  /** Returns the string converted to `UPPERCASE`. */
  _string_to_upper(string: string | NodePath, language: string | NodePath): string;
  /** Strips diacritics from the string. */
  _strip_diacritics(string: string | NodePath): string;
  /** Converts the given OpenType tag to the readable name of a feature, variation, script, or language. */
  _tag_to_name(tag: int): string;
  /**
   * Decreases the reference count of the specified oversampling level, and frees the font cache for oversampling level when the reference count reaches zero. This method is called by {@link Viewport}, and should not be used directly.
   */
  _unreference_oversampling_level(oversampling: float): void;
}
