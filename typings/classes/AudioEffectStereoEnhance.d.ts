// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * Adds a stereo manipulation audio effect to an audio bus.
 * Controls gain of the side channels, and widens the stereo image.
 */
declare class AudioEffectStereoEnhance extends AudioEffect {
  /**
   * Gain of the side channels, if they exist. A value of 0 will downmix stereo to mono. Value can range from 0 to 4.
   */
  pan_pullout: float;
  /**
   * Widens the stereo image through phase shifting in conjunction with {@link time_pullout_ms}. Just pans sound to the left channel if {@link time_pullout_ms} is 0. Value can range from 0 to 1.
   */
  surround: float;
  /**
   * Widens the stereo image through phase shifting in conjunction with {@link surround}. Just delays the right channel if {@link surround} is 0. Value is in milliseconds, and can range from 0 to 50.
   */
  time_pullout_ms: float;
  set_pan_pullout(value: float): void;
  get_pan_pullout(): float;
  set_surround(value: float): void;
  get_surround(): float;
  set_time_pullout(value: float): void;
  get_time_pullout(): float;
}
