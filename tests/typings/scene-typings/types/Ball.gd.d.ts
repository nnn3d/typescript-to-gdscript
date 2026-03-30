// AUTO-GENERATED — do not edit manually.

import type { Ball as _Ball } from "../Ball.js";
import type { _BallATscn_Tree } from "./BallA.tscn.js";
import type { _BallBTscn_Tree } from "./BallB.tscn.js";

export interface _BallSceneNodes extends _BallATscn_Tree, _BallBTscn_Tree {}

declare module "../Ball.ts" {
  interface Ball {
    get_node<P extends string & _GDGetTreePaths<_BallSceneNodes>>(path: P): _GDGetNode<_BallSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_BallSceneNodes>>(path: P): _GDGetNode<_BallSceneNodes, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_BallSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_parent(): _GDParentType<_BallParents>;
  }
}

declare global {
  // From: Ball.ts
  class Ball extends _Ball {}
  interface _BallParents {}
  interface GodotResources {
    "res://Ball.gd": typeof _Ball;
  }
}

export {};
