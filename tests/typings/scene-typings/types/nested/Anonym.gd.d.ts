// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../../nested/Anonym.js";

type ScriptTree = _GDGetInterfaceTree<__nested_AnonymGd__Trees>;

declare module "../../nested/Anonym.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNode<ScriptTree, P>;
    get_node(path: string): Node | null;
    get_node_or_null<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNodeOrNull<ScriptTree, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): boolean;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<ScriptTree>;
  }
}

declare class _Script extends ScriptClass {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
  has_node(path: string): boolean;
  get_child(idx: int, include_internal?: boolean): Node;
  get_parent<N extends Node = Node>(): N;
}

declare global {
  interface __nested_AnonymGd__Trees {}

  interface _GodotScripts {
    "res://nested/Anonym.gd": _Script;
  }

  interface GodotResources {
    "res://nested/Anonym.gd": typeof _Script;
  }
}

export {};
