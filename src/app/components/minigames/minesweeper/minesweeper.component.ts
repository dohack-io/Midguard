import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit, AfterViewInit {

  constructor(private router: Router) {
  }

  xLength = [];
  yLength = [];
  field: number[][];
  enabledTiles: boolean[][];
  fieldCounter = 0;
  finishDisplay = false;
  result: String;

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.xLength.push(i);
    }
    for (let i = 0; i < 20; i++) {
      this.yLength.push(i);
    }
    this.field = [];
    this.enabledTiles = [];
    for (let i = 0; i < this.yLength.length; i++) {
      this.field.push([]);
      this.enabledTiles.push([]);
      for (let j = 0; j < this.xLength.length; j++) {
        this.field[i].push(0);
        this.enabledTiles[i].push(true);
        this.fieldCounter++;
      }
    }
    for (let i = 0; i < 15; i++) {
      let x = Math.floor(Math.random() * this.xLength.length);
      let y = Math.floor(Math.random() * this.yLength.length);
      while(this.field[y][x] >= 900) {
        x = Math.floor(Math.random() * this.xLength.length);
        y = Math.floor(Math.random() * this.yLength.length);
      }
      this.field[y][x] = 900;
      // Top Left
      if (y > 0 && x > 0) {
        this.field[y - 1][x - 1] += 1;
      }
      // Top
      if (y > 0) {
        this.field[y - 1][x] += 1;
      }
      // Top Right
      if (y > 0 && x < this.xLength.length) {
        this.field[y - 1][x + 1] += 1;
      }
      // Left
      if (x > 0) {
        this.field[y][x - 1] += 1;
      }
      // Right
      if (x < this.xLength.length) {
        this.field[y][x + 1] += 1;
      }
      // Bottom Left
      if (y < this.yLength.length - 1 && x > 0) {
        this.field[y + 1][x - 1] += 1;
      }
      // Bottom
      if (y < this.yLength.length - 1) {
        this.field[y + 1][x] += 1;
      }
      // Bottom Right
      if (y < this.yLength.length - 1 && x < this.xLength.length) {
        this.field[y + 1][x + 1] += 1;
      }
    }
  }

  ngAfterViewInit() {
  }

  getNumberOfTile(x: number, y: number): string {
    if(this.field[y][x] >= 900)
      return "T";
    return this.field[y][x].toString();
  }

  disableTile(x: number, y: number) {
    if(this.field[y][x] >= 900) {
      this.finishDisplay = true;
      this.result = "Loose!";
    }
    if(--this.fieldCounter == 15) {
      this.finishDisplay = true;
      this.result = "Win!";
    }
    this.enabledTiles[y][x] = false;
    if (this.field[y][x] == 0) {
      // Top Left
      if (y > 0 && x > 0) {
        if (this.enabledTiles[y - 1][x - 1])
          this.disableTile(x - 1, y - 1);
      }
      // Top
      if (y > 0) {
        if (this.enabledTiles[y - 1][x])
          this.disableTile(x, y - 1);
      }
      // Top Right
      if (y > 0 && x < this.xLength.length) {
        if (this.enabledTiles[y - 1][x + 1])
          this.disableTile(x + 1, y - 1);
      }
      // Left
      if (x > 0) {
        if (this.enabledTiles[y][x - 1])
          this.disableTile(x - 1, y);
      }
      // Right
      if (x < this.xLength.length) {
        if (this.enabledTiles[y][x + 1])
          this.disableTile(x + 1, y);
      }
      // Bottom Left
      if (y < this.yLength.length - 1 && x > 0) {
        if (this.enabledTiles[y + 1][x - 1])
          this.disableTile(x - 1, y + 1);
      }
      // Bottom
      if (y < this.yLength.length - 1) {
        if (this.enabledTiles[y + 1][x])
          this.disableTile(x, y + 1);
      }
      // Bottom Right
      if (y < this.yLength.length - 1 && x < this.xLength.length) {
        if (this.enabledTiles[y + 1][x + 1])
          this.disableTile(x + 1, y + 1);
      }
    }
  }

  finish(): void {
    this.router.navigate(['dashboard/map']);
  }
}
