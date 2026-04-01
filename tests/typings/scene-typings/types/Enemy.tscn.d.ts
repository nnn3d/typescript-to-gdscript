// AUTO-GENERATED — do not edit manually.

// Enemy.tscn tree:
//   Enemy (CharacterBody2D, script: Enemy.gd)
//     Sprite2D
//       AnimationPlayer
//     HitBox (Area2D)
//       CollisionShape2D

type _EnemyTscn_Sprite2D = {
  [__node_type]: Sprite2D;
  [__node_parent]: _EnemyTscn_Tree;
  [__node_children]: [_EnemyTscn_Sprite2D_AnimationPlayer];
  "AnimationPlayer": _EnemyTscn_Sprite2D_AnimationPlayer;
};

type _EnemyTscn_Sprite2D_AnimationPlayer = {
  [__node_type]: AnimationPlayer;
  [__node_parent]: _EnemyTscn_Sprite2D;
  [__node_children]: [];
};

type _EnemyTscn_HitBox = {
  [__node_type]: Area2D;
  [__node_parent]: _EnemyTscn_Tree;
  [__node_children]: [_EnemyTscn_HitBox_CollisionShape2D];
  "CollisionShape2D": _EnemyTscn_HitBox_CollisionShape2D;
};

type _EnemyTscn_HitBox_CollisionShape2D = {
  [__node_type]: CollisionShape2D;
  [__node_parent]: _EnemyTscn_HitBox;
  [__node_children]: [];
};

type _EnemyTscn_Tree = {
  [__node_root]: true;
  [__node_type]: _GDGetInterfaceNode<_GodotScripts, "res://Enemy.gd">;
  [__node_parent]: _GDGetInterfaceParent<__EnemyTscn__Parents>;
  [__node_children]: [_EnemyTscn_Sprite2D, _EnemyTscn_HitBox];
  "Sprite2D": _EnemyTscn_Sprite2D;
  "Sprite2D/AnimationPlayer": _EnemyTscn_Sprite2D_AnimationPlayer;
  "HitBox": _EnemyTscn_HitBox;
  "HitBox/CollisionShape2D": _EnemyTscn_HitBox_CollisionShape2D;
};

interface __EnemyTscn__Parents {}

interface __EnemyGd__Trees {
  "res://Enemy.tscn": _EnemyTscn_Tree;
}

// BaseCharacter is a parent class of Enemy
// interface __BaseCharacterGd__Trees {
//   "res://Enemy.tscn": _EnemyTscn_Tree;
// }

interface _GodotScripts {
  "res://Enemy.gd": Enemy;
}

interface _GodotSceneTrees {
  "res://Enemy.tscn": _EnemyTscn_Tree;
}
interface GodotResources {
  "res://Enemy.tscn": PackedScene<_GDTreeNode<_EnemyTscn_Tree>>;
}
