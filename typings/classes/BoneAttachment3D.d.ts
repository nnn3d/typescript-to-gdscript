// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * А node that dynamically copies or overrides the 3D transform of a bone in its parent {@link Skeleton3D}.
 */
declare class BoneAttachment3D extends Node3D {
  /** The index of the attached bone. */
  bone_idx: int;
  /** The name of the attached bone. */
  bone_name: string;
  /** The {@link NodePath} to the external {@link Skeleton3D} node. */
  external_skeleton: string;
  /**
   * Whether the {@link BoneAttachment3D} node will override the bone pose of the bone it is attached to. When set to `true`, the {@link BoneAttachment3D} node can change the pose of the bone. When set to `false`, the {@link BoneAttachment3D} will always be set to the bone's transform.
   * **Note:** This override performs interruptively in the skeleton update process using signals due to the old design. It may cause unintended behavior when used at the same time with {@link SkeletonModifier3D}.
   */
  override_pose: boolean;
  /**
   * <member name="use_external_skeleton" type="bool" setter="set_use_external_skeleton" getter="get_use_external_skeleton" default="false">
   * Whether the {@link BoneAttachment3D} node will use an external {@link Skeleton3D} node rather than attempting to use its parent node as the {@link Skeleton3D}. When set to `true`, the {@link BoneAttachment3D} node will use the external {@link Skeleton3D} node set in {@link external_skeleton}.
   */
  physics_interpolation_mode: int;
  set_bone_idx(value: int): void;
  get_bone_idx(): int;
  set_bone_name(value: string): void;
  get_bone_name(): string;
  set_external_skeleton(value: string): void;
  get_external_skeleton(): string;
  set_override_pose(value: boolean): void;
  get_override_pose(): boolean;

  /** Returns the parent or external {@link Skeleton3D} node if it exists, otherwise returns `null`. */
  get_skeleton(): Skeleton3D | null;
  /**
   * A function that is called automatically when the {@link Skeleton3D} is updated. This function is where the {@link BoneAttachment3D} node updates its position so it is correctly bound when it is *not* set to override the bone pose.
   */
  on_skeleton_update(): void;
}
