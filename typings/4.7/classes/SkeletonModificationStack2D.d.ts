// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A resource that holds a stack of {@link SkeletonModification2D}s. */
declare class SkeletonModificationStack2D extends Resource {
  /**
   * If `true`, the modification's in the stack will be called. This is handled automatically through the {@link Skeleton2D} node.
   */
  enabled: boolean;
  /** The number of modifications in the stack. */
  modification_count: int;
  /**
   * The interpolation strength of the modifications in stack. A value of `0` will make it where the modifications are not applied, a strength of `0.5` will be half applied, and a strength of `1` will allow the modifications to be fully applied and override the {@link Skeleton2D} {@link Bone2D} poses.
   */
  strength: float;

  /** Adds the passed-in {@link SkeletonModification2D} to the stack. */
  add_modification(modification: SkeletonModification2D): void;
  /** Deletes the {@link SkeletonModification2D} at the index position `mod_idx`, if it exists. */
  delete_modification(mod_idx: int): void;
  /** Enables all {@link SkeletonModification2D}s in the stack. */
  enable_all_modifications(enabled: boolean): void;
  /**
   * Executes all of the {@link SkeletonModification2D}s in the stack that use the same execution mode as the passed-in `execution_mode`, starting from index `0` to {@link modification_count}.
   * **Note:** The order of the modifications can matter depending on the modifications. For example, modifications on a spine should operate before modifications on the arms in order to get proper results.
   */
  execute(delta: float, execution_mode: int): void;
  /** Returns a boolean that indicates whether the modification stack is setup and can execute. */
  get_is_setup(): boolean;
  /** Returns the {@link SkeletonModification2D} at the passed-in index, `mod_idx`. */
  get_modification(mod_idx: int): SkeletonModification2D;
  /** Returns the {@link Skeleton2D} node that the SkeletonModificationStack2D is bound to. */
  get_skeleton(): Skeleton2D;
  /** Sets the modification at `mod_idx` to the passed-in modification, `modification`. */
  set_modification(mod_idx: int, modification: SkeletonModification2D): void;
  /**
   * Sets up the modification stack so it can execute. This function should be called by {@link Skeleton2D} and shouldn't be manually called unless you know what you are doing.
   */
  setup(): void;
}
