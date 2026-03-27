// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Occludes light cast by a Light2D, casting shadows. */
declare class LightOccluder2D<Tree extends object = any> extends Node2D<Tree> {
  /** The {@link OccluderPolygon2D} used to compute the shadow. */
  occluder: OccluderPolygon2D;
  /**
   * The LightOccluder2D's occluder light mask. The LightOccluder2D will cast shadows only from Light2D(s) that have the same light mask(s).
   */
  occluder_light_mask: int;
  /**
   * If enabled, the occluder will be part of a real-time generated signed distance field that can be used in custom shaders.
   */
  sdf_collision: boolean;
  set_occluder_polygon(value: OccluderPolygon2D): void;
  get_occluder_polygon(): OccluderPolygon2D;
  set_occluder_light_mask(value: int): void;
  get_occluder_light_mask(): int;
  set_as_sdf_collision(value: boolean): void;
  is_set_as_sdf_collision(): boolean;
}
