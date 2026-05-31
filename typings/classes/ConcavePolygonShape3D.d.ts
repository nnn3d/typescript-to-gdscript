// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A 3D trimesh shape used for physics collision. */
declare class ConcavePolygonShape3D extends Shape3D {
  /**
   * If set to `true`, collisions occur on both sides of the concave shape faces. Otherwise they occur only along the face normals.
   */
  backface_collision: boolean;
  set_backface_collision_enabled(value: boolean): void;
  is_backface_collision_enabled(): boolean;

  /**
   * Returns the faces of the trimesh shape as an array of vertices. The array (of length divisible by three) is naturally divided into triples; each triple of vertices defines a triangle.
   */
  get_faces(): PackedVector3Array;
  /**
   * Sets the faces of the trimesh shape from an array of vertices. The `faces` array should be composed of triples such that each triple of vertices defines a triangle.
   */
  set_faces(faces: PackedVector3Array | Array<unknown>): void;
}
