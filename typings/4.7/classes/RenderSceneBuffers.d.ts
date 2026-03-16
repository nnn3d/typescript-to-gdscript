// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract scene buffers object, created for each viewport for which 3D rendering is done. */
declare class RenderSceneBuffers extends RefCounted {
  /**
   * This method is called by the rendering server when the associated viewport's configuration is changed. It will discard the old buffers and recreate the internal buffers used.
   */
  configure(config: RenderSceneBuffersConfiguration): void;
}
