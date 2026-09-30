// Classes exported from a namespace merged with the script class become
// inner classes. A constructor becomes `_init`.
export namespace Quests {
  export class Quest extends RefCounted {
    title: string = '';
    done: boolean = false;

    constructor(title: string) {
      this.title = title;
    }
  }
}

export class Quests extends Node {
  quests: Quests.Quest[] = [];

  add(title: string) {
    this.quests.append(new Quests.Quest(title));
  }

  complete(title: string) {
    for (let quest of this.quests) {
      if (quest.title === title) {
        quest.done = true;
      }
    }
  }
}
