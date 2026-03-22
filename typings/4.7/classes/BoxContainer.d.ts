// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A container that arranges its child controls horizontally or vertically. */
declare class BoxContainer extends Container {
  /**
   * The alignment of the container's children (must be one of {@link ALIGNMENT_BEGIN}, {@link ALIGNMENT_CENTER}, or {@link ALIGNMENT_END}).
   */
  alignment: int;
  /**
   * If `true`, the {@link BoxContainer} will arrange its children vertically, rather than horizontally.
   * Can't be changed when using {@link HBoxContainer} and {@link VBoxContainer}.
   */
  vertical: boolean;
  set_alignment(value: int): void;
  get_alignment(): int;
  set_vertical(value: boolean): void;
  is_vertical(): boolean;

  /**
   * Adds a {@link Control} node to the box as a spacer. If `begin` is `true`, it will insert the {@link Control} node in front of all other children.
   */
  add_spacer(begin: boolean): Control;

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
}
