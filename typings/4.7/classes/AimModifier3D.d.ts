// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** The {@link AimModifier3D} rotates a bone to look at a reference bone. */
declare class AimModifier3D<Tree extends object = any> extends BoneConstraint3D<Tree> {
  /** The number of settings in the modifier. */
  setting_count: int;

  /** Returns the forward axis of the bone. */
  get_forward_axis(index: int): int;
  /** Returns the axis of the first rotation. It is enabled only if {@link is_using_euler} is `true`. */
  get_primary_rotation_axis(index: int): int;
  /** Returns `true` if the relative option is enabled in the setting at `index`. */
  is_relative(index: int): boolean;
  /** Returns `true` if it provides rotation with using euler. */
  is_using_euler(index: int): boolean;
  /**
   * Returns `true` if it provides rotation by two axes. It is enabled only if {@link is_using_euler} is `true`.
   */
  is_using_secondary_rotation(index: int): boolean;
  /** Sets the forward axis of the bone. */
  set_forward_axis(index: int, axis: int): void;
  /** Sets the axis of the first rotation. It is enabled only if {@link is_using_euler} is `true`. */
  set_primary_rotation_axis(index: int, axis: int): void;
  /**
   * Sets relative option in the setting at `index` to `enabled`.
   * If sets `enabled` to `true`, the rotation is applied relative to the pose.
   * If sets `enabled` to `false`, the rotation is applied relative to the rest. It means to replace the current pose with the {@link AimModifier3D}'s result.
   */
  set_relative(index: int, enabled: boolean): void;
  /**
   * If sets `enabled` to `true`, it provides rotation with using euler.
   * If sets `enabled` to `false`, it provides rotation with using rotation by arc generated from the forward axis vector and the vector toward the reference.
   */
  set_use_euler(index: int, enabled: boolean): void;
  /**
   * If sets `enabled` to `true`, it provides rotation by two axes. It is enabled only if {@link is_using_euler} is `true`.
   */
  set_use_secondary_rotation(index: int, enabled: boolean): void;
}
