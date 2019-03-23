import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContractService} from "../../../../services/contractService";
import {InventoryService} from "../../../../services/inventoryService";
import {UserService} from "../../../../services/userService";
import {Contract} from "../../../../entities/Contract";
import {Subject} from "rxjs";
import {filter, switchMap, takeUntil} from "rxjs/operators";
import {User} from "../../../../entities/User";
import {Item} from "../../../../entities/Item";

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private contractService: ContractService,
              private inventoryService: InventoryService,
              private userService: UserService) {
  }

  user: User;
  contract: Contract;
  receiver: User;

  addItemDialog: boolean;
  allItems: Item[] = [];
  allDisplayedItems: Item[] = [];
  searchStr: string;
  dialogCase: string;

  $destroy = new Subject<void>();

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.$destroy), filter(params => params.receiver))
      .subscribe(params => {
        this.receiver = this.userService.getUserById(params.receiver)
      });
    this.user = this.userService.getUser();
    this.allItems = this.inventoryService.getAllItems();
    this.allDisplayedItems = this.allItems;
    this.initContract();
  }

  private initContract() {
    this.contract = {
      id: 999,
      creatorId: this.user.id,
      receiverId: null,
      providedItems: [],
      requestedItems: [],
      reward: 0,
      accepted: false
    };
  }

  cancelContract(): void {
    this.router.navigate(['/dashboard/contracts']);
  }

  submitContract(): void {
    this.contract.receiverId = this.receiver.id;
    this.contractService.openContract(this.contract);
    this.router.navigate(['/dashboard/contracts']);
  }

  submitable(): boolean {
    if(this.contract.requestedItems.length == 0 && this.contract.providedItems.length == 0)
      return false;
    if(this.contract.providedItems.length > 0)
      return this.inventoryService.containsItems(this.contract.providedItems);
    return true;
  }

  openAddItemDialog(c: string) {
    this.dialogCase = c;
    this.addItemDialog = true;
  }

  search() {
    this.allDisplayedItems = this.allItems;
    this.allDisplayedItems = this.allDisplayedItems.filter((item: Item) => item.name.toLowerCase().includes(this.searchStr.toLowerCase()));
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  addContractItem(item: Item) {
    if(item.amount == 0)
      return;
    if(this.dialogCase == 'requested')
      this.contract.requestedItems.push(item);
    else if(this.dialogCase == 'provided')
      this.contract.providedItems.push(item);
    this.addItemDialog = false;
    this.contract.reward = this.contractService.calculateReward(this.contract);
  }

  increase(item: Item) {
    item.amount++;
  }

  decrease(item: Item) {
    if(item.amount > 0)
      item.amount--;
  }

  removeContractItem(item: Item, c: string) {
    if(c == 'requested')
      this.contract.requestedItems.splice(this.contract.requestedItems.indexOf(item), 1);
    else if(c == 'provided')
      this.contract.providedItems.splice(this.contract.providedItems.indexOf(item), 1);
    this.contract.reward = this.contractService.calculateReward(this.contract);
  }
}
