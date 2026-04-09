// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** This class allows for a RenderData implementation to be made in GDExtension. */
declare class RenderDataExtension extends RenderData {
  /**
   * Implement this in GDExtension to return the {@link RID} for the implementation's camera attributes object.
   */
  _get_camera_attributes(): RID;
  /** Implement this in GDExtension to return the {@link RID} of the implementation's environment object. */
  _get_environment(): RID;
  /** Implement this in GDExtension to return the implementation's {@link RenderSceneBuffers} object. */
  _get_render_scene_buffers(): RenderSceneBuffers | null;
  /**
   * Implement this in GDExtension to return the implementation's {@link RenderSceneDataExtension} object.
   */
  _get_render_scene_data(): RenderSceneData | null;
}
