// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract base class for scrollbars. */
declare class ScrollBar extends Range {
  /**
   * Overrides the step used when clicking increment and decrement buttons or when using arrow keys when the {@link ScrollBar} is focused.
   */
  custom_step: float;
  focus_mode: int;
  step: float;

  /** Emitted when the scrollbar is being scrolled. */
  scrolling: Signal<[]>;
}
