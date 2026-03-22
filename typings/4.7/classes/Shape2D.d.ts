// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Abstract base class for 2D shapes used for physics collision. */
declare class Shape2D extends Resource {
  /**
   * The shape's custom solver bias. Defines how much bodies react to enforce contact separation when this shape is involved.
   * When set to `0`, the default value from {@link ProjectSettings.physics/2d/solver/default_contact_bias} is used.
   */
  custom_solver_bias: float;
  set_custom_solver_bias(value: float): void;
  get_custom_solver_bias(): float;

  /**
   * Returns `true` if this shape is colliding with another.
   * This method needs the transformation matrix for this shape (`local_xform`), the shape to check collisions with (`with_shape`), and the transformation matrix of that shape (`shape_xform`).
   */
  collide(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D): boolean;
  /**
   * Returns a list of contact point pairs where this shape touches another.
   * If there are no collisions, the returned list is empty. Otherwise, the returned list contains contact points arranged in pairs, with entries alternating between points on the boundary of this shape and points on the boundary of `with_shape`.
   * A collision pair A, B can be used to calculate the collision normal with `(B - A).normalized()`, and the collision depth with `(B - A).length()`. This information is typically used to separate shapes, particularly in collision solvers.
   * This method needs the transformation matrix for this shape (`local_xform`), the shape to check collisions with (`with_shape`), and the transformation matrix of that shape (`shape_xform`).
   */
  collide_and_get_contacts(local_xform: Transform2D, with_shape: Shape2D, shape_xform: Transform2D): PackedVector2Array;
  /**
   * Returns whether this shape would collide with another, if a given movement was applied.
   * This method needs the transformation matrix for this shape (`local_xform`), the movement to test on this shape (`local_motion`), the shape to check collisions with (`with_shape`), the transformation matrix of that shape (`shape_xform`), and the movement to test onto the other object (`shape_motion`).
   */
  collide_with_motion(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2): boolean;
  /**
   * Returns a list of contact point pairs where this shape would touch another, if a given movement was applied.
   * If there would be no collisions, the returned list is empty. Otherwise, the returned list contains contact points arranged in pairs, with entries alternating between points on the boundary of this shape and points on the boundary of `with_shape`.
   * A collision pair A, B can be used to calculate the collision normal with `(B - A).normalized()`, and the collision depth with `(B - A).length()`. This information is typically used to separate shapes, particularly in collision solvers.
   * This method needs the transformation matrix for this shape (`local_xform`), the movement to test on this shape (`local_motion`), the shape to check collisions with (`with_shape`), the transformation matrix of that shape (`shape_xform`), and the movement to test onto the other object (`shape_motion`).
   */
  collide_with_motion_and_get_contacts(local_xform: Transform2D, local_motion: Vector2, with_shape: Shape2D, shape_xform: Transform2D, shape_motion: Vector2): PackedVector2Array;
  /**
   * Draws a solid shape onto a {@link CanvasItem} with the {@link RenderingServer} API filled with the specified `color`. The exact drawing method is specific for each shape and cannot be configured.
   */
  draw(canvas_item: RID, color: Color): void;
  /** Returns a {@link Rect2} representing the shapes boundary. */
  get_rect(): Rect2;
}
