// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A joint used with {@link Skeleton2D} to control and animate other nodes. */
declare class Bone2D<Tree extends object = any> extends Node2D<Tree> {
  /**
   * Rest transform of the bone. You can reset the node's transforms to this value using {@link apply_rest}.
   */
  rest: Transform2D;
  set_rest(value: Transform2D): void;
  get_rest(): Transform2D;

  /**
   * Resets the bone to the rest pose. This is equivalent to setting {@link Node2D.transform} to {@link rest}.
   */
  apply_rest(): void;
  /**
   * Returns whether this {@link Bone2D} is going to autocalculate its length and bone angle using its first {@link Bone2D} child node, if one exists. If there are no {@link Bone2D} children, then it cannot autocalculate these values and will print a warning.
   */
  get_autocalculate_length_and_angle(): boolean;
  /**
   * Returns the angle of the bone in the {@link Bone2D}.
   * **Note:** This is different from the {@link Bone2D}'s rotation. The bone's angle is the rotation of the bone shown by the gizmo, which is unaffected by the {@link Bone2D}'s {@link Node2D.transform}.
   */
  get_bone_angle(): float;
  /** Returns the node's index as part of the entire skeleton. See {@link Skeleton2D}. */
  get_index_in_skeleton(): int;
  /** Returns the length of the bone in the {@link Bone2D} node. */
  get_length(): float;
  /**
   * Returns the node's {@link rest} {@link Transform2D} if it doesn't have a parent, or its rest pose relative to its parent.
   */
  get_skeleton_rest(): Transform2D;
  /**
   * When set to `true`, the {@link Bone2D} node will attempt to automatically calculate the bone angle and length using the first child {@link Bone2D} node, if one exists. If none exist, the {@link Bone2D} cannot automatically calculate these values and will print a warning.
   */
  set_autocalculate_length_and_angle(auto_calculate: boolean): void;
  /**
   * Sets the bone angle for the {@link Bone2D}. This is typically set to the rotation from the {@link Bone2D} to a child {@link Bone2D} node.
   * **Note:** This is different from the {@link Bone2D}'s rotation. The bone's angle is the rotation of the bone shown by the gizmo, which is unaffected by the {@link Bone2D}'s {@link Node2D.transform}.
   */
  set_bone_angle(angle: float): void;
  /** Sets the length of the bone in the {@link Bone2D}. */
  set_length(length: float): void;
}
