// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Limit bone rotation angular velocity. */
declare class LimitAngularVelocityModifier3D extends SkeletonModifier3D {
  /** The number of chains. */
  chain_count: int;
  /**
   * If `true`, the modifier processes bones not included in the bone list.
   * If `false`, the bones processed by the modifier are equal to the bone list.
   */
  exclude: boolean;
  /** The number of joints in the list which created by chains dynamically. */
  joint_count: int;
  /** The maximum angular velocity per second. */
  max_angular_velocity: float;
  set_chain_count(value: int): void;
  get_chain_count(): int;
  set_exclude(value: boolean): void;
  is_exclude(): boolean;
  _get_joint_count(): int;
  set_max_angular_velocity(value: float): void;
  get_max_angular_velocity(): float;

  /** Clear all chains. */
  clear_chains(): void;
  /** Returns the end bone index of the bone chain. */
  get_end_bone(index: int): int;
  /** Returns the end bone name of the bone chain. */
  get_end_bone_name(index: int): string;
  /** Returns the root bone index of the bone chain. */
  get_root_bone(index: int): int;
  /** Returns the root bone name of the bone chain. */
  get_root_bone_name(index: int): string;
  /**
   * Sets the reference pose for angle comparison to the current pose with the influence of constraints removed. This function is automatically triggered when joints change or upon activation.
   */
  reset(): void;
  /** Sets the end bone index of the bone chain. */
  set_end_bone(index: int, bone: int): void;
  /**
   * Sets the end bone name of the bone chain.
   * **Note:** End bone must be the root bone or a child of the root bone.
   */
  set_end_bone_name(index: int, bone_name: string): void;
  /** Sets the root bone index of the bone chain. */
  set_root_bone(index: int, bone: int): void;
  /** Sets the root bone name of the bone chain. */
  set_root_bone_name(index: int, bone_name: string): void;
}
