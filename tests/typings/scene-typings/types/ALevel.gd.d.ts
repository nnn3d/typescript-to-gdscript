// AUTO-GENERATED — do not edit manually.

import type { ALevel as ScriptClass } from "../ALevel.js";

type ScriptTree = _GDGetInterfaceTree<__ALevelGd__Trees>;
type ScriptPaths = _GDGetTreePaths<ScriptTree>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../ALevel.ts" {
  interface ALevel extends StaticProps {
    get_node<P extends string & ScriptPaths>(path: P): _GDGetNode<ScriptTree, P>;
    get_node<P extends '/root' | `/root/${string}`>(path: P): _GDGetRootNode<ScriptTree, P>;
    get_node(path: string): Node | null;
    get_node_or_null<P extends string & ScriptPaths>(path: P): _GDGetNodeOrNull<ScriptTree, P>;
    get_node_or_null<P extends '/root' | `/root/${string}`>(path: P): _GDGetRootNode<ScriptTree, P> | null;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & ScriptPaths>(path: P): boolean;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<ScriptTree>>(idx: Idx): _GDGetChild<ScriptTree, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<ScriptTree>;
    get_parent<N extends Node = Node>(): N;
  }
}

declare global {
  interface __ALevelGd__Trees {}

  /** @see import("../ALevel.ts") */
  class ALevel extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent<N extends Node = Node>(): N;
  }

  interface GodotScripts {
    "res://ALevel.gd": ALevel;
  }

  interface GodotResources {
    "res://ALevel.gd": typeof ALevel;
  }
}

export {};