// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract render data object, holds scene data related to rendering a single frame of a viewport. */
declare class RenderSceneData extends GodotObject {
  /**
   * Returns the camera projection used to render this frame.
   * **Note:** If more than one view is rendered, this will return a combined projection.
   */
  get_cam_projection(): Projection;
  /**
   * Returns the camera transform used to render this frame.
   * **Note:** If more than one view is rendered, this will return a centered transform.
   */
  get_cam_transform(): Transform3D;
  /** Return the {@link RID} of the uniform buffer containing the scene data as a UBO. */
  get_uniform_buffer(): RID;
  /** Returns the number of views being rendered. */
  get_view_count(): int;
  /**
   * Returns the eye offset per view used to render this frame. This is the offset between our camera transform and the eye transform.
   */
  get_view_eye_offset(view: int): Vector3;
  /**
   * Returns the view projection per view used to render this frame.
   * **Note:** If a single view is rendered, this returns the camera projection. If more than one view is rendered, this will return a projection for the given view including the eye offset.
   */
  get_view_projection(view: int): Projection;
}
