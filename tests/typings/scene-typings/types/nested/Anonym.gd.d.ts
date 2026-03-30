// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _nested_Anonym } from "../../nested/Anonym.js";
import type { _nested_AnonymTscn_Tree } from "./Anonym.tscn.js";

export interface _nested_AnonymSceneNodes extends _nested_AnonymTscn_Tree {
  [__children]: [_nested_AnonymTscn_Tree["Sprite2D"], _nested_AnonymTscn_Tree["CollisionShape2D"]];
}

declare module "../../nested/Anonym.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<_nested_AnonymSceneNodes>>(path: P): _GDGetNode<_nested_AnonymSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_nested_AnonymSceneNodes>>(path: P): _GDGetNodeOrNull<_nested_AnonymSceneNodes, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_nested_AnonymSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_nested_AnonymSceneNodes>>>(idx: Idx): _GDGetChild<_nested_AnonymSceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
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
