// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D raycast that dynamically moves its children near the collision point. */
declare class SpringArm3D<Tree extends object = any> extends Node3D<Tree> {
  /**
   * The layers against which the collision check will be done. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * When the collision check is made, a candidate length for the SpringArm3D is given.
   * The margin is then subtracted to this length and the translation is applied to the child objects of the SpringArm3D.
   * This margin is useful for when the SpringArm3D has a {@link Camera3D} as a child node: without the margin, the {@link Camera3D} would be placed on the exact point of collision, while with the margin the {@link Camera3D} would be placed close to the point of collision.
   */
  margin: float;
  /**
   * The {@link Shape3D} to use for the SpringArm3D.
   * When the shape is set, the SpringArm3D will cast the {@link Shape3D} on its z axis instead of performing a ray cast.
   */
  shape: Shape3D;
  /**
   * The maximum extent of the SpringArm3D. This is used as a length for both the ray and the shape cast used internally to calculate the desired position of the SpringArm3D's child nodes.
   * To know more about how to perform a shape cast or a ray cast, please consult the {@link PhysicsDirectSpaceState3D} documentation.
   */
  spring_length: float;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_margin(value: float): void;
  get_margin(): float;
  set_shape(value: Shape3D): void;
  get_shape(): Shape3D;
  set_length(value: float): void;
  get_length(): float;

  /**
   * Adds the {@link PhysicsBody3D} object with the given {@link RID} to the list of {@link PhysicsBody3D} objects excluded from the collision check.
   */
  add_excluded_object(RID: RID): void;
  /** Clears the list of {@link PhysicsBody3D} objects excluded from the collision check. */
  clear_excluded_objects(): void;
  /** Returns the spring arm's current length. */
  get_hit_length(): float;
  /**
   * Removes the given {@link RID} from the list of {@link PhysicsBody3D} objects excluded from the collision check.
   */
  remove_excluded_object(RID: RID): boolean;
}
