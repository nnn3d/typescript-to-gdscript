// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A base class of the collision that interacts with {@link SpringBoneSimulator3D}. */
declare class SpringBoneCollision3D extends Node3D {
  /** The index of the attached bone. */
  bone: int;
  /** The name of the attached bone. */
  bone_name: string;
  /** The offset of the position from {@link Skeleton3D}'s {@link bone} pose position. */
  position_offset: Vector3;
  /** The offset of the rotation from {@link Skeleton3D}'s {@link bone} pose rotation. */
  rotation_offset: Quaternion;
  set_bone(value: int): void;
  get_bone(): int;
  set_bone_name(value: string): void;
  get_bone_name(): string;
  set_position_offset(value: Vector3 | Vector3i): void;
  get_position_offset(): Vector3;
  set_rotation_offset(value: Quaternion | Basis): void;
  get_rotation_offset(): Quaternion;

  /** Get parent {@link Skeleton3D} node of the parent {@link SpringBoneSimulator3D} if found. */
  get_skeleton(): Skeleton3D | null;
}
