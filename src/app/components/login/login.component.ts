import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  tossedMessagestr = '';
  showTossed = false;
  tossedMessageType: 'green' | 'red' | 'yellow' = 'yellow';
  isloggedin = false;

  users: any[] = [];
  userSevice = inject(UserService);
  loginData = {
    email: '',
    password: '',
  };

  // private activate = inject(ActivatedRoute);
  private route = inject(Router);
  private auth = inject(AuthService);

  tossedMessage(message: string, type: 'green' | 'red' | 'yellow' = 'yellow') {
    this.tossedMessagestr = message;
    this.tossedMessageType = type;
    this.showTossed = true;

    setTimeout(() => {
      this.showTossed = false;
    }, 3000);
  }

  onSubmit(data: NgForm) {
    if (data.invalid) {
      Object.values(data.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.tossedMessage('Please fill out all required fields', 'yellow');
      return;
    }

    this.loginData = data.value;
    console.log(this.loginData);
    this.userSevice.setQueruParams(
      this.loginData.email,
      this.loginData.password
    );

    this.userSevice.getUserData('users').subscribe((data) => {
      this.users = JSON.parse(data);
    });
    console.log(this.users);

    // const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (
      this.users.some(
        (users: any) =>
          users.email === this.loginData.email &&
          users.password === this.loginData.password
      )
    ) {
      this.tossedMessage('Login successfully', 'green');
      this.auth.login();
      setTimeout(() => {
        this.route.navigate(['/dashboard/dashboard'], {
          queryParams: {
            email: this.loginData.email,
          },
        });
      }, 2000);
      return;
    } else if (
      this.users.some(
        (users: any) =>
          users.email === this.loginData.email &&
          users.password != this.loginData.password
      )
    ) {
      this.tossedMessage('Worng password', 'red');
      return;
    } else {
      this.tossedMessage('User Did not exsist ', 'yellow');
      return;
    }
  }
}
