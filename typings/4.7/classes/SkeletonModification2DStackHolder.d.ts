// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A modification that holds and executes a {@link SkeletonModificationStack2D}. */
declare class SkeletonModification2DStackHolder extends SkeletonModification2D {
  /** Returns the {@link SkeletonModificationStack2D} that this modification is holding. */
  get_held_modification_stack(): SkeletonModificationStack2D;
  /**
   * Sets the {@link SkeletonModificationStack2D} that this modification is holding. This modification stack will then be executed when this modification is executed.
   */
  set_held_modification_stack(held_modification_stack: SkeletonModificationStack2D): void;
}
