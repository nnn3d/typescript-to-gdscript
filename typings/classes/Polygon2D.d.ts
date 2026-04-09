// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A 2D polygon. */
declare class Polygon2D extends Node2D {
  /** If `true`, polygon edges will be anti-aliased. */
  antialiased: boolean;
  /**
   * The polygon's fill color. If {@link texture} is set, it will be multiplied by this color. It will also be the default color for vertices not set in {@link vertex_colors}.
   */
  color: Color;
  /** Number of internal vertices, used for UV mapping. */
  internal_vertex_count: int;
  /**
   * Added padding applied to the bounding box when {@link invert_enabled} is set to `true`. Setting this value too small may result in a "Bad Polygon" error.
   */
  invert_border: float;
  /**
   * If `true`, the polygon will be inverted, containing the area outside the defined points and extending to the {@link invert_border}.
   */
  invert_enabled: boolean;
  /** The offset applied to each vertex. */
  offset: Vector2;
  /** The polygon's list of vertices. The final point will be connected to the first. */
  polygon: PackedVector2Array;
  /**
   * The list of polygons, in case more than one is being represented. Every individual polygon is stored as a {@link PackedInt32Array} where each [int] is an index to a point in {@link polygon}. If empty, this property will be ignored, and the resulting single polygon will be composed of all points in {@link polygon}, using the order they are stored in.
   */
  polygons: Array<unknown>;
  /**
   * Path to a {@link Skeleton2D} node used for skeleton-based deformations of this polygon. If empty or invalid, skeletal deformations will not be used.
   */
  skeleton: NodePath;
  /** The polygon's fill texture. Use {@link uv} to set texture coordinates. */
  texture: Texture2D | null;
  /**
   * Amount to offset the polygon's {@link texture}. If set to `Vector2(0, 0)`, the texture's origin (its top-left corner) will be placed at the polygon's position.
   */
  texture_offset: Vector2;
  /** The texture's rotation in radians. */
  texture_rotation: float;
  /**
   * Amount to multiply the {@link uv} coordinates when using {@link texture}. Larger values make the texture smaller, and vice versa.
   */
  texture_scale: Vector2;
  /**
   * Texture coordinates for each vertex of the polygon. There should be one UV value per polygon vertex. If there are fewer, undefined vertices will use `Vector2(0, 0)`.
   */
  uv: PackedVector2Array;
  /**
   * Color for each vertex. Colors are interpolated between vertices, resulting in smooth gradients. There should be one per polygon vertex. If there are fewer, undefined vertices will use {@link color}.
   */
  vertex_colors: PackedColorArray;
  set_antialiased(value: boolean): void;
  get_antialiased(): boolean;
  set_color(value: Color): void;
  get_color(): Color;
  set_internal_vertex_count(value: int): void;
  get_internal_vertex_count(): int;
  set_invert_border(value: float): void;
  get_invert_border(): float;
  set_invert_enabled(value: boolean): void;
  get_invert_enabled(): boolean;
  set_offset(value: Vector2 | Vector2i): void;
  get_offset(): Vector2;
  set_polygon(value: PackedVector2Array | Array<unknown>): void;
  get_polygon(): PackedVector2Array;
  set_polygons(value: Array<unknown> | PackedByteArray | PackedColorArray | PackedFloat32Array | PackedFloat64Array | PackedInt32Array | PackedInt64Array | PackedStringArray | PackedVector2Array | PackedVector3Array | PackedVector4Array): void;
  get_polygons(): Array<unknown>;
  set_skeleton(value: NodePath | string): void;
  get_skeleton(): NodePath;
  set_texture(value: Texture2D | null): void;
  get_texture(): Texture2D | null;
  set_texture_offset(value: Vector2 | Vector2i): void;
  get_texture_offset(): Vector2;
  set_texture_rotation(value: float): void;
  get_texture_rotation(): float;
  set_texture_scale(value: Vector2 | Vector2i): void;
  get_texture_scale(): Vector2;
  set_uv(value: PackedVector2Array | Array<unknown>): void;
  get_uv(): PackedVector2Array;
  set_vertex_colors(value: PackedColorArray | Array<unknown>): void;
  get_vertex_colors(): PackedColorArray;

  /** Adds a bone with the specified `path` and `weights`. */
  add_bone(path: NodePath | string, weights: PackedFloat32Array | Array<unknown>): void;
  /** Removes all bones from this {@link Polygon2D}. */
  clear_bones(): void;
  /** Removes the specified bone from this {@link Polygon2D}. */
  erase_bone(index: int): void;
  /** Returns the number of bones in this {@link Polygon2D}. */
  get_bone_count(): int;
  /** Returns the path to the node associated with the specified bone. */
  get_bone_path(index: int): NodePath;
  /** Returns the weight values of the specified bone. */
  get_bone_weights(index: int): PackedFloat32Array;
  /** Sets the path to the node associated with the specified bone. */
  set_bone_path(index: int, path: NodePath | string): void;
  /** Sets the weight values for the specified bone. */
  set_bone_weights(index: int, weights: PackedFloat32Array | Array<unknown>): void;
}
