// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Node used for displaying a {@link Mesh} in 2D. */
declare class MeshInstance2D extends Node2D {
  /** The {@link Mesh} that will be drawn by the {@link MeshInstance2D}. */
  mesh: Mesh | null;
  /**
   * The {@link Texture2D} that will be used if using the default {@link CanvasItemMaterial}. Can be accessed as `TEXTURE` in CanvasItem shader.
   */
  texture: Texture2D | null;
  set_mesh(value: Mesh | null): void;
  get_mesh(): Mesh | null;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;

  /** Emitted when the {@link texture} is changed. */
  texture_changed: Signal<[]>;
}
