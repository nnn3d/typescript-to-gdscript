// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as _PlayerChild } from "../PlayerChild.ts";
type ScriptTree = _GDGetInterfaceTree<__PlayerChildGd__Trees>;

declare module "../PlayerChild.ts" {
  interface __CLASS__ {
    get_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNode<ScriptTree, P>;
    get_node(path: string): Node | null;
    get_node_or_null<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNodeOrNull<ScriptTree, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<ScriptTree>;
  }
}


// remove unnecessary typings from global class
/** @see import("../Player.ts") */
declare class PlayerChild extends GetExternalScriptClass(_PlayerChild) {}

declare global {

  interface __PlayerChildGd__Trees {}

  interface GodotResources {
    "res://PlayerChild.gd": typeof PlayerChild;
  }
}

export {};
