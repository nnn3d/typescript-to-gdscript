// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _nested_Anonym } from "../../nested/Anonym.js";
import type { _nested_AnonymTscn_Tree } from "./Anonym.tscn.js";

export interface _nested_AnonymSceneNodes extends _nested_AnonymTscn_Tree {}

declare module "../../nested/Anonym.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<_nested_AnonymSceneNodes>>(path: P): _GDGetNode<_nested_AnonymSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends keyof _nested_AnonymSceneNodes>(path: P): _nested_AnonymSceneNodes[P] | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_nested_AnonymSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_parent(): _GDParentType<_nested_AnonymParents>;
  }
}

declare global {
  interface _nested_AnonymParents {}
  interface GodotResources {
    "res://nested/Anonym.gd": typeof _nested_Anonym;
  }
}

export {};
