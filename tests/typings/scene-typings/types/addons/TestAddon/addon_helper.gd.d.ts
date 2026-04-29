// AUTO-GENERATED — do not edit manually.

import type { _$CLASS$_ as ScriptClass } from "./addon_helper";

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module "./addon_helper" {
  interface _$CLASS$_ extends StaticProps {}
}

declare global {
  interface GodotScripts {
    "res://addons/TestAddon/addon_helper.gd": ScriptClass;
  }

  interface GodotResources {
    "res://addons/TestAddon/addon_helper.gd": typeof ScriptClass;
  }
}

export {};