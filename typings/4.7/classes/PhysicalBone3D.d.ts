// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A physics body used to make bones in a {@link Skeleton3D} react to physics. */
declare class PhysicalBone3D<Tree extends object = any> extends PhysicsBody3D<Tree> {
  /**
   * Damps the body's rotation. By default, the body will use the {@link ProjectSettings.physics/3d/default_angular_damp} project setting or any value override set by an {@link Area3D} the body is in. Depending on {@link angular_damp_mode}, you can set {@link angular_damp} to be added to or to replace the body's damping value.
   * See {@link ProjectSettings.physics/3d/default_angular_damp} for more details about damping.
   */
  angular_damp: float;
  /** Defines how {@link angular_damp} is applied. */
  angular_damp_mode: int;
  /** The PhysicalBone3D's rotational velocity in *radians* per second. */
  angular_velocity: Vector3;
  /** Sets the body's transform. */
  body_offset: Transform3D;
  /**
   * The body's bounciness. Values range from `0` (no bounce) to `1` (full bounciness).
   * **Note:** Even with {@link bounce} set to `1.0`, some energy will be lost over time due to linear and angular damping. To have a {@link PhysicalBone3D} that preserves all its energy over time, set {@link bounce} to `1.0`, {@link linear_damp_mode} to {@link DAMP_MODE_REPLACE}, {@link linear_damp} to `0.0`, {@link angular_damp_mode} to {@link DAMP_MODE_REPLACE}, and {@link angular_damp} to `0.0`.
   */
  bounce: float;
  /**
   * If `true`, the body is deactivated when there is no movement, so it will not take part in the simulation until it is awakened by an external force.
   */
  can_sleep: boolean;
  /**
   * If `true`, the standard force integration (like gravity or damping) will be disabled for this body. Other than collision response, the body will only move as determined by the {@link _integrate_forces} method, if that virtual method is overridden.
   * Setting this property will call the method {@link PhysicsServer3D.body_set_omit_force_integration} internally.
   */
  custom_integrator: boolean;
  /** The body's friction, from `0` (frictionless) to `1` (max friction). */
  friction: float;
  /**
   * This is multiplied by {@link ProjectSettings.physics/3d/default_gravity} to produce this body's gravity. For example, a value of `1.0` will apply normal gravity, `2.0` will apply double the gravity, and `0.5` will apply half the gravity to this body.
   */
  gravity_scale: float;
  /** Sets the joint's transform. */
  joint_offset: Transform3D;
  /** Sets the joint's rotation in radians. */
  joint_rotation: Vector3;
  /** Sets the joint type. */
  joint_type: int;
  /**
   * Damps the body's movement. By default, the body will use {@link ProjectSettings.physics/3d/default_linear_damp} or any value override set by an {@link Area3D} the body is in. Depending on {@link linear_damp_mode}, {@link linear_damp} may be added to or replace the body's damping value.
   * See {@link ProjectSettings.physics/3d/default_linear_damp} for more details about damping.
   */
  linear_damp: float;
  /** Defines how {@link linear_damp} is applied. */
  linear_damp_mode: int;
  /**
   * The body's linear velocity in units per second. Can be used sporadically, but **don't set this every frame**, because physics may run in another thread and runs at a different granularity. Use {@link _integrate_forces} as your process loop for precise control of the body state.
   */
  linear_velocity: Vector3;
  /** The body's mass. */
  mass: float;
  set_angular_damp(value: float): void;
  get_angular_damp(): float;
  set_angular_damp_mode(value: int): void;
  get_angular_damp_mode(): int;
  set_angular_velocity(value: Vector3): void;
  get_angular_velocity(): Vector3;
  set_body_offset(value: Transform3D): void;
  get_body_offset(): Transform3D;
  set_bounce(value: float): void;
  get_bounce(): float;
  set_can_sleep(value: boolean): void;
  is_able_to_sleep(): boolean;
  set_use_custom_integrator(value: boolean): void;
  is_using_custom_integrator(): boolean;
  set_friction(value: float): void;
  get_friction(): float;
  set_gravity_scale(value: float): void;
  get_gravity_scale(): float;
  set_joint_offset(value: Transform3D): void;
  get_joint_offset(): Transform3D;
  set_joint_rotation(value: Vector3): void;
  get_joint_rotation(): Vector3;
  set_joint_type(value: int): void;
  get_joint_type(): int;
  set_linear_damp(value: float): void;
  get_linear_damp(): float;
  set_linear_damp_mode(value: int): void;
  get_linear_damp_mode(): int;
  set_linear_velocity(value: Vector3): void;
  get_linear_velocity(): Vector3;
  set_mass(value: float): void;
  get_mass(): float;

  /**
   * Called during physics processing, allowing you to read and safely modify the simulation state for the object. By default, it is called before the standard force integration, but the {@link custom_integrator} property allows you to disable the standard force integration and do fully custom force integration for a body.
   */
  _integrate_forces(state: PhysicsDirectBodyState3D): void;
  /**
   * Applies a directional impulse without affecting rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_integrate_forces" functions otherwise).
   * This is equivalent to using {@link apply_impulse} at the body's center of mass.
   */
  apply_central_impulse(impulse: Vector3): void;
  /**
   * Applies a positioned impulse to the PhysicsBone3D.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_integrate_forces" functions otherwise).
   * `position` is the offset from the PhysicsBone3D origin in global coordinates.
   */
  apply_impulse(impulse: Vector3, position?: Vector3): void;
  /** Returns the unique identifier of the PhysicsBone3D. */
  get_bone_id(): int;
  /** Returns `true` if the PhysicsBone3D is allowed to simulate physics. */
  get_simulate_physics(): boolean;
  /** Returns `true` if the PhysicsBone3D is currently simulating physics. */
  is_simulating_physics(): boolean;

  // enum DampMode
  /** In this mode, the body's damping value is added to any value set in areas or the default value. */
  static readonly DAMP_MODE_COMBINE: int;
  /** In this mode, the body's damping value replaces any value set in areas or the default value. */
  static readonly DAMP_MODE_REPLACE: int;
  // enum JointType
  /** No joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_NONE: int;
  /** A pin joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_PIN: int;
  /** A cone joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_CONE: int;
  /** A hinge joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_HINGE: int;
  /** A slider joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_SLIDER: int;
  /** A 6 degrees of freedom joint is applied to the PhysicsBone3D. */
  static readonly JOINT_TYPE_6DOF: int;
}
