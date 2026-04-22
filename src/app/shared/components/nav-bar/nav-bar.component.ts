import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (authService.isAuthenticated()) {
      <nav class="nav-container">
        <div class="nav-content">
          <div class="brand">
            <span class="brand-text">EduManager</span>
            <span class="user-info">({{ authService.currentUser()?.username }} - {{ authService.currentUser()?.role }} - {{ authService.currentUser()?.status }})</span>
          </div>
          <ul class="nav-links">
            <li>
              <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
            </li>
            @if (authService.isAdmin()) {
              <li>
                <a routerLink="/registration" routerLinkActive="active">Registration</a>
              </li>
              <li>
                <a routerLink="/fee" routerLinkActive="active">Fee</a>
              </li>
            }
            <li>
              <button class="logout-btn" (click)="authService.logout()">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    }
  `,
  styles: [`
    .nav-container {
      background: #ffffff;
      border-bottom: 1px solid #d1d5db;
      padding: 0 1rem;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-content {
      max-width: 1100px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
    }
    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1d4ed8;
    }
    .user-info {
      font-size: 0.85rem;
      color: #6b7280;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      text-decoration: none;
      color: #4b5563;
      font-weight: 500;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      transition: all 0.2s;
    }
    .nav-links a:hover {
      background: #f3f4f6;
      color: #1f2937;
    }
    .nav-links a.active {
      color: #1d4ed8;
      background: #eff6ff;
    }
    .logout-btn {
      background: none;
      border: 1px solid #d1d5db;
      color: #4b5563;
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
    .logout-btn:hover {
      background: #fef2f2;
      color: #b91c1c;
      border-color: #fecaca;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {
  protected readonly authService = inject(AuthService);
}
