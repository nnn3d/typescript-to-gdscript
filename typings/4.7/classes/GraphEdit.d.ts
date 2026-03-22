// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** An editor for graph-like structures, using {@link GraphNode}s. */
declare class GraphEdit extends Control {
  /**
   * <member name="connection_lines_antialiased" type="bool" setter="set_connection_lines_antialiased" getter="is_connection_lines_antialiased" default="true">
   * If `true`, the lines between nodes will use antialiasing.
   */
  clip_contents: boolean;
  /** The curvature of the lines between the nodes. 0 results in straight lines. */
  connection_lines_curvature: float;
  /** The thickness of the lines between the nodes. */
  connection_lines_thickness: float;
  /**
   * The connections between {@link GraphNode}s.
   * A connection is represented as a {@link Dictionary} in the form of:
   * Connections with `keep_alive` set to `false` may be deleted automatically if invalid during a redraw.
   */
  connections: Dictionary;
  /**
   * <member name="grid_pattern" type="int" setter="set_grid_pattern" getter="get_grid_pattern" enum="GraphEdit.GridPattern" default="0">
   * The pattern used for drawing the grid.
   */
  focus_mode: int;
  /** If `true`, the minimap is visible. */
  minimap_enabled: boolean;
  /** The opacity of the minimap rectangle. */
  minimap_opacity: float;
  /**
   * The size of the minimap rectangle. The map itself is based on the size of the grid area and is scaled to fit this rectangle.
   */
  minimap_size: Vector2;
  /** Defines the control scheme for panning with mouse wheel. */
  panning_scheme: int;
  /**
   * If `true`, enables disconnection of existing connections in the GraphEdit by dragging the right end.
   */
  right_disconnects: boolean;
  /** The scroll offset. */
  scroll_offset: Vector2;
  /** If `true`, the button to automatically arrange graph nodes is visible. */
  show_arrange_button: boolean;
  /** If `true`, the grid is visible. */
  show_grid: boolean;
  /** If `true`, buttons that allow to configure grid and snapping options are visible. */
  show_grid_buttons: boolean;
  /** If `true`, the menu toolbar is visible. */
  show_menu: boolean;
  /** If `true`, the button to toggle the minimap is visible. */
  show_minimap_button: boolean;
  /** If `true`, buttons that allow to change and reset the zoom level are visible. */
  show_zoom_buttons: boolean;
  /**
   * If `true`, the label with the current zoom level is visible. The zoom level is displayed in percents.
   */
  show_zoom_label: boolean;
  /** The snapping distance in pixels, also determines the grid line distance. */
  snapping_distance: int;
  /** If `true`, enables snapping. */
  snapping_enabled: boolean;
  /** {@link Dictionary} of human-readable port type names. */
  type_names: Dictionary;
  /** The current zoom value. */
  zoom: float;
  /** The upper zoom limit. */
  zoom_max: float;
  /** The lower zoom limit. */
  zoom_min: float;
  /** The step of each zoom level. */
  zoom_step: float;
  set_connection_lines_curvature(value: float): void;
  get_connection_lines_curvature(): float;
  set_connection_lines_thickness(value: float): void;
  get_connection_lines_thickness(): float;
  set_connections(value: Dictionary): void;
  get_connection_list(): Dictionary;
  set_minimap_enabled(value: boolean): void;
  is_minimap_enabled(): boolean;
  set_minimap_opacity(value: float): void;
  get_minimap_opacity(): float;
  set_minimap_size(value: Vector2): void;
  get_minimap_size(): Vector2;
  set_panning_scheme(value: int): void;
  get_panning_scheme(): int;
  set_right_disconnects(value: boolean): void;
  is_right_disconnects_enabled(): boolean;
  set_scroll_offset(value: Vector2): void;
  get_scroll_offset(): Vector2;
  set_show_arrange_button(value: boolean): void;
  is_showing_arrange_button(): boolean;
  set_show_grid(value: boolean): void;
  is_showing_grid(): boolean;
  set_show_grid_buttons(value: boolean): void;
  is_showing_grid_buttons(): boolean;
  set_show_menu(value: boolean): void;
  is_showing_menu(): boolean;
  set_show_minimap_button(value: boolean): void;
  is_showing_minimap_button(): boolean;
  set_show_zoom_buttons(value: boolean): void;
  is_showing_zoom_buttons(): boolean;
  set_show_zoom_label(value: boolean): void;
  is_showing_zoom_label(): boolean;
  set_snapping_distance(value: int): void;
  get_snapping_distance(): int;
  set_snapping_enabled(value: boolean): void;
  is_snapping_enabled(): boolean;
  set_type_names(value: Dictionary): void;
  get_type_names(): Dictionary;
  set_zoom(value: float): void;
  get_zoom(): float;
  set_zoom_max(value: float): void;
  get_zoom_max(): float;
  set_zoom_min(value: float): void;
  get_zoom_min(): float;
  set_zoom_step(value: float): void;
  get_zoom_step(): float;

