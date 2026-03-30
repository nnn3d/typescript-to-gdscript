import type {__CLASS__ as Enemy} from './Enemy.js'

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

    let level2Scene = preload('res://Level2.tscn');
    let level2 = level2Scene.instantiate();
    let _level2Sprite: Sprite2D = level2.get_node('ExtraSprite');
    let _level2Level: Level = level2.get_parent();

    let tileMapScene = preload('res://TilesetObjects.tscn');
    let tileMap = tileMapScene.instantiate();
    let _tileMapLevel: Level = tileMap.get_parent();

    // Deep path through scriptless scene: Level2/ExtraSprite → Sprite2D
    let deepChildSceneNode = this.get_node('Level2/ExtraSprite');
    let _deepChildCheck: Sprite2D = deepChildSceneNode;

    // Deep path through scripted scene: Player/HealthBar → ProgressBar
    let deepScriptSceneNode = this.get_node('Player/HealthBar');
    let _deepScriptCheck: ProgressBar = deepScriptSceneNode;

    // get_parent() on deep path result: HealthBar's parent is Player
    let playerFromChild: Player = deepScriptSceneNode.get_parent();

    let t = this.get_node('UI/ScoreLabel');

    let checkDeepTree1: Label = this.get_node('UI/ScoreLabel').get_parent().get_node('ScoreLabel');
    let checkDeepTree2: Sprite2D = this.get_node('UI/ScoreLabel').get_node('ScoreSprite');
    let checkDeepTree3: Label = this.get_node('UI/ScoreLabel').get_node('ScoreSprite').get_parent();

    // get_child: typed by index on intermediate node (UI has 1 child: ScoreLabel)
    let uiChild0: Label = this.get_node('UI').get_child(0);
    // get_child on ScoreLabel (1 child: ScoreSprite)
    let scoreLabelChild0: Sprite2D = this.get_node('UI/ScoreLabel').get_child(0);
  }
}
