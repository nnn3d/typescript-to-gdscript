// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A 2D texture that creates a pattern with colors obtained from a {@link Gradient}. */
declare class GradientTexture2D extends Texture2D {
  /** The gradient's fill type. */
  fill: int;
  /** The initial offset used to fill the texture specified in UV coordinates. */
  fill_from: Vector2;
  /** The final offset used to fill the texture specified in UV coordinates. */
  fill_to: Vector2;
  /** The {@link Gradient} used to fill the texture. */
  gradient: Gradient | null;
  /**
   * The number of vertical color samples that will be obtained from the {@link Gradient}, which also represents the texture's height.
   */
  height: int;
  /** The gradient's repeat type. */
  repeat: int;
  /**
   * <member name="use_hdr" type="bool" setter="set_use_hdr" getter="is_using_hdr" default="false">
   * If `true`, the generated texture will support high dynamic range ({@link Image.FORMAT_RGBAF} format). This allows for glow effects to work if {@link Environment.glow_enabled} is `true`. If `false`, the generated texture will use low dynamic range; overbright colors will be clamped ({@link Image.FORMAT_RGBA8} format).
   */
  resource_local_to_scene: boolean;
  /**
   * The number of horizontal color samples that will be obtained from the {@link Gradient}, which also represents the texture's width.
   */
  width: int;
  set_fill(value: int): void;
  get_fill(): int;
  set_fill_from(value: Vector2 | Vector2i): void;
  get_fill_from(): Vector2;
  set_fill_to(value: Vector2 | Vector2i): void;
  get_fill_to(): Vector2;
  set_gradient(value: Gradient | null): void;
  get_gradient(): Gradient | null;
  set_height(value: int): void;
  set_repeat(value: int): void;
  get_repeat(): int;
  set_width(value: int): void;

  // enum Fill
  /** The colors are linearly interpolated in a straight line. */
  static readonly FILL_LINEAR: int;
  /** The colors are linearly interpolated in a circular pattern. */
  static readonly FILL_RADIAL: int;
  /** The colors are linearly interpolated in a square pattern. */
  static readonly FILL_SQUARE: int;
  /** The colors are linearly interpolated in a cone pattern. */
  static readonly FILL_CONIC: int;
  // enum Repeat
  /**
   * The gradient fill is restricted to the range defined by {@link fill_from} to {@link fill_to} offsets.
   */
  static readonly REPEAT_NONE: int;
  /**
   * The texture is filled starting from {@link fill_from} to {@link fill_to} offsets, repeating the same pattern in both directions.
   */
  static readonly REPEAT: int;
  /**
   * The texture is filled starting from {@link fill_from} to {@link fill_to} offsets, mirroring the pattern in both directions.
   */
  static readonly REPEAT_MIRROR: int;
}
