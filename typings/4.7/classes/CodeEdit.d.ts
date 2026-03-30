// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A multiline text editor designed for editing code. */
declare class CodeEdit extends TextEdit {
  /**
   * If `true`, uses {@link auto_brace_completion_pairs} to automatically insert the closing brace when the opening brace is inserted by typing or autocompletion. Also automatically removes the closing brace when using backspace on the opening brace.
   */
  auto_brace_completion_enabled: boolean;
  /**
   * If `true`, highlights brace pairs when the caret is on either one, using {@link auto_brace_completion_pairs}. If matching, the pairs will be underlined. If a brace is unmatched, it is colored with .
   */
  auto_brace_completion_highlight_matching: boolean;
  /**
   * Sets the brace pairs to be autocompleted. For each entry in the dictionary, the key is the opening brace and the value is the closing brace that matches it. A brace is a {@link String} made of symbols. See {@link auto_brace_completion_enabled} and {@link auto_brace_completion_highlight_matching}.
   */
  auto_brace_completion_pairs: Dictionary;
  /**
   * If `true`, the {@link ProjectSettings.input/ui_text_completion_query} action requests code completion. To handle it, see {@link _request_code_completion} or {@link code_completion_requested}.
   */
  code_completion_enabled: boolean;
  /** Sets prefixes that will trigger code completion. */
  code_completion_prefixes: unknown;
  /** Sets the comment delimiters. All existing comment delimiters will be removed. */
  delimiter_comments: unknown;
  /** Sets the string delimiters. All existing string delimiters will be removed. */
  delimiter_strings: unknown;
  /**
   * If `true`, bookmarks are drawn in the gutter. This gutter is shared with breakpoints and executing lines. See {@link set_line_as_bookmarked}.
   */
  gutters_draw_bookmarks: boolean;
  /**
   * If `true`, breakpoints are drawn in the gutter. This gutter is shared with bookmarks and executing lines. Clicking the gutter will toggle the breakpoint for the line, see {@link set_line_as_breakpoint}.
   */
  gutters_draw_breakpoints_gutter: boolean;
  /**
   * If `true`, executing lines are marked in the gutter. This gutter is shared with breakpoints and bookmarks. See {@link set_line_as_executing}.
   */
  gutters_draw_executing_lines: boolean;
  /**
   * If `true`, the fold gutter is drawn. In this gutter, the  icon is drawn for each foldable line (see {@link can_fold_line}) and the  icon is drawn for each folded line (see {@link is_line_folded}). These icons can be clicked to toggle the fold state, see {@link toggle_foldable_line}. {@link line_folding} must be `true` to show icons.
   */
  gutters_draw_fold_gutter: boolean;
  /**
   * If `true`, the line number gutter is drawn. Line numbers start at `1` and are incremented for each line of text. Clicking and dragging in the line number gutter will select entire lines of text.
   */
  gutters_draw_line_numbers: boolean;
  /** The minimum width in digits reserved for the line number gutter. */
  gutters_line_numbers_min_digits: int;
  /**
   * If `true`, line numbers drawn in the gutter are zero padded based on the total line count. Requires {@link gutters_draw_line_numbers} to be set to `true`.
   */
  gutters_zero_pad_line_numbers: boolean;
  /**
   * If `true`, an extra indent is automatically inserted when a new line is added and a prefix in {@link indent_automatic_prefixes} is found. If a brace pair opening key is found, the matching closing brace will be moved to another new line (see {@link auto_brace_completion_pairs}).
   */
  indent_automatic: boolean;
  /** Prefixes to trigger an automatic indent. Used when {@link indent_automatic} is set to `true`. */
  indent_automatic_prefixes: unknown;
  /**
   * Size of the tabulation indent (one `Tab` press) in characters. If {@link indent_use_spaces} is enabled the number of spaces to use.
   */
  indent_size: int;
  /** Use spaces instead of tabs for indentation. */
  indent_use_spaces: boolean;
  /**
   * <member name="line_folding" type="bool" setter="set_line_folding_enabled" getter="is_line_folding_enabled" default="false">
   * If `true`, lines can be folded. Otherwise, line folding methods like {@link fold_line} will not work and {@link can_fold_line} will always return `false`. See {@link gutters_draw_fold_gutter}.
   */
  layout_direction: int;
  /**
   * Draws vertical lines at the provided columns. The first entry is considered a main hard guideline and is drawn more prominently.
   */
  line_length_guidelines: unknown;
  /**
   * Set when a validated word from {@link symbol_validate} is clicked, the {@link symbol_lookup} should be emitted.
   */
  symbol_lookup_on_click: boolean;
  /** If `true`, the {@link symbol_hovered} signal is emitted when hovering over a word. */
  symbol_tooltip_on_hover: boolean;
  text_direction: int;
  set_auto_brace_completion_enabled(value: boolean): void;
  is_auto_brace_completion_enabled(): boolean;
  set_highlight_matching_braces_enabled(value: boolean): void;
  is_highlight_matching_braces_enabled(): boolean;
  set_auto_brace_completion_pairs(value: Dictionary): void;
  get_auto_brace_completion_pairs(): Dictionary;
  set_code_completion_enabled(value: boolean): void;
  is_code_completion_enabled(): boolean;
  set_code_completion_prefixes(value: unknown): void;
  get_code_completion_prefixes(): unknown;
  set_comment_delimiters(value: unknown): void;
  get_comment_delimiters(): unknown;
  set_string_delimiters(value: unknown): void;
  get_string_delimiters(): unknown;
  set_draw_bookmarks_gutter(value: boolean): void;
  is_drawing_bookmarks_gutter(): boolean;
  set_draw_breakpoints_gutter(value: boolean): void;
  is_drawing_breakpoints_gutter(): boolean;
  set_draw_executing_lines_gutter(value: boolean): void;
  is_drawing_executing_lines_gutter(): boolean;
  set_draw_fold_gutter(value: boolean): void;
  is_drawing_fold_gutter(): boolean;
  set_draw_line_numbers(value: boolean): void;
  is_draw_line_numbers_enabled(): boolean;
  set_line_numbers_min_digits(value: int): void;
  get_line_numbers_min_digits(): int;
  set_line_numbers_zero_padded(value: boolean): void;
  is_line_numbers_zero_padded(): boolean;
  set_auto_indent_enabled(value: boolean): void;
  is_auto_indent_enabled(): boolean;
  set_auto_indent_prefixes(value: unknown): void;
  get_auto_indent_prefixes(): unknown;
  set_indent_size(value: int): void;
  get_indent_size(): int;
  set_indent_using_spaces(value: boolean): void;
  is_indent_using_spaces(): boolean;
  set_line_length_guidelines(value: unknown): void;
  get_line_length_guidelines(): unknown;
  set_symbol_lookup_on_click_enabled(value: boolean): void;
  is_symbol_lookup_on_click_enabled(): boolean;
  set_symbol_tooltip_on_hover_enabled(value: boolean): void;
  is_symbol_tooltip_on_hover_enabled(): boolean;

