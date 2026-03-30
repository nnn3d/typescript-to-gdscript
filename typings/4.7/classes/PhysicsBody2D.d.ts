// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for 2D game objects affected by physics. */
declare class PhysicsBody2D extends CollisionObject2D {
  input_pickable: boolean;

  /** Adds a body to the list of bodies that this body can't collide with. */
  add_collision_exception_with(body: Node): void;
  /** Returns an array of nodes that were added as collision exceptions for this body. */
  get_collision_exceptions(): unknown;
  /**
   * Returns the gravity vector computed from all sources that can affect the body, including all gravity overrides from {@link Area2D} nodes and the global world gravity.
   */
  get_gravity(): Vector2;
  /**
   * Moves the body along the vector `motion`. In order to be frame rate independent in {@link Node._physics_process} or {@link Node._process}, `motion` should be computed using `delta`.
   * Returns a {@link KinematicCollision2D}, which contains information about the collision when stopped, or when touching another body along the motion.
   * If `test_only` is `true`, the body does not move but the would-be collision information is given.
   * `safe_margin` is the extra margin used for collision recovery (see {@link CharacterBody2D.safe_margin} for more details).
   * If `recovery_as_collision` is `true`, any depenetration from the recovery phase is also reported as a collision; this is used e.g. by {@link CharacterBody2D} for improving floor detection during floor snapping.
   */
  move_and_collide(motion: Vector2, test_only?: boolean, safe_margin?: float, recovery_as_collision?: boolean): KinematicCollision2D;
  /** Removes a body from the list of bodies that this body can't collide with. */
  remove_collision_exception_with(body: Node): void;
  /**
   * Checks for collisions without moving the body. In order to be frame rate independent in {@link Node._physics_process} or {@link Node._process}, `motion` should be computed using `delta`.
   * Virtually sets the node's position, scale and rotation to that of the given {@link Transform2D}, then tries to move the body along the vector `motion`. Returns `true` if a collision would stop the body from moving along the whole path.
   * `collision` is an optional object of type {@link KinematicCollision2D}, which contains additional information about the collision when stopped, or when touching another body along the motion.
   * `safe_margin` is the extra margin used for collision recovery (see {@link CharacterBody2D.safe_margin} for more details).
   * If `recovery_as_collision` is `true`, any depenetration from the recovery phase is also reported as a collision; this is useful for checking whether the body would *touch* any other bodies.
   */
  test_move(from_: Transform2D, motion: Vector2, collision?: KinematicCollision2D, safe_margin?: float, recovery_as_collision?: boolean): boolean;
}
