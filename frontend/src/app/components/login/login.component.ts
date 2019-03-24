import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private router: Router, private userService: UserService) {}

  user: string;
  password: string;

  login(): void {
    this.userService.login(this.user, this.password).subscribe(
      response => {
        if (response.success) {
          localStorage.setItem('jwt', response.token);
          this.router.navigate(['/dashboard/overview']);
          localStorage.setItem('currentUser', response.username);
        }
      },
      error => console.log('wrong login')
    );
  }
}
