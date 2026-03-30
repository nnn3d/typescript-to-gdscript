// AUTO-GENERATED — do not edit manually.

import type { Player as _Player } from "../Player.ts";

type ScriptTree = _GDGetInterfaceTree<__PlayerGd__Trees>;

declare module "../Player.ts" {
  interface Player {
    get_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNode<ScriptTree, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNodeOrNull<ScriptTree, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<ScriptTree>;
  }
}



declare global {
  interface __PlayerGd__Trees {}

  // remove unnecessary typings from global class
  /** @see import("../Player.ts") */
  class Player extends GetExternalScriptClass(_Player) {}
  interface GodotResources {
    "res://Player.gd": typeof Player;
  }
}

export {};
