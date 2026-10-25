// AUTO-GENERATED — do not edit manually.

type _LevelTscn_UniqueNodes = {
  "%ScoreLabel": _LevelTscn_UI_ScoreLabel;
  "%HealthBar": _LevelTscn_UI_HealthBar;
};

type _LevelTscn_Player = {
  [__node_extends]: GodotSceneTrees["res://Player.tscn"];
  [__node_root]: "Player";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://Player.tscn"]>;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _GDInstanceUnique<GodotSceneTrees["res://Player.tscn"], _LevelTscn_UniqueNodes>;
};

type _LevelTscn_Enemy = {
  [__node_extends]: GodotSceneTrees["res://Enemy.tscn"];
  [__node_root]: "Enemy";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://Enemy.tscn"]>;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _GDInstanceUnique<GodotSceneTrees["res://Enemy.tscn"], _LevelTscn_UniqueNodes>;
};

type _LevelTscn_TilesetObjects = {
  [__node_extends]: GodotSceneTrees["res://TilesetObjects.tscn"];
  [__node_root]: "TilesetObjects";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://TilesetObjects.tscn"]>;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _GDInstanceUnique<GodotSceneTrees["res://TilesetObjects.tscn"], _LevelTscn_UniqueNodes>;
};

type _LevelTscn_Background = {
  [__node_type]: Sprite2D;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _LevelTscn_UniqueNodes;
};

type _LevelTscn_UI_ScoreLabel_ScoreSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _LevelTscn_UI_ScoreLabel;
  [__node_children]: [];
  [__node_unique]: _LevelTscn_UniqueNodes;
};

type _LevelTscn_UI_ScoreLabel = {
  [__node_type]: Label;
  [__node_parent]: _LevelTscn_UI;
  [__node_children]: [_LevelTscn_UI_ScoreLabel_ScoreSprite];
  [__node_unique]: _LevelTscn_UniqueNodes;
  "ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
};

type _LevelTscn_UI_HealthBar = {
  [__node_type]: Label;
  [__node_parent]: _LevelTscn_UI;
  [__node_children]: [];
  [__node_unique]: _LevelTscn_UniqueNodes;
};

type _LevelTscn_UI = {
  [__node_type]: _GDGetInterfaceNode<GodotScripts, "res://LevelUI.gd">;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [_LevelTscn_UI_ScoreLabel, _LevelTscn_UI_HealthBar];
  [__node_unique]: _LevelTscn_UniqueNodes;
  "ScoreLabel": _LevelTscn_UI_ScoreLabel;
  "ScoreLabel/ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
  "HealthBar": _LevelTscn_UI_HealthBar;
};

type _LevelTscn_TilesetObjectsMap = {
  [__node_extends]: GodotSceneTrees["res://TilesetObjects.tscn"];
  [__node_root]: "TilesetObjectsMap";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://TilesetObjects.tscn"]>;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _GDInstanceUnique<GodotSceneTrees["res://TilesetObjects.tscn"], _LevelTscn_UniqueNodes>;
};

type _LevelTscn_Level2 = {
  [__node_extends]: GodotSceneTrees["res://Level2.tscn"];
  [__node_root]: "Level2";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://Level2.tscn"]>;
  [__node_parent]: _LevelTscn_Tree;
  [__node_children]: [];
  [__node_unique]: _GDInstanceUnique<GodotSceneTrees["res://Level2.tscn"], _LevelTscn_UniqueNodes>;
};

type _LevelTscn_Tree = {
  [__node_root]: "Level";
  [__node_type]: _GDGetInterfaceNode<GodotScripts, "res://Level.gd">;
  [__node_parent]: null;
  [__node_instancers]: _GDGetInterfaceParent<__LevelTscn__Parents>;
  [__node_children]: [_LevelTscn_Player, _LevelTscn_Enemy, _LevelTscn_TilesetObjects, _LevelTscn_Background, _LevelTscn_UI, _LevelTscn_TilesetObjectsMap, _LevelTscn_Level2];
  [__node_unique]: _LevelTscn_UniqueNodes;
  "Player": _LevelTscn_Player;
  "Enemy": _LevelTscn_Enemy;
  "TilesetObjects": _LevelTscn_TilesetObjects;
  "Background": _LevelTscn_Background;
  "UI": _LevelTscn_UI;
  "UI/ScoreLabel": _LevelTscn_UI_ScoreLabel;
  "UI/ScoreLabel/ScoreSprite": _LevelTscn_UI_ScoreLabel_ScoreSprite;
  "UI/HealthBar": _LevelTscn_UI_HealthBar;
  "TilesetObjectsMap": _LevelTscn_TilesetObjectsMap;
  "Level2": _LevelTscn_Level2;
};

declare global {
  interface __LevelTscn__Parents {}

  interface __LevelGd__Trees {
    "res://Level.tscn": _LevelTscn_Tree;
  }

  interface __LevelUIGd__Trees {
    "res://Level.tscn": _LevelTscn_UI;
  }

  // Instanced scene parents
  interface __PlayerTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __EnemyTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __TilesetObjectsTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __TilesetObjectsTscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }
  interface __Level2Tscn__Parents { "res://Level.tscn": _LevelTscn_Tree; }

  interface GodotSceneTrees {
    "res://Level.tscn": _LevelTscn_Tree;
  }
  interface GodotScenes {
    "res://Level.tscn": _GDTreeNode<_LevelTscn_Tree>;
  }
  interface GodotResources {
    "res://Level.tscn": PackedScene<_GDTreeNode<_LevelTscn_Tree>>;
    "uid://test_level_scene": PackedScene<_GDTreeNode<_LevelTscn_Tree>>;
  }
  interface __GodotGroup_entities {
    "res://Level.tscn": GodotSceneTrees["res://Player.tscn"] | GodotSceneTrees["res://Enemy.tscn"]
  }
  interface __GodotGroup_damageable {
    "res://Level.tscn": GodotSceneTrees["res://Player.tscn"] | GodotSceneTrees["res://Enemy.tscn"] | _LevelTscn_Background
  }
  interface GodotGroups {
    entities: __GodotGroup_entities;
    damageable: __GodotGroup_damageable;
  }
}

export {}