// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Imports a bitmap font where all glyphs have the same width and height. */
declare class ResourceImporterImageFont extends ResourceImporter {
  /**
   * Font ascent (number of pixels above the baseline). If set to `0`, half of the character height is used.
   */
  ascent: int;
  /**
   * Margin applied around every imported glyph. If your font image contains guides (in the form of lines between glyphs) or if spacing between characters appears incorrect, try adjusting {@link character_margin}.
   */
  character_margin: Rect2i;
  /**
   * The character ranges to import from the font image. This is an array that maps each position on the image (in tile coordinates, not pixels). The font atlas is traversed from left to right and top to bottom. Characters can be specified with decimal numbers (126), hexadecimal numbers (`0x007e` or `U+007e`), or between single quotes (`'~'`). Ranges can be specified with a hyphen between characters.
   * For example, `0-127` represents the full ASCII range. It can also be written as `0x0000-0x007f` (or `U+0000-U+007f`). As another example, `' '-'~'` is equivalent to `32-126` and represents the range of printable (visible) ASCII characters.
   * For any range, the character advance and offset can be customized by appending three space-separated integer values (additional advance, x offset, y offset) to the end. For example `'a'-'b' 4 5 2` sets the advance to `char_width + 4` and offset to `Vector2(5, 2)` for both `a` and `b` characters.
   * **Note:** The overall number of characters must not exceed the number of {@link columns} multiplied by {@link rows}. Otherwise, the font will fail to import.
   */
  character_ranges: PackedStringArray;
  /** Number of columns in the font image. See also {@link rows}. */
  columns: int;
  /** If `true`, uses lossless compression for the resulting font. */
  compress: boolean;
  /**
   * Font descent (number of pixels below the baseline). If set to `0`, half of the character height is used.
   */
  descent: int;
  /**
   * List of font fallbacks to use if a glyph isn't found in this bitmap font. Fonts at the beginning of the array are attempted first.
   */
  fallbacks: Array<unknown>;
  /**
   * Margin to cut on the sides of the entire image. This can be used to cut parts of the image that contain attribution information or similar.
   */
  image_margin: Rect2i;
  /**
   * Kerning pairs for the font. Kerning pair adjust the spacing between two characters.
   * Each string consist of three space separated values: "from" string, "to" string and integer offset. Each combination form the two string for a kerning pair, e.g, `ab cd -3` will create kerning pairs `ac`, `ad`, `bc`, and `bd` with offset `-3`. `\uXXXX` escape sequences can be used to add Unicode characters.
   */
  kerning_pairs: PackedStringArray;
  /** Number of rows in the font image. See also {@link columns}. */
  rows: int;
  /** Font scaling mode. */
  scaling_mode: int;
}
