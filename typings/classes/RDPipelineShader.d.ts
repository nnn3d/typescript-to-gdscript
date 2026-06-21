// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Pipeline shader (used by {@link RenderingDevice}). */
declare class RDPipelineShader extends RefCounted {
  /** Shader resource. The required stage is selected by the pipeline. */
  shader: RID;
  /** Specialization constants applied to the selected shader stage at pipeline creation time. */
  specialization_constants: Array<RDPipelineSpecializationConstant>;
  set_shader(value: RID): void;
  get_shader(): RID;
  set_specialization_constants(value: Array<RDPipelineSpecializationConstant>): void;
  get_specialization_constants(): Array<RDPipelineSpecializationConstant>;
}
