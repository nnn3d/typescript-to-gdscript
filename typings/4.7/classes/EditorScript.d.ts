// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base script that can be used to add extension functions to the editor. */
declare class EditorScript extends RefCounted {
  /** This method is executed by the Editor when **File > Run** is used. */
  _run(): void;
  /**
   * Makes `node` root of the currently opened scene. Only works if the scene is empty. If the `node` is a scene instance, an inheriting scene will be created.
   */
  add_root_node(node: Node): void;
  /** Returns the {@link EditorInterface} singleton instance. */
  get_editor_interface(): EditorInterface;
  /**
   * Returns the edited (current) scene's root {@link Node}. Equivalent of {@link EditorInterface.get_edited_scene_root}.
   */
  get_scene(): Node;
}
