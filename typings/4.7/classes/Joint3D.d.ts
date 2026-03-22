// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract base class for all 3D physics joints. */
declare class Joint3D extends Node3D {
  /** If `true`, the two bodies bound together do not collide with each other. */
  exclude_nodes_from_collision: boolean;
  /**
   * Path to the first node (A) attached to the joint. The node must inherit {@link PhysicsBody3D}.
   * If left empty and {@link node_b} is set, the body is attached to a fixed {@link StaticBody3D} without collision shapes.
   */
  node_a: string;
  /**
   * Path to the second node (B) attached to the joint. The node must inherit {@link PhysicsBody3D}.
   * If left empty and {@link node_a} is set, the body is attached to a fixed {@link StaticBody3D} without collision shapes.
   */
  node_b: string;
  /**
   * The priority used to define which solver is executed first for multiple joints. The lower the value, the higher the priority.
   * **Note:** Only supported when using GodotPhysics3D. This property is ignored when using Jolt Physics.
   */
  solver_priority: int;
  set_exclude_nodes_from_collision(value: boolean): void;
  get_exclude_nodes_from_collision(): boolean;
  set_node_a(value: string): void;
  get_node_a(): string;
  set_node_b(value: string): void;
  get_node_b(): string;
  set_solver_priority(value: int): void;
  get_solver_priority(): int;

  /** Returns the joint's internal {@link RID} from the {@link PhysicsServer3D}. */
  get_rid(): RID;
}
