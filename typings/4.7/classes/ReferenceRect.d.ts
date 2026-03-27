// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A rectangular box for designing UIs. */
declare class ReferenceRect<Tree extends object = any> extends Control<Tree> {
  /** Sets the border color of the {@link ReferenceRect}. */
  border_color: Color;
  /**
   * Sets the border width of the {@link ReferenceRect}. The border grows both inwards and outwards with respect to the rectangle box.
   */
  border_width: float;
  /**
   * If `true`, the {@link ReferenceRect} will only be visible while in editor. Otherwise, {@link ReferenceRect} will be visible in the running project.
   */
  editor_only: boolean;
  set_border_color(value: Color): void;
  get_border_color(): Color;
  set_border_width(value: float): void;
  get_border_width(): float;
  set_editor_only(value: boolean): void;
  get_editor_only(): boolean;
}
