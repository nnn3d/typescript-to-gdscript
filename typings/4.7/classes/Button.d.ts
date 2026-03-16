// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A themed button that can contain text and an icon. */
declare class Button extends BaseButton {
  /** Text alignment policy for the button's text. */
  alignment: int;
  /**
   * If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the node's bounding rectangle.
   */
  autowrap_mode: int;
  /**
   * Autowrap space trimming flags. See {@link TextServer.BREAK_TRIM_START_EDGE_SPACES} and {@link TextServer.BREAK_TRIM_END_EDGE_SPACES} for more info.
   */
  autowrap_trim_flags: int;
  /**
   * If `true`, text that is too large to fit the button is clipped horizontally. If `false`, the button will always be wide enough to hold the text. The text is not vertically clipped, and the button's height is not affected by this property.
   */
  clip_text: boolean;
  /**
   * When enabled, the button's icon will expand/shrink to fit the button's size while keeping its aspect. See also .
   */
  expand_icon: boolean;
  /** Flat buttons don't display decoration. */
  flat: boolean;
  /**
   * Button's icon, if text is present the icon will be placed before the text.
   * To edit margin and spacing of the icon, use  theme property and `content_margin_*` properties of the used {@link StyleBox}es.
   */
  icon: Texture2D;
  /**
   * Specifies if the icon should be aligned horizontally to the left, right, or center of a button. Uses the same {@link HorizontalAlignment} constants as the text alignment. If centered horizontally and vertically, text will draw on top of the icon.
   */
  icon_alignment: int;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /** The button's text that will be displayed inside the button's area. */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** Sets the clipping behavior when the text exceeds the node's bounding rectangle. */
  text_overrun_behavior: int;
  /**
   * Specifies if the icon should be aligned vertically to the top, bottom, or center of a button. Uses the same {@link VerticalAlignment} constants as the text alignment. If centered horizontally and vertically, text will draw on top of the icon.
   */
  vertical_icon_alignment: int;
}
