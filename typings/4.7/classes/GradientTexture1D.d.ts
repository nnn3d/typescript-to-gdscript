// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 1D texture that uses colors obtained from a {@link Gradient}. */
declare class GradientTexture1D extends Texture2D {
  /** The {@link Gradient} used to fill the texture. */
  gradient: Gradient;
  /**
   * <member name="use_hdr" type="bool" setter="set_use_hdr" getter="is_using_hdr" default="false">
   * If `true`, the generated texture will support high dynamic range ({@link Image.FORMAT_RGBAF} format). This allows for glow effects to work if {@link Environment.glow_enabled} is `true`. If `false`, the generated texture will use low dynamic range; overbright colors will be clamped ({@link Image.FORMAT_RGBA8} format).
   */
  resource_local_to_scene: boolean;
  /** The number of color samples that will be obtained from the {@link Gradient}. */
  width: int;
}
