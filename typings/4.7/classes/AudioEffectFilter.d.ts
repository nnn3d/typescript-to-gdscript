// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Base class for filters. Use effects that inherit this class instead of using it directly. */
declare class AudioEffectFilter extends AudioEffect {
  /** Frequency threshold for the filter, in Hz. Value can range from 1 to 20500. */
  cutoff_hz: float;
  /**
   * Steepness of the cutoff curve in dB per octave (twice the frequency above {@link cutoff_hz}, or half the frequency below {@link cutoff_hz}), also known as the "order" of the filter. Higher orders have a more aggressive cutoff.
   */
  db: int;
  /**
   * Gain of the frequencies affected by the filter. This property is only available for {@link AudioEffectLowShelfFilter} and {@link AudioEffectHighShelfFilter}. Value can range from 0 to 4.
   */
  gain: float;
  /**
   * Gain at or directly next to the {@link cutoff_hz} frequency threshold. Value can range from 0 to 1.
   * Its exact behavior depends on the selected filter type:
   * - For shelf filters, it accentuates or masks the order by increasing frequencies right next to the {@link cutoff_hz} frequency and decreasing frequencies on the opposite side.
   * - For the band-pass and notch filters, it widens or narrows the filter at the {@link cutoff_hz} frequency threshold.
   * - For low/high-pass filters, it increases or decreases frequencies at the {@link cutoff_hz} frequency threshold.
   */
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
  /**
   * Cutting off at 6 dB per octave. One octave is twice the frequency above {@link cutoff_hz}, or half the frequency below {@link cutoff_hz}.
   */
  static readonly FILTER_6DB: int;
  /**
   * Cutting off at 12 dB per octave. One octave is twice the frequency above {@link cutoff_hz}, or half the frequency below {@link cutoff_hz}.
   */
  static readonly FILTER_12DB: int;
  /**
   * Cutting off at 18 dB per octave. One octave is twice the frequency above {@link cutoff_hz}, or half the frequency below {@link cutoff_hz}.
   */
  static readonly FILTER_18DB: int;
  /**
   * Cutting off at 24 dB per octave. One octave is twice the frequency above {@link cutoff_hz}, or half the frequency below {@link cutoff_hz}.
   */
  static readonly FILTER_24DB: int;
}
