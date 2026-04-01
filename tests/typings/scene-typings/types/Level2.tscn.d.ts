// AUTO-GENERATED — do not edit manually.

type _Level2Tscn_ExtraSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level2Tscn_Tree;
  [__node_children]: [];
};

type _Level2Tscn_Tree = {
  [__node_root]: true;
  [__node_type]: Node;
  [__node_parent]: _GDGetInterfaceParent<__Level2Tscn__Parents>;
  [__node_children]: [_Level2Tscn_ExtraSprite];
  "ExtraSprite": _Level2Tscn_ExtraSprite;
};

declare global {
  interface __Level2Tscn__Parents {}

  interface _GodotSceneTrees {
    "res://Level2.tscn": _Level2Tscn_Tree;
  }
  interface GodotResources {
    "res://Level2.tscn": PackedScene<_GDTreeNode<_Level2Tscn_Tree>>;
  }
}

export {}