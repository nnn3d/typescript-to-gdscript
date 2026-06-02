// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Adds an amplifying audio effect to an audio bus. */
declare class AudioEffectAmplify extends AudioEffect {
  /**
   * Amount of amplification in decibels. Positive values make the sound louder, negative values make it quieter. Value can range from -80 to 24.
   */
  volume_db: float;
  /**
   * Amount of amplification as a linear value.
   * **Note:** This member modifies {@link volume_db} for convenience. The returned value is equivalent to the result of {@link @GlobalScope.db_to_linear} on {@link volume_db}. Setting this member is equivalent to setting {@link volume_db} to the result of {@link @GlobalScope.linear_to_db} on a value.
   */
  volume_linear: float;
  set_volume_db(value: float): void;
  get_volume_db(): float;
  set_volume_linear(value: float): void;
  get_volume_linear(): float;
}
