// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A control that provides a horizontal bar with tabs. */
declare class TabBar<Tree extends object = any> extends Control<Tree> {
  /**
   * If `true`, tabs overflowing this node's width will be hidden, displaying two navigation buttons instead. Otherwise, this node's minimum size is updated so that all tabs are visible.
   */
  clip_tabs: boolean;
  /** If `true`, middle-clicking on a tab will emit the {@link tab_close_pressed} signal. */
  close_with_middle_mouse: boolean;
  /**
   * The index of the current selected tab. A value of `-1` means that no tab is selected and can only be set when {@link deselect_enabled} is `true` or if all tabs are hidden or disabled.
   */
  current_tab: int;
  /**
   * If `true`, all tabs can be deselected so that no tab is selected. Click on the current tab to deselect it.
   */
  deselect_enabled: boolean;
  /** If `true`, tabs can be rearranged with mouse drag. */
  drag_to_rearrange_enabled: boolean;
  /**
   * <member name="max_tab_width" type="int" setter="set_max_tab_width" getter="get_max_tab_width" default="0">
   * Sets the maximum width which all tabs should be limited to. Unlimited if set to `0`.
   */
  focus_mode: int;
  /** If `true`, the tab offset will be changed to keep the currently selected tab visible. */
  scroll_to_selected: boolean;
  /** if `true`, the mouse's scroll wheel can be used to navigate the scroll view. */
  scrolling_enabled: boolean;
  /** If `true`, enables selecting a tab with the right mouse button. */
  select_with_rmb: boolean;
  /**
   * If `true`, hovering over a tab while dragging something will switch to that tab. Does not have effect when hovering another tab to rearrange. The delay for when this happens is dictated by .
   */
  switch_on_drag_hover: boolean;
  /** The horizontal alignment of the tabs. */
  tab_alignment: int;
  /** When the close button will appear on the tabs. */
  tab_close_display_policy: int;
  /** The number of tabs currently in the bar. */
  tab_count: int;
  /**
   * {@link TabBar}s with the same rearrange group ID will allow dragging the tabs between them. Enable drag with {@link drag_to_rearrange_enabled}.
   * Setting this to `-1` will disable rearranging between {@link TabBar}s.
   */
  tabs_rearrange_group: int;
  set_clip_tabs(value: boolean): void;
  get_clip_tabs(): boolean;
  set_close_with_middle_mouse(value: boolean): void;
  get_close_with_middle_mouse(): boolean;
  set_current_tab(value: int): void;
  get_current_tab(): int;
  set_deselect_enabled(value: boolean): void;
  get_deselect_enabled(): boolean;
  set_drag_to_rearrange_enabled(value: boolean): void;
  get_drag_to_rearrange_enabled(): boolean;
  set_scroll_to_selected(value: boolean): void;
  get_scroll_to_selected(): boolean;
  set_scrolling_enabled(value: boolean): void;
  get_scrolling_enabled(): boolean;
  set_select_with_rmb(value: boolean): void;
  get_select_with_rmb(): boolean;
  set_switch_on_drag_hover(value: boolean): void;
  get_switch_on_drag_hover(): boolean;
  set_tab_alignment(value: int): void;
  get_tab_alignment(): int;
  set_tab_close_display_policy(value: int): void;
  get_tab_close_display_policy(): int;
  set_tab_count(value: int): void;
  get_tab_count(): int;
  set_tabs_rearrange_group(value: int): void;
  get_tabs_rearrange_group(): int;

