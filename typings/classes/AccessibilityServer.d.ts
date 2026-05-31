// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A server interface for screen reader support. */
declare interface AccessibilityServer extends GodotObject {
  /**
   * Creates a new, empty accessibility element resource.
   * **Note:** An accessibility element is created and freed automatically for each {@link Node}. In general, this function should not be called manually.
   */
  create_element(window_id: int, role: int): RID;
  /**
   * Creates a new, empty accessibility sub-element resource. Sub-elements can be used to provide accessibility information for objects which are not {@link Node}s, such as list items, table cells, or menu items. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the {@link free_element} method.
   */
  create_sub_element(parent_rid: RID, role: int, insert_pos?: int): RID;
  /**
   * Creates a new, empty accessibility sub-element from the shaped text buffer. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the {@link free_element} method.
   * If `is_last_line` is `true`, no trailing newline is appended to the text content. Set to `true` for the last line in multi-line text fields and for single-line text fields.
   */
  create_sub_text_edit_elements(parent_rid: RID, shaped_text: RID, min_height: float, insert_pos?: int, is_last_line?: boolean): RID;
  /** Returns the metadata of the accessibility element `id`. */
  element_get_meta(id: RID): unknown;
  /** Sets the metadata of the accessibility element `id` to `meta`. */
  element_set_meta(id: RID, meta: unknown): void;
  /**
   * Frees the accessibility element `id` created by {@link create_element}, {@link create_sub_element}, or {@link create_sub_text_edit_elements}.
   */
  free_element(id: RID): void;
  /** Returns the main accessibility element of the OS native window. */
  get_window_root(window_id: int): RID;
  /** Returns `true` if `id` is a valid accessibility element. */
  has_element(id: RID): boolean;
  /** Returns `true` if screen reader is support by this implementation. */
  is_supported(): boolean;
  /**
   * Sets the window focused state for assistive apps.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Advanced users only! {@link Window} objects call this method automatically.
   */
  set_window_focused(window_id: int, focused: boolean): void;
  /**
   * Sets window outer (with decorations) and inner (without decorations) bounds for assistive apps.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Advanced users only! {@link Window} objects call this method automatically.
   */
  set_window_rect(window_id: int, rect_out: Rect2 | Rect2i, rect_in: Rect2 | Rect2i): void;
  /**
   * Adds a callback for the accessibility action (action which can be performed by using a special screen reader command or buttons on the Braille display), and marks this action as supported. The action callback receives one {@link Variant} argument, which value depends on action type.
   */
  update_add_action(id: RID, action: int, callable: Callable): void;
  /**
   * Adds a child accessibility element.
   * **Note:** {@link Node} children and sub-elements are added to the child list automatically.
   */
  update_add_child(id: RID, child_id: RID): void;
  /**
   * Adds support for a custom accessibility action. `action_id` is passed as an argument to the callback of {@link ACTION_CUSTOM} action.
   */
  update_add_custom_action(id: RID, action_id: int, action_description: string | NodePath): void;
  /** Adds an element that is controlled by this element. */
  update_add_related_controls(id: RID, related_id: RID): void;
  /** Adds an element that describes this element. */
  update_add_related_described_by(id: RID, related_id: RID): void;
  /** Adds an element that details this element. */
  update_add_related_details(id: RID, related_id: RID): void;
  /** Adds an element that this element flow into. */
  update_add_related_flow_to(id: RID, related_id: RID): void;
  /** Adds an element that labels this element. */
  update_add_related_labeled_by(id: RID, related_id: RID): void;
  /**
   * Adds an element that is part of the same radio group.
   * **Note:** This method should be called on each element of the group, using all other elements as `related_id`.
   */
  update_add_related_radio_group(id: RID, related_id: RID): void;
  /** Adds an element that is an active descendant of this element. */
  update_set_active_descendant(id: RID, other_id: RID): void;
  /** Sets element background color. */
  update_set_background_color(id: RID, color: Color): void;
  /** Sets element bounding box, relative to the node position. */
  update_set_bounds(id: RID, p_rect: Rect2 | Rect2i): void;
  /** Sets element accessibility label for Braille display. */
  update_set_braille_label(id: RID, name: string | NodePath): void;
  /** Sets element accessibility role description for Braille display. */
  update_set_braille_role_description(id: RID, description: string | NodePath): void;
  /** Sets element checked state. */
  update_set_checked(id: RID, checekd: boolean): void;
  /** Sets element class name. */
  update_set_classname(id: RID, classname: string | NodePath): void;
  /** Sets element color value. */
  update_set_color_value(id: RID, color: Color): void;
  /** Sets element accessibility description. */
  update_set_description(id: RID, description: string | NodePath): void;
  /** Sets an element which contains an error message for this element. */
  update_set_error_message(id: RID, other_id: RID): void;
  /** Sets element accessibility extra information added to the element name. */
  update_set_extra_info(id: RID, name: string | NodePath): void;
  /** Sets element flag. */
  update_set_flag(id: RID, flag: int, value: boolean): void;
  /** Sets currently focused element. */
  update_set_focus(id: RID): void;
  /** Sets element foreground color. */
  update_set_foreground_color(id: RID, color: Color): void;
  /** Sets target element for the link. */
  update_set_in_page_link_target(id: RID, other_id: RID): void;
  /** Sets element text language. */
  update_set_language(id: RID, language: string | NodePath): void;
  /** Sets number of items in the list. */
  update_set_list_item_count(id: RID, size: int): void;
  /** Sets list/tree item expanded status. */
  update_set_list_item_expanded(id: RID, expanded: boolean): void;
  /** Sets the position of the element in the list. */
  update_set_list_item_index(id: RID, index: int): void;
  /** Sets the hierarchical level of the element in the list. */
  update_set_list_item_level(id: RID, level: int): void;
  /** Sets list/tree item selected status. */
  update_set_list_item_selected(id: RID, selected: boolean): void;
  /** Sets the orientation of the list elements. */
  update_set_list_orientation(id: RID, vertical: boolean): void;
  /** Sets the priority of the live region updates. */
  update_set_live(id: RID, live: int): void;
  /** Sets the element to be a member of the group. */
  update_set_member_of(id: RID, group_id: RID): void;
  /** Sets element accessibility name. */
  update_set_name(id: RID, name: string | NodePath): void;
  /** Sets next element on the line. */
  update_set_next_on_line(id: RID, other_id: RID): void;
  /** Sets numeric value jump. */
  update_set_num_jump(id: RID, jump: float): void;
  /** Sets numeric value range. */
  update_set_num_range(id: RID, min: float, max: float): void;
  /** Sets numeric value step. */
  update_set_num_step(id: RID, step: float): void;
  /** Sets numeric value. */
  update_set_num_value(id: RID, position: float): void;
  /** Sets placeholder text. */
  update_set_placeholder(id: RID, placeholder: string | NodePath): void;
  /** Sets popup type for popup buttons. */
  update_set_popup_type(id: RID, popup: int): void;
  /** Sets previous element on the line. */
  update_set_previous_on_line(id: RID, other_id: RID): void;
  /** Sets element accessibility role. */
  update_set_role(id: RID, role: int): void;
  /** Sets element accessibility role description text. */
  update_set_role_description(id: RID, description: string | NodePath): void;
  /** Sets scroll bar x position. */
  update_set_scroll_x(id: RID, position: float): void;
  /** Sets scroll bar x range. */
  update_set_scroll_x_range(id: RID, min: float, max: float): void;
  /** Sets scroll bar y position. */
  update_set_scroll_y(id: RID, position: float): void;
  /** Sets scroll bar y range. */
  update_set_scroll_y_range(id: RID, min: float, max: float): void;
  /** Sets the list of keyboard shortcuts used by element. */
  update_set_shortcut(id: RID, shortcut: string | NodePath): void;
  /** Sets human-readable description of the current checked state. */
  update_set_state_description(id: RID, description: string | NodePath): void;
  /** Sets cell position in the table. */
  update_set_table_cell_position(id: RID, row_index: int, column_index: int): void;
  /** Sets cell row/column span. */
  update_set_table_cell_span(id: RID, row_span: int, column_span: int): void;
  /** Sets number of columns in the table. */
  update_set_table_column_count(id: RID, count: int): void;
  /** Sets position of the column. */
  update_set_table_column_index(id: RID, index: int): void;
  /** Sets number of rows in the table. */
  update_set_table_row_count(id: RID, count: int): void;
  /** Sets position of the row in the table. */
  update_set_table_row_index(id: RID, index: int): void;
  /** Sets element text alignment. */
  update_set_text_align(id: RID, align: int): void;
  /** Sets text underline/overline/strikethrough. */
  update_set_text_decorations(id: RID, underline: boolean, strikethrough: boolean, overline: boolean, color?: Color): void;
  /** Sets text orientation. */
  update_set_text_orientation(id: RID, vertical: boolean): void;
  /**
   * Sets text selection to the text field. `text_start_id` and `text_end_id` should be elements created by {@link create_sub_text_edit_elements}. Character offsets are relative to the corresponding element.
   */
  update_set_text_selection(id: RID, text_start_id: RID, start_char: int, text_end_id: RID, end_char: int): void;
  /** Sets tooltip text. */
  update_set_tooltip(id: RID, tooltip: string | NodePath): void;
  /** Sets element 2D transform. */
  update_set_transform(id: RID, transform: Transform2D): void;
  /** Sets link URL. */
  update_set_url(id: RID, url: string | NodePath): void;
  /** Sets element text value. */
  update_set_value(id: RID, value: string | NodePath): void;

