export class Ball extends Node {
  do_from_ball() {
    // Ball.gd is used in BallA.tscn (Sprite2D, Timer) and BallB.tscn (Sprite2D, Label)

    // get_node: path in both scenes with same type → Godot type with [__parent] (no null)
    let sprite = this.get_node('Sprite2D');
    let _spriteAssign: Sprite2D = sprite;

    // get_node: path only in one scene → with per-file extends, type comes from that scene (no null)
    let timer = this.get_node('Timer');
    let _timerAssign: Timer = timer;

    let label = this.get_node('Label');
    let _labelAssign: Label = label;

    // get_node_or_null: path in both scenes → Type | null
    let spriteOrNull = this.get_node_or_null('Sprite2D');
    const _checkSpriteOrNull: IsExact<typeof spriteOrNull, Sprite2D | null> = true;

    // get_node_or_null: path only in one scene → Type | null (already nullable)
    let timerOrNull = this.get_node_or_null('Timer');
    let _timerOrNullAssign: IsExact<typeof timerOrNull, Timer | null> = true;

    // get_parent() on a child resolves to Ball (script class) via [__parent]
    let spriteParent = sprite.get_parent();
    let _parentCheck: IsExact<typeof spriteParent, Ball> = true;
  }
}
