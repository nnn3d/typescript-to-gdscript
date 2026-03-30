// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A node that provides a polygon shape to a {@link CollisionObject2D} parent. */
declare class CollisionPolygon2D extends Node2D {
  /** Collision build mode. */
  build_mode: int;
  /**
   * If `true`, no collisions will be detected. This property should be changed with {@link Object.set_deferred}.
   */
  disabled: boolean;
  /**
   * If `true`, only edges that face up, relative to {@link CollisionPolygon2D}'s rotation, will collide with other objects.
   * **Note:** This property has no effect if this {@link CollisionPolygon2D} is a child of an {@link Area2D} node.
   * **Note:** The one way collision direction can be configured by setting {@link one_way_collision_direction}.
   */
  one_way_collision: boolean;
  /** The direction used for one-way collision. */
  one_way_collision_direction: Vector2;
  /**
   * The margin used for one-way collision (in pixels). Higher values will make the shape thicker, and work better for colliders that enter the polygon at a high velocity.
   */
  one_way_collision_margin: float;
  /**
   * The polygon's list of vertices. Each point will be connected to the next, and the final point will be connected to the first.
   * **Note:** The returned vertices are in the local coordinate space of the given {@link CollisionPolygon2D}.
   */
  polygon: PackedVector2Array;
  set_build_mode(value: int): void;
  get_build_mode(): int;
  set_disabled(value: boolean): void;
  is_disabled(): boolean;
  set_one_way_collision(value: boolean): void;
  is_one_way_collision_enabled(): boolean;
  set_one_way_collision_direction(value: Vector2): void;
  get_one_way_collision_direction(): Vector2;
  set_one_way_collision_margin(value: float): void;
  get_one_way_collision_margin(): float;
  set_polygon(value: PackedVector2Array): void;
  get_polygon(): PackedVector2Array;

  // enum BuildMode
  /**
   * Collisions will include the polygon and its contained area. In this mode the node has the same effect as several {@link ConvexPolygonShape2D} nodes, one for each convex shape in the convex decomposition of the polygon (but without the overhead of multiple nodes).
   */
  static readonly BUILD_SOLIDS: int;
  /**
   * Collisions will only include the polygon edges. In this mode the node has the same effect as a single {@link ConcavePolygonShape2D} made of segments, with the restriction that each segment (after the first one) starts where the previous one ends, and the last one ends where the first one starts (forming a closed but hollow polygon).
   */
  static readonly BUILD_SEGMENTS: int;
}
