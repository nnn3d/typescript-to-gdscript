// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node for inverse kinematics which may modify more than one bone. */
declare class IKModifier3D extends SkeletonModifier3D {
  /**
   * If `true`, the solver retrieves the bone axis from the bone pose every frame.
   * If `false`, the solver retrieves the bone axis from the bone rest and caches it, which increases performance slightly, but position changes in the bone pose made before processing this {@link IKModifier3D} are ignored.
   */
  mutable_bone_axes: boolean;
  set_mutable_bone_axes(value: boolean): void;
  are_bone_axes_mutable(): boolean;

  /** Clears all settings. */
  clear_settings(): void;
  /** Returns the number of settings. */
  get_setting_count(): int;
  /** Resets a state with respect to the current bone pose. */
  reset(): void;
  /** Sets the number of settings. */
  set_setting_count(count: int): void;
}
