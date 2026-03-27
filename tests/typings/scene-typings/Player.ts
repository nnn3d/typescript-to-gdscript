import type { __CLASS__ as Anonym } from './Anonym.ts';
import type { __CLASS__ as Anonym2 } from './Anonym2.ts';
import type { __CLASS__ as AnonymNested } from './nested/Anonym.ts';
import type { __CLASS__ as GameManagerType } from './GameManager.ts';

export class Player extends CharacterBody2D {
  AnonymScript: typeof Anonym = load('res://Anonym.gd');

  Anonym2Script: typeof Anonym2 = load('res://Anonym2.gd');

  AnonymNestedScript: typeof AnonymNested = load('res://nested/Anonym.gd');

  BallScript: typeof Ball = load('res://Ball.gd');

  PlayerPackedScene: PackedScene<Player> = load('res://Player.tscn');

  _ready() {
    // get_node_or_null: known path → Godot type with [__parent] | null
    let sprite = this.get_node_or_null('Sprite2D');
    const _checkSprite: IsExact<typeof sprite, Sprite2D | null> = true;

    // get_node_or_null: unknown path → Node | null
    let node_or_null = this.get_node_or_null('Unknown');
    const _checkNodeOrNull: IsExact<typeof node_or_null, Node | null> = true;

    // get_node: known path → Godot type with [__parent] (no null)
    let collision = this.get_node('CollisionShape2D');
    const _checkCollision: IsExact<typeof collision, CollisionShape2D> = true;

    // get_node: unknown path → Node
    let unknown = this.get_node('Unknown');
    const _checkUnknown: IsExact<typeof unknown, Node> = true;

    // get_node: unique node via %Name → Godot type with [__parent]
    let health = this.get_node('%HealthBar');
    let _healthAssign: ProgressBar = health;

    // get_parent() on a Godot built-in child resolves to script class via [__parent]
    let spriteNode = this.get_node('Sprite2D');
    let parent = spriteNode.get_parent();
    let _parentCheck: Player = parent;

    // Nested path: AnimationPlayer's parent is Sprite2D (not Player)
    let anim = this.get_node('Sprite2D/AnimationPlayer');
    let animParent = anim.get_parent();
    let _animParentCheck: Sprite2D = animParent;

    this.get_tree().change_scene_to_file('res://Anonym.tscn');

    // Autoload global singleton — GameManager is declared globally from project.godot [autoload]
    let manager: GameManagerType = GameManager;
    manager.reset_game();
    let score: int = GameManager.get_score();

    let Ball = preload('res://Ball.gd');
    let ball = new Ball();
    ball.do_from_ball();
  }
}
