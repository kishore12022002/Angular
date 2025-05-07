import { Component, inject, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  imports: [MatTableModule, MatSortModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  data = inject(DashboardComponent);
  user: any[] = [];
  displayedColumns: string[] = ['name', 'age', 'gender', 'mnumber', 'email'];
  ngOnInit() {
    this.user = this.data.selectedUser;
    // console.log(this.user);
  }
}
