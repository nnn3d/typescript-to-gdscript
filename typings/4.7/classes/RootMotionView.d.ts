// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Editor-only helper for setting up root motion in {@link AnimationMixer}. */
declare class RootMotionView extends VisualInstance3D {
  /** Path to an {@link AnimationMixer} node to use as a basis for root motion. */
  animation_path: string;
  /** The grid's cell size in 3D units. */
  cell_size: float;
  /** The grid's color. */
  color: Color;
  /**
   * The grid's radius in 3D units. The grid's opacity will fade gradually as the distance from the origin increases until this {@link radius} is reached.
   */
  radius: float;
  /**
   * If `true`, the grid's points will all be on the same Y coordinate (*local* Y = 0). If `false`, the points' original Y coordinate is preserved.
   */
  zero_y: boolean;
}
