// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A server interface for low-level 2D physics access. */
declare interface PhysicsServer2D extends GodotObject {
  /**
   * Adds a shape to the area, with the given local transform. The shape (together with its `transform` and `disabled` properties) is added to an array of shapes, and the shapes of an area are usually referenced by their index in this array.
   */
  area_add_shape(area: RID, shape: RID, transform?: Transform2D, disabled?: boolean): void;
  /**
   * Attaches the `ObjectID` of a canvas to the area. Use {@link Object.get_instance_id} to get the `ObjectID` of a {@link CanvasLayer}.
   */
  area_attach_canvas_instance_id(area: RID, id: int): void;
  /**
   * Attaches the `ObjectID` of an {@link Object} to the area. Use {@link Object.get_instance_id} to get the `ObjectID` of a {@link CollisionObject2D}.
   */
  area_attach_object_instance_id(area: RID, id: int): void;
  /**
   * Removes all shapes from the area. This does not delete the shapes themselves, so they can continue to be used elsewhere or added back later.
   */
  area_clear_shapes(area: RID): void;
  /**
   * Creates a 2D area object in the physics server, and returns the {@link RID} that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and `monitorable` set to `false`.
   * Use {@link area_add_shape} to add shapes to it, use {@link area_set_transform} to set its transform, and use {@link area_set_space} to add the area to a space. If you want the area to be detectable use {@link area_set_monitorable}.
   */
  area_create(): RID;
  /**
   * Returns the `ObjectID` of the canvas attached to the area. Use {@link @GlobalScope.instance_from_id} to retrieve a {@link CanvasLayer} from a nonzero `ObjectID`.
   */
  area_get_canvas_instance_id(area: RID): int;
  /** Returns the physics layer or layers the area belongs to, as a bitmask. */
  area_get_collision_layer(area: RID): int;
  /** Returns the physics layer or layers the area can contact with, as a bitmask. */
  area_get_collision_mask(area: RID): int;
  /**
   * Returns the `ObjectID` attached to the area. Use {@link @GlobalScope.instance_from_id} to retrieve an {@link Object} from a nonzero `ObjectID`.
   */
  area_get_object_instance_id(area: RID): int;
  /** Returns the value of the given area parameter. */
  area_get_param(area: RID, param: int): unknown;
  /** Returns the {@link RID} of the shape with the given index in the area's array of shapes. */
  area_get_shape(area: RID, shape_idx: int): RID;
  /** Returns the number of shapes added to the area. */
  area_get_shape_count(area: RID): int;
  /** Returns the local transform matrix of the shape with the given index in the area's array of shapes. */
  area_get_shape_transform(area: RID, shape_idx: int): Transform2D;
  /**
   * Returns the {@link RID} of the space assigned to the area. Returns an empty {@link RID} if no space is assigned.
   */
  area_get_space(area: RID): RID;
  /** Returns the transform matrix of the area. */
  area_get_transform(area: RID): Transform2D;
  /**
   * Removes the shape with the given index from the area's array of shapes. The shape itself is not deleted, so it can continue to be used elsewhere or added back later. As a result of this operation, the area's shapes which used to have indices higher than `shape_idx` will have their index decreased by one.
   */
  area_remove_shape(area: RID, shape_idx: int): void;
  /**
   * Sets the area's area monitor callback. This callback will be called when any other (shape of an) area enters or exits (a shape of) the given area, and must take the following five parameters:
   * 1. an integer `status`: either {@link AREA_BODY_ADDED} or {@link AREA_BODY_REMOVED} depending on whether the other area's shape entered or exited the area,
   * 2. an {@link RID} `area_rid`: the {@link RID} of the other area that entered or exited the area,
   * 3. an integer `instance_id`: the `ObjectID` attached to the other area,
   * 4. an integer `area_shape_idx`: the index of the shape of the other area that entered or exited the area,
   * 5. an integer `self_shape_idx`: the index of the shape of the area where the other area entered or exited.
   * By counting (or keeping track of) the shapes that enter and exit, it can be determined if an area (with all its shapes) is entering for the first time or exiting for the last time.
   */
  area_set_area_monitor_callback(area: RID, callback: Callable): void;
  /** Assigns the area to one or many physics layers, via a bitmask. */
  area_set_collision_layer(area: RID, layer: int): void;
  /** Sets which physics layers the area will monitor, via a bitmask. */
  area_set_collision_mask(area: RID, mask: int): void;
  /**
   * Sets the area's body monitor callback. This callback will be called when any other (shape of a) body enters or exits (a shape of) the given area, and must take the following five parameters:
   * 1. an integer `status`: either {@link AREA_BODY_ADDED} or {@link AREA_BODY_REMOVED} depending on whether the other body shape entered or exited the area,
   * 2. an {@link RID} `body_rid`: the {@link RID} of the body that entered or exited the area,
   * 3. an integer `instance_id`: the `ObjectID` attached to the body,
   * 4. an integer `body_shape_idx`: the index of the shape of the body that entered or exited the area,
   * 5. an integer `self_shape_idx`: the index of the shape of the area where the body entered or exited.
   * By counting (or keeping track of) the shapes that enter and exit, it can be determined if a body (with all its shapes) is entering for the first time or exiting for the last time.
   */
  area_set_monitor_callback(area: RID, callback: Callable): void;
  /**
   * Sets whether the area is monitorable or not. If `monitorable` is `true`, the area monitoring callback of other areas will be called when this area enters or exits them.
   */
  area_set_monitorable(area: RID, monitorable: boolean): void;
  /** Sets the value of the given area parameter. */
  area_set_param(area: RID, param: int, value: unknown): void;
  /**
   * Replaces the area's shape at the given index by another shape, while not affecting the `transform` and `disabled` properties at the same index.
   */
  area_set_shape(area: RID, shape_idx: int, shape: RID): void;
  /**
   * Sets the disabled property of the area's shape with the given index. If `disabled` is `true`, then the shape will not detect any other shapes entering or exiting it.
   */
  area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void;
  /** Sets the local transform matrix of the area's shape with the given index. */
  area_set_shape_transform(area: RID, shape_idx: int, transform: Transform2D): void;
  /**
   * Adds the area to the given space, after removing the area from the previously assigned space (if any).
   * **Note:** To remove an area from a space without immediately adding it back elsewhere, use `PhysicsServer2D.area_set_space(area, RID())`.
   */
  area_set_space(area: RID, space: RID): void;
  /** Sets the transform matrix of the area. */
  area_set_transform(area: RID, transform: Transform2D): void;
  /**
   * Adds `excepted_body` to the body's list of collision exceptions, so that collisions with it are ignored.
   */
  body_add_collision_exception(body: RID, excepted_body: RID): void;
  /**
   * Adds a constant directional force to the body. The force does not affect rotation. The force remains applied over time until cleared with `PhysicsServer2D.body_set_constant_force(body, Vector2(0, 0))`.
   * This is equivalent to using {@link body_add_constant_force} at the body's center of mass.
   */
  body_add_constant_central_force(body: RID, force: Vector2): void;
  /**
   * Adds a constant positioned force to the body. The force can affect rotation if `position` is different from the body's center of mass. The force remains applied over time until cleared with `PhysicsServer2D.body_set_constant_force(body, Vector2(0, 0))`.
   * `position` is the offset from the body origin in global coordinates.
   */
  body_add_constant_force(body: RID, force: Vector2, position?: Vector2): void;
  /**
   * Adds a constant rotational force to the body. The force does not affect position. The force remains applied over time until cleared with `PhysicsServer2D.body_set_constant_torque(body, 0)`.
   */
  body_add_constant_torque(body: RID, torque: float): void;
  /**
   * Adds a shape to the area, with the given local transform. The shape (together with its `transform` and `disabled` properties) is added to an array of shapes, and the shapes of a body are usually referenced by their index in this array.
   */
  body_add_shape(body: RID, shape: RID, transform?: Transform2D, disabled?: boolean): void;
  /**
   * Applies a directional force to the body, at the body's center of mass. The force does not affect rotation. A force is time dependent and meant to be applied every physics update.
   * This is equivalent to using {@link body_apply_force} at the body's center of mass.
   */
  body_apply_central_force(body: RID, force: Vector2): void;
  /**
   * Applies a directional impulse to the body, at the body's center of mass. The impulse does not affect rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * This is equivalent to using {@link body_apply_impulse} at the body's center of mass.
   */
  body_apply_central_impulse(body: RID, impulse: Vector2): void;
  /**
   * Applies a positioned force to the body. The force can affect rotation if `position` is different from the body's center of mass. A force is time dependent and meant to be applied every physics update.
   * `position` is the offset from the body origin in global coordinates.
   */
  body_apply_force(body: RID, force: Vector2, position?: Vector2): void;
  /**
   * Applies a positioned impulse to the body. The impulse can affect rotation if `position` is different from the body's center of mass.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * `position` is the offset from the body origin in global coordinates.
   */
  body_apply_impulse(body: RID, impulse: Vector2, position?: Vector2): void;
  /**
   * Applies a rotational force to the body. The force does not affect position. A force is time dependent and meant to be applied every physics update.
   */
  body_apply_torque(body: RID, torque: float): void;
  /**
   * Applies a rotational impulse to the body. The impulse does not affect position.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  body_apply_torque_impulse(body: RID, impulse: float): void;
  /**
   * Attaches the `ObjectID` of a canvas to the body. Use {@link Object.get_instance_id} to get the `ObjectID` of a {@link CanvasLayer}.
   */
  body_attach_canvas_instance_id(body: RID, id: int): void;
  /**
   * Attaches the `ObjectID` of an {@link Object} to the body. Use {@link Object.get_instance_id} to get the `ObjectID` of a {@link CollisionObject2D}.
   */
  body_attach_object_instance_id(body: RID, id: int): void;
  /**
   * Removes all shapes from the body. This does not delete the shapes themselves, so they can continue to be used elsewhere or added back later.
   */
  body_clear_shapes(body: RID): void;
  /**
   * Creates a 2D body object in the physics server, and returns the {@link RID} that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and body mode set to {@link BODY_MODE_RIGID}.
   * Use {@link body_add_shape} to add shapes to it, use {@link body_set_state} to set its transform, and use {@link body_set_space} to add the body to a space.
   */
  body_create(): RID;
  /**
   * Returns the `ObjectID` of the canvas attached to the body. Use {@link @GlobalScope.instance_from_id} to retrieve a {@link CanvasLayer} from a nonzero `ObjectID`.
   */
  body_get_canvas_instance_id(body: RID): int;
  /** Returns the physics layer or layers the body belongs to, as a bitmask. */
  body_get_collision_layer(body: RID): int;
  /** Returns the physics layer or layers the body can collide with, as a bitmask. */
  body_get_collision_mask(body: RID): int;
  /**
   * Returns the body's collision priority. This is used in the depenetration phase of {@link body_test_motion}. The higher the priority is, the lower the penetration into the body will be.
   */
  body_get_collision_priority(body: RID): float;
  /**
   * Returns the body's total constant positional force applied during each physics update.
   * See {@link body_add_constant_force} and {@link body_add_constant_central_force}.
   */
  body_get_constant_force(body: RID): Vector2;
  /**
   * Returns the body's total constant rotational force applied during each physics update.
   * See {@link body_add_constant_torque}.
   */
  body_get_constant_torque(body: RID): float;
  /** Returns the body's continuous collision detection mode. */
  body_get_continuous_collision_detection_mode(body: RID): int;
  /**
   * Returns the {@link PhysicsDirectBodyState2D} of the body. Returns `null` if the body is destroyed or not assigned to a space.
   */
  body_get_direct_state(body: RID): PhysicsDirectBodyState2D | null;
  /**
   * Returns the maximum number of contacts that the body can report. See {@link body_set_max_contacts_reported}.
   */
  body_get_max_contacts_reported(body: RID): int;
  /** Returns the body's mode. */
  body_get_mode(body: RID): int;
  /**
   * Returns the `ObjectID` attached to the body. Use {@link @GlobalScope.instance_from_id} to retrieve an {@link Object} from a nonzero `ObjectID`.
   */
  body_get_object_instance_id(body: RID): int;
  /** Returns the value of the given body parameter. */
  body_get_param(body: RID, param: int): unknown;
  /** Returns the {@link RID} of the shape with the given index in the body's array of shapes. */
  body_get_shape(body: RID, shape_idx: int): RID;
  /** Returns the number of shapes added to the body. */
  body_get_shape_count(body: RID): int;
  /** Returns the local transform matrix of the shape with the given index in the area's array of shapes. */
  body_get_shape_transform(body: RID, shape_idx: int): Transform2D;
  /**
   * Returns the {@link RID} of the space assigned to the body. Returns an empty {@link RID} if no space is assigned.
   */
  body_get_space(body: RID): RID;
  /** Returns the value of the given state of the body. */
  body_get_state(body: RID, state: int): unknown;
  /**
   * Returns `true` if the body is omitting the standard force integration. See {@link body_set_omit_force_integration}.
   */
  body_is_omitting_force_integration(body: RID): boolean;
  /**
   * Removes `excepted_body` from the body's list of collision exceptions, so that collisions with it are no longer ignored.
   */
  body_remove_collision_exception(body: RID, excepted_body: RID): void;
  /**
   * Removes the shape with the given index from the body's array of shapes. The shape itself is not deleted, so it can continue to be used elsewhere or added back later. As a result of this operation, the body's shapes which used to have indices higher than `shape_idx` will have their index decreased by one.
   */
  body_remove_shape(body: RID, shape_idx: int): void;
  /**
   * Restores the default inertia and center of mass of the body based on its shapes. This undoes any custom values previously set using {@link body_set_param}.
   */
  body_reset_mass_properties(body: RID): void;
  /**
   * Modifies the body's linear velocity so that its projection to the axis `axis_velocity.normalized()` is exactly `axis_velocity.length()`. This is useful for jumping behavior.
   */
  body_set_axis_velocity(body: RID, axis_velocity: Vector2): void;
  /** Sets the physics layer or layers the body belongs to, via a bitmask. */
  body_set_collision_layer(body: RID, layer: int): void;
  /** Sets the physics layer or layers the body can collide with, via a bitmask. */
  body_set_collision_mask(body: RID, mask: int): void;
  /**
   * Sets the body's collision priority. This is used in the depenetration phase of {@link body_test_motion}. The higher the priority is, the lower the penetration into the body will be.
   */
  body_set_collision_priority(body: RID, priority: float): void;
  /**
   * Sets the body's total constant positional force applied during each physics update.
   * See {@link body_add_constant_force} and {@link body_add_constant_central_force}.
   */
  body_set_constant_force(body: RID, force: Vector2): void;
  /**
   * Sets the body's total constant rotational force applied during each physics update.
   * See {@link body_add_constant_torque}.
   */
  body_set_constant_torque(body: RID, torque: float): void;
  /**
   * Sets the continuous collision detection mode.
   * Continuous collision detection tries to predict where a moving body would collide in between physics updates, instead of moving it and correcting its movement if it collided.
   */
  body_set_continuous_collision_detection_mode(body: RID, mode: int): void;
  /**
   * Sets the body's custom force integration callback function to `callable`. Use an empty {@link Callable} ([code skip-lint]Callable()[/code]) to clear the custom callback.
   * The function `callable` will be called every physics tick, before the standard force integration (see {@link body_set_omit_force_integration}). It can be used for example to update the body's linear and angular velocity based on contact with other bodies.
   * If `userdata` is not `null`, the function `callable` must take the following two parameters:
   * 1. `state`: a {@link PhysicsDirectBodyState2D} used to retrieve and modify the body's state,
   * 2. [code skip-lint]userdata[/code]: a {@link Variant}; its value will be the `userdata` passed into this method.
   * If `userdata` is `null`, then `callable` must take only the `state` parameter.
   */
  body_set_force_integration_callback(body: RID, callable: Callable, userdata?: unknown): void;
  /**
   * Sets the maximum number of contacts that the body can report. If `amount` is greater than zero, then the body will keep track of at most this many contacts with other bodies.
   */
  body_set_max_contacts_reported(body: RID, amount: int): void;
  /** Sets the body's mode. */
  body_set_mode(body: RID, mode: int): void;
  /**
   * Sets whether the body omits the standard force integration. If `enable` is `true`, the body will not automatically use applied forces, torques, and damping to update the body's linear and angular velocity. In this case, {@link body_set_force_integration_callback} can be used to manually update the linear and angular velocity instead.
   * This method is called when the property {@link RigidBody2D.custom_integrator} is set.
   */
  body_set_omit_force_integration(body: RID, enable: boolean): void;
  /** Sets the value of the given body parameter. */
  body_set_param(body: RID, param: int, value: unknown): void;
  /**
   * Replaces the body's shape at the given index by another shape, while not affecting the `transform`, `disabled`, and one-way collision properties at the same index.
   */
  body_set_shape(body: RID, shape_idx: int, shape: RID): void;
  /**
   * Sets the one-way collision properties of the body's shape with the given index. If `enable` is `true`, the one-way collision direction given by `direction` in the shape's local space (that is `body_get_shape_transform(body, shape_idx).basis_xform(direction).normalized()` in the body's local space) will be used to ignore collisions with the shape in the opposite direction, and to ensure depenetration of kinematic bodies happens in this direction.
   */
  body_set_shape_as_one_way_collision(body: RID, shape_idx: int, enable: boolean, margin: float, direction?: Vector2): void;
  /**
   * Sets the disabled property of the body's shape with the given index. If `disabled` is `true`, then the shape will be ignored in all collision detection.
   */
  body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void;
  /** Sets the local transform matrix of the body's shape with the given index. */
  body_set_shape_transform(body: RID, shape_idx: int, transform: Transform2D): void;
  /**
   * Adds the body to the given space, after removing the body from the previously assigned space (if any). If the body's mode is set to {@link BODY_MODE_RIGID}, then adding the body to a space will have the following additional effects:
   * - If the parameter {@link BODY_PARAM_CENTER_OF_MASS} has never been set explicitly, then the value of that parameter will be recalculated based on the body's shapes.
   * - If the parameter {@link BODY_PARAM_INERTIA} is set to a value `<= 0.0`, then the value of that parameter will be recalculated based on the body's shapes, mass, and center of mass.
   * **Note:** To remove a body from a space without immediately adding it back elsewhere, use `PhysicsServer2D.body_set_space(body, RID())`.
   */
  body_set_space(body: RID, space: RID): void;
  /**
   * Sets the value of a body's state.
   * **Note:** The state change doesn't take effect immediately. The state will change on the next physics frame.
   */
  body_set_state(body: RID, state: int, value: unknown): void;
  /**
   * Sets the body's state synchronization callback function to `callable`. Use an empty {@link Callable} ([code skip-lint]Callable()[/code]) to clear the callback.
   * The function `callable` will be called every physics frame, assuming that the body was active during the previous physics tick, and can be used to fetch the latest state from the physics server.
   * The function `callable` must take the following parameters:
   * 1. `state`: a {@link PhysicsDirectBodyState2D}, used to retrieve the body's state.
   */
  body_set_state_sync_callback(body: RID, callable: Callable): void;
  /**
   * Returns `true` if a collision would result from moving the body along a motion vector from a given point in space. See {@link PhysicsTestMotionParameters2D} for the available motion parameters. Optionally a {@link PhysicsTestMotionResult2D} object can be passed, which will be used to store the information about the resulting collision.
   */
  body_test_motion(body: RID, parameters: PhysicsTestMotionParameters2D, result?: PhysicsTestMotionResult2D): boolean;
  /**
   * Creates a 2D capsule shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the capsule's height and radius.
   */
  capsule_shape_create(): RID;
  /**
   * Creates a 2D circle shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the circle's radius.
   */
  circle_shape_create(): RID;
  /**
   * Creates a 2D concave polygon shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the concave polygon's segments.
   */
  concave_polygon_shape_create(): RID;
  /**
   * Creates a 2D convex polygon shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the convex polygon's points.
   */
  convex_polygon_shape_create(): RID;
  /** Returns the value of the given damped spring joint parameter. */
  damped_spring_joint_get_param(joint: RID, param: int): float;
  /** Sets the value of the given damped spring joint parameter. */
  damped_spring_joint_set_param(joint: RID, param: int, value: float): void;
  /**
   * Destroys any of the objects created by PhysicsServer2D. If the {@link RID} passed is not one of the objects that can be created by PhysicsServer2D, an error will be printed to the console.
   */
  free_rid(rid: RID): void;
  /** Returns the value of a physics engine state specified by `process_info`. */
  get_process_info(process_info: int): int;
  /**
   * Destroys the joint with the given {@link RID}, creates a new uninitialized joint, and makes the {@link RID} refer to this new joint.
   */
  joint_clear(joint: RID): void;
  /**
   * Creates a 2D joint in the physics server, and returns the {@link RID} that identifies it. To set the joint type, use {@link joint_make_damped_spring}, {@link joint_make_groove} or {@link joint_make_pin}. Use {@link joint_set_param} to set generic joint parameters.
   */
  joint_create(): RID;
  /** Sets whether the bodies attached to the {@link Joint2D} will collide with each other. */
  joint_disable_collisions_between_bodies(joint: RID, disable: boolean): void;
  /** Returns the value of the given joint parameter. */
  joint_get_param(joint: RID, param: int): float;
  /** Returns the joint's type. */
  joint_get_type(joint: RID): int;
  /** Returns whether the bodies attached to the {@link Joint2D} will collide with each other. */
  joint_is_disabled_collisions_between_bodies(joint: RID): boolean;
  /**
   * Makes the joint a damped spring joint, attached at the point `anchor_a` (given in global coordinates) on the body `body_a` and at the point `anchor_b` (given in global coordinates) on the body `body_b`. To set the parameters which are specific to the damped spring, see {@link damped_spring_joint_set_param}.
   */
  joint_make_damped_spring(joint: RID, anchor_a: Vector2, anchor_b: Vector2, body_a: RID, body_b?: RID): void;
  /** Makes the joint a groove joint. */
  joint_make_groove(joint: RID, groove1_a: Vector2, groove2_a: Vector2, anchor_b: Vector2, body_a?: RID, body_b?: RID): void;
  /**
   * Makes the joint a pin joint. If `body_b` is an empty {@link RID}, then `body_a` is pinned to the point `anchor` (given in global coordinates); otherwise, `body_a` is pinned to `body_b` at the point `anchor` (given in global coordinates). To set the parameters which are specific to the pin joint, see {@link pin_joint_set_param}.
   */
  joint_make_pin(joint: RID, anchor: Vector2, body_a: RID, body_b?: RID): void;
  /** Sets the value of the given joint parameter. */
  joint_set_param(joint: RID, param: int, value: float): void;
  /** Gets a pin joint flag. */
  pin_joint_get_flag(joint: RID, flag: int): boolean;
  /** Returns the value of a pin joint parameter. */
  pin_joint_get_param(joint: RID, param: int): float;
  /** Sets a pin joint flag. */
  pin_joint_set_flag(joint: RID, flag: int, enabled: boolean): void;
  /** Sets a pin joint parameter. */
  pin_joint_set_param(joint: RID, param: int, value: float): void;
  /**
   * Creates a 2D rectangle shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the rectangle's half-extents.
   */
  rectangle_shape_create(): RID;
  /**
   * Creates a 2D segment shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the segment's start and end points.
   */
  segment_shape_create(): RID;
  /**
   * Creates a 2D separation ray shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the shape's `length` and `slide_on_slope` properties.
   */
  separation_ray_shape_create(): RID;
  /**
   * Activates or deactivates the 2D physics server. If `active` is `false`, then the physics server will not do anything in its physics step.
   */
  set_active(active: boolean): void;
  /**
   * Returns the shape data that defines the configuration of the shape, such as the half-extents of a rectangle or the segments of a concave shape. See {@link shape_set_data} for the precise format of this data in each case.
   */
  shape_get_data(shape: RID): unknown;
  /** Returns the shape's type. */
  shape_get_type(shape: RID): int;
  /**
   * Sets the shape data that defines the configuration of the shape. The `data` to be passed depends on the shape's type (see {@link shape_get_type}):
   * - {@link SHAPE_WORLD_BOUNDARY}: an array of length two containing a {@link Vector2} `normal` direction and a [float] distance `d`,
   * - {@link SHAPE_SEPARATION_RAY}: a dictionary containing the key `length` with a [float] value and the key `slide_on_slope` with a [bool] value,
   * - {@link SHAPE_SEGMENT}: a {@link Rect2} `rect` containing the first point of the segment in `rect.position` and the second point of the segment in `rect.size`,
   * - {@link SHAPE_CIRCLE}: a [float] `radius`,
   * - {@link SHAPE_RECTANGLE}: a {@link Vector2} `half_extents`,
   * - {@link SHAPE_CAPSULE}: an array of length two (or a {@link Vector2}) containing a [float] `height` and a [float] `radius`,
   * - {@link SHAPE_CONVEX_POLYGON}: either a {@link PackedVector2Array} of points defining a convex polygon in counterclockwise order (the clockwise outward normal of each segment formed by consecutive points is calculated internally), or a {@link PackedFloat32Array} of length divisible by four so that every 4-tuple of [float]s contains the coordinates of a point followed by the coordinates of the clockwise outward normal vector to the segment between the current point and the next point,
   * - {@link SHAPE_CONCAVE_POLYGON}: a {@link PackedVector2Array} of length divisible by two (each pair of points forms one segment).
   * **Warning:** In the case of {@link SHAPE_CONVEX_POLYGON}, this method does not check if the points supplied actually form a convex polygon (unlike the {@link CollisionPolygon2D.polygon} property).
   */
  shape_set_data(shape: RID, data: unknown): void;
  /**
   * Creates a 2D space in the physics server, and returns the {@link RID} that identifies it. A space contains bodies and areas, and controls the stepping of the physics simulation of the objects in it.
   */
  space_create(): RID;
  /**
   * Returns the state of a space, a {@link PhysicsDirectSpaceState2D}. This object can be used for collision/intersection queries.
   */
  space_get_direct_state(space: RID): PhysicsDirectSpaceState2D | null;
  /** Returns the value of the given space parameter. */
  space_get_param(space: RID, param: int): float;
  /** Returns `true` if the space is active. */
  space_is_active(space: RID): boolean;
  /**
   * Activates or deactivates the space. If `active` is `false`, then the physics server will not do anything with this space in its physics step.
   */
  space_set_active(space: RID, active: boolean): void;
  /** Sets the value of the given space parameter. */
  space_set_param(space: RID, param: int, value: float): void;
  /**
   * Creates a 2D world boundary shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the shape's normal direction and distance properties.
   */
  world_boundary_shape_create(): RID;

