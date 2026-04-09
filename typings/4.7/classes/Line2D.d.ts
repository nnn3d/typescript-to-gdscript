// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A 2D polyline that can optionally be textured. */
declare class Line2D extends Node2D {
  /**
   * If `true`, the polyline's border will be anti-aliased.
   * **Note:** {@link Line2D} is not accelerated by batching when being anti-aliased.
   */
  antialiased: boolean;
  /** The style of the beginning of the polyline, if {@link closed} is `false`. */
  begin_cap_mode: int;
  /**
   * If `true` and the polyline has more than 2 points, the last point and the first one will be connected by a segment.
   * **Note:** The shape of the closing segment is not guaranteed to be seamless if a {@link width_curve} is provided.
   * **Note:** The joint between the closing segment and the first segment is drawn first and it samples the {@link gradient} and the {@link width_curve} at the beginning. This is an implementation detail that might change in a future version.
   */
  closed: boolean;
  /** The color of the polyline. Will not be used if a gradient is set. */
  default_color: Color;
  /** The style of the end of the polyline, if {@link closed} is `false`. */
  end_cap_mode: int;
  /**
   * The gradient is drawn through the whole line from start to finish. The {@link default_color} will not be used if this property is set.
   */
  gradient: Gradient | null;
  /** The style of the connections between segments of the polyline. */
  joint_mode: int;
  /**
   * The points of the polyline, interpreted in local 2D coordinates. Segments are drawn between the adjacent points in this array.
   */
  points: PackedVector2Array;
  /**
   * The smoothness used for rounded joints and caps. Higher values result in smoother corners, but are more demanding to render and update.
   */
  round_precision: int;
  /**
   * Determines the miter limit of the polyline. Normally, when {@link joint_mode} is set to {@link LINE_JOINT_SHARP}, sharp angles fall back to using the logic of {@link LINE_JOINT_BEVEL} joints to prevent very long miters. Higher values of this property mean that the fallback to a bevel joint will happen at sharper angles.
   */
  sharp_limit: float;
  /** The texture used for the polyline. Uses {@link texture_mode} for drawing style. */
  texture: Texture2D | null;
  /** The style to render the {@link texture} of the polyline. */
  texture_mode: int;
  /** The polyline's width. */
  width: float;
  /**
   * The polyline's width curve. The width of the polyline over its length will be equivalent to the value of the width curve over its domain. The width curve should be a unit {@link Curve}.
   */
  width_curve: Curve | null;
  set_antialiased(value: boolean): void;
  get_antialiased(): boolean;
  set_begin_cap_mode(value: int): void;
  get_begin_cap_mode(): int;
  set_closed(value: boolean): void;
  is_closed(): boolean;
  set_default_color(value: Color): void;
  get_default_color(): Color;
  set_end_cap_mode(value: int): void;
  get_end_cap_mode(): int;
  set_gradient(value: Gradient | null): void;
  get_gradient(): Gradient | null;
  set_joint_mode(value: int): void;
  get_joint_mode(): int;
  set_points(value: PackedVector2Array): void;
  get_points(): PackedVector2Array;
  set_round_precision(value: int): void;
  get_round_precision(): int;
  set_sharp_limit(value: float): void;
  get_sharp_limit(): float;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;
  set_texture_mode(value: int): void;
  get_texture_mode(): int;
  set_width(value: float): void;
  get_width(): float;
  set_curve(value: Curve | null): void;
  get_curve(): Curve | null;

  /**
   * Adds a point with the specified `position` relative to the polyline's own position. If no `index` is provided, the new point will be added to the end of the points array.
   * If `index` is given, the new point is inserted before the existing point identified by index `index`. The indices of the points after the new point get increased by 1. The provided `index` must not exceed the number of existing points in the polyline. See {@link get_point_count}.
   */
  add_point(position: Vector2, index?: int): void;
  /** Removes all points from the polyline, making it empty. */
  clear_points(): void;
  /** Returns the number of points in the polyline. */
  get_point_count(): int;
  /** Returns the position of the point at index `index`. */
  get_point_position(index: int): Vector2;
  /** Removes the point at index `index` from the polyline. */
  remove_point(index: int): void;
  /** Overwrites the position of the point at the given `index` with the supplied `position`. */
  set_point_position(index: int, position: Vector2): void;

  // enum LineJointMode
  /**
   * Makes the polyline's joints pointy, connecting the sides of the two segments by extending them until they intersect. If the rotation of a joint is too big (based on {@link sharp_limit}), the joint falls back to {@link LINE_JOINT_BEVEL} to prevent very long miters.
   */
  static readonly LINE_JOINT_SHARP: int;
  /**
   * Makes the polyline's joints bevelled/chamfered, connecting the sides of the two segments with a simple line.
   */
  static readonly LINE_JOINT_BEVEL: int;
  /**
   * Makes the polyline's joints rounded, connecting the sides of the two segments with an arc. The detail of this arc depends on {@link round_precision}.
   */
  static readonly LINE_JOINT_ROUND: int;
  // enum LineCapMode
  /** Draws no line cap. */
  static readonly LINE_CAP_NONE: int;
  /** Draws the line cap as a box, slightly extending the first/last segment. */
  static readonly LINE_CAP_BOX: int;
  /** Draws the line cap as a semicircle attached to the first/last segment. */
  static readonly LINE_CAP_ROUND: int;
  // enum LineTextureMode
  /** Takes the left pixels of the texture and renders them over the whole polyline. */
  static readonly LINE_TEXTURE_NONE: int;
  /**
   * Tiles the texture over the polyline. {@link CanvasItem.texture_repeat} of the {@link Line2D} node must be {@link CanvasItem.TEXTURE_REPEAT_ENABLED} or {@link CanvasItem.TEXTURE_REPEAT_MIRROR} for it to work properly.
   */
  static readonly LINE_TEXTURE_TILE: int;
  /**
   * Stretches the texture across the polyline. {@link CanvasItem.texture_repeat} of the {@link Line2D} node must be {@link CanvasItem.TEXTURE_REPEAT_DISABLED} for best results.
   */
  static readonly LINE_TEXTURE_STRETCH: int;
}
