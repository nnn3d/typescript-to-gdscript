// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 3D physics body that is moved by a physics simulation. */
declare class RigidBody3D<Tree extends object = any> extends PhysicsBody3D<Tree> {
  /**
   * Damps the body's rotation. By default, the body will use the {@link ProjectSettings.physics/3d/default_angular_damp} project setting or any value override set by an {@link Area3D} the body is in. Depending on {@link angular_damp_mode}, you can set {@link angular_damp} to be added to or to replace the body's damping value.
   * See {@link ProjectSettings.physics/3d/default_angular_damp} for more details about damping.
   */
  angular_damp: float;
  /** Defines how {@link angular_damp} is applied. */
  angular_damp_mode: int;
  /** The RigidBody3D's rotational velocity in *radians* per second. */
  angular_velocity: Vector3;
  /** If `true`, the body can enter sleep mode when there is no movement. See {@link sleeping}. */
  can_sleep: boolean;
  /**
   * The body's custom center of mass, relative to the body's origin position, when {@link center_of_mass_mode} is set to {@link CENTER_OF_MASS_MODE_CUSTOM}. This is the balanced point of the body, where applied forces only cause linear acceleration. Applying forces outside of the center of mass causes angular acceleration.
   * When {@link center_of_mass_mode} is set to {@link CENTER_OF_MASS_MODE_AUTO} (default value), the center of mass is automatically determined, but this does not update the value of {@link center_of_mass}.
   */
  center_of_mass: Vector3;
  /** Defines the way the body's center of mass is set. */
  center_of_mass_mode: int;
  /**
   * The body's total constant positional forces applied during each physics update.
   * See {@link add_constant_force} and {@link add_constant_central_force}.
   */
  constant_force: Vector3;
  /**
   * The body's total constant rotational forces applied during each physics update.
   * See {@link add_constant_torque}.
   */
  constant_torque: Vector3;
  /**
   * If `true`, the RigidBody3D will emit signals when it collides with another body.
   * **Note:** By default the maximum contacts reported is set to 0, meaning nothing will be recorded, see {@link max_contacts_reported}.
   */
  contact_monitor: boolean;
  /**
   * If `true`, continuous collision detection is used.
   * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided. Continuous collision detection is more precise, and misses fewer impacts by small, fast-moving objects. Not using continuous collision detection is faster to compute, but can miss small, fast-moving objects.
   */
  continuous_cd: boolean;
  /**
   * If `true`, the standard force integration (like gravity or damping) will be disabled for this body. Other than collision response, the body will only move as determined by the {@link _integrate_forces} method, if that virtual method is overridden.
   * Setting this property will call the method {@link PhysicsServer3D.body_set_omit_force_integration} internally.
   */
  custom_integrator: boolean;
  /**
   * If `true`, the body is frozen. Gravity and forces are not applied anymore.
   * See {@link freeze_mode} to set the body's behavior when frozen.
   * **Note:** For a body that is always frozen, use {@link StaticBody3D} or {@link AnimatableBody3D} instead.
   */
  freeze: boolean;
  /**
   * The body's freeze mode. Determines the body's behavior when {@link freeze} is `true`.
   * **Note:** For a body that is always frozen, use {@link StaticBody3D} or {@link AnimatableBody3D} instead.
   */
  freeze_mode: int;
  /**
   * This is multiplied by {@link ProjectSettings.physics/3d/default_gravity} to produce this body's gravity. For example, a value of `1.0` will apply normal gravity, `2.0` will apply double the gravity, and `0.5` will apply half the gravity to this body.
   */
  gravity_scale: float;
  /**
   * The body's moment of inertia. This is like mass, but for rotation: it determines how much torque it takes to rotate the body on each axis. The moment of inertia is usually computed automatically from the mass and the shapes, but this property allows you to set a custom value.
   * If set to {@link Vector3.ZERO}, inertia is automatically computed (default value).
   * **Note:** This value does not change when inertia is automatically computed. Use {@link PhysicsServer3D} to get the computed inertia.
   */
  inertia: Vector3;
  /**
   * Damps the body's movement. By default, the body will use the {@link ProjectSettings.physics/3d/default_linear_damp} project setting or any value override set by an {@link Area3D} the body is in. Depending on {@link linear_damp_mode}, you can set {@link linear_damp} to be added to or to replace the body's damping value.
   * See {@link ProjectSettings.physics/3d/default_linear_damp} for more details about damping.
   */
  linear_damp: float;
  /** Defines how {@link linear_damp} is applied. */
  linear_damp_mode: int;
  /**
   * The body's linear velocity in units per second. Can be used sporadically, but **don't set this every frame**, because physics may run in another thread and runs at a different granularity. Use {@link _integrate_forces} as your process loop for precise control of the body state.
   */
  linear_velocity: Vector3;
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
  set_angular_damp(value: float): void;
  get_angular_damp(): float;
  set_angular_damp_mode(value: int): void;
  get_angular_damp_mode(): int;
  set_angular_velocity(value: Vector3): void;
  get_angular_velocity(): Vector3;
  set_can_sleep(value: boolean): void;
  is_able_to_sleep(): boolean;
  set_center_of_mass(value: Vector3): void;
  get_center_of_mass(): Vector3;
  set_center_of_mass_mode(value: int): void;
  get_center_of_mass_mode(): int;
  set_constant_force(value: Vector3): void;
  get_constant_force(): Vector3;
  set_constant_torque(value: Vector3): void;
  get_constant_torque(): Vector3;
  set_contact_monitor(value: boolean): void;
  is_contact_monitor_enabled(): boolean;
  set_use_continuous_collision_detection(value: boolean): void;
  is_using_continuous_collision_detection(): boolean;
  set_use_custom_integrator(value: boolean): void;
  is_using_custom_integrator(): boolean;
  set_freeze_enabled(value: boolean): void;
  is_freeze_enabled(): boolean;
  set_freeze_mode(value: int): void;
  get_freeze_mode(): int;
  set_gravity_scale(value: float): void;
  get_gravity_scale(): float;
  set_inertia(value: Vector3): void;
  get_inertia(): Vector3;
  set_linear_damp(value: float): void;
  get_linear_damp(): float;
  set_linear_damp_mode(value: int): void;
  get_linear_damp_mode(): int;
  set_linear_velocity(value: Vector3): void;
  get_linear_velocity(): Vector3;
  set_lock_rotation_enabled(value: boolean): void;
  is_lock_rotation_enabled(): boolean;
  set_mass(value: float): void;
  get_mass(): float;
  set_max_contacts_reported(value: int): void;
  get_max_contacts_reported(): int;
  set_physics_material_override(value: PhysicsMaterial): void;
  get_physics_material_override(): PhysicsMaterial;
  set_sleeping(value: boolean): void;
  is_sleeping(): boolean;

