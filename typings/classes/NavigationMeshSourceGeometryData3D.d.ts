// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Container for parsed source geometry data used in navigation mesh baking. */
declare class NavigationMeshSourceGeometryData3D extends Resource {
  /**
   * Adds an array of vertex positions to the geometry data for navigation mesh baking to form triangulated faces. For each face the array must have three vertex positions in clockwise winding order. Since {@link NavigationMesh} resources have no transform, all vertex positions need to be offset by the node's transform using `xform`.
   */
  add_faces(faces: PackedVector3Array, xform: Transform3D): void;
  /**
   * Adds the geometry data of a {@link Mesh} resource to the navigation mesh baking data. The mesh must have valid triangulated mesh data to be considered. Since {@link NavigationMesh} resources have no transform, all vertex positions need to be offset by the node's transform using `xform`.
   */
  add_mesh(mesh: Mesh, xform: Transform3D): void;
  /**
   * Adds an {@link Array} the size of {@link Mesh.ARRAY_MAX} and with vertices at index {@link Mesh.ARRAY_VERTEX} and indices at index {@link Mesh.ARRAY_INDEX} to the navigation mesh baking data. The array must have valid triangulated mesh data to be considered. Since {@link NavigationMesh} resources have no transform, all vertex positions need to be offset by the node's transform using `xform`.
   */
  add_mesh_array(mesh_array: Array<unknown>, xform: Transform3D): void;
  /**
   * Adds a projected obstruction shape to the source geometry. The `vertices` are considered projected on an xz-axes plane, placed at the global y-axis `elevation` and extruded by `height`. If `carve` is `true` the carved shape will not be affected by additional offsets (e.g. agent radius) of the navigation mesh baking process.
   */
  add_projected_obstruction(vertices: PackedVector3Array, elevation: float, height: float, carve: boolean): void;
  /**
   * Appends arrays of `vertices` and `indices` at the end of the existing arrays. Adds the existing index as an offset to the appended indices.
   */
  append_arrays(vertices: PackedFloat32Array, indices: PackedInt32Array): void;
  /** Clears the internal data. */
  clear(): void;
  /** Clears all projected obstructions. */
  clear_projected_obstructions(): void;
  /**
   * Returns an axis-aligned bounding box that covers all the stored geometry data. The bounds are calculated when calling this function with the result cached until further geometry changes are made.
   */
  get_bounds(): AABB;
  /** Returns the parsed source geometry data indices array. */
  get_indices(): PackedInt32Array;
  /**
   * Returns the projected obstructions as an {@link Array} of dictionaries. Each {@link Dictionary} contains the following entries:
   * - `vertices` - A {@link PackedFloat32Array} that defines the outline points of the projected shape.
   * - `elevation` - A [float] that defines the projected shape placement on the y-axis.
   * - `height` - A [float] that defines how much the projected shape is extruded along the y-axis.
   * - `carve` - A [bool] that defines how the obstacle affects the navigation mesh baking. If `true` the projected shape will not be affected by addition offsets, e.g. agent radius.
   */
  get_projected_obstructions(): Array<unknown>;
  /** Returns the parsed source geometry data vertices array. */
  get_vertices(): PackedFloat32Array;
  /** Returns `true` when parsed source geometry data exists. */
  has_data(): boolean;
  /**
   * Adds the geometry data of another {@link NavigationMeshSourceGeometryData3D} to the navigation mesh baking data.
   */
  merge(other_geometry: NavigationMeshSourceGeometryData3D): void;
  /**
   * Sets the parsed source geometry data indices. The indices need to be matched with appropriated vertices.
   * **Warning:** Inappropriate data can crash the baking process of the involved third-party libraries.
   */
  set_indices(indices: PackedInt32Array): void;
  /** Sets the projected obstructions with an Array of Dictionaries with the following key value pairs: */
  set_projected_obstructions(projected_obstructions: Array<unknown>): void;
  /**
   * Sets the parsed source geometry data vertices. The vertices need to be matched with appropriated indices.
   * **Warning:** Inappropriate data can crash the baking process of the involved third-party libraries.
   */
  set_vertices(vertices: PackedFloat32Array): void;
}
