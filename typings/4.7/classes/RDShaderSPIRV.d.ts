// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * SPIR-V intermediate representation as part of an {@link RDShaderFile} (used by {@link RenderingDevice}).
 */
declare class RDShaderSPIRV extends Resource {
  /** The SPIR-V bytecode for the any hit shader stage. */
  bytecode_any_hit: PackedByteArray;
  /** The SPIR-V bytecode for the closest hit shader stage. */
  bytecode_closest_hit: PackedByteArray;
  /** The SPIR-V bytecode for the compute shader stage. */
  bytecode_compute: PackedByteArray;
  /** The SPIR-V bytecode for the fragment shader stage. */
  bytecode_fragment: PackedByteArray;
  /** The SPIR-V bytecode for the intersection shader stage. */
  bytecode_intersection: PackedByteArray;
  /** The SPIR-V bytecode for the miss shader stage. */
  bytecode_miss: PackedByteArray;
  /** The SPIR-V bytecode for the ray generation shader stage. */
  bytecode_raygen: PackedByteArray;
  /** The SPIR-V bytecode for the tessellation control shader stage. */
  bytecode_tesselation_control: PackedByteArray;
  /** The SPIR-V bytecode for the tessellation evaluation shader stage. */
  bytecode_tesselation_evaluation: PackedByteArray;
  /** The SPIR-V bytecode for the vertex shader stage. */
  bytecode_vertex: PackedByteArray;
  /**
   * The compilation error message for the any hit shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_any_hit: string;
  /**
   * The compilation error message for the closest hit shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_closest_hit: string;
  /**
   * The compilation error message for the compute shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_compute: string;
  /**
   * The compilation error message for the fragment shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_fragment: string;
  /**
   * The compilation error message for the intersection shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_intersection: string;
  /**
   * The compilation error message for the miss shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_miss: string;
  /**
   * The compilation error message for the ray generation shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_raygen: string;
  /**
   * The compilation error message for the tessellation control shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_tesselation_control: string;
  /**
   * The compilation error message for the tessellation evaluation shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_tesselation_evaluation: string;
  /**
   * The compilation error message for the vertex shader stage (set by the SPIR-V compiler and Godot). If empty, shader compilation was successful.
   */
  compile_error_vertex: string;

  /**
   * Equivalent to getting one of {@link bytecode_compute}, {@link bytecode_fragment}, {@link bytecode_tesselation_control}, {@link bytecode_tesselation_evaluation}, {@link bytecode_vertex}.
   */
  get_stage_bytecode(stage: int): PackedByteArray;
  /**
   * Returns the compilation error message for the given shader `stage`. Equivalent to getting one of {@link compile_error_compute}, {@link compile_error_fragment}, {@link compile_error_tesselation_control}, {@link compile_error_tesselation_evaluation}, {@link compile_error_vertex}.
   */
  get_stage_compile_error(stage: int): string;
  /**
   * Sets the SPIR-V `bytecode` for the given shader `stage`. Equivalent to setting one of {@link bytecode_compute}, {@link bytecode_fragment}, {@link bytecode_tesselation_control}, {@link bytecode_tesselation_evaluation}, {@link bytecode_vertex}.
   */
  set_stage_bytecode(stage: int, bytecode: PackedByteArray): void;
  /**
   * Sets the compilation error message for the given shader `stage` to `compile_error`. Equivalent to setting one of {@link compile_error_compute}, {@link compile_error_fragment}, {@link compile_error_tesselation_control}, {@link compile_error_tesselation_evaluation}, {@link compile_error_vertex}.
   */
  set_stage_compile_error(stage: int, compile_error: string): void;
}
