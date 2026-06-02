// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a delay audio effect to an audio bus. Plays input signal back after a period of time.
 * Two tap delay and feedback options.
 */
declare class AudioEffectDelay extends AudioEffect {
  /**
   * Output percent of original sound. At 0, only delayed sounds are output. Value can range from 0 to 1.
   */
  dry: float;
  /** If `true`, feedback is enabled. */
  feedback_active: boolean;
  /** Feedback delay time in milliseconds. */
  feedback_delay_ms: float;
  /** Sound level for feedback. */
  feedback_level_db: float;
  /**
   * Low-pass filter for feedback, in Hz. Frequencies below this value are filtered out of the source signal.
   */
  feedback_lowpass: float;
  /** If `true`, the first tap will be enabled. */
  tap1_active: boolean;
  /** First tap delay time in milliseconds. */
  tap1_delay_ms: float;
  /** Sound level for the first tap. */
  tap1_level_db: float;
  /** Pan position for the first tap. Value can range from -1 (fully left) to 1 (fully right). */
  tap1_pan: float;
  /** If `true`, the second tap will be enabled. */
  tap2_active: boolean;
  /** Second tap delay time in milliseconds. */
  tap2_delay_ms: float;
  /** Sound level for the second tap. */
  tap2_level_db: float;
  /** Pan position for the second tap. Value can range from -1 (fully left) to 1 (fully right). */
  tap2_pan: float;
  set_dry(value: float): void;
  get_dry(): float;
  set_feedback_active(value: boolean): void;
  is_feedback_active(): boolean;
  set_feedback_delay_ms(value: float): void;
  get_feedback_delay_ms(): float;
  set_feedback_level_db(value: float): void;
  get_feedback_level_db(): float;
  set_feedback_lowpass(value: float): void;
  get_feedback_lowpass(): float;
  set_tap1_active(value: boolean): void;
  is_tap1_active(): boolean;
  set_tap1_delay_ms(value: float): void;
  get_tap1_delay_ms(): float;
  set_tap1_level_db(value: float): void;
  get_tap1_level_db(): float;
  set_tap1_pan(value: float): void;
  get_tap1_pan(): float;
  set_tap2_active(value: boolean): void;
  is_tap2_active(): boolean;
  set_tap2_delay_ms(value: float): void;
  get_tap2_delay_ms(): float;
  set_tap2_level_db(value: float): void;
  get_tap2_level_db(): float;
  set_tap2_pan(value: float): void;
  get_tap2_pan(): float;
}
