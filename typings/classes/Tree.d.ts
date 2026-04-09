// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A control used to show a set of internal {@link TreeItem}s in a hierarchical structure. */
declare class Tree extends Control {
  /** If `true`, the currently selected cell may be selected again. */
  allow_reselect: boolean;
  /** If `true`, a right mouse button click can select items. */
  allow_rmb_select: boolean;
  /** If `true`, allows navigating the {@link Tree} with letter keys through incremental search. */
  allow_search: boolean;
  /**
   * If `true`, tree items with no tooltip assigned display their text as their tooltip. See also {@link TreeItem.get_tooltip_text} and {@link TreeItem.get_button_tooltip_text}.
   */
  auto_tooltip: boolean;
  /**
   * <member name="column_titles_visible" type="bool" setter="set_column_titles_visible" getter="are_column_titles_visible" default="false">
   * If `true`, column titles are visible.
   */
  clip_contents: boolean;
  /**
   * The number of columns.
   * Prints an error and does not allow setting the columns during mouse selection.
   */
  columns: int;
  /**
   * The drop mode as an OR combination of flags. See {@link DropModeFlags} constants. Once dropping is done, reverts to {@link DROP_MODE_DISABLED}. Setting this during {@link Control._can_drop_data} is recommended.
   * This controls the drop sections, i.e. the decision and drawing of possible drop locations based on the mouse position.
   */
  drop_mode_flags: int;
  /**
   * If `true`, tree items will unfold when hovered over during a drag-and-drop. The delay for when this happens is dictated by .
   */
  enable_drag_unfolding: boolean;
  /**
   * If `true`, recursive folding is enabled for this {@link Tree}. Holding down `Shift` while clicking the fold arrow or using `ui_right`/`ui_left` shortcuts collapses or uncollapses the {@link TreeItem} and all its descendants.
   */
  enable_recursive_folding: boolean;
  /**
   * <member name="hide_folding" type="bool" setter="set_hide_folding" getter="is_folding_hidden" default="false">
   * If `true`, the folding arrow is hidden.
   */
  focus_mode: int;
  /** If `true`, the tree's root is hidden. */
  hide_root: boolean;
  /**
   * The way which scroll hints (indicators that show that the content can still be scrolled in a certain direction) will be shown.
   */
  scroll_hint_mode: int;
  /** If `true`, enables horizontal scrolling. */
  scroll_horizontal_enabled: boolean;
  /** If `true`, enables vertical scrolling. */
  scroll_vertical_enabled: boolean;
  /** Allows single or multiple selection. See the {@link SelectMode} constants. */
  select_mode: int;
  /**
   * If `true`, the scroll hint texture will be tiled instead of stretched. See {@link scroll_hint_mode}.
   */
  tile_scroll_hint: boolean;
  set_allow_reselect(value: boolean): void;
  get_allow_reselect(): boolean;
  set_allow_rmb_select(value: boolean): void;
  get_allow_rmb_select(): boolean;
  set_allow_search(value: boolean): void;
  get_allow_search(): boolean;
  set_auto_tooltip(value: boolean): void;
  is_auto_tooltip_enabled(): boolean;
  set_columns(value: int): void;
  get_columns(): int;
  set_drop_mode_flags(value: int): void;
  get_drop_mode_flags(): int;
  set_enable_drag_unfolding(value: boolean): void;
  is_drag_unfolding_enabled(): boolean;
  set_enable_recursive_folding(value: boolean): void;
  is_recursive_folding_enabled(): boolean;
  set_hide_root(value: boolean): void;
  is_root_hidden(): boolean;
  set_scroll_hint_mode(value: int): void;
  get_scroll_hint_mode(): int;
  set_h_scroll_enabled(value: boolean): void;
  is_h_scroll_enabled(): boolean;
  set_v_scroll_enabled(value: boolean): void;
  is_v_scroll_enabled(): boolean;
  set_select_mode(value: int): void;
  get_select_mode(): int;
  set_tile_scroll_hint(value: boolean): void;
  is_scroll_hint_tiled(): boolean;

