// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A node containing a bone hierarchy, used to create a 3D skeletal animation. */
declare class Skeleton3D extends Node3D {
  /**
   * If you follow the recommended workflow and explicitly have {@link PhysicalBoneSimulator3D} as a child of {@link Skeleton3D}, you can control whether it is affected by raycasting without running {@link physical_bones_start_simulation}, by its {@link SkeletonModifier3D.active}.
   * However, for old (deprecated) configurations, {@link Skeleton3D} has an internal virtual {@link PhysicalBoneSimulator3D} for compatibility. This property controls the internal virtual {@link PhysicalBoneSimulator3D}'s {@link SkeletonModifier3D.active}.
   */
  animate_physical_bones: boolean;
  /** Sets the processing timing for the Modifier. */
  modifier_callback_mode_process: int;
  /**
   * Multiplies the 3D position track animation.
   * **Note:** Unless this value is `1.0`, the key value in animation will not match the actual position value.
   */
  motion_scale: float;
  /**
   * If `true`, forces the bones in their default rest pose, regardless of their values. In the editor, this also prevents the bones from being edited.
   */
  show_rest_only: boolean;

  /**
   * Adds a new bone with the given name. Returns the new bone's index, or `-1` if this method fails.
   * **Note:** Bone names should be unique, non empty, and cannot include the `:` and `/` characters.
   */
  add_bone(name: string): int;
  /**
   * Manually advance the child {@link SkeletonModifier3D}s by the specified time (in seconds).
   * **Note:** The `delta` is temporarily accumulated in the {@link Skeleton3D}, and the deferred process uses the accumulated value to process the modification.
   */
  advance(delta: float): void;
  /** Clear all the bones in this skeleton. */
  clear_bones(): void;
  /** Removes the global pose override on all bones in the skeleton. */
  clear_bones_global_pose_override(): void;
  create_skin_from_rest_transforms(): Skin;
  /**
   * Returns the bone index that matches `name` as its name. Returns `-1` if no bone with this name exists.
   */
  find_bone(name: string): int;
  /** Force updates the bone transforms/poses for all bones in the skeleton. */
  force_update_all_bone_transforms(): void;
  /** Force updates the bone transform for the bone at `bone_idx` and all of its children. */
  force_update_bone_child_transform(bone_idx: int): void;
  /**
   * Returns an array containing the bone indexes of all the child node of the passed in bone, `bone_idx`.
   */
  get_bone_children(bone_idx: int): PackedInt32Array;
  /** Returns the number of bones in the skeleton. */
  get_bone_count(): int;
  /**
   * Returns the overall transform of the specified bone, with respect to the skeleton. Being relative to the skeleton frame, this is not the actual "global" transform of the bone.
   * **Note:** This is the global pose you set to the skeleton in the process, the final global pose can get overridden by modifiers in the deferred process, if you want to access the final global pose, use {@link SkeletonModifier3D.modification_processed}.
   */
  get_bone_global_pose(bone_idx: int): Transform3D;
  /**
   * Returns the overall transform of the specified bone, with respect to the skeleton, but without any global pose overrides. Being relative to the skeleton frame, this is not the actual "global" transform of the bone.
   */
  get_bone_global_pose_no_override(bone_idx: int): Transform3D;
  /** Returns the global pose override transform for `bone_idx`. */
  get_bone_global_pose_override(bone_idx: int): Transform3D;
  /** Returns the global rest transform for `bone_idx`. */
  get_bone_global_rest(bone_idx: int): Transform3D;
  /** Returns the metadata with the given `key` for the bone at index `bone_idx`. */
  get_bone_meta(bone_idx: int, key: string): unknown;
  /** Returns the list of all metadata keys for the bone at index `bone_idx`. */
  get_bone_meta_list(bone_idx: int): unknown;
  /** Returns the name of the bone at index `bone_idx`. */
  get_bone_name(bone_idx: int): string;
  /**
   * Returns the bone index which is the parent of the bone at `bone_idx`. If -1, then bone has no parent.
   * **Note:** The parent bone returned will always be less than `bone_idx`.
   */
  get_bone_parent(bone_idx: int): int;
  /**
   * Returns the pose transform of the specified bone.
   * **Note:** This is the pose you set to the skeleton in the process, the final pose can get overridden by modifiers in the deferred process, if you want to access the final pose, use {@link SkeletonModifier3D.modification_processed}.
   */
  get_bone_pose(bone_idx: int): Transform3D;
  /**
   * Returns the pose position of the bone at `bone_idx`. The returned {@link Vector3} is in the local coordinate space of the {@link Skeleton3D} node.
   */
  get_bone_pose_position(bone_idx: int): Vector3;
  /**
   * Returns the pose rotation of the bone at `bone_idx`. The returned {@link Quaternion} is local to the bone with respect to the rotation of any parent bones.
   */
  get_bone_pose_rotation(bone_idx: int): Quaternion;
  /** Returns the pose scale of the bone at `bone_idx`. */
  get_bone_pose_scale(bone_idx: int): Vector3;
  /** Returns the rest transform for a bone `bone_idx`. */
  get_bone_rest(bone_idx: int): Transform3D;
  /**
   * Returns all bone names concatenated with commas (`,`) as a single {@link StringName}.
   * It is useful to set it as a hint for the enum property.
   */
  get_concatenated_bone_names(): string;
  /**
   * Returns an array with all of the bones that are parentless. Another way to look at this is that it returns the indexes of all the bones that are not dependent or modified by other bones in the Skeleton.
   */
  get_parentless_bones(): PackedInt32Array;
  /**
   * Returns the number of times the bone hierarchy has changed within this skeleton, including renames.
   * The Skeleton version is not serialized: only use within a single instance of Skeleton3D.
   * Use for invalidating caches in IK solvers and other nodes which process bones.
   */
  get_version(): int;
  /** Returns `true` if the bone at index `bone_idx` has metadata with the given `key`. */
  has_bone_meta(bone_idx: int, key: string): boolean;
  /** Returns whether the bone pose for the bone at `bone_idx` is enabled. */
  is_bone_enabled(bone_idx: int): boolean;
  /** Returns all bones in the skeleton to their rest poses. */
  localize_rests(): void;
  /**
   * Adds a collision exception to the physical bone.
   * Works just like the {@link RigidBody3D} node.
   */
  physical_bones_add_collision_exception(exception: RID): void;
  /**
   * Removes a collision exception to the physical bone.
   * Works just like the {@link RigidBody3D} node.
   */
  physical_bones_remove_collision_exception(exception: RID): void;
  /**
   * Tells the {@link PhysicalBone3D} nodes in the Skeleton to start simulating and reacting to the physics world.
   * Optionally, a list of bone names can be passed-in, allowing only the passed-in bones to be simulated.
   */
  physical_bones_start_simulation(bones?: unknown): void;
  /** Tells the {@link PhysicalBone3D} nodes in the Skeleton to stop simulating. */
  physical_bones_stop_simulation(): void;
  /** Binds the given Skin to the Skeleton. */
  register_skin(skin: Skin): SkinReference;
  /** Sets the bone pose to rest for `bone_idx`. */
  reset_bone_pose(bone_idx: int): void;
  /** Sets all bone poses to rests. */
  reset_bone_poses(): void;
  /** Disables the pose for the bone at `bone_idx` if `false`, enables the bone pose if `true`. */
  set_bone_enabled(bone_idx: int, enabled?: boolean): void;
  /**
   * Sets the global pose transform, `pose`, for the bone at `bone_idx`.
   * **Note:** If other bone poses have been changed, this method executes a dirty poses recalculation and will cause performance to deteriorate. If you know that multiple global poses will be applied, consider using {@link set_bone_pose} with precalculation.
   */
  set_bone_global_pose(bone_idx: int, pose: Transform3D): void;
  /**
   * Sets the global pose transform, `pose`, for the bone at `bone_idx`.
   * `amount` is the interpolation strength that will be used when applying the pose, and `persistent` determines if the applied pose will remain.
   * **Note:** The pose transform needs to be a global pose! To convert a world transform from a {@link Node3D} to a global bone pose, multiply the {@link Transform3D.affine_inverse} of the node's {@link Node3D.global_transform} by the desired world transform.
   */
  set_bone_global_pose_override(bone_idx: int, pose: Transform3D, amount: float, persistent?: boolean): void;
  /** Sets the metadata with the given `key` to `value` for the bone at index `bone_idx`. */
  set_bone_meta(bone_idx: int, key: string, value: unknown): void;
  /** Sets the bone name, `name`, for the bone at `bone_idx`. */
  set_bone_name(bone_idx: int, name: string): void;
  /**
   * Sets the bone index `parent_idx` as the parent of the bone at `bone_idx`. If -1, then bone has no parent.
   * **Note:** `parent_idx` must be less than `bone_idx`.
   */
  set_bone_parent(bone_idx: int, parent_idx: int): void;
  /** Sets the pose transform, `pose`, for the bone at `bone_idx`. */
  set_bone_pose(bone_idx: int, pose: Transform3D): void;
  /**
   * Sets the pose position of the bone at `bone_idx` to `position`. `position` is a {@link Vector3} describing a position local to the {@link Skeleton3D} node.
   */
  set_bone_pose_position(bone_idx: int, position: Vector3): void;
  /**
   * Sets the pose rotation of the bone at `bone_idx` to `rotation`. `rotation` is a {@link Quaternion} describing a rotation in the bone's local coordinate space with respect to the rotation of any parent bones.
   */
  set_bone_pose_rotation(bone_idx: int, rotation: Quaternion): void;
  /** Sets the pose scale of the bone at `bone_idx` to `scale`. */
  set_bone_pose_scale(bone_idx: int, scale: Vector3): void;
  /** Sets the rest transform for bone `bone_idx`. */
  set_bone_rest(bone_idx: int, rest: Transform3D): void;
  /**
   * Unparents the bone at `bone_idx` and sets its rest position to that of its parent prior to being reset.
   */
  unparent_bone_and_rest(bone_idx: int): void;

