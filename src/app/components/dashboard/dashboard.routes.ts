import { Routes } from '@angular/router';

export const dashroutes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'contectus',
    loadComponent: () =>
      import('../contect-us/contect-us.component').then(
        (c) => c.ContectUsComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../dashboard/maindashboard/maindashboard.component').then(
        (c) => c.MaindashboardComponent
      ),
  },
];
