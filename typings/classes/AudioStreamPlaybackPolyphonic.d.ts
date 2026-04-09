// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Playback instance for {@link AudioStreamPolyphonic}. */
declare class AudioStreamPlaybackPolyphonic extends AudioStreamPlayback {
  /**
   * Returns `true` if the stream associated with the given integer ID is still playing. Check {@link play_stream} for information on when this ID becomes invalid.
   */
  is_stream_playing(stream: int): boolean;
  /**
   * Play an {@link AudioStream} at a given offset, volume, pitch scale, playback type, and bus. Playback starts immediately.
   * The return value is a unique integer ID that is associated to this playback stream and which can be used to control it.
   * This ID becomes invalid when the stream ends (if it does not loop), when the {@link AudioStreamPlaybackPolyphonic} is stopped, or when {@link stop_stream} is called.
   * This function returns {@link INVALID_ID} if the amount of streams currently playing equals {@link AudioStreamPolyphonic.polyphony}. If you need a higher amount of maximum polyphony, raise this value.
   */
  play_stream(stream: AudioStream, from_offset?: float, volume_db?: float, pitch_scale?: float, playback_type?: int, bus?: string): int;
  /**
   * Change the stream pitch scale. The `stream` argument is an integer ID returned by {@link play_stream}.
   */
  set_stream_pitch_scale(stream: int, pitch_scale: float): void;
  /**
   * Change the stream volume (in db). The `stream` argument is an integer ID returned by {@link play_stream}.
   */
  set_stream_volume(stream: int, volume_db: float): void;
  /**
   * Stop a stream. The `stream` argument is an integer ID returned by {@link play_stream}, which becomes invalid after calling this function.
   */
  stop_stream(stream: int): void;

  /** Returned by {@link play_stream} in case it could not allocate a stream for playback. */
  static readonly INVALID_ID: int;
}
