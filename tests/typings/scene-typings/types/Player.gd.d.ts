// AUTO-GENERATED — do not edit manually.

import type { Player as ScriptClass } from "../Player.js";

type ScriptTree = _GDGetInterfaceTree<__PlayerGd__Trees>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../Player.ts" {
  interface Player extends StaticProps {
    get_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNode<ScriptTree, P>;
    get_node<P extends '/root' | `/root/${string}`>(path: P): _GDGetRootNode<ScriptTree, P>;
    get_node(path: string): Node | null;
    get_node_or_null<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): _GDGetNodeOrNull<ScriptTree, P>;
    get_node_or_null<P extends '/root' | `/root/${string}`>(path: P): _GDGetRootNode<ScriptTree, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<ScriptTree>>(path: P): boolean;
    has_node(path: `/root/${string}`): boolean;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<ScriptTree>;
  }
}

declare global {
  interface __PlayerGd__Trees {}

  /** @see import("../Player.ts") */
  class Player extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
  }

  interface GodotScripts {
    "res://Player.gd": Player;
  }

  interface GodotResources {
    "res://Player.gd": typeof Player;
  }
}

export {};