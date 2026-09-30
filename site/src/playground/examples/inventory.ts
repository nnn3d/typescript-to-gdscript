// An inventory with stacking, a fixed number of slots, and signals the UI
// can listen to. Items are an inner class; slots are a typed array.
export namespace Inventory {
  export class Item extends RefCounted {
    id: StringName = StringName('');
    display_name: string = '';
    max_stack: int = 1;

    constructor(id: StringName, display_name: string, max_stack: int = 1) {
      this.id = id;
      this.display_name = display_name;
      this.max_stack = max_stack;
    }
  }

  export class Slot extends RefCounted {
    item: Inventory.Item | null = null;
    count: int = 0;

    is_empty(): boolean {
      return this.item === null || this.count === 0;
    }

    space_for(item: Inventory.Item): int {
      if (this.is_empty()) {
        return item.max_stack;
      }
      if (this.item !== null && this.item.id === item.id) {
        return item.max_stack - this.count;
      }
      return 0;
    }
  }
}

export class Inventory extends Node {
  slot_changed = gd.signal<[index: int]>();
  inventory_full = gd.signal<[item_id: StringName, left_over: int]>();

  @export_range(1, 64) slot_count: int = 16;

  slots: Inventory.Slot[] = [];

  _ready() {
    for (let i of range(this.slot_count)) {
      this.slots.append(new Inventory.Slot());
    }
  }

  /** Adds up to `amount` items and returns how many did not fit. */
  add(item: Inventory.Item, amount: int = 1): int {
    let left = amount;

    // Top up existing stacks first, then fill empty slots.
    left = this.fill(item, left, false);
    left = this.fill(item, left, true);

    if (left > 0) {
      this.inventory_full.emit(item.id, left);
    }
    return left;
  }

  fill(item: Inventory.Item, amount: int, empty_slots: boolean): int {
    let left = amount;
    for (let index of range(this.slots.size())) {
      if (left === 0) {
        break;
      }
      let slot = this.slots[index];
      if (slot.is_empty() !== empty_slots) {
        continue;
      }
      let moved = mini(slot.space_for(item), left);
      if (moved > 0) {
        slot.item = item;
        slot.count += moved;
        left -= moved;
        this.slot_changed.emit(index);
      }
    }
    return left;
  }

  /** Removes up to `amount` items with this id; returns how many were removed. */
  remove(item_id: StringName, amount: int = 1): int {
    let removed = 0;
    for (let index of range(this.slots.size())) {
      let slot = this.slots[index];
      if (slot.item === null || slot.item.id !== item_id) {
        continue;
      }
      let taken = mini(slot.count, amount - removed);
      slot.count -= taken;
      removed += taken;
      if (slot.count === 0) {
        slot.item = null;
      }
      this.slot_changed.emit(index);
      if (removed === amount) {
        break;
      }
    }
    return removed;
  }

  count_of(item_id: StringName): int {
    let total = 0;
    for (let slot of this.slots) {
      if (slot.item !== null && slot.item.id === item_id) {
        total += slot.count;
      }
    }
    return total;
  }
}
