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
}
