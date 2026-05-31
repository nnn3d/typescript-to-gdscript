// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Abstract base class for 3D physics objects. */
declare class CollisionObject3D extends Node3D {
  /**
   * The physics layers this CollisionObject3D **is in**. Collision objects can exist in one or more of 32 different layers. See also {@link collision_mask}.
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_layer: int;
  /**
   * The physics layers this CollisionObject3D **scans**. Collision objects can scan one or more of 32 different layers. See also {@link collision_layer}.
   * **Note:** Object A can detect a contact with object B only if object B is in any of the layers that object A scans. See Collision layers and masks ($DOCS_URL/tutorials/physics/physics_introduction.html#collision-layers-and-masks) in the documentation for more information.
   */
  collision_mask: int;
  /**
   * The priority used to solve colliding when occurring penetration. The higher the priority is, the lower the penetration into the object will be. This can for example be used to prevent the player from breaking through the boundaries of a level.
   */
  collision_priority: float;
  /**
   * Defines the behavior in physics when {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}.
   */
  disable_mode: int;
  /**
   * If `true`, the {@link CollisionObject3D} will continue to receive input events as the mouse is dragged across its shapes.
   */
  input_capture_on_drag: boolean;
  /**
   * If `true`, this object is pickable. A pickable object can detect the mouse pointer entering/leaving, and if the mouse is inside it, report input events. Requires at least one {@link collision_layer} bit to be set.
   */
  input_ray_pickable: boolean;
  set_collision_layer(value: int): void;
  get_collision_layer(): int;
  set_collision_mask(value: int): void;
  get_collision_mask(): int;
  set_collision_priority(value: float): void;
  get_collision_priority(): float;
  set_disable_mode(value: int): void;
  get_disable_mode(): int;
  set_capture_input_on_drag(value: boolean): void;
  get_capture_input_on_drag(): boolean;
  set_ray_pickable(value: boolean): void;
  is_ray_pickable(): boolean;

