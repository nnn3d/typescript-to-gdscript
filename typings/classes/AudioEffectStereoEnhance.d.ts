// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** An audio effect that can be used to adjust the intensity of stereo panning. */
declare class AudioEffectStereoEnhance extends AudioEffect {
  /**
   * Amplifies the difference between stereo channels, increasing or decreasing existing panning. A value of 0.0 will downmix stereo to mono. Does not affect a mono signal.
   */
  pan_pullout: float;
  /**
   * Widens sound stage through phase shifting in conjunction with {@link time_pullout_ms}. Just pans sound to the left channel if {@link time_pullout_ms} is 0.
   */
  surround: float;
  /**
   * Widens sound stage through phase shifting in conjunction with {@link surround}. Just delays the right channel if {@link surround} is 0.
   */
  time_pullout_ms: float;
  set_pan_pullout(value: float): void;
  get_pan_pullout(): float;
  set_surround(value: float): void;
  get_surround(): float;
  set_time_pullout(value: float): void;
  get_time_pullout(): float;
}
