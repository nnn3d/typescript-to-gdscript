// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Represents a MIDI message from a MIDI device, such as a musical keyboard. */
declare class InputEventMIDI extends InputEvent {
  /**
   * The MIDI channel of this message, ranging from `0` to `15`. MIDI channel `9` is reserved for percussion instruments.
   */
  channel: int;
  /**
   * The unique number of the controller, if {@link message} is {@link MIDI_MESSAGE_CONTROL_CHANGE}, otherwise this is `0`. This value can be used to identify sliders for volume, balance, and panning, as well as switches and pedals on the MIDI device. See the General MIDI specification (https://en.wikipedia.org/wiki/General_MIDI#Controller_events) for a small list.
   */
  controller_number: int;
  /**
   * The value applied to the controller. If {@link message} is {@link MIDI_MESSAGE_CONTROL_CHANGE}, this value ranges from `0` to `127`, otherwise it is `0`. See also {@link controller_value}.
   */
  controller_value: int;
  /**
   * The instrument (also called *program* or *preset*) used on this MIDI message. This value ranges from `0` to `127`.
   * To see what each value means, refer to the General MIDI's instrument list (https://en.wikipedia.org/wiki/General_MIDI#Program_change_events). Keep in mind that the list is off by 1 because it does not begin from 0. A value of `0` corresponds to the acoustic grand piano.
   */
  instrument: int;
  /**
   * Represents the type of MIDI message (see the {@link MIDIMessage} enum).
   * For more information, see the MIDI message status byte list chart (https://www.midi.org/specifications-old/item/table-2-expanded-messages-list-status-bytes).
   */
  message: int;
  /**
   * The pitch index number of this MIDI message. This value ranges from `0` to `127`.
   * On a piano, the **middle C** is `60`, followed by a **C-sharp** (`61`), then a **D** (`62`), and so on. Each octave is split in offsets of 12. See the "MIDI note number" column of the piano key frequency chart (https://en.wikipedia.org/wiki/Piano_key_frequencies) a full list.
   */
  pitch: int;
  /**
   * The strength of the key being pressed. This value ranges from `0` to `127`.
   * **Note:** For many devices, this value is always `0`. Other devices such as musical keyboards may simulate pressure by changing the {@link velocity}, instead.
   */
  pressure: int;
  /**
   * The velocity of the MIDI message. This value ranges from `0` to `127`. For a musical keyboard, this corresponds to how quickly the key was pressed, and is rarely above `110` in practice.
   * **Note:** Some MIDI devices may send a {@link MIDI_MESSAGE_NOTE_ON} message with `0` velocity and expect it to be treated the same as a {@link MIDI_MESSAGE_NOTE_OFF} message. If necessary, this can be handled with a few lines of code:
   */
  velocity: int;
  set_channel(value: int): void;
  get_channel(): int;
  set_controller_number(value: int): void;
  get_controller_number(): int;
  set_controller_value(value: int): void;
  get_controller_value(): int;
  set_instrument(value: int): void;
  get_instrument(): int;
  set_message(value: int): void;
  get_message(): int;
  set_pitch(value: int): void;
  get_pitch(): int;
  set_pressure(value: int): void;
  get_pressure(): int;
  set_velocity(value: int): void;
  get_velocity(): int;
}
