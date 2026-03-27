// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides the content of a {@link Viewport} as a dynamic texture. */
declare class ViewportTexture extends Texture2D {
  /**
   * The path to the {@link Viewport} node to display. This is relative to the local scene root (see {@link Resource.get_local_scene}), **not** to the nodes that use this texture.
   * **Note:** In the editor, this path is automatically updated when the target viewport or one of its ancestors is renamed or moved. At runtime, this path may not automatically update if the scene root cannot be found.
   */
  viewport_path: string;
  set_viewport_path_in_scene(value: string): void;
  get_viewport_path_in_scene(): string;
}
