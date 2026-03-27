// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Provides high-performance drawing of a mesh multiple times using GPU instancing. */
declare class MultiMesh extends Resource {
  buffer: PackedFloat32Array;
  /** Array containing each {@link Color} used by all instances of this mesh. */
  color_array: PackedColorArray;
  /**
   * Custom AABB for this MultiMesh resource. Setting this manually prevents costly runtime AABB recalculations.
   */
  custom_aabb: AABB;
  /**
   * Array containing each custom data value used by all instances of this mesh, as a {@link PackedColorArray}.
   */
  custom_data_array: PackedColorArray;
  /**
   * Number of instances that will get drawn. This clears and (re)sizes the buffers. Setting data format or flags afterwards will have no effect.
   * By default, all instances are drawn but you can limit this with {@link visible_instance_count}.
   */
  instance_count: int;
  /**
   * {@link Mesh} resource to be instanced.
   * The looks of the individual instances can be modified using {@link set_instance_color} and {@link set_instance_custom_data}.
   */
  mesh: Mesh;
  /**
   * Choose whether to use an interpolation method that favors speed or quality.
   * When using low physics tick rates (typically below 20) or high rates of object rotation, you may get better results from the high quality setting.
   * **Note:** Fast quality does not equate to low quality. Except in the special cases mentioned above, the quality should be comparable to high quality.
   */
  physics_interpolation_quality: int;
  /**
   * Array containing each {@link Transform2D} value used by all instances of this mesh, as a {@link PackedVector2Array}. Each transform is divided into 3 {@link Vector2} values corresponding to the transforms' `x`, `y`, and `origin`.
   */
  transform_2d_array: PackedVector2Array;
  /**
   * Array containing each {@link Transform3D} value used by all instances of this mesh, as a {@link PackedVector3Array}. Each transform is divided into 4 {@link Vector3} values corresponding to the transforms' `x`, `y`, `z`, and `origin`.
   */
  transform_array: PackedVector3Array;
  /** Format of transform used to transform mesh, either 2D or 3D. */
  transform_format: int;
  /**
   * If `true`, the {@link MultiMesh} will use color data (see {@link set_instance_color}). Can only be set when {@link instance_count} is `0` or less. This means that you need to call this method before setting the instance count, or temporarily reset it to `0`.
   */
  use_colors: boolean;
  /**
   * If `true`, the {@link MultiMesh} will use custom data (see {@link set_instance_custom_data}). Can only be set when {@link instance_count} is `0` or less. This means that you need to call this method before setting the instance count, or temporarily reset it to `0`.
   */
  use_custom_data: boolean;
  /**
   * Limits the number of instances drawn, -1 draws all instances. Changing this does not change the sizes of the buffers.
   */
  visible_instance_count: int;
  set_buffer(value: PackedFloat32Array): void;
  get_buffer(): PackedFloat32Array;
  _set_color_array(value: PackedColorArray): void;
  _get_color_array(): PackedColorArray;
  set_custom_aabb(value: AABB): void;
  get_custom_aabb(): AABB;
  _set_custom_data_array(value: PackedColorArray): void;
  _get_custom_data_array(): PackedColorArray;
  set_instance_count(value: int): void;
  get_instance_count(): int;
  set_mesh(value: Mesh): void;
  get_mesh(): Mesh;
  set_physics_interpolation_quality(value: int): void;
  get_physics_interpolation_quality(): int;
  _set_transform_2d_array(value: PackedVector2Array): void;
  _get_transform_2d_array(): PackedVector2Array;
  _set_transform_array(value: PackedVector3Array): void;
  _get_transform_array(): PackedVector3Array;
  set_transform_format(value: int): void;
  get_transform_format(): int;
  set_use_colors(value: boolean): void;
  is_using_colors(): boolean;
  set_use_custom_data(value: boolean): void;
  is_using_custom_data(): boolean;
  set_visible_instance_count(value: int): void;
  get_visible_instance_count(): int;

  /** Returns the visibility axis-aligned bounding box in local space. */
  get_aabb(): AABB;
  /** Gets a specific instance's color multiplier. */
  get_instance_color(instance: int): Color;
  /** Returns the custom data that has been set for a specific instance. */
  get_instance_custom_data(instance: int): Color;
  /** Returns the {@link Transform3D} of a specific instance. */
  get_instance_transform(instance: int): Transform3D;
  /** Returns the {@link Transform2D} of a specific instance. */
  get_instance_transform_2d(instance: int): Transform2D;
  /**
   * When using *physics interpolation*, this function allows you to prevent interpolation on an instance in the current physics tick.
   * This allows you to move instances instantaneously, and should usually be used when initially placing an instance such as a bullet to prevent graphical glitches.
   */
  reset_instance_physics_interpolation(instance: int): void;
  /**
   * When using *physics interpolation*, this function allows you to prevent interpolation for all instances in the current physics tick.
   * This allows you to move all instances instantaneously, and should usually be used when initially placing instances to prevent graphical glitches.
   */
  reset_instances_physics_interpolation(): void;
  /**
   * An alternative to setting the {@link buffer} property, which can be used with *physics interpolation*. This method takes two arrays, and can set the data for the current and previous tick in one go. The renderer will automatically interpolate the data at each frame.
   * This is useful for situations where the order of instances may change from physics tick to tick, such as particle systems.
   * When the order of instances is coherent, the simpler alternative of setting {@link buffer} can still be used with interpolation.
   */
  set_buffer_interpolated(buffer_curr: PackedFloat32Array, buffer_prev: PackedFloat32Array): void;
  /**
   * Sets the color of a specific instance by *multiplying* the mesh's existing vertex colors. This allows for different color tinting per instance.
   * **Note:** Each component is stored in 32 bits in the Forward+ and Mobile rendering methods, but is packed into 16 bits in the Compatibility rendering method.
   * For the color to take effect, ensure that {@link use_colors} is `true` on the {@link MultiMesh} and {@link BaseMaterial3D.vertex_color_use_as_albedo} is `true` on the material. If you intend to set an absolute color instead of tinting, make sure the material's albedo color is set to pure white (`Color(1, 1, 1)`).
   */
  set_instance_color(instance: int, color: Color): void;
  /**
   * Sets custom data for a specific instance. `custom_data` is a {@link Color} type only to contain 4 floating-point numbers.
   * **Note:** Each number is stored in 32 bits in the Forward+ and Mobile rendering methods, but is packed into 16 bits in the Compatibility rendering method.
   * For the custom data to be used, ensure that {@link use_custom_data} is `true`.
   * This custom instance data has to be manually accessed in your custom shader using `INSTANCE_CUSTOM`.
   */
  set_instance_custom_data(instance: int, custom_data: Color): void;
  /** Sets the {@link Transform3D} for a specific instance. */
  set_instance_transform(instance: int, transform: Transform3D): void;
  /** Sets the {@link Transform2D} for a specific instance. */
  set_instance_transform_2d(instance: int, transform: Transform2D): void;

  // enum TransformFormat
  /** Use this when using 2D transforms. */
  static readonly TRANSFORM_2D: int;
  /** Use this when using 3D transforms. */
  static readonly TRANSFORM_3D: int;
  // enum PhysicsInterpolationQuality
  /** Always interpolate using Basis lerping, which can produce warping artifacts in some situations. */
  static readonly INTERP_QUALITY_FAST: int;
  /**
   * Attempt to interpolate using Basis slerping (spherical linear interpolation) where possible, otherwise fall back to lerping.
   */
  static readonly INTERP_QUALITY_HIGH: int;
}
