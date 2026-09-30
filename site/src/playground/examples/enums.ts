export namespace Door {
  export const OPEN_TIME = 2.0;

  export enum State {
    CLOSED,
    OPENING,
    OPEN,
  }
}

// A namespace merged with the class holds its constants, enums and
// inner classes.
export class Door extends Node3D {
  state: Door.State = Door.State.CLOSED;

  open() {
    if (this.state === Door.State.CLOSED) {
      this.state = Door.State.OPENING;
    }
  }
}
