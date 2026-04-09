// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Identifies a supported export platform, and internally provides the functionality of exporting to that platform.
 */
declare class EditorExportPlatform extends RefCounted {
  /** Adds a message to the export log that will be displayed when exporting ends. */
  add_message(type_: int, category: string | NodePath, message: string | NodePath): void;
  /** Clears the export log. */
  clear_messages(): void;
  /** Create a new preset for this platform. */
  create_preset(): EditorExportPreset;
  /** Creates a PCK archive at `path` for the specified `preset`. */
  export_pack(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Creates a patch PCK archive at `path` for the specified `preset`, containing only the files that have changed since the last patch.
   * **Note:** `patches` is an optional override of the set of patches defined in the export preset. When empty the patches defined in the export preset will be used instead.
   */
  export_pack_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath, patches?: PackedStringArray | Array<unknown>, flags?: int): int;
  /** Creates a full project at `path` for the specified `preset`. */
  export_project(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Exports project files for the specified preset. This method can be used to implement custom export format, other than PCK and ZIP. One of the callbacks is called for each exported file.
   * `save_cb` is called for all exported files and have the following arguments: `file_path: String`, `file_data: PackedByteArray`, `file_index: int`, `file_count: int`, `encryption_include_filters: PackedStringArray`, `encryption_exclude_filters: PackedStringArray`, `encryption_key: PackedByteArray`.
   * `shared_cb` is called for exported native shared/static libraries and have the following arguments: `file_path: String`, `tags: PackedStringArray`, `target_folder: String`.
   * **Note:** `file_index` and `file_count` are intended for progress tracking only and aren't necessarily unique and precise.
   */
  export_project_files(preset: EditorExportPreset, debug: boolean, save_cb: Callable, shared_cb?: Callable): int;
  /** Create a ZIP archive at `path` for the specified `preset`. */
  export_zip(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Create a patch ZIP archive at `path` for the specified `preset`, containing only the files that have changed since the last patch.
   * **Note:** `patches` is an optional override of the set of patches defined in the export preset. When empty the patches defined in the export preset will be used instead.
   */
  export_zip_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath, patches?: PackedStringArray | Array<unknown>, flags?: int): int;
  /**
   * Locates export template for the platform, and returns {@link Dictionary} with the following keys: `path: String` and `error: String`. This method is provided for convenience and custom export platforms aren't required to use it or keep export templates stored in the same way official templates are.
   */
  find_export_template(template_file_name: string | NodePath): Dictionary;
  /**
   * Generates array of command line arguments for the default export templates for the debug flags and editor settings.
   */
  gen_export_flags(flags: int): PackedStringArray;
  /** Returns array of {@link EditorExportPreset}s for this platform. */
  get_current_presets(): Array<unknown>;
  /** Returns array of core file names that always should be exported regardless of preset config. */
  static get_forced_export_files(preset?: EditorExportPreset): PackedStringArray;
  /**
   * Returns additional files that should always be exported regardless of preset configuration, and are not part of the project source. The returned {@link Dictionary} contains filename keys ({@link String}) and their corresponding raw data ({@link PackedByteArray}).
   */
  get_internal_export_files(preset: EditorExportPreset, debug: boolean): Dictionary;
  /** Returns the message category for the message with the given `index`. */
  get_message_category(index: int): string;
  /** Returns the number of messages in the export log. */
  get_message_count(): int;
  /** Returns the text for the message with the given `index`. */
  get_message_text(index: int): string;
  /** Returns the type for the message with the given `index`. */
  get_message_type(index: int): int;
  /**
   * Returns the name of the export operating system handled by this {@link EditorExportPlatform} class, as a friendly string. Possible return values are `Windows`, `Linux`, `macOS`, `Android`, `iOS`, and `Web`.
   */
  get_os_name(): string;
  /** Returns most severe message type currently present in the export log. */
  get_worst_message_type(): int;
  /**
   * Saves PCK archive and returns {@link Dictionary} with the following keys: `result: Error`, `so_files: Array` (array of the shared/static objects which contains dictionaries with the following keys: `path: String`, `tags: PackedStringArray`, and `target_folder: String`).
   * If `embed` is `true`, PCK content is appended to the end of `path` file and return {@link Dictionary} additionally include following keys: `embedded_start: int` (embedded PCK offset) and `embedded_size: int` (embedded PCK size).
   */
  save_pack(preset: EditorExportPreset, debug: boolean, path: string | NodePath, embed?: boolean): Dictionary;
  /**
   * Saves patch PCK archive and returns {@link Dictionary} with the following keys: `result: Error`, `so_files: Array` (array of the shared/static objects which contains dictionaries with the following keys: `path: String`, `tags: PackedStringArray`, and `target_folder: String`).
   */
  save_pack_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath): Dictionary;
  /**
   * Saves ZIP archive and returns {@link Dictionary} with the following keys: `result: Error`, `so_files: Array` (array of the shared/static objects which contains dictionaries with the following keys: `path: String`, `tags: PackedStringArray`, and `target_folder: String`).
   */
  save_zip(preset: EditorExportPreset, debug: boolean, path: string | NodePath): Dictionary;
  /**
   * Saves patch ZIP archive and returns {@link Dictionary} with the following keys: `result: Error`, `so_files: Array` (array of the shared/static objects which contains dictionaries with the following keys: `path: String`, `tags: PackedStringArray`, and `target_folder: String`).
   */
  save_zip_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath): Dictionary;
  /** Uploads specified file over SCP protocol to the remote host. */
  ssh_push_to_remote(host: string | NodePath, port: string | NodePath, scp_args: PackedStringArray | Array<unknown>, src_file: string | NodePath, dst_file: string | NodePath): int;
  /**
   * Executes specified command on the remote host via SSH protocol and returns command output in the `output`.
   */
  ssh_run_on_remote(host: string | NodePath, port: string | NodePath, ssh_arg: PackedStringArray | Array<unknown>, cmd_args: string | NodePath, output?: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array, port_fwd?: int): int;
  /**
   * Executes specified command on the remote host via SSH protocol and returns process ID (on the remote host) without waiting for command to finish.
   */
  ssh_run_on_remote_no_wait(host: string | NodePath, port: string | NodePath, ssh_args: PackedStringArray | Array<unknown>, cmd_args: string | NodePath, port_fwd?: int): int;

  // enum ExportMessageType
  /** Invalid message type used as the default value when no type is specified. */
  static readonly EXPORT_MESSAGE_NONE: int;
  /** Message type for informational messages that have no effect on the export. */
  static readonly EXPORT_MESSAGE_INFO: int;
  /** Message type for warning messages that should be addressed but still allow to complete the export. */
  static readonly EXPORT_MESSAGE_WARNING: int;
  /** Message type for error messages that must be addressed and fail the export. */
  static readonly EXPORT_MESSAGE_ERROR: int;
  // enum DebugFlags
  /**
   * Flag is set if the remotely debugged project is expected to use the remote file system. If set, {@link gen_export_flags} will append `--remote-fs` and `--remote-fs-password` (if {@link EditorSettings.filesystem/file_server/password} is defined) command line arguments to the returned list.
   */
  static readonly DEBUG_FLAG_DUMB_CLIENT: int;
  /**
   * Flag is set if remote debug is enabled. If set, {@link gen_export_flags} will append `--remote-debug` and `--breakpoints` (if breakpoints are selected in the script editor or added by the plugin) command line arguments to the returned list.
   */
  static readonly DEBUG_FLAG_REMOTE_DEBUG: int;
  /**
   * Flag is set if remotely debugged project is running on the localhost. If set, {@link gen_export_flags} will use `localhost` instead of {@link EditorSettings.network/debug/remote_host} as remote debugger host.
   */
  static readonly DEBUG_FLAG_REMOTE_DEBUG_LOCALHOST: int;
  /**
   * Flag is set if the "Visible Collision Shapes" remote debug option is enabled. If set, {@link gen_export_flags} will append the `--debug-collisions` command line argument to the returned list.
   */
  static readonly DEBUG_FLAG_VIEW_COLLISIONS: int;
  /**
   * Flag is set if the "Visible Navigation" remote debug option is enabled. If set, {@link gen_export_flags} will append the `--debug-navigation` command line argument to the returned list.
   */
  static readonly DEBUG_FLAG_VIEW_NAVIGATION: int;
}
