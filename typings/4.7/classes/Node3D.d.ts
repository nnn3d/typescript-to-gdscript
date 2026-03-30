// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Base object in 3D space, inherited by all 3D nodes. */
declare class Node3D extends Node {
  /**
   * Basis of the {@link transform} property. Represents the rotation, scale, and shear of this node in parent space (relative to the parent node).
   */
  basis: Basis;
  /**
   * Basis of the {@link global_transform} property. Represents the rotation, scale, and shear of this node in global space (relative to the world).
   * **Note:** If the node is not inside the tree, getting this property fails and returns {@link Basis.IDENTITY}.
   */
  global_basis: Basis;
  /**
   * Global position (translation) of this node in global space (relative to the world). This is equivalent to the {@link global_transform}'s {@link Transform3D.origin}.
   * **Note:** If the node is not inside the tree, getting this property fails and returns {@link Vector3.ZERO}.
   */
  global_position: Vector3;
  /**
   * Global rotation of this node as Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians and in global space (relative to the world). This value is obtained from {@link global_basis}'s rotation.
   * - The {@link Vector3.x} is the angle around the global X axis (pitch);
   * - The {@link Vector3.y} is the angle around the global Y axis (yaw);
   * - The {@link Vector3.z} is the angle around the global Z axis (roll).
   * **Note:** Unlike {@link rotation}, this property always follows the YXZ convention ({@link EULER_ORDER_YXZ}).
   * **Note:** If the node is not inside the tree, getting this property fails and returns {@link Vector3.ZERO}.
   */
  global_rotation: Vector3;
  /**
   * The {@link global_rotation} of this node, in degrees instead of radians.
   * **Note:** If the node is not inside the tree, getting this property fails and returns {@link Vector3.ZERO}.
   */
  global_rotation_degrees: Vector3;
  /**
   * The transformation of this node, in global space (relative to the world). Contains and represents this node's {@link global_position}, {@link global_rotation}, and global scale.
   * **Note:** If the node is not inside the tree, getting this property fails and returns {@link Transform3D.IDENTITY}.
   */
  global_transform: Transform3D;
  /**
   * Position (translation) of this node in parent space (relative to the parent node). This is equivalent to the {@link transform}'s {@link Transform3D.origin}.
   */
  position: Vector3;
  /**
   * Rotation of this node represented as a {@link Quaternion} in parent space (relative to the parent node). This value is obtained from {@link basis}'s rotation.
   * **Note:** Quaternions are much more suitable for 3D math but are less intuitive. Setting this property can be useful for interpolation (see {@link Quaternion.slerp}).
   */
  quaternion: Quaternion;
  /**
   * Rotation of this node as Euler angles (https://en.wikipedia.org/wiki/Euler_angles), in radians and in parent space (relative to the parent node). This value is obtained from {@link basis}'s rotation.
   * - The {@link Vector3.x} is the angle around the local X axis (pitch);
   * - The {@link Vector3.y} is the angle around the local Y axis (yaw);
   * - The {@link Vector3.z} is the angle around the local Z axis (roll).
   * The order of each consecutive rotation can be changed with {@link rotation_order} (see {@link EulerOrder} constants). By default, the YXZ convention is used ({@link EULER_ORDER_YXZ}).
   * **Note:** This property is edited in degrees in the inspector. If you want to use degrees in a script, use {@link rotation_degrees}.
   */
  rotation: Vector3;
  /**
   * The {@link rotation} of this node, in degrees instead of radians.
   * **Note:** This is **not** the property available in the Inspector dock.
   */
  rotation_degrees: Vector3;
  /** How this node's rotation and scale are displayed in the Inspector dock. */
  rotation_edit_mode: int;
  /**
   * The axis rotation order of the {@link rotation} property. The final orientation is calculated by rotating around the local X, Y, and Z axis in this order.
   */
  rotation_order: int;
  /**
   * Scale of this node in local space (relative to this node). This value is obtained from {@link basis}'s scale.
   * **Note:** The behavior of some 3D node types is not affected by this property. These include {@link Light3D}, {@link Camera3D}, {@link AudioStreamPlayer3D}, and more.
   * **Warning:** The scale's components must either be all positive or all negative, and **not** exactly `0.0`. Otherwise, it won't be possible to obtain the scale from the {@link basis}. This may cause the intended scale to be lost when reloaded from disk, and potentially other unstable behavior.
   */
  scale: Vector3;
  /**
   * If `true`, the node does not inherit its transformations from its parent. As such, node transformations will only be in global space, which also means that {@link global_transform} and {@link transform} will be identical.
   */
  top_level: boolean;
  /**
   * The local transformation of this node, in parent space (relative to the parent node). Contains and represents this node's {@link position}, {@link rotation}, and {@link scale}.
   */
  transform: Transform3D;
  /**
   * Path to the visibility range parent for this node and its descendants. The visibility parent must be a {@link GeometryInstance3D}.
   * Any visual instance will only be visible if the visibility parent (and all of its visibility ancestors) is hidden by being closer to the camera than its own {@link GeometryInstance3D.visibility_range_begin}. Nodes hidden via the {@link Node3D.visible} property are essentially removed from the visibility dependency tree, so dependent instances will not take the hidden node or its descendants into account.
   */
  visibility_parent: string;
  /**
   * If `true`, this node can be visible. The node is only rendered when all of its ancestors are visible, as well. That means {@link is_visible_in_tree} must return `true`.
   */
  visible: boolean;
  set_basis(value: Basis): void;
  get_basis(): Basis;
  set_global_basis(value: Basis): void;
  get_global_basis(): Basis;
  set_global_position(value: Vector3): void;
  get_global_position(): Vector3;
  set_global_rotation(value: Vector3): void;
  get_global_rotation(): Vector3;
  set_global_rotation_degrees(value: Vector3): void;
  get_global_rotation_degrees(): Vector3;
  set_global_transform(value: Transform3D): void;
  get_global_transform(): Transform3D;
  set_position(value: Vector3): void;
  get_position(): Vector3;
  set_quaternion(value: Quaternion): void;
  get_quaternion(): Quaternion;
  set_rotation(value: Vector3): void;
  get_rotation(): Vector3;
  set_rotation_degrees(value: Vector3): void;
  get_rotation_degrees(): Vector3;
  set_rotation_edit_mode(value: int): void;
  get_rotation_edit_mode(): int;
  set_rotation_order(value: int): void;
  get_rotation_order(): int;
  set_scale(value: Vector3): void;
  get_scale(): Vector3;
  set_as_top_level(value: boolean): void;
  is_set_as_top_level(): boolean;
  set_transform(value: Transform3D): void;
  get_transform(): Transform3D;
  set_visibility_parent(value: string): void;
  get_visibility_parent(): string;
  set_visible(value: boolean): void;
  is_visible(): boolean;

