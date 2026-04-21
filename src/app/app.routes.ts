import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/users/user-management.component').then(
        (m) => m.UserManagementComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
