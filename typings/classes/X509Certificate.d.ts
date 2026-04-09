// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** An X509 certificate (e.g. for TLS). */
declare class X509Certificate extends Resource {
  /** Loads a certificate from `path` ("*.crt" file). */
  load(path: string | NodePath): int;
  /** Loads a certificate from the given `string`. */
  load_from_string(string: string | NodePath): int;
  /** Saves a certificate to the given `path` (should be a "*.crt" file). */
  save(path: string | NodePath): int;
  /**
   * Returns a string representation of the certificate, or an empty string if the certificate is invalid.
   */
  save_to_string(): string;
}
