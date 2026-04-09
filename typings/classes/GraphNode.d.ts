// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A container with connection ports, representing a node in a {@link GraphEdit}. */
declare class GraphNode extends GraphElement {
  /**
   * <member name="ignore_invalid_connection_type" type="bool" setter="set_ignore_invalid_connection_type" getter="is_ignoring_valid_connection_type" default="false">
   * If `true`, you can connect ports with different types, even if the connection was not explicitly allowed in the parent {@link GraphEdit}.
   */
  focus_mode: int;
  /**
   * <member name="slots_focus_mode" type="int" setter="set_slots_focus_mode" getter="get_slots_focus_mode" enum="Control.FocusMode" default="3">
   * Determines how connection slots can be focused.
   * - If set to {@link Control.FOCUS_CLICK}, connections can only be made with the mouse.
   * - If set to {@link Control.FOCUS_ALL}, slots can also be focused using the {@link ProjectSettings.input/ui_up} and {@link ProjectSettings.input/ui_down} and connected using {@link ProjectSettings.input/ui_left} and {@link ProjectSettings.input/ui_right} input actions.
   * - If set to {@link Control.FOCUS_ACCESSIBILITY}, slot input actions are only enabled when the screen reader is active.
   */
  mouse_filter: int;
  /** The text displayed in the GraphNode's title bar. */
  title: string;
  set_title(value: string | NodePath): void;
  get_title(): string;

