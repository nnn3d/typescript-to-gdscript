// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a pitch-shifting audio effect to an audio bus.
 * Raises or lowers the pitch of original sound.
 */
declare class AudioEffectPitchShift extends AudioEffect {
  /**
   * The size of the Fast Fourier transform (https://en.wikipedia.org/wiki/Fast_Fourier_transform) buffer. Higher values smooth out the effect over time, but have greater latency. The effects of this higher latency are especially noticeable on sounds that have sudden amplitude changes.
   */
  fft_size: int;
  /**
   * The oversampling factor to use. Higher values result in better quality, but are more demanding on the CPU and may cause audio cracking if the CPU can't keep up.
   */
  oversampling: int;
  /**
   * The pitch scale to use. `1.0` is the default pitch and plays sounds unaffected. {@link pitch_scale} can range from `0.0` (infinitely low pitch, inaudible) to `16` (16 times higher than the initial pitch).
   */
  pitch_scale: float;
  set_fft_size(value: int): void;
  get_fft_size(): int;
  set_oversampling(value: int): void;
  get_oversampling(): int;
  set_pitch_scale(value: float): void;
  get_pitch_scale(): float;

  // enum FFTSize
  /**
   * Use a buffer of 256 samples for the Fast Fourier transform. Lowest latency, but least stable over time.
   */
  static readonly FFT_SIZE_256: int;
  /** Use a buffer of 512 samples for the Fast Fourier transform. Low latency, but less stable over time. */
  static readonly FFT_SIZE_512: int;
  /**
   * Use a buffer of 1024 samples for the Fast Fourier transform. This is a compromise between latency and stability over time.
   */
  static readonly FFT_SIZE_1024: int;
  /** Use a buffer of 2048 samples for the Fast Fourier transform. High latency, but stable over time. */
  static readonly FFT_SIZE_2048: int;
  /**
   * Use a buffer of 4096 samples for the Fast Fourier transform. Highest latency, but most stable over time.
   */
  static readonly FFT_SIZE_4096: int;
  /** Represents the size of the {@link FFTSize} enum. */
  static readonly FFT_SIZE_MAX: int;
}
