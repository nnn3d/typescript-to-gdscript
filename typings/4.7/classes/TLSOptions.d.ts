// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** TLS configuration for clients and servers. */
declare class TLSOptions extends RefCounted {
  /**
   * Creates a TLS client configuration which validates certificates and their common names (fully qualified domain names).
   * You can specify a custom `trusted_chain` of certification authorities (the default CA list will be used if `null`), and optionally provide a `common_name_override` if you expect the certificate to have a common name other than the server FQDN.
   * **Note:** On the Web platform, TLS verification is always enforced against the CA list of the web browser. This is considered a security feature.
   */
  static client(trusted_chain?: X509Certificate, common_name_override?: string): TLSOptions;
  /**
   * Creates an **unsafe** TLS client configuration where certificate validation is optional. You can optionally provide a valid `trusted_chain`, but the common name of the certificates will never be checked. Using this configuration for purposes other than testing **is not recommended**.
   * **Note:** On the Web platform, TLS verification is always enforced against the CA list of the web browser. This is considered a security feature.
   */
  static client_unsafe(trusted_chain?: X509Certificate): TLSOptions;
  /**
   * Returns the common name (domain name) override specified when creating with {@link TLSOptions.client}.
   */
  get_common_name_override(): string;
  /** Returns the {@link X509Certificate} specified when creating with {@link TLSOptions.server}. */
  get_own_certificate(): X509Certificate;
  /** Returns the {@link CryptoKey} specified when creating with {@link TLSOptions.server}. */
  get_private_key(): CryptoKey;
  /**
   * Returns the CA {@link X509Certificate} chain specified when creating with {@link TLSOptions.client} or {@link TLSOptions.client_unsafe}.
   */
  get_trusted_ca_chain(): X509Certificate;
  /** Returns `true` if created with {@link TLSOptions.server}, `false` otherwise. */
  is_server(): boolean;
  /** Returns `true` if created with {@link TLSOptions.client_unsafe}, `false` otherwise. */
  is_unsafe_client(): boolean;
  /**
   * Creates a TLS server configuration using the provided `key` and `certificate`.
   * **Note:** The `certificate` should include the full certificate chain up to the signing CA (certificates file can be concatenated using a general purpose text editor).
   */
  static server(key: CryptoKey, certificate: X509Certificate): TLSOptions;
}
