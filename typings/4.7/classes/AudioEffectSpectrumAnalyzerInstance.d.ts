// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Queryable instance of an {@link AudioEffectSpectrumAnalyzer}. */
declare class AudioEffectSpectrumAnalyzerInstance extends AudioEffectInstance {
  /**
   * Returns the magnitude of the frequencies from `from_hz` to `to_hz` in linear energy as a Vector2. The `x` component of the return value represents the left stereo channel, and `y` represents the right channel.
   * `mode` determines how the frequency range will be processed.
   */
  get_magnitude_for_frequency_range(from_hz: float, to_hz: float, mode: int): Vector2;

  // enum MagnitudeMode
  /** Use the average value across the frequency range as magnitude. */
  static readonly MAGNITUDE_AVERAGE: int;
  /** Use the maximum value of the frequency range as magnitude. */
  static readonly MAGNITUDE_MAX: int;
}
