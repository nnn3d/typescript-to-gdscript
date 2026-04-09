// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Stores audio data loaded from WAV files. */
declare class AudioStreamWAV extends AudioStream {
  /**
   * Contains the audio data in bytes.
   * **Note:** If {@link format} is set to {@link FORMAT_8_BITS}, this property expects signed 8-bit PCM data. To convert from unsigned 8-bit PCM, subtract 128 from each byte.
   * **Note:** If {@link format} is set to {@link FORMAT_QOA}, this property expects data from a full QOA file.
   */
  data: PackedByteArray;
  /** Audio format. */
  format: int;
  /** The loop start point (in number of samples, relative to the beginning of the stream). */
  loop_begin: int;
  /** The loop end point (in number of samples, relative to the beginning of the stream). */
  loop_end: int;
  /** The loop mode. */
  loop_mode: int;
  /**
   * The sample rate for mixing this audio. Higher values require more storage space, but result in better quality.
   * In games, common sample rates in use are `11025`, `16000`, `22050`, `32000`, `44100`, and `48000`.
   * According to the Nyquist-Shannon sampling theorem (https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem), there is no quality difference to human hearing when going past 40,000 Hz (since most humans can only hear up to ~20,000 Hz, often less). If you are using lower-pitched sounds such as voices, lower sample rates such as `32000` or `22050` may be usable with no loss in quality.
   */
  mix_rate: int;
  /** If `true`, audio is stereo. */
  stereo: boolean;
  /**
   * Contains user-defined tags if found in the WAV data.
   * Commonly used tags include `title`, `artist`, `album`, `tracknumber`, and `date` (`date` does not have a standard date format).
   * **Note:** No tag is *guaranteed* to be present in every file, so make sure to account for the keys not always existing.
   * **Note:** Only WAV files using a `LIST` chunk with an identifier of `INFO` to encode the tags are currently supported.
   */
  tags: Dictionary;
  set_data(value: PackedByteArray | Array<unknown>): void;
  get_data(): PackedByteArray;
  set_format(value: int): void;
  get_format(): int;
  set_loop_begin(value: int): void;
  get_loop_begin(): int;
  set_loop_end(value: int): void;
  get_loop_end(): int;
  set_loop_mode(value: int): void;
  get_loop_mode(): int;
  set_mix_rate(value: int): void;
  get_mix_rate(): int;
  set_stereo(value: boolean): void;
  is_stereo(): boolean;
  set_tags(value: Dictionary): void;
  get_tags(): Dictionary;

  /**
   * Creates a new {@link AudioStreamWAV} instance from the given buffer. The buffer must contain WAV data.
   * The keys and values of `options` match the properties of {@link ResourceImporterWAV}. The usage of `options` is identical to {@link AudioStreamWAV.load_from_file}.
   */
  static load_from_buffer(stream_data: PackedByteArray | Array<unknown>, options?: Dictionary): AudioStreamWAV | null;
  /**
   * Creates a new {@link AudioStreamWAV} instance from the given file path. The file must be in WAV format.
   * The keys and values of `options` match the properties of {@link ResourceImporterWAV}.
   * **Example:** Load the first file dropped as a WAV and play it:
   */
  static load_from_file(path: string, options?: Dictionary): AudioStreamWAV | null;
  /**
   * Saves the AudioStreamWAV as a WAV file to `path`. Samples with IMA ADPCM or Quite OK Audio formats can't be saved.
   * **Note:** A `.wav` extension is automatically appended to `path` if it is missing.
   */
  save_to_wav(path: string): int;

  // enum Format
  /** 8-bit PCM audio codec. */
  static readonly FORMAT_8_BITS: int;
  /** 16-bit PCM audio codec. */
  static readonly FORMAT_16_BITS: int;
  /** Audio is lossily compressed as IMA ADPCM. */
  static readonly FORMAT_IMA_ADPCM: int;
  /** Audio is lossily compressed as Quite OK Audio (https://qoaformat.org/). */
  static readonly FORMAT_QOA: int;
  // enum LoopMode
  /** Audio does not loop. */
  static readonly LOOP_DISABLED: int;
  /** Audio loops the data between {@link loop_begin} and {@link loop_end}, playing forward only. */
  static readonly LOOP_FORWARD: int;
  /** Audio loops the data between {@link loop_begin} and {@link loop_end}, playing back and forth. */
  static readonly LOOP_PINGPONG: int;
  /** Audio loops the data between {@link loop_begin} and {@link loop_end}, playing backward only. */
  static readonly LOOP_BACKWARD: int;
}