  /**
   * Called during physics processing, allowing you to read and safely modify the simulation state for the object. By default, it is called before the standard force integration, but the {@link custom_integrator} property allows you to disable the standard force integration and do fully custom force integration for a body.
   */
  _integrate_forces(state: PhysicsDirectBodyState3D): void;
  /**
   * Adds a constant directional force without affecting rotation that keeps being applied over time until cleared with `constant_force = Vector3(0, 0, 0)`.
   * This is equivalent to using {@link add_constant_force} at the body's center of mass.
   */
  add_constant_central_force(force: Vector3): void;
  /**
   * Adds a constant positioned force to the body that keeps being applied over time until cleared with `constant_force = Vector3(0, 0, 0)`.
   * `position` is the offset from the body origin in global coordinates.
   */
  add_constant_force(force: Vector3, position?: Vector3): void;
  /**
   * Adds a constant rotational force without affecting position that keeps being applied over time until cleared with `constant_torque = Vector3(0, 0, 0)`.
   */
  add_constant_torque(torque: Vector3): void;
  /**
   * Applies a directional force without affecting rotation. A force is time dependent and meant to be applied every physics update.
   * This is equivalent to using {@link apply_force} at the body's center of mass.
   */
  apply_central_force(force: Vector3): void;
  /**
   * Applies a directional impulse without affecting rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * This is equivalent to using {@link apply_impulse} at the body's center of mass.
   */
  apply_central_impulse(impulse: Vector3): void;
  /**
   * Applies a positioned force to the body. A force is time dependent and meant to be applied every physics update.
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_force(force: Vector3, position?: Vector3): void;
  /**
   * Applies a positioned impulse to the body.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * `position` is the offset from the body origin in global coordinates.
   */
  apply_impulse(impulse: Vector3, position?: Vector3): void;
  /**
   * Applies a rotational force without affecting position. A force is time dependent and meant to be applied every physics update.
   * **Note:** {@link inertia} is required for this to work. To have {@link inertia}, an active {@link CollisionShape3D} must be a child of the node, or you can manually set {@link inertia}.
   */
  apply_torque(torque: Vector3): void;
  /**
   * Applies a rotational impulse to the body without affecting the position.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * **Note:** {@link inertia} is required for this to work. To have {@link inertia}, an active {@link CollisionShape3D} must be a child of the node, or you can manually set {@link inertia}.
   */
  apply_torque_impulse(impulse: Vector3): void;
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
   * Returns the inverse inertia tensor basis. This is used to calculate the angular acceleration resulting from a torque applied to the {@link RigidBody3D}.
   */
  get_inverse_inertia_tensor(): Basis;
  /**
   * Sets an axis velocity. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior.
   */
  set_axis_velocity(axis_velocity: Vector3): void;

