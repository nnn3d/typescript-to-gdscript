// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Node that instances a {@link MultiMesh} in 2D. */
declare class MultiMeshInstance2D extends Node2D {
  /** The {@link MultiMesh} that will be drawn by the {@link MultiMeshInstance2D}. */
  multimesh: MultiMesh | null;
  /**
   * The {@link Texture2D} that will be used if using the default {@link CanvasItemMaterial}. Can be accessed as `TEXTURE` in CanvasItem shader.
   */
  texture: Texture2D | null;
  set_multimesh(value: MultiMesh | null): void;
  get_multimesh(): MultiMesh | null;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;

  /** Emitted when the {@link texture} is changed. */
  texture_changed: Signal<[]>;
}
