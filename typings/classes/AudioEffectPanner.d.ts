// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/**
 * Adds a panner audio effect to an audio bus.
 * Pans the sound left or right.
 */
declare class AudioEffectPanner extends AudioEffect {
  /**
   * Pan position. Negative values pan the sound to the left, positive pan to the right. Value can range from -1 to 1.
   */
  pan: float;
  set_pan(value: float): void;
  get_pan(): float;
}
