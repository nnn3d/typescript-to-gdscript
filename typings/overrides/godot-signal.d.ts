/**
 * Override: GodotSignal — typed connect, disconnect, emit for bare Signal variables.
 * For Signal<[...]> properties on classes, gd-helpers.d.ts already provides typed versions.
 */
declare class GodotSignal {
  connect(callable: (...args: any[]) => void, flags?: int): int;
  disconnect(callable: (...args: any[]) => void): void;
  emit(...args: any[]): void;
  is_connected(callable: (...args: any[]) => void): boolean;
}
