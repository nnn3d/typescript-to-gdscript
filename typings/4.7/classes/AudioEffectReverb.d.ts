// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/**
 * Adds a reverberation audio effect to an audio bus.
 * Emulates an echo by playing a blurred version of the input audio.
 */
declare class AudioEffectReverb extends AudioEffect {
  /**
   * Defines how reflective the imaginary room's walls are. The more reflective, the more high frequency content the reverb has. Value can range from 0 to 1.
   */
  damping: float;
  /**
   * The volume ratio of the original audio. At 0, only the modified audio is outputted. Value can range from 0 to 1.
   */
  dry: float;
  /**
   * High-pass filter allows frequencies higher than a certain cutoff threshold and attenuates frequencies lower than the cutoff threshold. Value can range from 0 to 1.
   */
  hipass: float;
  /**
   * Gain of early reflection copies. At higher values, early reflection copies are louder and ring out for longer. Value can range from 0 to 1.
   */
  predelay_feedback: float;
  /**
   * Time between the original audio and the early reflections of the reverb signal, in milliseconds. Value can range from 20 to 500.
   */
  predelay_msec: float;
  /** Dimensions of simulated room. Bigger means more echoes. Value can range from 0 to 1. */
  room_size: float;
  /**
   * Widens or narrows the stereo image of the reverb tail. At 1, it fully widens. Value can range from 0 to 1.
   */
  spread: float;
  /**
   * The volume ratio of the modified audio. At 0, only the original audio is outputted. Value can range from 0 to 1.
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
