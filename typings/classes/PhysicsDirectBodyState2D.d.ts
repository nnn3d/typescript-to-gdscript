// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Provides direct access to a physics body in the {@link PhysicsServer2D}. */
declare class PhysicsDirectBodyState2D extends GodotObject {
  /** The body's rotational velocity in *radians* per second. */
  angular_velocity: float;
  /** The body's center of mass position relative to the body's center in the global coordinate system. */
  center_of_mass: Vector2;
  /** The body's center of mass position in the body's local coordinate system. */
  center_of_mass_local: Vector2;
  /** The body's collision layer. */
  collision_layer: int;
  /** The body's collision mask. */
  collision_mask: int;
  /** The inverse of the inertia of the body. */
  inverse_inertia: float;
  /** The inverse of the mass of the body. */
  inverse_mass: float;
  /** The body's linear velocity in pixels per second. */
  linear_velocity: Vector2;
  /** If `true`, this body is currently sleeping (not active). */
  sleeping: boolean;
  /** The timestep (delta) used for the simulation. */
  step: float;
  /** The rate at which the body stops rotating, if there are not any other forces moving it. */
  total_angular_damp: float;
  /** The total gravity vector being currently applied to this body. */
  total_gravity: Vector2;
  /** The rate at which the body stops moving, if there are not any other forces moving it. */
  total_linear_damp: float;
  /** The body's transformation matrix. */
  transform: Transform2D;
  set_angular_velocity(value: float): void;
  get_angular_velocity(): float;
  get_center_of_mass(): Vector2;
  get_center_of_mass_local(): Vector2;
  set_collision_layer(value: int): void;
  get_collision_layer(): int;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  get_inverse_inertia(): float;
  get_inverse_mass(): float;
  set_linear_velocity(value: Vector2 | Vector2i): void;
  get_linear_velocity(): Vector2;
  set_sleep_state(value: boolean): void;
  is_sleeping(): boolean;
  get_step(): float;
  get_total_angular_damp(): float;
  get_total_gravity(): Vector2;
  get_total_linear_damp(): float;
  set_transform(value: Transform2D): void;
  get_transform(): Transform2D;

  /**
   * Adds a constant directional force without affecting rotation that keeps being applied over time until cleared with `constant_force = Vector2(0, 0)`.
   * This is equivalent to using {@link add_constant_force} at the body's center of mass.
   */
  add_constant_central_force(force?: Vector2 | Vector2i): void;
  /**
   * Adds a constant positioned force to the body that keeps being applied over time until cleared with `constant_force = Vector2(0, 0)`.
   * `position` is the offset from the body origin in global coordinates.
   */
  add_constant_force(force: Vector2 | Vector2i, position?: Vector2 | Vector2i): void;
  /**
   * Adds a constant rotational force without affecting position that keeps being applied over time until cleared with `constant_torque = 0`.
   */
  add_constant_torque(torque: float): void;
  /**
   * Applies a directional force without affecting rotation. A force is time dependent and meant to be applied every physics update.
   * This is equivalent to using {@link apply_force} at the body's center of mass.
   */
  apply_central_force(force?: Vector2 | Vector2i): void;
  /**
   * Applies a directional impulse without affecting rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * This is equivalent to using {@link apply_impulse} at the body's center of mass.
   */
  apply_central_impulse(impulse: Vector2 | Vector2i): void;
  /**
   * Applies a positioned force to the body. A force is time dependent and meant to be applied every physics update.
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_force(force: Vector2 | Vector2i, position?: Vector2 | Vector2i): void;
  /**
   * Applies a positioned impulse to the body.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_impulse(impulse: Vector2 | Vector2i, position?: Vector2 | Vector2i): void;
  /**
   * Applies a rotational force without affecting position. A force is time dependent and meant to be applied every physics update.
   * **Note:** {@link inverse_inertia} is required for this to work. To have {@link inverse_inertia}, an active {@link CollisionShape2D} must be a child of the node, or you can manually set {@link inverse_inertia}.
   */
  apply_torque(torque: float): void;
  /**
   * Applies a rotational impulse to the body without affecting the position.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * **Note:** {@link inverse_inertia} is required for this to work. To have {@link inverse_inertia}, an active {@link CollisionShape2D} must be a child of the node, or you can manually set {@link inverse_inertia}.
   */
  apply_torque_impulse(impulse: float): void;
  /**
   * Returns the body's total constant positional forces applied during each physics update.
   * See {@link add_constant_force} and {@link add_constant_central_force}.
   */
  get_constant_force(): Vector2;
  /**
   * Returns the body's total constant rotational forces applied during each physics update.
   * See {@link add_constant_torque}.
   */
  get_constant_torque(): float;
  /** Returns the collider's {@link RID}. */
  get_contact_collider(contact_idx: int): RID;
  /** Returns the collider's object id. */
  get_contact_collider_id(contact_idx: int): int;
  /**
   * Returns the collider object. This depends on how it was created (will return a scene node if such was used to create it).
   */
  get_contact_collider_object(contact_idx: int): GodotObject | null;
  /** Returns the position of the contact point on the collider in the global coordinate system. */
  get_contact_collider_position(contact_idx: int): Vector2;
  /** Returns the collider's shape index. */
  get_contact_collider_shape(contact_idx: int): int;
  /** Returns the velocity vector at the collider's contact point. */
  get_contact_collider_velocity_at_position(contact_idx: int): Vector2;
  /**
   * Returns the number of contacts this body has with other bodies.
   * **Note:** By default, this returns 0 unless bodies are configured to monitor contacts. See {@link RigidBody2D.contact_monitor}.
   */
  get_contact_count(): int;
  /** Returns the impulse created by the contact. */
  get_contact_impulse(contact_idx: int): Vector2;
  /** Returns the local normal at the contact point. */
  get_contact_local_normal(contact_idx: int): Vector2;
  /** Returns the position of the contact point on the body in the global coordinate system. */
  get_contact_local_position(contact_idx: int): Vector2;
  /** Returns the local shape index of the collision. */
  get_contact_local_shape(contact_idx: int): int;
  /** Returns the velocity vector at the body's contact point. */
  get_contact_local_velocity_at_position(contact_idx: int): Vector2;
  /** Returns the current state of the space, useful for queries. */
  get_space_state(): PhysicsDirectSpaceState2D | null;
  /**
   * Returns the body's velocity at the given relative position.
   * `local_position` is the offset from the body origin in global coordinates.
   */
  get_velocity_at_local_position(local_position: Vector2 | Vector2i): Vector2;
  /**
   * Updates the body's linear and angular velocity by applying gravity and damping for the equivalent of one physics tick.
   */
  integrate_forces(): void;
  /**
   * Sets the body's total constant positional forces applied during each physics update.
   * See {@link add_constant_force} and {@link add_constant_central_force}.
   */
  set_constant_force(force: Vector2 | Vector2i): void;
  /**
   * Sets the body's total constant rotational forces applied during each physics update.
   * See {@link add_constant_torque}.
   */
  set_constant_torque(torque: float): void;
}
