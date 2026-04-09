// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D texture uniform array to be used within the visual shader graph. */
declare class VisualShaderNodeTexture2DArray extends VisualShaderNodeSample3D {
  /**
   * A source texture array. Used if {@link VisualShaderNodeSample3D.source} is set to {@link VisualShaderNodeSample3D.SOURCE_TEXTURE}.
   */
  texture_array: TextureLayered | null;
  set_texture_array(value: TextureLayered | null): void;
  get_texture_array(): TextureLayered | null;
}
