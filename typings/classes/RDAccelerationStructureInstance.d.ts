// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Acceleration structure instance (used by {@link RenderingDevice}). */
declare class RDAccelerationStructureInstance extends RefCounted {
  /**
   * The BLAS referenced by this instance. If `null`, the instance is treated as a placeholder but still contributes to `gl_InstanceIndex` in GLSL.
   */
  blas: RID;
  /** Flags for the instance. */
  flags: int;
  /**
   * Hit shader binding table range used for this instance, allocated using the {@link RenderingDevice.hit_sbt_range_alloc} method.
   */
  hit_sbt_range: int;
  /** Custom instance ID that can be accessed in GLSL using `gl_InstanceCustomIndexEXT`. */
  id: int;
  /** Visibility mask used to control which rays can intersect this instance. */
  mask: int;
  /** Transform applied to the referenced BLAS for this instance. */
  transform: Transform3D;
  set_blas(value: RID): void;
  get_blas(): RID;
  set_flags(value: int): void;
  get_flags(): int;
  set_hit_sbt_range(value: int): void;
  get_hit_sbt_range(): int;
  set_id(value: int): void;
  get_id(): int;
  set_mask(value: int): void;
  get_mask(): int;
  set_transform(value: Transform3D | Projection): void;
  get_transform(): Transform3D;
}
