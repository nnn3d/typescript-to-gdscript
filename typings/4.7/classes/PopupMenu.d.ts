// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A modal window used to display a list of options. */
declare class PopupMenu<Tree extends object = any> extends Popup<Tree> {
  /** If `true`, allows navigating {@link PopupMenu} with letter keys. */
  allow_search: boolean;
  /**
   * <member name="canvas_item_default_texture_repeat" type="int" setter="set_default_canvas_item_texture_repeat" getter="get_default_canvas_item_texture_repeat" overrides="Viewport" enum="Viewport.DefaultCanvasItemTextureRepeat" default="3" />
   * <member name="hide_on_checkable_item_selection" type="bool" setter="set_hide_on_checkable_item_selection" getter="is_hide_on_checkable_item_selection" default="true">
   * If `true`, hides the {@link PopupMenu} when a checkbox or radio button is selected.
   */
  canvas_item_default_texture_filter: int;
  /** If `true`, hides the {@link PopupMenu} when an item is selected. */
  hide_on_item_selection: boolean;
  /** If `true`, hides the {@link PopupMenu} when a state item is selected. */
  hide_on_state_item_selection: boolean;
  /** The number of items currently in the list. */
  item_count: int;
  /**
   * If `true`, {@link MenuBar} will use native menu when supported.
   * **Note:** If {@link PopupMenu} is linked to {@link StatusIndicator}, {@link MenuBar}, or another {@link PopupMenu} item it can use native menu regardless of this property, use {@link is_native_menu} to check it.
   */
  prefer_native_menu: boolean;
  /**
   * Enables the {@link PopupMenu} search bar if the item count is greater than `0`.
   * **Note:** When enabled, {@link allow_search} is ignored.
   */
  search_bar_enabled_on_item_count: int;
  /** If `true`, shrinks {@link PopupMenu} to minimum height when it's shown. */
  shrink_height: boolean;
  /** If `true`, shrinks {@link PopupMenu} to minimum width when it's shown. */
  shrink_width: boolean;
  /**
   * Sets the delay time in seconds for the submenu item to popup on mouse hovering. If the popup menu is added as a child of another (acting as a submenu), it will inherit the delay time of the parent menu item.
   * **Note:** If the mouse is exiting a submenu item with an open submenu and enters a different submenu item, the submenu popup delay time is affected by the direction of the mouse movement toward the open submenu. If the mouse is moving toward the submenu, the open submenu will wait approximately `0.5` seconds before closing, which then allows the hovered submenu item to open. This additional delay allows the mouse time to move to the open submenu across other menu items without prematurely closing. If the mouse is not moving toward the open submenu, for example in a downward direction, the open submenu will close immediately.
   */
  submenu_popup_delay: float;
  /**
   * If set to one of the values of {@link NativeMenu.SystemMenus}, this {@link PopupMenu} is bound to the special system menu. Only one {@link PopupMenu} can be bound to each special menu at a time.
   */
  system_menu_id: int;
  transparent: boolean;
  transparent_bg: boolean;
  set_allow_search(value: boolean): void;
  get_allow_search(): boolean;
  set_hide_on_item_selection(value: boolean): void;
  is_hide_on_item_selection(): boolean;
  set_hide_on_state_item_selection(value: boolean): void;
  is_hide_on_state_item_selection(): boolean;
  set_item_count(value: int): void;
  get_item_count(): int;
  set_prefer_native_menu(value: boolean): void;
  is_prefer_native_menu(): boolean;
  set_search_bar_enabled_on_item_count(value: int): void;
  get_search_bar_enabled_on_item_count(): int;
  set_shrink_height(value: boolean): void;
  get_shrink_height(): boolean;
  set_shrink_width(value: boolean): void;
  get_shrink_width(): boolean;
  set_submenu_popup_delay(value: float): void;
  get_submenu_popup_delay(): float;
  set_system_menu(value: int): void;
  get_system_menu(): int;

