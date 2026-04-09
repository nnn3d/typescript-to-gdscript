// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Base class for all windows, dialogs, and popups. */
declare class Window extends Viewport {
  /** The human-readable node description that is reported to assistive apps. */
  accessibility_description: string;
  /** The human-readable node name that is reported to assistive apps. */
  accessibility_name: string;
  /**
   * If `true`, the window will be on top of all other windows. Does not work if {@link transient} is enabled.
   */
  always_on_top: boolean;
  /**
   * Toggles if any text should automatically change to its translated version depending on the current locale.
   */
  auto_translate: boolean;
  /** If `true`, the window will have no borders. */
  borderless: boolean;
  /**
   * Specifies how the content's aspect behaves when the {@link Window} is resized. The base aspect is determined by {@link content_scale_size}.
   */
  content_scale_aspect: int;
  /**
   * Specifies the base scale of {@link Window}'s content when its {@link size} is equal to {@link content_scale_size}. See also {@link Viewport.get_stretch_transform}.
   */
  content_scale_factor: float;
  /** Specifies how the content is scaled when the {@link Window} is resized. */
  content_scale_mode: int;
  /**
   * The content's base size in "virtual" pixels. Not to be confused with {@link size}, which sets the actual window's physical size in pixels. If set to a value greater than `0` and {@link content_scale_mode} is set to a value other than {@link CONTENT_SCALE_MODE_DISABLED}, the {@link Window}'s content will be scaled when the window is resized to a different size. Higher values will make the content appear *smaller*, as it will be able to fit more of the project in view. On the root {@link Window}, this is set to match {@link ProjectSettings.display/window/size/viewport_width} and {@link ProjectSettings.display/window/size/viewport_height} by default.
   * For example, when using {@link CONTENT_SCALE_MODE_CANVAS_ITEMS} and {@link content_scale_size} set to `Vector2i(1280, 720)`, using a window size of `2560×1440` will make 2D elements appear at double their original size, as the content is scaled by a factor of `2.0` (`2560.0 / 1280.0 = 2.0`, `1440.0 / 720.0 = 2.0`).
   * See the Base size section of the Multiple resolutions documentation ($DOCS_URL/tutorials/rendering/multiple_resolutions.html#base-size) for details.
   */
  content_scale_size: Vector2i;
  /**
   * The policy to use to determine the final scale factor for 2D elements. This affects how {@link content_scale_factor} is applied, in addition to the automatic scale factor determined by {@link content_scale_size}.
   */
  content_scale_stretch: int;
  /** The screen the window is currently on. */
  current_screen: int;
  /**
   * If `true`, the {@link Window} is excluded from screenshots taken by {@link DisplayServer.screen_get_image}, {@link DisplayServer.screen_get_image_rect}, and {@link DisplayServer.screen_get_pixel}.
   * **Note:** This property is implemented on macOS and Windows.
   * **Note:** Enabling this setting will prevent standard screenshot methods from capturing a window image, but does **NOT** guarantee that other apps won't be able to capture an image. It should not be used as a DRM or security measure.
   */
  exclude_from_capture: boolean;
  /**
   * If `true`, the {@link Window} will be in exclusive mode. Exclusive windows are always on top of their parent and will block all input going to the parent {@link Window}.
   * Needs {@link transient} enabled to work.
   */
  exclusive: boolean;
  /**
   * If `true`, the {@link Window} contents is expanded to the full size of the window, window title bar is transparent.
   * **Note:** This property is implemented only on macOS.
   * **Note:** This property only works with native windows.
   */
  extend_to_title: boolean;
  /** If `true`, native window will be used regardless of parent viewport and project settings. */
  force_native: boolean;
  /**
   * If `true`, requests HDR output for the {@link Window}, falling back to SDR if not supported, and automatically switching between HDR and SDR as the window moves between screens, screen capabilities change, or system settings are modified. This will internally force {@link Viewport.use_hdr_2d} to be enabled on the main {@link Viewport}. All other {@link SubViewport} of this {@link Window} must have their {@link Viewport.use_hdr_2d} property enabled to produce HDR output.
   */
  hdr_output_requested: boolean;
  /** Specifies the initial type of position for the {@link Window}. */
  initial_position: int;
  /** If `true`, the {@link Window} width is expanded to keep the title bar text fully visible. */
  keep_title_visible: boolean;
  /**
   * If non-zero, the {@link Window} can't be resized to be bigger than this size.
   * **Note:** This property will be ignored if the value is lower than {@link min_size}.
   */
  max_size: Vector2i;
  /**
   * If `true`, the {@link Window}'s maximize button is disabled.
   * **Note:** If both minimize and maximize buttons are disabled, buttons are fully hidden, and only close button is visible.
   * **Note:** This property is implemented only on macOS and Windows.
   */
  maximize_disabled: boolean;
  /**
   * If non-zero, the {@link Window} can't be resized to be smaller than this size.
   * **Note:** This property will be ignored in favor of {@link get_contents_minimum_size} if {@link wrap_controls} is enabled and if its size is bigger.
   */
  min_size: Vector2i;
  /**
   * If `true`, the {@link Window}'s minimize button is disabled.
   * **Note:** If both minimize and maximize buttons are disabled, buttons are fully hidden, and only close button is visible.
   * **Note:** This property is implemented only on macOS and Windows.
   */
  minimize_disabled: boolean;
  /**
   * Set's the window's current mode.
   * **Note:** Fullscreen mode is not exclusive full screen on Windows and Linux.
   * **Note:** This method only works with native windows, i.e. the main window and {@link Window}-derived nodes when {@link Viewport.gui_embed_subwindows} is disabled in the main viewport.
   */
  mode: int;
  /**
   * If `true`, all mouse events will be passed to the underlying window of the same application. See also {@link mouse_passthrough_polygon}.
   * **Note:** This property is implemented on Linux (X11), macOS and Windows.
   * **Note:** This property only works with native windows.
   */
  mouse_passthrough: boolean;
  /**
   * Sets a polygonal region of the window which accepts mouse events. Mouse events outside the region will be passed through.
   * Passing an empty array will disable passthrough support (all mouse events will be intercepted by the window, which is the default behavior).
   * **Note:** This property is ignored if {@link mouse_passthrough} is set to `true`.
   * **Note:** On Windows, the portion of a window that lies outside the region is not drawn, while on Linux (X11) and macOS it is.
   * **Note:** This property is implemented on Linux (X11), macOS and Windows.
   */
  mouse_passthrough_polygon: PackedVector2Array;
  /**
   * If set, defines the window's custom decoration area which will receive mouse input, even if normal input to the window is blocked (such as when it has an exclusive child opened). See also {@link nonclient_window_input}.
   */
  nonclient_area: Rect2i;
  /**
   * If `true`, the {@link Window} will be considered a popup. Popups are sub-windows that don't show as separate windows in system's window manager's window list and will send close request when anything is clicked outside of them (unless {@link exclusive} is enabled).
   */
  popup_window: boolean;
  /**
   * If `true`, the {@link Window} will signal to the window manager that it is supposed to be an implementation-defined "popup" (usually a floating, borderless, untileable and immovable child window).
   */
  popup_wm_hint: boolean;
  /**
   * The window's position in pixels.
   * If {@link ProjectSettings.display/window/subwindows/embed_subwindows} is `false`, the position is in absolute screen coordinates. This typically applies to editor plugins. If the setting is `true`, the window's position is in the coordinates of its parent {@link Viewport}.
   * **Note:** This property only works if {@link initial_position} is set to {@link WINDOW_INITIAL_POSITION_ABSOLUTE}.
   */
  position: Vector2i;
  /**
   * If `true`, the {@link Window} will override the OS window style to display sharp corners.
   * **Note:** This property is implemented only on Windows (11).
   * **Note:** This property only works with native windows.
   */
  sharp_corners: boolean;
  /**
   * The window's size in pixels. See also {@link content_scale_size}, which doesn't set the window's physical size but affects how scaling works relative to the current {@link content_scale_mode}.
   */
  size: Vector2i;
  /**
   * The {@link Theme} resource this node and all its {@link Control} and {@link Window} children use. If a child node has its own {@link Theme} resource set, theme items are merged with child's definitions having higher priority.
   * **Note:** {@link Window} styles will have no effect unless the window is embedded.
   */
  theme: Theme | null;
  /**
   * The name of a theme type variation used by this {@link Window} to look up its own theme items. See {@link Control.theme_type_variation} for more details.
   */
  theme_type_variation: string;
  /**
   * The window's title. If the {@link Window} is native, title styles set in {@link Theme} will have no effect.
   */
  title: string;
  /**
   * If `true`, the {@link Window} is transient, i.e. it's considered a child of another {@link Window}. The transient window will be destroyed with its transient parent and will return focus to their parent when closed. The transient window is displayed on top of a non-exclusive full-screen parent window. Transient windows can't enter full-screen mode.
   * Note that behavior might be different depending on the platform.
   */
  transient: boolean;
  /**
   * If `true`, and the {@link Window} is {@link transient}, this window will (at the time of becoming visible) become transient to the currently focused window instead of the immediate parent window in the hierarchy. Note that the transient parent is assigned at the time this window becomes visible, so changing it afterwards has no effect until re-shown.
   */
  transient_to_focused: boolean;
  /**
   * If `true`, the {@link Window}'s background can be transparent. This is best used with embedded windows.
   * **Note:** Transparency support is implemented on Linux, macOS and Windows, but availability might vary depending on GPU driver, display manager, and compositor capabilities.
   * **Note:** This property has no effect if {@link ProjectSettings.display/window/per_pixel_transparency/allowed} is set to `false`.
   */
  transparent: boolean;
  /** If `true`, the {@link Window} can't be focused nor interacted with. It can still be visible. */
  unfocusable: boolean;
  /** If `true`, the window can't be resized. */
  unresizable: boolean;
  /** If `true`, the window is visible. */
  visible: boolean;
  /**
   * If `true`, the window's size will automatically update when a child node is added or removed, ignoring {@link min_size} if the new size is bigger.
   * If `false`, you need to call {@link child_controls_changed} manually.
   */
  wrap_controls: boolean;
  set_accessibility_description(value: string): void;
  get_accessibility_description(): string;
  set_accessibility_name(value: string): void;
  get_accessibility_name(): string;
  set_auto_translate(value: boolean): void;
  is_auto_translating(): boolean;
  set_content_scale_aspect(value: int): void;
  get_content_scale_aspect(): int;
  set_content_scale_factor(value: float): void;
  get_content_scale_factor(): float;
  set_content_scale_mode(value: int): void;
  get_content_scale_mode(): int;
  set_content_scale_size(value: Vector2i | Vector2): void;
  get_content_scale_size(): Vector2i;
  set_content_scale_stretch(value: int): void;
  get_content_scale_stretch(): int;
  set_current_screen(value: int): void;
  get_current_screen(): int;
  set_exclusive(value: boolean): void;
  is_exclusive(): boolean;
  set_force_native(value: boolean): void;
  get_force_native(): boolean;
  set_hdr_output_requested(value: boolean): void;
  is_hdr_output_requested(): boolean;
  set_initial_position(value: int): void;
  get_initial_position(): int;
  set_keep_title_visible(value: boolean): void;
  get_keep_title_visible(): boolean;
  set_max_size(value: Vector2i | Vector2): void;
  get_max_size(): Vector2i;
  set_min_size(value: Vector2i | Vector2): void;
  get_min_size(): Vector2i;
  set_mode(value: int): void;
  get_mode(): int;
  set_mouse_passthrough_polygon(value: PackedVector2Array | Array<unknown>): void;
  get_mouse_passthrough_polygon(): PackedVector2Array;
  set_nonclient_area(value: Rect2i | Rect2): void;
  get_nonclient_area(): Rect2i;
  set_position(value: Vector2i | Vector2): void;
  get_position(): Vector2i;
  set_size(value: Vector2i | Vector2): void;
  get_size(): Vector2i;
  set_theme(value: Theme | null): void;
  get_theme(): Theme | null;
  set_theme_type_variation(value: string): void;
  get_theme_type_variation(): string;
  set_title(value: string): void;
  get_title(): string;
  set_transient(value: boolean): void;
  is_transient(): boolean;
  set_transient_to_focused(value: boolean): void;
  is_transient_to_focused(): boolean;
  set_visible(value: boolean): void;
  is_visible(): boolean;
  set_wrap_controls(value: boolean): void;
  is_wrapping_controls(): boolean;

