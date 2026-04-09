// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Helper tool to access and edit {@link Mesh} data. */
declare class MeshDataTool extends RefCounted {
  /** Clears all data currently in MeshDataTool. */
  clear(): void;
  /** Adds a new surface to specified {@link Mesh} with edited data. */
  commit_to_surface(mesh: ArrayMesh, compression_flags?: int): int;
  /**
   * Uses specified surface of given {@link Mesh} to populate data for MeshDataTool.
   * Requires {@link Mesh} with primitive type {@link Mesh.PRIMITIVE_TRIANGLES}.
   */
  create_from_surface(mesh: ArrayMesh, surface: int): int;
  /** Returns the number of edges in this {@link Mesh}. */
  get_edge_count(): int;
  /** Returns array of faces that touch given edge. */
  get_edge_faces(idx: int): PackedInt32Array;
  /** Returns meta information assigned to given edge. */
  get_edge_meta(idx: int): unknown;
  /**
   * Returns the index of the specified `vertex` connected to the edge at index `idx`.
   * `vertex` can only be `0` or `1`, as edges are composed of two vertices.
   */
  get_edge_vertex(idx: int, vertex: int): int;
  /** Returns the number of faces in this {@link Mesh}. */
  get_face_count(): int;
  /**
   * Returns the edge associated with the face at index `idx`.
   * `edge` argument must be either `0`, `1`, or `2` because a face only has three edges.
   */
  get_face_edge(idx: int, edge: int): int;
  /** Returns the metadata associated with the given face. */
  get_face_meta(idx: int): unknown;
  /** Calculates and returns the face normal of the given face. */
  get_face_normal(idx: int): Vector3;
  /**
   * Returns the specified vertex index of the given face.
   * `vertex` must be either `0`, `1`, or `2` because faces contain three vertices.
   */
  get_face_vertex(idx: int, vertex: int): int;
  /**
   * Returns the {@link Mesh}'s format as a combination of the {@link Mesh.ArrayFormat} flags. For example, a mesh containing both vertices and normals would return a format of `3` because {@link Mesh.ARRAY_FORMAT_VERTEX} is `1` and {@link Mesh.ARRAY_FORMAT_NORMAL} is `2`.
   */
  get_format(): int;
  /** Returns the material assigned to the {@link Mesh}. */
  get_material(): Material | null;
  /** Returns the position of the given vertex. */
  get_vertex(idx: int): Vector3;
  /** Returns the bones of the given vertex. */
  get_vertex_bones(idx: int): PackedInt32Array;
  /** Returns the color of the given vertex. */
  get_vertex_color(idx: int): Color;
  /** Returns the total number of vertices in {@link Mesh}. */
  get_vertex_count(): int;
  /** Returns an array of edges that share the given vertex. */
  get_vertex_edges(idx: int): PackedInt32Array;
  /** Returns an array of faces that share the given vertex. */
  get_vertex_faces(idx: int): PackedInt32Array;
  /** Returns the metadata associated with the given vertex. */
  get_vertex_meta(idx: int): unknown;
  /** Returns the normal of the given vertex. */
  get_vertex_normal(idx: int): Vector3;
  /** Returns the tangent of the given vertex. */
  get_vertex_tangent(idx: int): Plane;
  /** Returns the UV of the given vertex. */
  get_vertex_uv(idx: int): Vector2;
  /** Returns the UV2 of the given vertex. */
  get_vertex_uv2(idx: int): Vector2;
  /** Returns bone weights of the given vertex. */
  get_vertex_weights(idx: int): PackedFloat32Array;
  /** Sets the metadata of the given edge. */
  set_edge_meta(idx: int, meta: unknown): void;
  /** Sets the metadata of the given face. */
  set_face_meta(idx: int, meta: unknown): void;
  /** Sets the material to be used by newly-constructed {@link Mesh}. */
  set_material(material: Material): void;
  /** Sets the position of the given vertex. */
  set_vertex(idx: int, vertex: Vector3): void;
  /** Sets the bones of the given vertex. */
  set_vertex_bones(idx: int, bones: PackedInt32Array): void;
  /** Sets the color of the given vertex. */
  set_vertex_color(idx: int, color: Color): void;
  /** Sets the metadata associated with the given vertex. */
  set_vertex_meta(idx: int, meta: unknown): void;
  /** Sets the normal of the given vertex. */
  set_vertex_normal(idx: int, normal: Vector3): void;
  /**
   * Sets the tangent of the given vertex.
   * **Note:** Even though `tangent` is a {@link Plane}, it does not directly represent the tangent plane. Its {@link Plane.x}, {@link Plane.y}, and {@link Plane.z} represent the tangent vector and {@link Plane.d} should be either `-1` or `1`. See also {@link Mesh.ARRAY_TANGENT}.
   */
  set_vertex_tangent(idx: int, tangent: Plane): void;
  /** Sets the UV of the given vertex. */
  set_vertex_uv(idx: int, uv: Vector2): void;
  /** Sets the UV2 of the given vertex. */
  set_vertex_uv2(idx: int, uv2: Vector2): void;
  /** Sets the bone weights of the given vertex. */
  set_vertex_weights(idx: int, weights: PackedFloat32Array): void;
}
