// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Provides virtual methods that can be overridden to create custom {@link PhysicsDirectSpaceState2D} implementations.
 */
declare class PhysicsDirectSpaceState2DExtension extends PhysicsDirectSpaceState2D {
  _cast_motion(shape_rid: RID, transform: Transform2D, motion: Vector2 | Vector2i, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, closest_safe: float, closest_unsafe: float): boolean;
  _collide_shape(shape_rid: RID, transform: Transform2D, motion: Vector2 | Vector2i, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, results: void, max_results: int, result_count: int): boolean;
  _intersect_point(position: Vector2 | Vector2i, canvas_instance_id: int, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, results: unknown, max_results: int): int;
  _intersect_ray(from_: Vector2 | Vector2i, to: Vector2 | Vector2i, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, hit_from_inside: boolean, result: unknown): boolean;
  _intersect_shape(shape_rid: RID, transform: Transform2D, motion: Vector2 | Vector2i, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, result: unknown, max_results: int): int;
  _rest_info(shape_rid: RID, transform: Transform2D, motion: Vector2 | Vector2i, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, rest_info: unknown): boolean;
  is_body_excluded_from_query(body: RID): boolean;
}
