// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A syntax highlighter intended for code. */
declare class CodeHighlighter extends SyntaxHighlighter {
  /**
   * Sets the color regions. All existing regions will be removed. The {@link Dictionary} key is the region start and end key, separated by a space. The value is the region color.
   */
  color_regions: Dictionary;
  /** Sets color for functions. A function is a non-keyword string followed by a '('. */
  function_color: Color;
  /**
   * Sets the keyword colors. All existing keywords will be removed. The {@link Dictionary} key is the keyword. The value is the keyword color.
   */
  keyword_colors: Dictionary;
  /**
   * Sets the member keyword colors. All existing member keyword will be removed. The {@link Dictionary} key is the member keyword. The value is the member keyword color.
   */
  member_keyword_colors: Dictionary;
  /**
   * Sets color for member variables. A member variable is non-keyword, non-function string proceeded with a '.'.
   */
  member_variable_color: Color;
  /** Sets the color for numbers. */
  number_color: Color;
  /** Sets the color for symbols. */
  symbol_color: Color;

  /**
   * Adds a color region (such as for comments or strings) from `start_key` to `end_key`. Both keys should be symbols, and `start_key` must not be shared with other delimiters.
   * If `line_only` is `true` or `end_key` is an empty {@link String}, the region does not carry over to the next line.
   */
  add_color_region(start_key: string, end_key: string, color: Color, line_only?: boolean): void;
  /**
   * Sets the color for a keyword.
   * The keyword cannot contain any symbols except '_'.
   */
  add_keyword_color(keyword: string, color: Color): void;
  /**
   * Sets the color for a member keyword.
   * The member keyword cannot contain any symbols except '_'.
   * It will not be highlighted if preceded by a '.'.
   */
  add_member_keyword_color(member_keyword: string, color: Color): void;
  /** Removes all color regions. */
  clear_color_regions(): void;
  /** Removes all keywords. */
  clear_keyword_colors(): void;
  /** Removes all member keywords. */
  clear_member_keyword_colors(): void;
  /** Returns the color for a keyword. */
  get_keyword_color(keyword: string): Color;
  /** Returns the color for a member keyword. */
  get_member_keyword_color(member_keyword: string): Color;
  /** Returns `true` if the start key exists, else `false`. */
  has_color_region(start_key: string): boolean;
  /** Returns `true` if the keyword exists, else `false`. */
  has_keyword_color(keyword: string): boolean;
  /** Returns `true` if the member keyword exists, else `false`. */
  has_member_keyword_color(member_keyword: string): boolean;
  /** Removes the color region that uses that start key. */
  remove_color_region(start_key: string): void;
  /** Removes the keyword. */
  remove_keyword_color(keyword: string): void;
  /** Removes the member keyword. */
  remove_member_keyword_color(member_keyword: string): void;
}
