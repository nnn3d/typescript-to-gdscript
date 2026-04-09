// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D game object, inherited by all 2D-related nodes. Has a position, rotation, scale, and skew. */
declare class Node2D extends CanvasItem {
  /** Global position. See also {@link position}. */
  global_position: Vector2;
  /** Global rotation in radians. See also {@link rotation}. */
  global_rotation: float;
  /**
   * Helper property to access {@link global_rotation} in degrees instead of radians. See also {@link rotation_degrees}.
   */
  global_rotation_degrees: float;
  /** Global scale. See also {@link scale}. */
  global_scale: Vector2;
  /** Global skew in radians. See also {@link skew}. */
  global_skew: float;
  /** Global {@link Transform2D}. See also {@link transform}. */
  global_transform: Transform2D;
  /** Position, relative to the node's parent. See also {@link global_position}. */
  position: Vector2;
  /**
   * Rotation in radians, relative to the node's parent. See also {@link global_rotation}.
   * **Note:** This property is edited in the inspector in degrees. If you want to use degrees in a script, use {@link rotation_degrees}.
   */
  rotation: float;
  /**
   * Helper property to access {@link rotation} in degrees instead of radians. See also {@link global_rotation_degrees}.
   */
  rotation_degrees: float;
  /**
   * The node's scale, relative to the node's parent. Unscaled value: `(1, 1)`. See also {@link global_scale}.
   * **Note:** Negative X scales in 2D are not decomposable from the transformation matrix. Due to the way scale is represented with transformation matrices in Godot, negative scales on the X axis will be changed to negative scales on the Y axis and a rotation of 180 degrees when decomposed.
   */
  scale: Vector2;
  /**
   * If set to a non-zero value, slants the node in one direction or another. This can be used for pseudo-3D effects. See also {@link global_skew}.
   * **Note:** Skew is performed on the X axis only, and *between* rotation and scaling.
   * **Note:** This property is edited in the inspector in degrees. If you want to use degrees in a script, use `skew = deg_to_rad(value_in_degrees)`.
   */
  skew: float;
  /** The node's {@link Transform2D}, relative to the node's parent. See also {@link global_transform}. */
  transform: Transform2D;
  set_global_position(value: Vector2): void;
  get_global_position(): Vector2;
  set_global_rotation(value: float): void;
  get_global_rotation(): float;
  set_global_rotation_degrees(value: float): void;
  get_global_rotation_degrees(): float;
  set_global_scale(value: Vector2): void;
  get_global_scale(): Vector2;
  set_global_skew(value: float): void;
  get_global_skew(): float;
  set_global_transform(value: Transform2D): void;
  set_position(value: Vector2): void;
  get_position(): Vector2;
  set_rotation(value: float): void;
  get_rotation(): float;
  set_rotation_degrees(value: float): void;
  get_rotation_degrees(): float;
  set_scale(value: Vector2): void;
  get_scale(): Vector2;
  set_skew(value: float): void;
  get_skew(): float;
  set_transform(value: Transform2D): void;

  /** Multiplies the current scale by the `ratio` vector. */
  apply_scale(ratio: Vector2): void;
  /**
   * Returns the angle between the node and the `point` in radians. See also {@link look_at}.
   * Illustration of the returned angle. (https://raw.githubusercontent.com/godotengine/godot-docs/master/img/node2d_get_angle_to.png)
   */
  get_angle_to(point: Vector2): float;
  /** Returns the {@link Transform2D} relative to this node's parent. */
  get_relative_transform_to_parent(parent: Node): Transform2D;
  /** Adds the `offset` vector to the node's global position. */
  global_translate(offset: Vector2): void;
  /**
   * Rotates the node so that its local +X axis points towards the `point`, which is expected to use global coordinates. This method is a combination of both {@link rotate} and {@link get_angle_to}.
   * `point` should not be the same as the node's position, otherwise the node always looks to the right.
   */
  look_at(point: Vector2): void;
  /**
   * Applies a local translation on the node's X axis with the amount specified in `delta`. If `scaled` is `false`, normalizes the movement to occur independently of the node's {@link scale}.
   */
  move_local_x(delta: float, scaled?: boolean): void;
  /**
   * Applies a local translation on the node's Y axis with the amount specified in `delta`. If `scaled` is `false`, normalizes the movement to occur independently of the node's {@link scale}.
   */
  move_local_y(delta: float, scaled?: boolean): void;
  /**
   * Applies a rotation to the node, in radians, starting from its current rotation. This is equivalent to `rotation += radians`.
   */
  rotate(radians: float): void;
  /**
   * Transforms the provided local position into a position in global coordinate space. The input is expected to be local relative to the {@link Node2D} it is called on. e.g. Applying this method to the positions of child nodes will correctly transform their positions into the global coordinate space, but applying it to a node's own position will give an incorrect result, as it will incorporate the node's own transformation into its global position.
   */
  to_global(local_point: Vector2): Vector2;
  /**
   * Transforms the provided global position into a position in local coordinate space. The output will be local relative to the {@link Node2D} it is called on. e.g. It is appropriate for determining the positions of child nodes, but it is not appropriate for determining its own position relative to its parent.
   */
  to_local(global_point: Vector2): Vector2;
  /**
   * Translates the node by the given `offset` in local coordinates. This is equivalent to `position += offset`.
   */
  translate(offset: Vector2): void;
}