  /**
   * Clears the tree. This removes all items.
   * Prints an error and does not allow clearing the tree if called during mouse selection.
   */
  clear(): void;
  /**
   * Creates an item in the tree and adds it as a child of `parent`, which can be either a valid {@link TreeItem} or `null`.
   * If `parent` is `null`, the root item will be the parent, or the new item will be the root itself if the tree is empty.
   * The new item will be the `index`-th child of parent, or it will be the last child if there are not enough siblings.
   * Prints an error and returns `null` if called during mouse selection, or if the `parent` does not belong to this tree.
   */
  create_item(parent?: TreeItem, index?: int): TreeItem | null;
  /**
   * Deselects all tree items (rows and columns). In {@link SELECT_MULTI} mode also removes selection cursor.
   */
  deselect_all(): void;
  /**
   * Edits the selected tree item as if it was clicked.
   * Either the item must be set editable with {@link TreeItem.set_editable} or `force_edit` must be `true`.
   * Returns `true` if the item could be edited. Fails if no item is selected.
   */
  edit_selected(force_edit?: boolean): boolean;
  /**
   * Makes the currently focused cell visible.
   * This will scroll the tree if necessary. In {@link SELECT_ROW} mode, this will not do horizontal scrolling, as all the cells in the selected row is focused logically.
   * **Note:** Despite the name of this method, the focus cursor itself is only visible in {@link SELECT_MULTI} mode.
   */
  ensure_cursor_is_visible(): void;
  /** Returns the button ID at `position`, or -1 if no button is there. */
  get_button_id_at_position(position: Vector2 | Vector2i): int;
  /** Returns the column index at `position`, or -1 if no item is there. */
  get_column_at_position(position: Vector2 | Vector2i): int;
  /** Returns the expand ratio assigned to the column. */
  get_column_expand_ratio(column: int): int;
  /** Returns the column's title. */
  get_column_title(column: int): string;
  /** Returns the column title alignment. */
  get_column_title_alignment(column: int): int;
  /** Returns column title base writing direction. */
  get_column_title_direction(column: int): int;
  /** Returns column title language code. */
  get_column_title_language(column: int): string;
  /** Returns the column title's tooltip text. */
  get_column_title_tooltip_text(column: int): string;
  /** Returns the column's width in pixels. */
  get_column_width(column: int): int;
  /**
   * Returns the rectangle for custom popups. Helper to create custom cell controls that display a popup. See {@link TreeItem.set_cell_mode}.
   */
  get_custom_popup_rect(): Rect2;
  /**
   * Returns the drop section at `position`, or -100 if no item is there.
   * Values -1, 0, or 1 will be returned for the "above item", "on item", and "below item" drop sections, respectively. See {@link DropModeFlags} for a description of each drop section.
   * To get the item which the returned drop section is relative to, use {@link get_item_at_position}.
   */
  get_drop_section_at_position(position: Vector2 | Vector2i): int;
  /**
   * Returns the currently edited item. Can be used with {@link item_edited} to get the item that was modified.
   */
  get_edited(): TreeItem | null;
  /** Returns the column for the currently edited item. */
  get_edited_column(): int;
  /**
   * Returns the rectangle area for the specified {@link TreeItem}. If `column` is specified, only get the position and size of that column, otherwise get the rectangle containing all columns. If a button index is specified, the rectangle of that button will be returned.
   */
  get_item_area_rect(item: TreeItem, column?: int, button_index?: int): Rect2;
  /** Returns the tree item at the specified position (relative to the tree origin position). */
  get_item_at_position(position: Vector2 | Vector2i): TreeItem | null;
  /**
   * Returns the next selected {@link TreeItem} after the given one, or `null` if the end is reached.
   * If `from` is `null`, this returns the first selected item.
   */
  get_next_selected(from_: TreeItem): TreeItem | null;
  /** Returns the last pressed button's index. */
  get_pressed_button(): int;
  /** Returns the tree's root item, or `null` if the tree is empty. */
  get_root(): TreeItem | null;
  /** Returns the current scrolling position. */
  get_scroll(): Vector2;
  /**
   * Returns the currently focused item, or `null` if no item is focused.
   * In {@link SELECT_ROW} and {@link SELECT_SINGLE} modes, the focused item is same as the selected item. In {@link SELECT_MULTI} mode, the focused item is the item under the focus cursor, not necessarily selected.
   * To get the currently selected item(s), use {@link get_next_selected}.
   */
  get_selected(): TreeItem | null;
  /**
   * Returns the currently focused column, or -1 if no column is focused.
   * In {@link SELECT_SINGLE} mode, the focused column is the selected column. In {@link SELECT_ROW} mode, the focused column is always 0 if any item is selected. In {@link SELECT_MULTI} mode, the focused column is the column under the focus cursor, and there are not necessarily any column selected.
   * To tell whether a column of an item is selected, use {@link TreeItem.is_selected}.
   */
  get_selected_column(): int;
  /** Returns `true` if the column has enabled clipping (see {@link set_column_clip_content}). */
  is_column_clipping_content(column: int): boolean;
  /** Returns `true` if the column has enabled expanding (see {@link set_column_expand}). */
  is_column_expanding(column: int): boolean;
  /** Causes the {@link Tree} to jump to the specified {@link TreeItem}. */
  scroll_to_item(item: TreeItem, center_on_item?: boolean): void;
  /** Allows to enable clipping for column's content, making the content size ignored. */
  set_column_clip_content(column: int, enable: boolean): void;
  /**
   * Overrides the calculated minimum width of a column. It can be set to `0` to restore the default behavior. Columns that have the "Expand" flag will use their "min_width" in a similar fashion to {@link Control.size_flags_stretch_ratio}.
   */
  set_column_custom_minimum_width(column: int, min_width: int): void;
  /**
   * If `true`, the column will have the "Expand" flag of {@link Control}. Columns that have the "Expand" flag will use their expand ratio in a similar fashion to {@link Control.size_flags_stretch_ratio} (see {@link set_column_expand_ratio}).
   */
  set_column_expand(column: int, expand: boolean): void;
  /** Sets the relative expand ratio for a column. See {@link set_column_expand}. */
  set_column_expand_ratio(column: int, ratio: int): void;
  /** Sets the title of a column. */
  set_column_title(column: int, title: string | NodePath): void;
  /**
   * Sets the column title alignment. Note that {@link @GlobalScope.HORIZONTAL_ALIGNMENT_FILL} is not supported for column titles.
   */
  set_column_title_alignment(column: int, title_alignment: int): void;
  /** Sets column title base writing direction. */
  set_column_title_direction(column: int, direction: int): void;
  /**
   * Sets the language code of the given `column`'s title to `language`. This is used for line-breaking and text shaping algorithms. If `language` is empty, the current locale is used.
   */
  set_column_title_language(column: int, language: string | NodePath): void;
  /** Sets the column title's tooltip text. */
  set_column_title_tooltip_text(column: int, tooltip_text: string | NodePath): void;
  /** Selects the specified {@link TreeItem} and column. */
  set_selected(item: TreeItem, column: int): void;

