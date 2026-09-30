// `gd.match` reaches the patterns a `switch` can't: bindings and wildcards.
export class Command extends Node {
  run(command: Array<string>) {
    gd.match(command.size(), [
      {
        match: 0,
        do: () => {
          print('empty command');
        },
      },
      (count) => ({
        match: count,
        do: () => {
          print(count, ' words');
        },
      }),
    ]);
  }
}
