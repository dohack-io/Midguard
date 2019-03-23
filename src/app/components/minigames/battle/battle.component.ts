import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Card} from "./Card.entity";
import {BattleService} from "../../../services/battleService";
import {BattleUnit} from "../../../entities/BattleUnit";

const arrowLeftImg = "../../../../assets/arrow-left.png";
const arrowRightImg = "../../../../assets/arrow-right.png";
const arrowEvenImg = "../../../../assets/arrow-even.png";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  constructor(private router: Router,
              private battleService: BattleService) {
  }

  enemy: BattleUnit;
  enemyCurHp: number;
  enemyBlock: number = 0;


  player: BattleUnit;
  playerCurHp: number;
  playerCurAp: number;
  playerBlock: number = 0;
  playerHand = [];

  enemyPerception: Card;
  curPlayerMove: Card;
  curEnemyMove: Card;


  outcome = "";
  showEndDialog = false;
  resultText = "";

  ngOnInit() {
    this.enemy = this.battleService.getEnemy();
    this.enemyCurHp = this.enemy.hp;
    this.player = this.battleService.getPlayer();
    this.playerCurHp = this.player.hp;
    this.playerCurAp = this.player.ap;
    this.playerHand = this.battleService.getHand(this.player);
    this.enemyPerception = this.battleService.getAction(this.enemy);
    this.curPlayerMove = this.getEmptyCard();
    this.curEnemyMove = this.getEmptyCard();
  }

  public cardSelected(card: Card) {
    if (this.playerCurAp == 0) return;
    this.playerCurAp--;
    this.setImage("Player", card);
    this.outcome = "";
    this.playerHand.splice(this.playerHand.indexOf(card), 1);
    switch (card.move) {
      case "Attack":
        this.outcome = arrowRightImg;
        this.enemyBlock -= card.value;
        if (this.enemyBlock < 0) {
          this.enemyCurHp += this.enemyBlock;
          this.enemyBlock = 0;
        }
        if(this.enemyCurHp <= 0) {
          this.enemyCurHp = 0;
          this.showEndDialog = true;
          this.resultText = "Win";
        }
        break;
      case "Defense":
        this.outcome = arrowEvenImg;
        this.playerBlock += card.value;
        break;
    }

    if (this.playerCurAp == 0 && this.enemyCurHp > 0) {
      this.enemyBlock = 0;
      setTimeout(() => this.enemyTurn(), 1500);
    }
  }

  private enemyTurn() {
    this.curEnemyMove = this.enemyPerception;
    this.enemyPerception = this.battleService.getAction(this.enemy);
    this.setImage("Enemy", this.curEnemyMove);
    this.setImage("Player", this.getEmptyCard());
    switch (this.curEnemyMove.move) {
      case "Attack":
        this.outcome = arrowLeftImg;
        this.playerBlock -= this.curEnemyMove.value;
        if (this.playerBlock < 0) {
          this.playerCurHp += this.playerBlock;
          this.playerBlock = 0;
        }
        if(this.playerCurHp <= 0) {
          this.playerCurHp = 0;
          this.showEndDialog = true;
          this.resultText = "Loose";
        }
        break;
      case "Defense":
        this.outcome = arrowEvenImg;
        this.enemyBlock += this.curEnemyMove.value;
        break;
    }
    setTimeout(() =>this.playerTurn(), 1500 );
  }

  private playerTurn() {
    this.playerBlock = 0;
    this.playerCurAp = this.player.ap;
    this.playerHand = this.battleService.getHand(this.player);
    this.outcome = "";
    this.curEnemyMove = this.getEmptyCard();
  }


  private getEmptyCard(): Card {
    return {
      value: 0,
      move: "",
      src: ""
    };
  }

  private setImage(place: string, card: Card) {
    if (place === 'Player') {
      this.curPlayerMove = card;
    } else {
      this.curEnemyMove = card;
    }
  }

  public finish(): void {
    this.router.navigate(['/dashboard/map']);
  }
}

