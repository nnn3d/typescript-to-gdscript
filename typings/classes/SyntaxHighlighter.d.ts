// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for syntax highlighters. Provides syntax highlighting data to a {@link TextEdit}. */
declare class SyntaxHighlighter extends Resource {
  /** Virtual method which can be overridden to clear any local caches. */
  _clear_highlighting_cache(): void;
  /**
   * Virtual method which can be overridden to return syntax highlighting data.
   * See {@link get_line_syntax_highlighting} for more details.
   */
  _get_line_syntax_highlighting(line: int): Dictionary;
  /** Virtual method which can be overridden to update any local caches. */
  _update_cache(): void;
  /**
   * Clears all cached syntax highlighting data.
   * Then calls overridable method {@link _clear_highlighting_cache}.
   */
  clear_highlighting_cache(): void;
  /**
   * Returns the syntax highlighting data for the line at index `line`. If the line is not cached, calls {@link _get_line_syntax_highlighting} first to calculate the data.
   * Each entry is a column number containing a nested {@link Dictionary}. The column number denotes the start of a region, the region will end if another region is found, or at the end of the line. The nested {@link Dictionary} contains the data for that region. Currently only the key `"color"` is supported.
   * **Example:** Possible return value. This means columns `0` to `4` should be red, and columns `5` to the end of the line should be green:
   */
  get_line_syntax_highlighting(line: int): Dictionary;
  /** Returns the associated {@link TextEdit} node. */
  get_text_edit(): TextEdit | null;
  /**
   * Clears then updates the {@link SyntaxHighlighter} caches. Override {@link _update_cache} for a callback.
   * **Note:** This is called automatically when the associated {@link TextEdit} node, updates its own cache.
   */
  update_cache(): void;
}
