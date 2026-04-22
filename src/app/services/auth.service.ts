import { Injectable, signal, computed, inject } from '@angular/core';
import { UserRole } from '../models/user.model';
import { Router } from '@angular/router';

export interface AuthState {
  user: {
    username: string;
    role: UserRole;
    status: 'Active' | 'Inactive';
  } | null;
}

const HARD_CODED_USERS: Record<string, { password: string; role: UserRole; status: 'Active' | 'Inactive' }> = {
  admin: { password: 'admin', role: 'Admin', status: 'Active' },
  user: { password: 'user', role: 'Standard', status: 'Active' }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly router = inject(Router);

  private readonly state = signal<AuthState>({
    user: this.getInitialState()
  });

  readonly currentUser = computed(() => this.state().user);
  readonly isAuthenticated = computed(() => !!this.state().user);
  readonly isAdmin = computed(() => this.state().user?.role === 'Admin');

  login(credentials: { username: string; password: string }): Promise<{ success: boolean; error?: string }> {
    return new Promise((resolve) => {
      const userData = HARD_CODED_USERS[credentials.username.toLowerCase()];

      if (!userData) {
        resolve({ success: false, error: 'Invalid username or password. Please try again.' });
        return;
      }

      if (userData.password !== credentials.password) {
        resolve({ success: false, error: 'Invalid username or password. Please try again.' });
        return;
      }

      const user = { username: credentials.username.toLowerCase(), role: userData.role, status: userData.status };
      this.state.set({ user });
      localStorage.setItem('auth_user', JSON.stringify(user));
      this.router.navigate(['/dashboard']);
      resolve({ success: true });
    });
  }

  logout(): void {
    this.state.set({ user: null });
    localStorage.removeItem('auth_user');
    this.router.navigate(['/login']);
  }

  private getInitialState() {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  }
}
