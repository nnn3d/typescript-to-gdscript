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
    let _canvasRef: LevelUI = scoreLabelParent;

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

    // Chained get_node on intermediate TreeNode results
    let scoreLabelNode = this.get_node('UI/ScoreLabel');
    // Test inferred type directly
    let checkDeepTree2: Sprite2D = scoreLabelNode.get_node('ScoreSprite');

    // get_child: typed by index on intermediate node
    let uiNode = this.get_node('UI');
    let uiChild0: Label = uiNode.get_child(0);

    // Group-typed methods: autocomplete for group names, typed return values
    let entities: Array<Player | Enemy> = this.get_tree().get_nodes_in_group('entities');
    let damageable: Array<Player | Enemy | Sprite2D> = this.get_tree().get_nodes_in_group('damageable');
    let firstEntity: Player | Enemy = this.get_tree().get_first_node_in_group('entities');

    // Unknown group falls back to Array<Node>
    let unknown: Array<Node> = this.get_tree().get_nodes_in_group('nonexistent');

    // Node group methods also get autocomplete
    this.add_to_group('entities');
    let inGroup: boolean = this.is_in_group('entities');

    // Absolute /root/ paths — resolve from root scene tree
    let rootPlayer: Player = this.get_node('/root/Level/Player');
    let rootBg: Sprite2D = this.get_node('/root/Level/Background');
    let rootScoreLabel: Label = this.get_node('/root/Level/UI/ScoreLabel');
    // /root/Level itself → the root scene node (Level)
    let rootSelf: Level = this.get_node('/root/Level');
  }
}