  /** Emitted when a button on the tree was pressed (see {@link TreeItem.add_button}). */
  button_clicked: Signal<[TreeItem, int, int, int]>;
  /** Emitted when a cell is selected. */
  cell_selected: Signal<[]>;
  /**
   * Emitted when {@link TreeItem.propagate_check} is called. Connect to this signal to process the items that are affected when {@link TreeItem.propagate_check} is invoked. The order that the items affected will be processed is as follows: the item that invoked the method, children of that item, and finally parents of that item.
   */
  check_propagated_to_item: Signal<[TreeItem, int]>;
  /**
   * Emitted when a column's title is clicked with either {@link MOUSE_BUTTON_LEFT} or {@link MOUSE_BUTTON_RIGHT}.
   */
  column_title_clicked: Signal<[int, int]>;
  /** Emitted when an item with {@link TreeItem.CELL_MODE_CUSTOM} is clicked with a mouse button. */
  custom_item_clicked: Signal<[int]>;
  /** Emitted when a cell with the {@link TreeItem.CELL_MODE_CUSTOM} is clicked to be edited. */
  custom_popup_edited: Signal<[boolean]>;
  /** Emitted when a mouse button is clicked in the empty space of the tree. */
  empty_clicked: Signal<[Vector2, int]>;
  /**
   * Emitted when an item is double-clicked, or selected with a `ui_accept` input event (e.g. using `Enter` or `Space` on the keyboard).
   */
  item_activated: Signal<[]>;
  /**
   * Emitted when an item is expanded or collapsed by clicking on the folding arrow or through code.
   * **Note:** Despite its name, this signal is also emitted when an item is expanded.
   */
  item_collapsed: Signal<[TreeItem]>;
  /** Emitted when an item is edited. */
  item_edited: Signal<[]>;
  /**
   * Emitted when an item's icon is double-clicked. For a signal that emits when any part of the item is double-clicked, see {@link item_activated}.
   */
  item_icon_double_clicked: Signal<[]>;
  /** Emitted when an item is selected with a mouse button. */
  item_mouse_selected: Signal<[Vector2, int]>;
  /** Emitted when an item is selected. */
  item_selected: Signal<[]>;
  /** Emitted instead of {@link item_selected} if {@link select_mode} is set to {@link SELECT_MULTI}. */
  multi_selected: Signal<[TreeItem, int, boolean]>;
  /** Emitted when a left mouse button click does not select any item. */
  nothing_selected: Signal<[]>;

