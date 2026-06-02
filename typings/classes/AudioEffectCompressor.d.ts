// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a compressor audio effect to an audio bus.
 * Reduces sounds that exceed a certain threshold level, smooths out the dynamics and increases the overall volume.
 */
declare class AudioEffectCompressor extends AudioEffect {
  /**
   * Compressor's reaction time when the signal exceeds the threshold, in microseconds. Value can range from 20 to 2000.
   */
  attack_us: float;
  /** Gain applied to the output signal. */
  gain: float;
  /**
   * Balance between original signal and effect signal. Value can range from 0 (totally dry) to 1 (totally wet).
   */
  mix: float;
  /**
   * Amount of compression applied to the audio once it passes the threshold level. The higher the ratio, the more the loud parts of the audio will be compressed. Value can range from 1 to 48.
   */
  ratio: float;
  /**
   * Compressor's delay time to stop reducing the signal after the signal level falls below the threshold, in milliseconds. Value can range from 20 to 2000.
   */
  release_ms: float;
  /** Reduce the sound level using another audio bus for threshold detection. */
  sidechain: string;
  /** The level above which compression is applied to the audio. Value can range from -60 to 0. */
  threshold: float;
  set_attack_us(value: float): void;
  get_attack_us(): float;
  set_gain(value: float): void;
  get_gain(): float;
  set_mix(value: float): void;
  get_mix(): float;
  set_ratio(value: float): void;
  get_ratio(): float;
  set_release_ms(value: float): void;
  get_release_ms(): float;
  set_sidechain(value: string): void;
  get_sidechain(): string;
  set_threshold(value: float): void;
  get_threshold(): float;
}
