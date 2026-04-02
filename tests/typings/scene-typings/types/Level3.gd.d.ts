// AUTO-GENERATED — do not edit manually.

import type { Level3 as ScriptClass } from "../Level3.js";

type ScriptTree = _GDGetInterfaceTree<__Level3Gd__Trees>;
type ScriptPaths = _GDGetTreePaths<ScriptTree>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../Level3.ts" {
  interface Level3 extends StaticProps {
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
  interface __Level3Gd__Trees {}

  /** @see import("../Level3.ts") */
  class Level3 extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent<N extends Node = Node>(): N;
  }

  interface GodotScripts {
    "res://Level3.gd": Level3;
  }

  interface GodotResources {
    "res://Level3.gd": typeof Level3;
  }
}

export {};