  /**
   * Checks the provided `event` against the {@link PopupMenu}'s shortcuts and accelerators, and activates the first item with matching events. If `for_global_only` is `true`, only shortcuts and accelerators with `global` set to `true` will be called.
   * Returns `true` if an item was successfully activated.
   * **Note:** Certain {@link Control}s, such as {@link MenuButton}, will call this method automatically.
   */
  activate_item_by_event(event: InputEvent, for_global_only?: boolean): boolean;
  /**
   * Adds a new checkable item with text `label`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_check_item(label: string, id?: int, accel?: int): void;
  /**
   * Adds a new checkable item and assigns the specified {@link Shortcut} to it. Sets the label of the checkbox to the {@link Shortcut}'s name.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_check_shortcut(shortcut: Shortcut, id?: int, global?: boolean): void;
  /**
   * Adds a new checkable item with text `label` and icon `texture`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_icon_check_item(texture: Texture2D, label: string, id?: int, accel?: int): void;
  /**
   * Adds a new checkable item and assigns the specified {@link Shortcut} and icon `texture` to it. Sets the label of the checkbox to the {@link Shortcut}'s name.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_icon_check_shortcut(texture: Texture2D, shortcut: Shortcut, id?: int, global?: boolean): void;
  /**
   * Adds a new item with text `label` and icon `texture`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   */
  add_icon_item(texture: Texture2D, label: string, id?: int, accel?: int): void;
  /** Same as {@link add_icon_check_item}, but uses a radio check button. */
  add_icon_radio_check_item(texture: Texture2D, label: string, id?: int, accel?: int): void;
  /** Same as {@link add_icon_check_shortcut}, but uses a radio check button. */
  add_icon_radio_check_shortcut(texture: Texture2D, shortcut: Shortcut, id?: int, global?: boolean): void;
  /**
   * Adds a new item and assigns the specified {@link Shortcut} and icon `texture` to it. Sets the label of the checkbox to the {@link Shortcut}'s name.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   * If `allow_echo` is `true`, the shortcut can be activated with echo events.
   */
  add_icon_shortcut(texture: Texture2D, shortcut: Shortcut, id?: int, global?: boolean, allow_echo?: boolean): void;
  /**
   * Adds a new item with text `label`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   * **Note:** The provided `id` is used only in {@link id_pressed} and {@link id_focused} signals. It's not related to the `index` arguments in e.g. {@link set_item_checked}.
   */
  add_item(label: string, id?: int, accel?: int): void;
  /**
   * Adds a new multistate item with text `label`.
   * Contrarily to normal binary items, multistate items can have more than two states, as defined by `max_states`. The default value is defined by `default_state`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   * **Note:** Multistate items don't update their state automatically and must be done manually. See {@link toggle_item_multistate}, {@link set_item_multistate} and {@link get_item_multistate} for more info on how to control it.
   */
  add_multistate_item(label: string, max_states: int, default_state?: int, id?: int, accel?: int): void;
  /**
   * Adds a new radio check button with text `label`.
   * An `id` can optionally be provided, as well as an accelerator (`accel`). If no `id` is provided, one will be created from the index. If no `accel` is provided, then the default value of 0 (corresponding to {@link @GlobalScope.KEY_NONE}) will be assigned to the item (which means it won't have any accelerator). See {@link get_item_accelerator} for more info on accelerators.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_radio_check_item(label: string, id?: int, accel?: int): void;
  /**
   * Adds a new radio check button and assigns a {@link Shortcut} to it. Sets the label of the checkbox to the {@link Shortcut}'s name.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link set_item_checked} for more info on how to control it.
   */
  add_radio_check_shortcut(shortcut: Shortcut, id?: int, global?: boolean): void;
  /**
   * Adds a separator between items. Separators also occupy an index, which you can set by using the `id` parameter.
   * A `label` can optionally be provided, which will appear at the center of the separator.
   */
  add_separator(label?: string, id?: int): void;
  /**
   * Adds a {@link Shortcut}.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   * If `allow_echo` is `true`, the shortcut can be activated with echo events.
   */
  add_shortcut(shortcut: Shortcut, id?: int, global?: boolean, allow_echo?: boolean): void;
  /**
   * Adds an item that will act as a submenu of the parent {@link PopupMenu} node when clicked. The `submenu` argument must be the name of an existing {@link PopupMenu} that has been added as a child to this node. This submenu will be shown when the item is clicked, hovered for long enough, or activated using the `ui_select` or `ui_right` input actions.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   */
  add_submenu_item(label: string, submenu: string, id?: int): void;
  /**
   * Adds an item that will act as a submenu of the parent {@link PopupMenu} node when clicked. This submenu will be shown when the item is clicked, hovered for long enough, or activated using the `ui_select` or `ui_right` input actions.
   * `submenu` must be either child of this {@link PopupMenu} or has no parent node (in which case it will be automatically added as a child). If the `submenu` popup has another parent, this method will fail.
   * An `id` can optionally be provided. If no `id` is provided, one will be created from the index.
   */
  add_submenu_node_item(label: string, submenu: PopupMenu, id?: int): void;
  /**
   * Removes all items from the {@link PopupMenu}. If `free_submenus` is `true`, the submenu nodes are automatically freed.
   */
  clear(free_submenus?: boolean): void;
  /** Returns the index of the currently focused item. Returns `-1` if no item is focused. */
  get_focused_item(): int;
  /**
   * Returns the accelerator of the item at the given `index`. An accelerator is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The return value is an integer which is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`). If no accelerator is defined for the specified `index`, {@link get_item_accelerator} returns `0` (corresponding to {@link @GlobalScope.KEY_NONE}).
   */
  get_item_accelerator(index: int): int;
  /** Returns the auto translate mode of the item at the given `index`. */
  get_item_auto_translate_mode(index: int): int;
  /** Returns the icon of the item at the given `index`. */
  get_item_icon(index: int): Texture2D;
  /** Returns the maximum allowed width of the icon for the item at the given `index`. */
  get_item_icon_max_width(index: int): int;
  /** Returns a {@link Color} modulating the item's icon at the given `index`. */
  get_item_icon_modulate(index: int): Color;
  /** Returns the ID of the item at the given `index`. */
  get_item_id(index: int): int;
  /** Returns the horizontal offset of the item at the given `index`. */
  get_item_indent(index: int): int;
  /**
   * Returns the index of the item containing the specified `id`. The index is automatically assigned to each item by the engine when added and represents the order items will be displayed.
   */
  get_item_index(id: int): int;
  /** Returns item's text language code. */
  get_item_language(index: int): string;
  /**
   * Returns the metadata of the specified item, which might be of any type. You can set it with {@link set_item_metadata}, which provides a simple way of assigning context data to items.
   */
  get_item_metadata(index: int): unknown;
  /** Returns the state of the item at the given `index`. */
  get_item_multistate(index: int): int;
  /** Returns the max states of the item at the given `index`. */
  get_item_multistate_max(index: int): int;
  /** Returns the {@link Shortcut} associated with the item at the given `index`. */
  get_item_shortcut(index: int): Shortcut;
  /**
   * Returns the submenu name of the item at the given `index`. See {@link add_submenu_item} for more info on how to add a submenu.
   */
  get_item_submenu(index: int): string;
  /**
   * Returns the submenu of the item at the given `index`, or `null` if no submenu was added. See {@link add_submenu_node_item} for more info on how to add a submenu.
   */
  get_item_submenu_node(index: int): PopupMenu;
  /** Returns the text of the item at the given `index`. */
  get_item_text(index: int): string;
  /** Returns item's text base writing direction. */
  get_item_text_direction(index: int): int;
  /** Returns the tooltip associated with the item at the given `index`. */
  get_item_tooltip(index: int): string;
  /**
   * Returns `true` if the item at the given `index` is checkable in some way, i.e. if it has a checkbox or radio button.
   * **Note:** Checkable items just display a checkmark or radio button, but don't have any built-in checking behavior and must be checked/unchecked manually.
   */
  is_item_checkable(index: int): boolean;
  /** Returns `true` if the item at the given `index` is checked. */
  is_item_checked(index: int): boolean;
  /**
   * Returns `true` if the item at the given `index` is disabled. When it is disabled it can't be selected, or its action invoked.
   * See {@link set_item_disabled} for more info on how to disable an item.
   */
  is_item_disabled(index: int): boolean;
  /**
   * Returns `true` if the item at the given `index` has radio button-style checkability.
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   */
  is_item_radio_checkable(index: int): boolean;
  /**
   * Returns `true` if the item is a separator. If it is, it will be displayed as a line. See {@link add_separator} for more info on how to add a separator.
   */
  is_item_separator(index: int): boolean;
  /** Returns `true` if the specified item's shortcut is disabled. */
  is_item_shortcut_disabled(index: int): boolean;
  /** Returns `true` if the system native menu is supported and currently used by this {@link PopupMenu}. */
  is_native_menu(): boolean;
  /** Returns `true` if search bar is currently enabled. */
  is_search_bar_enabled(): boolean;
  /** Returns `true` if the menu is bound to the special system menu. */
  is_system_menu(): boolean;
  /**
   * Removes the item at the given `index` from the menu.
   * **Note:** The indices of items after the removed item will be shifted by one.
   */
  remove_item(index: int): void;
  /** Moves the scroll view to make the item at the given `index` visible. */
  scroll_to_item(index: int): void;
  /**
   * Sets the currently focused item as the given `index`.
   * Passing `-1` as the index makes so that no item is focused.
   */
  set_focused_item(index: int): void;
  /**
   * Sets the accelerator of the item at the given `index`. An accelerator is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. `accel` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   */
  set_item_accelerator(index: int, accel: int): void;
  /**
   * Sets whether the item at the given `index` has a checkbox. If `false`, sets the type of the item to plain text.
   * **Note:** Checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually.
   */
  set_item_as_checkable(index: int, enable: boolean): void;
  /**
   * Sets the type of the item at the given `index` to radio button. If `false`, sets the type of the item to plain text.
   */
  set_item_as_radio_checkable(index: int, enable: boolean): void;
  /**
   * Mark the item at the given `index` as a separator, which means that it would be displayed as a line. If `false`, sets the type of the item to plain text.
   */
  set_item_as_separator(index: int, enable: boolean): void;
  /**
   * Sets the auto translate mode of the item at the given `index`.
   * Items use {@link Node.AUTO_TRANSLATE_MODE_INHERIT} by default, which uses the same auto translate mode as the {@link PopupMenu} itself.
   */
  set_item_auto_translate_mode(index: int, mode: int): void;
  /** Sets the checkstate status of the item at the given `index`. */
  set_item_checked(index: int, checked: boolean): void;
  /**
   * Enables/disables the item at the given `index`. When it is disabled, it can't be selected and its action can't be invoked.
   */
  set_item_disabled(index: int, disabled: boolean): void;
  /** Replaces the {@link Texture2D} icon of the item at the given `index`. */
  set_item_icon(index: int, icon: Texture2D): void;
  /**
   * Sets the maximum allowed width of the icon for the item at the given `index`. This limit is applied on top of the default size of the icon and on top of . The height is adjusted according to the icon's ratio.
   */
  set_item_icon_max_width(index: int, width: int): void;
  /** Sets a modulating {@link Color} of the item's icon at the given `index`. */
  set_item_icon_modulate(index: int, modulate: Color): void;
  /**
   * Sets the `id` of the item at the given `index`.
   * The `id` is used in {@link id_pressed} and {@link id_focused} signals.
   */
  set_item_id(index: int, id: int): void;
  /** Sets the horizontal offset of the item at the given `index`. */
  set_item_indent(index: int, indent: int): void;
  /**
   * Changes the index of the item at index `index` to be at index `target_index`. This can be used to move an item above other items. The moved item will keep the same ID, even if it was generated from the original index.
   * **Note:** The indices of any items between index `index` and index `target_index` will be shifted by one.
   */
  set_item_index(index: int, target_index: int): void;
  /**
   * Sets the language code of the text for the item at the given index to `language`. This is used for line-breaking and text shaping algorithms. If `language` is empty, the current locale is used.
   */
  set_item_language(index: int, language: string): void;
  /**
   * Sets the metadata of an item, which may be of any type. You can later get it with {@link get_item_metadata}, which provides a simple way of assigning context data to items.
   */
  set_item_metadata(index: int, metadata: unknown): void;
  /** Sets the state of a multistate item. See {@link add_multistate_item} for details. */
  set_item_multistate(index: int, state: int): void;
  /** Sets the max states of a multistate item. See {@link add_multistate_item} for details. */
  set_item_multistate_max(index: int, max_states: int): void;
  /** Sets a {@link Shortcut} for the item at the given `index`. */
  set_item_shortcut(index: int, shortcut: Shortcut, global?: boolean): void;
  /** Disables the {@link Shortcut} of the item at the given `index`. */
  set_item_shortcut_disabled(index: int, disabled: boolean): void;
  /**
   * Sets the submenu of the item at the given `index`. The submenu is the name of a child {@link PopupMenu} node that would be shown when the item is clicked.
   */
  set_item_submenu(index: int, submenu: string): void;
  /**
   * Sets the submenu of the item at the given `index`. The submenu is a {@link PopupMenu} node that would be shown when the item is clicked. It must either be a child of this {@link PopupMenu} or has no parent (in which case it will be automatically added as a child). If the `submenu` popup has another parent, this method will fail.
   */
  set_item_submenu_node(index: int, submenu: PopupMenu): void;
  /** Sets the text of the item at the given `index`. */
  set_item_text(index: int, text: string): void;
  /** Sets item's text base writing direction. */
  set_item_text_direction(index: int, direction: int): void;
  /** Sets the {@link String} tooltip of the item at the given `index`. */
  set_item_tooltip(index: int, tooltip: string): void;
  /** Toggles the check state of the item at the given `index`. */
  toggle_item_checked(index: int): void;
  /** Cycle to the next state of a multistate item. See {@link add_multistate_item} for details. */
  toggle_item_multistate(index: int): void;

  /**
   * Emitted when the user navigated to an item of some `id` using the {@link ProjectSettings.input/ui_up} or {@link ProjectSettings.input/ui_down} input action.
   */
  id_focused: Signal<[int]>;
  /**
   * Emitted when an item of some `id` is pressed. Also emitted when its accelerator is activated on macOS.
   * **Note:** If `id` is negative (either explicitly or due to overflow), this will return the corresponding index instead.
   */
  id_pressed: Signal<[int]>;
  /**
   * Emitted when an item of some `index` is pressed. Also emitted when its accelerator is activated on macOS.
   */
  index_pressed: Signal<[int]>;
  /** Emitted when any item is added, modified or removed. */
  menu_changed: Signal<[]>;
}