  /**
   * Emitted when the bone at `bone_idx` is toggled with {@link set_bone_enabled}. Use {@link is_bone_enabled} to check the new value.
   */
  bone_enabled_changed: Signal<[int]>;
  /**
   * Emitted when the list of bones changes, such as when calling {@link add_bone}, {@link set_bone_parent}, {@link unparent_bone_and_rest}, or {@link clear_bones}.
   */
  bone_list_changed: Signal<[]>;
  /**
   * Emitted when the pose is updated.
   * **Note:** During the update process, this signal is not fired, so modification by {@link SkeletonModifier3D} is not detected.
   */
  pose_updated: Signal<[]>;
  /** Emitted when the rest is updated. */
  rest_updated: Signal<[]>;
  /** Emitted when the value of {@link show_rest_only} changes. */
  show_rest_only_changed: Signal<[]>;
  /**
   * Emitted when the final pose has been calculated will be applied to the skin in the update process.
   * This means that all {@link SkeletonModifier3D} processing is complete. In order to detect the completion of the processing of each {@link SkeletonModifier3D}, use {@link SkeletonModifier3D.modification_processed}.
   */
  skeleton_updated: Signal<[]>;

  // enum ModifierCallbackModeProcess
  /**
   * Set a flag to process modification during physics frames (see {@link Node.NOTIFICATION_INTERNAL_PHYSICS_PROCESS}).
   */
  static readonly MODIFIER_CALLBACK_MODE_PROCESS_PHYSICS: int;
  /**
   * Set a flag to process modification during process frames (see {@link Node.NOTIFICATION_INTERNAL_PROCESS}).
   */
  static readonly MODIFIER_CALLBACK_MODE_PROCESS_IDLE: int;
  /** Do not process modification. Use {@link advance} to process the modification manually. */
  static readonly MODIFIER_CALLBACK_MODE_PROCESS_MANUAL: int;

  /**
   * Notification received when this skeleton's pose needs to be updated. In that case, this is called only once per frame in a deferred process.
   */
  static readonly NOTIFICATION_UPDATE_SKELETON: int;
}
