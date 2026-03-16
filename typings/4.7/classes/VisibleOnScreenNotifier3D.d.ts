// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A box-shaped region of 3D space that detects whether it is visible on screen. */
declare class VisibleOnScreenNotifier3D extends VisualInstance3D {
  /** The {@link VisibleOnScreenNotifier3D}'s bounding box. */
  aabb: AABB;

  /**
   * Returns `true` if the bounding box is on the screen.
   * **Note:** It takes one frame for the {@link VisibleOnScreenNotifier3D}'s visibility to be assessed once added to the scene tree, so this method will always return `false` right after it is instantiated.
   */
  is_on_screen(): boolean;

  /** Emitted when the {@link VisibleOnScreenNotifier3D} enters the screen. */
  screen_entered: Signal<[]>;
  /** Emitted when the {@link VisibleOnScreenNotifier3D} exits the screen. */
  screen_exited: Signal<[]>;
}
