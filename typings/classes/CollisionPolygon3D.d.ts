// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node that provides a thickened polygon shape (a prism) to a {@link CollisionObject3D} parent. */
declare class CollisionPolygon3D extends Node3D {
  /**
   * The collision shape color that is displayed in the editor, or in the running project if **Debug > Visible Collision Shapes** is checked at the top of the editor.
   * **Note:** The default value is {@link ProjectSettings.debug/shapes/collision/shape_color}. The `Color(0, 0, 0, 0)` value documented here is a placeholder, and not the actual default debug color.
   */
  debug_color: Color;
  /**
   * If `true`, when the shape is displayed, it will show a solid fill color in addition to its wireframe.
   */
  debug_fill: boolean;
  /** Length that the resulting collision extends in either direction perpendicular to its 2D polygon. */
  depth: float;
  /**
   * If `true`, no collision will be produced. This property should be changed with {@link Object.set_deferred}.
   */
  disabled: boolean;
  /**
   * The collision margin for the generated {@link Shape3D}. See {@link Shape3D.margin} for more details.
   */
  margin: float;
  /** Array of vertices which define the 2D polygon in the local XY plane. */
  polygon: PackedVector2Array;
  set_debug_color(value: Color): void;
  get_debug_color(): Color;
  set_enable_debug_fill(value: boolean): void;
  get_enable_debug_fill(): boolean;
  set_depth(value: float): void;
  get_depth(): float;
  set_disabled(value: boolean): void;
  is_disabled(): boolean;
  set_margin(value: float): void;
  get_margin(): float;
  set_polygon(value: PackedVector2Array): void;
  get_polygon(): PackedVector2Array;
}