  /** Adds a new tab. */
  add_tab(title?: string, icon?: Texture2D): void;
  /** Clears all tabs. */
  clear_tabs(): void;
  /** Moves the scroll view to make the tab visible. */
  ensure_tab_visible(idx: int): void;
  /**
   * Returns `true` if the offset buttons (the ones that appear when there's not enough space for all tabs) are visible.
   */
  get_offset_buttons_visible(): boolean;
  /** Returns the previously active tab index. */
  get_previous_tab(): int;
  /**
   * Returns the icon for the right button of the tab at index `tab_idx` or `null` if the right button has no icon.
   */
  get_tab_button_icon(tab_idx: int): Texture2D;
  /** Returns the icon for the tab at index `tab_idx` or `null` if the tab has no icon. */
  get_tab_icon(tab_idx: int): Texture2D;
  /** Returns the maximum allowed width of the icon for the tab at index `tab_idx`. */
  get_tab_icon_max_width(tab_idx: int): int;
  /**
   * Returns the index of the tab at local coordinates `point`. Returns `-1` if the point is outside the control boundaries or if there's no tab at the queried position.
   */
  get_tab_idx_at_point(point: Vector2): int;
  /** Returns tab title language code. */
  get_tab_language(tab_idx: int): string;
  /**
   * Returns the metadata value set to the tab at index `tab_idx` using {@link set_tab_metadata}. If no metadata was previously set, returns `null` by default.
   */
  get_tab_metadata(tab_idx: int): unknown;
  /** Returns the number of hidden tabs offsetted to the left. */
  get_tab_offset(): int;
  /** Returns tab {@link Rect2} with local position and size. */
  get_tab_rect(tab_idx: int): Rect2;
  /** Returns tab title text base writing direction. */
  get_tab_text_direction(tab_idx: int): int;
  /** Returns the title of the tab at index `tab_idx`. */
  get_tab_title(tab_idx: int): string;
  /** Returns the tooltip text of the tab at index `tab_idx`. */
  get_tab_tooltip(tab_idx: int): string;
  /** Returns `true` if the tab at index `tab_idx` is disabled. */
  is_tab_disabled(tab_idx: int): boolean;
  /** Returns `true` if the tab at index `tab_idx` is hidden. */
  is_tab_hidden(tab_idx: int): boolean;
  /** Moves a tab from `from` to `to`. */
  move_tab(from_: int, to: int): void;
  /** Removes the tab at index `tab_idx`. */
  remove_tab(tab_idx: int): void;
  /**
   * Selects the first available tab with greater index than the currently selected. Returns `true` if tab selection changed.
   */
  select_next_available(): boolean;
  /**
   * Selects the first available tab with lower index than the currently selected. Returns `true` if tab selection changed.
   */
  select_previous_available(): boolean;
  /**
   * Sets an `icon` for the button of the tab at index `tab_idx` (located to the right, before the close button), making it visible and clickable (See {@link tab_button_pressed}). Giving it a `null` value will hide the button.
   */
  set_tab_button_icon(tab_idx: int, icon: Texture2D): void;
  /** If `disabled` is `true`, disables the tab at index `tab_idx`, making it non-interactable. */
  set_tab_disabled(tab_idx: int, disabled: boolean): void;
  /** If `hidden` is `true`, hides the tab at index `tab_idx`, making it disappear from the tab area. */
  set_tab_hidden(tab_idx: int, hidden: boolean): void;
  /** Sets an `icon` for the tab at index `tab_idx`. */
  set_tab_icon(tab_idx: int, icon: Texture2D): void;
  /**
   * Sets the maximum allowed width of the icon for the tab at index `tab_idx`. This limit is applied on top of the default size of the icon and on top of . The height is adjusted according to the icon's ratio.
   */
  set_tab_icon_max_width(tab_idx: int, width: int): void;
  /**
   * Sets the language code of the title for the tab at index `tab_idx` to `language`. This is used for line-breaking and text shaping algorithms. If `language` is empty, the current locale is used.
   */
  set_tab_language(tab_idx: int, language: string): void;
  /**
   * Sets the metadata value for the tab at index `tab_idx`, which can be retrieved later using {@link get_tab_metadata}.
   */
  set_tab_metadata(tab_idx: int, metadata: unknown): void;
  /** Sets tab title base writing direction. */
  set_tab_text_direction(tab_idx: int, direction: int): void;
  /** Sets a `title` for the tab at index `tab_idx`. */
  set_tab_title(tab_idx: int, title: string): void;
  /**
   * Sets a `tooltip` for tab at index `tab_idx`.
   * **Note:** By default, if the `tooltip` is empty and the tab text is truncated (not all characters fit into the tab), the title will be displayed as a tooltip. To hide the tooltip, assign `" "` as the `tooltip` text.
   */
  set_tab_tooltip(tab_idx: int, tooltip: string): void;

  /** Emitted when the active tab is rearranged via mouse drag. See {@link drag_to_rearrange_enabled}. */
  active_tab_rearranged: Signal<[int]>;
  /** Emitted when a tab's right button is pressed. See {@link set_tab_button_icon}. */
  tab_button_pressed: Signal<[int]>;
  /** Emitted when switching to another tab. */
  tab_changed: Signal<[int]>;
  /** Emitted when a tab is clicked, even if it is the current tab. */
  tab_clicked: Signal<[int]>;
  /**
   * Emitted when a tab's close button is pressed or, if {@link close_with_middle_mouse} is `true`, when middle-clicking on a tab.
   * **Note:** Tabs are not removed automatically; this behavior needs to be coded manually. For example:
   */
  tab_close_pressed: Signal<[int]>;
  /** Emitted when a tab is hovered by the mouse. */
  tab_hovered: Signal<[int]>;
  /** Emitted when a tab is right-clicked. */
  tab_rmb_clicked: Signal<[int]>;
  /**
   * Emitted when a tab is selected via click, directional input, or script, even if it is the current tab.
   */
  tab_selected: Signal<[int]>;

  // enum AlignmentMode
  /** Aligns tabs to the left. */
  static readonly ALIGNMENT_LEFT: int;
  /** Aligns tabs in the middle. */
  static readonly ALIGNMENT_CENTER: int;
  /** Aligns tabs to the right. */
  static readonly ALIGNMENT_RIGHT: int;
  /** Represents the size of the {@link AlignmentMode} enum. */
  static readonly ALIGNMENT_MAX: int;
  // enum CloseButtonDisplayPolicy
  /** Never show the close buttons. */
  static readonly CLOSE_BUTTON_SHOW_NEVER: int;
  /** Only show the close button on the currently active tab. */
  static readonly CLOSE_BUTTON_SHOW_ACTIVE_ONLY: int;
  /** Show the close button on all tabs. */
  static readonly CLOSE_BUTTON_SHOW_ALWAYS: int;
  /** Represents the size of the {@link CloseButtonDisplayPolicy} enum. */
  static readonly CLOSE_BUTTON_MAX: int;
}
