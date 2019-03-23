import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Task} from '../../../entities/Task';
import {TaskService} from '../../../services/taskService';
import {UserService} from '../../../services/userService';
import {User} from '../../../entities/User';
import {Router} from '@angular/router';
import {Item} from "../../../entities/Item";
import {InventoryService} from "../../../services/inventoryService";

@Component({
  selector: 'app-taskpicker',
  templateUrl: './taskpicker.component.html',
  styleUrls: ['./taskpicker.component.scss']
})
export class TaskpickerComponent implements OnInit {

  constructor(private taskService: TaskService,
              private userService: UserService,
              private inventoryService: InventoryService,
              private router: Router) {
  }

  user: User;
  items: MenuItem[];
  tasks: Task[];

  selectedTab = 'Provider';

  ngOnInit() {
    this.items = [
      {label: 'Provider', icon: 'fa fa-compass'},
      {label: 'Scientist', icon: 'fa fa-flask'},
      {label: 'Engineer', icon: 'fa fa-edit'},
      {label: 'Security', icon: 'fa fa-eye'}
    ];

    this.user = this.userService.getUser();
    this.tasks = this.taskService.getAllTasks('Provider', this.user.id);
  }

  taskPicked(task: Task): void {
    this.userService.setTask(task.id);
    this.inventoryService.removeItems(task.required);
    this.router.navigate(['dashboard/overview']);
  }

  tabSelected(label: string) {
    this.selectedTab = label;
    this.tasks = this.taskService.getAllTasks(label, this.user.id);
  }

  allRequirements(required : Item[]): boolean {
    return !this.inventoryService.containsItems(required);
  }
}
