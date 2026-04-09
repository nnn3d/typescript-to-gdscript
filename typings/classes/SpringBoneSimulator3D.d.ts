// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link SkeletonModifier3D} to apply inertial wavering to bone chains. */
declare class SpringBoneSimulator3D extends SkeletonModifier3D {
  /**
   * The constant force that always affected bones. It is equal to the result when the parent {@link Skeleton3D} moves at this speed in the opposite direction.
   * This is useful for effects such as wind and anti-gravity.
   */
  external_force: Vector3;
  /**
   * If `true`, the solver retrieves the bone axis from the bone pose every frame.
   * If `false`, the solver retrieves the bone axis from the bone rest and caches it, which increases performance slightly, but position changes in the bone pose made before processing this {@link SpringBoneSimulator3D} are ignored.
   */
  mutable_bone_axes: boolean;
  /** The number of settings. */
  setting_count: int;
  set_external_force(value: Vector3): void;
  get_external_force(): Vector3;
  set_mutable_bone_axes(value: boolean): void;
  are_bone_axes_mutable(): boolean;
  set_setting_count(value: int): void;
  get_setting_count(): int;

  /**
   * Returns `true` if all child {@link SpringBoneCollision3D}s are contained in the collision list at `index` in the settings.
   */
  are_all_child_collisions_enabled(index: int): boolean;
  /**
   * Clears all collisions from the collision list at `index` in the settings when {@link are_all_child_collisions_enabled} is `false`.
   */
  clear_collisions(index: int): void;
  /**
   * Clears all exclude collisions from the collision list at `index` in the settings when {@link are_all_child_collisions_enabled} is `true`.
   */
  clear_exclude_collisions(index: int): void;
  /** Clears all settings. */
  clear_settings(): void;
  /** Returns the center bone index of the bone chain. */
  get_center_bone(index: int): int;
  /** Returns the center bone name of the bone chain. */
  get_center_bone_name(index: int): string;
  /** Returns what the center originates from in the bone chain. */
  get_center_from(index: int): int;
  /** Returns the center node path of the bone chain. */
  get_center_node(index: int): string;
  /**
   * Returns the collision count of the bone chain's collision list when {@link are_all_child_collisions_enabled} is `false`.
   */
  get_collision_count(index: int): int;
  /**
   * Returns the node path of the {@link SpringBoneCollision3D} at `collision` in the bone chain's collision list when {@link are_all_child_collisions_enabled} is `false`.
   */
  get_collision_path(index: int, collision: int): string;
  /** Returns the drag force damping curve of the bone chain. */
  get_drag(index: int): float;
  /** Returns the drag force damping curve of the bone chain. */
  get_drag_damping_curve(index: int): Curve | null;
  /** Returns the end bone index of the bone chain. */
  get_end_bone(index: int): int;
  /**
   * Returns the tail direction of the end bone of the bone chain when {@link is_end_bone_extended} is `true`.
   */
  get_end_bone_direction(index: int): int;
  /** Returns the end bone tail length of the bone chain when {@link is_end_bone_extended} is `true`. */
  get_end_bone_length(index: int): float;
  /** Returns the end bone name of the bone chain. */
  get_end_bone_name(index: int): string;
  /**
   * Returns the exclude collision count of the bone chain's exclude collision list when {@link are_all_child_collisions_enabled} is `true`.
   */
  get_exclude_collision_count(index: int): int;
  /**
   * Returns the node path of the {@link SpringBoneCollision3D} at `collision` in the bone chain's exclude collision list when {@link are_all_child_collisions_enabled} is `true`.
   */
  get_exclude_collision_path(index: int, collision: int): string;
  /** Returns the gravity amount of the bone chain. */
  get_gravity(index: int): float;
  /** Returns the gravity amount damping curve of the bone chain. */
  get_gravity_damping_curve(index: int): Curve | null;
  /** Returns the gravity direction of the bone chain. */
  get_gravity_direction(index: int): Vector3;
  /** Returns the bone index at `joint` in the bone chain's joint list. */
  get_joint_bone(index: int, joint: int): int;
  /** Returns the bone name at `joint` in the bone chain's joint list. */
  get_joint_bone_name(index: int, joint: int): string;
  /** Returns the joint count of the bone chain's joint list. */
  get_joint_count(index: int): int;
  /** Returns the drag force at `joint` in the bone chain's joint list. */
  get_joint_drag(index: int, joint: int): float;
  /** Returns the gravity amount at `joint` in the bone chain's joint list. */
  get_joint_gravity(index: int, joint: int): float;
  /** Returns the gravity direction at `joint` in the bone chain's joint list. */
  get_joint_gravity_direction(index: int, joint: int): Vector3;
  /** Returns the radius at `joint` in the bone chain's joint list. */
  get_joint_radius(index: int, joint: int): float;
  /** Returns the rotation axis at `joint` in the bone chain's joint list. */
  get_joint_rotation_axis(index: int, joint: int): int;
  /**
   * Returns the rotation axis vector for the specified joint in the bone chain. This vector represents the axis around which the joint can rotate. It is determined based on the rotation axis set for the joint.
   * If {@link get_joint_rotation_axis} is {@link SkeletonModifier3D.ROTATION_AXIS_ALL}, this method returns `Vector3(0, 0, 0)`.
   */
  get_joint_rotation_axis_vector(index: int, joint: int): Vector3;
  /** Returns the stiffness force at `joint` in the bone chain's joint list. */
  get_joint_stiffness(index: int, joint: int): float;
  /** Returns the joint radius of the bone chain. */
  get_radius(index: int): float;
  /** Returns the joint radius damping curve of the bone chain. */
  get_radius_damping_curve(index: int): Curve | null;
  /** Returns the root bone index of the bone chain. */
  get_root_bone(index: int): int;
  /** Returns the root bone name of the bone chain. */
  get_root_bone_name(index: int): string;
  /** Returns the rotation axis of the bone chain. */
  get_rotation_axis(index: int): int;
  /**
   * Returns the rotation axis vector of the bone chain. This vector represents the axis around which the bone chain can rotate. It is determined based on the rotation axis set for the bone chain.
   * If {@link get_rotation_axis} is {@link SkeletonModifier3D.ROTATION_AXIS_ALL}, this method returns `Vector3(0, 0, 0)`.
   */
  get_rotation_axis_vector(index: int): Vector3;
  /** Returns the stiffness force of the bone chain. */
  get_stiffness(index: int): float;
  /** Returns the stiffness force damping curve of the bone chain. */
  get_stiffness_damping_curve(index: int): Curve | null;
  /** Returns `true` if the config can be edited individually for each joint. */
  is_config_individual(index: int): boolean;
  /** Returns `true` if the end bone is extended to have a tail. */
  is_end_bone_extended(index: int): boolean;
  /**
   * Resets a simulating state with respect to the current bone pose.
   * It is useful to prevent the simulation result getting violent. For example, calling this immediately after a call to {@link AnimationPlayer.play} without a fading, or within the previous {@link SkeletonModifier3D.modification_processed} signal if it's condition changes significantly.
   */
  reset(): void;
  /** Sets the center bone index of the bone chain. */
  set_center_bone(index: int, bone: int): void;
  /** Sets the center bone name of the bone chain. */
  set_center_bone_name(index: int, bone_name: string): void;
  /**
   * Sets what the center originates from in the bone chain.
   * Bone movement is calculated based on the difference in relative distance between center and bone in the previous and next frames.
   * For example, if the parent {@link Skeleton3D} is used as the center, the bones are considered to have not moved if the {@link Skeleton3D} moves in the world.
   * In this case, only a change in the bone pose is considered to be a bone movement.
   */
  set_center_from(index: int, center_from: int): void;
  /** Sets the center node path of the bone chain. */
  set_center_node(index: int, node_path: string): void;
  /**
   * Sets the number of collisions in the collision list at `index` in the settings when {@link are_all_child_collisions_enabled} is `false`.
   */
  set_collision_count(index: int, count: int): void;
  /**
   * Sets the node path of the {@link SpringBoneCollision3D} at `collision` in the bone chain's collision list when {@link are_all_child_collisions_enabled} is `false`.
   */
  set_collision_path(index: int, collision: int, node_path: string): void;
  /**
   * Sets the drag force of the bone chain. The greater the value, the more suppressed the wiggling.
   * The value is scaled by {@link set_drag_damping_curve} and cached in each joint setting in the joint list.
   */
  set_drag(index: int, drag: float): void;
  /** Sets the drag force damping curve of the bone chain. */
  set_drag_damping_curve(index: int, curve: Curve): void;
  /**
   * If `enabled` is `true`, all child {@link SpringBoneCollision3D}s are colliding and {@link set_exclude_collision_path} is enabled as an exclusion list at `index` in the settings.
   * If `enabled` is `false`, you need to manually register all valid collisions with {@link set_collision_path}.
   */
  set_enable_all_child_collisions(index: int, enabled: boolean): void;
  /** Sets the end bone index of the bone chain. */
  set_end_bone(index: int, bone: int): void;
  /** Sets the end bone tail direction of the bone chain when {@link is_end_bone_extended} is `true`. */
  set_end_bone_direction(index: int, bone_direction: int): void;
  /** Sets the end bone tail length of the bone chain when {@link is_end_bone_extended} is `true`. */
  set_end_bone_length(index: int, length: float): void;
  /**
   * Sets the end bone name of the bone chain.
   * **Note:** End bone must be the root bone or a child of the root bone. If they are the same, the tail must be extended by {@link set_extend_end_bone} to jiggle the bone.
   */
  set_end_bone_name(index: int, bone_name: string): void;
  /**
   * Sets the number of exclude collisions in the exclude collision list at `index` in the settings when {@link are_all_child_collisions_enabled} is `true`.
   */
  set_exclude_collision_count(index: int, count: int): void;
  /**
   * Sets the node path of the {@link SpringBoneCollision3D} at `collision` in the bone chain's exclude collision list when {@link are_all_child_collisions_enabled} is `true`.
   */
  set_exclude_collision_path(index: int, collision: int, node_path: string): void;
  /**
   * If `enabled` is `true`, the end bone is extended to have a tail.
   * The extended tail config is allocated to the last element in the joint list. In other words, if you set `enabled` to `false`, the config of the last element in the joint list has no effect in the simulated result.
   */
  set_extend_end_bone(index: int, enabled: boolean): void;
  /**
   * Sets the gravity amount of the bone chain. This value is not an acceleration, but a constant velocity of movement in {@link set_gravity_direction}.
   * If `gravity` is not `0`, the modified pose will not return to the original pose since it is always affected by gravity.
   * The value is scaled by {@link set_gravity_damping_curve} and cached in each joint setting in the joint list.
   */
  set_gravity(index: int, gravity: float): void;
  /** Sets the gravity amount damping curve of the bone chain. */
  set_gravity_damping_curve(index: int, curve: Curve): void;
  /**
   * Sets the gravity direction of the bone chain. This value is internally normalized and then multiplied by {@link set_gravity}.
   * The value is cached in each joint setting in the joint list.
   */
  set_gravity_direction(index: int, gravity_direction: Vector3): void;
  /** If `enabled` is `true`, the config can be edited individually for each joint. */
  set_individual_config(index: int, enabled: boolean): void;
  /**
   * Sets the drag force at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   */
  set_joint_drag(index: int, joint: int, drag: float): void;
  /**
   * Sets the gravity amount at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   */
  set_joint_gravity(index: int, joint: int, gravity: float): void;
  /**
   * Sets the gravity direction at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   */
  set_joint_gravity_direction(index: int, joint: int, gravity_direction: Vector3): void;
  /**
   * Sets the joint radius at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   */
  set_joint_radius(index: int, joint: int, radius: float): void;
  /**
   * Sets the rotation axis at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   * The axes are based on the {@link Skeleton3D.get_bone_rest}'s space, if `axis` is {@link SkeletonModifier3D.ROTATION_AXIS_CUSTOM}, you can specify any axis.
   * **Note:** The rotation axis and the forward vector shouldn't be colinear to avoid unintended rotation since {@link SpringBoneSimulator3D} does not factor in twisting forces.
   */
  set_joint_rotation_axis(index: int, joint: int, axis: int): void;
  /**
   * Sets the rotation axis vector for the specified joint in the bone chain.
   * This vector is normalized by an internal process and represents the axis around which the bone chain can rotate.
   * If the vector length is `0`, it is considered synonymous with {@link SkeletonModifier3D.ROTATION_AXIS_ALL}.
   */
  set_joint_rotation_axis_vector(index: int, joint: int, vector: Vector3): void;
  /**
   * Sets the stiffness force at `joint` in the bone chain's joint list when {@link is_config_individual} is `true`.
   */
  set_joint_stiffness(index: int, joint: int, stiffness: float): void;
  /**
   * Sets the joint radius of the bone chain. It is used to move and slide with the {@link SpringBoneCollision3D} in the collision list.
   * The value is scaled by {@link set_radius_damping_curve} and cached in each joint setting in the joint list.
   */
  set_radius(index: int, radius: float): void;
  /** Sets the joint radius damping curve of the bone chain. */
  set_radius_damping_curve(index: int, curve: Curve): void;
  /** Sets the root bone index of the bone chain. */
  set_root_bone(index: int, bone: int): void;
  /** Sets the root bone name of the bone chain. */
  set_root_bone_name(index: int, bone_name: string): void;
  /**
   * Sets the rotation axis of the bone chain. If set to a specific axis, it acts like a hinge joint. The value is cached in each joint setting in the joint list.
   * The axes are based on the {@link Skeleton3D.get_bone_rest}'s space, if `axis` is {@link SkeletonModifier3D.ROTATION_AXIS_CUSTOM}, you can specify any axis.
   * **Note:** The rotation axis vector and the forward vector shouldn't be colinear to avoid unintended rotation since {@link SpringBoneSimulator3D} does not factor in twisting forces.
   */
  set_rotation_axis(index: int, axis: int): void;
  /**
   * Sets the rotation axis vector of the bone chain. The value is cached in each joint setting in the joint list.
   * This vector is normalized by an internal process and represents the axis around which the bone chain can rotate.
   * If the vector length is `0`, it is considered synonymous with {@link SkeletonModifier3D.ROTATION_AXIS_ALL}.
   */
  set_rotation_axis_vector(index: int, vector: Vector3): void;
  /**
   * Sets the stiffness force of the bone chain. The greater the value, the faster it recovers to its initial pose.
   * If `stiffness` is `0`, the modified pose will not return to the original pose.
   * The value is scaled by {@link set_stiffness_damping_curve} and cached in each joint setting in the joint list.
   */
  set_stiffness(index: int, stiffness: float): void;
  /** Sets the stiffness force damping curve of the bone chain. */
  set_stiffness_damping_curve(index: int, curve: Curve): void;

  // enum CenterFrom
  /** The world origin is defined as center. */
  static readonly CENTER_FROM_WORLD_ORIGIN: int;
  /**
   * The {@link Node3D} specified by {@link set_center_node} is defined as center.
   * If {@link Node3D} is not found, the parent {@link Skeleton3D} is treated as center.
   */
  static readonly CENTER_FROM_NODE: int;
  /**
   * The bone pose origin of the parent {@link Skeleton3D} specified by {@link set_center_bone} is defined as center.
   * If {@link Node3D} is not found, the parent {@link Skeleton3D} is treated as center.
   */
  static readonly CENTER_FROM_BONE: int;
}
