// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A container that creates a tab for each child control, displaying only the active tab's control. */
declare class TabContainer extends Container {
  /**
   * If `true`, all tabs are drawn in front of the panel. If `false`, inactive tabs are drawn behind the panel.
   */
  all_tabs_in_front: boolean;
  /**
   * If `true`, tabs overflowing this node's width will be hidden, displaying two navigation buttons instead. Otherwise, this node's minimum size is updated so that all tabs are visible.
   */
  clip_tabs: boolean;
  /**
   * The current tab index. When set, this index's {@link Control} node's `visible` property is set to `true` and all others are set to `false`.
   * A value of `-1` means that no tab is selected.
   */
  current_tab: int;
  /**
   * If `true`, all tabs can be deselected so that no tab is selected. Click on the {@link current_tab} to deselect it.
   * Only the tab header will be shown if no tabs are selected.
   */
  deselect_enabled: boolean;
  /** If `true`, tabs can be rearranged with mouse drag. */
  drag_to_rearrange_enabled: boolean;
  /**
   * If `true`, hovering over a tab while dragging something will switch to that tab. Does not have effect when hovering another tab to rearrange.
   */
  switch_on_drag_hover: boolean;
  /** The position at which tabs will be placed. */
  tab_alignment: int;
  /** The focus access mode for the internal {@link TabBar} node. */
  tab_focus_mode: int;
  /** The horizontal alignment of the tabs. */
  tabs_position: int;
  /**
   * {@link TabContainer}s with the same rearrange group ID will allow dragging the tabs between them. Enable drag with {@link drag_to_rearrange_enabled}.
   * Setting this to `-1` will disable rearranging between {@link TabContainer}s.
   */
  tabs_rearrange_group: int;
  /** If `true`, tabs are visible. If `false`, tabs' content and titles are hidden. */
  tabs_visible: boolean;
  /**
   * If `true`, child {@link Control} nodes that are hidden have their minimum size take into account in the total, instead of only the currently visible one.
   */
  use_hidden_tabs_for_min_size: boolean;
  set_all_tabs_in_front(value: boolean): void;
  is_all_tabs_in_front(): boolean;
  set_clip_tabs(value: boolean): void;
  get_clip_tabs(): boolean;
  set_current_tab(value: int): void;
  get_current_tab(): int;
  set_deselect_enabled(value: boolean): void;
  get_deselect_enabled(): boolean;
  set_drag_to_rearrange_enabled(value: boolean): void;
  get_drag_to_rearrange_enabled(): boolean;
  set_switch_on_drag_hover(value: boolean): void;
  get_switch_on_drag_hover(): boolean;
  set_tab_alignment(value: int): void;
  get_tab_alignment(): int;
  set_tab_focus_mode(value: int): void;
  get_tab_focus_mode(): int;
  set_tabs_position(value: int): void;
  get_tabs_position(): int;
  set_tabs_rearrange_group(value: int): void;
  get_tabs_rearrange_group(): int;
  set_tabs_visible(value: boolean): void;
  are_tabs_visible(): boolean;
  set_use_hidden_tabs_for_min_size(value: boolean): void;
  get_use_hidden_tabs_for_min_size(): boolean;

