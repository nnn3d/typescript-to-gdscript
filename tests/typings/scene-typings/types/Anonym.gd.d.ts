// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _Anonym } from "../Anonym.js";
import type { _AnonymTscn_Tree } from "./Anonym.tscn.js";

export interface _AnonymSceneNodes extends _AnonymTscn_Tree {
  [__children]: [_AnonymTscn_Tree["Sprite2D"], _AnonymTscn_Tree["CollisionShape2D"]];
}

declare module "../Anonym.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<_AnonymSceneNodes>>(path: P): _GDGetNode<_AnonymSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_AnonymSceneNodes>>(path: P): _GDGetNodeOrNull<_AnonymSceneNodes, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_AnonymSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_AnonymSceneNodes>>>(idx: Idx): _GDGetChild<_AnonymSceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_AnonymParents>;
  }
}

declare global {
  interface _AnonymParents {}
  interface GodotResources {
    "res://Anonym.gd": typeof _Anonym;
  }
}

export {};