  /**
   * Attaches the given `gizmo` to this node. Only works in the editor.
   * **Note:** `gizmo` should be an {@link EditorNode3DGizmo}. The argument type is {@link Node3DGizmo} to avoid depending on editor classes in {@link Node3D}.
   */
  add_gizmo(gizmo: Node3DGizmo): void;
  /** Clears all {@link EditorNode3DGizmo} objects attached to this node. Only works in the editor. */
  clear_gizmos(): void;
  /**
   * Deselects all subgizmos for this node. Useful to call when the selected subgizmo may no longer exist after a property change. Only works in the editor.
   */
  clear_subgizmo_selection(): void;
  /**
   * Forces the node's {@link global_transform} to update, by sending {@link NOTIFICATION_TRANSFORM_CHANGED}. Fails if the node is not inside the tree.
   * **Note:** For performance reasons, transform changes are usually accumulated and applied *once* at the end of the frame. The update propagates through {@link Node3D} children, as well. Therefore, use this method only when you need an up-to-date transform (such as during physics operations).
   */
  force_update_transform(): void;
  /** Returns all the {@link EditorNode3DGizmo} objects attached to this node. Only works in the editor. */
  get_gizmos(): unknown;
  /**
   * When using physics interpolation, there will be circumstances in which you want to know the interpolated (displayed) transform of a node rather than the standard transform (which may only be accurate to the most recent physics tick).
   * This is particularly important for frame-based operations that take place in {@link Node._process}, rather than {@link Node._physics_process}. Examples include {@link Camera3D}s focusing on a node, or finding where to fire lasers from on a frame rather than physics tick.
   * **Note:** This function creates an interpolation pump on the {@link Node3D} the first time it is called, which can respond to physics interpolation resets. If you get problems with "streaking" when initially following a {@link Node3D}, be sure to call {@link get_global_transform_interpolated} at least once *before* resetting the {@link Node3D} physics interpolation.
   */
  get_global_transform_interpolated(): Transform3D;
  /**
   * Returns the parent {@link Node3D} that directly affects this node's {@link global_transform}. Returns `null` if no parent exists, the parent is not a {@link Node3D}, or {@link top_level} is `true`.
   * **Note:** This method is not always equivalent to {@link Node.get_parent}, which does not take {@link top_level} into account.
   */
  get_parent_node_3d(): Node3D;
  /**
   * Returns the {@link World3D} this node is registered to.
   * Usually, this is the same as the world used by this node's viewport (see {@link Node.get_viewport} and {@link Viewport.find_world_3d}).
   */
  get_world_3d(): World3D;
  /**
   * Rotates this node's {@link global_basis} around the global `axis` by the given `angle`, in radians. This operation is calculated in global space (relative to the world) and preserves the {@link global_position}.
   */
  global_rotate(axis: Vector3, angle: float): void;
  /**
   * Scales this node's {@link global_basis} by the given `scale` factor. This operation is calculated in global space (relative to the world) and preserves the {@link global_position}.
   * **Note:** This method is not to be confused with the {@link scale} property.
   */
  global_scale(scale: Vector3): void;
  /**
   * Adds the given translation `offset` to the node's {@link global_position} in global space (relative to the world).
   */
  global_translate(offset: Vector3): void;
  /**
   * Prevents this node from being rendered. Equivalent to setting {@link visible} to `false`. This is the opposite of {@link show}.
   */
  hide(): void;
  /**
   * Returns `true` if the node receives {@link NOTIFICATION_LOCAL_TRANSFORM_CHANGED} whenever {@link transform} changes. This is enabled with {@link set_notify_local_transform}.
   */
  is_local_transform_notification_enabled(): boolean;
  /**
   * Returns `true` if this node's {@link global_transform} is automatically orthonormalized. This results in this node not appearing distorted, as if its global scale were set to {@link Vector3.ONE} (or its negative counterpart). See also {@link set_disable_scale} and {@link orthonormalize}.
   * **Note:** {@link transform} is not affected by this setting.
   */
  is_scale_disabled(): boolean;
  /**
   * Returns `true` if the node receives {@link NOTIFICATION_TRANSFORM_CHANGED} whenever {@link global_transform} changes. This is enabled with {@link set_notify_transform}.
   */
  is_transform_notification_enabled(): boolean;
  /**
   * Returns `true` if this node is inside the scene tree and the {@link visible} property is `true` for this node and all of its {@link Node3D} ancestors *in sequence*. An ancestor of any other type (such as {@link Node} or {@link Node2D}) breaks the sequence. See also {@link Node.get_parent}.
   * **Note:** This method cannot take {@link VisualInstance3D.layers} into account, so even if this method returns `true`, the node may not be rendered.
   */
  is_visible_in_tree(): boolean;
  /**
   * Rotates the node so that the local forward axis (-Z, {@link Vector3.FORWARD}) points toward the `target` position. This operation is calculated in global space (relative to the world).
   * The local up axis (+Y) points as close to the `up` vector as possible while staying perpendicular to the local forward axis. The resulting transform is orthogonal, and the scale is preserved. Non-uniform scaling may not work correctly.
   * The `target` position cannot be the same as the node's position, the `up` vector cannot be {@link Vector3.ZERO}. Furthermore, the direction from the node's position to the `target` position cannot be parallel to the `up` vector, to avoid an unintended rotation around the local Z axis.
   * If `use_model_front` is `true`, the +Z axis (asset front) is treated as forward (implies +X is left) and points toward the `target` position. By default, the -Z axis (camera forward) is treated as forward (implies +X is right).
   * **Note:** This method fails if the node is not in the scene tree. If necessary, use {@link look_at_from_position} instead.
   */
  look_at(target: Vector3, up?: Vector3, use_model_front?: boolean): void;
  /**
   * Moves the node to the specified `position`, then rotates the node to point toward the `target` position, similar to {@link look_at}. This operation is calculated in global space (relative to the world).
   */
  look_at_from_position(position: Vector3, target: Vector3, up?: Vector3, use_model_front?: boolean): void;
  /**
   * Orthonormalizes this node's {@link basis}. This method sets this node's {@link scale} to {@link Vector3.ONE} (or its negative counterpart), but preserves the {@link position} and {@link rotation}. See also {@link Transform3D.orthonormalized}.
   */
  orthonormalize(): void;
  /**
   * Rotates this node's {@link basis} around the `axis` by the given `angle`, in radians. This operation is calculated in parent space (relative to the parent) and preserves the {@link position}.
   */
  rotate(axis: Vector3, angle: float): void;
  /**
   * Rotates this node's {@link basis} around the `axis` by the given `angle`, in radians. This operation is calculated in local space (relative to this node) and preserves the {@link position}.
   */
  rotate_object_local(axis: Vector3, angle: float): void;
  /**
   * Rotates this node's {@link basis} around the X axis by the given `angle`, in radians. This operation is calculated in parent space (relative to the parent) and preserves the {@link position}.
   */
  rotate_x(angle: float): void;
  /**
   * Rotates this node's {@link basis} around the Y axis by the given `angle`, in radians. This operation is calculated in parent space (relative to the parent) and preserves the {@link position}.
   */
  rotate_y(angle: float): void;
  /**
   * Rotates this node's {@link basis} around the Z axis by the given `angle`, in radians. This operation is calculated in parent space (relative to the parent) and preserves the {@link position}.
   */
  rotate_z(angle: float): void;
  /**
   * Scales this node's {@link basis} by the given `scale` factor. This operation is calculated in local space (relative to this node) and preserves the {@link position}.
   */
  scale_object_local(scale: Vector3): void;
  /**
   * If `true`, this node's {@link global_transform} is automatically orthonormalized. This results in this node not appearing distorted, as if its global scale were set to {@link Vector3.ONE} (or its negative counterpart). See also {@link is_scale_disabled} and {@link orthonormalize}.
   * **Note:** {@link transform} is not affected by this setting.
   */
  set_disable_scale(disable: boolean): void;
  /**
   * Sets this node's {@link transform} to {@link Transform3D.IDENTITY}, which resets all transformations in parent space ({@link position}, {@link rotation}, and {@link scale}).
   */
  set_identity(): void;
  /**
   * If `true`, the node will not receive {@link NOTIFICATION_TRANSFORM_CHANGED} or {@link NOTIFICATION_LOCAL_TRANSFORM_CHANGED}.
   * It may useful to call this method when handling these notifications to prevent infinite recursion.
   */
  set_ignore_transform_notification(enabled: boolean): void;
  /**
   * If `true`, the node will receive {@link NOTIFICATION_LOCAL_TRANSFORM_CHANGED} whenever {@link transform} changes.
   * **Note:** Some 3D nodes such as {@link CSGShape3D} or {@link CollisionShape3D} automatically enable this to function correctly.
   */
  set_notify_local_transform(enable: boolean): void;
  /**
   * If `true`, the node will receive {@link NOTIFICATION_TRANSFORM_CHANGED} whenever {@link global_transform} changes.
   * **Note:** Most 3D nodes such as {@link VisualInstance3D} or {@link CollisionObject3D} automatically enable this to function correctly.
   * **Note:** In the editor, nodes will propagate this notification to their children if a gizmo is attached (see {@link add_gizmo}).
   */
  set_notify_transform(enable: boolean): void;
  /**
   * Selects the `gizmo`'s subgizmo with the given `id` and sets its transform. Only works in the editor.
   * **Note:** The gizmo object would typically be an instance of {@link EditorNode3DGizmo}, but the argument type is kept generic to avoid creating a dependency on editor classes in {@link Node3D}.
   */
  set_subgizmo_selection(gizmo: Node3DGizmo, id: int, transform: Transform3D): void;
  /**
   * Allows this node to be rendered. Equivalent to setting {@link visible} to `true`. This is the opposite of {@link hide}.
   */
  show(): void;
  /**
   * Returns the `local_point` converted from this node's local space to global space. This is the opposite of {@link to_local}.
   */
  to_global(local_point: Vector3): Vector3;
  /**
   * Returns the `global_point` converted from global space to this node's local space. This is the opposite of {@link to_global}.
   */
  to_local(global_point: Vector3): Vector3;
  /**
   * Adds the given translation `offset` to the node's position, in local space (relative to this node).
   * **Note:** Prefer using {@link translate_object_local}, instead, as this method may be changed in a future release.
   * **Note:** Despite the naming convention, this operation is **not** calculated in parent space for compatibility reasons. To translate in parent space, add `offset` to the {@link position} (`node_3d.position += offset`).
   */
  translate(offset: Vector3): void;
  /** Adds the given translation `offset` to the node's position, in local space (relative to this node). */
  translate_object_local(offset: Vector3): void;
  /** Updates all the {@link EditorNode3DGizmo} objects attached to this node. Only works in the editor. */
  update_gizmos(): void;

