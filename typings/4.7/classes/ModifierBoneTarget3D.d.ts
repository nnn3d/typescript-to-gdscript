// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** А node that dynamically copies the 3D transform of a bone in its parent {@link Skeleton3D}. */
declare class ModifierBoneTarget3D<Tree extends object = any> extends SkeletonModifier3D<Tree> {
  /** The index of the attached bone. */
  bone: int;
  /** The name of the attached bone. */
  bone_name: string;
  set_bone(value: int): void;
  get_bone(): int;
  set_bone_name(value: string): void;
  get_bone_name(): string;
}
