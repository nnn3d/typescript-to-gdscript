// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Dockable container for the editor. */
declare class EditorDock extends MarginContainer {
  /**
   * The available layouts for this dock, as a bitmask. By default, the dock allows vertical and floating layouts.
   */
  available_layouts: int;
  /**
   * If `true`, the dock can be closed with the Close button in the context popup. Docks with {@link global} enabled are always closable.
   */
  closable: boolean;
  /**
   * The default dock slot used when adding the dock with {@link EditorPlugin.add_dock}.
   * After the dock is added, it can be moved to a different slot and the editor will automatically remember its position between sessions. If you remove and re-add the dock, it will be reset to default.
   */
  default_slot: int;
  /** The icon for the dock, as a texture. If specified, it will override {@link icon_name}. */
  dock_icon: Texture2D | null;
  /** The shortcut used to open the dock. */
  dock_shortcut: Shortcut | null;
  /**
   * If `true`, the dock will always display an icon, regardless of {@link EditorSettings.interface/editor/docks/dock_tab_style} or {@link EditorSettings.interface/editor/docks/bottom_dock_tab_style}.
   */
  force_show_icon: boolean;
  /**
   * If `true`, the dock appears in the **Editor > Editor Docks** menu and can be closed. Non-global docks can still be closed using {@link close} or when {@link closable} is `true`.
   */
  global: boolean;
  /**
   * The icon for the dock, as a name from the `EditorIcons` theme type in the editor theme. You can find the list of available icons here (https://godot-editor-icons.github.io/).
   */
  icon_name: string;
  /**
   * The key representing this dock in the editor's layout file. If empty, the dock's displayed name will be used instead.
   */
  layout_key: string;
  /**
   * The title of the dock's tab. If empty, the dock's {@link Node.name} will be used. If the name is auto-generated (contains `@`), the first child's name will be used instead.
   */
  title: string;
  /** The color of the dock tab's title. If its alpha is `0.0`, the default font color will be used. */
  title_color: Color;
  /**
   * If `true`, the dock is not automatically opened or closed when loading an editor layout, only moved. It also can't be opened using a shortcut. This is meant for docks that are opened and closed in specific cases, such as when selecting a {@link TileMap} or {@link AnimationTree} node.
   */
  transient: boolean;
  set_available_layouts(value: int): void;
  get_available_layouts(): int;
  set_closable(value: boolean): void;
  is_closable(): boolean;
  set_default_slot(value: int): void;
  get_default_slot(): int;
  set_dock_icon(value: Texture2D | null): void;
  get_dock_icon(): Texture2D | null;
  set_dock_shortcut(value: Shortcut | null): void;
  get_dock_shortcut(): Shortcut | null;
  set_force_show_icon(value: boolean): void;
  get_force_show_icon(): boolean;
  set_global(value: boolean): void;
  is_global(): boolean;
  set_icon_name(value: string): void;
  get_icon_name(): string;
  set_layout_key(value: string): void;
  get_layout_key(): string;
  set_title(value: string): void;
  get_title(): string;
  set_title_color(value: Color): void;
  get_title_color(): Color;
  set_transient(value: boolean): void;
  is_transient(): boolean;

  /**
   * Implement this method to handle loading this dock's layout. It's equivalent to {@link EditorPlugin._set_window_layout}. `section` is a unique section based on {@link layout_key}.
   */
  _load_layout_from_config(config: ConfigFile, section: string): void;
  /**
   * Implement this method to handle saving this dock's layout. It's equivalent to {@link EditorPlugin._get_window_layout}. `section` is a unique section based on {@link layout_key}.
   */
  _save_layout_to_config(config: ConfigFile, section: string): void;
  /**
   * Implement this method to handle the layout switching for this dock. `layout` is one of the {@link DockLayout} constants.
   */
  _update_layout(layout: int): void;
  /** Closes the dock, making its tab hidden. */
  close(): void;
  /**
   * Focuses the dock's tab (or window if it's floating). If the dock was closed, it will be opened. If it's a bottom dock, makes the bottom panel visible.
   */
  make_visible(): void;
  /**
   * Opens the dock. It will appear in the last used dock slot. If the dock has no default slot, it will be opened floating.
   * **Note:** This does not focus the dock. If you want to open and focus the dock, use {@link make_visible}.
   */
  open(): void;

  /**
   * Emitted when the dock is closed with the Close button in the context popup, before it's removed from its parent. See {@link closable}.
   */
  closed: Signal<[]>;
  /** Emitted when the dock is opened via the Editor > Editor Docks menu, before it's made visible. */
  opened: Signal<[]>;

  // enum DockLayout
  /** Allows placing the dock in the vertical dock slots on either side of the editor. */
  static readonly DOCK_LAYOUT_VERTICAL: int;
  /** Allows placing the dock in the horizontal dock slots at the bottom. */
  static readonly DOCK_LAYOUT_HORIZONTAL: int;
  /** Allows making the dock floating (opened as a separate window). */
  static readonly DOCK_LAYOUT_FLOATING: int;
  /** Allows placing the dock in all available slots. */
  static readonly DOCK_LAYOUT_ALL: int;
  // enum DockSlot
  /** The dock is closed. */
  static readonly DOCK_SLOT_NONE: int;
  /** Dock slot, left side, upper-left (empty in default layout). */
  static readonly DOCK_SLOT_LEFT_UL: int;
  /** Dock slot, left side, bottom-left (empty in default layout). */
  static readonly DOCK_SLOT_LEFT_BL: int;
  /** Dock slot, left side, upper-right (in default layout includes Scene and Import docks). */
  static readonly DOCK_SLOT_LEFT_UR: int;
  /** Dock slot, left side, bottom-right (in default layout includes FileSystem and History docks). */
  static readonly DOCK_SLOT_LEFT_BR: int;
  /** Dock slot, right side, upper-left (in default layout includes Inspector, Signal, and Group docks). */
  static readonly DOCK_SLOT_RIGHT_UL: int;
  /** Dock slot, right side, bottom-left (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_BL: int;
  /** Dock slot, right side, upper-right (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_UR: int;
  /** Dock slot, right side, bottom-right (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_BR: int;
  /** Bottom panel. */
  static readonly DOCK_SLOT_BOTTOM: int;
  /** Dock slot at the bottom, below bottom panel, on the left side. */
  static readonly DOCK_SLOT_BOTTOM_L: int;
  /** Dock slot at the bottom, below bottom panel, on the right side. */
  static readonly DOCK_SLOT_BOTTOM_R: int;
  /** Represents the size of the {@link DockSlot} enum. */
  static readonly DOCK_SLOT_MAX: int;
}
