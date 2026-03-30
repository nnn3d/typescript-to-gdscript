import type { __CLASS__ as PlayerChild } from './PlayerChild.js';

export class Player extends Node {
  AnonymScript: typeof PlayerChild = load('res://PlayerChild.gd');

  _ready() {
    // get_node_or_null: known path → typed node | null
    let sprite = this.get_node_or_null('Sprite2D');
    let _spriteAssign: Sprite2D = sprite;

    // get_node_or_null: unknown path → Node | null
    let node_or_null = this.get_node_or_null('Unknown');
    const _checkNodeOrNull: IsExact<typeof node_or_null, Node | null> = true;

    // get_node: known path → typed node | null
    let collision = this.get_node('CollisionShape2D');
    let _collisionAssign: CollisionShape2D | null = collision;

    // get_node: unknown path → Node | null
    let unknown = this.get_node('Unknown');
    const _checkUnknown: IsExact<typeof unknown, Node | null> = true;

    // get_node: unique node via %Name → typed node | null
    let health = this.get_node('%HealthBar');
    let _healthAssign: ProgressBar | null = health;

    // get_parent() on a Godot built-in child resolves to script class via [__node_parent]
    let spriteNode = this.get_node('Sprite2D');
    let parent = spriteNode.get_parent();
    let _parentCheck: Player = parent;

    // Nested path: AnimationPlayer's parent is Sprite2D (not Player)
    let anim = this.get_node('Sprite2D/AnimationPlayer');
    let animParent = anim.get_parent();
    let _animParentCheck: Sprite2D = animParent;

    // get_child: typed by index (scene order: 0=Sprite2D, 1=CollisionShape2D, 2=HealthBar)
    let child0: Sprite2D = this.get_child(0);
    let child1: CollisionShape2D = this.get_child(1);
    let child2: ProgressBar = this.get_child(2);
    // Unknown index falls back to Node
    let childUnknown: Node = this.get_child(99);
  }
}
