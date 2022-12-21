import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface User {
  email: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private user$$ = new ReplaySubject<User>(1);

  get user$() {
    return this.user$$.asObservable();
  }

  addUser(user: User) {
    this.user$$.next(user);
  }
}
