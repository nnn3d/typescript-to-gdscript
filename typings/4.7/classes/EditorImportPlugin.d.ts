// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Registers a custom resource importer in the editor. Use the class to parse any file and import it as a new resource type.
 */
declare class EditorImportPlugin extends ResourceImporter {
  /**
   * Tells whether this importer can be run in parallel on threads, or, on the contrary, it's only safe for the editor to call it from the main thread, for one file at a time.
   * If this importer's implementation is thread-safe and can be run in parallel, override this with `true` to optimize for concurrency.
   * If not overridden, returns `false`.
   */
  _can_import_threaded(): boolean;
  /**
   * Gets the format version of this importer. Increment this version when making incompatible changes to the format of the imported resources.
   * If not overridden, the format version is `0`.
   */
  _get_format_version(): int;
  /**
   * Gets the options and default values for the preset at this index. Returns an Array of Dictionaries with the following keys: `name`, `default_value`, `property_hint` (optional), `hint_string` (optional), `usage` (optional).
   */
  _get_import_options(path: string, preset_index: int): Dictionary;
  /**
   * Gets the order of this importer to be run when importing resources. Importers with *lower* import orders will be called first, and higher values will be called later. Use this to ensure the importer runs after the dependencies are already imported. The default import order is `0` unless overridden by a specific importer. See {@link ResourceImporter.ImportOrder} for some predefined values.
   */
  _get_import_order(): int;
  /** Gets the unique name of the importer. */
  _get_importer_name(): string;
  /**
   * Gets whether the import option specified by `option_name` should be visible in the Import dock. The default implementation always returns `true`, making all options visible. This is mainly useful for hiding options that depend on others if one of them is disabled.
   */
  _get_option_visibility(path: string, option_name: string, options: Dictionary): boolean;
  /**
   * Gets the number of initial presets defined by the plugin. Use {@link _get_import_options} to get the default options for the preset and {@link _get_preset_name} to get the name of the preset.
   * By default, there are no presets.
   */
  _get_preset_count(): int;
  /** Gets the name of the options preset at this index. */
  _get_preset_name(preset_index: int): string;
  /**
   * Gets the priority of this plugin for the recognized extension. Higher priority plugins will be preferred. The default priority is `1.0`.
   */
  _get_priority(): float;
  /** Gets the list of file extensions to associate with this loader (case-insensitive). e.g. `["obj"]`. */
  _get_recognized_extensions(): PackedStringArray;
  /** Gets the Godot resource type associated with this loader. e.g. `"Mesh"` or `"Animation"`. */
  _get_resource_type(): string;
  /**
   * Gets the extension used to save this resource in the `.godot/imported` directory (see {@link ProjectSettings.application/config/use_hidden_project_data_directory}).
   */
  _get_save_extension(): string;
  /**
   * Gets the name to display in the import window. You should choose this name as a continuation to "Import as", e.g. "Import as Special Mesh".
   */
  _get_visible_name(): string;
  /**
   * Imports `source_file` with the import `options` specified. Should return {@link @GlobalScope.OK} if the import is successful, other values indicate failure.
   * The imported resource is expected to be saved to `save_path + "." + _get_save_extension()`. If a different variant is preferred for a feature tag ($DOCS_URL/tutorials/export/feature_tags.html), save the variant to `save_path + "." + tag + "." + _get_save_extension()` and add the feature tag to `platform_variants`.
   * If additional resource files are generated in the resource filesystem (`res://`), add their full path to `gen_files` so that the editor knows they depend on `source_file`.
   * This method must be overridden to do the actual importing work. See this class' description for an example of overriding this method.
   */
  _import(source_file: string, save_path: string, options: Dictionary, platform_variants: unknown, gen_files: unknown): int;
  /**
   * This function can only be called during the {@link _import} callback and it allows manually importing resources from it. This is useful when the imported file generates external resources that require importing (as example, images). Custom parameters for the ".import" file can be passed via the `custom_options`. Additionally, in cases where multiple importers can handle a file, the `custom_importer` can be specified to force a specific one. This function performs a resource import and returns immediately with a success or error code. `generator_parameters` defines optional extra metadata which will be stored as [code skip-lint]generator_parameters[/code] in the `remap` section of the `.import` file, for example to store a md5 hash of the source data.
   */
  append_import_external_resource(path: string, custom_options?: Dictionary, custom_importer?: string, generator_parameters?: unknown): int;
}