  /**
   * Virtual method to be implemented by the user. Overrides the value returned by {@link get_contents_minimum_size}.
   */
  _get_contents_minimum_size(): Vector2;
  /**
   * Creates a local override for a theme {@link Color} with the specified `name`. Local overrides always take precedence when fetching theme items for the control. An override can be removed with {@link remove_theme_color_override}.
   * See also {@link get_theme_color} and {@link Control.add_theme_color_override} for more details.
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
   * See also {@link get_theme_stylebox} and {@link Control.add_theme_stylebox_override} for more details.
   */
  add_theme_stylebox_override(name: string, stylebox: StyleBox): void;
  /**
   * Prevents `*_theme_*_override` methods from emitting {@link NOTIFICATION_THEME_CHANGED} until {@link end_bulk_theme_override} is called.
   */
  begin_bulk_theme_override(): void;
  /** Returns whether the window is being drawn to the screen. */
  can_draw(): boolean;
  /** Requests an update of the {@link Window} size to fit underlying {@link Control} nodes. */
  child_controls_changed(): void;
  /** Ends a bulk theme override update. See {@link begin_bulk_theme_override}. */
  end_bulk_theme_override(): void;
  /**
   * Returns the combined minimum size from the child {@link Control} nodes of the window. Use {@link child_controls_changed} to update it when child nodes have changed.
   * The value returned by this method can be overridden with {@link _get_contents_minimum_size}.
   */
  get_contents_minimum_size(): Vector2;
  /** Returns `true` if the `flag` is set. */
  get_flag(flag: int): boolean;
  /** Returns the focused window. */
  static get_focused_window(): Window | null;
  /** Returns layout direction and text writing direction. */
  get_layout_direction(): int;
  /**
   * Returns the maximum value for linear color components that can be displayed in this window, regardless of SDR or HDR output. Returns `1.0` if HDR is not enabled or not supported. This value is used by tonemapping and other {@link Environment} effects to ensure that bright colors are presented in the range that can be displayed by this window.
   * When using the Linear tonemapper without {@link Environment} effects or no {@link WorldEnvironment}, use the returned value to scale content to maximize the screen's brightness, such as for lasers or other bright effects. The following is an example that produces the brightest purple color that the screen can produce:
   * **Note:** You will need to convert sRGB colors to linear before multiplying by this value to get correct results.
   */
  get_output_max_linear_value(): float;
  /**
   * Returns the window's position including its border.
   * **Note:** If {@link visible} is `false`, this method returns the same value as {@link position}.
   */
  get_position_with_decorations(): Vector2i;
  /**
   * Returns the window's size including its border.
   * **Note:** If {@link visible} is `false`, this method returns the same value as {@link size}.
   */
  get_size_with_decorations(): Vector2i;
  /**
   * Returns a {@link Color} from the first matching {@link Theme} in the tree if that {@link Theme} has a color item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for more details.
   */
  get_theme_color(name: string, theme_type?: string): Color;
  /**
   * Returns a constant from the first matching {@link Theme} in the tree if that {@link Theme} has a constant item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for more details.
   */
  get_theme_constant(name: string, theme_type?: string): int;
  /**
   * Returns the default base scale value from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_base_scale} value.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_default_base_scale(): float;
  /**
   * Returns the default font from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_font} value.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_default_font(): Font | null;
  /**
   * Returns the default font size value from the first matching {@link Theme} in the tree if that {@link Theme} has a valid {@link Theme.default_font_size} value.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_default_font_size(): int;
  /**
   * Returns a {@link Font} from the first matching {@link Theme} in the tree if that {@link Theme} has a font item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_font(name: string, theme_type?: string): Font | null;
  /**
   * Returns a font size from the first matching {@link Theme} in the tree if that {@link Theme} has a font size item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_font_size(name: string, theme_type?: string): int;
  /**
   * Returns an icon from the first matching {@link Theme} in the tree if that {@link Theme} has an icon item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_icon(name: string, theme_type?: string): Texture2D | null;
  /**
   * Returns a {@link StyleBox} from the first matching {@link Theme} in the tree if that {@link Theme} has a stylebox item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  get_theme_stylebox(name: string, theme_type?: string): StyleBox | null;
  /** Returns the ID of the window. */
  get_window_id(): int;
  /** Causes the window to grab focus, allowing it to receive user input. */
  grab_focus(): void;
  /** Returns `true` if the window is focused. */
  has_focus(): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a color item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_color(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link Color} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_color_override}.
   */
  has_theme_color_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a constant item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_constant(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme constant with the specified `name` in this {@link Control} node.
   * See {@link add_theme_constant_override}.
   */
  has_theme_constant_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a font item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_font(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link Font} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_font_override}.
   */
  has_theme_font_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a font size item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_font_size(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme font size with the specified `name` in this {@link Control} node.
   * See {@link add_theme_font_size_override}.
   */
  has_theme_font_size_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has an icon item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_icon(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme icon with the specified `name` in this {@link Control} node.
   * See {@link add_theme_icon_override}.
   */
  has_theme_icon_override(name: string): boolean;
  /**
   * Returns `true` if there is a matching {@link Theme} in the tree that has a stylebox item with the specified `name` and `theme_type`.
   * See {@link Control.get_theme_color} for details.
   */
  has_theme_stylebox(name: string, theme_type?: string): boolean;
  /**
   * Returns `true` if there is a local override for a theme {@link StyleBox} with the specified `name` in this {@link Control} node.
   * See {@link add_theme_stylebox_override}.
   */
  has_theme_stylebox_override(name: string): boolean;
  /**
   * Hides the window. This is not the same as minimized state. Hidden window can't be interacted with and needs to be made visible with {@link show}.
   */
  hide(): void;
  /** Returns `true` if the window is currently embedded in another window. */
  is_embedded(): boolean;
  /** Returns `true` if the layout is right-to-left. */
  is_layout_rtl(): boolean;
  /** Returns `true` if the window can be maximized (the maximize button is enabled). */
  is_maximize_allowed(): boolean;
  /** Returns `true` if font oversampling is enabled. See {@link set_use_font_oversampling}. */
  is_using_font_oversampling(): boolean;
  /**
   * Centers the window in the current screen. If the window is embedded, it is centered in the embedder {@link Viewport} instead.
   */
  move_to_center(): void;
  /** Causes the window to grab focus, allowing it to receive user input. */
  move_to_foreground(): void;
  /**
   * Shows the {@link Window} and makes it transient (see {@link transient}). If `rect` is provided, it will be set as the {@link Window}'s size. Fails if called on the main window.
   * If {@link ProjectSettings.display/window/subwindows/embed_subwindows} is `true` (single-window mode), `rect`'s coordinates are global and relative to the main window's top-left corner (excluding window decorations). If `rect`'s position coordinates are negative, the window will be located outside the main window and may not be visible as a result.
   * If {@link ProjectSettings.display/window/subwindows/embed_subwindows} is `false` (multi-window mode), `rect`'s coordinates are global and relative to the top-left corner of the leftmost screen. If `rect`'s position coordinates are negative, the window will be placed at the top-left corner of the screen.
   * **Note:** `rect` must be in global coordinates if specified.
   */
  popup(rect?: Rect2i | Rect2): void;
  /**
   * Popups the {@link Window} at the center of the current screen, with optionally given minimum size. If the {@link Window} is embedded, it will be centered in the parent {@link Viewport} instead.
   * **Note:** Calling it with the default value of `minsize` is equivalent to calling it with {@link size}.
   */
  popup_centered(minsize?: Vector2i | Vector2): void;
  /**
   * Popups the {@link Window} centered inside its parent {@link Window}. `fallback_ratio` determines the maximum size of the {@link Window}, in relation to its parent.
   * **Note:** Calling it with the default value of `minsize` is equivalent to calling it with {@link size}.
   */
  popup_centered_clamped(minsize?: Vector2i | Vector2, fallback_ratio?: float): void;
  /**
   * If {@link Window} is embedded, popups the {@link Window} centered inside its embedder and sets its size as a `ratio` of embedder's size.
   * If {@link Window} is a native window, popups the {@link Window} centered inside the screen of its parent {@link Window} and sets its size as a `ratio` of the screen size.
   */
  popup_centered_ratio(ratio?: float): void;
  /**
   * Attempts to parent this dialog to the last exclusive window relative to `from_node`, and then calls {@link Window.popup} on it. The dialog must have no current parent, otherwise the method fails.
   * See also {@link set_unparent_when_invisible} and {@link Node.get_last_exclusive_window}.
   */
  popup_exclusive(from_node: Node, rect?: Rect2i | Rect2): void;
  /**
   * Attempts to parent this dialog to the last exclusive window relative to `from_node`, and then calls {@link Window.popup_centered} on it. The dialog must have no current parent, otherwise the method fails.
   * See also {@link set_unparent_when_invisible} and {@link Node.get_last_exclusive_window}.
   */
  popup_exclusive_centered(from_node: Node, minsize?: Vector2i | Vector2): void;
  /**
   * Attempts to parent this dialog to the last exclusive window relative to `from_node`, and then calls {@link Window.popup_centered_clamped} on it. The dialog must have no current parent, otherwise the method fails.
   * See also {@link set_unparent_when_invisible} and {@link Node.get_last_exclusive_window}.
   */
  popup_exclusive_centered_clamped(from_node: Node, minsize?: Vector2i | Vector2, fallback_ratio?: float): void;
  /**
   * Attempts to parent this dialog to the last exclusive window relative to `from_node`, and then calls {@link Window.popup_centered_ratio} on it. The dialog must have no current parent, otherwise the method fails.
   * See also {@link set_unparent_when_invisible} and {@link Node.get_last_exclusive_window}.
   */
  popup_exclusive_centered_ratio(from_node: Node, ratio?: float): void;
  /**
   * Attempts to parent this dialog to the last exclusive window relative to `from_node`, and then calls {@link Window.popup_on_parent} on it. The dialog must have no current parent, otherwise the method fails.
   * See also {@link set_unparent_when_invisible} and {@link Node.get_last_exclusive_window}.
   */
  popup_exclusive_on_parent(from_node: Node, parent_rect: Rect2i | Rect2): void;
  /**
   * Popups the {@link Window} with a position shifted by parent {@link Window}'s position. If the {@link Window} is embedded, has the same effect as {@link popup}.
   */
  popup_on_parent(parent_rect: Rect2i | Rect2): void;
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
   * Tells the OS that the {@link Window} needs an attention. This makes the window stand out in some way depending on the system, e.g. it might blink on the task bar.
   */
  request_attention(): void;
  /**
   * Resets the size to the minimum size, which is the max of {@link min_size} and (if {@link wrap_controls} is enabled) {@link get_contents_minimum_size}. This is equivalent to calling `set_size(Vector2i())` (or any size below the minimum).
   */
  reset_size(): void;
  /** Sets a specified window flag. */
  set_flag(flag: int, enabled: boolean): void;
  /** If `active` is `true`, enables system's native IME (Input Method Editor). */
  set_ime_active(active: boolean): void;
  /** Moves IME to the given position. */
  set_ime_position(position: Vector2i | Vector2): void;
  /**
   * Sets layout direction and text writing direction. Right-to-left layouts are necessary for certain languages (e.g. Arabic and Hebrew).
   */
  set_layout_direction(direction: int): void;
  /**
   * Sets the type and state of the progress bar on the taskbar/dock icon of the {@link Window}. See {@link DisplayServer.ProgressState} for possible values and how each mode behaves.
   * **Note:** This method is implemented only on Windows and macOS.
   */
  set_taskbar_progress_state(state: int): void;
  /**
   * Creates a progress bar on the taskbar/dock icon of the {@link Window} if it does not exist, sets the progress of the icon.
   * `value` acts as a relative percentage value, ranges from `0.0` (lowest) to `1.0` (highest).
   * **Note:** This method is implemented only on Windows and macOS.
   */
  set_taskbar_progress_value(value: float): void;
  /**
   * If `unparent` is `true`, the window is automatically unparented when going invisible.
   * **Note:** Make sure to keep a reference to the node, otherwise it will be orphaned. You also need to manually call {@link Node.queue_free} to free the window if it's not parented.
   */
  set_unparent_when_invisible(unparent: boolean): void;
  /** Enables font oversampling. This makes fonts look better when they are scaled up. */
  set_use_font_oversampling(enable: boolean): void;
  /**
   * Makes the {@link Window} appear. This enables interactions with the {@link Window} and doesn't change any of its property other than visibility (unlike e.g. {@link popup}).
   */
  show(): void;
  /**
   * Starts an interactive drag operation on the window, using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's title bar. Using this method allows the window to participate in space switching, tiling, and other system features.
   */
  start_drag(): void;
  /**
   * Starts an interactive resize operation on the window, using the current mouse position. Call this method when handling a mouse button being pressed to simulate a pressed event on the window's edge.
   */
  start_resize(edge: int): void;

  /** Emitted right after {@link popup} call, before the {@link Window} appears or does anything. */
  about_to_popup: Signal<[]>;
  /**
   * Emitted when the {@link Window}'s close button is pressed or when {@link popup_window} is enabled and user clicks outside the window.
   * This signal can be used to handle window closing, e.g. by connecting it to {@link hide}.
   */
  close_requested: Signal<[]>;
  /**
   * Emitted when the {@link Window}'s DPI changes as a result of OS-level changes (e.g. moving the window from a Retina display to a lower resolution one).
   * **Note:** Only implemented on macOS and Linux (Wayland).
   */
  dpi_changed: Signal<[]>;
  /**
   * Emitted when files are dragged from the OS file manager and dropped in the game window. The argument is a list of file paths.
   * **Note:** This signal only works with native windows, i.e. the main window and {@link Window}-derived nodes when {@link Viewport.gui_embed_subwindows} is disabled in the main viewport.
   */
  files_dropped: Signal<[PackedStringArray]>;
  /** Emitted when the {@link Window} gains focus. */
  focus_entered: Signal<[]>;
  /** Emitted when the {@link Window} loses its focus. */
  focus_exited: Signal<[]>;
  /**
   * Emitted when a go back request is sent (e.g. pressing the "Back" button on Android), right after {@link Node.NOTIFICATION_WM_GO_BACK_REQUEST}.
   */
  go_back_requested: Signal<[]>;
  /**
   * Emitted when the mouse cursor enters the {@link Window}'s visible area, that is not occluded behind other {@link Control}s or windows, provided its {@link Viewport.gui_disable_input} is `false` and regardless if it's currently focused or not.
   */
  mouse_entered: Signal<[]>;
  /**
   * Emitted when the mouse cursor leaves the {@link Window}'s visible area, that is not occluded behind other {@link Control}s or windows, provided its {@link Viewport.gui_disable_input} is `false` and regardless if it's currently focused or not.
   */
  mouse_exited: Signal<[]>;
  /**
   * Emitted when the mouse event is received by the custom decoration area defined by {@link nonclient_area}, and normal input to the window is blocked (such as when it has an exclusive child opened). `event`'s position is in the embedder's coordinate system.
   */
  nonclient_window_input: Signal<[InputEvent]>;
  /** Emitted when the {@link NOTIFICATION_THEME_CHANGED} notification is sent. */
  theme_changed: Signal<[]>;
  /** Emitted when window title bar text is changed. */
  title_changed: Signal<[]>;
  /**
   * Emitted when window title bar decorations are changed, e.g. macOS window enter/exit full screen mode, or extend-to-title flag is changed.
   */
  titlebar_changed: Signal<[]>;
  /** Emitted when {@link Window} is made visible or disappears. */
  visibility_changed: Signal<[]>;
  /**
   * Emitted when the {@link Window} is currently focused and receives any input, passing the received event as an argument. The event's position, if present, is in the embedder's coordinate system.
   */
  window_input: Signal<[InputEvent]>;

  // enum Mode
  /**
   * Windowed mode, i.e. {@link Window} doesn't occupy the whole screen (unless set to the size of the screen).
   */
  static readonly MODE_WINDOWED: int;
  /**
   * Minimized window mode, i.e. {@link Window} is not visible and available on window manager's window list. Normally happens when the minimize button is pressed.
   */
  static readonly MODE_MINIMIZED: int;
  /**
   * Maximized window mode, i.e. {@link Window} will occupy whole screen area except task bar and still display its borders. Normally happens when the maximize button is pressed.
   */
  static readonly MODE_MAXIMIZED: int;
  /**
   * Full screen mode with full multi-window support.
   * Full screen window covers the entire display area of a screen and has no decorations. The display's video mode is not changed.
   * **On Android:** This enables immersive mode.
   * **On macOS:** A new desktop is used to display the running project.
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) when enabling full screen mode.
   */
  static readonly MODE_FULLSCREEN: int;
  /**
   * A single window full screen mode. This mode has less overhead, but only one window can be open on a given screen at a time (opening a child window or application switching will trigger a full screen transition).
   * Full screen window covers the entire display area of a screen and has no border or decorations. The display's video mode is not changed.
   * **Note:** This mode might not work with screen recording software.
   * **On Android:** This enables immersive mode.
   * **On Windows:** Depending on video driver, full screen transition might cause screens to go black for a moment.
   * **On macOS:** A new desktop is used to display the running project. Exclusive full screen mode prevents Dock and Menu from showing up when the mouse pointer is hovering the edge of the screen.
   * **On Linux (X11):** Exclusive full screen mode bypasses compositor.
   * **On Linux (Wayland):** Equivalent to {@link MODE_FULLSCREEN}.
   * **Note:** Regardless of the platform, enabling full screen will change the window size to match the monitor's size. Therefore, make sure your project supports multiple resolutions ($DOCS_URL/tutorials/rendering/multiple_resolutions.html) when enabling full screen mode.
   */
  static readonly MODE_EXCLUSIVE_FULLSCREEN: int;
  // enum Flags
  /**
   * The window can't be resized by dragging its resize grip. It's still possible to resize the window using {@link size}. This flag is ignored for full screen windows. Set with {@link unresizable}.
   */
  static readonly FLAG_RESIZE_DISABLED: int;
  /**
   * The window do not have native title bar and other decorations. This flag is ignored for full-screen windows. Set with {@link borderless}.
   */
  static readonly FLAG_BORDERLESS: int;
  /**
   * The window is floating on top of all other windows. This flag is ignored for full-screen windows. Set with {@link always_on_top}.
   */
  static readonly FLAG_ALWAYS_ON_TOP: int;
  /**
   * The window background can be transparent. Set with {@link transparent}.
   * **Note:** This flag has no effect if either {@link ProjectSettings.display/window/per_pixel_transparency/allowed}, or the window's {@link Viewport.transparent_bg} is set to `false`.
   */
  static readonly FLAG_TRANSPARENT: int;
  /**
   * The window can't be focused. No-focus window will ignore all input, except mouse clicks. Set with {@link unfocusable}.
   */
  static readonly FLAG_NO_FOCUS: int;
  /**
   * Window is part of menu or {@link OptionButton} dropdown. This flag can't be changed when the window is visible. An active popup window will exclusively receive all input, without stealing focus from its parent. Popup windows are automatically closed when uses click outside it, or when an application is switched. Popup window must have transient parent set (see {@link transient}).
   * **Note:** This flag has no effect in embedded windows (unless said window is a {@link Popup}).
   */
  static readonly FLAG_POPUP: int;
  /**
   * Window content is expanded to the full size of the window. Unlike borderless window, the frame is left intact and can be used to resize the window, title bar is transparent, but have minimize/maximize/close buttons. Set with {@link extend_to_title}.
   * **Note:** This flag is implemented only on macOS.
   * **Note:** This flag has no effect in embedded windows.
   */
  static readonly FLAG_EXTEND_TO_TITLE: int;
  /**
   * All mouse events are passed to the underlying window of the same application.
   * **Note:** This flag has no effect in embedded windows.
   */
  static readonly FLAG_MOUSE_PASSTHROUGH: int;
  /**
   * Window style is overridden, forcing sharp corners.
   * **Note:** This flag has no effect in embedded windows.
   * **Note:** This flag is implemented only on Windows (11).
   */
  static readonly FLAG_SHARP_CORNERS: int;
  /**
   * Windows is excluded from screenshots taken by {@link DisplayServer.screen_get_image}, {@link DisplayServer.screen_get_image_rect}, and {@link DisplayServer.screen_get_pixel}.
   * **Note:** This flag has no effect in embedded windows.
   * **Note:** This flag is implemented on macOS and Windows (10, 20H1).
   * **Note:** Setting this flag will prevent standard screenshot methods from capturing a window image, but does **NOT** guarantee that other apps won't be able to capture an image. It should not be used as a DRM or security measure.
   */
  static readonly FLAG_EXCLUDE_FROM_CAPTURE: int;
  /**
   * Signals the window manager that this window is supposed to be an implementation-defined "popup" (usually a floating, borderless, untileable and immovable child window).
   */
  static readonly FLAG_POPUP_WM_HINT: int;
  /**
   * Window minimize button is disabled.
   * **Note:** This flag is implemented on macOS and Windows.
   */
  static readonly FLAG_MINIMIZE_DISABLED: int;
  /**
   * Window maximize button is disabled.
   * **Note:** This flag is implemented on macOS and Windows.
   */
  static readonly FLAG_MAXIMIZE_DISABLED: int;
  /** Max value of the {@link Flags}. */
  static readonly FLAG_MAX: int;
  // enum ContentScaleMode
  /**
   * The content will not be scaled to match the {@link Window}'s size ({@link content_scale_size} is ignored).
   */
  static readonly CONTENT_SCALE_MODE_DISABLED: int;
  /**
   * The content will be rendered at the target size. This is more performance-expensive than {@link CONTENT_SCALE_MODE_VIEWPORT}, but provides better results.
   */
  static readonly CONTENT_SCALE_MODE_CANVAS_ITEMS: int;
  /**
   * The content will be rendered at the base size and then scaled to the target size. More performant than {@link CONTENT_SCALE_MODE_CANVAS_ITEMS}, but results in pixelated image.
   */
  static readonly CONTENT_SCALE_MODE_VIEWPORT: int;
  // enum ContentScaleAspect
  /** The aspect will be ignored. Scaling will simply stretch the content to fit the target size. */
  static readonly CONTENT_SCALE_ASPECT_IGNORE: int;
  /**
   * The content's aspect will be preserved. If the target size has different aspect from the base one, the image will be centered and black bars will appear on left and right sides.
   */
  static readonly CONTENT_SCALE_ASPECT_KEEP: int;
  /**
   * The content can be expanded vertically. Scaling horizontally will result in keeping the width ratio and then black bars on left and right sides.
   */
  static readonly CONTENT_SCALE_ASPECT_KEEP_WIDTH: int;
  /**
   * The content can be expanded horizontally. Scaling vertically will result in keeping the height ratio and then black bars on top and bottom sides.
   */
  static readonly CONTENT_SCALE_ASPECT_KEEP_HEIGHT: int;
  /**
   * The content's aspect will be preserved. If the target size has different aspect from the base one, the content will stay in the top-left corner and add an extra visible area in the stretched space.
   */
  static readonly CONTENT_SCALE_ASPECT_EXPAND: int;
  // enum ContentScaleStretch
  /**
   * The content will be stretched according to a fractional factor. This fills all the space available in the window, but allows "pixel wobble" to occur due to uneven pixel scaling.
   */
  static readonly CONTENT_SCALE_STRETCH_FRACTIONAL: int;
  /**
   * The content will be stretched only according to an integer factor, preserving sharp pixels. This may leave a black background visible on the window's edges depending on the window size.
   */
  static readonly CONTENT_SCALE_STRETCH_INTEGER: int;
  // enum LayoutDirection
  /** Automatic layout direction, determined from the parent window layout direction. */
  static readonly LAYOUT_DIRECTION_INHERITED: int;
  /** Automatic layout direction, determined from the current locale. */
  static readonly LAYOUT_DIRECTION_APPLICATION_LOCALE: int;
  /** Left-to-right layout direction. */
  static readonly LAYOUT_DIRECTION_LTR: int;
  /** Right-to-left layout direction. */
  static readonly LAYOUT_DIRECTION_RTL: int;
  /** Automatic layout direction, determined from the system locale. */
  static readonly LAYOUT_DIRECTION_SYSTEM_LOCALE: int;
  /** Represents the size of the {@link LayoutDirection} enum. */
  static readonly LAYOUT_DIRECTION_MAX: int;
  static readonly LAYOUT_DIRECTION_LOCALE: int;
  // enum WindowInitialPosition
  /** Initial window position is determined by {@link position}. */
  static readonly WINDOW_INITIAL_POSITION_ABSOLUTE: int;
  /** Initial window position is the center of the primary screen. */
  static readonly WINDOW_INITIAL_POSITION_CENTER_PRIMARY_SCREEN: int;
  /** Initial window position is the center of the main window screen. */
  static readonly WINDOW_INITIAL_POSITION_CENTER_MAIN_WINDOW_SCREEN: int;
  /** Initial window position is the center of {@link current_screen} screen. */
  static readonly WINDOW_INITIAL_POSITION_CENTER_OTHER_SCREEN: int;
  /** Initial window position is the center of the screen containing the mouse pointer. */
  static readonly WINDOW_INITIAL_POSITION_CENTER_SCREEN_WITH_MOUSE_FOCUS: int;
  /** Initial window position is the center of the screen containing the window with the keyboard focus. */
  static readonly WINDOW_INITIAL_POSITION_CENTER_SCREEN_WITH_KEYBOARD_FOCUS: int;

  /** Emitted when {@link Window}'s visibility changes, right before {@link visibility_changed}. */
  static readonly NOTIFICATION_VISIBILITY_CHANGED: int;
  /**
   * Sent when the node needs to refresh its theme items. This happens in one of the following cases:
   * - The {@link theme} property is changed on this node or any of its ancestors.
   * - The {@link theme_type_variation} property is changed on this node.
   * - The node enters the scene tree.
   * **Note:** As an optimization, this notification won't be sent from changes that occur while this node is outside of the scene tree. Instead, all of the theme item updates can be applied at once when the node enters the scene tree.
   */
  static readonly NOTIFICATION_THEME_CHANGED: int;
}
