// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** This resource allows for creating a custom rendering effect. */
declare class CompositorEffect extends Resource {
  /**
   * If `true` and MSAA is enabled, this will trigger a color buffer resolve before the effect is run.
   * **Note:** In {@link _render_callback}, to access the resolved buffer use:
   */
  access_resolved_color: boolean;
  /**
   * If `true` and MSAA is enabled, this will trigger a depth buffer resolve before the effect is run.
   * **Note:** In {@link _render_callback}, to access the resolved buffer use:
   */
  access_resolved_depth: boolean;
  /**
   * The type of effect that is implemented, determines at what stage of rendering the callback is called.
   */
  effect_callback_type: int;
  /** If `true` this rendering effect is applied to any viewport it is added to. */
  enabled: boolean;
  /**
   * If `true` this triggers motion vectors being calculated during the opaque render state.
   * **Note:** In {@link _render_callback}, to access the motion vector buffer use:
   */
  needs_motion_vectors: boolean;
  /**
   * If `true` this triggers normal and roughness data to be output during our depth pre-pass, only applicable for the Forward+ renderer.
   * **Note:** In {@link _render_callback}, to access the roughness buffer use:
   * The raw normal and roughness buffer is stored in an optimized format, different than the one available in Spatial shaders. When sampling the buffer, a conversion function must be applied. Use this function, copied from here (https://github.com/godotengine/godot/blob/da5f39889f155658cef7f7ec3cc1abb94e17d815/servers/rendering/renderer_rd/shaders/forward_clustered/scene_forward_clustered_inc.glsl#L334-L341):
   */
  needs_normal_roughness: boolean;
  /**
   * If `true` this triggers specular data being rendered to a separate buffer and combined after effects have been applied, only applicable for the Forward+ renderer.
   */
  needs_separate_specular: boolean;
  set_access_resolved_color(value: boolean): void;
  get_access_resolved_color(): boolean;
  set_access_resolved_depth(value: boolean): void;
  get_access_resolved_depth(): boolean;
  set_effect_callback_type(value: int): void;
  get_effect_callback_type(): int;
  set_enabled(value: boolean): void;
  get_enabled(): boolean;
  set_needs_motion_vectors(value: boolean): void;
  get_needs_motion_vectors(): boolean;
  set_needs_normal_roughness(value: boolean): void;
  get_needs_normal_roughness(): boolean;
  set_needs_separate_specular(value: boolean): void;
  get_needs_separate_specular(): boolean;

  /**
   * Implement this function with your custom rendering code. `effect_callback_type` should always match the effect callback type you've specified in {@link effect_callback_type}. `render_data` provides access to the rendering state, it is only valid during rendering and should not be stored.
   */
  _render_callback(effect_callback_type: int, render_data: RenderData): void;

  // enum EffectCallbackType
  /** The callback is called before our opaque rendering pass, but after depth prepass (if applicable). */
  static readonly EFFECT_CALLBACK_TYPE_PRE_OPAQUE: int;
  /** The callback is called after our opaque rendering pass, but before our sky is rendered. */
  static readonly EFFECT_CALLBACK_TYPE_POST_OPAQUE: int;
  /**
   * The callback is called after our sky is rendered, but before our back buffers are created (and if enabled, before subsurface scattering and/or screen space reflections).
   */
  static readonly EFFECT_CALLBACK_TYPE_POST_SKY: int;
  /**
   * The callback is called before our transparent rendering pass, but after our sky is rendered and we've created our back buffers.
   */
  static readonly EFFECT_CALLBACK_TYPE_PRE_TRANSPARENT: int;
  /**
   * The callback is called after our transparent rendering pass, but before any built-in post-processing effects and output to our render target.
   */
  static readonly EFFECT_CALLBACK_TYPE_POST_TRANSPARENT: int;
  /** Represents the size of the {@link EffectCallbackType} enum. */
  static readonly EFFECT_CALLBACK_TYPE_MAX: int;
}
