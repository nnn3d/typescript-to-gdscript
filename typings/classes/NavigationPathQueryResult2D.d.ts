// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Represents the result of a 2D pathfinding query. */
declare class NavigationPathQueryResult2D extends RefCounted {
  /**
   * The resulting path array from the navigation query. All path array positions are in global coordinates. Without customized query parameters this is the same path as returned by {@link NavigationServer2D.map_get_path}.
   */
  path: PackedVector2Array;
  /** Returns the length of the path. */
  path_length: float;
  /**
   * The `ObjectID`s of the {@link Object}s which manage the regions and links each point of the path goes through.
   */
  path_owner_ids: PackedInt64Array;
  /** The {@link RID}s of the regions and links that each point of the path goes through. */
  path_rids: Array<RID>;
  /** The type of navigation primitive (region or link) that each point of the path goes through. */
  path_types: PackedInt32Array;
  set_path(value: PackedVector2Array | Array<unknown>): void;
  get_path(): PackedVector2Array;
  set_path_length(value: float): void;
  get_path_length(): float;
  set_path_owner_ids(value: PackedInt64Array | Array<unknown>): void;
  get_path_owner_ids(): PackedInt64Array;
  set_path_rids(value: Array<RID>): void;
  get_path_rids(): Array<RID>;
  set_path_types(value: PackedInt32Array | Array<unknown>): void;
  get_path_types(): PackedInt32Array;

  /**
   * Reset the result object to its initial state. This is useful to reuse the object across multiple queries.
   */
  reset(): void;

  // enum PathSegmentType
  /** This segment of the path goes through a region. */
  static readonly PATH_SEGMENT_TYPE_REGION: int;
  /** This segment of the path goes through a link. */
  static readonly PATH_SEGMENT_TYPE_LINK: int;
}
