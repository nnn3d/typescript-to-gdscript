export class Level extends Node2D {
  _ready() {
    // get_node for instanced scene root → script class with get_parent() intersection
    let player = this.get_node('Player');
    let _player: Player = player;

    // get_node for another instanced scene
    let enemy = this.get_node('Enemy');
    let _enemy: Enemy = enemy;

    // get_node for instanced scene without script → root node Godot type
    let tileset = this.get_node('TilesetObjects');
    let _tileset: TileMap = tileset;

    // get_node for regular child → Godot built-in with [__parent]
    let bg = this.get_node('Background');
    let _bg: Sprite2D = bg;

    // get_node for nested path → CanvasLayer child
    let scoreLabel = this.get_node('UI/ScoreLabel');
    let _sl: Label = scoreLabel;

    // get_node_or_null for instanced scene root
    let playerOrNull = this.get_node_or_null('Player');
    let _playerOrNull: Player | null = playerOrNull;

    // get_parent() on instanced scene child resolves to Level via module augmentation
    let playerParent = player.get_parent();
    let _playerParentCheck: Level = playerParent;

    // get_parent() on a Godot built-in child resolves to script class via [__parent]
    let bgParent = bg.get_parent();
    let _levelRef: Level = bgParent;

    // get_parent() on nested child resolves to intermediate node type
    let scoreLabelParent = scoreLabel.get_parent();
    let _canvasRef: CanvasLayer = scoreLabelParent;
  }
}
