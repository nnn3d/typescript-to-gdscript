// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Audio effect that can be used for real-time audio visualizations. */
declare class AudioEffectSpectrumAnalyzer extends AudioEffect {
  /**
   * The length of the buffer to keep (in seconds). Higher values keep data around for longer, but require more memory.
   */
  buffer_length: float;
  /**
   * The size of the Fast Fourier transform (https://en.wikipedia.org/wiki/Fast_Fourier_transform) buffer. Higher values smooth out the spectrum analysis over time, but have greater latency. The effects of this higher latency are especially noticeable with sudden amplitude changes.
   */
  fft_size: int;
  tap_back_pos: float;
  set_buffer_length(value: float): void;
  get_buffer_length(): float;
  set_fft_size(value: int): void;
  get_fft_size(): int;
  set_tap_back_pos(value: float): void;
  get_tap_back_pos(): float;

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
