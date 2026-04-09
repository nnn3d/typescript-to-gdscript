// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Manages the SceneTree selection in the editor. */
declare class EditorSelection extends GodotObject {
  /**
   * Adds a node to the selection.
   * **Note:** The newly selected node will not be automatically edited in the inspector. If you want to edit a node, use {@link EditorInterface.edit_node}.
   */
  add_node(node: Node): void;
  /** Clear the selection. */
  clear(): void;
  /** Returns the list of selected nodes. */
  get_selected_nodes(): Array<Node>;
  /**
   * Returns the list of top selected nodes only, excluding any children. This is useful for performing transform operations (moving them, rotating, etc.).
   * For example, if there is a node A with a child B and a sibling C, then selecting all three will cause this method to return only A and C. Changing the global transform of A will affect the global transform of B, so there is no need to change B separately.
   */
  get_top_selected_nodes(): Array<Node>;
  /**
   * Returns the list of top selected nodes only, excluding any children. This is useful for performing transform operations (moving them, rotating, etc.). See {@link get_top_selected_nodes}.
   */
  get_transformable_selected_nodes(): Array<Node>;
  /** Removes a node from the selection. */
  remove_node(node: Node): void;

  /** Emitted when the selection changes. */
  selection_changed: Signal<[]>;
}
