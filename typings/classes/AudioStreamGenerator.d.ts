// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An audio stream with utilities for procedural sound generation. */
declare class AudioStreamGenerator extends AudioStream {
  /**
   * The length of the buffer to generate (in seconds). Lower values result in less latency, but require the script to generate audio data faster, resulting in increased CPU usage and more risk for audio cracking if the CPU can't keep up.
   */
  buffer_length: float;
  /**
   * The sample rate to use (in Hz). Higher values are more demanding for the CPU to generate, but result in better quality.
   * In games, common sample rates in use are `11025`, `16000`, `22050`, `32000`, `44100`, and `48000`.
   * According to the Nyquist-Shannon sampling theorem (https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem), there is no quality difference to human hearing when going past 40,000 Hz (since most humans can only hear up to ~20,000 Hz, often less). If you are generating lower-pitched sounds such as voices, lower sample rates such as `32000` or `22050` may be usable with no loss in quality.
   * **Note:** {@link AudioStreamGenerator} is not automatically resampling input data, to produce expected result {@link mix_rate_mode} should match the sampling rate of input data.
   * **Note:** If you are using {@link AudioEffectCapture} as the source of your data, set {@link mix_rate_mode} to {@link MIX_RATE_INPUT} or {@link MIX_RATE_OUTPUT} to automatically match current {@link AudioServer} mixing rate.
   */
  mix_rate: float;
  /**
   * Mixing rate mode. If set to {@link MIX_RATE_CUSTOM}, {@link mix_rate} is used, otherwise current {@link AudioServer} mixing rate is used.
   */
  mix_rate_mode: int;
  set_buffer_length(value: float): void;
  get_buffer_length(): float;
  set_mix_rate(value: float): void;
  get_mix_rate(): float;
  set_mix_rate_mode(value: int): void;
  get_mix_rate_mode(): int;

  // enum AudioStreamGeneratorMixRate
  /** Current {@link AudioServer} output mixing rate. */
  static readonly MIX_RATE_OUTPUT: int;
  /** Current {@link AudioServer} input mixing rate. */
  static readonly MIX_RATE_INPUT: int;
  /** Custom mixing rate, specified by {@link mix_rate}. */
  static readonly MIX_RATE_CUSTOM: int;
  /** Maximum value for the mixing rate mode enum. */
  static readonly MIX_RATE_MAX: int;
}
