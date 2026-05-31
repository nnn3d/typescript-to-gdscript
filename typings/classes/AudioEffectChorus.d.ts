// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a chorus audio effect to an audio bus.
 * Gives the impression of multiple audio sources.
 */
declare class AudioEffectChorus extends AudioEffect {
  /** The volume ratio of the original audio. Value can range from 0 to 1. */
  dry: float;
  /** The frequency threshold of the voice's low-pass filter in Hz. */
  'voice/1/cutoff_hz': float;
  /** The delay of the voice in milliseconds, compared to the original audio. */
  'voice/1/delay_ms': float;
  /** The depth of the voice's low-frequency oscillator in milliseconds. */
  'voice/1/depth_ms': float;
  /** The gain of the voice in dB. */
  'voice/1/level_db': float;
  /** The pan position of the voice. */
  'voice/1/pan': float;
  /** The rate of the voice's low-frequency oscillator in Hz. */
  'voice/1/rate_hz': float;
  /** The frequency threshold of the voice's low-pass filter in Hz. */
  'voice/2/cutoff_hz': float;
  /** The delay of the voice in milliseconds, compared to the original audio. */
  'voice/2/delay_ms': float;
  /** The depth of the voice's low-frequency oscillator in milliseconds. */
  'voice/2/depth_ms': float;
  /** The gain of the voice in dB. */
  'voice/2/level_db': float;
  /** The pan position of the voice. */
  'voice/2/pan': float;
  /** The rate of the voice's low-frequency oscillator in Hz. */
  'voice/2/rate_hz': float;
  /** The frequency threshold of the voice's low-pass filter in Hz. */
  'voice/3/cutoff_hz': float;
  /** The delay of the voice in milliseconds, compared to the original audio. */
  'voice/3/delay_ms': float;
  /** The depth of the voice's low-frequency oscillator in milliseconds. */
  'voice/3/depth_ms': float;
  /** The gain of the voice in dB. */
  'voice/3/level_db': float;
  /** The pan position of the voice. */
  'voice/3/pan': float;
  /** The rate of the voice's low-frequency oscillator in Hz. */
  'voice/3/rate_hz': float;
  /** The frequency threshold of the voice's low-pass filter in Hz. */
  'voice/4/cutoff_hz': float;
  /** The delay of the voice in milliseconds, compared to the original audio. */
  'voice/4/delay_ms': float;
  /** The depth of the voice's low-frequency oscillator in milliseconds. */
  'voice/4/depth_ms': float;
  /** The gain of the voice in dB. */
  'voice/4/level_db': float;
  /** The pan position of the voice. */
  'voice/4/pan': float;
  /** The rate of the voice's low-frequency oscillator in Hz. */
  'voice/4/rate_hz': float;
  /** The number of voices in the effect. Value can range from 1 to 4. */
  voice_count: int;
  /** The volume ratio of all voices. Value can range from 0 to 1. */
  wet: float;
  set_dry(value: float): void;
  get_dry(): float;
  set_voice_count(value: int): void;
  get_voice_count(): int;
  set_wet(value: float): void;
  get_wet(): float;

  /**
   * Returns the frequency threshold of a given `voice_idx`'s low-pass filter in Hz. Frequencies above this value are removed from the voice.
   */
  get_voice_cutoff_hz(voice_idx: int): float;
  /** Returns the delay of a given `voice_idx` in milliseconds, compared to the original audio. */
  get_voice_delay_ms(voice_idx: int): float;
  /** Returns the depth of a given `voice_idx`'s low-frequency oscillator in milliseconds. */
  get_voice_depth_ms(voice_idx: int): float;
  /** Returns the gain of a given `voice_idx` in dB. */
  get_voice_level_db(voice_idx: int): float;
  /**
   * Returns the pan position of a given `voice_idx`. Negative values mean the left channel, positive mean the right.
   */
  get_voice_pan(voice_idx: int): float;
  /** Returns the rate of a given `voice_idx`'s low-frequency oscillator in Hz. */
  get_voice_rate_hz(voice_idx: int): float;
  /**
   * Sets the frequency threshold of a given `voice_idx`'s low-pass filter in Hz. Frequencies above `cutoff_hz` are removed from `voice_idx`. Value can range from 1 to 20500.
   */
  set_voice_cutoff_hz(voice_idx: int, cutoff_hz: float): void;
  /**
   * Sets the delay of a given `voice_idx` in milliseconds, compared to the original audio. Value can range from 0 to 50.
   */
  set_voice_delay_ms(voice_idx: int, delay_ms: float): void;
  /**
   * Sets the depth of a given `voice_idx`'s low-frequency oscillator in milliseconds. Value can range from 0 to 20.
   */
  set_voice_depth_ms(voice_idx: int, depth_ms: float): void;
  /** Sets the gain of a given `voice_idx` in dB. Value can range from -60 to 24. */
  set_voice_level_db(voice_idx: int, level_db: float): void;
  /**
   * Sets the pan position of a given `voice_idx`. Negative values pan the sound to the left, positive pan to the right. Value can range from -1 to 1.
   */
  set_voice_pan(voice_idx: int, pan: float): void;
  /**
   * Sets the rate of a given `voice_idx`'s low-frequency oscillator in Hz. Value can range from 0.1 to 20.
   */
  set_voice_rate_hz(voice_idx: int, rate_hz: float): void;
}
