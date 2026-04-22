import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="nav-container">
      <div class="nav-content">
        <div class="brand">
          <span class="brand-text">EduManager</span>
        </div>
        <ul class="nav-links">
          <li>
            <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
          </li>
          <li>
            <a routerLink="/registration" routerLinkActive="active">Registration</a>
          </li>
          <li>
            <a routerLink="/fee" routerLinkActive="active">Fee</a>
          </li>
        </ul>
      </div>
    </nav>
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
    .brand-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: #1d4ed8;
    }
    .nav-links {
      display: flex;
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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {}