  /**
   * Override this method to define how the selected entry should be inserted. If `replace` is `true`, any existing text should be replaced.
   */
  _confirm_code_completion(replace: boolean): void;
  /**
   * Override this method to define what items in `candidates` should be displayed.
   * Both `candidates` and the return is an {@link Array} of {@link Dictionary}, see {@link get_code_completion_option} for {@link Dictionary} content.
   */
  _filter_code_completion_candidates(candidates: Dictionary): Dictionary;
  /**
   * Override this method to define what happens when the user requests code completion. If `force` is `true`, any checks should be bypassed.
   */
  _request_code_completion(force: boolean): void;
  /**
   * Adds a brace pair.
   * Both the start and end keys must be symbols. Only the start key has to be unique.
   */
  add_auto_brace_completion_pair(start_key: string, end_key: string): void;
  /**
   * Submits an item to the queue of potential candidates for the autocomplete menu. Call {@link update_code_completion_options} to update the list.
   * `location` indicates location of the option relative to the location of the code completion query. See {@link CodeEdit.CodeCompletionLocation} for how to set this value.
   * **Note:** This list will replace all current candidates.
   */
  add_code_completion_option(type_: int, display_text: string, insert_text: string, text_color?: Color, icon?: Resource, value?: unknown, location?: int): void;
  /**
   * Adds a comment delimiter from `start_key` to `end_key`. Both keys should be symbols, and `start_key` must not be shared with other delimiters.
   * If `line_only` is `true` or `end_key` is an empty {@link String}, the region does not carry over to the next line.
   */
  add_comment_delimiter(start_key: string, end_key: string, line_only?: boolean): void;
  /**
   * Defines a string delimiter from `start_key` to `end_key`. Both keys should be symbols, and `start_key` must not be shared with other delimiters.
   * If `line_only` is `true` or `end_key` is an empty {@link String}, the region does not carry over to the next line.
   */
  add_string_delimiter(start_key: string, end_key: string, line_only?: boolean): void;
  /**
   * Returns `true` if the given line is foldable. A line is foldable if it is the start of a valid code region (see {@link get_code_region_start_tag}), if it is the start of a comment or string block, or if the next non-empty line is more indented (see {@link TextEdit.get_indent_level}).
   */
  can_fold_line(line: int): boolean;
  /** Cancels the autocomplete menu. */
  cancel_code_completion(): void;
  /** Clears all bookmarked lines. */
  clear_bookmarked_lines(): void;
  /** Clears all breakpointed lines. */
  clear_breakpointed_lines(): void;
  /** Removes all comment delimiters. */
  clear_comment_delimiters(): void;
  /** Clears all executed lines. */
  clear_executing_lines(): void;
  /** Removes all string delimiters. */
  clear_string_delimiters(): void;
  /**
   * Inserts the selected entry into the text. If `replace` is `true`, any existing text is replaced rather than merged.
   */
  confirm_code_completion(replace?: boolean): void;
  /**
   * Converts the indents of lines between `from_line` and `to_line` to tabs or spaces as set by {@link indent_use_spaces}.
   * Values of `-1` convert the entire text.
   */
  convert_indent(from_line?: int, to_line?: int): void;
  /**
   * Creates a new code region with the selection. At least one single line comment delimiter have to be defined (see {@link add_comment_delimiter}).
   * A code region is a part of code that is highlighted when folded and can help organize your script.
   * Code region start and end tags can be customized (see {@link set_code_region_tags}).
   * Code regions are delimited using start and end tags (respectively `region` and `endregion` by default) preceded by one line comment delimiter. (eg. `#region` and `#endregion`)
   */
  create_code_region(): void;
  /** Deletes all lines that are selected or have a caret on them. */
  delete_lines(): void;
  /**
   * If there is no selection, indentation is inserted at the caret. Otherwise, the selected lines are indented like {@link indent_lines}. Equivalent to the {@link ProjectSettings.input/ui_text_indent} action. The indentation characters used depend on {@link indent_use_spaces} and {@link indent_size}.
   */
  do_indent(): void;
  /**
   * Duplicates all lines currently selected with any caret. Duplicates the entire line beneath the current one no matter where the caret is within the line.
   */
  duplicate_lines(): void;
  /** Duplicates all selected text and duplicates all lines with a caret on them. */
  duplicate_selection(): void;
  /** Folds all lines that are possible to be folded (see {@link can_fold_line}). */
  fold_all_lines(): void;
  /** Folds the given line, if possible (see {@link can_fold_line}). */
  fold_line(line: int): void;
  /** Gets the matching auto brace close key for `open_key`. */
  get_auto_brace_completion_close_key(open_key: string): string;
  /** Gets all bookmarked lines. */
  get_bookmarked_lines(): PackedInt32Array;
  /** Gets all breakpointed lines. */
  get_breakpointed_lines(): PackedInt32Array;
  /**
   * Gets the completion option at `index`. The return {@link Dictionary} has the following key-values:
   * `kind`: {@link CodeCompletionKind}
   * `display_text`: Text that is shown on the autocomplete menu.
   * `insert_text`: Text that is to be inserted when this item is selected.
   * `font_color`: Color of the text on the autocomplete menu.
   * `icon`: Icon to draw on the autocomplete menu.
   * `default_value`: Value of the symbol.
   */
  get_code_completion_option(index: int): Dictionary;
  /** Gets all completion options, see {@link get_code_completion_option} for return content. */
  get_code_completion_options(): Dictionary;
  /** Gets the index of the current selected completion option. */
  get_code_completion_selected_index(): int;
  /** Returns the code region end tag (without comment delimiter). */
  get_code_region_end_tag(): string;
  /** Returns the code region start tag (without comment delimiter). */
  get_code_region_start_tag(): string;
  /** Gets the end key for a string or comment region index. */
  get_delimiter_end_key(delimiter_index: int): string;
  /**
   * If `line` `column` is in a string or comment, returns the end position of the region. If not or no end could be found, both {@link Vector2} values will be `-1`.
   */
  get_delimiter_end_position(line: int, column: int): Vector2;
  /** Gets the start key for a string or comment region index. */
  get_delimiter_start_key(delimiter_index: int): string;
  /**
   * If `line` `column` is in a string or comment, returns the start position of the region. If not or no start could be found, both {@link Vector2} values will be `-1`.
   */
  get_delimiter_start_position(line: int, column: int): Vector2;
  /** Gets all executing lines. */
  get_executing_lines(): PackedInt32Array;
  /** Returns all lines that are currently folded. */
  get_folded_lines(): unknown;
  /** Returns the full text with char `0xFFFF` at the caret location. */
  get_text_for_code_completion(): string;
  /** Returns the full text with char `0xFFFF` at the cursor location. */
  get_text_for_symbol_lookup(): string;
  /** Returns the full text with char `0xFFFF` at the specified location. */
  get_text_with_cursor_char(line: int, column: int): string;
  /** Returns `true` if close key `close_key` exists. */
  has_auto_brace_completion_close_key(close_key: string): boolean;
  /** Returns `true` if open key `open_key` exists. */
  has_auto_brace_completion_open_key(open_key: string): boolean;
  /** Returns `true` if comment `start_key` exists. */
  has_comment_delimiter(start_key: string): boolean;
  /** Returns `true` if string `start_key` exists. */
  has_string_delimiter(start_key: string): boolean;
  /**
   * Indents all lines that are selected or have a caret on them. Uses spaces or a tab depending on {@link indent_use_spaces}. See {@link unindent_lines}.
   */
  indent_lines(): void;
  /**
   * Returns delimiter index if `line` `column` is in a comment. If `column` is not provided, will return delimiter index if the entire `line` is a comment. Otherwise `-1`.
   */
  is_in_comment(line: int, column?: int): int;
  /**
   * Returns the delimiter index if `line` `column` is in a string. If `column` is not provided, will return the delimiter index if the entire `line` is a string. Otherwise `-1`.
   */
  is_in_string(line: int, column?: int): int;
  /** Returns `true` if the given line is bookmarked. See {@link set_line_as_bookmarked}. */
  is_line_bookmarked(line: int): boolean;
  /** Returns `true` if the given line is breakpointed. See {@link set_line_as_breakpoint}. */
  is_line_breakpointed(line: int): boolean;
  /** Returns `true` if the given line is a code region end. See {@link set_code_region_tags}. */
  is_line_code_region_end(line: int): boolean;
  /** Returns `true` if the given line is a code region start. See {@link set_code_region_tags}. */
  is_line_code_region_start(line: int): boolean;
  /** Returns `true` if the given line is marked as executing. See {@link set_line_as_executing}. */
  is_line_executing(line: int): boolean;
  /** Returns `true` if the given line is folded. See {@link fold_line}. */
  is_line_folded(line: int): boolean;
  /**
   * Joins all selected lines or lines containing a caret with their next line. Whitespace in between will be removed. If the next line has content, the `line_ending` will be inserted in between.
   */
  join_lines(line_ending?: string): void;
  /** Moves all lines down that are selected or have a caret on them. */
  move_lines_down(): void;
  /** Moves all lines up that are selected or have a caret on them. */
  move_lines_up(): void;
  /** Removes the comment delimiter with `start_key`. */
  remove_comment_delimiter(start_key: string): void;
  /** Removes the string delimiter with `start_key`. */
  remove_string_delimiter(start_key: string): void;
  /**
   * Emits {@link code_completion_requested}, if `force` is `true` will bypass all checks. Otherwise will check that the caret is in a word or in front of a prefix. Will ignore the request if all current options are of type file path, node path, or signal.
   */
  request_code_completion(force?: boolean): void;
  /** Sets the current selected completion option. */
  set_code_completion_selected_index(index: int): void;
  /** Sets the code hint text. Pass an empty string to clear. */
  set_code_hint(code_hint: string): void;
  /**
   * If `true`, the code hint will draw below the main caret. If `false`, the code hint will draw above the main caret. See {@link set_code_hint}.
   */
  set_code_hint_draw_below(draw_below: boolean): void;
  /** Sets the code region start and end tags (without comment delimiter). */
  set_code_region_tags(start?: string, end?: string): void;
  /**
   * Sets the given line as bookmarked. If `true` and {@link gutters_draw_bookmarks} is `true`, draws the  icon in the gutter for this line. See {@link get_bookmarked_lines} and {@link is_line_bookmarked}.
   */
  set_line_as_bookmarked(line: int, bookmarked: boolean): void;
  /**
   * Sets the given line as a breakpoint. If `true` and {@link gutters_draw_breakpoints_gutter} is `true`, draws the  icon in the gutter for this line. See {@link get_breakpointed_lines} and {@link is_line_breakpointed}.
   */
  set_line_as_breakpoint(line: int, breakpointed: boolean): void;
  /**
   * Sets the given line as executing. If `true` and {@link gutters_draw_executing_lines} is `true`, draws the  icon in the gutter for this line. See {@link get_executing_lines} and {@link is_line_executing}.
   */
  set_line_as_executing(line: int, executing: boolean): void;
  /** Sets the symbol emitted by {@link symbol_validate} as a valid lookup. */
  set_symbol_lookup_word_as_valid(valid: boolean): void;
  /** Toggle the folding of the code block at the given line. */
  toggle_foldable_line(line: int): void;
  /** Toggle the folding of the code block on all lines with a caret on them. */
  toggle_foldable_lines_at_carets(): void;
  /** Unfolds all lines that are folded. */
  unfold_all_lines(): void;
  /** Unfolds the given line if it is folded or if it is hidden under a folded line. */
  unfold_line(line: int): void;
  /**
   * Unindents all lines that are selected or have a caret on them. Uses spaces or a tab depending on {@link indent_use_spaces}. Equivalent to the {@link ProjectSettings.input/ui_text_dedent} action. See {@link indent_lines}.
   */
  unindent_lines(): void;
  /**
   * Submits all completion options added with {@link add_code_completion_option}. Will try to force the autocomplete menu to popup, if `force` is `true`.
   * **Note:** This will replace all current candidates.
   */
  update_code_completion_options(force: boolean): void;

