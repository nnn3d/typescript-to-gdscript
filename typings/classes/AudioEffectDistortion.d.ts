// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a distortion audio effect to an Audio bus.
 * Modifies the sound to make it distorted.
 */
declare class AudioEffectDistortion extends AudioEffect {
  /** Distortion power. Value can range from 0 to 1. */
  drive: float;
  /**
   * High-pass filter, in Hz. Frequencies higher than this value will not be affected by the distortion. Value can range from 1 to 20000.
   */
  keep_hf_hz: float;
  /** Distortion type. */
  mode: int;
  /** Increases or decreases the volume after the effect, in decibels. Value can range from -80 to 24. */
  post_gain: float;
  /** Increases or decreases the volume before the effect, in decibels. Value can range from -60 to 60. */
  pre_gain: float;
  set_drive(value: float): void;
  get_drive(): float;
  set_keep_hf_hz(value: float): void;
  get_keep_hf_hz(): float;
  set_mode(value: int): void;
  get_mode(): int;
  set_post_gain(value: float): void;
  get_post_gain(): float;
  set_pre_gain(value: float): void;
  get_pre_gain(): float;

  // enum Mode
  /** Digital distortion effect which cuts off peaks at the top and bottom of the waveform. */
  static readonly MODE_CLIP: int;
  static readonly MODE_ATAN: int;
  /**
   * Low-resolution digital distortion effect (bit depth reduction). You can use it to emulate the sound of early digital audio devices.
   */
  static readonly MODE_LOFI: int;
  /**
   * Emulates the warm distortion produced by a field effect transistor, which is commonly used in solid-state musical instrument amplifiers. The {@link drive} property has no effect in this mode.
   */
  static readonly MODE_OVERDRIVE: int;
  /** Waveshaper distortions are used mainly by electronic musicians to achieve an extra-abrasive sound. */
  static readonly MODE_WAVESHAPE: int;
}
