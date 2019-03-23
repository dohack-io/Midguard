import { Subject } from 'rxjs';
import { Inventory } from '../entities/Inventory';

import invJson from '../MockData/Inventory.json';
import { Item } from '../entities/Item';

export class InventoryService {
  private inventory: Inventory = invJson;
  private inventoryAnnouncer: Subject<string>;
  private allItems: Item[] = [
    { id: 2, name: 'Metal', amount: 0, icon: 'metal.png' },
    { id: 3, name: 'Wood', amount: 0, icon: 'wood.png' },
    { id: 4, name: 'Hammer', amount: 0, icon: 'hammer.png' }
  ];

  getInventoryAnnouncer(): Subject<string> {
    if (this.inventoryAnnouncer == null) {
      this.inventoryAnnouncer = new Subject<string>();
    }
    return this.inventoryAnnouncer;
  }

  addItem(item: Item): void {
    for (const invItem of this.inventory.items) {
      if (invItem.id === item.id) {
        invItem.amount += item.amount;
        return;
      }
    }
    this.inventory.items.push(item);
    this.inventoryAnnouncer.next(' + ' + item.amount + ' ' + item.name);
  }

  getRandomLoot(): Item[] {
    // TODO: Get from Server
    // TODO: Randomize
    const wood = new Item();
    wood.name = 'Wood';
    wood.amount = 5;
    const metal = new Item();
    metal.name = 'Metal';
    metal.amount = 5;
    const food = new Item();
    food.name = 'Food';
    food.amount = 5;
    return [wood, metal, food];
  }

  getInventory(): Inventory {
    // TODO: Get from Server
    return this.inventory;
  }

  getItemNames(): string[] {
    return ['Wood', 'Food', 'Metal'];
  }

  getBuyInventory(): Inventory {
    const items = this.getInventory().items;
    const inv = new Inventory();
    inv.items = items.slice(0, 2);
    return inv;
  }

  getPriceOfItem(item: Item): number {
    return 5;
  }

  sellItem(item: Item, amount: number) {
    const index = this.inventory.items.indexOf(item);
    this.inventory.items[index].amount -= amount;
  }

  buyItem(item: Item, amount: number) {
    const index = this.inventory.items.indexOf(item);
    this.inventory.items[index].amount += amount;
  }

  containsItems(items: Item[]) {
    for (const item of items) {
      let index = -1;
      for (let i = 0; i < this.getInventory().items.length; i++) {
        if (this.getInventory().items[i].id === item.id) {
          index = i;
        }
      }
      if (index === -1) {
        return false;
      }
      if (this.getInventory().items[index].amount < item.amount) {
        return false;
      }
    }
    return true;
  }

  removeItems(items: Item[]): void {
    for (const item of items) {
      let index = -1;
      for (let i = 0; i < this.getInventory().items.length; i++) {
        if (this.getInventory().items[i].id === item.id) {
          index = i;
        }
      }
      if (index !== -1) {
        this.getInventory().items[index].amount -= item.amount;
      }
    }
  }

  getItemById(id: number) {
    for (const item of this.allItems) {
      if (item.id === id) {
        return item;
      }
    }
  }

  getAllItems(): Item[] {
    return this.allItems;
  }
}
