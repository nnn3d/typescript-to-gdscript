/**
 * Override: GodotSignal — typed connect, disconnect, emit for bare Signal variables.
 * For Signal<[...]> properties on classes, gd-helpers.d.ts already provides typed versions.
 */
declare class GodotSignal {
  /** Connects this signal to the specified callable. */
  connect(callable: (...args: any[]) => void, flags?: int): int;
  /** Disconnects this signal from the specified callable. */
  disconnect(callable: (...args: any[]) => void): void;
  /** Emits this signal with the provided arguments. */
  emit(...args: any[]): void;
  /** Returns `true` if the specified callable is connected to this signal. */
  is_connected(callable: (...args: any[]) => void): boolean;
}
