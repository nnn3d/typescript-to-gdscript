// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for all GUI controls. Adapts its position and size based on its parent control. */
declare class Control extends CanvasItem {
  /** The paths to the nodes which are controlled by this node. */
  accessibility_controls_nodes: unknown;
  /** The paths to the nodes which are describing this node. */
  accessibility_described_by_nodes: unknown;
  /** The human-readable node description that is reported to assistive apps. */
  accessibility_description: string;
  /** The paths to the nodes which this node flows into. */
  accessibility_flow_to_nodes: unknown;
  /** The paths to the nodes which label this node. */
  accessibility_labeled_by_nodes: unknown;
  /**
   * The mode with which a live region updates. A live region is a {@link Node} that is updated as a result of an external event when the user's focus may be elsewhere.
   */
  accessibility_live: int;
  /** The human-readable node name that is reported to assistive apps. */
  accessibility_name: string;
  /**
   * Anchors the bottom edge of the node to the origin, the center, or the end of its parent control. It changes how the bottom offset updates when the node moves or changes size. You can use one of the {@link Anchor} constants for convenience.
   */
  anchor_bottom: float;
  /**
   * Anchors the left edge of the node to the origin, the center or the end of its parent control. It changes how the left offset updates when the node moves or changes size. You can use one of the {@link Anchor} constants for convenience.
   */
  anchor_left: float;
  /**
   * Anchors the right edge of the node to the origin, the center or the end of its parent control. It changes how the right offset updates when the node moves or changes size. You can use one of the {@link Anchor} constants for convenience.
   */
  anchor_right: float;
  /**
   * Anchors the top edge of the node to the origin, the center or the end of its parent control. It changes how the top offset updates when the node moves or changes size. You can use one of the {@link Anchor} constants for convenience.
   */
  anchor_top: float;
  /**
   * Toggles if any text should automatically change to its translated version depending on the current locale.
   */
  auto_translate: boolean;
  /**
   * Enables whether rendering of {@link CanvasItem} based children should be clipped to this control's rectangle. If `true`, parts of a child which would be visibly outside of this control's rectangle will not be rendered and won't receive input.
   */
  clip_contents: boolean;
  /**
   * The minimum size of the node's bounding rectangle. If you set it to a value greater than `(0, 0)`, the node's bounding rectangle will always have at least this size. Note that {@link Control} nodes have their internal minimum size returned by {@link get_minimum_size}. It depends on the control's contents, like text, textures, or style boxes. The actual minimum size is the maximum value of this property and the internal minimum size (see {@link get_combined_minimum_size}).
   */
  custom_minimum_size: Vector2;
  /**
   * Determines which controls can be focused together with {@link focus_mode}. See {@link get_focus_mode_with_override}. Since the default behavior is {@link FOCUS_BEHAVIOR_INHERITED}, this can be used to prevent all children controls from getting focused.
   */
  focus_behavior_recursive: int;
  /**
   * Determines which controls can be focused. Only one control can be focused at a time, and the focused control will receive keyboard, gamepad, and mouse events in {@link _gui_input}. Use {@link get_focus_mode_with_override} to determine if a control can grab focus, since {@link focus_behavior_recursive} also affects it. See also {@link grab_focus}.
   */
  focus_mode: int;
  /**
   * Tells Godot which node it should give focus to if the user presses the down arrow on the keyboard or down on a gamepad by default. You can change the key by editing the {@link ProjectSettings.input/ui_down} input action. The node must be a {@link Control}. If this property is not set, Godot will give focus to the closest {@link Control} to the bottom of this one.
   */
  focus_neighbor_bottom: string;
  /**
   * Tells Godot which node it should give focus to if the user presses the left arrow on the keyboard or left on a gamepad by default. You can change the key by editing the {@link ProjectSettings.input/ui_left} input action. The node must be a {@link Control}. If this property is not set, Godot will give focus to the closest {@link Control} to the left of this one.
   */
  focus_neighbor_left: string;
  /**
   * Tells Godot which node it should give focus to if the user presses the right arrow on the keyboard or right on a gamepad by default. You can change the key by editing the {@link ProjectSettings.input/ui_right} input action. The node must be a {@link Control}. If this property is not set, Godot will give focus to the closest {@link Control} to the right of this one.
   */
  focus_neighbor_right: string;
  /**
   * Tells Godot which node it should give focus to if the user presses the top arrow on the keyboard or top on a gamepad by default. You can change the key by editing the {@link ProjectSettings.input/ui_up} input action. The node must be a {@link Control}. If this property is not set, Godot will give focus to the closest {@link Control} to the top of this one.
   */
  focus_neighbor_top: string;
  /**
   * Tells Godot which node it should give focus to if the user presses `Tab` on a keyboard by default. You can change the key by editing the {@link ProjectSettings.input/ui_focus_next} input action.
   * If this property is not set, Godot will select a "best guess" based on surrounding nodes in the scene tree.
   */
  focus_next: string;
  /**
   * Tells Godot which node it should give focus to if the user presses `Shift + Tab` on a keyboard by default. You can change the key by editing the {@link ProjectSettings.input/ui_focus_prev} input action.
   * If this property is not set, Godot will select a "best guess" based on surrounding nodes in the scene tree.
   */
  focus_previous: string;
  /** The node's global position, relative to the world (usually to the {@link CanvasLayer}). */
  global_position: Vector2;
  /**
   * Controls the direction on the horizontal axis in which the control should grow if its horizontal minimum size is changed to be greater than its current size, as the control always has to be at least the minimum size.
   */
  grow_horizontal: int;
  /**
   * Controls the direction on the vertical axis in which the control should grow if its vertical minimum size is changed to be greater than its current size, as the control always has to be at least the minimum size.
   */
  grow_vertical: int;
  /**
   * Controls layout direction and text writing direction. Right-to-left layouts are necessary for certain languages (e.g. Arabic and Hebrew). See also {@link is_layout_rtl}.
   */
  layout_direction: int;
  /**
   * If `true`, automatically converts code line numbers, list indices, {@link SpinBox} and {@link ProgressBar} values from the Western Arabic (0..9) to the numeral systems used in current locale.
   * **Note:** Numbers within the text are not automatically converted, it can be done manually, using {@link TextServer.format_number}.
   */
  localize_numeral_system: boolean;
  /**
   * Determines which controls can receive mouse input together with {@link mouse_filter}. See {@link get_mouse_filter_with_override}. Since the default behavior is {@link MOUSE_BEHAVIOR_INHERITED}, this can be used to prevent all children controls from receiving mouse input.
   */
  mouse_behavior_recursive: int;
  /**
   * The default cursor shape for this control. Useful for Godot plugins and applications or games that use the system's mouse cursors.
   * **Note:** On Linux, shapes may vary depending on the cursor theme of the system.
   */
  mouse_default_cursor_shape: int;
  /**
   * Determines which controls will be able to receive mouse button input events through {@link _gui_input} and the {@link mouse_entered}, and {@link mouse_exited} signals. Also determines how these events should be propagated. See the constants to learn what each does. Use {@link get_mouse_filter_with_override} to determine if a control can receive mouse input, since {@link mouse_behavior_recursive} also affects it.
   */
  mouse_filter: int;
  /**
   * When enabled, scroll wheel events processed by {@link _gui_input} will be passed to the parent control even if {@link mouse_filter} is set to {@link MOUSE_FILTER_STOP}.
   * You should disable it on the root of your UI if you do not want scroll events to go to the {@link Node._unhandled_input} processing.
   * **Note:** Because this property defaults to `true`, this allows nested scrollable containers to work out of the box.
   */
  mouse_force_pass_scroll_events: boolean;
  /**
   * Distance between the node's bottom edge and its parent control, based on {@link anchor_bottom}.
   * Offsets are often controlled by one or multiple parent {@link Container} nodes, so you should not modify them manually if your node is a direct child of a {@link Container}. Offsets update automatically when you move or resize the node.
   */
  offset_bottom: float;
  /**
   * Distance between the node's left edge and its parent control, based on {@link anchor_left}.
   * Offsets are often controlled by one or multiple parent {@link Container} nodes, so you should not modify them manually if your node is a direct child of a {@link Container}. Offsets update automatically when you move or resize the node.
   */
  offset_left: float;
  /**
   * Distance between the node's right edge and its parent control, based on {@link anchor_right}.
   * Offsets are often controlled by one or multiple parent {@link Container} nodes, so you should not modify them manually if your node is a direct child of a {@link Container}. Offsets update automatically when you move or resize the node.
   */
  offset_right: float;
  /**
   * Distance between the node's top edge and its parent control, based on {@link anchor_top}.
   * Offsets are often controlled by one or multiple parent {@link Container} nodes, so you should not modify them manually if your node is a direct child of a {@link Container}. Offsets update automatically when you move or resize the node.
   */
  offset_top: float;
  /**
   * If `true`, applies all offset transform properties. Otherwise, no offset transform is applied and the properties have no effect.
   */
  offset_transform_enabled: boolean;
  /**
   * Pivot used by {@link offset_transform_rotation} and {@link offset_transform_scale} in absolute units.
   * The final pivot position is the combined value of this property and {@link offset_transform_pivot_ratio}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_pivot: Vector2;
  /**
   * Same as {@link offset_transform_pivot} but expressed in units relative to the {@link Control} {@link size} where `Vector2(0, 0)` is the top-left corner of this control, and `Vector2(1, 1)` is its bottom-right corner.
   * The final pivot position is the combined value of this property and {@link offset_transform_pivot}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_pivot_ratio: Vector2;
  /**
   * Position offset in absolute units. The final offset is the combined value of this property and {@link offset_transform_position_ratio}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_position: Vector2;
  /**
   * Same as {@link offset_transform_position} but expressed in units relative to the {@link Control} {@link size} where `Vector2(0, 0)` is the top-left corner of this control, and `Vector2(1, 1)` is its bottom-right corner.
   * The final offset is the combined value of this property and {@link offset_transform_position}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_position_ratio: Vector2;
  /**
   * Rotation offset. The rotation pivot is defined by {@link offset_transform_pivot} and {@link offset_transform_pivot_ratio}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_rotation: float;
  /**
   * Scale offset. The scale pivot is defined by {@link offset_transform_pivot} and {@link offset_transform_pivot_ratio}.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_scale: Vector2;
  /**
   * If `true`, the offset transforms is only applied visually and does not affect input. In other words, this Control will still receive input events at its original location before the offset transform is applied.
   * If `false`, the entire transform of this Control is affected and input events will register where the Control is visually.
   * Has no effect unless {@link offset_transform_enabled} is `true`.
   */
  offset_transform_visual_only: boolean;
  /**
   * <member name="pivot_offset" type="Vector2" setter="set_pivot_offset" getter="get_pivot_offset" default="Vector2(0, 0)">
   * By default, the node's pivot is its top-left corner. When you change its {@link rotation} or {@link scale}, it will rotate or scale around this pivot.
   * The actual offset is the combined value of this property and {@link pivot_offset_ratio}.
   */
  physics_interpolation_mode: int;
  /**
   * Same as {@link pivot_offset}, but expressed as uniform vector, where `Vector2(0, 0)` is the top-left corner of this control, and `Vector2(1, 1)` is its bottom-right corner. Set this property to `Vector2(0.5, 0.5)` to pivot around this control's center.
   * The actual offset is the combined value of this property and {@link pivot_offset}.
   */
  pivot_offset_ratio: Vector2;
  /**
   * The node's position, relative to its containing node. It corresponds to the rectangle's top-left corner. The property is not affected by {@link pivot_offset}.
   */
  position: Vector2;
  /**
   * The node's rotation around its pivot, in radians. See {@link pivot_offset} to change the pivot's position.
   * **Note:** This property is edited in the inspector in degrees. If you want to use degrees in a script, use {@link rotation_degrees}.
   */
  rotation: float;
  /** Helper property to access {@link rotation} in degrees instead of radians. */
  rotation_degrees: float;
  /**
   * The node's scale, relative to its {@link size}. Change this property to scale the node around its {@link pivot_offset}. The Control's tooltip will also scale according to this value.
   * **Note:** This property is mainly intended to be used for animation purposes. To support multiple resolutions in your project, use an appropriate viewport stretch mode as described in the documentation ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) instead of scaling Controls individually.
   * **Note:** {@link FontFile.oversampling} does *not* take {@link Control} {@link scale} into account. This means that scaling up/down will cause bitmap fonts and rasterized (non-MSDF) dynamic fonts to appear blurry or pixelated. To ensure text remains crisp regardless of scale, you can enable MSDF font rendering by enabling {@link ProjectSettings.gui/theme/default_font_multichannel_signed_distance_field} (applies to the default project font only), or enabling **Multichannel Signed Distance Field** in the import options of a DynamicFont for custom fonts. On system fonts, {@link SystemFont.multichannel_signed_distance_field} can be enabled in the inspector.
   * **Note:** If the Control node is a child of a {@link Container} node, the scale will be reset to `Vector2(1, 1)` when the scene is instantiated. To set the Control's scale when it's instantiated, wait for one frame using `await get_tree().process_frame` then set its {@link scale} property.
   */
  scale: Vector2;
  /**
   * The {@link Node} which must be a parent of the focused {@link Control} for the shortcut to be activated. If `null`, the shortcut can be activated when any control is focused (a global shortcut). This allows shortcuts to be accepted only when the user has a certain area of the GUI focused.
   */
  shortcut_context: Node;
  /**
   * The size of the node's bounding rectangle, in the node's coordinate system. {@link Container} nodes update this property automatically.
   */
  size: Vector2;
  /**
   * Tells the parent {@link Container} nodes how they should resize and place the node on the X axis. Use a combination of the {@link SizeFlags} constants to change the flags. See the constants to learn what each does.
   */
  size_flags_horizontal: int;
  /**
   * If the node and at least one of its neighbors uses the {@link SIZE_EXPAND} size flag, the parent {@link Container} will let it take more or less space depending on this property. If this node has a stretch ratio of 2 and its neighbor a ratio of 1, this node will take two thirds of the available space.
   */
  size_flags_stretch_ratio: float;
  /**
   * Tells the parent {@link Container} nodes how they should resize and place the node on the Y axis. Use a combination of the {@link SizeFlags} constants to change the flags. See the constants to learn what each does.
   */
  size_flags_vertical: int;
  /**
   * The {@link Theme} resource this node and all its {@link Control} and {@link Window} children use. If a child node has its own {@link Theme} resource set, theme items are merged with child's definitions having higher priority.
   * **Note:** {@link Window} styles will have no effect unless the window is embedded.
   */
  theme: Theme;
  /**
   * The name of a theme type variation used by this {@link Control} to look up its own theme items. When empty, the class name of the node is used (e.g. [code skip-lint]Button[/code] for the {@link Button} control), as well as the class names of all parent classes (in order of inheritance).
   * When set, this property gives the highest priority to the type of the specified name. This type can in turn extend another type, forming a dependency chain. See {@link Theme.set_type_variation}. If the theme item cannot be found using this type or its base types, lookup falls back on the class names.
   * **Note:** To look up {@link Control}'s own items use various `get_theme_*` methods without specifying `theme_type`.
   * **Note:** Theme items are looked for in the tree order, from branch to root, where each {@link Control} node is checked for its {@link theme} property. The earliest match against any type/class name is returned. The project-level Theme and the default Theme are checked last.
   */
  theme_type_variation: string;
  /**
   * Defines if tooltip text should automatically change to its translated version depending on the current locale. Uses the same auto translate mode as this control when set to {@link Node.AUTO_TRANSLATE_MODE_INHERIT}.
   * **Note:** Tooltips customized using {@link _make_custom_tooltip} do not use this auto translate mode automatically.
   */
  tooltip_auto_translate_mode: int;
  /**
   * The default tooltip text. The tooltip appears when the user's mouse cursor stays idle over this control for a few moments, provided that the {@link mouse_filter} property is not {@link MOUSE_FILTER_IGNORE}. The time required for the tooltip to appear can be changed with the {@link ProjectSettings.gui/timers/tooltip_delay_sec} setting.
   * This string is the default return value of {@link get_tooltip}. Override {@link _get_tooltip} to generate tooltip text dynamically. Override {@link _make_custom_tooltip} to customize the tooltip interface and behavior.
   * The tooltip popup will use either a default implementation, or a custom one that you can provide by overriding {@link _make_custom_tooltip}. The default tooltip includes a {@link PopupPanel} and {@link Label} whose theme properties can be customized using {@link Theme} methods with the `"TooltipPanel"` and `"TooltipLabel"` respectively. For example:
   */
  tooltip_text: string;

