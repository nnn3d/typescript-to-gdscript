// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Shader uniform (used by {@link RenderingDevice}). */
declare class RDUniform extends RefCounted {
  /** The uniform's binding. */
  binding: int;
  /** The uniform's data type. */
  uniform_type: int;
  set_binding(value: int): void;
  get_binding(): int;
  set_uniform_type(value: int): void;
  get_uniform_type(): int;

  /**
   * Binds the given id to the uniform. The data associated with the id is then used when the uniform is passed to a shader.
   */
  add_id(id: RID): void;
  /** Unbinds all ids currently bound to the uniform. */
  clear_ids(): void;
  /** Returns an array of all ids currently bound to the uniform. */
  get_ids(): unknown;
}
