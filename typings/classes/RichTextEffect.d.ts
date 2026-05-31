// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A custom effect for a {@link RichTextLabel}. */
declare class RichTextEffect extends Resource {
  /**
   * Override this method to modify properties in `char_fx`. The method must return `true` if the character could be transformed successfully. If the method returns `false`, it will skip transformation to avoid displaying broken text.
   */
  _process_custom_fx(char_fx: CharFXTransform): boolean;
}
