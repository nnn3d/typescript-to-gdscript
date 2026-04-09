// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An internal control for a single item inside {@link Tree}. */
declare class TreeItem extends GodotObject {
  /** If `true`, the TreeItem is collapsed. */
  collapsed: boolean;
  /** The custom minimum height. */
  custom_minimum_height: int;
  /** If `true`, folding is disabled for this TreeItem. */
  disable_folding: boolean;
  /**
   * If `true`, the {@link TreeItem} is visible (default).
   * Note that if a {@link TreeItem} is set to not be visible, none of its children will be visible either.
   */
  visible: boolean;
  set_collapsed(value: boolean): void;
  is_collapsed(): boolean;
  set_custom_minimum_height(value: int): void;
  get_custom_minimum_height(): int;
  set_disable_folding(value: boolean): void;
  is_folding_disabled(): boolean;
  set_visible(value: boolean): void;
  is_visible(): boolean;

  /**
   * Adds a button with {@link Texture2D} `button` to the end of the cell at column `column`. The `id` is used to identify the button in the according {@link Tree.button_clicked} signal and can be different from the buttons index. If not specified, the next available index is used, which may be retrieved by calling {@link get_button_count} immediately before this method. Optionally, the button can be `disabled` and have a `tooltip_text`. `description` is used as the button description for assistive apps.
   */
  add_button(column: int, button: Texture2D, id?: int, disabled?: boolean, tooltip_text?: string, description?: string): void;
  /**
   * Adds a previously unparented {@link TreeItem} as a direct child of this one. The `child` item must not be a part of any {@link Tree} or parented to any {@link TreeItem}. See also {@link remove_child}.
   */
  add_child(child: TreeItem): void;
  /**
   * Calls the `method` on the actual TreeItem and its children recursively. Pass parameters as a comma separated list.
   */
  call_recursive(method: string, ...args: any[]): void;
  /** Removes all buttons from all columns of this item. */
  clear_buttons(): void;
  /** Resets the background color for the given column to default. */
  clear_custom_bg_color(column: int): void;
  /** Resets the color for the given column to default. */
  clear_custom_color(column: int): void;
  /**
   * Creates an item and adds it as a child.
   * The new item will be inserted as position `index` (the default value `-1` means the last position), or it will be the last child if `index` is higher than the child count.
   */
  create_child(index?: int): TreeItem;
  /** Deselects the given column. */
  deselect(column: int): void;
  /** Removes the button at index `button_index` in column `column`. */
  erase_button(column: int, button_index: int): void;
  /** Returns the column's auto translate mode. */
  get_auto_translate_mode(column: int): int;
  /**
   * Returns the text autowrap mode in the given `column`. By default it is {@link TextServer.AUTOWRAP_OFF}.
   */
  get_autowrap_mode(column: int): int;
  /**
   * Returns the autowrap trim flags for the given `column`. By default, both {@link TextServer.BREAK_TRIM_START_EDGE_SPACES} and {@link TextServer.BREAK_TRIM_END_EDGE_SPACES} are enabled.
   */
  get_autowrap_trim_flags(column: int): int;
  /** Returns the {@link Texture2D} of the button at index `button_index` in column `column`. */
  get_button(column: int, button_index: int): Texture2D | null;
  /**
   * Returns the button index if there is a button with ID `id` in column `column`, otherwise returns -1.
   */
  get_button_by_id(column: int, id: int): int;
  /**
   * Returns the color of the button with ID `id` in column `column`. If the specified button does not exist, returns {@link Color.BLACK}.
   */
  get_button_color(column: int, id: int): Color;
  /** Returns the number of buttons in column `column`. */
  get_button_count(column: int): int;
  /** Returns the ID for the button at index `button_index` in column `column`. */
  get_button_id(column: int, button_index: int): int;
  /** Returns the tooltip text for the button at index `button_index` in column `column`. */
  get_button_tooltip_text(column: int, button_index: int): string;
  /** Returns the column's cell mode. */
  get_cell_mode(column: int): int;
  /**
   * Returns a child item by its `index` (see {@link get_child_count}). This method is often used for iterating all children of an item.
   * Negative indices access the children from the last one.
   */
  get_child(index: int): TreeItem | null;
  /** Returns the number of child items. */
  get_child_count(): int;
  /** Returns an array of references to the item's children. */
  get_children(): Array<TreeItem>;
  /** Returns the custom background color of column `column`. */
  get_custom_bg_color(column: int): Color;
  /** Returns the custom color of column `column`. */
  get_custom_color(column: int): Color;
  /** Returns the custom callback of column `column`. */
  get_custom_draw_callback(column: int): Callable;
  /** Returns custom font used to draw text in the column `column`. */
  get_custom_font(column: int): Font | null;
  /** Returns custom font size used to draw text in the column `column`. */
  get_custom_font_size(column: int): int;
  /** Returns the given column's custom {@link StyleBox} used to draw the background. */
  get_custom_stylebox(column: int): StyleBox | null;
  /** Returns the given column's description for assistive apps. */
  get_description(column: int): string;
  /** Returns `true` if `expand_right` is set. */
  get_expand_right(column: int): boolean;
  /** Returns the TreeItem's first child. */
  get_first_child(): TreeItem | null;
  /** Returns the given column's icon {@link Texture2D}. Error if no icon is set. */
  get_icon(column: int): Texture2D | null;
  /** Returns the maximum allowed width of the icon in the given `column`. */
  get_icon_max_width(column: int): int;
  /** Returns the {@link Color} modulating the column's icon. */
  get_icon_modulate(column: int): Color;
  /** Returns the given column's icon overlay {@link Texture2D}. */
  get_icon_overlay(column: int): Texture2D | null;
  /** Returns the icon {@link Texture2D} region as {@link Rect2}. */
  get_icon_region(column: int): Rect2;
  /**
   * Returns the node's order in the tree. For example, if called on the first child item the position is `0`.
   */
  get_index(): int;
  /** Returns item's text language code. */
  get_language(column: int): string;
  /** Returns the metadata value that was set for the given column using {@link set_metadata}. */
  get_metadata(column: int): unknown;
  /** Returns the next sibling TreeItem in the tree or a `null` object if there is none. */
  get_next(): TreeItem | null;
  /**
   * Returns the next TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   * If `wrap` is enabled, the method will wrap around to the first element in the tree when called on the last element, otherwise it returns `null`.
   */
  get_next_in_tree(wrap?: boolean): TreeItem | null;
  /**
   * Returns the next visible TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   * If `wrap` is enabled, the method will wrap around to the first visible element in the tree when called on the last visible element, otherwise it returns `null`.
   */
  get_next_visible(wrap?: boolean): TreeItem | null;
  /** Returns the parent TreeItem or a `null` object if there is none. */
  get_parent(): TreeItem | null;
  /** Returns the previous sibling TreeItem in the tree or a `null` object if there is none. */
  get_prev(): TreeItem | null;
  /**
   * Returns the previous TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   * If `wrap` is enabled, the method will wrap around to the last element in the tree when called on the first visible element, otherwise it returns `null`.
   */
  get_prev_in_tree(wrap?: boolean): TreeItem | null;
  /**
   * Returns the previous visible sibling TreeItem in the tree (in the context of a depth-first search) or a `null` object if there is none.
   * If `wrap` is enabled, the method will wrap around to the last visible element in the tree when called on the first visible element, otherwise it returns `null`.
   */
  get_prev_visible(wrap?: boolean): TreeItem | null;
  /** Returns the value of a {@link CELL_MODE_RANGE} column. */
  get_range(column: int): float;
  /**
   * Returns a dictionary containing the range parameters for a given column. The keys are "min", "max", "step", and "expr".
   */
  get_range_config(column: int): Dictionary;
  /** Returns the BiDi algorithm override set for this cell. */
  get_structured_text_bidi_override(column: int): int;
  /** Returns the additional BiDi options set for this cell. */
  get_structured_text_bidi_override_options(column: int): Array<unknown>;
  /** Gets the suffix string shown after the column value. */
  get_suffix(column: int): string;
  /** Returns the given column's text. */
  get_text(column: int): string;
  /** Returns the given column's text alignment. */
  get_text_alignment(column: int): int;
  /** Returns item's text base writing direction. */
  get_text_direction(column: int): int;
  /**
   * Returns the clipping behavior when the text exceeds the item's bounding rectangle in the given `column`. By default it is {@link TextServer.OVERRUN_TRIM_ELLIPSIS}.
   */
  get_text_overrun_behavior(column: int): int;
  /** Returns the given column's tooltip text. */
  get_tooltip_text(column: int): string;
  /** Returns the {@link Tree} that owns this TreeItem. */
  get_tree(): Tree | null;
  /**
   * Returns `true` if this {@link TreeItem}, or any of its descendants, is collapsed.
   * If `only_visible` is `true` it ignores non-visible {@link TreeItem}s.
   */
  is_any_collapsed(only_visible?: boolean): boolean;
  /** Returns `true` if the button at index `button_index` for the given `column` is disabled. */
  is_button_disabled(column: int, button_index: int): boolean;
  /** Returns `true` if the given `column` is checked. */
  is_checked(column: int): boolean;
  /** Returns `true` if the cell was made into a button with {@link set_custom_as_button}. */
  is_custom_set_as_button(column: int): boolean;
  /** Returns `true` if the given `column` is multiline editable. */
  is_edit_multiline(column: int): boolean;
  /** Returns `true` if the given `column` is editable. */
  is_editable(column: int): boolean;
  /** Returns `true` if the given `column` is indeterminate. */
  is_indeterminate(column: int): boolean;
  /** Returns `true` if the given `column` is selectable. */
  is_selectable(column: int): boolean;
  /** Returns `true` if the given `column` is selected. */
  is_selected(column: int): boolean;
  /** Returns `true` if {@link visible} is `true` and all its ancestors are also visible. */
  is_visible_in_tree(): boolean;
  /**
   * Moves this TreeItem right after the given `item`.
   * **Note:** You can't move to the root or move the root.
   */
  move_after(item: TreeItem): void;
  /**
   * Moves this TreeItem right before the given `item`.
   * **Note:** You can't move to the root or move the root.
   */
  move_before(item: TreeItem): void;
  /**
   * Propagates this item's checked status to its children and parents for the given `column`. It is possible to process the items affected by this method call by connecting to {@link Tree.check_propagated_to_item}. The order that the items affected will be processed is as follows: the item invoking this method, children of that item, and finally parents of that item. If `emit_signal` is `false`, then {@link Tree.check_propagated_to_item} will not be emitted.
   */
  propagate_check(column: int, emit_signal?: boolean): void;
  /**
   * Removes the given child {@link TreeItem} and all its children from the {@link Tree}. Note that it doesn't free the item from memory, so it can be reused later (see {@link add_child}). To completely remove a {@link TreeItem} use {@link Object.free}.
   * **Note:** If you want to move a child from one {@link Tree} to another, then instead of removing and adding it manually you can use {@link move_before} or {@link move_after}.
   */
  remove_child(child: TreeItem): void;
  /** Selects the given `column`. */
  select(column: int): void;
  /**
   * Sets the given column's auto translate mode to `mode`.
   * All columns use {@link Node.AUTO_TRANSLATE_MODE_INHERIT} by default, which uses the same auto translate mode as the {@link Tree} itself.
   */
  set_auto_translate_mode(column: int, mode: int): void;
  /**
   * Sets the autowrap mode in the given `column`. If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the cell's bounding rectangle.
   */
  set_autowrap_mode(column: int, autowrap_mode: int): void;
  /**
   * Sets the autowrap trim flags for the given `column`. These flags control whether leading and trailing spaces are trimmed on wrapped lines. Set to `0` to disable all trimming.
   */
  set_autowrap_trim_flags(column: int, flags: int): void;
  /** Sets the given column's button {@link Texture2D} at index `button_index` to `button`. */
  set_button(column: int, button_index: int, button: Texture2D): void;
  /** Sets the given column's button color at index `button_index` to `color`. */
  set_button_color(column: int, button_index: int, color: Color): void;
  /** Sets the given column's button description at index `button_index` for assistive apps. */
  set_button_description(column: int, button_index: int, description: string): void;
  /** If `true`, disables the button at index `button_index` in the given `column`. */
  set_button_disabled(column: int, button_index: int, disabled: boolean): void;
  /** Sets the tooltip text for the button at index `button_index` in the given `column`. */
  set_button_tooltip_text(column: int, button_index: int, tooltip: string): void;
  /** Sets the given column's cell mode to `mode`. This determines how the cell is displayed and edited. */
  set_cell_mode(column: int, mode: int): void;
  /** If `checked` is `true`, the given `column` is checked. Clears column's indeterminate status. */
  set_checked(column: int, checked: boolean): void;
  /** Collapses or uncollapses this {@link TreeItem} and all the descendants of this item. */
  set_collapsed_recursive(enable: boolean): void;
  /** Makes a cell with {@link CELL_MODE_CUSTOM} display as a non-flat button with a {@link StyleBox}. */
  set_custom_as_button(column: int, enable: boolean): void;
  /**
   * Sets the given column's custom background color and whether to just use it as an outline.
   * **Note:** If a custom {@link StyleBox} is set, the background color will be drawn behind it.
   */
  set_custom_bg_color(column: int, color: Color, just_outline?: boolean): void;
  /** Sets the given column's custom color. */
  set_custom_color(column: int, color: Color): void;
  /**
   * Sets the given column's custom draw callback to the `callback` method on `object`.
   * The method named `callback` should accept two arguments: the {@link TreeItem} that is drawn and its position and size as a {@link Rect2}.
   */
  set_custom_draw(column: int, object: GodotObject, callback: string): void;
  /**
   * Sets the given column's custom draw callback. Use an empty {@link Callable} ([code skip-lint]Callable()[/code]) to clear the custom callback. The cell has to be in {@link CELL_MODE_CUSTOM} to use this feature.
   * The `callback` should accept two arguments: the {@link TreeItem} that is drawn and its position and size as a {@link Rect2}.
   */
  set_custom_draw_callback(column: int, callback: Callable): void;
  /** Sets custom font used to draw text in the given `column`. */
  set_custom_font(column: int, font: Font): void;
  /** Sets custom font size used to draw text in the given `column`. */
  set_custom_font_size(column: int, font_size: int): void;
  /**
   * Sets the given column's custom {@link StyleBox} used to draw the background.
   * **Note:** If a custom background color is set, the {@link StyleBox} will be drawn in front of it.
   */
  set_custom_stylebox(column: int, stylebox: StyleBox): void;
  /** Sets the given column's description for assistive apps. */
  set_description(column: int, description: string): void;
  /**
   * If `multiline` is `true`, the given `column` is multiline editable.
   * **Note:** This option only affects the type of control ({@link LineEdit} or {@link TextEdit}) that appears when editing the column. You can set multiline values with {@link set_text} even if the column is not multiline editable.
   */
  set_edit_multiline(column: int, multiline: boolean): void;
  /** If `enabled` is `true`, the given `column` is editable. */
  set_editable(column: int, enabled: boolean): void;
  /** If `enable` is `true`, the given `column` is expanded to the right. */
  set_expand_right(column: int, enable: boolean): void;
  /**
   * Sets the given cell's icon {@link Texture2D}. If the cell is in {@link CELL_MODE_ICON} mode, the icon is displayed in the center of the cell. Otherwise, the icon is displayed before the cell's text. {@link CELL_MODE_RANGE} does not display an icon.
   */
  set_icon(column: int, texture: Texture2D): void;
  /**
   * Sets the maximum allowed width of the icon in the given `column`. This limit is applied on top of the default size of the icon and on top of . The height is adjusted according to the icon's ratio.
   */
  set_icon_max_width(column: int, width: int): void;
  /** Modulates the given column's icon with `modulate`. */
  set_icon_modulate(column: int, modulate: Color): void;
  /**
   * Sets the given cell's icon overlay {@link Texture2D}. The cell has to be in {@link CELL_MODE_ICON} mode, and icon has to be set. Overlay is drawn on top of icon, in the bottom left corner.
   */
  set_icon_overlay(column: int, texture: Texture2D): void;
  /** Sets the given column's icon's texture region. */
  set_icon_region(column: int, region: Rect2): void;
  /**
   * If `indeterminate` is `true`, the given `column` is marked indeterminate.
   * **Note:** If set `true` from `false`, then column is cleared of checked status.
   */
  set_indeterminate(column: int, indeterminate: boolean): void;
  /**
   * Sets the language code of the given `column`'s text to `language`. This is used for line-breaking and text shaping algorithms. If `language` is empty, the current locale is used.
   */
  set_language(column: int, language: string): void;
  /**
   * Sets the metadata value for the given column, which can be retrieved later using {@link get_metadata}. This can be used, for example, to store a reference to the original data.
   */
  set_metadata(column: int, meta: unknown): void;
  /** Sets the value of a {@link CELL_MODE_RANGE} column. */
  set_range(column: int, value: float): void;
  /**
   * Sets the range of accepted values for a column. The column must be in the {@link CELL_MODE_RANGE} mode.
   * If `expr` is `true`, the edit mode slider will use an exponential scale as with {@link Range.exp_edit}.
   */
  set_range_config(column: int, min: float, max: float, step: float, expr?: boolean): void;
  /** If `selectable` is `true`, the given `column` is selectable. */
  set_selectable(column: int, selectable: boolean): void;
  /** Set BiDi algorithm override for the structured text. Has effect for cells that display text. */
  set_structured_text_bidi_override(column: int, parser: int): void;
  /** Set additional options for BiDi override. Has effect for cells that display text. */
  set_structured_text_bidi_override_options(column: int, args: Array<unknown>): void;
  /** Sets a string to be shown after a column's value (for example, a unit abbreviation). */
  set_suffix(column: int, text: string): void;
  /** Sets the given column's text value. */
  set_text(column: int, text: string): void;
  /** Sets the given column's text alignment to `text_alignment`. */
  set_text_alignment(column: int, text_alignment: int): void;
  /** Sets item's text base writing direction. */
  set_text_direction(column: int, direction: int): void;
  /**
   * Sets the clipping behavior when the text exceeds the item's bounding rectangle in the given `column`.
   */
  set_text_overrun_behavior(column: int, overrun_behavior: int): void;
  /** Sets the given column's tooltip text. */
  set_tooltip_text(column: int, tooltip: string): void;
  /**
   * Uncollapses all {@link TreeItem}s necessary to reveal this {@link TreeItem}, i.e. all ancestor {@link TreeItem}s.
   */
  uncollapse_tree(): void;

