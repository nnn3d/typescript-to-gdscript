// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for custom {@link EditorExportPlatform} implementations (plugins). */
declare class EditorExportPlatformExtension extends EditorExportPlatform {
  /**
   * Returns `true` if the specified `preset` is valid and can be exported. Use {@link set_config_error} and {@link set_config_missing_templates} to set error details.
   * Usual implementations call {@link _has_valid_export_configuration} and {@link _has_valid_project_configuration} to determine if exporting is possible.
   */
  _can_export(preset: EditorExportPreset, debug: boolean): boolean;
  /** Called by the editor before platform is unregistered. */
  _cleanup(): void;
  /**
   * Creates a PCK archive at `path` for the specified `preset`.
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" disabled, and PCK is selected as a file type.
   */
  _export_pack(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Creates a patch PCK archive at `path` for the specified `preset`, containing only the files that have changed since the last patch.
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" enabled, and PCK is selected as a file type.
   * **Note:** The patches provided in `patches` have already been loaded when this method is called and are merely provided as context. When empty the patches defined in the export preset have been loaded instead.
   */
  _export_pack_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath, patches: PackedStringArray | Array<unknown>, flags: int): int;
  /**
   * Creates a full project at `path` for the specified `preset`.
   * This method is called when "Export" button is pressed in the export dialog.
   * This method implementation can call {@link EditorExportPlatform.save_pack} or {@link EditorExportPlatform.save_zip} to use default PCK/ZIP export process, or calls {@link EditorExportPlatform.export_project_files} and implement custom callback for processing each exported file.
   */
  _export_project(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Create a ZIP archive at `path` for the specified `preset`.
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" disabled, and ZIP is selected as a file type.
   */
  _export_zip(preset: EditorExportPreset, debug: boolean, path: string | NodePath, flags: int): int;
  /**
   * Create a ZIP archive at `path` for the specified `preset`, containing only the files that have changed since the last patch.
   * This method is called when "Export PCK/ZIP" button is pressed in the export dialog, with "Export as Patch" enabled, and ZIP is selected as a file type.
   * **Note:** The patches provided in `patches` have already been loaded when this method is called and are merely provided as context. When empty the patches defined in the export preset have been loaded instead.
   */
  _export_zip_patch(preset: EditorExportPreset, debug: boolean, path: string | NodePath, patches: PackedStringArray | Array<unknown>, flags: int): int;
  /** Returns array of supported binary extensions for the full project export. */
  _get_binary_extensions(preset: EditorExportPreset): PackedStringArray;
  /** Returns protocol used for remote debugging. Default implementation return `tcp://`. */
  _get_debug_protocol(): string;
  /** Returns device architecture for one-click deploy. */
  _get_device_architecture(device: int): string;
  /**
   * Validates `option` and returns visibility for the specified `preset`. Default implementation return `true` for all options.
   */
  _get_export_option_visibility(preset: EditorExportPreset, option: string | NodePath): boolean;
  /**
   * Validates `option` and returns warning message for the specified `preset`. Default implementation return empty string for all options.
   */
  _get_export_option_warning(preset: EditorExportPreset, option: string): string;
  /**
   * Returns a property list, as an {@link Array} of dictionaries. Each {@link Dictionary} must at least contain the `name: StringName` and `type: Variant.Type` entries.
   * Additionally, the following keys are supported:
   * - `hint: PropertyHint`
   * - `hint_string: String`
   * - `usage: PropertyUsageFlags`
   * - `class_name: StringName`
   * - `default_value: Variant`, default value of the property.
   * - `update_visibility: bool`, if set to `true`, {@link _get_export_option_visibility} is called for each property when this property is changed.
   * - `required: bool`, if set to `true`, this property warnings are critical, and should be resolved to make export possible. This value is a hint for the {@link _has_valid_export_configuration} implementation, and not used by the engine directly.
   * See also {@link Object._get_property_list}.
   */
  _get_export_options(): Array<Dictionary>;
  /**
   * Returns the platform logo displayed in the export dialog. The logo should be 32×32 pixels, adjusted for the current editor scale (see {@link EditorInterface.get_editor_scale}).
   */
  _get_logo(): Texture2D | null;
  /** Returns export platform name. */
  _get_name(): string;
  /**
   * Returns the item icon for the specified `device` in the one-click deploy menu. The icon should be 16×16 pixels, adjusted for the current editor scale (see {@link EditorInterface.get_editor_scale}).
   */
  _get_option_icon(device: int): Texture2D | null;
  /** Returns one-click deploy menu item label for the specified `device`. */
  _get_option_label(device: int): string;
  /** Returns one-click deploy menu item tooltip for the specified `device`. */
  _get_option_tooltip(device: int): string;
  /** Returns the number of devices (or other options) available in the one-click deploy menu. */
  _get_options_count(): int;
  /** Returns tooltip of the one-click deploy menu button. */
  _get_options_tooltip(): string;
  /** Returns target OS name. */
  _get_os_name(): string;
  /** Returns array of platform specific features. */
  _get_platform_features(): PackedStringArray;
  /** Returns array of platform specific features for the specified `preset`. */
  _get_preset_features(preset: EditorExportPreset): PackedStringArray;
  /**
   * Returns the icon of the one-click deploy menu button. The icon should be 16×16 pixels, adjusted for the current editor scale (see {@link EditorInterface.get_editor_scale}).
   */
  _get_run_icon(): Texture2D | null;
  /** Returns `true` if export configuration is valid. */
  _has_valid_export_configuration(preset: EditorExportPreset, debug: boolean): boolean;
  /** Returns `true` if project configuration is valid. */
  _has_valid_project_configuration(preset: EditorExportPreset): boolean;
  /** Initializes the plugin. Called by the editor when platform is registered. */
  _initialize(): void;
  /**
   * Returns `true` if specified file is a valid executable (native executable or script) for the target platform.
   */
  _is_executable(path: string | NodePath): boolean;
  /** Returns `true` if one-click deploy options are changed and editor interface should be updated. */
  _poll_export(): boolean;
  /**
   * This method is called when `device` one-click deploy menu option is selected.
   * Implementation should export project to a temporary location, upload and run it on the specific `device`, or perform another action associated with the menu item.
   */
  _run(preset: EditorExportPreset, device: int, debug_flags: int): int;
  /** Returns `true` if export options list is changed and presets should be updated. */
  _should_update_export_options(): boolean;
  /**
   * Returns current configuration error message text. This method should be called only from the {@link _can_export}, {@link _has_valid_export_configuration}, or {@link _has_valid_project_configuration} implementations.
   */
  get_config_error(): string;
  /**
   * Returns `true` is export templates are missing from the current configuration. This method should be called only from the {@link _can_export}, {@link _has_valid_export_configuration}, or {@link _has_valid_project_configuration} implementations.
   */
  get_config_missing_templates(): boolean;
  /**
   * Sets current configuration error message text. This method should be called only from the {@link _can_export}, {@link _has_valid_export_configuration}, or {@link _has_valid_project_configuration} implementations.
   */
  set_config_error(error_text: string | NodePath): void;
  /**
   * Set to `true` is export templates are missing from the current configuration. This method should be called only from the {@link _can_export}, {@link _has_valid_export_configuration}, or {@link _has_valid_project_configuration} implementations.
   */
  set_config_missing_templates(missing_templates: boolean): void;
}
