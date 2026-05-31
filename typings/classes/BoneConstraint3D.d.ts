// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A node that may modify Skeleton3D's bone with associating the two bones. */
declare class BoneConstraint3D extends SkeletonModifier3D {
  /** Clear all settings. */
  clear_setting(): void;
  /** Returns the apply amount of the setting at `index`. */
  get_amount(index: int): float;
  /** Returns the apply bone of the setting at `index`. This bone will be modified. */
  get_apply_bone(index: int): int;
  /** Returns the apply bone name of the setting at `index`. This bone will be modified. */
  get_apply_bone_name(index: int): string;
  /**
   * Returns the reference bone of the setting at `index`.
   * This bone will be only referenced and not modified by this modifier.
   */
  get_reference_bone(index: int): int;
  /**
   * Returns the reference bone name of the setting at `index`.
   * This bone will be only referenced and not modified by this modifier.
   */
  get_reference_bone_name(index: int): string;
  /**
   * Returns the reference node path of the setting at `index`.
   * This node will be only referenced and not modified by this modifier.
   */
  get_reference_node(index: int): NodePath;
  /** Returns the reference target type of the setting at `index`. See also {@link ReferenceType}. */
  get_reference_type(index: int): int;
  /** Returns the number of settings in the modifier. */
  get_setting_count(): int;
  /** Sets the apply amount of the setting at `index` to `amount`. */
  set_amount(index: int, amount: float): void;
  /** Sets the apply bone of the setting at `index` to `bone`. This bone will be modified. */
  set_apply_bone(index: int, bone: int): void;
  /** Sets the apply bone of the setting at `index` to `bone_name`. This bone will be modified. */
  set_apply_bone_name(index: int, bone_name: string | NodePath): void;
  /**
   * Sets the reference bone of the setting at `index` to `bone`.
   * This bone will be only referenced and not modified by this modifier.
   */
  set_reference_bone(index: int, bone: int): void;
  /**
   * Sets the reference bone of the setting at `index` to `bone_name`.
   * This bone will be only referenced and not modified by this modifier.
   */
  set_reference_bone_name(index: int, bone_name: string | NodePath): void;
  /**
   * Sets the reference node path of the setting at `index` to `node`.
   * This node will be only referenced and not modified by this modifier.
   */
  set_reference_node(index: int, node: NodePath | string): void;
  /** Sets the reference target type of the setting at `index` to `type`. See also {@link ReferenceType}. */
  set_reference_type(index: int, type_: int): void;
  /** Sets the number of settings in the modifier. */
  set_setting_count(count: int): void;

  // enum ReferenceType
  /** The reference target is a bone. In this case, the reference target spaces is local space. */
  static readonly REFERENCE_TYPE_BONE: int;
  /**
   * The reference target is a {@link Node3D}. In this case, the reference target spaces is model space.
   * In other words, the reference target's coordinates are treated as if it were placed directly under {@link Skeleton3D} which parent of the {@link BoneConstraint3D}.
   */
  static readonly REFERENCE_TYPE_NODE: int;
}
