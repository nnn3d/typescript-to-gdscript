// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _nested_Anonym } from "../../nested/Anonym.js";

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

declare global {
  interface __nested_AnonymGd__Trees {}

  /** @see import("../../nested/Anonym.ts") */
  class nested_Anonym extends _nested_Anonym {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
  }

  interface GodotResources {
    "res://nested/Anonym.gd": typeof _nested_Anonym;
  }
}

export {};
