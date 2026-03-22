// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Virtual base class for applying visual properties to an object, such as color and roughness. */
declare class Material extends Resource {
  /**
   * Sets the {@link Material} to be used for the next pass. This renders the object again using a different material.
   * **Note:** {@link next_pass} materials are not necessarily drawn immediately after the source {@link Material}. Draw order is determined by material properties, {@link render_priority}, and distance to camera.
   * **Note:** This only applies to {@link StandardMaterial3D}s and {@link ShaderMaterial}s with type "Spatial".
   */
  next_pass: Material;
  /**
   * Sets the render priority for objects in 3D scenes. Higher priority objects will be sorted in front of lower priority objects. In other words, all objects with {@link render_priority} `1` will render on top of all objects with {@link render_priority} `0`.
   * **Note:** This only applies to {@link StandardMaterial3D}s and {@link ShaderMaterial}s with type "Spatial".
   * **Note:** This will not impact how transparent objects are sorted relative to opaque objects or how dynamic meshes will be sorted relative to other opaque meshes. This is because all transparent objects are drawn after all opaque objects and all dynamic opaque meshes are drawn before other opaque meshes.
   */
  render_priority: int;
  set_next_pass(value: Material): void;
  get_next_pass(): Material;
  set_render_priority(value: int): void;
  get_render_priority(): int;

  /**
   * Only exposed for the purpose of overriding. You cannot call this function directly. Used internally to determine if {@link next_pass} should be shown in the editor or not.
   */
  _can_do_next_pass(): boolean;
  /**
   * Only exposed for the purpose of overriding. You cannot call this function directly. Used internally to determine if {@link render_priority} should be shown in the editor or not.
   */
  _can_use_render_priority(): boolean;
  /**
   * Only exposed for the purpose of overriding. You cannot call this function directly. Used internally by various editor tools.
   */
  _get_shader_mode(): int;
  /**
   * Only exposed for the purpose of overriding. You cannot call this function directly. Used internally by various editor tools. Used to access the RID of the {@link Material}'s {@link Shader}.
   */
  _get_shader_rid(): RID;
  /** Creates a placeholder version of this resource ({@link PlaceholderMaterial}). */
  create_placeholder(): Resource;
  /**
   * Only available when running in the editor. Opens a popup that visualizes the generated shader code, including all variants and internal shader code. See also {@link Shader.inspect_native_shader_code}.
   */
  inspect_native_shader_code(): void;

  /** Maximum value for the {@link render_priority} parameter. */
  static readonly RENDER_PRIORITY_MAX: int;
  /** Minimum value for the {@link render_priority} parameter. */
  static readonly RENDER_PRIORITY_MIN: int;
}
