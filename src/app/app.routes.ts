import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistationComponent } from './components/registation/registation.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashroutes } from './components/dashboard/dashboard.routes';
import { AuthGuard } from './auth.guard';
import { MaindashboardComponent } from './components/dashboard/maindashboard/maindashboard.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registation', component: RegistationComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: dashroutes,
    canActivate: [AuthGuard],
  },
];
