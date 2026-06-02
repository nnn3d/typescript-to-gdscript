// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A set of {@link AnimationRootNode}s placed on a virtual axis, crossfading between the two adjacent ones. Used by {@link AnimationTree}.
 */
declare class AnimationNodeBlendSpace1D extends AnimationRootNode {
  /** Controls the interpolation between animations. */
  blend_mode: int;
  /** The blend space's axis's upper limit for the points' position. See {@link add_blend_point}. */
  max_space: float;
  /** The blend space's axis's lower limit for the points' position. See {@link add_blend_point}. */
  min_space: float;
  /** Position increment to snap to when moving a point on the axis. */
  snap: float;
  /**
   * If `false`, the blended animations' frame are stopped when the blend value is `0`.
   * If `true`, forcing the blended animations to advance frame.
   */
  sync: boolean;
  /** Label of the virtual axis of the blend space. */
  value_label: string;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;
  set_max_space(value: float): void;
  get_max_space(): float;
  set_min_space(value: float): void;
  get_min_space(): float;
  set_snap(value: float): void;
  get_snap(): float;
  set_use_sync(value: boolean): void;
  is_using_sync(): boolean;
  set_value_label(value: string | NodePath): void;
  get_value_label(): string;

  /**
   * Adds a new point that represents a `node` on the virtual axis at a given position set by `pos`. You can insert it at a specific index using the `at_index` argument. If you use the default value for `at_index`, the point is inserted at the end of the blend points array.
   */
  add_blend_point(node: AnimationRootNode, pos: float, at_index?: int): void;
  /** Returns the number of points on the blend axis. */
  get_blend_point_count(): int;
  /** Returns the {@link AnimationNode} referenced by the point at index `point`. */
  get_blend_point_node(point: int): AnimationRootNode | null;
  /** Returns the position of the point at index `point`. */
  get_blend_point_position(point: int): float;
  /** Removes the point at index `point` from the blend axis. */
  remove_blend_point(point: int): void;
  /** Changes the {@link AnimationNode} referenced by the point at index `point`. */
  set_blend_point_node(point: int, node: AnimationRootNode): void;
  /** Updates the position of the point at index `point` on the blend axis. */
  set_blend_point_position(point: int, pos: float): void;

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
