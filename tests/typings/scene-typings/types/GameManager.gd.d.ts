// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../GameManager.js";

declare class _Script extends ScriptClass {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
  has_node(path: string): boolean;
  get_child(idx: int, include_internal?: boolean): Node;
  get_parent<N extends Node = Node>(): N;
}

declare global {
  interface _GodotScripts {
    "res://GameManager.gd": _Script;
  }

  interface GodotResources {
    "res://GameManager.gd": typeof _Script;
  }
}

export {};
