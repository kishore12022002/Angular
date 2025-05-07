import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-contect-us',
  imports: [CommonModule, FormsModule],
  templateUrl: './contect-us.component.html',
  styleUrl: './contect-us.component.scss',
})
export class ContectUsComponent {
  service = inject(UserService);

  name = '';
  email = '';
  message = '';

  onSubmit() {
    console.log(this.name, this.email, this.message);
    const data = {
      name: this.name,
      email: this.email,
      message: this.message,
    };
    const existingUsers = JSON.parse(localStorage.getItem('contectUs') || '[]');
    this.service.setUserData(data, 'contectUs');
  }
}