  /**
   * Emitted when a breakpoint is added or removed from a line. If the line is removed via backspace, a signal is emitted at the old line.
   */
  breakpoint_toggled: Signal<[int]>;
  /**
   * Emitted when the user requests code completion. This signal will not be sent if {@link _request_code_completion} is overridden or {@link code_completion_enabled} is `false`.
   */
  code_completion_requested: Signal<[]>;
  /**
   * Emitted when the user hovers over a symbol. Unlike {@link Control.mouse_entered}, this signal is not emitted immediately, but when the cursor is over the symbol for {@link ProjectSettings.gui/timers/tooltip_delay_sec} seconds.
   * **Note:** {@link symbol_tooltip_on_hover} must be `true` for this signal to be emitted.
   */
  symbol_hovered: Signal<[string, int, int]>;
  /** Emitted when the user has clicked on a valid symbol. */
  symbol_lookup: Signal<[string, int, int]>;
  /**
   * Emitted when the user hovers over a symbol. The symbol should be validated and responded to, by calling {@link set_symbol_lookup_word_as_valid}.
   * **Note:** {@link symbol_lookup_on_click} must be `true` for this signal to be emitted.
   */
  symbol_validate: Signal<[string]>;

  // enum CodeCompletionKind
  /** Marks the option as a class. */
  static readonly KIND_CLASS: int;
  /** Marks the option as a function. */
  static readonly KIND_FUNCTION: int;
  /** Marks the option as a Godot signal. */
  static readonly KIND_SIGNAL: int;
  /** Marks the option as a variable. */
  static readonly KIND_VARIABLE: int;
  /** Marks the option as a member. */
  static readonly KIND_MEMBER: int;
  /** Marks the option as an enum entry. */
  static readonly KIND_ENUM: int;
  /** Marks the option as a constant. */
  static readonly KIND_CONSTANT: int;
  /** Marks the option as a Godot node path. */
  static readonly KIND_NODE_PATH: int;
  /** Marks the option as a file path. */
  static readonly KIND_FILE_PATH: int;
  /** Marks the option as unclassified or plain text. */
  static readonly KIND_PLAIN_TEXT: int;
  // enum CodeCompletionLocation
  /**
   * The option is local to the location of the code completion query - e.g. a local variable. Subsequent value of location represent options from the outer class, the exact value represent how far they are (in terms of inner classes).
   */
  static readonly LOCATION_LOCAL: int;
  /**
   * The option is from the containing class or a parent class, relative to the location of the code completion query. Perform a bitwise OR with the class depth (e.g. `0` for the local class, `1` for the parent, `2` for the grandparent, etc.) to store the depth of an option in the class or a parent class.
   */
  static readonly LOCATION_PARENT_MASK: int;
  /**
   * The option is from user code which is not local and not in a derived class (e.g. Autoload Singletons).
   */
  static readonly LOCATION_OTHER_USER_CODE: int;
  /**
   * The option is from other engine code, not covered by the other enum constants - e.g. built-in classes.
   */
  static readonly LOCATION_OTHER: int;
}
