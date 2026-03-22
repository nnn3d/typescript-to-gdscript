// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Parent of all visual 3D nodes. */
declare class VisualInstance3D extends Node3D {
  /**
   * The render layer(s) this {@link VisualInstance3D} is drawn on.
   * This object will only be visible for {@link Camera3D}s whose cull mask includes any of the render layers this {@link VisualInstance3D} is set to.
   * For {@link Light3D}s, this can be used to control which {@link VisualInstance3D}s are affected by a specific light. For {@link GPUParticles3D}, this can be used to control which particles are effected by a specific attractor. For {@link Decal}s, this can be used to control which {@link VisualInstance3D}s are affected by a specific decal.
   * To adjust {@link layers} more easily using a script, use {@link get_layer_mask_value} and {@link set_layer_mask_value}.
   * **Note:** {@link VoxelGI}, SDFGI and {@link LightmapGI} will always take all layers into account to determine what contributes to global illumination. If this is an issue, set {@link GeometryInstance3D.gi_mode} to {@link GeometryInstance3D.GI_MODE_DISABLED} for meshes and {@link Light3D.light_bake_mode} to {@link Light3D.BAKE_DISABLED} for lights to exclude them from global illumination.
   */
  layers: int;
  /**
   * The amount by which the depth of this {@link VisualInstance3D} will be adjusted when sorting by depth. Uses the same units as the engine (which are typically meters). Adjusting it to a higher value will make the {@link VisualInstance3D} reliably draw on top of other {@link VisualInstance3D}s that are otherwise positioned at the same spot. To ensure it always draws on top of other objects around it (not positioned at the same spot), set the value to be greater than the distance between this {@link VisualInstance3D} and the other nearby {@link VisualInstance3D}s.
   */
  sorting_offset: float;
  /**
   * If `true`, the object is sorted based on the {@link AABB} center. The object will be sorted based on the global position otherwise.
   * The {@link AABB} center based sorting is generally more accurate for 3D models. The position based sorting instead allows to better control the drawing order when working with {@link GPUParticles3D} and {@link CPUParticles3D}.
   */
  sorting_use_aabb_center: boolean;
  set_layer_mask(value: int): void;
  get_layer_mask(): int;
  set_sorting_offset(value: float): void;
  get_sorting_offset(): float;
  set_sorting_use_aabb_center(value: boolean): void;
  is_sorting_use_aabb_center(): boolean;

  _get_aabb(): AABB;
  /** Returns the {@link AABB} (also known as the bounding box) for this {@link VisualInstance3D}. */
  get_aabb(): AABB;
  /**
   * Returns the RID of the resource associated with this {@link VisualInstance3D}. For example, if the Node is a {@link MeshInstance3D}, this will return the RID of the associated {@link Mesh}.
   */
  get_base(): RID;
  /**
   * Returns the RID of this instance. This RID is the same as the RID returned by {@link RenderingServer.instance_create}. This RID is needed if you want to call {@link RenderingServer} functions directly on this {@link VisualInstance3D}.
   */
  get_instance(): RID;
  /**
   * Returns whether or not the specified layer of the {@link layers} is enabled, given a `layer_number` between 1 and 20.
   */
  get_layer_mask_value(layer_number: int): boolean;
  /**
   * Sets the resource that is instantiated by this {@link VisualInstance3D}, which changes how the engine handles the {@link VisualInstance3D} under the hood. Equivalent to {@link RenderingServer.instance_set_base}.
   */
  set_base(base: RID): void;
  /**
   * Based on `value`, enables or disables the specified layer in the {@link layers}, given a `layer_number` between 1 and 20.
   */
  set_layer_mask_value(layer_number: int, value: boolean): void;
}
