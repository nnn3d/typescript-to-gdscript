// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A {@link StyleBox} that displays a single line of a given color and thickness. */
declare class StyleBoxLine extends StyleBox {
  /** The line's color. */
  color: Color;
  /**
   * The number of pixels the line will extend before the {@link StyleBoxLine}'s bounds. If set to a negative value, the line will begin inside the {@link StyleBoxLine}'s bounds.
   */
  grow_begin: float;
  /**
   * The number of pixels the line will extend past the {@link StyleBoxLine}'s bounds. If set to a negative value, the line will end inside the {@link StyleBoxLine}'s bounds.
   */
  grow_end: float;
  /** The line's thickness in pixels. */
  thickness: int;
  /** If `true`, the line will be vertical. If `false`, the line will be horizontal. */
  vertical: boolean;
  set_color(value: Color): void;
  get_color(): Color;
  set_grow_begin(value: float): void;
  get_grow_begin(): float;
  set_grow_end(value: float): void;
  get_grow_end(): float;
  set_thickness(value: int): void;
  get_thickness(): int;
  set_vertical(value: boolean): void;
  is_vertical(): boolean;
}
