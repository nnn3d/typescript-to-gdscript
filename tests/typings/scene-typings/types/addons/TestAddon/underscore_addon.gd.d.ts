// AUTO-GENERATED — do not edit manually.

import type { _Foo as ScriptClass } from "./underscore_addon";

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "./underscore_addon" {
  interface _Foo extends StaticProps {}
}

declare global {
  /** @see import("./underscore_addon") */
  class _Foo extends ScriptClass {
  }

  interface GodotScripts {
    "res://addons/TestAddon/underscore_addon.gd": _Foo;
  }

  interface GodotResources {
    "res://addons/TestAddon/underscore_addon.gd": typeof _Foo;
  }
}

export {};