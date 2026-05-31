// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Holds a line of text. */
declare class TextLine extends RefCounted {
  /** Sets text alignment within the line as if the line was horizontal. */
  alignment: int;
  /** Text writing direction. */
  direction: int;
  /** Ellipsis character used for text clipping. */
  ellipsis_char: string;
  /** Line alignment rules. For more info see {@link TextServer}. */
  flags: int;
  /** Text orientation. */
  orientation: int;
  /** If set to `true` text will display control characters. */
  preserve_control: boolean;
  /** If set to `true` text will display invalid characters. */
  preserve_invalid: boolean;
  /** The clipping behavior when the text exceeds the text line's set width. */
  text_overrun_behavior: int;
  /** Text line width. */
  width: float;
  set_horizontal_alignment(value: int): void;
  get_horizontal_alignment(): int;
  set_direction(value: int): void;
  get_direction(): int;
  set_ellipsis_char(value: string | NodePath): void;
  get_ellipsis_char(): string;
  set_flags(value: int): void;
  get_flags(): int;
  set_orientation(value: int): void;
  get_orientation(): int;
  set_preserve_control(value: boolean): void;
  get_preserve_control(): boolean;
  set_preserve_invalid(value: boolean): void;
  get_preserve_invalid(): boolean;
  set_text_overrun_behavior(value: int): void;
  get_text_overrun_behavior(): int;
  set_width(value: float): void;
  get_width(): float;

  /**
   * Adds inline object to the text buffer, `key` must be unique. In the text, object is represented as `length` object replacement characters.
   */
  add_object(key: unknown, size: Vector2 | Vector2i, inline_align: int, length?: int, baseline?: float): boolean;
  /** Adds text span and font to draw it. */
  add_string(text: string | NodePath, font: Font, font_size: int, language?: string | NodePath, meta?: unknown): boolean;
  /** Clears text line (removes text and inline objects). */
  clear(): void;
  /**
   * Draw text into a canvas item at a given position, with `color`. `pos` specifies the top left corner of the bounding box. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  draw(canvas: RID, pos: Vector2 | Vector2i, color?: Color, oversampling?: float): void;
  /**
   * Draw text into a canvas item at a given position, with `color`. `pos` specifies the top left corner of the bounding box. If `oversampling` is greater than zero, it is used as font oversampling factor, otherwise viewport oversampling settings are used.
   */
  draw_outline(canvas: RID, pos: Vector2 | Vector2i, outline_size?: int, color?: Color, oversampling?: float): void;
  /** Duplicates this {@link TextLine}. */
  duplicate(): TextLine;
  /** Returns the text writing direction inferred by the BiDi algorithm. */
  get_inferred_direction(): int;
  /**
   * Returns the text ascent (number of pixels above the baseline for horizontal layout or to the left of baseline for vertical).
   */
  get_line_ascent(): float;
  /**
   * Returns the text descent (number of pixels below the baseline for horizontal layout or to the right of baseline for vertical).
   */
  get_line_descent(): float;
  /** Returns pixel offset of the underline below the baseline. */
  get_line_underline_position(): float;
  /** Returns thickness of the underline. */
  get_line_underline_thickness(): float;
  /** Returns width (for horizontal layout) or height (for vertical) of the text. */
  get_line_width(): float;
  /** Returns bounding rectangle of the inline object. */
  get_object_rect(key: unknown): Rect2;
  /** Returns array of inline objects. */
  get_objects(): Array<unknown>;
  /** Returns TextServer buffer RID. */
  get_rid(): RID;
  /** Returns size of the bounding box of the text. */
  get_size(): Vector2;
  /** Returns `true` if an object with `key` is embedded in this line. */
  has_object(key: unknown): boolean;
  /**
   * Returns caret character offset at the specified pixel offset at the baseline. This function always returns a valid position.
   */
  hit_test(coords: float): int;
  /** Sets new size and alignment of embedded object. */
  resize_object(key: unknown, size: Vector2 | Vector2i, inline_align: int, baseline?: float): boolean;
  /**
   * Overrides BiDi for the structured text.
   * Override ranges should cover full source text without overlaps. BiDi algorithm will be used on each range separately.
   */
  set_bidi_override(override: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  /** Aligns text to the given tab-stops. */
  tab_align(tab_stops: PackedFloat32Array | Array<unknown>): void;
}
