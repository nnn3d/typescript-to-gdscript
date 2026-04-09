// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** Provides access to advanced cryptographic functionalities. */
declare class Crypto extends RefCounted {
  /**
   * Compares two {@link PackedByteArray}s for equality without leaking timing information in order to prevent timing attacks.
   * See this blog post (https://paragonie.com/blog/2015/11/preventing-timing-attacks-on-string-comparison-with-double-hmac-strategy) for more information.
   */
  constant_time_compare(trusted: PackedByteArray | Array<unknown>, received: PackedByteArray | Array<unknown>): boolean;
  /**
   * Decrypt the given `ciphertext` with the provided private `key`.
   * **Note:** The maximum size of accepted ciphertext is limited by the key size.
   */
  decrypt(key: CryptoKey, ciphertext: PackedByteArray | Array<unknown>): PackedByteArray;
  /**
   * Encrypt the given `plaintext` with the provided public `key`.
   * **Note:** The maximum size of accepted plaintext is limited by the key size.
   */
  encrypt(key: CryptoKey, plaintext: PackedByteArray | Array<unknown>): PackedByteArray;
  /** Generates a {@link PackedByteArray} of cryptographically secure random bytes with given `size`. */
  generate_random_bytes(size: int): PackedByteArray;
  /**
   * Generates an RSA {@link CryptoKey} that can be used for creating self-signed certificates and passed to {@link StreamPeerTLS.accept_stream}.
   */
  generate_rsa(size: int): CryptoKey;
  /**
   * Generates a self-signed {@link X509Certificate} from the given {@link CryptoKey} and `issuer_name`. The certificate validity will be defined by `not_before` and `not_after` (first valid date and last valid date). The `issuer_name` must contain at least "CN=" (common name, i.e. the domain name), "O=" (organization, i.e. your company name), "C=" (country, i.e. 2 lettered ISO-3166 code of the country the organization is based in).
   * A small example to generate an RSA key and an X509 self-signed certificate.
   */
  generate_self_signed_certificate(key: CryptoKey, issuer_name?: string | NodePath, not_before?: string | NodePath, not_after?: string | NodePath): X509Certificate;
  /**
   * Generates an HMAC (https://en.wikipedia.org/wiki/HMAC) digest of `msg` using `key`. The `hash_type` parameter is the hashing algorithm that is used for the inner and outer hashes.
   * Currently, only {@link HashingContext.HASH_SHA256} and {@link HashingContext.HASH_SHA1} are supported.
   */
  hmac_digest(hash_type: int, key: PackedByteArray | Array<unknown>, msg: PackedByteArray | Array<unknown>): PackedByteArray;
  /** Sign a given `hash` of type `hash_type` with the provided private `key`. */
  sign(hash_type: int, hash: PackedByteArray | Array<unknown>, key: CryptoKey): PackedByteArray;
  /** Verify that a given `signature` for `hash` of type `hash_type` against the provided public `key`. */
  verify(hash_type: int, hash: PackedByteArray | Array<unknown>, signature: PackedByteArray | Array<unknown>, key: CryptoKey): boolean;
}
