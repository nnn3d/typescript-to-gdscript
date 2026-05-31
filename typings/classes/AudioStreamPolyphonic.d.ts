// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/**
 * AudioStream that lets the user play custom streams at any time from code, simultaneously using a single player.
 */
declare class AudioStreamPolyphonic extends AudioStream {
  /** Maximum amount of simultaneous streams that can be played. */
  polyphony: int;
  set_polyphony(value: int): void;
  get_polyphony(): int;
}
