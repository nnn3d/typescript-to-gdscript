// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Generate a {@link PrimitiveMesh} from the text. */
declare class TextMesh extends PrimitiveMesh {
  /**
   * If set to something other than {@link TextServer.AUTOWRAP_OFF}, the text gets wrapped inside the node's bounding rectangle. If you resize the node, it will change its height automatically to show all the text.
   */
  autowrap_mode: int;
  /**
   * Step (in pixels) used to approximate Bézier curves. Lower values result in smoother curves, but is slower to generate and render. Consider adjusting this according to the font size and the typical viewing distance.
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts.
   */
  curve_step: float;
  /**
   * Depths of the mesh, if set to `0.0` only front surface, is generated, and UV layout is changed to use full texture for the front face only.
   */
  depth: float;
  /** Font configuration used to display text. */
  font: Font | null;
  /**
   * Font size of the {@link TextMesh}'s text. This property works in tandem with {@link pixel_size}. Higher values will result in a more detailed font, regardless of {@link curve_step} and {@link pixel_size}. Consider keeping this value below 63 (inclusive) for good performance, and adjust {@link pixel_size} as needed to enlarge text.
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts. To change the text's size in real-time efficiently, change the node's {@link Node3D.scale} instead.
   */
  font_size: int;
  /**
   * Controls the text's horizontal alignment. Supports left, center, right, and fill (also known as justify).
   */
  horizontal_alignment: int;
  /** Line fill alignment rules. */
  justification_flags: int;
  /**
   * Language code used for line-breaking and text shaping algorithms. If left empty, the current locale is used instead.
   */
  language: string;
  /**
   * Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative.
   */
  line_spacing: float;
  /**
   * The text drawing offset (in pixels).
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation. To change the text's position in real-time efficiently, change the node's {@link Node3D.position} instead.
   */
  offset: Vector2;
  /**
   * The size of one pixel's width on the text to scale it in 3D. This property works in tandem with {@link font_size}.
   * **Note:** Changing this property will regenerate the mesh, which is a slow operation, especially with large font sizes and long texts. To change the text's size in real-time efficiently, change the node's {@link Node3D.scale} instead.
   */
  pixel_size: float;
  /** Set BiDi algorithm override for the structured text. */
  structured_text_bidi_override: int;
  /** Set additional options for BiDi override. */
  structured_text_bidi_override_options: Array<unknown>;
  /**
   * The text to generate mesh from.
   * **Note:** Due to being a {@link Resource}, it doesn't follow the rules of {@link Node.auto_translate_mode}. If disabling translation is desired, it should be done manually with {@link Object.set_message_translation}.
   */
  text: string;
  /** Base text writing direction. */
  text_direction: int;
  /** If `true`, all the text displays as UPPERCASE. */
  uppercase: boolean;
  /** Controls the text's vertical alignment. Supports top, center, and bottom. */
  vertical_alignment: int;
  /** Text width (in pixels), used for fill alignment. */
  width: float;
  set_autowrap_mode(value: int): void;
  get_autowrap_mode(): int;
  set_curve_step(value: float): void;
  get_curve_step(): float;
  set_depth(value: float): void;
  get_depth(): float;
  set_font(value: Font | null): void;
  get_font(): Font | null;
  set_font_size(value: int): void;
  get_font_size(): int;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_justification_flags(value: int): void;
  get_justification_flags(): int;
  set_language(value: string | NodePath): void;
  get_language(): string;
  set_line_spacing(value: float): void;
  get_line_spacing(): float;
  set_offset(value: Vector2 | Vector2i): void;
  get_offset(): Vector2;
  set_pixel_size(value: float): void;
  get_pixel_size(): float;
  set_structured_text_bidi_override(value: int): void;
  get_structured_text_bidi_override(): int;
  set_structured_text_bidi_override_options(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_structured_text_bidi_override_options(): Array<unknown>;
  set_text(value: string | NodePath): void;
  get_text(): string;
  set_text_direction(value: int): void;
  get_text_direction(): int;
  set_uppercase(value: boolean): void;
  is_uppercase(): boolean;
  set_vertical_alignment(value: int): void;
  get_vertical_alignment(): int;
  set_width(value: float): void;
  get_width(): float;
}
