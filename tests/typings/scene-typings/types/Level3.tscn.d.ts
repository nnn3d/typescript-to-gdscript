// AUTO-GENERATED — do not edit manually.

type _Level3Tscn_ALevel_Level3Label = {
  [__node_type]: Label;
  [__node_parent]: _Level3Tscn_ALevel;
  [__node_children]: [];
};

type _Level3Tscn_ALevel = {
  [__node_extends]: _GodotSceneTrees["res://ALevel.tscn"];
  [__node_root]: "ALevel";
  [__node_type]: _GodotSceneTrees["res://ALevel.tscn"][typeof __node_type];
  [__node_parent]: _Level3Tscn_Tree;
  [__node_children]: [_Level3Tscn_ALevel_Level3Label];
  "Level3Label": _Level3Tscn_ALevel_Level3Label;
};

type _Level3Tscn_OwnChild = {
  [__node_type]: Sprite2D;
  [__node_parent]: _Level3Tscn_Tree;
  [__node_children]: [];
};

type _Level3Tscn_Tree = {
  [__node_root]: "Level3";
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Level3.gd">;
  [__node_parent]: _GDGetInterfaceParent<__Level3Tscn__Parents>;
  [__node_children]: [_Level3Tscn_ALevel, _Level3Tscn_OwnChild];
  "ALevel": _Level3Tscn_ALevel;
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