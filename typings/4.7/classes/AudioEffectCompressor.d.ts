// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/**
 * Adds a downward compressor audio effect to an audio bus.
 * Allows control of the dynamic range via a volume threshold and timing controls.
 */
declare class AudioEffectCompressor extends AudioEffect {
  /**
   * Compressor's reaction time when the audio exceeds the volume threshold level, in microseconds. Value can range from 20 to 2000.
   */
  attack_us: float;
  /** Gain of the audio signal, in dB. Value can range from -20 to 20. */
  gain: float;
  /**
   * Balance between the original audio and the compressed audio. Value can range from 0 (totally dry) to 1 (totally wet).
   */
  mix: float;
  /**
   * Amount of compression applied to the audio once it passes the volume threshold level. The higher the ratio, the stronger the compression applied to audio signals that pass the volume threshold level. Value can range from 1 to 48.
   */
  ratio: float;
  /**
   * Compressor's delay time to stop decreasing the volume after the it falls below the volume threshold level, in milliseconds. Value can range from 20 to 2000.
   */
  release_ms: float;
  /** Audio bus to use for the volume threshold detection. */
  sidechain: string;
  /**
   * The volume level above which compression is applied to the audio, in dB. Value can range from -60 to 0.
   */
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
