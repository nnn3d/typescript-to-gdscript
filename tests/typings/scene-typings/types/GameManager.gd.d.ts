// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../GameManager.js";

type ScriptTree = _GDGetInterfaceTree<__GameManagerGd__Trees>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../GameManager.ts" {
  interface __CLASS__ extends StaticProps {
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

declare class _Script extends ScriptClass {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
  has_node(path: string): boolean;
  get_child(idx: int, include_internal?: boolean): Node;
}

declare global {
  interface __GameManagerGd__Trees {}

  interface _GodotScripts {
    "res://GameManager.gd": _Script;
  }

  interface GodotResources {
    "res://GameManager.gd": typeof _Script;
  }
}

export {};