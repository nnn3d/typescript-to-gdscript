import type { __CLASS__ as Anonym } from './Anonym.ts';
import type { __CLASS__ as Anonym2 } from './Anonym2.ts';
import type { __CLASS__ as AnonymNested } from './nested/Anonym.ts';

export class Player extends CharacterBody2D {
  AnonymField: Anonym = load('res://Anonym.gd');

  Anonym2Field: Anonym2 = load('res://Anonym2.gd');

  AnonymNestedField: AnonymNested = load('res://nested/Anonym.gd');

  BallField: Ball = load('res://Ball.gd');

  PlayerPackedScene: PackedScene<Player> = load('res://Player.tscn');

  _ready() {
    // get_node_or_null normally returns T | null, but scene overload returns Sprite2D directly
    let sprite: Sprite2D | null = this.get_node_or_null('Sprite2D');
    let node_or_null: Node | null = this.get_node_or_null('Unknown');
    // get_node also has typed overload
    let collision: CollisionShape2D = this.get_node('CollisionShape2D');
    // Unknown path for get_node returns Node
    let unknown: Node = this.get_node('Unknown');
  }
}
