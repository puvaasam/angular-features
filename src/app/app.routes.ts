import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login.component').then((m) => m.LoginComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      )
  },
  
  {
    path: 'registration',
    canActivate: [authGuard],
    data: { role: 'Admin' },
    loadComponent: () =>
      import('./features/users/user-management.component').then(
        (m) => m.UserManagementComponent
      )
  },
  {
    path: 'fee',
    canActivate: [authGuard],
    data: { role: 'Admin' },
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ) // Placeholder for Fee
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