  /**
   * Receives unhandled {@link InputEvent}s. `event_position` is the location in world space of the mouse pointer on the surface of the shape with index `shape_idx` and `normal` is the normal vector of the surface at that point. Connect to the {@link input_event} signal to easily pick up these events.
   * **Note:** {@link _input_event} requires {@link input_ray_pickable} to be `true` and at least one {@link collision_layer} bit to be set.
   */
  _input_event(camera: Camera3D, event: InputEvent, event_position: Vector3 | Vector3i, normal: Vector3 | Vector3i, shape_idx: int): void;
  /**
   * Called when the mouse pointer enters any of this object's shapes. Requires {@link input_ray_pickable} to be `true` and at least one {@link collision_layer} bit to be set. Note that moving between different shapes within a single {@link CollisionObject3D} won't cause this function to be called.
   */
  _mouse_enter(): void;
  /**
   * Called when the mouse pointer exits all this object's shapes. Requires {@link input_ray_pickable} to be `true` and at least one {@link collision_layer} bit to be set. Note that moving between different shapes within a single {@link CollisionObject3D} won't cause this function to be called.
   */
  _mouse_exit(): void;
  /**
   * Creates a new shape owner for the given object. Returns `owner_id` of the new owner for future reference.
   */
  create_shape_owner(owner: GodotObject): int;
  /**
   * Returns whether or not the specified layer of the {@link collision_layer} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_layer_value(layer_number: int): boolean;
  /**
   * Returns whether or not the specified layer of the {@link collision_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_collision_mask_value(layer_number: int): boolean;
  /** Returns the object's {@link RID}. */
  get_rid(): RID;
  /**
   * Returns an {@link Array} of `owner_id` identifiers. You can use these ids in other methods that take `owner_id` as an argument.
   */
  get_shape_owners(): PackedInt32Array;
  /** If `true`, the shape owner and its shapes are disabled. */
  is_shape_owner_disabled(owner_id: int): boolean;
  /** Removes the given shape owner. */
  remove_shape_owner(owner_id: int): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_layer}, given a `layer_number` between 1 and 32.
   */
  set_collision_layer_value(layer_number: int, value: boolean): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link collision_mask}, given a `layer_number` between 1 and 32.
   */
  set_collision_mask_value(layer_number: int, value: boolean): void;
  /** Returns the `owner_id` of the given shape. */
  shape_find_owner(shape_index: int): int;
  /** Adds a {@link Shape3D} to the shape owner. */
  shape_owner_add_shape(owner_id: int, shape: Shape3D): void;
  /** Removes all shapes from the shape owner. */
  shape_owner_clear_shapes(owner_id: int): void;
  /** Returns the parent object of the given shape owner. */
  shape_owner_get_owner(owner_id: int): GodotObject | null;
  /** Returns the {@link Shape3D} with the given ID from the given shape owner. */
  shape_owner_get_shape(owner_id: int, shape_id: int): Shape3D | null;
  /** Returns the number of shapes the given shape owner contains. */
  shape_owner_get_shape_count(owner_id: int): int;
  /** Returns the child index of the {@link Shape3D} with the given ID from the given shape owner. */
  shape_owner_get_shape_index(owner_id: int, shape_id: int): int;
  /** Returns the shape owner's {@link Transform3D}. */
  shape_owner_get_transform(owner_id: int): Transform3D;
  /** Removes a shape from the given shape owner. */
  shape_owner_remove_shape(owner_id: int, shape_id: int): void;
  /** If `true`, disables the given shape owner. */
  shape_owner_set_disabled(owner_id: int, disabled: boolean): void;
  /** Sets the {@link Transform3D} of the given shape owner. */
  shape_owner_set_transform(owner_id: int, transform: Transform3D | Projection): void;

  /**
   * Emitted when the object receives an unhandled {@link InputEvent}. `event_position` is the location in world space of the mouse pointer on the surface of the shape with index `shape_idx` and `normal` is the normal vector of the surface at that point.
   */
  input_event: Signal<[Node, InputEvent, Vector3, Vector3, int]>;
  /**
   * Emitted when the mouse pointer enters any of this object's shapes. Requires {@link input_ray_pickable} to be `true` and at least one {@link collision_layer} bit to be set.
   * **Note:** Due to the lack of continuous collision detection, this signal may not be emitted in the expected order if the mouse moves fast enough and the {@link CollisionObject3D}'s area is small. This signal may also not be emitted if another {@link CollisionObject3D} is overlapping the {@link CollisionObject3D} in question.
   */
  mouse_entered: Signal<[]>;
  /**
   * Emitted when the mouse pointer exits all this object's shapes. Requires {@link input_ray_pickable} to be `true` and at least one {@link collision_layer} bit to be set.
   * **Note:** Due to the lack of continuous collision detection, this signal may not be emitted in the expected order if the mouse moves fast enough and the {@link CollisionObject3D}'s area is small. This signal may also not be emitted if another {@link CollisionObject3D} is overlapping the {@link CollisionObject3D} in question.
   */
  mouse_exited: Signal<[]>;

  // enum DisableMode
  /**
   * When {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}, remove from the physics simulation to stop all physics interactions with this {@link CollisionObject3D}.
   * Automatically re-added to the physics simulation when the {@link Node} is processed again.
   */
  static readonly DISABLE_MODE_REMOVE: int;
  /**
   * When {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}, make the body static. Doesn't affect {@link Area3D}. {@link PhysicsBody3D} can't be affected by forces or other bodies while static.
   * Automatically set {@link PhysicsBody3D} back to its original mode when the {@link Node} is processed again.
   */
  static readonly DISABLE_MODE_MAKE_STATIC: int;
  /**
   * When {@link Node.process_mode} is set to {@link Node.PROCESS_MODE_DISABLED}, do not affect the physics simulation.
   */
  static readonly DISABLE_MODE_KEEP_ACTIVE: int;
}
