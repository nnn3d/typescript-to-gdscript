// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A material that provides a special texture to a {@link Sky}, usually an HDR panorama. */
declare class PanoramaSkyMaterial extends Material {
  /** The sky's overall brightness multiplier. Higher values result in a brighter sky. */
  energy_multiplier: float;
  /** A boolean value to determine if the background texture should be filtered or not. */
  filter: boolean;
  /** {@link Texture2D} to be applied to the {@link PanoramaSkyMaterial}. */
  panorama: Texture2D;
  set_energy_multiplier(value: float): void;
  get_energy_multiplier(): float;
  set_filtering_enabled(value: boolean): void;
  is_filtering_enabled(): boolean;
  set_panorama(value: Texture2D): void;
  get_panorama(): Texture2D;
}
