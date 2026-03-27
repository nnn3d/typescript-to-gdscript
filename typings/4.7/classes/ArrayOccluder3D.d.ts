// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** 3D polygon shape for use with occlusion culling in {@link OccluderInstance3D}. */
declare class ArrayOccluder3D extends Occluder3D {
  /**
   * The occluder's index position. Indices determine which points from the {@link vertices} array should be drawn, and in which order.
   * **Note:** The occluder is always updated after setting this value. If creating occluders procedurally, consider using {@link set_arrays} instead to avoid updating the occluder twice when it's created.
   */
  indices: PackedInt32Array;
  /**
   * The occluder's vertex positions in local 3D coordinates.
   * **Note:** The occluder is always updated after setting this value. If creating occluders procedurally, consider using {@link set_arrays} instead to avoid updating the occluder twice when it's created.
   */
  vertices: PackedVector3Array;
  set_indices(value: PackedInt32Array): void;
  set_vertices(value: PackedVector3Array): void;

  /**
   * Sets {@link indices} and {@link vertices}, while updating the final occluder only once after both values are set.
   */
  set_arrays(vertices: PackedVector3Array, indices: PackedInt32Array): void;
}
