// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A multiline text editor. */
declare class TextEdit extends Control {
  /** If {@link wrap_mode} is set to {@link LINE_WRAPPING_BOUNDARY}, sets text wrapping mode. */
  autowrap_mode: int;
  /**
   * If `true` and {@link caret_mid_grapheme} is `false`, backspace deletes an entire composite character such as ❤️‍🩹, instead of deleting part of the composite character.
   */
  backspace_deletes_composite_character_enabled: boolean;
  /** If `true`, makes the caret blink. */
  caret_blink: boolean;
  /** The interval at which the caret blinks (in seconds). */
  caret_blink_interval: float;
  /** If `true`, caret will be visible when {@link editable} is disabled. */
  caret_draw_when_editable_disabled: boolean;
  /**
   * Allow moving caret, selecting and removing the individual composite character components.
   * **Note:** `Backspace` is always removing individual composite character components.
   */
  caret_mid_grapheme: boolean;
  /**
   * If `true`, a right-click moves the caret at the mouse position before displaying the context menu.
   * If `false`, the context menu ignores mouse location.
   */
  caret_move_on_right_click: boolean;
  /**
   * If `true`, multiple carets are allowed. Left-clicking with `Alt` adds a new caret. See {@link add_caret} and {@link get_caret_count}.
   */
  caret_multiple: boolean;
  /** Set the type of caret to draw. */
  caret_type: int;
  /** If `true`, a right-click displays the context menu. */
  context_menu_enabled: boolean;
  /**
   * The characters to consider as word delimiters if {@link use_custom_word_separators} is `true`. The characters should be defined without separation, for example `#_!`.
   */
  custom_word_separators: string;
  /** If `true`, the selected text will be deselected when focus is lost. */
  deselect_on_focus_loss_enabled: boolean;
  /** If `true`, allow drag and drop of selected text. Text can still be dropped from other sources. */
  drag_and_drop_selection_enabled: boolean;
  /** If `true`, control characters are displayed. */
  draw_control_chars: boolean;
  /** If `true`, the "space" character will have a visible representation. */
  draw_spaces: boolean;
  /** If `true`, the "tab" character will have a visible representation. */
  draw_tabs: boolean;
  /** If `false`, existing text cannot be modified and new text cannot be added. */
  editable: boolean;
  /** If `true`, "Emoji and Symbols" menu is enabled. */
  emoji_menu_enabled: boolean;
  /**
   * If `true`, copying or cutting without a selection is performed on all lines with a caret. Otherwise, copy and cut require a selection.
   */
  empty_selection_clipboard_enabled: boolean;
  /**
   * <member name="highlight_all_occurrences" type="bool" setter="set_highlight_all_occurrences" getter="is_highlight_all_occurrences_enabled" default="false">
   * If `true`, all occurrences of the selected text will be highlighted.
   */
  focus_mode: int;
  /** If `true`, the line containing the cursor is highlighted. */
  highlight_current_line: boolean;
  /** If `true`, all wrapped lines are indented to the same amount as the unwrapped line. */
  indent_wrapped_lines: boolean;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /**
   * If `false`, using middle mouse button to paste clipboard will be disabled.
   * **Note:** This method is only implemented on Linux.
   */
  middle_mouse_paste_enabled: boolean;
  /**
   * If `true`, a minimap is shown, providing an outline of your source code. The minimap uses a fixed-width text size.
   */
  minimap_draw: boolean;
  /** The width, in pixels, of the minimap. */
  minimap_width: int;
  /**
   * <member name="placeholder_text" type="String" setter="set_placeholder" getter="get_placeholder" default="&quot;&quot;">
   * Text shown when the {@link TextEdit} is empty. It is **not** the {@link TextEdit}'s default value (see {@link text}).
   */
  mouse_default_cursor_shape: int;
  /**
   * If `true`, {@link TextEdit} will disable vertical scroll and fit minimum height to the number of visible lines. When both this property and {@link scroll_fit_content_width} are `true`, no scrollbars will be displayed.
   */
  scroll_fit_content_height: boolean;
  /**
   * If `true`, {@link TextEdit} will disable horizontal scroll and fit minimum width to the widest line in the text. When both this property and {@link scroll_fit_content_height} are `true`, no scrollbars will be displayed.
   */
  scroll_fit_content_width: boolean;
  /** If there is a horizontal scrollbar, this determines the current horizontal scroll value in pixels. */
  scroll_horizontal: int;
  /** Allow scrolling past the last line into "virtual" space. */
  scroll_past_end_of_file: boolean;
  /** Scroll smoothly over the text rather than jumping to the next location. */
  scroll_smooth: boolean;
  /** Sets the scroll speed with the minimap or when {@link scroll_smooth} is enabled. */
  scroll_v_scroll_speed: float;
  /**
   * If there is a vertical scrollbar, this determines the current vertical scroll value in line numbers, starting at 0 for the top line.
   */
  scroll_vertical: float;
  /**
   * If `true`, text can be selected.
   * If `false`, text can not be selected by the user or by the {@link select} or {@link select_all} methods.
   */
  selecting_enabled: boolean;
  /** If `true`, shortcut keys for context menu items are enabled, even if the context menu is disabled. */
  shortcut_keys_enabled: boolean;
  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /**
   * The syntax highlighter to use.
   * **Note:** A {@link SyntaxHighlighter} instance should not be used across multiple {@link TextEdit} nodes.
   */
  syntax_highlighter: SyntaxHighlighter | null;
  /**
   * If `true`, {@link ProjectSettings.input/ui_text_indent} input `Tab` character, otherwise it moves keyboard focus to the next {@link Control} in the scene.
   */
  tab_input_mode: boolean;
  /** String value of the {@link TextEdit}. */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /**
   * If `false`, using `Ctrl + Left` or `Ctrl + Right` (`Cmd + Left` or `Cmd + Right` on macOS) bindings will use the behavior of {@link use_default_word_separators}. If `true`, it will also stop the caret if a character within {@link custom_word_separators} is detected. Useful for subword moving. This behavior also will be applied to the behavior of text selection.
   */
  use_custom_word_separators: boolean;
  /**
   * If `false`, using `Ctrl + Left` or `Ctrl + Right` (`Cmd + Left` or `Cmd + Right` on macOS) bindings will stop moving caret only if a space or punctuation is detected. If `true`, it will also stop the caret if a character is part of `!"#$%&'()*+,-./:;<=>?@[\]^`{|}~`, the Unicode General Punctuation table, or the Unicode CJK Punctuation table. Useful for subword moving. This behavior also will be applied to the behavior of text selection.
   */
  use_default_word_separators: boolean;
  /** If `true`, the native virtual keyboard is enabled on platforms that support it. */
  virtual_keyboard_enabled: boolean;
  /** If `true`, the native virtual keyboard is shown on focus events on platforms that support it. */
  virtual_keyboard_show_on_focus: boolean;
  /** Sets the line wrapping mode to use. */
  wrap_mode: int;
  set_autowrap_mode(value: int): void;
  get_autowrap_mode(): int;
  set_backspace_deletes_composite_character_enabled(value: boolean): void;
  is_backspace_deletes_composite_character_enabled(): boolean;
  set_caret_blink_enabled(value: boolean): void;
  is_caret_blink_enabled(): boolean;
  set_caret_blink_interval(value: float): void;
  get_caret_blink_interval(): float;
  set_draw_caret_when_editable_disabled(value: boolean): void;
  is_drawing_caret_when_editable_disabled(): boolean;
  set_caret_mid_grapheme_enabled(value: boolean): void;
  is_caret_mid_grapheme_enabled(): boolean;
  set_move_caret_on_right_click_enabled(value: boolean): void;
  is_move_caret_on_right_click_enabled(): boolean;
  set_multiple_carets_enabled(value: boolean): void;
  is_multiple_carets_enabled(): boolean;
  set_caret_type(value: int): void;
  get_caret_type(): int;
  set_context_menu_enabled(value: boolean): void;
  is_context_menu_enabled(): boolean;
  set_custom_word_separators(value: string | NodePath): void;
  get_custom_word_separators(): string;
  set_deselect_on_focus_loss_enabled(value: boolean): void;
  is_deselect_on_focus_loss_enabled(): boolean;
  set_drag_and_drop_selection_enabled(value: boolean): void;
  is_drag_and_drop_selection_enabled(): boolean;
  set_draw_control_chars(value: boolean): void;
  get_draw_control_chars(): boolean;
  set_draw_spaces(value: boolean): void;
  is_drawing_spaces(): boolean;
  set_draw_tabs(value: boolean): void;
  is_drawing_tabs(): boolean;
  set_editable(value: boolean): void;
  is_editable(): boolean;
  set_emoji_menu_enabled(value: boolean): void;
  is_emoji_menu_enabled(): boolean;
  set_empty_selection_clipboard_enabled(value: boolean): void;
  is_empty_selection_clipboard_enabled(): boolean;
  set_highlight_current_line(value: boolean): void;
  is_highlight_current_line_enabled(): boolean;
  set_indent_wrapped_lines(value: boolean): void;
  is_indent_wrapped_lines(): boolean;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_middle_mouse_paste_enabled(value: boolean): void;
  is_middle_mouse_paste_enabled(): boolean;
  set_draw_minimap(value: boolean): void;
  is_drawing_minimap(): boolean;
  set_minimap_width(value: int): void;
  get_minimap_width(): int;
  set_fit_content_height_enabled(value: boolean): void;
  is_fit_content_height_enabled(): boolean;
  set_fit_content_width_enabled(value: boolean): void;
  is_fit_content_width_enabled(): boolean;
  set_h_scroll(value: int): void;
  get_h_scroll(): int;
  set_scroll_past_end_of_file_enabled(value: boolean): void;
  is_scroll_past_end_of_file_enabled(): boolean;
  set_smooth_scroll_enabled(value: boolean): void;
  is_smooth_scroll_enabled(): boolean;
  set_v_scroll_speed(value: float): void;
  get_v_scroll_speed(): float;
  set_v_scroll(value: float): void;
  get_v_scroll(): float;
  set_selecting_enabled(value: boolean): void;
  is_selecting_enabled(): boolean;
  set_shortcut_keys_enabled(value: boolean): void;
  is_shortcut_keys_enabled(): boolean;
  set_structured_text_bidi_override(value: int): void;
  get_structured_text_bidi_override(): int;
  set_structured_text_bidi_override_options(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_syntax_highlighter(value: SyntaxHighlighter | null): void;
  get_syntax_highlighter(): SyntaxHighlighter | null;
  set_tab_input_mode(value: boolean): void;
  get_tab_input_mode(): boolean;
  set_text(value: string | NodePath): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_use_custom_word_separators(value: boolean): void;
  is_custom_word_separators_enabled(): boolean;
  set_use_default_word_separators(value: boolean): void;
  is_default_word_separators_enabled(): boolean;
  set_virtual_keyboard_enabled(value: boolean): void;
  is_virtual_keyboard_enabled(): boolean;
  set_virtual_keyboard_show_on_focus(value: boolean): void;
  get_virtual_keyboard_show_on_focus(): boolean;
  set_line_wrapping_mode(value: int): void;
  get_line_wrapping_mode(): int;

  /** Override this method to define what happens when the user presses the backspace key. */
  _backspace(caret_index: int): void;
  /** Override this method to define what happens when the user performs a copy operation. */
  _copy(caret_index: int): void;
  /** Override this method to define what happens when the user performs a cut operation. */
  _cut(caret_index: int): void;
  /** Override this method to define what happens when the user types in the provided key `unicode_char`. */
  _handle_unicode_input(unicode_char: int, caret_index: int): void;
  /** Override this method to define what happens when the user performs a paste operation. */
  _paste(caret_index: int): void;
  /**
   * Override this method to define what happens when the user performs a paste operation with middle mouse button.
   * **Note:** This method is only implemented on Linux.
   */
  _paste_primary_clipboard(caret_index: int): void;
  /**
   * Adds a new caret at the given location. Returns the index of the new caret, or `-1` if the location is invalid.
   */
  add_caret(line: int, column: int): int;
  /**
   * Adds an additional caret above or below every caret. If `below` is `true` the new caret will be added below and above otherwise.
   */
  add_caret_at_carets(below: boolean): void;
  /**
   * Register a new gutter to this {@link TextEdit}. Use `at` to have a specific gutter order. A value of `-1` appends the gutter to the right.
   */
  add_gutter(at?: int): void;
  /**
   * Adds a selection and a caret for the next occurrence of the current selection. If there is no active selection, selects word under caret.
   */
  add_selection_for_next_occurrence(): void;
  /** This method does nothing. */
  adjust_carets_after_edit(caret: int, from_line: int, from_col: int, to_line: int, to_col: int): void;
  /** Adjust the viewport so the caret is visible. */
  adjust_viewport_to_caret(caret_index?: int): void;
  /**
   * Applies text from the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME) to each caret and closes the IME if it is open.
   */
  apply_ime(): void;
  /** Called when the user presses the backspace key. Can be overridden with {@link _backspace}. */
  backspace(caret_index?: int): void;
  /**
   * Starts a multipart edit. All edits will be treated as one action until {@link end_complex_operation} is called.
   */
  begin_complex_operation(): void;
  /**
   * Starts an edit for multiple carets. The edit must be ended with {@link end_multicaret_edit}. Multicaret edits can be used to edit text at multiple carets and delay merging the carets until the end, so the caret indexes aren't affected immediately. {@link begin_multicaret_edit} and {@link end_multicaret_edit} can be nested, and the merge will happen at the last {@link end_multicaret_edit}.
   */
  begin_multicaret_edit(): void;
  /**
   * Closes the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME) if it is open. Any text in the IME will be lost.
   */
  cancel_ime(): void;
  /**
   * Centers the viewport on the line the editing caret is at. This also resets the {@link scroll_horizontal} value to `0`.
   */
  center_viewport_to_caret(caret_index?: int): void;
  /** Performs a full reset of {@link TextEdit}, including undo history. */
  clear(): void;
  /** Clears the undo history. */
  clear_undo_history(): void;
  /**
   * Collapse all carets in the given range to the `from_line` and `from_column` position.
   * `inclusive` applies to both ends.
   * If {@link is_in_mulitcaret_edit} is `true`, carets that are collapsed will be `true` for {@link multicaret_edit_ignore_caret}.
   * {@link merge_overlapping_carets} will be called if any carets were collapsed.
   */
  collapse_carets(from_line: int, from_column: int, to_line: int, to_column: int, inclusive?: boolean): void;
  /** Copies the current text selection. Can be overridden with {@link _copy}. */
  copy(caret_index?: int): void;
  /** Cut's the current selection. Can be overridden with {@link _cut}. */
  cut(caret_index?: int): void;
  /** Deletes the selected text. */
  delete_selection(caret_index?: int): void;
  /** Deselects the current selection. */
  deselect(caret_index?: int): void;
  /** Marks the end of steps in the current action started with {@link start_action}. */
  end_action(): void;
  /**
   * Ends a multipart edit, started with {@link begin_complex_operation}. If called outside a complex operation, the current operation is pushed onto the undo/redo stack.
   */
  end_complex_operation(): void;
  /**
   * Ends an edit for multiple carets, that was started with {@link begin_multicaret_edit}. If this was the last {@link end_multicaret_edit} and {@link merge_overlapping_carets} was called, carets will be merged.
   */
  end_multicaret_edit(): void;
  /** Returns the column the editing caret is at. */
  get_caret_column(caret_index?: int): int;
  /** Returns the number of carets in this {@link TextEdit}. */
  get_caret_count(): int;
  /** Returns the caret pixel draw position. */
  get_caret_draw_pos(caret_index?: int): Vector2;
  /**
   * Returns a list of caret indexes in their edit order, this done from bottom to top. Edit order refers to the way actions such as {@link insert_text_at_caret} are applied.
   */
  get_caret_index_edit_order(): PackedInt32Array;
  /** Returns the line the editing caret is on. */
  get_caret_line(caret_index?: int): int;
  /** Returns the wrap index the editing caret is on. */
  get_caret_wrap_index(caret_index?: int): int;
  /**
   * Returns the first column containing a non-whitespace character on the given line. If there is only whitespace, returns the number of characters.
   */
  get_first_non_whitespace_column(line: int): int;
  /** Returns the first visible line. */
  get_first_visible_line(): int;
  /** Returns the number of gutters registered. */
  get_gutter_count(): int;
  /** Returns the name of the gutter at the given index. */
  get_gutter_name(gutter: int): string;
  /**
   * Returns the type of the gutter at the given index. Gutters can contain icons, text, or custom visuals.
   */
  get_gutter_type(gutter: int): int;
  /** Returns the width of the gutter at the given index. */
  get_gutter_width(gutter: int): int;
  /** Returns the {@link HScrollBar} used by {@link TextEdit}. */
  get_h_scroll_bar(): HScrollBar;
  /**
   * Returns the indent level of the given line. This is the number of spaces and tabs at the beginning of the line, with the tabs taking the tab size into account (see {@link get_tab_size}).
   */
  get_indent_level(line: int): int;
  /**
   * Returns the last visible line. Use {@link get_last_full_visible_line_wrap_index} for the wrap index.
   */
  get_last_full_visible_line(): int;
  /** Returns the last visible wrap index of the last visible line. */
  get_last_full_visible_line_wrap_index(): int;
  /** Returns the last unhidden line in the entire {@link TextEdit}. */
  get_last_unhidden_line(): int;
  /** Returns the text of a specific line. */
  get_line(line: int): string;
  /**
   * Returns the custom background color of the given line. If no color is set, returns `Color(0, 0, 0, 0)`.
   */
  get_line_background_color(line: int): Color;
  /**
   * Returns the line and column at the given position. In the returned vector, `x` is the column and `y` is the line.
   * If `clamp_line` is `false` and `position` is below the last line, `Vector2i(-1, -1)` is returned.
   * If `clamp_column` is `false` and `position` is outside the column range of the line, `Vector2i(-1, -1)` is returned.
   */
  get_line_column_at_pos(position: Vector2i | Vector2, clamp_line?: boolean, clamp_column?: boolean): Vector2i;
  /** Returns the number of lines in the text. */
  get_line_count(): int;
  /**
   * Returns the icon currently in `gutter` at `line`. This only works when the gutter type is {@link GUTTER_TYPE_ICON} (see {@link set_gutter_type}).
   */
  get_line_gutter_icon(line: int, gutter: int): Texture2D | null;
  /** Returns the color currently in `gutter` at `line`. */
  get_line_gutter_item_color(line: int, gutter: int): Color;
  /** Returns the metadata currently in `gutter` at `line`. */
  get_line_gutter_metadata(line: int, gutter: int): unknown;
  /**
   * Returns the text currently in `gutter` at `line`. This only works when the gutter type is {@link GUTTER_TYPE_STRING} (see {@link set_gutter_type}).
   */
  get_line_gutter_text(line: int, gutter: int): string;
  /**
   * Returns the maximum value of the line height among all lines.
   * **Note:** The return value is influenced by  and . And it will not be less than `1`.
   */
  get_line_height(): int;
  /**
   * Returns an {@link Array} of line ranges where `x` is the first line and `y` is the last line. All lines within these ranges will have a caret on them or be part of a selection. Each line will only be part of one line range, even if it has multiple carets on it.
   * If a selection's end column ({@link get_selection_to_column}) is at column `0`, that line will not be included. If a selection begins on the line after another selection ends and `merge_adjacent` is `true`, or they begin and end on the same line, one line range will include both selections.
   */
  get_line_ranges_from_carets(only_selections?: boolean, merge_adjacent?: boolean): Array<Vector2i>;
  /** Returns the width in pixels of the `wrap_index` on `line`. */
  get_line_width(line: int, wrap_index?: int): int;
  /** Returns line text as it is currently displayed, including IME composition string. */
  get_line_with_ime(line: int): string;
  /** Returns the number of times the given line is wrapped. */
  get_line_wrap_count(line: int): int;
  /**
   * Returns the wrap index of the given column on the given line. This ranges from `0` to {@link get_line_wrap_count}.
   */
  get_line_wrap_index_at_column(line: int, column: int): int;
  /** Returns an array of {@link String}s representing each wrapped index. */
  get_line_wrapped_text(line: int): PackedStringArray;
  /** Returns the local mouse position adjusted for the text direction. */
  get_local_mouse_pos(): Vector2;
  /**
   * Returns the {@link PopupMenu} of this {@link TextEdit}. By default, this menu is displayed when right-clicking on the {@link TextEdit}.
   * You can add custom menu items or remove standard ones. Make sure your IDs don't conflict with the standard ones (see {@link MenuItems}). For example:
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_menu(): PopupMenu;
  /** Returns the equivalent minimap line at `position`. */
  get_minimap_line_at_pos(position: Vector2i | Vector2): int;
  /** Returns the number of lines that may be drawn on the minimap. */
  get_minimap_visible_lines(): int;
  /**
   * Returns the correct column at the end of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the start of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   * **Note:** To check at caret location use `get_next_composite_character_column(get_caret_line(), get_caret_column())`
   */
  get_next_composite_character_column(line: int, column: int): int;
  /**
   * Similar to {@link get_next_visible_line_offset_from}, but takes into account the line wrap indexes. In the returned vector, `x` is the line, `y` is the wrap index.
   */
  get_next_visible_line_index_offset_from(line: int, wrap_index: int, visible_amount: int): Vector2i;
  /**
   * Returns the count to the next visible line from `line` to `line + visible_amount`. Can also count backwards. For example if a {@link TextEdit} has 5 lines with lines 2 and 3 hidden, calling this with `line = 1, visible_amount = 1` would return 3.
   */
  get_next_visible_line_offset_from(line: int, visible_amount: int): int;
  /**
   * Returns the local position for the given `line` and `column`. If `x` or `y` of the returned vector equal `-1`, the position is outside of the viewable area of the control.
   * **Note:** The Y position corresponds to the bottom side of the line. Use {@link get_rect_at_line_column} to get the top side position.
   */
  get_pos_at_line_column(line: int, column: int): Vector2i;
  /**
   * Returns the correct column at the start of a composite character like ❤️‍🩹 (mending heart; Unicode: `U+2764 U+FE0F U+200D U+1FA79`) which is comprised of more than one Unicode code point, if the caret is at the end of the composite character. Also returns the correct column with the caret at mid grapheme and for non-composite characters.
   * **Note:** To check at caret location use `get_previous_composite_character_column(get_caret_line(), get_caret_column())`
   */
  get_previous_composite_character_column(line: int, column: int): int;
  /**
   * Returns the local position and size for the grapheme at the given `line` and `column`. If `x` or `y` position of the returned rect equal `-1`, the position is outside of the viewable area of the control.
   * **Note:** The Y position of the returned rect corresponds to the top side of the line, unlike {@link get_pos_at_line_column} which returns the bottom side.
   */
  get_rect_at_line_column(line: int, column: int): Rect2i;
  /** Returns the last tagged saved version from {@link tag_saved_version}. */
  get_saved_version(): int;
  /** Returns the scroll position for `wrap_index` of `line`. */
  get_scroll_pos_for_line(line: int, wrap_index?: int): float;
  /**
   * Returns the text inside the selection of a caret, or all the carets if `caret_index` is its default value `-1`.
   */
  get_selected_text(caret_index?: int): string;
  /**
   * Returns the caret index of the selection at the given `line` and `column`, or `-1` if there is none.
   * If `include_edges` is `false`, the position must be inside the selection and not at either end. If `only_selections` is `false`, carets without a selection will also be considered.
   */
  get_selection_at_line_column(line: int, column: int, include_edges?: boolean, only_selections?: boolean): int;
  /** Returns the original start column of the selection. */
  get_selection_column(caret_index?: int): int;
  /** Returns the selection begin column. Returns the caret column if there is no selection. */
  get_selection_from_column(caret_index?: int): int;
  /** Returns the selection begin line. Returns the caret line if there is no selection. */
  get_selection_from_line(caret_index?: int): int;
  /** Returns the original start line of the selection. */
  get_selection_line(caret_index?: int): int;
  /** Returns the current selection mode. */
  get_selection_mode(): int;
  /** Returns the origin column of the selection. This is the opposite end from the caret. */
  get_selection_origin_column(caret_index?: int): int;
  /** Returns the origin line of the selection. This is the opposite end from the caret. */
  get_selection_origin_line(caret_index?: int): int;
  /** Returns the selection end column. Returns the caret column if there is no selection. */
  get_selection_to_column(caret_index?: int): int;
  /** Returns the selection end line. Returns the caret line if there is no selection. */
  get_selection_to_line(caret_index?: int): int;
  /**
   * Returns the carets sorted by selection beginning from lowest line and column to highest (from top to bottom of text).
   * If `include_ignored_carets` is `false`, carets from {@link multicaret_edit_ignore_caret} will be ignored.
   */
  get_sorted_carets(include_ignored_carets?: boolean): PackedInt32Array;
  /** Returns the {@link TextEdit}'s' tab size. */
  get_tab_size(): int;
  /** Returns the total width of all gutters and internal padding. */
  get_total_gutter_width(): int;
  /**
   * Returns the total number of lines in the text. This includes wrapped lines and excludes folded lines. If {@link wrap_mode} is set to {@link LINE_WRAPPING_NONE} and no lines are folded (see {@link CodeEdit.is_line_folded}) then this is equivalent to {@link get_line_count}. See {@link get_visible_line_count_in_range} for a limited range of lines.
   */
  get_total_visible_line_count(): int;
  /** Returns the {@link VScrollBar} of the {@link TextEdit}. */
  get_v_scroll_bar(): VScrollBar;
  /**
   * Returns the current version of the {@link TextEdit}. The version is a count of recorded operations by the undo/redo history.
   */
  get_version(): int;
  /** Returns the number of lines that can visually fit, rounded down, based on this control's height. */
  get_visible_line_count(): int;
  /**
   * Returns the total number of lines between `from_line` and `to_line` (inclusive) in the text. This includes wrapped lines and excludes folded lines. If the range covers all lines it is equivalent to {@link get_total_visible_line_count}.
   */
  get_visible_line_count_in_range(from_line: int, to_line: int): int;
  /** Returns the word at `position`. */
  get_word_at_pos(position: Vector2 | Vector2i): string;
  /** Returns a {@link String} text with the word under the caret's location. */
  get_word_under_caret(caret_index?: int): string;
  /**
   * Returns `true` if the user has text in the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) (IME).
   */
  has_ime_text(): boolean;
  /** Returns `true` if a "redo" action is available. */
  has_redo(): boolean;
  /** Returns `true` if the user has selected text. */
  has_selection(caret_index?: int): boolean;
  /** Returns `true` if an "undo" action is available. */
  has_undo(): boolean;
  /** Inserts a new line with `text` at `line`. */
  insert_line_at(line: int, text: string | NodePath): void;
  /**
   * Inserts the `text` at `line` and `column`.
   * If `before_selection_begin` is `true`, carets and selections that begin at `line` and `column` will moved to the end of the inserted text, along with all carets after it.
   * If `before_selection_end` is `true`, selections that end at `line` and `column` will be extended to the end of the inserted text. These parameters can be used to insert text inside of or outside of selections.
   */
  insert_text(text: string | NodePath, line: int, column: int, before_selection_begin?: boolean, before_selection_end?: boolean): void;
  /** Insert the specified text at the caret position. */
  insert_text_at_caret(text: string | NodePath, caret_index?: int): void;
  /**
   * Returns `true` if the caret of the selection is after the selection origin. This can be used to determine the direction of the selection.
   */
  is_caret_after_selection_origin(caret_index?: int): boolean;
  /**
   * Returns `true` if the caret is visible, `false` otherwise. A caret will be considered hidden if it is outside the scrollable area when scrolling is enabled.
   * **Note:** {@link is_caret_visible} does not account for a caret being off-screen if it is still within the scrollable area. It will return `true` even if the caret is off-screen as long as it meets {@link TextEdit}'s own conditions for being visible. This includes uses of {@link scroll_fit_content_width} and {@link scroll_fit_content_height} that cause the {@link TextEdit} to expand beyond the viewport's bounds.
   */
  is_caret_visible(caret_index?: int): boolean;
  /** Returns `true` if the user is dragging their mouse for scrolling, selecting, or text dragging. */
  is_dragging_cursor(): boolean;
  /** Returns `true` if the gutter at the given index is clickable. See {@link set_gutter_clickable}. */
  is_gutter_clickable(gutter: int): boolean;
  /** Returns `true` if the gutter at the given index is currently drawn. See {@link set_gutter_draw}. */
  is_gutter_drawn(gutter: int): boolean;
  /**
   * Returns `true` if the gutter at the given index is overwritable. See {@link set_gutter_overwritable}.
   */
  is_gutter_overwritable(gutter: int): boolean;
  /**
   * Returns `true` if a {@link begin_multicaret_edit} has been called and {@link end_multicaret_edit} has not yet been called.
   */
  is_in_mulitcaret_edit(): boolean;
  /**
   * Returns `true` if the gutter at the given index on the given line is clickable. See {@link set_line_gutter_clickable}.
   */
  is_line_gutter_clickable(line: int, gutter: int): boolean;
  /** Returns if the given line is wrapped. */
  is_line_wrapped(line: int): boolean;
  /**
   * Returns `true` if the menu is visible. Use this instead of `get_menu().visible` to improve performance (so the creation of the menu is avoided). See {@link get_menu}.
   */
  is_menu_visible(): boolean;
  /**
   * Returns `true` if the mouse is over a selection. If `edges` is `true`, the edges are considered part of the selection.
   */
  is_mouse_over_selection(edges: boolean, caret_index?: int): boolean;
  /** Returns `true` if overtype mode is enabled. See {@link set_overtype_mode_enabled}. */
  is_overtype_mode_enabled(): boolean;
  /** Executes a given action as defined in the {@link MenuItems} enum. */
  menu_option(option: int): void;
  /**
   * Merge the gutters from `from_line` into `to_line`. Only overwritable gutters will be copied. See {@link set_gutter_overwritable}.
   */
  merge_gutters(from_line: int, to_line: int): void;
  /**
   * Merges any overlapping carets. Will favor the newest caret, or the caret with a selection.
   * If {@link is_in_mulitcaret_edit} is `true`, the merge will be queued to happen at the end of the multicaret edit. See {@link begin_multicaret_edit} and {@link end_multicaret_edit}.
   * **Note:** This is not called when a caret changes position but after certain actions, so it is possible to get into a state where carets overlap.
   */
  merge_overlapping_carets(): void;
  /**
   * Returns `true` if the given `caret_index` should be ignored as part of a multicaret edit. See {@link begin_multicaret_edit} and {@link end_multicaret_edit}. Carets that should be ignored are ones that were part of removed text and will likely be merged at the end of the edit, or carets that were added during the edit.
   * It is recommended to `continue` within a loop iterating on multiple carets if a caret should be ignored.
   */
  multicaret_edit_ignore_caret(caret_index: int): boolean;
  /** Paste at the current location. Can be overridden with {@link _paste}. */
  paste(caret_index?: int): void;
  /** Pastes the primary clipboard. */
  paste_primary_clipboard(caret_index?: int): void;
  /** Perform redo operation. */
  redo(): void;
  /**
   * Removes the given caret index.
   * **Note:** This can result in adjustment of all other caret indices.
   */
  remove_caret(caret: int): void;
  /** Removes the gutter at the given index. */
  remove_gutter(gutter: int): void;
  /**
   * Removes the line of text at `line`. Carets on this line will attempt to match their previous visual x position.
   * If `move_carets_down` is `true` carets will move to the next line down, otherwise carets will move up.
   */
  remove_line_at(line: int, move_carets_down?: boolean): void;
  /** Removes all additional carets. */
  remove_secondary_carets(): void;
  /** Removes text between the given positions. */
  remove_text(from_line: int, from_column: int, to_line: int, to_column: int): void;
  /**
   * Perform a search inside the text. Search flags can be specified in the {@link SearchFlags} enum.
   * In the returned vector, `x` is the column, `y` is the line. If no results are found, both are equal to `-1`.
   */
  search(text: string | NodePath, flags: int, from_line: int, from_column: int): Vector2i;
  /**
   * Selects text from `origin_line` and `origin_column` to `caret_line` and `caret_column` for the given `caret_index`. This moves the selection origin and the caret. If the positions are the same, the selection will be deselected.
   * If {@link selecting_enabled} is `false`, no selection will occur.
   * **Note:** If supporting multiple carets this will not check for any overlap. See {@link merge_overlapping_carets}.
   */
  select(origin_line: int, origin_column: int, caret_line: int, caret_column: int, caret_index?: int): void;
  /**
   * Select all the text.
   * If {@link selecting_enabled} is `false`, no selection will occur.
   */
  select_all(): void;
  /** Selects the word under the caret. */
  select_word_under_caret(caret_index?: int): void;
  /**
   * Moves the caret to the specified `column` index.
   * If `adjust_viewport` is `true`, the viewport will center at the caret position after the move occurs.
   * **Note:** If supporting multiple carets this will not check for any overlap. See {@link merge_overlapping_carets}.
   */
  set_caret_column(column: int, adjust_viewport?: boolean, caret_index?: int): void;
  /**
   * Moves the caret to the specified `line` index. The caret column will be moved to the same visual position it was at the last time {@link set_caret_column} was called, or clamped to the end of the line.
   * If `adjust_viewport` is `true`, the viewport will center at the caret position after the move occurs.
   * If `can_be_hidden` is `true`, the specified `line` can be hidden.
   * If `wrap_index` is `-1`, the caret column will be clamped to the `line`'s length. If `wrap_index` is greater than `-1`, the column will be moved to attempt to match the visual x position on the line's `wrap_index` to the position from the last time {@link set_caret_column} was called.
   * **Note:** If supporting multiple carets this will not check for any overlap. See {@link merge_overlapping_carets}.
   */
  set_caret_line(line: int, adjust_viewport?: boolean, can_be_hidden?: boolean, wrap_index?: int, caret_index?: int): void;
  /**
   * If `true`, the mouse cursor will change to a pointing hand ({@link Control.CURSOR_POINTING_HAND}) when hovering over the gutter at the given index. See {@link is_gutter_clickable} and {@link set_line_gutter_clickable}.
   */
  set_gutter_clickable(gutter: int, clickable: boolean): void;
  /**
   * Set a custom draw callback for the gutter at the given index. `draw_callback` must take the following arguments: A line index [int], a gutter index [int], and an area {@link Rect2}. This callback only works when the gutter type is {@link GUTTER_TYPE_CUSTOM} (see {@link set_gutter_type}).
   */
  set_gutter_custom_draw(column: int, draw_callback: Callable): void;
  /**
   * If `true`, the gutter at the given index is drawn. The gutter type ({@link set_gutter_type}) determines how it is drawn. See {@link is_gutter_drawn}.
   */
  set_gutter_draw(gutter: int, draw: boolean): void;
  /** Sets the name of the gutter at the given index. */
  set_gutter_name(gutter: int, name: string | NodePath): void;
  /**
   * If `true`, the line data of the gutter at the given index can be overridden when using {@link merge_gutters}. See {@link is_gutter_overwritable}.
   */
  set_gutter_overwritable(gutter: int, overwritable: boolean): void;
  /** Sets the type of gutter at the given index. Gutters can contain icons, text, or custom visuals. */
  set_gutter_type(gutter: int, type_: int): void;
  /** Set the width of the gutter at the given index. */
  set_gutter_width(gutter: int, width: int): void;
  /**
   * Sets the text for a specific `line`.
   * Carets on the line will attempt to keep their visual x position.
   */
  set_line(line: int, new_text: string | NodePath): void;
  /** Positions the `wrap_index` of `line` at the center of the viewport. */
  set_line_as_center_visible(line: int, wrap_index?: int): void;
  /** Positions the `wrap_index` of `line` at the top of the viewport. */
  set_line_as_first_visible(line: int, wrap_index?: int): void;
  /** Positions the `wrap_index` of `line` at the bottom of the viewport. */
  set_line_as_last_visible(line: int, wrap_index?: int): void;
  /**
   * Sets the custom background color of the given line. If transparent, this color is applied on top of the default background color (See ). If set to `Color(0, 0, 0, 0)`, no additional color is applied.
   */
  set_line_background_color(line: int, color: Color): void;
  /**
   * If `clickable` is `true`, makes the `gutter` on the given `line` clickable. This is like {@link set_gutter_clickable}, but for a single line. If {@link is_gutter_clickable} is `true`, this will not have any effect. See {@link is_line_gutter_clickable} and {@link gutter_clicked}.
   */
  set_line_gutter_clickable(line: int, gutter: int, clickable: boolean): void;
  /**
   * Sets the icon for `gutter` on `line` to `icon`. This only works when the gutter type is {@link GUTTER_TYPE_ICON} (see {@link set_gutter_type}).
   */
  set_line_gutter_icon(line: int, gutter: int, icon: Texture2D): void;
  /** Sets the color for `gutter` on `line` to `color`. */
  set_line_gutter_item_color(line: int, gutter: int, color: Color): void;
  /** Sets the metadata for `gutter` on `line` to `metadata`. */
  set_line_gutter_metadata(line: int, gutter: int, metadata: unknown): void;
  /**
   * Sets the text for `gutter` on `line` to `text`. This only works when the gutter type is {@link GUTTER_TYPE_STRING} (see {@link set_gutter_type}).
   */
  set_line_gutter_text(line: int, gutter: int, text: string | NodePath): void;
  /**
   * If `true`, enables overtype mode. In this mode, typing overrides existing text instead of inserting text. The {@link ProjectSettings.input/ui_text_toggle_insert_mode} action toggles overtype mode. See {@link is_overtype_mode_enabled}.
   */
  set_overtype_mode_enabled(enabled: boolean): void;
  /**
   * Sets the search `flags`. This is used with {@link set_search_text} to highlight occurrences of the searched text. Search flags can be specified from the {@link SearchFlags} enum.
   */
  set_search_flags(flags: int): void;
  /** Sets the search text. See {@link set_search_flags}. */
  set_search_text(search_text: string | NodePath): void;
  /** Sets the current selection mode. */
  set_selection_mode(mode: int): void;
  /**
   * Sets the selection origin column to the `column` for the given `caret_index`. If the selection origin is moved to the caret position, the selection will deselect.
   */
  set_selection_origin_column(column: int, caret_index?: int): void;
  /**
   * Sets the selection origin line to the `line` for the given `caret_index`. If the selection origin is moved to the caret position, the selection will deselect.
   * If `can_be_hidden` is `false`, The line will be set to the nearest unhidden line below or above.
   * If `wrap_index` is `-1`, the selection origin column will be clamped to the `line`'s length. If `wrap_index` is greater than `-1`, the column will be moved to attempt to match the visual x position on the line's `wrap_index` to the position from the last time {@link set_selection_origin_column} or {@link select} was called.
   */
  set_selection_origin_line(line: int, can_be_hidden?: boolean, wrap_index?: int, caret_index?: int): void;
  /** Sets the tab size for the {@link TextEdit} to use. */
  set_tab_size(size: int): void;
  /**
   * Provide custom tooltip text. The callback method must take the following args: `hovered_word: String`.
   */
  set_tooltip_request_func(callback: Callable): void;
  /**
   * Moves a selection and a caret for the next occurrence of the current selection. If there is no active selection, moves to the next occurrence of the word under caret.
   */
  skip_selection_for_next_occurrence(): void;
  /**
   * Starts an action, will end the current action if `action` is different.
   * An action will also end after a call to {@link end_action}, after {@link ProjectSettings.gui/timers/text_edit_idle_detect_sec} is triggered or a new undoable step outside the {@link start_action} and {@link end_action} calls.
   */
  start_action(action: int): void;
  /** Swaps the two lines. Carets will be swapped with the lines. */
  swap_lines(from_line: int, to_line: int): void;
  /** Tag the current version as saved. */
  tag_saved_version(): void;
  /** Perform undo operation. */
  undo(): void;

  /** Emitted when any caret changes position. */
  caret_changed: Signal<[]>;
  /** Emitted when a gutter is added. */
  gutter_added: Signal<[]>;
  /** Emitted when a gutter is clicked. */
  gutter_clicked: Signal<[int, int]>;
  /** Emitted when a gutter is removed. */
  gutter_removed: Signal<[]>;
  /**
   * Emitted immediately when the text changes.
   * When text is added `from_line` will be less than `to_line`. On a remove `to_line` will be less than `from_line`.
   */
  lines_edited_from: Signal<[int, int]>;
  /** Emitted when the text changes. */
  text_changed: Signal<[]>;
  /** Emitted when {@link clear} is called or {@link text} is set. */
  text_set: Signal<[]>;

  // enum MenuItems
  /** Cuts (copies and clears) the selected text. */
  static readonly MENU_CUT: int;
  /** Copies the selected text. */
  static readonly MENU_COPY: int;
  /** Pastes the clipboard text over the selected text (or at the cursor's position). */
  static readonly MENU_PASTE: int;
  /** Erases the whole {@link TextEdit} text. */
  static readonly MENU_CLEAR: int;
  /** Selects the whole {@link TextEdit} text. */
  static readonly MENU_SELECT_ALL: int;
  /** Undoes the previous action. */
  static readonly MENU_UNDO: int;
  /** Redoes the previous action. */
  static readonly MENU_REDO: int;
  /** ID of "Text Writing Direction" submenu. */
  static readonly MENU_SUBMENU_TEXT_DIR: int;
  /** Sets text direction to inherited. */
  static readonly MENU_DIR_INHERITED: int;
  /** Sets text direction to automatic. */
  static readonly MENU_DIR_AUTO: int;
  /** Sets text direction to left-to-right. */
  static readonly MENU_DIR_LTR: int;
  /** Sets text direction to right-to-left. */
  static readonly MENU_DIR_RTL: int;
  /** Toggles control character display. */
  static readonly MENU_DISPLAY_UCC: int;
  /** ID of "Insert Control Character" submenu. */
  static readonly MENU_SUBMENU_INSERT_UCC: int;
  /** Inserts left-to-right mark (LRM) character. */
  static readonly MENU_INSERT_LRM: int;
  /** Inserts right-to-left mark (RLM) character. */
  static readonly MENU_INSERT_RLM: int;
  /** Inserts start of left-to-right embedding (LRE) character. */
  static readonly MENU_INSERT_LRE: int;
  /** Inserts start of right-to-left embedding (RLE) character. */
  static readonly MENU_INSERT_RLE: int;
  /** Inserts start of left-to-right override (LRO) character. */
  static readonly MENU_INSERT_LRO: int;
  /** Inserts start of right-to-left override (RLO) character. */
  static readonly MENU_INSERT_RLO: int;
  /** Inserts pop direction formatting (PDF) character. */
  static readonly MENU_INSERT_PDF: int;
  /** Inserts Arabic letter mark (ALM) character. */
  static readonly MENU_INSERT_ALM: int;
  /** Inserts left-to-right isolate (LRI) character. */
  static readonly MENU_INSERT_LRI: int;
  /** Inserts right-to-left isolate (RLI) character. */
  static readonly MENU_INSERT_RLI: int;
  /** Inserts first strong isolate (FSI) character. */
  static readonly MENU_INSERT_FSI: int;
  /** Inserts pop direction isolate (PDI) character. */
  static readonly MENU_INSERT_PDI: int;
  /** Inserts zero width joiner (ZWJ) character. */
  static readonly MENU_INSERT_ZWJ: int;
  /** Inserts zero width non-joiner (ZWNJ) character. */
  static readonly MENU_INSERT_ZWNJ: int;
  /** Inserts word joiner (WJ) character. */
  static readonly MENU_INSERT_WJ: int;
  /** Inserts soft hyphen (SHY) character. */
  static readonly MENU_INSERT_SHY: int;
  /** Opens system emoji and symbol picker. */
  static readonly MENU_EMOJI_AND_SYMBOL: int;
  /** Represents the size of the {@link MenuItems} enum. */
  static readonly MENU_MAX: int;
  // enum EditAction
  /** No current action. */
  static readonly ACTION_NONE: int;
  /** A typing action. */
  static readonly ACTION_TYPING: int;
  /** A backwards delete action. */
  static readonly ACTION_BACKSPACE: int;
  /** A forward delete action. */
  static readonly ACTION_DELETE: int;
  // enum SearchFlags
  /** Match case when searching. */
  static readonly SEARCH_MATCH_CASE: int;
  /** Match whole words when searching. */
  static readonly SEARCH_WHOLE_WORDS: int;
  /** Search from end to beginning. */
  static readonly SEARCH_BACKWARDS: int;
  // enum CaretType
  /** Vertical line caret. */
  static readonly CARET_TYPE_LINE: int;
  /** Block caret. */
  static readonly CARET_TYPE_BLOCK: int;
  // enum SelectionMode
  /** Not selecting. */
  static readonly SELECTION_MODE_NONE: int;
  /** Select as if `shift` is pressed. */
  static readonly SELECTION_MODE_SHIFT: int;
  /** Select single characters as if the user single clicked. */
  static readonly SELECTION_MODE_POINTER: int;
  /** Select whole words as if the user double clicked. */
  static readonly SELECTION_MODE_WORD: int;
  /** Select whole lines as if the user triple clicked. */
  static readonly SELECTION_MODE_LINE: int;
  // enum LineWrappingMode
  /** Line wrapping is disabled. */
  static readonly LINE_WRAPPING_NONE: int;
  /** Line wrapping occurs at the control boundary, beyond what would normally be visible. */
  static readonly LINE_WRAPPING_BOUNDARY: int;
  // enum GutterType
  /**
   * When a gutter is set to string using {@link set_gutter_type}, it is used to contain text set via the {@link set_line_gutter_text} method.
   */
  static readonly GUTTER_TYPE_STRING: int;
  /**
   * When a gutter is set to icon using {@link set_gutter_type}, it is used to contain an icon set via the {@link set_line_gutter_icon} method.
   */
  static readonly GUTTER_TYPE_ICON: int;
  /**
   * When a gutter is set to custom using {@link set_gutter_type}, it is used to contain custom visuals controlled by a callback method set via the {@link set_gutter_custom_draw} method.
   */
  static readonly GUTTER_TYPE_CUSTOM: int;
}