  // enum AccessibilityRole
  /** Unknown or custom role. */
  readonly ROLE_UNKNOWN: int;
  /** Default dialog button element. */
  readonly ROLE_DEFAULT_BUTTON: int;
  /** Audio player element. */
  readonly ROLE_AUDIO: int;
  /** Video player element. */
  readonly ROLE_VIDEO: int;
  /** Non-editable text label. */
  readonly ROLE_STATIC_TEXT: int;
  /**
   * Container element. Elements with this role are used for internal structure and ignored by screen readers.
   */
  readonly ROLE_CONTAINER: int;
  /** Panel container element. */
  readonly ROLE_PANEL: int;
  /** Button element. */
  readonly ROLE_BUTTON: int;
  /** Link element. */
  readonly ROLE_LINK: int;
  /** Check box element. */
  readonly ROLE_CHECK_BOX: int;
  /** Radio button element. */
  readonly ROLE_RADIO_BUTTON: int;
  /** Check button element. */
  readonly ROLE_CHECK_BUTTON: int;
  /** Scroll bar element. */
  readonly ROLE_SCROLL_BAR: int;
  /** Scroll container element. */
  readonly ROLE_SCROLL_VIEW: int;
  /** Container splitter handle element. */
  readonly ROLE_SPLITTER: int;
  /** Slider element. */
  readonly ROLE_SLIDER: int;
  /** Spin box element. */
  readonly ROLE_SPIN_BUTTON: int;
  /** Progress indicator element. */
  readonly ROLE_PROGRESS_INDICATOR: int;
  /** Editable text field element. */
  readonly ROLE_TEXT_FIELD: int;
  /** Multiline editable text field element. */
  readonly ROLE_MULTILINE_TEXT_FIELD: int;
  /** Color picker element. */
  readonly ROLE_COLOR_PICKER: int;
  /** Table element. */
  readonly ROLE_TABLE: int;
  /** Table/tree cell element. */
  readonly ROLE_CELL: int;
  /** Table/tree row element. */
  readonly ROLE_ROW: int;
  /** Table/tree row group element. */
  readonly ROLE_ROW_GROUP: int;
  /** Table/tree row header element. */
  readonly ROLE_ROW_HEADER: int;
  /** Table/tree column header element. */
  readonly ROLE_COLUMN_HEADER: int;
  /** Tree view element. */
  readonly ROLE_TREE: int;
  /** Tree view item element. */
  readonly ROLE_TREE_ITEM: int;
  /** List element. */
  readonly ROLE_LIST: int;
  /** List item element. */
  readonly ROLE_LIST_ITEM: int;
  /** List view element. */
  readonly ROLE_LIST_BOX: int;
  /** List view item element. */
  readonly ROLE_LIST_BOX_OPTION: int;
  /** Tab bar element. */
  readonly ROLE_TAB_BAR: int;
  /** Tab bar item element. */
  readonly ROLE_TAB: int;
  /** Tab panel element. */
  readonly ROLE_TAB_PANEL: int;
  /** Menu bar element. */
  readonly ROLE_MENU_BAR: int;
  /** Popup menu element. */
  readonly ROLE_MENU: int;
  /** Popup menu item element. */
  readonly ROLE_MENU_ITEM: int;
  /** Popup menu check button item element. */
  readonly ROLE_MENU_ITEM_CHECK_BOX: int;
  /** Popup menu radio button item element. */
  readonly ROLE_MENU_ITEM_RADIO: int;
  /** Image element. */
  readonly ROLE_IMAGE: int;
  /** Window element. */
  readonly ROLE_WINDOW: int;
  /** Embedded window title bar element. */
  readonly ROLE_TITLE_BAR: int;
  /** Dialog window element. */
  readonly ROLE_DIALOG: int;
  /** Tooltip element. */
  readonly ROLE_TOOLTIP: int;
  /** Region/landmark element. Screen readers can navigate between regions using landmark navigation. */
  readonly ROLE_REGION: int;
  /**
   * Unifor text run.
   * Note: This role is used for internal text elements, and should not be assigned to nodes.
   */
  readonly ROLE_TEXT_RUN: int;
  // enum AccessibilityPopupType
  /** Popup menu. */
  readonly POPUP_MENU: int;
  /** Popup list. */
  readonly POPUP_LIST: int;
  /** Popup tree view. */
  readonly POPUP_TREE: int;
  /** Popup dialog. */
  readonly POPUP_DIALOG: int;
  // enum AccessibilityFlags
  /** Element is hidden for accessibility tools. */
  readonly FLAG_HIDDEN: int;
  /** Element supports multiple item selection. */
  readonly FLAG_MULTISELECTABLE: int;
  /** Element require user input. */
  readonly FLAG_REQUIRED: int;
  /** Element is a visited link. */
  readonly FLAG_VISITED: int;
  /** Element content is not ready (e.g. loading). */
  readonly FLAG_BUSY: int;
  /** Element is modal window. */
  readonly FLAG_MODAL: int;
  /** Element allows touches to be passed through when a screen reader is in touch exploration mode. */
  readonly FLAG_TOUCH_PASSTHROUGH: int;
  /** Element is text field with selectable but read-only text. */
  readonly FLAG_READONLY: int;
  /** Element is disabled. */
  readonly FLAG_DISABLED: int;
  /** Element clips children. */
  readonly FLAG_CLIPS_CHILDREN: int;
  // enum AccessibilityAction
  /** Single click action, callback argument is not set. */
  readonly ACTION_CLICK: int;
  /** Focus action, callback argument is not set. */
  readonly ACTION_FOCUS: int;
  /** Blur action, callback argument is not set. */
  readonly ACTION_BLUR: int;
  /** Collapse action, callback argument is not set. */
  readonly ACTION_COLLAPSE: int;
  /** Expand action, callback argument is not set. */
  readonly ACTION_EXPAND: int;
  /** Decrement action, callback argument is not set. */
  readonly ACTION_DECREMENT: int;
  /** Increment action, callback argument is not set. */
  readonly ACTION_INCREMENT: int;
  /** Hide tooltip action, callback argument is not set. */
  readonly ACTION_HIDE_TOOLTIP: int;
  /** Show tooltip action, callback argument is not set. */
  readonly ACTION_SHOW_TOOLTIP: int;
  /**
   * Set text selection action, callback argument is set to {@link Dictionary} with the following keys:
   * - `"start_element"` accessibility element of the selection start.
   * - `"start_char"` character offset relative to the accessibility element of the selection start.
   * - `"end_element"` accessibility element of the selection end.
   * - `"end_char"` character offset relative to the accessibility element of the selection end.
   */
  readonly ACTION_SET_TEXT_SELECTION: int;
  /** Replace text action, callback argument is set to {@link String} with the replacement text. */
  readonly ACTION_REPLACE_SELECTED_TEXT: int;
  /** Scroll backward action, callback argument is not set. */
  readonly ACTION_SCROLL_BACKWARD: int;
  /** Scroll down action, callback argument is set to {@link AccessibilityScrollUnit}. */
  readonly ACTION_SCROLL_DOWN: int;
  /** Scroll forward action, callback argument is not set. */
  readonly ACTION_SCROLL_FORWARD: int;
  /** Scroll left action, callback argument is set to {@link AccessibilityScrollUnit}. */
  readonly ACTION_SCROLL_LEFT: int;
  /** Scroll right action, callback argument is set to {@link AccessibilityScrollUnit}. */
  readonly ACTION_SCROLL_RIGHT: int;
  /** Scroll up action, callback argument is set to {@link AccessibilityScrollUnit}. */
  readonly ACTION_SCROLL_UP: int;
  /** Scroll into view action, callback argument is set to {@link AccessibilityScrollHint}. */
  readonly ACTION_SCROLL_INTO_VIEW: int;
  /**
   * Scroll to point action, callback argument is set to {@link Vector2} with the relative point coordinates.
   */
  readonly ACTION_SCROLL_TO_POINT: int;
  /** Set scroll offset action, callback argument is set to {@link Vector2} with the scroll offset. */
  readonly ACTION_SET_SCROLL_OFFSET: int;
  /** Set value action, callback argument is set to {@link String} or number with the new value. */
  readonly ACTION_SET_VALUE: int;
  /** Show context menu action, callback argument is not set. */
  readonly ACTION_SHOW_CONTEXT_MENU: int;
  /** Custom action, callback argument is set to the integer action ID. */
  readonly ACTION_CUSTOM: int;
  // enum AccessibilityLiveMode
  /** Indicates that updates to the live region should not be presented. */
  readonly LIVE_OFF: int;
  /**
   * Indicates that updates to the live region should be presented at the next opportunity (for example at the end of speaking the current sentence).
   */
  readonly LIVE_POLITE: int;
  /**
   * Indicates that updates to the live region have the highest priority and should be presented immediately.
   */
  readonly LIVE_ASSERTIVE: int;
  // enum AccessibilityScrollUnit
  /** The amount by which to scroll. A single item of a list, line of text. */
  readonly SCROLL_UNIT_ITEM: int;
  /** The amount by which to scroll. A single page. */
  readonly SCROLL_UNIT_PAGE: int;
  // enum AccessibilityScrollHint
  /** A preferred position for the node scrolled into view. Top-left edge of the scroll container. */
  readonly SCROLL_HINT_TOP_LEFT: int;
  /** A preferred position for the node scrolled into view. Bottom-right edge of the scroll container. */
  readonly SCROLL_HINT_BOTTOM_RIGHT: int;
  /** A preferred position for the node scrolled into view. Top edge of the scroll container. */
  readonly SCROLL_HINT_TOP_EDGE: int;
  /** A preferred position for the node scrolled into view. Bottom edge of the scroll container. */
  readonly SCROLL_HINT_BOTTOM_EDGE: int;
  /** A preferred position for the node scrolled into view. Left edge of the scroll container. */
  readonly SCROLL_HINT_LEFT_EDGE: int;
  /** A preferred position for the node scrolled into view. Right edge of the scroll container. */
  readonly SCROLL_HINT_RIGHT_EDGE: int;
}
declare const AccessibilityServer: AccessibilityServer;

