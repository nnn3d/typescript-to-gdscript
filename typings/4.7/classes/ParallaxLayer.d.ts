// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A parallax scrolling layer to be used with {@link ParallaxBackground}. */
declare class ParallaxLayer<Tree extends object = any> extends Node2D<Tree> {
  /**
   * The interval, in pixels, at which the {@link ParallaxLayer} is drawn repeatedly. Useful for creating an infinitely scrolling background. If an axis is set to `0`, the {@link ParallaxLayer} will be drawn only once along that direction.
   * **Note:** If you want the repetition to pixel-perfect match a {@link Texture2D} displayed by a child node, you should account for any scale applied to the texture when defining this interval. For example, if you use a child {@link Sprite2D} scaled to `0.5` to display a 600x600 texture, and want this sprite to be repeated continuously horizontally, you should set the mirroring to `Vector2(300, 0)`.
   * **Note:** If the length of the viewport axis is bigger than twice the repeated axis size, it will not repeat infinitely, as the parallax layer only draws 2 instances of the layer at any given time. The visibility window is calculated from the parent {@link ParallaxBackground}'s position, not the layer's own position. So, if you use mirroring, **do not** change the {@link ParallaxLayer} position relative to its parent. Instead, if you need to adjust the background's position, set the {@link CanvasLayer.offset} property in the parent {@link ParallaxBackground}.
   * **Note:** Despite the name, the layer will not be mirrored, it will only be repeated.
   */
  motion_mirroring: Vector2;
  /**
   * The ParallaxLayer's offset relative to the parent ParallaxBackground's {@link ParallaxBackground.scroll_offset}.
   */
  motion_offset: Vector2;
  /** Multiplies the ParallaxLayer's motion. If an axis is set to `0`, it will not scroll. */
  motion_scale: Vector2;
  physics_interpolation_mode: int;
  set_mirroring(value: Vector2): void;
  get_mirroring(): Vector2;
  set_motion_offset(value: Vector2): void;
  get_motion_offset(): Vector2;
  set_motion_scale(value: Vector2): void;
  get_motion_scale(): Vector2;
}
