// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Texture provided by a {@link CameraFeed}. */
declare class CameraTexture extends Texture2D {
  /** The ID of the {@link CameraFeed} for which we want to display the image. */
  camera_feed_id: int;
  /** Convenience property that gives access to the active property of the {@link CameraFeed}. */
  camera_is_active: boolean;
  /**
   * <member name="which_feed" type="int" setter="set_which_feed" getter="get_which_feed" enum="CameraServer.FeedImage" default="0">
   * Which image within the {@link CameraFeed} we want access to, important if the camera image is split in a Y and CbCr component.
   */
  resource_local_to_scene: boolean;
}