  /** Virtual method which can be overridden to customize how connections are drawn. */
  _get_connection_line(from_position: Vector2, to_position: Vector2): PackedVector2Array;
  /**
   * Returns whether the `mouse_position` is in the input hot zone.
   * By default, a hot zone is a {@link Rect2} positioned such that its center is at `in_node`.{@link GraphNode.get_input_port_position}(`in_port`) (For output's case, call {@link GraphNode.get_output_port_position} instead). The hot zone's width is twice the Theme Property `port_grab_distance_horizontal`, and its height is twice the `port_grab_distance_vertical`.
   * Below is a sample code to help get started:
   */
  _is_in_input_hotzone(in_node: GodotObject, in_port: int, mouse_position: Vector2): boolean;
  /**
   * Returns whether the `mouse_position` is in the output hot zone. For more information on hot zones, see {@link _is_in_input_hotzone}.
   * Below is a sample code to help get started:
   */
  _is_in_output_hotzone(in_node: GodotObject, in_port: int, mouse_position: Vector2): boolean;
  /**
   * This virtual method can be used to insert additional error detection while the user is dragging a connection over a valid port.
   * Return `true` if the connection is indeed valid or return `false` if the connection is impossible. If the connection is impossible, no snapping to the port and thus no connection request to that port will happen.
   * In this example a connection to same node is suppressed:
   */
  _is_node_hover_valid(from_node: string, from_port: int, to_node: string, to_port: int): boolean;
  /**
   * Allows the connection between two different port types. The port type is defined individually for the left and the right port of each slot with the {@link GraphNode.set_slot} method.
   * See also {@link is_valid_connection_type} and {@link remove_valid_connection_type}.
   */
  add_valid_connection_type(from_type: int, to_type: int): void;
  /**
   * Allows to disconnect nodes when dragging from the left port of the {@link GraphNode}'s slot if it has the specified type. See also {@link remove_valid_left_disconnect_type}.
   */
  add_valid_left_disconnect_type(type_: int): void;
  /**
   * Allows to disconnect nodes when dragging from the right port of the {@link GraphNode}'s slot if it has the specified type. See also {@link remove_valid_right_disconnect_type}.
   */
  add_valid_right_disconnect_type(type_: int): void;
  /**
   * Rearranges selected nodes in a layout with minimum crossings between connections and uniform horizontal and vertical gap between nodes.
   */
  arrange_nodes(): void;
  /** Attaches the `element` {@link GraphElement} to the `frame` {@link GraphFrame}. */
  attach_graph_element_to_frame(element: string, frame: string): void;
  /** Removes all connections between nodes. */
  clear_connections(): void;
  /**
   * Create a connection between the `from_port` of the `from_node` {@link GraphNode} and the `to_port` of the `to_node` {@link GraphNode}. If the connection already exists, no connection is created.
   * Connections with `keep_alive` set to `false` may be deleted automatically if invalid during a redraw.
   */
  connect_node(from_node: string, from_port: int, to_node: string, to_port: int, keep_alive?: boolean): int;
  /**
   * Detaches the `element` {@link GraphElement} from the {@link GraphFrame} it is currently attached to.
   */
  detach_graph_element_from_frame(element: string): void;
  /**
   * Removes the connection between the `from_port` of the `from_node` {@link GraphNode} and the `to_port` of the `to_node` {@link GraphNode}. If the connection does not exist, no connection is removed.
   */
  disconnect_node(from_node: string, from_port: int, to_node: string, to_port: int): void;
  /**
   * Ends the creation of the current connection. In other words, if you are dragging a connection you can use this method to abort the process and remove the line that followed your cursor.
   * This is best used together with {@link connection_drag_started} and {@link connection_drag_ended} to add custom behavior like node addition through shortcuts.
   * **Note:** This method suppresses any other connection request signals apart from {@link connection_drag_ended}.
   */
  force_connection_drag_end(): void;
  /** Returns an array of node names that are attached to the {@link GraphFrame} with the given name. */
  get_attached_nodes_of_frame(frame: string): unknown;
  /**
   * Returns the closest connection to the given point in screen space. If no connection is found within `max_distance` pixels, an empty {@link Dictionary} is returned.
   * A connection is represented as a {@link Dictionary} in the form of:
   * For example, getting a connection at a given mouse position can be achieved like this:
   */
  get_closest_connection_at_point(point: Vector2, max_distance?: float): Dictionary;
  /** Returns the number of connections from `from_port` of `from_node`. */
  get_connection_count(from_node: string, from_port: int): int;
  /** Returns the points which would make up a connection between `from_node` and `to_node`. */
  get_connection_line(from_node: Vector2, to_node: Vector2): PackedVector2Array;
  /**
   * Returns an {@link Array} containing a list of all connections for `node`.
   * A connection is represented as a {@link Dictionary} in the form of:
   * **Example:** Get all connections on a specific port:
   */
  get_connection_list_from_node(node: string): Dictionary;
  /**
   * Returns an {@link Array} containing the list of connections that intersect with the given {@link Rect2}.
   * A connection is represented as a {@link Dictionary} in the form of:
   */
  get_connections_intersecting_with_rect(rect: Rect2): Dictionary;
  /** Returns the {@link GraphFrame} that contains the {@link GraphElement} with the given name. */
  get_element_frame(element: string): GraphFrame;
  /**
   * Gets the {@link HBoxContainer} that contains the zooming and grid snap controls in the top left of the graph. You can use this method to reposition the toolbar or to add your own custom controls to it.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_menu_hbox(): HBoxContainer;
  /**
   * Returns `true` if the `from_port` of the `from_node` {@link GraphNode} is connected to the `to_port` of the `to_node` {@link GraphNode}.
   */
  is_node_connected(from_node: string, from_port: int, to_node: string, to_port: int): boolean;
  /**
   * Returns whether it's possible to make a connection between two different port types. The port type is defined individually for the left and the right port of each slot with the {@link GraphNode.set_slot} method.
   * See also {@link add_valid_connection_type} and {@link remove_valid_connection_type}.
   */
  is_valid_connection_type(from_type: int, to_type: int): boolean;
  /**
   * Disallows the connection between two different port types previously allowed by {@link add_valid_connection_type}. The port type is defined individually for the left and the right port of each slot with the {@link GraphNode.set_slot} method.
   * See also {@link is_valid_connection_type}.
   */
  remove_valid_connection_type(from_type: int, to_type: int): void;
  /**
   * Disallows to disconnect nodes when dragging from the left port of the {@link GraphNode}'s slot if it has the specified type. Use this to disable a disconnection previously allowed with {@link add_valid_left_disconnect_type}.
   */
  remove_valid_left_disconnect_type(type_: int): void;
  /**
   * Disallows to disconnect nodes when dragging from the right port of the {@link GraphNode}'s slot if it has the specified type. Use this to disable a disconnection previously allowed with {@link add_valid_right_disconnect_type}.
   */
  remove_valid_right_disconnect_type(type_: int): void;
  /**
   * Sets the coloration of the connection between `from_node`'s `from_port` and `to_node`'s `to_port` with the color provided in the  theme property. The color is linearly interpolated between the connection color and the activity color using `amount` as weight.
   */
  set_connection_activity(from_node: string, from_port: int, to_node: string, to_port: int, amount: float): void;
  /** Sets the specified `node` as the one selected. */
  set_selected(node: Node): void;

