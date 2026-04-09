// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Provides virtual methods that can be overridden to create custom {@link PhysicsDirectBodyState2D} implementations.
 */
declare class PhysicsDirectBodyState2DExtension extends PhysicsDirectBodyState2D {
  /** Overridable version of {@link PhysicsDirectBodyState2D.add_constant_central_force}. */
  _add_constant_central_force(force: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.add_constant_force}. */
  _add_constant_force(force: Vector2, position: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.add_constant_torque}. */
  _add_constant_torque(torque: float): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_central_force}. */
  _apply_central_force(force: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_central_impulse}. */
  _apply_central_impulse(impulse: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_force}. */
  _apply_force(force: Vector2, position: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_impulse}. */
  _apply_impulse(impulse: Vector2, position: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_torque}. */
  _apply_torque(torque: float): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.apply_torque_impulse}. */
  _apply_torque_impulse(impulse: float): void;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.angular_velocity} and its respective getter.
   */
  _get_angular_velocity(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.center_of_mass} and its respective getter.
   */
  _get_center_of_mass(): Vector2;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.center_of_mass_local} and its respective getter.
   */
  _get_center_of_mass_local(): Vector2;
  _get_collision_layer(): int;
  _get_collision_mask(): int;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_constant_force}. */
  _get_constant_force(): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_constant_torque}. */
  _get_constant_torque(): float;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider}. */
  _get_contact_collider(contact_idx: int): RID;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider_id}. */
  _get_contact_collider_id(contact_idx: int): int;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider_object}. */
  _get_contact_collider_object(contact_idx: int): GodotObject | null;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider_position}. */
  _get_contact_collider_position(contact_idx: int): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider_shape}. */
  _get_contact_collider_shape(contact_idx: int): int;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_collider_velocity_at_position}. */
  _get_contact_collider_velocity_at_position(contact_idx: int): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_count}. */
  _get_contact_count(): int;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_impulse}. */
  _get_contact_impulse(contact_idx: int): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_local_normal}. */
  _get_contact_local_normal(contact_idx: int): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_local_position}. */
  _get_contact_local_position(contact_idx: int): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_local_shape}. */
  _get_contact_local_shape(contact_idx: int): int;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_contact_local_velocity_at_position}. */
  _get_contact_local_velocity_at_position(contact_idx: int): Vector2;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.inverse_inertia} and its respective getter.
   */
  _get_inverse_inertia(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.inverse_mass} and its respective getter.
   */
  _get_inverse_mass(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.linear_velocity} and its respective getter.
   */
  _get_linear_velocity(): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_space_state}. */
  _get_space_state(): PhysicsDirectSpaceState2D | null;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.step} and its respective getter.
   */
  _get_step(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.total_angular_damp} and its respective getter.
   */
  _get_total_angular_damp(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.total_gravity} and its respective getter.
   */
  _get_total_gravity(): Vector2;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.total_linear_damp} and its respective getter.
   */
  _get_total_linear_damp(): float;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.transform} and its respective getter.
   */
  _get_transform(): Transform2D;
  /** Overridable version of {@link PhysicsDirectBodyState2D.get_velocity_at_local_position}. */
  _get_velocity_at_local_position(local_position: Vector2): Vector2;
  /** Overridable version of {@link PhysicsDirectBodyState2D.integrate_forces}. */
  _integrate_forces(): void;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.sleeping} and its respective getter.
   */
  _is_sleeping(): boolean;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.angular_velocity} and its respective setter.
   */
  _set_angular_velocity(velocity: float): void;
  _set_collision_layer(layer: int): void;
  _set_collision_mask(mask: int): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.set_constant_force}. */
  _set_constant_force(force: Vector2): void;
  /** Overridable version of {@link PhysicsDirectBodyState2D.set_constant_torque}. */
  _set_constant_torque(torque: float): void;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.linear_velocity} and its respective setter.
   */
  _set_linear_velocity(velocity: Vector2): void;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.sleeping} and its respective setter.
   */
  _set_sleep_state(enabled: boolean): void;
  /**
   * Implement to override the behavior of {@link PhysicsDirectBodyState2D.transform} and its respective setter.
   */
  _set_transform(transform: Transform2D): void;
}
