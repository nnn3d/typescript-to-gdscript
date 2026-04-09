// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Plugin for adding custom converters from one resource format to another in the editor resource picker context menu; for example, converting a {@link StandardMaterial3D} to a {@link ShaderMaterial}.
 */
declare class EditorResourceConversionPlugin extends RefCounted {
  /**
   * Takes an input {@link Resource} and converts it to the type given in {@link _converts_to}. The returned {@link Resource} is the result of the conversion, and the input {@link Resource} remains unchanged.
   */
  _convert(resource: Resource): Resource | null;
  /**
   * Returns the class name of the target type of {@link Resource} that this plugin converts source resources to.
   */
  _converts_to(): string;
  /**
   * Called to determine whether a particular {@link Resource} can be converted to the target resource type by this plugin.
   */
  _handles(resource: Resource): boolean;
}
