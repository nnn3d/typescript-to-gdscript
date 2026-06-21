// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** GDScript language server. */
declare interface GDScriptLanguageProtocol extends JSONRPC {
  /** Returns the language server's {@link GDScriptTextDocument} instance. */
  get_text_document(): GDScriptTextDocument | null;
  /** Returns the language server's {@link GDScriptWorkspace} instance. */
  get_workspace(): GDScriptWorkspace | null;
  initialize(params: Dictionary): unknown;
  initialized(params: unknown): void;
  /**
   * Returns `true` if the language server was initialized by a language server client, `false` otherwise.
   */
  is_initialized(): boolean;
  /**
   * Returns `true` if the language server is providing the smart resolve feature, `false` otherwise. The feature can be configured through the editor settings.
   */
  is_smart_resolve_enabled(): boolean;
  notify_client(method: string | NodePath, params?: unknown, client_id?: int): void;
  on_client_connected(): int;
  on_client_disconnected(client_id: int): void;
}
declare const GDScriptLanguageProtocol: GDScriptLanguageProtocol;

