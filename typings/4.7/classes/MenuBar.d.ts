// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A horizontal menu bar that creates a menu for each {@link PopupMenu} child. */
declare class MenuBar extends Control {
  /** Flat {@link MenuBar} don't display item decoration. */
  flat: boolean;
  /**
   * <member name="language" type="String" setter="set_language" getter="get_language" default="&quot;&quot;">
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  focus_mode: int;
  /**
   * If `true`, {@link MenuBar} will use system global menu when supported.
   * **Note:** If `true` and global menu is supported, this node is not displayed, has zero size, and all its child nodes except {@link PopupMenu}s are inaccessible.
   * **Note:** This property overrides the value of the {@link PopupMenu.prefer_native_menu} property of the child nodes.
   */
  prefer_global_menu: boolean;
  /**
   * Position order in the global menu to insert {@link MenuBar} items at. All menu items in the {@link MenuBar} are always inserted as a continuous range. Menus with lower {@link start_index} are inserted first. Menus with {@link start_index} equal to `-1` are inserted last.
   */
  start_index: int;
  /**
   * If `true`, when the cursor hovers above menu item, it will close the current {@link PopupMenu} and open the other one.
   */
  switch_on_hover: boolean;
  /** Base text writing direction. */
  text_direction: int;
  set_flat(value: boolean): void;
  is_flat(): boolean;
  set_prefer_global_menu(value: boolean): void;
  is_prefer_global_menu(): boolean;
  set_start_index(value: int): void;
  get_start_index(): int;
  set_switch_on_hover(value: boolean): void;
  is_switch_on_hover(): boolean;
  set_text_direction(value: int): void;
  get_text_direction(): int;

  /** Returns number of menu items. */
  get_menu_count(): int;
  /** Returns {@link PopupMenu} associated with menu item. */
  get_menu_popup(menu: int): PopupMenu;
  /** Returns menu item title. */
  get_menu_title(menu: int): string;
  /** Returns menu item tooltip. */
  get_menu_tooltip(menu: int): string;
  /** Returns `true` if the menu item is disabled. */
  is_menu_disabled(menu: int): boolean;
  /** Returns `true` if the menu item is hidden. */
  is_menu_hidden(menu: int): boolean;
  /** Returns `true` if the current system's global menu is supported and used by this {@link MenuBar}. */
  is_native_menu(): boolean;
  /** If `true`, shortcuts are disabled and cannot be used to trigger the button. */
  set_disable_shortcuts(disabled: boolean): void;
  /** If `true`, menu item is disabled. */
  set_menu_disabled(menu: int, disabled: boolean): void;
  /** If `true`, menu item is hidden. */
  set_menu_hidden(menu: int, hidden: boolean): void;
  /** Sets menu item title. */
  set_menu_title(menu: int, title: string): void;
  /** Sets menu item tooltip. */
  set_menu_tooltip(menu: int, tooltip: string): void;
}
