// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Contains a {@link Curve3D} path for {@link PathFollow3D} nodes to follow. */
declare class Path3D extends Node3D {
  /** A {@link Curve3D} describing the path. */
  curve: Curve3D;
  /**
   * The custom color used to draw the path in the editor. If set to {@link Color.BLACK} (as by default), the color set in {@link ProjectSettings.debug/shapes/paths/geometry_color} is used.
   */
  debug_custom_color: Color;

  /** Emitted when the {@link curve} changes. */
  curve_changed: Signal<[]>;
  /** Emitted when the {@link debug_custom_color} changes. */
  debug_color_changed: Signal<[]>;
}
