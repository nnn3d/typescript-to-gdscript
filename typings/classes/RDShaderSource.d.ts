// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Shader source code (used by {@link RenderingDevice}). */
declare class RDShaderSource extends RefCounted {
  /** The language the shader is written in. */
  language: int;
  /** Source code for the shader's any hit stage. */
  source_any_hit: string;
  /** Source code for the shader's closest hit stage. */
  source_closest_hit: string;
  /** Source code for the shader's compute stage. */
  source_compute: string;
  /** Source code for the shader's fragment stage. */
  source_fragment: string;
  /** Source code for the shader's intersection stage. */
  source_intersection: string;
  /** Source code for the shader's miss stage. */
  source_miss: string;
  /** Source code for the shader's ray generation stage. */
  source_raygen: string;
  /** Source code for the shader's tessellation control stage. */
  source_tesselation_control: string;
  /** Source code for the shader's tessellation evaluation stage. */
  source_tesselation_evaluation: string;
  /** Source code for the shader's vertex stage. */
  source_vertex: string;
  set_language(value: int): void;
  get_language(): int;

  /**
   * Returns source code for the specified shader `stage`. Equivalent to getting one of {@link source_compute}, {@link source_fragment}, {@link source_tesselation_control}, {@link source_tesselation_evaluation} or {@link source_vertex}.
   */
  get_stage_source(stage: int): string;
  /**
   * Sets `source` code for the specified shader `stage`. Equivalent to setting one of {@link source_compute}, {@link source_fragment}, {@link source_tesselation_control}, {@link source_tesselation_evaluation} or {@link source_vertex}.
   * **Note:** If you set the compute shader source code using this method directly, remember to remove the Godot-specific hint `#[compute]`.
   */
  set_stage_source(stage: int, source: string): void;
}
