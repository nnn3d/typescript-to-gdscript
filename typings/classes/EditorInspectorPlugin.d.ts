// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Plugin for adding custom property editors on the inspector. */
declare class EditorInspectorPlugin extends RefCounted {
  /** Returns `true` if this object can be handled by this plugin. */
  _can_handle(object: GodotObject): boolean;
  /** Called to allow adding controls at the beginning of the property list for `object`. */
  _parse_begin(object: GodotObject): void;
  /** Called to allow adding controls at the beginning of a category in the property list for `object`. */
  _parse_category(object: GodotObject, category: string | NodePath): void;
  /** Called to allow adding controls at the end of the property list for `object`. */
  _parse_end(object: GodotObject): void;
  /**
   * Called to allow adding controls at the beginning of a group or a sub-group in the property list for `object`.
   */
  _parse_group(object: GodotObject, group: string | NodePath): void;
  /**
   * Called to allow adding property-specific editors to the property list for `object`. The added editor control must extend {@link EditorProperty}. Returning `true` removes the built-in editor for this property, otherwise allows to insert a custom editor before the built-in one.
   */
  _parse_property(object: GodotObject, type_: int, name: string | NodePath, hint_type: int, hint_string: string | NodePath, usage_flags: int, wide: boolean): boolean;
  /** Adds a custom control, which is not necessarily a property editor. */
  add_custom_control(control: Control): void;
  /**
   * Adds a property editor for an individual property. The `editor` control must extend {@link EditorProperty}.
   * There can be multiple property editors for a property. If `add_to_end` is `true`, this newly added editor will be displayed after all the other editors of the property whose `add_to_end` is `false`. For example, the editor uses this parameter to add an "Edit Region" button for {@link Sprite2D.region_rect} below the regular {@link Rect2} editor.
   * `label` can be used to choose a custom label for the property editor in the inspector. If left empty, the label is computed from the name of the property instead.
   */
  add_property_editor(property: string | NodePath, editor: Control, add_to_end?: boolean, label?: string | NodePath): void;
  /**
   * Adds an editor that allows modifying multiple properties. The `editor` control must extend {@link EditorProperty}.
   */
  add_property_editor_for_multiple_properties(label: string | NodePath, properties: PackedStringArray | Array<unknown>, editor: Control): void;
}
