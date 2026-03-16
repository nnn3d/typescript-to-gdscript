// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A server interface for low-level 3D physics access. */
declare class PhysicsServer3D extends GodotObject {
  /**
   * Adds a shape to the area, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index.
   */
  area_add_shape(area: RID, shape: RID, transform?: Transform3D, disabled?: boolean): void;
  /** Assigns the area to a descendant of {@link Object}, so it can exist in the node tree. */
  area_attach_object_instance_id(area: RID, id: int): void;
  /** Removes all shapes from an area. It does not delete the shapes, so they can be reassigned later. */
  area_clear_shapes(area: RID): void;
  /**
   * Creates a 3D area object in the physics server, and returns the {@link RID} that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and `monitorable` set to `false`.
   * Use {@link area_add_shape} to add shapes to it, use {@link area_set_transform} to set its transform, and use {@link area_set_space} to add the area to a space. If you want the area to be detectable use {@link area_set_monitorable}.
   */
  area_create(): RID;
  /** Returns the physics layer or layers an area belongs to. */
  area_get_collision_layer(area: RID): int;
  /** Returns the physics layer or layers an area can contact with. */
  area_get_collision_mask(area: RID): int;
  /** Gets the instance ID of the object the area is assigned to. */
  area_get_object_instance_id(area: RID): int;
  /**
   * Returns an area parameter value. A list of available parameters is on the {@link AreaParameter} constants.
   */
  area_get_param(area: RID, param: int): unknown;
  /** Returns the {@link RID} of the nth shape of an area. */
  area_get_shape(area: RID, shape_idx: int): RID;
  /** Returns the number of shapes assigned to an area. */
  area_get_shape_count(area: RID): int;
  /** Returns the transform matrix of a shape within an area. */
  area_get_shape_transform(area: RID, shape_idx: int): Transform3D;
  /** Returns the space assigned to the area. */
  area_get_space(area: RID): RID;
  /** Returns the transform matrix for an area. */
  area_get_transform(area: RID): Transform3D;
  /** Removes a shape from an area. It does not delete the shape, so it can be reassigned later. */
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
  /** Assigns the area to one or many physics layers. */
  area_set_collision_layer(area: RID, layer: int): void;
  /** Sets which physics layers the area will monitor. */
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
  area_set_monitorable(area: RID, monitorable: boolean): void;
  /**
   * Sets the value for an area parameter. A list of available parameters is on the {@link AreaParameter} constants.
   */
  area_set_param(area: RID, param: int, value: unknown): void;
  /** Sets object pickable with rays. */
  area_set_ray_pickable(area: RID, enable: boolean): void;
  /**
   * Substitutes a given area shape by another. The old shape is selected by its index, the new one by its {@link RID}.
   */
  area_set_shape(area: RID, shape_idx: int, shape: RID): void;
  area_set_shape_disabled(area: RID, shape_idx: int, disabled: boolean): void;
  /** Sets the transform matrix for an area shape. */
  area_set_shape_transform(area: RID, shape_idx: int, transform: Transform3D): void;
  /** Assigns a space to the area. */
  area_set_space(area: RID, space: RID): void;
  /** Sets the transform matrix for an area. */
  area_set_transform(area: RID, transform: Transform3D): void;
  /** Adds a body to the list of bodies exempt from collisions. */
  body_add_collision_exception(body: RID, excepted_body: RID): void;
  /**
   * Adds a constant directional force without affecting rotation that keeps being applied over time until cleared with `body_set_constant_force(body, Vector3(0, 0, 0))`.
   * This is equivalent to using {@link body_add_constant_force} at the body's center of mass.
   */
  body_add_constant_central_force(body: RID, force: Vector3): void;
  /**
   * Adds a constant positioned force to the body that keeps being applied over time until cleared with `body_set_constant_force(body, Vector3(0, 0, 0))`.
   * `position` is the offset from the body origin in global coordinates.
   */
  body_add_constant_force(body: RID, force: Vector3, position?: Vector3): void;
  /**
   * Adds a constant rotational force without affecting position that keeps being applied over time until cleared with `body_set_constant_torque(body, Vector3(0, 0, 0))`.
   */
  body_add_constant_torque(body: RID, torque: Vector3): void;
  /**
   * Adds a shape to the body, along with a transform matrix. Shapes are usually referenced by their index, so you should track which shape has a given index.
   */
  body_add_shape(body: RID, shape: RID, transform?: Transform3D, disabled?: boolean): void;
  /**
   * Applies a directional force without affecting rotation. A force is time dependent and meant to be applied every physics update.
   * This is equivalent to using {@link body_apply_force} at the body's center of mass.
   */
  body_apply_central_force(body: RID, force: Vector3): void;
  /**
   * Applies a directional impulse without affecting rotation.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * This is equivalent to using {@link body_apply_impulse} at the body's center of mass.
   */
  body_apply_central_impulse(body: RID, impulse: Vector3): void;
  /**
   * Applies a positioned force to the body. A force is time dependent and meant to be applied every physics update.
   * `position` is the offset from the body origin in global coordinates.
   */
  body_apply_force(body: RID, force: Vector3, position?: Vector3): void;
  /**
   * Applies a positioned impulse to the body.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   * `position` is the offset from the body origin in global coordinates.
   */
  body_apply_impulse(body: RID, impulse: Vector3, position?: Vector3): void;
  /**
   * Applies a rotational force without affecting position. A force is time dependent and meant to be applied every physics update.
   */
  body_apply_torque(body: RID, torque: Vector3): void;
  /**
   * Applies a rotational impulse to the body without affecting the position.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  body_apply_torque_impulse(body: RID, impulse: Vector3): void;
  /** Assigns the area to a descendant of {@link Object}, so it can exist in the node tree. */
  body_attach_object_instance_id(body: RID, id: int): void;
  /** Removes all shapes from a body. */
  body_clear_shapes(body: RID): void;
  /**
   * Creates a 3D body object in the physics server, and returns the {@link RID} that identifies it. The default settings for the created area include a collision layer and mask set to `1`, and body mode set to {@link BODY_MODE_RIGID}.
   * Use {@link body_add_shape} to add shapes to it, use {@link body_set_state} to set its transform, and use {@link body_set_space} to add the body to a space.
   */
  body_create(): RID;
  /** Returns the physics layer or layers a body belongs to. */
  body_get_collision_layer(body: RID): int;
  /** Returns the physics layer or layers a body can collide with. */
  body_get_collision_mask(body: RID): int;
  /** Returns the body's collision priority. */
  body_get_collision_priority(body: RID): float;
  /**
   * Returns the body's total constant positional forces applied during each physics update.
   * See {@link body_add_constant_force} and {@link body_add_constant_central_force}.
   */
  body_get_constant_force(body: RID): Vector3;
  /**
   * Returns the body's total constant rotational forces applied during each physics update.
   * See {@link body_add_constant_torque}.
   */
  body_get_constant_torque(body: RID): Vector3;
  /**
   * Returns the {@link PhysicsDirectBodyState3D} of the body. Returns `null` if the body is destroyed or removed from the physics space.
   */
  body_get_direct_state(body: RID): PhysicsDirectBodyState3D;
  /** Returns the maximum contacts that can be reported. See {@link body_set_max_contacts_reported}. */
  body_get_max_contacts_reported(body: RID): int;
  /** Returns the body mode. */
  body_get_mode(body: RID): int;
  /** Gets the instance ID of the object the area is assigned to. */
  body_get_object_instance_id(body: RID): int;
  /**
   * Returns the value of a body parameter. A list of available parameters is on the {@link BodyParameter} constants.
   */
  body_get_param(body: RID, param: int): unknown;
  /** Returns the {@link RID} of the nth shape of a body. */
  body_get_shape(body: RID, shape_idx: int): RID;
  /** Returns the number of shapes assigned to a body. */
  body_get_shape_count(body: RID): int;
  /** Returns the transform matrix of a body shape. */
  body_get_shape_transform(body: RID, shape_idx: int): Transform3D;
  /** Returns the {@link RID} of the space assigned to a body. */
  body_get_space(body: RID): RID;
  /** Returns a body state. */
  body_get_state(body: RID, state: int): unknown;
  body_is_axis_locked(body: RID, axis: int): boolean;
  /** If `true`, the continuous collision detection mode is enabled. */
  body_is_continuous_collision_detection_enabled(body: RID): boolean;
  /**
   * Returns `true` if the body is omitting the standard force integration. See {@link body_set_omit_force_integration}.
   */
  body_is_omitting_force_integration(body: RID): boolean;
  /**
   * Removes a body from the list of bodies exempt from collisions.
   * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided.
   */
  body_remove_collision_exception(body: RID, excepted_body: RID): void;
  /** Removes a shape from a body. The shape is not deleted, so it can be reused afterwards. */
  body_remove_shape(body: RID, shape_idx: int): void;
  /**
   * Restores the default inertia and center of mass based on shapes to cancel any custom values previously set using {@link body_set_param}.
   */
  body_reset_mass_properties(body: RID): void;
  body_set_axis_lock(body: RID, axis: int, lock: boolean): void;
  /**
   * Sets an axis velocity. The velocity in the given vector axis will be set as the given vector length. This is useful for jumping behavior.
   */
  body_set_axis_velocity(body: RID, axis_velocity: Vector3): void;
  /** Sets the physics layer or layers a body belongs to. */
  body_set_collision_layer(body: RID, layer: int): void;
  /** Sets the physics layer or layers a body can collide with. */
  body_set_collision_mask(body: RID, mask: int): void;
  /** Sets the body's collision priority. */
  body_set_collision_priority(body: RID, priority: float): void;
  /**
   * Sets the body's total constant positional forces applied during each physics update.
   * See {@link body_add_constant_force} and {@link body_add_constant_central_force}.
   */
  body_set_constant_force(body: RID, force: Vector3): void;
  /**
   * Sets the body's total constant rotational forces applied during each physics update.
   * See {@link body_add_constant_torque}.
   */
  body_set_constant_torque(body: RID, torque: Vector3): void;
  /**
   * If `true`, the continuous collision detection mode is enabled.
   * Continuous collision detection tries to predict where a moving body will collide, instead of moving it and correcting its movement if it collided.
   */
  body_set_enable_continuous_collision_detection(body: RID, enable: boolean): void;
  /**
   * Sets the body's custom force integration callback function to `callable`. Use an empty {@link Callable} ([code skip-lint]Callable()[/code]) to clear the custom callback.
   * The function `callable` will be called every physics tick, before the standard force integration (see {@link body_set_omit_force_integration}). It can be used for example to update the body's linear and angular velocity based on contact with other bodies.
   * If `userdata` is not `null`, the function `callable` must take the following two parameters:
   * 1. `state`: a {@link PhysicsDirectBodyState3D}, used to retrieve and modify the body's state,
   * 2. [code skip-lint]userdata[/code]: a {@link Variant}; its value will be the `userdata` passed into this method.
   * If `userdata` is `null`, then `callable` must take only the `state` parameter.
   */
  body_set_force_integration_callback(body: RID, callable: Callable, userdata?: unknown): void;
  /**
   * Sets the maximum contacts to report. Bodies can keep a log of the contacts with other bodies. This is enabled by setting the maximum number of contacts reported to a number greater than 0.
   */
  body_set_max_contacts_reported(body: RID, amount: int): void;
  /** Sets the body mode. */
  body_set_mode(body: RID, mode: int): void;
  /**
   * Sets whether the body omits the standard force integration. If `enable` is `true`, the body will not automatically use applied forces, torques, and damping to update the body's linear and angular velocity. In this case, {@link body_set_force_integration_callback} can be used to manually update the linear and angular velocity instead.
   * This method is called when the property {@link RigidBody3D.custom_integrator} is set.
   */
  body_set_omit_force_integration(body: RID, enable: boolean): void;
  /** Sets a body parameter. A list of available parameters is on the {@link BodyParameter} constants. */
  body_set_param(body: RID, param: int, value: unknown): void;
  /** Sets the body pickable with rays if `enable` is set. */
  body_set_ray_pickable(body: RID, enable: boolean): void;
  /**
   * Substitutes a given body shape by another. The old shape is selected by its index, the new one by its {@link RID}.
   */
  body_set_shape(body: RID, shape_idx: int, shape: RID): void;
  body_set_shape_disabled(body: RID, shape_idx: int, disabled: boolean): void;
  /** Sets the transform matrix for a body shape. */
  body_set_shape_transform(body: RID, shape_idx: int, transform: Transform3D): void;
  /** Assigns a space to the body (see {@link space_create}). */
  body_set_space(body: RID, space: RID): void;
  /** Sets a body state. */
  body_set_state(body: RID, state: int, value: unknown): void;
  /**
   * Sets the body's state synchronization callback function to `callable`. Use an empty {@link Callable} ([code skip-lint]Callable()[/code]) to clear the callback.
   * The function `callable` will be called every physics frame, assuming that the body was active during the previous physics tick, and can be used to fetch the latest state from the physics server.
   * The function `callable` must take the following parameters:
   * 1. `state`: a {@link PhysicsDirectBodyState3D}, used to retrieve the body's state.
   */
  body_set_state_sync_callback(body: RID, callable: Callable): void;
  /**
   * Returns `true` if a collision would result from moving along a motion vector from a given point in space. {@link PhysicsTestMotionParameters3D} is passed to set motion parameters. {@link PhysicsTestMotionResult3D} can be passed to return additional information.
   */
  body_test_motion(body: RID, parameters: PhysicsTestMotionParameters3D, result?: PhysicsTestMotionResult3D): boolean;
  /**
   * Creates a 3D box shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the box's half-extents.
   */
  box_shape_create(): RID;
  /**
   * Creates a 3D capsule shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the capsule's height and radius.
   */
  capsule_shape_create(): RID;
  /**
   * Creates a 3D concave polygon shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the concave polygon's triangles.
   */
  concave_polygon_shape_create(): RID;
  /** Gets a cone twist joint parameter. */
  cone_twist_joint_get_param(joint: RID, param: int): float;
  /** Sets a cone twist joint parameter. */
  cone_twist_joint_set_param(joint: RID, param: int, value: float): void;
  /**
   * Creates a 3D convex polygon shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the convex polygon's points.
   */
  convex_polygon_shape_create(): RID;
  /**
   * Creates a custom shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the shape's data.
   * **Note:** Custom shapes are not supported by the built-in physics servers, so calling this method always produces an error when using Godot Physics or Jolt Physics. Custom physics servers implemented as GDExtensions may support a custom shape.
   */
  custom_shape_create(): RID;
  /**
   * Creates a 3D cylinder shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the cylinder's height and radius.
   */
  cylinder_shape_create(): RID;
  /**
   * Destroys any of the objects created by PhysicsServer3D. If the {@link RID} passed is not one of the objects that can be created by PhysicsServer3D, an error will be sent to the console.
   */
  free_rid(rid: RID): void;
  /** Returns the value of a generic 6DOF joint flag. */
  generic_6dof_joint_get_flag(joint: RID, axis: int, flag: int): boolean;
  /** Returns the value of a generic 6DOF joint parameter. */
  generic_6dof_joint_get_param(joint: RID, axis: int, param: int): float;
  /** Sets the value of a given generic 6DOF joint flag. */
  generic_6dof_joint_set_flag(joint: RID, axis: int, flag: int, enable: boolean): void;
  /** Sets the value of a given generic 6DOF joint parameter. */
  generic_6dof_joint_set_param(joint: RID, axis: int, param: int, value: float): void;
  /** Returns the value of a physics engine state specified by `process_info`. */
  get_process_info(process_info: int): int;
  /**
   * Creates a 3D heightmap shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the heightmap's data.
   */
  heightmap_shape_create(): RID;
  /** Gets a hinge joint flag. */
  hinge_joint_get_flag(joint: RID, flag: int): boolean;
  /** Gets a hinge joint parameter. */
  hinge_joint_get_param(joint: RID, param: int): float;
  /** Sets a hinge joint flag. */
  hinge_joint_set_flag(joint: RID, flag: int, enabled: boolean): void;
  /** Sets a hinge joint parameter. */
  hinge_joint_set_param(joint: RID, param: int, value: float): void;
  joint_clear(joint: RID): void;
  joint_create(): RID;
  /** Sets whether the bodies attached to the {@link Joint3D} will collide with each other. */
  joint_disable_collisions_between_bodies(joint: RID, disable: boolean): void;
  /**
   * Gets the priority value of the Joint3D.
   * **Note:** Only supported when using GodotPhysics3D. This method always returns `1` when using Jolt Physics, as it does not support joint solver priority.
   */
  joint_get_solver_priority(joint: RID): int;
  /** Returns the type of the Joint3D. */
  joint_get_type(joint: RID): int;
  /** Returns whether the bodies attached to the {@link Joint3D} will collide with each other. */
  joint_is_disabled_collisions_between_bodies(joint: RID): boolean;
  joint_make_cone_twist(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D): void;
  /**
   * Make the joint a generic six degrees of freedom (6DOF) joint. Use {@link generic_6dof_joint_set_flag} and {@link generic_6dof_joint_set_param} to set the joint's flags and parameters respectively.
   */
  joint_make_generic_6dof(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D): void;
  joint_make_hinge(joint: RID, body_A: RID, hinge_A: Transform3D, body_B: RID, hinge_B: Transform3D): void;
  joint_make_pin(joint: RID, body_A: RID, local_A: Vector3, body_B: RID, local_B: Vector3): void;
  joint_make_slider(joint: RID, body_A: RID, local_ref_A: Transform3D, body_B: RID, local_ref_B: Transform3D): void;
  /**
   * Sets the priority value of the Joint3D.
   * **Note:** Only supported when using GodotPhysics3D. This method has no effect when using Jolt Physics, as it does not support joint solver priority.
   */
  joint_set_solver_priority(joint: RID, priority: int): void;
  /** Returns position of the joint in the local space of body a of the joint. */
  pin_joint_get_local_a(joint: RID): Vector3;
  /** Returns position of the joint in the local space of body b of the joint. */
  pin_joint_get_local_b(joint: RID): Vector3;
  /** Gets a pin joint parameter. */
  pin_joint_get_param(joint: RID, param: int): float;
  /** Sets position of the joint in the local space of body a of the joint. */
  pin_joint_set_local_a(joint: RID, local_A: Vector3): void;
  /** Sets position of the joint in the local space of body b of the joint. */
  pin_joint_set_local_b(joint: RID, local_B: Vector3): void;
  /** Sets a pin joint parameter. */
  pin_joint_set_param(joint: RID, param: int, value: float): void;
  /**
   * Creates a 3D separation ray shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the shape's `length` and `slide_on_slope` properties.
   */
  separation_ray_shape_create(): RID;
  /** Activates or deactivates the 3D physics engine. */
  set_active(active: boolean): void;
  /**
   * Returns the shape data that configures the shape, such as the half-extents of a box or the triangles of a concave (trimesh) shape. See {@link shape_set_data} for the precise format of this data in each case.
   */
  shape_get_data(shape: RID): unknown;
  /**
   * Returns the collision margin for the shape.
   * **Note:** This is not used in Godot Physics, so will always return `0`.
   */
  shape_get_margin(shape: RID): float;
  /** Returns the shape's type. */
  shape_get_type(shape: RID): int;
  /**
   * Sets the shape data that configures the shape. The `data` to be passed depends on the shape's type (see {@link shape_get_type}):
   * - {@link SHAPE_WORLD_BOUNDARY}: a {@link Plane},
   * - {@link SHAPE_SEPARATION_RAY}: a dictionary containing the key `"length"` with a [float] value and the key `"slide_on_slope"` with a [bool] value,
   * - {@link SHAPE_SPHERE}: a [float] that is the radius of the sphere,
   * - {@link SHAPE_BOX}: a {@link Vector3} containing the half-extents of the box,
   * - {@link SHAPE_CAPSULE}: a dictionary containing the keys `"height"` and `"radius"` with [float] values,
   * - {@link SHAPE_CYLINDER}: a dictionary containing the keys `"height"` and `"radius"` with [float] values,
   * - {@link SHAPE_CONVEX_POLYGON}: a {@link PackedVector3Array} of points defining a convex polygon (the shape will be the convex hull of the points),
   * - {@link SHAPE_CONCAVE_POLYGON}: a dictionary containing the key `"faces"` with a {@link PackedVector3Array} value (with a length divisible by 3, so that each 3-tuple of points forms a face) and the key `"backface_collision"` with a [bool] value,
   * - {@link SHAPE_HEIGHTMAP}: a dictionary containing the keys `"width"` and `"depth"` with [int] values, and the key `"heights"` with a value that is a packed array of [float]s of length `width * depth` (that is a {@link PackedFloat32Array}, or a {@link PackedFloat64Array} if Godot was compiled with the `precision=double` option), and optionally the keys `"min_height"` and `"max_height"` with [float] values,
   * - {@link SHAPE_SOFT_BODY}: the input `data` is ignored and this method has no effect,
   * - {@link SHAPE_CUSTOM}: the input `data` is interpreted by a custom physics server, if it supports custom shapes.
   */
  shape_set_data(shape: RID, data: unknown): void;
  /**
   * Sets the collision margin for the shape.
   * **Note:** This is not used in Godot Physics.
   */
  shape_set_margin(shape: RID, margin: float): void;
  /** Gets a slider joint parameter. */
  slider_joint_get_param(joint: RID, param: int): float;
  /** Gets a slider joint parameter. */
  slider_joint_set_param(joint: RID, param: int, value: float): void;
  /** Adds the given body to the list of bodies exempt from collisions. */
  soft_body_add_collision_exception(body: RID, body_b: RID): void;
  /**
   * Distributes and applies a force to all points. A force is time dependent and meant to be applied every physics update.
   */
  soft_body_apply_central_force(body: RID, force: Vector3): void;
  /**
   * Distributes and applies an impulse to all points.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  soft_body_apply_central_impulse(body: RID, impulse: Vector3): void;
  /** Applies a force to a point. A force is time dependent and meant to be applied every physics update. */
  soft_body_apply_point_force(body: RID, point_index: int, force: Vector3): void;
  /**
   * Applies an impulse to a point.
   * An impulse is time-independent! Applying an impulse every frame would result in a framerate-dependent force. For this reason, it should only be used when simulating one-time impacts (use the "_force" functions otherwise).
   */
  soft_body_apply_point_impulse(body: RID, point_index: int, impulse: Vector3): void;
  /** Creates a new soft body and returns its internal {@link RID}. */
  soft_body_create(): RID;
  /** Returns the bounds of the given soft body in global coordinates. */
  soft_body_get_bounds(body: RID): AABB;
  /** Returns the physics layer or layers that the given soft body belongs to. */
  soft_body_get_collision_layer(body: RID): int;
  /** Returns the physics layer or layers that the given soft body can collide with. */
  soft_body_get_collision_mask(body: RID): int;
  /** Returns the damping coefficient of the given soft body. */
  soft_body_get_damping_coefficient(body: RID): float;
  /** Returns the drag coefficient of the given soft body. */
  soft_body_get_drag_coefficient(body: RID): float;
  /** Returns the linear stiffness of the given soft body. */
  soft_body_get_linear_stiffness(body: RID): float;
  /** Returns the current position of the given soft body point in global coordinates. */
  soft_body_get_point_global_position(body: RID, point_index: int): Vector3;
  /** Returns the pressure coefficient of the given soft body. */
  soft_body_get_pressure_coefficient(body: RID): float;
  /** Returns the shrinking factor of the given soft body. */
  soft_body_get_shrinking_factor(body: RID): float;
  /** Returns the simulation precision of the given soft body. */
  soft_body_get_simulation_precision(body: RID): int;
  /** Returns the {@link RID} of the space assigned to the given soft body. */
  soft_body_get_space(body: RID): RID;
  /**
   * Returns the given soft body state.
   * **Note:** Godot's default physics implementation does not support {@link BODY_STATE_LINEAR_VELOCITY}, {@link BODY_STATE_ANGULAR_VELOCITY}, {@link BODY_STATE_SLEEPING}, or {@link BODY_STATE_CAN_SLEEP}.
   */
  soft_body_get_state(body: RID, state: int): unknown;
  /** Returns the total mass assigned to the given soft body. */
  soft_body_get_total_mass(body: RID): float;
  /** Returns whether the given soft body point is pinned. */
  soft_body_is_point_pinned(body: RID, point_index: int): boolean;
  /** Moves the given soft body point to a position in global coordinates. */
  soft_body_move_point(body: RID, point_index: int, global_position: Vector3): void;
  /**
   * Pins or unpins the given soft body point based on the value of `pin`.
   * **Note:** Pinning a point effectively makes it kinematic, preventing it from being affected by forces, but you can still move it using {@link soft_body_move_point}.
   */
  soft_body_pin_point(body: RID, point_index: int, pin: boolean): void;
  /** Unpins all points of the given soft body. */
  soft_body_remove_all_pinned_points(body: RID): void;
  /** Removes the given body from the list of bodies exempt from collisions. */
  soft_body_remove_collision_exception(body: RID, body_b: RID): void;
  /** Sets the physics layer or layers the given soft body belongs to. */
  soft_body_set_collision_layer(body: RID, layer: int): void;
  /** Sets the physics layer or layers the given soft body can collide with. */
  soft_body_set_collision_mask(body: RID, mask: int): void;
  /**
   * Sets the damping coefficient of the given soft body. Higher values will slow down the body more noticeably when forces are applied.
   */
  soft_body_set_damping_coefficient(body: RID, damping_coefficient: float): void;
  /**
   * Sets the drag coefficient of the given soft body. Higher values increase this body's air resistance.
   * **Note:** This value is currently unused by Godot's default physics implementation.
   */
  soft_body_set_drag_coefficient(body: RID, drag_coefficient: float): void;
  /**
   * Sets the linear stiffness of the given soft body. Higher values will result in a stiffer body, while lower values will increase the body's ability to bend. The value can be between `0.0` and `1.0` (inclusive).
   */
  soft_body_set_linear_stiffness(body: RID, stiffness: float): void;
  /** Sets the mesh of the given soft body. */
  soft_body_set_mesh(body: RID, mesh: RID): void;
  /**
   * Sets the pressure coefficient of the given soft body. Simulates pressure build-up from inside this body. Higher values increase the strength of this effect.
   */
  soft_body_set_pressure_coefficient(body: RID, pressure_coefficient: float): void;
  /** Sets whether the given soft body will be pickable when using object picking. */
  soft_body_set_ray_pickable(body: RID, enable: boolean): void;
  /** Sets the shrinking factor of the given soft body. */
  soft_body_set_shrinking_factor(body: RID, shrinking_factor: float): void;
  /**
   * Sets the simulation precision of the given soft body. Increasing this value will improve the resulting simulation, but can affect performance. Use with care.
   */
  soft_body_set_simulation_precision(body: RID, simulation_precision: int): void;
  /** Assigns a space to the given soft body (see {@link space_create}). */
  soft_body_set_space(body: RID, space: RID): void;
  /**
   * Sets the given body state for the given body.
   * **Note:** Godot's default physics implementation does not support {@link BODY_STATE_LINEAR_VELOCITY}, {@link BODY_STATE_ANGULAR_VELOCITY}, {@link BODY_STATE_SLEEPING}, or {@link BODY_STATE_CAN_SLEEP}.
   */
  soft_body_set_state(body: RID, state: int, variant: unknown): void;
  /** Sets the total mass for the given soft body. */
  soft_body_set_total_mass(body: RID, total_mass: float): void;
  /** Sets the global transform of the given soft body. */
  soft_body_set_transform(body: RID, transform: Transform3D): void;
  /**
   * Requests that the physics server updates the rendering server with the latest positions of the given soft body's points through the `rendering_server_handler` interface.
   */
  soft_body_update_rendering_server(body: RID, rendering_server_handler: PhysicsServer3DRenderingServerHandler): void;
  /**
   * Creates a space. A space is a collection of parameters for the physics engine that can be assigned to an area or a body. It can be assigned to an area with {@link area_set_space}, or to a body with {@link body_set_space}.
   */
  space_create(): RID;
  /**
   * Returns the state of a space, a {@link PhysicsDirectSpaceState3D}. This object can be used to make collision/intersection queries.
   */
  space_get_direct_state(space: RID): PhysicsDirectSpaceState3D;
  /** Returns the value of a space parameter. */
  space_get_param(space: RID, param: int): float;
  /** Returns whether the space is active. */
  space_is_active(space: RID): boolean;
  /** Marks a space as active. It will not have an effect, unless it is assigned to an area or body. */
  space_set_active(space: RID, active: boolean): void;
  /**
   * Sets the value for a space parameter. A list of available parameters is on the {@link SpaceParameter} constants.
   */
  space_set_param(space: RID, param: int, value: float): void;
  /**
   * Creates a 3D sphere shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the sphere's radius.
   */
  sphere_shape_create(): RID;
  /**
   * Creates a 3D world boundary shape in the physics server, and returns the {@link RID} that identifies it. Use {@link shape_set_data} to set the shape's normal direction and distance properties.
   */
  world_boundary_shape_create(): RID;