  // enum SpaceParameter
  /**
   * Constant to set/get the maximum distance a pair of bodies has to move before their collision status has to be recalculated. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/contact_recycle_radius}.
   */
  readonly SPACE_PARAM_CONTACT_RECYCLE_RADIUS: int;
  /**
   * Constant to set/get the maximum distance a shape can be from another before they are considered separated and the contact is discarded. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/contact_max_separation}.
   */
  readonly SPACE_PARAM_CONTACT_MAX_SEPARATION: int;
  /**
   * Constant to set/get the maximum distance a shape can penetrate another shape before it is considered a collision. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/contact_max_allowed_penetration}.
   */
  readonly SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION: int;
  /**
   * Constant to set/get the default solver bias for all physics contacts. A solver bias is a factor controlling how much two objects "rebound", after overlapping, to avoid leaving them in that state because of numerical imprecision. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/default_contact_bias}.
   */
  readonly SPACE_PARAM_CONTACT_DEFAULT_BIAS: int;
  /**
   * Constant to set/get the threshold linear velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given. The default value of this parameter is {@link ProjectSettings.physics/2d/sleep_threshold_linear}.
   */
  readonly SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD: int;
  /**
   * Constant to set/get the threshold angular velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given. The default value of this parameter is {@link ProjectSettings.physics/2d/sleep_threshold_angular}.
   */
  readonly SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD: int;
  /**
   * Constant to set/get the maximum time of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after this time. The default value of this parameter is {@link ProjectSettings.physics/2d/time_before_sleep}.
   */
  readonly SPACE_PARAM_BODY_TIME_TO_SLEEP: int;
  /**
   * Constant to set/get the default solver bias for all physics constraints. A solver bias is a factor controlling how much two objects "rebound", after violating a constraint, to avoid leaving them in that state because of numerical imprecision. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/default_constraint_bias}.
   */
  readonly SPACE_PARAM_CONSTRAINT_DEFAULT_BIAS: int;
  /**
   * Constant to set/get the number of solver iterations for all contacts and constraints. The greater the number of iterations, the more accurate the collisions will be. However, a greater number of iterations requires more CPU power, which can decrease performance. The default value of this parameter is {@link ProjectSettings.physics/2d/solver/solver_iterations}.
   */
  readonly SPACE_PARAM_SOLVER_ITERATIONS: int;
  // enum ShapeType
  /**
   * This is the constant for creating world boundary shapes. A world boundary shape is an *infinite* line with an origin point, and a normal. Thus, it can be used for front/behind checks.
   */
  readonly SHAPE_WORLD_BOUNDARY: int;
  /**
   * This is the constant for creating separation ray shapes. A separation ray is defined by a length and separates itself from what is touching its far endpoint. Useful for character controllers.
   */
  readonly SHAPE_SEPARATION_RAY: int;
  /**
   * This is the constant for creating segment shapes. A segment shape is a *finite* line from a point A to a point B. It can be checked for intersections.
   */
  readonly SHAPE_SEGMENT: int;
  /**
   * This is the constant for creating circle shapes. A circle shape only has a radius. It can be used for intersections and inside/outside checks.
   */
  readonly SHAPE_CIRCLE: int;
  /**
   * This is the constant for creating rectangle shapes. A rectangle shape is defined by a width and a height. It can be used for intersections and inside/outside checks.
   */
  readonly SHAPE_RECTANGLE: int;
  /**
   * This is the constant for creating capsule shapes. A capsule shape is defined by a radius and a length. It can be used for intersections and inside/outside checks.
   */
  readonly SHAPE_CAPSULE: int;
  /**
   * This is the constant for creating convex polygon shapes. A polygon is defined by a list of points. It can be used for intersections and inside/outside checks.
   */
  readonly SHAPE_CONVEX_POLYGON: int;
  /**
   * This is the constant for creating concave polygon shapes. A polygon is defined by a list of points. It can be used for intersections checks, but not for inside/outside checks.
   */
  readonly SHAPE_CONCAVE_POLYGON: int;
  /**
   * This constant is used internally by the engine. Any attempt to create this kind of shape results in an error.
   */
  readonly SHAPE_CUSTOM: int;
  // enum AreaParameter
  /**
   * Constant to set/get gravity override mode in an area. See {@link AreaSpaceOverrideMode} for possible values. The default value of this parameter is {@link AREA_SPACE_OVERRIDE_DISABLED}.
   */
  readonly AREA_PARAM_GRAVITY_OVERRIDE_MODE: int;
  /** Constant to set/get gravity strength in an area. The default value of this parameter is `9.80665`. */
  readonly AREA_PARAM_GRAVITY: int;
  /**
   * Constant to set/get gravity vector/center in an area. The default value of this parameter is `Vector2(0, -1)`.
   */
  readonly AREA_PARAM_GRAVITY_VECTOR: int;
  /**
   * Constant to set/get whether the gravity vector of an area is a direction, or a center point. The default value of this parameter is `false`.
   */
  readonly AREA_PARAM_GRAVITY_IS_POINT: int;
  /**
   * Constant to set/get the distance at which the gravity strength is equal to the gravity controlled by {@link AREA_PARAM_GRAVITY}. For example, on a planet 100 pixels in radius with a surface gravity of 4.0 px/s², set the gravity to 4.0 and the unit distance to 100.0. The gravity will have falloff according to the inverse square law, so in the example, at 200 pixels from the center the gravity will be 1.0 px/s² (twice the distance, 1/4th the gravity), at 50 pixels it will be 16.0 px/s² (half the distance, 4x the gravity), and so on.
   * The above is true only when the unit distance is a positive number. When the unit distance is set to 0.0, the gravity will be constant regardless of distance. The default value of this parameter is `0.0`.
   */
  readonly AREA_PARAM_GRAVITY_POINT_UNIT_DISTANCE: int;
  /**
   * Constant to set/get linear damping override mode in an area. See {@link AreaSpaceOverrideMode} for possible values. The default value of this parameter is {@link AREA_SPACE_OVERRIDE_DISABLED}.
   */
  readonly AREA_PARAM_LINEAR_DAMP_OVERRIDE_MODE: int;
  /**
   * Constant to set/get the linear damping factor of an area. The default value of this parameter is `0.1`.
   */
  readonly AREA_PARAM_LINEAR_DAMP: int;
  /**
   * Constant to set/get angular damping override mode in an area. See {@link AreaSpaceOverrideMode} for possible values. The default value of this parameter is {@link AREA_SPACE_OVERRIDE_DISABLED}.
   */
  readonly AREA_PARAM_ANGULAR_DAMP_OVERRIDE_MODE: int;
  /**
   * Constant to set/get the angular damping factor of an area. The default value of this parameter is `1.0`.
   */
  readonly AREA_PARAM_ANGULAR_DAMP: int;
  /**
   * Constant to set/get the priority (order of processing) of an area. The default value of this parameter is `0`.
   */
  readonly AREA_PARAM_PRIORITY: int;
  // enum AreaSpaceOverrideMode
  /**
   * This area does not affect gravity/damp. These are generally areas that exist only to detect collisions, and objects entering or exiting them.
   */
  readonly AREA_SPACE_OVERRIDE_DISABLED: int;
  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. This way, many overlapping areas can combine their physics to make interesting effects.
   */
  readonly AREA_SPACE_OVERRIDE_COMBINE: int;
  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. Then stops taking into account the rest of the areas, even the default one.
   */
  readonly AREA_SPACE_OVERRIDE_COMBINE_REPLACE: int;
  /**
   * This area replaces any gravity/damp, even the default one, and stops taking into account the rest of the areas.
   */
  readonly AREA_SPACE_OVERRIDE_REPLACE: int;
  /**
   * This area replaces any gravity/damp calculated so far, but keeps calculating the rest of the areas, down to the default one.
   */
  readonly AREA_SPACE_OVERRIDE_REPLACE_COMBINE: int;
  // enum BodyMode
  /**
   * Constant for static bodies. In this mode, a body can be only moved by user code and doesn't collide with other bodies along its path when moved.
   */
  readonly BODY_MODE_STATIC: int;
  /**
   * Constant for kinematic bodies. In this mode, a body can be only moved by user code and collides with other bodies along its path.
   */
  readonly BODY_MODE_KINEMATIC: int;
  /**
   * Constant for rigid bodies. In this mode, a body can be pushed by other bodies and has forces applied.
   */
  readonly BODY_MODE_RIGID: int;
  /**
   * Constant for linear rigid bodies. In this mode, a body can not rotate, and only its linear velocity is affected by external forces.
   */
  readonly BODY_MODE_RIGID_LINEAR: int;
  // enum BodyParameter
  /** Constant to set/get a body's bounce factor. The default value of this parameter is `0.0`. */
  readonly BODY_PARAM_BOUNCE: int;
  /** Constant to set/get a body's friction. The default value of this parameter is `1.0`. */
  readonly BODY_PARAM_FRICTION: int;
  /**
   * Constant to set/get a body's mass. The default value of this parameter is `1.0`. If the body's mode is set to {@link BODY_MODE_RIGID}, then setting this parameter will have the following additional effects:
   * - If the parameter {@link BODY_PARAM_CENTER_OF_MASS} has never been set explicitly, then the value of that parameter will be recalculated based on the body's shapes.
   * - If the parameter {@link BODY_PARAM_INERTIA} is set to a value `<= 0.0`, then the value of that parameter will be recalculated based on the body's shapes, mass, and center of mass.
   */
  readonly BODY_PARAM_MASS: int;
  /**
   * Constant to set/get a body's inertia. The default value of this parameter is `0.0`. If the body's inertia is set to a value `<= 0.0`, then the inertia will be recalculated based on the body's shapes, mass, and center of mass.
   */
  readonly BODY_PARAM_INERTIA: int;
  /**
   * Constant to set/get a body's center of mass position in the body's local coordinate system. The default value of this parameter is `Vector2(0, 0)`. If this parameter is never set explicitly, then it is recalculated based on the body's shapes when setting the parameter {@link BODY_PARAM_MASS} or when calling {@link body_set_space}.
   */
  readonly BODY_PARAM_CENTER_OF_MASS: int;
  /** Constant to set/get a body's gravity multiplier. The default value of this parameter is `1.0`. */
  readonly BODY_PARAM_GRAVITY_SCALE: int;
  /**
   * Constant to set/get a body's linear damping mode. See {@link BodyDampMode} for possible values. The default value of this parameter is {@link BODY_DAMP_MODE_COMBINE}.
   */
  readonly BODY_PARAM_LINEAR_DAMP_MODE: int;
  /**
   * Constant to set/get a body's angular damping mode. See {@link BodyDampMode} for possible values. The default value of this parameter is {@link BODY_DAMP_MODE_COMBINE}.
   */
  readonly BODY_PARAM_ANGULAR_DAMP_MODE: int;
  /** Constant to set/get a body's linear damping factor. The default value of this parameter is `0.0`. */
  readonly BODY_PARAM_LINEAR_DAMP: int;
  /** Constant to set/get a body's angular damping factor. The default value of this parameter is `0.0`. */
  readonly BODY_PARAM_ANGULAR_DAMP: int;
  /** Represents the size of the {@link BodyParameter} enum. */
  readonly BODY_PARAM_MAX: int;
  // enum BodyDampMode
  /** The body's damping value is added to any value set in areas or the default value. */
  readonly BODY_DAMP_MODE_COMBINE: int;
  /** The body's damping value replaces any value set in areas or the default value. */
  readonly BODY_DAMP_MODE_REPLACE: int;
  // enum BodyState
  /** Constant to set/get the current transform matrix of the body. */
  readonly BODY_STATE_TRANSFORM: int;
  /** Constant to set/get the current linear velocity of the body. */
  readonly BODY_STATE_LINEAR_VELOCITY: int;
  /** Constant to set/get the current angular velocity of the body. */
  readonly BODY_STATE_ANGULAR_VELOCITY: int;
  /** Constant to sleep/wake up a body, or to get whether it is sleeping. */
  readonly BODY_STATE_SLEEPING: int;
  /** Constant to set/get whether the body can sleep. */
  readonly BODY_STATE_CAN_SLEEP: int;
  // enum JointType
  /** Constant to create pin joints. */
  readonly JOINT_TYPE_PIN: int;
  /** Constant to create groove joints. */
  readonly JOINT_TYPE_GROOVE: int;
  /** Constant to create damped spring joints. */
  readonly JOINT_TYPE_DAMPED_SPRING: int;
  /** Represents the size of the {@link JointType} enum. */
  readonly JOINT_TYPE_MAX: int;
  // enum JointParam
  /**
   * Constant to set/get how fast the joint pulls the bodies back to satisfy the joint constraint. The lower the value, the more the two bodies can pull on the joint. The default value of this parameter is `0.0`.
   * **Note:** In Godot Physics, this parameter is only used for pin joints and groove joints.
   */
  readonly JOINT_PARAM_BIAS: int;
  /**
   * Constant to set/get the maximum speed with which the joint can apply corrections. The default value of this parameter is `3.40282e+38`.
   * **Note:** In Godot Physics, this parameter is only used for groove joints.
   */
  readonly JOINT_PARAM_MAX_BIAS: int;
  /**
   * Constant to set/get the maximum force that the joint can use to act on the two bodies. The default value of this parameter is `3.40282e+38`.
   * **Note:** In Godot Physics, this parameter is only used for groove joints.
   */
  readonly JOINT_PARAM_MAX_FORCE: int;
  // enum PinJointParam
  /**
   * Constant to set/get a how much the bond of the pin joint can flex. The default value of this parameter is `0.0`.
   */
  readonly PIN_JOINT_SOFTNESS: int;
  /** The maximum rotation around the pin. */
  readonly PIN_JOINT_LIMIT_UPPER: int;
  /** The minimum rotation around the pin. */
  readonly PIN_JOINT_LIMIT_LOWER: int;
  /** Target speed for the motor. In radians per second. */
  readonly PIN_JOINT_MOTOR_TARGET_VELOCITY: int;
  // enum PinJointFlag
  /** If `true`, the pin has a maximum and a minimum rotation. */
  readonly PIN_JOINT_FLAG_ANGULAR_LIMIT_ENABLED: int;
  /** If `true`, a motor turns the pin. */
  readonly PIN_JOINT_FLAG_MOTOR_ENABLED: int;
  // enum DampedSpringParam
  /**
   * Sets the resting length of the spring joint. The joint will always try to go to back this length when pulled apart. The default value of this parameter is the distance between the joint's anchor points.
   */
  readonly DAMPED_SPRING_REST_LENGTH: int;
  /**
   * Sets the stiffness of the spring joint. The joint applies a force equal to the stiffness times the distance from its resting length. The default value of this parameter is `20.0`.
   */
  readonly DAMPED_SPRING_STIFFNESS: int;
  /**
   * Sets the damping ratio of the spring joint. A value of 0 indicates an undamped spring, while 1 causes the system to reach equilibrium as fast as possible (critical damping). The default value of this parameter is `1.5`.
   */
  readonly DAMPED_SPRING_DAMPING: int;
  // enum CCDMode
  /**
   * Disables continuous collision detection. This is the fastest way to detect body collisions, but it can miss small and/or fast-moving objects.
   */
  readonly CCD_MODE_DISABLED: int;
  /**
   * Enables continuous collision detection by raycasting. It is faster than shapecasting, but less precise.
   */
  readonly CCD_MODE_CAST_RAY: int;
  /**
   * Enables continuous collision detection by shapecasting. It is the slowest CCD method, and the most precise.
   */
  readonly CCD_MODE_CAST_SHAPE: int;
  // enum AreaBodyStatus
  /**
   * The value of the first parameter and area callback function receives, when an object enters one of its shapes.
   */
  readonly AREA_BODY_ADDED: int;
  /**
   * The value of the first parameter and area callback function receives, when an object exits one of its shapes.
   */
  readonly AREA_BODY_REMOVED: int;
  // enum ProcessInfo
  /** Constant to get the number of objects that are not sleeping. */
  readonly INFO_ACTIVE_OBJECTS: int;
  /** Constant to get the number of possible collisions. */
  readonly INFO_COLLISION_PAIRS: int;
  /** Constant to get the number of space regions where a collision could occur. */
  readonly INFO_ISLAND_COUNT: int;
}
declare var PhysicsServer2D: PhysicsServer2D & {
  new(): PhysicsServer2D;
  readonly prototype: PhysicsServer2D;
};

