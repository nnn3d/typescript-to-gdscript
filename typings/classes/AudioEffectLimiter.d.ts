// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a soft-clip limiter audio effect to an audio bus. */
declare class AudioEffectLimiter extends AudioEffect {
  /** The waveform's maximum allowed value, in dB. Value can range from -20 to -0.1. */
  ceiling_db: float;
  /** Modifies the volume of the limited waves, in dB. Value can range from 0 to 6. */
  soft_clip_db: float;
  /**
   * This property has no effect on the audio. Use {@link AudioEffectHardLimiter} instead, as this Limiter effect is deprecated.
   */
  soft_clip_ratio: float;
  /**
   * The volume threshold level from which the limiter begins to be active, in dB. Value can range from -30 to 0.
   */
  threshold_db: float;
  set_ceiling_db(value: float): void;
  get_ceiling_db(): float;
  set_soft_clip_db(value: float): void;
  get_soft_clip_db(): float;
  set_soft_clip_ratio(value: float): void;
  get_soft_clip_ratio(): float;
  set_threshold_db(value: float): void;
  get_threshold_db(): float;
}
