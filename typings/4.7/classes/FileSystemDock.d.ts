// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Godot editor's dock for managing files in the project. */
declare class FileSystemDock<Tree extends object = any> extends EditorDock<Tree> {
  /** Registers a new {@link EditorResourceTooltipPlugin}. */
  add_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin): void;
  /** Sets the given `path` as currently selected, ensuring that the selected file/directory is visible. */
  navigate_to_path(path: string): void;
  /** Removes an {@link EditorResourceTooltipPlugin}. Fails if the plugin wasn't previously added. */
  remove_resource_tooltip_plugin(plugin: EditorResourceTooltipPlugin): void;

  /** Emitted when the user switches file display mode or split mode. */
  display_mode_changed: Signal<[]>;
  /** Emitted when the given `file` was removed. */
  file_removed: Signal<[string]>;
  /** Emitted when a file is moved from `old_file` path to `new_file` path. */
  files_moved: Signal<[string, string]>;
  /** Emitted when folders change color. */
  folder_color_changed: Signal<[]>;
  /** Emitted when a folder is moved from `old_folder` path to `new_folder` path. */
  folder_moved: Signal<[string, string]>;
  /** Emitted when the given `folder` was removed. */
  folder_removed: Signal<[string]>;
  /** Emitted when a new scene is created that inherits the scene at `file` path. */
  inherit: Signal<[string]>;
  /** Emitted when the given scenes are being instantiated in the editor. */
  instantiate: Signal<[PackedStringArray]>;
  /** Emitted when an external `resource` had its file removed. */
  resource_removed: Signal<[Resource]>;
  /**
   * Emitted when the selection changes. Use {@link EditorInterface.get_selected_paths} in the connected method to get the selected paths.
   */
  selection_changed: Signal<[]>;
}
