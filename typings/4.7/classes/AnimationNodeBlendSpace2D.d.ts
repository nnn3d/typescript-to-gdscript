// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A set of {@link AnimationRootNode}s placed on 2D coordinates, crossfading between the three adjacent ones. Used by {@link AnimationTree}.
 */
declare class AnimationNodeBlendSpace2D extends AnimationRootNode {
  /**
   * If `true`, the blend space is triangulated automatically. The mesh updates every time you add or remove points with {@link add_blend_point} and {@link remove_blend_point}.
   */
  auto_triangles: boolean;
  /** Controls the interpolation between animations. */
  blend_mode: int;
  /** The blend space's X and Y axes' upper limit for the points' position. See {@link add_blend_point}. */
  max_space: Vector2;
  /** The blend space's X and Y axes' lower limit for the points' position. See {@link add_blend_point}. */
  min_space: Vector2;
  /** Position increment to snap to when moving a point. */
  snap: Vector2;
  /**
   * If `false`, the blended animations' frame are stopped when the blend value is `0`.
   * If `true`, forcing the blended animations to advance frame.
   */
  sync: boolean;
  /** Name of the blend space's X axis. */
  x_label: string;
  /** Name of the blend space's Y axis. */
  y_label: string;
  set_auto_triangles(value: boolean): void;
  get_auto_triangles(): boolean;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;
  set_max_space(value: Vector2): void;
  get_max_space(): Vector2;
  set_min_space(value: Vector2): void;
  get_min_space(): Vector2;
  set_snap(value: Vector2): void;
  get_snap(): Vector2;
  set_use_sync(value: boolean): void;
  is_using_sync(): boolean;
  set_x_label(value: string): void;
  get_x_label(): string;
  set_y_label(value: string): void;
  get_y_label(): string;

  /**
   * Adds a new point with `name` that represents a `node` at the position set by `pos`. You can insert it at a specific index using the `at_index` argument. If you use the default value for `at_index`, the point is inserted at the end of the blend points array.
   * **Note:** If no name is provided, safe index is used as reference. In the future, empty names will be deprecated, so explicitly passing a name is recommended.
   */
  add_blend_point(node: AnimationRootNode, pos: Vector2, at_index?: int, name?: string): void;
  /**
   * Creates a new triangle using three points `x`, `y`, and `z`. Triangles can overlap. You can insert the triangle at a specific index using the `at_index` argument. If you use the default value for `at_index`, the point is inserted at the end of the blend points array.
   */
  add_triangle(x: int, y: int, z: int, at_index?: int): void;
  /**
   * Returns the index of the blend point with the given `name`. Returns `-1` if no blend point with that name is found.
   */
  find_blend_point_by_name(name: string): int;
  /** Returns the number of points in the blend space. */
  get_blend_point_count(): int;
  /** Returns the name of the blend point at index `point`. */
  get_blend_point_name(point: int): string;
  /** Returns the {@link AnimationRootNode} referenced by the point at index `point`. */
  get_blend_point_node(point: int): AnimationRootNode;
  /** Returns the position of the point at index `point`. */
  get_blend_point_position(point: int): Vector2;
  /** Returns the number of triangles in the blend space. */
  get_triangle_count(): int;
  /** Returns the position of the point at index `point` in the triangle of index `triangle`. */
  get_triangle_point(triangle: int, point: int): int;
  /** Removes the point at index `point` from the blend space. */
  remove_blend_point(point: int): void;
  /** Removes the triangle at index `triangle` from the blend space. */
  remove_triangle(triangle: int): void;
  /**
   * Swaps the blend points at indices `from_index` and `to_index`, exchanging their positions and properties.
   */
  reorder_blend_point(from_index: int, to_index: int): void;
  /**
   * Sets the name of the blend point at index `point`. If the name conflicts with an existing point, a unique name will be generated automatically.
   */
  set_blend_point_name(point: int, name: string): void;
  /** Changes the {@link AnimationNode} referenced by the point at index `point`. */
  set_blend_point_node(point: int, node: AnimationRootNode): void;
  /** Updates the position of the point at index `point` in the blend space. */
  set_blend_point_position(point: int, pos: Vector2): void;

  /**
   * Emitted every time the blend space's triangles are created, removed, or when one of their vertices changes position.
   */
  triangles_updated: Signal<[]>;

  // enum BlendMode
  /** The interpolation between animations is linear. */
  static readonly BLEND_MODE_INTERPOLATED: int;
  /**
   * The blend space plays the animation of the animation node which blending position is closest to. Useful for frame-by-frame 2D animations.
   */
  static readonly BLEND_MODE_DISCRETE: int;
  /**
   * Similar to {@link BLEND_MODE_DISCRETE}, but starts the new animation at the last animation's playback position.
   */
  static readonly BLEND_MODE_DISCRETE_CARRY: int;
}
