// AUTO-GENERATED — do not edit manually.

import type { Level as _Level } from "../Level.js";
import type { _LevelTscn_Tree } from "./Level.tscn.js";
import type { _ALevelTscn_Tree } from "./ALevel.tscn.js";
import type { _Level1Tscn_Tree } from "./Level1.tscn.js";

export interface _LevelSceneNodes {
  [__children]: [_LevelTscn_Tree["Player"] | _ALevelTscn_Tree["Player"] | _Level1Tscn_Tree["Player"], _LevelTscn_Tree["Enemy"] | _ALevelTscn_Tree["Enemy"] | _Level1Tscn_Tree["Enemy"], _LevelTscn_Tree["TilesetObjects"] | _ALevelTscn_Tree["TilesetObjects"] | _Level1Tscn_Tree["TilesetObjects"], _LevelTscn_Tree["Background"] | _ALevelTscn_Tree["Background"] | _Level1Tscn_Tree["Background"], _LevelTscn_Tree["UI"] | _ALevelTscn_Tree["UI"] | _Level1Tscn_Tree["UI"], _LevelTscn_Tree["TilesetObjectsMap"] | _ALevelTscn_Tree["TilesetObjectsMap"] | _Level1Tscn_Tree["TilesetObjectsMap"], _LevelTscn_Tree["Level2"] | _ALevelTscn_Tree["Level2"] | _Level1Tscn_Tree["Level2"], _ALevelTscn_Tree["ExtraNode"] | _Level1Tscn_Tree["TilesetObjects2"] | null, _Level1Tscn_Tree["ExtraSprite"] | null];
  "Player": _LevelTscn_Tree["Player"] | _ALevelTscn_Tree["Player"] | _Level1Tscn_Tree["Player"];
  "Enemy": _LevelTscn_Tree["Enemy"] | _ALevelTscn_Tree["Enemy"] | _Level1Tscn_Tree["Enemy"];
  "TilesetObjects": _LevelTscn_Tree["TilesetObjects"] | _ALevelTscn_Tree["TilesetObjects"] | _Level1Tscn_Tree["TilesetObjects"];
  "Background": _LevelTscn_Tree["Background"] | _ALevelTscn_Tree["Background"] | _Level1Tscn_Tree["Background"];
  "UI": _LevelTscn_Tree["UI"] | _ALevelTscn_Tree["UI"] | _Level1Tscn_Tree["UI"];
  "UI/ScoreLabel": _LevelTscn_Tree["UI/ScoreLabel"] | _ALevelTscn_Tree["UI/ScoreLabel"] | _Level1Tscn_Tree["UI/ScoreLabel"];
  "UI/ScoreLabel/ScoreSprite": _LevelTscn_Tree["UI/ScoreLabel/ScoreSprite"] | _ALevelTscn_Tree["UI/ScoreLabel/ScoreSprite"] | _Level1Tscn_Tree["UI/ScoreLabel/ScoreSprite"];
  "TilesetObjectsMap": _LevelTscn_Tree["TilesetObjectsMap"] | _ALevelTscn_Tree["TilesetObjectsMap"] | _Level1Tscn_Tree["TilesetObjectsMap"];
  "Level2": _LevelTscn_Tree["Level2"] | _ALevelTscn_Tree["Level2"] | _Level1Tscn_Tree["Level2"];
  "ExtraNode": _ALevelTscn_Tree["ExtraNode"] | null;
  "TilesetObjects2": _Level1Tscn_Tree["TilesetObjects2"] | null;
  "ExtraSprite": _Level1Tscn_Tree["ExtraSprite"] | null;
}

declare module "../Level.ts" {
  interface Level {
    get_node<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): _GDGetNode<_LevelSceneNodes, P>;
    get_node(path: string): Node;
    get_node_or_null<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): _GDGetNodeOrNull<_LevelSceneNodes, P>;
    get_node_or_null(path: string): Node | null;
    has_node<P extends string & _GDGetTreePaths<_LevelSceneNodes>>(path: P): true;
    has_node(path: string): boolean;
    get_child<Idx extends number & _GDChildIndices<_GDGetChildren<_LevelSceneNodes>>>(idx: Idx): _GDGetChild<_LevelSceneNodes, Idx>;
    get_child(idx: int, include_internal?: boolean): Node;
    get_parent(): _GDParentType<_LevelParents>;
  }
}

declare global {
  // From: Level.ts
  class Level extends _Level {}
  interface _LevelParents {}
  interface GodotResources {
    "res://Level.gd": typeof _Level;
  }
}

export {};
