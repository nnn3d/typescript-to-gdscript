// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A 4×4 matrix for 3D projective transformations. */
declare class Projection {
  /** The projection matrix's W vector (column 3). Equivalent to array index `3`. */
  w: Vector4;
  /** The projection matrix's X vector (column 0). Equivalent to array index `0`. */
  x: Vector4;
  /** The projection matrix's Y vector (column 1). Equivalent to array index `1`. */
  y: Vector4;
  /** The projection matrix's Z vector (column 2). Equivalent to array index `2`. */
  z: Vector4;

  /**
   * Creates a new {@link Projection} that projects positions from a depth range of `-1` to `1` to one that ranges from `0` to `1`, and flips the projected positions vertically, according to `flip_y`.
   */
  static create_depth_correction(flip_y: boolean): Projection;
  /**
   * Creates a new {@link Projection} that scales a given projection to fit around a given {@link AABB} in projection space.
   */
  static create_fit_aabb(aabb: AABB): Projection;
  /**
   * Creates a new {@link Projection} for projecting positions onto a head-mounted display with the given X:Y aspect ratio, distance between eyes, display width, distance to lens, oversampling factor, and depth clipping planes.
   * `eye` creates the projection for the left eye when set to 1, or the right eye when set to 2.
   */
  static create_for_hmd(eye: int, aspect: float, intraocular_dist: float, display_width: float, display_to_lens: float, oversample: float, z_near: float, z_far: float): Projection;
  /**
   * Creates a new {@link Projection} that projects positions in a frustum with the given clipping planes.
   */
  static create_frustum(left: float, right: float, bottom: float, top: float, z_near: float, z_far: float): Projection;
  /**
   * Creates a new {@link Projection} that projects positions in a frustum with the given size, X:Y aspect ratio, offset, and clipping planes.
   * `flip_fov` determines whether the projection's field of view is flipped over its diagonal.
   */
  static create_frustum_aspect(size: float, aspect: float, offset: Vector2, z_near: float, z_far: float, flip_fov?: boolean): Projection;
  /** Creates a new {@link Projection} that projects positions into the given {@link Rect2}. */
  static create_light_atlas_rect(rect: Rect2): Projection;
  /**
   * Creates a new {@link Projection} that projects positions using an orthogonal projection with the given clipping planes.
   */
  static create_orthogonal(left: float, right: float, bottom: float, top: float, z_near: float, z_far: float): Projection;
  /**
   * Creates a new {@link Projection} that projects positions using an orthogonal projection with the given size, X:Y aspect ratio, and clipping planes.
   * `flip_fov` determines whether the projection's field of view is flipped over its diagonal.
   */
  static create_orthogonal_aspect(size: float, aspect: float, z_near: float, z_far: float, flip_fov?: boolean): Projection;
  /**
   * Creates a new {@link Projection} that projects positions using a perspective projection with the given Y-axis field of view (in degrees), X:Y aspect ratio, and clipping planes.
   * `flip_fov` determines whether the projection's field of view is flipped over its diagonal.
   */
  static create_perspective(fovy: float, aspect: float, z_near: float, z_far: float, flip_fov?: boolean): Projection;
  /**
   * Creates a new {@link Projection} that projects positions using a perspective projection with the given Y-axis field of view (in degrees), X:Y aspect ratio, and clipping distances. The projection is adjusted for a head-mounted display with the given distance between eyes and distance to a point that can be focused on.
   * `eye` creates the projection for the left eye when set to 1, or the right eye when set to 2.
   * `flip_fov` determines whether the projection's field of view is flipped over its diagonal.
   */
  static create_perspective_hmd(fovy: float, aspect: float, z_near: float, z_far: float, flip_fov: boolean, eye: int, intraocular_dist: float, convergence_dist: float): Projection;
  /**
   * Returns a scalar value that is the signed factor by which areas are scaled by this matrix. If the sign is negative, the matrix flips the orientation of the area.
   * The determinant can be used to calculate the invertibility of a matrix or solve linear systems of equations involving the matrix, among other applications.
   */
  determinant(): float;
  /** Returns a copy of this {@link Projection} with the signs of the values of the Y column flipped. */
  flipped_y(): Projection;
  /** Returns the X:Y aspect ratio of this {@link Projection}'s viewport. */
  get_aspect(): float;
  /** Returns the dimensions of the far clipping plane of the projection, divided by two. */
  get_far_plane_half_extents(): Vector2;
  /** Returns the horizontal field of view of the projection (in degrees). */
  get_fov(): float;
  /**
   * Returns the vertical field of view of the projection (in degrees) associated with the given horizontal field of view (in degrees) and aspect ratio.
   * **Note:** Unlike most methods of {@link Projection}, `aspect` is expected to be 1 divided by the X:Y aspect ratio.
   */
  static get_fovy(fovx: float, aspect: float): float;
  /** Returns the factor by which the visible level of detail is scaled by this {@link Projection}. */
  get_lod_multiplier(): float;
  /**
   * Returns `for_pixel_width` divided by the viewport's width measured in meters on the near plane, after this {@link Projection} is applied.
   */
  get_pixels_per_meter(for_pixel_width: int): int;
  /**
   * Returns the clipping plane of this {@link Projection} whose index is given by `plane`.
   * `plane` should be equal to one of {@link PLANE_NEAR}, {@link PLANE_FAR}, {@link PLANE_LEFT}, {@link PLANE_TOP}, {@link PLANE_RIGHT}, or {@link PLANE_BOTTOM}.
   */
  get_projection_plane(plane: int): Plane;
  /**
   * Returns the dimensions of the viewport plane that this {@link Projection} projects positions onto, divided by two.
   */
  get_viewport_half_extents(): Vector2;
  /** Returns the distance for this {@link Projection} beyond which positions are clipped. */
  get_z_far(): float;
  /** Returns the distance for this {@link Projection} before which positions are clipped. */
  get_z_near(): float;
  /**
   * Returns a {@link Projection} that performs the inverse of this {@link Projection}'s projective transformation.
   */
  inverse(): Projection;
  /** Returns `true` if this {@link Projection} performs an orthogonal projection. */
  is_orthogonal(): boolean;
  /**
   * Returns a {@link Projection} with the X and Y values from the given {@link Vector2} added to the first and second values of the final column respectively.
   */
  jitter_offseted(offset: Vector2): Projection;
  /**
   * Returns a {@link Projection} with the near clipping distance adjusted to be `new_znear`.
   * **Note:** The original {@link Projection} must be a perspective projection.
   */
  perspective_znear_adjusted(new_znear: float): Projection;

  // enum Planes
  /** The index value of the projection's near clipping plane. */
  static readonly PLANE_NEAR: int;
  /** The index value of the projection's far clipping plane. */
  static readonly PLANE_FAR: int;
  /** The index value of the projection's left clipping plane. */
  static readonly PLANE_LEFT: int;
  /** The index value of the projection's top clipping plane. */
  static readonly PLANE_TOP: int;
  /** The index value of the projection's right clipping plane. */
  static readonly PLANE_RIGHT: int;
  /** The index value of the projection bottom clipping plane. */
  static readonly PLANE_BOTTOM: int;

  /**
   * A {@link Projection} with no transformation defined. When applied to other data structures, no transformation is performed.
   */
  static readonly IDENTITY: int;
  /**
   * A {@link Projection} with all values initialized to 0. When applied to other data structures, they will be zeroed.
   */
  static readonly ZERO: int;

  // Operator overloads
  [__ne]: { right: Projection; ret: boolean };
  [__mul]: { right: Projection; ret: Projection } | { right: Vector4; ret: Vector4 };
  [__eq]: { right: Projection; ret: boolean };
}
