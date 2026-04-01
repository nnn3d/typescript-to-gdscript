// AUTO-GENERATED — do not edit manually.

type _Level1Tscn_ExtraSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level1Tscn_Tree;
  [__node_children]: [];
};

type _Level1Tscn_Tree = {
  [__node_root]: true;
  [__node_type]: Node;
  [__node_parent]: _GDGetInterfaceParent<__Level1Tscn__Parents>;
  [__node_children]: [_Level1Tscn_ExtraSprite];
  "ExtraSprite": _Level1Tscn_ExtraSprite;
};

declare global {
  interface __Level1Tscn__Parents {}

  interface _GodotSceneTrees {
    "res://Level1.tscn": _Level1Tscn_Tree;
  }
  interface GodotResources {
    "res://Level1.tscn": PackedScene<_GDTreeNode<_Level1Tscn_Tree>>;
  }
}

export {}