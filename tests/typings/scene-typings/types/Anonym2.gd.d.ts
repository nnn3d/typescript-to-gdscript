// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../Anonym2";

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

type ScriptTree = _GDGetInterfaceTree<__Anonym2Gd__Trees>;
type ScriptPaths = _GDGetTreePaths<ScriptTree>;

declare module "../Anonym2" {
  interface __CLASS__ extends StaticProps {
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
  interface __Anonym2Gd__Trees {}

  interface GodotScripts {
    "res://Anonym2.gd": ScriptClass;
  }

  interface GodotResources {
    "res://Anonym2.gd": typeof ScriptClass;
  }
}

export {};