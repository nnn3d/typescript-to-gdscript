// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Internal database of built in shader include files. */
declare class ShaderIncludeDB extends GodotObject {
  /**
   * Returns the code for the built-in shader fragment. You can also access this in your shader code through `#include "filename"`.
   */
  static get_built_in_include_file(filename: string | NodePath): string;
  /** Returns `true` if an include file with this name exists. */
  static has_built_in_include_file(filename: string | NodePath): boolean;
  /** Returns a list of built-in include files that are currently registered. */
  static list_built_in_include_files(): PackedStringArray;
}
