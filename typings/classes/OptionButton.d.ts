// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A button that brings up a dropdown with selectable options when pressed. */
declare class OptionButton extends Button {
  /**
   * <member name="alignment" type="int" setter="set_text_alignment" getter="get_text_alignment" overrides="Button" enum="HorizontalAlignment" default="0" />
   * <member name="allow_reselect" type="bool" setter="set_allow_reselect" getter="get_allow_reselect" default="false">
   * If `true`, the currently selected item can be selected again.
   */
  action_mode: int;
  /** Enables the {@link PopupMenu} search bar if the item count is greater than `0`. */
  enable_search_bar_on_item_count: int;
  /**
   * If `true`, minimum size will be determined by the longest item's text, instead of the currently selected one's.
   * **Note:** For performance reasons, the minimum size doesn't update immediately when adding, removing or modifying items.
   */
  fit_to_longest_item: boolean;
  /** The number of items to select from. */
  item_count: int;
  /** The index of the currently selected item, or `-1` if no item is selected. */
  selected: int;
  toggle_mode: boolean;
  set_search_bar_enabled_on_item_count(value: int): void;
  get_search_bar_enabled_on_item_count(): int;
  set_fit_to_longest_item(value: boolean): void;
  is_fit_to_longest_item(): boolean;
  set_item_count(value: int): void;
  get_item_count(): int;
  _select_int(value: int): void;
  get_selected(): int;

  /**
   * Adds an item, with a `texture` icon, text `label` and (optionally) `id`. If no `id` is passed, the item index will be used as the item's ID. New items are appended at the end.
   * **Note:** The item will be selected if there are no other items.
   */
  add_icon_item(texture: Texture2D, label: string | NodePath, id?: int): void;
  /**
   * Adds an item, with text `label` and (optionally) `id`. If no `id` is passed, the item index will be used as the item's ID. New items are appended at the end.
   * **Note:** The item will be selected if there are no other items.
   */
  add_item(label: string | NodePath, id?: int): void;
  /**
   * Adds a separator to the list of items. Separators help to group items, and can optionally be given a `text` header. A separator also gets an index assigned, and is appended at the end of the item list.
   */
  add_separator(text?: string | NodePath): void;
  /** Clears all the items in the {@link OptionButton}. */
  clear(): void;
  /** Returns the auto translate mode of the item at index `idx`. */
  get_item_auto_translate_mode(idx: int): int;
  /** Returns the icon of the item at index `idx`. */
  get_item_icon(idx: int): Texture2D | null;
  /** Returns the ID of the item at index `idx`. */
  get_item_id(idx: int): int;
  /** Returns the index of the item with the given `id`. */
  get_item_index(id: int): int;
  /**
   * Retrieves the metadata of an item. Metadata may be any type and can be used to store extra information about an item, such as an external string ID.
   */
  get_item_metadata(idx: int): unknown;
  /** Returns the text of the item at index `idx`. */
  get_item_text(idx: int): string;
  /** Returns the tooltip of the item at index `idx`. */
  get_item_tooltip(idx: int): string;
  /**
   * Returns the {@link PopupMenu} contained in this button.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_popup(): PopupMenu;
  /**
   * Returns the index of the first item which is not disabled, or marked as a separator. If `from_last` is `true`, the items will be searched in reverse order.
   * Returns `-1` if no item is found.
   */
  get_selectable_item(from_last?: boolean): int;
  /** Returns the ID of the selected item, or `-1` if no item is selected. */
  get_selected_id(): int;
  /**
   * Gets the metadata of the selected item. Metadata for items can be set using {@link set_item_metadata}.
   */
  get_selected_metadata(): unknown;
  /**
   * Returns `true` if this button contains at least one item which is not disabled, or marked as a separator.
   */
  has_selectable_items(): boolean;
  /** Returns `true` if the item at index `idx` is disabled. */
  is_item_disabled(idx: int): boolean;
  /** Returns `true` if the item at index `idx` is marked as a separator. */
  is_item_separator(idx: int): boolean;
  /** Returns `true` if the search bar is enabled. */
  is_search_bar_enabled(): boolean;
  /** Removes the item at index `idx`. */
  remove_item(idx: int): void;
  /**
   * Selects an item by index and makes it the current item. This will work even if the item is disabled.
   * Passing `-1` as the index deselects any currently selected item.
   */
  select(idx: int): void;
  /** If `true`, shortcuts are disabled and cannot be used to trigger the button. */
  set_disable_shortcuts(disabled: boolean): void;
  /**
   * Sets the auto translate mode of the item at index `idx`.
   * Items use {@link Node.AUTO_TRANSLATE_MODE_INHERIT} by default, which uses the same auto translate mode as the {@link OptionButton} itself.
   */
  set_item_auto_translate_mode(idx: int, mode: int): void;
  /**
   * Sets whether the item at index `idx` is disabled.
   * Disabled items are drawn differently in the dropdown and are not selectable by the user. If the current selected item is set as disabled, it will remain selected.
   */
  set_item_disabled(idx: int, disabled: boolean): void;
  /** Sets the icon of the item at index `idx`. */
  set_item_icon(idx: int, texture: Texture2D): void;
  /** Sets the ID of the item at index `idx`. */
  set_item_id(idx: int, id: int): void;
  /**
   * Sets the metadata of an item. Metadata may be of any type and can be used to store extra information about an item, such as an external string ID.
   */
  set_item_metadata(idx: int, metadata: unknown): void;
  /** Sets the text of the item at index `idx`. */
  set_item_text(idx: int, text: string | NodePath): void;
  /** Sets the tooltip of the item at index `idx`. */
  set_item_tooltip(idx: int, tooltip: string | NodePath): void;
  /**
   * Adjusts popup position and sizing for the {@link OptionButton}, then shows the {@link PopupMenu}. Prefer this over using `get_popup().popup()`.
   */
  show_popup(): void;

  /**
   * Emitted when the user navigates to an item using the {@link ProjectSettings.input/ui_up} or {@link ProjectSettings.input/ui_down} input actions. The index of the item selected is passed as argument.
   */
  item_focused: Signal<[int]>;
  /**
   * Emitted when the current item has been changed by the user. The index of the item selected is passed as argument.
   * {@link allow_reselect} must be enabled to reselect an item.
   */
  item_selected: Signal<[int]>;
}
