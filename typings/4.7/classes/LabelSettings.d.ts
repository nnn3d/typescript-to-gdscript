// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides common settings to customize the text in a {@link Label}. */
declare class LabelSettings extends Resource {
  /** {@link Font} used for the text. */
  font: Font;
  /** Color of the text. */
  font_color: Color;
  /** Size of the text. */
  font_size: int;
  /**
   * Additional vertical spacing between lines (in pixels), spacing is added to line descent. This value can be negative.
   */
  line_spacing: float;
  /** The color of the outline. */
  outline_color: Color;
  /** Text outline size. */
  outline_size: int;
  /** Vertical space between paragraphs. Added on top of {@link line_spacing}. */
  paragraph_spacing: float;
  /** Color of the shadow effect. If alpha is `0`, no shadow will be drawn. */
  shadow_color: Color;
  /** Offset of the shadow effect, in pixels. */
  shadow_offset: Vector2;
  /** Size of the shadow effect. */
  shadow_size: int;
  /** The number of stacked outlines. */
  stacked_outline_count: int;
  /** The number of stacked shadows. */
  stacked_shadow_count: int;
  set_font(value: Font): void;
  get_font(): Font;
  set_font_color(value: Color): void;
  get_font_color(): Color;
  set_font_size(value: int): void;
  get_font_size(): int;
  set_line_spacing(value: float): void;
  get_line_spacing(): float;
  set_outline_color(value: Color): void;
  get_outline_color(): Color;
  set_outline_size(value: int): void;
  get_outline_size(): int;
  set_paragraph_spacing(value: float): void;
  get_paragraph_spacing(): float;
  set_shadow_color(value: Color): void;
  get_shadow_color(): Color;
  set_shadow_offset(value: Vector2): void;
  get_shadow_offset(): Vector2;
  set_shadow_size(value: int): void;
  get_shadow_size(): int;
  set_stacked_outline_count(value: int): void;
  get_stacked_outline_count(): int;
  set_stacked_shadow_count(value: int): void;
  get_stacked_shadow_count(): int;

  /**
   * Adds a new stacked outline to the label at the given `index`. If `index` is `-1`, the new stacked outline will be added at the end of the list.
   */
  add_stacked_outline(index?: int): void;
  /**
   * Adds a new stacked shadow to the label at the given `index`. If `index` is `-1`, the new stacked shadow will be added at the end of the list.
   */
  add_stacked_shadow(index?: int): void;
  /** Returns the color of the stacked outline at `index`. */
  get_stacked_outline_color(index: int): Color;
  /** Returns the size of the stacked outline at `index`. */
  get_stacked_outline_size(index: int): int;
  /** Returns the color of the stacked shadow at `index`. */
  get_stacked_shadow_color(index: int): Color;
  /** Returns the offset of the stacked shadow at `index`. */
  get_stacked_shadow_offset(index: int): Vector2;
  /** Returns the outline size of the stacked shadow at `index`. */
  get_stacked_shadow_outline_size(index: int): int;
  /** Moves the stacked outline at index `from_index` to the given position `to_position` in the array. */
  move_stacked_outline(from_index: int, to_position: int): void;
  /** Moves the stacked shadow at index `from_index` to the given position `to_position` in the array. */
  move_stacked_shadow(from_index: int, to_position: int): void;
  /** Removes the stacked outline at index `index`. */
  remove_stacked_outline(index: int): void;
  /** Removes the stacked shadow at index `index`. */
  remove_stacked_shadow(index: int): void;
  /** Sets the color of the stacked outline identified by the given `index` to `color`. */
  set_stacked_outline_color(index: int, color: Color): void;
  /** Sets the size of the stacked outline identified by the given `index` to `size`. */
  set_stacked_outline_size(index: int, size: int): void;
  /** Sets the color of the stacked shadow identified by the given `index` to `color`. */
  set_stacked_shadow_color(index: int, color: Color): void;
  /** Sets the offset of the stacked shadow identified by the given `index` to `offset`. */
  set_stacked_shadow_offset(index: int, offset: Vector2): void;
  /** Sets the outline size of the stacked shadow identified by the given `index` to `size`. */
  set_stacked_shadow_outline_size(index: int, size: int): void;
}
