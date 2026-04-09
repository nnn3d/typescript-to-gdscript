// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A group of buttons that doesn't allow more than one button to be pressed at a time. */
declare class ButtonGroup extends Resource {
  /** If `true`, it is possible to unpress all buttons in this {@link ButtonGroup}. */
  allow_unpress: boolean;
  resource_local_to_scene: boolean;
  set_allow_unpress(value: boolean): void;
  is_allow_unpress(): boolean;

  /**
   * Returns an {@link Array} of {@link Button}s who have this as their {@link ButtonGroup} (see {@link BaseButton.button_group}).
   */
  get_buttons(): Array<BaseButton>;
  /** Returns the current pressed button. */
  get_pressed_button(): BaseButton | null;

  /** Emitted when one of the buttons of the group is pressed. */
  pressed: Signal<[BaseButton]>;
}
