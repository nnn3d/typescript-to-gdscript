// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A container that arranges its child controls in a grid layout. */
declare class GridContainer<Tree extends object = any> extends Container<Tree> {
  /**
   * The number of columns in the {@link GridContainer}. If modified, {@link GridContainer} reorders its Control-derived children to accommodate the new layout.
   */
  columns: int;
  set_columns(value: int): void;
  get_columns(): int;
}