  /** Emitted at the beginning of a {@link GraphElement}'s movement. */
  begin_node_move: Signal<[]>;
  /** Emitted at the end of a connection drag. */
  connection_drag_ended: Signal<[]>;
  /** Emitted at the beginning of a connection drag. */
  connection_drag_started: Signal<[string, int, boolean]>;
  /** Emitted when user drags a connection from an input port into the empty space of the graph. */
  connection_from_empty: Signal<[string, int, Vector2]>;
  /**
   * Emitted to the GraphEdit when the connection between the `from_port` of the `from_node` {@link GraphNode} and the `to_port` of the `to_node` {@link GraphNode} is attempted to be created.
   */
  connection_request: Signal<[string, int, string, int]>;
  /** Emitted when user drags a connection from an output port into the empty space of the graph. */
  connection_to_empty: Signal<[string, int, Vector2]>;
  /**
   * Emitted when this {@link GraphEdit} captures a `ui_copy` action (`Ctrl + C` by default). In general, this signal indicates that the selected {@link GraphElement}s should be copied.
   */
  copy_nodes_request: Signal<[]>;
  /**
   * Emitted when this {@link GraphEdit} captures a `ui_cut` action (`Ctrl + X` by default). In general, this signal indicates that the selected {@link GraphElement}s should be cut.
   */
  cut_nodes_request: Signal<[]>;
  /**
   * Emitted when this {@link GraphEdit} captures a `ui_graph_delete` action (`Delete` by default).
   * `nodes` is an array of node names that should be removed. These usually include all selected nodes.
   */
  delete_nodes_request: Signal<[unknown]>;
  /**
   * Emitted to the GraphEdit when the connection between `from_port` of `from_node` {@link GraphNode} and `to_port` of `to_node` {@link GraphNode} is attempted to be removed.
   */
  disconnection_request: Signal<[string, int, string, int]>;
  /**
   * Emitted when this {@link GraphEdit} captures a `ui_graph_duplicate` action (`Ctrl + D` by default). In general, this signal indicates that the selected {@link GraphElement}s should be duplicated.
   */
  duplicate_nodes_request: Signal<[]>;
  /** Emitted at the end of a {@link GraphElement}'s movement. */
  end_node_move: Signal<[]>;
  /** Emitted when the {@link GraphFrame} `frame` is resized to `new_rect`. */
  frame_rect_changed: Signal<[GraphFrame, Rect2]>;
  /**
   * Emitted when one or more {@link GraphElement}s are dropped onto the {@link GraphFrame} named `frame`, when they were not previously attached to any other one.
   * `elements` is an array of {@link GraphElement}s to be attached.
   */
  graph_elements_linked_to_frame_request: Signal<[Array<unknown>, string]>;
  /** Emitted when the given {@link GraphElement} node is deselected. */
  node_deselected: Signal<[Node]>;
  /** Emitted when the given {@link GraphElement} node is selected. */
  node_selected: Signal<[Node]>;
  /**
   * Emitted when this {@link GraphEdit} captures a `ui_paste` action (`Ctrl + V` by default). In general, this signal indicates that previously copied {@link GraphElement}s should be pasted.
   */
  paste_nodes_request: Signal<[]>;
  /**
   * Emitted when a popup is requested. Happens on right-clicking in the GraphEdit. `at_position` is the position of the mouse pointer when the signal is sent.
   */
  popup_request: Signal<[Vector2]>;
  /** Emitted when the scroll offset is changed by the user. It will not be emitted when changed in code. */
  scroll_offset_changed: Signal<[Vector2]>;

  // enum PanningScheme
  /** `Mouse Wheel` will zoom, `Ctrl + Mouse Wheel` will move the view. */
  static readonly SCROLL_ZOOMS: int;
  /** `Mouse Wheel` will move the view, `Ctrl + Mouse Wheel` will zoom. */
  static readonly SCROLL_PANS: int;
  // enum GridPattern
  /** Draw the grid using solid lines. */
  static readonly GRID_PATTERN_LINES: int;
  /** Draw the grid using dots. */
  static readonly GRID_PATTERN_DOTS: int;
}
