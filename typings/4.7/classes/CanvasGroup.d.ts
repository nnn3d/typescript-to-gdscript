// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Merges several 2D nodes into a single draw operation. */
declare class CanvasGroup extends Node2D {
  /**
   * Sets the size of the margin used to expand the clearing rect of this {@link CanvasGroup}. This expands the area of the backbuffer that will be used by the {@link CanvasGroup}. A smaller margin will reduce the area of the backbuffer used which can increase performance, however if {@link use_mipmaps} is enabled, a small margin may result in mipmap errors at the edge of the {@link CanvasGroup}. Accordingly, this should be left as small as possible, but should be increased if artifacts appear along the edges of the canvas group.
   */
  clear_margin: float;
  /**
   * Sets the size of a margin used to expand the drawable rect of this {@link CanvasGroup}. The size of the {@link CanvasGroup} is determined by fitting a rect around its children then expanding that rect by {@link fit_margin}. This increases both the backbuffer area used and the area covered by the {@link CanvasGroup} both of which can reduce performance. This should be kept as small as possible and should only be expanded when an increased size is needed (e.g. for custom shader effects).
   */
  fit_margin: float;
  /**
   * If `true`, calculates mipmaps for the backbuffer before drawing the {@link CanvasGroup} so that mipmaps can be used in a custom {@link ShaderMaterial} attached to the {@link CanvasGroup}. Generating mipmaps has a performance cost so this should not be enabled unless required.
   */
  use_mipmaps: boolean;
  set_clear_margin(value: float): void;
  get_clear_margin(): float;
  set_fit_margin(value: float): void;
  get_fit_margin(): float;
  set_use_mipmaps(value: boolean): void;
  is_using_mipmaps(): boolean;
}
