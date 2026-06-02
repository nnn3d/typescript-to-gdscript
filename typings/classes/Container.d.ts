// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Base class for all GUI containers. */
declare class Container extends Control {
  mouse_filter: int;

  /**
   * Implement to return a list of allowed horizontal {@link Control.SizeFlags} for child nodes. This doesn't technically prevent the usages of any other size flags, if your implementation requires that. This only limits the options available to the user in the Inspector dock.
   * **Note:** Having no size flags is equal to having {@link Control.SIZE_SHRINK_BEGIN}. As such, this value is always implicitly allowed.
   */
  _get_allowed_size_flags_horizontal(): PackedInt32Array;
  /**
   * Implement to return a list of allowed vertical {@link Control.SizeFlags} for child nodes. This doesn't technically prevent the usages of any other size flags, if your implementation requires that. This only limits the options available to the user in the Inspector dock.
   * **Note:** Having no size flags is equal to having {@link Control.SIZE_SHRINK_BEGIN}. As such, this value is always implicitly allowed.
   */
  _get_allowed_size_flags_vertical(): PackedInt32Array;
  /** Fit a child control in a given rect. This is mainly a helper for creating custom container classes. */
  fit_child_in_rect(child: Control, rect: Rect2 | Rect2i): void;
  /**
   * Queue resort of the contained children. This is called automatically anyway, but can be called upon request.
   */
  queue_sort(): void;

  /** Emitted when children are going to be sorted. */
  pre_sort_children: Signal<[]>;
  /** Emitted when sorting the children is needed. */
  sort_children: Signal<[]>;

  /**
   * Notification just before children are going to be sorted, in case there's something to process beforehand.
   */
  static readonly NOTIFICATION_PRE_SORT_CHILDREN: int;
  /** Notification for when sorting the children, it must be obeyed immediately. */
  static readonly NOTIFICATION_SORT_CHILDREN: int;
}
