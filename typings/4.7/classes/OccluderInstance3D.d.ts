// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides occlusion culling for 3D nodes, which improves performance in closed areas. */
declare class OccluderInstance3D extends VisualInstance3D {
  /**
   * The visual layers to account for when baking for occluders. Only {@link MeshInstance3D}s whose {@link VisualInstance3D.layers} match with this {@link bake_mask} will be included in the generated occluder mesh. By default, all objects with *opaque* materials are taken into account for the occluder baking.
   * To improve performance and avoid artifacts, it is recommended to exclude dynamic objects, small objects and fixtures from the baking process by moving them to a separate visual layer and excluding this layer in {@link bake_mask}.
   */
  bake_mask: int;
  /**
   * The simplification distance to use for simplifying the generated occluder polygon (in 3D units). Higher values result in a less detailed occluder mesh, which improves performance but reduces culling accuracy.
   * The occluder geometry is rendered on the CPU, so it is important to keep its geometry as simple as possible. Since the buffer is rendered at a low resolution, less detailed occluder meshes generally still work well. The default value is fairly aggressive, so you may have to decrease it if you run into false negatives (objects being occluded even though they are visible by the camera). A value of `0.01` will act conservatively, and will keep geometry *perceptually* unaffected in the occlusion culling buffer. Depending on the scene, a value of `0.01` may still simplify the mesh noticeably compared to disabling simplification entirely.
   * Setting this to `0.0` disables simplification entirely, but vertices in the exact same position will still be merged. The mesh will also be re-indexed to reduce both the number of vertices and indices.
   * **Note:** This uses the meshoptimizer (https://meshoptimizer.org/) library under the hood, similar to LOD generation.
   */
  bake_simplification_distance: float;
  /**
   * The occluder resource for this {@link OccluderInstance3D}. You can generate an occluder resource by selecting an {@link OccluderInstance3D} node then using the **Bake Occluders** button at the top of the editor.
   * You can also draw your own 2D occluder polygon by adding a new {@link PolygonOccluder3D} resource to the {@link occluder} property in the Inspector.
   * Alternatively, you can select a primitive occluder to use: {@link QuadOccluder3D}, {@link BoxOccluder3D} or {@link SphereOccluder3D}.
   */
  occluder: Occluder3D;
  set_bake_mask(value: int): void;
  get_bake_mask(): int;
  set_bake_simplification_distance(value: float): void;
  get_bake_simplification_distance(): float;
  set_occluder(value: Occluder3D): void;
  get_occluder(): Occluder3D;

  /**
   * Returns whether or not the specified layer of the {@link bake_mask} is enabled, given a `layer_number` between 1 and 32.
   */
  get_bake_mask_value(layer_number: int): boolean;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link bake_mask}, given a `layer_number` between 1 and 32.
   */
  set_bake_mask_value(layer_number: int, value: boolean): void;
}
