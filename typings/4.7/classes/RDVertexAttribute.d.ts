// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Vertex attribute (used by {@link RenderingDevice}). */
declare class RDVertexAttribute extends RefCounted {
  /**
   * The index of the buffer in the vertex buffer array to bind this vertex attribute. When set to `-1`, it defaults to the index of the attribute.
   * **Note:** You cannot mix binding explicitly assigned attributes with implicitly assigned ones (i.e. `-1`). Either all attributes must have their binding set to `-1`, or all must have explicit bindings.
   */
  binding: int;
  /** The way that this attribute's data is interpreted when sent to a shader. */
  format: int;
  /** The rate at which this attribute is pulled from its vertex buffer. */
  frequency: int;
  /** The location in the shader that this attribute is bound to. */
  location: int;
  /**
   * The number of bytes between the start of the vertex buffer and the first instance of this attribute.
   */
  offset: int;
  /** The number of bytes between the starts of consecutive instances of this attribute. */
  stride: int;
  set_binding(value: int): void;
  get_binding(): int;
  set_format(value: int): void;
  get_format(): int;
  set_frequency(value: int): void;
  get_frequency(): int;
  set_location(value: int): void;
  get_location(): int;
  set_offset(value: int): void;
  get_offset(): int;
  set_stride(value: int): void;
  get_stride(): int;
}
