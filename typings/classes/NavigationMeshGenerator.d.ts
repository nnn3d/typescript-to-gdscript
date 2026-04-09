// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Helper class for creating and clearing navigation meshes. */
declare interface NavigationMeshGenerator extends GodotObject {
  /** Bakes the `navigation_mesh` with source geometry collected starting from the `root_node`. */
  bake(navigation_mesh: NavigationMesh, root_node: Node): void;
  /**
   * Bakes the provided `navigation_mesh` with the data from the provided `source_geometry_data`. After the process is finished the optional `callback` will be called.
   */
  bake_from_source_geometry_data(navigation_mesh: NavigationMesh, source_geometry_data: NavigationMeshSourceGeometryData3D, callback?: Callable): void;
  /** Removes all polygons and vertices from the provided `navigation_mesh` resource. */
  clear(navigation_mesh: NavigationMesh): void;
  /**
   * Parses the {@link SceneTree} for source geometry according to the properties of `navigation_mesh`. Updates the provided `source_geometry_data` resource with the resulting data. The resource can then be used to bake a navigation mesh with {@link bake_from_source_geometry_data}. After the process is finished the optional `callback` will be called.
   * **Note:** This function needs to run on the main thread or with a deferred call as the SceneTree is not thread-safe.
   * **Performance:** While convenient, reading data arrays from {@link Mesh} resources can affect the frame rate negatively. The data needs to be received from the GPU, stalling the {@link RenderingServer} in the process. For performance prefer the use of e.g. collision shapes or creating the data arrays entirely in code.
   */
  parse_source_geometry_data(navigation_mesh: NavigationMesh, source_geometry_data: NavigationMeshSourceGeometryData3D, root_node: Node, callback?: Callable): void;
}
declare const NavigationMeshGenerator: NavigationMeshGenerator;

