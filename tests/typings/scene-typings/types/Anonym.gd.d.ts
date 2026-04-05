// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../Anonym.js";

type ScriptTree = _GDGetInterfaceTree<__AnonymGd__Trees>;
type ScriptPaths = _GDGetTreePaths<ScriptTree>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../Anonym.ts" {
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

declare class _Script extends ScriptClass {
  get_node(path: string): Node | null;
  get_node_or_null(path: string): Node | null;
  has_node(path: string): boolean;
  get_child(idx: int, include_internal?: boolean): Node;
  get_parent<N extends Node = Node>(): N;
}

declare module "../Anonym.ts" {
  namespace __CLASS__ {
    type TEST_ENUM = number & { readonly __brand: 'TEST_ENUM' };
    type Inventory = InstanceType<typeof ScriptClass.Inventory>;
  }
  interface __CLASS__ {
    TEST_ENUM: { TEST: __CLASS__.TEST_ENUM; TEST2: __CLASS__.TEST_ENUM };
  }
}

declare global {
  interface __AnonymGd__Trees {}

  interface GodotScripts {
    "res://Anonym.gd": _Script;
  }

  interface GodotResources {
    "res://Anonym.gd": typeof _Script;
  }
}

export {};