  // enum JointType
  /** The {@link Joint3D} is a {@link PinJoint3D}. */
  static readonly JOINT_TYPE_PIN: int;
  /** The {@link Joint3D} is a {@link HingeJoint3D}. */
  static readonly JOINT_TYPE_HINGE: int;
  /** The {@link Joint3D} is a {@link SliderJoint3D}. */
  static readonly JOINT_TYPE_SLIDER: int;
  /** The {@link Joint3D} is a {@link ConeTwistJoint3D}. */
  static readonly JOINT_TYPE_CONE_TWIST: int;
  /** The {@link Joint3D} is a {@link Generic6DOFJoint3D}. */
  static readonly JOINT_TYPE_6DOF: int;
  /** Represents the size of the {@link JointType} enum. */
  static readonly JOINT_TYPE_MAX: int;
  // enum PinJointParam
  /**
   * The strength with which the pinned objects try to stay in positional relation to each other. The higher, the stronger.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly PIN_JOINT_BIAS: int;
  /**
   * The strength with which the pinned objects try to stay in velocity relation to each other. The higher, the stronger.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly PIN_JOINT_DAMPING: int;
  /**
   * If above 0, this value is the maximum value for an impulse that this Joint3D puts on its ends.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly PIN_JOINT_IMPULSE_CLAMP: int;
  // enum HingeJointParam
  /**
   * The speed with which the two bodies get pulled together when they move in different directions.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly HINGE_JOINT_BIAS: int;
  /** The maximum rotation across the Hinge. */
  static readonly HINGE_JOINT_LIMIT_UPPER: int;
  /** The minimum rotation across the Hinge. */
  static readonly HINGE_JOINT_LIMIT_LOWER: int;
  /**
   * The speed with which the rotation across the axis perpendicular to the hinge gets corrected.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly HINGE_JOINT_LIMIT_BIAS: int;
  /**
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly HINGE_JOINT_LIMIT_SOFTNESS: int;
  /**
   * The lower this value, the more the rotation gets slowed down.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly HINGE_JOINT_LIMIT_RELAXATION: int;
  /** Target speed for the motor. */
  static readonly HINGE_JOINT_MOTOR_TARGET_VELOCITY: int;
  /** Maximum acceleration for the motor. */
  static readonly HINGE_JOINT_MOTOR_MAX_IMPULSE: int;
  // enum HingeJointFlag
  /** If `true`, the Hinge has a maximum and a minimum rotation. */
  static readonly HINGE_JOINT_FLAG_USE_LIMIT: int;
  /** If `true`, a motor turns the Hinge. */
  static readonly HINGE_JOINT_FLAG_ENABLE_MOTOR: int;
  // enum SliderJointParam
  /** The maximum difference between the pivot points on their X axis before damping happens. */
  static readonly SLIDER_JOINT_LINEAR_LIMIT_UPPER: int;
  /** The minimum difference between the pivot points on their X axis before damping happens. */
  static readonly SLIDER_JOINT_LINEAR_LIMIT_LOWER: int;
  /**
   * A factor applied to the movement across the slider axis once the limits get surpassed. The lower, the slower the movement.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_LIMIT_SOFTNESS: int;
  /**
   * The amount of restitution once the limits are surpassed. The lower, the more velocity-energy gets lost.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_LIMIT_RESTITUTION: int;
  /**
   * The amount of damping once the slider limits are surpassed.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_LIMIT_DAMPING: int;
  /**
   * A factor applied to the movement across the slider axis as long as the slider is in the limits. The lower, the slower the movement.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_MOTION_SOFTNESS: int;
  /**
   * The amount of restitution inside the slider limits.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_MOTION_RESTITUTION: int;
  /**
   * The amount of damping inside the slider limits.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_MOTION_DAMPING: int;
  /**
   * A factor applied to the movement across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_ORTHOGONAL_SOFTNESS: int;
  /**
   * The amount of restitution when movement is across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_ORTHOGONAL_RESTITUTION: int;
  /**
   * The amount of damping when movement is across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_LINEAR_ORTHOGONAL_DAMPING: int;
  /**
   * The upper limit of rotation in the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_LIMIT_UPPER: int;
  /**
   * The lower limit of rotation in the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_LIMIT_LOWER: int;
  /**
   * A factor applied to the all rotation once the limit is surpassed.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_LIMIT_SOFTNESS: int;
  /**
   * The amount of restitution of the rotation when the limit is surpassed.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_LIMIT_RESTITUTION: int;
  /**
   * The amount of damping of the rotation when the limit is surpassed.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_LIMIT_DAMPING: int;
  /**
   * A factor that gets applied to the all rotation in the limits.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_MOTION_SOFTNESS: int;
  /**
   * The amount of restitution of the rotation in the limits.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_MOTION_RESTITUTION: int;
  /**
   * The amount of damping of the rotation in the limits.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_MOTION_DAMPING: int;
  /**
   * A factor that gets applied to the all rotation across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_ORTHOGONAL_SOFTNESS: int;
  /**
   * The amount of restitution of the rotation across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_ORTHOGONAL_RESTITUTION: int;
  /**
   * The amount of damping of the rotation across axes orthogonal to the slider.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SLIDER_JOINT_ANGULAR_ORTHOGONAL_DAMPING: int;
  /** Represents the size of the {@link SliderJointParam} enum. */
  static readonly SLIDER_JOINT_MAX: int;
  // enum ConeTwistJointParam
  /**
   * Swing is rotation from side to side, around the axis perpendicular to the twist axis.
   * The swing span defines, how much rotation will not get corrected along the swing axis.
   * Could be defined as looseness in the {@link ConeTwistJoint3D}. If below 0.05, this behavior is locked.
   */
  static readonly CONE_TWIST_JOINT_SWING_SPAN: int;
  /**
   * Twist is the rotation around the twist axis, this value defined how far the joint can twist. Twist is locked if below 0.05.
   */
  static readonly CONE_TWIST_JOINT_TWIST_SPAN: int;
  /**
   * The speed with which the swing or twist will take place. The higher, the faster.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly CONE_TWIST_JOINT_BIAS: int;
  /**
   * The ease with which the Joint3D twists, if it's too low, it takes more force to twist the joint.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly CONE_TWIST_JOINT_SOFTNESS: int;
  /**
   * Defines, how fast the swing- and twist-speed-difference on both sides gets synced.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly CONE_TWIST_JOINT_RELAXATION: int;
  // enum G6DOFJointAxisParam
  /** The minimum difference between the pivot points' axes. */
  static readonly G6DOF_JOINT_LINEAR_LOWER_LIMIT: int;
  /** The maximum difference between the pivot points' axes. */
  static readonly G6DOF_JOINT_LINEAR_UPPER_LIMIT: int;
  /**
   * A factor that gets applied to the movement across the axes. The lower, the slower the movement.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_LINEAR_LIMIT_SOFTNESS: int;
  /**
   * The amount of restitution on the axes movement. The lower, the more velocity-energy gets lost.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_LINEAR_RESTITUTION: int;
  /**
   * The amount of damping that happens at the linear motion across the axes.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_LINEAR_DAMPING: int;
  /** The velocity that the joint's linear motor will attempt to reach. */
  static readonly G6DOF_JOINT_LINEAR_MOTOR_TARGET_VELOCITY: int;
  /** The maximum force that the linear motor can apply while trying to reach the target velocity. */
  static readonly G6DOF_JOINT_LINEAR_MOTOR_FORCE_LIMIT: int;
  static readonly G6DOF_JOINT_LINEAR_SPRING_STIFFNESS: int;
  static readonly G6DOF_JOINT_LINEAR_SPRING_DAMPING: int;
  static readonly G6DOF_JOINT_LINEAR_SPRING_EQUILIBRIUM_POINT: int;
  /** The minimum rotation in negative direction to break loose and rotate around the axes. */
  static readonly G6DOF_JOINT_ANGULAR_LOWER_LIMIT: int;
  /** The minimum rotation in positive direction to break loose and rotate around the axes. */
  static readonly G6DOF_JOINT_ANGULAR_UPPER_LIMIT: int;
  /**
   * A factor that gets multiplied onto all rotations across the axes.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_ANGULAR_LIMIT_SOFTNESS: int;
  /**
   * The amount of rotational damping across the axes. The lower, the more damping occurs.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_ANGULAR_DAMPING: int;
  /**
   * The amount of rotational restitution across the axes. The lower, the more restitution occurs.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_ANGULAR_RESTITUTION: int;
  /**
   * The maximum amount of force that can occur, when rotating around the axes.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_ANGULAR_FORCE_LIMIT: int;
  /**
   * When correcting the crossing of limits in rotation across the axes, this error tolerance factor defines how much the correction gets slowed down. The lower, the slower.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly G6DOF_JOINT_ANGULAR_ERP: int;
  /** Target speed for the motor at the axes. */
  static readonly G6DOF_JOINT_ANGULAR_MOTOR_TARGET_VELOCITY: int;
  /** Maximum acceleration for the motor at the axes. */
  static readonly G6DOF_JOINT_ANGULAR_MOTOR_FORCE_LIMIT: int;
  static readonly G6DOF_JOINT_ANGULAR_SPRING_STIFFNESS: int;
  static readonly G6DOF_JOINT_ANGULAR_SPRING_DAMPING: int;
  static readonly G6DOF_JOINT_ANGULAR_SPRING_EQUILIBRIUM_POINT: int;
  /** Represents the size of the {@link G6DOFJointAxisParam} enum. */
  static readonly G6DOF_JOINT_MAX: int;
  // enum G6DOFJointAxisFlag
  /** If set, linear motion is possible within the given limits. */
  static readonly G6DOF_JOINT_FLAG_ENABLE_LINEAR_LIMIT: int;
  /** If set, rotational motion is possible. */
  static readonly G6DOF_JOINT_FLAG_ENABLE_ANGULAR_LIMIT: int;
  static readonly G6DOF_JOINT_FLAG_ENABLE_ANGULAR_SPRING: int;
  static readonly G6DOF_JOINT_FLAG_ENABLE_LINEAR_SPRING: int;
  /** If set, there is a rotational motor across these axes. */
  static readonly G6DOF_JOINT_FLAG_ENABLE_MOTOR: int;
  /** If set, there is a linear motor on this axis that targets a specific velocity. */
  static readonly G6DOF_JOINT_FLAG_ENABLE_LINEAR_MOTOR: int;
  /** Represents the size of the {@link G6DOFJointAxisFlag} enum. */
  static readonly G6DOF_JOINT_FLAG_MAX: int;
  // enum ShapeType
  /** Constant for creating a world boundary shape (used by the {@link WorldBoundaryShape3D} resource). */
  static readonly SHAPE_WORLD_BOUNDARY: int;
  /** Constant for creating a separation ray shape (used by the {@link SeparationRayShape3D} resource). */
  static readonly SHAPE_SEPARATION_RAY: int;
  /** Constant for creating a sphere shape (used by the {@link SphereShape3D} resource). */
  static readonly SHAPE_SPHERE: int;
  /** Constant for creating a box shape (used by the {@link BoxShape3D} resource). */
  static readonly SHAPE_BOX: int;
  /** Constant for creating a capsule shape (used by the {@link CapsuleShape3D} resource). */
  static readonly SHAPE_CAPSULE: int;
  /** Constant for creating a cylinder shape (used by the {@link CylinderShape3D} resource). */
  static readonly SHAPE_CYLINDER: int;
  /** Constant for creating a convex polygon shape (used by the {@link ConvexPolygonShape3D} resource). */
  static readonly SHAPE_CONVEX_POLYGON: int;
  /**
   * Constant for creating a concave polygon (trimesh) shape (used by the {@link ConcavePolygonShape3D} resource).
   */
  static readonly SHAPE_CONCAVE_POLYGON: int;
  /** Constant for creating a heightmap shape (used by the {@link HeightMapShape3D} resource). */
  static readonly SHAPE_HEIGHTMAP: int;
  /**
   * Constant used internally for a soft body shape. Any attempt to create this kind of shape results in an error.
   */
  static readonly SHAPE_SOFT_BODY: int;
  /**
   * Constant used internally for a custom shape. Any attempt to create this kind of shape results in an error when using Godot Physics or Jolt Physics.
   */
  static readonly SHAPE_CUSTOM: int;
  // enum AreaParameter
  /**
   * Constant to set/get gravity override mode in an area. See {@link AreaSpaceOverrideMode} for possible values.
   */
  static readonly AREA_PARAM_GRAVITY_OVERRIDE_MODE: int;
  /** Constant to set/get gravity strength in an area. */
  static readonly AREA_PARAM_GRAVITY: int;
  /** Constant to set/get gravity vector/center in an area. */
  static readonly AREA_PARAM_GRAVITY_VECTOR: int;
  /** Constant to set/get whether the gravity vector of an area is a direction, or a center point. */
  static readonly AREA_PARAM_GRAVITY_IS_POINT: int;
  /**
   * Constant to set/get the distance at which the gravity strength is equal to the gravity controlled by {@link AREA_PARAM_GRAVITY}. For example, on a planet 100 meters in radius with a surface gravity of 4.0 m/s², set the gravity to 4.0 and the unit distance to 100.0. The gravity will have falloff according to the inverse square law, so in the example, at 200 meters from the center the gravity will be 1.0 m/s² (twice the distance, 1/4th the gravity), at 50 meters it will be 16.0 m/s² (half the distance, 4x the gravity), and so on.
   * The above is true only when the unit distance is a positive number. When this is set to 0.0, the gravity will be constant regardless of distance.
   */
  static readonly AREA_PARAM_GRAVITY_POINT_UNIT_DISTANCE: int;
  /**
   * Constant to set/get linear damping override mode in an area. See {@link AreaSpaceOverrideMode} for possible values.
   */
  static readonly AREA_PARAM_LINEAR_DAMP_OVERRIDE_MODE: int;
  /** Constant to set/get the linear damping factor of an area. */
  static readonly AREA_PARAM_LINEAR_DAMP: int;
  /**
   * Constant to set/get angular damping override mode in an area. See {@link AreaSpaceOverrideMode} for possible values.
   */
  static readonly AREA_PARAM_ANGULAR_DAMP_OVERRIDE_MODE: int;
  /** Constant to set/get the angular damping factor of an area. */
  static readonly AREA_PARAM_ANGULAR_DAMP: int;
  /** Constant to set/get the priority (order of processing) of an area. */
  static readonly AREA_PARAM_PRIORITY: int;
  /**
   * Constant to set/get the magnitude of area-specific wind force. This wind force only applies to {@link SoftBody3D} nodes. Other physics bodies are currently not affected by wind.
   */
  static readonly AREA_PARAM_WIND_FORCE_MAGNITUDE: int;
  /** Constant to set/get the 3D vector that specifies the origin from which an area-specific wind blows. */
  static readonly AREA_PARAM_WIND_SOURCE: int;
  /**
   * Constant to set/get the 3D vector that specifies the direction in which an area-specific wind blows.
   */
  static readonly AREA_PARAM_WIND_DIRECTION: int;
  /**
   * Constant to set/get the exponential rate at which wind force decreases with distance from its origin.
   */
  static readonly AREA_PARAM_WIND_ATTENUATION_FACTOR: int;
  // enum AreaSpaceOverrideMode
  /**
   * This area does not affect gravity/damp. These are generally areas that exist only to detect collisions, and objects entering or exiting them.
   */
  static readonly AREA_SPACE_OVERRIDE_DISABLED: int;
  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. This way, many overlapping areas can combine their physics to make interesting effects.
   */
  static readonly AREA_SPACE_OVERRIDE_COMBINE: int;
  /**
   * This area adds its gravity/damp values to whatever has been calculated so far. Then stops taking into account the rest of the areas, even the default one.
   */
  static readonly AREA_SPACE_OVERRIDE_COMBINE_REPLACE: int;
  /**
   * This area replaces any gravity/damp, even the default one, and stops taking into account the rest of the areas.
   */
  static readonly AREA_SPACE_OVERRIDE_REPLACE: int;
  /**
   * This area replaces any gravity/damp calculated so far, but keeps calculating the rest of the areas, down to the default one.
   */
  static readonly AREA_SPACE_OVERRIDE_REPLACE_COMBINE: int;
  // enum BodyMode
  /**
   * Constant for static bodies. In this mode, a body can be only moved by user code and doesn't collide with other bodies along its path when moved.
   */
  static readonly BODY_MODE_STATIC: int;
  /**
   * Constant for kinematic bodies. In this mode, a body can be only moved by user code and collides with other bodies along its path.
   */
  static readonly BODY_MODE_KINEMATIC: int;
  /**
   * Constant for rigid bodies. In this mode, a body can be pushed by other bodies and has forces applied.
   */
  static readonly BODY_MODE_RIGID: int;
  /**
   * Constant for linear rigid bodies. In this mode, a body can not rotate, and only its linear velocity is affected by external forces.
   */
  static readonly BODY_MODE_RIGID_LINEAR: int;
  // enum BodyParameter
  /** Constant to set/get a body's bounce factor. */
  static readonly BODY_PARAM_BOUNCE: int;
  /** Constant to set/get a body's friction. */
  static readonly BODY_PARAM_FRICTION: int;
  /** Constant to set/get a body's mass. */
  static readonly BODY_PARAM_MASS: int;
  /** Constant to set/get a body's inertia. */
  static readonly BODY_PARAM_INERTIA: int;
  /** Constant to set/get a body's center of mass position in the body's local coordinate system. */
  static readonly BODY_PARAM_CENTER_OF_MASS: int;
  /** Constant to set/get a body's gravity multiplier. */
  static readonly BODY_PARAM_GRAVITY_SCALE: int;
  /** Constant to set/get a body's linear damping mode. See {@link BodyDampMode} for possible values. */
  static readonly BODY_PARAM_LINEAR_DAMP_MODE: int;
  /** Constant to set/get a body's angular damping mode. See {@link BodyDampMode} for possible values. */
  static readonly BODY_PARAM_ANGULAR_DAMP_MODE: int;
  /** Constant to set/get a body's linear damping factor. */
  static readonly BODY_PARAM_LINEAR_DAMP: int;
  /** Constant to set/get a body's angular damping factor. */
  static readonly BODY_PARAM_ANGULAR_DAMP: int;
  /** Represents the size of the {@link BodyParameter} enum. */
  static readonly BODY_PARAM_MAX: int;
  // enum BodyDampMode
  /** The body's damping value is added to any value set in areas or the default value. */
  static readonly BODY_DAMP_MODE_COMBINE: int;
  /** The body's damping value replaces any value set in areas or the default value. */
  static readonly BODY_DAMP_MODE_REPLACE: int;
  // enum BodyState
  /** Constant to set/get the current transform matrix of the body. */
  static readonly BODY_STATE_TRANSFORM: int;
  /** Constant to set/get the current linear velocity of the body. */
  static readonly BODY_STATE_LINEAR_VELOCITY: int;
  /** Constant to set/get the current angular velocity of the body. */
  static readonly BODY_STATE_ANGULAR_VELOCITY: int;
  /** Constant to sleep/wake up a body, or to get whether it is sleeping. */
  static readonly BODY_STATE_SLEEPING: int;
  /** Constant to set/get whether the body can sleep. */
  static readonly BODY_STATE_CAN_SLEEP: int;
  // enum AreaBodyStatus
  /**
   * The value of the first parameter and area callback function receives, when an object enters one of its shapes.
   */
  static readonly AREA_BODY_ADDED: int;
  /**
   * The value of the first parameter and area callback function receives, when an object exits one of its shapes.
   */
  static readonly AREA_BODY_REMOVED: int;
  // enum ProcessInfo
  /** Constant to get the number of objects that are not sleeping. */
  static readonly INFO_ACTIVE_OBJECTS: int;
  /** Constant to get the number of possible collisions. */
  static readonly INFO_COLLISION_PAIRS: int;
  /** Constant to get the number of space regions where a collision could occur. */
  static readonly INFO_ISLAND_COUNT: int;
  // enum SpaceParameter
  /**
   * Constant to set/get the maximum distance a pair of bodies has to move before their collision status has to be recalculated.
   */
  static readonly SPACE_PARAM_CONTACT_RECYCLE_RADIUS: int;
  /**
   * Constant to set/get the maximum distance a shape can be from another before they are considered separated and the contact is discarded.
   */
  static readonly SPACE_PARAM_CONTACT_MAX_SEPARATION: int;
  /**
   * Constant to set/get the maximum distance a shape can penetrate another shape before it is considered a collision.
   */
  static readonly SPACE_PARAM_CONTACT_MAX_ALLOWED_PENETRATION: int;
  /**
   * Constant to set/get the default solver bias for all physics contacts. A solver bias is a factor controlling how much two objects "rebound", after overlapping, to avoid leaving them in that state because of numerical imprecision.
   */
  static readonly SPACE_PARAM_CONTACT_DEFAULT_BIAS: int;
  /**
   * Constant to set/get the threshold linear velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SPACE_PARAM_BODY_LINEAR_VELOCITY_SLEEP_THRESHOLD: int;
  /**
   * Constant to set/get the threshold angular velocity of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after the time given.
   * **Note:** Only supported when using GodotPhysics3D. This parameter is ignored when using Jolt Physics.
   */
  static readonly SPACE_PARAM_BODY_ANGULAR_VELOCITY_SLEEP_THRESHOLD: int;
  /**
   * Constant to set/get the maximum time of activity. A body marked as potentially inactive for both linear and angular velocity will be put to sleep after this time.
   */
  static readonly SPACE_PARAM_BODY_TIME_TO_SLEEP: int;
  /**
   * Constant to set/get the number of solver iterations for contacts and constraints. The greater the number of iterations, the more accurate the collisions and constraints will be. However, a greater number of iterations requires more CPU power, which can decrease performance.
   */
  static readonly SPACE_PARAM_SOLVER_ITERATIONS: int;
  // enum BodyAxis
  static readonly BODY_AXIS_LINEAR_X: int;
  static readonly BODY_AXIS_LINEAR_Y: int;
  static readonly BODY_AXIS_LINEAR_Z: int;
  static readonly BODY_AXIS_ANGULAR_X: int;
  static readonly BODY_AXIS_ANGULAR_Y: int;
  static readonly BODY_AXIS_ANGULAR_Z: int;
}
