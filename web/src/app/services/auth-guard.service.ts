import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const loginService = inject(AuthService);
  const router = inject(Router);

  try {
    const isAuthenticated = loginService.isLoggedIn();

    return isAuthenticated
      ? true
      : router.createUrlTree([router.parseUrl('login')]);
  } catch {
    return router.createUrlTree([router.parseUrl('login')]);
  }
};
