// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node that provides a {@link Shape2D} to a {@link CollisionObject2D} parent. */
declare class CollisionShape2D extends Node2D {
  /**
   * The collision shape color that is displayed in the editor, or in the running project if **Debug > Visible Collision Shapes** is checked at the top of the editor.
   * **Note:** The default value is {@link ProjectSettings.debug/shapes/collision/shape_color}. The `Color(0, 0, 0, 0)` value documented here is a placeholder, and not the actual default debug color.
   */
  debug_color: Color;
  /**
   * A disabled collision shape has no effect in the world. This property should be changed with {@link Object.set_deferred}.
   */
  disabled: boolean;
  /**
   * Sets whether this collision shape should only detect collision on one side (top or bottom).
   * **Note:** This property has no effect if this {@link CollisionShape2D} is a child of an {@link Area2D} node.
   * **Note:** The one way collision direction can be configured by setting {@link one_way_collision_direction}.
   */
  one_way_collision: boolean;
  /** The direction used for one-way collision. */
  one_way_collision_direction: Vector2;
  /**
   * The margin used for one-way collision (in pixels). Higher values will make the shape thicker, and work better for colliders that enter the shape at a high velocity.
   */
  one_way_collision_margin: float;
  /** The actual shape owned by this collision shape. */
  shape: Shape2D | null;
  set_debug_color(value: Color): void;
  get_debug_color(): Color;
  set_disabled(value: boolean): void;
  is_disabled(): boolean;
  set_one_way_collision(value: boolean): void;
  is_one_way_collision_enabled(): boolean;
  set_one_way_collision_direction(value: Vector2): void;
  get_one_way_collision_direction(): Vector2;
  set_one_way_collision_margin(value: float): void;
  get_one_way_collision_margin(): float;
  set_shape(value: Shape2D | null): void;
  get_shape(): Shape2D | null;
}
