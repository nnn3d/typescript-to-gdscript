export class Ball extends Node {
  do_from_ball() {
    // Ball.gd is used in BallA.tscn (Sprite2D, Label:Sprite2D, Timer) and BallB.tscn (Sprite2D, Label:Label)
    // Multiple scenes → type helpers distribute over union trees

    // get_node: path in both scenes with same type → union of identical types
    let sprite = this.get_node('Sprite2D');
    let _spriteAssign: Sprite2D = sprite;

    // get_node: path only in one scene → null from missing tree, NonNullable<T> | null
    let timer = this.get_node('Timer');
    let _timerAssign: Timer | null = timer;

    // get_node: path in both scenes with different types → union of both types
    let label = this.get_node('Label');
    let _labelAssign: Sprite2D | Label = label;

    // get_node_or_null: path in both scenes → Type | null
    let spriteOrNull = this.get_node_or_null('Sprite2D');
    let _checkSpriteOrNull: Sprite2D | null = spriteOrNull;

    // get_node_or_null: path only in one scene → Timer | null
    let timerOrNull = this.get_node_or_null('Timer');
    let _timerOrNullAssign: Timer | null = timerOrNull;

    // get_parent() on a child resolves to Ball (script class) via [__node_parent]
    let spriteParent = sprite.get_parent();
    let _parentCheck: Ball = spriteParent;
  }
}
