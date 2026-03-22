export class Ball extends Node {
  do_from_ball() {
    // Ball.gd is used in BallA.tscn (Sprite2D, Timer) and BallB.tscn (Sprite2D, Label)

    // get_node: path in both scenes with same type → exact type (no null)
    let sprite = this.get_node('Sprite2D');
    const _checkSprite: IsExact<typeof sprite, Sprite2D> = true;

    // get_node: path only in one scene → Type | null (nullable because missing in other scene)
    let timer = this.get_node('Timer');
    const _checkTimer: IsExact<typeof timer, Timer | null> = true;

    let label = this.get_node('Label');
    const _checkLabel: IsExact<typeof label, Label | null> = true;

    // get_node_or_null: path in both scenes → Type | null
    let spriteOrNull = this.get_node_or_null('Sprite2D');
    const _checkSpriteOrNull: IsExact<typeof spriteOrNull, Sprite2D | null> = true;

    // get_node_or_null: path only in one scene → Type | null (already nullable)
    let timerOrNull = this.get_node_or_null('Timer');
    const _checkTimerOrNull: IsExact<typeof timerOrNull, Timer | null> = true;
  }
}
