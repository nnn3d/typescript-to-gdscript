// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Provides virtual methods that can be overridden to create custom {@link PhysicsDirectSpaceState3D} implementations.
 */
declare class PhysicsDirectSpaceState3DExtension extends PhysicsDirectSpaceState3D {
  _cast_motion(shape_rid: RID, transform: Transform3D, motion: Vector3, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, closest_safe: float, closest_unsafe: float, info: unknown): boolean;
  _collide_shape(shape_rid: RID, transform: Transform3D, motion: Vector3, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, results: void, max_results: int, result_count: int): boolean;
  _get_closest_point_to_object_volume(object: RID, point: Vector3): Vector3;
  _intersect_point(position: Vector3, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, results: unknown, max_results: int): int;
  _intersect_ray(from_: Vector3, to: Vector3, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, hit_from_inside: boolean, hit_back_faces: boolean, pick_ray: boolean, result: unknown): boolean;
  _intersect_shape(shape_rid: RID, transform: Transform3D, motion: Vector3, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, result_count: unknown, max_results: int): int;
  _rest_info(shape_rid: RID, transform: Transform3D, motion: Vector3, margin: float, collision_mask: int, collide_with_bodies: boolean, collide_with_areas: boolean, rest_info: unknown): boolean;
  is_body_excluded_from_query(body: RID): boolean;
}
