// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Export preset configuration. */
declare class EditorExportPreset extends RefCounted {
  /** Returns `true` if the "Advanced" toggle is enabled in the export dialog. */
  are_advanced_options_enabled(): boolean;
  /**
   * Returns a comma-separated list of custom features added to this preset, as a string. See Feature tags ($DOCS_URL/tutorials/export/feature_tags.html) in the documentation for more information.
   */
  get_custom_features(): string;
  /**
   * Returns a dictionary of files selected in the "Resources" tab of the export dialog. The dictionary's keys are file paths, and its values are the corresponding export modes: `"strip"`, `"keep"`, or `"remove"`. See also {@link get_file_export_mode}.
   */
  get_customized_files(): Dictionary;
  /** Returns the number of files selected in the "Resources" tab of the export dialog. */
  get_customized_files_count(): int;
  /** Returns `true` if PCK directory encryption is enabled in the export dialog. */
  get_encrypt_directory(): boolean;
  /** Returns `true` if PCK encryption is enabled in the export dialog. */
  get_encrypt_pck(): boolean;
  /** Returns file filters to exclude during PCK encryption. */
  get_encryption_ex_filter(): string;
  /** Returns file filters to include during PCK encryption. */
  get_encryption_in_filter(): string;
  /** Returns PCK encryption key. */
  get_encryption_key(): string;
  /** Returns file filters to exclude during export. */
  get_exclude_filter(): string;
  /** Returns export file filter mode selected in the "Resources" tab of the export dialog. */
  get_export_filter(): int;
  /** Returns export target path. */
  get_export_path(): string;
  /** Returns file export mode for the specified file. */
  get_file_export_mode(path: string | NodePath, default_: int): int;
  /** Returns array of files to export. */
  get_files_to_export(): PackedStringArray;
  /** Returns file filters to include during export. */
  get_include_filter(): string;
  /** Returns export option value or value of environment variable if it is set. */
  get_or_env(name: string, env_var: string | NodePath): unknown;
  /** Returns the list of packs on which to base a patch export on. */
  get_patches(): PackedStringArray;
  /** Returns this export preset's name. */
  get_preset_name(): string;
  /**
   * Returns the value of the setting identified by `name` using export preset feature tag overrides instead of current OS features.
   */
  get_project_setting(name: string): unknown;
  /**
   * Returns the export mode used by GDScript files. `0` for "Text", `1` for "Binary tokens", and `2` for "Compressed binary tokens (smaller files)".
   */
  get_script_export_mode(): int;
  /**
   * Returns the preset's version number, or fall back to the {@link ProjectSettings.application/config/version} project setting if set to an empty string.
   * If `windows_version` is `true`, formats the returned version number to be compatible with Windows executable metadata.
   */
  get_version(name: string, windows_version: boolean): string;
  /** Returns `true` if the preset has the property named `property`. */
  has(property: string): boolean;
  /** Returns `true` if the file at the specified `path` will be exported. */
  has_export_file(path: string | NodePath): boolean;
  /** Returns `true` if the dedicated server export mode is selected in the export dialog. */
  is_dedicated_server(): boolean;
  /** Returns `true` if the "Runnable" toggle is enabled in the export dialog. */
  is_runnable(): boolean;

  // enum ExportFilter
  static readonly EXPORT_ALL_RESOURCES: int;
  static readonly EXPORT_SELECTED_SCENES: int;
  static readonly EXPORT_SELECTED_RESOURCES: int;
  static readonly EXCLUDE_SELECTED_RESOURCES: int;
  static readonly EXPORT_CUSTOMIZED: int;
  // enum FileExportMode
  static readonly MODE_FILE_NOT_CUSTOMIZED: int;
  static readonly MODE_FILE_STRIP: int;
  static readonly MODE_FILE_KEEP: int;
  static readonly MODE_FILE_REMOVE: int;
  // enum ScriptExportMode
  static readonly MODE_SCRIPT_TEXT: int;
  static readonly MODE_SCRIPT_BINARY_TOKENS: int;
  static readonly MODE_SCRIPT_BINARY_TOKENS_COMPRESSED: int;
}
