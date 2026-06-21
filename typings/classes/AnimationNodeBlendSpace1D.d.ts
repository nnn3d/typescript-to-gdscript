// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * A set of {@link AnimationRootNode}s placed on a virtual axis, crossfading between the two adjacent ones. Used by {@link AnimationTree}.
 */
declare class AnimationNodeBlendSpace1D extends AnimationRootNode {
  /** Controls the interpolation between animations. */
  blend_mode: int;
  /**
   * The cycle length in seconds used by {@link SYNC_MODE_CYCLIC_CONSTANT}. All animations are time-scaled so they complete one full cycle in this duration. Must be greater than `0` for cyclic sync to take effect.
   */
  cyclic_length: float;
  /** The blend space's axis's upper limit for the points' position. See {@link add_blend_point}. */
  max_space: float;
  /** The blend space's axis's lower limit for the points' position. See {@link add_blend_point}. */
  min_space: float;
  /** Position increment to snap to when moving a point on the axis. */
  snap: float;
  /**
   * If `true`, sync mode is enabled (equivalent to {@link SYNC_MODE_INDEPENDENT}). This property is kept for backward compatibility.
   */
  sync: boolean;
  /** Controls how animations are synced when blended. See {@link SyncMode} for available options. */
  sync_mode: int;
  /** Label of the virtual axis of the blend space. */
  value_label: string;
  set_blend_mode(value: int): void;
  get_blend_mode(): int;
  set_cyclic_length(value: float): void;
  get_cyclic_length(): float;
  set_max_space(value: float): void;
  get_max_space(): float;
  set_min_space(value: float): void;
  get_min_space(): float;
  set_snap(value: float): void;
  get_snap(): float;
  set_use_sync(value: boolean): void;
  is_using_sync(): boolean;
  set_sync_mode(value: int): void;
  get_sync_mode(): int;
  set_value_label(value: string | NodePath): void;
  get_value_label(): string;

  /**
   * Adds a new point with `name` that represents a `node` on the virtual axis at a given position set by `pos`. You can insert it at a specific index using the `at_index` argument. If you use the default value for `at_index`, the point is inserted at the end of the blend points array.
   * **Note:** If no name is provided, safe index is used as reference. In the future, empty names will be deprecated, so explicitly passing a name is recommended.
   */
  add_blend_point(node: AnimationRootNode, pos: float, at_index?: int, name?: string): void;
  /**
   * Returns the index of the blend point with the given `name`. Returns `-1` if no blend point with that name is found.
   */
  find_blend_point_by_name(name: string): int;
  /** Returns the number of points on the blend axis. */
  get_blend_point_count(): int;
  /** Returns the name of the blend point at index `point`. */
  get_blend_point_name(point: int): string;
  /** Returns the {@link AnimationNode} referenced by the point at index `point`. */
  get_blend_point_node(point: int): AnimationRootNode | null;
  /** Returns the position of the point at index `point`. */
  get_blend_point_position(point: int): float;
  /** Removes the point at index `point` from the blend axis. */
  remove_blend_point(point: int): void;
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
  // enum SyncMode
  /** Inactive animations are frozen and do not advance. */
  static readonly SYNC_MODE_NONE: int;
  /**
   * Inactive animations advance with a weight of `0`. This is equivalent to the previous `sync = true` behavior.
   */
  static readonly SYNC_MODE_INDEPENDENT: int;
  /**
   * All animations are time-scaled so they stay in sync, with the cycle length dynamically computed from active blend weights. This is self-normalizing: a solo animation plays at normal speed.
   * **Note:** If you apply {@link AnimationNodeTimeSeek} to the result when handling animations of different lengths, synchronization will be broken. In such cases, it is recommended to use {@link AnimationNodeAnimation.use_custom_timeline} to align the animation lengths.
   */
  static readonly SYNC_MODE_CYCLIC_MUTABLE: int;
  /**
   * All animations are time-scaled so they complete one cycle in {@link cyclic_length} seconds, keeping them in sync regardless of their individual lengths.
   * **Note:** If you apply {@link AnimationNodeTimeSeek} to the result when handling animations of different lengths, synchronization will be broken. In such cases, it is recommended to use {@link AnimationNodeAnimation.use_custom_timeline} to align the animation lengths.
   */
  static readonly SYNC_MODE_CYCLIC_CONSTANT: int;
}
