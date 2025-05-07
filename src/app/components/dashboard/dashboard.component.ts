import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

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

  displayedColumns: string[] = ['name', 'age', 'gender', 'mnumber', 'email'];
  email = '';
  users: any[] = [];
  selectedUser: any[] = [];

  constructor() {
    this.activateroute.queryParams.subscribe((param) => {
      this.email = param['email'];
    });
    console.log(this.activateroute);
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    // this.user = existingUsers.filter((user: any) => user.email === this.email);
    this.users = existingUsers;
    // console.log(this.users[0].name);
    // console.log(this.email);
    this.getData();
  }

  getData() {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    this.selectedUser = existingUsers.filter(
      (user: any) => user.email === this.email
    );
    console.log(this.selectedUser);
  }
}
