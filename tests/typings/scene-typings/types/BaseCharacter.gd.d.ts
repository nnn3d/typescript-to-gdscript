// AUTO-GENERATED — do not edit manually.

import type { BaseCharacter as ScriptClass } from "../BaseCharacter.js";

type ScriptTree = _GDGetInterfaceTree<__BaseCharacterGd__Trees>;

declare module "../BaseCharacter.ts" {
  interface BaseCharacter {
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
  interface __BaseCharacterGd__Trees {}

  /** @see import("../BaseCharacter.ts") */
  class BaseCharacter extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
  }

  interface _GodotScripts {
    "res://BaseCharacter.gd": BaseCharacter;
  }

  interface GodotResources {
    "res://BaseCharacter.gd": typeof BaseCharacter;
  }
}

export {};