  _draw_port(slot_index: int, position: Vector2i | Vector2, left: boolean, color: Color): void;
  /** Disables all slots of the GraphNode. This will remove all input/output ports from the GraphNode. */
  clear_all_slots(): void;
  /**
   * Disables the slot with the given `slot_index`. This will remove the corresponding input and output port from the GraphNode.
   */
  clear_slot(slot_index: int): void;
  /** Returns the {@link Color} of the input port with the given `port_idx`. */
  get_input_port_color(port_idx: int): Color;
  /** Returns the number of slots with an enabled input port. */
  get_input_port_count(): int;
  /** Returns the position of the input port with the given `port_idx`. */
  get_input_port_position(port_idx: int): Vector2;
  /** Returns the corresponding slot index of the input port with the given `port_idx`. */
  get_input_port_slot(port_idx: int): int;
  /** Returns the type of the input port with the given `port_idx`. */
  get_input_port_type(port_idx: int): int;
  /** Returns the {@link Color} of the output port with the given `port_idx`. */
  get_output_port_color(port_idx: int): Color;
  /** Returns the number of slots with an enabled output port. */
  get_output_port_count(): int;
  /** Returns the position of the output port with the given `port_idx`. */
  get_output_port_position(port_idx: int): Vector2;
  /** Returns the corresponding slot index of the output port with the given `port_idx`. */
  get_output_port_slot(port_idx: int): int;
  /** Returns the type of the output port with the given `port_idx`. */
  get_output_port_type(port_idx: int): int;
  /** Returns the left (input) {@link Color} of the slot with the given `slot_index`. */
  get_slot_color_left(slot_index: int): Color;
  /** Returns the right (output) {@link Color} of the slot with the given `slot_index`. */
  get_slot_color_right(slot_index: int): Color;
  /** Returns the left (input) custom {@link Texture2D} of the slot with the given `slot_index`. */
  get_slot_custom_icon_left(slot_index: int): Texture2D | null;
  /** Returns the right (output) custom {@link Texture2D} of the slot with the given `slot_index`. */
  get_slot_custom_icon_right(slot_index: int): Texture2D | null;
  /** Returns the left (input) metadata of the slot with the given `slot_index`. */
  get_slot_metadata_left(slot_index: int): unknown;
  /** Returns the right (output) metadata of the slot with the given `slot_index`. */
  get_slot_metadata_right(slot_index: int): unknown;
  /** Returns the left (input) type of the slot with the given `slot_index`. */
  get_slot_type_left(slot_index: int): int;
  /** Returns the right (output) type of the slot with the given `slot_index`. */
  get_slot_type_right(slot_index: int): int;
  /**
   * Returns the {@link HBoxContainer} used for the title bar, only containing a {@link Label} for displaying the title by default. This can be used to add custom controls to the title bar such as option or close buttons.
   */
  get_titlebar_hbox(): HBoxContainer;
  /** Returns `true` if the background {@link StyleBox} of the slot with the given `slot_index` is drawn. */
  is_slot_draw_stylebox(slot_index: int): boolean;
  /** Returns `true` if left (input) side of the slot with the given `slot_index` is enabled. */
  is_slot_enabled_left(slot_index: int): boolean;
  /** Returns `true` if right (output) side of the slot with the given `slot_index` is enabled. */
  is_slot_enabled_right(slot_index: int): boolean;
  /**
   * Sets properties of the slot with the given `slot_index`.
   * If `enable_left_port`/`enable_right_port` is `true`, a port will appear and the slot will be able to be connected from this side.
   * With `type_left`/`type_right` an arbitrary type can be assigned to each port. Two ports can be connected if they share the same type, or if the connection between their types is allowed in the parent {@link GraphEdit} (see {@link GraphEdit.add_valid_connection_type}). Keep in mind that the {@link GraphEdit} has the final say in accepting the connection. Type compatibility simply allows the {@link GraphEdit.connection_request} signal to be emitted.
   * Ports can be further customized using `color_left`/`color_right` and `custom_icon_left`/`custom_icon_right`. The color parameter adds a tint to the icon. The custom icon can be used to override the default port dot.
   * Additionally, `draw_stylebox` can be used to enable or disable drawing of the background stylebox for each slot. See .
   * Individual properties can also be set using one of the `set_slot_*` methods.
   * **Note:** This method only sets properties of the slot. To create the slot itself, add a {@link Control}-derived child to the GraphNode.
   */
  set_slot(slot_index: int, enable_left_port: boolean, type_left: int, color_left: Color, enable_right_port: boolean, type_right: int, color_right: Color, custom_icon_left?: Texture2D, custom_icon_right?: Texture2D, draw_stylebox?: boolean): void;
  /** Sets the {@link Color} of the left (input) side of the slot with the given `slot_index` to `color`. */
  set_slot_color_left(slot_index: int, color: Color): void;
  /**
   * Sets the {@link Color} of the right (output) side of the slot with the given `slot_index` to `color`.
   */
  set_slot_color_right(slot_index: int, color: Color): void;
  /**
   * Sets the custom {@link Texture2D} of the left (input) side of the slot with the given `slot_index` to `custom_icon`.
   */
  set_slot_custom_icon_left(slot_index: int, custom_icon: Texture2D): void;
  /**
   * Sets the custom {@link Texture2D} of the right (output) side of the slot with the given `slot_index` to `custom_icon`.
   */
  set_slot_custom_icon_right(slot_index: int, custom_icon: Texture2D): void;
  /** Toggles the background {@link StyleBox} of the slot with the given `slot_index`. */
  set_slot_draw_stylebox(slot_index: int, enable: boolean): void;
  /**
   * Toggles the left (input) side of the slot with the given `slot_index`. If `enable` is `true`, a port will appear on the left side and the slot will be able to be connected from this side.
   */
  set_slot_enabled_left(slot_index: int, enable: boolean): void;
  /**
   * Toggles the right (output) side of the slot with the given `slot_index`. If `enable` is `true`, a port will appear on the right side and the slot will be able to be connected from this side.
   */
  set_slot_enabled_right(slot_index: int, enable: boolean): void;
  /**
   * Sets the custom metadata for the left (input) side of the slot with the given `slot_index` to `value`.
   */
  set_slot_metadata_left(slot_index: int, value: unknown): void;
  /**
   * Sets the custom metadata for the right (output) side of the slot with the given `slot_index` to `value`.
   */
  set_slot_metadata_right(slot_index: int, value: unknown): void;
  /**
   * Sets the left (input) type of the slot with the given `slot_index` to `type`. If the value is negative, all connections will be disallowed to be created via user inputs.
   */
  set_slot_type_left(slot_index: int, type_: int): void;
  /**
   * Sets the right (output) type of the slot with the given `slot_index` to `type`. If the value is negative, all connections will be disallowed to be created via user inputs.
   */
  set_slot_type_right(slot_index: int, type_: int): void;

  /** Emitted when any slot's size might have changed. */
  slot_sizes_changed: Signal<[]>;
  /** Emitted when any GraphNode's slot is updated. */
  slot_updated: Signal<[int]>;
}