  /** Returns the child {@link Control} node located at the active tab index. */
  get_current_tab_control(): Control | null;
  /**
   * Returns the {@link Popup} node instance if one has been set already with {@link set_popup}.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_popup(): Popup | null;
  /** Returns the previously active tab index. */
  get_previous_tab(): int;
  /**
   * Returns the {@link TabBar} contained in this container.
   * **Warning:** This is a required internal node, removing and freeing it or editing its tabs may cause a crash. If you wish to edit the tabs, use the methods provided in {@link TabContainer}.
   */
  get_tab_bar(): TabBar;
  /** Returns the button icon from the tab at index `tab_idx`. */
  get_tab_button_icon(tab_idx: int): Texture2D | null;
  /** Returns the {@link Control} node from the tab at index `tab_idx`. */
  get_tab_control(tab_idx: int): Control | null;
  /** Returns the number of tabs. */
  get_tab_count(): int;
  /**
   * Returns the {@link Texture2D} for the tab at index `tab_idx` or `null` if the tab has no {@link Texture2D}.
   */
  get_tab_icon(tab_idx: int): Texture2D | null;
  /** Returns the maximum allowed width of the icon for the tab at index `tab_idx`. */
  get_tab_icon_max_width(tab_idx: int): int;
  /**
   * Returns the index of the tab at local coordinates `point`. Returns `-1` if the point is outside the control boundaries or if there's no tab at the queried position.
   */
  get_tab_idx_at_point(point: Vector2 | Vector2i): int;
  /**
   * Returns the index of the tab tied to the given `control`. The control must be a child of the {@link TabContainer}.
   */
  get_tab_idx_from_control(control: Control): int;
  /**
   * Returns the metadata value set to the tab at index `tab_idx` using {@link set_tab_metadata}. If no metadata was previously set, returns `null` by default.
   */
  get_tab_metadata(tab_idx: int): unknown;
  /**
   * Returns the title of the tab at index `tab_idx`. Tab titles default to the name of the indexed child node, but this can be overridden with {@link set_tab_title}.
   */
  get_tab_title(tab_idx: int): string;
  /** Returns the tooltip text of the tab at index `tab_idx`. */
  get_tab_tooltip(tab_idx: int): string;
  /** Returns `true` if the tab at index `tab_idx` is disabled. */
  is_tab_disabled(tab_idx: int): boolean;
  /** Returns `true` if the tab at index `tab_idx` is hidden. */
  is_tab_hidden(tab_idx: int): boolean;
  /**
   * Selects the first available tab with greater index than the currently selected. Returns `true` if tab selection changed.
   */
  select_next_available(): boolean;
  /**
   * Selects the first available tab with lower index than the currently selected. Returns `true` if tab selection changed.
   */
  select_previous_available(): boolean;
  /**
   * If set on a {@link Popup} node instance, a popup menu icon appears in the top-right corner of the {@link TabContainer} (setting it to `null` will make it go away). Clicking it will expand the {@link Popup} node.
   */
  set_popup(popup: Node): void;
  /** Sets the button icon from the tab at index `tab_idx`. */
  set_tab_button_icon(tab_idx: int, icon: Texture2D): void;
  /** If `disabled` is `true`, disables the tab at index `tab_idx`, making it non-interactable. */
  set_tab_disabled(tab_idx: int, disabled: boolean): void;
  /** If `hidden` is `true`, hides the tab at index `tab_idx`, making it disappear from the tab area. */
  set_tab_hidden(tab_idx: int, hidden: boolean): void;
  /** Sets an icon for the tab at index `tab_idx`. */
  set_tab_icon(tab_idx: int, icon: Texture2D): void;
  /**
   * Sets the maximum allowed width of the icon for the tab at index `tab_idx`. This limit is applied on top of the default size of the icon and on top of . The height is adjusted according to the icon's ratio.
   */
  set_tab_icon_max_width(tab_idx: int, width: int): void;
  /**
   * Sets the metadata value for the tab at index `tab_idx`, which can be retrieved later using {@link get_tab_metadata}.
   */
  set_tab_metadata(tab_idx: int, metadata: unknown): void;
  /**
   * Sets a custom title for the tab at index `tab_idx` (tab titles default to the name of the indexed child node). Set it back to the child's name to make the tab default to it again.
   */
  set_tab_title(tab_idx: int, title: string | NodePath): void;
  /**
   * Sets a custom tooltip text for tab at index `tab_idx`.
   * **Note:** By default, if the `tooltip` is empty and the tab text is truncated (not all characters fit into the tab), the title will be displayed as a tooltip. To hide the tooltip, assign `" "` as the `tooltip` text.
   */
  set_tab_tooltip(tab_idx: int, tooltip: string | NodePath): void;

  /** Emitted when the active tab is rearranged via mouse drag. See {@link drag_to_rearrange_enabled}. */
  active_tab_rearranged: Signal<[int]>;
  /**
   * Emitted when the {@link TabContainer}'s {@link Popup} button is clicked. See {@link set_popup} for details.
   */
  pre_popup_pressed: Signal<[]>;
  /** Emitted when the user clicks on the button icon on this tab. */
  tab_button_pressed: Signal<[int]>;
  /** Emitted when switching to another tab. */
  tab_changed: Signal<[int]>;
  /** Emitted when a tab is clicked, even if it is the current tab. */
  tab_clicked: Signal<[int]>;
  /** Emitted when a tab is hovered by the mouse. */
  tab_hovered: Signal<[int]>;
  /**
   * Emitted when a tab is selected via click, directional input, or script, even if it is the current tab.
   */
  tab_selected: Signal<[int]>;

  // enum TabPosition
  /** Places the tab bar at the top. */
  static readonly POSITION_TOP: int;
  /** Places the tab bar at the bottom. The tab bar's {@link StyleBox} will be flipped vertically. */
  static readonly POSITION_BOTTOM: int;
  /** Represents the size of the {@link TabPosition} enum. */
  static readonly POSITION_MAX: int;
}
