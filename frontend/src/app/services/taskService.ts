import {
  combineLatest,
  interval,
  Observable,
  of,
  Subject,
  Subscription
} from 'rxjs/index';
import { Task } from '../entities/Task';
import { combineAll, map, switchMap, takeUntil } from 'rxjs/internal/operators';
import jsonTasks from '../MockData/Task.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Item } from '../entities/Item';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

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
            (serverTime.getTime() / 1000 -
              new Date(start).getTime() / 1000 +
              tick +
              1)
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

  getTaskById(taskId: number): Observable<Task> {
    return this.http
      .get<Task>(
        'http://localhost:1337/api/task_management/task/getRunTaskById/' +
          taskId,
        {
          headers: new HttpHeaders({
            Authorization: localStorage.getItem('jwt')
          })
        }
      )
      .pipe(
        switchMap(task => {
          const t = new Task();
          Object.assign(t, task);
          t.reward = [];
          t.required = [];
          let subs: Observable<any>[] = [];
          for (const r of task.reward) {
            subs.push(
              this.http.get<Item>(
                `http://localhost:1337/api/inventory_management/inventory/invItemId/${r}`,
                {
                  headers: new HttpHeaders({
                    Authorization: localStorage.getItem('jwt')
                  })
                }
              )
            );
          }
          combineLatest(subs).subscribe(items => {
            for (const item of items) {
              t.reward.push(item);
            }
          });
          subs = [];
          for (const r of task.required) {
            subs.push(
              this.http.get<Item>(
                `http://localhost:1337/api/inventory_management/inventory/invItemId/${r}`,
                {
                  headers: new HttpHeaders({
                    Authorization: localStorage.getItem('jwt')
                  })
                }
              )
            );
          }
          combineLatest(subs).subscribe(items => {
            for (const item of items) {
              t.required.push(item);
            }
          });
          return of(t);
        })
      );
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

  getAllTasks(profession: string, uId: number): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        `http://localhost:1337/api/task_management/task/getTasks/${profession}`,
        {
          headers: new HttpHeaders({
            Authorization: localStorage.getItem('jwt')
          })
        }
      )
      .pipe(
        switchMap(tasks => {
          const taskArray: Task[] = [];
          for (const task of tasks) {
            const t = new Task();
            Object.assign(t, task);
            t.reward = [];
            t.required = [];
            let subs: Observable<any>[] = [];
            for (const r of task.reward) {
              subs.push(
                this.http.get<Item>(
                  `http://localhost:1337/api/inventory_management/inventory/invItemId/${r}`,
                  {
                    headers: new HttpHeaders({
                      Authorization: localStorage.getItem('jwt')
                    })
                  }
                )
              );
            }
            combineLatest(subs).subscribe(items => {
              for (const item of items) {
                t.reward.push(item);
              }
            });
            subs = [];
            for (const r of task.required) {
              subs.push(
                this.http.get<Item>(
                  `http://localhost:1337/api/inventory_management/inventory/invItemId/${r}`,
                  {
                    headers: new HttpHeaders({
                      Authorization: localStorage.getItem('jwt')
                    })
                  }
                )
              );
            }
            combineLatest(subs).subscribe(items => {
              for (const item of items) {
                t.required.push(item);
              }
              taskArray.push(t);
            });
          }
          return of(taskArray);
        })
      );
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

  getTaskIdOfUser(id: number): Observable<any> {
    return this.http.get(
      'http://localhost:1337/api/task_management/task/getUserTask/' + id,
      {
        headers: new HttpHeaders({ Authorization: localStorage.getItem('jwt') })
      }
    );
  }
}
