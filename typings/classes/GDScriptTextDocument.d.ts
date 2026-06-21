// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Document related language server functionality. */
declare class GDScriptTextDocument extends RefCounted {
  codeLens(params: Dictionary): Array<unknown>;
  colorPresentation(params: Dictionary): Array<unknown>;
  completion(params: Dictionary): Array<unknown>;
  declaration(params: Dictionary): unknown;
  definition(params: Dictionary): Array<unknown>;
  didChange(params: unknown): void;
  didClose(params: unknown): void;
  didOpen(params: unknown): void;
  didSave(params: unknown): void;
  documentLink(params: Dictionary): Array<unknown>;
  documentSymbol(params: Dictionary): Array<unknown>;
  foldingRange(params: Dictionary): Array<unknown>;
  hover(params: Dictionary): unknown;
  nativeSymbol(params: Dictionary): unknown;
  prepareRename(params: Dictionary): unknown;
  references(params: Dictionary): Array<unknown>;
  rename(params: Dictionary): Dictionary;
  resolve(params: Dictionary): Dictionary;
  show_native_symbol_in_editor(symbol_id: string | NodePath): void;
  signatureHelp(params: Dictionary): unknown;
  willSaveWaitUntil(params: unknown): void;
}
