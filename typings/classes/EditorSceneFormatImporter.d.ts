// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Imports scenes from third-parties' 3D files. */
declare class EditorSceneFormatImporter extends RefCounted {
  /** Return supported file extensions for this scene importer. */
  _get_extensions(): PackedStringArray;
  /**
   * Override to add general import options. These will appear in the main import dock on the editor. Add options via {@link add_import_option} and {@link add_import_option_advanced}.
   * **Note:** All {@link EditorSceneFormatImporter} and {@link EditorScenePostImportPlugin} instances will add options for all files. It is good practice to check the file extension when `path` is non-empty.
   * When the user is editing project settings, `path` will be empty. It is recommended to add all options when `path` is empty to allow the user to customize Import Defaults.
   */
  _get_import_options(path: string | NodePath): void;
  /**
   * Should return `true` to show the given option, `false` to hide the given option, or `null` to ignore.
   */
  _get_option_visibility(path: string | NodePath, for_animation: boolean, option: string | NodePath): unknown;
  /**
   * Perform the bulk of the scene import logic here, for example using {@link GLTFDocument} or {@link FBXDocument}.
   */
  _import_scene(path: string | NodePath, flags: int, options: Dictionary): GodotObject | null;
  /**
   * Add a specific import option (name and default value only). This function can only be called from {@link _get_import_options}.
   */
  add_import_option(name: string | NodePath, value: unknown): void;
  /** Add a specific import option. This function can only be called from {@link _get_import_options}. */
  add_import_option_advanced(type_: int, name: string | NodePath, default_value: unknown, hint: int, hint_string?: string | NodePath, usage_flags?: int): void;

  static readonly IMPORT_SCENE: int;
  static readonly IMPORT_ANIMATION: int;
  static readonly IMPORT_FAIL_ON_MISSING_DEPENDENCIES: int;
  static readonly IMPORT_GENERATE_TANGENT_ARRAYS: int;
  static readonly IMPORT_USE_NAMED_SKIN_BINDS: int;
  static readonly IMPORT_DISCARD_MESHES_AND_MATERIALS: int;
  static readonly IMPORT_FORCE_DISABLE_MESH_COMPRESSION: int;
}
