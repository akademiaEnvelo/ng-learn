import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { tap, map } from 'rxjs';
import { AuthStateService } from './auth.service';

export const hasAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthStateService);

  return authService.auth$.pipe(
    tap((authState) => {
      if (authState.hasAuth) return;

      authService.handleNonAuthState();
    }),
    map((authState) => authState.hasAuth)
  );
};
