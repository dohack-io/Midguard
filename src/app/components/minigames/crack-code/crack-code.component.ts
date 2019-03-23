import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../../services/inventoryService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crack-code',
  templateUrl: './crack-code.component.html',
  styleUrls: ['./crack-code.component.scss']
})
export class CrackCodeComponent implements OnInit {

  constructor(private inventoryService: InventoryService,
              private router: Router) {}

  code = [];

  firstNum = 0;
  secondNum = 0;
  thirdNum = 0;
  fourthNum = 0;
  correctNP = [];
  correctN = [];
  notCorrect = [0,0,0,0];
  enterBtn = true;

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      let j = Math.floor(Math.random() * 6);
      if (this.code.indexOf(j) == -1) {
        this.code.push(j);
      } else {
        i--;
      }
    }
    console.log(this.code);
  }

  evaluateCode() {
    this.correctN = [];
    this.correctNP = [];
    this.notCorrect = [];
    if (this.code.indexOf(this.firstNum) == 0) {
      this.correctNP.push(this.firstNum);
    } else if (this.code.indexOf(this.firstNum) >= 0) {
      this.correctN.push(this.firstNum);
    }
    if (this.code.indexOf(this.secondNum) == 1) {
      this.correctNP.push(this.secondNum);
    } else if (this.code.indexOf(this.secondNum) >= 0) {
      this.correctN.push(this.secondNum);
    }
    if (this.code.indexOf(this.thirdNum) == 2) {
      this.correctNP.push(this.thirdNum);
    } else if (this.code.indexOf(this.thirdNum) >= 0) {
      this.correctN.push(this.thirdNum);
    }
    if (this.code.indexOf(this.fourthNum) == 3) {
      this.correctNP.push(this.fourthNum);
    } else if (this.code.indexOf(this.fourthNum) >= 0) {
      this.correctN.push(this.fourthNum);
    }
    for(let i = 0; i < (4 - this.correctNP.length - this.correctN.length); i++) {
      this.notCorrect.push(0);
    }

    if(this.correctNP.length == 4) {
      let loot = this.inventoryService.getRandomLoot();
      for(let item of loot) {
        this.inventoryService.addItem(item);
        setTimeout(()=>this.backToMap(), 1000);
      }
    }
  }

  backToMap() {
    this.router.navigate(['dashboard/map']);
  }

  increase(i: number) {
    switch (i) {
      case 1:
        if (this.firstNum < 6)
          this.firstNum++;
        break;
      case 2:
        if (this.secondNum < 6)
          this.secondNum++;
        break;
      case 3:
        if (this.thirdNum < 6)
          this.thirdNum++;
        break;
      case 4:
        if (this.fourthNum < 6)
          this.fourthNum++;
        break;
    }
    this.validateNum();
  }

  decrease(i: number) {
    switch (i) {
      case 1:
        if (this.firstNum > 0)
          this.firstNum--;
        break;
      case 2:
        if (this.secondNum > 0)
          this.secondNum--;
        break;
      case 3:
        if (this.thirdNum > 0)
          this.thirdNum--;
        break;
      case 4:
        if (this.fourthNum > 0)
          this.fourthNum--;
        break;
    }
    this.validateNum();
  }

  validateNum() {
    let set = new Set();
    set.add(this.firstNum).add(this.secondNum).add(this.thirdNum).add(this.fourthNum);
    this.enterBtn = set.size != 4;
  }

}
