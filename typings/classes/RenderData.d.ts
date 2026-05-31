// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract render data object, holds frame data related to rendering a single frame of a viewport. */
declare class RenderData extends GodotObject {
  /**
   * Returns the {@link RID} of the camera attributes object in the {@link RenderingServer} being used to render this viewport.
   */
  get_camera_attributes(): RID;
  /**
   * Returns the {@link RID} of the environment object in the {@link RenderingServer} being used to render this viewport.
   */
  get_environment(): RID;
  /**
   * Returns the {@link RenderSceneBuffers} object managing the scene buffers for rendering this viewport.
   */
  get_render_scene_buffers(): RenderSceneBuffers | null;
  /** Returns the {@link RenderSceneData} object managing this frames scene data. */
  get_render_scene_data(): RenderSceneData | null;
}
