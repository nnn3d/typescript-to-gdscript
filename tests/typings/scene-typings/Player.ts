import type { __CLASS__ as Anonym } from './Anonym.ts';
import type { __CLASS__ as Anonym2 } from './Anonym2.ts';
import type { __CLASS__ as AnonymNested } from './nested/Anonym.ts';
import type { __CLASS__ as GameManagerType } from './GameManager.ts';

export class Player extends BaseCharacter {
  static TEST_ENUM = gd.enum('TEST', 'TEST2');

  AnonymScript: typeof Anonym = load('res://Anonym.gd');

  Anonym2Script: typeof Anonym2 = load('res://Anonym2.gd');

  AnonymNestedScript: typeof AnonymNested = load('res://nested/Anonym.gd');

  BallScript: typeof Ball = load('res://Ball.gd');

  PlayerPackedScene: PackedScene<Player> = load('res://Player.tscn');

  _ready() {
    // get_node_or_null: known path → Godot type | null
    let sprite = this.get_node_or_null('Sprite2D');
    let _checkSprite: Sprite2D | null = sprite;

    // get_node_or_null: unknown path → Node | null
    let node_or_null = this.get_node_or_null('Unknown');
    let _checkNodeOrNull: Node | null = node_or_null;

    // get_node: known path → Godot type (no null)
    let collision = this.get_node('CollisionShape2D');
    let _checkCollision: CollisionShape2D = collision;

    // get_node: unknown path → Node | null
    let unknown = this.get_node('Unknown');
    let _checkUnknown: Node | null = unknown;

    // get_node: unique node via %Name → Godot type
    let health = this.get_node('%HealthBar');
    let _healthAssign: ProgressBar = health;

    // get_parent() on a Godot built-in child resolves to script class via [__node_parent]
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

    // get_child: typed by index (scene order: 0=Sprite2D, 1=CollisionShape2D, 2=HealthBar)
    let child0: Sprite2D = this.get_child(0);
    let child1: CollisionShape2D = this.get_child(1);
    let child2: ProgressBar = this.get_child(2);
    // Unknown index falls back to Node
    let childUnknown: Node = this.get_child(99);

    const thisEnum: number = this.TEST_ENUM.TEST;
  }
}
