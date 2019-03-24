import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contract } from '../../../../entities/Contract';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../../../services/contractService';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { InventoryService } from '../../../../services/inventoryService';
import { UserService } from '../../../../services/userService';
import { User } from '../../../../entities/User';

@Component({
  selector: 'app-contract-view',
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.scss']
})
export class ContractViewComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private inventoryService: InventoryService,
    private userService: UserService
  ) {}

  user: User;

  contract: Contract;

  $destroy = new Subject<void>();

  ngOnInit() {
    this.userService.getUser().subscribe(user => (this.user = user));
    this.route.params
      .pipe(
        takeUntil(this.$destroy),
        filter(params => params.id)
      )
      .subscribe(params => {
        this.contract = this.contractService.getContractById(params.id);
      });
  }

  acceptContract(): void {
    this.contractService.acceptContract(this.contract.id);
    for (let item of this.contract.providedItems) {
      this.inventoryService.addItem(item);
    }
  }

  declineContract(): void {
    this.contractService.declineContract(this.contract.id);
    this.router.navigate(['/dashboard/contracts']);
  }

  cancelContract(): void {
    this.contractService.cancelContract(this.contract.id);
    this.inventoryService.removeItems(this.contract.providedItems);
    this.router.navigate(['/dashboard/contracts']);
  }

  submitContract(): void {
    this.contractService.submitContract(this.contract.id);
    this.inventoryService.removeItems(this.contract.requestedItems);
    this.userService.creditScore(this.contract.reward);
    this.router.navigate(['/dashboard/contracts']);
  }

  submitable(): boolean {
    return this.inventoryService.containsItems(this.contract.requestedItems);
  }

  cancable(): boolean {
    return this.inventoryService.containsItems(this.contract.providedItems);
  }

  acceptable(): boolean {
    for (const contract of this.contractService.getReceivedContractsOfUser(
      this.user.id
    )) {
      if (contract.accepted) {
        return false;
      }
    }
    return true;
  }

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  isReceivedContract() {
    return this.contract.receiverId === this.user.id;
  }
}
