// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Texture which displays the content of an external buffer. */
declare class ExternalTexture extends Texture2D {
  /**
   * <member name="size" type="Vector2" setter="set_size" getter="get_size" default="Vector2(256, 256)">
   * External texture size.
   */
  resource_local_to_scene: boolean;

  /**
   * Returns the external texture ID.
   * Depending on your use case, you may need to pass this to platform APIs, for example, when creating an `android.graphics.SurfaceTexture` on Android.
   */
  get_external_texture_id(): int;
  /**
   * Sets the external buffer ID.
   * Depending on your use case, you may need to call this with data received from a platform API, for example, `SurfaceTexture.getHardwareBuffer()` on Android.
   */
  set_external_buffer_id(external_buffer_id: int): void;
}
