import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: any;

  email = '';
  password = '';

  activateRoute = inject(ActivatedRoute);
  route = inject(Router);

  setUserData(data: any, key: string) {
    const existingUsers = JSON.parse(localStorage.getItem(key) || '[]');
    localStorage.setItem(key, JSON.stringify([...existingUsers, data]));
  }
  getUserData(key: string): Observable<any> {
    this.users = localStorage.getItem(key);
    return of(this.users);
  }

  setQueruParams(email: string, password: string) {
    this.route.navigate([], {
      queryParams: {
        email: email,
        password: password,
      },
    });
  }
}
