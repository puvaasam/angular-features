import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If we are on the server (SSR), skip the check as localStorage is unavailable.
  // The client-side hydration will handle the actual auth check.
  if (isPlatformServer(platformId)) {
    return true;
  }

  if (!authService.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const requiredRole = route.data?.['role'];
  if (requiredRole === 'Admin' && !authService.isAdmin()) {
    return router.createUrlTree(['/dashboard']);
  }

  return true;
};
