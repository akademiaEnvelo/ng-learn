import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClassGuardExampleGuard implements CanActivate {
  router = inject(Router);

  canActivate() {
    return of(false).pipe(
      tap((canActivate) => {
        if (!canActivate) {
          console.log('mialo miejsce');
          this.router.navigate([''], {});
        }
      })
    );
  }
}
