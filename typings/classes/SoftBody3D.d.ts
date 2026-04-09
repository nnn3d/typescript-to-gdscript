// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A deformable 3D physics mesh. */
declare class SoftBody3D extends MeshInstance3D {
  /**
   * The physics layers this SoftBody3D **is in**. Collision objects can exist in one or more of 32 different layers. See also {@link collision_mask}.
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_layer: int;
  /**
   * The physics layers this SoftBody3D **scans**. Collision objects can scan one or more of 32 different layers. See also {@link collision_layer}.
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The body's damping coefficient. Higher values will slow down the body more noticeably when forces are applied.
   */
  damping_coefficient: float;
  /**
   * Defines the behavior in physics when {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}.
   */
  disable_mode: int;
  /**
   * The body's drag coefficient. Higher values increase this body's air resistance.
   * **Note:** This value is currently unused by Godot's default physics implementation.
   */
  drag_coefficient: float;
  /**
   * Higher values will result in a stiffer body, while lower values will increase the body's ability to bend. The value can be between `0.0` and `1.0` (inclusive).
   */
  linear_stiffness: float;
  /** {@link NodePath} to a {@link CollisionObject3D} this SoftBody3D should avoid clipping. */
  parent_collision_ignore: NodePath;
  /**
   * The pressure coefficient of this soft body. Simulate pressure build-up from inside this body. Higher values increase the strength of this effect.
   */
  pressure_coefficient: float;
  /** If `true`, the {@link SoftBody3D} will respond to {@link RayCast3D}s. */
  ray_pickable: boolean;
  /**
   * Scales the rest lengths of {@link SoftBody3D}'s edge constraints. Positive values shrink the mesh, while negative values expand it. For example, a value of `0.1` shortens the edges of the mesh by 10%, while `-0.1` expands the edges by 10%.
   * **Note:** {@link shrinking_factor} is best used on surface meshes with pinned points.
   */
  shrinking_factor: float;
  /**
   * Increasing this value will improve the resulting simulation, but can affect performance. Use with care.
   */
  simulation_precision: int;
  /** The SoftBody3D's mass. */
  total_mass: float;
  set_collision_layer(value: int): void;
  get_collision_layer(): int;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_damping_coefficient(value: float): void;
  get_damping_coefficient(): float;
  set_disable_mode(value: int): void;
  get_disable_mode(): int;
  set_drag_coefficient(value: float): void;
  get_drag_coefficient(): float;
  set_linear_stiffness(value: float): void;
  get_linear_stiffness(): float;
  set_parent_collision_ignore(value: NodePath | string): void;
  get_parent_collision_ignore(): NodePath;
  set_pressure_coefficient(value: float): void;
  get_pressure_coefficient(): float;
  set_ray_pickable(value: boolean): void;
  is_ray_pickable(): boolean;
  set_shrinking_factor(value: float): void;
  get_shrinking_factor(): float;
  set_simulation_precision(value: int): void;
  get_simulation_precision(): int;
  set_total_mass(value: float): void;
  get_total_mass(): float;

  /** Adds a body to the list of bodies that this body can't collide with. */
  add_collision_exception_with(body: Node): void;
  /**
   * Distributes and applies a force to all points. A force is time dependent and meant to be applied every physics update.
   */
  apply_central_force(force: Vector3 | Vector3i): void;
  /**
   * Distributes and applies an impulse to all points.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  apply_central_impulse(impulse: Vector3 | Vector3i): void;
  /** Applies a force to a point. A force is time dependent and meant to be applied every physics update. */
  apply_force(point_index: int, force: Vector3 | Vector3i): void;
  /**
   * Applies an impulse to a point.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  apply_impulse(point_index: int, impulse: Vector3 | Vector3i): void;
  /** Returns an array of nodes that were added as collision exceptions for this body. */
  get_collision_exceptions(): Array<PhysicsBody3D>;
  /**
   * Returns whether or not the specified layer of the {@link collision_layer} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_layer_value(layer_number: int): boolean;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /** Returns the internal {@link RID} used by the {@link PhysicsServer3D} for this body. */
  get_physics_rid(): RID;
  /** Returns local translation of a vertex in the surface array. */
  get_point_transform(point_index: int): Vector3;
  /** Returns `true` if vertex is set to pinned. */
  is_point_pinned(point_index: int): boolean;
  /** Removes a body from the list of bodies that this body can't collide with. */
  remove_collision_exception_with(body: Node): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_layer}, given a `layer_number` between 1 and 32.
   */
  set_collision_layer_value(layer_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
  /**
   * Sets the pinned state of a surface vertex. When set to `true`, the optional `attachment_path` can define a {@link Node3D} the pinned vertex will be attached to.
   */
  set_point_pinned(point_index: int, pinned: boolean, attachment_path?: NodePath | string, insert_at?: int): void;

  // enum DisableMode
  /**
   * When {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}, remove from the physics simulation to stop all physics interactions with this {@link SoftBody3D}.
   * Automatically re-added to the physics simulation when the {@link Node} is processed again.
   */
  static readonly DISABLE_MODE_REMOVE: int;
  /**
   * When {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}, do not affect the physics simulation.
   */
  static readonly DISABLE_MODE_KEEP_ACTIVE: int;
}
