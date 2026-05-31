/**
 * Override: GodotSignal — typed connect, disconnect, emit for bare Signal variables.
 * For Signal<[...]> properties on classes, gd-helpers.d.ts already provides typed versions.
 */
declare class Signal<T extends any[] = any[]> {
  emit(...args: T): void;
  connect(callable: (...args: T) => void): void;
  disconnect(callable: (...args: T) => void): void;
  is_connected(callable: (...args: T) => void): boolean;
}
