import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-maindashboard',
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.scss',
})
export class MaindashboardComponent {
  activateroute = inject(ActivatedRoute);
  userservice = inject(UserService);

  displayedColumns: string[] = ['name', 'age', 'gender', 'mnumber', 'email'];
  users: any[] = [];

  ngOnInit() {
    this.userservice.getUserData('users');
    this.users = JSON.parse(this.userservice.users || '[]');
  }
}
