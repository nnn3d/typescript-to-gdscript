// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node that provides a {@link Shape3D} to a {@link CollisionObject3D} parent. */
declare class CollisionShape3D extends Node3D {
  /**
   * The collision shape color that is displayed in the editor, or in the running project if **Debug > Visible Collision Shapes** is checked at the top of the editor.
   * **Note:** The default value is {@link ProjectSettings.debug/shapes/collision/shape_color}. The `Color(0, 0, 0, 0)` value documented here is a placeholder, and not the actual default debug color.
   */
  debug_color: Color;
  /**
   * If `true`, when the shape is displayed, it will show a solid fill color in addition to its wireframe.
   */
  debug_fill: boolean;
  /**
   * A disabled collision shape has no effect in the world. This property should be changed with {@link Object.set_deferred}.
   */
  disabled: boolean;
  /** The actual shape owned by this collision shape. */
  shape: Shape3D | null;
  set_debug_color(value: Color): void;
  get_debug_color(): Color;
  set_enable_debug_fill(value: boolean): void;
  get_enable_debug_fill(): boolean;
  set_disabled(value: boolean): void;
  is_disabled(): boolean;
  set_shape(value: Shape3D | null): void;
  get_shape(): Shape3D | null;

  /**
   * Sets the collision shape's shape to the addition of all its convexed {@link MeshInstance3D} siblings geometry.
   */
  make_convex_from_siblings(): void;
  /** This method does nothing. */
  resource_changed(resource: Resource): void;
}
