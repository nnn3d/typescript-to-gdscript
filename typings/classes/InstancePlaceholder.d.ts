// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Placeholder for the root {@link Node} of a {@link PackedScene}. */
declare class InstancePlaceholder extends Node {
  /**
   * Call this method to actually load in the node. The created node will be placed as a sibling *above* the {@link InstancePlaceholder} in the scene tree. The {@link Node}'s reference is also returned for convenience.
   * **Note:** {@link create_instance} is not thread-safe. Use {@link Object.call_deferred} if calling from a thread.
   */
  create_instance(replace?: boolean, custom_scene?: PackedScene): Node | null;
  /**
   * Gets the path to the {@link PackedScene} resource file that is loaded by default when calling {@link create_instance}. Not thread-safe. Use {@link Object.call_deferred} if calling from a thread.
   */
  get_instance_path(): string;
  /**
   * Returns the list of properties that will be applied to the node when {@link create_instance} is called.
   * If `with_order` is `true`, a key named `.order` (note the leading period) is added to the dictionary. This `.order` key is an {@link Array} of {@link String} property names specifying the order in which properties will be applied (with index 0 being the first).
   */
  get_stored_values(with_order?: boolean): Dictionary;
}