  // enum TreeCellMode
  /**
   * Cell shows a string label, optionally with an icon. When editable, the text can be edited using a {@link LineEdit}, or a {@link TextEdit} popup if {@link set_edit_multiline} is used.
   */
  static readonly CELL_MODE_STRING: int;
  /**
   * Cell shows a checkbox, optionally with text and an icon. The checkbox can be pressed, released, or indeterminate (via {@link set_indeterminate}). The checkbox can't be clicked unless the cell is editable.
   */
  static readonly CELL_MODE_CHECK: int;
  /**
   * Cell shows a numeric range. When editable, it can be edited using a range slider. Use {@link set_range} to set the value and {@link set_range_config} to configure the range.
   * This cell can also be used in a text dropdown mode when you assign a text with {@link set_text}. Separate options with a comma, e.g. `"Option1,Option2,Option3"`.
   */
  static readonly CELL_MODE_RANGE: int;
  /**
   * Cell shows an icon. It can't be edited nor display text. The icon is always centered within the cell.
   */
  static readonly CELL_MODE_ICON: int;
  /**
   * Cell shows as a clickable button. It will display an arrow similar to {@link OptionButton}, but doesn't feature a dropdown (for that you can use {@link CELL_MODE_RANGE}). Clicking the button emits the {@link Tree.item_edited} signal. The button is flat by default, you can use {@link set_custom_as_button} to display it with a {@link StyleBox}.
   * This mode also supports custom drawing using {@link set_custom_draw_callback}.
   */
  static readonly CELL_MODE_CUSTOM: int;
}
