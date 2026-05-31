// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A material that defines a simple sky for a {@link Sky} resource. */
declare class ProceduralSkyMaterial extends Material {
  /** The sky's overall brightness multiplier. Higher values result in a brighter sky. */
  energy_multiplier: float;
  /** Color of the ground at the bottom. Blends with {@link ground_horizon_color}. */
  ground_bottom_color: Color;
  /** How quickly the {@link ground_horizon_color} fades into the {@link ground_bottom_color}. */
  ground_curve: float;
  /** Multiplier for ground color. A higher value will make the ground brighter. */
  ground_energy_multiplier: float;
  /** Color of the ground at the horizon. Blends with {@link ground_bottom_color}. */
  ground_horizon_color: Color;
  /**
   * The sky cover texture to use. This texture must use an equirectangular projection (similar to {@link PanoramaSkyMaterial}). The texture's colors will be *added* to the existing sky color, and will be multiplied by {@link sky_energy_multiplier} and {@link sky_cover_modulate}. This is mainly suited to displaying stars at night, but it can also be used to display clouds at day or night (with a non-physically-accurate look).
   */
  sky_cover: Texture2D | null;
  /**
   * The tint to apply to the {@link sky_cover} texture. This can be used to change the sky cover's colors or opacity independently of the sky energy, which is useful for day/night or weather transitions. Only effective if a texture is defined in {@link sky_cover}.
   */
  sky_cover_modulate: Color;
  /** How quickly the {@link sky_horizon_color} fades into the {@link sky_top_color}. */
  sky_curve: float;
  /** Multiplier for sky color. A higher value will make the sky brighter. */
  sky_energy_multiplier: float;
  /** Color of the sky at the horizon. Blends with {@link sky_top_color}. */
  sky_horizon_color: Color;
  /** Color of the sky at the top. Blends with {@link sky_horizon_color}. */
  sky_top_color: Color;
  /** Distance from center of sun where it fades out completely. */
  sun_angle_max: float;
  /** How quickly the sun fades away between the edge of the sun disk and {@link sun_angle_max}. */
  sun_curve: float;
  /**
   * If `true`, enables debanding. Debanding adds a small amount of noise which helps reduce banding that appears from the smooth changes in color in the sky.
   */
  use_debanding: boolean;
  set_energy_multiplier(value: float): void;
  get_energy_multiplier(): float;
  set_ground_bottom_color(value: Color): void;
  get_ground_bottom_color(): Color;
  set_ground_curve(value: float): void;
  get_ground_curve(): float;
  set_ground_energy_multiplier(value: float): void;
  get_ground_energy_multiplier(): float;
  set_ground_horizon_color(value: Color): void;
  get_ground_horizon_color(): Color;
  set_sky_cover(value: Texture2D | null): void;
  get_sky_cover(): Texture2D | null;
  set_sky_cover_modulate(value: Color): void;
  get_sky_cover_modulate(): Color;
  set_sky_curve(value: float): void;
  get_sky_curve(): float;
  set_sky_energy_multiplier(value: float): void;
  get_sky_energy_multiplier(): float;
  set_sky_horizon_color(value: Color): void;
  get_sky_horizon_color(): Color;
  set_sky_top_color(value: Color): void;
  get_sky_top_color(): Color;
  set_sun_angle_max(value: float): void;
  get_sun_angle_max(): float;
  set_sun_curve(value: float): void;
  get_sun_curve(): float;
  set_use_debanding(value: boolean): void;
  get_use_debanding(): boolean;
}
