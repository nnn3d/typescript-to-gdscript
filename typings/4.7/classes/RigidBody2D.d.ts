// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 2D physics body that is moved by a physics simulation. */
declare class RigidBody2D extends PhysicsBody2D {
  /**
   * Damps the body's rotation. By default, the body will use the {@link ProjectSettings.physics/2d/default_angular_damp} setting or any value override set by an {@link Area2D} the body is in. Depending on {@link angular_damp_mode}, you can set {@link angular_damp} to be added to or to replace the body's damping value.
   * See {@link ProjectSettings.physics/2d/default_angular_damp} for more details about damping.
   */
  angular_damp: float;
  /** Defines how {@link angular_damp} is applied. */
  angular_damp_mode: int;
  /** The body's rotational velocity in *radians* per second. */
  angular_velocity: float;
  /** If `true`, the body can enter sleep mode when there is no movement. See {@link sleeping}. */
  can_sleep: boolean;
  /**
   * The body's custom center of mass, relative to the body's origin position, when {@link center_of_mass_mode} is set to {@link CENTER_OF_MASS_MODE_CUSTOM}. This is the balanced point of the body, where applied forces only cause linear acceleration. Applying forces outside of the center of mass causes angular acceleration.
   * When {@link center_of_mass_mode} is set to {@link CENTER_OF_MASS_MODE_AUTO} (default value), the center of mass is automatically determined, but this does not update the value of {@link center_of_mass}.
   */
  center_of_mass: Vector2;
  /** Defines the way the body's center of mass is set. */
  center_of_mass_mode: int;
  /**
   * The body's total constant positional forces applied during each physics update.
   * See {@link add_constant_force} and {@link add_constant_central_force}.
   */
  constant_force: Vector2;
  /**
   * The body's total constant rotational forces applied during each physics update.
   * See {@link add_constant_torque}.
   */
  constant_torque: float;
  /**
   * If `true`, the RigidBody2D will emit signals when it collides with another body.
   * **Note:** By default the maximum contacts reported is set to 0, meaning nothing will be recorded, see {@link max_contacts_reported}.
   */
  contact_monitor: boolean;
  /**
   * Continuous collision detection mode.
   * Continuous collision detection tries to predict where a moving body will collide instead of moving it and correcting its movement after collision. Continuous collision detection is slower, but more precise and misses fewer collisions with small, fast-moving objects. Raycasting and shapecasting methods are available.
   */
  continuous_cd: int;
  /**
   * If `true`, the standard force integration (like gravity or damping) will be disabled for this body. Other than collision response, the body will only move as determined by the {@link _integrate_forces} method, if that virtual method is overridden.
   * Setting this property will call the method {@link PhysicsServer2D.body_set_omit_force_integration} internally.
   */
  custom_integrator: boolean;
  /**
   * If `true`, the body is frozen. Gravity and forces are not applied anymore.
   * See {@link freeze_mode} to set the body's behavior when frozen.
   * **Note:** For a body that is always frozen, use {@link StaticBody2D} or {@link AnimatableBody2D} instead.
   */
  freeze: boolean;
  /**
   * The body's freeze mode. Determines the body's behavior when {@link freeze} is `true`.
   * **Note:** For a body that is always frozen, use {@link StaticBody2D} or {@link AnimatableBody2D} instead.
   */
  freeze_mode: int;
  /**
   * Multiplies the gravity applied to the body. The body's gravity is calculated from the {@link ProjectSettings.physics/2d/default_gravity} project setting and/or any additional gravity vector applied by {@link Area2D}s.
   */
  gravity_scale: float;
  /**
   * The body's moment of inertia. This is like mass, but for rotation: it determines how much torque it takes to rotate the body. The moment of inertia is usually computed automatically from the mass and the shapes, but this property allows you to set a custom value.
   * If set to `0`, inertia is automatically computed (default value).
   * **Note:** This value does not change when inertia is automatically computed. Use {@link PhysicsServer2D} to get the computed inertia.
   */
  inertia: float;
  /**
   * Damps the body's movement. By default, the body will use the {@link ProjectSettings.physics/2d/default_linear_damp} setting or any value override set by an {@link Area2D} the body is in. Depending on {@link linear_damp_mode}, you can set {@link linear_damp} to be added to or to replace the body's damping value.
   * See {@link ProjectSettings.physics/2d/default_linear_damp} for more details about damping.
   */
  linear_damp: float;
  /** Defines how {@link linear_damp} is applied. */
  linear_damp_mode: int;
  /**
   * The body's linear velocity in pixels per second. Can be used sporadically, but **don't set this every frame**, because physics may run in another thread and runs at a different granularity. Use {@link _integrate_forces} as your process loop for precise control of the body state.
   */
  linear_velocity: Vector2;
  /** If `true`, the body cannot rotate. Gravity and forces only apply linear movement. */
  lock_rotation: boolean;
  /** The body's mass. */
  mass: float;
  /**
   * The maximum number of contacts that will be recorded. Requires a value greater than 0 and {@link contact_monitor} to be set to `true` to start to register contacts. Use {@link get_contact_count} to retrieve the count or {@link get_colliding_bodies} to retrieve bodies that have been collided with.
   * **Note:** The number of contacts is different from the number of collisions. Collisions between parallel edges will result in two contacts (one at each end), and collisions between parallel faces will result in four contacts (one at each corner).
   */
  max_contacts_reported: int;
  /**
   * The physics material override for the body.
   * If a material is assigned to this property, it will be used instead of any other physics material, such as an inherited one.
   */
  physics_material_override: PhysicsMaterial;
  /**
   * If `true`, the body will not move and will not calculate forces until woken up by another body through, for example, a collision, or by using the {@link apply_impulse} or {@link apply_force} methods.
   */
  sleeping: boolean;

