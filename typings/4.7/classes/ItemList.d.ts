// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A vertical list of selectable items with one or multiple columns. */
declare class ItemList<Tree extends object = any> extends Control<Tree> {
  /** If `true`, the currently selected item can be selected again. */
  allow_reselect: boolean;
  /** If `true`, right mouse button click can select items. */
  allow_rmb_select: boolean;
  /** If `true`, allows navigating the {@link ItemList} with letter keys through incremental search. */
  allow_search: boolean;
  /** If `true`, the control will automatically resize the height to fit its content. */
  auto_height: boolean;
  /** If `true`, the control will automatically resize the width to fit its content. */
  auto_width: boolean;
  /**
   * <member name="fixed_column_width" type="int" setter="set_fixed_column_width" getter="get_fixed_column_width" default="0">
   * The width all columns will be adjusted to.
   * A value of zero disables the adjustment, each item will have a width equal to the width of its content and the columns will have an uneven width.
   */
  clip_contents: boolean;
  /**
   * The size all icons will be adjusted to.
   * If either X or Y component is not greater than zero, icon size won't be affected.
   */
  fixed_icon_size: Vector2i;
  /**
   * <member name="icon_mode" type="int" setter="set_icon_mode" getter="get_icon_mode" enum="ItemList.IconMode" default="1">
   * The icon position, whether above or to the left of the text. See the {@link IconMode} constants.
   */
  focus_mode: int;
  /** The scale of icon applied after {@link fixed_icon_size} and transposing takes effect. */
  icon_scale: float;
  /** The number of items currently in the list. */
  item_count: int;
  /**
   * Maximum columns the list will have.
   * If greater than zero, the content will be split among the specified columns.
   * A value of zero means unlimited columns, i.e. all items will be put in the same row.
   */
  max_columns: int;
  /**
   * Maximum lines of text allowed in each item. Space will be reserved even when there is not enough lines of text to display.
   * **Note:** This property takes effect only when {@link icon_mode} is {@link ICON_MODE_TOP}. To make the text wrap, {@link fixed_column_width} should be greater than zero.
   */
  max_text_lines: int;
  /**
   * Whether all columns will have the same width.
   * If `true`, the width is equal to the largest column width of all columns.
   */
  same_column_width: boolean;
  /**
   * The way which scroll hints (indicators that show that the content can still be scrolled in a certain direction) will be shown.
   */
  scroll_hint_mode: int;
  /** Allows single or multiple item selection. See the {@link SelectMode} constants. */
  select_mode: int;
  /** The clipping behavior when the text exceeds an item's bounding rectangle. */
  text_overrun_behavior: int;
  /**
   * If `true`, the scroll hint texture will be tiled instead of stretched. See {@link scroll_hint_mode}.
   */
  tile_scroll_hint: boolean;
  /**
   * If `true`, the control will automatically move items into a new row to fit its content. See also {@link HFlowContainer} for this behavior.
   * If `false`, the control will add a horizontal scrollbar to make all items visible.
   */
  wraparound_items: boolean;
  set_allow_reselect(value: boolean): void;
  get_allow_reselect(): boolean;
  set_allow_rmb_select(value: boolean): void;
  get_allow_rmb_select(): boolean;
  set_allow_search(value: boolean): void;
  get_allow_search(): boolean;
  set_auto_height(value: boolean): void;
  has_auto_height(): boolean;
  set_auto_width(value: boolean): void;
  has_auto_width(): boolean;
  set_fixed_icon_size(value: Vector2i): void;
  get_fixed_icon_size(): Vector2i;
  set_icon_scale(value: float): void;
  get_icon_scale(): float;
  set_item_count(value: int): void;
  get_item_count(): int;
  set_max_columns(value: int): void;
  get_max_columns(): int;
  set_max_text_lines(value: int): void;
  get_max_text_lines(): int;
  set_same_column_width(value: boolean): void;
  is_same_column_width(): boolean;
  set_scroll_hint_mode(value: int): void;
  get_scroll_hint_mode(): int;
  set_select_mode(value: int): void;
  get_select_mode(): int;
  set_text_overrun_behavior(value: int): void;
  get_text_overrun_behavior(): int;
  set_tile_scroll_hint(value: boolean): void;
  is_scroll_hint_tiled(): boolean;
  set_wraparound_items(value: boolean): void;
  has_wraparound_items(): boolean;