  /**
   * Emitted when a collision with another {@link PhysicsBody3D} or {@link GridMap} occurs. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link GridMap}s are detected if the {@link MeshLibrary} has Collision {@link Shape3D}s.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody3D} or {@link GridMap}.
   */
  body_entered: Signal<[Node]>;
  /**
   * Emitted when the collision with another {@link PhysicsBody3D} or {@link GridMap} ends. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link GridMap}s are detected if the {@link MeshLibrary} has Collision {@link Shape3D}s.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody3D} or {@link GridMap}.
   */
  body_exited: Signal<[Node]>;
  /**
   * Emitted when one of this RigidBody3D's {@link Shape3D}s collides with another {@link PhysicsBody3D} or {@link GridMap}'s {@link Shape3D}s. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link GridMap}s are detected if the {@link MeshLibrary} has Collision {@link Shape3D}s.
   * `body_rid` the {@link RID} of the other {@link PhysicsBody3D} or {@link MeshLibrary}'s {@link CollisionObject3D} used by the {@link PhysicsServer3D}.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody3D} or {@link GridMap}.
   * `body_shape_index` the index of the {@link Shape3D} of the other {@link PhysicsBody3D} or {@link GridMap} used by the {@link PhysicsServer3D}. Get the {@link CollisionShape3D} node with `body.shape_owner_get_owner(body.shape_find_owner(body_shape_index))`.
   * `local_shape_index` the index of the {@link Shape3D} of this RigidBody3D used by the {@link PhysicsServer3D}. Get the {@link CollisionShape3D} node with `self.shape_owner_get_owner(self.shape_find_owner(local_shape_index))`.
   */
  body_shape_entered: Signal<[RID, Node, int, int]>;
  /**
   * Emitted when the collision between one of this RigidBody3D's {@link Shape3D}s and another {@link PhysicsBody3D} or {@link GridMap}'s {@link Shape3D}s ends. Requires {@link contact_monitor} to be set to `true` and {@link max_contacts_reported} to be set high enough to detect all the collisions. {@link GridMap}s are detected if the {@link MeshLibrary} has Collision {@link Shape3D}s.
   * `body_rid` the {@link RID} of the other {@link PhysicsBody3D} or {@link MeshLibrary}'s {@link CollisionObject3D} used by the {@link PhysicsServer3D}. {@link GridMap}s are detected if the Meshes have {@link Shape3D}s.
   * `body` the {@link Node}, if it exists in the tree, of the other {@link PhysicsBody3D} or {@link GridMap}.
   * `body_shape_index` the index of the {@link Shape3D} of the other {@link PhysicsBody3D} or {@link GridMap} used by the {@link PhysicsServer3D}. Get the {@link CollisionShape3D} node with `body.shape_owner_get_owner(body.shape_find_owner(body_shape_index))`.
   * `local_shape_index` the index of the {@link Shape3D} of this RigidBody3D used by the {@link PhysicsServer3D}. Get the {@link CollisionShape3D} node with `self.shape_owner_get_owner(self.shape_find_owner(local_shape_index))`.
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
}
