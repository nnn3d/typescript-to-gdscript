// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A container used for displaying the contents of a {@link SubViewport}. */
declare class SubViewportContainer extends Container {
  /**
   * <member name="mouse_target" type="bool" setter="set_mouse_target" getter="is_mouse_target_enabled" default="false">
   * Configure, if either the {@link SubViewportContainer} or alternatively the {@link Control} nodes of its {@link SubViewport} children should be available as targets of mouse-related functionalities, like identifying the drop target in drag-and-drop operations or cursor shape of hovered {@link Control} node.
   * If `false`, the {@link Control} nodes inside its {@link SubViewport} children are considered as targets.
   * If `true`, the {@link SubViewportContainer} itself will be considered as a target.
   */
  focus_mode: int;
  /**
   * If `true`, the sub-viewport will be automatically resized to the control's size.
   * **Note:** If `true`, this will prohibit changing {@link SubViewport.size} of its children manually.
   */
  stretch: boolean;
  /**
   * Divides the sub-viewport's effective resolution by this value while preserving its scale. This can be used to speed up rendering.
   * For example, a 1280×720 sub-viewport with {@link stretch_shrink} set to `2` will be rendered at 640×360 while occupying the same size in the container.
   * **Note:** {@link stretch} must be `true` for this property to work.
   */
  stretch_shrink: int;
  set_stretch(value: boolean): void;
  is_stretch_enabled(): boolean;
  set_stretch_shrink(value: int): void;
  get_stretch_shrink(): int;

  /**
   * Virtual method to be implemented by the user. If it returns `true`, the `event` is propagated to {@link SubViewport} children. Propagation doesn't happen if it returns `false`. If the function is not implemented, all events are propagated to SubViewports.
   */
  _propagate_input_event(event: InputEvent): boolean;
}
