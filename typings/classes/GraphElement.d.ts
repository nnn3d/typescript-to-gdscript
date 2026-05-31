// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A container that represents a basic element that can be placed inside a {@link GraphEdit} control. */
declare class GraphElement extends Container {
  /** If `true`, the user can drag the GraphElement. */
  draggable: boolean;
  /** The offset of the GraphElement, relative to the scroll offset of the {@link GraphEdit}. */
  position_offset: Vector2;
  /**
   * If `true`, the user can resize the GraphElement.
   * **Note:** Dragging the handle will only emit the {@link resize_request} and {@link resize_end} signals, the GraphElement needs to be resized manually.
   */
  resizable: boolean;
  /**
   * If `true`, {@link PopupMenu}s that are descendants of the GraphElement are scaled with the {@link GraphEdit} zoom.
   */
  scaling_menus: boolean;
  /** If `true`, the user can select the GraphElement. */
  selectable: boolean;
  /** If `true`, the GraphElement is selected. */
  selected: boolean;
  set_draggable(value: boolean): void;
  is_draggable(): boolean;
  set_position_offset(value: Vector2 | Vector2i): void;
  get_position_offset(): Vector2;
  set_resizable(value: boolean): void;
  is_resizable(): boolean;
  set_scaling_menus(value: boolean): void;
  is_scaling_menus(): boolean;
  set_selectable(value: boolean): void;
  is_selectable(): boolean;
  set_selected(value: boolean): void;
  is_selected(): boolean;

  /** Emitted when removing the GraphElement is requested. */
  delete_request: Signal<[]>;
  /** Emitted when the GraphElement is dragged. */
  dragged: Signal<[Vector2, Vector2]>;
  /** Emitted when the GraphElement is deselected. */
  node_deselected: Signal<[]>;
  /** Emitted when the GraphElement is selected. */
  node_selected: Signal<[]>;
  /** Emitted when the GraphElement is moved. */
  position_offset_changed: Signal<[]>;
  /**
   * Emitted when displaying the GraphElement over other ones is requested. Happens on focusing (clicking into) the GraphElement.
   */
  raise_request: Signal<[]>;
  /** Emitted when releasing the mouse button after dragging the resizer handle (see {@link resizable}). */
  resize_end: Signal<[Vector2]>;
  /**
   * Emitted when resizing the GraphElement is requested. Happens on dragging the resizer handle (see {@link resizable}).
   */
  resize_request: Signal<[Vector2]>;
}
