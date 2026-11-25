export class ForContinueStep extends Node {
  // The step goes out twice, at the `continue` and at the end of the body.
  // Its error is still one error.
  run(k: int) {
    for (let i: int = 0; i < 3; k = k >>> 1) {
      if (k === 1) continue;
    }
  }
}
