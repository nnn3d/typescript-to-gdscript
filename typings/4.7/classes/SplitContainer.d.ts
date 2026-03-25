// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * A container that arranges child controls horizontally or vertically and provides grabbers for adjusting the split ratios between them.
 */
declare class SplitContainer<Tree extends object = any> extends Container<Tree> {
  /**
   * If `true`, the draggers will be disabled and the children will be sized as if all {@link split_offsets} were `0`.
   */
  collapsed: boolean;
  /**
   * Highlights the drag area {@link Rect2} so you can see where it is during development. The drag area is gold if {@link dragging_enabled} is `true`, and red if `false`.
   */
  drag_area_highlight_in_editor: boolean;
  /** Reduces the size of the drag area and split bar  at the beginning of the container. */
  drag_area_margin_begin: int;
  /** Reduces the size of the drag area and split bar  at the end of the container. */
  drag_area_margin_end: int;
  /**
   * Shifts the drag area in the axis of the container to prevent the drag area from overlapping the {@link ScrollBar} or other selectable {@link Control} of a child node.
   */
  drag_area_offset: int;
  /**
   * Adds extra draggers at the intersection of the draggers of two SplitContainers to allow dragging both at once. This must be set to `true` for both SplitContainers, and one needs to be a descendant of the other. They also must be orthogonal (their {@link vertical} are different) and the descendant must be next to at least one of the ancestor's draggers (within ).
   */
  drag_nested_intersections: boolean;
  /**
   * Determines the dragger's visibility. This property does not determine whether dragging is enabled or not. Use {@link dragging_enabled} for that.
   */
  dragger_visibility: int;
  /** Enables or disables split dragging. */
  dragging_enabled: boolean;
  /** The first element of {@link split_offsets}. */
  split_offset: int;
  /**
   * Offsets for each dragger in pixels. Each one is the offset of the split between the {@link Control} nodes before and after the dragger, with `0` being the default position. The default position is based on the {@link Control} nodes expand flags and minimum sizes. See {@link Control.size_flags_horizontal}, {@link Control.size_flags_vertical}, and {@link Control.size_flags_stretch_ratio}.
   * If none of the {@link Control} nodes before the dragger are expanded, the default position will be at the start of the {@link SplitContainer}. If none of the {@link Control} nodes after the dragger are expanded, the default position will be at the end of the {@link SplitContainer}. If the dragger is in between expanded {@link Control} nodes, the default position will be in the middle, based on the {@link Control.size_flags_stretch_ratio}s and minimum sizes.
   * **Note:** If the split offsets cause {@link Control} nodes to overlap, the first split will take priority when resolving the positions.
   */
  split_offsets: PackedInt32Array;
  /**
   * If `true`, a touch-friendly drag handle will be enabled for better usability on smaller screens. Unlike the standard grabber, this drag handle overlaps the {@link SplitContainer}'s children and does not affect their minimum separation. The standard grabber will no longer be drawn when this option is enabled.
   */
  touch_dragger_enabled: boolean;
  /**
   * If `true`, the {@link SplitContainer} will arrange its children vertically, rather than horizontally.
   * Can't be changed when using {@link HSplitContainer} and {@link VSplitContainer}.
   */
  vertical: boolean;
  set_collapsed(value: boolean): void;
  is_collapsed(): boolean;
  set_drag_area_highlight_in_editor(value: boolean): void;
  is_drag_area_highlight_in_editor_enabled(): boolean;
  set_drag_area_margin_begin(value: int): void;
  get_drag_area_margin_begin(): int;
  set_drag_area_margin_end(value: int): void;
  get_drag_area_margin_end(): int;
  set_drag_area_offset(value: int): void;
  get_drag_area_offset(): int;
  set_drag_nested_intersections(value: boolean): void;
  is_dragging_nested_intersections(): boolean;
  set_dragger_visibility(value: int): void;
  get_dragger_visibility(): int;
  set_dragging_enabled(value: boolean): void;
  is_dragging_enabled(): boolean;
  set_split_offset(value: int): void;
  get_split_offset(): int;
  set_split_offsets(value: PackedInt32Array): void;
  get_split_offsets(): PackedInt32Array;
  set_touch_dragger_enabled(value: boolean): void;
  is_touch_dragger_enabled(): boolean;
  set_vertical(value: boolean): void;
  is_vertical(): boolean;

  /**
   * Clamps the {@link split_offsets} values to ensure they are within valid ranges and do not overlap with each other. When overlaps occur, this method prioritizes one split offset (at index `priority_index`) by clamping any overlapping split offsets to it.
   */
  clamp_split_offset(priority_index?: int): void;
  /**
   * Returns the drag area {@link Control}. For example, you can move a pre-configured button into the drag area {@link Control} so that it rides along with the split bar. Try setting the {@link Button} anchors to `center` prior to the `reparent()` call.
   * **Note:** The drag area {@link Control} is drawn over the {@link SplitContainer}'s children, so {@link CanvasItem} draw objects called from the {@link Control} and children added to the {@link Control} will also appear over the {@link SplitContainer}'s children. Try setting {@link Control.mouse_filter} of custom children to {@link Control.MOUSE_FILTER_IGNORE} to prevent blocking the mouse from dragging if desired.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash.
   */
  get_drag_area_control(): Control;
  /**
   * Returns an {@link Array} of the drag area {@link Control}s. These are the interactable {@link Control} nodes between each child. For example, this can be used to add a pre-configured button to a drag area {@link Control} so that it rides along with the split bar. Try setting the {@link Button} anchors to `center` prior to the {@link Node.reparent} call.
   * **Note:** The drag area {@link Control}s are drawn over the {@link SplitContainer}'s children, so {@link CanvasItem} draw objects called from a drag area and children added to it will also appear over the {@link SplitContainer}'s children. Try setting {@link Control.mouse_filter} of custom children to {@link Control.MOUSE_FILTER_IGNORE} to prevent blocking the mouse from dragging if desired.
   * **Warning:** These are required internal nodes, removing or freeing them may cause a crash.
   */
  get_drag_area_controls(): unknown;

  /** Emitted when the user ends dragging. */
  drag_ended: Signal<[]>;
  /** Emitted when the user starts dragging. */
  drag_started: Signal<[]>;
  /** Emitted when any dragger is dragged by user. */
  dragged: Signal<[int]>;

  // enum DraggerVisibility
  /**
   * The split dragger icon is always visible when  is `false`, otherwise visible only when the cursor hovers it.
   * The size of the grabber icon determines the minimum .
   * The dragger icon is automatically hidden if the length of the grabber icon is longer than the split bar.
   */
  static readonly DRAGGER_VISIBLE: int;
  /**
   * The split dragger icon is never visible regardless of the value of .
   * The size of the grabber icon determines the minimum .
   */
  static readonly DRAGGER_HIDDEN: int;
  /** The split dragger icon is not visible, and the split bar is collapsed to zero thickness. */
  static readonly DRAGGER_HIDDEN_COLLAPSED: int;
}
