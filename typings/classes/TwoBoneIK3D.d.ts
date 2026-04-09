// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Rotation based intersection of two circles inverse kinematics solver. */
declare class TwoBoneIK3D extends IKModifier3D {
  /** The number of settings. */
  setting_count: int;

  /** Returns the end bone index. */
  get_end_bone(index: int): int;
  /** Returns the end bone's tail direction when {@link is_end_bone_extended} is `true`. */
  get_end_bone_direction(index: int): int;
  /** Returns the end bone tail length of the bone chain when {@link is_end_bone_extended} is `true`. */
  get_end_bone_length(index: int): float;
  /** Returns the end bone name. */
  get_end_bone_name(index: int): string;
  /** Returns the middle bone index. */
  get_middle_bone(index: int): int;
  /** Returns the middle bone name. */
  get_middle_bone_name(index: int): string;
  /** Returns the pole direction. */
  get_pole_direction(index: int): int;
  /**
   * Returns the pole direction vector.
   * If {@link get_pole_direction} is {@link SkeletonModifier3D.SECONDARY_DIRECTION_NONE}, this method returns `Vector3(0, 0, 0)`.
   */
  get_pole_direction_vector(index: int): Vector3;
  /**
   * Returns the pole target node that constructs a plane which the joints are all on and the pole is trying to direct.
   */
  get_pole_node(index: int): NodePath;
  /** Returns the root bone index. */
  get_root_bone(index: int): int;
  /** Returns the root bone name. */
  get_root_bone_name(index: int): string;
  /** Returns the target node that the end bone is trying to reach. */
  get_target_node(index: int): NodePath;
  /** Returns `true` if the end bone is extended to have a tail. */
  is_end_bone_extended(index: int): boolean;
  /** Returns `true` if the end bone is extended from the middle bone as a virtual bone. */
  is_using_virtual_end(index: int): boolean;
  /** Sets the end bone index. */
  set_end_bone(index: int, bone: int): void;
  /** Sets the end bone tail direction when {@link is_end_bone_extended} is `true`. */
  set_end_bone_direction(index: int, bone_direction: int): void;
  /** Sets the end bone tail length when {@link is_end_bone_extended} is `true`. */
  set_end_bone_length(index: int, length: float): void;
  /**
   * Sets the end bone name.
   * **Note:** The end bone must be a child of the middle bone.
   */
  set_end_bone_name(index: int, bone_name: string | NodePath): void;
  /** If `enabled` is `true`, the end bone is extended to have a tail. */
  set_extend_end_bone(index: int, enabled: boolean): void;
  /** Sets the middle bone index. */
  set_middle_bone(index: int, bone: int): void;
  /**
   * Sets the middle bone name.
   * **Note:** The middle bone must be a child of the root bone.
   */
  set_middle_bone_name(index: int, bone_name: string | NodePath): void;
  /**
   * Sets the pole direction.
   * The pole is on the middle bone and will direct to the pole target.
   * The rotation axis is a vector that is orthogonal to this and the forward vector.
   * **Note:** The pole direction and the forward vector shouldn't be colinear to avoid unintended rotation.
   */
  set_pole_direction(index: int, direction: int): void;
  /**
   * Sets the pole direction vector.
   * This vector is normalized by an internal process.
   * If the vector length is `0`, it is considered synonymous with {@link SkeletonModifier3D.SECONDARY_DIRECTION_NONE}.
   */
  set_pole_direction_vector(index: int, vector: Vector3 | Vector3i): void;
  /**
   * Sets the pole target node that constructs a plane which the joints are all on and the pole is trying to direct.
   */
  set_pole_node(index: int, pole_node: NodePath | string): void;
  /** Sets the root bone index. */
  set_root_bone(index: int, bone: int): void;
  /** Sets the root bone name. */
  set_root_bone_name(index: int, bone_name: string | NodePath): void;
  /** Sets the target node that the end bone is trying to reach. */
  set_target_node(index: int, target_node: NodePath | string): void;
  /** If `enabled` is `true`, the end bone is extended from the middle bone as a virtual bone. */
  set_use_virtual_end(index: int, enabled: boolean): void;
}
