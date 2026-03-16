// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for resource importers. */
declare class ResourceImporter extends RefCounted {
  /**
   * Called when the engine compilation profile editor wants to check what build options an imported resource needs. For example, {@link ResourceImporterDynamicFont} has a property called {@link ResourceImporterDynamicFont.multichannel_signed_distance_field}, that depends on the engine to be build with the "msdfgen" module. If that resource happened to be a custom one, it would be handled like this:
   */
  _get_build_dependencies(path: string): PackedStringArray;

  // enum ImportOrder
  /** The default import order. */
  static readonly IMPORT_ORDER_DEFAULT: int;
  /**
   * The import order for scenes, which ensures scenes are imported *after* all other core resources such as textures. Custom importers should generally have an import order lower than `100` to avoid issues when importing scenes that rely on custom resources.
   */
  static readonly IMPORT_ORDER_SCENE: int;
}
