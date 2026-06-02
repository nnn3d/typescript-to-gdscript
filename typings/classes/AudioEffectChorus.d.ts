// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds a chorus audio effect. */
declare class AudioEffectChorus extends AudioEffect {
  /** The effect's raw signal. */
  dry: float;
  /** The voice's cutoff frequency. */
  'voice/1/cutoff_hz': float;
  /** The voice's signal delay. */
  'voice/1/delay_ms': float;
  /** The voice filter's depth. */
  'voice/1/depth_ms': float;
  /** The voice's volume. */
  'voice/1/level_db': float;
  /** The voice's pan level. */
  'voice/1/pan': float;
  /** The voice's filter rate. */
  'voice/1/rate_hz': float;
  /** The voice's cutoff frequency. */
  'voice/2/cutoff_hz': float;
  /** The voice's signal delay. */
  'voice/2/delay_ms': float;
  /** The voice filter's depth. */
  'voice/2/depth_ms': float;
  /** The voice's volume. */
  'voice/2/level_db': float;
  /** The voice's pan level. */
  'voice/2/pan': float;
  /** The voice's filter rate. */
  'voice/2/rate_hz': float;
  /** The voice's cutoff frequency. */
  'voice/3/cutoff_hz': float;
  /** The voice's signal delay. */
  'voice/3/delay_ms': float;
  /** The voice filter's depth. */
  'voice/3/depth_ms': float;
  /** The voice's volume. */
  'voice/3/level_db': float;
  /** The voice's pan level. */
  'voice/3/pan': float;
  /** The voice's filter rate. */
  'voice/3/rate_hz': float;
  /** The voice's cutoff frequency. */
  'voice/4/cutoff_hz': float;
  /** The voice's signal delay. */
  'voice/4/delay_ms': float;
  /** The voice filter's depth. */
  'voice/4/depth_ms': float;
  /** The voice's volume. */
  'voice/4/level_db': float;
  /** The voice's pan level. */
  'voice/4/pan': float;
  /** The voice's filter rate. */
  'voice/4/rate_hz': float;
  /** The number of voices in the effect. */
  voice_count: int;
  /** The effect's processed signal. */
  wet: float;
  set_dry(value: float): void;
  get_dry(): float;
  set_voice_count(value: int): void;
  get_voice_count(): int;
  set_wet(value: float): void;
  get_wet(): float;

  get_voice_cutoff_hz(voice_idx: int): float;
  get_voice_delay_ms(voice_idx: int): float;
  get_voice_depth_ms(voice_idx: int): float;
  get_voice_level_db(voice_idx: int): float;
  get_voice_pan(voice_idx: int): float;
  get_voice_rate_hz(voice_idx: int): float;
  set_voice_cutoff_hz(voice_idx: int, cutoff_hz: float): void;
  set_voice_delay_ms(voice_idx: int, delay_ms: float): void;
  set_voice_depth_ms(voice_idx: int, depth_ms: float): void;
  set_voice_level_db(voice_idx: int, level_db: float): void;
  set_voice_pan(voice_idx: int, pan: float): void;
  set_voice_rate_hz(voice_idx: int, rate_hz: float): void;
}
