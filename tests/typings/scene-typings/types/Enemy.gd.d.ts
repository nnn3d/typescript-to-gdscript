// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _Enemy } from "../Enemy.js";
import type { _EnemyTscn_Tree } from "./Enemy.tscn.js";

export interface _EnemySceneNodes extends _EnemyTscn_Tree {
  [__children]: [_EnemyTscn_Tree["Sprite2D"], _EnemyTscn_Tree["HitBox"]];
}

declare module "../Enemy.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): _GDGetNode<_EnemySceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): _GDGetNodeOrNull<_EnemySceneNodes, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_EnemySceneNodes>>>(idx: Idx): _GDGetChild<_EnemySceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_EnemyParents>;
  }
}

declare global {
  interface _EnemyParents {}
  interface GodotResources {
    "res://Enemy.gd": typeof _Enemy;
  }
}

export {};
