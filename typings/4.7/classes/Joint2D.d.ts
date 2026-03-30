// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for all 2D physics joints. */
declare class Joint2D extends Node2D {
  /**
   * When {@link node_a} and {@link node_b} move in different directions the {@link bias} controls how fast the joint pulls them back to their original position. The lower the {@link bias} the more the two bodies can pull on the joint.
   * When set to `0`, the default value from {@link ProjectSettings.physics/2d/solver/default_constraint_bias} is used.
   */
  bias: float;
  /** If `true`, the two bodies bound together do not collide with each other. */
  disable_collision: boolean;
  /** Path to the first body (A) attached to the joint. The node must inherit {@link PhysicsBody2D}. */
  node_a: string;
  /** Path to the second body (B) attached to the joint. The node must inherit {@link PhysicsBody2D}. */
  node_b: string;
  set_bias(value: float): void;
  get_bias(): float;
  set_exclude_nodes_from_collision(value: boolean): void;
  get_exclude_nodes_from_collision(): boolean;
  set_node_a(value: string): void;
  get_node_a(): string;
  set_node_b(value: string): void;
  get_node_b(): string;

  /** Returns the joint's internal {@link RID} from the {@link PhysicsServer2D}. */
  get_rid(): RID;
}
