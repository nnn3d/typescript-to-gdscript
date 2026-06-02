// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a phaser audio effect to an audio bus.
 * Combines the original signal with a copy that is slightly out of phase with the original.
 */
declare class AudioEffectPhaser extends AudioEffect {
  /**
   * Determines how high the filter frequencies sweep. Low value will primarily affect bass frequencies. High value can sweep high into the treble. Value can range from `0.1` to `4.0`.
   */
  depth: float;
  /** Output percent of modified sound. Value can range from 0.1 to 0.9. */
  feedback: float;
  /**
   * Determines the maximum frequency affected by the LFO modulations, in Hz. Value can range from 10 to 10000.
   */
  range_max_hz: float;
  /**
   * Determines the minimum frequency affected by the LFO modulations, in Hz. Value can range from 10 to 10000.
   */
  range_min_hz: float;
  /** Adjusts the rate in Hz at which the effect sweeps up and down across the frequency range. */
  rate_hz: float;
  set_depth(value: float): void;
  get_depth(): float;
  set_feedback(value: float): void;
  get_feedback(): float;
  set_range_max_hz(value: float): void;
  get_range_max_hz(): float;
  set_range_min_hz(value: float): void;
  get_range_min_hz(): float;
  set_rate_hz(value: float): void;
  get_rate_hz(): float;
}
