// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * GraphFrame is a special {@link GraphElement} that can be used to organize other {@link GraphElement}s inside a {@link GraphEdit}.
 */
declare class GraphFrame extends GraphElement {
  /**
   * If `true`, the frame's rect will be adjusted automatically to enclose all attached {@link GraphElement}s.
   */
  autoshrink_enabled: boolean;
  /**
   * The margin around the attached nodes that is used to calculate the size of the frame when {@link autoshrink_enabled} is `true`.
   */
  autoshrink_margin: int;
  /** The margin inside the frame that can be used to drag the frame. */
  drag_margin: int;
  /**
   * <member name="tint_color" type="Color" setter="set_tint_color" getter="get_tint_color" default="Color(0.3, 0.3, 0.3, 0.75)">
   * The color of the frame when {@link tint_color_enabled} is `true`.
   */
  mouse_filter: int;
  /** If `true`, the tint color will be used to tint the frame. */
  tint_color_enabled: boolean;
  /** Title of the frame. */
  title: string;

  /**
   * Returns the {@link HBoxContainer} used for the title bar, only containing a {@link Label} for displaying the title by default.
   * This can be used to add custom controls to the title bar such as option or close buttons.
   */
  get_titlebar_hbox(): HBoxContainer;

  /** Emitted when {@link autoshrink_enabled} or {@link autoshrink_margin} changes. */
  autoshrink_changed: Signal<[]>;
}
