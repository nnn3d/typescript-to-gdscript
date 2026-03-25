// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A control that displays a texture by keeping its corners intact, but tiling its edges and center. */
declare class NinePatchRect<Tree extends object = any> extends Control<Tree> {
  /** The stretch mode to use for horizontal stretching/tiling. */
  axis_stretch_horizontal: int;
  /** The stretch mode to use for vertical stretching/tiling. */
  axis_stretch_vertical: int;
  /** If `true`, draw the panel's center. Else, only draw the 9-slice's borders. */
  draw_center: boolean;
  /**
   * <member name="patch_margin_bottom" type="int" setter="set_patch_margin" getter="get_patch_margin" default="0">
   * The height of the 9-slice's bottom row. A margin of 16 means the 9-slice's bottom corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders.
   */
  mouse_filter: int;
  /**
   * The width of the 9-slice's left column. A margin of 16 means the 9-slice's left corners and side will have a width of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders.
   */
  patch_margin_left: int;
  /**
   * The width of the 9-slice's right column. A margin of 16 means the 9-slice's right corners and side will have a width of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders.
   */
  patch_margin_right: int;
  /**
   * The height of the 9-slice's top row. A margin of 16 means the 9-slice's top corners and side will have a height of 16 pixels. You can set all 4 margin values individually to create panels with non-uniform borders.
   */
  patch_margin_top: int;
  /**
   * Rectangular region of the texture to sample from. If you're working with an atlas, use this property to define the area the 9-slice should use. All other properties are relative to this one. If the rect is empty, NinePatchRect will use the whole texture.
   */
  region_rect: Rect2;
  /** The node's texture resource. */
  texture: Texture2D;
  set_h_axis_stretch_mode(value: int): void;
  get_h_axis_stretch_mode(): int;
  set_v_axis_stretch_mode(value: int): void;
  get_v_axis_stretch_mode(): int;
  set_draw_center(value: boolean): void;
  is_draw_center_enabled(): boolean;
  set_region_rect(value: Rect2): void;
  get_region_rect(): Rect2;
  set_texture(value: Texture2D): void;
  get_texture(): Texture2D;

  /** Returns the size of the margin on the specified {@link Side}. */
  get_patch_margin(margin: int): int;
  /** Sets the size of the margin on the specified {@link Side} to `value` pixels. */
  set_patch_margin(margin: int, value: int): void;

  /** Emitted when the node's texture changes. */
  texture_changed: Signal<[]>;

  // enum AxisStretchMode
  /** Stretches the center texture across the NinePatchRect. This may cause the texture to be distorted. */
  static readonly AXIS_STRETCH_MODE_STRETCH: int;
  /**
   * Repeats the center texture across the NinePatchRect. This won't cause any visible distortion. The texture must be seamless for this to work without displaying artifacts between edges.
   */
  static readonly AXIS_STRETCH_MODE_TILE: int;
  /**
   * Repeats the center texture across the NinePatchRect, but will also stretch the texture to make sure each tile is visible in full. This may cause the texture to be distorted, but less than {@link AXIS_STRETCH_MODE_STRETCH}. The texture must be seamless for this to work without displaying artifacts between edges.
   */
  static readonly AXIS_STRETCH_MODE_TILE_FIT: int;
}
