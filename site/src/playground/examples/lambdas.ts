// Arrow functions become GDScript lambdas (Callables).
export class Scoreboard extends Node {
  scores: int[] = [120, 45, 300, 80];

  _ready() {
    let doubled = this.scores.map((score: int): int => score * 2);
    let high = this.scores.filter((score: int): boolean => score > 100);
    print(doubled, high);

    // A lambda can be connected to a signal directly.
    this.get_tree().process_frame.connect(() => {
      print('first frame');
    }, Object.CONNECT_ONE_SHOT);
  }

  // A field holding a lambda is called like a method.
  format_score = (score: int): string => {
    return 'Score: ' + str(score);
  };
}
