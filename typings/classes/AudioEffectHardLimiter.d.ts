// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a hard limiter audio effect to an Audio bus. */
declare class AudioEffectHardLimiter extends AudioEffect {
  /**
   * The waveform's maximum allowed value, in decibels. This value can range from `-24.0` to `0.0`.
   * The default value of `-0.3` prevents potential inter-sample peaks (ISP) from crossing over 0 dB, which can cause slight distortion on some older hardware.
   */
  ceiling_db: float;
  /** Gain to apply before limiting, in decibels. */
  pre_gain_db: float;
  /** Time it takes in seconds for the gain reduction to fully release. */
  release: float;
  set_ceiling_db(value: float): void;
  get_ceiling_db(): float;
  set_pre_gain_db(value: float): void;
  get_pre_gain_db(): float;
  set_release(value: float): void;
  get_release(): float;
}
