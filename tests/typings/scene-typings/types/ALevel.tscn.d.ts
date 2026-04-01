// AUTO-GENERATED — do not edit manually.

type _ALevelTscn_ExtraNode = {
  [__node_type]: Label;
  [__node_parent]: _ALevelTscn_Tree;
  [__node_children]: [];
};

type _ALevelTscn_Background = {
  [__node_type]: Sprite2D;
  [__node_parent]: _ALevelTscn_Tree;
  [__node_children]: [];
};

type _ALevelTscn_ScoreSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _ALevelTscn_ScoreLabel;
  [__node_children]: [];
};

type _ALevelTscn_ScoreLabel = {
  [__node_type]: Label;
  [__node_parent]: _ALevelTscn_UI;
  [__node_children]: [_ALevelTscn_ScoreSprite];
  "ScoreSprite": _ALevelTscn_ScoreSprite;
};

type _ALevelTscn_UI = {
  [__node_type]: CanvasLayer;
  [__node_parent]: _ALevelTscn_Tree;
  [__node_children]: [_ALevelTscn_ScoreLabel];
  "ScoreLabel": _ALevelTscn_ScoreLabel;
  "ScoreLabel/ScoreSprite": _ALevelTscn_ScoreSprite;
};

type _ALevelTscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Level.gd">;
  [__node_parent]: _GDGetInterfaceParent<__ALevelTscn__Parents>;
  [__node_children]: [_PlayerTscn_Tree, _EnemyTscn_Tree, _TilesetObjectsTscn_Tree, _ALevelTscn_Background, _ALevelTscn_UI, _TilesetObjectsTscn_Tree, _Level2Tscn_Tree, _ALevelTscn_ExtraNode];
  "Player": _PlayerTscn_Tree;
  "Enemy": _EnemyTscn_Tree;
  "TilesetObjects": _TilesetObjectsTscn_Tree;
  "TilesetObjectsMap": _TilesetObjectsTscn_Tree;
  "Level2": _Level2Tscn_Tree;
  "Background": _ALevelTscn_Background;
  "UI": _ALevelTscn_UI;
  "UI/ScoreLabel": _ALevelTscn_ScoreLabel;
  "UI/ScoreLabel/ScoreSprite": _ALevelTscn_ScoreSprite;
  "ExtraNode": _ALevelTscn_ExtraNode;
};

interface __ALevelTscn__Parents {}

interface __LevelGd__Trees {
  "res://ALevel.tscn": _ALevelTscn_Tree;
}

// Instanced scene parents
interface __PlayerTscn__Parents { "res://ALevel.tscn": _ALevelTscn_Tree; }
interface __EnemyTscn__Parents { "res://ALevel.tscn": _ALevelTscn_Tree; }
interface __TilesetObjectsTscn__Parents { "res://ALevel.tscn": _ALevelTscn_Tree; }
interface __Level2Tscn__Parents { "res://ALevel.tscn": _ALevelTscn_Tree; }

interface _GodotSceneTrees {
  "res://ALevel.tscn": _ALevelTscn_Tree;
}
interface GodotResources {
  "res://ALevel.tscn": PackedScene<_GDTreeNode<_ALevelTscn_Tree>>;
}
