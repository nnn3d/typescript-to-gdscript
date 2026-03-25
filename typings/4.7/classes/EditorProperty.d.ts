// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Custom control for editing properties that can be added to the {@link EditorInspector}. */
declare class EditorProperty<Tree extends object = any> extends Container<Tree> {
  /** Used by the inspector, set to `true` when the property is checkable. */
  checkable: boolean;
  /** Used by the inspector, set to `true` when the property is checked. */
  checked: boolean;
  /** Used by the inspector, set to `true` when the property can be deleted by the user. */
  deletable: boolean;
  /** Used by the inspector, set to `true` when the property background is drawn. */
  draw_background: boolean;
  /** Used by the inspector, set to `true` when the property label is drawn. */
  draw_label: boolean;
  /**
   * Used by the inspector, set to `true` when the property is drawn with the editor theme's warning color. This is used for editable children's properties.
   */
  draw_warning: boolean;
  /**
   * <member name="keying" type="bool" setter="set_keying" getter="is_keying" default="false">
   * Used by the inspector, set to `true` when the property can add keys for animation.
   */
  focus_mode: int;
  /** Set this property to change the label (if you want to show one). */
  label: string;
  /** Space distribution ratio between the label and the editing field. */
  name_split_ratio: float;
  /** Used by the inspector, set to `true` when the property is read-only. */
  read_only: boolean;
  /** Used by the inspector, set to `true` when the property is selectable. */
  selectable: boolean;
  /** Used by the inspector, set to `true` when the property is using folding. */
  use_folding: boolean;
  set_checkable(value: boolean): void;
  is_checkable(): boolean;
  set_checked(value: boolean): void;
  is_checked(): boolean;
  set_deletable(value: boolean): void;
  is_deletable(): boolean;
  set_draw_background(value: boolean): void;
  is_draw_background(): boolean;
  set_draw_label(value: boolean): void;
  is_draw_label(): boolean;
  set_draw_warning(value: boolean): void;
  is_draw_warning(): boolean;
  set_label(value: string): void;
  get_label(): string;
  set_name_split_ratio(value: float): void;
  get_name_split_ratio(): float;
  set_read_only(value: boolean): void;
  set_selectable(value: boolean): void;
  is_selectable(): boolean;
  set_use_folding(value: boolean): void;
  is_using_folding(): boolean;

  /**
   * Called when the read-only status of the property is changed. It may be used to change custom controls into a read-only or modifiable state.
   */
  _set_read_only(read_only: boolean): void;
  /** When this virtual function is called, you must update your editor. */
  _update_property(): void;
  /**
   * If any of the controls added can gain keyboard focus, add it here. This ensures that focus will be restored if the inspector is refreshed.
   */
  add_focusable(control: Control): void;
  /** Draw property as not selected. Used by the inspector. */
  deselect(): void;
  /**
   * If one or several properties have changed, this must be called. `field` is used in case your editor can modify fields separately (as an example, Vector3.x). The `changing` argument avoids the editor requesting this property to be refreshed (leave as `false` if unsure).
   */
  emit_changed(property: string, value: unknown, field?: string, changing?: boolean): void;
  /**
   * Returns the edited object.
   * **Note:** This method could return `null` if the editor has not yet been associated with a property. However, in {@link _update_property} and {@link _set_read_only}, this value is *guaranteed* to be non-`null`.
   */
  get_edited_object(): GodotObject;
  /**
   * Returns the edited property. If your editor is for a single property (added via {@link EditorInspectorPlugin._parse_property}), then this will return the property.
   * **Note:** This method could return `null` if the editor has not yet been associated with a property. However, in {@link _update_property} and {@link _set_read_only}, this value is *guaranteed* to be non-`null`.
   */
  get_edited_property(): string;
  /** Returns `true` if property is drawn as selected. Used by the inspector. */
  is_selected(): boolean;
  /** Draw property as selected. Used by the inspector. */
  select(focusable?: int): void;
  /**
   * Puts the `editor` control below the property label. The control must be previously added using {@link Node.add_child}.
   */
  set_bottom_editor(editor: Control): void;
  /**
   * Used by the inspector, set to a control that will be used as a reference to calculate the size of the label.
   */
  set_label_reference(control: Control): void;
  /** Assigns object and property to edit. */
  set_object_and_property(object: GodotObject, property: string): void;
  /** Forces a refresh of the property display. */
  update_property(): void;

  /**
   * Emit it if you want multiple properties modified at the same time. Do not use if added via {@link EditorInspectorPlugin._parse_property}.
   */
  multiple_properties_changed: Signal<[PackedStringArray, Array<unknown>]>;
  /** Used by sub-inspectors. Emit it if what was selected was an Object ID. */
  object_id_selected: Signal<[string, int]>;
  /**
   * Emitted when the revertability (i.e., whether it has a non-default value and thus is displayed with a revert icon) of a property has changed.
   */
  property_can_revert_changed: Signal<[string, boolean]>;
  /** Do not emit this manually, use the {@link emit_changed} method instead. */
  property_changed: Signal<[string, unknown, string, boolean]>;
  /** Emitted when a property was checked. Used internally. */
  property_checked: Signal<[string, boolean]>;
  /** Emitted when a property was deleted. Used internally. */
  property_deleted: Signal<[string]>;
  /** Emit it if you want to mark a property as favorited, making it appear at the top of the inspector. */
  property_favorited: Signal<[string, boolean]>;
  /** Emit it if you want to add this value as an animation key (check for keying being enabled first). */
  property_keyed: Signal<[string]>;
  /** Emit it if you want to key a property with a single value. */
  property_keyed_with_value: Signal<[string, unknown]>;
  /** Emitted when a setting override for the current project is requested. */
  property_overridden: Signal<[]>;
  /**
   * Emit it if you want to mark (or unmark) the value of a property for being saved regardless of being equal to the default value.
   * The default value is the one the property will get when the node is just instantiated and can come from an ancestor scene in the inheritance/instantiation chain, a script or a builtin class.
   */
  property_pinned: Signal<[string, boolean]>;
  /** If you want a sub-resource to be edited, emit this signal with the resource. */
  resource_selected: Signal<[string, Resource]>;
  /** Emitted when selected. Used internally. */
  selected: Signal<[string, int]>;
}
