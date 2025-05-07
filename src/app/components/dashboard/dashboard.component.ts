import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  activateroute = inject(ActivatedRoute);
  userservice = inject(UserService);

  displayedColumns: string[] = ['name', 'age', 'gender', 'mnumber', 'email'];
  email = '';
  users: any[] = [];
  selectedUser: any[] = [];

  constructor() {
    this.activateroute.queryParams.subscribe((param) => {
      this.email = param['email'];
    });
    this.userservice.getUserData('users');
    this.users = JSON.parse(this.userservice.users || '[]');
    this.selectedUser = this.users.filter(
      (user: any) => user.email === this.email
    );
  }
}