  /**
   * Emitted when this node's visibility changes (see {@link visible} and {@link is_visible_in_tree}).
   * This signal is emitted *after* the related {@link NOTIFICATION_VISIBILITY_CHANGED} notification.
   */
  visibility_changed: Signal<[]>;

  // enum RotationEditMode
  /**
   * The rotation is edited using a {@link Vector3} in Euler angles (https://en.wikipedia.org/wiki/Euler_angles).
   */
  static readonly ROTATION_EDIT_MODE_EULER: int;
  /** The rotation is edited using a {@link Quaternion}. */
  static readonly ROTATION_EDIT_MODE_QUATERNION: int;
  /**
   * The rotation is edited using a {@link Basis}. In this mode, the raw {@link basis}'s axes can be freely modified, but the {@link scale} property is not available.
   */
  static readonly ROTATION_EDIT_MODE_BASIS: int;

  /**
   * Notification received when this node's {@link global_transform} changes, if {@link is_transform_notification_enabled} is `true`. See also {@link set_notify_transform}.
   * **Note:** Most 3D nodes such as {@link VisualInstance3D} or {@link CollisionObject3D} automatically enable this to function correctly.
   * **Note:** In the editor, nodes will propagate this notification to their children if a gizmo is attached (see {@link add_gizmo}).
   */
  static readonly NOTIFICATION_TRANSFORM_CHANGED: int;
  /**
   * Notification received when this node is registered to a new {@link World3D} (see {@link get_world_3d}).
   */
  static readonly NOTIFICATION_ENTER_WORLD: int;
  /**
   * Notification received when this node is unregistered from the current {@link World3D} (see {@link get_world_3d}).
   * This notification is sent in reversed order.
   */
  static readonly NOTIFICATION_EXIT_WORLD: int;
  /**
   * Notification received when this node's visibility changes (see {@link visible} and {@link is_visible_in_tree}).
   * This notification is received *before* the related {@link visibility_changed} signal.
   */
  static readonly NOTIFICATION_VISIBILITY_CHANGED: int;
  /**
   * Notification received when this node's {@link transform} changes, if {@link is_local_transform_notification_enabled} is `true`. This is not received when a parent {@link Node3D}'s {@link transform} changes. See also {@link set_notify_local_transform}.
   * **Note:** Some 3D nodes such as {@link CSGShape3D} or {@link CollisionShape3D} automatically enable this to function correctly.
   */
  static readonly NOTIFICATION_LOCAL_TRANSFORM_CHANGED: int;
}
