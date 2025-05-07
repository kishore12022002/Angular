import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registation',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registation.component.html',
  styleUrl: './registation.component.scss',
})
export class RegistationComponent {
  tossedMessagestr = '';
  showTossed = false;
  tossedMessageType: 'green' | 'red' | 'yellow' = 'yellow';

  registerService = inject(UserService);
  router = inject(Router);

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^[A-Za-z ]+$')],
    }),
    age: new FormControl('', {
      validators: [Validators.required, Validators.min(1), Validators.max(99)],
    }),
    gender: new FormControl('', { validators: [Validators.required] }),
    mnumber: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormGroup({
      pass: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[@$!%*?&]/),
        ],
      }),
      cpassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[a-z]/),
          Validators.pattern(/[A-Z]/),
          Validators.pattern(/[0-9]/),
          Validators.pattern(/[@$!%*?&]/),
        ],
      }),
    }),
  });

  checkPassword(): boolean {
    const pass = this.form.get('password.pass')?.value;
    const cpass = this.form.get('password.cpassword')?.value;
    return pass === cpass;
  }

  tossedMessage(message: string, type: 'green' | 'red' | 'yellow' = 'yellow') {
    this.tossedMessagestr = message;
    this.tossedMessageType = type;
    this.showTossed = true;

    setTimeout(() => {
      this.showTossed = false;
    }, 3000);
  }

  onsubmit() {
    if (!this.checkPassword()) {
      this.tossedMessage('Password Not Match', 'yellow');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.tossedMessage('Enter all the Details', 'yellow');
      return;
    }

    const formValue = this.form.value;
    const data = {
      name: formValue.name,
      age: formValue.age,
      gender: formValue.gender,
      mnumber: formValue.mnumber,
      email: formValue.email,
      password: formValue.password?.pass,
    };

    if (formValue) {
      this.registerService.getUserData('users');
      const existingUsers = JSON.parse(this.registerService.users);
      console.log(existingUsers);
      if (existingUsers.some((users: any) => users.email === data.email)) {
        this.tossedMessage('Account already exsist', 'red');
        return;
      }
      this.registerService.setUserData(data, 'users');
      this.tossedMessage('Account created Successfully', 'green');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
  }
}
