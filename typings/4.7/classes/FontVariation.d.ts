// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A variation of a font with additional settings. */
declare class FontVariation extends Font {
  /** Base font used to create a variation. If not set, default {@link Theme} font is used. */
  base_font: Font;
  /** Extra baseline offset (as a fraction of font height). */
  baseline_offset: float;
  /**
   * A set of OpenType feature tags. More info: OpenType feature tags (https://docs.microsoft.com/en-us/typography/opentype/spec/featuretags).
   */
  opentype_features: Dictionary;
  /** Extra spacing at the bottom of the line in pixels. */
  spacing_bottom: int;
  /** Extra spacing between graphical glyphs. */
  spacing_glyph: int;
  /** Extra width of the space glyphs. */
  spacing_space: int;
  /** Extra spacing at the top of the line in pixels. */
  spacing_top: int;
  /**
   * If is not equal to zero, emboldens the font outlines. Negative values reduce the outline thickness.
   * **Note:** Emboldened fonts might have self-intersecting outlines, which will prevent MSDF fonts and {@link TextMesh} from working correctly.
   */
  variation_embolden: float;
  /** Active face index in the TrueType / OpenType collection file. */
  variation_face_index: int;
  /**
   * Font OpenType variation coordinates. More info: OpenType variation tags (https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxisreg).
   * **Note:** This {@link Dictionary} uses OpenType tags as keys. Variation axes can be identified both by tags ([int], e.g. `0x77678674`) and names ({@link String}, e.g. `wght`). Some axes might be accessible by multiple names. For example, `wght` refers to the same axis as `weight`. Tags on the other hand are unique. To convert between names and tags, use {@link TextServer.name_to_tag} and {@link TextServer.tag_to_name}.
   * **Note:** To get available variation axes of a font, use {@link Font.get_supported_variation_list}.
   */
  variation_opentype: Dictionary;
  /**
   * 2D transform, applied to the font outlines, can be used for slanting, flipping and rotating glyphs.
   * For example, to simulate italic typeface by slanting, apply the following transform `Transform2D(1.0, slant, 0.0, 1.0, 0.0, 0.0)`.
   */
  variation_transform: Transform2D;
  set_base_font(value: Font): void;
  get_base_font(): Font;
  set_baseline_offset(value: float): void;
  get_baseline_offset(): float;
  set_opentype_features(value: Dictionary): void;
  set_variation_embolden(value: float): void;
  get_variation_embolden(): float;
  set_variation_face_index(value: int): void;
  get_variation_face_index(): int;
  set_variation_opentype(value: Dictionary): void;
  get_variation_opentype(): Dictionary;
  set_variation_transform(value: Transform2D): void;
  get_variation_transform(): Transform2D;

  /** Sets the spacing for `spacing` to `value` in pixels (not relative to the font size). */
  set_spacing(spacing: int, value: int): void;
}
