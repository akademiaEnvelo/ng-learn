import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, skip, tap } from 'rxjs';
import { AuthResponse } from './auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private auth$$ = new BehaviorSubject<boolean>(false);

  get auth$() {
    return this.auth$$.asObservable();
  }

  constructor() {
    // naive checking
    if (localStorage.getItem('token')) {
      this.auth$$.next(true);
    }

    this.auth$$.pipe(skip(1)).subscribe((hasAuth) => {
      if (!hasAuth) {
        this.handleNonAuthState();
      }
    });

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

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>('http://localhost:3000/login', {
        email: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap({
          next: (response) => {
            localStorage.setItem('token', response.token);
          },
          error: (error) => {
            alert('error');
          },
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.auth$$.next(false);
  }

  handleNonAuthState() {
    this.router.navigate(['auth']);
  }
}
