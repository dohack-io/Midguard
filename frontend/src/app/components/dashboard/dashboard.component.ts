import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../entities/User';
import { TaskService } from '../../services/taskService';
import { UserService } from '../../services/userService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';
import { MessageService } from 'primeng/api';
import { InventoryService } from '../../services/inventoryService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private userService: UserService,
    private taskService: TaskService,
    private inventoryService: InventoryService,
    private messageService: MessageService
  ) {}

  // Data Attributes
  user: User;

  // UI Attributes
  displaySB = false;

  $destroy = new Subject<void>();
  searchStr: string;

  ngOnDestroy(): void {
    this.$destroy.next();
  }

  ngOnInit(): void {
    // Get Data
    this.userService.getUser().subscribe(user => (this.user = user));
    // Get Announcer for Push Notifications
    this.taskService
      .getTaskAnnouncer()
      .pipe(takeUntil(this.$destroy))
      .subscribe(message => {
        this.taskService.getTaskById(this.user.taskId).subscribe(task => {
          this.messageService.add({
            severity: 'success',
            summary: message,
            detail: task.name
          });
        });
      });
    this.userService
      .getUserAnnouncer()
      .pipe(takeUntil(this.$destroy))
      .subscribe(message =>
        this.messageService.add({
          severity: 'success',
          summary: message.toString()
        })
      );
    this.inventoryService
      .getInventoryAnnouncer()
      .pipe(takeUntil(this.$destroy))
      .subscribe(message =>
        this.messageService.add({
          severity: 'success',
          summary: message.toString()
        })
      );
  }

  // Only show Back Button when you are not on Overview
  displayBack() {
    return this.router.url !== '/dashboard/overview';
  }

  returnToOverview() {
    // Return to Map from Game Modules
    if (
      this.router.url === '/dashboard/crackCode' ||
      this.router.url === '/dashboard/quiz' ||
      this.router.url === '/dashboard/minesweeper' ||
      this.router.url === '/dashboard/battle'
    ) {
      this.router.navigate(['/dashboard/map']);
    } else if (this.router.url.includes('/dashboard/message/')) {
      this.router.navigate(['/dashboard/message']);
    } else if (this.router.url.includes('/dashboard/contracts/')) {
      this.router.navigate(['/dashboard/contracts']);
    }
    // Return to Overview
    else {
      this.router.navigate(['/dashboard/overview']);
    }
  }

  // Sidebar Navigation Methods
  openSkillTree() {
    this.displaySB = false;
    this.router.navigate(['/dashboard/skillTree']);
  }

  openPublicProfile(): void {
    this.displaySB = false;
    this.router.navigate(['/dashboard/profile/', this.user.id]);
  }

  search(): void {
    this.displaySB = false;
    this.router.navigate([
      '/dashboard/profile/',
      this.userService.getUserIdByName(this.searchStr)
    ]);
  }
}
