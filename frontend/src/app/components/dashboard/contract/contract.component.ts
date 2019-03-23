import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Contract} from "../../../entities/Contract";
import {ContractService} from "../../../services/contractService";
import {UserService} from "../../../services/userService";
import {User} from "../../../entities/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

  constructor(private contractService: ContractService,
              private userService: UserService,
              private router: Router) { }

  @ViewChild('tabMenu') menu: MenuItem[];
  tabs: MenuItem[];
  selectedTab: MenuItem;

  user: User;
  receivedContracts: Contract[];
  placedContracts: Contract[];

  ngOnInit() {
    this.tabs = [
      {label: 'Received'},
      {label: 'Placed'}
      ];
    this.selectedTab = this.tabs[0];
    this.user = this.userService.getUser();
    this.receivedContracts = this.contractService.getReceivedContractsOfUser(this.user.id);
    this.placedContracts = this.contractService.getPlacedContractsOfUser(this.user.id);
  }

  tabChanged(): void {
    this.selectedTab = this.menu['activeItem'];
  }

  openContract(contract: Contract): void {
    this.router.navigate(['/dashboard/contracts/' + contract.id]);
  }

  checkAccepted(contract: Contract): string {
    if(contract.accepted)
      return " row accepted";
    return "row"
  }
}
