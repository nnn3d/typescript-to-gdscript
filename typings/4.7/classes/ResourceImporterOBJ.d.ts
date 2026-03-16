// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Imports an OBJ 3D model as an independent {@link Mesh} or scene. */
declare class ResourceImporterOBJ extends ResourceImporter {
  /**
   * If `true`, mesh compression will not be used. Consider enabling if you notice blocky artifacts in your mesh normals or UVs, or if you have meshes that are larger than a few thousand meters in each direction.
   */
  force_disable_mesh_compression: boolean;
  /** If `true`, generates UV2 on import for {@link LightmapGI} baking. */
  generate_lightmap_uv2: boolean;
  /**
   * Controls the size of each texel on the baked lightmap. A smaller value results in more precise lightmaps, at the cost of larger lightmap sizes and longer bake times.
   * **Note:** Only effective if {@link generate_lightmap_uv2} is `true`.
   */
  generate_lightmap_uv2_texel_size: float;
  /**
   * If `true`, generates lower detail variants of the mesh which will be displayed in the distance to improve rendering performance. Not all meshes benefit from LOD, especially if they are never rendered from far away. Disabling this can reduce output file size and speed up importing. See Mesh level of detail (LOD) ($DOCS_URL/tutorials/3d/mesh_lod.html#doc-mesh-lod) for more information.
   */
  generate_lods: boolean;
  /**
   * If `true`, enables the generation of shadow meshes on import. This optimizes shadow rendering without reducing quality by welding vertices together when possible. This in turn reduces the memory bandwidth required to render shadows. Shadow mesh generation currently doesn't support using a lower detail level than the source mesh (but shadow rendering will make use of LODs when relevant).
   */
  generate_shadow_mesh: boolean;
  /**
   * If `true`, generate vertex tangents using Mikktspace (http://www.mikktspace.com/) if the source mesh doesn't have tangent data. When possible, it's recommended to let the 3D modeling software generate tangents on export instead on relying on this option. Tangents are required for correct display of normal and height maps, along with any material/shader features that require tangents.
   * If you don't need material features that require tangents, disabling this can reduce output file size and speed up importing if the source 3D file doesn't contain tangents.
   */
  generate_tangents: boolean;
  /**
   * Offsets the mesh's data by the specified value. This can be used to work around misaligned meshes without having to modify the source file.
   */
  offset_mesh: Vector3;
  /**
   * Scales the mesh's data by the specified value. This can be used to work around misscaled meshes without having to modify the source file.
   */
  scale_mesh: Vector3;
}
