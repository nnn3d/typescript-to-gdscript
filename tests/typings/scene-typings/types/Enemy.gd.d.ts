// AUTO-GENERATED — do not edit manually.

import type { Enemy as _Enemy } from "../Enemy.js";
import type { _EnemyTscn_Tree } from "./Enemy.tscn.js";

export interface _EnemySceneNodes extends _EnemyTscn_Tree {}

declare module "../Enemy.ts" {
  interface Enemy {
    get_node<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): _GDGetNode<_EnemySceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): _GDGetNode<_EnemySceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_EnemySceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_parent(): _GDParentType<_EnemyParents>;
  }
}

declare global {
  // From: Enemy.ts
  class Enemy extends _Enemy {}
  interface _EnemyParents {}
  interface GodotResources {
    "res://Enemy.gd": typeof _Enemy;
  }
}

export {};
