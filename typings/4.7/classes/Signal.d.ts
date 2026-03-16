// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A built-in type representing a signal of an {@link Object}. */
declare class GodotSignal {
  /** Connects this signal to the specified callable. */
  connect(callable: (...args: any[]) => void, flags?: int): int;
  /** Disconnects this signal from the specified callable. */
  disconnect(callable: (...args: any[]) => void): void;
  /** Emits this signal with the provided arguments. */
  emit(...args: any[]): void;
  /**
   * Returns an {@link Array} of connections for this signal. Each connection is represented as a {@link Dictionary} that contains three entries:
   * - `signal` is a reference to this signal;
   * - `callable` is a reference to the connected {@link Callable};
   * - `flags` is a combination of {@link Object.ConnectFlags}.
   */
  get_connections(): Array<unknown>;
  /** Returns the name of this signal. */
  get_name(): string;
  /** Returns the object emitting this signal. */
  get_object(): GodotObject;
  /** Returns the ID of the object emitting this signal (see {@link Object.get_instance_id}). */
  get_object_id(): int;
  /** Returns `true` if any {@link Callable} is connected to this signal. */
  has_connections(): boolean;
  /** Returns `true` if the specified callable is connected to this signal. */
  is_connected(callable: (...args: any[]) => void): boolean;
  /**
   * Returns `true` if this {@link Signal} has no object and the signal name is empty. Equivalent to `signal == Signal()`.
   */
  is_null(): boolean;

  // Operator overloads
  [__ne]: { right: GodotSignal; ret: boolean };
  [__eq]: { right: GodotSignal; ret: boolean };
}
