// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Represents a screen touch event. */
declare class InputEventScreenTouch extends InputEventFromWindow {
  /** If `true`, the touch event has been canceled. */
  canceled: boolean;
  /** If `true`, the touch's state is a double tap. */
  double_tap: boolean;
  /** The touch index in the case of a multi-touch event. One index = one finger. */
  index: int;
  /** The touch position in the viewport the node is in, using the coordinate system of this viewport. */
  position: Vector2;
  /** If `true`, the touch's state is pressed. If `false`, the touch's state is released. */
  pressed: boolean;
}
