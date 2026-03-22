// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for resources that operate on {@link Bone2D}s in a {@link Skeleton2D}. */
declare class SkeletonModification2D extends Resource {
  /**
   * If `true`, the modification's {@link _execute} function will be called by the {@link SkeletonModificationStack2D}.
   */
  enabled: boolean;
  /**
   * The execution mode for the modification. This tells the modification stack when to execute the modification. Some modifications have settings that are only available in certain execution modes.
   */
  execution_mode: int;
  set_enabled(value: boolean): void;
  get_enabled(): boolean;
  set_execution_mode(value: int): void;
  get_execution_mode(): int;

  /**
   * Used for drawing **editor-only** modification gizmos. This function will only be called in the Godot editor and can be overridden to draw custom gizmos.
   * **Note:** You will need to use the Skeleton2D from {@link SkeletonModificationStack2D.get_skeleton} and it's draw functions, as the {@link SkeletonModification2D} resource cannot draw on its own.
   */
  _draw_editor_gizmo(): void;
  /**
   * Executes the given modification. This is where the modification performs whatever function it is designed to do.
   */
  _execute(delta: float): void;
  /** Called when the modification is setup. This is where the modification performs initialization. */
  _setup_modification(modification_stack: SkeletonModificationStack2D): void;
  /**
   * Takes an angle and clamps it so it is within the passed-in `min` and `max` range. `invert` will inversely clamp the angle, clamping it to the range outside of the given bounds.
   */
  clamp_angle(angle: float, min: float, max: float, invert: boolean): float;
  /**
   * Returns whether this modification will call {@link _draw_editor_gizmo} in the Godot editor to draw modification-specific gizmos.
   */
  get_editor_draw_gizmo(): boolean;
  /** Returns whether this modification has been successfully setup or not. */
  get_is_setup(): boolean;
  /**
   * Returns the {@link SkeletonModificationStack2D} that this modification is bound to. Through the modification stack, you can access the Skeleton2D the modification is operating on.
   */
  get_modification_stack(): SkeletonModificationStack2D;
  /**
   * Sets whether this modification will call {@link _draw_editor_gizmo} in the Godot editor to draw modification-specific gizmos.
   */
  set_editor_draw_gizmo(draw_gizmo: boolean): void;
  /**
   * Manually allows you to set the setup state of the modification. This function should only rarely be used, as the {@link SkeletonModificationStack2D} the modification is bound to should handle setting the modification up.
   */
  set_is_setup(is_setup: boolean): void;
}
