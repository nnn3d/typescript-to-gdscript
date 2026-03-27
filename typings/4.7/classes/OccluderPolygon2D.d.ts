// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Defines a 2D polygon for LightOccluder2D. */
declare class OccluderPolygon2D extends Resource {
  /**
   * If `true`, closes the polygon. A closed OccluderPolygon2D occludes the light coming from any direction. An opened OccluderPolygon2D occludes the light only at its outline's direction.
   */
  closed: boolean;
  /** The culling mode to use. */
  cull_mode: int;
  /** A {@link Vector2} array with the index for polygon's vertices positions. */
  polygon: PackedVector2Array;
  set_closed(value: boolean): void;
  is_closed(): boolean;
  set_cull_mode(value: int): void;
  get_cull_mode(): int;
  set_polygon(value: PackedVector2Array): void;
  get_polygon(): PackedVector2Array;

  // enum CullMode
  /** Culling is disabled. See {@link cull_mode}. */
  static readonly CULL_DISABLED: int;
  /** Culling is performed in the clockwise direction. See {@link cull_mode}. */
  static readonly CULL_CLOCKWISE: int;
  /** Culling is performed in the counterclockwise direction. See {@link cull_mode}. */
  static readonly CULL_COUNTER_CLOCKWISE: int;
}
