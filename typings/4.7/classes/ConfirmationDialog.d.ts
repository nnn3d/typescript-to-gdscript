// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A dialog used for confirmation of actions. */
declare class ConfirmationDialog extends AcceptDialog {
  /** The text displayed by the cancel button (see {@link get_cancel_button}). */
  cancel_button_text: string;
  min_size: Vector2i;
  size: Vector2i;
  title: string;
  set_cancel_button_text(value: string): void;
  get_cancel_button_text(): string;

  /**
   * Returns the cancel button.
   * **Warning:** This is a required internal node, removing and freeing it may cause a crash. If you wish to hide it or any of its children, use their {@link CanvasItem.visible} property.
   */
  get_cancel_button(): Button;
}
