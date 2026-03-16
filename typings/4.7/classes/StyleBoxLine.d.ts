// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

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
}