  /**
   * Called during physics processing, allowing you to read and safely modify the simulation state for the object. By default, it is called before the standard force integration, but the {@link custom_integrator} property allows you to disable the standard force integration and do fully custom force integration for a body.
   */
  _integrate_forces(state: PhysicsDirectBodyState2D): void;
  /**
   * Adds a constant directional force without affecting rotation that keeps being applied over time until cleared with `constant_force = Vector2(0, 0)`.
   * This is equivalent to using {@link add_constant_force} at the body's center of mass.
   */
  add_constant_central_force(force: Vector2): void;
  /**
   * Adds a constant positioned force to the body that keeps being applied over time until cleared with `constant_force = Vector2(0, 0)`.
   * `position` is the offset from the body origin in global coordinates.
   */
  add_constant_force(force: Vector2, position?: Vector2): void;
  /**
   * Adds a constant rotational force without affecting position that keeps being applied over time until cleared with `constant_torque = 0`.
   */
  add_constant_torque(torque: float): void;
  /**
   * Applies a directional force without affecting rotation. A force is time dependent and meant to be applied every physics update.
   * This is equivalent to using {@link apply_force} at the body's center of mass.
   */
  apply_central_force(force: Vector2): void;
  /**
   * Applies a directional impulse without affecting rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * This is equivalent to using {@link apply_impulse} at the body's center of mass.
   */
  apply_central_impulse(impulse?: Vector2): void;
  /**
   * Applies a positioned force to the body. A force is time dependent and meant to be applied every physics update.
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_force(force: Vector2, position?: Vector2): void;
  /**
   * Applies a positioned impulse to the body.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_impulse(impulse: Vector2, position?: Vector2): void;
  /**
   * Applies a rotational force without affecting position. A force is time dependent and meant to be applied every physics update.
   * **Note:** {@link inertia} is required for this to work. To have {@link inertia}, an active {@link CollisionShape2D} must be a child of the node, or you can manually set {@link inertia}.
   */
  apply_torque(torque: float): void;
  /**
   * Applies a rotational impulse to the body without affecting the position.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * **Note:** {@link inertia} is required for this to work. To have {@link inertia}, an active {@link CollisionShape2D} must be a child of the node, or you can manually set {@link inertia}.
   */
  apply_torque_impulse(torque: float): void;
  /**
   * Returns a list of the bodies colliding with this one. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions.
   * **Note:** The result of this test is not immediate after moving objects. For performance, list of collisions is updated once per frame and before the physics step. Consider using signals instead.
   */
  get_colliding_bodies(): unknown;
  /**
   * Returns the number of contacts this body has with other bodies. By default, this returns 0 unless bodies are configured to monitor contacts (see {@link contact_monitor}).
   * **Note:** To retrieve the colliding bodies, use {@link get_colliding_bodies}.
   */
  get_contact_count(): int;
  /**
   * Sets the body's velocity on the given axis. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior.
   */
  set_axis_velocity(axis_velocity: Vector2): void;

