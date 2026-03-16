// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Adds a delay audio effect to an audio bus.
 * Emulates an echo by playing the input audio back after a period of time.
 */
declare class AudioEffectDelay extends AudioEffect {
  /** The volume ratio of the original audio. Value can range from 0 to 1. */
  dry: float;
  /** If `true`, feedback is enabled, repeating taps after they are played. */
  feedback_active: boolean;
  /** Feedback delay time in milliseconds. Value can range from 0 to 1500. */
  feedback_delay_ms: float;
  /** Gain for feedback, in dB. Value can range from -60 to 0. */
  feedback_level_db: float;
  /**
   * Low-pass filter for feedback, in Hz. Frequencies above this value are filtered out. Value can range from 1 to 16000.
   */
  feedback_lowpass: float;
  /** If `true`, the first tap will be enabled. */
  tap1_active: boolean;
  /**
   * First tap delay time in milliseconds, compared to the original audio. Value can range from 0 to 1500.
   */
  tap1_delay_ms: float;
  /** Gain for the first tap, in dB. Value can range from -60 to 0. */
  tap1_level_db: float;
  /**
   * Pan position for the first tap. Negative values pan the sound to the left, positive pan to the right. Value can range from -1 to 1.
   */
  tap1_pan: float;
  /** If `true`, the second tap will be enabled. */
  tap2_active: boolean;
  /**
   * Second tap delay time in milliseconds, compared to the original audio. Value can range from 0 to 1500.
   */
  tap2_delay_ms: float;
  /** Gain for the second tap, in dB. Value can range from -60 to 0. */
  tap2_level_db: float;
  /**
   * Pan position for the second tap. Negative values pan the sound to the left, positive pan to the right. Value can range from -1 to 1.
   */
  tap2_pan: float;
}
