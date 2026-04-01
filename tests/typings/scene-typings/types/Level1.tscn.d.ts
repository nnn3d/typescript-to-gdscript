// AUTO-GENERATED — do not edit manually.

type _Level1Tscn_ExtraSprite = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level1Tscn_Tree;
  [__node_children]: [];
};

type _Level1Tscn_Tree = {
  [__node_extends]: GodotSceneTrees["res://Level.tscn"];
  [__node_root]: "Level";
  [__node_type]: _GDTreeGetType<GodotSceneTrees["res://Level.tscn"]>;
  [__node_parent]: _GDGetInterfaceParent<__Level1Tscn__Parents>;
  [__node_children]: [_Level1Tscn_ExtraSprite];
  "ExtraSprite": _Level1Tscn_ExtraSprite;
};

declare global {
  interface __Level1Tscn__Parents {}

  interface GodotSceneTrees {
    "res://Level1.tscn": _Level1Tscn_Tree;
  }
  interface GodotResources {
    "res://Level1.tscn": PackedScene<_GDTreeNode<_Level1Tscn_Tree>>;
  }
}

export {}