// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from src/typings/overrides/*.d.ts

/** A node with the ability to send HTTP(S) requests. */
declare class HTTPRequest extends Node {
  /**
   * If `true`, this header will be added to each request: `Accept-Encoding: gzip, deflate` telling servers that it's okay to compress response bodies.
   * Any Response body declaring a `Content-Encoding` of either `gzip` or `deflate` will then be automatically decompressed, and the uncompressed bytes will be delivered via {@link request_completed}.
   * If the user has specified their own `Accept-Encoding` header, then no header will be added regardless of {@link accept_gzip}.
   * If `false` no header will be added, and no decompression will be performed on response bodies. The raw bytes of the response body will be returned via {@link request_completed}.
   */
  accept_gzip: boolean;
  /**
   * Maximum allowed size for response bodies. If the response body is compressed, this will be used as the maximum allowed size for the decompressed body.
   */
  body_size_limit: int;
  /**
   * The size of the buffer used and maximum bytes to read per iteration. See {@link HTTPClient.read_chunk_size}.
   * Set this to a lower value (e.g. 4096 for 4 KiB) when downloading small files to decrease memory usage at the cost of download speeds.
   */
  download_chunk_size: int;
  /** The file to download into. Will output any received file into it. */
  download_file: string;
  /** Maximum number of allowed redirects. */
  max_redirects: int;
  /**
   * The duration to wait before a request times out, in seconds (independent of {@link Engine.time_scale}). If {@link timeout} is set to `0.0`, the request will never time out.
   * For simple requests, such as communication with a REST API, it is recommended to set {@link timeout} to a value suitable for the server response time (commonly between `1.0` and `10.0`). This will help prevent unwanted timeouts caused by variation in response times while still allowing the application to detect when a request has timed out. For larger requests such as file downloads, it is recommended to set {@link timeout} to `0.0`, disabling the timeout functionality. This will help prevent large transfers from failing due to exceeding the timeout value.
   */
  timeout: float;
  /** If `true`, multithreading is used to improve performance. */
  use_threads: boolean;
  set_accept_gzip(value: boolean): void;
  is_accepting_gzip(): boolean;
  set_body_size_limit(value: int): void;
  get_body_size_limit(): int;
  set_download_chunk_size(value: int): void;
  get_download_chunk_size(): int;
  set_download_file(value: string): void;
  get_download_file(): string;
  set_max_redirects(value: int): void;
  get_max_redirects(): int;
  set_timeout(value: float): void;
  get_timeout(): float;
  set_use_threads(value: boolean): void;
  is_using_threads(): boolean;

