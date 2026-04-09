// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Base class for audio equalizers (EQ). Gives you control over frequencies.
 * Use it to create a custom equalizer if {@link AudioEffectEQ6}, {@link AudioEffectEQ10}, or {@link AudioEffectEQ21} don't fit your needs.
 */
declare class AudioEffectEQ extends AudioEffect {
  /** Returns the number of bands of the equalizer. */
  get_band_count(): int;
  /** Returns the band's gain at the specified index, in dB. */
  get_band_gain_db(band_idx: int): float;
  /** Sets band's gain at the specified index, in dB. */
  set_band_gain_db(band_idx: int, volume_db: float): void;
}