  /**
   * Emitted when a collision with another {@link PhysicsBody2D} or {@link TileMap} occurs. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link TileMap}s are detected if the {@link TileSet} has Collision {@link Shape2D}s.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody2D} or {@link TileMap}.
   */
  body_entered: Signal<[Node]>;
  /**
   * Emitted when the collision with another {@link PhysicsBody2D} or {@link TileMap} ends. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link TileMap}s are detected if the {@link TileSet} has Collision {@link Shape2D}s.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody2D} or {@link TileMap}.
   */
  body_exited: Signal<[Node]>;
  /**
   * Emitted when one of this RigidBody2D's {@link Shape2D}s collides with another {@link PhysicsBody2D} or {@link TileMap}'s {@link Shape2D}s. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link TileMap}s are detected if the {@link TileSet} has Collision {@link Shape2D}s.
   * `body_rid` the {@link RID} of the other {@link PhysicsBody2D} or {@link TileSet}'s {@link CollisionObject2D} used by the {@link PhysicsServer2D}.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody2D} or {@link TileMap}.
   * `body_shape_index` the index of the {@link Shape2D} of the other {@link PhysicsBody2D} or {@link TileMap} used by the {@link PhysicsServer2D}. Get the {@link CollisionShape2D} node with `body.shape_owner_get_owner(body.shape_find_owner(body_shape_index))`.
   * `local_shape_index` the index of the {@link Shape2D} of this RigidBody2D used by the {@link PhysicsServer2D}. Get the {@link CollisionShape2D} node with `self.shape_owner_get_owner(self.shape_find_owner(local_shape_index))`.
   */
  body_shape_entered: Signal<[RID, Node, int, int]>;
  /**
   * Emitted when the collision between one of this RigidBody2D's {@link Shape2D}s and another {@link PhysicsBody2D} or {@link TileMap}'s {@link Shape2D}s ends. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link TileMap}s are detected if the {@link TileSet} has Collision {@link Shape2D}s.
   * `body_rid` the {@link RID} of the other {@link PhysicsBody2D} or {@link TileSet}'s {@link CollisionObject2D} used by the {@link PhysicsServer2D}.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody2D} or {@link TileMap}.
   * `body_shape_index` the index of the {@link Shape2D} of the other {@link PhysicsBody2D} or {@link TileMap} used by the {@link PhysicsServer2D}. Get the {@link CollisionShape2D} node with `body.shape_owner_get_owner(body.shape_find_owner(body_shape_index))`.
   * `local_shape_index` the index of the {@link Shape2D} of this RigidBody2D used by the {@link PhysicsServer2D}. Get the {@link CollisionShape2D} node with `self.shape_owner_get_owner(self.shape_find_owner(local_shape_index))`.
   */
  body_shape_exited: Signal<[RID, Node, int, int]>;
  /**
   * Emitted when the physics engine changes the body's sleeping state.
   * **Note:** Changing the value {@link sleeping} will not trigger this signal. It is only emitted if the sleeping state is changed by the physics engine or `emit_signal("sleeping_state_changed")` is used.
   */
  sleeping_state_changed: Signal<[]>;

  // enum FreezeMode
  /**
   * Static body freeze mode (default). The body is not affected by gravity and forces. It can be only moved by user code and doesn't collide with other bodies along its path.
   */
  static readonly FREEZE_MODE_STATIC: int;
  /**
   * Kinematic body freeze mode. Similar to {@link FREEZE_MODE_STATIC}, but collides with other bodies along its path when moved. Useful for a frozen body that needs to be animated.
   */
  static readonly FREEZE_MODE_KINEMATIC: int;
  // enum CenterOfMassMode
  /**
   * In this mode, the body's center of mass is calculated automatically based on its shapes. This assumes that the shapes' origins are also their center of mass.
   */
  static readonly CENTER_OF_MASS_MODE_AUTO: int;
  /**
   * In this mode, the body's center of mass is set through {@link center_of_mass}. Defaults to the body's origin position.
   */
  static readonly CENTER_OF_MASS_MODE_CUSTOM: int;
  // enum DampMode
  /** In this mode, the body's damping value is added to any value set in areas or the default value. */
  static readonly DAMP_MODE_COMBINE: int;
  /** In this mode, the body's damping value replaces any value set in areas or the default value. */
  static readonly DAMP_MODE_REPLACE: int;
  // enum CCDMode
  /**
   * Continuous collision detection disabled. This is the fastest way to detect body collisions, but can miss small, fast-moving objects.
   */
  static readonly CCD_MODE_DISABLED: int;
  /**
   * Continuous collision detection enabled using raycasting. This is faster than shapecasting but less precise.
   */
  static readonly CCD_MODE_CAST_RAY: int;
  /**
   * Continuous collision detection enabled using shapecasting. This is the slowest CCD method and the most precise.
   */
  static readonly CCD_MODE_CAST_SHAPE: int;
}
