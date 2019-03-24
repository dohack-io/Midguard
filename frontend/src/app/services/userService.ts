import { User } from '../entities/User';
import u1 from '../MockData/User.json';
import { Observable, of, Subject } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskService } from './taskService';
import { filter, switchMap } from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private taskService: TaskService) {}

  private user: User;
  private userAnnouncer: Subject<String>;

  private localUrl = 'http://localhost:1337/api/user_management/user/';

  login(user: string, password: string): Observable<any> {
    return this.http.post('http://localhost:1337/auth/local/login', {
      email: user,
      username: '',
      password: password
    });
  }

  getUserAnnouncer(): Subject<String> {
    if (this.userAnnouncer == null) {
      this.userAnnouncer = new Subject<String>();
    }
    return this.userAnnouncer;
  }

  getUser(): Observable<any> {
    return this.http
      .get(this.localUrl + 'name/' + localStorage.getItem('currentUser'), {
        headers: new HttpHeaders({ Authorization: localStorage.getItem('jwt') })
      })
      .pipe(
        switchMap(user => {
          this.user = new User();
          this.user.id = user['id'];
          this.user.name = user['name'];
          this.user.level = user['level'];
          this.user.credits = user['credits'];
          this.user.skillPoints = user['skillPoints'];
          this.user.offeredItems = user['offeredItems'];
          this.user.taskId = 0;
          this.user.taskStart = null;
          return this.taskService.getTaskIdOfUser(this.user.id).pipe(
            filter(task => !!task),
            switchMap(task => {
              this.user.taskId = task.id;
              this.user.taskStart = task.startTime;
              return of(this.user);
            })
          );
        })
      );
  }

  getUserById(id: number): User {
    // get different users
    return u1[id - 1];
  }

  setTask(taskId: number) {
    this.user.taskId = taskId;
    this.user.taskStart = new Date();
    if (taskId !== 0) {
      this.userAnnouncer.next('New Task started');
    }
    return this.http.post(
      `http://localhost:1337/api/task_management/task/setTask/${
        this.user.id
      }/${taskId}`,
      null,
      {
        headers: new HttpHeaders({ Authorization: localStorage.getItem('jwt') })
      }
    );
  }

  creditScore(score: number) {
    this.user.credits += score;
  }

  removeProfileItem(id: number) {
    this.user.offeredItems.splice(this.user.offeredItems.indexOf(id), 1);
  }

  addProfileItem(id: number) {
    this.user.offeredItems.push(id);
  }

  getUserIdByName(searchStr: string) {
    return 2;
  }
}
