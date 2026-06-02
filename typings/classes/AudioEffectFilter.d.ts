// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a filter to the audio bus. */
declare class AudioEffectFilter extends AudioEffect {
  /** Threshold frequency for the filter, in Hz. */
  cutoff_hz: float;
  /**
   * Steepness of the cutoff curve in dB per octave, also known as the order of the filter. Higher orders have a more aggressive cutoff.
   */
  db: int;
  /** Gain amount of the frequencies after the filter. */
  gain: float;
  /** Amount of boost in the frequency range near the cutoff frequency. */
  resonance: float;
  set_cutoff(value: float): void;
  get_cutoff(): float;
  set_db(value: int): void;
  get_db(): int;
  set_gain(value: float): void;
  get_gain(): float;
  set_resonance(value: float): void;
  get_resonance(): float;

  // enum FilterDB
  /** Cutting off at 6dB per octave. */
  static readonly FILTER_6DB: int;
  /** Cutting off at 12dB per octave. */
  static readonly FILTER_12DB: int;
  /** Cutting off at 18dB per octave. */
  static readonly FILTER_18DB: int;
  /** Cutting off at 24dB per octave. */
  static readonly FILTER_24DB: int;
}
