import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, skip, tap } from 'rxjs';
import { UserStateService } from '../core/user.state.service';
import { AuthResponse } from './auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private userStateService = inject(UserStateService);

  private auth$$ = new BehaviorSubject<{ hasAuth: boolean }>({
    hasAuth: false,
  });

  get auth$() {
    return this.auth$$.asObservable();
  }

  get authValue() {
    return this.auth$$.value;
  }

  constructor() {
    this.onHasAuthChange();
    this.setStateFromLocalStorage();
    this.logoutOnDirectAccessToAuthRoute();
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('http://localhost:3000/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap({
          next: (res) => {
            console.log(res);
            const { accessToken, user } = res;
            this.userStateService.addUser(user);
            this.auth$$.next({ hasAuth: true });
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(user));

            this.router.navigate(['']);
          },
          error: () => {
            alert('error');
          },
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.auth$$.next({
      ...this.auth$$.value,
      hasAuth: false,
    });
  }

  handleNonAuthState() {
    this.router.navigate(['auth']);
  }

  private logoutOnDirectAccessToAuthRoute() {
    this.router.events
      .pipe(
        filter(
          (event) => event instanceof NavigationEnd && event.url === '/auth'
        )
      )
      .subscribe(() => {
        this.logout();
      });
  }

  private onHasAuthChange() {
    this.auth$$.pipe(skip(1)).subscribe((authState) => {
      if (!authState.hasAuth) {
        this.handleNonAuthState();
      }
    });
  }

  private setStateFromLocalStorage() {
    // naive checking
    if (localStorage.getItem('token')) {
      this.auth$$.next({ hasAuth: true });
    }

    const userFromLS = localStorage.getItem('user');

    if (userFromLS) {
      this.userStateService.addUser(JSON.parse(userFromLS));
    }
  }
}
