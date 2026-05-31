// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a phaser audio effect to an audio bus.
 * Creates several notch and peak filters that sweep across the spectrum.
 */
declare class AudioEffectPhaser extends AudioEffect {
  /** Intensity of the effect. Value can range from 0.1 to 4.0. */
  depth: float;
  /**
   * The volume ratio of the filtered audio that is fed back to the all-pass filters. The higher the value, the sharper and louder the peak filters created by the effect. Value can range from 0.1 to 0.9.
   */
  feedback: float;
  /**
   * Determines the maximum frequency affected by the low-frequency oscillator modulations, in Hz. Value can range from 10 to 10000.
   */
  range_max_hz: float;
  /**
   * Determines the minimum frequency affected by the low-frequency oscillator modulations, in Hz. Value can range from 10 to 10000.
   */
  range_min_hz: float;
  /**
   * Adjusts the rate in Hz at which the effect sweeps up and down across the frequency range. Value can range from 0.01 to 20.
   */
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
