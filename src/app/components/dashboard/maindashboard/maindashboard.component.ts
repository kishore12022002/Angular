import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maindashboard',
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.scss',
})
export class MaindashboardComponent {
  activateroute = inject(ActivatedRoute);

  displayedColumns: string[] = ['name', 'age', 'gender', 'mnumber', 'email'];
  users: any[] = [];

  ngOnInit() {
    // console.log(this.activateroute);
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    this.users = existingUsers;
    // console.log(this.users[0].name);
    // console.log(this.users);
  }
}
