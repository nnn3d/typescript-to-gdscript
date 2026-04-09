// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A control used to edit properties of an object. */
declare class EditorInspector extends ScrollContainer {
  draw_focus_border: boolean;
  focus_mode: int;
  follow_focus: boolean;
  horizontal_scroll_mode: int;
  set_draw_focus_border(value: boolean): void;
  get_draw_focus_border(): boolean;

  /**
   * Shows the properties of the given `object` in this inspector for editing. To clear the inspector, call this method with `null`.
   * **Note:** If you want to edit an object in the editor's main inspector, use the `edit_*` methods in {@link EditorInterface} instead.
   */
  edit(object: GodotObject): void;
  /** Returns the object currently selected in this inspector. */
  get_edited_object(): GodotObject | null;
  /** Gets the path of the currently selected property. */
  get_selected_path(): string;
  /**
   * Creates a property editor that can be used by plugin UI to edit the specified property of an `object`.
   */
  static instantiate_property_editor(object: GodotObject, type_: int, path: string | NodePath, hint: int, hint_text: string | NodePath, usage: int, wide?: boolean): EditorProperty | null;

  /** Emitted when the object being edited by the inspector has changed. */
  edited_object_changed: Signal<[]>;
  /**
   * Emitted when the Edit button of an {@link Object} has been pressed in the inspector. This is mainly used in the remote scene tree Inspector.
   */
  object_id_selected: Signal<[int]>;
  /** Emitted when a property is removed from the inspector. */
  property_deleted: Signal<[string]>;
  /** Emitted when a property is edited in the inspector. */
  property_edited: Signal<[string]>;
  /**
   * Emitted when a property is keyed in the inspector. Properties can be keyed by clicking the "key" icon next to a property when the Animation panel is toggled.
   */
  property_keyed: Signal<[string, unknown, boolean]>;
  /** Emitted when a property is selected in the inspector. */
  property_selected: Signal<[string]>;
  /**
   * Emitted when a boolean property is toggled in the inspector.
   * **Note:** This signal is never emitted if the internal `autoclear` property enabled. Since this property is always enabled in the editor inspector, this signal is never emitted by the editor itself.
   */
  property_toggled: Signal<[string, boolean]>;
  /** Emitted when a resource is selected in the inspector. */
  resource_selected: Signal<[Resource, string]>;
  /**
   * Emitted when a property that requires a restart to be applied is edited in the inspector. This is only used in the Project Settings and Editor Settings.
   */
  restart_requested: Signal<[]>;
}
