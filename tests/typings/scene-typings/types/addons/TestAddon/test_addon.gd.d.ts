// AUTO-GENERATED — do not edit manually.

import type { TestAddon as ScriptClass } from "./test_addon.js";

type ScriptTree = _GDGetInterfaceTree<__addons_TestAddon_test_addonGd__Trees>;
type ScriptPaths = _GDGetTreePaths<ScriptTree>;

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "./test_addon.ts" {
  interface TestAddon extends StaticProps {
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
  interface __addons_TestAddon_test_addonGd__Trees {}

  /** @see import("./test_addon.ts") */
  class TestAddon extends ScriptClass {
    get_node(path: string): Node | null;
    get_node_or_null(path: string): Node | null;
    has_node(path: string): boolean;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent<N extends Node = Node>(): N;
  }
  namespace TestAddon {
    const enum AddonState {
      IDLE = 0,
      RUNNING = 1,
      STOPPED = 2,
    }
  }

  interface GodotScripts {
    "res://addons/TestAddon/test_addon.gd": TestAddon;
  }

  interface GodotResources {
    "res://addons/TestAddon/test_addon.gd": typeof TestAddon;
  }
}

export {};