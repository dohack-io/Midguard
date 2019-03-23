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
          this.router.navigate(['/dashboard/overview']);
          localStorage.setItem('jwt', response.token);
          console.log(localStorage.getItem('jwt'));
        }
      },
      error => console.log('wrong login')
    );
  }
}
