// AUTO-GENERATED — do not edit manually.

import type { Ball as ScriptClass } from "../Ball.js";

type ScriptTree = _GDGetInterfaceTree<__BallGd__Trees>;

declare module "../Ball.ts" {
  interface Ball {
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
  interface __BallGd__Trees {}

  /** @see import("../Ball.ts") */
  class Ball extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
  }

  interface _GodotScripts {
    "res://Ball.gd": Ball;
  }

  interface GodotResources {
    "res://Ball.gd": typeof Ball;
  }
}

export {};