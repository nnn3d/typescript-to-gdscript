// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Wrapper to use a PacketPeer over a StreamPeer. */
declare class PacketPeerStream extends PacketPeer {
  input_buffer_max_size: int;
  output_buffer_max_size: int;
  /** The wrapped {@link StreamPeer} object. */
  stream_peer: StreamPeer | null;
  set_input_buffer_max_size(value: int): void;
  get_input_buffer_max_size(): int;
  set_output_buffer_max_size(value: int): void;
  get_output_buffer_max_size(): int;
  set_stream_peer(value: StreamPeer | null): void;
  get_stream_peer(): StreamPeer | null;
}
