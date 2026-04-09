// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A control for displaying text that can contain different font styles, images, and basic formatting. */
declare class RichTextLabel extends Control {
  /**
   * If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the node's bounding rectangle.
   */
  autowrap_mode: int;
  /**
   * Autowrap space trimming flags. See {@link TextServer.BREAK_TRIM_START_EDGE_SPACES} and {@link TextServer.BREAK_TRIM_END_EDGE_SPACES} for more info.
   */
  autowrap_trim_flags: int;
  /**
   * If `true`, the label uses BBCode formatting.
   * **Note:** This only affects the contents of {@link text}, not the tag stack.
   */
  bbcode_enabled: boolean;
  /**
   * <member name="context_menu_enabled" type="bool" setter="set_context_menu_enabled" getter="is_context_menu_enabled" default="false">
   * If `true`, a right-click displays the context menu.
   */
  clip_contents: boolean;
  /**
   * The currently installed custom effects. This is an array of {@link RichTextEffect}s.
   * To add a custom effect, it's more convenient to use {@link install_effect}.
   */
  custom_effects: Array<unknown>;
  /** If `true`, the selected text will be deselected when focus is lost. */
  deselect_on_focus_loss_enabled: boolean;
  /** If `true`, allow drag and drop of selected text. */
  drag_and_drop_selection_enabled: boolean;
  /**
   * If `true`, the label's minimum size will be automatically updated to fit its content, matching the behavior of {@link Label}.
   */
  fit_content: boolean;
  /**
   * <member name="hint_underlined" type="bool" setter="set_hint_underline" getter="is_hint_underlined" default="true">
   * If `true`, the label underlines hint tags such as [code skip-lint][hint=description]{text}[/hint][/code].
   */
  focus_mode: int;
  /**
   * Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify).
   */
  horizontal_alignment: int;
  /** Line fill alignment rules. */
  justification_flags: int;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /**
   * If `true`, the label underlines meta tags such as [code skip-lint][url]{text}[/url][/code]. These tags can call a function when clicked if {@link meta_clicked} is connected to a function.
   */
  meta_underlined: boolean;
  /**
   * The delay after which the loading progress bar is displayed, in milliseconds. Set to `-1` to disable progress bar entirely.
   * **Note:** Progress bar is displayed only if {@link threaded} is enabled.
   */
  progress_bar_delay: int;
  /**
   * If `true`, the scrollbar is visible. Setting this to `false` does not block scrolling completely. See {@link scroll_to_line}.
   */
  scroll_active: boolean;
  /** If `true`, the window scrolls down to display new content automatically. */
  scroll_following: boolean;
  /**
   * If `true`, the window scrolls to display the last visible line when {@link visible_characters} or {@link visible_ratio} is changed.
   */
  scroll_following_visible_characters: boolean;
  /** If `true`, the label allows text selection. */
  selection_enabled: boolean;
  /** If `true`, shortcut keys for context menu items are enabled, even if the context menu is disabled. */
  shortcut_keys_enabled: boolean;
  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /**
   * The number of spaces associated with a single tab length. Does not affect `\t` in text tags, only indent tags.
   */
  tab_size: int;
  /** Aligns text to the given tab-stops. */
  tab_stops: PackedFloat32Array;
  /**
   * The label's text in BBCode format. Is not representative of manual modifications to the internal tag stack. Erases changes made by other methods when edited.
   * **Note:** If {@link bbcode_enabled} is `true`, it is unadvised to use the `+=` operator with {@link text} (e.g. `text += "some string"`) as it replaces the whole text and can cause slowdowns. It will also erase all BBCode that was added to stack using `push_*` methods. Use {@link append_text} for adding text instead, unless you absolutely need to close a tag that was opened in an earlier method call.
   */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** If `true`, text processing is done in a background thread. */
  threaded: boolean;
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
  set_use_bbcode(value: boolean): void;
  is_using_bbcode(): boolean;
  set_effects(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_effects(): Array<unknown>;
  set_deselect_on_focus_loss_enabled(value: boolean): void;
  is_deselect_on_focus_loss_enabled(): boolean;
  set_drag_and_drop_selection_enabled(value: boolean): void;
  is_drag_and_drop_selection_enabled(): boolean;
  set_fit_content(value: boolean): void;
  is_fit_content_enabled(): boolean;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_justification_flags(value: int): void;
  get_justification_flags(): int;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_meta_underline(value: boolean): void;
  is_meta_underlined(): boolean;
  set_progress_bar_delay(value: int): void;
  get_progress_bar_delay(): int;
  set_scroll_active(value: boolean): void;
  is_scroll_active(): boolean;
  set_scroll_follow(value: boolean): void;
  is_scroll_following(): boolean;
  set_scroll_follow_visible_characters(value: boolean): void;
  is_scroll_following_visible_characters(): boolean;
  set_selection_enabled(value: boolean): void;
  is_selection_enabled(): boolean;
  set_shortcut_keys_enabled(value: boolean): void;
  is_shortcut_keys_enabled(): boolean;
  set_structured_text_bidi_override(value: int): void;
  get_structured_text_bidi_override(): int;
  set_structured_text_bidi_override_options(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_tab_size(value: int): void;
  get_tab_size(): int;
  set_tab_stops(value: PackedFloat32Array | Array<unknown>): void;
  get_tab_stops(): PackedFloat32Array;
  set_text(value: string | NodePath): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_threaded(value: boolean): void;
  is_threaded(): boolean;
  set_vertical_alignment(value: int): void;
  get_vertical_alignment(): int;
  set_visible_characters(value: int): void;
  get_visible_characters(): int;
  set_visible_characters_behavior(value: int): void;
  get_visible_characters_behavior(): int;
  set_visible_ratio(value: float): void;
  get_visible_ratio(): float;

  /**
   * Adds a horizontal rule that can be used to separate content.
   * If `width_in_percent` is set, `width` values are percentages of the control width instead of pixels.
   * If `height_in_percent` is set, `height` values are percentages of the control width instead of pixels.
   */
  add_hr(width?: int, height?: int, color?: Color, alignment?: int, width_in_percent?: boolean, height_in_percent?: boolean): void;
  /**
   * Adds an image's opening and closing tags to the tag stack, optionally providing a `width` and `height` to resize the image, a `color` to tint the image and a `region` to only use parts of the image.
   * If `width` or `height` is set to 0, the image size will be adjusted in order to keep the original aspect ratio.
   * If `width` and `height` are not set, but `region` is, the region's rect will be used.
   * `key` is an optional identifier, that can be used to modify the image via {@link update_image}.
   * If `pad` is set, and the image is smaller than the size specified by `width` and `height`, the image padding is added to match the size instead of upscaling.
   * If `width_in_percent` is set, `width` values are percentages of the control width instead of pixels.
   * If `height_in_percent` is set, `height` values are percentages of the control width instead of pixels.
   * `alt_text` is used as the image description for assistive apps.
   */
  add_image(image: Texture2D, width?: int, height?: int, color?: Color, inline_align?: int, region?: Rect2 | Rect2i, key?: unknown, pad?: boolean, tooltip?: string | NodePath, width_in_percent?: boolean, height_in_percent?: boolean, alt_text?: string | NodePath): void;
  /** Adds raw non-BBCode-parsed text to the tag stack. */
  add_text(text: string | NodePath): void;
  /**
   * Parses `bbcode` and adds tags to the tag stack as needed.
   * **Note:** Using this method, you can't close a tag that was opened in a previous {@link append_text} call. This is done to improve performance, especially when updating large RichTextLabels since rebuilding the whole BBCode every time would be slower. If you absolutely need to close a tag in a future method call, append the {@link text} instead of using {@link append_text}.
   */
  append_text(bbcode: string | NodePath): void;
  /**
   * Clears the tag stack, causing the label to display nothing.
   * **Note:** This method does not affect {@link text}, and its contents will show again if the label is redrawn. However, setting {@link text} to an empty {@link String} also clears the stack.
   */
  clear(): void;
  /** Clears the current selection. */
  deselect(): void;
  /**
   * Returns the line number of the character position provided. Line and character numbers are both zero-indexed.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_character_line(character: int): int;
  /**
   * Returns the paragraph number of the character position provided. Paragraph and character numbers are both zero-indexed.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_character_paragraph(character: int): int;
  /**
   * Returns the height of the content.
   * **Note:** This method always returns the full content size, and is not affected by {@link visible_ratio} and {@link visible_characters}. To get the visible content size, use {@link get_visible_content_rect}.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_content_height(): int;
  /**
   * Returns the width of the content.
   * **Note:** This method always returns the full content size, and is not affected by {@link visible_ratio} and {@link visible_characters}. To get the visible content size, use {@link get_visible_content_rect}.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_content_width(): int;
  /**
   * Returns the total number of lines in the text. Wrapped text is counted as multiple lines.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_line_count(): int;
  /**
   * Returns the height of the line found at the provided index.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether the document is fully loaded.
   */
  get_line_height(line: int): int;
  /**
   * Returns the vertical offset of the line found at the provided index.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_line_offset(line: int): float;
  /**
   * Returns the indexes of the first and last visible characters for the given `line`, as a {@link Vector2i}.
   * **Note:** If {@link visible_characters_behavior} is set to {@link TextServer.VC_CHARS_BEFORE_SHAPING} only visible wrapped lines are counted.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_line_range(line: int): Vector2i;
  /**
   * Returns the width of the line found at the provided index.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether the document is fully loaded.
   */
  get_line_width(line: int): int;
  /**
   * Returns the {@link PopupMenu} of this {@link RichTextLabel}. By default, this menu is displayed when right-clicking on the {@link RichTextLabel}.
   * You can add custom menu items or remove standard ones. Make sure your IDs don't conflict with the standard ones (see {@link MenuItems}). For example:
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_menu(): PopupMenu;
  /**
   * Returns the total number of paragraphs (newlines or `p` tags in the tag stack's text tags). Considers wrapped text as one paragraph.
   */
  get_paragraph_count(): int;
  /**
   * Returns the vertical offset of the paragraph found at the provided index.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_paragraph_offset(paragraph: int): float;
  /** Returns the text without BBCode mark-up. */
  get_parsed_text(): string;
  /** Returns the current selection text. Does not include BBCodes. */
  get_selected_text(): string;
  /**
   * Returns the current selection first character index if a selection is active, `-1` otherwise. Does not include BBCodes.
   */
  get_selection_from(): int;
  /** Returns the current selection vertical line offset if a selection is active, `-1.0` otherwise. */
  get_selection_line_offset(): float;
  /**
   * Returns the current selection last character index if a selection is active, `-1` otherwise. Does not include BBCodes.
   */
  get_selection_to(): int;
  /** Returns the total number of characters from text tags. Does not include BBCodes. */
  get_total_character_count(): int;
  /**
   * Returns the vertical scrollbar.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_v_scroll_bar(): VScrollBar;
  /**
   * Returns the bounding rectangle of the visible content.
   * **Note:** This method returns a correct value only after the label has been drawn.
   */
  get_visible_content_rect(): Rect2i;
  /**
   * Returns the number of visible lines.
   * **Note:** This method returns a correct value only after the label has been drawn.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_visible_line_count(): int;
  /**
   * Returns the number of visible paragraphs. A paragraph is considered visible if at least one of its lines is visible.
   * **Note:** This method returns a correct value only after the label has been drawn.
   * **Note:** If {@link threaded} is enabled, this method returns a value for the loaded part of the document. Use {@link is_finished} or {@link finished} to determine whether document is fully loaded.
   */
  get_visible_paragraph_count(): int;
  /**
   * Installs a custom effect. This can also be done in the Inspector through the {@link custom_effects} property. `effect` should be a valid {@link RichTextEffect}.
   * **Example:** With the following script extending from {@link RichTextEffect}:
   * The above effect can be installed in {@link RichTextLabel} from a script:
   */
  install_effect(effect: unknown): void;
  /** Invalidates `paragraph` and all subsequent paragraphs cache. */
  invalidate_paragraph(paragraph: int): boolean;
  /**
   * If {@link threaded} is enabled, returns `true` if the background thread has finished text processing, otherwise always return `true`.
   */
  is_finished(): boolean;
  /**
   * Returns whether the menu is visible. Use this instead of `get_menu().visible` to improve performance (so the creation of the menu is avoided).
   */
  is_menu_visible(): boolean;
  /**
   * If {@link threaded} is enabled, returns `true` if the background thread has finished text processing, otherwise always return `true`.
   */
  is_ready(): boolean;
  /** Executes a given action as defined in the {@link MenuItems} enum. */
  menu_option(option: int): void;
  /** Adds a newline tag to the tag stack. */
  newline(): void;
  /** The assignment version of {@link append_text}. Clears the tag stack and inserts the new content. */
  parse_bbcode(bbcode: string | NodePath): void;
  /** Parses BBCode parameter `expressions` into a dictionary. */
  parse_expressions_for_values(expressions: PackedStringArray | Array<unknown>): Dictionary;
  /**
   * Terminates the current tag. Use after `push_*` methods to close BBCodes manually. Does not need to follow `add_*` methods.
   */
  pop(): void;
  /** Terminates all tags opened by `push_*` methods. */
  pop_all(): void;
  /**
   * Terminates tags opened after the last {@link push_context} call (including context marker), or all tags if there's no context marker on the stack.
   */
  pop_context(): void;
  /**
   * Adds a [code skip-lint][bgcolor][/code] tag to the tag stack.
   * **Note:** The background color has padding applied by default, which is controlled using  and . This can lead to overlapping highlights if background colors are placed on neighboring lines/columns, so consider setting those theme items to `0` if you want to avoid this.
   */
  push_bgcolor(bgcolor: Color): void;
  /**
   * Adds a [code skip-lint][font][/code] tag with a bold font to the tag stack. This is the same as adding a [code skip-lint][b][/code] tag if not currently in a [code skip-lint][i][/code] tag.
   */
  push_bold(): void;
  /** Adds a [code skip-lint][font][/code] tag with a bold italics font to the tag stack. */
  push_bold_italics(): void;
  /**
   * Adds a [code skip-lint][cell][/code] tag to the tag stack. Must be inside a [code skip-lint][table][/code] tag. See {@link push_table} for details. Use {@link set_table_column_expand} to set column expansion ratio, {@link set_cell_border_color} to set cell border, {@link set_cell_row_background_color} to set cell background, {@link set_cell_size_override} to override cell size, and {@link set_cell_padding} to set padding.
   */
  push_cell(): void;
  /** Adds a [code skip-lint][color][/code] tag to the tag stack. */
  push_color(color: Color): void;
  /** Adds a context marker to the tag stack. See {@link pop_context}. */
  push_context(): void;
  /**
   * Adds a custom effect tag to the tag stack. The effect does not need to be in {@link custom_effects}. The environment is directly passed to the effect.
   */
  push_customfx(effect: RichTextEffect, env: Dictionary): void;
  /**
   * Adds a [code skip-lint][dropcap][/code] tag to the tag stack. Drop cap (dropped capital) is a decorative element at the beginning of a paragraph that is larger than the rest of the text.
   */
  push_dropcap(string: string | NodePath, font: Font, size: int, dropcap_margins?: Rect2 | Rect2i, color?: Color, outline_size?: int, outline_color?: Color): void;
  /**
   * Adds a [code skip-lint][fgcolor][/code] tag to the tag stack.
   * **Note:** The foreground color has padding applied by default, which is controlled using  and . This can lead to overlapping highlights if foreground colors are placed on neighboring lines/columns, so consider setting those theme items to `0` if you want to avoid this.
   */
  push_fgcolor(fgcolor: Color): void;
  /**
   * Adds a [code skip-lint][font][/code] tag to the tag stack. Overrides default fonts for its duration.
   * Passing `0` to `font_size` will use the existing default font size.
   */
  push_font(font: Font, font_size?: int): void;
  /**
   * Adds a [code skip-lint][font_size][/code] tag to the tag stack. Overrides default font size for its duration.
   */
  push_font_size(font_size: int): void;
  /**
   * Adds a [code skip-lint][hint][/code] tag to the tag stack. Same as BBCode [code skip-lint][hint=something]{text}[/hint][/code].
   */
  push_hint(description: string | NodePath): void;
  /**
   * Adds an [code skip-lint][indent][/code] tag to the tag stack. Multiplies `level` by current {@link tab_size} to determine new margin length.
   */
  push_indent(level: int): void;
  /**
   * Adds a [code skip-lint][font][/code] tag with an italics font to the tag stack. This is the same as adding an [code skip-lint][i][/code] tag if not currently in a [code skip-lint][b][/code] tag.
   */
  push_italics(): void;
  /** Adds language code used for text shaping algorithm and Open-Type font features. */
  push_language(language: string | NodePath): void;
  /**
   * Adds [code skip-lint][ol][/code] or [code skip-lint][ul][/code] tag to the tag stack. Multiplies `level` by current {@link tab_size} to determine new margin length.
   */
  push_list(level: int, type_: int, capitalize: boolean, bullet?: string | NodePath): void;
  /**
   * Adds a meta tag to the tag stack. Similar to the BBCode [code skip-lint]{text} (something)[/code], but supports non-{@link String} metadata types.
   * If {@link meta_underlined} is `true`, meta tags display an underline. This behavior can be customized with `underline_mode`.
   * **Note:** Meta tags do nothing by default when clicked. To assign behavior when clicked, connect {@link meta_clicked} to a function that is called when the meta tag is clicked.
   */
  push_meta(data: unknown, underline_mode: int, tooltip?: string | NodePath): void;
  /** Adds a [code skip-lint][font][/code] tag with a monospace font to the tag stack. */
  push_mono(): void;
  /** Adds a [code skip-lint][font][/code] tag with a normal font to the tag stack. */
  push_normal(): void;
  /**
   * Adds a [code skip-lint][outline_color][/code] tag to the tag stack. Adds text outline for its duration.
   */
  push_outline_color(color: Color): void;
  /**
   * Adds a [code skip-lint][outline_size][/code] tag to the tag stack. Overrides default text outline size for its duration.
   */
  push_outline_size(outline_size: int): void;
  /** Adds a [code skip-lint][p][/code] tag to the tag stack. */
  push_paragraph(alignment: int, base_direction: int, language?: string | NodePath, st_parser?: int, justification_flags?: int, tab_stops?: PackedFloat32Array | Array<unknown>): void;
  /**
   * Adds a [code skip-lint][s][/code] tag to the tag stack. If `color`'s alpha value is `0.0`, the current font's color with its alpha multiplied by  is used.
   */
  push_strikethrough(color?: Color): void;
  /**
   * Adds a [code skip-lint][table=columns,inline_align][/code] tag to the tag stack. Use {@link set_table_column_expand} to set column expansion ratio. Use {@link push_cell} to add cells. `name` is used as the table name for assistive apps.
   */
  push_table(columns: int, inline_align: int, align_to_row?: int, name?: string | NodePath): void;
  /**
   * Adds a [code skip-lint][u][/code] tag to the tag stack. If `color`'s alpha value is `0.0`, the current font's color with its alpha multiplied by  is used.
   */
  push_underline(color?: Color): void;
  /** Reloads custom effects. Useful when {@link custom_effects} is modified manually. */
  reload_effects(): void;
  /**
   * Removes a paragraph of content from the label. Returns `true` if the paragraph exists.
   * The `paragraph` argument is the index of the paragraph to remove, it can take values in the interval `[0, get_paragraph_count() - 1]`.
   * If `no_invalidate` is set to `true`, cache for the subsequent paragraphs is not invalidated. Use it for faster updates if deleted paragraph is fully self-contained (have no unclosed tags), or this call is part of the complex edit operation and {@link invalidate_paragraph} will be called at the end of operation.
   */
  remove_paragraph(paragraph: int, no_invalidate?: boolean): boolean;
  /** Scrolls the window's top line to match `line`. */
  scroll_to_line(line: int): void;
  /** Scrolls the window's top line to match first line of the `paragraph`. */
  scroll_to_paragraph(paragraph: int): void;
  /** Scrolls to the beginning of the current selection. */
  scroll_to_selection(): void;
  /**
   * Select all the text.
   * If {@link selection_enabled} is `false`, no selection will occur.
   */
  select_all(): void;
  /** Sets color of a table cell border. */
  set_cell_border_color(color: Color): void;
  /** Sets inner padding of a table cell. */
  set_cell_padding(padding: Rect2 | Rect2i): void;
  /** Sets color of a table cell. Separate colors for alternating rows can be specified. */
  set_cell_row_background_color(odd_row_bg: Color, even_row_bg: Color): void;
  /** Sets minimum and maximum size overrides for a table cell. */
  set_cell_size_override(min_size: Vector2 | Vector2i, max_size: Vector2 | Vector2i): void;
  /**
   * Edits the selected column's expansion options. If `expand` is `true`, the column expands in proportion to its expansion ratio versus the other columns' ratios.
   * For example, 2 columns with ratios 3 and 4 plus 70 pixels in available width would expand 30 and 40 pixels, respectively.
   * If `expand` is `false`, the column will not contribute to the total ratio.
   */
  set_table_column_expand(column: int, expand: boolean, ratio?: int, shrink?: boolean): void;
  /** Sets table column name for assistive apps. */
  set_table_column_name(column: int, name: string | NodePath): void;
  /**
   * Updates the existing images with the key `key`. Only properties specified by `mask` bits are updated. See {@link add_image}.
   */
  update_image(key: unknown, mask: int, image: Texture2D, width?: int, height?: int, color?: Color, inline_align?: int, region?: Rect2 | Rect2i, pad?: boolean, tooltip?: string | NodePath, width_in_percent?: boolean, height_in_percent?: boolean): void;

  /**
   * Triggered when the document is fully loaded.
   * **Note:** This can happen before the text is processed for drawing. Scrolling values may not be valid until the document is drawn for the first time after this signal.
   */
  finished: Signal<[]>;
  /**
   * Triggered when the user clicks on content between meta (URL) tags. If the meta is defined in BBCode, e.g. [code skip-lint]Text ({"key": "value"})[/code], then the parameter for this signal will always be a {@link String} type. If a particular type or an object is desired, the {@link push_meta} method must be used to manually insert the data into the tag stack. Alternatively, you can convert the {@link String} input to the desired type based on its contents (such as calling {@link JSON.parse} on it).
   * For example, the following method can be connected to {@link meta_clicked} to open clicked URLs using the user's default web browser:
   */
  meta_clicked: Signal<[unknown]>;
  /** Triggers when the mouse exits a meta tag. */
  meta_hover_ended: Signal<[unknown]>;
  /** Triggers when the mouse enters a meta tag. */
  meta_hover_started: Signal<[unknown]>;

  // enum ListType
  /** Each list item has a number marker. */
  static readonly LIST_NUMBERS: int;
  /** Each list item has a letter marker. */
  static readonly LIST_LETTERS: int;
  /** Each list item has a roman number marker. */
  static readonly LIST_ROMAN: int;
  /** Each list item has a filled circle marker. */
  static readonly LIST_DOTS: int;
  // enum MenuItems
  /** Copies the selected text. */
  static readonly MENU_COPY: int;
  /** Selects the whole {@link RichTextLabel} text. */
  static readonly MENU_SELECT_ALL: int;
  /** Represents the size of the {@link MenuItems} enum. */
  static readonly MENU_MAX: int;
  // enum MetaUnderline
  /** Meta tag does not display an underline, even if {@link meta_underlined} is `true`. */
  static readonly META_UNDERLINE_NEVER: int;
  /** If {@link meta_underlined} is `true`, meta tag always display an underline. */
  static readonly META_UNDERLINE_ALWAYS: int;
  /**
   * If {@link meta_underlined} is `true`, meta tag display an underline when the mouse cursor is over it.
   */
  static readonly META_UNDERLINE_ON_HOVER: int;
  // enum ImageUpdateMask
  /** If this bit is set, {@link update_image} changes image texture. */
  static readonly UPDATE_TEXTURE: int;
  /** If this bit is set, {@link update_image} changes image size. */
  static readonly UPDATE_SIZE: int;
  /** If this bit is set, {@link update_image} changes image color. */
  static readonly UPDATE_COLOR: int;
  /** If this bit is set, {@link update_image} changes image inline alignment. */
  static readonly UPDATE_ALIGNMENT: int;
  /** If this bit is set, {@link update_image} changes image texture region. */
  static readonly UPDATE_REGION: int;
  /** If this bit is set, {@link update_image} changes image padding. */
  static readonly UPDATE_PAD: int;
  /** If this bit is set, {@link update_image} changes image tooltip. */
  static readonly UPDATE_TOOLTIP: int;
  /** If this bit is set, {@link update_image} changes image width from/to percents. */
  static readonly UPDATE_WIDTH_IN_PERCENT: int;
}
