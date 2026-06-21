// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Hit group (used by {@link RenderingDevice}). */
declare class RDHitGroup extends RefCounted {
  /** Any-hit shader for this hit group. Executed for each potential intersection. Can be `null`. */
  any_hit_shader: RDPipelineShader | null;
  /** Closest-hit shader for this hit group. Executed for the closest intersection. Can be `null`. */
  closest_hit_shader: RDPipelineShader | null;
  /**
   * Intersection shader for this hit group. Required for non-triangle geometry. Must be `null` when using for triangle geometry.
   */
  intersection_shader: RDPipelineShader | null;
  set_any_hit_shader(value: RDPipelineShader | null): void;
  get_any_hit_shader(): RDPipelineShader | null;
  set_closest_hit_shader(value: RDPipelineShader | null): void;
  get_closest_hit_shader(): RDPipelineShader | null;
  set_intersection_shader(value: RDPipelineShader | null): void;
  get_intersection_shader(): RDPipelineShader | null;
}
