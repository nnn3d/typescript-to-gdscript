// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Used by the editor to extend its functionality. */
declare class EditorPlugin extends Node {
  /**
   * This method is called when the editor is about to save the project, switch to another tab, etc. It asks the plugin to apply any pending state changes to ensure consistency.
   * This is used, for example, in shader editors to let the plugin know that it must apply the shader code being written by the user to the object.
   */
  _apply_changes(): void;
  /**
   * This method is called when the editor is about to run the project. The plugin can then perform required operations before the project runs.
   * This method must return a boolean. If this method returns `false`, the project will not run. The run is aborted immediately, so this also prevents all other plugins' {@link _build} methods from running.
   */
  _build(): boolean;
  /**
   * Clear all the state and reset the object being edited to zero. This ensures your plugin does not keep editing a currently existing node, or a node from the wrong scene.
   */
  _clear(): void;
  /**
   * Called by the engine when the user disables the {@link EditorPlugin} in the Plugin tab of the project settings window.
   */
  _disable_plugin(): void;
  /**
   * This function is used for plugins that edit specific object types (nodes or resources). It requests the editor to edit the given object.
   * `object` can be `null` if the plugin was editing an object, but there is no longer any selected object handled by this plugin. It can be used to cleanup editing state.
   */
  _edit(object: GodotObject): void;
  /**
   * Called by the engine when the user enables the {@link EditorPlugin} in the Plugin tab of the project settings window.
   */
  _enable_plugin(): void;
  /**
   * Called by the engine when the 3D editor's viewport is updated. `viewport_control` is an overlay on top of the viewport and it can be used for drawing. You can update the viewport manually by calling {@link update_overlays}.
   */
  _forward_3d_draw_over_viewport(viewport_control: Control): void;
  /**
   * This method is the same as {@link _forward_3d_draw_over_viewport}, except it draws on top of everything. Useful when you need an extra layer that shows over anything else.
   * You need to enable calling of this method by using {@link set_force_draw_over_forwarding_enabled}.
   */
  _forward_3d_force_draw_over_viewport(viewport_control: Control): void;
  /**
   * Called when there is a root node in the current edited scene, {@link _handles} is implemented, and an {@link InputEvent} happens in the 3D viewport. The return value decides whether the {@link InputEvent} is consumed or forwarded to other {@link EditorPlugin}s. See {@link AfterGUIInput} for options.
   * This method must return {@link AFTER_GUI_INPUT_PASS} in order to forward the {@link InputEvent} to other Editor classes.
   */
  _forward_3d_gui_input(viewport_camera: Camera3D, event: InputEvent): int;
  /**
   * Called by the engine when the 2D editor's viewport is updated. `viewport_control` is an overlay on top of the viewport and it can be used for drawing. You can update the viewport manually by calling {@link update_overlays}.
   */
  _forward_canvas_draw_over_viewport(viewport_control: Control): void;
  /**
   * This method is the same as {@link _forward_canvas_draw_over_viewport}, except it draws on top of everything. Useful when you need an extra layer that shows over anything else.
   * You need to enable calling of this method by using {@link set_force_draw_over_forwarding_enabled}.
   */
  _forward_canvas_force_draw_over_viewport(viewport_control: Control): void;
  /**
   * Called when there is a root node in the current edited scene, {@link _handles} is implemented, and an {@link InputEvent} happens in the 2D viewport. If this method returns `true`, `event` is intercepted by this {@link EditorPlugin}, otherwise `event` is forwarded to other Editor classes.
   * This method must return `false` in order to forward the {@link InputEvent} to other Editor classes.
   */
  _forward_canvas_gui_input(event: InputEvent): boolean;
  /**
   * This is for editors that edit script-based objects. You can return a list of breakpoints in the format (`script:line`), for example: `res://path_to_script.gd:25`.
   */
  _get_breakpoints(): PackedStringArray;
  /**
   * Override this method in your plugin to return a {@link Texture2D} in order to give it an icon.
   * For main screen plugins, this appears at the top of the screen, to the right of the "2D", "3D", "Script", "Game", and "AssetLib" buttons.
   * Ideally, the plugin icon should be white with a transparent background and 16×16 pixels in size.
   */
  _get_plugin_icon(): Texture2D | null;
  /**
   * Override this method in your plugin to provide the name of the plugin when displayed in the Godot editor.
   * For main screen plugins, this appears at the top of the screen, to the right of the "2D", "3D", "Script", "Game", and "AssetLib" buttons.
   */
  _get_plugin_name(): string;
  /**
   * Override this method to provide a state data you want to be saved, like view position, grid settings, folding, etc. This is used when saving the scene (so state is kept when opening it again) and for switching tabs (so state can be restored when the tab returns). This data is automatically saved for each scene in an `editstate` file in the editor metadata folder. If you want to store global (scene-independent) editor data for your plugin, you can use {@link _get_window_layout} instead.
   * Use {@link _set_state} to restore your saved state.
   * **Note:** This method should not be used to save important settings that should persist with the project.
   * **Note:** You must implement {@link _get_plugin_name} for the state to be stored and restored correctly.
   */
  _get_state(): Dictionary;
  /**
   * Override this method to provide a custom message that lists unsaved changes. The editor will call this method when exiting or when closing a scene, and display the returned string in a confirmation dialog. Return empty string if the plugin has no unsaved changes.
   * When closing a scene, `for_scene` is the path to the scene being closed. You can use it to handle built-in resources in that scene.
   * If the user confirms saving, {@link _save_external_data} will be called, before closing the editor.
   * If the plugin has no scene-specific changes, you can ignore the calls when closing scenes:
   */
  _get_unsaved_status(for_scene: string): string;
  /**
   * Override this method to provide the GUI layout of the plugin or any other data you want to be stored. This is used to save the project's editor layout when {@link queue_save_layout} is called or the editor layout was changed (for example changing the position of a dock). The data is stored in the `editor_layout.cfg` file in the editor metadata directory.
   * Use {@link _set_window_layout} to restore your saved layout.
   */
  _get_window_layout(configuration: ConfigFile): void;
  /**
   * Implement this function if your plugin edits a specific type of object (Resource or Node). If you return `true`, then you will get the functions {@link _edit} and {@link _make_visible} called when the editor requests them. If you have declared the methods {@link _forward_canvas_gui_input} and {@link _forward_3d_gui_input} these will be called too.
   * **Note:** Each plugin should handle only one type of objects at a time. If a plugin handles more types of objects and they are edited at the same time, it will result in errors.
   */
  _handles(object: GodotObject): boolean;
  /**
   * Returns `true` if this is a main screen editor plugin (it goes in the workspace selector together with **2D**, **3D**, **Script**, **Game**, and **AssetLib**).
   * When the plugin's workspace is selected, other main screen plugins will be hidden, but your plugin will not appear automatically. It needs to be added as a child of {@link EditorInterface.get_editor_main_screen} and made visible inside {@link _make_visible}.
   * Use {@link _get_plugin_name} and {@link _get_plugin_icon} to customize the plugin button's appearance.
   */
  _has_main_screen(): boolean;
  /**
   * This function will be called when the editor is requested to become visible. It is used for plugins that edit a specific object type.
   * Remember that you have to manage the visibility of all your editor controls manually.
   */
  _make_visible(visible: boolean): void;
  /**
   * This function is called when an individual scene is about to be played in the editor. `args` is a list of command line arguments that will be passed to the new Godot instance, which will be replaced by the list returned by this function.
   * **Note:** Text that is printed in this method will not be visible in the editor's Output panel unless {@link EditorSettings.run/output/always_clear_output_on_play} is `false`.
   */
  _run_scene(scene: string, args: PackedStringArray): PackedStringArray;
  /**
   * This method is called after the editor saves the project or when it's closed. It asks the plugin to save edited external scenes/resources.
   */
  _save_external_data(): void;
  /**
   * Restore the state saved by {@link _get_state}. This method is called when the current scene tab is changed in the editor.
   * **Note:** Your plugin must implement {@link _get_plugin_name}, otherwise it will not be recognized and this method will not be called.
   */
  _set_state(state: Dictionary): void;
  /**
   * Restore the plugin GUI layout and data saved by {@link _get_window_layout}. This method is called for every plugin on editor startup. Use the provided `configuration` file to read your saved data.
   */
  _set_window_layout(configuration: ConfigFile): void;
  /** Adds a script at `path` to the Autoload list as `name`. */
  add_autoload_singleton(name: string, path: string): void;
  /**
   * Adds a plugin to the context menu. `slot` is the context menu where the plugin will be added.
   * **Note:** A plugin instance can belong only to a single context menu slot.
   */
  add_context_menu_plugin(slot: int, plugin: EditorContextMenuPlugin): void;
  /**
   * Adds a control to the bottom panel (together with Output, Debug, Animation, etc.). Returns a reference to a button that is outside the scene tree. It's up to you to hide/show the button when needed. When your plugin is deactivated, make sure to remove your custom control with {@link remove_control_from_bottom_panel} and free it with {@link Node.queue_free}.
   * `shortcut` is a shortcut that, when activated, will toggle the bottom panel's visibility. The shortcut object is only set when this control is added to the bottom panel.
   * **Note** See the default editor bottom panel shortcuts in the Editor Settings for inspiration. By convention, they all use `Alt` modifier.
   */
  add_control_to_bottom_panel(control: Control, title: string, shortcut?: Shortcut): Button;
  /**
   * Adds a custom control to a container in the editor UI.
   * Please remember that you have to manage the visibility of your custom controls yourself (and likely hide it after adding it).
   * When your plugin is deactivated, make sure to remove your custom control with {@link remove_control_from_container} and free it with {@link Node.queue_free}.
   */
  add_control_to_container(container: int, control: Control): void;
  /**
   * Adds the control to a specific dock slot.
   * If the dock is repositioned and as long as the plugin is active, the editor will save the dock position on further sessions.
   * When your plugin is deactivated, make sure to remove your custom control with {@link remove_control_from_docks} and free it with {@link Node.queue_free}.
   * Optionally, you can specify a shortcut parameter. When pressed, this shortcut will open and focus the dock.
   */
  add_control_to_dock(slot: int, control: Control, shortcut?: Shortcut): void;
  /**
   * Adds a custom type, which will appear in the list of nodes or resources.
   * When a given node or resource is selected, the base type will be instantiated (e.g. "Node3D", "Control", "Resource"), then the script will be loaded and set to this object.
   * **Note:** The base type is the base engine class which this type's class hierarchy inherits, not any custom type parent classes.
   * You can use the virtual method {@link _handles} to check if your custom object is being edited by checking the script or using the `is` keyword.
   * During run-time, this will be a simple object with a script so this function does not need to be called then.
   * **Note:** Custom types added this way are not true classes. They are just a helper to create a node with specific script.
   */
  add_custom_type(type_: string, base: string, script: Script, icon: Texture2D): void;
  /**
   * Adds a {@link Script} as debugger plugin to the Debugger. The script must extend {@link EditorDebuggerPlugin}.
   */
  add_debugger_plugin(script: EditorDebuggerPlugin): void;
  /**
   * Adds a new dock.
   * When your plugin is deactivated, make sure to remove your custom dock with {@link remove_dock} and free it with {@link Node.queue_free}.
   */
  add_dock(dock: EditorDock): void;
  /**
   * Registers a new {@link EditorExportPlatform}. Export platforms provides functionality of exporting to the specific platform.
   */
  add_export_platform(platform: EditorExportPlatform): void;
  /**
   * Registers a new {@link EditorExportPlugin}. Export plugins are used to perform tasks when the project is being exported.
   * See {@link add_inspector_plugin} for an example of how to register a plugin.
   */
  add_export_plugin(plugin: EditorExportPlugin): void;
  /**
   * Registers a new {@link EditorImportPlugin}. Import plugins are used to import custom and unsupported assets as a custom {@link Resource} type.
   * If `first_priority` is `true`, the new import plugin is inserted first in the list and takes precedence over pre-existing plugins.
   * **Note:** If you want to import custom 3D asset formats use {@link add_scene_format_importer_plugin} instead.
   * See {@link add_inspector_plugin} for an example of how to register a plugin.
   */
  add_import_plugin(importer: EditorImportPlugin, first_priority?: boolean): void;
  /**
   * Registers a new {@link EditorInspectorPlugin}. Inspector plugins are used to extend {@link EditorInspector} and provide custom configuration tools for your object's properties.
   * **Note:** Always use {@link remove_inspector_plugin} to remove the registered {@link EditorInspectorPlugin} when your {@link EditorPlugin} is disabled to prevent leaks and an unexpected behavior.
   */
  add_inspector_plugin(plugin: EditorInspectorPlugin): void;
  /**
   * Registers a new {@link EditorNode3DGizmoPlugin}. Gizmo plugins are used to add custom gizmos to the 3D preview viewport for a {@link Node3D}.
   * See {@link add_inspector_plugin} for an example of how to register a plugin.
   */
  add_node_3d_gizmo_plugin(plugin: EditorNode3DGizmoPlugin): void;
  /**
   * Registers a new {@link EditorResourceConversionPlugin}. Resource conversion plugins are used to add custom resource converters to the editor inspector.
   * See {@link EditorResourceConversionPlugin} for an example of how to create a resource conversion plugin.
   */
  add_resource_conversion_plugin(plugin: EditorResourceConversionPlugin): void;
  /**
   * Registers a new {@link EditorSceneFormatImporter}. Scene importers are used to import custom 3D asset formats as scenes.
   * If `first_priority` is `true`, the new import plugin is inserted first in the list and takes precedence over pre-existing plugins.
   */
  add_scene_format_importer_plugin(scene_format_importer: EditorSceneFormatImporter, first_priority?: boolean): void;
  /**
   * Add an {@link EditorScenePostImportPlugin}. These plugins allow customizing the import process of 3D assets by adding new options to the import dialogs.
   * If `first_priority` is `true`, the new import plugin is inserted first in the list and takes precedence over pre-existing plugins.
   */
  add_scene_post_import_plugin(scene_import_plugin: EditorScenePostImportPlugin, first_priority?: boolean): void;
  /**
   * Adds a custom menu item to **Project > Tools** named `name`. When clicked, the provided `callable` will be called.
   */
  add_tool_menu_item(name: string, callable: Callable): void;
  /**
   * Adds a custom {@link PopupMenu} submenu under **Project > Tools >** `name`. Use {@link remove_tool_menu_item} on plugin clean up to remove the menu.
   */
  add_tool_submenu_item(name: string, submenu: PopupMenu): void;
  /** Registers a custom translation parser plugin for extracting translatable strings from custom files. */
  add_translation_parser_plugin(parser: EditorTranslationParserPlugin): void;
  /**
   * Hooks a callback into the undo/redo action creation when a property is modified in the inspector. This allows, for example, to save other properties that may be lost when a given property is modified.
   * The callback should have 4 arguments: {@link Object} `undo_redo`, {@link Object} `modified_object`, {@link String} `property` and {@link Variant} `new_value`. They are, respectively, the {@link UndoRedo} object used by the inspector, the currently modified object, the name of the modified property and the new value the property is about to take.
   */
  add_undo_redo_inspector_hook_callback(callable: Callable): void;
  /** Returns the {@link EditorInterface} singleton instance. */
  get_editor_interface(): EditorInterface;
  /** Returns the {@link PopupMenu} under **Scene > Export As...**. */
  get_export_as_menu(): PopupMenu;
  /** Provide the version of the plugin declared in the `plugin.cfg` config file. */
  get_plugin_version(): string;
  /**
   * Gets the Editor's dialog used for making scripts.
   * **Note:** Users can configure it before use.
   * **Warning:** Removing and freeing this node will render a part of the editor useless and may cause a crash.
   */
  get_script_create_dialog(): ScriptCreateDialog;
  /**
   * Gets the undo/redo object. Most actions in the editor can be undoable, so use this object to make sure this happens when it's worth it.
   */
  get_undo_redo(): EditorUndoRedoManager;
  /** Minimizes the bottom panel. */
  hide_bottom_panel(): void;
  /** Makes a specific item in the bottom panel visible. */
  make_bottom_panel_item_visible(item: Control): void;
  /** Queue save the project's editor layout. */
  queue_save_layout(): void;
  /** Removes an Autoload `name` from the list. */
  remove_autoload_singleton(name: string): void;
  /** Removes the specified context menu plugin. */
  remove_context_menu_plugin(plugin: EditorContextMenuPlugin): void;
  /**
   * Removes the control from the bottom panel. You have to manually {@link Node.queue_free} the control.
   */
  remove_control_from_bottom_panel(control: Control): void;
  /**
   * Removes the control from the specified container. You have to manually {@link Node.queue_free} the control.
   */
  remove_control_from_container(container: int, control: Control): void;
  /** Removes the control from the dock. You have to manually {@link Node.queue_free} the control. */
  remove_control_from_docks(control: Control): void;
  /** Removes a custom type added by {@link add_custom_type}. */
  remove_custom_type(type_: string): void;
  /** Removes the debugger plugin with given script from the Debugger. */
  remove_debugger_plugin(script: EditorDebuggerPlugin): void;
  /**
   * Removes `dock` from the available docks. You should manually call {@link Node.queue_free} to free it.
   */
  remove_dock(dock: EditorDock): void;
  /** Removes an export platform registered by {@link add_export_platform}. */
  remove_export_platform(platform: EditorExportPlatform): void;
  /** Removes an export plugin registered by {@link add_export_plugin}. */
  remove_export_plugin(plugin: EditorExportPlugin): void;
  /** Removes an import plugin registered by {@link add_import_plugin}. */
  remove_import_plugin(importer: EditorImportPlugin): void;
  /** Removes an inspector plugin registered by {@link add_inspector_plugin}. */
  remove_inspector_plugin(plugin: EditorInspectorPlugin): void;
  /** Removes a gizmo plugin registered by {@link add_node_3d_gizmo_plugin}. */
  remove_node_3d_gizmo_plugin(plugin: EditorNode3DGizmoPlugin): void;
  /** Removes a resource conversion plugin registered by {@link add_resource_conversion_plugin}. */
  remove_resource_conversion_plugin(plugin: EditorResourceConversionPlugin): void;
  /** Removes a scene format importer registered by {@link add_scene_format_importer_plugin}. */
  remove_scene_format_importer_plugin(scene_format_importer: EditorSceneFormatImporter): void;
  /** Remove the {@link EditorScenePostImportPlugin}, added with {@link add_scene_post_import_plugin}. */
  remove_scene_post_import_plugin(scene_import_plugin: EditorScenePostImportPlugin): void;
  /** Removes a menu `name` from **Project > Tools**. */
  remove_tool_menu_item(name: string): void;
  /** Removes a custom translation parser plugin registered by {@link add_translation_parser_plugin}. */
  remove_translation_parser_plugin(parser: EditorTranslationParserPlugin): void;
  /** Removes a callback previously added by {@link add_undo_redo_inspector_hook_callback}. */
  remove_undo_redo_inspector_hook_callback(callable: Callable): void;
  /** Sets the tab icon for the given control in a dock slot. Setting to `null` removes the icon. */
  set_dock_tab_icon(control: Control, icon: Texture2D): void;
  /**
   * Enables calling of {@link _forward_canvas_force_draw_over_viewport} for the 2D editor and {@link _forward_3d_force_draw_over_viewport} for the 3D editor when their viewports are updated. You need to call this method only once and it will work permanently for this plugin.
   */
  set_force_draw_over_forwarding_enabled(): void;
  /**
   * Use this method if you always want to receive inputs from 3D view screen inside {@link _forward_3d_gui_input}. It might be especially usable if your plugin will want to use raycast in the scene.
   */
  set_input_event_forwarding_always_enabled(): void;
  /**
   * Updates the overlays of the 2D and 3D editor viewport. Causes methods {@link _forward_canvas_draw_over_viewport}, {@link _forward_canvas_force_draw_over_viewport}, {@link _forward_3d_draw_over_viewport} and {@link _forward_3d_force_draw_over_viewport} to be called.
   */
  update_overlays(): int;

