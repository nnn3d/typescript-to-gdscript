// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A button that represents a link. */
declare class LinkButton extends BaseButton {
  /** Ellipsis character used for text clipping. */
  ellipsis_char: string;
  /**
   * <member name="language" type="String" setter="set_language" getter="get_language" default="&quot;&quot;">
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  focus_mode: int;
  /**
   * <member name="structured_text_bidi_override" type="int" setter="set_structured_text_bidi_override" getter="get_structured_text_bidi_override" enum="TextServer.StructuredTextParser" default="0">
   * Set BiDi algorithm override for the structured text.
   */
  mouse_default_cursor_shape: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /** The button's text that will be displayed inside the button's area. */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** Sets the clipping behavior when the text exceeds the node's bounding rectangle. */
  text_overrun_behavior: int;
  /** The underline mode to use for the text. */
  underline: int;
  /**
   * The URI (https://en.wikipedia.org/wiki/Uniform_Resource_Identifier) for this {@link LinkButton}. If set to a valid URI, pressing the button opens the URI using the operating system's default program for the protocol (via {@link OS.shell_open}). HTTP and HTTPS URLs open the default web browser.
   */
  uri: string;

  // enum UnderlineMode
  /** The LinkButton will always show an underline at the bottom of its text. */
  static readonly UNDERLINE_MODE_ALWAYS: int;
  /** The LinkButton will show an underline at the bottom of its text when the mouse cursor is over it. */
  static readonly UNDERLINE_MODE_ON_HOVER: int;
  /** The LinkButton will never show an underline at the bottom of its text. */
  static readonly UNDERLINE_MODE_NEVER: int;
}
