// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A dialog for selecting files or directories in the filesystem. */
declare class FileDialog extends ConfirmationDialog {
  /**
   * The file system access scope.
   * **Warning:** In Web builds, FileDialog cannot access the host file system. In sandboxed Linux and macOS environments, {@link use_native_dialog} is automatically used to allow limited access to host file system.
   */
  access: int;
  /**
   * The current working directory of the file dialog.
   * **Note:** For native file dialogs, this property is only treated as a hint and may not be respected by specific OS implementations.
   */
  current_dir: string;
  /** The currently selected file of the file dialog. */
  current_file: string;
  /** The currently selected file path of the file dialog. */
  current_path: string;
  /**
   * If `true`, the context menu will show the "Delete" option, which allows moving files and folders to trash.
   */
  deleting_enabled: boolean;
  /**
   * <member name="display_mode" type="int" setter="set_display_mode" getter="get_display_mode" enum="FileDialog.DisplayMode" default="0">
   * Display mode of the dialog's file list.
   */
  dialog_hide_on_ok: boolean;
  /** If `true`, shows the toggle favorite button and favorite list on the left side of the dialog. */
  favorites_enabled: boolean;
  /** If `true`, shows the toggle file filter button. */
  file_filter_toggle_enabled: boolean;
  /** The dialog's open or save mode, which affects the selection behavior. */
  file_mode: int;
  /** If `true`, shows the file sorting options button. */
  file_sort_options_enabled: boolean;
  /**
   * The filter for file names (case-insensitive). When set to a non-empty string, only files that contains the substring will be shown. {@link filename_filter} can be edited by the user with the filter button at the top of the file dialog.
   * See also {@link filters}, which should be used to restrict the file types that can be selected instead of {@link filename_filter} which is meant to be set by the user.
   */
  filename_filter: string;
  /**
   * The available file type filters. Each filter string in the array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. Both file extensions and MIME type should be always set.
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   */
  filters: PackedStringArray;
  /**
   * If `true`, shows the button for creating new directories (when using {@link FILE_MODE_OPEN_DIR}, {@link FILE_MODE_OPEN_ANY}, or {@link FILE_MODE_SAVE_FILE}), and the context menu will have the "New Folder..." option.
   */
  folder_creation_enabled: boolean;
  /** If `true`, shows the toggle hidden files button. */
  hidden_files_toggle_enabled: boolean;
  /** If `true`, shows the layout switch buttons (list/thumbnails). */
  layout_toggle_enabled: boolean;
  /**
   * If `true`, changing the {@link file_mode} property will set the window title accordingly (e.g. setting {@link file_mode} to {@link FILE_MODE_OPEN_FILE} will change the window title to "Open a File").
   */
  mode_overrides_title: boolean;
  /** The number of additional {@link OptionButton}s and {@link CheckBox}es in the dialog. */
  option_count: int;
  /** If `true`, the {@link FileDialog} will warn the user before overwriting files in save mode. */
  overwrite_warning_enabled: boolean;
  /** If `true`, shows the recent directories list on the left side of the dialog. */
  recent_list_enabled: boolean;
  /**
   * If non-empty, the given sub-folder will be "root" of this {@link FileDialog}, i.e. user won't be able to go to its parent directory.
   * **Note:** This property is ignored by native file dialogs.
   */
  root_subfolder: string;
  /**
   * If `true`, the dialog will show hidden files.
   * **Note:** This property is ignored by native file dialogs on Android and Linux.
   */
  show_hidden_files: boolean;
  /**
   * <member name="title" type="String" setter="set_title" getter="get_title" overrides="Window" default="&quot;Save a File&quot;" />
   * <member name="use_native_dialog" type="bool" setter="set_use_native_dialog" getter="get_use_native_dialog" default="false">
   * If `true`, and if supported by the current {@link DisplayServer}, OS native dialog will be used instead of custom one.
   * **Note:** On Android, it is only supported for Android 10+ devices and when using {@link ACCESS_FILESYSTEM}. For access mode {@link ACCESS_RESOURCES} and {@link ACCESS_USERDATA}, the system will fall back to custom FileDialog.
   * **Note:** On Linux and macOS, sandboxed apps always use native dialogs to access the host file system.
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use {@link OS.get_granted_permissions} to get a list of saved bookmarks.
   * **Note:** Native dialogs are isolated from the base process, file dialog properties can't be modified once the dialog is shown.
   * **Note:** This property is ignored in {@link EditorFileDialog}.
   */
  size: Vector2i;
  set_access(value: int): void;
  get_access(): int;
  set_current_dir(value: string | NodePath): void;
  get_current_dir(): string;
  set_current_file(value: string | NodePath): void;
  get_current_file(): string;
  set_current_path(value: string | NodePath): void;
  get_current_path(): string;
  set_file_mode(value: int): void;
  get_file_mode(): int;
  set_filename_filter(value: string | NodePath): void;
  get_filename_filter(): string;
  set_filters(value: PackedStringArray | Array<unknown>): void;
  get_filters(): PackedStringArray;
  set_mode_overrides_title(value: boolean): void;
  is_mode_overriding_title(): boolean;
  set_option_count(value: int): void;
  get_option_count(): int;
  set_root_subfolder(value: string | NodePath): void;
  get_root_subfolder(): string;
  set_show_hidden_files(value: boolean): void;
  is_showing_hidden_files(): boolean;

