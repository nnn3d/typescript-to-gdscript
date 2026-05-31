// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A container that arranges its child controls horizontally or vertically and wraps them around at the borders.
 */
declare class FlowContainer extends Container {
  /**
   * The alignment of the container's children (must be one of {@link ALIGNMENT_BEGIN}, {@link ALIGNMENT_CENTER}, or {@link ALIGNMENT_END}).
   */
  alignment: int;
  /**
   * The wrap behavior of the last, partially filled row or column (must be one of {@link LAST_WRAP_ALIGNMENT_INHERIT}, {@link LAST_WRAP_ALIGNMENT_BEGIN}, {@link LAST_WRAP_ALIGNMENT_CENTER}, or {@link LAST_WRAP_ALIGNMENT_END}).
   */
  last_wrap_alignment: int;
  /**
   * If `true`, reverses fill direction. Horizontal {@link FlowContainer}s will fill rows bottom to top, vertical {@link FlowContainer}s will fill columns right to left.
   * When using a vertical {@link FlowContainer} with a right to left {@link Control.layout_direction}, columns will fill left to right instead.
   */
  reverse_fill: boolean;
  /**
   * If `true`, the {@link FlowContainer} will arrange its children vertically, rather than horizontally.
   * Can't be changed when using {@link HFlowContainer} and {@link VFlowContainer}.
   */
  vertical: boolean;
  set_alignment(value: int): void;
  get_alignment(): int;
  set_last_wrap_alignment(value: int): void;
  get_last_wrap_alignment(): int;
  set_reverse_fill(value: boolean): void;
  is_reverse_fill(): boolean;
  set_vertical(value: boolean): void;
  is_vertical(): boolean;

  /** Returns the current line count. */
  get_line_count(): int;

  // enum AlignmentMode
  /**
   * The child controls will be arranged at the beginning of the container, i.e. top if orientation is vertical, left if orientation is horizontal (right for RTL layout).
   */
  static readonly ALIGNMENT_BEGIN: int;
  /** The child controls will be centered in the container. */
  static readonly ALIGNMENT_CENTER: int;
  /**
   * The child controls will be arranged at the end of the container, i.e. bottom if orientation is vertical, right if orientation is horizontal (left for RTL layout).
   */
  static readonly ALIGNMENT_END: int;
  // enum LastWrapAlignmentMode
  /**
   * The last partially filled row or column will wrap aligned to the previous row or column in accordance with {@link alignment}.
   */
  static readonly LAST_WRAP_ALIGNMENT_INHERIT: int;
  /**
   * The last partially filled row or column will wrap aligned to the beginning of the previous row or column.
   */
  static readonly LAST_WRAP_ALIGNMENT_BEGIN: int;
  /**
   * The last partially filled row or column will wrap aligned to the center of the previous row or column.
   */
  static readonly LAST_WRAP_ALIGNMENT_CENTER: int;
  /** The last partially filled row or column will wrap aligned to the end of the previous row or column. */
  static readonly LAST_WRAP_ALIGNMENT_END: int;
}
