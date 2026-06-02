// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a soft-clip limiter audio effect to an Audio bus. */
declare class AudioEffectLimiter extends AudioEffect {
  /** The waveform's maximum allowed value, in decibels. Value can range from -20 to -0.1. */
  ceiling_db: float;
  /** Applies a gain to the limited waves, in decibels. Value can range from 0 to 6. */
  soft_clip_db: float;
  soft_clip_ratio: float;
  /** Threshold from which the limiter begins to be active, in decibels. Value can range from -30 to 0. */
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
