// AUTO-GENERATED — do not edit manually.

type _PlayerTscn_Tree = {
  [__node_root]: true,
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Player.gd">;
  [__node_parent]: _GDGetInterfaceParent<__PlayerTscn__Parents>
  [__node_children]: [_PlayerTscn_Tree['Sprite2D'], _PlayerTscn_Tree['CollisionShape2D'], _PlayerTscn_Tree['HealthBar']];
  Sprite2D: {
    [__node_type]: Sprite2D;
    [__node_parent]: _PlayerTscn_Tree;
    [__node_children]: [
      _PlayerTscn_Tree['Sprite2D/AnimationPlayer']
    ];
    "AnimationPlayer": _PlayerTscn_Tree['Sprite2D/AnimationPlayer'],
    "AnimationPlayer/Body": _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body'],
    "AnimationPlayer/Body/Armor": _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body/Armor'],
  };
  "Sprite2D/AnimationPlayer": {
    [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://PlayerChild.gd">;
    [__node_parent]: _PlayerTscn_Tree['Sprite2D'];
    [__node_children]: [
      _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body']
    ];
    "Body": _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body'],
    "Body/Armor": _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body/Armor'],
  };
  "Sprite2D/AnimationPlayer/Body": {
    [__node_type]: Sprite2D;
    [__node_parent]: _PlayerTscn_Tree['Sprite2D/AnimationPlayer'];
    [__node_children]: [
      _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body/Armor']
    ];
    "Armor": _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body/Armor'],
  }
  "Sprite2D/AnimationPlayer/Body/Armor": {
    [__node_type]: Sprite2D;
    [__node_parent]: _PlayerTscn_Tree['Sprite2D/AnimationPlayer/Body'];
    [__node_children]: [];
  }
  CollisionShape2D: {
    [__node_type]: CollisionShape2D;
    [__node_parent]: _PlayerTscn_Tree;
    [__node_children]: []
  };
  HealthBar: {
    [__node_type]: ProgressBar;
    [__node_parent]: _PlayerTscn_Tree;
    [__node_children]: []
  };
  '%HealthBar': _PlayerTscn_Tree['HealthBar']
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
    "res://Player.tscn": _PlayerTscn_Tree['Sprite2D/AnimationPlayer']
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
    "res://Player.tscn": PackedScene<TreeNode<_PlayerTscn_Tree>>;
  }
}

export {};