  /**
   * Adds a comma-separated file extension `filter` and comma-separated MIME type `mime_type` option to the {@link FileDialog} with an optional `description`, which restricts what files can be picked.
   * A `filter` should be of the form `"filename.extension"`, where filename and extension can be `*` to match any string. Filters starting with `.` (i.e. empty filenames) are not allowed.
   * For example, a `filter` of `"*.png, *.jpg"`, a `mime_type` of `image/png, image/jpeg`, and a `description` of `"Images"` results in filter text "Images (*.png, *.jpg)".
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   */
  add_filter(filter: string | NodePath, description?: string | NodePath, mime_type?: string | NodePath): void;
  /**
   * Adds an additional {@link OptionButton} to the file dialog. If `values` is empty, a {@link CheckBox} is added instead.
   * `default_value_index` should be an index of the value in the `values`. If `values` is empty it should be either `1` (checked), or `0` (unchecked).
   */
  add_option(name: string | NodePath, values: PackedStringArray | Array<unknown>, default_value_index: int): void;
  /** Clear the filter for file names. */
  clear_filename_filter(): void;
  /** Clear all the added filters in the dialog. */
  clear_filters(): void;
  /** Clear all currently selected items in the dialog. */
  deselect_all(): void;
  /**
   * Returns the list of favorite directories, which is shared by all {@link FileDialog} nodes. Useful to store the list of favorites between project sessions. This method can be called only from the main thread.
   */
  static get_favorite_list(): PackedStringArray;
  /**
   * Returns the LineEdit for the selected file.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_line_edit(): LineEdit;
  /**
   * Returns the default value index of the {@link OptionButton} or {@link CheckBox} with index `option`.
   */
  get_option_default(option: int): int;
  /** Returns the name of the {@link OptionButton} or {@link CheckBox} with index `option`. */
  get_option_name(option: int): string;
  /** Returns an array of values of the {@link OptionButton} with index `option`. */
  get_option_values(option: int): PackedStringArray;
  /**
   * Returns the list of recent directories, which is shared by all {@link FileDialog} nodes. Useful to store the list of recents between project sessions. This method can be called only from the main thread.
   */
  static get_recent_list(): PackedStringArray;
  /**
   * Returns a {@link Dictionary} with the selected values of the additional {@link OptionButton}s and/or {@link CheckBox}es. {@link Dictionary} keys are names and values are selected value indices.
   */
  get_selected_options(): Dictionary;
  /**
   * Returns the vertical box container of the dialog, custom controls can be added to it.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   * **Note:** Changes to this node are ignored by native file dialogs, use {@link add_option} to add custom elements to the dialog instead.
   */
  get_vbox(): VBoxContainer;
  /**
   * Invalidates and updates this dialog's content list.
   * **Note:** This method does nothing on native file dialogs.
   */
  invalidate(): void;
  /** Returns `true` if the provided `flag` is enabled. */
  is_customization_flag_enabled(flag: int): boolean;
  /**
   * Shows the {@link FileDialog} using the default size and position for file dialogs, and selects the file name if there is a current file.
   */
  popup_file_dialog(): void;
  /**
   * Sets the specified customization `flag`, allowing to customize the features available in this {@link FileDialog}.
   */
  set_customization_flag_enabled(flag: int, enabled: boolean): void;
  /**
   * Sets the list of favorite directories, which is shared by all {@link FileDialog} nodes. Useful to restore the list of favorites saved with {@link get_favorite_list}. This method can be called only from the main thread.
   * **Note:** {@link FileDialog} will update its internal {@link ItemList} of favorites when its visibility changes. Be sure to call this method earlier if you want your changes to have effect.
   */
  static set_favorite_list(favorites: PackedStringArray | Array<unknown>): void;
  /**
   * Sets the callback used by the {@link FileDialog} nodes to get a file icon, when {@link DISPLAY_LIST} mode is used. The callback should take a single {@link String} argument (file path), and return a {@link Texture2D}. If an invalid texture is returned, the  icon will be used instead.
   */
  static set_get_icon_callback(callback: Callable): void;
  /**
   * Sets the callback used by the {@link FileDialog} nodes to get a file icon, when {@link DISPLAY_THUMBNAILS} mode is used. The callback should take a single {@link String} argument (file path), and return a {@link Texture2D}. If an invalid texture is returned, the  icon will be used instead.
   * Thumbnails are usually more complex and may take a while to load. To avoid stalling the application, you can use {@link ImageTexture} to asynchronously create the thumbnail.
   */
  static set_get_thumbnail_callback(callback: Callable): void;
  /** Sets the default value index of the {@link OptionButton} or {@link CheckBox} with index `option`. */
  set_option_default(option: int, default_value_index: int): void;
  /** Sets the name of the {@link OptionButton} or {@link CheckBox} with index `option`. */
  set_option_name(option: int, name: string | NodePath): void;
  /** Sets the option values of the {@link OptionButton} with index `option`. */
  set_option_values(option: int, values: PackedStringArray | Array<unknown>): void;
  /**
   * Sets the list of recent directories, which is shared by all {@link FileDialog} nodes. Useful to restore the list of recents saved with {@link set_recent_list}. This method can be called only from the main thread.
   * **Note:** {@link FileDialog} will update its internal {@link ItemList} of recent directories when its visibility changes. Be sure to call this method earlier if you want your changes to have effect.
   */
  static set_recent_list(recents: PackedStringArray | Array<unknown>): void;

