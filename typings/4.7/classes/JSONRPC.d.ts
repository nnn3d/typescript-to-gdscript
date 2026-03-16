// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings/overrides/*.d.ts

/** A helper to handle dictionaries which look like JSONRPC documents. */
declare class JSONRPC extends GodotObject {
  /**
   * Returns a dictionary in the form of a JSON-RPC notification. Notifications are one-shot messages which do not expect a response.
   * - `method`: Name of the method being called.
   * - `params`: An array or dictionary of parameters being passed to the method.
   */
  make_notification(method: string, params: unknown): Dictionary;
  /**
   * Returns a dictionary in the form of a JSON-RPC request. Requests are sent to a server with the expectation of a response. The ID field is used for the server to specify which exact request it is responding to.
   * - `method`: Name of the method being called.
   * - `params`: An array or dictionary of parameters being passed to the method.
   * - `id`: Uniquely identifies this request. The server is expected to send a response with the same ID.
   */
  make_request(method: string, params: unknown, id: unknown): Dictionary;
  /**
   * When a server has received and processed a request, it is expected to send a response. If you did not want a response then you need to have sent a Notification instead.
   * - `result`: The return value of the function which was called.
   * - `id`: The ID of the request this response is targeted to.
   */
  make_response(result: unknown, id: unknown): Dictionary;
  /**
   * Creates a response which indicates a previous reply has failed in some way.
   * - `code`: The error code corresponding to what kind of error this is. See the {@link ErrorCode} constants.
   * - `message`: A custom message about this error.
   * - `id`: The request this error is a response to.
   */
  make_response_error(code: int, message: string, id?: unknown): Dictionary;
  /**
   * Given a Dictionary which takes the form of a JSON-RPC request: unpack the request and run it. Methods are resolved by looking at the field called "method" and looking for an equivalently named function in the JSONRPC object. If one is found that method is called.
   * To add new supported methods extend the JSONRPC class and call {@link process_action} on your subclass.
   * `action`: The action to be run, as a Dictionary in the form of a JSON-RPC request or notification.
   */
  process_action(action: unknown, recurse?: boolean): unknown;
  process_string(action: string): string;
  /**
   * Registers a callback for the given method name.
   * - `name`: The name that clients can use to access the callback.
   * - `callback`: The callback which will handle the specified method.
   */
  set_method(name: string, callback: Callable): void;

  // enum ErrorCode
  /** The request could not be parsed as it was not valid by JSON standard ({@link JSON.parse} failed). */
  static readonly PARSE_ERROR: int;
  /** A method call was requested but the request's format is not valid. */
  static readonly INVALID_REQUEST: int;
  /** A method call was requested but no function of that name existed in the JSONRPC subclass. */
  static readonly METHOD_NOT_FOUND: int;
  /**
   * A method call was requested but the given method parameters are not valid. Not used by the built-in JSONRPC.
   */
  static readonly INVALID_PARAMS: int;
  /** An internal error occurred while processing the request. Not used by the built-in JSONRPC. */
  static readonly INTERNAL_ERROR: int;
}
