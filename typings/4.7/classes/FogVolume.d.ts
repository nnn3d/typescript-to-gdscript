// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A region that contributes to the default volumetric fog from the world environment. */
declare class FogVolume extends VisualInstance3D {
  /**
   * The {@link Material} used by the {@link FogVolume}. Can be either a built-in {@link FogMaterial} or a custom {@link ShaderMaterial}.
   */
  material: Material;
  /**
   * The shape of the {@link FogVolume}. This can be set to either {@link RenderingServer.FOG_VOLUME_SHAPE_ELLIPSOID}, {@link RenderingServer.FOG_VOLUME_SHAPE_CONE}, {@link RenderingServer.FOG_VOLUME_SHAPE_CYLINDER}, {@link RenderingServer.FOG_VOLUME_SHAPE_BOX} or {@link RenderingServer.FOG_VOLUME_SHAPE_WORLD}.
   */
  shape: int;
  /**
   * The size of the {@link FogVolume} when {@link shape} is {@link RenderingServer.FOG_VOLUME_SHAPE_ELLIPSOID}, {@link RenderingServer.FOG_VOLUME_SHAPE_CONE}, {@link RenderingServer.FOG_VOLUME_SHAPE_CYLINDER} or {@link RenderingServer.FOG_VOLUME_SHAPE_BOX}.
   * **Note:** Thin fog volumes may appear to flicker when the camera moves or rotates. This can be alleviated by increasing {@link ProjectSettings.rendering/environment/volumetric_fog/volume_depth} (at a performance cost) or by decreasing {@link Environment.volumetric_fog_length} (at no performance cost, but at the cost of lower fog range). Alternatively, the {@link FogVolume} can be made thicker and use a lower density in the {@link material}.
   * **Note:** If {@link shape} is {@link RenderingServer.FOG_VOLUME_SHAPE_CONE} or {@link RenderingServer.FOG_VOLUME_SHAPE_CYLINDER}, the cone/cylinder will be adjusted to fit within the size. Non-uniform scaling of cone/cylinder shapes via the {@link size} property is not supported, but you can scale the {@link FogVolume} node instead.
   */
  size: Vector3;
}
