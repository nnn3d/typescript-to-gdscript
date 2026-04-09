// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A control for displaying plain text. */
declare class Label extends Control {
  /**
   * If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text.
   */
  autowrap_mode: int;
  /**
   * Autowrap space trimming flags. See {@link TextServer.BREAK_TRIM_START_EDGE_SPACES} and {@link TextServer.BREAK_TRIM_END_EDGE_SPACES} for more info.
   */
  autowrap_trim_flags: int;
  /**
   * If `true`, the Label only shows the text that fits inside its bounding rectangle and will clip text horizontally.
   */
  clip_text: boolean;
  /** Ellipsis character used for text clipping. */
  ellipsis_char: string;
  /**
   * Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify).
   */
  horizontal_alignment: int;
  /** Line fill alignment rules. */
  justification_flags: int;
  /**
   * A {@link LabelSettings} resource that can be shared between multiple {@link Label} nodes. Takes priority over theme properties.
   */
  label_settings: LabelSettings | null;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /** The number of the lines ignored and not displayed from the start of the {@link text} value. */
  lines_skipped: int;
  /** Limits the lines of text the node shows on screen. */
  max_lines_visible: int;
  /**
   * <member name="paragraph_separator" type="String" setter="set_paragraph_separator" getter="get_paragraph_separator" default="&quot;\\n&quot;">
   * String used as a paragraph separator. Each paragraph is processed independently, in its own BiDi context.
   */
  mouse_filter: int;
  /**
   * <member name="structured_text_bidi_override" type="int" setter="set_structured_text_bidi_override" getter="get_structured_text_bidi_override" enum="TextServer.StructuredTextParser" default="0">
   * Set BiDi algorithm override for the structured text.
   */
  size_flags_vertical: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /** Aligns text to the given tab-stops. */
  tab_stops: PackedFloat32Array;
  /** The text to display on screen. */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** The clipping behavior when the text exceeds the node's bounding rectangle. */
  text_overrun_behavior: int;
  /** If `true`, all the text displays as UPPERCASE. */
  uppercase: boolean;
  /** Controls the text's vertical alignment. Supports top, center, bottom, and fill. */
  vertical_alignment: int;
  /**
   * The number of characters to display. If set to `-1`, all characters are displayed. This can be useful when animating the text appearing in a dialog box.
   * **Note:** Setting this property updates {@link visible_ratio} accordingly.
   * **Note:** Characters are counted as Unicode codepoints. A single visible grapheme may contain multiple codepoints (e.g. certain emoji use three codepoints). A single codepoint may contain two UTF-16 characters, which are used in C# strings.
   */
  visible_characters: int;
  /** The clipping behavior when {@link visible_characters} or {@link visible_ratio} is set. */
  visible_characters_behavior: int;
  /**
   * The fraction of characters to display, relative to the total number of characters (see {@link get_total_character_count}). If set to `1.0`, all characters are displayed. If set to `0.5`, only half of the characters will be displayed. This can be useful when animating the text appearing in a dialog box.
   * **Note:** Setting this property updates {@link visible_characters} accordingly.
   */
  visible_ratio: float;
  set_autowrap_mode(value: int): void;
  get_autowrap_mode(): int;
  set_autowrap_trim_flags(value: int): void;
  get_autowrap_trim_flags(): int;
  set_clip_text(value: boolean): void;
  is_clipping_text(): boolean;
  set_ellipsis_char(value: string): void;
  get_ellipsis_char(): string;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_justification_flags(value: int): void;
  get_justification_flags(): int;
  set_label_settings(value: LabelSettings | null): void;
  get_label_settings(): LabelSettings | null;
  set_language(value: string): void;
  get_language(): string;
  set_lines_skipped(value: int): void;
  get_lines_skipped(): int;
  set_max_lines_visible(value: int): void;
  get_max_lines_visible(): int;
  set_structured_text_bidi_override_options(value: Array<unknown>): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_tab_stops(value: PackedFloat32Array): void;
  get_tab_stops(): PackedFloat32Array;
  set_text(value: string): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_text_overrun_behavior(value: int): void;
  get_text_overrun_behavior(): int;
  set_uppercase(value: boolean): void;
  is_uppercase(): boolean;
  set_vertical_alignment(value: int): void;
  get_vertical_alignment(): int;
  set_visible_characters(value: int): void;
  get_visible_characters(): int;
  set_visible_characters_behavior(value: int): void;
  get_visible_characters_behavior(): int;
  set_visible_ratio(value: float): void;
  get_visible_ratio(): float;

  /**
   * Returns the bounding rectangle of the character at position `pos` in the label's local coordinate system. If the character is a non-visual character or `pos` is outside the valid range, an empty {@link Rect2} is returned. If the character is a part of a composite grapheme, the bounding rectangle of the whole grapheme is returned.
   */
  get_character_bounds(pos: int): Rect2;
  /** Returns the number of lines of text the Label has. */
  get_line_count(): int;
  /**
   * Returns the height of the line `line`.
   * If `line` is set to `-1`, returns the biggest line height.
   * If there are no lines, returns font size in pixels.
   */
  get_line_height(line?: int): int;
  /** Returns the total number of printable characters in the text (excluding spaces and newlines). */
  get_total_character_count(): int;
  /**
   * Returns the number of lines shown. Useful if the {@link Label}'s height cannot currently display all lines.
   */
  get_visible_line_count(): int;
}
