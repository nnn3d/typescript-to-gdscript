// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Abstract base class for fonts and font variations. */
declare class Font extends Resource {
  /**
   * Array of fallback {@link Font}s to use as a substitute if a glyph is not found in this current {@link Font}.
   * If this array is empty in a {@link FontVariation}, the {@link FontVariation.base_font}'s fallbacks are used instead.
   */
  fallbacks: Array<Font>;
  set_fallbacks(value: Array<Font>): void;
  get_fallbacks(): Array<Font>;

  /**
   * Draw a single Unicode character `char` into a canvas item using the font, at a given position, with `modulate` color. `pos` specifies the baseline, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * **Note:** Do not use this function to draw strings character by character, use {@link draw_string} or {@link TextLine} instead.
   */
  draw_char(canvas_item: RID, pos: Vector2 | Vector2i, char: int, font_size: int, modulate?: Color, oversampling?: float): float;
  /**
   * Draw a single Unicode character `char` outline into a canvas item using the font, at a given position, with `modulate` color and `size` outline size. `pos` specifies the baseline, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * **Note:** Do not use this function to draw strings character by character, use {@link draw_string} or {@link TextLine} instead.
   */
  draw_char_outline(canvas_item: RID, pos: Vector2 | Vector2i, char: int, font_size: int, size?: int, modulate?: Color, oversampling?: float): float;
  /**
   * Breaks `text` into lines using rules specified by `brk_flags` and draws it into a canvas item using the font, at a given position, with `modulate` color, optionally clipping the width and aligning horizontally. `pos` specifies the baseline of the first line, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * See also {@link CanvasItem.draw_multiline_string}.
   */
  draw_multiline_string(canvas_item: RID, pos: Vector2 | Vector2i, text: string, alignment: int, width?: float, font_size?: int, max_lines?: int, modulate?: Color, brk_flags?: int, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Breaks `text` to the lines using rules specified by `brk_flags` and draws text outline into a canvas item using the font, at a given position, with `modulate` color and `size` outline size, optionally clipping the width and aligning horizontally. `pos` specifies the baseline of the first line, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * See also {@link CanvasItem.draw_multiline_string_outline}.
   */
  draw_multiline_string_outline(canvas_item: RID, pos: Vector2 | Vector2i, text: string, alignment: int, width?: float, font_size?: int, max_lines?: int, size?: int, modulate?: Color, brk_flags?: int, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Draw `text` into a canvas item using the font, at a given position, with `modulate` color, optionally clipping the width and aligning horizontally. `pos` specifies the baseline, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * See also {@link CanvasItem.draw_string}.
   */
  draw_string(canvas_item: RID, pos: Vector2 | Vector2i, text: string, alignment: int, width?: float, font_size?: int, modulate?: Color, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /**
   * Draw `text` outline into a canvas item using the font, at a given position, with `modulate` color and `size` outline size, optionally clipping the width and aligning horizontally. `pos` specifies the baseline, not the top. To draw from the top, *ascent* must be added to the Y axis. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   * See also {@link CanvasItem.draw_string_outline}.
   */
  draw_string_outline(canvas_item: RID, pos: Vector2 | Vector2i, text: string, alignment: int, width?: float, font_size?: int, size?: int, modulate?: Color, justification_flags?: int, direction?: int, orientation?: int, oversampling?: float): void;
  /** Returns {@link TextServer} RID of the font cache for specific variation. */
  find_variation(variation_coordinates: Dictionary, face_index?: int, strength?: float, transform?: Transform2D, spacing_top?: int, spacing_bottom?: int, spacing_space?: int, spacing_glyph?: int, baseline_offset?: float): RID;
  /**
   * Returns the maximum font ascent (number of pixels above the baseline) of this font and all fallback fonts.
   * **Note:** Real ascent of the string is context-dependent and can be significantly different from the value returned by this function. Use it only as rough estimate (e.g. as the ascent of empty line).
   */
  get_ascent(font_size?: int): float;
  /**
   * Returns the size of a character. Does not take kerning into account.
   * **Note:** Do not use this function to calculate width of the string character by character, use {@link get_string_size} or {@link TextLine} instead. The height returned is the font height (see also {@link get_height}) and has no relation to the glyph height.
   */
  get_char_size(char: int, font_size: int): Vector2;
  /**
   * Returns the maximum font descent (number of pixels below the baseline) of this font and all fallback fonts.
   * **Note:** Real descent of the string is context-dependent and can be significantly different from the value returned by this function. Use it only as rough estimate (e.g. as the descent of empty line).
   */
  get_descent(font_size?: int): float;
  /** Returns number of faces in the TrueType / OpenType collection. */
  get_face_count(): int;
  /** Returns font family name. */
  get_font_name(): string;
  /**
   * Returns font stretch amount, compared to a normal width. A percentage value between `50%` and `200%`.
   */
  get_font_stretch(): int;
  /** Returns font style flags. */
  get_font_style(): int;
  /** Returns font style name. */
  get_font_style_name(): string;
  /**
   * Returns weight (boldness) of the font. A value in the `100...999` range, normal font weight is `400`, bold font weight is `700`.
   */
  get_font_weight(): int;
  /**
   * Returns the total average font height (ascent plus descent) in pixels.
   * **Note:** Real height of the string is context-dependent and can be significantly different from the value returned by this function. Use it only as rough estimate (e.g. as the height of empty line).
   */
  get_height(font_size?: int): float;
  /**
   * Returns the size of a bounding box of a string broken into the lines, taking kerning and advance into account.
   * See also {@link draw_multiline_string}.
   */
  get_multiline_string_size(text: string, alignment: int, width?: float, font_size?: int, max_lines?: int, brk_flags?: int, justification_flags?: int, direction?: int, orientation?: int): Vector2;
  /**
   * Returns a set of OpenType feature tags. More info: OpenType feature tags (https://docs.microsoft.com/en-us/typography/opentype/spec/featuretags).
   */
  get_opentype_features(): Dictionary;
  /**
   * Returns {@link Dictionary} with OpenType font name strings (localized font names, version, description, license information, sample text, etc.).
   */
  get_ot_name_strings(): Dictionary;
  /**
   * Returns {@link Array} of valid {@link Font} {@link RID}s, which can be passed to the {@link TextServer} methods.
   */
  get_rids(): Array<RID>;
  /** Returns the amount of spacing for the given `spacing` type. */
  get_spacing(spacing: int): int;
  /**
   * Returns the size of a bounding box of a single-line string, taking kerning, advance and subpixel positioning into account. See also {@link get_multiline_string_size} and {@link draw_string}.
   * For example, to get the string size as displayed by a single-line Label, use:
   * **Note:** Since kerning, advance and subpixel positioning are taken into account by {@link get_string_size}, using separate {@link get_string_size} calls on substrings of a string then adding the results together will return a different result compared to using a single {@link get_string_size} call on the full string.
   * **Note:** Real height of the string is context-dependent and can be significantly different from the value returned by {@link get_height}.
   */
  get_string_size(text: string, alignment: int, width?: float, font_size?: int, justification_flags?: int, direction?: int, orientation?: int): Vector2;
  /**
   * Returns a string containing all the characters available in the font.
   * If a given character is included in more than one font data source, it appears only once in the returned string.
   */
  get_supported_chars(): string;
  /** Returns list of OpenType features supported by font. */
  get_supported_feature_list(): Dictionary;
  /**
   * Returns list of supported variation coordinates (https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg), each coordinate is returned as `tag: Vector3i(min_value,max_value,default_value)`.
   * Font variations allow for continuous change of glyph characteristics along some given design axis, such as weight, width or slant.
   * To print available variation axes of a variable font:
   * **Note:** To set and get variation coordinates of a {@link FontVariation}, use {@link FontVariation.variation_opentype}.
   */
  get_supported_variation_list(): Dictionary;
  /**
   * Returns average pixel offset of the underline below the baseline.
   * **Note:** Real underline position of the string is context-dependent and can be significantly different from the value returned by this function. Use it only as rough estimate.
   */
  get_underline_position(font_size?: int): float;
  /**
   * Returns average thickness of the underline.
   * **Note:** Real underline thickness of the string is context-dependent and can be significantly different from the value returned by this function. Use it only as rough estimate.
   */
  get_underline_thickness(font_size?: int): float;
  /** Returns `true` if a Unicode `char` is available in the font. */
  has_char(char: int): boolean;
  /**
   * Returns `true` if the font supports the given language (as a ISO 639 (https://en.wikipedia.org/wiki/ISO_639-1) code).
   */
  is_language_supported(language: string): boolean;
  /**
   * Returns `true` if the font supports the given script (as a ISO 15924 (https://en.wikipedia.org/wiki/ISO_15924) code).
   */
  is_script_supported(script: string): boolean;
  /** Sets LRU cache capacity for `draw_*` methods. */
  set_cache_capacity(single_line: int, multi_line: int): void;
}
