import { interval, Observable, Subject } from 'rxjs/index';
import { Task } from '../entities/Task';
import { map, takeUntil } from 'rxjs/internal/operators';
import jsonTasks from '../MockData/Task.json';

export class TaskService {
  private allTasks: Task[] = jsonTasks;

  private taskTimer: Observable<number>;
  private taskAnnouncer: Subject<string>;

  private timeReduction = 0;
  private taskCompleted = new Subject<boolean>();

  initTaskTimer(task: Task, start: Date): Observable<number> {
    const serverTime = this.getServerTime();
    this.taskCompleted.next(false);
    this.taskCompleted = new Subject<boolean>();
    this.taskTimer = interval(1000).pipe(
      takeUntil(this.taskCompleted),
      map(tick => {
        const restTime = Number(
          (
            task.duration -
            this.timeReduction -
            (serverTime.getTime() / 1000 - start.getTime() / 1000 + tick + 1)
          ).toFixed(0)
        );
        if (restTime <= 0) {
          this.taskCompleted.next(false);
          this.taskFinished(task.id);
        }
        return restTime;
      })
    );
    return this.taskTimer;
  }

  getTaskAnnouncer() {
    if (this.taskAnnouncer == null) {
      this.taskAnnouncer = new Subject<string>();
    }
    return this.taskAnnouncer;
  }

  getServerTime(): Date {
    // TODO: Get Time from Server
    return new Date();
  }

  getTaskById(taskId: number): Task {
    for (const task of this.allTasks) {
      if (task.id === taskId) {
        return task;
      }
    }
    return null;
  }

  taskFinished(id: number) {
    // TODO: Call Server
    this.taskAnnouncer.next('Task Finished');
    this.taskTimer = null;
    this.timeReduction = 0;
  }

  cancelTask() {
    // TODO: Call server to drop the Task id
    this.taskTimer = null;
    this.timeReduction = 0;
    this.taskCompleted.next(false);
    this.taskAnnouncer.next('Task Canceled');
  }

  getAllTasks(profession: string, uId: number): Task[] {
    // TODO: Filter for user ID (on server)
    switch (profession) {
      case 'Engineer':
        return this.allTasks;
    }
    return [];
  }

  energyCollected(amount: number) {
    // TODO: Tell Server (taskStart of user is moved)
    this.timeReduction += amount;
    this.getTaskAnnouncer().next('Energy Collected! -' + amount + 's');
  }

  getRestTime(taskStart: Date): number {
    return Math.floor(
      this.getServerTime().getTime() / 1000 -
        taskStart.getTime() / 1000 +
        this.timeReduction
    );
  }
}
