// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A button that brings up a {@link ColorPicker} when pressed. */
declare class ColorPickerButton extends Button {
  /** The currently selected color. */
  color: Color;
  /** If `true`, the alpha channel in the displayed {@link ColorPicker} will be visible. */
  edit_alpha: boolean;
  /** If `true`, the intensity slider in the displayed {@link ColorPicker} will be visible. */
  edit_intensity: boolean;
  toggle_mode: boolean;
  set_pick_color(value: Color): void;
  get_pick_color(): Color;
  set_edit_alpha(value: boolean): void;
  is_editing_alpha(): boolean;
  set_edit_intensity(value: boolean): void;
  is_editing_intensity(): boolean;

  /**
   * Returns the {@link ColorPicker} that this node toggles.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_picker(): ColorPicker;
  /**
   * Returns the control's {@link PopupPanel} which allows you to connect to popup signals. This allows you to handle events when the ColorPicker is shown or hidden.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link Window.visible} property.
   */
  get_popup(): PopupPanel;

  /** Emitted when the color changes. */
  color_changed: Signal<[Color]>;
  /** Emitted when the {@link ColorPicker} is created (the button is pressed for the first time). */
  picker_created: Signal<[]>;
  /** Emitted when the {@link ColorPicker} is closed. */
  popup_closed: Signal<[]>;
}
