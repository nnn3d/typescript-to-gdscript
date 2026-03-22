// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** Provides methods for generating pseudo-random numbers. */
declare class RandomNumberGenerator extends RefCounted {
  /**
   * Initializes the random number generator state based on the given seed value. A given seed will give a reproducible sequence of pseudo-random numbers.
   * **Note:** The RNG does not have an avalanche effect, and can output similar random streams given similar seeds. Consider using a hash function to improve your seed quality if they're sourced externally.
   * **Note:** Setting this property produces a side effect of changing the internal {@link state}, so make sure to initialize the seed *before* modifying the {@link state}:
   * **Note:** The default value of this property is pseudo-random, and changes when calling {@link randomize}. The `0` value documented here is a placeholder, and not the actual default seed.
   */
  seed: int;
  /**
   * The current state of the random number generator. Save and restore this property to restore the generator to a previous state:
   * **Note:** Do not set state to arbitrary values, since the random number generator requires the state to have certain qualities to behave properly. It should only be set to values that came from the state property itself. To initialize the random number generator with arbitrary input, use {@link seed} instead.
   * **Note:** The default value of this property is pseudo-random, and changes when calling {@link randomize}. The `0` value documented here is a placeholder, and not the actual default state.
   */
  state: int;
  set_seed(value: int): void;
  get_seed(): int;
  set_state(value: int): void;
  get_state(): int;

  /**
   * Returns a random index with non-uniform weights. Prints an error and returns `-1` if the array is empty.
   */
  rand_weighted(weights: PackedFloat32Array): int;
  /** Returns a pseudo-random float between `0.0` and `1.0` (inclusive). */
  randf(): float;
  /** Returns a pseudo-random float between `from` and `to` (inclusive). */
  randf_range(from_: float, to: float): float;
  /**
   * Returns a normally-distributed (https://en.wikipedia.org/wiki/Normal_distribution), pseudo-random floating-point number from the specified `mean` and a standard `deviation`. This is also known as a Gaussian distribution.
   * **Note:** This method uses the Box-Muller transform (https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform) algorithm.
   */
  randfn(mean?: float, deviation?: float): float;
  /** Returns a pseudo-random 32-bit unsigned integer between `0` and `4294967295` (inclusive). */
  randi(): int;
  /** Returns a pseudo-random 32-bit signed integer between `from` and `to` (inclusive). */
  randi_range(from_: int, to: int): int;
  /**
   * Sets up a time-based seed for this {@link RandomNumberGenerator} instance. Unlike the [@GlobalScope] random number generation functions, different {@link RandomNumberGenerator} instances can use different seeds.
   */
  randomize(): void;
}
