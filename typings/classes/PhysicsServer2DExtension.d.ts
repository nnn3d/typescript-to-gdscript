// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Provides virtual methods that can be overridden to create custom {@link PhysicsServer2D} implementations.
 */
declare class PhysicsServer2DExtension extends PhysicsServer2D {
  /** Overridable version of {@link PhysicsServer2D.area_add_shape}. */
  _area_add_shape(area: RID, shape: RID, transform: Transform2D, disabled: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.area_attach_canvas_instance_id}. */
  _area_attach_canvas_instance_id(area: RID, id: int): void;
  /** Overridable version of {@link PhysicsServer2D.area_attach_object_instance_id}. */
  _area_attach_object_instance_id(area: RID, id: int): void;
  /** Overridable version of {@link PhysicsServer2D.area_clear_shapes}. */
  _area_clear_shapes(area: RID): void;
  /** Overridable version of {@link PhysicsServer2D.area_create}. */
  _area_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.area_get_canvas_instance_id}. */
  _area_get_canvas_instance_id(area: RID): int;
  /** Overridable version of {@link PhysicsServer2D.area_get_collision_layer}. */
  _area_get_collision_layer(area: RID): int;
  /** Overridable version of {@link PhysicsServer2D.area_get_collision_mask}. */
  _area_get_collision_mask(area: RID): int;
  /** Overridable version of {@link PhysicsServer2D.area_get_object_instance_id}. */
  _area_get_object_instance_id(area: RID): int;
  /** Overridable version of {@link PhysicsServer2D.area_get_param}. */
  _area_get_param(area: RID, param: int): unknown;
  /** Overridable version of {@link PhysicsServer2D.area_get_shape}. */
  _area_get_shape(area: RID, shape_idx: int): RID;
  /** Overridable version of {@link PhysicsServer2D.area_get_shape_count}. */
  _area_get_shape_count(area: RID): int;
  /** Overridable version of {@link PhysicsServer2D.area_get_shape_transform}. */
  _area_get_shape_transform(area: RID, shape_idx: int): Transform2D;
  /** Overridable version of {@link PhysicsServer2D.area_get_space}. */
  _area_get_space(area: RID): RID;
  /** Overridable version of {@link PhysicsServer2D.area_get_transform}. */
  _area_get_transform(area: RID): Transform2D;
  /** Overridable version of {@link PhysicsServer2D.area_remove_shape}. */
  _area_remove_shape(area: RID, shape_idx: int): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_area_monitor_callback}. */
  _area_set_area_monitor_callback(area: RID, callback: Callable): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_collision_layer}. */
  _area_set_collision_layer(area: RID, layer: int): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_collision_mask}. */
  _area_set_collision_mask(area: RID, mask: int): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_monitor_callback}. */
  _area_set_monitor_callback(area: RID, callback: Callable): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_monitorable}. */
  _area_set_monitorable(area: RID, monitorable: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_param}. */
  _area_set_param(area: RID, param: int, value: unknown): void;
  /**
   * If set to `true`, allows the area with the given {@link RID} to detect mouse inputs when the mouse cursor is hovering on it.
   * Overridable version of {@link PhysicsServer2D}'s internal `area_set_pickable` method. Corresponds to {@link CollisionObject2D.input_pickable}.
   */
  _area_set_pickable(area: RID, pickable: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_shape}. */
  _area_set_shape(area: RID, shape_idx: int, shape: RID): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_shape_disabled}. */
  _area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_shape_transform}. */
  _area_set_shape_transform(area: RID, shape_idx: int, transform: Transform2D): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_space}. */
  _area_set_space(area: RID, space: RID): void;
  /** Overridable version of {@link PhysicsServer2D.area_set_transform}. */
  _area_set_transform(area: RID, transform: Transform2D): void;
  /** Overridable version of {@link PhysicsServer2D.body_add_collision_exception}. */
  _body_add_collision_exception(body: RID, excepted_body: RID): void;
  /** Overridable version of {@link PhysicsServer2D.body_add_constant_central_force}. */
  _body_add_constant_central_force(body: RID, force: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_add_constant_force}. */
  _body_add_constant_force(body: RID, force: Vector2 | Vector2i, position: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_add_constant_torque}. */
  _body_add_constant_torque(body: RID, torque: float): void;
  /** Overridable version of {@link PhysicsServer2D.body_add_shape}. */
  _body_add_shape(body: RID, shape: RID, transform: Transform2D, disabled: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_central_force}. */
  _body_apply_central_force(body: RID, force: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_central_impulse}. */
  _body_apply_central_impulse(body: RID, impulse: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_force}. */
  _body_apply_force(body: RID, force: Vector2 | Vector2i, position: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_impulse}. */
  _body_apply_impulse(body: RID, impulse: Vector2 | Vector2i, position: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_torque}. */
  _body_apply_torque(body: RID, torque: float): void;
  /** Overridable version of {@link PhysicsServer2D.body_apply_torque_impulse}. */
  _body_apply_torque_impulse(body: RID, impulse: float): void;
  /** Overridable version of {@link PhysicsServer2D.body_attach_canvas_instance_id}. */
  _body_attach_canvas_instance_id(body: RID, id: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_attach_object_instance_id}. */
  _body_attach_object_instance_id(body: RID, id: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_clear_shapes}. */
  _body_clear_shapes(body: RID): void;
  /**
   * Given a `body`, a `shape`, and their respective parameters, this method should return `true` if a collision between the two would occur, with additional details passed in `results`.
   * Overridable version of {@link PhysicsServer2D}'s internal `shape_collide` method. Corresponds to {@link PhysicsDirectSpaceState2D.collide_shape}.
   */
  _body_collide_shape(body: RID, body_shape: int, shape: RID, shape_xform: Transform2D, motion: Vector2 | Vector2i, results: void, result_max: int, result_count: int): boolean;
  /** Overridable version of {@link PhysicsServer2D.body_create}. */
  _body_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.body_get_canvas_instance_id}. */
  _body_get_canvas_instance_id(body: RID): int;
  /**
   * Returns the {@link RID}s of all bodies added as collision exceptions for the given `body`. See also {@link _body_add_collision_exception} and {@link _body_remove_collision_exception}.
   * Overridable version of {@link PhysicsServer2D}'s internal `body_get_collision_exceptions` method. Corresponds to {@link PhysicsBody2D.get_collision_exceptions}.
   */
  _body_get_collision_exceptions(body: RID): Array<RID>;
  /** Overridable version of {@link PhysicsServer2D.body_get_collision_layer}. */
  _body_get_collision_layer(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_collision_mask}. */
  _body_get_collision_mask(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_collision_priority}. */
  _body_get_collision_priority(body: RID): float;
  /** Overridable version of {@link PhysicsServer2D.body_get_constant_force}. */
  _body_get_constant_force(body: RID): Vector2;
  /** Overridable version of {@link PhysicsServer2D.body_get_constant_torque}. */
  _body_get_constant_torque(body: RID): float;
  /**
   * Overridable version of {@link PhysicsServer2D}'s internal `body_get_contacts_reported_depth_threshold` method.
   * **Note:** This method is currently unused by Godot's default physics implementation.
   */
  _body_get_contacts_reported_depth_threshold(body: RID): float;
  /** Overridable version of {@link PhysicsServer2D.body_get_continuous_collision_detection_mode}. */
  _body_get_continuous_collision_detection_mode(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_direct_state}. */
  _body_get_direct_state(body: RID): PhysicsDirectBodyState2D | null;
  /** Overridable version of {@link PhysicsServer2D.body_get_max_contacts_reported}. */
  _body_get_max_contacts_reported(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_mode}. */
  _body_get_mode(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_object_instance_id}. */
  _body_get_object_instance_id(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_param}. */
  _body_get_param(body: RID, param: int): unknown;
  /** Overridable version of {@link PhysicsServer2D.body_get_shape}. */
  _body_get_shape(body: RID, shape_idx: int): RID;
  /** Overridable version of {@link PhysicsServer2D.body_get_shape_count}. */
  _body_get_shape_count(body: RID): int;
  /** Overridable version of {@link PhysicsServer2D.body_get_shape_transform}. */
  _body_get_shape_transform(body: RID, shape_idx: int): Transform2D;
  /** Overridable version of {@link PhysicsServer2D.body_get_space}. */
  _body_get_space(body: RID): RID;
  /** Overridable version of {@link PhysicsServer2D.body_get_state}. */
  _body_get_state(body: RID, state: int): unknown;
  /** Overridable version of {@link PhysicsServer2D.body_is_omitting_force_integration}. */
  _body_is_omitting_force_integration(body: RID): boolean;
  /** Overridable version of {@link PhysicsServer2D.body_remove_collision_exception}. */
  _body_remove_collision_exception(body: RID, excepted_body: RID): void;
  /** Overridable version of {@link PhysicsServer2D.body_remove_shape}. */
  _body_remove_shape(body: RID, shape_idx: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_reset_mass_properties}. */
  _body_reset_mass_properties(body: RID): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_axis_velocity}. */
  _body_set_axis_velocity(body: RID, axis_velocity: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_collision_layer}. */
  _body_set_collision_layer(body: RID, layer: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_collision_mask}. */
  _body_set_collision_mask(body: RID, mask: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_collision_priority}. */
  _body_set_collision_priority(body: RID, priority: float): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_constant_force}. */
  _body_set_constant_force(body: RID, force: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_constant_torque}. */
  _body_set_constant_torque(body: RID, torque: float): void;
  /**
   * Overridable version of {@link PhysicsServer2D}'s internal `body_set_contacts_reported_depth_threshold` method.
   * **Note:** This method is currently unused by Godot's default physics implementation.
   */
  _body_set_contacts_reported_depth_threshold(body: RID, threshold: float): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_continuous_collision_detection_mode}. */
  _body_set_continuous_collision_detection_mode(body: RID, mode: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_force_integration_callback}. */
  _body_set_force_integration_callback(body: RID, callable: Callable, userdata: unknown): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_max_contacts_reported}. */
  _body_set_max_contacts_reported(body: RID, amount: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_mode}. */
  _body_set_mode(body: RID, mode: int): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_omit_force_integration}. */
  _body_set_omit_force_integration(body: RID, enable: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_param}. */
  _body_set_param(body: RID, param: int, value: unknown): void;
  /**
   * If set to `true`, allows the body with the given {@link RID} to detect mouse inputs when the mouse cursor is hovering on it.
   * Overridable version of {@link PhysicsServer2D}'s internal `body_set_pickable` method. Corresponds to {@link CollisionObject2D.input_pickable}.
   */
  _body_set_pickable(body: RID, pickable: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_shape}. */
  _body_set_shape(body: RID, shape_idx: int, shape: RID): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_shape_as_one_way_collision}. */
  _body_set_shape_as_one_way_collision(body: RID, shape_idx: int, enable: boolean, margin: float, direction: Vector2 | Vector2i): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_shape_disabled}. */
  _body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_shape_transform}. */
  _body_set_shape_transform(body: RID, shape_idx: int, transform: Transform2D): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_space}. */
  _body_set_space(body: RID, space: RID): void;
  /** Overridable version of {@link PhysicsServer2D.body_set_state}. */
  _body_set_state(body: RID, state: int, value: unknown): void;
  /**
   * Assigns the `body` to call the given `callable` during the synchronization phase of the loop, before {@link _step} is called. See also {@link _sync}.
   * Overridable version of {@link PhysicsServer2D.body_set_state_sync_callback}.
   */
  _body_set_state_sync_callback(body: RID, callable: Callable): void;
  /**
   * Overridable version of {@link PhysicsServer2D.body_test_motion}. Unlike the exposed implementation, this method does not receive all of the arguments inside a {@link PhysicsTestMotionParameters2D}.
   */
  _body_test_motion(body: RID, from_: Transform2D, motion: Vector2 | Vector2i, margin: float, collide_separation_ray: boolean, recovery_as_collision: boolean, result: unknown): boolean;
  /** Overridable version of {@link PhysicsServer2D.capsule_shape_create}. */
  _capsule_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.circle_shape_create}. */
  _circle_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.concave_polygon_shape_create}. */
  _concave_polygon_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.convex_polygon_shape_create}. */
  _convex_polygon_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.damped_spring_joint_get_param}. */
  _damped_spring_joint_get_param(joint: RID, param: int): float;
  /** Overridable version of {@link PhysicsServer2D.damped_spring_joint_set_param}. */
  _damped_spring_joint_set_param(joint: RID, param: int, value: float): void;
  /**
   * Called to indicate that the physics server has stopped synchronizing. It is in the loop's iteration/physics phase, and can access physics objects even if running on a separate thread. See also {@link _sync}.
   * Overridable version of {@link PhysicsServer2D}'s internal `end_sync` method.
   */
  _end_sync(): void;
  /**
   * Called when the main loop finalizes to shut down the physics server. See also {@link MainLoop._finalize} and {@link _init}.
   * Overridable version of {@link PhysicsServer2D}'s internal `finish` method.
   */
  _finish(): void;
  /**
   * Called every physics step before {@link _step} to process all remaining queries.
   * Overridable version of {@link PhysicsServer2D}'s internal `flush_queries` method.
   */
  _flush_queries(): void;
  /** Overridable version of {@link PhysicsServer2D.free_rid}. */
  _free_rid(rid: RID): void;
  /** Overridable version of {@link PhysicsServer2D.get_process_info}. */
  _get_process_info(process_info: int): int;
  /**
   * Called when the main loop is initialized and creates a new instance of this physics server. See also {@link MainLoop._initialize} and {@link _finish}.
   * Overridable version of {@link PhysicsServer2D}'s internal `init` method.
   */
  _init(): void;
  /**
   * Overridable method that should return `true` when the physics server is processing queries. See also {@link _flush_queries}.
   * Overridable version of {@link PhysicsServer2D}'s internal `is_flushing_queries` method.
   */
  _is_flushing_queries(): boolean;
  /** Overridable version of {@link PhysicsServer2D.joint_clear}. */
  _joint_clear(joint: RID): void;
  /** Overridable version of {@link PhysicsServer2D.joint_create}. */
  _joint_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.joint_disable_collisions_between_bodies}. */
  _joint_disable_collisions_between_bodies(joint: RID, disable: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.joint_get_param}. */
  _joint_get_param(joint: RID, param: int): float;
  /** Overridable version of {@link PhysicsServer2D.joint_get_type}. */
  _joint_get_type(joint: RID): int;
  /** Overridable version of {@link PhysicsServer2D.joint_is_disabled_collisions_between_bodies}. */
  _joint_is_disabled_collisions_between_bodies(joint: RID): boolean;
  /** Overridable version of {@link PhysicsServer2D.joint_make_damped_spring}. */
  _joint_make_damped_spring(joint: RID, anchor_a: Vector2 | Vector2i, anchor_b: Vector2 | Vector2i, body_a: RID, body_b: RID): void;
  /** Overridable version of {@link PhysicsServer2D.joint_make_groove}. */
  _joint_make_groove(joint: RID, a_groove1: Vector2 | Vector2i, a_groove2: Vector2 | Vector2i, b_anchor: Vector2 | Vector2i, body_a: RID, body_b: RID): void;
  /** Overridable version of {@link PhysicsServer2D.joint_make_pin}. */
  _joint_make_pin(joint: RID, anchor: Vector2 | Vector2i, body_a: RID, body_b: RID): void;
  /** Overridable version of {@link PhysicsServer2D.joint_set_param}. */
  _joint_set_param(joint: RID, param: int, value: float): void;
  /** Overridable version of {@link PhysicsServer2D.pin_joint_get_flag}. */
  _pin_joint_get_flag(joint: RID, flag: int): boolean;
  /** Overridable version of {@link PhysicsServer2D.pin_joint_get_param}. */
  _pin_joint_get_param(joint: RID, param: int): float;
  /** Overridable version of {@link PhysicsServer2D.pin_joint_set_flag}. */
  _pin_joint_set_flag(joint: RID, flag: int, enabled: boolean): void;
  /** Overridable version of {@link PhysicsServer2D.pin_joint_set_param}. */
  _pin_joint_set_param(joint: RID, param: int, value: float): void;
  /** Overridable version of {@link PhysicsServer2D.rectangle_shape_create}. */
  _rectangle_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.segment_shape_create}. */
  _segment_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.separation_ray_shape_create}. */
  _separation_ray_shape_create(): RID;
  /** Overridable version of {@link PhysicsServer2D.set_active}. */
  _set_active(active: boolean): void;
  /**
   * Given two shapes and their parameters, should return `true` if a collision between the two would occur, with additional details passed in `results`.
   * Overridable version of {@link PhysicsServer2D}'s internal `shape_collide` method. Corresponds to {@link PhysicsDirectSpaceState2D.collide_shape}.
   */
  _shape_collide(shape_A: RID, xform_A: Transform2D, motion_A: Vector2 | Vector2i, shape_B: RID, xform_B: Transform2D, motion_B: Vector2 | Vector2i, results: void, result_max: int, result_count: int): boolean;
  /**
   * Should return the custom solver bias of the given `shape`, which defines how much bodies are forced to separate on contact when this shape is involved.
   * Overridable version of {@link PhysicsServer2D}'s internal `shape_get_custom_solver_bias` method. Corresponds to {@link Shape2D.custom_solver_bias}.
   */
  _shape_get_custom_solver_bias(shape: RID): float;
  /** Overridable version of {@link PhysicsServer2D.shape_get_data}. */
  _shape_get_data(shape: RID): unknown;
  /** Overridable version of {@link PhysicsServer2D.shape_get_type}. */
  _shape_get_type(shape: RID): int;
  /**
   * Should set the custom solver bias for the given `shape`. It defines how much bodies are forced to separate on contact.
   * Overridable version of {@link PhysicsServer2D}'s internal `shape_get_custom_solver_bias` method. Corresponds to {@link Shape2D.custom_solver_bias}.
   */
  _shape_set_custom_solver_bias(shape: RID, bias: float): void;
  /** Overridable version of {@link PhysicsServer2D.shape_set_data}. */
  _shape_set_data(shape: RID, data: unknown): void;
  /** Overridable version of {@link PhysicsServer2D.space_create}. */
  _space_create(): RID;
  /**
   * Should return how many contacts have occurred during the last physics step in the given `space`. See also {@link _space_get_contacts} and {@link _space_set_debug_contacts}.
   * Overridable version of {@link PhysicsServer2D}'s internal `space_get_contact_count` method.
   */
  _space_get_contact_count(space: RID): int;
  /**
   * Should return the positions of all contacts that have occurred during the last physics step in the given `space`. See also {@link _space_get_contact_count} and {@link _space_set_debug_contacts}.
   * Overridable version of {@link PhysicsServer2D}'s internal `space_get_contacts` method.
   */
  _space_get_contacts(space: RID): PackedVector2Array;
  /** Overridable version of {@link PhysicsServer2D.space_get_direct_state}. */
  _space_get_direct_state(space: RID): PhysicsDirectSpaceState2D | null;
  /** Overridable version of {@link PhysicsServer2D.space_get_param}. */
  _space_get_param(space: RID, param: int): float;
  /** Overridable version of {@link PhysicsServer2D.space_is_active}. */
  _space_is_active(space: RID): boolean;
  /** Overridable version of {@link PhysicsServer2D.space_set_active}. */
  _space_set_active(space: RID, active: boolean): void;
  /**
   * Used internally to allow the given `space` to store contact points, up to `max_contacts`. This is automatically set for the main {@link World2D}'s space when {@link SceneTree.debug_collisions_hint} is `true`, or by checking "Visible Collision Shapes" in the editor. Only works in debug builds.
   * Overridable version of {@link PhysicsServer2D}'s internal `space_set_debug_contacts` method.
   */
  _space_set_debug_contacts(space: RID, max_contacts: int): void;
  /** Overridable version of {@link PhysicsServer2D.space_set_param}. */
  _space_set_param(space: RID, param: int, value: float): void;
  /**
   * Called every physics step to process the physics simulation. `step` is the time elapsed since the last physics step, in seconds. It is usually the same as the value returned by {@link Node.get_physics_process_delta_time}.
   * Overridable version of {@link PhysicsServer2D}'s internal [code skip-lint]step[/code] method.
   */
  _step(step: float): void;
  /**
   * Called to indicate that the physics server is synchronizing and cannot access physics states if running on a separate thread. See also {@link _end_sync}.
   * Overridable version of {@link PhysicsServer2D}'s internal `sync` method.
   */
  _sync(): void;
  /** Overridable version of {@link PhysicsServer2D.world_boundary_shape_create}. */
  _world_boundary_shape_create(): RID;
  /**
   * Returns `true` if the body with the given {@link RID} is being excluded from {@link _body_test_motion}. See also {@link Object.get_instance_id}.
   */
  body_test_motion_is_excluding_body(body: RID): boolean;
  /**
   * Returns `true` if the object with the given instance ID is being excluded from {@link _body_test_motion}. See also {@link Object.get_instance_id}.
   */
  body_test_motion_is_excluding_object(object: int): boolean;
}