  /** Emitted when the user selects a directory. */
  dir_selected: Signal<[string]>;
  /** Emitted when the user selects a file by double-clicking it or pressing the **OK** button. */
  file_selected: Signal<[string]>;
  /** Emitted when the filter for file names changes. */
  filename_filter_changed: Signal<[string]>;
  /** Emitted when the user selects multiple files. */
  files_selected: Signal<[PackedStringArray]>;

  // enum FileMode
  /** The dialog allows selecting one, and only one file. */
  static readonly FILE_MODE_OPEN_FILE: int;
  /** The dialog allows selecting multiple files. */
  static readonly FILE_MODE_OPEN_FILES: int;
  /** The dialog only allows selecting a directory, disallowing the selection of any file. */
  static readonly FILE_MODE_OPEN_DIR: int;
  /** The dialog allows selecting one file or directory. */
  static readonly FILE_MODE_OPEN_ANY: int;
  /** The dialog will warn when a file exists. */
  static readonly FILE_MODE_SAVE_FILE: int;
  // enum Access
  /** The dialog only allows accessing files under the {@link Resource} path (`res://`). */
  static readonly ACCESS_RESOURCES: int;
  /** The dialog only allows accessing files under user data path (`user://`). */
  static readonly ACCESS_USERDATA: int;
  /** The dialog allows accessing files on the whole file system. */
  static readonly ACCESS_FILESYSTEM: int;
  // enum DisplayMode
  /** The dialog displays files as a grid of thumbnails. Use  to adjust their size. */
  static readonly DISPLAY_THUMBNAILS: int;
  /** The dialog displays files as a list of filenames. */
  static readonly DISPLAY_LIST: int;
  // enum Customization
  /**
   * Toggles visibility of the favorite button, and the favorite list on the left side of the dialog.
   * Equivalent to {@link hidden_files_toggle_enabled}.
   */
  static readonly CUSTOMIZATION_HIDDEN_FILES: int;
  /**
   * If enabled, shows the button for creating new directories (when using {@link FILE_MODE_OPEN_DIR}, {@link FILE_MODE_OPEN_ANY}, or {@link FILE_MODE_SAVE_FILE}).
   * Equivalent to {@link folder_creation_enabled}.
   */
  static readonly CUSTOMIZATION_CREATE_FOLDER: int;
  /**
   * If enabled, shows the toggle file filter button.
   * Equivalent to {@link file_filter_toggle_enabled}.
   */
  static readonly CUSTOMIZATION_FILE_FILTER: int;
  /**
   * If enabled, shows the file sorting options button.
   * Equivalent to {@link file_sort_options_enabled}.
   */
  static readonly CUSTOMIZATION_FILE_SORT: int;
  /**
   * If enabled, shows the toggle favorite button and favorite list on the left side of the dialog.
   * Equivalent to {@link favorites_enabled}.
   */
  static readonly CUSTOMIZATION_FAVORITES: int;
  /**
   * If enabled, shows the recent directories list on the left side of the dialog.
   * Equivalent to {@link recent_list_enabled}.
   */
  static readonly CUSTOMIZATION_RECENT: int;
  /**
   * If enabled, shows the layout switch buttons (list/thumbnails).
   * Equivalent to {@link layout_toggle_enabled}.
   */
  static readonly CUSTOMIZATION_LAYOUT: int;
  /**
   * If enabled, the {@link FileDialog} will warn the user before overwriting files in save mode.
   * Equivalent to {@link overwrite_warning_enabled}.
   */
  static readonly CUSTOMIZATION_OVERWRITE_WARNING: int;
  /**
   * If enabled, the context menu will show the "Delete" option, which allows moving files and folders to trash.
   * Equivalent to {@link deleting_enabled}.
   */
  static readonly CUSTOMIZATION_DELETE: int;
}
