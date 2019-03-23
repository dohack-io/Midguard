import {Component, OnDestroy, OnInit} from '@angular/core';
import {TerminalService} from "primeng/components/terminal/terminalservice";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {

  constructor(private terminalService: TerminalService,
              private http: HttpClient,
              private router: Router) {}

  question = "";
  solution = "";

  $destroy = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  ngOnInit(): void {
    this.terminalService.commandHandler
      .pipe(takeUntil(this.$destroy))
      .subscribe(command => {
      if(command === "y" || command == "Y") {
        this.getQuestion();
      }
      if(command === "t" || command == "T") {
        this.answer('True');
      }
      if(command ==="f" || command == "F") {
        this.answer('False');
      }
      if(command === 'n' || command == "N") {
        if(this.question == "") {
          this.router.navigate(['dashboard/map']);
        }
      }
    });
  }

  private answer(answer: string) {
    if(this.question == "") return;
    if(answer == this.solution) {
      this.terminalService.sendResponse("Correct! Access granted");
      setTimeout(() => this.router.navigate(['dashboard/map']), 1000);
    } else {
      this.terminalService.sendResponse("Wrong! Access denied! Do you want to continue? (y/n)");
      this.question = "";
      this.solution = "";
    }
  }

  private getQuestion() {
    if(this.question != "") return;
    // TODO: Get Questions suitable for the Game
    this.http.get('https://opentdb.com/api.php?amount=1&category=9&type=boolean')
      .pipe(takeUntil(this.$destroy))
      .subscribe(data => {
      this.question = data["results"][0]["question"] + "(t/f)";
      this.solution = data["results"][0]["correct_answer"];
      this.terminalService.sendResponse("" +this.question);
    });
  }
}
