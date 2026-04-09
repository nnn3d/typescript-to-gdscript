// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A rectangular region of 2D space that detects whether it is visible on screen. */
declare class VisibleOnScreenNotifier2D extends Node2D {
  /** The VisibleOnScreenNotifier2D's bounding rectangle. */
  rect: Rect2;
  /**
   * If `true`, shows the rectangle area of {@link rect} in the editor with a translucent magenta fill. Unlike changing the visibility of the VisibleOnScreenNotifier2D, this does not affect the screen culling detection.
   */
  show_rect: boolean;
  set_rect(value: Rect2): void;
  get_rect(): Rect2;
  set_show_rect(value: boolean): void;
  is_showing_rect(): boolean;

  /**
   * If `true`, the bounding rectangle is on the screen.
   * **Note:** It takes one frame for the {@link VisibleOnScreenNotifier2D}'s visibility to be determined once added to the scene tree, so this method will always return `false` right after it is instantiated, before the draw pass.
   */
  is_on_screen(): boolean;

  /** Emitted when the VisibleOnScreenNotifier2D enters the screen. */
  screen_entered: Signal<[]>;
  /** Emitted when the VisibleOnScreenNotifier2D exits the screen. */
  screen_exited: Signal<[]>;
}
