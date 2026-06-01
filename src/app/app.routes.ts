import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { userListResolver } from './core/resolver/userListResolver';

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
    resolve: {users: userListResolver},
    loadComponent: () =>
      import('./features/users/user-management.component').then(
        (m) => m.UserManagementComponent
      )
  },
  {
    path: 'order-details',
    canActivate: [authGuard],
    data: { role: 'Admin' },
    loadComponent: () =>
      import('./features/order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent
      )
  },
  {
    path: 'model-signal',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/model-signal/2way-binding-with-model-signal.component').then(
        (m) => m.TwoWayBindingWithModelSignalComponent
      )
  },
  {
    path: 'linked-signal-example',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/linked-signal-example/linked-signal-example.component').then(
        (m) => m.LinkedSignalExampleComponent
      )
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
