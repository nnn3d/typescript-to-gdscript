// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Adds a limiter audio effect to an audio bus.
 * Prevents audio signals from exceeding a specified volume level.
 */
declare class AudioEffectHardLimiter extends AudioEffect {
  /**
   * The waveform's maximum allowed value, in dB. This value can range from -24 to 0.
   * The default value of -0.3 prevents potential inter-sample peaks (ISP) from crossing over 0 dB, which can cause slight distortion on some older hardware.
   */
  ceiling_db: float;
  /** Gain before limiting, in dB. Value can range from -24 to 24. */
  pre_gain_db: float;
  /** Time it takes in seconds for the gain reduction to fully release. Value can range from 0.01 to 3. */
  release: float;
}
