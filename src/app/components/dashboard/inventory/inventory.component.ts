import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/userService";
import {InventoryService} from "../../../services/inventoryService";
import {User} from "../../../entities/User";
import {Inventory} from "../../../entities/Inventory";
import {Observable, of} from "rxjs";
import {Item} from "../../../entities/Item";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private userService: UserService,
              private inventoryService: InventoryService
  ) {
  }

  user: User;
  inventory: Inventory;
  displayedInventory: Item[];

  searchStr = "";
  suggestions = [];

  displayTradeTabs = false;
  selectedTab = "Inventory";
  tradeBtnText = "Trade";

  sellItem: Item;
  buyItem: Item;
  tradeAmount = 0;
  displaySellDialog = false;
  displayBuyDialog = false;

  ngOnInit() {
    this.user = this.userService.getUser();
    this.inventory = this.inventoryService.getInventory();
    this.displayedInventory = this.inventory.items;
  }

  private getItemNames(): string[] {
    return this.inventoryService.getItemNames();
  }

  search() {
    if (this.selectedTab != "Buy" ) {
      this.suggestions = this.getItemNames().filter((str: string) => str.toLowerCase().includes(this.searchStr.toLowerCase()));
      this.inventory = this.inventoryService.getInventory();
      this.displayedInventory = this.inventory.items.filter(
        (item) => item.name.toLowerCase().includes(this.searchStr.toLowerCase()));
    } else {
      this.suggestions = this.getItemNames().filter((str: string) => str.toLowerCase().includes(this.searchStr.toLowerCase()));
      this.displayedInventory = this.inventoryService.getBuyInventory().items.filter(
        (item) => item.name.toLowerCase().includes(this.searchStr.toLowerCase()));
    }
  }

  toggleTrade() {
    if (this.selectedTab == "Inventory") {
      this.selectedTab = "Sell";
      this.displayTradeTabs = true;
      this.tradeBtnText = "Cancel";
      this.search();
    } else {
      this.selectedTab = "Inventory";
      this.displayTradeTabs = false;
      this.tradeBtnText = "Trade";
      this.search();
    }
  }

  tabSelected(tab: string) {
    this.selectedTab = tab;
    this.search();
  }

  getPrice(item: Item): number {
    return this.inventoryService.getPriceOfItem(item);
  }

  clickedItem(item: Item) {
    if(this.selectedTab != "Inventory") {
      if(this.selectedTab == "Sell") {
        this.sellItem = item;
        this.displaySellDialog = true;
      } else {
        this.buyItem = item;
        this.displayBuyDialog = true;
      }
    }
  }

  sell() {
    if(this.tradeAmount > this.sellItem.amount) return;
    this.inventoryService.sellItem(this.sellItem, this.tradeAmount);
    this.userService.creditScore(this.getPrice(this.sellItem)*this.tradeAmount);
    this.search();
    this.displaySellDialog = false;
  }

  buy() {
    if(this.tradeAmount*this.getPrice(this.buyItem) > this.user.credits) return;
    this.inventoryService.buyItem(this.buyItem, this.tradeAmount);
    this.userService.creditScore(this.getPrice(this.sellItem)*this.tradeAmount*(-1));
    this.search();
    this.displayBuyDialog = false;
  }
}
