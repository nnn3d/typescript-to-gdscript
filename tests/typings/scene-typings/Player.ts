import type { __CLASS__ as Anonym } from './Anonym.ts';
import type { __CLASS__ as Anonym2 } from './Anonym2.ts';
import type { __CLASS__ as AnonymNested } from './nested/Anonym.ts';
import type { __CLASS__ as GameManagerType } from './GameManager.ts';

export class Player extends CharacterBody2D {
  AnonymField: Anonym = load('res://Anonym.gd');

  Anonym2Field: Anonym2 = load('res://Anonym2.gd');

  AnonymNestedField: AnonymNested = load('res://nested/Anonym.gd');

  BallField: Ball = load('res://Ball.gd');

  PlayerPackedScene: PackedScene<Player> = load('res://Player.tscn');

  _ready() {
    // get_node_or_null: known path → exact type | null (not just Node | null)
    let sprite = this.get_node_or_null('Sprite2D');
    const _checkSprite: IsExact<typeof sprite, Sprite2D | null> = true;

    // get_node_or_null: unknown path → Node | null
    let node_or_null = this.get_node_or_null('Unknown');
    const _checkNodeOrNull: IsExact<typeof node_or_null, Node | null> = true;

    // get_node: known path → exact type (no null)
    let collision = this.get_node('CollisionShape2D');
    const _checkCollision: IsExact<typeof collision, CollisionShape2D> = true;

    // get_node: unknown path → Node
    let unknown = this.get_node('Unknown');
    const _checkUnknown: IsExact<typeof unknown, Node> = true;

    // get_node: unique node via %Name → exact type
    let health = this.get_node('%HealthBar');
    const _checkHealth: IsExact<typeof health, ProgressBar> = true;

    this.get_tree().change_scene_to_file('res://Anonym.tscn');

    // Autoload global singleton — GameManager is declared globally from project.godot [autoload]
    let manager: GameManagerType = GameManager;
    manager.reset_game();
    let score: int = GameManager.get_score();
  }
}
