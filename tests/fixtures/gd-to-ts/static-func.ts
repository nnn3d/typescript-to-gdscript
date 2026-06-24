export namespace Factory {
  export const MAX_ID = 100;
  export enum Kind { BASIC, ADVANCED }
  export class Blueprint extends RefCounted {
    label: string = "";
  }
}

export class Factory extends RefCounted {
  static count: int = 0;
  id: int;

  static create(id: int): Factory {
    let f = new Factory();
    f.id = id;
    return f;
  }

  clone_via_factory(): Factory {
    return Factory.create(this.id);
  }

  static async wait_for(sig: Signal): Promise<void> {
    await sig;
  }

  static async make_async(sig: Signal): Promise<Factory> {
    await sig;
    return new Factory();
  }

  static reset() {
    Factory.count = 0;
  }

  static async ping(sig: Signal) {
    await sig;
  }

  describe(): string {
    let k: Factory.Kind = Factory.Kind.BASIC;
    let limit = Factory.MAX_ID;
    let n = Factory.count;
    let bp: Factory.Blueprint = new Factory.Blueprint();
    return str(n);
  }
}
