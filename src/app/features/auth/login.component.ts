import { ChangeDetectionStrategy, Component, inject, signal, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="page">
      <div class="panel login-panel">
        <header class="header">
          <h1>Login</h1>
          <p>Access the institution management system.</p>
        </header>

        @if (errorMessage()) {
          <p class="alert" role="alert">{{ errorMessage() }}</p>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="form-grid">
          <label>
            Username
            <input type="text" formControlName="username" placeholder="Enter username" />
          </label>

          <label>
            Password
            <input type="password" formControlName="password" placeholder="Enter password" />
          </label>

          <div class="actions">
            <button type="submit" [disabled]="isLoading()">Login</button>
          </div>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .login-panel {
      max-width: 450px;
      margin: 4rem auto;
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  protected readonly errorMessage = signal('');
  protected readonly isLoading = signal(false);

  protected readonly loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor() {
    // Redirect already authenticated users away from the login page
    effect(() => {
      console.log('validate effect execution count...');
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  protected async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    const { username, password } = this.loginForm.getRawValue();
    const result = await this.authService.login({ username, password });

    this.isLoading.set(false);

    if (!result.success && result.error) {
      this.errorMessage.set(result.error);
    }
  }
}

