import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../../services/userService';
import {TaskService} from '../../../services/taskService';
import {Subject} from 'rxjs';
import {User} from '../../../entities/User';
import {Task} from '../../../entities/Task';
import {InventoryService} from "../../../services/inventoryService";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private userService: UserService,
              private taskService: TaskService,
              private inventoryService: InventoryService,
              private router: Router) {
  }

  // Data Attributes
  user: User;
  task: Task;

  // UI Attributes
  taskProgress: number;
  taskTime: number;
  taskStreamStop = new Subject<boolean>();
  rewardDisplay = false;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.task = this.taskService.getTaskById(this.user.taskId);
    if (this.user.taskId !== 0 && !this.taskIsFinished()) {
      this.startTask();
    }
  }

  pickNewTask() {
    this.router.navigate(['dashboard/taskPicker']);
  }

  cancelTask() {
    this.taskService.cancelTask();
    this.user.taskId = 0;
    this.userService.setTask(0);
    this.taskStreamStop.next(true);
  }

  openInventory() {
    this.router.navigate(['/dashboard/inventory']);
  }

  openMap() {
    this.router.navigate(['/dashboard/map']);
  }

  joinCommunity() {
    this.router.navigate(['/dashboard/community']);
  }

  openRequests(): void {
    this.router.navigate(['/dashboard/contracts']);
  }

  viewMessages(): void {
    this.router.navigate(['/dashboard/message']);
  }

  startTask() {
    this.taskService.initTaskTimer(this.task, this.user.taskStart)
      .subscribe(
        tick => {
          this.taskTime = tick;
          this.taskProgress = Math.floor(100 - (tick * 100) / this.task.duration);
          if (this.taskProgress >= 100) {
            this.taskStreamStop.next(true);
          }
        }
      );
  }

  taskIsFinished(): boolean {
    return this.task.duration <= this.taskService.getRestTime(this.user.taskStart);
  }

  openRewardDialog(img: HTMLImageElement) {
    img.src = '../../../assets/treasure-chest.png';
    setTimeout(()=> {
      this.rewardDisplay = true;
      }, 1000);
  }

  collectReward() {
    for(let item of this.task.reward) {
      this.inventoryService.addItem(item);
    }
    this.user.taskId = 0;
    this.userService.setTask(0);
  }
}
