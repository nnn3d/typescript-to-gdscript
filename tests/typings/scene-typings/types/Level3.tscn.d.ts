// AUTO-GENERATED — do not edit manually.

type _Level3Tscn_OwnChild = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level3Tscn_Tree;
  [__node_children]: [];
};

type _ALevelTscn_Tree = _GodotSceneTrees["res://ALevel.tscn"];

type _Level3Tscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Level3.gd">;
  [__node_parent]: _GDGetInterfaceParent<__Level3Tscn__Parents>;
  [__node_children]: [_ALevelTscn_Tree, _Level3Tscn_OwnChild];
  "ALevel": _ALevelTscn_Tree;
  "OwnChild": _Level3Tscn_OwnChild;
};

declare global {
  interface __Level3Tscn__Parents {}

  interface __Level3Gd__Trees {
    "res://Level3.tscn": _Level3Tscn_Tree;
  }

  // Instanced scene parents
  interface __ALevelTscn__Parents { "res://Level3.tscn": _Level3Tscn_Tree; }

  interface _GodotSceneTrees {
    "res://Level3.tscn": _Level3Tscn_Tree;
  }
  interface GodotResources {
    "res://Level3.tscn": PackedScene<_GDTreeNode<_Level3Tscn_Tree>>;
  }
}

export {}