// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Casts light in a 2D environment. */
declare class Light2D extends Node2D {
  /** The Light2D's blend mode. */
  blend_mode: int;
  /** The Light2D's {@link Color}. */
  color: Color;
  /** If `true`, Light2D will only appear when editing the scene. */
  editor_only: boolean;
  /** If `true`, Light2D will emit light. */
  enabled: boolean;
  /** The Light2D's energy value. The larger the value, the stronger the light. */
  energy: float;
  /**
   * The layer mask. Only objects with a matching {@link CanvasItem.light_mask} will be affected by the Light2D. See also {@link shadow_item_cull_mask}, which affects which objects can cast shadows.
   * **Note:** {@link range_item_cull_mask} is ignored by {@link DirectionalLight2D}, which will always light a 2D node regardless of the 2D node's {@link CanvasItem.light_mask}.
   */
  range_item_cull_mask: int;
  /** Maximum layer value of objects that are affected by the Light2D. */
  range_layer_max: int;
  /** Minimum layer value of objects that are affected by the Light2D. */
  range_layer_min: int;
  /** Maximum `z` value of objects that are affected by the Light2D. */
  range_z_max: int;
  /** Minimum `z` value of objects that are affected by the Light2D. */
  range_z_min: int;
  /** {@link Color} of shadows cast by the Light2D. */
  shadow_color: Color;
  /** If `true`, the Light2D will cast shadows. */
  shadow_enabled: boolean;
  /** Shadow filter type. */
  shadow_filter: int;
  /**
   * Smoothing value for shadows. Higher values will result in softer shadows, at the cost of visible streaks that can appear in shadow rendering. {@link shadow_filter_smooth} only has an effect if {@link shadow_filter} is {@link SHADOW_FILTER_PCF5} or {@link SHADOW_FILTER_PCF13}.
   */
  shadow_filter_smooth: float;
  /**
   * The shadow mask. Used with {@link LightOccluder2D} to cast shadows. Only occluders with a matching {@link CanvasItem.light_mask} will cast shadows. See also {@link range_item_cull_mask}, which affects which objects can *receive* the light.
   */
  shadow_item_cull_mask: int;

  /**
   * Returns the light's height, which is used in 2D normal mapping. See {@link PointLight2D.height} and {@link DirectionalLight2D.height}.
   */
  get_height(): float;
  /**
   * Sets the light's height, which is used in 2D normal mapping. See {@link PointLight2D.height} and {@link DirectionalLight2D.height}.
   */
  set_height(height: float): void;

  // enum ShadowFilter
  /**
   * No filter applies to the shadow map. This provides hard shadow edges and is the fastest to render. See {@link shadow_filter}.
   */
  static readonly SHADOW_FILTER_NONE: int;
  /**
   * Percentage closer filtering (5 samples) applies to the shadow map. This is slower compared to hard shadow rendering. See {@link shadow_filter}.
   */
  static readonly SHADOW_FILTER_PCF5: int;
  /**
   * Percentage closer filtering (13 samples) applies to the shadow map. This is the slowest shadow filtering mode, and should be used sparingly. See {@link shadow_filter}.
   */
  static readonly SHADOW_FILTER_PCF13: int;
  // enum BlendMode
  /**
   * Adds the value of pixels corresponding to the Light2D to the values of pixels under it. This is the common behavior of a light.
   */
  static readonly BLEND_MODE_ADD: int;
  /**
   * Subtracts the value of pixels corresponding to the Light2D to the values of pixels under it, resulting in inversed light effect.
   */
  static readonly BLEND_MODE_SUB: int;
  /**
   * Mix the value of pixels corresponding to the Light2D to the values of pixels under it by linear interpolation.
   */
  static readonly BLEND_MODE_MIX: int;
}
