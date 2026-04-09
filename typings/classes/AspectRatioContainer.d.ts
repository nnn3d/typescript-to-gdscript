// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A container that preserves the proportions of its child controls. */
declare class AspectRatioContainer extends Container {
  /** Specifies the horizontal relative position of child controls. */
  alignment_horizontal: int;
  /** Specifies the vertical relative position of child controls. */
  alignment_vertical: int;
  /**
   * The aspect ratio to enforce on child controls. This is the width divided by the height. The ratio depends on the {@link stretch_mode}.
   */
  ratio: float;
  /** The stretch mode used to align child controls. */
  stretch_mode: int;
  set_alignment_horizontal(value: int): void;
  get_alignment_horizontal(): int;
  set_alignment_vertical(value: int): void;
  get_alignment_vertical(): int;
  set_ratio(value: float): void;
  get_ratio(): float;
  set_stretch_mode(value: int): void;
  get_stretch_mode(): int;

  // enum StretchMode
  /** The height of child controls is automatically adjusted based on the width of the container. */
  static readonly STRETCH_WIDTH_CONTROLS_HEIGHT: int;
  /** The width of child controls is automatically adjusted based on the height of the container. */
  static readonly STRETCH_HEIGHT_CONTROLS_WIDTH: int;
  /**
   * The bounding rectangle of child controls is automatically adjusted to fit inside the container while keeping the aspect ratio.
   */
  static readonly STRETCH_FIT: int;
  /**
   * The width and height of child controls is automatically adjusted to make their bounding rectangle cover the entire area of the container while keeping the aspect ratio.
   * When the bounding rectangle of child controls exceed the container's size and {@link Control.clip_contents} is enabled, this allows to show only the container's area restricted by its own bounding rectangle.
   */
  static readonly STRETCH_COVER: int;
  // enum AlignmentMode
  /** Aligns child controls with the beginning (left or top) of the container. */
  static readonly ALIGNMENT_BEGIN: int;
  /** Aligns child controls with the center of the container. */
  static readonly ALIGNMENT_CENTER: int;
  /** Aligns child controls with the end (right or bottom) of the container. */
  static readonly ALIGNMENT_END: int;
}
