// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Post-processes scenes after import. */
declare class EditorScenePostImport extends RefCounted {
  /** Called after the scene was imported. This method must return the modified version of the scene. */
  _post_import(scene: Node): GodotObject;
  /** Returns the source file path which got imported (e.g. `res://scene.dae`). */
  get_source_file(): string;
}
