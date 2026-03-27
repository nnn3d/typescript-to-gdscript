// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Abstract base class for 3D game objects affected by physics. */
declare class PhysicsBody3D<Tree extends object = any> extends CollisionObject3D<Tree> {
  /** Lock the body's rotation in the X axis. */
  axis_lock_angular_x: boolean;
  /** Lock the body's rotation in the Y axis. */
  axis_lock_angular_y: boolean;
  /** Lock the body's rotation in the Z axis. */
  axis_lock_angular_z: boolean;
  /** Lock the body's linear movement in the X axis. */
  axis_lock_linear_x: boolean;
  /** Lock the body's linear movement in the Y axis. */
  axis_lock_linear_y: boolean;
  /** Lock the body's linear movement in the Z axis. */
  axis_lock_linear_z: boolean;

  /** Adds a body to the list of bodies that this body can't collide with. */
  add_collision_exception_with(body: Node): void;
  /** Returns `true` if the specified linear or rotational `axis` is locked. */
  get_axis_lock(axis: int): boolean;
  /** Returns an array of nodes that were added as collision exceptions for this body. */
  get_collision_exceptions(): unknown;
  /**
   * Returns the gravity vector computed from all sources that can affect the body, including all gravity overrides from {@link Area3D} nodes and the global world gravity.
   */
  get_gravity(): Vector3;
  /**
   * Moves the body along the vector `motion`. In order to be frame rate independent in {@link Node._physics_process} or {@link Node._process}, `motion` should be computed using `delta`.
   * The body will stop if it collides. Returns a {@link KinematicCollision3D}, which contains information about the collision when stopped, or when touching another body along the motion.
   * If `test_only` is `true`, the body does not move but the would-be collision information is given.
   * `safe_margin` is the extra margin used for collision recovery (see {@link CharacterBody3D.safe_margin} for more details).
   * If `recovery_as_collision` is `true`, any depenetration from the recovery phase is also reported as a collision; this is used e.g. by {@link CharacterBody3D} for improving floor detection during floor snapping.
   * `max_collisions` allows to retrieve more than one collision result.
   */
  move_and_collide(motion: Vector3, test_only?: boolean, safe_margin?: float, recovery_as_collision?: boolean, max_collisions?: int): KinematicCollision3D;
  /** Removes a body from the list of bodies that this body can't collide with. */
  remove_collision_exception_with(body: Node): void;
  /** Locks or unlocks the specified linear or rotational `axis` depending on the value of `lock`. */
  set_axis_lock(axis: int, lock: boolean): void;
  /**
   * Checks for collisions without moving the body. In order to be frame rate independent in {@link Node._physics_process} or {@link Node._process}, `motion` should be computed using `delta`.
   * Virtually sets the node's position, scale and rotation to that of the given {@link Transform3D}, then tries to move the body along the vector `motion`. Returns `true` if a collision would stop the body from moving along the whole path.
   * `collision` is an optional object of type {@link KinematicCollision3D}, which contains additional information about the collision when stopped, or when touching another body along the motion.
   * `safe_margin` is the extra margin used for collision recovery (see {@link CharacterBody3D.safe_margin} for more details).
   * If `recovery_as_collision` is `true`, any depenetration from the recovery phase is also reported as a collision; this is useful for checking whether the body would *touch* any other bodies.
   * `max_collisions` allows to retrieve more than one collision result.
   */
  test_move(from_: Transform3D, motion: Vector3, collision?: KinematicCollision3D, safe_margin?: float, recovery_as_collision?: boolean, max_collisions?: int): boolean;
}
