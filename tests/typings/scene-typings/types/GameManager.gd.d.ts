// AUTO-GENERATED — do not edit manually.

import type { __CLASS__ as ScriptClass } from "../GameManager";

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "../GameManager" {
  interface __CLASS__ extends StaticProps {}
}

declare global {
  interface GodotScripts {
    "res://GameManager.gd": ScriptClass;
  }

  interface GodotResources {
    "res://GameManager.gd": typeof ScriptClass;
  }
}

export {};