  /** Return the description of the keyboard shortcuts and other contextual help for this control. */
  _accessibility_get_contextual_info(): string;
  /**
   * Godot calls this method to test if `data` from a control's {@link _get_drag_data} can be dropped at `at_position`. `at_position` is local to this control.
   * This method should only be used to test the data. Process the data in {@link _drop_data}.
   * **Note:** If the drag was initiated by a keyboard shortcut or {@link accessibility_drag}, `at_position` is set to {@link Vector2.INF}, and the currently selected item/text position should be used as the drop position.
   */
  _can_drop_data(at_position: Vector2, data: unknown): boolean;
  /**
   * Godot calls this method to pass you the `data` from a control's {@link _get_drag_data} result. Godot first calls {@link _can_drop_data} to test if `data` is allowed to drop at `at_position` where `at_position` is local to this control.
   * **Note:** If the drag was initiated by a keyboard shortcut or {@link accessibility_drag}, `at_position` is set to {@link Vector2.INF}, and the currently selected item/text position should be used as the drop position.
   */
  _drop_data(at_position: Vector2, data: unknown): void;
  /**
   * Override this method to return a human-readable description of the position of the child `node` in the custom container, added to the {@link accessibility_name}.
   */
  _get_accessibility_container_name(node: Node): string;
  /**
   * Godot calls this method to get data that can be dragged and dropped onto controls that expect drop data. Returns `null` if there is no data to drag. Controls that want to receive drop data should implement {@link _can_drop_data} and {@link _drop_data}. `at_position` is local to this control. Drag may be forced with {@link force_drag}.
   * A preview that will follow the mouse that should represent the data can be set with {@link set_drag_preview}. A good time to set the preview is in this method.
   * **Note:** If the drag was initiated by a keyboard shortcut or {@link accessibility_drag}, `at_position` is set to {@link Vector2.INF}, and the currently selected item/text position should be used as the drag position.
   */
  _get_drag_data(at_position: Vector2): unknown;
  /**
   * Virtual method to be implemented by the user. Returns the minimum size for this control. Alternative to {@link custom_minimum_size} for controlling minimum size via code. The actual minimum size will be the max value of these two (in each axis separately).
   * If not overridden, defaults to {@link Vector2.ZERO}.
   * **Note:** This method will not be called when the script is attached to a {@link Control} node that already overrides its minimum size (e.g. {@link Label}, {@link Button}, {@link PanelContainer} etc.). It can only be used with most basic GUI nodes, like {@link Control}, {@link Container}, {@link Panel} etc.
   */
  _get_minimum_size(): Vector2;
  /**
   * Virtual method to be implemented by the user. Returns the tooltip text for the position `at_position` in control's local coordinates, which will typically appear when the cursor is resting over this control. See {@link get_tooltip}.
   * **Note:** If this method returns an empty {@link String} and {@link _make_custom_tooltip} is not overridden, no tooltip is displayed.
   */
  _get_tooltip(at_position: Vector2): string;
  /**
   * Virtual method to be implemented by the user. Override this method to handle and accept inputs on UI elements. See also {@link accept_event}.
   * **Example:** Click on the control to print a message:
   * If the `event` inherits {@link InputEventMouse}, this method will **not** be called when:
   * - the control's {@link mouse_filter} is set to {@link MOUSE_FILTER_IGNORE};
   * - the control is obstructed by another control on top, that doesn't have {@link mouse_filter} set to {@link MOUSE_FILTER_IGNORE};
   * - the control's parent has {@link mouse_filter} set to {@link MOUSE_FILTER_STOP} or has accepted the event;
   * - the control's parent has {@link clip_contents} enabled and the `event`'s position is outside the parent's rectangle;
   * - the `event`'s position is outside the control (see {@link _has_point}).
   * **Note:** The `event`'s position is relative to this control's origin.
   */
  _gui_input(event: InputEvent): void;
  /**
   * Virtual method to be implemented by the user. Returns whether the given `point` is inside this control.
   * If not overridden, default behavior is checking if the point is within control's Rect.
   * **Note:** If you want to check if a point is inside the control, you can use `Rect2(Vector2.ZERO, size).has_point(point)`.
   */
  _has_point(point: Vector2): boolean;
  /**
   * Virtual method to be implemented by the user. Returns a {@link Control} node that should be used as a tooltip instead of the default one. `for_text` is the return value of {@link get_tooltip}.
   * The returned node must be of type {@link Control} or Control-derived. It can have child nodes of any type. It is freed when the tooltip disappears, so make sure you always provide a new instance (if you want to use a pre-existing node from your scene tree, you can duplicate it and pass the duplicated instance). When `null` or a non-Control node is returned, the default tooltip will be used instead.
   * The returned node will be added as child to a {@link PopupPanel}, so you should only provide the contents of that panel. That {@link PopupPanel} can be themed using {@link Theme.set_stylebox} for the type `"TooltipPanel"` (see {@link tooltip_text} for an example).
   * **Note:** The tooltip is shrunk to minimal size. If you want to ensure it's fully visible, you might want to set its {@link custom_minimum_size} to some non-zero value.
   * **Note:** The node (and any relevant children) should have their {@link CanvasItem.visible} set to `true` when returned, otherwise, the viewport that instantiates it will not be able to calculate its minimum size reliably.
   * **Note:** If overridden, this method is called even if {@link get_tooltip} returns an empty string. When this happens with the default tooltip, it is not displayed. To copy this behavior, return `null` in this method when `for_text` is empty.
   * **Example:** Use a constructed node as a tooltip:
   * **Example:** Use a scene instance as a tooltip:
   */
  _make_custom_tooltip(for_text: string): GodotObject;
  /**
   * User defined BiDi algorithm override function.
   * Returns an {@link Array} of {@link Vector3i} text ranges and text base directions, in the left-to-right order. Ranges should cover full source `text` without overlaps. BiDi algorithm will be used on each range separately.
   */
  _structured_text_parser(args: Array<unknown>, text: string): unknown;
  /**
   * Marks an input event as handled. Once you accept an input event, it stops propagating, even to nodes listening to {@link Node._unhandled_input} or {@link Node._unhandled_key_input}.
   * **Note:** This does not affect the methods in {@link Input}, only the way events are propagated.
   */
  accept_event(): void;
  /** Starts drag-and-drop operation without using a mouse. */
  accessibility_drag(): void;
  /** Ends drag-and-drop operation without using a mouse. */
  accessibility_drop(): void;
  /**
   * Creates a local override for a theme {@link Color} with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_color_override}.
   * See also {@link get_theme_color}.
   * **Example:** Override a {@link Label}'s color and reset it later:
   */
  add_theme_color_override(name: string, color: Color): void;
  /**
   * Creates a local override for a theme constant with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_constant_override}.
   * See also {@link get_theme_constant}.
   */
  add_theme_constant_override(name: string, constant: int): void;
  /**
   * Creates a local override for a theme {@link Font} with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_font_override}.
   * See also {@link get_theme_font}.
   */
  add_theme_font_override(name: string, font: Font): void;
  /**
   * Creates a local override for a theme font size with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_font_size_override}.
   * See also {@link get_theme_font_size}.
   */
  add_theme_font_size_override(name: string, font_size: int): void;
  /**
   * Creates a local override for a theme icon with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_icon_override}.
   * See also {@link get_theme_icon}.
   */
  add_theme_icon_override(name: string, texture: Texture2D): void;
  /**
   * Creates a local override for a theme {@link StyleBox} with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_stylebox_override}.
   * See also {@link get_theme_stylebox}.
   * **Example:** Modify a property in a {@link StyleBox} by duplicating it:
   */
  add_theme_stylebox_override(name: string, stylebox: StyleBox): void;
  /**
   * Prevents `*_theme_*_override` methods from emitting {@link NOTIFICATION_THEME_CHANGED} until {@link end_bulk_theme_override} is called.
   */
  begin_bulk_theme_override(): void;
  /** Ends a bulk theme override update. See {@link begin_bulk_theme_override}. */
  end_bulk_theme_override(): void;
  /** Finds the next (below in the tree) {@link Control} that can receive the focus. */
  find_next_valid_focus(): Control;
  /** Finds the previous (above in the tree) {@link Control} that can receive the focus. */
  find_prev_valid_focus(): Control;
  /**
   * Finds the next {@link Control} that can receive the focus on the specified {@link Side}.
   * **Note:** This is different from {@link get_focus_neighbor}, which returns the path of a specified focus neighbor.
   */
  find_valid_focus_neighbor(side: int): Control;
  /**
   * Forces drag and bypasses {@link _get_drag_data} and {@link set_drag_preview} by passing `data` and `preview`. Drag will start even if the mouse is neither over nor pressed on this control.
   * The methods {@link _can_drop_data} and {@link _drop_data} must be implemented on controls that want to receive drop data.
   */
  force_drag(data: unknown, preview: Control): void;
  /**
   * Returns the anchor for the specified {@link Side}. A getter method for {@link anchor_bottom}, {@link anchor_left}, {@link anchor_right} and {@link anchor_top}.
   */
  get_anchor(side: int): float;
  /** Returns {@link offset_left} and {@link offset_top}. See also {@link position}. */
  get_begin(): Vector2;
  /** Returns combined minimum size from {@link custom_minimum_size} and {@link get_minimum_size}. */
  get_combined_minimum_size(): Vector2;
  /**
   * Returns the combined value of {@link pivot_offset} and {@link pivot_offset_ratio}, in pixels. The ratio is multiplied by the control's size.
   */
  get_combined_pivot_offset(): Vector2;
  /**
   * Returns the mouse cursor shape for this control when hovered over `position` in local coordinates. For most controls, this is the same as {@link mouse_default_cursor_shape}, but some built-in controls implement more complex logic.
   */
  get_cursor_shape(position?: Vector2): int;
  /** Returns {@link offset_right} and {@link offset_bottom}. */
  get_end(): Vector2;
  /**
   * Returns the {@link focus_mode}, but takes the {@link focus_behavior_recursive} into account. If {@link focus_behavior_recursive} is set to {@link FOCUS_BEHAVIOR_DISABLED}, or it is set to {@link FOCUS_BEHAVIOR_INHERITED} and its ancestor is set to {@link FOCUS_BEHAVIOR_DISABLED}, then this returns {@link FOCUS_NONE}.
   */
  get_focus_mode_with_override(): int;
  /**
   * Returns the focus neighbor for the specified {@link Side}. A getter method for {@link focus_neighbor_bottom}, {@link focus_neighbor_left}, {@link focus_neighbor_right} and {@link focus_neighbor_top}.
   * **Note:** To find the next {@link Control} on the specific {@link Side}, even if a neighbor is not assigned, use {@link find_valid_focus_neighbor}.
   */
  get_focus_neighbor(side: int): string;
  /**
   * Returns the position and size of the control relative to the containing canvas. See {@link global_position} and {@link size}.
   * **Note:** If the node itself or any parent {@link CanvasItem} between the node and the canvas have a non default rotation or skew, the resulting size is likely not meaningful.
   * **Note:** Setting {@link Viewport.gui_snap_controls_to_pixels} to `true` can lead to rounding inaccuracies between the displayed control and the returned {@link Rect2}.
   */
  get_global_rect(): Rect2;
  /** Returns the minimum size for this control. See {@link custom_minimum_size}. */
  get_minimum_size(): Vector2;
  /**
   * Returns the {@link mouse_filter}, but takes the {@link mouse_behavior_recursive} into account. If {@link mouse_behavior_recursive} is set to {@link MOUSE_BEHAVIOR_DISABLED}, or it is set to {@link MOUSE_BEHAVIOR_INHERITED} and its ancestor is set to {@link MOUSE_BEHAVIOR_DISABLED}, then this returns {@link MOUSE_FILTER_IGNORE}.
   */
  get_mouse_filter_with_override(): int;
  /**
   * Returns the offset for the specified {@link Side}. A getter method for {@link offset_bottom}, {@link offset_left}, {@link offset_right} and {@link offset_top}.
   */
  get_offset(offset: int): float;
  /** Returns the width/height occupied in the parent control. */
  get_parent_area_size(): Vector2;
  /** Returns the parent control node. */
  get_parent_control(): Control;
  /**
   * Returns the position and size of the control in the coordinate system of the containing node. See {@link position}, {@link scale} and {@link size}.
   * **Note:** If {@link rotation} is not the default rotation, the resulting size is not meaningful.
   * **Note:** Setting {@link Viewport.gui_snap_controls_to_pixels} to `true` can lead to rounding inaccuracies between the displayed control and the returned {@link Rect2}.
   */
  get_rect(): Rect2;
  /**
   * Returns the position of this {@link Control} in global screen coordinates (i.e. taking window position into account). Mostly useful for editor plugins.
   * Equivalent to `get_screen_transform().origin` (see {@link CanvasItem.get_screen_transform}).
   * **Example:** Show a popup at the mouse position:
   */
  get_screen_position(): Vector2;
  /**
   * Returns a {@link Color} from the first matching {@link Theme} in the tree if that {@link Theme} has a color item with the specified `name` and `theme_type`. If `theme_type` is omitted the class name of the current control is used as the type, or {@link theme_type_variation} if it is defined. If the type is a class name its parent classes are also checked, in order of inheritance. If the type is a variation its base types are checked, in order of dependency, then the control's class name and its parent classes are checked.
   * For the current control its local overrides are considered first (see {@link add_theme_color_override}), then its assigned {@link theme}. After the current control, each parent control and its assigned {@link theme} are considered; controls without a {@link theme} assigned are skipped. If no matching {@link Theme} is found in the tree, the custom project {@link Theme} (see {@link ProjectSettings.gui/theme/custom}) and the default {@link Theme} are used (see {@link ThemeDB}).
   */
  get_theme_color(name: string, theme_type?: string): Color;
  /**
   * Returns a constant from the first matching {@link Theme} in the tree if that {@link Theme} has a constant item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  get_theme_constant(name: string, theme_type?: string): int;
  /**
   * Returns the default base scale value from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_base_scale} value.
   * See {@link get_theme_color} for details.
   */
  get_theme_default_base_scale(): float;
  /**
   * Returns the default font from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_font} value.
   * See {@link get_theme_color} for details.
   */
  get_theme_default_font(): Font;
  /**
   * Returns the default font size value from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_font_size} value.
   * See {@link get_theme_color} for details.
   */
  get_theme_default_font_size(): int;
  /**
   * Returns a {@link Font} from the first matching {@link Theme} in the tree if that {@link Theme} has a font item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  get_theme_font(name: string, theme_type?: string): Font;
  /**
   * Returns a font size from the first matching {@link Theme} in the tree if that {@link Theme} has a font size item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  get_theme_font_size(name: string, theme_type?: string): int;
  /**
   * Returns an icon from the first matching {@link Theme} in the tree if that {@link Theme} has an icon item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  get_theme_icon(name: string, theme_type?: string): Texture2D;
  /**
   * Returns a {@link StyleBox} from the first matching {@link Theme} in the tree if that {@link Theme} has a stylebox item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  get_theme_stylebox(name: string, theme_type?: string): StyleBox;
  /**
   * Returns the tooltip text for the position `at_position` in control's local coordinates, which will typically appear when the cursor is resting over this control. By default, it returns {@link tooltip_text}.
   * This method can be overridden to customize its behavior. See {@link _get_tooltip}.
   * **Note:** If this method returns an empty {@link String} and {@link _make_custom_tooltip} is not overridden, no tooltip is displayed.
   */
  get_tooltip(at_position?: Vector2): string;
  /**
   * Creates an {@link InputEventMouseButton} that attempts to click the control. If the event is received, the control gains focus.
   */
  grab_click_focus(): void;
  /**
   * Steal the focus from another control and become the focused control (see {@link focus_mode}).
   * If `hide_focus` is `true`, the control will not visually show its focused state. Has no effect for {@link LineEdit} and {@link TextEdit} when {@link ProjectSettings.gui/common/show_focus_state_on_pointer_event} is set to `Control Supports Keyboard Input`, or for any control when it is set to `Always`.
   * **Note:** Using this method together with {@link Callable.call_deferred} makes it more reliable, especially when called inside {@link Node._ready}.
   */
  grab_focus(hide_focus?: boolean): void;
  /**
   * Returns `true` if this is the current focused control. See {@link focus_mode}.
   * If `ignore_hidden_focus` is `true`, controls that have their focus hidden will always return `false`. Hidden focus happens automatically when controls gain focus via mouse input, or manually using {@link grab_focus} with `hide_focus` set to `true`.
   */
  has_focus(ignore_hidden_focus?: boolean): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a color item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_color(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link Color} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_color_override}.
   */
  has_theme_color_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a constant item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_constant(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme constant with the specified `name` in this {@link Control} node.
   * See {@link add_theme_constant_override}.
   */
  has_theme_constant_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a font item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_font(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link Font} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_font_override}.
   */
  has_theme_font_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a font size item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_font_size(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme font size with the specified `name` in this {@link Control} node.
   * See {@link add_theme_font_size_override}.
   */
  has_theme_font_size_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has an icon item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_icon(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme icon with the specified `name` in this {@link Control} node.
   * See {@link add_theme_icon_override}.
   */
  has_theme_icon_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a stylebox item with the specified `name` and `theme_type`.
   * See {@link get_theme_color} for details.
   */
  has_theme_stylebox(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link StyleBox} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_stylebox_override}.
   */
  has_theme_stylebox_override(name: string): boolean;
  /**
   * Returns `true` if a drag operation is successful. Alternative to {@link Viewport.gui_is_drag_successful}.
   * Best used with {@link Node.NOTIFICATION_DRAG_END}.
   */
  is_drag_successful(): boolean;
  /** Returns `true` if the layout is right-to-left. See also {@link layout_direction}. */
  is_layout_rtl(): boolean;
  /** Give up the focus. No other control will be able to receive input. */
  release_focus(): void;
  /**
   * Removes a local override for a theme {@link Color} with the specified `name` previously added by {@link add_theme_color_override} or via the Inspector dock.
   */
  remove_theme_color_override(name: string): void;
  /**
   * Removes a local override for a theme constant with the specified `name` previously added by {@link add_theme_constant_override} or via the Inspector dock.
   */
  remove_theme_constant_override(name: string): void;
  /**
   * Removes a local override for a theme {@link Font} with the specified `name` previously added by {@link add_theme_font_override} or via the Inspector dock.
   */
  remove_theme_font_override(name: string): void;
  /**
   * Removes a local override for a theme font size with the specified `name` previously added by {@link add_theme_font_size_override} or via the Inspector dock.
   */
  remove_theme_font_size_override(name: string): void;
  /**
   * Removes a local override for a theme icon with the specified `name` previously added by {@link add_theme_icon_override} or via the Inspector dock.
   */
  remove_theme_icon_override(name: string): void;
  /**
   * Removes a local override for a theme {@link StyleBox} with the specified `name` previously added by {@link add_theme_stylebox_override} or via the Inspector dock.
   */
  remove_theme_stylebox_override(name: string): void;
  /**
   * Resets the size to {@link get_combined_minimum_size}. This is equivalent to calling `set_size(Vector2())` (or any size below the minimum).
   */
  reset_size(): void;
  /**
   * Sets the anchor for the specified {@link Side} to `anchor`. A setter method for {@link anchor_bottom}, {@link anchor_left}, {@link anchor_right} and {@link anchor_top}.
   * If `keep_offset` is `true`, offsets aren't updated after this operation.
   * If `push_opposite_anchor` is `true` and the opposite anchor overlaps this anchor, the opposite one will have its value overridden. For example, when setting left anchor to 1 and the right anchor has value of 0.5, the right anchor will also get value of 1. If `push_opposite_anchor` was `false`, the left anchor would get value 0.5.
   */
  set_anchor(side: int, anchor: float, keep_offset?: boolean, push_opposite_anchor?: boolean): void;
  /**
   * Works the same as {@link set_anchor}, but instead of `keep_offset` argument and automatic update of offset, it allows to set the offset yourself (see {@link set_offset}).
   */
  set_anchor_and_offset(side: int, anchor: float, offset: float, push_opposite_anchor?: boolean): void;
  /**
   * Sets both anchor preset and offset preset. See {@link set_anchors_preset} and {@link set_offsets_preset}.
   */
  set_anchors_and_offsets_preset(preset: int, resize_mode: int, margin?: int): void;
  /**
   * Sets the anchors to a `preset` from {@link Control.LayoutPreset} enum. This is the code equivalent to using the Layout menu in the 2D editor.
   * If `keep_offsets` is `true`, control's position will also be updated.
   */
  set_anchors_preset(preset: int, keep_offsets?: boolean): void;
  /**
   * Sets {@link offset_left} and {@link offset_top} at the same time. Equivalent of changing {@link position}.
   */
  set_begin(position: Vector2): void;
  /**
   * Sets the given callables to be used instead of the control's own drag-and-drop virtual methods. If a callable is empty, its respective virtual method is used as normal.
   * The arguments for each callable should be exactly the same as their respective virtual methods, which would be:
   * - `drag_func` corresponds to {@link _get_drag_data} and requires a {@link Vector2};
   * - `can_drop_func` corresponds to {@link _can_drop_data} and requires both a {@link Vector2} and a {@link Variant};
   * - `drop_func` corresponds to {@link _drop_data} and requires both a {@link Vector2} and a {@link Variant}.
   */
  set_drag_forwarding(drag_func: Callable, can_drop_func: Callable, drop_func: Callable): void;
  /**
   * Shows the given control at the mouse pointer. A good time to call this method is in {@link _get_drag_data}. The control must not be in the scene tree. You should not free the control, and you should not keep a reference to the control beyond the duration of the drag. It will be deleted automatically after the drag has ended.
   */
  set_drag_preview(control: Control): void;
  /** Sets {@link offset_right} and {@link offset_bottom} at the same time. */
  set_end(position: Vector2): void;
  /**
   * Sets the focus neighbor for the specified {@link Side} to the {@link Control} at `neighbor` node path. A setter method for {@link focus_neighbor_bottom}, {@link focus_neighbor_left}, {@link focus_neighbor_right} and {@link focus_neighbor_top}.
   */
  set_focus_neighbor(side: int, neighbor: string): void;
  /**
   * Sets the {@link global_position} to given `position`.
   * If `keep_offsets` is `true`, control's anchors will be updated instead of offsets.
   */
  set_global_position(position: Vector2, keep_offsets?: boolean): void;
  /**
   * Sets the offset for the specified {@link Side} to `offset`. A setter method for {@link offset_bottom}, {@link offset_left}, {@link offset_right} and {@link offset_top}.
   */
  set_offset(side: int, offset: float): void;
  /**
   * Sets the offsets to a `preset` from {@link Control.LayoutPreset} enum. This is the code equivalent to using the Layout menu in the 2D editor.
   * Use parameter `resize_mode` with constants from {@link Control.LayoutPresetMode} to better determine the resulting size of the {@link Control}. Constant size will be ignored if used with presets that change size, e.g. {@link PRESET_LEFT_WIDE}.
   * Use parameter `margin` to determine the gap between the {@link Control} and the edges.
   */
  set_offsets_preset(preset: int, resize_mode: int, margin?: int): void;
  /**
   * Sets the {@link position} to given `position`.
   * If `keep_offsets` is `true`, control's anchors will be updated instead of offsets.
   */
  set_position(position: Vector2, keep_offsets?: boolean): void;
  /**
   * Sets the size (see {@link size}).
   * If `keep_offsets` is `true`, control's anchors will be updated instead of offsets.
   */
  set_size(size: Vector2, keep_offsets?: boolean): void;
  /**
   * Invalidates the size cache in this node and in parent nodes up to top level. Intended to be used with {@link get_minimum_size} when the return value is changed. Setting {@link custom_minimum_size} directly calls this method automatically.
   */
  update_minimum_size(): void;
  /**
   * Moves the mouse cursor to `position`, relative to {@link position} of this {@link Control}.
   * **Note:** {@link warp_mouse} is only supported on Windows, macOS and Linux. It has no effect on Android, iOS and Web.
   */
  warp_mouse(position: Vector2): void;

  /** Emitted when the node gains focus. */
  focus_entered: Signal<[]>;
  /** Emitted when the node loses focus. */
  focus_exited: Signal<[]>;
  /** Emitted when the node receives an {@link InputEvent}. */
  gui_input: Signal<[InputEvent]>;
  /** Emitted when the node's minimum size changes. */
  minimum_size_changed: Signal<[]>;
  /**
   * Emitted when the mouse cursor enters the control's (or any child control's) visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect, which Control receives the signal.
   */
  mouse_entered: Signal<[]>;
  /**
   * Emitted when the mouse cursor leaves the control's (and all child control's) visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect, which Control receives the signal.
   * **Note:** If you want to check whether the mouse truly left the area, ignoring any top nodes, you can use code like this:
   */
  mouse_exited: Signal<[]>;
  /** Emitted when the control changes size. */
  resized: Signal<[]>;
  /**
   * Emitted when one of the size flags changes. See {@link size_flags_horizontal} and {@link size_flags_vertical}.
   */
  size_flags_changed: Signal<[]>;
  /** Emitted when the {@link NOTIFICATION_THEME_CHANGED} notification is sent. */
  theme_changed: Signal<[]>;

  // enum FocusMode
  /** The node cannot grab focus. Use with {@link focus_mode}. */
  static readonly FOCUS_NONE: int;
  /** The node can only grab focus on mouse clicks. Use with {@link focus_mode}. */
  static readonly FOCUS_CLICK: int;
  /**
   * The node can grab focus on mouse click, using the arrows and the Tab keys on the keyboard, or using the D-pad buttons on a gamepad. Use with {@link focus_mode}.
   */
  static readonly FOCUS_ALL: int;
  /** The node can grab focus only when screen reader is active. Use with {@link focus_mode}. */
  static readonly FOCUS_ACCESSIBILITY: int;
  // enum FocusBehaviorRecursive
  /**
   * Inherits the {@link focus_behavior_recursive} from the parent control. If there is no parent control, this is the same as {@link FOCUS_BEHAVIOR_ENABLED}.
   */
  static readonly FOCUS_BEHAVIOR_INHERITED: int;
  /**
   * Prevents the control from getting focused. {@link get_focus_mode_with_override} will return {@link FOCUS_NONE}.
   */
  static readonly FOCUS_BEHAVIOR_DISABLED: int;
  /**
   * Allows the control to be focused, depending on the {@link focus_mode}. This can be used to ignore the parent's {@link focus_behavior_recursive}. {@link get_focus_mode_with_override} will return the {@link focus_mode}.
   */
  static readonly FOCUS_BEHAVIOR_ENABLED: int;
  // enum MouseBehaviorRecursive
  /**
   * Inherits the {@link mouse_behavior_recursive} from the parent control. If there is no parent control, this is the same as {@link MOUSE_BEHAVIOR_ENABLED}.
   */
  static readonly MOUSE_BEHAVIOR_INHERITED: int;
  /**
   * Prevents the control from receiving mouse input. {@link get_mouse_filter_with_override} will return {@link MOUSE_FILTER_IGNORE}.
   */
  static readonly MOUSE_BEHAVIOR_DISABLED: int;
  /**
   * Allows the control to receive mouse input, depending on the {@link mouse_filter}. This can be used to ignore the parent's {@link mouse_behavior_recursive}. {@link get_mouse_filter_with_override} will return the {@link mouse_filter}.
   */
  static readonly MOUSE_BEHAVIOR_ENABLED: int;
  // enum CursorShape
  /**
   * Show the system's arrow mouse cursor when the user hovers the node. Use with {@link mouse_default_cursor_shape}.
   */
  static readonly CURSOR_ARROW: int;
  /**
   * Show the system's I-beam mouse cursor when the user hovers the node. The I-beam pointer has a shape similar to "I". It tells the user they can highlight or insert text.
   */
  static readonly CURSOR_IBEAM: int;
  /** Show the system's pointing hand mouse cursor when the user hovers the node. */
  static readonly CURSOR_POINTING_HAND: int;
  /** Show the system's cross mouse cursor when the user hovers the node. */
  static readonly CURSOR_CROSS: int;
  /** Show the system's wait mouse cursor when the user hovers the node. Often an hourglass. */
  static readonly CURSOR_WAIT: int;
  /**
   * Show the system's busy mouse cursor when the user hovers the node. Often an arrow with a small hourglass.
   */
  static readonly CURSOR_BUSY: int;
  /**
   * Show the system's drag mouse cursor, often a closed fist or a cross symbol, when the user hovers the node. It tells the user they're currently dragging an item, like a node in the Scene dock.
   */
  static readonly CURSOR_DRAG: int;
  /**
   * Show the system's drop mouse cursor when the user hovers the node. It can be an open hand. It tells the user they can drop an item they're currently grabbing, like a node in the Scene dock.
   */
  static readonly CURSOR_CAN_DROP: int;
  /** Show the system's forbidden mouse cursor when the user hovers the node. Often a crossed circle. */
  static readonly CURSOR_FORBIDDEN: int;
  /**
   * Show the system's vertical resize mouse cursor when the user hovers the node. A double-headed vertical arrow. It tells the user they can resize the window or the panel vertically.
   */
  static readonly CURSOR_VSIZE: int;
  /**
   * Show the system's horizontal resize mouse cursor when the user hovers the node. A double-headed horizontal arrow. It tells the user they can resize the window or the panel horizontally.
   */
  static readonly CURSOR_HSIZE: int;
  /**
   * Show the system's window resize mouse cursor when the user hovers the node. The cursor is a double-headed arrow that goes from the bottom left to the top right. It tells the user they can resize the window or the panel both horizontally and vertically.
   */
  static readonly CURSOR_BDIAGSIZE: int;
  /**
   * Show the system's window resize mouse cursor when the user hovers the node. The cursor is a double-headed arrow that goes from the top left to the bottom right, the opposite of {@link CURSOR_BDIAGSIZE}. It tells the user they can resize the window or the panel both horizontally and vertically.
   */
  static readonly CURSOR_FDIAGSIZE: int;
  /**
   * Show the system's move mouse cursor when the user hovers the node. It shows 2 double-headed arrows at a 90 degree angle. It tells the user they can move a UI element freely.
   */
  static readonly CURSOR_MOVE: int;
  /**
   * Show the system's vertical split mouse cursor when the user hovers the node. On Windows, it's the same as {@link CURSOR_VSIZE}.
   */
  static readonly CURSOR_VSPLIT: int;
  /**
   * Show the system's horizontal split mouse cursor when the user hovers the node. On Windows, it's the same as {@link CURSOR_HSIZE}.
   */
  static readonly CURSOR_HSPLIT: int;
  /** Show the system's help mouse cursor when the user hovers the node, a question mark. */
  static readonly CURSOR_HELP: int;
  // enum LayoutPreset
  /**
   * Snap all 4 anchors to the top-left of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_TOP_LEFT: int;
  /**
   * Snap all 4 anchors to the top-right of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_TOP_RIGHT: int;
  /**
   * Snap all 4 anchors to the bottom-left of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_BOTTOM_LEFT: int;
  /**
   * Snap all 4 anchors to the bottom-right of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_BOTTOM_RIGHT: int;
  /**
   * Snap all 4 anchors to the center of the left edge of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_CENTER_LEFT: int;
  /**
   * Snap all 4 anchors to the center of the top edge of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_CENTER_TOP: int;
  /**
   * Snap all 4 anchors to the center of the right edge of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_CENTER_RIGHT: int;
  /**
   * Snap all 4 anchors to the center of the bottom edge of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_CENTER_BOTTOM: int;
  /**
   * Snap all 4 anchors to the center of the parent control's bounds. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_CENTER: int;
  /**
   * Snap all 4 anchors to the left edge of the parent control. The left offset becomes relative to the left edge and the top offset relative to the top left corner of the node's parent. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_LEFT_WIDE: int;
  /**
   * Snap all 4 anchors to the top edge of the parent control. The left offset becomes relative to the top left corner, the top offset relative to the top edge, and the right offset relative to the top right corner of the node's parent. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_TOP_WIDE: int;
  /**
   * Snap all 4 anchors to the right edge of the parent control. The right offset becomes relative to the right edge and the top offset relative to the top right corner of the node's parent. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_RIGHT_WIDE: int;
  /**
   * Snap all 4 anchors to the bottom edge of the parent control. The left offset becomes relative to the bottom left corner, the bottom offset relative to the bottom edge, and the right offset relative to the bottom right corner of the node's parent. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_BOTTOM_WIDE: int;
  /**
   * Snap all 4 anchors to a vertical line that cuts the parent control in half. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_VCENTER_WIDE: int;
  /**
   * Snap all 4 anchors to a horizontal line that cuts the parent control in half. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_HCENTER_WIDE: int;
  /**
   * Snap all 4 anchors to the respective corners of the parent control. Set all 4 offsets to 0 after you applied this preset and the {@link Control} will fit its parent control. Use with {@link set_anchors_preset}.
   */
  static readonly PRESET_FULL_RECT: int;
  // enum LayoutPresetMode
  /** The control will be resized to its minimum size. */
  static readonly PRESET_MODE_MINSIZE: int;
  /** The control's width will not change. */
  static readonly PRESET_MODE_KEEP_WIDTH: int;
  /** The control's height will not change. */
  static readonly PRESET_MODE_KEEP_HEIGHT: int;
  /** The control's size will not change. */
  static readonly PRESET_MODE_KEEP_SIZE: int;
  // enum SizeFlags
  /**
   * Tells the parent {@link Container} to align the node with its start, either the top or the left edge. It is mutually exclusive with {@link SIZE_FILL} and other shrink size flags, but can be used with {@link SIZE_EXPAND} in some containers. Use with {@link size_flags_horizontal} and {@link size_flags_vertical}.
   * **Note:** Setting this flag is equal to not having any size flags.
   */
  static readonly SIZE_SHRINK_BEGIN: int;
  /**
   * Tells the parent {@link Container} to expand the bounds of this node to fill all the available space without pushing any other node. It is mutually exclusive with shrink size flags. Use with {@link size_flags_horizontal} and {@link size_flags_vertical}.
   */
  static readonly SIZE_FILL: int;
  /**
   * Tells the parent {@link Container} to let this node take all the available space on the axis you flag. If multiple neighboring nodes are set to expand, they'll share the space based on their stretch ratio. See {@link size_flags_stretch_ratio}. Use with {@link size_flags_horizontal} and {@link size_flags_vertical}.
   */
  static readonly SIZE_EXPAND: int;
  /**
   * Sets the node's size flags to both fill and expand. See {@link SIZE_FILL} and {@link SIZE_EXPAND} for more information.
   */
  static readonly SIZE_EXPAND_FILL: int;
  /**
   * Tells the parent {@link Container} to center the node in the available space. It is mutually exclusive with {@link SIZE_FILL} and other shrink size flags, but can be used with {@link SIZE_EXPAND} in some containers. Use with {@link size_flags_horizontal} and {@link size_flags_vertical}.
   */
  static readonly SIZE_SHRINK_CENTER: int;
  /**
   * Tells the parent {@link Container} to align the node with its end, either the bottom or the right edge. It is mutually exclusive with {@link SIZE_FILL} and other shrink size flags, but can be used with {@link SIZE_EXPAND} in some containers. Use with {@link size_flags_horizontal} and {@link size_flags_vertical}.
   */
  static readonly SIZE_SHRINK_END: int;
  // enum MouseFilter
  /**
   * The control will receive mouse movement input events and mouse button input events if clicked on through {@link _gui_input}. The control will also receive the {@link mouse_entered} and {@link mouse_exited} signals. These events are automatically marked as handled, and they will not propagate further to other controls. This also results in blocking signals in other controls.
   */
  static readonly MOUSE_FILTER_STOP: int;
  /**
   * The control will receive mouse movement input events and mouse button input events if clicked on through {@link _gui_input}. The control will also receive the {@link mouse_entered} and {@link mouse_exited} signals.
   * If this control does not handle the event, the event will propagate up to its parent control if it has one. The event is bubbled up the node hierarchy until it reaches a non-{@link CanvasItem}, a control with {@link MOUSE_FILTER_STOP}, or a {@link CanvasItem} with {@link CanvasItem.top_level} enabled. This will allow signals to fire in all controls it reaches. If no control handled it, the event will be passed to {@link Node._shortcut_input} for further processing.
   */
  static readonly MOUSE_FILTER_PASS: int;
  /**
   * The control will not receive any mouse movement input events nor mouse button input events through {@link _gui_input}. The control will also not receive the {@link mouse_entered} nor {@link mouse_exited} signals. This will not block other controls from receiving these events or firing the signals. Ignored events will not be handled automatically. If a child has {@link MOUSE_FILTER_PASS} and an event was passed to this control, the event will further propagate up to the control's parent.
   * **Note:** If the control has received {@link mouse_entered} but not {@link mouse_exited}, changing the {@link mouse_filter} to {@link MOUSE_FILTER_IGNORE} will cause {@link mouse_exited} to be emitted.
   */
  static readonly MOUSE_FILTER_IGNORE: int;
  // enum GrowDirection
  /**
   * The control will grow to the left or top to make up if its minimum size is changed to be greater than its current size on the respective axis.
   */
  static readonly GROW_DIRECTION_BEGIN: int;
  /**
   * The control will grow to the right or bottom to make up if its minimum size is changed to be greater than its current size on the respective axis.
   */
  static readonly GROW_DIRECTION_END: int;
  /**
   * The control will grow in both directions equally to make up if its minimum size is changed to be greater than its current size.
   */
  static readonly GROW_DIRECTION_BOTH: int;
  // enum Anchor
  /**
   * Snaps one of the 4 anchor's sides to the origin of the node's `Rect`, in the top left. Use it with one of the `anchor_*` member variables, like {@link anchor_left}. To change all 4 anchors at once, use {@link set_anchors_preset}.
   */
  static readonly ANCHOR_BEGIN: int;
  /**
   * Snaps one of the 4 anchor's sides to the end of the node's `Rect`, in the bottom right. Use it with one of the `anchor_*` member variables, like {@link anchor_left}. To change all 4 anchors at once, use {@link set_anchors_preset}.
   */
  static readonly ANCHOR_END: int;
  // enum LayoutDirection
  /** Automatic layout direction, determined from the parent control layout direction. */
  static readonly LAYOUT_DIRECTION_INHERITED: int;
  /**
   * Automatic layout direction, determined from the current locale. Right-to-left layout direction is automatically used for languages that require it such as Arabic and Hebrew, but only if a valid translation file is loaded for the given language (unless said language is configured as a fallback in {@link ProjectSettings.internationalization/locale/fallback}). For all other languages (or if no valid translation file is found by Godot), left-to-right layout direction is used. If using {@link TextServerFallback} ({@link ProjectSettings.internationalization/rendering/text_driver}), left-to-right layout direction is always used regardless of the language. Right-to-left layout direction can also be forced using {@link ProjectSettings.internationalization/rendering/force_right_to_left_layout_direction}.
   */
  static readonly LAYOUT_DIRECTION_APPLICATION_LOCALE: int;
  /** Left-to-right layout direction. */
  static readonly LAYOUT_DIRECTION_LTR: int;
  /** Right-to-left layout direction. */
  static readonly LAYOUT_DIRECTION_RTL: int;
  /**
   * Automatic layout direction, determined from the system locale. Right-to-left layout direction is automatically used for languages that require it such as Arabic and Hebrew, but only if a valid translation file is loaded for the given language. For all other languages (or if no valid translation file is found by Godot), left-to-right layout direction is used. If using {@link TextServerFallback} ({@link ProjectSettings.internationalization/rendering/text_driver}), left-to-right layout direction is always used regardless of the language.
   */
  static readonly LAYOUT_DIRECTION_SYSTEM_LOCALE: int;
  /** Represents the size of the {@link LayoutDirection} enum. */
  static readonly LAYOUT_DIRECTION_MAX: int;
  static readonly LAYOUT_DIRECTION_LOCALE: int;
  // enum TextDirection
  /** Text writing direction is the same as layout direction. */
  static readonly TEXT_DIRECTION_INHERITED: int;
  /** Automatic text writing direction, determined from the current locale and text content. */
  static readonly TEXT_DIRECTION_AUTO: int;
  /** Left-to-right text writing direction. */
  static readonly TEXT_DIRECTION_LTR: int;
  /** Right-to-left text writing direction. */
  static readonly TEXT_DIRECTION_RTL: int;

  /** Sent when the node changes size. Use {@link size} to get the new size. */
  static readonly NOTIFICATION_RESIZED: int;
  /**
   * Sent when the mouse cursor enters the control's (or any child control's) visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect which Control receives the notification.
   * See also {@link NOTIFICATION_MOUSE_ENTER_SELF}.
   */
  static readonly NOTIFICATION_MOUSE_ENTER: int;
  /**
   * Sent when the mouse cursor leaves the control's (and all child control's) visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect which Control receives the notification.
   * See also {@link NOTIFICATION_MOUSE_EXIT_SELF}.
   */
  static readonly NOTIFICATION_MOUSE_EXIT: int;
  /**
   * Sent when the mouse cursor enters the control's visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect which Control receives the notification.
   * See also {@link NOTIFICATION_MOUSE_ENTER}.
   */
  static readonly NOTIFICATION_MOUSE_ENTER_SELF: int;
  /**
   * Sent when the mouse cursor leaves the control's visible area, that is not occluded behind other Controls or Windows, provided its {@link mouse_filter} lets the event reach it and regardless if it's currently focused or not.
   * **Note:** {@link CanvasItem.z_index} doesn't affect which Control receives the notification.
   * See also {@link NOTIFICATION_MOUSE_EXIT}.
   */
  static readonly NOTIFICATION_MOUSE_EXIT_SELF: int;
  /** Sent when the node grabs focus. */
  static readonly NOTIFICATION_FOCUS_ENTER: int;
  /**
   * Sent when the node loses focus.
   * This notification is sent in reversed order.
   */
  static readonly NOTIFICATION_FOCUS_EXIT: int;
  /**
   * Sent when the node needs to refresh its theme items. This happens in one of the following cases:
   * - The {@link theme} property is changed on this node or any of its ancestors.
   * - The {@link theme_type_variation} property is changed on this node.
   * - One of the node's theme property overrides is changed.
   * - The node enters the scene tree.
   * **Note:** As an optimization, this notification won't be sent from changes that occur while this node is outside of the scene tree. Instead, all of the theme item updates can be applied at once when the node enters the scene tree.
   * **Note:** This notification is received alongside {@link Node.NOTIFICATION_ENTER_TREE}, so if you are instantiating a scene, the child nodes will not be initialized yet. You can use it to setup theming for this node, child nodes created from script, or if you want to access child nodes added in the editor, make sure the node is ready using {@link Node.is_node_ready}.
   */
  static readonly NOTIFICATION_THEME_CHANGED: int;
  /**
   * Sent when this node is inside a {@link ScrollContainer} which has begun being scrolled when dragging the scrollable area *with a touch event*. This notification is *not* sent when scrolling by dragging the scrollbar, scrolling with the mouse wheel or scrolling with keyboard/gamepad events.
   * **Note:** This signal is only emitted on Android or iOS, or on desktop/web platforms when {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse} is enabled.
   */
  static readonly NOTIFICATION_SCROLL_BEGIN: int;
  /**
   * Sent when this node is inside a {@link ScrollContainer} which has stopped being scrolled when dragging the scrollable area *with a touch event*. This notification is *not* sent when scrolling by dragging the scrollbar, scrolling with the mouse wheel or scrolling with keyboard/gamepad events.
   * **Note:** This signal is only emitted on Android or iOS, or on desktop/web platforms when {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse} is enabled.
   */
  static readonly NOTIFICATION_SCROLL_END: int;
  /**
   * Sent when the control layout direction is changed from LTR or RTL or vice versa. This notification is propagated to child Control nodes as result of a change to {@link layout_direction}.
   */
  static readonly NOTIFICATION_LAYOUT_DIRECTION_CHANGED: int;
}
