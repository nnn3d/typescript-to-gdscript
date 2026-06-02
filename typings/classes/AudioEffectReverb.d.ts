// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a reverberation audio effect to an Audio bus. */
declare class AudioEffectReverb extends AudioEffect {
  /** Defines how reflective the imaginary room's walls are. Value can range from 0 to 1. */
  damping: float;
  /**
   * Output percent of original sound. At 0, only modified sound is outputted. Value can range from 0 to 1.
   */
  dry: float;
  /**
   * High-pass filter passes signals with a frequency higher than a certain cutoff frequency and attenuates signals with frequencies lower than the cutoff frequency. Value can range from 0 to 1.
   */
  hipass: float;
  /** Output percent of predelay. Value can range from 0 to 1. */
  predelay_feedback: float;
  /** Time between the original signal and the early reflections of the reverb signal, in milliseconds. */
  predelay_msec: float;
  /** Dimensions of simulated room. Bigger means more echoes. Value can range from 0 to 1. */
  room_size: float;
  /**
   * Widens or narrows the stereo image of the reverb tail. 1 means fully widens. Value can range from 0 to 1.
   */
  spread: float;
  /**
   * Output percent of modified sound. At 0, only original sound is outputted. Value can range from 0 to 1.
   */
  wet: float;
  set_damping(value: float): void;
  get_damping(): float;
  set_dry(value: float): void;
  get_dry(): float;
  set_hpf(value: float): void;
  get_hpf(): float;
  set_predelay_feedback(value: float): void;
  get_predelay_feedback(): float;
  set_predelay_msec(value: float): void;
  get_predelay_msec(): float;
  set_room_size(value: float): void;
  get_room_size(): float;
  set_spread(value: float): void;
  get_spread(): float;
  set_wet(value: float): void;
  get_wet(): float;
}
