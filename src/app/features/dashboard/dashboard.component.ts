import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="page">
      <header class="header">
        <h1>Dashboard</h1>
        <p>Welcome to the Education Institution Management System.</p>
      </header>
      
      <div class="panel">
        <p>Quick stats and overview will appear here.</p>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {}
