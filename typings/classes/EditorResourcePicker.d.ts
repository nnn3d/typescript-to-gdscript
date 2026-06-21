// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Godot editor's control for selecting {@link Resource} type properties. */
declare class EditorResourcePicker extends HBoxContainer {
  /** The base type of allowed resource types. Can be a comma-separated list of several options. */
  base_type: string;
  /** If `true`, the value can be selected and edited. */
  editable: boolean;
  /** The edited resource value. */
  edited_resource: Resource | null;
  /**
   * If `true`, the main button with the resource preview works in the toggle mode. Use {@link set_toggle_pressed} to manually set the state.
   */
  toggle_mode: boolean;
  set_base_type(value: string | NodePath): void;
  get_base_type(): string;
  set_editable(value: boolean): void;
  is_editable(): boolean;
  set_edited_resource(value: Resource | null): void;
  get_edited_resource(): Resource | null;
  set_toggle_mode(value: boolean): void;
  is_toggle_mode(): boolean;

  /**
   * This virtual method can be implemented to handle context menu items not handled by default. See {@link _set_create_options}.
   */
  _handle_menu_selected(id: int): boolean;
  /**
   * This virtual method is called when updating the context menu of an {@link editable} {@link EditorResourcePicker}. Implement this method to override the "New" items section with your own options. `menu_node` is a reference to the {@link PopupMenu} node.
   * **Note:** Implement {@link _handle_menu_selected} to handle these custom items.
   * **Note:** Relevant built-in options ("Load", "Copy", "Paste", etc.) are automatically added to the `menu_node` afterwards, using their hard-coded IDs starting from `0`. Custom options need to use non-colliding IDs to be handled properly. Using `id = 100 + custom_option_index` is safe (this is what the default items in the "New" section use).
   */
  _set_create_options(menu_node: GodotObject): void;
  /**
   * Returns a list of all allowed types and subtypes corresponding to the {@link base_type}. If the {@link base_type} is empty, an empty list is returned.
   */
  get_allowed_types(): PackedStringArray;
  /** Sets the toggle mode state for the main button. Works only if {@link toggle_mode} is set to `true`. */
  set_toggle_pressed(pressed: boolean): void;

  /** Emitted when the value of the edited resource was changed. */
  resource_changed: Signal<[Resource]>;
  /**
   * Emitted when the resource value was set and user clicked to edit it. When `inspect` is `true`, the signal was caused by the context menu "Edit" or "Inspect" option.
   */
  resource_selected: Signal<[Resource, boolean]>;
}
