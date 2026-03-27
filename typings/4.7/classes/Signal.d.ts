// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/_overrides/*.d.ts

/** A built-in type representing a signal of an {@link Object}. */
declare class GodotSignal {
  /**
   * Connects this signal to the specified `callable`. Optional `flags` can be also added to configure the connection's behavior (see {@link Object.ConnectFlags} constants). You can provide additional arguments to the connected `callable` by using {@link Callable.bind}.
   * A signal can only be connected once to the same {@link Callable}. If the signal is already connected, this method returns {@link ERR_INVALID_PARAMETER} and generates an error, unless the signal is connected with {@link Object.CONNECT_REFERENCE_COUNTED}. To prevent this, use {@link is_connected} first to check for existing connections.
   * **Note:** If the `callable`'s object is freed, the connection will be lost.
   */
  connect(callable: (...args: any[]) => void, flags?: int): int;
  /**
   * Disconnects this signal from the specified {@link Callable}. If the connection does not exist, generates an error. Use {@link is_connected} to make sure that the connection exists.
   */
  disconnect(callable: (...args: any[]) => void): void;
  /**
   * Emits this signal. All {@link Callable}s connected to this signal will be triggered. This method supports a variable number of arguments, so parameters can be passed as a comma separated list.
   */
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
  /** Returns `true` if the specified {@link Callable} is connected to this signal. */
  is_connected(callable: (...args: any[]) => void): boolean;
  /**
   * Returns `true` if this {@link Signal} has no object and the signal name is empty. Equivalent to `signal == Signal()`.
   */
  is_null(): boolean;

  // Operator overloads
  [__ne]: { right: GodotSignal; ret: boolean };
  [__eq]: { right: GodotSignal; ret: boolean };
}
