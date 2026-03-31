// AUTO-GENERATED — do not edit manually.

type _PlayerTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: [
    _PlayerTscn_AnimationPlayer
  ];
  "AnimationPlayer": _PlayerTscn_AnimationPlayer,
  "AnimationPlayer/Body": _PlayerTscn_Body,
  "AnimationPlayer/Body/Armor": _PlayerTscn_BodyArmor,
};

type _PlayerTscn_AnimationPlayer = {
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://PlayerChild.gd">;
  [__node_parent]: _PlayerTscn_Sprite2D;
  [__node_children]: [
    _PlayerTscn_Body
  ];
  "Body": _PlayerTscn_Body,
  "Body/Armor": _PlayerTscn_BodyArmor,
};

type _PlayerTscn_Body = {
  [__node_type]: Sprite2D;
  [__node_parent]: _PlayerTscn_AnimationPlayer;
  [__node_children]: [
    _PlayerTscn_BodyArmor
  ];
  "Armor": _PlayerTscn_BodyArmor,
}

type _PlayerTscn_BodyArmor = {
  [__node_type]: Sprite2D;
  [__node_parent]: _PlayerTscn_Body;
  [__node_children]: [];
}

type _PlayerTscn_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: []
};

type _PlayerTscn_HealthBar = {
  [__node_type]: ProgressBar;
  [__node_parent]: _PlayerTscn_Tree;
  [__node_children]: []
};

type _PlayerTscn_Tree = {
  [__node_root]: true,
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Player.gd">;
  [__node_parent]: _GDGetInterfaceParent<__PlayerTscn__Parents>
  [__node_children]: [_PlayerTscn_Sprite2D, _PlayerTscn_CollisionShape2D, _PlayerTscn_HealthBar];
  Sprite2D: _PlayerTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _PlayerTscn_AnimationPlayer;
  "Sprite2D/AnimationPlayer/Body": _PlayerTscn_Body;
  "Sprite2D/AnimationPlayer/Body/Armor": _PlayerTscn_BodyArmor;
  CollisionShape2D: _PlayerTscn_CollisionShape2D;
  HealthBar: _PlayerTscn_HealthBar;
  '%HealthBar': _PlayerTscn_HealthBar;
}

declare global {
  // self parents
  interface __PlayerTscn__Parents {}

  // set trees for scene scripts
  interface __PlayerGd__Trees {
    // self res path for uniqueness
    "res://Player.tscn": _PlayerTscn_Tree
  }

  interface __PlayerChildGd__Trees {
    "res://Player.tscn": _PlayerTscn_AnimationPlayer
  }

  // script class instances for tree [__node_type] resolution
  interface _GodotScripts {
    "res://Player.gd": Player;
    "res://PlayerChild.gd": PlayerChild;
  }

  // global interfaces
  interface _GodotSceneTrees {
    "res://Player.tscn": _PlayerTscn_Tree
  }
  interface GodotResources {
    "res://Player.tscn": PackedScene<TreeNode<_GDTreeGetType<_PlayerTscn_Tree>, _PlayerTscn_Tree>>;
  }
}

export {};
