import { ChangeDetectionStrategy, Component, effect, linkedSignal, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

type Theme = 'light' | 'dark' | 'ocean' | 'forest';
/*
- What it demonstrates : A two-way connection between a signal and an external data source
- Key points : linkedSignal() is used to create a two-way binding between a signal and localStorage
- Features : The theme preference is synced with localStorage, so it persists across page reloads
*/
@Component({
  selector: 'app-linked-signal-example',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatSelectModule, MatFormFieldModule],
  template: `
    <div class="container" [class]="currentTheme()">
      <mat-card>
        <mat-card-header>
          <mat-card-title>linkedSignal() Example</mat-card-title>
          <mat-card-subtitle>Sync signals with external state (localStorage)</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="explanation">
            <strong>linkedSignal()</strong> creates a two-way connection between a signal and an external data source.
            In this example, we sync the theme preference with localStorage, so it persists across page reloads.
          </p>

          <div class="demo-section">
            <h3>Select Theme:</h3>
            
            <mat-form-field appearance="fill" class="theme-selector">
              <mat-label>Theme</mat-label>
              <mat-select [(value)]="currentTheme">
                <mat-option value="light">Light</mat-option>
                <mat-option value="dark">Dark</mat-option>
                <mat-option value="ocean">Ocean</mat-option>
                <mat-option value="forest">Forest</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="preview-box">
              <h4>Preview:</h4>
              <p>This box uses the {{ currentTheme() }} theme</p>
              <p>Refresh the page - your theme choice persists!</p>
            </div>

            <div class="storage-info">
              <p><strong>localStorage State:</strong></p>
              <code>{{ localStoragePreview() }}</code>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './linked-signal-example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkedSignalExampleComponent {
  private isBrowser: boolean;

  // linkedSignal connects to localStorage - correct API for Angular 21
  currentTheme;

  // For display purposes only - shows what's in localStorage
  localStoragePreview = signal('');

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Initialize linkedSignal after isBrowser is set
    this.currentTheme = linkedSignal(() => {
      // Read initial value from localStorage only if we're in the browser
      if (this.isBrowser) {
        const saved = localStorage.getItem('app-theme');
        return (saved as Theme) || 'light';
      }
      return 'light';
    });

    // Sync to localStorage whenever the signal changes using effect()
    effect(() => {
      const theme = this.currentTheme();
      if (this.isBrowser) {
        localStorage.setItem('app-theme', theme);
        this.localStoragePreview.set(
          JSON.stringify({ 'app-theme': theme }, null, 2)
        );
      }
    });
    
    // Initial preview
    if (this.isBrowser) {
      this.localStoragePreview.set(
        JSON.stringify({ 'app-theme': this.currentTheme() }, null, 2)
      );
    }
  }
}
