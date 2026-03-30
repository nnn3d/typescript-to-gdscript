// AUTO-GENERATED — do not edit manually.

import type { Level as _Level } from "../Level.js";
import type { _LevelTscn_Tree } from "./Level.tscn.js";
import type { _ALevelTscn_Tree } from "./ALevel.tscn.js";
import type { _Level1Tscn_Tree } from "./Level1.tscn.js";

export interface _LevelSceneNodes extends _LevelTscn_Tree, _ALevelTscn_Tree, _Level1Tscn_Tree {}

declare module "../Level.ts" {
  interface Level {
    get_node<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): _GDGetNode<_LevelSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): _GDGetNode<_LevelSceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_parent(): _GDParentType<_LevelParents>;
  }
}

declare global {
  // From: Level.ts
  class Level extends _Level {}
  interface _LevelParents {}
  interface GodotResources {
    "res://Level.gd": typeof _Level;
  }
}

export {};
