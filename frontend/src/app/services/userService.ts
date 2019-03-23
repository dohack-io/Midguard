import { User } from '../entities/User';
import u1 from '../MockData/User.json';
import { Observable, Subject } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private user: User = u1[0];
  private userAnnouncer: Subject<String>;

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

  getUser(): User {
    // TODO: Logged in User Object from server
    // if not set use localstorage
    // setzte attribute die nicht vom server gesetzt sind
    return this.user;
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
  }

  creditScore(score: number) {
    this.getUser().credits += score;
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
