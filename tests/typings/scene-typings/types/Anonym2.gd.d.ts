// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _Anonym2 } from "../Anonym2.js";
import type { _Anonym2Tscn_Tree } from "./Anonym2.tscn.js";

export interface _Anonym2SceneNodes extends _Anonym2Tscn_Tree {
  [__children]: [_Anonym2Tscn_Tree["Sprite2D"], _Anonym2Tscn_Tree["CollisionShape2D"]];
}

declare module "../Anonym2.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<_Anonym2SceneNodes>>(path: P): _GDGetNode<_Anonym2SceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_Anonym2SceneNodes>>(path: P): _GDGetNode<_Anonym2SceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_Anonym2SceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_Anonym2SceneNodes>>>(idx: Idx): _GDGetChild<_Anonym2SceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_Anonym2Parents>;
  }
}

declare global {
  interface _Anonym2Parents {}
  interface GodotResources {
    "res://Anonym2.gd": typeof _Anonym2;
  }
}

export {};