  /**
   * Emitted when user changes the workspace (**2D**, **3D**, **Script**, **Game**, **AssetLib**). Also works with custom screens defined by plugins.
   */
  main_screen_changed: Signal<[string]>;
  /** Emitted when the given `resource` was saved on disc. See also {@link scene_saved}. */
  resource_saved: Signal<[Resource]>;
  /**
   * Emitted when the scene is changed in the editor. The argument will return the root node of the scene that has just become active. If this scene is new and empty, the argument will be `null`.
   */
  scene_changed: Signal<[Node]>;
  /** Emitted when user closes a scene. The argument is a file path to the closed scene. */
  scene_closed: Signal<[string]>;
  /**
   * Emitted when a scene was saved on disc. The argument is a file path to the saved scene. See also {@link resource_saved}.
   */
  scene_saved: Signal<[string]>;

  // enum CustomControlContainer
  /** Main editor toolbar, next to play buttons. */
  static readonly CONTAINER_TOOLBAR: int;
  /** The toolbar that appears when 3D editor is active. */
  static readonly CONTAINER_SPATIAL_EDITOR_MENU: int;
  /** Left sidebar of the 3D editor. */
  static readonly CONTAINER_SPATIAL_EDITOR_SIDE_LEFT: int;
  /** Right sidebar of the 3D editor. */
  static readonly CONTAINER_SPATIAL_EDITOR_SIDE_RIGHT: int;
  /** Bottom panel of the 3D editor. */
  static readonly CONTAINER_SPATIAL_EDITOR_BOTTOM: int;
  /** The toolbar that appears when 2D editor is active. */
  static readonly CONTAINER_CANVAS_EDITOR_MENU: int;
  /** Left sidebar of the 2D editor. */
  static readonly CONTAINER_CANVAS_EDITOR_SIDE_LEFT: int;
  /** Right sidebar of the 2D editor. */
  static readonly CONTAINER_CANVAS_EDITOR_SIDE_RIGHT: int;
  /** Bottom panel of the 2D editor. */
  static readonly CONTAINER_CANVAS_EDITOR_BOTTOM: int;
  /** Bottom section of the inspector. */
  static readonly CONTAINER_INSPECTOR_BOTTOM: int;
  /** Tab of Project Settings dialog, to the left of other tabs. */
  static readonly CONTAINER_PROJECT_SETTING_TAB_LEFT: int;
  /** Tab of Project Settings dialog, to the right of other tabs. */
  static readonly CONTAINER_PROJECT_SETTING_TAB_RIGHT: int;
  // enum DockSlot
  /** The dock is closed. */
  static readonly DOCK_SLOT_NONE: int;
  /** Dock slot, left side, upper-left (empty in default layout). */
  static readonly DOCK_SLOT_LEFT_UL: int;
  /** Dock slot, left side, bottom-left (empty in default layout). */
  static readonly DOCK_SLOT_LEFT_BL: int;
  /** Dock slot, left side, upper-right (in default layout includes Scene and Import docks). */
  static readonly DOCK_SLOT_LEFT_UR: int;
  /** Dock slot, left side, bottom-right (in default layout includes FileSystem dock). */
  static readonly DOCK_SLOT_LEFT_BR: int;
  /** Dock slot, right side, upper-left (in default layout includes Inspector, Node, and History docks). */
  static readonly DOCK_SLOT_RIGHT_UL: int;
  /** Dock slot, right side, bottom-left (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_BL: int;
  /** Dock slot, right side, upper-right (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_UR: int;
  /** Dock slot, right side, bottom-right (empty in default layout). */
  static readonly DOCK_SLOT_RIGHT_BR: int;
  /** Bottom panel. */
  static readonly DOCK_SLOT_BOTTOM: int;
  /** Represents the size of the {@link DockSlot} enum. */
  static readonly DOCK_SLOT_MAX: int;
  // enum AfterGUIInput
  /** Forwards the {@link InputEvent} to other EditorPlugins. */
  static readonly AFTER_GUI_INPUT_PASS: int;
  /** Prevents the {@link InputEvent} from reaching other Editor classes. */
  static readonly AFTER_GUI_INPUT_STOP: int;
  /**
   * Pass the {@link InputEvent} to other editor plugins except the main {@link Node3D} one. This can be used to prevent node selection changes and work with sub-gizmos instead.
   */
  static readonly AFTER_GUI_INPUT_CUSTOM: int;
}
