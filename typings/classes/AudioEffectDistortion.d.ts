// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a distortion audio effect to an audio bus.
 * Remaps audio samples using a nonlinear function to achieve a distorted sound.
 */
declare class AudioEffectDistortion extends AudioEffect {
  /**
   * Distortion intensity. Controls how much of the input audio is affected by the distortion curve by moving from a linear function to a nonlinear one. Value can range from 0 to 1.
   */
  drive: float;
  /**
   * High-pass filter, in Hz. Frequencies higher than this value will not be affected by the distortion. Value can range from 1 to 20000.
   */
  keep_hf_hz: float;
  /** Distortion type. Changes the nonlinear function used to distort the waveform. See {@link Mode}. */
  mode: int;
  /** Gain after the effect, in dB. Value can range from -80 to 24. */
  post_gain: float;
  /** Gain before the effect, in dB. Value can range from -60 to 60. */
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
  /**
   * Flattens the waveform at 0 dB in a sharp manner. {@link drive} increases amplitude of samples exponentially. This mode functions as a hard clipper if {@link drive} is set to 0, and is the only mode that clips audio signals at 0 dB.
   */
  static readonly MODE_CLIP: int;
  /**
   * Flattens the waveform in a smooth manner, following an arctangent curve. The audio decreases in volume, before flattening peaks to `PI * 4.0` (linear value), if it was normalized beforehand.
   */
  static readonly MODE_ATAN: int;
  /**
   * Decreases audio bit depth to achieve a low-resolution audio signal, going from 16-bit to 2-bit. Can be used to emulate the sound of early digital audio devices.
   */
  static readonly MODE_LOFI: int;
  /**
   * Emulates the warm distortion produced by a field effect transistor, which is commonly used in solid-state musical instrument amplifiers. {@link drive} has no effect in this mode.
   */
  static readonly MODE_OVERDRIVE: int;
  /**
   * Flattens the waveform in a smooth manner, until it reaches a sharp peak at `drive = 1`, following a generic absolute sigmoid function.
   */
  static readonly MODE_WAVESHAPE: int;
}