  // enum SelectMode
  /**
   * Allows selection of a single cell at a time. From the perspective of items, only a single item is allowed to be selected. And there is only one column selected in the selected item.
   * The focus cursor is always hidden in this mode, but it is positioned at the current selection, making the currently selected item the currently focused item.
   */
  static readonly SELECT_SINGLE: int;
  /**
   * Allows selection of a single row at a time. From the perspective of items, only a single items is allowed to be selected. And all the columns are selected in the selected item.
   * The focus cursor is always hidden in this mode, but it is positioned at the first column of the current selection, making the currently selected item the currently focused item.
   */
  static readonly SELECT_ROW: int;
  /**
   * Allows selection of multiple cells at the same time. From the perspective of items, multiple items are allowed to be selected. And there can be multiple columns selected in each selected item.
   * The focus cursor is visible in this mode, the item or column under the cursor is not necessarily selected.
   */
  static readonly SELECT_MULTI: int;
  // enum DropModeFlags
  /**
   * Disables all drop sections, but still allows to detect the "on item" drop section by {@link get_drop_section_at_position}.
   * **Note:** This is the default flag, it has no effect when combined with other flags.
   */
  static readonly DROP_MODE_DISABLED: int;
  /**
   * Enables the "on item" drop section. This drop section covers the entire item.
   * When combined with {@link DROP_MODE_INBETWEEN}, this drop section halves the height and stays centered vertically.
   */
  static readonly DROP_MODE_ON_ITEM: int;
  /**
   * Enables "above item" and "below item" drop sections. The "above item" drop section covers the top half of the item, and the "below item" drop section covers the bottom half.
   * When combined with {@link DROP_MODE_ON_ITEM}, these drop sections halves the height and stays on top / bottom accordingly.
   */
  static readonly DROP_MODE_INBETWEEN: int;
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
