// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Pipeline specialization constant (used by {@link RenderingDevice}). */
declare class RDPipelineSpecializationConstant extends RefCounted {
  /**
   * The identifier of the specialization constant. This is a value starting from `0` and that increments for every different specialization constant for a given shader.
   */
  constant_id: int;
  /**
   * The specialization constant's value. Only [bool], [int] and [float] types are valid for specialization constants.
   */
  value: unknown;
  set_constant_id(value: int): void;
  get_constant_id(): int;
  set_value(value: unknown): void;
  get_value(): unknown;
}
