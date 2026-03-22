// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A control used for visual representation of a percentage. */
declare class ProgressBar extends Range {
  /** If `false`, the {@link indeterminate} animation will be paused in the editor. */
  editor_preview_indeterminate: boolean;
  /** The fill direction. See {@link FillMode} for possible values. */
  fill_mode: int;
  /**
   * When set to `true`, the progress bar indicates that something is happening with an animation, but does not show the fill percentage or value.
   */
  indeterminate: boolean;
  /** If `true`, the fill percentage is displayed on the bar. */
  show_percentage: boolean;
  set_editor_preview_indeterminate(value: boolean): void;
  is_editor_preview_indeterminate_enabled(): boolean;
  set_fill_mode(value: int): void;
  get_fill_mode(): int;
  set_indeterminate(value: boolean): void;
  is_indeterminate(): boolean;
  set_show_percentage(value: boolean): void;
  is_percentage_shown(): boolean;

  // enum FillMode
  /**
   * The progress bar fills from begin to end horizontally, according to the language direction. If {@link Control.is_layout_rtl} returns `false`, it fills from left to right, and if it returns `true`, it fills from right to left.
   */
  static readonly FILL_BEGIN_TO_END: int;
  /**
   * The progress bar fills from end to begin horizontally, according to the language direction. If {@link Control.is_layout_rtl} returns `false`, it fills from right to left, and if it returns `true`, it fills from left to right.
   */
  static readonly FILL_END_TO_BEGIN: int;
  /** The progress fills from top to bottom. */
  static readonly FILL_TOP_TO_BOTTOM: int;
  /** The progress fills from bottom to top. */
  static readonly FILL_BOTTOM_TO_TOP: int;
}
