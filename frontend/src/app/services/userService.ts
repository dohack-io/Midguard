import { User } from '../entities/User';
import u1 from '../MockData/User.json';
import { Observable, of, Subject } from 'rxjs/index';

export class UserService {
  private user: User = u1[0];
  private userAnnouncer: Subject<String>;

  login(user: string, password: string): Observable<boolean> {
    // SERVER: boolean if the user login was successful
    return of(true);
  }

  getUserAnnouncer(): Subject<String> {
    if (this.userAnnouncer == null) {
      this.userAnnouncer = new Subject<String>();
    }
    return this.userAnnouncer;
  }

  getUser(): User {
    return this.user;
  }

  getUserById(id: number): User {
    return u1[id - 1];
  }

  setTask(taskId: number) {
    this.user.taskId = taskId;
    this.user.taskStart = new Date();
    if (taskId != 0) this.userAnnouncer.next('New Task started');
  }

  creditScore(score: number) {
    this.getUser().credits += score;
  }

  removeProfileItem(id: number) {
    this.user.profileItems.splice(this.user.profileItems.indexOf(id), 1);
  }

  addProfileItem(id: number) {
    this.user.profileItems.push(id);
  }

  getUserIdByName(searchStr: string) {
    return 2;
  }
}
