// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A modification that rotates a {@link Bone2D} node to look at a target. */
declare class SkeletonModification2DLookAt extends SkeletonModification2D {
  /** The {@link Bone2D} node that the modification will operate on. */
  bone2d_node: string;
  /** The index of the {@link Bone2D} node that the modification will operate on. */
  bone_index: int;
  /**
   * The NodePath to the node that is the target for the LookAt modification. This node is what the modification will rotate the {@link Bone2D} to.
   */
  target_nodepath: string;

  /** Returns the amount of additional rotation that is applied after the LookAt modification executes. */
  get_additional_rotation(): float;
  /** Returns whether the constraints to this modification are inverted or not. */
  get_constraint_angle_invert(): boolean;
  /** Returns the constraint's maximum allowed angle. */
  get_constraint_angle_max(): float;
  /** Returns the constraint's minimum allowed angle. */
  get_constraint_angle_min(): float;
  /** Returns `true` if the LookAt modification is using constraints. */
  get_enable_constraint(): boolean;
  /**
   * Sets the amount of additional rotation that is to be applied after executing the modification. This allows for offsetting the results by the inputted rotation amount.
   */
  set_additional_rotation(rotation: float): void;
  /**
   * When `true`, the modification will use an inverted joint constraint.
   * An inverted joint constraint only constraints the {@link Bone2D} to the angles *outside of* the inputted minimum and maximum angles. For this reason, it is referred to as an inverted joint constraint, as it constraints the joint to the outside of the inputted values.
   */
  set_constraint_angle_invert(invert: boolean): void;
  /** Sets the constraint's maximum allowed angle. */
  set_constraint_angle_max(angle_max: float): void;
  /** Sets the constraint's minimum allowed angle. */
  set_constraint_angle_min(angle_min: float): void;
  /**
   * Sets whether this modification will use constraints or not. When `true`, constraints will be applied when solving the LookAt modification.
   */
  set_enable_constraint(enable_constraint: boolean): void;
}