  /** Adds an item to the item list with no text, only an icon. Returns the index of an added item. */
  add_icon_item(icon: Texture2D, selectable?: boolean): int;
  /**
   * Adds an item to the item list with specified text. Returns the index of an added item.
   * Specify an `icon`, or use `null` as the `icon` for a list item with no icon.
   * If `selectable` is `true`, the list item will be selectable.
   */
  add_item(text: string, icon?: Texture2D, selectable?: boolean): int;
  /**
   * Ensures the currently selected item (the first selected item if multiple selection is enabled) is visible, adjusting the scroll position as necessary to place the item at the center of the list if possible. See also {@link ensure_current_is_visible}.
   * Fails and prints an error if both arguments are `false`.
   */
  center_on_current(center_verically?: boolean, center_horizontally?: boolean): void;
  /** Removes all items from the list. */
  clear(): void;
  /** Ensures the item associated with the specified index is not selected. */
  deselect(idx: int): void;
  /** Ensures there are no items selected. */
  deselect_all(): void;
  /**
   * Ensures the currently selected item (the first selected item if multiple selection is enabled) is visible, adjusting the scroll position as necessary. See also {@link center_on_current}.
   */
  ensure_current_is_visible(): void;
  /**
   * Forces an update to the list size based on its items. This happens automatically whenever size of the items, or other relevant settings like {@link auto_height}, change. The method can be used to trigger the update ahead of next drawing pass.
   */
  force_update_list_size(): void;
  /**
   * Returns the horizontal scrollbar.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_h_scroll_bar(): HScrollBar;
  /**
   * Returns the item index at the given `position`.
   * When there is no item at that point, -1 will be returned if `exact` is `true`, and the closest item index will be returned otherwise.
   * **Note:** The returned value is unreliable if called right after modifying the {@link ItemList}, before it redraws in the next frame.
   */
  get_item_at_position(position: Vector2, exact?: boolean): int;
  /** Returns item's auto translate mode. */
  get_item_auto_translate_mode(idx: int): int;
  /** Returns the custom background color of the item specified by `idx` index. */
  get_item_custom_bg_color(idx: int): Color;
  /** Returns the custom foreground color of the item specified by `idx` index. */
  get_item_custom_fg_color(idx: int): Color;
  /** Returns the icon associated with the specified index. */
  get_item_icon(idx: int): Texture2D;
  /** Returns a {@link Color} modulating item's icon at the specified index. */
  get_item_icon_modulate(idx: int): Color;
  /** Returns the region of item's icon used. The whole icon will be used if the region has no area. */
  get_item_icon_region(idx: int): Rect2;
  /** Returns item's text language code. */
  get_item_language(idx: int): string;
  /** Returns the metadata value of the specified index. */
  get_item_metadata(idx: int): unknown;
  /**
   * Returns the position and size of the item with the specified index, in the coordinate system of the {@link ItemList} node. If `expand` is `true` the last column expands to fill the rest of the row.
   * **Note:** The returned value is unreliable if called right after modifying the {@link ItemList}, before it redraws in the next frame.
   */
  get_item_rect(idx: int, expand?: boolean): Rect2;
  /** Returns the text associated with the specified index. */
  get_item_text(idx: int): string;
  /** Returns item's text base writing direction. */
  get_item_text_direction(idx: int): int;
  /** Returns the tooltip hint associated with the specified index. */
  get_item_tooltip(idx: int): string;
  /** Returns an array with the indexes of the selected items. */
  get_selected_items(): PackedInt32Array;
  /**
   * Returns the vertical scrollbar.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_v_scroll_bar(): VScrollBar;
  /** Returns `true` if one or more items are selected. */
  is_anything_selected(): boolean;
  /** Returns `true` if the item at the specified index is disabled. */
  is_item_disabled(idx: int): boolean;
  /** Returns `true` if the item icon will be drawn transposed, i.e. the X and Y axes are swapped. */
  is_item_icon_transposed(idx: int): boolean;
  /** Returns `true` if the item at the specified index is selectable. */
  is_item_selectable(idx: int): boolean;
  /** Returns `true` if the tooltip is enabled for specified item index. */
  is_item_tooltip_enabled(idx: int): boolean;
  /** Returns `true` if the item at the specified index is currently selected. */
  is_selected(idx: int): boolean;
  /** Moves item from index `from_idx` to `to_idx`. */
  move_item(from_idx: int, to_idx: int): void;
  /** Removes the item specified by `idx` index from the list. */
  remove_item(idx: int): void;
  /**
   * Selects the item at the specified index.
   * **Note:** This method does not trigger the item selection signal.
   */
  select(idx: int, single?: boolean): void;
  /**
   * Sets the auto translate mode of the item associated with the specified index.
   * Items use {@link Node.AUTO_TRANSLATE_MODE_INHERIT} by default, which uses the same auto translate mode as the {@link ItemList} itself.
   */
  set_item_auto_translate_mode(idx: int, mode: int): void;
  /** Sets the background color of the item specified by `idx` index to the specified {@link Color}. */
  set_item_custom_bg_color(idx: int, custom_bg_color: Color): void;
  /** Sets the foreground color of the item specified by `idx` index to the specified {@link Color}. */
  set_item_custom_fg_color(idx: int, custom_fg_color: Color): void;
  /**
   * Disables (or enables) the item at the specified index.
   * Disabled items cannot be selected and do not trigger activation signals (when double-clicking or pressing `Enter`).
   */
  set_item_disabled(idx: int, disabled: boolean): void;
  /** Sets (or replaces) the icon's {@link Texture2D} associated with the specified index. */
  set_item_icon(idx: int, icon: Texture2D): void;
  /** Sets a modulating {@link Color} of the item associated with the specified index. */
  set_item_icon_modulate(idx: int, modulate: Color): void;
  /** Sets the region of item's icon used. The whole icon will be used if the region has no area. */
  set_item_icon_region(idx: int, rect: Rect2): void;
  /** Sets whether the item icon will be drawn transposed. */
  set_item_icon_transposed(idx: int, transposed: boolean): void;
  /**
   * Sets the language code of the text for the item at the given index to `language`. This is used for line-breaking and text shaping algorithms. If `language` is empty, the current locale is used.
   */
  set_item_language(idx: int, language: string): void;
  /** Sets a value (of any type) to be stored with the item associated with the specified index. */
  set_item_metadata(idx: int, metadata: unknown): void;
  /** Allows or disallows selection of the item associated with the specified index. */
  set_item_selectable(idx: int, selectable: boolean): void;
  /** Sets text of the item associated with the specified index. */
  set_item_text(idx: int, text: string): void;
  /** Sets item's text base writing direction. */
  set_item_text_direction(idx: int, direction: int): void;
  /** Sets the tooltip hint for the item associated with the specified index. */
  set_item_tooltip(idx: int, tooltip: string): void;
  /** Sets whether the tooltip hint is enabled for specified item index. */
  set_item_tooltip_enabled(idx: int, enable: boolean): void;
  /** Sorts items in the list by their text. */
  sort_items_by_text(): void;

