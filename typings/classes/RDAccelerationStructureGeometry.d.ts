// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Acceleration structure geometry (used by {@link RenderingDevice}). */
declare class RDAccelerationStructureGeometry extends RefCounted {
  /** Flags for the geometry. */
  flags: int;
  /** Buffer containing vertex indices. If `null`, triangles are non-indexed. */
  index_buffer: RID;
  /** Number of indices used by this geometry in {@link index_buffer}. */
  index_count: int;
  /** Byte offset of the first index in {@link index_buffer}. */
  index_offset: int;
  /** Buffer containing vertices. */
  vertex_buffer: RID;
  /** Number of vertices used by this geometry in {@link vertex_buffer}. */
  vertex_count: int;
  /** Format of the vertices in {@link vertex_buffer}. */
  vertex_format: int;
  /** Byte offset of the first vertex in {@link vertex_buffer}. */
  vertex_offset: int;
  /** Number of bytes between each vertex in {@link vertex_buffer}. */
  vertex_stride: int;
  set_flags(value: int): void;
  get_flags(): int;
  set_index_buffer(value: RID): void;
  get_index_buffer(): RID;
  set_index_count(value: int): void;
  get_index_count(): int;
  set_index_offset(value: int): void;
  get_index_offset(): int;
  set_vertex_buffer(value: RID): void;
  get_vertex_buffer(): RID;
  set_vertex_count(value: int): void;
  get_vertex_count(): int;
  set_vertex_format(value: int): void;
  get_vertex_format(): int;
  set_vertex_offset(value: int): void;
  get_vertex_offset(): int;
  set_vertex_stride(value: int): void;
  get_vertex_stride(): int;
}
