// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A server interface for low-level window management. */
declare interface DisplayServer extends GodotObject {
  /**
   * Creates a new, empty accessibility element resource.
   * **Note:** An accessibility element is created and freed automatically for each {@link Node}. In general, this function should not be called manually.
   */
  accessibility_create_element(window_id: int, role: int): RID;
  /**
   * Creates a new, empty accessibility sub-element resource. Sub-elements can be used to provide accessibility information for objects which are not {@link Node}s, such as list items, table cells, or menu items. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the {@link accessibility_free_element} method.
   */
  accessibility_create_sub_element(parent_rid: RID, role: int, insert_pos?: int): RID;
  /**
   * Creates a new, empty accessibility sub-element from the shaped text buffer. Sub-elements are freed automatically when the parent element is freed, or can be freed early using the {@link accessibility_free_element} method.
   * If `is_last_line` is `true`, no trailing newline is appended to the text content. Set to `true` for the last line in multi-line text fields and for single-line text fields.
   */
  accessibility_create_sub_text_edit_elements(parent_rid: RID, shaped_text: RID, min_height: float, insert_pos?: int, is_last_line?: boolean): RID;
  /** Returns the metadata of the accessibility element `id`. */
  accessibility_element_get_meta(id: RID): unknown;
  /** Sets the metadata of the accessibility element `id` to `meta`. */
  accessibility_element_set_meta(id: RID, meta: unknown): void;
  /**
   * Frees the accessibility element `id` created by {@link accessibility_create_element}, {@link accessibility_create_sub_element}, or {@link accessibility_create_sub_text_edit_elements}.
   */
  accessibility_free_element(id: RID): void;
  /** Returns the main accessibility element of the OS native window. */
  accessibility_get_window_root(window_id: int): RID;
  /** Returns `true` if `id` is a valid accessibility element. */
  accessibility_has_element(id: RID): boolean;
  /**
   * Returns `1` if a screen reader, Braille display or other assistive app is active, `0` otherwise. Returns `-1` if status is unknown.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Accessibility debugging tools, such as Accessibility Insights for Windows, Accessibility Inspector (macOS), or AT-SPI Browser (Linux/BSD), do not count as assistive apps and will not affect this value. To test your project with these tools, set {@link ProjectSettings.accessibility/general/accessibility_support} to `1`.
   */
  accessibility_screen_reader_active(): int;
  /**
   * Sets the window focused state for assistive apps.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Advanced users only! {@link Window} objects call this method automatically.
   */
  accessibility_set_window_focused(window_id: int, focused: boolean): void;
  /**
   * Sets window outer (with decorations) and inner (without decorations) bounds for assistive apps.
   * **Note:** This method is implemented on Linux, macOS, and Windows.
   * **Note:** Advanced users only! {@link Window} objects call this method automatically.
   */
  accessibility_set_window_rect(window_id: int, rect_out: Rect2 | Rect2i, rect_in: Rect2 | Rect2i): void;
  /**
   * Returns `1` if a high-contrast user interface theme should be used, `0` otherwise. Returns `-1` if status is unknown.
   * **Note:** This method is implemented on Linux (X11/Wayland, GNOME), macOS, and Windows.
   */
  accessibility_should_increase_contrast(): int;
  /**
   * Returns `1` if flashing, blinking, and other moving content that can cause seizures in users with photosensitive epilepsy should be disabled, `0` otherwise. Returns `-1` if status is unknown.
   * **Note:** This method is implemented on macOS and Windows.
   */
  accessibility_should_reduce_animation(): int;
  /**
   * Returns `1` if background images, transparency, and other features that can reduce the contrast between the foreground and background should be disabled, `0` otherwise. Returns `-1` if status is unknown.
   * **Note:** This method is implemented on macOS and Windows.
   */
  accessibility_should_reduce_transparency(): int;
  /**
   * Adds a callback for the accessibility action (action which can be performed by using a special screen reader command or buttons on the Braille display), and marks this action as supported. The action callback receives one {@link Variant} argument, which value depends on action type.
   */
  accessibility_update_add_action(id: RID, action: int, callable: Callable): void;
  /**
   * Adds a child accessibility element.
   * **Note:** {@link Node} children and sub-elements are added to the child list automatically.
   */
  accessibility_update_add_child(id: RID, child_id: RID): void;
  /**
   * Adds support for a custom accessibility action. `action_id` is passed as an argument to the callback of {@link ACTION_CUSTOM} action.
   */
  accessibility_update_add_custom_action(id: RID, action_id: int, action_description: string | NodePath): void;
  /** Adds an element that is controlled by this element. */
  accessibility_update_add_related_controls(id: RID, related_id: RID): void;
  /** Adds an element that describes this element. */
  accessibility_update_add_related_described_by(id: RID, related_id: RID): void;
  /** Adds an element that details this element. */
  accessibility_update_add_related_details(id: RID, related_id: RID): void;
  /** Adds an element that this element flow into. */
  accessibility_update_add_related_flow_to(id: RID, related_id: RID): void;
  /** Adds an element that labels this element. */
  accessibility_update_add_related_labeled_by(id: RID, related_id: RID): void;
  /**
   * Adds an element that is part of the same radio group.
   * **Note:** This method should be called on each element of the group, using all other elements as `related_id`.
   */
  accessibility_update_add_related_radio_group(id: RID, related_id: RID): void;
  /** Adds an element that is an active descendant of this element. */
  accessibility_update_set_active_descendant(id: RID, other_id: RID): void;
  /** Sets element background color. */
  accessibility_update_set_background_color(id: RID, color: Color): void;
  /** Sets element bounding box, relative to the node position. */
  accessibility_update_set_bounds(id: RID, p_rect: Rect2 | Rect2i): void;
  /** Sets element checked state. */
  accessibility_update_set_checked(id: RID, checekd: boolean): void;
  /** Sets element class name. */
  accessibility_update_set_classname(id: RID, classname: string | NodePath): void;
  /** Sets element color value. */
  accessibility_update_set_color_value(id: RID, color: Color): void;
  /** Sets element accessibility description. */
  accessibility_update_set_description(id: RID, description: string | NodePath): void;
  /** Sets an element which contains an error message for this element. */
  accessibility_update_set_error_message(id: RID, other_id: RID): void;
  /** Sets element accessibility extra information added to the element name. */
  accessibility_update_set_extra_info(id: RID, name: string | NodePath): void;
  /** Sets element flag. */
  accessibility_update_set_flag(id: RID, flag: int, value: boolean): void;
  /** Sets currently focused element. */
  accessibility_update_set_focus(id: RID): void;
  /** Sets element foreground color. */
  accessibility_update_set_foreground_color(id: RID, color: Color): void;
  /** Sets target element for the link. */
  accessibility_update_set_in_page_link_target(id: RID, other_id: RID): void;
  /** Sets element text language. */
  accessibility_update_set_language(id: RID, language: string | NodePath): void;
  /** Sets number of items in the list. */
  accessibility_update_set_list_item_count(id: RID, size: int): void;
  /** Sets list/tree item expanded status. */
  accessibility_update_set_list_item_expanded(id: RID, expanded: boolean): void;
  /** Sets the position of the element in the list. */
  accessibility_update_set_list_item_index(id: RID, index: int): void;
  /** Sets the hierarchical level of the element in the list. */
  accessibility_update_set_list_item_level(id: RID, level: int): void;
  /** Sets list/tree item selected status. */
  accessibility_update_set_list_item_selected(id: RID, selected: boolean): void;
  /** Sets the orientation of the list elements. */
  accessibility_update_set_list_orientation(id: RID, vertical: boolean): void;
  /** Sets the priority of the live region updates. */
  accessibility_update_set_live(id: RID, live: int): void;
  /** Sets the element to be a member of the group. */
  accessibility_update_set_member_of(id: RID, group_id: RID): void;
  /** Sets element accessibility name. */
  accessibility_update_set_name(id: RID, name: string | NodePath): void;
  /** Sets next element on the line. */
  accessibility_update_set_next_on_line(id: RID, other_id: RID): void;
  /** Sets numeric value jump. */
  accessibility_update_set_num_jump(id: RID, jump: float): void;
  /** Sets numeric value range. */
  accessibility_update_set_num_range(id: RID, min: float, max: float): void;
  /** Sets numeric value step. */
  accessibility_update_set_num_step(id: RID, step: float): void;
  /** Sets numeric value. */
  accessibility_update_set_num_value(id: RID, position: float): void;
  /** Sets placeholder text. */
  accessibility_update_set_placeholder(id: RID, placeholder: string | NodePath): void;
  /** Sets popup type for popup buttons. */
  accessibility_update_set_popup_type(id: RID, popup: int): void;
  /** Sets previous element on the line. */
  accessibility_update_set_previous_on_line(id: RID, other_id: RID): void;
  /** Sets element accessibility role. */
  accessibility_update_set_role(id: RID, role: int): void;
  /** Sets element accessibility role description text. */
  accessibility_update_set_role_description(id: RID, description: string | NodePath): void;
  /** Sets scroll bar x position. */
  accessibility_update_set_scroll_x(id: RID, position: float): void;
  /** Sets scroll bar x range. */
  accessibility_update_set_scroll_x_range(id: RID, min: float, max: float): void;
  /** Sets scroll bar y position. */
  accessibility_update_set_scroll_y(id: RID, position: float): void;
  /** Sets scroll bar y range. */
  accessibility_update_set_scroll_y_range(id: RID, min: float, max: float): void;
  /** Sets the list of keyboard shortcuts used by element. */
  accessibility_update_set_shortcut(id: RID, shortcut: string | NodePath): void;
  /** Sets human-readable description of the current checked state. */
  accessibility_update_set_state_description(id: RID, description: string | NodePath): void;
  /** Sets cell position in the table. */
  accessibility_update_set_table_cell_position(id: RID, row_index: int, column_index: int): void;
  /** Sets cell row/column span. */
  accessibility_update_set_table_cell_span(id: RID, row_span: int, column_span: int): void;
  /** Sets number of columns in the table. */
  accessibility_update_set_table_column_count(id: RID, count: int): void;
  /** Sets position of the column. */
  accessibility_update_set_table_column_index(id: RID, index: int): void;
  /** Sets number of rows in the table. */
  accessibility_update_set_table_row_count(id: RID, count: int): void;
  /** Sets position of the row in the table. */
  accessibility_update_set_table_row_index(id: RID, index: int): void;
  /** Sets element text alignment. */
  accessibility_update_set_text_align(id: RID, align: int): void;
  /** Sets text underline/overline/strikethrough. */
  accessibility_update_set_text_decorations(id: RID, underline: boolean, strikethrough: boolean, overline: boolean): void;
  /** Sets text orientation. */
  accessibility_update_set_text_orientation(id: RID, vertical: boolean): void;
  /**
   * Sets text selection to the text field. `text_start_id` and `text_end_id` should be elements created by {@link accessibility_create_sub_text_edit_elements}. Character offsets are relative to the corresponding element.
   */
  accessibility_update_set_text_selection(id: RID, text_start_id: RID, start_char: int, text_end_id: RID, end_char: int): void;
  /** Sets tooltip text. */
  accessibility_update_set_tooltip(id: RID, tooltip: string | NodePath): void;
  /** Sets element 2D transform. */
  accessibility_update_set_transform(id: RID, transform: Transform2D): void;
  /** Sets link URL. */
  accessibility_update_set_url(id: RID, url: string | NodePath): void;
  /** Sets element text value. */
  accessibility_update_set_value(id: RID, value: string | NodePath): void;
  /**
   * Plays the beep sound from the operative system, if possible. Because it comes from the OS, the beep sound will be audible even if the application is muted. It may also be disabled for the entire OS by the user.
   * **Note:** This method is implemented on macOS, Linux (X11/Wayland), and Windows.
   */
  beep(): void;
  /** Returns the user's clipboard as a string if possible. */
  clipboard_get(): string;
  /**
   * Returns the user's clipboard as an image if possible.
   * **Note:** This method uses the copied pixel data, e.g. from an image editing software or a web browser, not an image file copied from file explorer.
   */
  clipboard_get_image(): Image | null;
  /**
   * Returns the user's primary (https://unix.stackexchange.com/questions/139191/whats-the-difference-between-primary-selection-and-clipboard-buffer) clipboard as a string if possible. This is the clipboard that is set when the user selects text in any application, rather than when pressing `Ctrl + C`. The clipboard data can then be pasted by clicking the middle mouse button in any application that supports the primary clipboard mechanism.
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   */
  clipboard_get_primary(): string;
  /** Returns `true` if there is a text content on the user's clipboard. */
  clipboard_has(): boolean;
  /** Returns `true` if there is an image content on the user's clipboard. */
  clipboard_has_image(): boolean;
  /** Sets the user's clipboard content to the given string. */
  clipboard_set(clipboard: string | NodePath): void;
  /**
   * Sets the user's primary (https://unix.stackexchange.com/questions/139191/whats-the-difference-between-primary-selection-and-clipboard-buffer) clipboard content to the given string. This is the clipboard that is set when the user selects text in any application, rather than when pressing `Ctrl + C`. The clipboard data can then be pasted by clicking the middle mouse button in any application that supports the primary clipboard mechanism.
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   */
  clipboard_set_primary(clipboard_primary: string | NodePath): void;
  /**
   * Displays OS native color picker.
   * Callbacks have the following arguments: `status: bool, color: Color`.
   * **Note:** This method is implemented if the display server has the {@link FEATURE_NATIVE_COLOR_PICKER} feature.
   * **Note:** This method is only implemented on Linux (X11/Wayland).
   */
  color_picker(callback: Callable): boolean;
  /**
   * Creates a new application status indicator with the specified icon, tooltip, and activation callback.
   * `callback` should take two arguments: the pressed mouse button (one of the {@link MouseButton} constants) and the click position in screen coordinates (a {@link Vector2i}).
   */
  create_status_indicator(icon: Texture2D, tooltip: string | NodePath, callback: Callable): int;
  /** Returns the default mouse cursor shape set by {@link cursor_set_shape}. */
  cursor_get_shape(): int;
  /**
   * Sets a custom mouse cursor image for the given `shape`. This means the user's operating system and mouse cursor theme will no longer influence the mouse cursor's appearance.
   * `cursor` can be either a {@link Texture2D} or an {@link Image}, and it should not be larger than 256×256 to display correctly. Optionally, `hotspot` can be set to offset the image's position relative to the click point. By default, `hotspot` is set to the top-left corner of the image. See also {@link cursor_set_shape}.
   * **Note:** On Web, calling this method every frame can cause the cursor to flicker.
   */
  cursor_set_custom_image(cursor: Resource, shape: int, hotspot?: Vector2 | Vector2i): void;
  /**
   * Sets the default mouse cursor shape. The cursor's appearance will vary depending on the user's operating system and mouse cursor theme. See also {@link cursor_get_shape} and {@link cursor_set_custom_image}.
   */
  cursor_set_shape(shape: int): void;
  /** Removes the application status indicator. */
  delete_status_indicator(id: int): void;
  /**
   * Shows a text input dialog which uses the operating system's native look-and-feel. `callback` should accept a single {@link String} parameter which contains the text field's contents.
   * **Note:** This method is implemented if the display server has the {@link FEATURE_NATIVE_DIALOG_INPUT} feature. Supported platforms include macOS, Windows, and Android.
   */
  dialog_input_text(title: string | NodePath, description: string | NodePath, existing_text: string | NodePath, callback: Callable): int;
  /**
   * Shows a text dialog which uses the operating system's native look-and-feel. `callback` should accept a single [int] parameter which corresponds to the index of the pressed button.
   * **Note:** This method is implemented if the display server has the {@link FEATURE_NATIVE_DIALOG} feature. Supported platforms include macOS, Windows, and Android.
   */
  dialog_show(title: string | NodePath, description: string | NodePath, buttons: PackedStringArray | Array<unknown>, callback: Callable): int;
  /**
   * Allows the `process_id` PID to steal focus from this window. In other words, this disables the operating system's focus stealing protection for the specified PID.
   * **Note:** This method is implemented only on Windows.
   */
  enable_for_stealing_focus(process_id: int): void;
  /**
   * Displays OS native dialog for selecting files or directories in the file system.
   * Each filter string in the `filters` array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. It is recommended to set both file extension and MIME type. See also {@link FileDialog.filters}.
   * Callbacks have the following arguments: `status: bool, selected_paths: PackedStringArray, selected_filter_index: int`. **On Android,** the third callback argument (`selected_filter_index`) is always `0`.
   * **Note:** This method is implemented if the display server has the {@link FEATURE_NATIVE_DIALOG_FILE} feature. Supported platforms include Linux (X11/Wayland), Windows, macOS, and Android.
   * **Note:** `current_directory` might be ignored.
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   * **Note:** On Android and Linux, `show_hidden` is ignored.
   * **Note:** On Android and macOS, native file dialogs have no title.
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use {@link OS.get_granted_permissions} to get a list of saved bookmarks.
   * **Note:** On Android, this method uses the Android Storage Access Framework (SAF).
   * The file picker returns a URI instead of a filesystem path. This URI can be passed directly to {@link FileAccess} to perform read/write operations.
   * When using {@link FILE_DIALOG_MODE_OPEN_DIR}, it returns a tree URI that grants full access to the selected directory. File operations inside this directory can be performed by passing a path on the form `treeUri#relative/path/to/file` to {@link FileAccess}.
   * To avoid opening the file picker again after each app restart, you can take persistable URI permission as follows:
   * The persistable URI permission remains valid across app restarts as long as the directory is not moved, renamed, or deleted.
   */
  file_dialog_show(title: string | NodePath, current_directory: string | NodePath, filename: string | NodePath, show_hidden: boolean, mode: int, filters: PackedStringArray | Array<unknown>, callback: Callable, parent_window_id?: int): int;
  /**
   * Displays OS native dialog for selecting files or directories in the file system with additional user selectable options.
   * Each filter string in the `filters` array should be formatted like this: `*.png,*.jpg,*.jpeg;Image Files;image/png,image/jpeg`. The description text of the filter is optional and can be omitted. It is recommended to set both file extension and MIME type. See also {@link FileDialog.filters}.
   * `options` is array of {@link Dictionary}s with the following keys:
   * - `"name"` - option's name {@link String}.
   * - `"values"` - {@link PackedStringArray} of values. If empty, boolean option (check box) is used.
   * - `"default"` - default selected option index ([int]) or default boolean value ([bool]).
   * Callbacks have the following arguments: `status: bool, selected_paths: PackedStringArray, selected_filter_index: int, selected_option: Dictionary`.
   * **Note:** This method is implemented if the display server has the {@link FEATURE_NATIVE_DIALOG_FILE_EXTRA} feature. Supported platforms include Linux (X11/Wayland), Windows, and macOS.
   * **Note:** `current_directory` might be ignored.
   * **Note:** Embedded file dialogs and Windows file dialogs support only file extensions, while Android, Linux, and macOS file dialogs also support MIME types.
   * **Note:** On Linux (X11), `show_hidden` is ignored.
   * **Note:** On macOS, native file dialogs have no title.
   * **Note:** On macOS, sandboxed apps will save security-scoped bookmarks to retain access to the opened folders across multiple sessions. Use {@link OS.get_granted_permissions} to get a list of saved bookmarks.
   */
  file_dialog_with_options_show(title: string | NodePath, current_directory: string | NodePath, root: string | NodePath, filename: string | NodePath, show_hidden: boolean, mode: int, filters: PackedStringArray | Array<unknown>, options: Array<Dictionary>, callback: Callable, parent_window_id?: int): int;
  /**
   * Forces window manager processing while ignoring all {@link InputEvent}s. See also {@link process_events}.
   * **Note:** This method is implemented on Windows and macOS.
   */
  force_process_and_drop_events(): void;
  /**
   * Returns OS theme accent color. Returns `Color(0, 0, 0, 0)`, if accent color is unknown.
   * **Note:** This method is implemented on macOS, Windows, Android, and Linux (X11/Wayland).
   */
  get_accent_color(): Color;
  /**
   * Returns the OS theme base color (default control background). Returns `Color(0, 0, 0, 0)` if the base color is unknown.
   * **Note:** This method is implemented on macOS, Windows, and Android.
   */
  get_base_color(): Color;
  /**
   * Returns an {@link Array} of {@link Rect2}, each of which is the bounding rectangle for a display cutout or notch. These are non-functional areas on edge-to-edge screens used by cameras and sensors. Returns an empty array if the device does not have cutouts. See also {@link get_display_safe_area}.
   * **Note:** Currently only implemented on Android. Other platforms will return an empty array even if they do have display cutouts or notches.
   */
  get_display_cutouts(): Array<Rect2>;
  /**
   * Returns the unobscured area of the display where interactive controls should be rendered. See also {@link get_display_cutouts}.
   * **Note:** Currently only implemented on Android and iOS. On other platforms, `screen_get_usable_rect(SCREEN_OF_MAIN_WINDOW)` will be returned as a fallback. See also {@link screen_get_usable_rect}.
   */
  get_display_safe_area(): Rect2i;
  /**
   * Returns the index of the screen containing the window with the keyboard focus, or the primary screen if there's no focused window.
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns the primary screen.
   */
  get_keyboard_focus_screen(): int;
  /**
   * Returns the name of the {@link DisplayServer} currently in use. Most operating systems only have a single {@link DisplayServer}, but Linux has access to more than one {@link DisplayServer} (currently X11 and Wayland).
   * The names of built-in display servers are `Windows`, `macOS`, `X11` (Linux), `Wayland` (Linux), `Android`, `iOS`, `web` (HTML5), and `headless` (when started with the `--headless` command line argument ($DOCS_URL/tutorials/editor/command_line_tutorial.html)).
   */
  get_name(): string;
  /**
   * Returns the index of the primary screen.
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `0`.
   */
  get_primary_screen(): int;
  /**
   * Returns the number of displays available.
   * **Note:** This method is implemented on Linux (X11 and Wayland), macOS, and Windows. On other platforms, this method always returns `1`.
   */
  get_screen_count(): int;
  /**
   * Returns the index of the screen that overlaps the most with the given rectangle. Returns {@link INVALID_SCREEN} if the rectangle doesn't overlap with any screen or has no area.
   */
  get_screen_from_rect(rect: Rect2 | Rect2i): int;
  /**
   * Returns `true` if positions of **OK** and **Cancel** buttons are swapped in dialogs. This is enabled by default on Windows to follow interface conventions, and be toggled by changing {@link ProjectSettings.gui/common/swap_cancel_ok}.
   * **Note:** This doesn't affect native dialogs such as the ones spawned by {@link DisplayServer.dialog_show}.
   */
  get_swap_cancel_ok(): boolean;
  /**
   * Returns the ID of the window at the specified screen `position` (in pixels). On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin may be located outside any display like this:
   * [codeblock lang=text]
   * * (0, 0)        +-------+
   * |       |
   * +-------------+ |       |
   * |             | |       |
   * |             | |       |
   * +-------------+ +-------+
   * [/codeblock]
   */
  get_window_at_screen_position(position: Vector2i | Vector2): int;
  /**
   * Returns the list of Godot window IDs belonging to this process.
   * **Note:** Native dialogs are not included in this list.
   */
  get_window_list(): PackedInt32Array;
  /**
   * Adds a new checkable item with text `label` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_check_item(menu_root: string | NodePath, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new checkable item with text `label` and icon `icon` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_icon_check_item(menu_root: string | NodePath, icon: Texture2D, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new item with text `label` and icon `icon` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_icon_item(menu_root: string | NodePath, icon: Texture2D, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new radio-checkable item with text `label` and icon `icon` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link global_menu_set_item_checked} for more info on how to control it.
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_icon_radio_check_item(menu_root: string | NodePath, icon: Texture2D, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new item with text `label` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_item(menu_root: string | NodePath, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new item with text `label` to the global menu with ID `menu_root`.
   * Contrarily to normal binary items, multistate items can have more than two states, as defined by `max_states`. Each press or activate of the item will increase the state by one. The default value is defined by `default_state`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** By default, there's no indication of the current item state, it should be changed manually.
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_multistate_item(menu_root: string | NodePath, label: string | NodePath, max_states: int, default_state: int, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a new radio-checkable item with text `label` to the global menu with ID `menu_root`.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * An `accelerator` can optionally be defined, which is a keyboard shortcut that can be pressed to trigger the menu button even if it's not currently open. The `accelerator` is generally a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** Radio-checkable items just display a checkmark, but don't have any built-in checking behavior and must be checked/unchecked manually. See {@link global_menu_set_item_checked} for more info on how to control it.
   * **Note:** The `callback` and `key_callback` Callables need to accept exactly one Variant parameter, the parameter passed to the Callables will be the value passed to `tag`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_radio_check_item(menu_root: string | NodePath, label: string | NodePath, callback?: Callable, key_callback?: Callable, tag?: unknown, accelerator?: int, index?: int): int;
  /**
   * Adds a separator between items to the global menu with ID `menu_root`. Separators also occupy an index.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_separator(menu_root: string | NodePath, index?: int): int;
  /**
   * Adds an item that will act as a submenu of the global menu `menu_root`. The `submenu` argument is the ID of the global menu root that will be shown when the item is clicked.
   * Returns index of the inserted item, it's not guaranteed to be the same as `index` value.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_add_submenu_item(menu_root: string | NodePath, label: string | NodePath, submenu: string | NodePath, index?: int): int;
  /**
   * Removes all items from the global menu with ID `menu_root`.
   * **Note:** This method is implemented only on macOS.
   * **Supported system menu IDs:**
   * [codeblock lang=text]
   * "_main" - Main menu (macOS).
   * "_dock" - Dock popup menu (macOS).
   * "_apple" - Apple menu (macOS, custom items added before "Services").
   * "_window" - Window menu (macOS, custom items added after "Bring All to Front").
   * "_help" - Help menu (macOS).
   * [/codeblock]
   */
  global_menu_clear(menu_root: string | NodePath): void;
  /**
   * Returns the accelerator of the item at index `idx`. Accelerators are special combinations of keys that activate the item, no matter which control is focused.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_accelerator(menu_root: string | NodePath, idx: int): int;
  /**
   * Returns the callback of the item at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_callback(menu_root: string | NodePath, idx: int): Callable;
  /**
   * Returns number of items in the global menu with ID `menu_root`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_count(menu_root: string | NodePath): int;
  /**
   * Returns the icon of the item at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_icon(menu_root: string | NodePath, idx: int): Texture2D | null;
  /**
   * Returns the horizontal offset of the item at the given `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_indentation_level(menu_root: string | NodePath, idx: int): int;
  /**
   * Returns the index of the item with the specified `tag`. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_index_from_tag(menu_root: string | NodePath, tag: unknown): int;
  /**
   * Returns the index of the item with the specified `text`. Indices are automatically assigned to each item by the engine, and cannot be set manually.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_index_from_text(menu_root: string | NodePath, text: string | NodePath): int;
  /**
   * Returns the callback of the item accelerator at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_key_callback(menu_root: string | NodePath, idx: int): Callable;
  /**
   * Returns number of states of a multistate item. See {@link global_menu_add_multistate_item} for details.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_max_states(menu_root: string | NodePath, idx: int): int;
  /**
   * Returns the state of a multistate item. See {@link global_menu_add_multistate_item} for details.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_state(menu_root: string | NodePath, idx: int): int;
  /**
   * Returns the submenu ID of the item at index `idx`. See {@link global_menu_add_submenu_item} for more info on how to add a submenu.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_submenu(menu_root: string | NodePath, idx: int): string;
  /**
   * Returns the metadata of the specified item, which might be of any type. You can set it with {@link global_menu_set_item_tag}, which provides a simple way of assigning context data to items.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_tag(menu_root: string | NodePath, idx: int): unknown;
  /**
   * Returns the text of the item at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_text(menu_root: string | NodePath, idx: int): string;
  /**
   * Returns the tooltip associated with the specified index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_item_tooltip(menu_root: string | NodePath, idx: int): string;
  /**
   * Returns Dictionary of supported system menu IDs and names.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_get_system_menu_roots(): Dictionary;
  /**
   * Returns `true` if the item at index `idx` is checkable in some way, i.e. if it has a checkbox or radio button.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_is_item_checkable(menu_root: string | NodePath, idx: int): boolean;
  /**
   * Returns `true` if the item at index `idx` is checked.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_is_item_checked(menu_root: string | NodePath, idx: int): boolean;
  /**
   * Returns `true` if the item at index `idx` is disabled. When it is disabled it can't be selected, or its action invoked.
   * See {@link global_menu_set_item_disabled} for more info on how to disable an item.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_is_item_disabled(menu_root: string | NodePath, idx: int): boolean;
  /**
   * Returns `true` if the item at index `idx` is hidden.
   * See {@link global_menu_set_item_hidden} for more info on how to hide an item.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_is_item_hidden(menu_root: string | NodePath, idx: int): boolean;
  /**
   * Returns `true` if the item at index `idx` has radio button-style checkability.
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_is_item_radio_checkable(menu_root: string | NodePath, idx: int): boolean;
  /**
   * Removes the item at index `idx` from the global menu `menu_root`.
   * **Note:** The indices of items after the removed item will be shifted by one.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_remove_item(menu_root: string | NodePath, idx: int): void;
  /**
   * Sets the accelerator of the item at index `idx`. `keycode` can be a single {@link Key}, or a combination of {@link KeyModifierMask}s and {@link Key}s using bitwise OR such as `KEY_MASK_CTRL | KEY_A` (`Ctrl + A`).
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_accelerator(menu_root: string | NodePath, idx: int, keycode: int): void;
  /**
   * Sets the callback of the item at index `idx`. Callback is emitted when an item is pressed.
   * **Note:** The `callback` Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_callback(menu_root: string | NodePath, idx: int, callback: Callable): void;
  /**
   * Sets whether the item at index `idx` has a checkbox. If `false`, sets the type of the item to plain text.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_checkable(menu_root: string | NodePath, idx: int, checkable: boolean): void;
  /**
   * Sets the checkstate status of the item at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_checked(menu_root: string | NodePath, idx: int, checked: boolean): void;
  /**
   * Enables/disables the item at index `idx`. When it is disabled, it can't be selected and its action can't be invoked.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_disabled(menu_root: string | NodePath, idx: int, disabled: boolean): void;
  /**
   * Hides/shows the item at index `idx`. When it is hidden, an item does not appear in a menu and its action cannot be invoked.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_hidden(menu_root: string | NodePath, idx: int, hidden: boolean): void;
  /**
   * Sets the callback of the item at index `idx`. The callback is emitted when an item is hovered.
   * **Note:** The `callback` Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_hover_callbacks(menu_root: string | NodePath, idx: int, callback: Callable): void;
  /**
   * Replaces the {@link Texture2D} icon of the specified `idx`.
   * **Note:** This method is implemented only on macOS.
   * **Note:** This method is not supported by macOS "_dock" menu items.
   */
  global_menu_set_item_icon(menu_root: string | NodePath, idx: int, icon: Texture2D): void;
  /**
   * Sets the horizontal offset of the item at the given `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_indentation_level(menu_root: string | NodePath, idx: int, level: int): void;
  /**
   * Sets the callback of the item at index `idx`. Callback is emitted when its accelerator is activated.
   * **Note:** The `key_callback` Callable needs to accept exactly one Variant parameter, the parameter passed to the Callable will be the value passed to the `tag` parameter when the menu item was created.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_key_callback(menu_root: string | NodePath, idx: int, key_callback: Callable): void;
  /**
   * Sets number of state of a multistate item. See {@link global_menu_add_multistate_item} for details.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_max_states(menu_root: string | NodePath, idx: int, max_states: int): void;
  /**
   * Sets the type of the item at the specified index `idx` to radio button. If `false`, sets the type of the item to plain text.
   * **Note:** This is purely cosmetic; you must add the logic for checking/unchecking items in radio groups.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_radio_checkable(menu_root: string | NodePath, idx: int, checkable: boolean): void;
  /**
   * Sets the state of a multistate item. See {@link global_menu_add_multistate_item} for details.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_state(menu_root: string | NodePath, idx: int, state: int): void;
  /**
   * Sets the submenu of the item at index `idx`. The submenu is the ID of a global menu root that would be shown when the item is clicked.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_submenu(menu_root: string | NodePath, idx: int, submenu: string | NodePath): void;
  /**
   * Sets the metadata of an item, which may be of any type. You can later get it with {@link global_menu_get_item_tag}, which provides a simple way of assigning context data to items.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_tag(menu_root: string | NodePath, idx: int, tag: unknown): void;
  /**
   * Sets the text of the item at index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_text(menu_root: string | NodePath, idx: int, text: string | NodePath): void;
  /**
   * Sets the {@link String} tooltip of the item at the specified index `idx`.
   * **Note:** This method is implemented only on macOS.
   */
  global_menu_set_item_tooltip(menu_root: string | NodePath, idx: int, tooltip: string | NodePath): void;
  /**
   * Registers callables to emit when the menu is respectively about to show or closed. Callback methods should have zero arguments.
   */
  global_menu_set_popup_callbacks(menu_root: string | NodePath, open_callback: Callable, close_callback: Callable): void;
  /**
   * Returns `true` if any additional outputs have been registered via {@link register_additional_output}.
   */
  has_additional_outputs(): boolean;
  /**
   * Returns `true` if the specified `feature` is supported by the current {@link DisplayServer}, `false` otherwise.
   */
  has_feature(feature: int): boolean;
  /**
   * Returns `true` if a hardware keyboard is connected.
   * **Note:** This method is implemented on Android and iOS. On other platforms, this method always returns `true`.
   */
  has_hardware_keyboard(): boolean;
  /**
   * Sets native help system search callbacks.
   * `search_callback` has the following arguments: `String search_string, int result_limit` and return a {@link Dictionary} with "key, display name" pairs for the search results. Called when the user enters search terms in the `Help` menu.
   * `action_callback` has the following arguments: `String key`. Called when the user selects a search result in the `Help` menu.
   * **Note:** This method is implemented only on macOS.
   */
  help_set_search_callbacks(search_callback: Callable, action_callback: Callable): void;
  /**
   * Returns the text selection in the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) composition string, with the {@link Vector2i}'s `x` component being the caret position and `y` being the length of the selection.
   * **Note:** This method is implemented only on macOS.
   */
  ime_get_selection(): Vector2i;
  /**
   * Returns the composition string contained within the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) window.
   * **Note:** This method is implemented only on macOS.
   */
  ime_get_text(): string;
  /**
   * Returns `true` if OS is using dark mode.
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   */
  is_dark_mode(): boolean;
  /**
   * Returns `true` if OS supports dark mode.
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   */
  is_dark_mode_supported(): boolean;
  /**
   * Returns `true` if the application is in picture-in-picture mode.
   * **Note:** This method is implemented on Android.
   */
  is_in_pip_mode(window_id?: int): boolean;
  /**
   * Returns `true` if touch events are available (Android or iOS), the capability is detected on the Web platform or if {@link ProjectSettings.input_devices/pointing/emulate_touch_from_mouse} is `true`.
   */
  is_touchscreen_available(): boolean;
  /**
   * Returns `true` if the window background can be made transparent. This method returns `false` if {@link ProjectSettings.display/window/per_pixel_transparency/allowed} is set to `false`, or if transparency is not supported by the renderer or OS compositor.
   */
  is_window_transparency_available(): boolean;
  /**
   * Returns active keyboard layout index.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   */
  keyboard_get_current_layout(): int;
  /**
   * Converts a physical (US QWERTY) `keycode` to one in the active keyboard layout.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_get_keycode_from_physical(keycode: int): int;
  /**
   * Converts a physical (US QWERTY) `keycode` to localized label printed on the key in the active keyboard layout.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_get_label_from_physical(keycode: int): int;
  /**
   * Returns the number of keyboard layouts.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_get_layout_count(): int;
  /**
   * Returns the ISO-639/BCP-47 language code of the keyboard layout at position `index`.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_get_layout_language(index: int): string;
  /**
   * Returns the localized name of the keyboard layout at position `index`.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_get_layout_name(index: int): string;
  /**
   * Sets the active keyboard layout.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS and Windows.
   */
  keyboard_set_current_layout(index: int): void;
  /**
   * Returns the current state of mouse buttons (whether each button is pressed) as a bitmask. If multiple mouse buttons are pressed at the same time, the bits are added together. Equivalent to {@link Input.get_mouse_button_mask}.
   */
  mouse_get_button_state(): int;
  /** Returns the current mouse mode. See also {@link mouse_set_mode}. */
  mouse_get_mode(): int;
  /** Returns the mouse cursor's current position in screen coordinates. */
  mouse_get_position(): Vector2i;
  /** Sets the current mouse mode. See also {@link mouse_get_mode}. */
  mouse_set_mode(mouse_mode: int): void;
  /**
   * Enters picture-in-picture mode.
   * **Note:** This method is implemented on Android.
   */
  pip_mode_enter(window_id?: int): void;
  /**
   * Specifies the aspect ratio for picture-in-picture mode.
   * **Note:** This method is implemented on Android.
   */
  pip_mode_set_aspect_ratio(numerator: int, denominator: int, window_id?: int): void;
  /**
   * Specifies whether picture-in-picture mode should be entered automatically when the application goes in the background.
   * **Note:** This method is implemented on Android.
   */
  pip_mode_set_auto_enter_on_background(auto_enter_on_background: boolean, window_id?: int): void;
  /**
   * Perform window manager processing, including input flushing. See also {@link force_process_and_drop_events}, {@link Input.flush_buffered_events} and {@link Input.use_accumulated_input}.
   */
  process_events(): void;
  /**
   * Registers an {@link Object} which represents an additional output that will be rendered too, beyond normal windows. The {@link Object} is only used as an identifier, which can be later passed to {@link unregister_additional_output}.
   * This can be used to prevent Godot from skipping rendering when no normal windows are visible.
   */
  register_additional_output(object: GodotObject): void;
  /**
   * Returns the dots per inch density of the specified screen. Returns platform specific default value if `screen` is invalid.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** On macOS, returned value is inaccurate if fractional display scaling mode is used.
   * **Note:** On Android devices, the actual screen densities are grouped into six generalized densities:
   * [codeblock lang=text]
   * ldpi - 120 dpi
   * mdpi - 160 dpi
   * hdpi - 240 dpi
   * xhdpi - 320 dpi
   * xxhdpi - 480 dpi
   * xxxhdpi - 640 dpi
   * [/codeblock]
   * **Note:** This method is implemented on Android, iOS, Linux (X11/Wayland), macOS, Web, and Windows. On other platforms, this method always returns `72`.
   */
  screen_get_dpi(screen?: int): int;
  /**
   * Returns a screenshot of the `screen`. Returns `null` if `screen` is invalid or the {@link DisplayServer} fails to capture screenshot.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Linux (X11, excluding XWayland), macOS, and Windows. On other platforms, this method always returns `null`.
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a screenshot that will not include other application windows or OS elements not related to the application.
   */
  screen_get_image(screen?: int): Image | null;
  /**
   * Returns a screenshot of the screen region defined by `rect`. Returns `null` if `rect` is outside screen bounds or the {@link DisplayServer} fails to capture screenshot.
   * **Note:** This method is implemented on macOS and Windows. On other platforms, this method always returns `null`.
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a screenshot that will not include other application windows or OS elements not related to the application.
   */
  screen_get_image_rect(rect: Rect2i | Rect2): Image | null;
  /**
   * Returns the greatest scale factor of all screens.
   * **Note:** On macOS returned value is `2.0` if there is at least one hiDPI (Retina) screen in the system, and `1.0` in all other cases.
   * **Note:** This method is implemented only on macOS.
   */
  screen_get_max_scale(): float;
  /**
   * Returns the `screen`'s current orientation. See also {@link screen_set_orientation}. Returns {@link SCREEN_LANDSCAPE} if `screen` is invalid.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Android and iOS. On other platforms, this method always returns {@link SCREEN_LANDSCAPE}.
   */
  screen_get_orientation(screen?: int): int;
  /**
   * Returns the color of the pixel at the given screen `position`. On multi-monitor setups, the screen position is relative to the virtual desktop area.
   * **Note:** This method is implemented on Linux (X11, excluding XWayland), macOS, and Windows. On other platforms, this method always returns `Color(0, 0, 0, 1)`.
   * **Note:** On macOS, this method requires the "Screen Recording" permission. If permission is not granted, this method returns a color from a screenshot that will not include other application windows or OS elements not related to the application.
   */
  screen_get_pixel(position: Vector2i | Vector2): Color;
  /**
   * Returns the screen's top-left corner position in pixels. Returns {@link Vector2i.ZERO} if `screen` is invalid. On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin might be located outside any display like this:
   * [codeblock lang=text]
   * * (0, 0)        +-------+
   * |       |
   * +-------------+ |       |
   * |             | |       |
   * |             | |       |
   * +-------------+ +-------+
   * [/codeblock]
   * See also {@link screen_get_size}.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   */
  screen_get_position(screen?: int): Vector2i;
  /**
   * Returns the current refresh rate of the specified screen. When V-Sync is enabled, this returns the maximum framerate the project can effectively reach. Returns `-1.0` if `screen` is invalid or the {@link DisplayServer} fails to find the refresh rate for the specified screen.
   * To fallback to a default refresh rate if the method fails, try:
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Android, iOS, macOS, Linux (X11 and Wayland), and Windows. On other platforms, this method always returns `-1.0`.
   */
  screen_get_refresh_rate(screen?: int): float;
  /**
   * Returns the scale factor of the specified screen by index. Returns `1.0` if `screen` is invalid.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** On macOS, the returned value is `2.0` for hiDPI (Retina) screens, and `1.0` for all other cases.
   * **Note:** On Linux (Wayland), the returned value is accurate only when `screen` is {@link SCREEN_OF_MAIN_WINDOW}. Due to API limitations, passing a direct index will return a rounded-up integer, if the screen has a fractional scale (e.g. `1.25` would get rounded up to `2.0`).
   * **Note:** This method is implemented on Android, iOS, Web, macOS, and Linux (Wayland). On other platforms, this method always returns `1.0`.
   */
  screen_get_scale(screen?: int): float;
  /**
   * Returns the screen's size in pixels. See also {@link screen_get_position} and {@link screen_get_usable_rect}. Returns {@link Vector2i.ZERO} if `screen` is invalid.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   */
  screen_get_size(screen?: int): Vector2i;
  /**
   * Returns the portion of the screen that is not obstructed by a status bar in pixels. See also {@link screen_get_size}.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `Rect2i(screen_get_position(screen), screen_get_size(screen))`.
   */
  screen_get_usable_rect(screen?: int): Rect2i;
  /**
   * Returns `true` if the screen should never be turned off by the operating system's power-saving measures. See also {@link screen_set_keep_on}.
   */
  screen_is_kept_on(): boolean;
  /**
   * Sets whether the screen should never be turned off by the operating system's power-saving measures. See also {@link screen_is_kept_on}.
   */
  screen_set_keep_on(enable: boolean): void;
  /**
   * Sets the `screen`'s `orientation`. See also {@link screen_get_orientation}.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Android and iOS.
   * **Note:** On iOS, this method has no effect if {@link ProjectSettings.display/window/handheld/orientation} is not set to {@link SCREEN_SENSOR}.
   */
  screen_set_orientation(orientation: int, screen?: int): void;
  /**
   * Sets the callback that should be called when a hardware keyboard is connected or disconnected. `callable` should accept a single [bool] argument indicating whether the keyboard has been connected (`true`) or disconnected (`false`).
   * **Note:** This method is only implemented on Android.
   */
  set_hardware_keyboard_connection_change_callback(callable: Callable): void;
  /**
   * Sets the window icon (usually displayed in the top-left corner) with an {@link Image}. To use icons in the operating system's native format, use {@link set_native_icon} instead.
   * **Note:** Requires support for {@link FEATURE_ICON}.
   */
  set_icon(image: Image): void;
  /**
   * Sets the window icon (usually displayed in the top-left corner) in the operating system's *native* format. The file at `filename` must be in `.ico` format on Windows or `.icns` on macOS. By using specially crafted `.ico` or `.icns` icons, {@link set_native_icon} allows specifying different icons depending on the size the icon is displayed at. This size is determined by the operating system and user preferences (including the display scale factor). To use icons in other formats, use {@link set_icon} instead.
   * **Note:** Requires support for {@link FEATURE_NATIVE_ICON}.
   */
  set_native_icon(filename: string | NodePath): void;
  /**
   * Sets the callback that should be called when the system's theme settings are changed. `callable` should accept zero arguments.
   * **Note:** This method is implemented on Android, iOS, macOS, Windows, and Linux (X11/Wayland).
   */
  set_system_theme_change_callback(callable: Callable): void;
  /**
   * Opens system emoji and symbol picker.
   * **Note:** This method is implemented on macOS and Windows.
   */
  show_emoji_and_symbol_picker(): void;
  /**
   * Returns the rectangle for the given status indicator `id` in screen coordinates. If the status indicator is not visible, returns an empty {@link Rect2}.
   * **Note:** This method is implemented on macOS and Windows.
   */
  status_indicator_get_rect(id: int): Rect2;
  /**
   * Sets the application status indicator activation callback. `callback` should take two arguments: [int] mouse button index (one of {@link MouseButton} values) and {@link Vector2i} click position in screen coordinates.
   * **Note:** This method is implemented on macOS and Windows.
   */
  status_indicator_set_callback(id: int, callback: Callable): void;
  /**
   * Sets the application status indicator icon.
   * **Note:** This method is implemented on macOS and Windows.
   */
  status_indicator_set_icon(id: int, icon: Texture2D): void;
  /**
   * Sets the application status indicator native popup menu.
   * **Note:** On macOS, the menu is activated by any mouse button. Its activation callback is *not* triggered.
   * **Note:** On Windows, the menu is activated by the right mouse button, selecting the status icon and pressing `Shift + F10`, or the applications key. The menu's activation callback for the other mouse buttons is still triggered.
   * **Note:** Native popup is only supported if {@link NativeMenu} supports the {@link NativeMenu.FEATURE_POPUP_MENU} feature.
   */
  status_indicator_set_menu(id: int, menu_rid: RID): void;
  /**
   * Sets the application status indicator tooltip.
   * **Note:** This method is implemented on macOS and Windows.
   */
  status_indicator_set_tooltip(id: int, tooltip: string | NodePath): void;
  /**
   * Returns current active tablet driver name.
   * **Note:** This method is implemented only on Windows.
   */
  tablet_get_current_driver(): string;
  /**
   * Returns the total number of available tablet drivers.
   * **Note:** This method is implemented only on Windows.
   */
  tablet_get_driver_count(): int;
  /**
   * Returns the tablet driver name for the given index.
   * **Note:** This method is implemented only on Windows.
   */
  tablet_get_driver_name(idx: int): string;
  /**
   * Set active tablet driver name.
   * Supported drivers:
   * - `winink`: Windows Ink API, default.
   * - `wintab`: Wacom Wintab API (compatible device driver required).
   * - `dummy`: Dummy driver, tablet input is disabled.
   * **Note:** This method is implemented only on Windows.
   */
  tablet_set_current_driver(name: string | NodePath): void;
  /**
   * Returns an {@link Array} of voice information dictionaries.
   * Each {@link Dictionary} contains two {@link String} entries:
   * - `name` is voice name.
   * - `id` is voice identifier.
   * - `language` is language code in `lang_Variant` format. The `lang` part is a 2 or 3-letter code based on the ISO-639 standard, in lowercase. The [code skip-lint]Variant[/code] part is an engine-dependent string describing country, region or/and dialect.
   * Note that Godot depends on system libraries for text-to-speech functionality. These libraries are installed by default on Windows and macOS, but not on all Linux distributions. If they are not present, this method will return an empty list. This applies to both Godot users on Linux, as well as end-users on Linux running Godot games that use text-to-speech.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_get_voices(): Array<Dictionary>;
  /**
   * Returns a {@link PackedStringArray} of voice identifiers for the `language`.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_get_voices_for_language(language: string | NodePath): PackedStringArray;
  /**
   * Returns `true` if the synthesizer is in a paused state.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_is_paused(): boolean;
  /**
   * Returns `true` if the synthesizer is generating speech, or have utterance waiting in the queue.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_is_speaking(): boolean;
  /**
   * Puts the synthesizer into a paused state.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_pause(): void;
  /**
   * Resumes the synthesizer if it was paused.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_resume(): void;
  /**
   * Adds a callback, which is called when the utterance has started, finished, canceled or reached a text boundary.
   * - {@link TTS_UTTERANCE_STARTED}, {@link TTS_UTTERANCE_ENDED}, and {@link TTS_UTTERANCE_CANCELED} callable's method should take one [int] parameter, the utterance ID.
   * - {@link TTS_UTTERANCE_BOUNDARY} callable's method should take two [int] parameters, the index of the character and the utterance ID.
   * **Note:** The granularity of the boundary callbacks is engine dependent.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_set_utterance_callback(event: int, callable: Callable): void;
  /**
   * Adds an utterance to the queue. If `interrupt` is `true`, the queue is cleared first.
   * - `voice` identifier is one of the `"id"` values returned by {@link tts_get_voices} or one of the values returned by {@link tts_get_voices_for_language}.
   * - `volume` ranges from `0` (lowest) to `100` (highest).
   * - `pitch` ranges from `0.0` (lowest) to `2.0` (highest), `1.0` is default pitch for the current voice.
   * - `rate` ranges from `0.1` (lowest) to `10.0` (highest), `1.0` is a normal speaking rate. Other values act as a percentage relative.
   * - `utterance_id` is passed as a parameter to the callback functions.
   * **Note:** On Windows and Linux (X11/Wayland), utterance `text` can use SSML markup. SSML support is engine and voice dependent. If the engine does not support SSML, you should strip out all XML markup before calling {@link tts_speak}.
   * **Note:** The granularity of pitch, rate, and volume is engine and voice dependent. Values may be truncated.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_speak(text: string | NodePath, voice: string | NodePath, volume?: int, pitch?: float, rate?: float, utterance_id?: int, interrupt?: boolean): void;
  /**
   * Stops synthesis in progress and removes all utterances from the queue.
   * **Note:** This method is implemented on Android, iOS, Web, Linux (X11/Wayland), macOS, and Windows.
   */
  tts_stop(): void;
  /**
   * Unregisters an {@link Object} representing an additional output, that was registered via {@link register_additional_output}.
   */
  unregister_additional_output(object: GodotObject): void;
  /**
   * Returns the on-screen keyboard's height in pixels. Returns `0` if there is no keyboard or if it is currently hidden.
   * **Note:** On Android 7 and 8, the keyboard height may return `0` the first time the keyboard is opened in non-immersive mode. This behavior does not occur in immersive mode.
   */
  virtual_keyboard_get_height(): int;
  /** Hides the virtual keyboard if it is shown, does nothing otherwise. */
  virtual_keyboard_hide(): void;
  /**
   * Shows the virtual keyboard if the platform has one.
   * `existing_text` parameter is useful for implementing your own {@link LineEdit} or {@link TextEdit}, as it tells the virtual keyboard what text has already been typed (the virtual keyboard uses it for auto-correct and predictions).
   * `position` parameter is the screen space {@link Rect2} of the edited text.
   * `type` parameter allows configuring which type of virtual keyboard to show.
   * `max_length` limits the number of characters that can be entered if different from `-1`.
   * `cursor_start` can optionally define the current text cursor position if `cursor_end` is not set.
   * `cursor_start` and `cursor_end` can optionally define the current text selection.
   * **Note:** This method is implemented on Android, iOS and Web.
   */
  virtual_keyboard_show(existing_text: string | NodePath, position?: Rect2 | Rect2i, type_?: int, max_length?: int, cursor_start?: int, cursor_end?: int): void;
  /**
   * Sets the mouse cursor position to the given `position` relative to an origin at the upper left corner of the currently focused game Window Manager window.
   * **Note:** {@link warp_mouse} is only supported on Windows, macOS, and Linux (X11/Wayland). It has no effect on Android, iOS, and Web.
   */
  warp_mouse(position: Vector2i | Vector2): void;
  /**
   * Returns `true` if anything can be drawn in the window specified by `window_id`, `false` otherwise. Using the `--disable-render-loop` command line argument or a headless build will return `false`.
   */
  window_can_draw(window_id?: int): boolean;
  /** Returns ID of the active popup window, or {@link INVALID_WINDOW_ID} if there is none. */
  window_get_active_popup(): int;
  /** Returns the {@link Object.get_instance_id} of the {@link Window} the `window_id` is attached to. */
  window_get_attached_instance_id(window_id?: int): int;
  /**
   * Returns the screen the window specified by `window_id` is currently positioned on. If the screen overlaps multiple displays, the screen where the window's center is located is returned. See also {@link window_set_current_screen}. Returns {@link INVALID_SCREEN} if `window_id` is invalid.
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows. On other platforms, this method always returns `0`.
   */
  window_get_current_screen(window_id?: int): int;
  /** Returns the current value of the given window's `flag`. */
  window_get_flag(flag: int, window_id?: int): boolean;
  /**
   * When {@link window_is_hdr_output_enabled} returns `true`, this returns the current maximum luminance in nits (cd/m²) for HDR output by the window specified by `window_id`. If the maximum luminance is being automatically adjusted based on the screen's capabilities, this method will return that value. Otherwise, it will return the value set by {@link window_set_hdr_output_max_luminance}. This maximum luminance value is used when calculating {@link window_get_output_max_linear_value}.
   * **Note:** This maximum luminance may not match the physical behavior of the screen, but will always be proportionally correct relative to {@link window_get_hdr_output_current_reference_luminance}.
   */
  window_get_hdr_output_current_max_luminance(window_id?: int): float;
  /**
   * When {@link window_is_hdr_output_enabled} returns `true`, this returns the current reference white luminance in nits (cd/m²) for HDR output by the window specified by `window_id`. If the reference luminance is being automatically adjusted to match the operating system brightness, this will return that value. Otherwise, it will return the value set by {@link window_set_hdr_output_reference_luminance}. This reference luminance value is used when calculating {@link window_get_output_max_linear_value}.
   * **Note:** This reference white luminance may not match the physical behavior of the screen, but will always be proportionally correct relative to {@link window_get_hdr_output_current_max_luminance}.
   */
  window_get_hdr_output_current_reference_luminance(window_id?: int): float;
  /**
   * Returns the maximum luminance in nits (cd/m²) set for HDR output by the window specified by `window_id`. Negative values indicate that the value is being automatically adjusted based on the screen's capabilities. See also {@link window_get_hdr_output_current_max_luminance}.
   */
  window_get_hdr_output_max_luminance(window_id?: int): float;
  /**
   * Returns the reference white luminance in nits (cd/m²) set for HDR output by the window specified by `window_id`. Negative values indicate that the value is being automatically adjusted to match the operating system brightness. See also {@link window_get_hdr_output_current_reference_luminance}.
   */
  window_get_hdr_output_reference_luminance(window_id?: int): float;
  /** Returns the window's maximum size (in pixels). See also {@link window_set_max_size}. */
  window_get_max_size(window_id?: int): Vector2i;
  /** Returns the window's minimum size (in pixels). See also {@link window_set_min_size}. */
  window_get_min_size(window_id?: int): Vector2i;
  /** Returns the mode of the given window. */
  window_get_mode(window_id?: int): int;
  /**
   * Returns internal structure pointers for use in plugins.
   * **Note:** This method is implemented on Android, Linux (X11/Wayland), macOS, and Windows.
   */
  window_get_native_handle(handle_type: int, window_id?: int): int;
  /**
   * Returns the maximum value for linear color components that can be displayed for the window specified by `window_id`, regardless of SDR or HDR output. Returns `1.0` if HDR is not enabled or not supported. When HDR output is enabled, this is calculated based on {@link window_get_hdr_output_current_reference_luminance} and {@link window_get_hdr_output_current_max_luminance}. This value is used by tonemapping and other {@link Environment} effects to ensure that bright colors are presented in the range that can be displayed by this window. Corresponds to {@link Window.get_output_max_linear_value}.
   */
  window_get_output_max_linear_value(window_id?: int): float;
  /**
   * Returns the bounding box of control, or menu item that was used to open the popup window, in the screen coordinate system.
   */
  window_get_popup_safe_rect(window: int): Rect2i;
  /** Returns the position of the client area of the given window on the screen. */
  window_get_position(window_id?: int): Vector2i;
  /**
   * Returns the position of the given window on the screen including the borders drawn by the operating system. See also {@link window_get_position}.
   */
  window_get_position_with_decorations(window_id?: int): Vector2i;
  /**
   * Returns left margins (`x`), right margins (`y`) and height (`z`) of the title that are safe to use (contains no buttons or other elements) when {@link WINDOW_FLAG_EXTEND_TO_TITLE} flag is set.
   */
  window_get_safe_title_margins(window_id?: int): Vector3i;
  /**
   * Returns the size of the window specified by `window_id` (in pixels), excluding the borders drawn by the operating system. This is also called the "client area". See also {@link window_get_size_with_decorations}, {@link window_set_size} and {@link window_get_position}.
   */
  window_get_size(window_id?: int): Vector2i;
  /**
   * Returns the size of the window specified by `window_id` (in pixels), including the borders drawn by the operating system. See also {@link window_get_size}.
   */
  window_get_size_with_decorations(window_id?: int): Vector2i;
  /**
   * Returns the estimated window title bar size (including text and window buttons) for the window specified by `window_id` (in pixels). This method does not change the window title.
   * **Note:** This method is implemented on macOS and Windows.
   */
  window_get_title_size(title: string | NodePath, window_id?: int): Vector2i;
  /** Returns the V-Sync mode of the given window. */
  window_get_vsync_mode(window_id?: int): int;
  /** Returns `true` if the window specified by `window_id` is focused. */
  window_is_focused(window_id?: int): boolean;
  /**
   * Returns `true` if HDR output is currently enabled for the window specified by `window_id`. The returned value may change dynamically based on system settings, screen capabilities, and which screen the window is currently on.
   */
  window_is_hdr_output_enabled(window_id?: int): boolean;
  /**
   * Returns `true` if HDR output is requested for the window specified by `window_id`. Corresponds to {@link Window.hdr_output_requested}.
   */
  window_is_hdr_output_requested(window_id?: int): boolean;
  /**
   * Returns `true` if the window specified by `window_id` supports HDR output. This depends on the platform, screen capabilities, system settings, and the screen the window is currently on.
   */
  window_is_hdr_output_supported(window_id?: int): boolean;
  /** Returns `true` if the given window can be maximized (the maximize button is enabled). */
  window_is_maximize_allowed(window_id?: int): boolean;
  /**
   * Returns `true` if double-clicking on a window's title should maximize it.
   * **Note:** This method is implemented only on macOS.
   */
  window_maximize_on_title_dbl_click(): boolean;
  /**
   * Returns `true` if double-clicking on a window's title should minimize it.
   * **Note:** This method is implemented only on macOS.
   */
  window_minimize_on_title_dbl_click(): boolean;
  /**
   * Moves the window specified by `window_id` to the foreground, so that it is visible over other windows.
   */
  window_move_to_foreground(window_id?: int): void;
  /**
   * Makes the window specified by `window_id` request attention, which is materialized by the window title and taskbar entry blinking until the window is focused. This usually has no visible effect if the window is currently focused. The exact behavior varies depending on the operating system.
   */
  window_request_attention(window_id?: int): void;
  /**
   * If `enable` is `true`, HDR output is requested for the window specified by `window_id`. The window will automatically switch between HDR and SDR if it is moved between screens, screen capabilities change, or system settings are modified. This will internally force {@link Viewport.use_hdr_2d} to be enabled on the main {@link Viewport}. All other {@link SubViewport} of the {@link Window} must have their {@link Viewport.use_hdr_2d} property enabled to produce HDR output. Corresponds to {@link Window.hdr_output_requested}.
   */
  window_request_hdr_output(enable: boolean, window_id?: int): void;
  /**
   * Sets the background color of the root window.
   * **Note:** This method is implemented only on Android.
   */
  window_set_color(color: Color): void;
  /**
   * Moves the window specified by `window_id` to the specified `screen`. See also {@link window_get_current_screen}.
   * **Note:** One of the following constants can be used as `screen`: {@link SCREEN_OF_MAIN_WINDOW}, {@link SCREEN_PRIMARY}, {@link SCREEN_WITH_MOUSE_FOCUS}, or {@link SCREEN_WITH_KEYBOARD_FOCUS}.
   * **Note:** This method is implemented on Linux/X11, macOS, and Windows.
   */
  window_set_current_screen(screen: int, window_id?: int): void;
  /**
   * Sets the `callback` that should be called when files are dropped from the operating system's file manager to the window specified by `window_id`. `callback` should take one {@link PackedStringArray} argument, which is the list of dropped files.
   * **Warning:** Advanced users only! Adding such a callback to a {@link Window} node will override its default implementation, which can introduce bugs.
   * **Note:** This method is implemented on Windows, macOS, Linux (X11/Wayland), and Web.
   */
  window_set_drop_files_callback(callback: Callable, window_id?: int): void;
  /**
   * If set to `true`, this window will always stay on top of its parent window, parent window will ignore input while this window is opened.
   * **Note:** On macOS, exclusive windows are confined to the same space (virtual desktop or screen) as the parent window.
   * **Note:** This method is implemented on macOS and Windows.
   */
  window_set_exclusive(window_id: int, exclusive: boolean): void;
  /** Enables or disables the given window's given `flag`. */
  window_set_flag(flag: int, enabled: boolean, window_id?: int): void;
  /**
   * Sets the maximum luminance in nits (cd/m²) for HDR output by the window specified by `window_id`. If `max_luminance` is negative, the window uses the screen's maximum luminance that is reported by the operating system. By default, this luminance is set to `-1.0` for every window. Typically this property should be left at this default value, but may optionally be exposed through in-game settings to allow the player to correct an inaccurate maximum luminance reported by the operating system. See also {@link window_get_hdr_output_current_max_luminance} and {@link window_get_hdr_output_max_luminance}.
   */
  window_set_hdr_output_max_luminance(max_luminance: float, window_id?: int): void;
  /**
   * Sets the reference white luminance in nits (cd/m²) for HDR output by the window specified by `window_id`. If `reference_luminance` is negative, the window automatically adjusts to the brightness set by the operating system. By default, this luminance is set to `-1.0` for every window. Typically this property should be left at this default value, but may optionally be exposed as an "HDR Brightness" in-game setting to allow the player to adjust the brightness of their game, independently of their device settings. See also {@link window_get_hdr_output_current_reference_luminance} and {@link window_get_hdr_output_reference_luminance}.
   */
  window_set_hdr_output_reference_luminance(reference_luminance: float, window_id?: int): void;
  /**
   * Sets whether Input Method Editor (https://en.wikipedia.org/wiki/Input_method) should be enabled for the window specified by `window_id`. See also {@link window_set_ime_position}.
   */
  window_set_ime_active(active: boolean, window_id?: int): void;
  /**
   * Sets the position of the Input Method Editor (https://en.wikipedia.org/wiki/Input_method) popup for the specified `window_id`. Only effective if {@link window_set_ime_active} was set to `true` for the specified `window_id`.
   */
  window_set_ime_position(position: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets the `callback` that should be called when any {@link InputEvent} is sent to the window specified by `window_id`.
   * **Warning:** Advanced users only! Adding such a callback to a {@link Window} node will override its default implementation, which can introduce bugs.
   */
  window_set_input_event_callback(callback: Callable, window_id?: int): void;
  /**
   * Sets the `callback` that should be called when text is entered using the virtual keyboard to the window specified by `window_id`.
   * **Warning:** Advanced users only! Adding such a callback to a {@link Window} node will override its default implementation, which can introduce bugs.
   */
  window_set_input_text_callback(callback: Callable, window_id?: int): void;
  /**
   * Sets the maximum size of the window specified by `window_id` in pixels. Normally, the user will not be able to drag the window to make it larger than the specified size. See also {@link window_get_max_size}.
   * **Note:** It's recommended to change this value using {@link Window.max_size} instead.
   * **Note:** Using third-party tools, it is possible for users to disable window geometry restrictions and therefore bypass this limit.
   */
  window_set_max_size(max_size: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets the minimum size for the given window to `min_size` in pixels. Normally, the user will not be able to drag the window to make it smaller than the specified size. See also {@link window_get_min_size}.
   * **Note:** It's recommended to change this value using {@link Window.min_size} instead.
   * **Note:** By default, the main window has a minimum size of `Vector2i(64, 64)`. This prevents issues that can arise when the window is resized to a near-zero size.
   * **Note:** Using third-party tools, it is possible for users to disable window geometry restrictions and therefore bypass this limit.
   */
  window_set_min_size(min_size: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets window mode for the given window to `mode`.
   * **Note:** On Android, setting it to {@link WINDOW_MODE_FULLSCREEN} or {@link WINDOW_MODE_EXCLUSIVE_FULLSCREEN} will enable immersive mode.
   * **Note:** Setting the window to full screen forcibly sets the borderless flag to `true`, so make sure to set it back to `false` when not wanted.
   */
  window_set_mode(mode: int, window_id?: int): void;
  /**
   * Sets a polygonal region of the window which accepts mouse events. Mouse events outside the region will be passed through.
   * Passing an empty array will disable passthrough support (all mouse events will be intercepted by the window, which is the default behavior).
   * **Note:** On Windows, the portion of a window that lies outside the region is not drawn, while on Linux (X11) and macOS it is.
   * **Note:** This method is implemented on Linux (X11), macOS and Windows.
   */
  window_set_mouse_passthrough(region: PackedVector2Array | Array<unknown>, window_id?: int): void;
  /**
   * Sets the bounding box of control, or menu item that was used to open the popup window, in the screen coordinate system. Clicking this area will not auto-close this popup.
   */
  window_set_popup_safe_rect(window: int, rect: Rect2i | Rect2): void;
  /**
   * Sets the position of the given window to `position`. On multi-monitor setups, the screen position is relative to the virtual desktop area. On multi-monitor setups with different screen resolutions or orientations, the origin may be located outside any display like this:
   * [codeblock lang=text]
   * * (0, 0)        +-------+
   * |       |
   * +-------------+ |       |
   * |             | |       |
   * |             | |       |
   * +-------------+ +-------+
   * [/codeblock]
   * See also {@link window_get_position} and {@link window_set_size}.
   * **Note:** It's recommended to change this value using {@link Window.position} instead.
   * **Note:** On Linux (Wayland): this method is a no-op.
   */
  window_set_position(position: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets the `callback` that will be called when the window specified by `window_id` is moved or resized.
   * **Warning:** Advanced users only! Adding such a callback to a {@link Window} node will override its default implementation, which can introduce bugs.
   */
  window_set_rect_changed_callback(callback: Callable, window_id?: int): void;
  /**
   * Sets the size of the given window to `size` (in pixels). See also {@link window_get_size} and {@link window_get_position}.
   * **Note:** It's recommended to change this value using {@link Window.size} instead.
   */
  window_set_size(size: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets the type and state of the progress bar on the taskbar/dock icon of the window specified by `window_id`. See {@link ProgressState} for possible values and how each mode behaves.
   * **Note:** This method is implemented only on Windows and macOS.
   * **Note:** On macOS, the progress bar is displayed only for the main window.
   */
  window_set_taskbar_progress_state(state: int, window_id?: int): void;
  /**
   * Creates a progress bar on the taskbar/dock icon of the window specified by `window_id` if it does not exist, sets the progress of the icon.
   * `value` acts as a relative percentage value, ranges from `0.0` (lowest) to `1.0` (highest).
   * **Note:** This method is implemented only on Windows and macOS.
   * **Note:** On macOS, the progress bar is displayed only for the main window.
   */
  window_set_taskbar_progress_value(value: float, window_id?: int): void;
  /**
   * Sets the title of the given window to `title`.
   * **Note:** It's recommended to change this value using {@link Window.title} instead.
   * **Note:** Avoid changing the window title every frame, as this can cause performance issues on certain window managers. Try to change the window title only a few times per second at most.
   */
  window_set_title(title: string | NodePath, window_id?: int): void;
  /**
   * Sets window transient parent. Transient window will be destroyed with its transient parent and will return focus to their parent when closed. The transient window is displayed on top of a non-exclusive full-screen parent window. Transient windows can't enter full-screen mode.
   * **Note:** It's recommended to change this value using {@link Window.transient} instead.
   * **Note:** The behavior might be different depending on the platform.
   */
  window_set_transient(window_id: int, parent_window_id: int): void;
  /**
   * Sets the V-Sync mode of the given window. See also {@link ProjectSettings.display/window/vsync/vsync_mode}.
   * Depending on the platform and used renderer, the engine will fall back to {@link VSYNC_ENABLED} if the desired mode is not supported.
   * **Note:** V-Sync modes other than {@link VSYNC_ENABLED} are only supported in the Forward+ and Mobile rendering methods, not Compatibility.
   */
  window_set_vsync_mode(vsync_mode: int, window_id?: int): void;
  /**
   * When {@link WINDOW_FLAG_EXTEND_TO_TITLE} flag is set, set offset to the center of the first titlebar button.
   * **Note:** This flag is implemented only on macOS.
   */
  window_set_window_buttons_offset(offset: Vector2i | Vector2, window_id?: int): void;
  /**
   * Sets the `callback` that will be called when an event occurs in the window specified by `window_id`.
   * **Warning:** Advanced users only! Adding such a callback to a {@link Window} node will override its default implementation, which can introduce bugs.
   */
  window_set_window_event_callback(callback: Callable, window_id?: int): void;
  /**
   * Starts an interactive drag operation on the window with the given `window_id`, using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's title bar. Using this method allows the window to participate in space switching, tiling, and other system features.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   */
  window_start_drag(window_id?: int): void;
  /**
   * Starts an interactive resize operation on the window with the given `window_id`, using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's edge.
   * **Note:** This method is implemented on Linux (X11/Wayland), macOS, and Windows.
   */
  window_start_resize(edge: int, window_id?: int): void;

  /**
   * Emitted when the device orientation changes. `orientation` is the new orientation.
   * Returns `1` for portrait, `2` for landscape, and `0` if the orientation is undefined.
   * **Note:** This method is implemented on Android and iOS.
   */
  orientation_changed: Signal<[int]>;

  // enum Feature
  /**
   * Display server supports global menu. This allows the application to display its menu items in the operating system's top bar. **macOS**
   */
  readonly FEATURE_GLOBAL_MENU: int;
  /**
   * Display server supports multiple windows that can be moved outside of the main window. **Windows, macOS, Linux (X11)**
   */
  readonly FEATURE_SUBWINDOWS: int;
  /** Display server supports touchscreen input. **Windows, Linux (X11), Android, iOS, Web** */
  readonly FEATURE_TOUCHSCREEN: int;
  /** Display server supports mouse input. **Windows, macOS, Linux (X11/Wayland), Android, Web** */
  readonly FEATURE_MOUSE: int;
  /**
   * Display server supports warping mouse coordinates to keep the mouse cursor constrained within an area, but looping when one of the edges is reached. **Windows, macOS, Linux (X11/Wayland)**
   */
  readonly FEATURE_MOUSE_WARP: int;
  /**
   * Display server supports setting and getting clipboard data. See also {@link FEATURE_CLIPBOARD_PRIMARY}. **Windows, macOS, Linux (X11/Wayland), Android, iOS, Web**
   */
  readonly FEATURE_CLIPBOARD: int;
  /**
   * Display server supports popping up a virtual keyboard when requested to input text without a physical keyboard. **Android, iOS, Web**
   */
  readonly FEATURE_VIRTUAL_KEYBOARD: int;
  /**
   * Display server supports setting the mouse cursor shape to be different from the default. **Windows, macOS, Linux (X11/Wayland), Android, Web**
   */
  readonly FEATURE_CURSOR_SHAPE: int;
  /**
   * Display server supports setting the mouse cursor shape to a custom image. **Windows, macOS, Linux (X11/Wayland), Web**
   */
  readonly FEATURE_CUSTOM_CURSOR_SHAPE: int;
  /**
   * Display server supports spawning text dialogs using the operating system's native look-and-feel. See {@link dialog_show}. **Windows, macOS**
   */
  readonly FEATURE_NATIVE_DIALOG: int;
  /**
   * Display server supports Input Method Editor (https://en.wikipedia.org/wiki/Input_method), which is commonly used for inputting Chinese/Japanese/Korean text. This is handled by the operating system, rather than by Godot. **Windows, macOS, Linux (X11)**
   */
  readonly FEATURE_IME: int;
  /**
   * Display server supports windows can use per-pixel transparency to make windows behind them partially or fully visible. **Windows, macOS, Linux (X11/Wayland), Android**
   */
  readonly FEATURE_WINDOW_TRANSPARENCY: int;
  /**
   * Display server supports querying the operating system's display scale factor. This allows automatically detecting the hiDPI display *reliably*, instead of guessing based on the screen resolution and the display's reported DPI (which might be unreliable due to broken monitor EDID). **Windows, Linux (Wayland), macOS**
   */
  readonly FEATURE_HIDPI: int;
  /**
   * Display server supports changing the window icon (usually displayed in the top-left corner). **Windows, macOS, Linux (X11/Wayland)**
   * **Note:** Use on Wayland requires the compositor to implement the xdg_toplevel_icon_v1 (https://wayland.app/protocols/xdg-toplevel-icon-v1#xdg_toplevel_icon_v1) protocol, which not all compositors do. See xdg_toplevel_icon_v1#compositor-support (https://wayland.app/protocols/xdg-toplevel-icon-v1#compositor-support) for more information on individual compositor support.
   */
  readonly FEATURE_ICON: int;
  /**
   * Display server supports changing the window icon (usually displayed in the top-left corner). **Windows, macOS**
   */
  readonly FEATURE_NATIVE_ICON: int;
  /** Display server supports changing the screen orientation. **Android, iOS** */
  readonly FEATURE_ORIENTATION: int;
  /**
   * Display server supports V-Sync status can be changed from the default (which is forced to be enabled platforms not supporting this feature). **Windows, macOS, Linux (X11/Wayland)**
   */
  readonly FEATURE_SWAP_BUFFERS: int;
  /**
   * Display server supports Primary clipboard can be used. This is a different clipboard from {@link FEATURE_CLIPBOARD}. **Linux (X11/Wayland)**
   */
  readonly FEATURE_CLIPBOARD_PRIMARY: int;
  /**
   * Display server supports text-to-speech. See `tts_*` methods. **Windows, macOS, Linux (X11/Wayland), Android, iOS, Web**
   */
  readonly FEATURE_TEXT_TO_SPEECH: int;
  /**
   * Display server supports expanding window content to the title. See {@link WINDOW_FLAG_EXTEND_TO_TITLE}. **macOS**
   */
  readonly FEATURE_EXTEND_TO_TITLE: int;
  /** Display server supports reading screen pixels. See {@link screen_get_pixel}. */
  readonly FEATURE_SCREEN_CAPTURE: int;
  /** Display server supports application status indicators. */
  readonly FEATURE_STATUS_INDICATOR: int;
  /** Display server supports native help system search callbacks. See {@link help_set_search_callbacks}. */
  readonly FEATURE_NATIVE_HELP: int;
  /**
   * Display server supports spawning text input dialogs using the operating system's native look-and-feel. See {@link dialog_input_text}. **Windows, macOS**
   */
  readonly FEATURE_NATIVE_DIALOG_INPUT: int;
  /**
   * Display server supports spawning dialogs for selecting files or directories using the operating system's native look-and-feel. See {@link file_dialog_show}. **Windows, macOS, Linux (X11/Wayland), Android**
   */
  readonly FEATURE_NATIVE_DIALOG_FILE: int;
  /**
   * The display server supports all features of {@link FEATURE_NATIVE_DIALOG_FILE}, with the added functionality of Options and native dialog file access to `res://` and `user://` paths. See {@link file_dialog_show} and {@link file_dialog_with_options_show}. **Windows, macOS, Linux (X11/Wayland)**
   */
  readonly FEATURE_NATIVE_DIALOG_FILE_EXTRA: int;
  /**
   * The display server supports initiating window drag and resize operations on demand. See {@link window_start_drag} and {@link window_start_resize}.
   */
  readonly FEATURE_WINDOW_DRAG: int;
  /** Display server supports {@link WINDOW_FLAG_EXCLUDE_FROM_CAPTURE} window flag. **Windows, macOS** */
  readonly FEATURE_SCREEN_EXCLUDE_FROM_CAPTURE: int;
  /** Display server supports embedding a window from another process. **Windows, Linux (X11), macOS** */
  readonly FEATURE_WINDOW_EMBEDDING: int;
  /** Native file selection dialog supports MIME types as filters. */
  readonly FEATURE_NATIVE_DIALOG_FILE_MIME: int;
  /** Display server supports system emoji and symbol picker. **Windows, macOS** */
  readonly FEATURE_EMOJI_AND_SYMBOL_PICKER: int;
  /** Display server supports native color picker. **Linux (X11/Wayland)** */
  readonly FEATURE_NATIVE_COLOR_PICKER: int;
  /**
   * Display server automatically fits popups according to the screen boundaries. Window nodes should not attempt to do that themselves.
   */
  readonly FEATURE_SELF_FITTING_WINDOWS: int;
  /**
   * Display server supports interaction with screen reader or Braille display. **Linux (X11/Wayland), macOS, Windows**
   */
  readonly FEATURE_ACCESSIBILITY_SCREEN_READER: int;
  /** Display server supports HDR output. **macOS, iOS, visionOS, Windows** */
  readonly FEATURE_HDR_OUTPUT: int;
  /** Display server supports putting the application in picture-in-picture mode. **Android** */
  readonly FEATURE_PIP_MODE: int;
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
  // enum MouseMode
  /** Makes the mouse cursor visible if it is hidden. */
  readonly MOUSE_MODE_VISIBLE: int;
  /** Makes the mouse cursor hidden if it is visible. */
  readonly MOUSE_MODE_HIDDEN: int;
  /**
   * Captures the mouse. The mouse will be hidden and its position locked at the center of the window manager's window.
   * **Note:** If you want to process the mouse's movement in this mode, you need to use {@link InputEventMouseMotion.relative}.
   */
  readonly MOUSE_MODE_CAPTURED: int;
  /** Confines the mouse cursor to the game window, and make it visible. */
  readonly MOUSE_MODE_CONFINED: int;
  /** Confines the mouse cursor to the game window, and make it hidden. */
  readonly MOUSE_MODE_CONFINED_HIDDEN: int;
  /** Max value of the {@link MouseMode}. */
  readonly MOUSE_MODE_MAX: int;
  // enum ScreenOrientation
  /** Default landscape orientation. */
  readonly SCREEN_LANDSCAPE: int;
  /** Default portrait orientation. */
  readonly SCREEN_PORTRAIT: int;
  /** Reverse landscape orientation (upside down). */
  readonly SCREEN_REVERSE_LANDSCAPE: int;
  /** Reverse portrait orientation (upside down). */
  readonly SCREEN_REVERSE_PORTRAIT: int;
  /** Automatic landscape orientation (default or reverse depending on sensor). */
  readonly SCREEN_SENSOR_LANDSCAPE: int;
  /** Automatic portrait orientation (default or reverse depending on sensor). */
  readonly SCREEN_SENSOR_PORTRAIT: int;
  /** Automatic landscape or portrait orientation (default or reverse depending on sensor). */
  readonly SCREEN_SENSOR: int;
  // enum VirtualKeyboardType
  /** Default text virtual keyboard. */
  readonly KEYBOARD_TYPE_DEFAULT: int;
  /** Multiline virtual keyboard. */
  readonly KEYBOARD_TYPE_MULTILINE: int;
  /** Virtual number keypad, useful for PIN entry. */
  readonly KEYBOARD_TYPE_NUMBER: int;
  /** Virtual number keypad, useful for entering fractional numbers. */
  readonly KEYBOARD_TYPE_NUMBER_DECIMAL: int;
  /** Virtual phone number keypad. */
  readonly KEYBOARD_TYPE_PHONE: int;
  /** Virtual keyboard with additional keys to assist with typing email addresses. */
  readonly KEYBOARD_TYPE_EMAIL_ADDRESS: int;
  /**
   * Virtual keyboard for entering a password. On most platforms, this should disable autocomplete and autocapitalization.
   * **Note:** This is not supported on Web. Instead, this behaves identically to {@link KEYBOARD_TYPE_DEFAULT}.
   */
  readonly KEYBOARD_TYPE_PASSWORD: int;
  /** Virtual keyboard with additional keys to assist with typing URLs. */
  readonly KEYBOARD_TYPE_URL: int;
  // enum CursorShape
  /**
   * Arrow cursor shape. This is the default when not pointing anything that overrides the mouse cursor, such as a {@link LineEdit} or {@link TextEdit}.
   */
  readonly CURSOR_ARROW: int;
  /**
   * I-beam cursor shape. This is used by default when hovering a control that accepts text input, such as {@link LineEdit} or {@link TextEdit}.
   */
  readonly CURSOR_IBEAM: int;
  /**
   * Pointing hand cursor shape. This is used by default when hovering a {@link LinkButton} or a URL tag in a {@link RichTextLabel}.
   */
  readonly CURSOR_POINTING_HAND: int;
  /**
   * Crosshair cursor. This is intended to be displayed when the user needs precise aim over an element, such as a rectangle selection tool or a color picker.
   */
  readonly CURSOR_CROSS: int;
  /**
   * Wait cursor. On most cursor themes, this displays a spinning icon *besides* the arrow. Intended to be used for non-blocking operations (when the user can do something else at the moment). See also {@link CURSOR_BUSY}.
   */
  readonly CURSOR_WAIT: int;
  /**
   * Wait cursor. On most cursor themes, this *replaces* the arrow with a spinning icon. Intended to be used for blocking operations (when the user can't do anything else at the moment). See also {@link CURSOR_WAIT}.
   */
  readonly CURSOR_BUSY: int;
  /**
   * Dragging hand cursor. This is displayed during drag-and-drop operations. See also {@link CURSOR_CAN_DROP}.
   */
  readonly CURSOR_DRAG: int;
  /**
   * "Can drop" cursor. This is displayed during drag-and-drop operations if hovering over a {@link Control} that can accept the drag-and-drop event. On most cursor themes, this displays a dragging hand with an arrow symbol besides it. See also {@link CURSOR_DRAG}.
   */
  readonly CURSOR_CAN_DROP: int;
  /**
   * Forbidden cursor. This is displayed during drag-and-drop operations if the hovered {@link Control} can't accept the drag-and-drop event.
   */
  readonly CURSOR_FORBIDDEN: int;
  /**
   * Vertical resize cursor. Intended to be displayed when the hovered {@link Control} can be vertically resized using the mouse. See also {@link CURSOR_VSPLIT}.
   */
  readonly CURSOR_VSIZE: int;
  /**
   * Horizontal resize cursor. Intended to be displayed when the hovered {@link Control} can be horizontally resized using the mouse. See also {@link CURSOR_HSPLIT}.
   */
  readonly CURSOR_HSIZE: int;
  /**
   * Secondary diagonal resize cursor (top-right/bottom-left). Intended to be displayed when the hovered {@link Control} can be resized on both axes at once using the mouse.
   */
  readonly CURSOR_BDIAGSIZE: int;
  /**
   * Main diagonal resize cursor (top-left/bottom-right). Intended to be displayed when the hovered {@link Control} can be resized on both axes at once using the mouse.
   */
  readonly CURSOR_FDIAGSIZE: int;
  /**
   * Move cursor. Intended to be displayed when the hovered {@link Control} can be moved using the mouse.
   */
  readonly CURSOR_MOVE: int;
  /**
   * Vertical split cursor. This is displayed when hovering a {@link Control} with splits that can be vertically resized using the mouse, such as {@link VSplitContainer}. On some cursor themes, this cursor may have the same appearance as {@link CURSOR_VSIZE}.
   */
  readonly CURSOR_VSPLIT: int;
  /**
   * Horizontal split cursor. This is displayed when hovering a {@link Control} with splits that can be horizontally resized using the mouse, such as {@link HSplitContainer}. On some cursor themes, this cursor may have the same appearance as {@link CURSOR_HSIZE}.
   */
  readonly CURSOR_HSPLIT: int;
  /**
   * Help cursor. On most cursor themes, this displays a question mark icon instead of the mouse cursor. Intended to be used when the user has requested help on the next element that will be clicked.
   */
  readonly CURSOR_HELP: int;
  /** Represents the size of the {@link CursorShape} enum. */
  readonly CURSOR_MAX: int;
  // enum FileDialogMode
  /** The native file dialog allows selecting one, and only one file. */
  readonly FILE_DIALOG_MODE_OPEN_FILE: int;
  /** The native file dialog allows selecting multiple files. */
  readonly FILE_DIALOG_MODE_OPEN_FILES: int;
  /** The native file dialog only allows selecting a directory, disallowing the selection of any file. */
  readonly FILE_DIALOG_MODE_OPEN_DIR: int;
  /** The native file dialog allows selecting one file or directory. */
  readonly FILE_DIALOG_MODE_OPEN_ANY: int;
  /** The native file dialog will warn when a file exists. */
  readonly FILE_DIALOG_MODE_SAVE_FILE: int;
  // enum WindowMode
  /**
   * Windowed mode, i.e. {@link Window} doesn't occupy the whole screen (unless set to the size of the screen).
   */
  readonly WINDOW_MODE_WINDOWED: int;
  /**
   * Minimized window mode, i.e. {@link Window} is not visible and available on window manager's window list. Normally happens when the minimize button is pressed.
   */
  readonly WINDOW_MODE_MINIMIZED: int;
  /**
   * Maximized window mode, i.e. {@link Window} will occupy whole screen area except task bar and still display its borders. Normally happens when the maximize button is pressed.
   */
  readonly WINDOW_MODE_MAXIMIZED: int;
  /**
   * Full screen mode with full multi-window support.
   * Full screen window covers the entire display area of a screen and has no decorations. The display's video mode is not changed.
   * **On Android:** This enables immersive mode.
   * **On macOS:** A new desktop is used to display the running project.
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) when enabling full screen mode.
   */
  readonly WINDOW_MODE_FULLSCREEN: int;
  /**
   * A single window full screen mode. This mode has less overhead, but only one window can be open on a given screen at a time (opening a child window or application switching will trigger a full screen transition).
   * Full screen window covers the entire display area of a screen and has no border or decorations. The display's video mode is not changed.
   * **Note:** This mode might not work with screen recording software.
   * **On Android:** This enables immersive mode.
   * **On Windows:** Depending on video driver, full screen transition might cause screens to go black for a moment.
   * **On macOS:** A new desktop is used to display the running project. Exclusive full screen mode prevents Dock and Menu from showing up when the mouse pointer is hovering the edge of the screen.
   * **On Linux (X11):** Exclusive full screen mode bypasses compositor.
   * **On Linux (Wayland):** Equivalent to {@link WINDOW_MODE_FULLSCREEN}.
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) when enabling full screen mode.
   */
  readonly WINDOW_MODE_EXCLUSIVE_FULLSCREEN: int;
  // enum ProgressState
  /** Stops displaying progress and returns the button to its normal state. */
  readonly PROGRESS_STATE_NOPROGRESS: int;
  /**
   * The progress indicator shows an indeterminate progress.
   * On Windows, the progress indicator does not grow in size, but cycles repeatedly along the length of the taskbar button by default.
   */
  readonly PROGRESS_STATE_INDETERMINATE: int;
  /** The progress indicator shows progress normally. */
  readonly PROGRESS_STATE_NORMAL: int;
  /**
   * The progress indicator shows that an error has occurred.
   * On Windows, the progress indicator turns red by default to show that an error has occurred in one of the windows that is broadcasting progress.
   */
  readonly PROGRESS_STATE_ERROR: int;
  /**
   * The progress indicator shows it was paused.
   * On Windows, the progress indicator turns yellow by default to show that progress is currently stopped in one of the windows but can be resumed by the user.
   */
  readonly PROGRESS_STATE_PAUSED: int;
  // enum WindowFlags
  /**
   * The window can't be resized by dragging its resize grip. It's still possible to resize the window using {@link window_set_size}. This flag is ignored for full screen windows.
   */
  readonly WINDOW_FLAG_RESIZE_DISABLED: int;
  /**
   * The window do not have native title bar and other decorations. This flag is ignored for full-screen windows.
   */
  readonly WINDOW_FLAG_BORDERLESS: int;
  /** The window is floating on top of all other windows. This flag is ignored for full-screen windows. */
  readonly WINDOW_FLAG_ALWAYS_ON_TOP: int;
  /**
   * The window background can be transparent.
   * **Note:** This flag has no effect if {@link is_window_transparency_available} returns `false`.
   * **Note:** Transparency support is implemented on Linux (X11/Wayland), macOS, and Windows, but availability might vary depending on GPU driver, display manager, and compositor capabilities.
   * **Note:** Transparency support is implemented on Android, but can only be enabled via {@link ProjectSettings.display/window/per_pixel_transparency/allowed}. This flag has no effect on Android.
   */
  readonly WINDOW_FLAG_TRANSPARENT: int;
  /** The window can't be focused. No-focus window will ignore all input, except mouse clicks. */
  readonly WINDOW_FLAG_NO_FOCUS: int;
  /**
   * Window is part of menu or {@link OptionButton} dropdown. This flag can't be changed when the window is visible. An active popup window will exclusively receive all input, without stealing focus from its parent. Popup windows are automatically closed when uses click outside it, or when an application is switched. Popup window must have transient parent set (see {@link window_set_transient}).
   */
  readonly WINDOW_FLAG_POPUP: int;
  /**
   * Window content is expanded to the full size of the window. Unlike borderless window, the frame is left intact and can be used to resize the window, title bar is transparent, but have minimize/maximize/close buttons.
   * Use {@link window_set_window_buttons_offset} to adjust minimize/maximize/close buttons offset.
   * Use {@link window_get_safe_title_margins} to determine area under the title bar that is not covered by decorations.
   * **Note:** This flag is implemented only on macOS.
   */
  readonly WINDOW_FLAG_EXTEND_TO_TITLE: int;
  /** All mouse events are passed to the underlying window of the same application. */
  readonly WINDOW_FLAG_MOUSE_PASSTHROUGH: int;
  /**
   * Window style is overridden, forcing sharp corners.
   * **Note:** This flag is implemented only on Windows (11).
   */
  readonly WINDOW_FLAG_SHARP_CORNERS: int;
  /**
   * Window is excluded from screenshots taken by {@link screen_get_image}, {@link screen_get_image_rect}, and {@link screen_get_pixel}.
   * **Note:** This flag is implemented on macOS and Windows (10, 20H1).
   * **Note:** Setting this flag will prevent standard screenshot methods from capturing a window image, but does **NOT** guarantee that other apps won't be able to capture an image. It should not be used as a DRM or security measure.
   */
  readonly WINDOW_FLAG_EXCLUDE_FROM_CAPTURE: int;
  /**
   * Signals the window manager that this window is supposed to be an implementation-defined "popup" (usually a floating, borderless, untileable and immovable child window).
   */
  readonly WINDOW_FLAG_POPUP_WM_HINT: int;
  /**
   * Window minimize button is disabled.
   * **Note:** This flag is implemented on macOS and Windows.
   */
  readonly WINDOW_FLAG_MINIMIZE_DISABLED: int;
  /**
   * Window maximize button is disabled.
   * **Note:** This flag is implemented on macOS and Windows.
   */
  readonly WINDOW_FLAG_MAXIMIZE_DISABLED: int;
  /** Represents the size of the {@link WindowFlags} enum. */
  readonly WINDOW_FLAG_MAX: int;
  // enum WindowEvent
  /** Sent when the mouse pointer enters the window. */
  readonly WINDOW_EVENT_MOUSE_ENTER: int;
  /** Sent when the mouse pointer exits the window. */
  readonly WINDOW_EVENT_MOUSE_EXIT: int;
  /** Sent when the window grabs focus. */
  readonly WINDOW_EVENT_FOCUS_IN: int;
  /** Sent when the window loses focus. */
  readonly WINDOW_EVENT_FOCUS_OUT: int;
  /** Sent when the user has attempted to close the window (e.g. close button is pressed). */
  readonly WINDOW_EVENT_CLOSE_REQUEST: int;
  /**
   * Sent when the device "Back" button is pressed.
   * **Note:** This event is implemented only on Android.
   */
  readonly WINDOW_EVENT_GO_BACK_REQUEST: int;
  /**
   * Sent when the window is moved to the display with different DPI, or display DPI is changed.
   * **Note:** This flag is implemented only on macOS and Linux (Wayland).
   */
  readonly WINDOW_EVENT_DPI_CHANGE: int;
  /**
   * Sent when the window title bar decoration is changed (e.g. {@link WINDOW_FLAG_EXTEND_TO_TITLE} is set or window entered/exited full screen mode).
   * **Note:** This flag is implemented only on macOS.
   */
  readonly WINDOW_EVENT_TITLEBAR_CHANGE: int;
  /**
   * Sent when the window has been forcibly closed by the display server. The window will immediately hide and clean any internal rendering references.
   * **Note:** This flag is implemented only on Linux (Wayland).
   */
  readonly WINDOW_EVENT_FORCE_CLOSE: int;
  // enum WindowResizeEdge
  /** Top-left edge of a window. */
  readonly WINDOW_EDGE_TOP_LEFT: int;
  /** Top edge of a window. */
  readonly WINDOW_EDGE_TOP: int;
  /** Top-right edge of a window. */
  readonly WINDOW_EDGE_TOP_RIGHT: int;
  /** Left edge of a window. */
  readonly WINDOW_EDGE_LEFT: int;
  /** Right edge of a window. */
  readonly WINDOW_EDGE_RIGHT: int;
  /** Bottom-left edge of a window. */
  readonly WINDOW_EDGE_BOTTOM_LEFT: int;
  /** Bottom edge of a window. */
  readonly WINDOW_EDGE_BOTTOM: int;
  /** Bottom-right edge of a window. */
  readonly WINDOW_EDGE_BOTTOM_RIGHT: int;
  /** Represents the size of the {@link WindowResizeEdge} enum. */
  readonly WINDOW_EDGE_MAX: int;
  // enum VSyncMode
  /**
   * No vertical synchronization, which means the engine will display frames as fast as possible (tearing may be visible). Framerate is unlimited (regardless of {@link Engine.max_fps}).
   */
  readonly VSYNC_DISABLED: int;
  /**
   * Default vertical synchronization mode, the image is displayed only on vertical blanking intervals (no tearing is visible). Framerate is limited by the monitor refresh rate (regardless of {@link Engine.max_fps}).
   */
  readonly VSYNC_ENABLED: int;
  /**
   * Behaves like {@link VSYNC_DISABLED} when the framerate drops below the screen's refresh rate to reduce stuttering (tearing may be visible). Otherwise, vertical synchronization is enabled to avoid tearing. Framerate is limited by the monitor refresh rate (regardless of {@link Engine.max_fps}). Behaves like {@link VSYNC_ENABLED} when using the Compatibility rendering method.
   */
  readonly VSYNC_ADAPTIVE: int;
  /**
   * Displays the most recent image in the queue on vertical blanking intervals, while rendering to the other images (no tearing is visible). Framerate is unlimited (regardless of {@link Engine.max_fps}).
   * Although not guaranteed, the images can be rendered as fast as possible, which may reduce input lag (also called "Fast" V-Sync mode). {@link VSYNC_MAILBOX} works best when at least twice as many frames as the display refresh rate are rendered. Behaves like {@link VSYNC_ENABLED} when using the Compatibility rendering method.
   */
  readonly VSYNC_MAILBOX: int;
  // enum HandleType
  /**
   * Display handle:
   * - Linux (X11): `X11::Display*` for the display.
   * - Linux (Wayland): `wl_display` for the display.
   * - Android: `EGLDisplay` for the display.
   */
  readonly DISPLAY_HANDLE: int;
  /**
   * Window handle:
   * - Windows: `HWND` for the window.
   * - Linux (X11): `X11::Window*` for the window.
   * - Linux (Wayland): `wl_surface` for the window.
   * - macOS: `NSWindow*` for the window.
   * - iOS: `UIViewController*` for the view controller.
   * - Android: `jObject` for the activity.
   */
  readonly WINDOW_HANDLE: int;
  /**
   * Window view:
   * - Windows: `HDC` for the window (only with the Compatibility renderer).
   * - macOS: `NSView*` for the window main view.
   * - iOS: `UIView*` for the window main view.
   */
  readonly WINDOW_VIEW: int;
  /**
   * OpenGL context (only with the Compatibility renderer):
   * - Windows: `HGLRC` for the window (native GL), or `EGLContext` for the window (ANGLE).
   * - Linux (X11): `GLXContext*` for the window.
   * - Linux (Wayland): `EGLContext` for the window.
   * - macOS: `NSOpenGLContext*` for the window (native GL), or `EGLContext` for the window (ANGLE).
   * - Android: `EGLContext` for the window.
   */
  readonly OPENGL_CONTEXT: int;
  /**
   * - Windows: `EGLDisplay` for the window (ANGLE).
   * - macOS: `EGLDisplay` for the window (ANGLE).
   * - Linux (Wayland): `EGLDisplay` for the window.
   */
  readonly EGL_DISPLAY: int;
  /**
   * - Windows: `EGLConfig` for the window (ANGLE).
   * - macOS: `EGLConfig` for the window (ANGLE).
   * - Linux (Wayland): `EGLConfig` for the window.
   */
  readonly EGL_CONFIG: int;
  /**
   * The GLX `VisualID` for the window.
   * **Note:** Only available on Linux when using X11.
   */
  readonly GLX_VISUALID: int;
  /**
   * The `GLXFBConfig` for the window.
   * **Note:** Only available on Linux when using X11.
   */
  readonly GLX_FBCONFIG: int;
  // enum TTSUtteranceEvent
  /** Utterance has begun to be spoken. */
  readonly TTS_UTTERANCE_STARTED: int;
  /** Utterance was successfully finished. */
  readonly TTS_UTTERANCE_ENDED: int;
  /** Utterance was canceled, or TTS service was unable to process it. */
  readonly TTS_UTTERANCE_CANCELED: int;
  /** Utterance reached a word or sentence boundary. */
  readonly TTS_UTTERANCE_BOUNDARY: int;

  /**
   * The ID that refers to a screen that does not exist. This is returned by some {@link DisplayServer} methods if no screen matches the requested result.
   */
  readonly INVALID_SCREEN: int;
  /**
   * Represents the screen containing the mouse pointer.
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   */
  readonly SCREEN_WITH_MOUSE_FOCUS: int;
  /**
   * Represents the screen containing the window with the keyboard focus.
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   */
  readonly SCREEN_WITH_KEYBOARD_FOCUS: int;
  /**
   * Represents the primary screen.
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   */
  readonly SCREEN_PRIMARY: int;
  /**
   * Represents the screen where the main window is located. This is usually the default value in functions that allow specifying one of several screens.
   * **Note:** On Android, iOS, Web, and Linux (Wayland), this constant always represents the screen at index `0`.
   */
  readonly SCREEN_OF_MAIN_WINDOW: int;
  /**
   * The ID of the main window spawned by the engine, which can be passed to methods expecting a `window_id`.
   */
  readonly MAIN_WINDOW_ID: int;
  /**
   * The ID that refers to a nonexistent window. This is returned by some {@link DisplayServer} methods if no window matches the requested result.
   */
  readonly INVALID_WINDOW_ID: int;
  /** The ID that refers to a nonexistent application status indicator. */
  readonly INVALID_INDICATOR_ID: int;
}
declare const DisplayServer: DisplayServer;

