// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Triangle geometry for efficient, physicsless intersection queries. */
declare class TriangleMesh extends RefCounted {
  /**
   * Creates the BVH tree from an array of faces. Each 3 vertices of the input `faces` array represent one triangle (face).
   * Returns `true` if the tree is successfully built, `false` otherwise.
   */
  create_from_faces(faces: PackedVector3Array): boolean;
  /** Returns a copy of the geometry faces. Each 3 vertices of the array represent one triangle (face). */
  get_faces(): PackedVector3Array;
  /**
   * Tests for intersection with a ray starting at `begin` and facing `dir` and extending toward infinity.
   * If an intersection with a triangle happens, returns a {@link Dictionary} with the following fields:
   * `position`: The position on the intersected triangle.
   * `normal`: The normal of the intersected triangle.
   * `face_index`: The index of the intersected triangle.
   * Returns an empty {@link Dictionary} if no intersection happens.
   * See also {@link intersect_segment}, which is similar but uses a finite-length segment.
   */
  intersect_ray(begin: Vector3, dir: Vector3): Dictionary;
  /**
   * Tests for intersection with a segment going from `begin` to `end`.
   * If an intersection with a triangle happens returns a {@link Dictionary} with the following fields:
   * `position`: The position on the intersected triangle.
   * `normal`: The normal of the intersected triangle.
   * `face_index`: The index of the intersected triangle.
   * Returns an empty {@link Dictionary} if no intersection happens.
   * See also {@link intersect_ray}, which is similar but uses an infinite-length ray.
   */
  intersect_segment(begin: Vector3, end: Vector3): Dictionary;
}
