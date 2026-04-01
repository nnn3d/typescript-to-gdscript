// AUTO-GENERATED — do not edit manually.

type _AnonymTscn_Sprite2D_AnimationPlayer = {
  [__node_type]: AnimationPlayer;
  [__node_parent]: _AnonymTscn_Sprite2D;
  [__node_children]: [];
};

type _AnonymTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _AnonymTscn_Tree;
  [__node_children]: [_AnonymTscn_Sprite2D_AnimationPlayer];
  "AnimationPlayer": _AnonymTscn_Sprite2D_AnimationPlayer;
};

type _AnonymTscn_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _AnonymTscn_Tree;
  [__node_children]: [];
};

type _AnonymTscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Anonym.gd">;
  [__node_parent]: _GDGetInterfaceParent<__AnonymTscn__Parents>;
  [__node_children]: [_AnonymTscn_Sprite2D, _AnonymTscn_CollisionShape2D];
  "Sprite2D": _AnonymTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _AnonymTscn_Sprite2D_AnimationPlayer;
  "CollisionShape2D": _AnonymTscn_CollisionShape2D;
};

declare global {
  interface __AnonymTscn__Parents {}

  interface __AnonymGd__Trees {
    "res://Anonym.tscn": _AnonymTscn_Tree;
  }

  interface _GodotSceneTrees {
    "res://Anonym.tscn": _AnonymTscn_Tree;
  }
  interface GodotResources {
    "res://Anonym.tscn": PackedScene<_GDTreeNode<_AnonymTscn_Tree>>;
  }
}

export {}