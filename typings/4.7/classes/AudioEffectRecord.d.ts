// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** Audio effect used for recording the sound from an audio bus. */
declare class AudioEffectRecord extends AudioEffect {
  /** Specifies the format in which the sample will be recorded. */
  format: int;
  set_format(value: int): void;
  get_format(): int;

  /** Returns the recorded sample. */
  get_recording(): AudioStreamWAV | null;
  /** Returns whether the recording is active or not. */
  is_recording_active(): boolean;
  /**
   * If `true`, the sound will be recorded. Note that restarting the recording will remove the previously recorded sample.
   */
  set_recording_active(record: boolean): void;
}