  /** Cancels the current request. */
  cancel_request(): void;
  /**
   * Returns the response body length.
   * **Note:** Some Web servers may not send a body length. In this case, the value returned will be `-1`. If using chunked transfer encoding, the body length will also be `-1`.
   */
  get_body_size(): int;
  /** Returns the number of bytes this HTTPRequest downloaded. */
  get_downloaded_bytes(): int;
  /** Returns the current status of the underlying {@link HTTPClient}. */
  get_http_client_status(): int;
  /**
   * Creates request on the underlying {@link HTTPClient}. If there is no configuration errors, it tries to connect using {@link HTTPClient.connect_to_host} and passes parameters onto {@link HTTPClient.request}.
   * Returns {@link OK} if request is successfully created. (Does not imply that the server has responded), {@link ERR_UNCONFIGURED} if not in the tree, {@link ERR_BUSY} if still processing previous request, {@link ERR_INVALID_PARAMETER} if given string is not a valid URL format, or {@link ERR_CANT_CONNECT} if not using thread and the {@link HTTPClient} cannot connect to host.
   * **Note:** When `method` is {@link HTTPClient.METHOD_GET}, the payload sent via `request_data` might be ignored by the server or even cause the server to reject the request (check RFC 7231 section 4.3.1 (https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.1) for more details). As a workaround, you can send data as a query string in the URL (see {@link String.uri_encode} for an example).
   * **Note:** It's recommended to use transport encryption (TLS) and to avoid sending sensitive information (such as login credentials) in HTTP GET URL parameters. Consider using HTTP POST requests or HTTP headers for such information instead.
   */
  request(url: string, custom_headers?: PackedStringArray | Array<unknown>, method?: int, request_data?: string): int;
  /**
   * Creates request on the underlying {@link HTTPClient} using a raw array of bytes for the request body. If there is no configuration errors, it tries to connect using {@link HTTPClient.connect_to_host} and passes parameters onto {@link HTTPClient.request}.
   * Returns {@link OK} if request is successfully created. (Does not imply that the server has responded), {@link ERR_UNCONFIGURED} if not in the tree, {@link ERR_BUSY} if still processing previous request, {@link ERR_INVALID_PARAMETER} if given string is not a valid URL format, or {@link ERR_CANT_CONNECT} if not using thread and the {@link HTTPClient} cannot connect to host.
   */
  request_raw(url: string, custom_headers?: PackedStringArray | Array<unknown>, method?: int, request_data_raw?: PackedByteArray | Array<unknown>): int;
  /**
   * Sets the proxy server for HTTP requests.
   * The proxy server is unset if `host` is empty or `port` is -1.
   */
  set_http_proxy(host: string, port: int): void;
  /**
   * Sets the proxy server for HTTPS requests.
   * The proxy server is unset if `host` is empty or `port` is -1.
   */
  set_https_proxy(host: string, port: int): void;
  /**
   * Sets the {@link TLSOptions} to be used when connecting to an HTTPS server. See {@link TLSOptions.client}.
   */
  set_tls_options(client_options: TLSOptions): void;

  /** Emitted when a request is completed. */
  request_completed: Signal<[int, int, PackedStringArray, PackedByteArray]>;

  // enum Result
  /** Request successful. */
  static readonly RESULT_SUCCESS: int;
  /**
   * Request failed due to a mismatch between the expected and actual chunked body size during transfer. Possible causes include network errors, server misconfiguration, or issues with chunked encoding.
   */
  static readonly RESULT_CHUNKED_BODY_SIZE_MISMATCH: int;
  /** Request failed while connecting. */
  static readonly RESULT_CANT_CONNECT: int;
  /** Request failed while resolving. */
  static readonly RESULT_CANT_RESOLVE: int;
  /** Request failed due to connection (read/write) error. */
  static readonly RESULT_CONNECTION_ERROR: int;
  /** Request failed on TLS handshake. */
  static readonly RESULT_TLS_HANDSHAKE_ERROR: int;
  /** Request does not have a response (yet). */
  static readonly RESULT_NO_RESPONSE: int;
  /** Request exceeded its maximum size limit, see {@link body_size_limit}. */
  static readonly RESULT_BODY_SIZE_LIMIT_EXCEEDED: int;
  /**
   * Request failed due to an error while decompressing the response body. Possible causes include unsupported or incorrect compression format, corrupted data, or incomplete transfer.
   */
  static readonly RESULT_BODY_DECOMPRESS_FAILED: int;
  /** Request failed (currently unused). */
  static readonly RESULT_REQUEST_FAILED: int;
  /** HTTPRequest couldn't open the download file. */
  static readonly RESULT_DOWNLOAD_FILE_CANT_OPEN: int;
  /** HTTPRequest couldn't write to the download file. */
  static readonly RESULT_DOWNLOAD_FILE_WRITE_ERROR: int;
  /** Request reached its maximum redirect limit, see {@link max_redirects}. */
  static readonly RESULT_REDIRECT_LIMIT_REACHED: int;
  /**
   * Request failed due to a timeout. If you expect requests to take a long time, try increasing the value of {@link timeout} or setting it to `0.0` to remove the timeout completely.
   */
  static readonly RESULT_TIMEOUT: int;
}
