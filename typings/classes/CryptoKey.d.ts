// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A cryptographic key (RSA or elliptic-curve). */
declare class CryptoKey extends Resource {
  /** Returns `true` if this CryptoKey only has the public part, and not the private one. */
  is_public_only(): boolean;
  /**
   * Loads a key from `path`. If `public_only` is `true`, only the public key will be loaded.
   * **Note:** `path` should be a "*.pub" file if `public_only` is `true`, a "*.key" file otherwise.
   */
  load(path: string | NodePath, public_only?: boolean): int;
  /**
   * Loads a key from the given `string_key`. If `public_only` is `true`, only the public key will be loaded.
   */
  load_from_string(string_key: string | NodePath, public_only?: boolean): int;
  /**
   * Saves a key to the given `path`. If `public_only` is `true`, only the public key will be saved.
   * **Note:** `path` should be a "*.pub" file if `public_only` is `true`, a "*.key" file otherwise.
   */
  save(path: string | NodePath, public_only?: boolean): int;
  /**
   * Returns a string containing the key in PEM format. If `public_only` is `true`, only the public key will be included.
   */
  save_to_string(public_only?: boolean): string;
}
