// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for a profile of a virtual skeleton used as a target for retargeting. */
declare class SkeletonProfile extends Resource {
  /**
   * The amount of bones in retargeting section's {@link BoneMap} editor. For example, {@link SkeletonProfileHumanoid} has 56 bones.
   * The size of elements in {@link BoneMap} updates when changing this property in it's assigned {@link SkeletonProfile}.
   */
  bone_size: int;
  /**
   * The amount of groups of bones in retargeting section's {@link BoneMap} editor. For example, {@link SkeletonProfileHumanoid} has 4 groups.
   * This property exists to separate the bone list into several sections in the editor.
   */
  group_size: int;
  /**
   * A bone name that will be used as the root bone in {@link AnimationTree}. This should be the bone of the parent of hips that exists at the world origin.
   */
  root_bone: string;
  /**
   * A bone name which will use model's height as the coefficient for normalization. For example, {@link SkeletonProfileHumanoid} defines it as `Hips`.
   */
  scale_base_bone: string;

  /** Returns the bone index that matches `bone_name` as its name. */
  find_bone(bone_name: string): int;
  /**
   * Returns the name of the bone at `bone_idx` that will be the key name in the {@link BoneMap}.
   * In the retargeting process, the returned bone name is the bone name of the target skeleton.
   */
  get_bone_name(bone_idx: int): string;
  /**
   * Returns the name of the bone which is the parent to the bone at `bone_idx`. The result is empty if the bone has no parent.
   */
  get_bone_parent(bone_idx: int): string;
  /** Returns the name of the bone which is the tail of the bone at `bone_idx`. */
  get_bone_tail(bone_idx: int): string;
  /** Returns the group of the bone at `bone_idx`. */
  get_group(bone_idx: int): string;
  /**
   * Returns the name of the group at `group_idx` that will be the drawing group in the {@link BoneMap} editor.
   */
  get_group_name(group_idx: int): string;
  /**
   * Returns the offset of the bone at `bone_idx` that will be the button position in the {@link BoneMap} editor.
   * This is the offset with origin at the top left corner of the square.
   */
  get_handle_offset(bone_idx: int): Vector2;
  /** Returns the reference pose transform for bone `bone_idx`. */
  get_reference_pose(bone_idx: int): Transform3D;
  /** Returns the tail direction of the bone at `bone_idx`. */
  get_tail_direction(bone_idx: int): int;
  /**
   * Returns the texture of the group at `group_idx` that will be the drawing group background image in the {@link BoneMap} editor.
   */
  get_texture(group_idx: int): Texture2D;
  /**
   * Returns whether the bone at `bone_idx` is required for retargeting.
   * This value is used by the bone map editor. If this method returns `true`, and no bone is assigned, the handle color will be red on the bone map editor.
   */
  is_required(bone_idx: int): boolean;
  /**
   * Sets the name of the bone at `bone_idx` that will be the key name in the {@link BoneMap}.
   * In the retargeting process, the setting bone name is the bone name of the target skeleton.
   */
  set_bone_name(bone_idx: int, bone_name: string): void;
  /**
   * Sets the bone with name `bone_parent` as the parent of the bone at `bone_idx`. If an empty string is passed, then the bone has no parent.
   */
  set_bone_parent(bone_idx: int, bone_parent: string): void;
  /** Sets the bone with name `bone_tail` as the tail of the bone at `bone_idx`. */
  set_bone_tail(bone_idx: int, bone_tail: string): void;
  /** Sets the group of the bone at `bone_idx`. */
  set_group(bone_idx: int, group: string): void;
  /**
   * Sets the name of the group at `group_idx` that will be the drawing group in the {@link BoneMap} editor.
   */
  set_group_name(group_idx: int, group_name: string): void;
  /**
   * Sets the offset of the bone at `bone_idx` that will be the button position in the {@link BoneMap} editor.
   * This is the offset with origin at the top left corner of the square.
   */
  set_handle_offset(bone_idx: int, handle_offset: Vector2): void;
  /** Sets the reference pose transform for bone `bone_idx`. */
  set_reference_pose(bone_idx: int, bone_name: Transform3D): void;
  /** Sets the required status for bone `bone_idx` to `required`. */
  set_required(bone_idx: int, required: boolean): void;
  /**
   * Sets the tail direction of the bone at `bone_idx`.
   * **Note:** This only specifies the method of calculation. The actual coordinates required should be stored in an external skeleton, so the calculation itself needs to be done externally.
   */
  set_tail_direction(bone_idx: int, tail_direction: int): void;
  /**
   * Sets the texture of the group at `group_idx` that will be the drawing group background image in the {@link BoneMap} editor.
   */
  set_texture(group_idx: int, texture: Texture2D): void;

  /**
   * This signal is emitted when change the value in profile. This is used to update key name in the {@link BoneMap} and to redraw the {@link BoneMap} editor.
   * **Note:** This signal is not connected directly to editor to simplify the reference, instead it is passed on to editor through the {@link BoneMap}.
   */
  profile_updated: Signal<[]>;

  // enum TailDirection
  /** Direction to the average coordinates of bone children. */
  static readonly TAIL_DIRECTION_AVERAGE_CHILDREN: int;
  /** Direction to the coordinates of specified bone child. */
  static readonly TAIL_DIRECTION_SPECIFIC_CHILD: int;
  /** Direction is not calculated. */
  static readonly TAIL_DIRECTION_END: int;
}
