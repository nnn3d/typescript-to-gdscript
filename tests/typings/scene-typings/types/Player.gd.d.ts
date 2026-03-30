// AUTO-GENERATED — do not edit manually.

import type { Player as _Player } from "../Player.js";
import type { _PlayerTscn_Tree } from "./Player.tscn.js";

export interface _PlayerSceneNodes extends _PlayerTscn_Tree {
  [__children]: [_PlayerTscn_Tree["Sprite2D"], _PlayerTscn_Tree["CollisionShape2D"], _PlayerTscn_Tree["HealthBar"]];
}

declare module "../Player.ts" {
  interface Player {
    get_node<P extends string & _GDGetTreePaths<_PlayerSceneNodes>>(path: P): _GDGetNode<_PlayerSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_PlayerSceneNodes>>(path: P): _GDGetNode<_PlayerSceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_PlayerSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_PlayerSceneNodes>>>(idx: Idx): _GDGetChild<_PlayerSceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_PlayerParents>;
  }
}

declare global {
  // From: Player.ts
  class Player extends _Player {}
  interface _PlayerParents {}
  interface GodotResources {
    "res://Player.gd": typeof _Player;
  }
}

export {};
