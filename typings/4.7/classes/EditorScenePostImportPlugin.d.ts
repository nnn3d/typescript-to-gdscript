// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Plugin to control and modifying the process of importing a scene. */
declare class EditorScenePostImportPlugin extends RefCounted {
  /**
   * Override to add general import options. These will appear in the main import dock on the editor. Add options via {@link add_import_option} and {@link add_import_option_advanced}.
   */
  _get_import_options(path: string): void;
  /**
   * Override to add internal import options. These will appear in the 3D scene import dialog. Add options via {@link add_import_option} and {@link add_import_option_advanced}.
   */
  _get_internal_import_options(category: int): void;
  /**
   * Should return `true` if the 3D view of the import dialog needs to update when changing the given option.
   */
  _get_internal_option_update_view_required(category: int, option: string): unknown;
  /**
   * Should return `true` to show the given option, `false` to hide the given option, or `null` to ignore.
   */
  _get_internal_option_visibility(category: int, for_animation: boolean, option: string): unknown;
  /**
   * Should return `true` to show the given option, `false` to hide the given option, or `null` to ignore.
   */
  _get_option_visibility(path: string, for_animation: boolean, option: string): unknown;
  /** Process a specific node or resource for a given category. */
  _internal_process(category: int, base_node: Node, node: Node, resource: Resource): void;
  /** Post-process the scene. This function is called after the final scene has been configured. */
  _post_process(scene: Node): void;
  /**
   * Pre-process the scene. This function is called right after the scene format loader loaded the scene and no changes have been made.
   * Pre-process may be used to adjust internal import options in the `"nodes"`, `"meshes"`, `"animations"` or `"materials"` keys inside `get_option_value("_subresources")`.
   */
  _pre_process(scene: Node): void;
  /**
   * Add a specific import option (name and default value only). This function can only be called from {@link _get_import_options} and {@link _get_internal_import_options}.
   */
  add_import_option(name: string, value: unknown): void;
  /**
   * Add a specific import option. This function can only be called from {@link _get_import_options} and {@link _get_internal_import_options}.
   */
  add_import_option_advanced(type_: int, name: string, default_value: unknown, hint: int, hint_string?: string, usage_flags?: int): void;
  /**
   * Query the value of an option. This function can only be called from those querying visibility, or processing.
   */
  get_option_value(name: string): unknown;

  // enum InternalImportCategory
  static readonly INTERNAL_IMPORT_CATEGORY_NODE: int;
  static readonly INTERNAL_IMPORT_CATEGORY_MESH_3D_NODE: int;
  static readonly INTERNAL_IMPORT_CATEGORY_MESH: int;
  static readonly INTERNAL_IMPORT_CATEGORY_MATERIAL: int;
  static readonly INTERNAL_IMPORT_CATEGORY_ANIMATION: int;
  static readonly INTERNAL_IMPORT_CATEGORY_ANIMATION_NODE: int;
  static readonly INTERNAL_IMPORT_CATEGORY_SKELETON_3D_NODE: int;
  static readonly INTERNAL_IMPORT_CATEGORY_MAX: int;
}
