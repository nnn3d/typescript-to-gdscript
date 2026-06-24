export class ReservedWords extends Node {
  handle(delete_: int): void {
    let default_ = delete_ + 1;
    for (let function_ of [1, 2, 3]) {
      print(function_, default_);
    }
    push_error(`line one
line two`);
  }
}
