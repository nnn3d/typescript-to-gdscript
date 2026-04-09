// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Plugin for adding custom context menus in the editor. */
declare class EditorContextMenuPlugin extends RefCounted {
  /**
   * Called when creating a context menu, custom options can be added by using the {@link add_context_menu_item} or {@link add_context_menu_item_from_shortcut} functions. `paths` contains currently selected paths (depending on menu), which can be used to conditionally add options.
   */
  _popup_menu(paths: PackedStringArray): void;
  /**
   * Add custom option to the context menu of the plugin's specified slot. When the option is activated, `callback` will be called. Callback should take single {@link Array} argument; array contents depend on context menu slot.
   * If you want to assign shortcut to the menu item, use {@link add_context_menu_item_from_shortcut} instead.
   */
  add_context_menu_item(name: string, callback: Callable, icon?: Texture2D): void;
  /**
   * Add custom option to the context menu of the plugin's specified slot. The option will have the `shortcut` assigned and reuse its callback. The shortcut has to be registered beforehand with {@link add_menu_shortcut}.
   */
  add_context_menu_item_from_shortcut(name: string, shortcut: Shortcut, icon?: Texture2D): void;
  /**
   * Add a submenu to the context menu of the plugin's specified slot. The submenu is not automatically handled, you need to connect to its signals yourself. Also the submenu is freed on every popup, so provide a new {@link PopupMenu} every time.
   */
  add_context_submenu_item(name: string, menu: PopupMenu, icon?: Texture2D): void;
  /**
   * Registers a shortcut associated with the plugin's context menu. This method should be called once (e.g. in plugin's {@link Object._init}). `callback` will be called when user presses the specified `shortcut` while the menu's context is in effect (e.g. FileSystem dock is focused). Callback should take single {@link Array} argument; array contents depend on context menu slot.
   */
  add_menu_shortcut(shortcut: Shortcut, callback: Callable): void;

  // enum ContextMenuSlot
  /**
   * Context menu of Scene dock. {@link _popup_menu} will be called with a list of paths to currently selected nodes, while option callback will receive the list of currently selected nodes.
   */
  static readonly CONTEXT_SLOT_SCENE_TREE: int;
  /**
   * Context menu of FileSystem dock. {@link _popup_menu} and option callback will be called with list of paths of the currently selected files.
   */
  static readonly CONTEXT_SLOT_FILESYSTEM: int;
  /**
   * Context menu of Script editor's script tabs. {@link _popup_menu} will be called with the path to the currently edited script, while option callback will receive reference to that script.
   */
  static readonly CONTEXT_SLOT_SCRIPT_EDITOR: int;
  /**
   * The "Create..." submenu of FileSystem dock's context menu, or the "New" section of the main context menu when empty space is clicked. {@link _popup_menu} and option callback will be called with the path of the currently selected folder. When clicking the empty space, the list of paths for popup method will be empty.
   */
  static readonly CONTEXT_SLOT_FILESYSTEM_CREATE: int;
  /**
   * Context menu of Script editor's code editor. {@link _popup_menu} will be called with the path to the {@link CodeEdit} node. You can fetch it using this code:
   * The option callback will receive reference to that node. You can use {@link CodeEdit} methods to perform symbol lookups etc.
   */
  static readonly CONTEXT_SLOT_SCRIPT_EDITOR_CODE: int;
  /**
   * Context menu of scene tabs. {@link _popup_menu} will be called with the path of the clicked scene, or empty {@link PackedStringArray} if the menu was opened on empty space. The option callback will receive the path of the clicked scene, or empty {@link String} if none was clicked.
   */
  static readonly CONTEXT_SLOT_SCENE_TABS: int;
  /**
   * Context menu of 2D editor's basic right-click menu. {@link _popup_menu} will be called with paths to all {@link CanvasItem} nodes under the cursor. You can fetch them using this code:
   * The paths array is empty if there weren't any nodes under cursor. The option callback will receive a typed array of {@link CanvasItem} nodes.
   */
  static readonly CONTEXT_SLOT_2D_EDITOR: int;
}