  /**
   * Emitted when any mouse click is issued within the rect of the list but on empty space.
   * `at_position` is the click position in this control's local coordinate system.
   */
  empty_clicked: Signal<[Vector2, int]>;
  /** Emitted when specified list item is activated via double-clicking or by pressing `Enter`. */
  item_activated: Signal<[int]>;
  /**
   * Emitted when specified list item has been clicked with any mouse button.
   * `at_position` is the click position in this control's local coordinate system.
   */
  item_clicked: Signal<[int, Vector2, int]>;
  /**
   * Emitted when specified item has been selected. Only applicable in single selection mode.
   * {@link allow_reselect} must be enabled to reselect an item.
   */
  item_selected: Signal<[int]>;
  /** Emitted when a multiple selection is altered on a list allowing multiple selection. */
  multi_selected: Signal<[int, boolean]>;

  // enum IconMode
  /** Icon is drawn above the text. */
  static readonly ICON_MODE_TOP: int;
  /** Icon is drawn to the left of the text. */
  static readonly ICON_MODE_LEFT: int;
  // enum SelectMode
  /** Only allow selecting a single item. */
  static readonly SELECT_SINGLE: int;
  /** Allows selecting multiple items by holding `Ctrl` or `Shift`. */
  static readonly SELECT_MULTI: int;
  /** Allows selecting multiple items by toggling them on and off. */
  static readonly SELECT_TOGGLE: int;
  // enum ScrollHintMode
  /** Scroll hints will never be shown. */
  static readonly SCROLL_HINT_MODE_DISABLED: int;
  /** Scroll hints will be shown at the top and bottom. */
  static readonly SCROLL_HINT_MODE_BOTH: int;
  /** Only the top scroll hint will be shown. */
  static readonly SCROLL_HINT_MODE_TOP: int;
  /** Only the bottom scroll hint will be shown. */
  static readonly SCROLL_HINT_MODE_BOTTOM: int;
}
