// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A material that defines a sky for a {@link Sky} resource by a set of physical properties. */
declare class PhysicalSkyMaterial extends Material {
  /** The sky's overall brightness multiplier. Higher values result in a brighter sky. */
  energy_multiplier: float;
  /** Modulates the {@link Color} on the bottom half of the sky to represent the ground. */
  ground_color: Color;
  /**
   * Controls the strength of Mie scattering (https://en.wikipedia.org/wiki/Mie_scattering) for the sky. Mie scattering results from light colliding with larger particles (like water). On earth, Mie scattering results in a whitish color around the sun and horizon.
   */
  mie_coefficient: float;
  /**
   * Controls the {@link Color} of the Mie scattering (https://en.wikipedia.org/wiki/Mie_scattering) effect. While not physically accurate, this allows for the creation of alien-looking planets.
   */
  mie_color: Color;
  /**
   * Controls the direction of the Mie scattering (https://en.wikipedia.org/wiki/Mie_scattering). A value of `1` means that when light hits a particle it's passing through straight forward. A value of `-1` means that all light is scatter backwards.
   */
  mie_eccentricity: float;
  /**
   * {@link Texture2D} for the night sky. This is added to the sky, so if it is bright enough, it may be visible during the day.
   */
  night_sky: Texture2D;
  /**
   * Controls the strength of the Rayleigh scattering (https://en.wikipedia.org/wiki/Rayleigh_scattering). Rayleigh scattering results from light colliding with small particles. It is responsible for the blue color of the sky.
   */
  rayleigh_coefficient: float;
  /**
   * Controls the {@link Color} of the Rayleigh scattering (https://en.wikipedia.org/wiki/Rayleigh_scattering). While not physically accurate, this allows for the creation of alien-looking planets. For example, setting this to a red {@link Color} results in a Mars-looking atmosphere with a corresponding blue sunset.
   */
  rayleigh_color: Color;
  /** Sets the size of the sun disk. Default value is based on Sol's perceived size from Earth. */
  sun_disk_scale: float;
  /**
   * Sets the thickness of the atmosphere. High turbidity creates a foggy-looking atmosphere, while a low turbidity results in a clearer atmosphere.
   */
  turbidity: float;
  /**
   * If `true`, enables debanding. Debanding adds a small amount of noise which helps reduce banding that appears from the smooth changes in color in the sky.
   */
  use_debanding: boolean;
}
